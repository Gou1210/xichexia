import {
  baseURL,
  timeout
} from './config.js'
let app = getApp();

console.log(wx.getStorageSync('TOKEN'))
function request(options) {
  // wx.showLoading({
  //   title: '数据加载中',
  // })

  return new Promise((resolve, reject) => {
    const AuthorizationApi = wx.getStorageSync('TOKEN') || ''
    wx.request({
      url: baseURL + options.url,
      timeout: timeout,
      data: options.data,
      header: {
        AuthorizationApi: AuthorizationApi
      },
      method: options.method,
      success: function (res) {
        if (res.data.code == 401) {
          wx.showToast({
            title: '请您登录',
            icon: 'none',
            mask: true
          })
        }else{
          resolve(res.data)
        }
      },
      fail: reject,
      complete: res => {
        // wx.hideLoading()
      }
    })
  })
}

export default request;