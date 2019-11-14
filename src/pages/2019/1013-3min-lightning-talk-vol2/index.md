---
title: "3min lightning talk vol.2 in CC10"
date: "2019-10-13"
tags:
  - CC10
  - WIP
---

## Intro

## Global context

```js
```

## Function context

```js
// Function Declaration
function fn1() {
  return this;
}

console.log(fn1()); // this === `global` object in Node.js

console.log(fn1 === this.fn1); // fn1 is a method defined in `global` object on Node.js
```

```js
function fn1() {
  const param = "test!!";
  return this.param;
}

console.log(fn1()); // undefined（this === `global` object in Node.js）
```

```js
function fn1() {
  const param = "test!!";
  return this.param;
}

this.param = "Global!!";

console.log(fn1());
```
