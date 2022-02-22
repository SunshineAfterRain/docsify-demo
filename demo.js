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

// 数组装水 求一共可装多少水

let arr = [1, 8, 6, 2, 5, 4, 8, 3, 7]
function maxArea(arr) {
  let left = 1 // 左边指针
  let right = arr.length - 1 // 右边指针
  let maxArea = 0 // 最大面积

  while (left < right) {
    let height = Math.min(arr[left], right)
    if (arr[left] < arr[right]) {
      // 如果左边高度比右边要矮 优先移动较矮的那一侧
      left++
    } else {
      right--
    }
  }
  console.log(maxArea)
  return maxArea
}
maxArea(arr)
