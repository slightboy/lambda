
/*


        "(\\d)\\s+(\\.\\s*[a-z\\$_\\[(])": "$1 $2",
        "([+-])\\s+([+-])": "$1 $2",
        "\\b\\s+\\$\\s+\\b": " $ ",
        "\\$\\s+\\b": "$ ",
        "\\b\\s+\\$": " $",
        "\\b\\s+\\b": SPACE,
        "\\s+": REMOVE

 */
(function(window)
{

	var lambda = (function()
	{
		var cache = {};
		return function(value)
		{
			if (!value) return null;
			if (typeof(value) == 'function') return value;


			var args = parseArgs.apply(this, arguments);

			args.hash = hash(args);

			if(args.hash in cache)
			{

				cache[args.hash].hit++;
				return cache[args.hash].func;
			}

			lambda.precompile(args);

			var func = lambda.parser(args.exp);
			return (cache[args.hash] = { func:lambda.create(args, func), hit: 0 }).func;

		};

	})();

	lambda.precompile = function(args)
	{
		if (!args.func || args.func.length == 0) return;

		for (var i = 0; i < args.func.length; i++)
		{
			if (typeof(args.func[i].func) == 'string')
				args.func[i].func = lambda(args.func[i].func);
		};
	}
	
	lambda.parser = function(value)
	{
		var result = {params: [], body: ''},
				whitespaces = [' ', '	', '(', ')' , ','],
				part = [];

		for (var i = 0; i < value.length; i++)
		{
			
			if (function(character)
			{

				if (whitespaces.some(function(e){ return e === character; }))
				{

					if (part.length != 0)
					{
						result.params.push(part.join(''));
						part.length = 0;
					}

					if (result.params[result.params.length - 1] === '=>')
					{
						result.params.pop();
						result.body = value.substr(i + 1);
						return true;
					}
					return false;
				}
				part.push(character);
				return false;

			}(value.charAt(i)))
				break;
		};
		return result;
	};

	lambda.transformer = function(args, func)
	{
		for (var i = 0; i < args.func.length; i++) {
			
		};
	};

	lambda.create = function(args, func)
	{
		if (!args.func || args.func.length == 0)
			return new Function(func.params, 'return '+ func.body);


		var anonymous = [];
		var namedArgs = [];
		var params = [];
		for (var i = 0, item; i < args.func.length; i++)
		{
			item = args.func[i];
			if (item.name && item.name.length > 0)
			{
				namedArgs.push(item.name);
				params.push(item.func);
			}
			else
				anonymous.push(item.func);
		}

		anonymous.length > 0 && namedArgs.splice(0, 0, '$') && params.splice(0, 0, anonymous);

		var result = new Function(namedArgs.concat(func.params), 'return '+ func.body);

		return function()
		{
			return result.apply(null, Array.prototype.concat.apply(params, arguments));
		};

	}




	function parseArgs()
	{
	  var args = arguments;
	  var result = {};
	  if (args.length == 1 && typeof(args[0]) == 'string') return {exp: args[0]};

	  result.exp = args[0].exp || args[0];

	  if (typeof(result.exp) != 'string')
	        throw new TypeError('bad lambda expressions.');

	  result.func = [];
	  parseArgItem.apply(result.func, Array.prototype.slice.call(args, !args[0].exp));

	  return result;
	}

	function parseArgItem()
	{
	  function item(o)
	  {
	    if (Array.isArray(o)) return parseArgItem.apply(this, o);

	    if (typeof(o) == 'string') return this.push({ func: o });

	    if (typeof(o) == 'function') return this.push({ name: o.name || null, func: o });

	    var keys = Object.keys(o);
	    
	    for (var i = 0, count = keys.length; i < count; i++)
	    {
	    	if (Array.isArray(o[keys[i]]))
	    	{
	    		parseArgItem.apply(this, o[keys[i]]);
	    		break;
	    	}
	      if (keys[i] !== 'exp') this.push({name: keys[i], func: o[keys[i]]});
	    }
	  }

	  for (var i = 0, count = arguments.length; i < count; i++)
	    item.call(this, arguments[i]);
	}



	function hash(args)
	{
		if (!args.func || args.func.length == 0) return strhash(args.exp);
		var data = [];
		for (var i = 0, item; i < args.func.length; i++)
		{
			item = args.func[i];
			data.push(item.name +':'+ item.toString());
		};
		data.sort();

		return strhash(args.exp +'+'+ data.join(';'));
	}


	function strhash(value)
	{
		var hash = 5381,i = value.length;
	  while(i)
	    hash = (hash * 33) ^ value.charCodeAt(--i)
	  return hash >>> 0;
	};

	lambda.version = '0.0.10';
	module && module.exports && module.exports = lambda;
	
})(global || window);
