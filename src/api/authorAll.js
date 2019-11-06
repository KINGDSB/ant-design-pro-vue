import api from './authorAll'
import { axios } from '@/utils/request'
/** 查询所有审批日记信息 */
export function authorAll (parameter) {
    return axios({
      url: '/author/authorAllLog',
      method: 'post',
      data: parameter
    })
  }
  /**申请审批 同意auditStatus返回01  */
  export function authorize (parameter) {
    return axios({
      url: 'author/audit',
      method: 'post',
      data: parameter
    })
  }
  