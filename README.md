lambda
======
node lambda compiler with cache.

## Installation

```bash
$ npm install epiclambda

```js
var lambda = require('epiclambda');

## Usage

Example _basic.js_:

```js
var func = lambda('e => e > 1');
var data = [0, 1, 2, 3];

console.log(data.filter(func));
```

## With Anonymous Function

You can access the anonymous function using $(Array)

Example _anonymous.js_:

```js
var func = lambda('e => $[0](e) && e > 1', function(e){ return e < 3 });
var data = [0, 1, 2, 3];

console.log(data.filter(func));
```

## With Named Function

Example _named.js_:

```js
var func = lambda('e => action(e) && e > 1', function action(e){ return e < 3 });
var data = [0, 1, 2, 3];

console.log(data.filter(func));
```

or like this:

```js
var func = lambda('e => action(e) && e > 1', {action: function (e){ return e < 3 }});
var data = [0, 1, 2, 3];

console.log(data.filter(func));
```

## With Other lambda Expression

Example _lambda.js_:

```js
var func = lambda('e => $[0](e) && e > 1', 'e => e <3');
var data = [0, 1, 2, 3];

console.log(data.filter(func));
```

## Mix

You can use any format you want. have fun. :)

Example _mix.js_:

```js
var func = lambda('e => $[0](e) && $[1](e) && $[2](e) && action1(e) && action2(e) && e > 1', ['e => e < 3', function(e){ return e < 3 }], 'e => e < 3', {action1: 'e => e < 3', action2: function(e){ return e < 3} }, function(e) { return e < 3;});
var data = [0, 1, 2, 3];

console.log(data.filter(func));
```

## Authors

 - S <git@slightboy.net>