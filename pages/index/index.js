//Page Object
const fetch = require('../../utils/fetch.js')
Page({
  data: {
    //slides: [],
    categories: []
  },
  //options(Object)
  onLoad: function (options) {
    // fetch('slides').then(res => {
    //   this.setData({
    //     slides: res.data
    //   })
    // })

    fetch('categories').then(res => {
      this.setData({
        categories: res.data
      })
    })

  },
  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  },
  onPageScroll: function () {

  },
  //item(index,pagePath,text)
  onTabItemTap: function (item) {

  }
})