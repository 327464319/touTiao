<template>
  <van-button
    :class="iscollect ? 'active' : ''"
    :icon="iscollect ? 'star' : 'star-o'"
    @click="collectToggle"
    :loading="loading"
  />
</template>

<script>
import { goCollect, cancelCollect } from '../../api/user'
export default {
  data () {
    return {
      loading: false
    }
  },
  model: {
    prop: 'iscollect',
    event: 'change'
  },
  props: {
    iscollect: {
      type: Boolean,
      required: true

    },
    followed_id: {
      type: [String, Number, Object],
      required: true
    }
  },
  methods: {
    async collectToggle () {
      try {
        this.loading = true
        if (this.iscollect) {
          await cancelCollect(this.followed_id)
          this.$toast.success('取消收藏!')
          this.$emit('change', !this.iscollect)
        } else {
          await goCollect(this.followed_id)
          this.$toast.success('收藏成功!')
          this.$emit('change', !this.iscollect)
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
  color: orange !important;
}
.van-button--default {
  border: 0;
}
</style>
