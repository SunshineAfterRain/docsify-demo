function mynew(obj, ...args){
    //1.创建一个新的对象，而且对象上的__proto__ 属性 执行obj.prototype 
    console.log(obj.prototype, args)
    let newObj = Object.create(obj.prototype)
    console.log(newObj,Array.prototype.slice.call(arguments, 1))
    //2.
    let res = obj.apply(newObj, args)
    return typeof res === 'object'? res : newObj
}

function Person(){
    this.age = 10
}

let a =  mynew(Person, 20)
console.log(a)