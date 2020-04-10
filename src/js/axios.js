import axios from 'axios'
import { Loading, MessageBox } from 'element-ui'
import URL from '@/js/URL'

class Axios {
  static ajax(opt) {
    let loading
    let StrData = ''
    let contentType = {}
    let TOKEN = localStorage.getItem('token')
    if (TOKEN === 'null' || TOKEN === 'undefined') {
      TOKEN = ''
    }
    return new Promise((resolve, reject) => {
      if (opt.isShowLoading) {
        loading = Loading.service({
          lock: true,
          text: '努力加载中...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.3)'
        })
      }
      if (!opt.isNewDataType && opt.data instanceof Object) {
        for (let key in opt.data) {
          StrData += `&${key}=${opt.data[key]}`
        }
        StrData = StrData.substr(1)
        contentType = {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
      axios({
        url: opt.url,
        method: opt.method || 'get', // 默认值
        baseURL: '',
        // 必须是一个纯对象或者 URL参数对象
        params: opt.params || {},
        // 请求体数据
        // 只有当请求方法为'PUT', 'POST',和'PATCH'时可用
        // 当没有设置`transformRequest`时，必须是以下几种格式
        // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
        // - Browser only: FormData, File, Blob
        // - Node only: Stream, Buffer
        data: StrData || opt.data,

        // 请求超时时间（毫秒）
        timeout: 60000,
        headers: {
          ttsx_auth_token: TOKEN || '',
          ...contentType
        }
      }).then(
        response => {
          if (opt.isShowLoading) {
            loading.close()
          }
          if (response.status === 200) {
            if (opt.getCode) {
              resolve(response.data)
              return true
            }
            if (response.data.code === '1') {
              resolve(response.data.data)
            } else {
              let messageBoxFlag = sessionStorage.getItem('messageBoxFlag')
              if (messageBoxFlag === 'true') {
                return false
              }
              sessionStorage.setItem('messageBoxFlag', 'true')
              MessageBox.alert(response.data.msg, '信息', {
                customClass: 'ajax-info-tips',
                confirmButtonText: '确定',
                beforeClose(action, instance, done) {
                  sessionStorage.removeItem('messageBoxFlag')
                  done()
                }
              })
                .then(action => {
                  if (response.data.code === '2') {
                    sessionStorage.setItem('lastHref', window.location.href)
                    window.location.hash = '/login'
                  }
                  console.log(
                    '%c' + response.data.msg,
                    'color: #00f; font-size: 20px;'
                  )
                })
                .catch(action => {
                  if (response.data.code === '2') {
                    sessionStorage.setItem('lastHref', window.location.href)
                    window.location.hash = '/login'
                  }
                  console.log(
                    '%c' + response.data.msg,
                    'color: #00f; font-size: 20px;'
                  )
                })
            }
          } else {
            reject(response.data)
          }
        },
        error => {
          if (opt.isShowLoading) {
            loading.close()
          }
          console.log(error)
        }
      )
    })
  }
}

export default Axios
