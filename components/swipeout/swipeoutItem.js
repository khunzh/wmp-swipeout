// components/swipeout/swipeoutItem.js
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    open: { // 是否是打卡状态
      type: Boolean,
      value: false,
      observer: '_openObserver'
    },
    threshold: { // 拉出/拉回右部的阈值
      type: Number,
      value: 0.3
    },
    identifier: { // 标识
      type: ['Number', 'String']
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    animated: false,
    hasDeleted: false, // 是否删除了本条目
    rightStyle: '', // 
    contentStyle: '', // 
  },
  relations: {
    './swipeout': {
      type: 'parent', // 关联的目标节点应为父节点
    }
  },
  ready() {
    this._initRender()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 获取右部分宽度,并初始化
     */
    _initRender() {
      wx.createSelectorQuery().in(this).select('.right-wrap').boundingClientRect(rect => {
        this.data.rightWidth = rect.width;
        // 计算右部分初始化位置, 关闭的状态
        this.setData({
          rightStyle: `transform: translate3d(${this.data.rightWidth}px, 0, 0);`
        })
        // 初始化时,如果要求打开,则打开
        if (this.data.open) {
          this._setOpen();
        }
      }).exec();
    },
    /**
     * 监听open
     */
    _openObserver(newVal, oldVal) {
      if (newVal) {
        this._setOpen();
        return;
      }
      this._setClose();
    },
    /**
     * 设置content和right的translatex的值
     * @param {Number} offsetContent wm-swipeout-item-right的translateX
     * @param {Number} offsetRight mp-swipeout-item-content的translateX
     * @param {animated} animated 是否动画(撒手的时候是不是自动移过去)
     * @param {Function} callback 
     */
    _setPosition(offsetContent, offsetRight, animated = false, cb) {
      // 关闭的状态下,不给向右拉
      if (!this.data.open && this.data.direction === 'toRight') {
        return
      }
      // 打开的状态下,不给向左拉
      if (this.data.open && this.data.direction === 'toLeft') {
        return
      }
      this.data.contentStyle = `transform: translate3d(${offsetContent}px, 0, 0);`;
      this.data.rightStyle = `transform: translate3d(${offsetRight}px, 0, 0);`;
      this.setData({
        animated: animated,
        contentStyle: this.data.contentStyle,
        rightStyle: this.data.rightStyle
      }, () => {
        if (typeof cb === 'function') {
          cb.call(this)
        }
      })
    },
    /**
     * 打开
     */
    _setOpen() {
      this._setPosition(-this.data.rightWidth, 0, true, () => {
        this.data.open = true;
        this.data.direction = '';
      });
    },
    /**
     * 关闭
     */
    _setClose() {
      this._setPosition(0, this.data.rightWidth, true, () => {
        this.data.open = false;
        this.data.direction = '';
      });
    },
    /**
     * touch start
     */
    _onTouchStart(e) {
      if (e.touches.length === 1) {
        this.data.startX = e.touches[0].clientX;
        //  关闭其他条目
        this._closeOtherItems();
      }
      this.triggerEvent('start', {});
    },
    /**
     * touch move
     */
    _onTouchMove(e) {
      if (e.touches.length === 1) {
        const moveX = e.touches[0].clientX;
        const x = moveX - this.data.startX;
        const offset = Math.abs(x) >= this.data.rightWidth ? this.data.rightWidth : Math.abs(x); //距离值 非负
        let pContent = 0; // content最终translateX的值, 正负零
        let pRight = 0; // right最终translateX的值, 正负零
        if (x > 0) {
          this.data.direction = 'toRight';
          pContent = -(this.data.rightWidth - offset);
          pRight = offset;
        } else {
          this.data.direction = 'toLeft';
          pContent = -offset;
          pRight = this.data.rightWidth - offset;
        }
        this._setPosition(pContent, pRight);
        this.triggerEvent('move')
      }
    },
    /**
     * touch end
     */
    _onTouchEnd(e) {
      const endX = e.changedTouches[0].clientX
      const x = endX - this.data.startX
      const thresholdDist = this.data.threshold <= 1 ? this.data.rightWidth * this.data.threshold : this.data.threshold

      if (this.data.direction === 'toLeft') {
        if (Math.abs(x) >= thresholdDist) {
          this._setOpen();
          return;
        }
      }
      this._setClose(); // 非关闭状态(打开状态和正在打开状态),只要向右,就关闭
      this.triggerEvent('end');
    },
    /**
     * 关闭其他条目
     */
    _closeOtherItems() {
      const parent = this.getRelationNodes('./swipeout')[0];
      const allItems = parent.getRelationNodes('./swipeoutItem');
      allItems.forEach(item => {
        const isMe = item.data.identifier === this.data.identifier
        if (!isMe && item.data.open) {
          item.setData({
            open: false
          })
        }
      });
    },
    /**
     * 右部删除按钮点击
     */
    _onRightTap(e) {
      this.setData({
        hasDeleted: true
      }, () => {
        wx.nextTick(() => {
          this.triggerEvent('righttap', {
            identifier: this.data.identifier
          });
        })
      })
    },
    /**
     * 内容点击
     */
    _onContentTap(e) {
      if (this.data.open) {
        this._setClose();
        return
      }
      this.triggerEvent('contenttap', {
        identifier: this.data.identifier
      });
    }
  }
})