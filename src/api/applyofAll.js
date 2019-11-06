import api from './applyofAll'
import { axios } from '@/utils/request'
/**
 * 查询所有申请信息
 * @param {*} parameter 
 */
export function applyofAll (parameter) {
    return axios({
      url: '/applyof/applyofAll',
      method: 'post',
      data: parameter
    })
  }
 /**
  * 新增申请
  */ 
  export function addApplyof (parameter) {
    return axios({
      url: '/auth/addApplyof',
      method: 'post',
      data: parameter
    })
  }
  /**
   *申请详情
   * @param {} parameter 
   */
  export function applyofDetail (parameter) {
    return axios({
      url: '/auth/applyofDetail',
      method: 'post',
      data: parameter
    })
  }