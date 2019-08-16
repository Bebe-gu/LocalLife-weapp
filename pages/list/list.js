const fetch = require('../../utils/fetch.js')

Page({
  data: {
    inputShowed: false,
    inputVal: "",
    catetory: {},
    shops: [],
    page: 1,
    pageSzie: 20,
    hasMore: true
  },

  onLoad: function (options) {
    fetch(`categories/${options.cat}`).then(res => {
      this.setData({
        catetory: res.data
      })
      wx.setNavigationBarTitle({
        title: res.data.name
      })
      //调用加载数据函数
      this.loadMore(this.data.page)
    })
  },
  onReady: function () {
    if (this.data.catetory.name) {
      wx.setNavigationBarTitle({
        title: this.data.catetory.name
      })
    }
  },
  //上拉监听函数
  onReachBottom: function (param) {
    this.setData({
      page: this.data.page + 1
    })
    this.loadMore(this.data.page);

  },
  //加载更多
  loadMore: function (page) {
    fetch(`categories/${this.data.catetory.id}/shops`, { _page: page, _limit: this.data.pageSzie })
      .then(res => {
        const totalCount = parseInt(res.header['X-Total-Count'])
        //追加页面数据
        const shops = this.data.shops.concat(res.data)
        const hasMore = page * this.data.pageSzie < totalCount
        this.setData({
          shops: shops,
          hasMore: hasMore
        })
      })
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },

  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  }
});