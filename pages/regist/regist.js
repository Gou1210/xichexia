// pages/regist/regist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showTime: false,
    timeNum: 60,
    setInter: {}
  },
  formSubmit(e) {
    const username = e.detail.value.username
    const password = e.detail.value.password
    const repeatPassword = e.detail.value.repeatPassword
    if (username.length < 2) {
      wx.showToast({
        title: '账号长度不得少于2',
        icon: 'none',
        mask: true
      })
      return
    }
    if (password.length < 4) {
      wx.showToast({
        title: '密码长度不得少于4',
        icon: 'none',
        mask: true
      })
      return
    }
    if (password != repeatPassword) {
      wx.showToast({
        title: '两次密码不一致',
        icon: 'none',
        mask: true
      })
      return
    }
    wx.request({
      url: this.serverUrl + "api/user/regist",
      method: 'POST',
      data: {
        username: username,
        password: password
      },
      success: (res) => {
        if (res.data.error == -1) {
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            mask: true
          })
          return
        }
        wx.navigateTo({
          url: '../login/login'
        })
      }
    })
  },
  // 获取验证码
  getCaptcha() {
    var timeNum = this.data.timeNum
    this.data.setInter = setInterval(() => {
      timeNum--
      if (timeNum > 0) {
        this.setData({
          timeNum: timeNum,
          showTime: true
        })
      } else {
        clearInterval(this.data.setInter)
        this.setData({
          showTime: false
        })
      }
    }, 1000)
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
    clearInterval(this.data.setInter)
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

  }
})