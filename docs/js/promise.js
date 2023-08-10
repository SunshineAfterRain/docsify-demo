/*
 * @Author: Tango
 * @Date: 2022-02-21 17:01:04
 * @LastEditTime: 2022-02-23 16:10:10
 * @LastEditors: Tango
 * @Description:
 * @FilePath: \docsify-demo\docs\js\promise.js
 * 可以输入预定的版权声明、个性签名、空行等
 */

class myPromise {
  constructor(executor) {
    try {
      executor(this.resolve, this.reject);
    } catch (error) {
      this.reject(error);
    }
  }
  //状态 一共有三种 pending fulfilled rejected
  status = "pending";
  value = null; // promise 的值
  reason = null; // reject 需要返回的原因
  onResolvedCallback = [];
  onRejectedCallback = [];

  resolve = (value) => {
    if (this.status === "pending") {
      this.value = value;
      this.status = "fulfilled";
      for (let i = 0; i < this.onResolvedCallback.length; i++) {
        this.onResolvedCallback[i](value);
      }
    }
  };
  reject = (reason) => {
    if (this.status === "pending") {
      this.reason = reason;
      this.status = "rejected";
      for (let i = 0; i < this.onRejectedCallback.length; i++) {
        this.onRejectedCallback[i](value);
      }
    }
  };

  then = (onFulfilled, onRejected) => {
    if (this.status === "fulfilled") {
      onFulfilled(this.value);
    } else if (this.status === "rejected") {
      onRejected(this.value);
    }
  };
}
