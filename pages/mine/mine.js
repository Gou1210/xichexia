import { getUserWasher, saveUserWasher } from "../../service/api.js";
let app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    username: "",
    avatarUrl: "",
    workStatus: "",
  },
  loginTap(e) {
    wx.navigateTo({
      url:
        "/pages/" +
        e.currentTarget.dataset.url +
        "/" +
        e.currentTarget.dataset.url,
    });
  },
  // 退出登录
  quit() {
    wx.removeStorageSync("TOKEN");
    wx.removeStorageSync("USERINFO");
    this.setData({
      avatarUrl: "",
      username: "",
    });
  },
  //结束定位
  endPosition() {
    wx.stopLocationUpdate(function(res) {});
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (wx.getStorageSync("USERINFO")) {
      const { username, avatarUrl } = wx.getStorageSync("USERINFO");
      this.setData({
        username,
        avatarUrl,
      });
    }
    getUserWasher().then(res => {
      console.log(res.data);
      this.setData({
        workStatus: res.data.workStatus,
      });
    });
  },
  // 点击上下班
  work(e) {
    const workStatus = e.currentTarget.dataset.workstatus;

    wx.showModal({
      title: "提示",
      content: `您确定要现在${workStatus === 1 ? "上班" : "下班"}吗?`,
      confirmText: workStatus === 1 ? "立即上班" : "立即休息",
      success: async res => {
        if (res.confirm) {
          const data = {
            workStatus: workStatus,
          };
          await saveUserWasher(data);
          const resData = await getUserWasher();
          this.setData({
            workStatus: resData.data.workStatus,
          });
        }
      },
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    if (wx.getStorageSync("USERINFO")) {
      const { username, avatarUrl } = wx.getStorageSync("USERINFO");
      this.setData({
        username,
        avatarUrl,
      });
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {},
  // 跳转
  toLink(e) {
    wx.navigateTo({
      url:
        "/pages/" +
        e.currentTarget.dataset.url +
        "/" +
        e.currentTarget.dataset.url,
    });
  },
});
