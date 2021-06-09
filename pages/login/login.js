import {
  USERNAME,
  getUserWasher,
  bindWechat
} from '../../service/api.js'
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  formSubmit(e) {
    // wx.clearStorageSync('TOKEN')
    const username = e.detail.value.username
    const password = e.detail.value.password
    console.log(e.detail.value.username)
    const data = {
      username: username,
      password: password
    }
    USERNAME(data).then(res => {
      if (res.code == 200) {
        app.globalData.token = res.data
        wx.setStorageSync('TOKEN', res.data)
        //  app.globalData.userInfo.password = data.password
        return (res.data)
      }
    }).then((token) => {
      getUserWasher().then(res => {
        wx.setStorageSync('USERINFO', res.data)
        return (token)
      }).then((token) => {
        const data = {
          code: token
        }
        bindWechat(data).then(res => {
          console.log(res)
          wx.switchTab({
            url: '/pages/mine/mine',
          })
        })
      })
    })
  }
})