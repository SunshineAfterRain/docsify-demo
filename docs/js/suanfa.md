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

```
示例：输入：[1,8,6,2,5,4,8,3,7]
　　  输出：49


function maxArea


```

问题 2： 计算一共能装多少水，返回数值。
