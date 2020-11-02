<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      :placeholder="
        '@' + comemntByComment.aut_name + ':' + comemntByComment.content
      "
      show-word-limit
    />
    <van-button
      class="post-btn"
      :disabled="!message.trim().length"
      @click="commentSubmit"
      >发布</van-button
    >
  </div>
</template>

<script>
import { setComment } from '@/api/comment.js'
import { mapState } from 'vuex'

export default {
  name: 'CommentPost',
  components: {},

  data () {
    return {
      message: ''
    }
  },
  computed: {
    ...mapState('commentModules', ['comemntByComment', 'comment', 'articleId'])
  },
  watch: {},
  created () {
    console.log(this.comemntByComment)
  },
  mounted () {},

  methods: {
    close () {
      this.$emit('closeCommentPop')
    },
    async commentSubmit () {
      // target integer 必须 评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）
      // content string 必须 评论内容
      // art_id integer 非必须 文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数。
      try {
        const { data: res } = await setComment({
          target: this.comment.com_id,
          content: this.message + '/@' + this.comemntByComment.aut_name + ':' + this.comemntByComment.content,
          art_id: this.articleId

        })

        this.$toast.success('发布成功！')
        this.message = ''

        if (res) {
          this.$emit('addOneComment', res.data)
        }
      } catch (e) {
        if (e.response.status === 401) {
          this.$toast.fail('请登录后再评论')
        } else {
          this.$toast.fail('评论失败！')
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>
