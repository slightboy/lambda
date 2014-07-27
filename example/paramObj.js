var lambda = require('../');

var func = lambda({exp: 'e => action(e) && e > 1', action: function(e){ return e < 3 }});
var data = [0, 1, 2, 3];

console.log(data.filter(func));