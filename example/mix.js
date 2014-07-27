var lambda = require('../');

var func = lambda('e => $[0](e) && $[1](e) && $[2](e) && action1(e) && action2(e) && e > 1', ['e => e < 3', function(e){ return e < 3 }], 'e => e < 3', {action1: 'e => e < 3', action2: function(e){ return e < 3} }, function(e) { return e < 3;});
var data = [0, 1, 2, 3];

console.log(data.filter(func));