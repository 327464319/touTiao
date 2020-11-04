import request from '../utils/request'
export const login = (data) => request.post('/app/v1_0/authorizations', data)
export const getSmsCode = mobile => request.get(`/app/v1_0/sms/codes/${mobile}`)
export const getUser = () => request.get('/app/v1_0/user')
export const getChannels = () => request.get('/app/v1_0/user/channels')
// 全部频道列表
export const getAllChannels = (obj) => request.get('/app/v1_0/channels')
// 部分修改用户频道.patch('/app/v1_0/user/channels', [channel])
export const patchMyChannels = (channels) => request({
  method: 'PATCH',
  url: '/app/v1_0/user/channels',
  data: { channels }

})
export const delMyChannel = (id) => request.delete(`/app/v1_0/user/channels/${id}`)
// 关注
export const goFollow = (id) => request.post('/app/v1_0/user/followings', { target: id })
export const cancelFollow = (id) => request.delete(`/app/v1_0/user/followings/${id}`)
// 收藏
export const goCollect = (id) => request.post('/app/v1_0/article/collections', { target: id })
export const cancelCollect = (id) => request.delete(`/app/v1_0/article/collections/${id}`)
// 点赞
export const cancelLiking = (target) => request.post('/app/v1_0/article/dislikes', { target })
export const goLiking = (target) => request.post('/app/v1_0/article/likings', { target })
// 获取用户个人资料
export const getUserInfo = () => request.get('/app/v1_0/user/profile')
export const setUserInfo = userInfo => request.patch('/app/v1_0/user/profile', userInfo)
export const setUserPhoto = formData => request.patch('/app/v1_0/user/photo', formData)
