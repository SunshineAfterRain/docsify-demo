<!--
 * @Author: Tango
 * @Date: 2022-02-22 16:32:11
 * @LastEditTime: 2022-02-22 17:25:42
 * @LastEditors: Tango
 * @Description:
 * @FilePath: \docsify-demo\docs\js\suanfa.md
 * 可以输入预定的版权声明、个性签名、空行等
-->

# 一些算法题

## 洗牌算法（打乱数组）

```js
let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

function upset(arr) {
  for (let i = 0; i < arr.length; i++) {
    let loc = Math.floor(Math.random() * arr.length) // 随机得出一个位置
    let temp = arr[i] // 当前位置的数字跟随机位置的数字进行交换
    arr[i] = arr[loc]
    arr[loc] = temp
  }
  return arr
}

upset(arr)

// 输出[ 9, 5, 8, 7, 1,10, 6, 4, 2, 3]
```

## 数组装水问题

![img](https://img2020.cnblogs.com/blog/2123988/202010/2123988-20201017171220669-1451670233.png)

问题 1： 求装最多水的容器，最大值是多少，找出对应下标

```js
// 示例：输入：[1,8,6,2,5,4,8,3,7]
// 输出：49

let arr = [1, 8, 6, 2, 5, 4, 8, 3, 7]
function maxArea(arr) {
  let left = 0 // 左边指针
  let right = arr.length - 1 // 右边指针
  let maxArea = 0 // 最大面积

  while (left < right) {
    maxArea = Math.max(
      maxArea,
      Math.min(arr[left], arr[right]) * (right - left) // 计算面积 最低的柱子乘以宽，
    )

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


```

问题 2： 计算一共能装多少水，返回数值。

```js
let arr = [0,1,0,2,1,0,1,3,2,1,2,1]
// 双指针法
function trap(arr) {
  let left = 1 // 左边指针
  let right = arr.length - 2 // 右边指针
  let res = 0 // 结果
  let l_max=arr[1]
  let r_max =arr[arr.length - 2]

  while (left <= right) {
    l_max = Math.max(arr[left], l_max)
    r_max = Math.max(arr[right], r_max)
    if (l_max < r_max) {
      // 如果左边高度比右边要矮 直接计算
      res += l_max-arr[left]
      left++
    } else {
      res += r_max-arr[right]
      right--
    }
  }
  console.log(res)
  return res
}
// 暴力法
function trap(arr){
  let res = 0
  for(let i=0;i<arr.length;i++){
    let l_max = 0;
    let r_max = 0
    // 找出左边最高的柱子
    for(let j=i;j>0;j--){
      l_max = Math.max(arr[j],l_max)
    }
    // 找出左边最高的柱子
    for(let j=i;j<arr.length;j++){
      r_max = Math.max(arr[j],r_max)
    }

    res += Math.min(l_max,r_max) - arr[i]

  }
  console.log(res)
}
```
