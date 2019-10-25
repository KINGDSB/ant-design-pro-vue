import api from './register'
import { axios } from '@/utils/request'

export function register (parameter) {
    return axios({
      url: '/auth/register',
      method: 'post',
      data: parameter
    })
  }