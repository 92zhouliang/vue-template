import { useFetch, createFetch } from '@vueuse/core'
import { isString } from 'lodash-es'
import qs from 'qs'

import type { UseFetchOptions } from '@vueuse/core'
import type { IFetchParams } from '@/types/http'

type Intance = typeof useFetch
class Fetch {
  instance: Intance
  constructor() {
    this.instance = createFetch({
      baseUrl: '',

      options: {
        beforeFetch({ options, cancel }) {
          //追加认证
          return { options }
        },
        afterFetch({ data, response }) {
          return { data, response }
        },
        // deal network error
        onFetchError({ error }) {
          return { error }
        }
      },
      fetchOptions: {}
    })
  }

  public get({ url: _url, data, ...options }: IFetchParams) {
    const timestamp = new Date().getTime()
    if (data) {
      _url = `${_url}?${qs.stringify(data)}&_t=${timestamp}`
    } else {
      _url += `?_t=${timestamp}`
    }
    return this.instance(_url, options).get().json()
  }
  public post({ url, data: body, ...options }: IFetchParams) {
    return this.instance(url, { ...options, body })
      .post()
      .json()
  }
  //deal stream file
  //
}

export const http = new Fetch()
