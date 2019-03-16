import api from '@/utils/api'

export function getInfo(token) {
  return api({
    url: this.GLOBAL.host + '/user/getInfo',
    method: 'get',
    params: {token}
  })
}


