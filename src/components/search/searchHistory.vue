<template>
  <div>
    <van-cell-group>
      <van-cell title="搜索历史">
        <span v-show="isShow" @click="$emit('del-search-arr')">全部删除 </span>
        <span v-show="isShow" @click="isShow = false"> 完成</span>

        <van-icon name="delete" v-show="!isShow" @click="close" />
      </van-cell>
      <van-cell
        v-for="(item, index) in searchArr"
        :key="index"
        :title="item"
        @click="handelHistory(item)"
        ><van-icon name="cross" v-show="isShow"
      /></van-cell>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  props: {
    searchArr: {
      type: Array

    }
  },
  data () {
    return {

      isShow: false
    }
  },
  methods: {
    handelHistory (val) {
      if (this.isShow) {
        this.$emit('del-one-history', val)
      } else {
        this.$emit('get-history', val, 11)
      }
    },
    close () {
      this.isShow = !this.isShow
    }
  },

  created () {

  }
}
</script>

<style lang="scss" scoped>
</style>
