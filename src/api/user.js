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
