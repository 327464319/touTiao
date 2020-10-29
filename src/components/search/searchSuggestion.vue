<template>
  <div>
    <van-cell v-for="(item, index) in list" :key="index" icon="search">
      <div
        slot="title"
        v-html="heilight(item, sugVal)"
        @click="submit(item)"
      ></div>
    </van-cell>
  </div>
</template>

<script>
import { getSuggestion } from '../../api/search'
import { debounce } from 'lodash'
export default {
  props: {
    sugVal: { type: String || Number }

  },
  data () {
    return {
      list: []

    }
  },
  watch: {
    sugVal: {
      handler: debounce(function (val) { this.handler(val) }, 200),
      immediate: true
    }
  },
  methods: {
    // 触发父组件事件
    submit (val) {
      this.$emit('getResult', val)
    },
    // 处理高亮
    heilight (text, targe) {
      const arr = text.split(targe)
      return arr.join(`<span style="color:#3296fa">${targe}</span>`)
    },
    async handler (val) {
      try {
        const { data: res } = await getSuggestion(val)
        //  处理高亮
        // res.data.options.forEach((v, i, arr) => {
        //   const str = this.sugVal
        //   const regexp = new RegExp(str, 'gi')

        //   arr[i] = v.replace(regexp, `<span style="color:#3296fa">${str}</span>`)
        // })

        this.list = res.data.options
      } catch (e) {
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
