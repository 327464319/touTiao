import requst from '../utils/request'
export const getArticle = (obj) => requst.get('/app/v1_1/articles', { params: obj })
export const getArticleDatil = (id) => requst.get(`/app/v1_0/articles/${id}`)
