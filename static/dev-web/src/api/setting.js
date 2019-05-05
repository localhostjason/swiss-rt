import request from '@/utils/request'


export function getSetting(params = {}, embedded = {}, sorts = '') {
  return request({
    url: `/setting?where=${JSON.stringify(params)}&embedded=${JSON.stringify(embedded)}&sort=${sorts}`,
    method: 'get',
  })
}


export function updateSetting(id, data) {
  return request({
    url: `/setting/${id}`,
    method: 'patch',
    data
  })
}

export function createSetting(data) {
  return request({
    url: `/setting`,
    method: 'post',
    data
  })
}


export function deleteSetting(id) {
  return request({
    url: `/setting/${id}`,
    method: 'delete',
  })
}

