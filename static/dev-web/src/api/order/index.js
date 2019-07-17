import request from '@/utils/request'


export function getOrder({argsQuery = {}, pageQuery= {}}= {}, embedded = {}, sorts = '') {
  return request({
    url: `/order?where=${JSON.stringify(argsQuery)}&embedded=${JSON.stringify(embedded)}&sort=${sorts}`,
    method: 'get',
    params: pageQuery
  })
}

export function getOrderInfo(uid) {
  return request({
    url: `/order/${uid}`,
    method: 'get',
  })
}


export function createOrder(data) {
  return request({
    url: '/order',
    method: 'post',
    data
  })
}


export function deleteOrderInfo(uid) {
  return request({
    url: '/order/' + uid,
    method: 'delete'
  })
}

export function deleteOrder(params) {
  return request({
    url: `/order?where=${JSON.stringify(params)}`,
    method: 'delete',
  })
}

export function updateOrder(uid, data) {
  return request({
    url: `/order/${uid}`,
    method: 'patch',
    data
  })
}
