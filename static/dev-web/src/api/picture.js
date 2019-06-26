import request from "@/utils/request";

export function getPicture(params = {}, embedded = {}, sorts = '') {
  return request({
    url: `/picture?where=${JSON.stringify(params)}&embedded=${JSON.stringify(embedded)}&sort=${sorts}`,
    method: 'get',
  })
}


export function deletePicture(id) {
  return request({
    url: `/picture/${id}`,
    method: 'delete'
  })
}


export function updatePicture(id, data) {
  return request({
    url: `/picture/${id}`,
    method: 'patch',
    data
  })
}
