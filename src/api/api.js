import request from '@/api/fetch'

export function getHome(data) {
  // 首页接口
  return request({
    url: 'index/index',
    method: 'get',
    params: data
  })
}

export function getBP(data) {
  // 获取项目列表
  return request({
    url: 'bp/index',
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

export function investorList(data) {
  // 获取投资方列表
  return request({
    url: 'investor/index',
    method: 'get',
    params: data
  })
}

export function investorDetails(data) {
  // 获取投资方详情
  return request({
    url: 'investor/info',
    method: 'get',
    params: data
  })
}

export function getNews(data) {
  // 发现新闻列表
  return request({
    url: 'news/getNews',
    method: 'get',
    params: data
  })
}

export function findDetails(data) {
  // 发现详情
  return request({
    url: 'news/info',
    method: 'get',
    params: data
  })
}

export function newInc(data) {
  // 增加浏览
  return request({
    url: 'news/newInc',
    method: 'post',
    data
  })
}

export function getList(data) {
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


