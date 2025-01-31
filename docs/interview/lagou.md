<!--
 * @Author: Tango
 * @Date: 2022-03-10 16:41:39
 * @LastEditTime: 2022-03-10 17:43:54
 * @LastEditors: Tango
 * @Description:
 * @FilePath: \docsify-demo\docs\interview\lagou.md
 * 可以输入预定的版权声明、个性签名、空行等
-->

## 1.18 拉钩面试

面试总结：项目没有亮点，原理懂的很浅，回答的比较模糊
其中问到的面试题：

1. js 事件模型是什么，怎么发生捕获，捕获的应用场景，removeEventLisener 有几个参数？
2. promise 中的 catch 怎么实现的？
3. 深拷贝怎么实现 ？遇到函数怎么处理？遇到对象循环引用怎么处理？
4. vue 中的 nextTick 是什么，作用是什么？怎么实现？
5. css 盒模型是什么，boxsizing 属性有哪些，分别的作用？
6. padding-top 是基于什么做参考的，应用场景在什么地方（图片未加载完需要占位符时，可以用 padding- bottom：30%；按照父元素宽高比例的）
7. 跨域的产生？如何解决跨域，设置跨域的头有哪几个字段，分别有什么作用？
8. 白屏的产生？怎么计算白屏时间？请求一个文件完整链路是？（dns 解析-发送 http 请求-tcp 建立连接-响应 html）
9. dns 是什么？登录怎么维持登录态？服务端怎么设置 cookie 到客户端？cookie 有哪些属性？分别的作用？（通过设置响应头 set-cookie 浏览器会自动种到这个域名下），跨域能带上 cookie 吗？
10. 跨站脚本攻击是什么，怎么防范，xss 脚本注入要怎么防范（输入输出做字符串过滤）。
11. 怎么设计一个流畅的弹幕？canvas 动画渲染 animationFrameRequest 是什么？
12. 随机洗牌算法？

## 伴伴 面试

1.  项目中的亮点，讲下虚拟滚动的原理，定高和不定高
2.  工程化： 讲下 splitChunk 怎么配置， 具体有哪些配置 api， 怎么实现 nodemodule 打包成一个文件。

```
  // 缓存组： cacheGroups 的配置项跟 splitChunks是一样的， 但是它自己有几个自己的配置项
  cacheGroups: {
    vender: {
      // 优先级：数字越大优先级越高，因为默认值为0，所以自定义的一般是负数形式
      priority: -10,
      // test:可以是一个函数也可以是一个正则，函数的返回值是：boolean RegExp string，通过返回值或者正则来进行匹配。
      test: /[\\/]node_modules[\\/]/,
    },
    default: {
      // type: "json",
      minChunks: 2,
      priority: -20,
       // 这个的作用是当前的chunk如果包含了从main里面分离出来的模块，则重用这个模块，这样的问题是会影响chunk的名称。
      reuseExistingChunk: true
    }
  }
```

3. 文件缓存策略，主入口文件，js，css 分别怎么缓存，首屏怎么优化？
4. 怎么监听页面性能。
5. 图片懒加载实现原理
6. post 请求头中 content-type 有哪几种 ，场景分别有哪些

```
如果是一个restful接口（json格式），一般将Content-Type设置为application/json; charset=UTF-8；
如果是文件上传，一般Content-Type设置为multipart/form-data
如果普通表单提交，一般Content-Type设置为application/x-www-form-urlencoded HTTP会将请求参数用key1=val1&key2=val2的方式进行组织，并放到请求实体里面，注意如果是中文或特殊字符如"/"、","、“:" 等会自动进行URL转码。不支持文件，一般用于表单提交
```

7. 常用的图片格式有哪些，场景分别有哪些
   ![](i/8ed8ddf3-6ca0-4344-9d17-f0e45db0efea.jpg)

8. 移动布局怎么做自适应
9. 移动端 meta 改怎么设置，全屏改怎么设置？

```
<meta name="apple-mobile-web-app-capable" content="yes" />  启用 WebApp 全屏模式
```

10. h5 通过什么跟 webview 通讯？

    - 安卓：JsBridge iOS：WebViewJavascriptBridge
    - URL SCHEME： Web 端通过某种方式发送 scheme 请求，Native 用某种方法捕获对应的 url 触发事件,然后拿到当前的触发 url,根据定义好的协议,分析当前触发了那种方法。

11. 实现动画有哪些方案？
12. 怎么实现两栏布局 并且 宽高比 2:1 的矩形？
13. dns 预解析

```
  < link  rel="dns-prefetch" href="//www.zhix.net">
```

## 3/9 号小鹏汽车

1. vue 生命周期有哪些，都干了些什么事情
2. vue 中 nextTick 有什么作用，实现原理
3. vue 中 keep-alive 组件的属性有什么，怎么实现的？LRU 算法怎么实现
4. js 事件循环
5. var、let、const 区别
6. map、set 区别
7. 箭头函数跟普通函数的区别
8. 数组跟链表的区别，使用场景？
9. 有没有做过提升生产效率的事情
