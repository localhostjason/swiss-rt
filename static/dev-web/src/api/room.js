import request from '@/utils/request'


export function getRoom(params = {}, embedded = {}, sorts = '') {
  return request({
    url: `/room?where=${JSON.stringify(params)}&embedded=${JSON.stringify(embedded)}&sort=${sorts}`,
    method: 'get',
  })
}


export function updateRoom(id, data) {
  return request({
    url: `/room/${id}`,
    method: 'patch',
    data
  })
}

export function createRoom(data) {
  return request({
    url: `/room`,
    method: 'post',
    data
  })
}


export function deleteRoom(id) {
  return request({
    url: `/room/${id}`,
    method: 'delete',
  })
}

