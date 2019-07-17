import request from '@/utils/request'


export function getFood({argsQuery = {}, pageQuery = {}} = {}, embedded = {}, sorts = '') {
  return request({
    url: `/food?where=${JSON.stringify(argsQuery)}&embedded=${JSON.stringify(embedded)}&sort=${sorts}`,
    method: 'get',
    params: pageQuery
  })
}

export function getFoodInfo(uid) {
  return request({
    url: `/food/${uid}`,
    method: 'get',
  })
}


export function createFood(data) {
  return request({
    url: '/food',
    method: 'post',
    data
  })
}


export function deleteFoodInfo(uid) {
  return request({
    url: '/food/' + uid,
    method: 'delete'
  })
}

export function deleteFood(params) {
  return request({
    url: `/food?where=${JSON.stringify(params)}`,
    method: 'delete',
  })
}

export function updateFood(uid, data) {
  return request({
    url: `/food/${uid}`,
    method: 'patch',
    data
  })
}
