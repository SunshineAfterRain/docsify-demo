# 手写常见js面试题

## 实现一个new关键字

```js
function new(obj, ...args){
    //1.创建一个新的对象，而且对象上的__proto__ 属性 执行obj.prototype 
    let newObj = Object.create(obj.prototype)
    //2.
    let res = obj.apply(newObj, ...args)
    return typeof res === 'object'? res : newObj
}
```