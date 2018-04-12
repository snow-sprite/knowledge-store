import axios from 'axios'
import qs from 'querystring'
let baseURL = window.JINSECONFIG.apiDomain

/**
 * 设置web的axios
 */
let webAxios = axios.create({
  baseURL: baseURL,
  timeout: 60000,
  validateStatus: (status) => {
    return status >= 200 && status < 300
  },
  responseType: 'json'
})

/**
 * 设置api的axios
 */
let apiAxios = axios.create({
  baseURL: baseURL,
  timeout: 60000,
  headers: {},
  validateStatus: (status) => {
    return status >= 200 && status < 300
  },
  responseType: 'json',
  // 带上cookie参数
  withCredentials: true
})

/**
 * formatApiResponse
 * 格式Web的返回结果
 */
let formatWebResponse = (promiseObj) => {
  return new Promise((resolve, reject) => {
    promiseObj
      .then((result) => {
        // 判断code信息
        let rebuildResult = result.data
        if (rebuildResult.code !== 0) {
          reject(rebuildResult.msg)
        } else {
          resolve(rebuildResult.data)
        }
      })
      .catch((errorResult) => {
        // 判断异常结果信息
        let status, errorData, response
        try {
          response = errorResult.response
          errorData = response.statusText
          status = response.status
          errorData = JSON.parse(errorData)
        } catch (e) {
          status = 500
        }

        // 打印错误的log信息
        console.log(errorResult)

        let errorMessage = ''
        if (status >= 500) {
          errorMessage = '服务器暂时无法响应您的请求，请稍后再试'
        } else if (status === 401) {
          errorMessage = errorData.message
        } else if (status === 402) {
          errorMessage = '您无权限访问该页面'
        } else if (status === 403) {
          errorMessage = errorData.message
        } else if (status === 404) {
          errorMessage = '没有找到该链接'
        } else {
          errorMessage = '服务器无法连接，请稍后再试'
        }

        reject(errorMessage)
      })
  })
}

/**
 * formatApiResponse
 * 格式Api的返回结果
 */
let formatApiResponse = (promiseObj) => {
  return new Promise((resolve, reject) => {
    promiseObj
      .then((result) => {
        // 判断code信息
        let rebuildResult = result.data
        resolve(rebuildResult)
      })
      .catch((errorResult) => {
        // 判断异常结果信息
        let status, errorData, response
        try {
          response = errorResult.response
          errorData = response.data
          status = response.status
        } catch (e) {
          status = 500
        }

        // 打印错误的log信息
        console.log(errorResult)

        let rebuildErrorData = {
          status_code: 1000,
          message: ''
        }
        if (status >= 500) {
          rebuildErrorData.message = '服务器暂时无法响应您的请求，请稍后再试'
        } else if (status === 409) {
          rebuildErrorData.status_code = errorData.status_code
          rebuildErrorData.message = errorData.message
        } else {
          rebuildErrorData.message = '服务器无法连接，请稍后再试'
        }

        reject(rebuildErrorData)
      })
  })
}

/**
 * 设置web请求
 */
export const webRequest = {
  get (url, config) {
    return formatWebResponse(webAxios.get(url, config))
  },
  post (url, data) {
    return formatWebResponse(webAxios.post(url, data))
  }
}

/**
 * 设置api请求
 */
export const apiRequest = {
  get (url, params) {
    var config = {
      params
    }
    return formatApiResponse(apiAxios.get(url, config))
  },
  post (url, data) {
    return formatApiResponse(apiAxios.post(url, qs.stringify(data)))
  },
  counterfeit (data, status = 'success', timing = 500) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (status === 'success') {
          resolve(data)
        } else {
          reject(data)
        }
      }, timing)
    })
  }
}

export default axios
