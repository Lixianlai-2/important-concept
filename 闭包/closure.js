var m, n; //全局变量

function outer_a1() {
  var num = 10;
  function inner() {
    console.log(num); //打印了outer_a1中定义的num
  }
  m = inner;
}
outer_a1();
m();

function outer_a2() {
  var num = 10;
  function inner() {
    console.log("just console"); //只做了简单的打印
  }
  n = inner;
}
outer_a2();
n();

let m;

function outer_a1() {
  let num = 10;
  function inner() {
    console.log(num); //打印了outer_a1中定义的num
  }
  m = inner;
}
outer_a1();
m();

// -----------------------------------------------------------
// -----------------------------------------------------------
// 如果一个函数用到了外部的变量/参数，那么这个函数加上这个变量/参数，就形成了闭包
// 并不需要这个函数一定被返回
function f1() {
  let a = 1;
  function f2() {
    let a = 2;
    function f3() {
      console.log(a);
    }

    a = 22;
    f3();
  }
  console.log(a);
  a = 100;
  f2();
}

// -----------------------------------------------------------
// -----------------------------------------------------------
// for循环说明闭包
// 输出显示的是i的最终值，这里的最终值就是6
// 被封闭在一个共享的作用域中
for (var i = 1; i <= 5; i++) {
  setTimeout(() => {
    console.log(i);
  }, i * 1000);
}

// 如果在其中放入一个立即执行函数
// 输出的还是5个6
// 我们的IIFE造成的只是什么都没有的空的作用域，没有它自己的变量
for (var i = 1; i <= 5; i++) {
  (function () {
    setTimeout(() => {
      console.log(i);
    }, i * 1000);
  })();
}

// 它需要有自己的变量，用来在每个迭代中存储i的值
for (var i = 1; i <= 5; i++) {
  (function () {
    var j = i;
    setTimeout(() => {
      console.log(j);
    }, j * 1000);
  })();
}

// 在迭代内部使用IIFE，每次迭代都会产生一个新的作用域
for (var i = 1; i <= 5; i++) {
  // 下面这一步的意义，立即执行函数的参数为i，但是呢，这个离职执行函数有自己的变量j
  (function (j) {
    setTimeout(() => {
      console.log(j);
    }, j * 1000);
  })(i);
}

// 更简单的方法，直接用let声明，会产生不同的作用域
// 因为let会生成块级作用域
for (let i = 1; i <= 5; i++) {
  setTimeout(() => {
    console.log(i);
  }, i * 1000);
}

// -----------------------------------------------------------
// -----------------------------------------------------------
// 函数内部的函数，被返回出去了，并被调用
// 关键在于可以从外部获取到内部作用域的信息。
function foo() {
  var a = 2;

  function bar() {
    console.log(a);
  }

  return bar;
}

var baz = foo();

baz(); // 这就形成了一个闭包

// -----------------------------------------------------------
// -----------------------------------------------------------

function createCounter() {
  let counter = 0;
  const myFunction = function () {
    // 引用函数外的counter
    counter = counter + 1;
    // 返回了counter
    return counter;
  };
  // 把函数内部的函数return了出去，让外部可以访问内部的函数
  // 保留了了内部函数诞生时的环境
  return myFunction;
}

const increment = createCounter();

const c1 = increment(); // counter 1
const c2 = increment(); // 2
const c3 = increment(); //3
console.log("example increment", c1, c2, c3);

// -----------------------------------------------------------
// -----------------------------------------------------------
// 内部函数引用外部函数中的参数
let arr = [1, 2, 3, 45, 5, 6, 7, 8, 88, 9, 9, 888];

function between(a, b) {
  // 这里是返回书
  return function (v) {
    return v >= a && v <= b;
  };
}

// 可以直接放入a跟b的值
arr.filter(between(3, 9));

// 相当于
arr.filter(function (v) {
  return v >= 3 && v <= 9;
});

// -----------------------------------------------------------
// -----------------------------------------------------------
// 获得价格区间10到100之间的商品

const arrays = [
  {
    title: "盒子模型详解",
    click: 29,
    price: 300,
  },
  {
    title: "Flex弹性盒模型",
    click: 45,
    price: 120,
  },
  {
    tile: "Grid 栅格系统",
    click: 19,
    price: 67,
  },
];

function between(a, b) {
  return function (obj) {
    // 引用了外部函数的参数，形成了闭包
    return obj.price >= a && obj.price <= b;
  };
}

//更好的展示
console.table(arrays.filter(between(10, 100)));

// -----------------------------------------------------------
// -----------------------------------------------------------
