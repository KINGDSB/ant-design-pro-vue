import { axios } from '@/utils/request'

/**
 * get user 2step code open?
 * @param parameter {*}
 */
export function pageList (parameter) {
  return axios({
    url: '/project/pageList',
    method: 'get',
    data: parameter
  })
}
