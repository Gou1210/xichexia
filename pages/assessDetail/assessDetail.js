import {
  getOrderList,
  cancelOrderUser,
  getCarTypeList,
  getCarInfo,
  getEvaluateList
} from '../../service/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderQuery: {
      pageNum: 1,
      pageSize: 4,
      orderStatus: 3
    },
    outList: ['车身', '玻璃', '轮毂', '轮胎', '上光'],
    globalList: ['车身', '玻璃', '轮毂', '轮胎', '中控台', '上光', '座椅', '出风口', '脚垫', '仪表盘'],
    orderList: {},
    orderForm:{}
  },
  // 跳转
  toLink(e) {
    wx.navigateTo({
      url: '/pages/' + e.currentTarget.dataset.url + '/' + e.currentTarget.dataset.url,
    })
  },
  // 取消订单
  cancelOrder(e) {
    const orderid = e.currentTarget.dataset.orderid
    const that = this
    cancelOrderUser(orderid).then(res => {
      that.getOrderList()
    })
  },
  // 结束洗车
  endWash(e) {
    const orderId = e.currentTarget.dataset.orderid
    wx.navigateTo({
      url: '/pages/' + e.currentTarget.dataset.url + '/' + e.currentTarget.dataset.url + '?orderId=' + orderId
    })
  },
  // 关闭
  close(){
    wx.navigateTo({
      url: '/pages/myAssess/myAssess',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  const orderForm =  wx.getStorageSync('ASSESS')
  this.setData({
    orderForm
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
    this.setData({
      ['orderQuery.pageNum']: --this.data.orderQuery.pageNum
    })
    this.getOrderList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({
      ['orderQuery.pageNum']: ++this.data.orderQuery.pageNum
    })
    this.getOrderList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})