// var m, n; //全局变量

// function outer_a1() {
//   var num = 10;
//   function inner() {
//     console.log(num); //打印了outer_a1中定义的num
//   }
//   m = inner;
// }
// outer_a1();
// m();

// function outer_a2() {
//   var num = 10;
//   function inner() {
//     console.log("just console"); //只做了简单的打印
//   }
//   n = inner;
// }
// outer_a2();
// n();

// let m;

// function outer_a1() {
//   let num = 10;
//   function inner() {
//     console.log(num); //打印了outer_a1中定义的num
//   }
//   m = inner;
// }
// outer_a1();
// m();

// -----------------------------------------------------------
// -----------------------------------------------------------
// 如果一个函数用到了外部的变量/参数，那么这个函数加上这个变量/参数，就形成了闭包
// 并不需要这个函数一定被返回
// function f1() {
//   let a = 1;
//   function f2() {
//     let a = 2;
//     function f3() {
//       console.log(a);
//     }

//     a = 22;
//     f3();
//   }
//   console.log(a);
//   a = 100;
//   f2();
// }

// -----------------------------------------------------------
// -----------------------------------------------------------
// for循环说明闭包
// 输出显示的是i的最终值，这里的最终值就是6
// 被封闭在一个共享的作用域中
// for (var i = 1; i <= 5; i++) {
//   setTimeout(() => {
//     console.log(i);
//   }, i * 1000);
// }

// // 如果在其中放入一个立即执行函数
// // 输出的还是5个6
// // 我们的IIFE造成的只是什么都没有的空的作用域，没有它自己的变量
// for (var i = 1; i <= 5; i++) {
//   (function () {
//     setTimeout(() => {
//       console.log(i);
//     }, i * 1000);
//   })();
// }

// // 它需要有自己的变量，用来在每个迭代中存储i的值
// for (var i = 1; i <= 5; i++) {
//   (function () {
//     var j = i;
//     setTimeout(() => {
//       console.log(j);
//     }, j * 1000);
//   })();
// }

// // 在迭代内部使用IIFE，每次迭代都会产生一个新的作用域
// for (var i = 1; i <= 5; i++) {
//   // 下面这一步的意义，立即执行函数的参数为i，但是呢，这个离职执行函数有自己的变量j
//   (function (j) {
//     setTimeout(() => {
//       console.log(j);
//     }, j * 1000);
//   })(i);
// }

// // 更简单的方法，直接用let声明，会产生不同的作用域
// // 因为let会生成块级作用域
// for (let i = 1; i <= 5; i++) {
//   setTimeout(() => {
//     console.log(i);
//   }, i * 1000);
// }

// -----------------------------------------------------------
// -----------------------------------------------------------
// 函数内部的函数，被返回出去了，并被调用
// 关键在于可以从外部获取到内部作用域的信息。
// function foo() {
//   var a = 2;

//   function bar() {
//     console.log(a);
//   }

//   return bar;
// }

// var baz = foo();

// baz(); // 这就形成了一个闭包

// -----------------------------------------------------------
// -----------------------------------------------------------

// function createCounter() {
//   let counter = 0;
//   const myFunction = function () {
//     // 引用函数外的counter
//     counter = counter + 1;
//     // 返回了counter
//     return counter;
//   };
//   // 把函数内部的函数return了出去，让外部可以访问内部的函数
//   // 保留了了内部函数诞生时的环境
//   return myFunction;
// }

// const increment = createCounter();

// const c1 = increment(); // counter 1
// const c2 = increment(); // 2
// const c3 = increment(); //3
// console.log("example increment", c1, c2, c3);

// -----------------------------------------------------------
// -----------------------------------------------------------
// 内部函数引用外部函数中的参数
// let arr = [1, 2, 3, 45, 5, 6, 7, 8, 88, 9, 9, 888];

// function between(a, b) {
//   // 这里是返回书
//   return function (v) {
//     return v >= a && v <= b;
//   };
// }

// // 可以直接放入a跟b的值
// arr.filter(between(3, 9));

