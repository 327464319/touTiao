<template>
  <van-list
    :immediate-check="false"
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
    :error.sync="error"
    error-text="请求失败，点击重新加载"
  >
    <my-comment
      @changeLiking="changeLiking($event, item)"
      v-for="(item, index) in list"
      :key="'a' + index"
      :comment="item"
    />
  </van-list>
</template>

<script>
import { getComments } from '@/api/comment.js'
import MyComment from './comment'
export default {
  name: 'comment-list',
  components: { MyComment },
  props: {
    // newOneComment是CommoentPost组件评论完传给父组件然后传过来的
    newOneComment: { type: Object },
    artId: {
      type: [String, Number, Object],
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      queryInfo: {
        type: this.type,
        source: this.artId.toString(),
        offset: null,
        limit: 10
      },
      list: [],
      error: false,
      loading: false,
      finished: false
    }
  },
  created () { this.onLoad() },
  watch: {

    newOneComment: function (val) {
      if (val) {
        // 如果评论了，把此评论渲染到第一行
        this.list.unshift(val)
      }
    }
  },
  methods: {
    // 子组件传来数据在此修改
    changeLiking (event, item) {
      item.is_liking = event[0]
      item.like_count = event[1]
    },
    async onLoad () {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      try {
        const { data: res } = await getComments(this.queryInfo)
        // 数据全部加载完成
        // console.log(res.data.results.length)
        if (res.data.results.length === 0) {
          this.finished = true
        }
        // console.log(res)
        // console.log(res.data.results)
        // 通知父组件修改评论总数
        this.$emit('setTotalCount', res.data.total_count)
        this.list.push(...res.data.results)
        // console.log(this.list)
        this.queryInfo.offset = res.data.last_id
      } catch (e) {
        this.error = true
      }
      // 加载状态结束
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
