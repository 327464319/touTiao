export const commentModules = {
  namespaced: true,
  state: {
    show: false,
    isComemntByCommentPopShow: false,
    comemntByComment: {},
    // 正在写的评论
    comment: {},
    articleId: '',
    rePlyCount: 0

  },
  mutations: {
    showReply (state, comment) {
      if (!state.show) {
        state.show = true
        state.comment = comment
      } else {
        state.isComemntByCommentPopShow = true
        state.comemntByComment = comment
      }
    },
    hideReply (state) {
      state.show = false
    },
    setArticleId (state, articleId) {
      state.articleId = articleId
    },
    addCommentReply (state) {
      if (state.comment.com_id) {
        state.comment.reply_count++
      }
    },
    changeReplyLiking (state, event) {
      if (state.comment.com_id) {
        state.comment.is_liking = event[0]
        state.comment.like_count = event[1]
      }
    },
    setcombycomShow (state, val) {
      state.isComemntByCommentPopShow = val
    }
  },
  actions: {

  },
  getters: {

  }

}
