import {
  getOrderList,
  cancelOrderUser,
  getCarTypeList,
  openDoorWasher,
  getCarList,
  getCarInfo
} from '../../service/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderQuery: {
      pageNum: 1,
      pageSize: '',
      orderStatus: 2
    },
    outList: ['车身', '玻璃', '轮毂', '轮胎', '上光'],
    globalList: ['车身', '玻璃', '轮毂', '轮胎', '中控台', '上光', '座椅', '出风口', '脚垫', '仪表盘'],
    orderList: {}
  },
  // 去抢单成功页面
  toRob(e){
    console.log(e.currentTarget.dataset.orderid)
    wx.navigateTo({
      url: '/pages/' + e.currentTarget.dataset.url + '/' + e.currentTarget.dataset.url+'?orderId='+e.currentTarget.dataset.orderid+'&&orderStatus=2',
    })
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
    cancelOrderUser(orderid).then(res=>{
      that.getOrderList()
    })
  },
  // 开始洗车
  startWash(e){
    const orderId = e.currentTarget.dataset.orderid
    console.log(orderId)
    wx.navigateTo({
      url: '/pages/' + e.currentTarget.dataset.url + '/' + e.currentTarget.dataset.url+'?orderId='+orderId
    })
  },
  // 取钥匙
  openDoorWasher(e){
    const orderId = e.currentTarget.dataset.orderid
    openDoorWasher(orderId).then(res=>{
      console.log(res)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getOrderList()
  },
  getOrderList() {
    getOrderList(this.data.orderQuery).then(res => {
      var orderList = res.rows
      if (orderList.length > 0) {
        getCarTypeList().then(res => {
          orderList.forEach((v, i) => {
            res.data.forEach(k => {
              if (v.carType == k.dictValue) {
                v.carTypeText = k.dictLabel
              }
            })
            getCarInfo(v.orderId).then(res=>{
              v.plateNumber = res.data.plateNumber
              this.setData({
                orderList
              })
            })
          })
        })
      }
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