import request from '@/api/fetch'

export function getHome(data) {
  // 首页接口
  return request({
    url: 'index/index',
    method: 'get',
    params: data
  })
}
export function sendSms(data) {
  // 获取验证码
  return request({
    url: 'user/sendSms',
    method: 'post',
    data
  })
}

export function getArea(data) {
  // 获取省市
  return request({
    url: 'config/getRegion',
    method: 'get',
    params: data
  })
}


export function getNews(data) {
  // 活动列表
  return request({
    url: 'news/index',
    method: 'get',
    params: data
  })
}

export function getSignPackage(data) {
  // 获取微信签名
  return request({
    url: 'index/getSignPackage',
    method: 'get',
    params: data
  })
}

export function geturl(data) {
//获取链接
  return request({
    url: 'login/get_code_url',
    method: 'get',
    params: data
  })
}

export function getlogin(data) {
//登录
  return request({
    url: 'login/login',
    method: 'get',
    params: data
  })
}


export function saveData(data) {
  // 注册提交
  return request({
    url: 'user/edit',
    method: 'post',
    data
  })
}


