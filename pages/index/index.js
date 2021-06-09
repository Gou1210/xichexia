// let QQMapWX = require('../../libs/qqmap-wx-jssdk.min');
// let qqmapsdk;
// var config = require('../../libs/config.js');
import {
  getOrderListGrab,
  grabOrder,
  getCarTypeList,
  addWasherLocation,
} from "../../service/api.js";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    latitude: 0.0,
    longitude: 0.0,
    status: 1,
    oldStatus: 0,
    selectHeight: "100vh",
    orderList: [],
    markerId: "",
    orderForm: {},
    carTypeList: [],
    setInter: "",
    isPosition: true,
    isSetTime: {},
    showPop: false,
    isLocation: true,
    showPopHeight: false,
  },
  changePop() {
    this.setData({
      showPopHeight: !this.data.showPopHeight,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    const that = this;
    wx.getSetting({
      complete: ({ authSetting }) => {
        if (!authSetting["userLocationBackground"]) {
          wx.authorize({
            scope: "scope.userLocationBackground",
            success() {
              that.data.isLocation = true;
            },
            fail() {
              that.data.isLocation = false;
            },
          });
        }
      },
    });
    wx.showLoading({
      title: "正在加载中",
    });
    this.data.isSetTime = setInterval(() => {
      this.getOrderListGrab();
    }, 2000);
    getCarTypeList().then(res => {
      this.setData({
        carTypeList: res.data,
      });
    });
  },
  onShow() {
    // 获取头像
    if (wx.getStorageSync("USERINFO")) {
      const { username, avatarUrl } = wx.getStorageSync("USERINFO");
      this.setData({
        username,
        avatarUrl,
      });
    }
    var that = this;
    /**
     * 调用内部获取位置，默认为wsg84,精确为gcj02
     */
    wx.getLocation({
      type: "gcj02",
      success: function(res) {
        that.setData({
          longitude: res.longitude,
          latitude: res.latitude,
        });
      },
    });
    this.getOrderListGrab();
  },
  // 抢单事件
  getOrderListGrab() {
    const that = this;
    const is = !that.data.showPop;
    wx.getLocation({
      type: "gcj02",
      success: function(res) {
        that.setData({
          longitude: res.longitude,
          latitude: res.latitude,
        });
        const data = {
          longitude: res.longitude,
          latitude: res.latitude,
          distance: 100000,
          pageNum: 1,
          pageSize: 10,
        };
        getOrderListGrab(data).then(res => {
          if (is) {
            wx.hideLoading();
          }
          is &
            that.setData({
              showPop: true,
            });
          const orderList = res.data;
          let markers = [];
          orderList.forEach((v, i) => {
            markers[i] = {
              id: v.orderId,
              iconPath: "/static/img/home/chezhu.png",
              longitude: v.longitude,
              latitude: v.latitude,
              width: 60,
              height: 60,
            };
          });
          that.setData({
            orderList,
            markers,
          });
        });
      },
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},
  /**
  /**
   * 
   * 视野发生变化时触发：见页面bindregionchange事件
   */
  resultLoaction() {
    return new Promise(resolve => {
      wx.startLocationUpdateBackground({
        success(res) {
          resolve();
          wx.onLocationChange(function(res) {
            const data = {
              longitude: res.longitude,
              latitude: res.latitude,
            };
            addWasherLocation(data).then(res => {
              if (res.code == 200) {
              }
            });
          });
        },
        fail(err) {
          console.log(err);
        },
      });
    });
  },
  async startPositionFunc(e) {
    wx.showLoading({
      title: "正在抢单中!",
    });
    const { id, url } = e.currentTarget.dataset;
    const that = this;
    await this.resultLoaction();
    wx.hideLoading({
      complete: () => {
        that.grabOrder({ id, url });
      },
    });
  },
  // 抢单
  startPosition(e) {
    if (!this.data.isLocation) {
      wx.openSetting({
        success: ({ authSetting }) => {
          if (authSetting["userLocationBackground"]) {
            this.startPositionFunc(e);
          }
        },
      });
      return;
    }
    this.startPositionFunc(e);
  },
  // 我要抢单
  grabOrder({ id, url }) {
    // const { id, url } = e.currentTarget.dataset;
    grabOrder(id).then(res => {
      wx.navigateTo({
        url: "/pages/" + url + "/" + url + "?orderId=" + id + "&&orderStatus=2",
      });
    });
  },

  toLink(e) {
    wx.navigateTo({
      url:
        "/pages/" +
        e.currentTarget.dataset.url +
        "/" +
        e.currentTarget.dataset.url,
    });
  },
  toMine(e) {
    wx.switchTab({
      url:
        "/pages/" +
        e.currentTarget.dataset.url +
        "/" +
        e.currentTarget.dataset.url,
    });
  },
  //结束定位
  endPosition() {
    wx.stopLocationUpdate(function(res) {
      console.log(res);
    });
  },
  // 打开抢单列表
  markertap(e) {
    const markerId = e.detail.markerId;
    let { orderList, carTypeList } = this.data;
    let orderForm = orderList.filter(v => {
      if (v.orderId == markerId) {
        return v;
      }
    });
    orderForm = orderForm[0];
    const carTypeText = carTypeList.filter(v => {
      if (v.dictSort == orderForm.carType) {
        return v;
      }
    });
    if (carTypeText[0]) {
      console.log(11);
      orderForm.carTypeText = carTypeText[0].dictLabel;
    }
    this.setData({
      selectHeight: "48.75vh",
      status: 1,
      markerId,
      orderForm,
    });
  },

  // 取消订单
  backStatus() {
    this.setData({
      selectHeight: "100vh",
      status: 0,
    });
  },

  // 下拉刷新
  onPullDownRefresh() {
    getCarTypeList().then(res => {
      this.setData({
        carTypeList: res.data,
      });
    });
  },
  shuaxin() {
    getCarTypeList().then(res => {
      this.setData({
        carTypeList: res.data,
      });
    });
  },
  onUnload() {
    clearInterval(this.data.isSetTime);
  },
  onHide() {
    clearInterval(this.data.isSetTime);
  },
});
