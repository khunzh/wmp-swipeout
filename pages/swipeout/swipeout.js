// pages/swipeout/swipeout.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{
        id: '01',
        text: '唧唧复唧唧'
      },
      {
        id: '01',
        text: '木兰当户织'
      },
      {
        id: '01',
        text: '不闻机杼声'
      },
      {
        id: '01',
        text: '惟闻女叹息'
      },
      {
        id: '01',
        text: '问女何所思'
      },
      {
        id: '01',
        text: '问女何所忆'
      },
      {
        id: '01',
        text: '女亦无所思'
      },
      {
        id: '01',
        text: '女亦无所忆'
      },
      {
        id: '01',
        text: '昨夜见军帖'
      },
      {
        id: '01',
        text: '可汗大点兵'
      },
      {
        id: '01',
        text: '军书十二卷'
      },
      {
        id: '01',
        text: '卷卷有爷名'
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  righttap(e){
    console.log('del btn tap',e)
  },
  contenttap(e) {
    console.log('content btn tap', e)
  }
})