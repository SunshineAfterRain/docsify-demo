// 1. 实现一个new关键字
// function mynew(obj, ...args){
//     //1.创建一个新的对象，而且对象上的__proto__ 属性 执行obj.prototype
//     console.log(obj.prototype, args)
//     let newObj = Object.create(obj.prototype)
//     console.log(newObj,Array.prototype.slice.call(arguments, 1))
//     //2.
//     let res = obj.apply(newObj, args)
//     return typeof res === 'object'? res : newObj
// }

// function Person(){
//     this.age = 10
// }

// let a =  mynew(Person, 20)

// 2. 扁平化转树形结构
/**
 *  let arr = [
    {id: 1, name: '部门1', pid: 0},
    {id: 2, name: '部门2', pid: 1},
    {id: 3, name: '部门3', pid: 1},
    {id: 4, name: '部门4', pid: 3},
    {id: 5, name: '部门5', pid: 4},
]
输出结果
[
    {
        "id": 1,
        "name": "部门1",
        "pid": 0,
        "children": [
            {
                "id": 2,
                "name": "部门2",
                "pid": 1,
                "children": []
            },
            {
                "id": 3,
                "name": "部门3",
                "pid": 1,
                "children": [
                    // 结果 ,,,
                ]
            }
        ]
    }
]
 */

// function toTree(arr) {
//   let tree = []
//   let temp = {}
//   for (let i = 0; i < arr.length; i++) {
//     temp[arr[i].id] = arr[i]
//   }
//   for (let i in temp) {
//     if (temp[i].pid == 0) {
//       tree.push(temp[i])
//     } else {
//       if (!temp[temp[i].pid].children) {
//         temp[temp[i].pid].children = []
//       }

//       temp[temp[i].pid].children.push(temp[i])
//     }
//   }
//   return tree
// }
// let arr = [
//   { id: 1, name: "部门1", pid: 0 },
//   { id: 2, name: "部门2", pid: 1 },
//   { id: 3, name: "部门3", pid: 1 },
//   { id: 4, name: "部门4", pid: 3 },
//   { id: 5, name: "部门5", pid: 4 },
// ]
// console.log(toTree(arr))

// 3.实现防抖节流
// 防抖
// function debounce(fn, delay = 500) {
//   let timer
//   return function () {
//     if (timer) {
//       clearTimeout(timer)
//     }
//     timer = setTimeout(() => {
//       fn.apply(this, arguments)
//     }, delay)
//   }
// }

// //节流
// function throtte(fn, time = 500) {
//   let flag = true
//   return function () {
//     if (!flag) return false
//     flag = false
//     setTimeout(() => {
//       fn.apply(this, arguments)
//       flag = true
//     }, time)
//   }
// }

// 洗牌算法
// let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
// function upset(arr) {
//   for (let i = 0; i < arr.length; i++) {
//     let loc = Math.floor(Math.random() * arr.length)
//     let temp = arr[i]
//     arr[i] = arr[loc]
//     arr[loc] = temp
//   }
//   return arr
// }

// upset(arr)

// 数组装水 求最大面积

// let arr = [1, 8, 6, 2, 5, 4, 8, 3, 7]
// function maxArea(arr) {
//   let left = 0 // 左边指针
//   let right = arr.length - 1 // 右边指针
//   let maxArea = 0 // 最大面积

//   while (left < right) {
//     maxArea = Math.max(
//       maxArea,
//       Math.min(arr[left], arr[right]) * (right - left) // 计算面积 最低的柱子乘以宽，
//     )

//     if (arr[left] < arr[right]) {
//       // 如果左边高度比右边要矮 优先移动较矮的那一侧
//       left++
//     } else {
//       right--
//     }
//   }
//   console.log(maxArea)
//   return maxArea
// }
// maxArea(arr)

// // 数组装水 求一共可装多少水

