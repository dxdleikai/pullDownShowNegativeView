<template>
<div class="video">
    this is home
	<video ref="h5video"></video>
</div>
</template>

<script>
// @ is an alias to /src

export default {
    name: "video",
    data() {
        return {
            home_data: 3423,
            mediaSource: null,
            sourceBuffer: null,
            mimeType: 'video/mp4;codecs="avc1.42E01E,mp4a.40.2"'
        };
    },
    components: {
        Video
    },
    methods: {
        createMediaSource() {
            // 创建MediaSource对象，并使用URL.createObjectURL来创建指向MediaSource对象的URL供video播放
            this.mediaSource = new MediaSource()
            this.$refs.h5video.src = window.URL.createObjectURL(this.mediaSource)
            // 监听sourceopen
            this.mediaSource.addEventListener('sourceopen', this.onSourceOpen)
        },
        onSourceOpen() {
            let self = this
            // 创建一个新的 SourceBuffer 对象，然后会将它追加到 MediaSource 的 SourceBuffers 列表中。
            this.sourceBuffer = this.mediaSource.addSourceBuffer(this.mimeType)
            // 监听buffer更新结束事件
            this.sourceBuffer.addEventListener('updateend', () => {
                // 停止stream
                self.mediaSource.endOfStream()
                // 开始播放
                self.$refs.h5video.play()
            })
            this.requestBuffer()
        },
        requestBuffer() {
            let self = this
            // 请求接口去拉流
            // this.$axios.get('/api/GetStream', null, {
            //     responseType: 'arraybuffer'
            // }).then(resp => {
            //     // 拉到的流塞进sourceBuffer里。
            //     self.sourceBuffer.appendBuffer(resp)
            // })
        }
    },
    mounted() {
        // MediaSource.isTypeSupported('video/webm;codecs="vorbis,vp8"');//是否支持webm 
        // MediaSource.isTypeSupported('video/mp4;codecs="avc1.42E01E,mp4a.40.2"')//是否支持MP4 
        // MediaSource.isTypeSupported('video/mp2t;codes="avc1.42E01E,mp4a.40.2"')//是否支持ts
        // 首先判断一下对视频格式的支持度，MediaSource提供了isTypeSupported方法
        if ('MediaSource' in window && MediaSource.isTypeSupported(this.mimeType)) {
            this.createMediaSource()
        } else {
            // this.$message({
            //     message: '您的浏览器不支持MediaSource',
            //     type: 'warning'
            // })
		}
		// this.$http.get('/api/getProducts').then(res => {  请配置代理5000端口，rest-hello请开启后端服务
		// 	console.log(11);
		// 	console.log(resp);
		// });

		this.$http.get('/api/GetStream').then(res => { //请配置代理3000端口，node-video-stream_demo请开启后端服务
			console.log(11);
			console.log(resp);
		});

		// this.$http.get('/text.json', {header:'Content-Type = appliction/x-www-form-urlencoded'}).then(res => {
		// 	console.log(222);
		// }).catch(e => {
		// 	console.log(e);
		// })
    }
};
</script>

<script>
// @ is an alias to /src

export default {
    name: "video",
    data() {
        return {
            home_data: 3423,
            mediaSource: null,
            sourceBuffer: null,
            mimeType: 'video/mp4;codecs="avc1.42E01E,mp4a.40.2"'
        };
    },
    components: {
        HelloWorld
    },
    methods: {
        createMediaSource() {
            // 创建MediaSource对象，并使用URL.createObjectURL来创建指向MediaSource对象的URL供video播放
            this.mediaSource = new MediaSource()
            this.$refs.h5video.src = window.URL.createObjectURL(this.mediaSource)
            // 监听sourceopen
            this.mediaSource.addEventListener('sourceopen', this.onSourceOpen)
        },
        onSourceOpen() {
            let self = this
            // 创建一个新的 SourceBuffer 对象，然后会将它追加到 MediaSource 的 SourceBuffers 列表中。
            this.sourceBuffer = this.mediaSource.addSourceBuffer(this.mimeType)
            // 监听buffer更新结束事件
            this.sourceBuffer.addEventListener('updateend', () => {
                // 停止stream
                self.mediaSource.endOfStream()
                // 开始播放
                self.$refs.h5video.play()
            })
            this.requestBuffer()
        },
        requestBuffer() {
            let self = this
            // 请求接口去拉流
            // this.$axios.get('/api/GetStream', null, {
            //     responseType: 'arraybuffer'
            // }).then(resp => {
            //     // 拉到的流塞进sourceBuffer里。
            //     self.sourceBuffer.appendBuffer(resp)
            // })
        }
    },
    mounted() {
        // MediaSource.isTypeSupported('video/webm;codecs="vorbis,vp8"');//是否支持webm 
        // MediaSource.isTypeSupported('video/mp4;codecs="avc1.42E01E,mp4a.40.2"')//是否支持MP4 
        // MediaSource.isTypeSupported('video/mp2t;codes="avc1.42E01E,mp4a.40.2"')//是否支持ts
        // 首先判断一下对视频格式的支持度，MediaSource提供了isTypeSupported方法
        if ('MediaSource' in window && MediaSource.isTypeSupported(this.mimeType)) {
            this.createMediaSource()
        } else {
            // this.$message({
            //     message: '您的浏览器不支持MediaSource',
            //     type: 'warning'
            // })
		}
		// this.$http.get('/api/getProducts').then(res => {  请配置代理5000端口，rest-hello请开启后端服务
		// 	console.log(11);
		// 	console.log(resp);
		// });

		this.$http.get('/api/GetStream').then(res => { //请配置代理3000端口，node-video-stream_demo请开启后端服务
			console.log(11);
			console.log(resp);
		});

		// this.$http.get('/text.json', {header:'Content-Type = appliction/x-www-form-urlencoded'}).then(res => {
		// 	console.log(222);
		// }).catch(e => {
		// 	console.log(e);
		// })
    }
};
</script>
