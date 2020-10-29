<template>
  <div class="search-contain">
    <form action="">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @search="getResult"
        @cancel="onCancel"
        @clear="isResult = false"
        @focus="isResult = false"
      />
    </form>
    <!-- 搜索结果 -->
    <search-result v-if="isResult" :suggestionVal="value"></search-result>
    <!-- 搜索建议 -->
    <search-suggestion
      :sugVal="value"
      v-else-if="value.trim()"
      @getResult="getResult"
    ></search-suggestion>
    <!-- 搜索历史 -->
    <search-history
      :searchArr="searchArr"
      v-else
      @del-search-arr="searchArr = []"
      @del-one-history="delOneHistory"
      @get-history="getResult"
    ></search-history>
  </div>
</template>

<script>
import searchHistory from './searchHistory'
import searchSuggestion from './searchSuggestion'
import searchResult from './searchResult'

export default {
  data () {
    return {
      value: '',
      isResult: false,
      searchArr: JSON.parse(window.localStorage.getItem('searchArr')) || []
    }
  },
  methods: {
    // 删除一条历史记录
    delOneHistory (val) {
      const index = this.searchArr.findIndex(v => v === val)
      this.searchArr.splice(index, 1)
    },
    getResult (q) {
      const index = this.searchArr.findIndex(v => v === q)
      if (index !== -1) {
        this.searchArr.splice(index, 1)
      }
      this.searchArr.push(q)
      // 数组去重，保证没有重复的
      this.searchArr = [...new Set(this.searchArr)]
      this.value = q
      this.isResult = true
    },

    onCancel () {
      this.$router.push('/home')
    }
  },
  components: {
    SearchHistory: searchHistory,
    searchSuggestion,
    searchResult
  },
  watch: {
    searchArr (val) {
      window.localStorage.setItem('searchArr', JSON.stringify(this.searchArr))
    }
  }
}
</script>

<style lang="scss" scoped>
.van-search {
  background: #3296fa;
}
.van-search__action {
  color: #ffffff;
}
.van-search__action:active {
  background-color: unset;
}
</style>