// let arr = [0,1,0,2,1,0,1,3,2,1,2,1]
// // 双指针法
// function trap(arr) {
//   let left = 1 // 左边指针
//   let right = arr.length - 2 // 右边指针
//   let res = 0 // 结果
//   let l_max=arr[1]
//   let r_max =arr[arr.length - 2]

//   while (left <= right) {
//     l_max = Math.max(arr[left], l_max)
//     r_max = Math.max(arr[right], r_max)
//     if (l_max < r_max) {
//       // 如果左边高度比右边要矮 直接计算
//       res += l_max-arr[left]
//       left++
//     } else {
//       res += r_max-arr[right]
//       right--
//     }
//   }
//   console.log(res)
//   return res
// }

// // 暴力法
// function trap(arr){
//   let res = 0
//   for(let i=0;i<arr.length;i++){
//     let l_max = 0;
//     let r_max = 0
//     // 找出左边最高的柱子
//     for(let j=i;j>0;j--){
//       l_max = Math.max(arr[j],l_max)
//     }
//     // 找出左边最高的柱子
//     for(let j=i;j<arr.length;j++){
//       r_max = Math.max(arr[j],r_max)
//     }

//     res += Math.min(l_max,r_max) - arr[i]

//   }
//   console.log(res)
// }

// trap(arr)

// 深拷贝进阶版
// function cloneDeep(obj, map = new WeakMap()) {
//   if (obj === null) {
//     return null;
//   }

//   if (obj instanceof Date) {
//     // 如果是日期对象直接返回
//     return new Date(obj);
//   }

//   if (obj instanceof RegExp) {
//     // 如果是正则对象直接返回
//     return new RegExp(obj);
//   }

//   if (typeof obj !== "object") {
//     // 如果不是对象直接返回
//     return obj;
//   }

//   // 判断是否存在循环引用
//   if (map.has(obj)) {
//     return map.get(obj);
//   }

//   let res = Array.isArray(obj) ? [] : {};

//   map.set(obj, res);

//   Reflect.ownKeys(obj).forEach((key) => {
//     res[key] = cloneDeep(obj[key], map);
//   });

//   return res;
// }

// let obj = {
//   a: {
//     b: 1,
//     asd: function asdaaa() {},
//     ads: new Date(),
//     [{ asd: 1 }]: {
//       a: 1,
//     },
//   },
// };

// let newObj = cloneDeep(obj);
// console.log(newObj);

//实现一个并发请求函数concurrencyRequest(urls, maxNum)，要求如下：
//• 要求最大并发数 maxNum
//• 每当有一个请求返回，就留下一个空位，可以增加新的请求
//• 所有请求完成后，结果按照 urls 里面的顺序依次打出（发送请求的函数可以直接使用fetch即可）

const urls = [
  "www.baidu.com/1",
  "www.baidu.com/2",
  "www.baidu.com/3",
  "www.baidu.com/4",
  "www.baidu.com/5",
  "www.baidu.com/6",
  "www.baidu.com/7",
  "www.baidu.com/8",
  "www.baidu.com/9",
  "www.baidu.com/10",
  "www.baidu.com/11",
  "www.baidu.com/12",
];
function concurrencyRequest(urls, maxNum) {
  return new Promise((resolve, reject) => {
    if (urls.length == 0) {
      resolve([]);
      return;
    }
    let index = 0;
    let results = [];
    let count = 0; //当前请求完成的数量

    async function request() {
      if (index === urls.length) return;
      const i = index;
      const url = urls[i];
      index++;
      console.log(url);
      try {
        const resp = await fetch(url);
        results[i] = resp;
      } catch (error) {
        results[i] = error;
      }
      count++;
      if (count === urls.length) {
        resolve(results);
      }
      request();
    }

    let times = Math.min(maxNum, urls.length);
    for (let i = 0; i < times; i++) {
      request();
    }
  });
}
concurrencyRequest(urls, 1);
