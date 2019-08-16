// pages/detail/detail.js
const fetch = require('../../utils/fetch.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: {},
    slides: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.item);
    fetch(`shops/${options.item}`).then(res => {
      this.setData({
        info: res.data,
        slides: res.data.images
      })
      wx.setNavigationBarTitle({
        title: res.data.name
      })
    })

  },
  viewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.dataset.src,
      urls: this.data.slides
    })

  }
 
})