import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';

import {
  getOrderList,
  getCarInfo,
  cancelOrderUser,
  openDoorWasher,
  getCarTypeList
} from '../../service/api.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    orderId: '',
    orderForm: {},
    orderStatusData:{}
  },
  // 跳转
  toLink(e) {
    wx.navigateTo({
      url: '/pages/' + e.currentTarget.dataset.url + '/' + e.currentTarget.dataset.url,
    })
  },
  // 开始或者结束洗车
  startEndWash(e) {
    const {
      orderId
    } = this.data.orderForm
    console.log(this.data.orderForm)
    wx.redirectTo({
      url: '/pages/' + e.currentTarget.dataset.url + '/' + e.currentTarget.dataset.url + '?orderId=' + orderId,
    })
  },

  deleteCar() {
    // const {
    //   orderId
    // } = this.data.orderForm
    // console.log(this.data.orderForm)
    Dialog.confirm({
        title: '',
        message: '确认取消此订单',
      })
      .then(() => {
        cancelOrderUser(this.data.orderForm.orderId).then(res => {
          if (res.code == 200) {
            // wx.showToast({
            //   title: '取消成功',
            // })
            wx.switchTab({
              url: '/pages/index/index',
            })
          }
        })
      })
      .catch(() => {
        console.log("取消删除")
      });
  },
  // 取出钥匙
  takeKey(){
    const {orderId} = this.data.orderForm
    const orderStatusData = this.data.orderStatusData
    const that = this
    let orderForm = ''
    openDoorWasher(orderId).then(res=>{
      // if(res.code==200){
        getOrderList(orderStatusData).then(res => {
          orderForm = res.rows.filter(v => {
            console.log(orderId)
            if (v.orderId == orderId) {
              return v
            }
          })
          console.log(orderForm[0].carKeyStatus)
            that.setData({
              ['orderForm.carKeyStatus']:orderForm[0].carKeyStatus,
              ['orderForm.orderStatus']:orderForm[0].orderStatus
            })
        })
      // }
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this
    const  orderStatusData = {
      orderStatus:options.orderStatus
    }
    console.log(options.orderStatus)
    console.log(options.orderId)
    let orderForm = []
    // setTimeout(() => {
      getOrderList(orderStatusData).then(res => {
        orderForm = res.rows.filter(v => {
          if (v.orderId == options.orderId) {
            console.log(111)
            return v
          }
        })
        console.log(orderForm[0])
        return (orderForm[0])
      }).then((orderForm) => {
          getCarInfo(orderForm.orderId).then(res => {
            if(res.data){
              orderForm.plateNumber = res.data.plateNumber
              orderForm.name = res.data.name
              orderForm.phone = res.data.phone
              orderForm.carBrand = res.data.carBrand
              if(res.data.sex==0){
                orderForm.sexText = '女士'
              }else{
                orderForm.sexText = '先生'
              }
              return orderForm 
            }else{
             that.setData({
               orderForm
             })
            }
          }).then((orderForm) => {
            // getCarTypeList().then(res => {
            //   const carTypeText = res.data.filter(v => {
            //     if (v.dictSort == orderForm.carType) {
            //       return v
            //     }
            //   })
            //   orderForm.carTypeText = carTypeText[0].dictLabel
              that.setData({
                orderForm
              })
            // })
          })
      })
    // }, 6000);
    this.setData({
      orderStatusData: orderStatusData
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

  },
  toNav() {
    const {
      latitude,
      longitude,
      locationArea
    } = this.data.orderForm
    wx.openLocation({
      latitude: latitude, //维度
      longitude: longitude, //经度
      name: locationArea, //目的地定位名称
      scale: 15, //缩放比例
      address: "目的地" //导航详细地址
    })

  },
  toPhone() {
      wx.makePhoneCall({
        phoneNumber: this.data.orderForm.phone
      })
  }
})