import api from './authorAll'
import { axios } from '@/utils/request'

export function authorAll (parameter) {
    return axios({
      url: '/author/selectAllAuthor',
      method: 'post',
      data: parameter
    })
  }