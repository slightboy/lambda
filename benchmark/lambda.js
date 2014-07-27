var lambda = require('../');

var Benchmark = require('benchmark');


(function(suite)
{
  var o = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  function where(value, func)
  {
    var result = [], e;
    for (var i = 0; i < value.length; i++)
    {
      e = value[i];
      if (func(e)) result.push(e);
    }
    return result;
  }

  var hcCache = function(e) { return e > 5; };
  var lambdaCache = lambda('e => e > 5');

  suite.add('basic#hardcode', function()
  {
    where(o, function(e) { return e > 5; });
  })
  suite.add('basic#hardcode cache', function()
  {
    where(o, hcCache);
  })
  .add('basic#lambda', function()
  {
    where(o, lambda('e => e > 5'));
  })
  .add('basic#lambda cache', function()
  {
    where(o, lambdaCache);
  })
  .on('cycle', function(event)
  {
    console.log(String(event.target));
  })
  .on('complete', function()
  {
    console.log('Fastest is ' + this.filter('fastest').pluck('name'));
  })

  .run({ 'async': true });
})(new Benchmark.Suite);

