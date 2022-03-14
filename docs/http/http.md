<!--
 * @Author: Tango
 * @Date: 2022-03-10 16:41:39
 * @LastEditTime: 2022-03-10 17:50:05
 * @LastEditors: Tango
 * @Description:
 * @FilePath: \docsify-demo\docs\http\http.md
 * 可以输入预定的版权声明、个性签名、空行等
-->

## 跨域

cors.js
设置 acess-control-allow-origin 头 设置多个 动态设置
强缓存 设置 vary 头 防止 cdn 缓存多份

## http 缓存

- 强缓存
- cache-contorl：
  - max-age：2222 单位秒 相对时间 1.1 版本新增的 优先级更高
  - no-cache 表示先请求服务器看看文件有没有被修改 再使用本地缓存
  - no-store 禁止缓存，每次都去请求服务器
  - private： 只能在私有缓存中被缓存
  - public： 可以在代理缓存中被缓存，被多个用户共享 默认为 public
- expires： 绝对时间 指定某个日期 缺点：客户端修改时间会导致缓存失效
- 协商缓存
  - if-modified-since/last-modified 1.0 版本使用 last-modified 返回文件最新修改时间 客户端下次请求在 if-modified-since 带上这个时间 服务端去比较有没有修改，返回 200 或者 304 缺点：有可能修改了文件但是实际内容没有修改 时间精确到秒。
  - if-none-match/etag 1.1 版本使用 第一次请求服务段的返回 etag 响应头 根据文件内容进行的一个 hash 算法得到字符串，下次客户端请求在 if-none-match 这个请求头带上，服务的对比有没有更新，返回 200 或者 304 优先级更高

## 如何取消 http 请求

- xhr 请求 ： 调用 xhr.abort()
- fetch 请求：AbortController 缺点：不兼容 IE

```
const controller = new AbortController();
const signal = controller.signal;
console.log(signal, "signal的初始状态");
signal.addEventListener("abort", function (e) {
    console.log(signal, "signal的中断状态");
});


fetch("/upload", {signal})
.then((res) => {
    console.log(res, "请求成功");
}).catch(function (thrown) {
    console.log(thrown);
});
// 增加部分结束
controller.abort({
    name: "CondorHero",
    age: 19
});
```

- axios ：cancleToken

```
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

const instance = axios.create();
instance.get("/upload", {
    cancelToken: source.token
}).then(res => {
    console.log(res);
}).catch(function (thrown) {
    if (axios.isCancel(thrown)) {
        console.log('Request canceled', thrown.message);
    } else {
        // handle error
    }
});
source.cancel({
    name: "CondorHero",
    age: 19
});
```

axios 封装取消重复请求
核心思想： 维护一个数组，请求 push，响应 filter，重复请求 cancel 掉

## http1.0 htto1.1 http2.0 的区别

http1.0 建立连接传输玩数据立刻断开。
http1.1 版本默认开启长链接加了个 connection： keep-alive ，最多并行六个请求
http2.0 采用二进制分帧 格式传递数据，以流的形式发送消息

- 头部压缩
  1.  客户端跟服务端通过维护一个首部表用来存储之前发送的键值对，下次请求重复不会带上，减少头部的体积
- 多路复用
  1.  基于流的形式，只需要一个 tcp 连接，进行多个请求
  2.  通过 streamid 区分数据 服务端偶数 客户端奇数
- 服务端推送
  1. 服务器主动向客户的推送资源，客户的可以缓存资源
  2. 只能对请求的响应推送流，不能随意发起推送，必须在响应之前发送 push_promise 帧，防止这次推送的资源刚好是客户的要请求的资源

## http 跟 https 的区别

https：加密传输数据 在 http 进行 tcp 握手之上加了一层 TLS 协议，主要是交换密钥的，其中客户端会用服务端的公钥对自己生成的私钥进行非对称加密传输给服务器，然后后续数据都是通过客户端生成的私钥进行对称加密，因为对称加密的性能比非对称的性能要好。
