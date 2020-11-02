<template>
  <div>
    <my-comment
      @changeLiking="changeLiking($event, comment)"
      :comment="comment"
      :canPinglun="false"
    ></my-comment>

    <van-cell title="全部评论"></van-cell>
    <comment-list
      :artId="comment.com_id"
      :newOneComment="newOneComment"
      type="c"
    ></comment-list>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import MyComment from './comment'
import CommentList from './comment-list'
export default {
  name: 'comment-reply',
  props: {

    newOneComment: { type: Object }
  },
  components: {
    MyComment,
    CommentList
  },
  computed: {
    ...mapState('commentModules', ['comment'])
  },
  created () {

  },
  methods: {
    ...mapMutations('commentModules', ['changeReplyLiking']),
    // changeLiking (event, item) {
    //   // console.log(item)
    //   // window.console.log(event)
    //   item.is_liking = event[0]
    //   item.like_count = event[1]
    // },
    changeLiking (event) {
      this.changeReplyLiking(event)
      // item.is_liking = event[0]
      // item.like_count = event[1]
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
