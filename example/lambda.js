var lambda = require('../');

var func = lambda('e => $[0](e) && e > 1', 'e => e <3');
var data = [0, 1, 2, 3];

console.log(data.filter(func));