import api from './addApplyof'
import { axios } from '@/utils/request'

export function addApplyof (parameter) {
    return axios({
      url: '/auth/addApplyof',
      method: 'post',
      data: parameter
    })
  }