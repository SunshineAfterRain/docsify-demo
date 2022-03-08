// 实现监听对象所以key value变化时打印其值
function proxy(obj) {
  if (typeof obj === "object") {
    for (let key in obj) {
      defineReactive(obj, key, obj[key]);
    }
  }
}
function defineReactive(obj, key, val) {
  proxy(val);
  Object.defineProperty(obj, key, {
    get() {
      return val;
    },
    set(newVal) {
      if (newVal === obj[key]) {
        return;
      }
      val = newVal;
      console.log(`set ${key} to ${newVal} `);
    },
  });
}
let obj = {
  a: 1,
  b: {
    c: 2,
    d: 3,
  },
};
proxy(obj);

obj.a = 2;
obj.b.c = 2;
obj.b.d = 4;

// 简单实现vue2.0 中如何监听数组改变
let arrPrototype = Array.prototype; // 保存原来数组的原型对象
let newArrPrototype = Object.create(arrPrototype); // 用原来的原型对象去创建一个新的对象

function arrProxy(arr) {
  if (Array.isArray(arr)) {
    arr.__proto__ = newArrPrototype; // 把传入的数组的原型对象改成新的原型对象
  }
}

// 重写数组方法
["splice", "push", "pop", "slice"].forEach((methodName) => {
  // 遍历重写数组方法
  newArrPrototype[methodName] = function () {
    // 先执行一遍原来的数组方法
    arrPrototype[methodName].call(this, ...arguments);

    // 触发渲染
  };
});

//
