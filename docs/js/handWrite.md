<!--
 * @Author: Tango
 * @Date: 2021-07-05 11:36:35
 * @LastEditTime: 2021-11-05 15:11:19
 * @LastEditors: Tango
 * @Description:
 * @FilePath: \docsify-demo\docs\js\handWrite.md
 * 可以输入预定的版权声明、个性签名、空行等
-->

# 手写常见 js 面试题

## 实现一个 new 关键字

```js
function new(obj, ...args){
    //1.创建一个新的对象，而且对象上的__proto__ 属性 执行obj.prototype
    let newObj = Object.create(obj.prototype)
    //2.
    let res = obj.apply(newObj, args)
    return typeof res === 'object'? res : newObj
}
```

## 列表转树形

```js
function toTree(arr) {
  let tree = []
  let temp = {}
  // 遍历数组 转换成id为key 的map
  for (let i = 0; i < arr.length; i++) {
    temp[arr[i].id] = arr[i]
  }
  for (let i in temp) {
    //根节点push进数组
    if (temp[i].pid == 0) {
      tree.push(temp[i])
    } else {
      //遍历子节点，把当前节点push进父节点
      if (!temp[temp[i].pid].children) {
        temp[temp[i].pid].children = []
      }

      temp[temp[i].pid].children.push(temp[i])
    }
  }
  return tree
}
```

## 防抖、节流方法

```js
// 防抖
function debounce(fn, delay = 500) {
  let timer
  return function () {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this, arguments)
    }, delay)
  }
}

//节流
function throtte(fn, time = 500) {
  let flag = true
  return function () {
    if (!flag) return false
    flag = false
    setTimeout(() => {
      fn.apply(this, arguments)
      flag = true
    }, time)
  }
}

// 节流另一种写法
function throttle(fn, interval = 100) {
  // last为上一次触发回调的时间
  let last = 0

  // 将throttle处理结果当作函数返回
  return function () {
    // 保留调用时的this上下文
    let context = this
    // 保留调用时传入的参数
    let args = arguments
    // 记录本次触发回调的时间
    let now = +new Date()

    // 判断上次触发的时间和本次触发的时间差是否小于时间间隔的阈值
    if (now - last >= interval) {
      // 如果时间间隔大于我们设定的时间间隔阈值，则执行回调
      last = now
      fn.apply(context, args)
    }
  }
}
```
