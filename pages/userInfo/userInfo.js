// pages/userInfo/userInfo.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
import {
  saveUserWasher,
  getUserWasher
} from '../../service/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isEdit: false, // 是否编辑
    userInfo: {}, // 用户信息\
    trueName: '', // 真是姓名
    mbNo: '', // 手机号
    diaAmount: '', //提现金额
    show: false,
  },
  editName(e) {
    this.setData({
      ['userInfo.name']: e.detail
    })
  },
  editPhone(e) {
    this.setData({
      ['userInfo.phone']: e.etail
    })
  },
  // 编辑信息
  bindEdit() {
    console.log(this.data.userInfo)
    saveUserWasher(this.data.userInfo).then(res => {
      console.log(res)
    })
    this.setData({
      isEdit: !this.data.isEdit
    })
  },
  // 提现弹出框打开
  openDialog() {

    this.setData({
      show: true
    })
  },
  // 提现弹框确认
  getUserInfo(event) {
    console.log(event.detail);

    this.setData({
      diaAmount: '',
      show: false
    });
  },
  // 提现弹出框关闭
  onClose() {
    this.setData({
      diaAmount: '',
      show: false
    });
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
    getUserWasher().then(res => {
      const userInfo = res.data
      this.setData({
        userInfo
      })
    })
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