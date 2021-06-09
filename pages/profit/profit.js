import {
  getEarningCount,
  getEarningList
} from '../../service/api.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    account: 999, // 总收益
    all: 2, // 未提现收益
    notArrive:'',//已提现收益
    profitList: [
    ], // 收益列表

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getEarningCount().then(res=>{
      const {account,all,notArrive} = res.data
      this.setData({
        account,
        all,
        notArrive
      })
    })
    getEarningList().then(res=>{
      const profitList = res.rows
      this.setData({
        profitList
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