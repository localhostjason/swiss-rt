import request from "@/utils/request";

export function getPicture(params = {}, embedded = {}, sorts = '') {
  return request({
    url: `/picture?where=${JSON.stringify(params)}&embedded=${JSON.stringify(embedded)}&sort=${sorts}`,
    method: 'get',
  })
}
