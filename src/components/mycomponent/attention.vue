<template>
  <van-button
    round
    size="small"
    icon="plus"
    type="info"
    v-if="!is_followed"
    @click="followToggel"
    :loading="loading"
    >关注</van-button
  >
  <van-button
    round
    size="small"
    :loading="loading"
    type="default"
    v-else
    @click="followToggel"
    >已关注</van-button
  >
</template>

<script>
import { goFollow, cancelFollow } from '../../api/user'
export default {
  props: ['is_followed', 'followed_id'],
  data () {
    return {
      loading: false
    }
  },
  methods: {
    async followToggel () {
      console.log(this.followed_id)
      if (this.is_followed) {
        try {
          this.loading = true
          await cancelFollow(this.followed_id)
          this.$emit('setIsFollowed', !this.is_followed)
        } catch (e) {
          this.$toast.fail('取消关注失败！')
        }
      } else {
        try {
          this.loading = true
          await goFollow(this.followed_id)
          this.$emit('setIsFollowed', !this.is_followed)
        } catch (e) {
          console.log(e, e.response)
          if (e.response.status === 400) { this.$toast.fail('你不能关注自己！') } else { this.$toast.fail('关注失败！') }
        }
      }
      this.loading = false
    }
  }

}
</script>

<style lang="scss" scoped>
</style>
