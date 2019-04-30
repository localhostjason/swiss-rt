import request from '@/utils/request'


export function getContact(uid) {
  return request({
    url: `/contact/${uid}`,
    method: 'get',
  })
}


export function updateContact(id, data) {
  return request({
    url: `/contact/${id}`,
    method: 'patch',
    data
  })
}


export function getStory(params = {}) {
  return request({
    url: `/story?where=${JSON.stringify(params)}`,
    method: 'get',
  })
}


export function updateStory(id, data) {
  return request({
    url: `/story/${id}`,
    method: 'patch',
    data
  })
}

export function createStory(data) {
  return request({
    url: `/story`,
    method: 'post',
    data
  })
}


export function deleteStory(id) {
  return request({
    url: `/story/${id}`,
    method: 'delete',
  })
}
