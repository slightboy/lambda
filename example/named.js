var lambda = require('../');

(function()
{
  var func = lambda('e => action(e) && e > 1', function action(e){ return e < 3 });
  var data = [0, 1, 2, 3];

  console.log(data.filter(func));
})();


(function()
{
  var func = lambda('e => action(e) && e > 1', {action: function(e){ return e < 3 } });
  var data = [0, 1, 2, 3];

  console.log(data.filter(func));
})();