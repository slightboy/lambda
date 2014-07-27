var lambda = require('../');

var func = lambda('e => e > 1');
var data = [0, 1, 2, 3];

console.log(data.filter(func));