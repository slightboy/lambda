var assert = require("assert");
var lambda = require('../lambda.js');


describe('lambda', function()
{
  describe('#basic compile', function()
  {

    it('should equal 1', function()
    {
      var func = lambda('e => e');
      assert.equal(1, func(1));
    })

  })


  describe('#cache', function()
  {

    it('should equal', function()
    {
      var func1 = lambda('e => e');
      var func2 = lambda('e => e');
      assert.equal(func1, func2);
    })
  })


  describe('#attach function', function()
  {

    it('named method', function()
    {
      function action(e) { return e; };
      var func = lambda('e => action(e)', action);
      assert.equal(1, func(1));
    })

    it('multi named method', function()
    {
      function action1(e) { return e; };
      function action2(e) { return e; };
      var func = lambda('e => action1(action2(e))', action1, action2);
      assert.equal(1, func(1));
    })

    it('named method', function()
    {
      function action1(e) { return e; };
      function action2(e) { return e; };
      function action3(e) { return e; };
      var func = lambda('e => action1(action2(action3(e)))', [action1, action2, action3]);
      assert.equal(1, func(1));
    })

  })


  describe('#attach with anonymous function', function()
  {

    it('anonymous method', function()
    {
      var func = lambda('e => $[0](e)', function(e) { return e; });
      assert.equal(1, func(1));
    })

    it('multi anonymous method', function()
    {
      var func = lambda('e => $[0]($[1](e))', function(e) { return e; }, function(e) { return e; });
      assert.equal(1, func(1));
    })

    it('array anonymous method', function()
    {
      var func = lambda('e => $[0]($[1](e))', [function(e) { return e; }, function(e) { return e; }, function(e) { return e; }]);
      assert.equal(1, func(1));
    })


  })




  describe('#attach with lambda', function()
  {

    it('lambda', function()
    {
      var func = lambda('e => $[0](e)', 'e => e');
      assert.equal(1, func(1));
    })

    it('multi lambda', function()
    {
      var func = lambda('e => $[0]($[1](e))', 'e => e', 'e => e');
      assert.equal(1, func(1));
    })


    it('array lambda', function()
    {
      var func = lambda('e => $[0]($[1](e))', ['e => e', 'e => e', 'e => e']);
      assert.equal(1, func(1));
    })   


  })




  describe('#attach with param obj', function()
  {

    it('lambda', function()
    {
      var func = lambda({exp: 'e => func(e)', func:'e => e'});
      assert.equal(1, func(1));
    })

    it('array lambda', function()
    {
      var func = lambda({exp: 'e => $[0]($[1](e))', func1: ['e => e', 'e => e', 'e => e']});
      assert.equal(1, func(1));
    })   


  })


  describe('#mix', function()
  {

    it('lambda', function()
    {
      var func = lambda({exp: 'e => func1(func($[2]($[1]($[0](e)))))', func:'e => e'}, [function(e){return e;}, 'e => e'], 'e => e', {func1: 'e => e'});
      assert.equal(1, func(1));
    })


  })
})