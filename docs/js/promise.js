/*
 * @Author: Tango
 * @Date: 2022-02-21 17:01:04
 * @LastEditTime: 2022-02-21 17:33:55
 * @LastEditors: Tango
 * @Description:
 * @FilePath: \docsify-demo\docs\js\promise.js
 * 可以输入预定的版权声明、个性签名、空行等
 */

class myPromise {
  constructor(executor) {
    try {
      executor(this.resolve, this.reject)
    } catch (error) {
      this.reject(error)
    }
  }
  //状态 一共有三种 pending fulfilled rejected
  status = "pending"
  value = null
  reason = null

  resolve = (value) => {
    if (this.status === "pending") {
      this.value = value
      this.status = "fulfilled"
    }
  }
  reject = (reason) => {
    if (this.status === "pending") {
      this.reason = reason
      this.status = "rejected"
    }
  }

  then = (onFulfilled, onRejected) => {
    if (this.status === "fulfilled") {
      onFulfilled(this.value)
    } else if (this.status === "rejected") {
      onrejected(this.value)
    }
  }
}
