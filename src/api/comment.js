import request from '../utils/request'
export const getComments = (queryInfo) => request.get('/app/v1_0/comments', { params: queryInfo })
// 对文章点赞
export const cancelLiking = (target) => request.delete(`/app/v1_0/comment/likings/${target}`)
export const goLiking = (target) => request.post('/app/v1_0/comment/likings', { target })
// 评论

export const setComment = (target) => request.post('/app/v1_0/comments', target)
