import request from '@/utils/request'


export function getNews({argsQuery = {}, pageQuery = {}} = {}, embedded_args = {}, sorts = '') {
  return request({
    url: `/news?where=${JSON.stringify(argsQuery)}&embedded=${JSON.stringify(embedded_args)}&sort=${sorts}`,
    method: 'get',
    params: pageQuery
  })
}

export function getNewsInfo(uid) {
  return request({
    url: `/news/${uid}`,
    method: 'get',
  })
}


export function createNews(data) {
  return request({
    url: '/news',
    method: 'post',
    data
  })
}


export function deleteNewsInfo(uid) {
  return request({
    url: '/news/' + uid,
    method: 'delete'
  })
}

export function deleteNews(params) {
  return request({
    url: `/news?where=${JSON.stringify(params)}`,
    method: 'delete',
  })
}

export function updateNews(uid, data) {
  return request({
    url: `/news/${uid}`,
    method: 'patch',
    data
  })
}
