import api from './applyof'
import { axios } from '@/utils/request'

export function applyof (parameter) {
    return axios({
      url: '/auth/applyof',
      method: 'post',
      data: parameter
    })
  }