<template>
  <div>
    <keep-alive> <router-view /></keep-alive>

    <van-tabbar route>
      <van-tabbar-item to="/home">
        <i class="iconfont iconshouye" slot="icon" />
        <span>首页</span></van-tabbar-item
      >
      <van-tabbar-item to="/pa">
        <i slot="icon" class="iconfont iconwenda" />
        <span>问答</span>
      </van-tabbar-item>
      <van-tabbar-item to="/video">
        <i slot="icon" class="iconfont iconshipin"></i><span>视频</span>
      </van-tabbar-item>
      <van-tabbar-item to="/my"
        ><i slot="icon" class="iconfont iconwode"></i>
        <span>{{ this.$store.state.token ? "我的" : "未登录" }}</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'MyLayout',
  data () {
    return {

    }
  },
  created () {
    // $route是本页面路由信息,$router是Vue上绑定的路由实例
    // console.log(this.$route)
    // console.log(this.$router)
    this.$store.commit('setCache', 'MyLayout')
  }
}
</script>
<style lang="scss" scoped>
.iconfont {
  font-size: 40px;
}
.van-tabbar-item span {
  font-size: 19px;
}
</style>
