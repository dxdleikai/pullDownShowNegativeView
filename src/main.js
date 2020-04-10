import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueResource from "vue-resource";

Vue.use(VueResource);
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.prototype.rootData = 1;


Vue.directive('real-img', async function (el, binding) {//指令名称为：real-img
    let imgURL = binding.value;//获取图片地址
    if (imgURL) {
        let exist = await imageIsExist(imgURL);
        if (exist) {
            el.children[0].src = imgURL;
            el.className += ' real-src';
        } 
    }
})

/**
 * 检测图片是否存在
 * @param url
 */
let imageIsExist = function(url) {
    return new Promise((resolve) => {
        var img = new Image();
        img.onload = function () {
            if (this.complete == true){
                resolve(true);
                img = null;
            }
        }
        img.onerror = function () {
            console.log(2);
            resolve(false);
            img = null;
        }
        img.src = url;
    })
}

new Vue({
  router,
  store,
  data: {
    global: 1
  },
  render: h => h(App)
}).$mount("#app");