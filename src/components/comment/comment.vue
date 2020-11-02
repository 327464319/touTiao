<template>
  <van-cell>
    <van-image
      slot="icon"
      round
      width="30"
      height="30"
      style="margin-right: 10px"
      :src="comment.aut_photo"
    />
    <span style="color: #466b9d" slot="title">{{ comment.aut_name }}</span>
    <div slot="label">
      <p style="color: #363636">{{ comment.content }}</p>
      <p>
        <span style="margin-right: 10px">{{ comment.pubdate | format }}</span>
        <van-button
          size="mini"
          type="default"
          @click="showReply(comment)"
          class="replyComment"
          round
          v-if="canPinglun"
          >回复
          <span v-if="!commentBycommentPopShow">{{
            comment.reply_count
          }}</span></van-button
        >
      </p>
    </div>

    <van-button
      @click="setLiking(comment.com_id)"
      slot="right-icon"
      :loading="loading"
      :icon="comment.is_liking ? 'good-job' : 'good-job-o'"
      :class="comment.is_liking ? 'active' : ''"
    >
      {{ comment.like_count || "赞" }}</van-button
    >
  </van-cell>
</template>

<script>

import { cancelLiking, goLiking } from '@/api/comment.js'
import { mapMutations } from 'vuex'

export default {
  name: 'MyComment',
  props: {
    comment: {
      type: Object,
      required: true
    },
    canPinglun: {
      type: Boolean,
      default: function (val) {
        if (!val) { return true } else {
          return false
        }
      }
    }
  },
  components: {

  },
  data () {
    return {
      loading: false,
      // 回复层显示
      show: false

    }
  },
  computed: {
    // 评论的评论的弹出层如果存在，里面的评论应该没有评论条数
    commentBycommentPopShow: function () {
      return this.$store.state.commentModules.show
    }

  },
  created () {

  },
  methods: {
    ...mapMutations('commentModules', ['showReply']),

    async setLiking (id) {
      this.loading = true
      try {
        if (this.comment.is_liking) {
          await cancelLiking(id)
          // 通知父组件修改数据
          this.$emit('changeLiking', [!this.comment.is_liking, --this.comment.like_count])
        } else {
          await goLiking(id)
          this.$emit('changeLiking', [!this.comment.is_liking, ++this.comment.like_count])
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
.van-button--default {
  border: 0;
  font-size: 26px;
}
.active {
  color: #e5645f !important;
}
.replyComment {
  border: 2px solid #ebedf0;
  padding: 0 0.4rem;
  height: 0.64rem;
  line-height: 0.64rem;
  font-size: 0.28rem;
  color: #222;
}
</style>
