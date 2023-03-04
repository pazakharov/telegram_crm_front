import ApiRequest from '@/utils/request'

export default {
  fetch(params) {
    return ApiRequest({
      method: 'get',
      url: '/messages-chains',
      params: { ...params }
    })
  },
  update(id, data) {
    return ApiRequest({
      method: 'patch',
      url: `/messages-chains/${id}`,
      data: { ...data }
    })
  },
  create(params) {
    return ApiRequest({
      method: 'post',
      url: '/messages-chains',
      params: {}
    })
  },
  delete(id) {
    return ApiRequest({
      method: 'delete',
      url: `/messages-chains/${id}`
    })
  }
}
