// pages/test/test.js
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
  a() {
    function timestampToTime(val) {
      var val = new Date(val)
      var year = val.getFullYear();
      var month = (val.getMonth() + 1 < 10 ? '0' + (val.getMonth() + 1) : val.getMonth() + 1);
      var date = (val.getDate() < 10 ? '0' + (val.getDate()) : val.getDate());
      var hour = (val.getHours() < 10 ? '0' + (val.getHours()) : val.getHours());
      var minute = (val.getMinutes() < 10 ? '0' + (val.getMinutes()) : val.getMinutes());
      var second = (val.getSeconds() < 10 ? '0' + (val.getSeconds()) : val.getSeconds());
      return year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second;
    }
    var myDate = new Date();
    timestampToTime(myDate)

              
    if ((myDate.getMinutes() / 2) == (Math.floor(myDate.getMinutes()) / 2)&&(myDate.getSeconds()==50)) {
      console.log(111)
    }
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