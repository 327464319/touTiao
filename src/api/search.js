import requst from '../utils/request'
export const getSuggestion = (q) => requst.get('/app/v1_0/suggestion', { params: { q } })
export const getResults = (obj) => requst.get('/app/v1_0/search', { params: obj })
