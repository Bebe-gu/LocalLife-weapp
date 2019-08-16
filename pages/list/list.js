const fetch = require('../../utils/fetch.js')

Page({
  data: {
    inputShowed: false,
    inputVal: "",
    catetory: {},
    shops: [],
    page: 0,
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
      this.loadMore()
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
    this.loadMore()

  },
  //加载更多
  loadMore: function () {
    // if (!this.data.hasMore) return
    return fetch(`categories/${this.data.catetory.id}/shops`, { _page: this.data.page, _limit: this.data.pageSzie })
      .then(res => {
        const totalCount = parseInt(res.header['X-Total-Count'])
        //追加页面数据
        const shops = this.data.shops.concat(res.data)
        const hasMore = this.data.page * this.data.pageSzie < totalCount
        this.setData({
          shops: shops,
          hasMore: hasMore
        })
      })
  },

  //下拉刷新
  onPullDownRefresh: function () {
    this.setData({
      shops: [],
      page: 0
    })
    this.loadMore().then(() => wx.stopPullDownRefresh())
  },
  //搜索
  searchHandle: function () {
    fetch(`categories/${this.data.catetory.id}/shops`, { _page: this.data.page, _limit: this.data.pageSzie, q: this.data.inputVal }).then(res => {
      const searchResultCount = parseInt(res.header['X-Total-Count'])
      console.log(res.data);
      if (res.data == '') {
        wx.showToast({
          title: '没有搜索结果',
          icon: 'none',
          duration: 1500
        })
        this.setData({
          hasMore: true,
          shops: []
        })
        if (searchResultCount < this.data.pageSzie) {
          this.setData({
            hasMore: false
          })
        }
        return false
      }
      this.setData({
        shops: res.data
      })
    })
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  //点击取消恢复数据
  hideInput: function () {
    this.loadMore()
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
  //搜索输入
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  }
});