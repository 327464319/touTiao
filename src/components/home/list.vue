<template>
  <div class="list-contain">
    <van-pull-refresh
      v-model="refreshing"
      @refresh="onRefresh"
      :animation-duration="1500"
      :loading-text="loadingtext"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
        <van-cell v-for="item in list" :key="item.art_id.toString()">
          <!-- 子组件 -->
          <list-item :article="item"></list-item>
        </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticle } from '../../api/article'
import ListItem from './list_item'

export default {
  props: {
    aId: {
      required: true,
      style: String | Number
    }
  },
  data () {
    return {
      loadingtext: '正在努力加载哦...',
      obj: {
        channel_id: this.aId,
        timestamp: Date.now(),
        with_top: 1
      },

      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      error: false
    }
  },
  methods: {
    async getArt (type) {
      try {
        const { data: res } = await getArticle(this.obj)

        if (type === 'load') {
          this.list.push(...res.data.results)
        } else {
          this.list.unshift(...res.data.results)
          if (this.refreshing) {
            this.loadingtext = '正在努力加载中...'
          }
        }

        this.obj.timestamp = res.data.pre_timestamp
        if (res.data.results.lenght < 10) {
          this.error = false
          this.finished = true
        }
      } catch (e) {
        if (type === 'load' && e) {
          this.error = true
        } else if (type === 'refresh' && e) {
          this.loadingtext = '加载失败！'
        }
      } finally {
        this.loading = false
        this.refreshing = false
      }
    },
    onLoad () {
      this.getArt('load')
    },
    onRefresh () {
      // 清空列表数据
      this.finished = false

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true
      this.getArt('refresh')
    }

  },
  created () {
    // this.getArt()
  },
  components: {
    ListItem
  }
}
</script>

<style lang="scss" scoped>
.van-list {
  margin-bottom: 100px;
}
.list-contain {
  overflow-y: auto;
  height: 79vh;
}
</style>