// // 相当于
// arr.filter(function (v) {
//   return v >= 3 && v <= 9;
// });

// -----------------------------------------------------------
// -----------------------------------------------------------

// 获得价格区间10到100之间的商品
// const lessons = [
//   {
//     title: "盒子模型详解",
//     click: 29,
//     price: 300,
//   },
//   {
//     title: "Flex弹性盒模型",
//     click: 45,
//     price: 120,
//   },
//   {
//     tile: "Grid 栅格系统",
//     click: 19,
//     price: 67,
//   },
// ];

// function between(a, b) {
//   return function (obj) {
//     // 引用了外部函数的参数，形成了闭包
//     return obj.price >= a && obj.price <= b;
//   };
// }

//更好的展示
// console.table(lessons.filter(between(10, 100)));

// -----------------------------------------------------------
// -----------------------------------------------------------
// 对课程进行价格排序，或者点击排序
// const lessons = [
//   {
//     title: "盒子模型详解",
//     click: 29,
//     price: 300,
//   },
//   {
//     title: "Flex弹性盒模型",
//     click: 45,
//     price: 120,
//   },
//   {
//     title: "Grid 栅格系统",
//     click: 19,
//     price: 67,
//   },
// ];

// let ascendingOrder = lessons.sort(function (a, b) {
//   return a.price > b.price ? 1 : -1;
// });
// console.table(ascendingOrder);

// // let descendingOrder = lessons.sort(function (a, b) {
// //   return a.price > b.price ? -1 : 1;
// // });
// // console.table(descendingOrder);

// function order(field) {
//   return function (a, b) {
//     return a[field] > b[field] ? 1 : -1;
//   };
// }

// let sortClick1 = lessons.sort(order("click"));
// console.table(sortClick1);

// // 原数组的内容会被改变
// let sortPrice1 = lessons.sort(order("price"));
// console.table(sortPrice1);
// -----------------------------------------------------------
// -----------------------------------------------------------

// // 1.函数作为返回值
// function test() {
//   const a = 1;
//   return function () {
//     // 闭包就是函数诞生之初，函数引用外部参数或变量
//     // 会记住它们
//     console.log("a", a);
//   };
// }

// const fn = test();
// const a = 2;
// fn();
// // 控制台会打出多少？1

// // 2.函数作为值
// function test(fn) {
//   const a = 1;
//   fn();
// }

// const a = 2;
// function fn() {
//   console.log("a", a);
// }

// test(fn);
// // 控制台会打印出几？

// // 3.
// for (var i = 0; i < 5; i++) {
//   setTimeout(() => {
//     console.log(i++);
//   }, 1000);
// }

// console.log(i);
// 678910;

// -----------------------------------------------------------
// -----------------------------------------------------------
// 利用闭包实现一个模块化功能

// let module = (function () {
//   let a = 10;
//   let b = 4;
//   const add = () => {
//     // 这里就运用到了闭包
//     return a + b;
//   };
//   const sub = () => {
//     return a - b;
//   };

//   return {
//     add,
//     sub,
//     // 上面是es6语法
//     // add:add,
//     // sub:sub
//   };
// })();

// console.log(module.add());

// -----------------------------------------------------------
// -----------------------------------------------------------
// 如何在函数外部，获得函数内部的变量
// let a = 123;
// function fn1() {
//   let b = 456;
//   function fn2() {
//     console.log(b);
//   }
//   return fn2;
// }

// let fn3 = fn1();
// fn3();

// -----------------------------------------------------------
// -----------------------------------------------------------
// 闭包的用途
// 1.计数器

// 作用：读取函数内部的变量，这些变量始终在我们的内存中，使用闭包小心内存泄露
function a() {
  let start = 0;
  function b() {
    console.log(start); // 第一次读取到0
    return (start = start + 1);
    // return start++;
  }
  return b;
}

let inc = a();

inc();

// 主动释放变量
inc = null;
// 相当于
// function b() {
//   // 这是的start是0
//   console.log(start);
//   return start++;
// }

// 2.闭包能够封装对象的私有属性和方法
