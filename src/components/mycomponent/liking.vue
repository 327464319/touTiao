<template>
  <!-- <van-icon color="#777" name="good-job-o" /> -->
  <van-button
    :class="value === 1 ? 'active' : ''"
    :icon="value === 1 ? 'good-job' : 'good-job-o'"
    @click="likingToggle"
    :loading="loading"
  />
</template>

<script>
import { goLiking, cancelLiking } from '../../api/user'
export default {
  data () {
    return {
      loading: false
    }
  },
  props: {
    value: {
      type: [String, Number],
      required: true

    },
    followed_id: {
      type: [String, Number, Object],
      required: true
    }
  },
  methods: {
    async likingToggle () {
      try {
        this.loading = true
        console.log(this.followed_id)
        if (this.value === 1) {
          await cancelLiking(this.followed_id)
          this.$toast.success('取消点赞!')
          this.$emit('input', -1)
        } else {
          await goLiking(this.followed_id)
          this.$toast.success('点赞成功!')
          this.$emit('input', 1)
        }
      } catch (e) {
        this.$toast.fail('操作失败！')
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.active {
  color: #e5645f !important;
}
.van-button--default {
  border: 0;
}
</style>
