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
```
