import request from '@/utils/request'


export function getContact(uid) {
  return request({
    url: `/contact/${uid}`,
    method: 'get',
  })
}


export function updateContact(uid, data) {
  return request({
    url: `/user/${uid}`,
    method: 'patch',
    data
  })
}
