<template>
  <div id="app">
    <transition :name="direction">
      <!-- 如果为空，就表示都缓存（如果没有刷新什么都没有），然后先有MyLayout（区分大小写），然后登陆时因为有字符串，，并且不相等，所以不缓存，数据是响应的，然后 -->
      <keep-alive :include="$store.state.cacheArr">
        <router-view />
      </keep-alive>
    </transition>
  </div>
</template>
<script>

export default {
  data () {
    return {
      direction: 'slide-left'
    }
  },
  created () {

    // console.log(this.$root.direction)
    // this.$http.beforeEach((to, from, next) => {
    //   if (to.meta.index < from.meta.index) {
    //     this.$root.direction = 'slide-left'
    //   } else if (to.meta.index > from.meta.index) { this.$root.direction = 'slide-right' } else {
    //     this.$root.direction = ''
    //   }
    //   next()
    // })
  },
  watch: {
    $route (to, from) {
    //   // 如果前端页面进行刷新，则无需加入transition动画
    //   if (from.name === null) {
    //     return
    //   }
    //   if (to.meta.index < from.meta.index) {
    //     this.direction = 'slide-right'
    //   } else {
    //     if (!to.meta.index) {
    //       this.direction = ''
    //       return
    //     }
    //     this.direction = 'slide-left'
    //   }

      if (to.meta.index > from.meta.index) {
        this.direction = 'slide-left'
      } else if (to.meta.index < from.meta.index) { this.direction = 'slide-right' } else {
        this.direction = ''
      }
    }
  }

}
</script>
<style lang="scss">
// .slide-right-enter-active,
// .slide-left-enter-active,
// .slide-right-leave-active,
// .slide-left-leave-active {
//   transition: all 0.5s;
//   will-change: transform;
//   position: absolute;
//   width: 100%;
//   height: 100%;
//   left: 0;
// }
// .slide-right-enter {
//   transform: translateX(-100%);
// }
// .slide-right-leave-active,
// .slide-right-leave-to {
//   transform: translateX(100%);
// }
// .slide-right-enter-to,
// .slide-right-leave {
//   transform: translateX(0);
// }
// .slide-left-enter {
//   transform: translateX(100%);
// }
// .slide-left-leave-active,
// .slide-left-leave-to {
//   transform: translateX(-100%);
// }
// .slide-left-enter-to,
// .slide-left-leave {
//   transform: translateX(0);
// }

.slide-right-enter-active,
.slide-left-enter-active,
.slide-right-leave-active,
.slide-left-leave-active {
  position: absolute;
  top: 0;
  left: 0;
  transition: all 0.3s;
  width: 100%;
  height: 100%;
}
.slide-left-enter,
.slide-right-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(100%);
}
.slide-left-leave-to,
.slide-right-enter {
  transform: translateX(-100%);
}
</style>
