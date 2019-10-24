import { axios } from '@/utils/request'

/**
 * get user 2step code open?
 * @param parameter {*}
 */
export function testApi (parameter) {
  return axios({
    url: '/test',
    method: 'get',
    data: parameter
  })
}
