import ApiRequest from '@/utils/request'

export default {
  fetch(params) {
    return ApiRequest({
      method: 'get',
      url: '/messages',
      params: params
    })
  },
  create(data) {
    return ApiRequest({
      method: 'post',
      url: '/messages',
      data
    })
  }
  // update(id, data) {
  //   return ApiRequest({
  //     method: 'patch',
  //     url: `/messages-chains/${id}`,
  //     data: { ...data }
  //   })
  // }

  // delete(id) {
  //   return ApiRequest({
  //     method: 'delete',
  //     url: `/messages-chains/${id}`
  //   })
  // }
}
