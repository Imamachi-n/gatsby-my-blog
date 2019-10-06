---
title: 'What does "this" indicate in JavaScript?'
date: "2019-09-21"
tags:
  - CC10
  - WIP
---

## 1. Global context

The value of `this` is different among the global execution context.

### 1.1. Web Browser

In Web browser, `this` refers to `window` object.

```bash
> this
Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, parent: Window, …}
```

### 1.2. Node.js

In Node.js, `this` refers to `global` object.

```bash
$ node
> this
Object [global] {
  DTRACE_NET_SERVER_CONNECTION: [Function],
  DTRACE_NET_STREAM_END: [Function],
  DTRACE_HTTP_SERVER_REQUEST: [Function],
  DTRACE_HTTP_SERVER_RESPONSE: [Function],
  DTRACE_HTTP_CLIENT_REQUEST: [Function],
  DTRACE_HTTP_CLIENT_RESPONSE: [Function],
  global: [Circular],
  process:
   process {
     title: 'node',
     version: 'v10.13.0',
     versions:
      { http_parser: '2.8.0',
        node: '10.13.0',
        v8: '6.8.275.32-node.36',
        uv: '1.23.2',
        zlib: '1.2.11',
        ares: '1.14.0',
        modules: '64',
        nghttp2: '1.34.0',
        napi: '3',
        openssl: '1.1.0i',
        icu: '62.1',
        unicode: '11.0',
        cldr: '33.1',
        tz: '2018e' },
     arch: 'x64',
  ...
  clearImmediate: [Function: clearImmediate],
  clearInterval: [Function: clearInterval],
  clearTimeout: [Function: clearTimeout],
  setImmediate:
   { [Function: setImmediate] [Symbol(util.promisify.custom)]: [Function] },
  setInterval: [Function: setInterval],
  setTimeout:
   { [Function: setTimeout] [Symbol(util.promisify.custom)]: [Function] } }
```

### Reference

this - Global context  
<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this#Global_context>

Understanding "This" in JavaScript  
<https://www.codementor.io/dariogarciamoya/understanding--this--in-javascript-du1084lyn>

関数と this  
<https://jsprimer.net/basic/function-this/>

【JavaScript】アロー関数式を学ぶついでに this も復習する話  
<https://qiita.com/mejileben/items/69e5facdb60781927929>

1. `this` in context
2.

Arrow Function 以外の関数（メソッドも含む）における this は、実行時に決まる値となります。

関数における this の基本的な参照先（暗黙的に関数に渡す this の値）はベースオブジェクトとなります。 ベースオブジェクトとは「メソッドを呼ぶ際に、そのメソッドのドット演算子またはブラケット演算子のひとつ左にあるオブジェクト」のことを言います。

Node.js の場合、

```js
function fn1() {
  const param = "test!!"
  return console.log(this.param)
}
const fn2 = function() {
  const param = "test!!"
  return console.log(this.param)
}

fn1() // undefined, base object: Node.js global objects
fn2() // undefined, base object: Node.js global objects
```

```js
const obj = {
  param: "test!!",
  // 関数式をプロパティの値にしたメソッド
  method1: function() {
    return console.log(this.param)
  },
  // 短縮記法で定義したメソッド
  method2() {
    return console.log(this.param)
  },
}

obj.method1() // test!!, base object: obj
obj.method2() // test!!, base object: obj
```

以下の場合、`this`は`obj2`となる。

```js
const obj1 = {
  param: "test1!!",
  obj2: {
    param: "test2!!",
    // 関数式をプロパティの値にしたメソッド
    method1: function() {
      return console.log(this.param)
    },
    // 短縮記法で定義したメソッド
    method2() {
      return console.log(this.param)
    },
  },
}
```

`this`が定義した時点ではなく実行した時に決まるという性質が副作用をもたらす。

```js
const obj = {
  param: "test",
  fn1: function() {
    console.log(this)
    return console.log(this.param)
  },
}

// this -> objになる。
obj.fn1() // test
const fn2 = obj.fn1

// this -> Node.js global objectになる。
// this.paramが登録されていないため、undefinedになる。
fn2() // undefined

// bindを使うことで、指定したthisの値を持つ新しい関数を作る。
// this -> obj なので、obj.paramの値が表示される。
const fn3 = obj.fn1.bind(obj)
fn3() // test
```

Arrow Function 以外の関数において、this は定義した時ではなく実行した時に決定されます。

関数やメソッドの this を明示的に指定して関数を実行する方法もあります。 Function（関数オブジェクト）には call、apply、bind といった明示的に this を指定して関数を実行するメソッドが用意されています。

```js
// call -> 関数の実行結果を返す
関数.call(thisの値, ...関数の引数)

// apply -> 関数の実行結果を返す
関数.apply(thisの値, [関数の引数1, 関数の引数2])

// bind -> 指定したthisの値を持つ新しい関数を返す
関数.bind(thisの値, ...関数の引数) // => thisや引数がbindされた関数
```
