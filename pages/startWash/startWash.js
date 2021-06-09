import {
  baseURL
} from '../../service/config'
import {
  beginWash
} from '../../service/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fileList: [],
    baseURL: baseURL,
    picList: [ {
      title: '正面'
    }, {
      title: '左侧'
    }, {
      title: '右侧'
    }, {
      title: '后方'
    }, {
      title: '其他'
    }, {
      title: '其他'
    }, {
      title: '其他'
    }, {
      title: '其他'
    }
  ],
    beforeDescript: '',
    orderId: ''
  },
  // 上传图片
  afterRead(event) {
    const that = this
    const {
      file
    } = event.detail;
    const {
      index
    } = event.currentTarget.dataset
    let {
      picList
    } = this.data
    const AuthorizationApi = wx.getStorageSync('TOKEN') || ''
    wx.uploadFile({
      url: that.data.baseURL + '/api/common/upload',
      filePath: file.url,
      name: 'file',
      header: {
        AuthorizationApi: AuthorizationApi
      },
      formData: {
        user: 'test'
      },
      success(res) {
        const {
          fileName
        } = JSON.parse(res.data)
        picList[index].img = fileName
        that.setData({
          picList
        })
      },
      fail(res) {
        console.log(res)
      }
    });
  },
  // 删除以上传图片
  close(e) {
    let {
      picList
    } = this.data
    console.log(e)
    const {
      index
    } = e.currentTarget.dataset
    picList[index].img = ''
    this.setData({
      picList
    })
  },
  // 获取评论
  onMessage(e) {
    this.setData({
      beforeDescript: e.detail
    })
  },
  // 开始洗车
  startWash(e) {
    const {
      picList,
      orderId,
      beforeDescript
    } = this.data
    var imgArr = []
    var isImg = true
    picList.splice(0,3).forEach(v => {
      if (v.img) {
        imgArr.push(v.img)
      } else {
        isImg = false
      }
    })
    // 判断是否上传所有图片
    if (isImg) {
      const beforeImg = imgArr.join(',')
      const data = {
        orderId: orderId,
        beforeImg: beforeImg,
        beforeDescript: beforeDescript
      }
      beginWash(data).then(res => {
        if (res.code == 200) {
          wx.showToast({
            title: '成功',
            icon: 'none',
            mask: true,
            duration: 1500
          })
          wx.redirectTo({
            url: '/pages/' + e.currentTarget.dataset.url + '/' + e.currentTarget.dataset.url+'?orderId='+orderId+'&&orderStatus=34'
          })
        }
      })
    } else {
      wx.showToast({
        title: '请上传所有照片',
        icon: 'none',
        mask: true,
        duration: 1500
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.orderId)
    this.setData({
      orderId: options.orderId
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