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
