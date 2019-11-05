import api from './applyofAll'
import { axios } from '@/utils/request'

export function applyofAll (parameter) {
    return axios({
      url: '/applyof/applyofAll',
      method: 'post',
      data: parameter
    })
  }