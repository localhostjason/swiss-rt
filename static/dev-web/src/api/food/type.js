import request from '@/utils/request'


export function getFoodType({argsQuery = {}, pageQuery = {}} = {}, embedded = {}, sorts = '') {
  return request({
    url: `/food_type?where=${JSON.stringify(argsQuery)}&embedded=${JSON.stringify(embedded)}&sort=${sorts}`,
    method: 'get',
    params: pageQuery
  })
}

export function getFoodTypeInfo(uid) {
  return request({
    url: `/food_type/${uid}`,
    method: 'get',
  })
}


export function createFoodType(data) {
  return request({
    url: '/food_type',
    method: 'post',
    data
  })
}


export function deleteFoodTypeInfo(uid) {
  return request({
    url: '/food_type/' + uid,
    method: 'delete'
  })
}

export function deleteFoodType(params) {
  return request({
    url: `/food_type?where=${JSON.stringify(params)}`,
    method: 'delete',
  })
}

export function updateFoodType(uid, data) {
  return request({
    url: `/food_type/${uid}`,
    method: 'patch',
    data
  })
}
