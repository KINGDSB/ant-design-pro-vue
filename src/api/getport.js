import api from './getport'
import { axios } from '@/utils/request'

export function getPort (parameter) {
    return axios({
      url: '/auth/getPort',
      method: 'post',
      data: parameter
    })
  }