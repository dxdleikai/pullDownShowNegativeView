<template>
  <div class="outer-scroll">
    <div class="loading top-box">
        默认隐藏，负一屏，手指下滑即可弹出显示，上滑隐藏
    </div>

    <div class="scroll-box">
        <h1>正式内容</h1>
    </div>
  </div>
</template>
<script>
import $ from 'jquery';
export default {
  name: 'About',
  data() {
      return {

      }
  },
  methods: {
    homescroll() {
      let scroll = document.querySelector('.scroll-box');
      let outer_scroll = document.querySelector('.outer-scroll');
      let topbox = document.querySelector('.top-box');
      let topboxHeight;
      let touchStart;
      let touchDis;
      // 注意如果绑定触摸时的事件则会在下拉时从手指的下拉位置开始下拉 该事件在手指触摸屏幕时候触发，即使已经有一个手指放在屏幕上也会触发。
      scroll.ontouchstart = function (event) {
        touchStart = 0;
        touchDis = 0;
        // 说明：由于手指头是多点触摸到屏幕上的我们所以e.originalEvent.targetTouches的
        // 意思是一个手指触碰点集合我们只需要获取第一个点就可以了所以
        touchStart = event.targetTouches[0].pageY;
        console.log(touchStart);
      };
      // 当手指在屏幕上滑动的时候连续地触发。在这个事件发生期间，调用preventDefault()事件可以阻止滚动。
      scroll.ontouchmove = (event) => {
        // 从顶部向下拖拽
        let touchPos = event.targetTouches[0].pageY;
        touchDis = touchPos - touchStart;
        if (!topboxHeight) {
          topboxHeight = topbox.offsetHeight;
        }
        console.log(topboxHeight);
        if (document.documentElement.scrollTop == 0 && touchDis >= 100) {
          topbox.style.display = 'block';
          $(scroll).stop().animate({ top: topboxHeight }, 'fast');
        } else if (topbox.style.display == 'block' && touchDis < -10) {
          console.log(touchDis);
          $(scroll).stop().animate({ top: '0' }, 'fast');
          setTimeout(() => { topbox.style.display = 'none'; this.$forceUpdate(); }, 100);
          event.preventDefault();
        }
      };
    }
  },
  mounted() {
    document.addEventListener('touchMove', e => {
      e.preventDefault();
    })
    this.homescroll();
  }
}
</script>

<style scoped>

.scroll-box {
  width: 100%;
  position: absolute;
  top: 0;
  background-color: #fff;
}
.loading {
  background: gray;
  width: 100vw;
  height: 40vh;
  display: none;
  overflow: hidden;
  font-size: 40px;
}
.scroll-box {
  background: #ccc;
  height: 60vh;
  color: #fff;
}
</style>
