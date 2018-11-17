# wmp-swipeout
微信小程序左滑删除组件

# 使用指南
在需要使用的页面的json中配置
```
{
  "usingComponents": {
     "swipeout": "path/to/swipeout",
     "swipeout-item": "path/to/swipeoutItem"
  }
}
```
然后再页面中
```
<swipeout>
  <swipeout-item>
    <view slot="right">del</view>
    <view slot="content">xxxx</view>
  </swipeout-item>
</swipeout>
```
需要注意的是: 使用时`<swipeout>`的子元素只能是`<swipeout-item>`,否则可能会出错.
# properties和triggerEvent
## properties 
properties | 说明 | 类型 | 默认 | 必须
---|---|---|---|---
threshold | 阈值, 右部按钮的百分比, 大于或等于该值, 撒手时,可以自动关闭或打开 | Boolean | 0.3 | no
open | 是否打开 | Boolean | false | no
identifier | 标识 | Number/String | 无 | yes

## triggerEvent

event | 说明 | 参数
---|--- |---
righttap |　删除按钮点击　| {identifier: 传入的identifier properties}
contenttap |　内容点击　| {identifier: 传入的identifier properties}

# 预览
![preview](https://github.com/khunzh/wmp-swipeout/raw/master/imgs/preview.gif)

# 不足
内容区域的touchstart和tap两个事件会有重叠,希望看到的朋友给我建议