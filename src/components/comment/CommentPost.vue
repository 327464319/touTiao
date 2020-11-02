<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button
      class="post-btn"
      @click="commentSubmit"
      :disabled="!message.trim().length"
      >发布</van-button
    >
  </div>
</template>

<script>
import { setComment } from '@/api/comment.js'
export default {
  name: 'CommentPost',
  components: {},
  props: {
    artId: {
      type: [Object, String, Number],
      required: true
    },
    artIdfromReply: {
      type: [Object, String, Number]

    }
  },
  data () {
    return {
      message: ''
    }
  },
  computed: {},
  watch: {},
  created () {},
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
          target: this.artId,
          content: this.message,
          art_id: this.artIdfromReply || null

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
