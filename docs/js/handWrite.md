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


## 实现一个深拷贝
```js
function cloneDeep(obj, map = new WeakMap()) {
  if (obj === null) {
    return null;
  }

  if (obj instanceof Date) {
    // 如果是日期对象直接返回
    return new Date(obj);
  }

  if (obj instanceof RegExp) {
    // 如果是正则对象直接返回
    return new RegExp(obj);
  }

  if (typeof obj !== "object") { // 如果不是对象直接返回
    return obj;
  }

  // 判断是否存在循环引用
  if (map.has(obj)) {
    return map.get(obj);
  }

  let res = Array.isArray(obj) ? [] : {};

  map.set(obj, res);

  Reflect.ownKeys(obj).forEach((key) => {
    res[key] = cloneDeep(obj[key], map);
  });

  return res;
}
```

## 实现instanceof方法 
```js
//主要判断两边的原型是否相等
function instanceof(left, right){
  if(typeof left !== 'object' || left === null) return false

  while(true){
    if(left === null) return false
    if(left.__proto__ === right.prototype) return true
    left = left.__proto__
  }
}
```

### 实现并发请求数量控制

实现一个并发请求函数concurrencyRequest(urls, maxNum)，要求如下：
• 要求最大并发数 maxNum
• 每当有一个请求返回，就留下一个空位，可以增加新的请求
• 所有请求完成后，结果按照 urls 里面的顺序依次打出（发送请求的函数可以直接使用fetch即可）

```js

// 并发请求函数
const concurrencyRequest = (urls, maxNum) => {
    return new Promise((resolve) => {
        if (urls.length === 0) {
            resolve([]);
            return;
        }
        const results = [];
        let index = 0; // 下一个请求的下标
        let count = 0; // 当前请求完成的数量

        // 发送请求
        async function request() {
            if (index === urls.length) return;
            const i = index; // 保存序号，使result和urls相对应
            const url = urls[index];
            index++;
            console.log(url);
            try {
                const resp = await fetch(url);
                // resp 加入到results
                results[i] = resp;
            } catch (err) {
                // err 加入到results
                results[i] = err;
            } finally {
                count++;
                // 判断是否所有的请求都已完成
                if (count === urls.length) {
                    console.log('完成了');
                    resolve(results);
                }
                request();
            }
        }

        // maxNum和urls.length取最小进行调用
        const times = Math.min(maxNum, urls.length);
        for(let i = 0; i < times; i++) {
            request();
        }
    })
}
```

### 实现一个Scheduler类，使下面的代码能正确输出。
要求实现一个具有并发数量限制的异步任务调度器，可以规定最大同时运行的任务。

实现一个Scheduler类，使下面的代码能正确输出。

```js
// 延迟函数
const sleep = time => new Promise(resolve => setTimeout(resolve, time));

// 同时进行的任务最多2个
const scheduler = new Scheduler(2);

// 添加异步任务
// time: 任务执行的时间
// val: 参数
const addTask = (time, val) => {
    scheduler.add(() => {
        return sleep(time).then(() => console.log(val));
    });
};

addTask(1000, '1');
addTask(500, '2');
addTask(300, '3');
addTask(400, '4');
// 2
// 3
// 1
// 4

```
代码实现
```js
class Scheduler {
    constructor(max) {
        // 最大可并发任务数
        this.max = max;
        // 当前并发任务数
        this.count = 0;
        // 阻塞的任务队列
        this.queue = [];
    }

    async add(fn) {
        if (this.count >= this.max) {
            // 若当前正在执行的任务，达到最大容量max
            // 阻塞在此处，等待前面的任务执行完毕后将resolve弹出并执行
            await new Promise(resolve => this.queue.push(resolve));
        }
        // 当前并发任务数++
        this.count++;
        // 使用await执行此函数
        const res = await fn();
        // 执行完毕，当前并发任务数--
        this.count--;
        // 若队列中有值，将其resolve弹出，并执行
        // 以便阻塞的任务，可以正常执行
        this.queue.length && this.queue.shift()();
        // 返回函数执行的结果
        return res;
    }
}
```