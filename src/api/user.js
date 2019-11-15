import api from './user'
import { axios } from '@/utils/request'

export function getUser (parameter) {
    return axios({
      url: '/auth/register',
      method: 'post',
      data: parameter
    })
  }