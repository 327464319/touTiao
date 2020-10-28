import requst from '../utils/request'
export const getArticle = (obj) => requst.get('/app/v1_1/articles', { params: obj })
