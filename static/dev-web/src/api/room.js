import request from '@/utils/request'


export function getRoom(params = {}, embedded = {}, sorts = '') {
  return request({
    url: `/room?where=${JSON.stringify(params)}&embedded=${JSON.stringify(embedded)}&sort=${sorts}`,
    method: 'get',
  })
}



