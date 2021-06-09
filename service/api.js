import request from './network.js'
// 登录，获取token
export function MINI_PROGRAMMER(password) {
  return request({
    url: '/api/login/MINI_PROGRAMMER',
    method:'post',
    data:{
     password
    }
  })
} 
// 获取抢单列表
export function getOrderListGrab(data) {
  return request({
    url: '/api/order/getOrderListGrab',
    data:data
  })
} 
// 抢单-洗车侠
export function grabOrder(orderId) {
  return request({
    url: '/api/order/grabOrder/'+orderId,
    method:'post'
  })
} 
//收益明细-订单数-总收益
export function getEarningCount() {
  return request({
    url: '/api/washer/getEarningCount'
  })
} 
//收益明细-列表-洗车侠
export function getEarningList() {
  return request({
    url: '/api/washer/getEarningList'
  })
} 
// 获取汽车车型字典
export function getCarTypeList() {
  return request({
    url: '/api/home/getCarTypeList'
  })
} 
// 洗车侠登录-账号密码
export function USERNAME(data) {
  return request({
    url: '/api/login/USERNAME',
    method:'post',
    data:data
  })
} 

//订单列表
export function getOrderList(data) {
  return request({
    url: '/api/washer/getOrderList',
    data:data
  })
} 
//洗车侠取消订单
export function cancelOrderUser(orderNumber) {
  return request({
    url: '/api/order/cancelOrderWasher/'+orderNumber,
    method:'post'
  })
} 
//开始洗车-洗车侠
export function beginWash(data) {
  return request({
    url: '/api/order/beginWash',
    method:'post',
    data:data
  })
} 
//结束洗车-洗车侠
export function finishWash(data) {
  return request({
    url: '/api/order/finishWash',
    method:'post',
    data:data
  })
} 
//上传位置信息
export function addWasherLocation(data) {
  return request({
    url: '/api/home/addWasherLocation',
    method:'post',
    data:data
  })
} 
//获取用户信息
export function getCarInfo(orderId) {
  return request({
    url: '/api/order/getCarInfo/'+orderId
  })
} 
//更改密码
export function updatePasswordWasher(data) {
  return request({
    url: '/api/updatePasswordWasher',
    method:'post',
    data:data
  })
} 
//基本信息修改
export function saveUserWasher(data) {
  return request({
    url: '/api/washer/saveUserWasher',
    method:'post',
    data:data
  })
} 
//基本信息获取
export function getUserWasher() {
  return request({
    url: '/api/getUserWasher'
  })
} 
// 车辆信息-车辆信息列表
export function getCarList() {
  return request({
    url: '/api/car/getCarList'
  })
} 
// 获取钥匙
export function openDoorWasher(orderId) {
  return request({
    url:  '/api/order/openDoorWasher/'+orderId,
    method:'post'
  })
} 
//评价-列表-洗车侠
export function getEvaluateList() {
  return request({
    url:  '/api/washer/getEvaluateList'
  })
} 
//绑定微信号
export function bindWechat(data) {
  return request({
    url:  '/api/washer/bindWechat',
    data:data,
    method:'post'
  })
} 

