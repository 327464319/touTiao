<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="item in list" :key="item.art_id" :title="item.title" />
    </van-list>
  </div>
</template>

<script>
import { getResults } from '@/api/search.js'
export default {
  props: {
    suggestionVal: { type: String || Number }
  },
  data () {
    return {
      // 获取结果的页数
      info: {
        number: 1,
        per_page: 10,
        q: ''
      },
      list: [],
      loading: false,
      finished: false
    }
  },
  created () {

  },
  methods: {
    async onLoad () {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求

      // 加载状态结束
      try {
        this.info.q = this.suggestionVal
        const { data: res } = await getResults(this.info)

        if (res.data.results.length < 10) {
          this.finished = true
        } else {
          this.info.number++
          this.loading = false
        }

        this.list.push(...res.data.results)
      } catch (e) {

      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
