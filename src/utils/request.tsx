import { extend } from "umi-request";
import { message } from 'antd'

//状态码文本
const codeMessage = {
  200: '（成功）服务器已成功处理了请求。',
  201: '（已创建）请求成功并且服务器创建了新的资源。',
  204: '（无内容）服务器成功处理了请求，但没有返回任何内容。',
  301: '（永久移动）请求的网页已永久移动到新位置。',
  302: '（临时移动）服务器目前从不同的位置响应请求。',
  400: '（错误请求）服务器不理解请求的语法。',
  401: '（未授权）请求要求身份验证。',
  403: '（禁止）无权限, 服务器拒绝请求。',
  404: '（未找到） 服务器找不到请求的资源',
  408: '（超时） 请求超时',
  422: '（验证错误） 请求参数未通过验证',
  429: '（被限制）请求次数过多',
  500: '（服务器内部错误） 服务器遇到错误，无法完成请求。',
  501: '（尚未实施） 服务器不具备完成请求的功能。',
  502: '（错误网关） 服务器作为网关或代理，从上游服务器收到无效响应。',
  503: '（服务不可用） 服务器目前无法使用（由于超载或停机维护）。 通常，这只是暂时状态。',
  504: '（网关超时） 服务器作为网关或代理，但是没有及时从上游服务器收到请求。',
  505: '(HTTP 版本不受支持) 服务器不支持请求中所用的 HTTP 协议版本。',
}

//异常报错处理
const errorHandler = async (error) => {

  const { response } = error

  if (response && response.status) {
    const res = await response.json()
    const { status } = response
    let errText = codeMessage[status] || response.statusText
    if (status == 422) {
      let errs = ''
      for (const key in res.errors) {
        errs += res.errors[key][0]
      }
      errText += `[ ${errs} ]`
    }

    if (status == 400) {
      errText += `[ ${res.message} ]`
    }
    message.error(errText)
  } else if (!response) {
    message.error('您的网络异常，无法链接服务器')
  }

  return response
}

//继承umi的request方法，并设置配置
const request = extend({
  errorHandler,
  credentials: 'include'    请求是否带上cookie
  // prefix ：'/api' API请求的url前默认添加头部
});


//添加请求拦截器，在发出请求前会先进入到这里
request.interceptors.request.use((url, options) => {

  const token = 'hello'

  const headers = {
    Authorization: `Bearer ${token} `
  }

  return {
    url,
    options: { ...options, headers }
  }
},)

export default request


