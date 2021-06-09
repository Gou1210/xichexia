// pages/changePassword/changePassword.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
import {
  updatePasswordWasher,
  getUserWasher
} from '../../service/api.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}, // 用户信息
    oldPassword: '', // 旧密码
    newPassword: '', // 新密码
    newPassword2: '', // 确认新密码
  },
  // 编辑信息
  bindEdit() {
    if (!this.data.oldPassword) {
      Toast('旧密码必填')
    }else if (this.data.newPassword !== this.data.newPassword2) {
      Toast('两次新密码不一样')
    }else if (!this.data.newPassword || !this.data.newPassword2) {
      Toast('两次新密码必填')
    }else if (this.data.newPassword == this.data.newPassword2) {
      // 密码是否一样
      if (this.data.oldPassword === wx.getStorageSync('USERINFO').password) {
        const    data ={
          oldPassword: this.data.oldPassword,
          password: this.data.newPassword,
        }
        updatePasswordWasher(data).then(res=>{
          Toast.success('修改成功')
          wx.navigateTo({
            url: '/pages/mine/mine',
          })
        })
      } else {
        Toast('旧密码不正确')
        return
      }
    }
  },
  // loading toast
  toastLoading(text) {
    Toast.loading({
      message: text || '加载中...',
      duration: 0,
      forbidClick: true,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // if (app.globalData.userInfo) {
    //   // 获取登录信息
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //   })
    // }

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

  }
})