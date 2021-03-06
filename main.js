(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}

console.warn('Compiled in DEV mode. Follow the advice at https://elm-lang.org/0.19.0/optimize for better performance and smaller assets.');


var _List_Nil_UNUSED = { $: 0 };
var _List_Nil = { $: '[]' };

function _List_Cons_UNUSED(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === elm$core$Basics$EQ ? 0 : ord === elm$core$Basics$LT ? -1 : 1;
	}));
});



// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	/**/
	if (x.$ === 'Set_elm_builtin')
	{
		x = elm$core$Set$toList(x);
		y = elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = elm$core$Dict$toList(x);
		y = elm$core$Dict$toList(y);
	}
	//*/

	/**_UNUSED/
	if (x.$ < 0)
	{
		x = elm$core$Dict$toList(x);
		y = elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**_UNUSED/
	if (typeof x.$ === 'undefined')
	//*/
	/**/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? elm$core$Basics$LT : n ? elm$core$Basics$GT : elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0_UNUSED = 0;
var _Utils_Tuple0 = { $: '#0' };

function _Utils_Tuple2_UNUSED(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3_UNUSED(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr_UNUSED(c) { return c; }
function _Utils_chr(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log_UNUSED = F2(function(tag, value)
{
	return value;
});

var _Debug_log = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString_UNUSED(value)
{
	return '<internals>';
}

function _Debug_toString(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof DataView === 'function' && value instanceof DataView)
	{
		return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
	}

	if (typeof File === 'function' && value instanceof File)
	{
		return _Debug_internalColor(ansi, '<' + value.name + '>');
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[94m' + string + '\x1b[0m' : string;
}

function _Debug_toHexDigit(n)
{
	return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}


// CRASH


function _Debug_crash_UNUSED(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.start.line === region.end.line)
	{
		return 'on line ' + region.start.line;
	}
	return 'on lines ' + region.start.line + ' through ' + region.end.line;
}



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800, code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return word
		? elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? elm$core$Maybe$Nothing
		: elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? elm$core$Maybe$Just(n) : elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




/**/
function _Json_errorToString(error)
{
	return elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

function _Json_decodePrim(decoder)
{
	return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function(value) {
	return (typeof value !== 'number')
		? _Json_expecting('an INT', value)
		:
	(-2147483647 < value && value < 2147483647 && (value | 0) === value)
		? elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? elm$core$Result$Ok(value)
		: (value instanceof String)
			? elm$core$Result$Ok(value + '')
			: _Json_expecting('a STRING', value);
});

function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }

function _Json_decodeNull(value) { return { $: 5, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 6,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 7,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 8,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 9,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 10,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 11,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return elm$core$Result$Err(A2(elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 2:
			return decoder.b(value);

		case 5:
			return (value === null)
				? elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 3:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 4:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 6:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return (elm$core$Result$isOk(result)) ? result : elm$core$Result$Err(A2(elm$json$Json$Decode$Field, field, result.a));

		case 7:
			var index = decoder.e;
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return (elm$core$Result$isOk(result)) ? result : elm$core$Result$Err(A2(elm$json$Json$Decode$Index, index, result.a));

		case 8:
			if (typeof value !== 'object' || value === null || _Json_isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!elm$core$Result$isOk(result))
					{
						return elm$core$Result$Err(A2(elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return elm$core$Result$Ok(elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if (elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return elm$core$Result$Err(elm$json$Json$Decode$OneOf(elm$core$List$reverse(errors)));

		case 1:
			return elm$core$Result$Err(A2(elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!elm$core$Result$isOk(result))
		{
			return elm$core$Result$Err(A2(elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList !== 'undefined' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2(elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return elm$core$Result$Err(A2(elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 2:
			return x.b === y.b;

		case 5:
			return x.c === y.c;

		case 3:
		case 4:
		case 8:
			return _Json_equality(x.b, y.b);

		case 6:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 7:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 9:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 10:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 11:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap(value) { return { $: 0, a: value }; }
function _Json_unwrap(value) { return value.a; }

function _Json_wrap_UNUSED(value) { return value; }
function _Json_unwrap_UNUSED(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	elm$core$Result$isOk(result) || _Debug_crash(2 /**/, _Json_errorToString(result.a) /**/);
	var managers = {};
	result = init(result.a);
	var model = result.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		result = A2(update, msg, model);
		stepper(model = result.a, viewMetadata);
		_Platform_dispatchEffects(managers, result.b, subscriptions(model));
	}

	_Platform_dispatchEffects(managers, result.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				p: bag.n,
				q: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.q)
		{
			x = temp.p(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		r: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].r;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		r: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].r;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}



var _Bitwise_and = F2(function(a, b)
{
	return a & b;
});

var _Bitwise_or = F2(function(a, b)
{
	return a | b;
});

var _Bitwise_xor = F2(function(a, b)
{
	return a ^ b;
});

function _Bitwise_complement(a)
{
	return ~a;
};

var _Bitwise_shiftLeftBy = F2(function(offset, a)
{
	return a << offset;
});

var _Bitwise_shiftRightBy = F2(function(offset, a)
{
	return a >> offset;
});

var _Bitwise_shiftRightZfBy = F2(function(offset, a)
{
	return a >>> offset;
});




// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**_UNUSED/
	var node = args['node'];
	//*/
	/**/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS


function _VirtualDom_noScript(tag)
{
	return tag == 'script' ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return /^(on|formAction$)/i.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri_UNUSED(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,'')) ? '' : value;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,''))
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri_UNUSED(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value) ? '' : value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value)
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2(elm$json$Json$Decode$map, func, handler.a)
				:
			A3(elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		message: func(record.message),
		stopPropagation: record.stopPropagation,
		preventDefault: record.preventDefault
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		((key !== 'value' && key !== 'checked') || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		typeof value !== 'undefined'
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		typeof value !== 'undefined'
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.message;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.stopPropagation;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.preventDefault) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		var newMatch = undefined;
		var oldMatch = undefined;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}




// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var view = impl.view;
			/**_UNUSED/
			var domNode = args['node'];
			//*/
			/**/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.setup && impl.setup(sendToApp)
			var view = impl.view;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.body);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.title) && (_VirtualDom_doc.title = title = doc.title);
			});
		}
	);
});



// ANIMATION


var _Browser_cancelAnimationFrame =
	typeof cancelAnimationFrame !== 'undefined'
		? cancelAnimationFrame
		: function(id) { clearTimeout(id); };

var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { return setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.onUrlChange;
	var onUrlRequest = impl.onUrlRequest;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		setup: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.hasAttribute('download'))
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.protocol === next.protocol
							&& curr.host === next.host
							&& curr.port_.a === next.port_.a
						)
							? elm$browser$Browser$Internal(next)
							: elm$browser$Browser$External(href)
					));
				}
			});
		},
		init: function(flags)
		{
			return A3(impl.init, flags, _Browser_getUrl(), key);
		},
		view: impl.view,
		update: impl.update,
		subscriptions: impl.subscriptions
	});
}

function _Browser_getUrl()
{
	return elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return elm$core$Result$isOk(result) ? elm$core$Maybe$Just(result.a) : elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { hidden: 'hidden', change: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { hidden: 'mozHidden', change: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { hidden: 'msHidden', change: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { hidden: 'webkitHidden', change: 'webkitvisibilitychange' }
		: { hidden: 'hidden', change: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = _Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			_Browser_cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail(elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		scene: _Browser_getScene(),
		viewport: {
			x: _Browser_window.pageXOffset,
			y: _Browser_window.pageYOffset,
			width: _Browser_doc.documentElement.clientWidth,
			height: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		width: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		height: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			scene: {
				width: node.scrollWidth,
				height: node.scrollHeight
			},
			viewport: {
				x: node.scrollLeft,
				y: node.scrollTop,
				width: node.clientWidth,
				height: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			scene: _Browser_getScene(),
			viewport: {
				x: x,
				y: y,
				width: _Browser_doc.documentElement.clientWidth,
				height: _Browser_doc.documentElement.clientHeight
			},
			element: {
				x: x + rect.left,
				y: y + rect.top,
				width: rect.width,
				height: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}



function _Time_now(millisToPosix)
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(millisToPosix(Date.now())));
	});
}

var _Time_setInterval = F2(function(interval, task)
{
	return _Scheduler_binding(function(callback)
	{
		var id = setInterval(function() { _Scheduler_rawSpawn(task); }, interval);
		return function() { clearInterval(id); };
	});
});

function _Time_here()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(
			A2(elm$time$Time$customZone, -(new Date().getTimezoneOffset()), _List_Nil)
		));
	});
}


function _Time_getZoneName()
{
	return _Scheduler_binding(function(callback)
	{
		try
		{
			var name = elm$time$Time$Name(Intl.DateTimeFormat().resolvedOptions().timeZone);
		}
		catch (e)
		{
			var name = elm$time$Time$Offset(new Date().getTimezoneOffset());
		}
		callback(_Scheduler_succeed(name));
	});
}



// DECODER

var _File_decoder = _Json_decodePrim(function(value) {
	// NOTE: checks if `File` exists in case this is run on node
	return (typeof File !== 'undefined' && value instanceof File)
		? elm$core$Result$Ok(value)
		: _Json_expecting('a FILE', value);
});


// METADATA

function _File_name(file) { return file.name; }
function _File_mime(file) { return file.type; }
function _File_size(file) { return file.size; }

function _File_lastModified(file)
{
	return elm$time$Time$millisToPosix(file.lastModified);
}


// DOWNLOAD

var _File_downloadNode;

function _File_getDownloadNode()
{
	return _File_downloadNode || (_File_downloadNode = document.createElement('a'));
}

var _File_download = F3(function(name, mime, content)
{
	return _Scheduler_binding(function(callback)
	{
		var blob = new Blob([content], {type: mime});

		// for IE10+
		if (navigator.msSaveOrOpenBlob)
		{
			navigator.msSaveOrOpenBlob(blob, name);
			return;
		}

		// for HTML5
		var node = _File_getDownloadNode();
		var objectUrl = URL.createObjectURL(blob);
		node.href = objectUrl;
		node.download = name;
		_File_click(node);
		URL.revokeObjectURL(objectUrl);
	});
});

function _File_downloadUrl(href)
{
	return _Scheduler_binding(function(callback)
	{
		var node = _File_getDownloadNode();
		node.href = href;
		node.download = '';
		node.origin === location.origin || (node.target = '_blank');
		_File_click(node);
	});
}


// IE COMPATIBILITY

function _File_makeBytesSafeForInternetExplorer(bytes)
{
	// only needed by IE10 and IE11 to fix https://github.com/elm/file/issues/10
	// all other browsers can just run `new Blob([bytes])` directly with no problem
	//
	return new Uint8Array(bytes.buffer, bytes.byteOffset, bytes.byteLength);
}

function _File_click(node)
{
	// only needed by IE10 and IE11 to fix https://github.com/elm/file/issues/11
	// all other browsers have MouseEvent and do not need this conditional stuff
	//
	if (typeof MouseEvent === 'function')
	{
		node.dispatchEvent(new MouseEvent('click'));
	}
	else
	{
		var event = document.createEvent('MouseEvents');
		event.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		document.body.appendChild(node);
		node.dispatchEvent(event);
		document.body.removeChild(node);
	}
}


// UPLOAD

var _File_node;

function _File_uploadOne(mimes)
{
	return _Scheduler_binding(function(callback)
	{
		_File_node = document.createElement('input');
		_File_node.type = 'file';
		_File_node.accept = A2(elm$core$String$join, ',', mimes);
		_File_node.addEventListener('change', function(event)
		{
			callback(_Scheduler_succeed(event.target.files[0]));
		});
		_File_click(_File_node);
	});
}

function _File_uploadOneOrMore(mimes)
{
	return _Scheduler_binding(function(callback)
	{
		_File_node = document.createElement('input');
		_File_node.type = 'file';
		_File_node.multiple = true;
		_File_node.accept = A2(elm$core$String$join, ',', mimes);
		_File_node.addEventListener('change', function(event)
		{
			var elmFiles = _List_fromArray(event.target.files);
			callback(_Scheduler_succeed(_Utils_Tuple2(elmFiles.a, elmFiles.b)));
		});
		_File_click(_File_node);
	});
}


// CONTENT

function _File_toString(blob)
{
	return _Scheduler_binding(function(callback)
	{
		var reader = new FileReader();
		reader.addEventListener('loadend', function() {
			callback(_Scheduler_succeed(reader.result));
		});
		reader.readAsText(blob);
		return function() { reader.abort(); };
	});
}

function _File_toBytes(blob)
{
	return _Scheduler_binding(function(callback)
	{
		var reader = new FileReader();
		reader.addEventListener('loadend', function() {
			callback(_Scheduler_succeed(new DataView(reader.result)));
		});
		reader.readAsArrayBuffer(blob);
		return function() { reader.abort(); };
	});
}

function _File_toUrl(blob)
{
	return _Scheduler_binding(function(callback)
	{
		var reader = new FileReader();
		reader.addEventListener('loadend', function() {
			callback(_Scheduler_succeed(reader.result));
		});
		reader.readAsDataURL(blob);
		return function() { reader.abort(); };
	});
}



// CREATE

var _Regex_never = /.^/;

var _Regex_fromStringWith = F2(function(options, string)
{
	var flags = 'g';
	if (options.multiline) { flags += 'm'; }
	if (options.caseInsensitive) { flags += 'i'; }

	try
	{
		return elm$core$Maybe$Just(new RegExp(string, flags));
	}
	catch(error)
	{
		return elm$core$Maybe$Nothing;
	}
});


// USE

var _Regex_contains = F2(function(re, string)
{
	return string.match(re) !== null;
});


var _Regex_findAtMost = F3(function(n, re, str)
{
	var out = [];
	var number = 0;
	var string = str;
	var lastIndex = re.lastIndex;
	var prevLastIndex = -1;
	var result;
	while (number++ < n && (result = re.exec(string)))
	{
		if (prevLastIndex == re.lastIndex) break;
		var i = result.length - 1;
		var subs = new Array(i);
		while (i > 0)
		{
			var submatch = result[i];
			subs[--i] = submatch
				? elm$core$Maybe$Just(submatch)
				: elm$core$Maybe$Nothing;
		}
		out.push(A4(elm$regex$Regex$Match, result[0], result.index, number, _List_fromArray(subs)));
		prevLastIndex = re.lastIndex;
	}
	re.lastIndex = lastIndex;
	return _List_fromArray(out);
});


var _Regex_replaceAtMost = F4(function(n, re, replacer, string)
{
	var count = 0;
	function jsReplacer(match)
	{
		if (count++ >= n)
		{
			return match;
		}
		var i = arguments.length - 3;
		var submatches = new Array(i);
		while (i > 0)
		{
			var submatch = arguments[i];
			submatches[--i] = submatch
				? elm$core$Maybe$Just(submatch)
				: elm$core$Maybe$Nothing;
		}
		return replacer(A4(elm$regex$Regex$Match, match, arguments[arguments.length - 2], count, _List_fromArray(submatches)));
	}
	return string.replace(re, jsReplacer);
});

var _Regex_splitAtMost = F3(function(n, re, str)
{
	var string = str;
	var out = [];
	var start = re.lastIndex;
	var restoreLastIndex = re.lastIndex;
	while (n--)
	{
		var result = re.exec(string);
		if (!result) break;
		out.push(string.slice(start, result.index));
		start = re.lastIndex;
	}
	out.push(string.slice(start));
	re.lastIndex = restoreLastIndex;
	return _List_fromArray(out);
});

var _Regex_infinity = Infinity;
var author$project$Main$LinkClicked = function (a) {
	return {$: 'LinkClicked', a: a};
};
var author$project$Main$UrlChanged = function (a) {
	return {$: 'UrlChanged', a: a};
};
var elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var elm$core$Array$branchFactor = 32;
var elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 'Array_elm_builtin', a: a, b: b, c: c, d: d};
	});
var elm$core$Basics$EQ = {$: 'EQ'};
var elm$core$Basics$GT = {$: 'GT'};
var elm$core$Basics$LT = {$: 'LT'};
var elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3(elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var elm$core$List$cons = _List_cons;
var elm$core$Dict$toList = function (dict) {
	return A3(
		elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var elm$core$Dict$keys = function (dict) {
	return A3(
		elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2(elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var elm$core$Set$toList = function (_n0) {
	var dict = _n0.a;
	return elm$core$Dict$keys(dict);
};
var elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var elm$core$Array$foldr = F3(
	function (func, baseCase, _n0) {
		var tree = _n0.c;
		var tail = _n0.d;
		var helper = F2(
			function (node, acc) {
				if (node.$ === 'SubTree') {
					var subTree = node.a;
					return A3(elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3(elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			elm$core$Elm$JsArray$foldr,
			helper,
			A3(elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var elm$core$Array$toList = function (array) {
	return A3(elm$core$Array$foldr, elm$core$List$cons, _List_Nil, array);
};
var elm$core$Basics$ceiling = _Basics_ceiling;
var elm$core$Basics$fdiv = _Basics_fdiv;
var elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var elm$core$Basics$toFloat = _Basics_toFloat;
var elm$core$Array$shiftStep = elm$core$Basics$ceiling(
	A2(elm$core$Basics$logBase, 2, elm$core$Array$branchFactor));
var elm$core$Elm$JsArray$empty = _JsArray_empty;
var elm$core$Array$empty = A4(elm$core$Array$Array_elm_builtin, 0, elm$core$Array$shiftStep, elm$core$Elm$JsArray$empty, elm$core$Elm$JsArray$empty);
var elm$core$Array$Leaf = function (a) {
	return {$: 'Leaf', a: a};
};
var elm$core$Array$SubTree = function (a) {
	return {$: 'SubTree', a: a};
};
var elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var elm$core$List$reverse = function (list) {
	return A3(elm$core$List$foldl, elm$core$List$cons, _List_Nil, list);
};
var elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _n0 = A2(elm$core$Elm$JsArray$initializeFromList, elm$core$Array$branchFactor, nodes);
			var node = _n0.a;
			var remainingNodes = _n0.b;
			var newAcc = A2(
				elm$core$List$cons,
				elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var elm$core$Basics$eq = _Utils_equal;
var elm$core$Tuple$first = function (_n0) {
	var x = _n0.a;
	return x;
};
var elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = elm$core$Basics$ceiling(nodeListSize / elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2(elm$core$Elm$JsArray$initializeFromList, elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2(elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var elm$core$Basics$add = _Basics_add;
var elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var elm$core$Basics$floor = _Basics_floor;
var elm$core$Basics$gt = _Utils_gt;
var elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var elm$core$Basics$mul = _Basics_mul;
var elm$core$Basics$sub = _Basics_sub;
var elm$core$Elm$JsArray$length = _JsArray_length;
var elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.nodeListSize) {
			return A4(
				elm$core$Array$Array_elm_builtin,
				elm$core$Elm$JsArray$length(builder.tail),
				elm$core$Array$shiftStep,
				elm$core$Elm$JsArray$empty,
				builder.tail);
		} else {
			var treeLen = builder.nodeListSize * elm$core$Array$branchFactor;
			var depth = elm$core$Basics$floor(
				A2(elm$core$Basics$logBase, elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? elm$core$List$reverse(builder.nodeList) : builder.nodeList;
			var tree = A2(elm$core$Array$treeFromBuilder, correctNodeList, builder.nodeListSize);
			return A4(
				elm$core$Array$Array_elm_builtin,
				elm$core$Elm$JsArray$length(builder.tail) + treeLen,
				A2(elm$core$Basics$max, 5, depth * elm$core$Array$shiftStep),
				tree,
				builder.tail);
		}
	});
var elm$core$Basics$False = {$: 'False'};
var elm$core$Basics$idiv = _Basics_idiv;
var elm$core$Basics$lt = _Utils_lt;
var elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					elm$core$Array$builderToArray,
					false,
					{nodeList: nodeList, nodeListSize: (len / elm$core$Array$branchFactor) | 0, tail: tail});
			} else {
				var leaf = elm$core$Array$Leaf(
					A3(elm$core$Elm$JsArray$initialize, elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2(elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var elm$core$Basics$le = _Utils_le;
var elm$core$Basics$remainderBy = _Basics_remainderBy;
var elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return elm$core$Array$empty;
		} else {
			var tailLen = len % elm$core$Array$branchFactor;
			var tail = A3(elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - elm$core$Array$branchFactor;
			return A5(elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var elm$core$Maybe$Just = function (a) {
	return {$: 'Just', a: a};
};
var elm$core$Maybe$Nothing = {$: 'Nothing'};
var elm$core$Result$Err = function (a) {
	return {$: 'Err', a: a};
};
var elm$core$Result$Ok = function (a) {
	return {$: 'Ok', a: a};
};
var elm$core$Basics$True = {$: 'True'};
var elm$core$Result$isOk = function (result) {
	if (result.$ === 'Ok') {
		return true;
	} else {
		return false;
	}
};
var elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 'Failure', a: a, b: b};
	});
var elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 'Field', a: a, b: b};
	});
var elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 'Index', a: a, b: b};
	});
var elm$json$Json$Decode$OneOf = function (a) {
	return {$: 'OneOf', a: a};
};
var elm$core$Basics$and = _Basics_and;
var elm$core$Basics$append = _Utils_append;
var elm$core$Basics$or = _Basics_or;
var elm$core$Char$toCode = _Char_toCode;
var elm$core$Char$isLower = function (_char) {
	var code = elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var elm$core$Char$isUpper = function (_char) {
	var code = elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var elm$core$Char$isAlpha = function (_char) {
	return elm$core$Char$isLower(_char) || elm$core$Char$isUpper(_char);
};
var elm$core$Char$isDigit = function (_char) {
	var code = elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var elm$core$Char$isAlphaNum = function (_char) {
	return elm$core$Char$isLower(_char) || (elm$core$Char$isUpper(_char) || elm$core$Char$isDigit(_char));
};
var elm$core$List$length = function (xs) {
	return A3(
		elm$core$List$foldl,
		F2(
			function (_n0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var elm$core$List$map2 = _List_map2;
var elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2(elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var elm$core$List$range = F2(
	function (lo, hi) {
		return A3(elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			elm$core$List$map2,
			f,
			A2(
				elm$core$List$range,
				0,
				elm$core$List$length(xs) - 1),
			xs);
	});
var elm$core$String$all = _String_all;
var elm$core$String$fromInt = _String_fromNumber;
var elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var elm$core$String$uncons = _String_uncons;
var elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var elm$json$Json$Decode$indent = function (str) {
	return A2(
		elm$core$String$join,
		'\n    ',
		A2(elm$core$String$split, '\n', str));
};
var elm$json$Json$Encode$encode = _Json_encode;
var elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + (elm$core$String$fromInt(i + 1) + (') ' + elm$json$Json$Decode$indent(
			elm$json$Json$Decode$errorToString(error))));
	});
var elm$json$Json$Decode$errorToString = function (error) {
	return A2(elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 'Field':
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _n1 = elm$core$String$uncons(f);
						if (_n1.$ === 'Nothing') {
							return false;
						} else {
							var _n2 = _n1.a;
							var _char = _n2.a;
							var rest = _n2.b;
							return elm$core$Char$isAlpha(_char) && A2(elm$core$String$all, elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2(elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'Index':
					var i = error.a;
					var err = error.b;
					var indexName = '[' + (elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2(elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'OneOf':
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									elm$core$String$join,
									'',
									elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										elm$core$String$join,
										'',
										elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + (elm$core$String$fromInt(
								elm$core$List$length(errors)) + ' ways:'));
							return A2(
								elm$core$String$join,
								'\n\n',
								A2(
									elm$core$List$cons,
									introduction,
									A2(elm$core$List$indexedMap, elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								elm$core$String$join,
								'',
								elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + (elm$json$Json$Decode$indent(
						A2(elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var elm$json$Json$Decode$map2 = _Json_map2;
var NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$custom = elm$json$Json$Decode$map2(elm$core$Basics$apR);
var elm$json$Json$Decode$andThen = _Json_andThen;
var elm$json$Json$Decode$decodeValue = _Json_run;
var elm$json$Json$Decode$fail = _Json_fail;
var elm$json$Json$Decode$null = _Json_decodeNull;
var elm$json$Json$Decode$oneOf = _Json_oneOf;
var elm$json$Json$Decode$succeed = _Json_succeed;
var elm$json$Json$Decode$value = _Json_decodeValue;
var NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optionalDecoder = F3(
	function (pathDecoder, valDecoder, fallback) {
		var nullOr = function (decoder) {
			return elm$json$Json$Decode$oneOf(
				_List_fromArray(
					[
						decoder,
						elm$json$Json$Decode$null(fallback)
					]));
		};
		var handleResult = function (input) {
			var _n0 = A2(elm$json$Json$Decode$decodeValue, pathDecoder, input);
			if (_n0.$ === 'Ok') {
				var rawValue = _n0.a;
				var _n1 = A2(
					elm$json$Json$Decode$decodeValue,
					nullOr(valDecoder),
					rawValue);
				if (_n1.$ === 'Ok') {
					var finalResult = _n1.a;
					return elm$json$Json$Decode$succeed(finalResult);
				} else {
					var finalErr = _n1.a;
					return elm$json$Json$Decode$fail(
						elm$json$Json$Decode$errorToString(finalErr));
				}
			} else {
				return elm$json$Json$Decode$succeed(fallback);
			}
		};
		return A2(elm$json$Json$Decode$andThen, handleResult, elm$json$Json$Decode$value);
	});
var elm$json$Json$Decode$field = _Json_decodeField;
var NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional = F4(
	function (key, valDecoder, fallback, decoder) {
		return A2(
			NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$custom,
			A3(
				NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optionalDecoder,
				A2(elm$json$Json$Decode$field, key, elm$json$Json$Decode$value),
				valDecoder,
				fallback),
			decoder);
	});
var author$project$Data$Internal$Flags = function (answers) {
	return function (coders) {
		return function (codings) {
			return function (coding_answers) {
				return function (coding_frames) {
					return function (coding_questionaries) {
						return function (coding_questions) {
							return function (name) {
								return function (questions) {
									return function (questionaries) {
										return function (users) {
											return {answers: answers, coders: coders, coding_answers: coding_answers, coding_frames: coding_frames, coding_questionaries: coding_questionaries, coding_questions: coding_questions, codings: codings, name: name, questionaries: questionaries, questions: questions, users: users};
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var Chadtech$elm_relational_database$Id$Id = function (a) {
	return {$: 'Id', a: a};
};
var elm$core$Basics$identity = function (x) {
	return x;
};
var elm$json$Json$Decode$map = _Json_map1;
var elm$json$Json$Decode$string = _Json_decodeString;
var Chadtech$elm_relational_database$Id$decoder = A2(elm$json$Json$Decode$map, Chadtech$elm_relational_database$Id$Id, elm$json$Json$Decode$string);
var NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required = F3(
	function (key, valDecoder, decoder) {
		return A2(
			NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$custom,
			A2(elm$json$Json$Decode$field, key, valDecoder),
			decoder);
	});
var author$project$Entities$Answer$Model = F3(
	function (question, user, value) {
		return {question: question, user: user, value: value};
	});
var author$project$Entities$Answer$decoder = A4(
	NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
	'value',
	elm$json$Json$Decode$string,
	'',
	A3(
		NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
		'user',
		Chadtech$elm_relational_database$Id$decoder,
		A3(
			NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
			'question',
			Chadtech$elm_relational_database$Id$decoder,
			elm$json$Json$Decode$succeed(author$project$Entities$Answer$Model))));
var author$project$Entities$Coder$Model = function (name) {
	return {name: name};
};
var author$project$Entities$Coder$decoder = A3(
	NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
	'name',
	elm$json$Json$Decode$string,
	elm$json$Json$Decode$succeed(author$project$Entities$Coder$Model));
var author$project$Entities$Coding$Model = function (coder) {
	return {coder: coder};
};
var author$project$Entities$Coding$decoder = A3(
	NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
	'coder',
	Chadtech$elm_relational_database$Id$decoder,
	elm$json$Json$Decode$succeed(author$project$Entities$Coding$Model));
var author$project$Entities$Coding$Answer$Model = F4(
	function (coding_question, coding_frame, value, timestamp) {
		return {coding_frame: coding_frame, coding_question: coding_question, timestamp: timestamp, value: value};
	});
var author$project$Entities$Timestamp$Model = F3(
	function (created, modified, accessed) {
		return {accessed: accessed, created: created, modified: modified};
	});
var elm$json$Json$Decode$int = _Json_decodeInt;
var author$project$Entities$Timestamp$decoder = A3(
	NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
	'accessed',
	elm$json$Json$Decode$int,
	A3(
		NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
		'modified',
		elm$json$Json$Decode$int,
		A3(
			NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
			'created',
			elm$json$Json$Decode$int,
			elm$json$Json$Decode$succeed(author$project$Entities$Timestamp$Model))));
var author$project$Entities$Coding$Answer$decoder = A2(
	NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$custom,
	author$project$Entities$Timestamp$decoder,
	A3(
		NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
		'value',
		elm$json$Json$Decode$string,
		A3(
			NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
			'coding_frame',
			Chadtech$elm_relational_database$Id$decoder,
			A3(
				NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
				'coding_question',
				Chadtech$elm_relational_database$Id$decoder,
				elm$json$Json$Decode$succeed(author$project$Entities$Coding$Answer$Model)))));
var author$project$Entities$Coding$Frame$Model = F3(
	function (answer, coding, timestamp) {
		return {answer: answer, coding: coding, timestamp: timestamp};
	});
var author$project$Entities$Coding$Frame$decoder = A2(
	NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$custom,
	author$project$Entities$Timestamp$decoder,
	A3(
		NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
		'coding',
		Chadtech$elm_relational_database$Id$decoder,
		A3(
			NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
			'answer',
			Chadtech$elm_relational_database$Id$decoder,
			elm$json$Json$Decode$succeed(author$project$Entities$Coding$Frame$Model))));
var author$project$Entities$Coding$Question$Model = F3(
	function (coding_questionary, text, input_type) {
		return {coding_questionary: coding_questionary, input_type: input_type, text: text};
	});
var author$project$Form$InputNumber = function (a) {
	return {$: 'InputNumber', a: a};
};
var author$project$Form$InputString = {$: 'InputString'};
var jschomay$elm_bounded_number$Number$Bounded$Bounded = function (a) {
	return {$: 'Bounded', a: a};
};
var jschomay$elm_bounded_number$Number$Bounded$between = F2(
	function (a, b) {
		return (_Utils_cmp(a, b) < 0) ? jschomay$elm_bounded_number$Number$Bounded$Bounded(
			{max: b, min: a, n: a}) : jschomay$elm_bounded_number$Number$Bounded$Bounded(
			{max: a, min: b, n: b});
	});
var author$project$Form$inputTypeDecoder = A2(
	elm$json$Json$Decode$andThen,
	function (str) {
		switch (str) {
			case 'String':
				return elm$json$Json$Decode$succeed(author$project$Form$InputString);
			case 'Number':
				return elm$json$Json$Decode$succeed(
					author$project$Form$InputNumber(
						elm$core$Maybe$Just(
							A2(jschomay$elm_bounded_number$Number$Bounded$between, 1, 10))));
			default:
				var somethingElse = str;
				return elm$json$Json$Decode$fail('Unknown Type: ' + somethingElse);
		}
	},
	elm$json$Json$Decode$string);
var author$project$Entities$Coding$Question$decoder = A3(
	NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
	'input_type',
	author$project$Form$inputTypeDecoder,
	A3(
		NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
		'text',
		elm$json$Json$Decode$string,
		A3(
			NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
			'coding_questionary',
			Chadtech$elm_relational_database$Id$decoder,
			elm$json$Json$Decode$succeed(author$project$Entities$Coding$Question$Model))));
var author$project$Entities$Coding$Questionary$Model = function (question) {
	return {question: question};
};
var author$project$Entities$Coding$Questionary$decoder = A3(
	NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
	'question',
	Chadtech$elm_relational_database$Id$decoder,
	elm$json$Json$Decode$succeed(author$project$Entities$Coding$Questionary$Model));
var author$project$Entities$Question$Model = F3(
	function (questionary, text, input_type) {
		return {input_type: input_type, questionary: questionary, text: text};
	});
var author$project$Entities$Question$decoder = A3(
	NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
	'input_type',
	author$project$Form$inputTypeDecoder,
	A3(
		NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
		'text',
		elm$json$Json$Decode$string,
		A3(
			NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
			'questionary',
			Chadtech$elm_relational_database$Id$decoder,
			elm$json$Json$Decode$succeed(author$project$Entities$Question$Model))));
var author$project$Entities$Questionary$Model = function (name) {
	return {name: name};
};
var author$project$Entities$Questionary$decoder = A3(
	NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
	'name',
	elm$json$Json$Decode$string,
	elm$json$Json$Decode$succeed(author$project$Entities$Questionary$Model));
var author$project$Entities$User$Model = function (infos) {
	return {infos: infos};
};
var elm$core$Dict$RBEmpty_elm_builtin = {$: 'RBEmpty_elm_builtin'};
var elm$core$Dict$empty = elm$core$Dict$RBEmpty_elm_builtin;
var elm$core$Dict$Black = {$: 'Black'};
var elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: 'RBNode_elm_builtin', a: a, b: b, c: c, d: d, e: e};
	});
var elm$core$Basics$compare = _Utils_compare;
var elm$core$Dict$Red = {$: 'Red'};
var elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Red')) {
			var _n1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
				var _n3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Red,
					key,
					value,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, rK, rV, rLeft, rRight));
			} else {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) && (left.d.$ === 'RBNode_elm_builtin')) && (left.d.a.$ === 'Red')) {
				var _n5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _n6 = left.d;
				var _n7 = _n6.a;
				var llK = _n6.b;
				var llV = _n6.c;
				var llLeft = _n6.d;
				var llRight = _n6.e;
				var lRight = left.e;
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Red,
					lK,
					lV,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, llK, llV, llLeft, llRight),
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, key, value, lRight, right));
			} else {
				return A5(elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, key, value, elm$core$Dict$RBEmpty_elm_builtin, elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _n1 = A2(elm$core$Basics$compare, key, nKey);
			switch (_n1.$) {
				case 'LT':
					return A5(
						elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3(elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 'EQ':
					return A5(elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3(elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _n0 = A3(elm$core$Dict$insertHelp, key, value, dict);
		if ((_n0.$ === 'RBNode_elm_builtin') && (_n0.a.$ === 'Red')) {
			var _n1 = _n0.a;
			var k = _n0.b;
			var v = _n0.c;
			var l = _n0.d;
			var r = _n0.e;
			return A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _n0;
			return x;
		}
	});
var elm$core$Dict$fromList = function (assocs) {
	return A3(
		elm$core$List$foldl,
		F2(
			function (_n0, dict) {
				var key = _n0.a;
				var value = _n0.b;
				return A3(elm$core$Dict$insert, key, value, dict);
			}),
		elm$core$Dict$empty,
		assocs);
};
var elm$json$Json$Decode$keyValuePairs = _Json_decodeKeyValuePairs;
var elm$json$Json$Decode$dict = function (decoder) {
	return A2(
		elm$json$Json$Decode$map,
		elm$core$Dict$fromList,
		elm$json$Json$Decode$keyValuePairs(decoder));
};
var author$project$Entities$User$decoder = A3(
	NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
	'infos',
	elm$json$Json$Decode$dict(elm$json$Json$Decode$string),
	elm$json$Json$Decode$succeed(author$project$Entities$User$Model));
var author$project$Data$Internal$decoder = A4(
	NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
	'users',
	elm$json$Json$Decode$dict(author$project$Entities$User$decoder),
	elm$core$Dict$empty,
	A4(
		NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
		'questionaries',
		elm$json$Json$Decode$dict(author$project$Entities$Questionary$decoder),
		elm$core$Dict$empty,
		A4(
			NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
			'questions',
			elm$json$Json$Decode$dict(author$project$Entities$Question$decoder),
			elm$core$Dict$empty,
			A4(
				NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
				'name',
				elm$json$Json$Decode$string,
				'',
				A4(
					NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
					'coding_questions',
					elm$json$Json$Decode$dict(author$project$Entities$Coding$Question$decoder),
					elm$core$Dict$empty,
					A4(
						NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
						'coding_questionaries',
						elm$json$Json$Decode$dict(author$project$Entities$Coding$Questionary$decoder),
						elm$core$Dict$empty,
						A4(
							NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
							'coding_frames',
							elm$json$Json$Decode$dict(author$project$Entities$Coding$Frame$decoder),
							elm$core$Dict$empty,
							A4(
								NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
								'coding_answers',
								elm$json$Json$Decode$dict(author$project$Entities$Coding$Answer$decoder),
								elm$core$Dict$empty,
								A4(
									NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
									'codings',
									elm$json$Json$Decode$dict(author$project$Entities$Coding$decoder),
									elm$core$Dict$empty,
									A4(
										NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
										'coders',
										elm$json$Json$Decode$dict(author$project$Entities$Coder$decoder),
										elm$core$Dict$empty,
										A4(
											NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
											'answers',
											elm$json$Json$Decode$dict(author$project$Entities$Answer$decoder),
											elm$core$Dict$empty,
											elm$json$Json$Decode$succeed(author$project$Data$Internal$Flags))))))))))));
var Chadtech$elm_relational_database$Db$Db = function (a) {
	return {$: 'Db', a: a};
};
var Chadtech$elm_relational_database$Db$empty = Chadtech$elm_relational_database$Db$Db(elm$core$Dict$empty);
var author$project$Data$Internal$empty = {answers: Chadtech$elm_relational_database$Db$empty, coders: Chadtech$elm_relational_database$Db$empty, coding_answers: Chadtech$elm_relational_database$Db$empty, coding_frames: Chadtech$elm_relational_database$Db$empty, coding_questionaries: Chadtech$elm_relational_database$Db$empty, coding_questions: Chadtech$elm_relational_database$Db$empty, codings: Chadtech$elm_relational_database$Db$empty, name: '', questionaries: Chadtech$elm_relational_database$Db$empty, questions: Chadtech$elm_relational_database$Db$empty, users: Chadtech$elm_relational_database$Db$empty};
var author$project$Data$Internal$Model = function (answers) {
	return function (coders) {
		return function (codings) {
			return function (coding_answers) {
				return function (coding_frames) {
					return function (coding_questionaries) {
						return function (coding_questions) {
							return function (name) {
								return function (questions) {
									return function (questionaries) {
										return function (users) {
											return {answers: answers, coders: coders, coding_answers: coding_answers, coding_frames: coding_frames, coding_questionaries: coding_questionaries, coding_questions: coding_questions, codings: codings, name: name, questionaries: questionaries, questions: questions, users: users};
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var Chadtech$elm_relational_database$Id$toString = function (_n0) {
	var str = _n0.a;
	return str;
};
var elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							elm$core$List$foldl,
							fn,
							acc,
							elm$core$List$reverse(r4)) : A4(elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4(elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var elm$core$Tuple$mapFirst = F2(
	function (func, _n0) {
		var x = _n0.a;
		var y = _n0.b;
		return _Utils_Tuple2(
			func(x),
			y);
	});
var Chadtech$elm_relational_database$Db$fromList = function (items) {
	return Chadtech$elm_relational_database$Db$Db(
		elm$core$Dict$fromList(
			A2(
				elm$core$List$map,
				elm$core$Tuple$mapFirst(Chadtech$elm_relational_database$Id$toString),
				items)));
};
var Chadtech$elm_relational_database$Id$fromString = Chadtech$elm_relational_database$Id$Id;
var author$project$Data$Internal$initDictToDb = function (values) {
	return Chadtech$elm_relational_database$Db$fromList(
		A2(
			elm$core$List$map,
			function (_n0) {
				var key = _n0.a;
				var value = _n0.b;
				return _Utils_Tuple2(
					Chadtech$elm_relational_database$Id$fromString(key),
					value);
			},
			elm$core$Dict$toList(values)));
};
var elm$core$Platform$Cmd$batch = _Platform_batch;
var elm$core$Platform$Cmd$none = elm$core$Platform$Cmd$batch(_List_Nil);
var author$project$Data$Internal$init = function (flags) {
	var model = author$project$Data$Internal$Model(
		author$project$Data$Internal$initDictToDb(flags.answers))(
		author$project$Data$Internal$initDictToDb(flags.coders))(
		author$project$Data$Internal$initDictToDb(flags.codings))(
		author$project$Data$Internal$initDictToDb(flags.coding_answers))(
		author$project$Data$Internal$initDictToDb(flags.coding_frames))(
		author$project$Data$Internal$initDictToDb(flags.coding_questionaries))(
		author$project$Data$Internal$initDictToDb(flags.coding_questions))(flags.name)(
		author$project$Data$Internal$initDictToDb(flags.questions))(
		author$project$Data$Internal$initDictToDb(flags.questionaries))(
		author$project$Data$Internal$initDictToDb(flags.users));
	return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
};
var author$project$Material$defaultModel = {button: elm$core$Dict$empty, checkbox: elm$core$Dict$empty, chip: elm$core$Dict$empty, dialog: elm$core$Dict$empty, drawer: elm$core$Dict$empty, fab: elm$core$Dict$empty, iconButton: elm$core$Dict$empty, list: elm$core$Dict$empty, menu: elm$core$Dict$empty, radio: elm$core$Dict$empty, ripple: elm$core$Dict$empty, select: elm$core$Dict$empty, slider: elm$core$Dict$empty, snackbar: elm$core$Dict$empty, _switch: elm$core$Dict$empty, tabbar: elm$core$Dict$empty, textfield: elm$core$Dict$empty, toolbar: elm$core$Dict$empty, topAppBar: elm$core$Dict$empty};
var author$project$Page$Code$defaultModel = {mdc: author$project$Material$defaultModel};
var author$project$Page$Data$defaultModel = {mdc: author$project$Material$defaultModel};
var author$project$Page$Error$defaultModel = {error: _List_Nil, mdc: author$project$Material$defaultModel};
var author$project$Page$Home$defaultModel = {mdc: author$project$Material$defaultModel};
var author$project$Page$Url$Home = {$: 'Home'};
var author$project$Page$Login$defaultModel = {field: '', mdc: author$project$Material$defaultModel, next: author$project$Page$Url$Home, _var: 0};
var author$project$Page$StartPage$defaultModel = {mdc: author$project$Material$defaultModel};
var author$project$Page$Upload$defaultModel = {files: _List_Nil, hover: false, mdc: author$project$Material$defaultModel};
var author$project$Page$defaultPage = {code: author$project$Page$Code$defaultModel, data: author$project$Page$Data$defaultModel, error: author$project$Page$Error$defaultModel, home: author$project$Page$Home$defaultModel, login: author$project$Page$Login$defaultModel, start_page: author$project$Page$StartPage$defaultModel, upload: author$project$Page$Upload$defaultModel};
var author$project$Page$Internal$AppBar$defaultModel = {mdc: author$project$Material$defaultModel, overflow: false};
var author$project$Page$Internal$Drawer$defaultModel = {drawer: false, mdc: author$project$Material$defaultModel};
var author$project$Page$Internal$defaultModel = {appbar: author$project$Page$Internal$AppBar$defaultModel, drawer: author$project$Page$Internal$Drawer$defaultModel, mdc: author$project$Material$defaultModel, overflow: false};
var author$project$Page$Url$StartPage = {$: 'StartPage'};
var author$project$Page$Url$defaultUrl = author$project$Page$Url$StartPage;
var author$project$Page$defaultModel = {coding: elm$core$Maybe$Nothing, internal: author$project$Page$Internal$defaultModel, mdc: author$project$Material$defaultModel, page: author$project$Page$defaultPage, url: author$project$Page$Url$defaultUrl, user: elm$core$Maybe$Nothing};
var author$project$Page$Error$DecodeError = function (a) {
	return {$: 'DecodeError', a: a};
};
var author$project$Page$Url$Error = {$: 'Error'};
var elm$core$Bitwise$shiftRightZfBy = _Bitwise_shiftRightZfBy;
var elm$random$Random$Seed = F2(
	function (a, b) {
		return {$: 'Seed', a: a, b: b};
	});
var elm$random$Random$next = function (_n0) {
	var state0 = _n0.a;
	var incr = _n0.b;
	return A2(elm$random$Random$Seed, ((state0 * 1664525) + incr) >>> 0, incr);
};
var elm$random$Random$initialSeed = function (x) {
	var _n0 = elm$random$Random$next(
		A2(elm$random$Random$Seed, 0, 1013904223));
	var state1 = _n0.a;
	var incr = _n0.b;
	var state2 = (state1 + x) >>> 0;
	return elm$random$Random$next(
		A2(elm$random$Random$Seed, state2, incr));
};
var author$project$Main$init = F3(
	function (flags, url, key) {
		var result_flags = A2(elm$json$Json$Decode$decodeValue, author$project$Data$Internal$decoder, flags);
		if (result_flags.$ === 'Ok') {
			var flag_value = result_flags.a;
			var _n1 = author$project$Data$Internal$init(flag_value);
			var data = _n1.a;
			var rcmd = _n1.b;
			return _Utils_Tuple2(
				{
					data: data,
					key: key,
					page: author$project$Page$defaultModel,
					seed: elm$random$Random$initialSeed(42)
				},
				elm$core$Platform$Cmd$none);
		} else {
			var error = result_flags.a;
			var page_model_new = author$project$Page$defaultModel;
			var page_new1 = _Utils_update(
				page_model_new,
				{url: author$project$Page$Url$Error});
			var page_error = page_new1.page.error;
			var page_error_new = _Utils_update(
				page_error,
				{
					error: _List_fromArray(
						[
							author$project$Page$Error$DecodeError(error)
						])
				});
			var page = page_new1.page;
			var page_new = _Utils_update(
				page,
				{error: page_error_new});
			var res_page = _Utils_update(
				page_new1,
				{page: page_new});
			return _Utils_Tuple2(
				{
					data: author$project$Data$Internal$empty,
					key: key,
					page: res_page,
					seed: elm$random$Random$initialSeed(42)
				},
				elm$core$Platform$Cmd$none);
		}
	});
var author$project$Main$GotPageMsg = function (a) {
	return {$: 'GotPageMsg', a: a};
};
var elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var elm$core$Dict$foldl = F3(
	function (func, acc, dict) {
		foldl:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3(elm$core$Dict$foldl, func, acc, left)),
					$temp$dict = right;
				func = $temp$func;
				acc = $temp$acc;
				dict = $temp$dict;
				continue foldl;
			}
		}
	});
var elm$core$Platform$Sub$batch = _Platform_batch;
var elm$core$Platform$Sub$map = _Platform_map;
var author$project$Internal$Component$subs = F5(
	function (ctor, get, subscriptions, lift, model) {
		return elm$core$Platform$Sub$batch(
			A3(
				elm$core$Dict$foldl,
				F3(
					function (idx, state, ss) {
						return A2(
							elm$core$List$cons,
							A2(
								elm$core$Platform$Sub$map,
								A2(
									elm$core$Basics$composeL,
									lift,
									ctor(idx)),
								subscriptions(state)),
							ss);
					}),
				_List_Nil,
				get(model)));
	});
var author$project$Internal$Menu$Model$DocumentClick = {$: 'DocumentClick'};
var elm$browser$Browser$Events$Document = {$: 'Document'};
var elm$browser$Browser$Events$MySub = F3(
	function (a, b, c) {
		return {$: 'MySub', a: a, b: b, c: c};
	});
var elm$browser$Browser$Events$State = F2(
	function (subs, pids) {
		return {pids: pids, subs: subs};
	});
var elm$core$Task$succeed = _Scheduler_succeed;
var elm$browser$Browser$Events$init = elm$core$Task$succeed(
	A2(elm$browser$Browser$Events$State, _List_Nil, elm$core$Dict$empty));
var elm$browser$Browser$Events$nodeToKey = function (node) {
	if (node.$ === 'Document') {
		return 'd_';
	} else {
		return 'w_';
	}
};
var elm$browser$Browser$Events$addKey = function (sub) {
	var node = sub.a;
	var name = sub.b;
	return _Utils_Tuple2(
		_Utils_ap(
			elm$browser$Browser$Events$nodeToKey(node),
			name),
		sub);
};
var elm$browser$Browser$Events$Event = F2(
	function (key, event) {
		return {event: event, key: key};
	});
var elm$core$Platform$sendToSelf = _Platform_sendToSelf;
var elm$core$Task$andThen = _Scheduler_andThen;
var elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			elm$core$Task$andThen,
			function (a) {
				return elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var elm$browser$Browser$External = function (a) {
	return {$: 'External', a: a};
};
var elm$browser$Browser$Internal = function (a) {
	return {$: 'Internal', a: a};
};
var elm$browser$Browser$Dom$NotFound = function (a) {
	return {$: 'NotFound', a: a};
};
var elm$core$Basics$never = function (_n0) {
	never:
	while (true) {
		var nvr = _n0.a;
		var $temp$_n0 = nvr;
		_n0 = $temp$_n0;
		continue never;
	}
};
var elm$core$Task$Perform = function (a) {
	return {$: 'Perform', a: a};
};
var elm$core$Task$init = elm$core$Task$succeed(_Utils_Tuple0);
var elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			elm$core$Task$andThen,
			function (a) {
				return A2(
					elm$core$Task$andThen,
					function (b) {
						return elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var elm$core$Task$sequence = function (tasks) {
	return A3(
		elm$core$List$foldr,
		elm$core$Task$map2(elm$core$List$cons),
		elm$core$Task$succeed(_List_Nil),
		tasks);
};
var elm$core$Platform$sendToApp = _Platform_sendToApp;
var elm$core$Task$spawnCmd = F2(
	function (router, _n0) {
		var task = _n0.a;
		return _Scheduler_spawn(
			A2(
				elm$core$Task$andThen,
				elm$core$Platform$sendToApp(router),
				task));
	});
var elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			elm$core$Task$map,
			function (_n0) {
				return _Utils_Tuple0;
			},
			elm$core$Task$sequence(
				A2(
					elm$core$List$map,
					elm$core$Task$spawnCmd(router),
					commands)));
	});
var elm$core$Task$onSelfMsg = F3(
	function (_n0, _n1, _n2) {
		return elm$core$Task$succeed(_Utils_Tuple0);
	});
var elm$core$Task$cmdMap = F2(
	function (tagger, _n0) {
		var task = _n0.a;
		return elm$core$Task$Perform(
			A2(elm$core$Task$map, tagger, task));
	});
_Platform_effectManagers['Task'] = _Platform_createManager(elm$core$Task$init, elm$core$Task$onEffects, elm$core$Task$onSelfMsg, elm$core$Task$cmdMap);
var elm$core$Task$command = _Platform_leaf('Task');
var elm$core$Task$perform = F2(
	function (toMessage, task) {
		return elm$core$Task$command(
			elm$core$Task$Perform(
				A2(elm$core$Task$map, toMessage, task)));
	});
var elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 'Normal':
			return 0;
		case 'MayStopPropagation':
			return 1;
		case 'MayPreventDefault':
			return 2;
		default:
			return 3;
	}
};
var elm$core$String$length = _String_length;
var elm$core$String$slice = _String_slice;
var elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			elm$core$String$slice,
			n,
			elm$core$String$length(string),
			string);
	});
var elm$core$String$startsWith = _String_startsWith;
var elm$url$Url$Http = {$: 'Http'};
var elm$url$Url$Https = {$: 'Https'};
var elm$core$String$indexes = _String_indexes;
var elm$core$String$isEmpty = function (string) {
	return string === '';
};
var elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3(elm$core$String$slice, 0, n, string);
	});
var elm$core$String$contains = _String_contains;
var elm$core$String$toInt = _String_toInt;
var elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {fragment: fragment, host: host, path: path, port_: port_, protocol: protocol, query: query};
	});
var elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if (elm$core$String$isEmpty(str) || A2(elm$core$String$contains, '@', str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, ':', str);
			if (!_n0.b) {
				return elm$core$Maybe$Just(
					A6(elm$url$Url$Url, protocol, str, elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_n0.b.b) {
					var i = _n0.a;
					var _n1 = elm$core$String$toInt(
						A2(elm$core$String$dropLeft, i + 1, str));
					if (_n1.$ === 'Nothing') {
						return elm$core$Maybe$Nothing;
					} else {
						var port_ = _n1;
						return elm$core$Maybe$Just(
							A6(
								elm$url$Url$Url,
								protocol,
								A2(elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return elm$core$Maybe$Nothing;
				}
			}
		}
	});
var elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if (elm$core$String$isEmpty(str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, '/', str);
			if (!_n0.b) {
				return A5(elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _n0.a;
				return A5(
					elm$url$Url$chompBeforePath,
					protocol,
					A2(elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2(elm$core$String$left, i, str));
			}
		}
	});
var elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if (elm$core$String$isEmpty(str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, '?', str);
			if (!_n0.b) {
				return A4(elm$url$Url$chompBeforeQuery, protocol, elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _n0.a;
				return A4(
					elm$url$Url$chompBeforeQuery,
					protocol,
					elm$core$Maybe$Just(
						A2(elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2(elm$core$String$left, i, str));
			}
		}
	});
var elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if (elm$core$String$isEmpty(str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, '#', str);
			if (!_n0.b) {
				return A3(elm$url$Url$chompBeforeFragment, protocol, elm$core$Maybe$Nothing, str);
			} else {
				var i = _n0.a;
				return A3(
					elm$url$Url$chompBeforeFragment,
					protocol,
					elm$core$Maybe$Just(
						A2(elm$core$String$dropLeft, i + 1, str)),
					A2(elm$core$String$left, i, str));
			}
		}
	});
var elm$url$Url$fromString = function (str) {
	return A2(elm$core$String$startsWith, 'http://', str) ? A2(
		elm$url$Url$chompAfterProtocol,
		elm$url$Url$Http,
		A2(elm$core$String$dropLeft, 7, str)) : (A2(elm$core$String$startsWith, 'https://', str) ? A2(
		elm$url$Url$chompAfterProtocol,
		elm$url$Url$Https,
		A2(elm$core$String$dropLeft, 8, str)) : elm$core$Maybe$Nothing);
};
var elm$browser$Browser$Events$spawn = F3(
	function (router, key, _n0) {
		var node = _n0.a;
		var name = _n0.b;
		var actualNode = function () {
			if (node.$ === 'Document') {
				return _Browser_doc;
			} else {
				return _Browser_window;
			}
		}();
		return A2(
			elm$core$Task$map,
			function (value) {
				return _Utils_Tuple2(key, value);
			},
			A3(
				_Browser_on,
				actualNode,
				name,
				function (event) {
					return A2(
						elm$core$Platform$sendToSelf,
						router,
						A2(elm$browser$Browser$Events$Event, key, event));
				}));
	});
var elm$core$Dict$merge = F6(
	function (leftStep, bothStep, rightStep, leftDict, rightDict, initialResult) {
		var stepState = F3(
			function (rKey, rValue, _n0) {
				stepState:
				while (true) {
					var list = _n0.a;
					var result = _n0.b;
					if (!list.b) {
						return _Utils_Tuple2(
							list,
							A3(rightStep, rKey, rValue, result));
					} else {
						var _n2 = list.a;
						var lKey = _n2.a;
						var lValue = _n2.b;
						var rest = list.b;
						if (_Utils_cmp(lKey, rKey) < 0) {
							var $temp$rKey = rKey,
								$temp$rValue = rValue,
								$temp$_n0 = _Utils_Tuple2(
								rest,
								A3(leftStep, lKey, lValue, result));
							rKey = $temp$rKey;
							rValue = $temp$rValue;
							_n0 = $temp$_n0;
							continue stepState;
						} else {
							if (_Utils_cmp(lKey, rKey) > 0) {
								return _Utils_Tuple2(
									list,
									A3(rightStep, rKey, rValue, result));
							} else {
								return _Utils_Tuple2(
									rest,
									A4(bothStep, lKey, lValue, rValue, result));
							}
						}
					}
				}
			});
		var _n3 = A3(
			elm$core$Dict$foldl,
			stepState,
			_Utils_Tuple2(
				elm$core$Dict$toList(leftDict),
				initialResult),
			rightDict);
		var leftovers = _n3.a;
		var intermediateResult = _n3.b;
		return A3(
			elm$core$List$foldl,
			F2(
				function (_n4, result) {
					var k = _n4.a;
					var v = _n4.b;
					return A3(leftStep, k, v, result);
				}),
			intermediateResult,
			leftovers);
	});
var elm$core$Dict$union = F2(
	function (t1, t2) {
		return A3(elm$core$Dict$foldl, elm$core$Dict$insert, t2, t1);
	});
var elm$core$Process$kill = _Scheduler_kill;
var elm$browser$Browser$Events$onEffects = F3(
	function (router, subs, state) {
		var stepRight = F3(
			function (key, sub, _n6) {
				var deads = _n6.a;
				var lives = _n6.b;
				var news = _n6.c;
				return _Utils_Tuple3(
					deads,
					lives,
					A2(
						elm$core$List$cons,
						A3(elm$browser$Browser$Events$spawn, router, key, sub),
						news));
			});
		var stepLeft = F3(
			function (_n4, pid, _n5) {
				var deads = _n5.a;
				var lives = _n5.b;
				var news = _n5.c;
				return _Utils_Tuple3(
					A2(elm$core$List$cons, pid, deads),
					lives,
					news);
			});
		var stepBoth = F4(
			function (key, pid, _n2, _n3) {
				var deads = _n3.a;
				var lives = _n3.b;
				var news = _n3.c;
				return _Utils_Tuple3(
					deads,
					A3(elm$core$Dict$insert, key, pid, lives),
					news);
			});
		var newSubs = A2(elm$core$List$map, elm$browser$Browser$Events$addKey, subs);
		var _n0 = A6(
			elm$core$Dict$merge,
			stepLeft,
			stepBoth,
			stepRight,
			state.pids,
			elm$core$Dict$fromList(newSubs),
			_Utils_Tuple3(_List_Nil, elm$core$Dict$empty, _List_Nil));
		var deadPids = _n0.a;
		var livePids = _n0.b;
		var makeNewPids = _n0.c;
		return A2(
			elm$core$Task$andThen,
			function (pids) {
				return elm$core$Task$succeed(
					A2(
						elm$browser$Browser$Events$State,
						newSubs,
						A2(
							elm$core$Dict$union,
							livePids,
							elm$core$Dict$fromList(pids))));
			},
			A2(
				elm$core$Task$andThen,
				function (_n1) {
					return elm$core$Task$sequence(makeNewPids);
				},
				elm$core$Task$sequence(
					A2(elm$core$List$map, elm$core$Process$kill, deadPids))));
	});
var elm$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _n0 = f(mx);
		if (_n0.$ === 'Just') {
			var x = _n0.a;
			return A2(elm$core$List$cons, x, xs);
		} else {
			return xs;
		}
	});
var elm$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			elm$core$List$foldr,
			elm$core$List$maybeCons(f),
			_List_Nil,
			xs);
	});
var elm$browser$Browser$Events$onSelfMsg = F3(
	function (router, _n0, state) {
		var key = _n0.key;
		var event = _n0.event;
		var toMessage = function (_n2) {
			var subKey = _n2.a;
			var _n3 = _n2.b;
			var node = _n3.a;
			var name = _n3.b;
			var decoder = _n3.c;
			return _Utils_eq(subKey, key) ? A2(_Browser_decodeEvent, decoder, event) : elm$core$Maybe$Nothing;
		};
		var messages = A2(elm$core$List$filterMap, toMessage, state.subs);
		return A2(
			elm$core$Task$andThen,
			function (_n1) {
				return elm$core$Task$succeed(state);
			},
			elm$core$Task$sequence(
				A2(
					elm$core$List$map,
					elm$core$Platform$sendToApp(router),
					messages)));
	});
var elm$browser$Browser$Events$subMap = F2(
	function (func, _n0) {
		var node = _n0.a;
		var name = _n0.b;
		var decoder = _n0.c;
		return A3(
			elm$browser$Browser$Events$MySub,
			node,
			name,
			A2(elm$json$Json$Decode$map, func, decoder));
	});
_Platform_effectManagers['Browser.Events'] = _Platform_createManager(elm$browser$Browser$Events$init, elm$browser$Browser$Events$onEffects, elm$browser$Browser$Events$onSelfMsg, 0, elm$browser$Browser$Events$subMap);
var elm$browser$Browser$Events$subscription = _Platform_leaf('Browser.Events');
var elm$browser$Browser$Events$on = F3(
	function (node, name, decoder) {
		return elm$browser$Browser$Events$subscription(
			A3(elm$browser$Browser$Events$MySub, node, name, decoder));
	});
var elm$browser$Browser$Events$onClick = A2(elm$browser$Browser$Events$on, elm$browser$Browser$Events$Document, 'click');
var author$project$Internal$Menu$Implementation$subscriptions = function (model) {
	return elm$browser$Browser$Events$onClick(
		elm$json$Json$Decode$succeed(author$project$Internal$Menu$Model$DocumentClick));
};
var author$project$Internal$Msg$MenuMsg = F2(
	function (a, b) {
		return {$: 'MenuMsg', a: a, b: b};
	});
var author$project$Internal$Menu$Implementation$subs = A3(
	author$project$Internal$Component$subs,
	author$project$Internal$Msg$MenuMsg,
	function ($) {
		return $.menu;
	},
	author$project$Internal$Menu$Implementation$subscriptions);
var author$project$Material$subscriptions = F2(
	function (lift, model) {
		return A2(author$project$Internal$Menu$Implementation$subs, lift, model.mdc);
	});
var author$project$Page$Mdc = function (a) {
	return {$: 'Mdc', a: a};
};
var author$project$Page$subscriptions = function (model) {
	return A2(author$project$Material$subscriptions, author$project$Page$Mdc, model);
};
var author$project$Main$subscriptions = function (model) {
	return A2(
		elm$core$Platform$Sub$map,
		author$project$Main$GotPageMsg,
		author$project$Page$subscriptions(model.page));
};
var elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _n1 = A2(elm$core$Basics$compare, targetKey, key);
				switch (_n1.$) {
					case 'LT':
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 'EQ':
						return elm$core$Maybe$Just(value);
					default:
						var $temp$targetKey = targetKey,
							$temp$dict = right;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
				}
			}
		}
	});
var elm$core$Dict$getMin = function (dict) {
	getMin:
	while (true) {
		if ((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) {
			var left = dict.d;
			var $temp$dict = left;
			dict = $temp$dict;
			continue getMin;
		} else {
			return dict;
		}
	}
};
var elm$core$Dict$moveRedLeft = function (dict) {
	if (((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) && (dict.e.$ === 'RBNode_elm_builtin')) {
		if ((dict.e.d.$ === 'RBNode_elm_builtin') && (dict.e.d.a.$ === 'Red')) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _n1 = dict.d;
			var lClr = _n1.a;
			var lK = _n1.b;
			var lV = _n1.c;
			var lLeft = _n1.d;
			var lRight = _n1.e;
			var _n2 = dict.e;
			var rClr = _n2.a;
			var rK = _n2.b;
			var rV = _n2.c;
			var rLeft = _n2.d;
			var _n3 = rLeft.a;
			var rlK = rLeft.b;
			var rlV = rLeft.c;
			var rlL = rLeft.d;
			var rlR = rLeft.e;
			var rRight = _n2.e;
			return A5(
				elm$core$Dict$RBNode_elm_builtin,
				elm$core$Dict$Red,
				rlK,
				rlV,
				A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Black,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, lK, lV, lLeft, lRight),
					rlL),
				A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, rK, rV, rlR, rRight));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _n4 = dict.d;
			var lClr = _n4.a;
			var lK = _n4.b;
			var lV = _n4.c;
			var lLeft = _n4.d;
			var lRight = _n4.e;
			var _n5 = dict.e;
			var rClr = _n5.a;
			var rK = _n5.b;
			var rV = _n5.c;
			var rLeft = _n5.d;
			var rRight = _n5.e;
			if (clr.$ === 'Black') {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Black,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, rK, rV, rLeft, rRight));
			} else {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Black,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var elm$core$Dict$moveRedRight = function (dict) {
	if (((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) && (dict.e.$ === 'RBNode_elm_builtin')) {
		if ((dict.d.d.$ === 'RBNode_elm_builtin') && (dict.d.d.a.$ === 'Red')) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _n1 = dict.d;
			var lClr = _n1.a;
			var lK = _n1.b;
			var lV = _n1.c;
			var _n2 = _n1.d;
			var _n3 = _n2.a;
			var llK = _n2.b;
			var llV = _n2.c;
			var llLeft = _n2.d;
			var llRight = _n2.e;
			var lRight = _n1.e;
			var _n4 = dict.e;
			var rClr = _n4.a;
			var rK = _n4.b;
			var rV = _n4.c;
			var rLeft = _n4.d;
			var rRight = _n4.e;
			return A5(
				elm$core$Dict$RBNode_elm_builtin,
				elm$core$Dict$Red,
				lK,
				lV,
				A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, llK, llV, llLeft, llRight),
				A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Black,
					k,
					v,
					lRight,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, rK, rV, rLeft, rRight)));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _n5 = dict.d;
			var lClr = _n5.a;
			var lK = _n5.b;
			var lV = _n5.c;
			var lLeft = _n5.d;
			var lRight = _n5.e;
			var _n6 = dict.e;
			var rClr = _n6.a;
			var rK = _n6.b;
			var rV = _n6.c;
			var rLeft = _n6.d;
			var rRight = _n6.e;
			if (clr.$ === 'Black') {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Black,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, rK, rV, rLeft, rRight));
			} else {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Black,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var elm$core$Dict$removeHelpPrepEQGT = F7(
	function (targetKey, dict, color, key, value, left, right) {
		if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
			var _n1 = left.a;
			var lK = left.b;
			var lV = left.c;
			var lLeft = left.d;
			var lRight = left.e;
			return A5(
				elm$core$Dict$RBNode_elm_builtin,
				color,
				lK,
				lV,
				lLeft,
				A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, key, value, lRight, right));
		} else {
			_n2$2:
			while (true) {
				if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Black')) {
					if (right.d.$ === 'RBNode_elm_builtin') {
						if (right.d.a.$ === 'Black') {
							var _n3 = right.a;
							var _n4 = right.d;
							var _n5 = _n4.a;
							return elm$core$Dict$moveRedRight(dict);
						} else {
							break _n2$2;
						}
					} else {
						var _n6 = right.a;
						var _n7 = right.d;
						return elm$core$Dict$moveRedRight(dict);
					}
				} else {
					break _n2$2;
				}
			}
			return dict;
		}
	});
var elm$core$Dict$removeMin = function (dict) {
	if ((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) {
		var color = dict.a;
		var key = dict.b;
		var value = dict.c;
		var left = dict.d;
		var lColor = left.a;
		var lLeft = left.d;
		var right = dict.e;
		if (lColor.$ === 'Black') {
			if ((lLeft.$ === 'RBNode_elm_builtin') && (lLeft.a.$ === 'Red')) {
				var _n3 = lLeft.a;
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					color,
					key,
					value,
					elm$core$Dict$removeMin(left),
					right);
			} else {
				var _n4 = elm$core$Dict$moveRedLeft(dict);
				if (_n4.$ === 'RBNode_elm_builtin') {
					var nColor = _n4.a;
					var nKey = _n4.b;
					var nValue = _n4.c;
					var nLeft = _n4.d;
					var nRight = _n4.e;
					return A5(
						elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						elm$core$Dict$removeMin(nLeft),
						nRight);
				} else {
					return elm$core$Dict$RBEmpty_elm_builtin;
				}
			}
		} else {
			return A5(
				elm$core$Dict$RBNode_elm_builtin,
				color,
				key,
				value,
				elm$core$Dict$removeMin(left),
				right);
		}
	} else {
		return elm$core$Dict$RBEmpty_elm_builtin;
	}
};
var elm$core$Dict$removeHelp = F2(
	function (targetKey, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_cmp(targetKey, key) < 0) {
				if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Black')) {
					var _n4 = left.a;
					var lLeft = left.d;
					if ((lLeft.$ === 'RBNode_elm_builtin') && (lLeft.a.$ === 'Red')) {
						var _n6 = lLeft.a;
						return A5(
							elm$core$Dict$RBNode_elm_builtin,
							color,
							key,
							value,
							A2(elm$core$Dict$removeHelp, targetKey, left),
							right);
					} else {
						var _n7 = elm$core$Dict$moveRedLeft(dict);
						if (_n7.$ === 'RBNode_elm_builtin') {
							var nColor = _n7.a;
							var nKey = _n7.b;
							var nValue = _n7.c;
							var nLeft = _n7.d;
							var nRight = _n7.e;
							return A5(
								elm$core$Dict$balance,
								nColor,
								nKey,
								nValue,
								A2(elm$core$Dict$removeHelp, targetKey, nLeft),
								nRight);
						} else {
							return elm$core$Dict$RBEmpty_elm_builtin;
						}
					}
				} else {
					return A5(
						elm$core$Dict$RBNode_elm_builtin,
						color,
						key,
						value,
						A2(elm$core$Dict$removeHelp, targetKey, left),
						right);
				}
			} else {
				return A2(
					elm$core$Dict$removeHelpEQGT,
					targetKey,
					A7(elm$core$Dict$removeHelpPrepEQGT, targetKey, dict, color, key, value, left, right));
			}
		}
	});
var elm$core$Dict$removeHelpEQGT = F2(
	function (targetKey, dict) {
		if (dict.$ === 'RBNode_elm_builtin') {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_eq(targetKey, key)) {
				var _n1 = elm$core$Dict$getMin(right);
				if (_n1.$ === 'RBNode_elm_builtin') {
					var minKey = _n1.b;
					var minValue = _n1.c;
					return A5(
						elm$core$Dict$balance,
						color,
						minKey,
						minValue,
						left,
						elm$core$Dict$removeMin(right));
				} else {
					return elm$core$Dict$RBEmpty_elm_builtin;
				}
			} else {
				return A5(
					elm$core$Dict$balance,
					color,
					key,
					value,
					left,
					A2(elm$core$Dict$removeHelp, targetKey, right));
			}
		} else {
			return elm$core$Dict$RBEmpty_elm_builtin;
		}
	});
var elm$core$Dict$remove = F2(
	function (key, dict) {
		var _n0 = A2(elm$core$Dict$removeHelp, key, dict);
		if ((_n0.$ === 'RBNode_elm_builtin') && (_n0.a.$ === 'Red')) {
			var _n1 = _n0.a;
			var k = _n0.b;
			var v = _n0.c;
			var l = _n0.d;
			var r = _n0.e;
			return A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _n0;
			return x;
		}
	});
var elm$core$Dict$update = F3(
	function (targetKey, alter, dictionary) {
		var _n0 = alter(
			A2(elm$core$Dict$get, targetKey, dictionary));
		if (_n0.$ === 'Just') {
			var value = _n0.a;
			return A3(elm$core$Dict$insert, targetKey, value, dictionary);
		} else {
			return A2(elm$core$Dict$remove, targetKey, dictionary);
		}
	});
var Chadtech$elm_relational_database$Db$update = F3(
	function (id, f, _n0) {
		var dict = _n0.a;
		return Chadtech$elm_relational_database$Db$Db(
			A3(
				elm$core$Dict$update,
				Chadtech$elm_relational_database$Id$toString(id),
				f,
				dict));
	});
var author$project$Data$CodingAnswer = function (a) {
	return {$: 'CodingAnswer', a: a};
};
var author$project$Data$CodingFrame = function (a) {
	return {$: 'CodingFrame', a: a};
};
var author$project$Data$Generate = F3(
	function (a, b, c) {
		return {$: 'Generate', a: a, b: b, c: c};
	});
var author$project$Data$Move = F3(
	function (a, b, c) {
		return {$: 'Move', a: a, b: b, c: c};
	});
var Chadtech$elm_relational_database$Db$get = F2(
	function (_n0, thisId) {
		var dict = _n0.a;
		return A2(
			elm$core$Dict$get,
			Chadtech$elm_relational_database$Id$toString(thisId),
			dict);
	});
var Chadtech$elm_relational_database$Db$insert = F2(
	function (_n0, _n1) {
		var thisId = _n0.a;
		var item = _n0.b;
		var dict = _n1.a;
		return Chadtech$elm_relational_database$Db$Db(
			A3(
				elm$core$Dict$insert,
				Chadtech$elm_relational_database$Id$toString(thisId),
				item,
				dict));
	});
var author$project$Data$New = function (a) {
	return {$: 'New', a: a};
};
var Chadtech$elm_relational_database$Db$toList = function (_n0) {
	var dict = _n0.a;
	return A2(
		elm$core$List$map,
		elm$core$Tuple$mapFirst(Chadtech$elm_relational_database$Id$fromString),
		elm$core$Dict$toList(dict));
};
var elm_community$list_extra$List$Extra$maximumBy = F2(
	function (f, ls) {
		var maxBy = F2(
			function (x, _n1) {
				var y = _n1.a;
				var fy = _n1.b;
				var fx = f(x);
				return (_Utils_cmp(fx, fy) > 0) ? _Utils_Tuple2(x, fx) : _Utils_Tuple2(y, fy);
			});
		if (ls.b) {
			if (!ls.b.b) {
				var l_ = ls.a;
				return elm$core$Maybe$Just(l_);
			} else {
				var l_ = ls.a;
				var ls_ = ls.b;
				return elm$core$Maybe$Just(
					A3(
						elm$core$List$foldl,
						maxBy,
						_Utils_Tuple2(
							l_,
							f(l_)),
						ls_).a);
			}
		} else {
			return elm$core$Maybe$Nothing;
		}
	});
var author$project$Data$Access$recent_access = function (all_candidates) {
	return A2(
		elm_community$list_extra$List$Extra$maximumBy,
		function (_n0) {
			var id = _n0.a;
			var m = _n0.b;
			return m.timestamp.accessed;
		},
		Chadtech$elm_relational_database$Db$toList(all_candidates));
};
var elm$core$Dict$filter = F2(
	function (isGood, dict) {
		return A3(
			elm$core$Dict$foldl,
			F3(
				function (k, v, d) {
					return A2(isGood, k, v) ? A3(elm$core$Dict$insert, k, v, d) : d;
				}),
			elm$core$Dict$empty,
			dict);
	});
var Chadtech$elm_relational_database$Db$filter = F2(
	function (rowFilterFunction, _n0) {
		var dict = _n0.a;
		var uncurried = F2(
			function (key, value) {
				return rowFilterFunction(
					_Utils_Tuple2(
						Chadtech$elm_relational_database$Id$fromString(key),
						value));
			});
		return Chadtech$elm_relational_database$Db$Db(
			A2(elm$core$Dict$filter, uncurried, dict));
	});
var elm$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			if (!list.b) {
				return false;
			} else {
				var x = list.a;
				var xs = list.b;
				if (isOkay(x)) {
					return true;
				} else {
					var $temp$isOkay = isOkay,
						$temp$list = xs;
					isOkay = $temp$isOkay;
					list = $temp$list;
					continue any;
				}
			}
		}
	});
var elm$core$List$member = F2(
	function (x, xs) {
		return A2(
			elm$core$List$any,
			function (a) {
				return _Utils_eq(a, x);
			},
			xs);
	});
var author$project$Db$Extra$selectFrom = F3(
	function (db, accessor, id_db) {
		var id_list = A2(
			elm$core$List$map,
			function (_n1) {
				var id = _n1.a;
				return id;
			},
			Chadtech$elm_relational_database$Db$toList(id_db));
		return A2(
			Chadtech$elm_relational_database$Db$filter,
			function (_n0) {
				var id = _n0.a;
				var value = _n0.b;
				return A2(
					elm$core$List$member,
					accessor(value),
					id_list);
			},
			db);
	});
var author$project$Data$Navigation$coding2coding_frame = F2(
	function (model, coding) {
		return A3(
			author$project$Db$Extra$selectFrom,
			model.coding_frames,
			function (c) {
				return c.coding;
			},
			coding);
	});
var author$project$Data$Access$current_codingFrame = F2(
	function (model, coding) {
		return author$project$Data$Access$recent_access(
			A2(
				author$project$Data$Navigation$coding2coding_frame,
				model,
				Chadtech$elm_relational_database$Db$fromList(
					_List_fromArray(
						[coding]))));
	});
var elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return elm$core$Maybe$Just(
				f(value));
		} else {
			return elm$core$Maybe$Nothing;
		}
	});
var elm$core$Tuple$pair = F2(
	function (a, b) {
		return _Utils_Tuple2(a, b);
	});
var Chadtech$elm_relational_database$Db$filterMissing = function (items) {
	var onlyPresent = function (_n0) {
		var id = _n0.a;
		var maybeItem = _n0.b;
		return A2(
			elm$core$Maybe$map,
			elm$core$Tuple$pair(id),
			maybeItem);
	};
	return A2(
		elm$core$List$filterMap,
		elm$core$Basics$identity,
		A2(elm$core$List$map, onlyPresent, items));
};
var Chadtech$elm_relational_database$Db$getWithId = F2(
	function (db, thisId) {
		return _Utils_Tuple2(
			thisId,
			A2(Chadtech$elm_relational_database$Db$get, db, thisId));
	});
var Chadtech$elm_relational_database$Db$getMany = function (db) {
	return elm$core$List$map(
		Chadtech$elm_relational_database$Db$getWithId(db));
};
var author$project$Db$Extra$getDB = F3(
	function (b, accessor, a) {
		return Chadtech$elm_relational_database$Db$fromList(
			Chadtech$elm_relational_database$Db$filterMissing(
				A2(
					Chadtech$elm_relational_database$Db$getMany,
					b,
					A2(
						elm$core$List$map,
						function (_n0) {
							var id = _n0.a;
							var m = _n0.b;
							return accessor(m);
						},
						Chadtech$elm_relational_database$Db$toList(a)))));
	});
var author$project$Data$Navigation$answer2question = F2(
	function (model, answer) {
		return A3(
			author$project$Db$Extra$getDB,
			model.questions,
			function (c) {
				return c.question;
			},
			answer);
	});
var author$project$Data$Navigation$coding_answer2coding_question = F2(
	function (model, coding_answer) {
		return A3(
			author$project$Db$Extra$getDB,
			model.coding_questions,
			function (c) {
				return c.coding_question;
			},
			coding_answer);
	});
var author$project$Data$Navigation$coding_frame2answer = F2(
	function (model, coding_frame) {
		return A3(
			author$project$Db$Extra$getDB,
			model.answers,
			function (c) {
				return c.answer;
			},
			coding_frame);
	});
var author$project$Data$Navigation$coding_frame2coding_answer = F2(
	function (model, coding_frame) {
		return A3(
			author$project$Db$Extra$selectFrom,
			model.coding_answers,
			function (c) {
				return c.coding_frame;
			},
			coding_frame);
	});
var author$project$Data$Navigation$coding_question2coding_questionary = F2(
	function (model, coding_questionary) {
		return A3(
			author$project$Db$Extra$getDB,
			model.coding_questionaries,
			function (c) {
				return c.coding_questionary;
			},
			coding_questionary);
	});
var author$project$Data$Navigation$coding_questionary2question = F2(
	function (model, coding_questionary) {
		return A3(
			author$project$Db$Extra$getDB,
			model.questions,
			function (c) {
				return c.question;
			},
			coding_questionary);
	});
var elm$core$Basics$not = _Basics_not;
var elm$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			elm$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2(elm$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var author$project$Db$Extra$difference = F2(
	function (lhs, rhs) {
		var list_rhs = Chadtech$elm_relational_database$Db$toList(rhs);
		var list_lhs = Chadtech$elm_relational_database$Db$toList(lhs);
		return Chadtech$elm_relational_database$Db$fromList(
			A2(
				elm$core$List$filter,
				function (c) {
					return !A2(elm$core$List$member, c, list_rhs);
				},
				list_lhs));
	});
var author$project$Db$Extra$intersection = F2(
	function (a, b) {
		var list_b = Chadtech$elm_relational_database$Db$toList(b);
		var list_a = Chadtech$elm_relational_database$Db$toList(a);
		return Chadtech$elm_relational_database$Db$fromList(
			A2(
				elm$core$List$filter,
				function (c) {
					return A2(elm$core$List$member, c, list_b);
				},
				list_a));
	});
var author$project$Db$Extra$union = F2(
	function (a, b) {
		var inter = Chadtech$elm_relational_database$Db$toList(
			A2(author$project$Db$Extra$intersection, a, b));
		var diff2 = Chadtech$elm_relational_database$Db$toList(
			A2(author$project$Db$Extra$difference, b, a));
		var diff1 = Chadtech$elm_relational_database$Db$toList(
			A2(author$project$Db$Extra$difference, a, b));
		return Chadtech$elm_relational_database$Db$fromList(
			_Utils_ap(
				diff1,
				_Utils_ap(diff2, inter)));
	});
var author$project$Data$Navigation$coding_frame2question = F2(
	function (model, coding_frame) {
		var right = A2(
			author$project$Data$Navigation$coding_questionary2question,
			model,
			A2(
				author$project$Data$Navigation$coding_question2coding_questionary,
				model,
				A2(
					author$project$Data$Navigation$coding_answer2coding_question,
					model,
					A2(author$project$Data$Navigation$coding_frame2coding_answer, model, coding_frame))));
		var left = A2(
			author$project$Data$Navigation$answer2question,
			model,
			A2(author$project$Data$Navigation$coding_frame2answer, model, coding_frame));
		return A2(author$project$Db$Extra$union, left, right);
	});
var elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return elm$core$Maybe$Just(x);
	} else {
		return elm$core$Maybe$Nothing;
	}
};
var elm$core$Maybe$andThen = F2(
	function (callback, maybeValue) {
		if (maybeValue.$ === 'Just') {
			var value = maybeValue.a;
			return callback(value);
		} else {
			return elm$core$Maybe$Nothing;
		}
	});
var author$project$Data$Access$current_question = F2(
	function (model, coding) {
		return A2(
			elm$core$Maybe$andThen,
			elm$core$List$head,
			A2(
				elm$core$Maybe$map,
				Chadtech$elm_relational_database$Db$toList,
				A2(
					elm$core$Maybe$map,
					author$project$Data$Navigation$coding_frame2question(model),
					A2(
						elm$core$Maybe$map,
						function (x) {
							return Chadtech$elm_relational_database$Db$fromList(
								_List_fromArray(
									[x]));
						},
						A2(author$project$Data$Access$current_codingFrame, model, coding)))));
	});
var author$project$Data$Navigation$coding2answer = F2(
	function (model, coding) {
		return A2(
			author$project$Data$Navigation$coding_frame2answer,
			model,
			A2(author$project$Data$Navigation$coding2coding_frame, model, coding));
	});
var author$project$Data$Navigation$question2answer = F2(
	function (model, answer) {
		return A3(
			author$project$Db$Extra$selectFrom,
			model.answers,
			function (c) {
				return c.question;
			},
			answer);
	});
var author$project$Data$Access$missing_answers = F2(
	function (model, coding) {
		var question_answers = A2(
			elm$core$Maybe$map,
			author$project$Data$Navigation$question2answer(model),
			A2(
				elm$core$Maybe$map,
				function (x) {
					return Chadtech$elm_relational_database$Db$fromList(
						_List_fromArray(
							[x]));
				},
				A2(author$project$Data$Access$current_question, model, coding)));
		var all_present_answers = A2(
			author$project$Data$Navigation$coding2answer,
			model,
			Chadtech$elm_relational_database$Db$fromList(
				_List_fromArray(
					[coding])));
		return A2(
			elm$core$Maybe$map,
			Chadtech$elm_relational_database$Db$toList,
			A2(
				elm$core$Maybe$map,
				function (x) {
					return A2(author$project$Db$Extra$difference, x, all_present_answers);
				},
				question_answers));
	});
var author$project$Data$Access$present_questions = F2(
	function (model, coding) {
		return Chadtech$elm_relational_database$Db$toList(
			A2(
				author$project$Data$Navigation$answer2question,
				model,
				A2(
					author$project$Data$Navigation$coding_frame2answer,
					model,
					A2(
						author$project$Data$Navigation$coding2coding_frame,
						model,
						Chadtech$elm_relational_database$Db$fromList(
							_List_fromArray(
								[coding]))))));
	});
var author$project$Data$Navigation$coding2question = F2(
	function (model, coding) {
		return A2(
			author$project$Data$Navigation$coding_frame2question,
			model,
			A2(author$project$Data$Navigation$coding2coding_frame, model, coding));
	});
var author$project$Data$Access$missing_questions = F2(
	function (model, coding) {
		var present = Chadtech$elm_relational_database$Db$fromList(
			A2(author$project$Data$Access$present_questions, model, coding));
		var all = A2(
			author$project$Data$Navigation$coding2question,
			model,
			Chadtech$elm_relational_database$Db$fromList(
				_List_fromArray(
					[coding])));
		return Chadtech$elm_relational_database$Db$toList(
			A2(author$project$Db$Extra$difference, present, all));
	});
var author$project$Entities$Timestamp$empty = {accessed: 0, created: 0, modified: 0};
var elm$core$List$tail = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return elm$core$Maybe$Just(xs);
	} else {
		return elm$core$Maybe$Nothing;
	}
};
var elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var elm$random$Random$Generator = function (a) {
	return {$: 'Generator', a: a};
};
var elm$random$Random$map = F2(
	function (func, _n0) {
		var genA = _n0.a;
		return elm$random$Random$Generator(
			function (seed0) {
				var _n1 = genA(seed0);
				var a = _n1.a;
				var seed1 = _n1.b;
				return _Utils_Tuple2(
					func(a),
					seed1);
			});
	});
var elm$random$Random$addOne = function (value) {
	return _Utils_Tuple2(1, value);
};
var elm$core$Basics$negate = function (n) {
	return -n;
};
var elm$core$Basics$abs = function (n) {
	return (n < 0) ? (-n) : n;
};
var elm$core$List$sum = function (numbers) {
	return A3(elm$core$List$foldl, elm$core$Basics$add, 0, numbers);
};
var elm$core$Bitwise$and = _Bitwise_and;
var elm$core$Bitwise$xor = _Bitwise_xor;
var elm$random$Random$peel = function (_n0) {
	var state = _n0.a;
	var word = (state ^ (state >>> ((state >>> 28) + 4))) * 277803737;
	return ((word >>> 22) ^ word) >>> 0;
};
var elm$random$Random$float = F2(
	function (a, b) {
		return elm$random$Random$Generator(
			function (seed0) {
				var seed1 = elm$random$Random$next(seed0);
				var range = elm$core$Basics$abs(b - a);
				var n1 = elm$random$Random$peel(seed1);
				var n0 = elm$random$Random$peel(seed0);
				var lo = (134217727 & n1) * 1.0;
				var hi = (67108863 & n0) * 1.0;
				var val = ((hi * 1.34217728e8) + lo) / 9.007199254740992e15;
				var scaled = (val * range) + a;
				return _Utils_Tuple2(
					scaled,
					elm$random$Random$next(seed1));
			});
	});
var elm$random$Random$getByWeight = F3(
	function (_n0, others, countdown) {
		getByWeight:
		while (true) {
			var weight = _n0.a;
			var value = _n0.b;
			if (!others.b) {
				return value;
			} else {
				var second = others.a;
				var otherOthers = others.b;
				if (_Utils_cmp(
					countdown,
					elm$core$Basics$abs(weight)) < 1) {
					return value;
				} else {
					var $temp$_n0 = second,
						$temp$others = otherOthers,
						$temp$countdown = countdown - elm$core$Basics$abs(weight);
					_n0 = $temp$_n0;
					others = $temp$others;
					countdown = $temp$countdown;
					continue getByWeight;
				}
			}
		}
	});
var elm$random$Random$weighted = F2(
	function (first, others) {
		var normalize = function (_n0) {
			var weight = _n0.a;
			return elm$core$Basics$abs(weight);
		};
		var total = normalize(first) + elm$core$List$sum(
			A2(elm$core$List$map, normalize, others));
		return A2(
			elm$random$Random$map,
			A2(elm$random$Random$getByWeight, first, others),
			A2(elm$random$Random$float, 0, total));
	});
var elm$random$Random$uniform = F2(
	function (value, valueList) {
		return A2(
			elm$random$Random$weighted,
			elm$random$Random$addOne(value),
			A2(elm$core$List$map, elm$random$Random$addOne, valueList));
	});
var author$project$Data$Generation$coding_frame = F2(
	function (model, _n0) {
		var cid = _n0.a;
		var coding = _n0.b;
		var missing_questions = A2(
			author$project$Data$Access$missing_questions,
			model,
			_Utils_Tuple2(cid, coding));
		var missing_answers = A2(
			author$project$Data$Access$missing_answers,
			model,
			_Utils_Tuple2(cid, coding));
		var current_question = A2(
			author$project$Data$Access$current_question,
			model,
			_Utils_Tuple2(cid, coding));
		var _n1 = _Utils_Tuple3(
			current_question,
			missing_answers,
			A2(elm$core$Maybe$andThen, elm$core$List$head, missing_answers));
		if (((_n1.a.$ === 'Just') && (_n1.b.$ === 'Just')) && (_n1.c.$ === 'Just')) {
			var _n2 = _n1.a.a;
			var qid = _n2.a;
			var question = _n2.b;
			var answers = _n1.b.a;
			var head = _n1.c.a;
			return elm$core$Maybe$Just(
				A2(
					elm$random$Random$map,
					function (_n3) {
						var aid = _n3.a;
						var answer = _n3.b;
						return A3(author$project$Entities$Coding$Frame$Model, aid, cid, author$project$Entities$Timestamp$empty);
					},
					A2(
						elm$random$Random$uniform,
						head,
						A2(
							elm$core$Maybe$withDefault,
							_List_Nil,
							elm$core$List$tail(answers)))));
		} else {
			var new_question = elm$core$List$head(missing_questions);
			var new_answers = A2(
				elm$core$Maybe$map,
				Chadtech$elm_relational_database$Db$toList,
				A2(
					elm$core$Maybe$map,
					author$project$Data$Navigation$question2answer(model),
					A2(
						elm$core$Maybe$map,
						function (x) {
							return Chadtech$elm_relational_database$Db$fromList(
								_List_fromArray(
									[x]));
						},
						new_question)));
			var _n4 = _Utils_Tuple3(
				new_question,
				new_answers,
				A2(elm$core$Maybe$andThen, elm$core$List$head, new_answers));
			if (((_n4.a.$ === 'Just') && (_n4.b.$ === 'Just')) && (_n4.c.$ === 'Just')) {
				var question = _n4.a.a;
				var answers = _n4.b.a;
				var head = _n4.c.a;
				return elm$core$Maybe$Just(
					A2(
						elm$random$Random$map,
						function (_n5) {
							var aid = _n5.a;
							var answer = _n5.b;
							return A3(author$project$Entities$Coding$Frame$Model, aid, cid, author$project$Entities$Timestamp$empty);
						},
						A2(
							elm$random$Random$uniform,
							head,
							A2(
								elm$core$Maybe$withDefault,
								_List_Nil,
								elm$core$List$tail(answers)))));
			} else {
				return elm$core$Maybe$Nothing;
			}
		}
	});
var elm$core$Char$fromCode = _Char_fromCode;
var Chadtech$elm_relational_database$Id$toChar = function (_int) {
	var code = (_int < 10) ? (_int + 48) : ((_int < 36) ? (_int + 55) : (_int + 61));
	return elm$core$Char$fromCode(code);
};
var elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var elm$core$String$fromList = _String_fromList;
var Chadtech$elm_relational_database$Id$intsToString = A2(
	elm$core$Basics$composeR,
	elm$core$List$map(Chadtech$elm_relational_database$Id$toChar),
	elm$core$String$fromList);
var elm$random$Random$int = F2(
	function (a, b) {
		return elm$random$Random$Generator(
			function (seed0) {
				var _n0 = (_Utils_cmp(a, b) < 0) ? _Utils_Tuple2(a, b) : _Utils_Tuple2(b, a);
				var lo = _n0.a;
				var hi = _n0.b;
				var range = (hi - lo) + 1;
				if (!((range - 1) & range)) {
					return _Utils_Tuple2(
						(((range - 1) & elm$random$Random$peel(seed0)) >>> 0) + lo,
						elm$random$Random$next(seed0));
				} else {
					var threshhold = (((-range) >>> 0) % range) >>> 0;
					var accountForBias = function (seed) {
						accountForBias:
						while (true) {
							var x = elm$random$Random$peel(seed);
							var seedN = elm$random$Random$next(seed);
							if (_Utils_cmp(x, threshhold) < 0) {
								var $temp$seed = seedN;
								seed = $temp$seed;
								continue accountForBias;
							} else {
								return _Utils_Tuple2((x % range) + lo, seedN);
							}
						}
					};
					return accountForBias(seed0);
				}
			});
	});
var elm$random$Random$listHelp = F4(
	function (revList, n, gen, seed) {
		listHelp:
		while (true) {
			if (n < 1) {
				return _Utils_Tuple2(revList, seed);
			} else {
				var _n0 = gen(seed);
				var value = _n0.a;
				var newSeed = _n0.b;
				var $temp$revList = A2(elm$core$List$cons, value, revList),
					$temp$n = n - 1,
					$temp$gen = gen,
					$temp$seed = newSeed;
				revList = $temp$revList;
				n = $temp$n;
				gen = $temp$gen;
				seed = $temp$seed;
				continue listHelp;
			}
		}
	});
var elm$random$Random$list = F2(
	function (n, _n0) {
		var gen = _n0.a;
		return elm$random$Random$Generator(
			function (seed) {
				return A4(elm$random$Random$listHelp, _List_Nil, n, gen, seed);
			});
	});
var Chadtech$elm_relational_database$Id$generator = A2(
	elm$random$Random$map,
	A2(elm$core$Basics$composeR, Chadtech$elm_relational_database$Id$intsToString, Chadtech$elm_relational_database$Id$Id),
	A2(
		elm$random$Random$list,
		64,
		A2(elm$random$Random$int, 0, 61)));
var author$project$Data$Generation$row = function (element) {
	return A2(
		elm$random$Random$map,
		function (id) {
			return _Utils_Tuple2(id, element);
		},
		Chadtech$elm_relational_database$Id$generator);
};
var elm$random$Random$andThen = F2(
	function (callback, _n0) {
		var genA = _n0.a;
		return elm$random$Random$Generator(
			function (seed) {
				var _n1 = genA(seed);
				var result = _n1.a;
				var newSeed = _n1.b;
				var _n2 = callback(result);
				var genB = _n2.a;
				return genB(newSeed);
			});
	});
var author$project$Data$Generation$row_coding_frame = F2(
	function (model, coding) {
		return A2(
			elm$core$Maybe$map,
			elm$random$Random$andThen(author$project$Data$Generation$row),
			A2(author$project$Data$Generation$coding_frame, model, coding));
	});
var elm$core$Debug$log = _Debug_log;
var elm$random$Random$Generate = function (a) {
	return {$: 'Generate', a: a};
};
var elm$time$Time$Name = function (a) {
	return {$: 'Name', a: a};
};
var elm$time$Time$Offset = function (a) {
	return {$: 'Offset', a: a};
};
var elm$time$Time$Zone = F2(
	function (a, b) {
		return {$: 'Zone', a: a, b: b};
	});
var elm$time$Time$customZone = elm$time$Time$Zone;
var elm$time$Time$Posix = function (a) {
	return {$: 'Posix', a: a};
};
var elm$time$Time$millisToPosix = elm$time$Time$Posix;
var elm$time$Time$now = _Time_now(elm$time$Time$millisToPosix);
var elm$time$Time$posixToMillis = function (_n0) {
	var millis = _n0.a;
	return millis;
};
var elm$random$Random$init = A2(
	elm$core$Task$andThen,
	function (time) {
		return elm$core$Task$succeed(
			elm$random$Random$initialSeed(
				elm$time$Time$posixToMillis(time)));
	},
	elm$time$Time$now);
var elm$random$Random$step = F2(
	function (_n0, seed) {
		var generator = _n0.a;
		return generator(seed);
	});
var elm$random$Random$onEffects = F3(
	function (router, commands, seed) {
		if (!commands.b) {
			return elm$core$Task$succeed(seed);
		} else {
			var generator = commands.a.a;
			var rest = commands.b;
			var _n1 = A2(elm$random$Random$step, generator, seed);
			var value = _n1.a;
			var newSeed = _n1.b;
			return A2(
				elm$core$Task$andThen,
				function (_n2) {
					return A3(elm$random$Random$onEffects, router, rest, newSeed);
				},
				A2(elm$core$Platform$sendToApp, router, value));
		}
	});
var elm$random$Random$onSelfMsg = F3(
	function (_n0, _n1, seed) {
		return elm$core$Task$succeed(seed);
	});
var elm$random$Random$cmdMap = F2(
	function (func, _n0) {
		var generator = _n0.a;
		return elm$random$Random$Generate(
			A2(elm$random$Random$map, func, generator));
	});
_Platform_effectManagers['Random'] = _Platform_createManager(elm$random$Random$init, elm$random$Random$onEffects, elm$random$Random$onSelfMsg, elm$random$Random$cmdMap);
var elm$random$Random$command = _Platform_leaf('Random');
var elm$random$Random$generate = F2(
	function (tagger, generator) {
		return elm$random$Random$command(
			elm$random$Random$Generate(
				A2(elm$random$Random$map, tagger, generator)));
	});
var author$project$Data$generateCodingFrame = F2(
	function (model, coding) {
		var _n0 = A2(author$project$Data$Generation$row_coding_frame, model, coding);
		if (_n0.$ === 'Nothing') {
			return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
		} else {
			var generator = _n0.a;
			return A2(
				elm$core$Debug$log,
				'random generate coding_frame dispatch',
				_Utils_Tuple2(
					model,
					A2(
						elm$random$Random$generate,
						A2(
							elm$core$Basics$composeL,
							A2(elm$core$Basics$composeL, author$project$Data$New, author$project$Data$CodingFrame),
							elm$core$Maybe$Just),
						generator)));
		}
	});
var author$project$Data$Access$present_coding_questions = F2(
	function (model, coding_frame) {
		return A2(
			elm$core$Debug$log,
			'present2',
			Chadtech$elm_relational_database$Db$toList(
				A2(
					author$project$Data$Navigation$coding_answer2coding_question,
					model,
					A2(
						author$project$Data$Navigation$coding_frame2coding_answer,
						model,
						Chadtech$elm_relational_database$Db$fromList(
							function (x) {
								return _List_fromArray(
									[x]);
							}(coding_frame))))));
	});
var author$project$Data$Navigation$coding_questionary2coding_question = F2(
	function (model, coding_questionary) {
		return A3(
			author$project$Db$Extra$selectFrom,
			model.coding_questions,
			function (c) {
				return c.coding_questionary;
			},
			coding_questionary);
	});
var author$project$Data$Navigation$question2coding_questionary = F2(
	function (model, question) {
		return A3(
			author$project$Db$Extra$selectFrom,
			model.coding_questionaries,
			function (c) {
				return c.question;
			},
			question);
	});
var author$project$Data$Navigation$coding_frame2coding_question = F2(
	function (model, coding_frame) {
		var right = A2(
			author$project$Data$Navigation$coding_answer2coding_question,
			model,
			A2(author$project$Data$Navigation$coding_frame2coding_answer, model, coding_frame));
		var left = A2(
			author$project$Data$Navigation$coding_questionary2coding_question,
			model,
			A2(
				author$project$Data$Navigation$question2coding_questionary,
				model,
				A2(
					author$project$Data$Navigation$answer2question,
					model,
					A2(author$project$Data$Navigation$coding_frame2answer, model, coding_frame))));
		return A2(author$project$Db$Extra$union, left, right);
	});
var author$project$Data$Access$missing_coding_questions = F3(
	function (model, coding, cf) {
		var present = Chadtech$elm_relational_database$Db$fromList(
			A2(author$project$Data$Access$present_coding_questions, model, cf));
		var all = A2(
			author$project$Data$Navigation$coding_frame2coding_question,
			model,
			Chadtech$elm_relational_database$Db$fromList(
				function (x) {
					return _List_fromArray(
						[x]);
				}(cf)));
		return Chadtech$elm_relational_database$Db$toList(
			A2(author$project$Db$Extra$difference, all, present));
	});
var author$project$Data$Generation$coding_answer = F2(
	function (_n0, _n1) {
		var fid = _n0.a;
		var qid = _n1.a;
		return author$project$Data$Generation$row(
			A4(author$project$Entities$Coding$Answer$Model, qid, fid, '', author$project$Entities$Timestamp$empty));
	});
var author$project$Data$Generation$missing_codingAnswers = F3(
	function (model, coding, cf) {
		var missing_questions = A3(author$project$Data$Access$missing_coding_questions, model, coding, cf);
		return A2(
			elm$core$List$map,
			function (qid) {
				return A2(author$project$Data$Generation$coding_answer, cf, qid);
			},
			A2(elm$core$Debug$log, 'generation mapper coding answers', missing_questions));
	});
var author$project$Data$generateMissingCodingAnswers = F3(
	function (model, coding, coding_frame) {
		var generators = A3(
			author$project$Data$Generation$missing_codingAnswers,
			model,
			coding,
			A2(elm$core$Debug$log, 'dispatch coding frame', coding_frame));
		return elm$core$Platform$Cmd$batch(
			A2(
				elm$core$List$map,
				elm$random$Random$generate(
					A2(
						elm$core$Basics$composeL,
						A2(elm$core$Basics$composeL, author$project$Data$New, author$project$Data$CodingAnswer),
						elm$core$Maybe$Just)),
				A2(elm$core$Debug$log, 'missing coding answers generate dispatch', generators)));
	});
var author$project$Data$SetTime = F2(
	function (a, b) {
		return {$: 'SetTime', a: a, b: b};
	});
var author$project$Data$TimedCodingFrame = function (a) {
	return {$: 'TimedCodingFrame', a: a};
};
var author$project$Entities$Timestamp$Accessed = function (a) {
	return {$: 'Accessed', a: a};
};
var author$project$Data$accessCodingFrame = function (id) {
	return A2(
		elm$core$Task$perform,
		function (x) {
			return A2(
				author$project$Data$SetTime,
				author$project$Data$TimedCodingFrame(id),
				author$project$Entities$Timestamp$Accessed(x));
		},
		elm$time$Time$now);
};
var elm$core$List$sortBy = _List_sortBy;
var author$project$Data$Access$sorted_codingFrames = F2(
	function (model, coding) {
		return A2(
			elm$core$List$sortBy,
			function (_n0) {
				var m = _n0.b;
				return m.timestamp.created;
			},
			Chadtech$elm_relational_database$Db$toList(
				A2(
					author$project$Data$Navigation$coding2coding_frame,
					model,
					Chadtech$elm_relational_database$Db$fromList(
						_List_fromArray(
							[coding])))));
	});
var elm_community$list_extra$List$Extra$findIndexHelp = F3(
	function (index, predicate, list) {
		findIndexHelp:
		while (true) {
			if (!list.b) {
				return elm$core$Maybe$Nothing;
			} else {
				var x = list.a;
				var xs = list.b;
				if (predicate(x)) {
					return elm$core$Maybe$Just(index);
				} else {
					var $temp$index = index + 1,
						$temp$predicate = predicate,
						$temp$list = xs;
					index = $temp$index;
					predicate = $temp$predicate;
					list = $temp$list;
					continue findIndexHelp;
				}
			}
		}
	});
var elm_community$list_extra$List$Extra$findIndex = elm_community$list_extra$List$Extra$findIndexHelp(0);
var elm_community$list_extra$List$Extra$elemIndex = function (x) {
	return elm_community$list_extra$List$Extra$findIndex(
		elm$core$Basics$eq(x));
};
var author$project$Data$Access$current_codingFrame_index = F2(
	function (model, coding) {
		return A2(
			elm$core$Maybe$andThen,
			function (x) {
				return A2(
					elm_community$list_extra$List$Extra$elemIndex,
					x,
					A2(author$project$Data$Access$sorted_codingFrames, model, coding));
			},
			A2(author$project$Data$Access$current_codingFrame, model, coding));
	});
var elm$core$List$drop = F2(
	function (n, list) {
		drop:
		while (true) {
			if (n <= 0) {
				return list;
			} else {
				if (!list.b) {
					return list;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs;
					n = $temp$n;
					list = $temp$list;
					continue drop;
				}
			}
		}
	});
var elm_community$list_extra$List$Extra$getAt = F2(
	function (idx, xs) {
		return (idx < 0) ? elm$core$Maybe$Nothing : elm$core$List$head(
			A2(elm$core$List$drop, idx, xs));
	});
var author$project$Data$moveCodingFrame = F3(
	function (model, direction, coding) {
		var current_index = A2(author$project$Data$Access$current_codingFrame_index, model, coding);
		var coding_frames = A2(author$project$Data$Access$sorted_codingFrames, model, coding);
		var new_frame = function () {
			if (direction.$ === 'Next') {
				return A2(
					elm$core$Maybe$andThen,
					function (x) {
						return A2(elm_community$list_extra$List$Extra$getAt, x + 1, coding_frames);
					},
					current_index);
			} else {
				return A2(
					elm$core$Maybe$andThen,
					function (x) {
						return A2(elm_community$list_extra$List$Extra$getAt, x - 1, coding_frames);
					},
					current_index);
			}
		}();
		if (new_frame.$ === 'Nothing') {
			return A2(author$project$Data$generateCodingFrame, model, coding);
		} else {
			var _n1 = new_frame.a;
			var id = _n1.a;
			var frame = _n1.b;
			return _Utils_Tuple2(
				model,
				author$project$Data$accessCodingFrame(id));
		}
	});
var author$project$Data$Navigation$answer2coding_frame = F2(
	function (model, answer) {
		return A3(
			author$project$Db$Extra$selectFrom,
			model.coding_frames,
			function (c) {
				return c.answer;
			},
			answer);
	});
var author$project$Data$Navigation$coding_answer2coding_frame = F2(
	function (model, coding_answer) {
		return A3(
			author$project$Db$Extra$getDB,
			model.coding_frames,
			function (c) {
				return c.coding_frame;
			},
			coding_answer);
	});
var author$project$Data$Navigation$coding_question2coding_answer = F2(
	function (model, coding_question) {
		return A3(
			author$project$Db$Extra$selectFrom,
			model.coding_answers,
			function (c) {
				return c.coding_question;
			},
			coding_question);
	});
var author$project$Data$Navigation$question2coding_frame = F2(
	function (model, question) {
		var right = A2(
			author$project$Data$Navigation$coding_answer2coding_frame,
			model,
			A2(
				author$project$Data$Navigation$coding_question2coding_answer,
				model,
				A2(
					author$project$Data$Navigation$coding_questionary2coding_question,
					model,
					A2(author$project$Data$Navigation$question2coding_questionary, model, question))));
		var left = A2(
			author$project$Data$Navigation$answer2coding_frame,
			model,
			A2(author$project$Data$Navigation$question2answer, model, question));
		return A2(author$project$Db$Extra$union, left, right);
	});
var elm$core$Maybe$map2 = F3(
	function (func, ma, mb) {
		if (ma.$ === 'Nothing') {
			return elm$core$Maybe$Nothing;
		} else {
			var a = ma.a;
			if (mb.$ === 'Nothing') {
				return elm$core$Maybe$Nothing;
			} else {
				var b = mb.a;
				return elm$core$Maybe$Just(
					A2(func, a, b));
			}
		}
	});
var author$project$Data$accessFirstCodingFrameOfQuestion = F3(
	function (model, coding, mbquestion) {
		var mbsame = A3(
			elm$core$Maybe$map2,
			F2(
				function (a, b) {
					return _Utils_eq(a, b);
				}),
			mbquestion,
			A2(author$project$Data$Access$current_question, model, coding));
		var _n0 = _Utils_Tuple2(mbsame, mbquestion);
		if (((_n0.a.$ === 'Just') && (!_n0.a.a)) && (_n0.b.$ === 'Just')) {
			var question = _n0.b.a;
			var second = A2(
				author$project$Data$Navigation$coding2coding_frame,
				model,
				Chadtech$elm_relational_database$Db$fromList(
					_List_fromArray(
						[coding])));
			var first = A2(
				author$project$Data$Navigation$question2coding_frame,
				model,
				Chadtech$elm_relational_database$Db$fromList(
					_List_fromArray(
						[question])));
			var new_frame = elm$core$List$head(
				Chadtech$elm_relational_database$Db$toList(
					A2(author$project$Db$Extra$intersection, first, second)));
			if (new_frame.$ === 'Nothing') {
				return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
			} else {
				var _n2 = new_frame.a;
				var id = _n2.a;
				var frame = _n2.b;
				return _Utils_Tuple2(
					model,
					A2(
						elm$core$Task$perform,
						function (x) {
							return A2(
								author$project$Data$SetTime,
								author$project$Data$TimedCodingFrame(id),
								author$project$Entities$Timestamp$Accessed(x));
						},
						elm$time$Time$now));
			}
		} else {
			return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
		}
	});
var author$project$Data$moveQuestion = F3(
	function (model, direction, coding) {
		var questions = A2(
			elm$core$List$sortBy,
			function (_n6) {
				var id = _n6.a;
				return Chadtech$elm_relational_database$Id$toString(id);
			},
			Chadtech$elm_relational_database$Db$toList(
				A2(
					author$project$Data$Navigation$coding2question,
					model,
					Chadtech$elm_relational_database$Db$fromList(
						_List_fromArray(
							[coding])))));
		var current_question = A2(author$project$Data$Access$current_question, model, coding);
		var current_index = A2(
			elm$core$Maybe$andThen,
			function (x) {
				return A2(elm_community$list_extra$List$Extra$elemIndex, x, questions);
			},
			current_question);
		if (current_index.$ === 'Nothing') {
			return A2(author$project$Data$generateCodingFrame, model, coding);
		} else {
			var index = current_index.a;
			var _n1 = _Utils_Tuple2(direction, index);
			if (_n1.a.$ === 'Previous') {
				if (!_n1.b) {
					var _n2 = _n1.a;
					return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
				} else {
					var _n3 = _n1.a;
					var new_question = A2(elm_community$list_extra$List$Extra$getAt, index - 1, questions);
					return A3(author$project$Data$accessFirstCodingFrameOfQuestion, model, coding, new_question);
				}
			} else {
				var _n4 = _n1.a;
				var _n5 = _Utils_eq(
					index,
					elm$core$List$length(questions) - 1);
				if (_n5) {
					return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
				} else {
					var new_question = A2(elm_community$list_extra$List$Extra$getAt, index + 1, questions);
					return A3(author$project$Data$accessFirstCodingFrameOfQuestion, model, coding, new_question);
				}
			}
		}
	});
var author$project$Data$optionalUpdate = F3(
	function (id, database, updater) {
		if (id.$ === 'Just') {
			var id_value = id.a;
			var _n1 = A2(Chadtech$elm_relational_database$Db$get, database, id_value);
			if (_n1.$ === 'Just') {
				var value = _n1.a;
				var _n2 = updater(value);
				var newValue = _n2.a;
				var newCmd = _n2.b;
				return A2(
					Chadtech$elm_relational_database$Db$insert,
					_Utils_Tuple2(id_value, newValue),
					database);
			} else {
				return database;
			}
		} else {
			return database;
		}
	});
var author$project$Entities$Answer$update = F2(
	function (msg, model) {
		return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
	});
var author$project$Entities$Coder$update = F2(
	function (msg, model) {
		return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
	});
var author$project$Entities$Coding$update = F2(
	function (msg, model) {
		return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
	});
var author$project$Entities$Coding$Frame$update = F2(
	function (msg, model) {
		var e_msg = msg.a;
		return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
	});
var author$project$Entities$Coding$Question$update = F2(
	function (msg, model) {
		return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
	});
var author$project$Entities$Question$update = F2(
	function (msg, model) {
		return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
	});
var author$project$Entities$Questionary$update = F2(
	function (msg, model) {
		return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
	});
var author$project$Data$updateEntity = F2(
	function (umsg, model) {
		switch (umsg.$) {
			case 'AnswerMsg':
				var id = umsg.a;
				var msg = umsg.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							answers: A3(
								author$project$Data$optionalUpdate,
								id,
								model.answers,
								author$project$Entities$Answer$update(msg))
						}),
					elm$core$Platform$Cmd$none);
			case 'CoderMsg':
				var id = umsg.a;
				var msg = umsg.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							coders: A3(
								author$project$Data$optionalUpdate,
								id,
								model.coders,
								author$project$Entities$Coder$update(msg))
						}),
					elm$core$Platform$Cmd$none);
			case 'CodingMsg':
				var id = umsg.a;
				var msg = umsg.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							codings: A3(
								author$project$Data$optionalUpdate,
								id,
								model.codings,
								author$project$Entities$Coding$update(msg))
						}),
					elm$core$Platform$Cmd$none);
			case 'CodingFrameMsg':
				var id = umsg.a;
				var msg = umsg.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							coding_frames: A3(
								author$project$Data$optionalUpdate,
								id,
								model.coding_frames,
								author$project$Entities$Coding$Frame$update(msg))
						}),
					elm$core$Platform$Cmd$none);
			case 'QuestionaryMsg':
				var id = umsg.a;
				var msg = umsg.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							questionaries: A3(
								author$project$Data$optionalUpdate,
								id,
								model.questionaries,
								author$project$Entities$Questionary$update(msg))
						}),
					elm$core$Platform$Cmd$none);
			case 'QuestionMsg':
				var id = umsg.a;
				var msg = umsg.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							questions: A3(
								author$project$Data$optionalUpdate,
								id,
								model.questions,
								author$project$Entities$Question$update(msg))
						}),
					elm$core$Platform$Cmd$none);
			default:
				var id = umsg.a;
				var msg = umsg.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							coding_questions: A3(
								author$project$Data$optionalUpdate,
								id,
								model.coding_questions,
								author$project$Entities$Coding$Question$update(msg))
						}),
					elm$core$Platform$Cmd$none);
		}
	});
var author$project$Data$TimedCodingAnswer = function (a) {
	return {$: 'TimedCodingAnswer', a: a};
};
var author$project$Data$updateTimestamp = F2(
	function (object, tmsg) {
		var mb_timed_entity = function () {
			switch (object.$) {
				case 'CodingAnswer':
					var mb = object.a;
					return A2(
						elm$core$Maybe$map,
						function (_n2) {
							var id = _n2.a;
							return author$project$Data$TimedCodingAnswer(id);
						},
						mb);
				case 'CodingFrame':
					var mb = object.a;
					return A2(
						elm$core$Maybe$map,
						function (_n3) {
							var id = _n3.a;
							return author$project$Data$TimedCodingFrame(id);
						},
						mb);
				default:
					return elm$core$Maybe$Nothing;
			}
		}();
		if (mb_timed_entity.$ === 'Nothing') {
			return elm$core$Platform$Cmd$none;
		} else {
			var timed_entity = mb_timed_entity.a;
			return A2(
				elm$core$Task$perform,
				function (x) {
					return A2(
						author$project$Data$SetTime,
						timed_entity,
						tmsg(x));
				},
				elm$time$Time$now);
		}
	});
var author$project$Db$Extra$chainable_get = F2(
	function (db, id) {
		var mb = A2(Chadtech$elm_relational_database$Db$get, db, id);
		if (mb.$ === 'Nothing') {
			return elm$core$Maybe$Nothing;
		} else {
			var v = mb.a;
			return elm$core$Maybe$Just(
				_Utils_Tuple2(id, v));
		}
	});
var author$project$Entities$Timestamp$All = function (a) {
	return {$: 'All', a: a};
};
var author$project$Entities$Timestamp$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 'All':
				var time_ = msg.a;
				var time = elm$time$Time$posixToMillis(time_);
				return _Utils_Tuple2(
					{accessed: time, created: time, modified: time},
					elm$core$Platform$Cmd$none);
			case 'Created':
				var time_ = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							created: elm$time$Time$posixToMillis(time_)
						}),
					elm$core$Platform$Cmd$none);
			case 'Modified':
				var time_ = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							modified: elm$time$Time$posixToMillis(time_)
						}),
					elm$core$Platform$Cmd$none);
			default:
				var time_ = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							accessed: elm$time$Time$posixToMillis(time_)
						}),
					elm$core$Platform$Cmd$none);
		}
	});
var author$project$Entities$Timestamp$updateTimestamp = F2(
	function (msg, object) {
		var _n0 = A2(author$project$Entities$Timestamp$update, msg, object.timestamp);
		var new_timestamp = _n0.a;
		return _Utils_update(
			object,
			{timestamp: new_timestamp});
	});
var author$project$Data$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 'Entity':
				var emsg = msg.a;
				return A2(author$project$Data$updateEntity, emsg, model);
			case 'Generate':
				var object = msg.a;
				var coding = msg.b;
				var coding_frame = msg.c;
				var _n1 = _Utils_Tuple2(object, coding_frame);
				switch (_n1.a.$) {
					case 'CodingFrame':
						return A4(elm$core$Debug$log, 'Generating coding Frame', author$project$Data$generateCodingFrame, model, coding);
					case 'CodingAnswer':
						if (_n1.b.$ === 'Just') {
							var frame = _n1.b.a;
							return A2(
								elm$core$Debug$log,
								'Generating Missing coding answers',
								_Utils_Tuple2(
									model,
									A3(author$project$Data$generateMissingCodingAnswers, model, coding, frame)));
						} else {
							var _n2 = _n1.b;
							var cmd = A2(
								elm$core$Maybe$map,
								A2(author$project$Data$generateMissingCodingAnswers, model, coding),
								A2(author$project$Data$Access$current_codingFrame, model, coding));
							return _Utils_Tuple2(
								model,
								A2(elm$core$Maybe$withDefault, elm$core$Platform$Cmd$none, cmd));
						}
					default:
						var a = _n1;
						return A2(
							elm$core$Debug$log,
							'Generate empty',
							_Utils_Tuple2(model, elm$core$Platform$Cmd$none));
				}
			case 'SetTime':
				var entity = msg.a;
				var tmsg = msg.b;
				if (entity.$ === 'TimedCodingAnswer') {
					var id = entity.a;
					var new_coding_answers = A3(
						Chadtech$elm_relational_database$Db$update,
						id,
						elm$core$Maybe$map(
							author$project$Entities$Timestamp$updateTimestamp(tmsg)),
						model.coding_answers);
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{coding_answers: new_coding_answers}),
						elm$core$Platform$Cmd$none);
				} else {
					var id = entity.a;
					var new_coding_frames = A3(
						Chadtech$elm_relational_database$Db$update,
						id,
						elm$core$Maybe$map(
							author$project$Entities$Timestamp$updateTimestamp(tmsg)),
						model.coding_frames);
					var mb_old_coding_frame = A2(Chadtech$elm_relational_database$Db$get, model.coding_frames, id);
					var coding = A2(
						elm$core$Maybe$andThen,
						function (x) {
							return A2(author$project$Db$Extra$chainable_get, model.codings, x.coding);
						},
						mb_old_coding_frame);
					var missing_cmd = A3(
						elm$core$Maybe$map2,
						author$project$Data$generateMissingCodingAnswers(model),
						coding,
						A2(author$project$Db$Extra$chainable_get, model.coding_frames, id));
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{coding_frames: new_coding_frames}),
						A2(elm$core$Maybe$withDefault, elm$core$Platform$Cmd$none, missing_cmd));
				}
			case 'Move':
				var direction = msg.a;
				var object = msg.b;
				var coding = msg.c;
				switch (object.$) {
					case 'Question':
						return A5(elm$core$Debug$log, 'moving Question', author$project$Data$moveQuestion, model, direction, coding);
					case 'Answer':
						return A5(elm$core$Debug$log, 'moving CodingFrame', author$project$Data$moveCodingFrame, model, direction, coding);
					default:
						return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
				}
			default:
				var object = msg.a;
				_n5$2:
				while (true) {
					switch (object.$) {
						case 'CodingFrame':
							if (object.a.$ === 'Just') {
								var coding_frame = object.a.a;
								return A2(
									elm$core$Debug$log,
									'new CodingFrame',
									_Utils_Tuple2(
										_Utils_update(
											model,
											{
												coding_frames: A2(Chadtech$elm_relational_database$Db$insert, coding_frame, model.coding_frames)
											}),
										A2(author$project$Data$updateTimestamp, object, author$project$Entities$Timestamp$All)));
							} else {
								break _n5$2;
							}
						case 'CodingAnswer':
							if (object.a.$ === 'Just') {
								var _n6 = object.a.a;
								var id = _n6.a;
								var ca = _n6.b;
								return A2(
									elm$core$Debug$log,
									'new CodingAnswer',
									_Utils_Tuple2(
										_Utils_update(
											model,
											{
												coding_answers: A2(
													Chadtech$elm_relational_database$Db$insert,
													_Utils_Tuple2(id, ca),
													model.coding_answers)
											}),
										A2(author$project$Data$updateTimestamp, object, author$project$Entities$Timestamp$All)));
							} else {
								break _n5$2;
							}
						default:
							break _n5$2;
					}
				}
				return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
		}
	});
var author$project$Main$GotDataMsg = function (a) {
	return {$: 'GotDataMsg', a: a};
};
var author$project$Page$OnUrlChange = function (a) {
	return {$: 'OnUrlChange', a: a};
};
var author$project$Page$Url$Code = {$: 'Code'};
var author$project$Page$Url$Data = {$: 'Data'};
var author$project$Page$Url$Error404 = function (a) {
	return {$: 'Error404', a: a};
};
var author$project$Page$Url$Upload = {$: 'Upload'};
var author$project$Page$Url$fromString = function (url) {
	switch (url) {
		case '':
			return author$project$Page$Url$StartPage;
		case 'data':
			return author$project$Page$Url$Data;
		case 'error':
			return author$project$Page$Url$Error;
		case 'home':
			return author$project$Page$Url$Home;
		case 'code':
			return author$project$Page$Url$Code;
		case 'upload':
			return author$project$Page$Url$Upload;
		default:
			return author$project$Page$Url$Error404(url);
	}
};
var author$project$Page$Url$fromUrl = function (url) {
	return author$project$Page$Url$fromString(
		A2(elm$core$Maybe$withDefault, '', url.fragment));
};
var author$project$Page$onUrlChange = function (url) {
	return author$project$Page$OnUrlChange(
		author$project$Page$Url$fromUrl(url));
};
var author$project$Internal$Ripple$Model$Idle = {$: 'Idle'};
var author$project$Internal$Ripple$Model$defaultModel = {animationCounter: 0, animationState: author$project$Internal$Ripple$Model$Idle, clientRect: elm$core$Maybe$Nothing, focused: false};
var author$project$Internal$Button$Model$defaultModel = {ripple: author$project$Internal$Ripple$Model$defaultModel};
var author$project$Internal$Component$indexed = F3(
	function (get_model, set_model, model0) {
		var set_ = F3(
			function (idx, store, model) {
				return A2(
					set_model,
					A3(
						elm$core$Dict$insert,
						idx,
						model,
						get_model(store)),
					store);
			});
		var get_ = F2(
			function (idx, store) {
				return A2(
					elm$core$Maybe$withDefault,
					model0,
					A2(
						elm$core$Dict$get,
						idx,
						get_model(store)));
			});
		return {get: get_, set: set_};
	});
var author$project$Internal$Button$Implementation$getSet = A3(
	author$project$Internal$Component$indexed,
	function ($) {
		return $.button;
	},
	F2(
		function (x, y) {
			return _Utils_update(
				y,
				{button: x});
		}),
	author$project$Internal$Button$Model$defaultModel);
var author$project$Internal$Button$Model$RippleMsg = function (a) {
	return {$: 'RippleMsg', a: a};
};
var elm$core$Basics$always = F2(
	function (a, _n0) {
		return a;
	});
var elm$core$Process$sleep = _Process_sleep;
var author$project$Internal$Helpers$delayedCmd = F2(
	function (time, msg) {
		return A2(
			elm$core$Task$perform,
			elm$core$Basics$always(msg),
			elm$core$Process$sleep(time));
	});
var author$project$Internal$Ripple$Implementation$normalizedEventCoords = F3(
	function (event, pageOffset, clientRect) {
		var _n0 = pageOffset;
		var x = _n0.x;
		var y = _n0.y;
		var documentX = x + clientRect.x;
		var documentY = x + clientRect.y;
		var _n1 = event.pagePoint;
		var pageX = _n1.pageX;
		var pageY = _n1.pageY;
		return {x: pageX - documentX, y: pageY - documentY};
	});
var author$project$Internal$Ripple$Implementation$fgTranslationCoords = F2(
	function (isUnbounded, _n0) {
		var frame = _n0.frame;
		var activationEvent = _n0.activationEvent;
		var windowPageOffset = _n0.windowPageOffset;
		var wasActivatedByPointer = _n0.wasActivatedByPointer;
		var maxDimension = A2(elm$core$Basics$max, frame.width, frame.height);
		var initialSize = maxDimension * 0.6;
		var startPoint = function () {
			var _n1 = A3(author$project$Internal$Ripple$Implementation$normalizedEventCoords, activationEvent, windowPageOffset, frame);
			var x = _n1.x;
			var y = _n1.y;
			return {x: x - (initialSize / 2), y: y - (initialSize / 2)};
		}();
		var endPoint = {x: (frame.width - initialSize) / 2, y: (frame.height - initialSize) / 2};
		return {endPoint: endPoint, startPoint: startPoint};
	});
var elm$core$String$fromFloat = _String_fromNumber;
var author$project$Internal$Ripple$Implementation$animateActivation = F4(
	function (isUnbounded, frame, windowPageOffset, activationEvent) {
		var wasActivatedByPointer = true;
		var _n0 = A2(
			author$project$Internal$Ripple$Implementation$fgTranslationCoords,
			isUnbounded,
			{activationEvent: activationEvent, frame: frame, wasActivatedByPointer: wasActivatedByPointer, windowPageOffset: windowPageOffset});
		var startPoint = _n0.startPoint;
		var endPoint = _n0.endPoint;
		var translateEnd = isUnbounded ? '' : (elm$core$String$fromFloat(endPoint.x) + ('px, ' + (elm$core$String$fromFloat(endPoint.y) + 'px')));
		var translateStart = isUnbounded ? '' : (elm$core$String$fromFloat(startPoint.x) + ('px, ' + (elm$core$String$fromFloat(startPoint.y) + 'px')));
		return {translateEnd: translateEnd, translateStart: translateStart};
	});
var author$project$Internal$Ripple$Model$numbers = {deactivationTimeoutMs: 225, fgDeactivationMs: 150, initialOriginScale: 0.6, padding: 10, tapDelayMs: 300};
var elm$core$Basics$pow = _Basics_pow;
var elm$core$Basics$sqrt = _Basics_sqrt;
var author$project$Internal$Ripple$Implementation$layoutInternal = F2(
	function (isUnbounded, frame) {
		var maxDim = A2(elm$core$Basics$max, frame.width, frame.height);
		var initialSize = elm$core$Basics$floor(maxDim * author$project$Internal$Ripple$Model$numbers.initialOriginScale);
		var hypotenuse = elm$core$Basics$sqrt(
			A2(elm$core$Basics$pow, frame.width, 2) + A2(elm$core$Basics$pow, frame.height, 2));
		var boundedRadius = hypotenuse + author$project$Internal$Ripple$Model$numbers.padding;
		var maxRadius = isUnbounded ? maxDim : boundedRadius;
		var fgScale = maxRadius / initialSize;
		return {fgScale: fgScale, initialSize: initialSize};
	});
var author$project$Internal$Ripple$Model$Activate = F2(
	function (a, b) {
		return {$: 'Activate', a: a, b: b};
	});
var author$project$Internal$Ripple$Model$Activated = function (a) {
	return {$: 'Activated', a: a};
};
var author$project$Internal$Ripple$Model$ActivationEnded = function (a) {
	return {$: 'ActivationEnded', a: a};
};
var author$project$Internal$Ripple$Model$Deactivated = function (a) {
	return {$: 'Deactivated', a: a};
};
var author$project$Internal$Ripple$Model$DeactivationEnded = function (a) {
	return {$: 'DeactivationEnded', a: a};
};
var author$project$Internal$Ripple$Model$Reactivate = F2(
	function (a, b) {
		return {$: 'Reactivate', a: a, b: b};
	});
var elm$browser$Browser$Dom$getElement = _Browser_getElement;
var elm$core$Task$onError = _Scheduler_onError;
var elm$core$Task$attempt = F2(
	function (resultToMessage, task) {
		return elm$core$Task$command(
			elm$core$Task$Perform(
				A2(
					elm$core$Task$onError,
					A2(
						elm$core$Basics$composeL,
						A2(elm$core$Basics$composeL, elm$core$Task$succeed, resultToMessage),
						elm$core$Result$Err),
					A2(
						elm$core$Task$andThen,
						A2(
							elm$core$Basics$composeL,
							A2(elm$core$Basics$composeL, elm$core$Task$succeed, resultToMessage),
							elm$core$Result$Ok),
						task))));
	});
var author$project$Internal$Ripple$Implementation$update = F2(
	function (msg, model) {
		var _n0 = _Utils_Tuple2(msg, model.animationState);
		_n0$13:
		while (true) {
			switch (_n0.a.$) {
				case 'Focus':
					var _n1 = _n0.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{focused: true}),
						elm$core$Platform$Cmd$none);
				case 'Blur':
					var _n2 = _n0.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{focused: false}),
						elm$core$Platform$Cmd$none);
				case 'SetCssVariables':
					var _n3 = _n0.a;
					var isUnbounded = _n3.a;
					var clientRect = _n3.b;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								clientRect: elm$core$Maybe$Just(clientRect)
							}),
						elm$core$Platform$Cmd$none);
				case 'Activate0':
					if (_n0.b.$ === 'Idle') {
						var _n4 = _n0.a;
						var domId = _n4.a;
						var activateData = _n4.b;
						var _n5 = _n0.b;
						return _Utils_Tuple2(
							model,
							A2(
								elm$core$Task$attempt,
								author$project$Internal$Ripple$Model$Activate(activateData),
								elm$browser$Browser$Dom$getElement(domId)));
					} else {
						var _n6 = _n0.a;
						var domId = _n6.a;
						var activateData = _n6.b;
						return _Utils_Tuple2(
							model,
							A2(
								elm$core$Task$attempt,
								author$project$Internal$Ripple$Model$Reactivate(activateData),
								elm$browser$Browser$Dom$getElement(domId)));
					}
				case 'Reactivate':
					switch (_n0.b.$) {
						case 'Activated':
							var _n7 = _n0.a;
							var activateData = _n7.a;
							var element = _n7.b;
							var activationEvent = _n0.b.a.activationEvent;
							return _Utils_eq(activateData.event.eventType, activationEvent.eventType) ? _Utils_Tuple2(
								_Utils_update(
									model,
									{animationState: author$project$Internal$Ripple$Model$Idle}),
								A2(
									elm$core$Task$perform,
									function (_n8) {
										return A2(author$project$Internal$Ripple$Model$Activate, activateData, element);
									},
									elm$core$Task$succeed(_Utils_Tuple0))) : _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
						case 'Deactivated':
							var _n9 = _n0.a;
							var activateData = _n9.a;
							var element = _n9.b;
							var activationEvent = _n0.b.a.activationEvent;
							return _Utils_eq(activateData.event.eventType, activationEvent.eventType) ? _Utils_Tuple2(
								_Utils_update(
									model,
									{animationState: author$project$Internal$Ripple$Model$Idle}),
								A2(
									elm$core$Task$perform,
									function (_n10) {
										return A2(author$project$Internal$Ripple$Model$Activate, activateData, element);
									},
									elm$core$Task$succeed(_Utils_Tuple0))) : _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
						default:
							var _n11 = _n0.a;
							var activateData = _n11.a;
							var element = _n11.b;
							var _n12 = _n0.b;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{animationState: author$project$Internal$Ripple$Model$Idle}),
								A2(
									elm$core$Task$perform,
									function (_n13) {
										return A2(author$project$Internal$Ripple$Model$Activate, activateData, element);
									},
									elm$core$Task$succeed(_Utils_Tuple0)));
					}
				case 'Activate':
					if (_n0.a.b.$ === 'Err') {
						var _n14 = _n0.a;
						var activateData = _n14.a;
						return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
					} else {
						var _n15 = _n0.a;
						var activateData = _n15.a;
						var element = _n15.b.a.element;
						var viewport = _n15.b.a.viewport;
						var newAnimationCounter = model.animationCounter + 1;
						var _n16 = A4(author$project$Internal$Ripple$Implementation$animateActivation, activateData.isUnbounded, element, viewport, activateData.event);
						var translateStart = _n16.translateStart;
						var translateEnd = _n16.translateEnd;
						var _n17 = A2(author$project$Internal$Ripple$Implementation$layoutInternal, activateData.isUnbounded, element);
						var fgScale = _n17.fgScale;
						var initialSize = _n17.initialSize;
						var activatedData = {
							activationEvent: activateData.event,
							activationHasEnded: false,
							deactivated: false,
							fgScale: fgScale,
							frame: {height: element.height, left: element.x, top: element.y, width: element.width},
							initialSize: initialSize,
							translateEnd: translateEnd,
							translateStart: translateStart,
							wasElementMadeActive: activateData.wasElementMadeActive
						};
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									animationCounter: newAnimationCounter,
									animationState: author$project$Internal$Ripple$Model$Activated(activatedData)
								}),
							A2(
								elm$core$Task$perform,
								function (_n18) {
									return author$project$Internal$Ripple$Model$ActivationEnded(newAnimationCounter);
								},
								elm$core$Process$sleep(author$project$Internal$Ripple$Model$numbers.deactivationTimeoutMs)));
					}
				case 'ActivationEnded':
					if (_n0.b.$ === 'Activated') {
						var animationCount = _n0.a.a;
						var activatedData = _n0.b.a;
						if (_Utils_eq(animationCount, model.animationCounter)) {
							if (activatedData.deactivated) {
								return _Utils_Tuple2(
									_Utils_update(
										model,
										{
											animationState: author$project$Internal$Ripple$Model$Deactivated(activatedData)
										}),
									A2(
										elm$core$Task$perform,
										function (_n19) {
											return author$project$Internal$Ripple$Model$DeactivationEnded(model.animationCounter);
										},
										elm$core$Process$sleep(author$project$Internal$Ripple$Model$numbers.tapDelayMs)));
							} else {
								var newActivatedData = _Utils_update(
									activatedData,
									{activationHasEnded: true});
								return _Utils_Tuple2(
									_Utils_update(
										model,
										{
											animationState: author$project$Internal$Ripple$Model$Activated(newActivatedData)
										}),
									elm$core$Platform$Cmd$none);
							}
						} else {
							return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
						}
					} else {
						break _n0$13;
					}
				case 'Deactivate':
					if (_n0.b.$ === 'Activated') {
						var _n20 = _n0.a;
						var activatedData = _n0.b.a;
						if (activatedData.activationHasEnded) {
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										animationState: author$project$Internal$Ripple$Model$Deactivated(activatedData)
									}),
								A2(
									elm$core$Task$perform,
									function (_n21) {
										return author$project$Internal$Ripple$Model$DeactivationEnded(model.animationCounter);
									},
									elm$core$Process$sleep(author$project$Internal$Ripple$Model$numbers.tapDelayMs)));
						} else {
							var newActivatedData = _Utils_update(
								activatedData,
								{deactivated: true});
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										animationState: author$project$Internal$Ripple$Model$Activated(newActivatedData)
									}),
								elm$core$Platform$Cmd$none);
						}
					} else {
						break _n0$13;
					}
				default:
					if (_n0.b.$ === 'Deactivated') {
						var animationCount = _n0.a.a;
						return _Utils_eq(animationCount, model.animationCounter) ? _Utils_Tuple2(
							_Utils_update(
								model,
								{animationState: author$project$Internal$Ripple$Model$Idle}),
							elm$core$Platform$Cmd$none) : _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
					} else {
						break _n0$13;
					}
			}
		}
		return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
	});
var elm$core$Platform$Cmd$map = _Platform_map;
var author$project$Internal$Button$Implementation$update = F3(
	function (lift, msg, model) {
		if (msg.$ === 'RippleMsg') {
			var msg_ = msg.a;
			var _n1 = A2(author$project$Internal$Ripple$Implementation$update, msg_, model.ripple);
			var rippleState = _n1.a;
			var rippleCmd = _n1.b;
			return _Utils_Tuple2(
				elm$core$Maybe$Just(
					_Utils_update(
						model,
						{ripple: rippleState})),
				A2(
					elm$core$Platform$Cmd$map,
					A2(elm$core$Basics$composeL, lift, author$project$Internal$Button$Model$RippleMsg),
					rippleCmd));
		} else {
			var doRipple = msg.a;
			var msg_ = msg.b;
			return _Utils_Tuple2(
				elm$core$Maybe$Nothing,
				A2(
					author$project$Internal$Helpers$delayedCmd,
					doRipple ? 150 : 0,
					msg_));
		}
	});
var author$project$Internal$Component$react = F8(
	function (get, set, ctor, update, lift, msg, idx, store) {
		return A2(
			elm$core$Tuple$mapFirst,
			elm$core$Maybe$map(
				A2(set, idx, store)),
			A3(
				update,
				A2(
					elm$core$Basics$composeL,
					lift,
					ctor(idx)),
				msg,
				A2(get, idx, store)));
	});
var author$project$Internal$Msg$ButtonMsg = F2(
	function (a, b) {
		return {$: 'ButtonMsg', a: a, b: b};
	});
var author$project$Internal$Button$Implementation$react = A4(author$project$Internal$Component$react, author$project$Internal$Button$Implementation$getSet.get, author$project$Internal$Button$Implementation$getSet.set, author$project$Internal$Msg$ButtonMsg, author$project$Internal$Button$Implementation$update);
var author$project$Internal$Checkbox$Model$defaultModel = {animation: elm$core$Maybe$Nothing, isFocused: false, lastKnownState: elm$core$Maybe$Nothing};
var author$project$Internal$Checkbox$Implementation$getSet = A3(
	author$project$Internal$Component$indexed,
	function ($) {
		return $.checkbox;
	},
	F2(
		function (x, y) {
			return _Utils_update(
				y,
				{checkbox: x});
		}),
	author$project$Internal$Checkbox$Model$defaultModel);
var author$project$Internal$Checkbox$Model$CheckedIndeterminate = {$: 'CheckedIndeterminate'};
var author$project$Internal$Checkbox$Model$CheckedUnchecked = {$: 'CheckedUnchecked'};
var author$project$Internal$Checkbox$Model$IndeterminateChecked = {$: 'IndeterminateChecked'};
var author$project$Internal$Checkbox$Model$IndeterminateUnchecked = {$: 'IndeterminateUnchecked'};
var author$project$Internal$Checkbox$Model$UncheckedChecked = {$: 'UncheckedChecked'};
var author$project$Internal$Checkbox$Model$UncheckedIndeterminate = {$: 'UncheckedIndeterminate'};
var author$project$Internal$Checkbox$Implementation$animationState = F2(
	function (oldState, state) {
		var _n0 = _Utils_Tuple2(oldState, state);
		_n0$6:
		while (true) {
			if (_n0.a.$ === 'Nothing') {
				if (_n0.b.$ === 'Just') {
					if (_n0.b.a.$ === 'Checked') {
						var _n5 = _n0.a;
						var _n6 = _n0.b.a;
						return elm$core$Maybe$Just(author$project$Internal$Checkbox$Model$IndeterminateChecked);
					} else {
						var _n7 = _n0.a;
						var _n8 = _n0.b.a;
						return elm$core$Maybe$Just(author$project$Internal$Checkbox$Model$IndeterminateUnchecked);
					}
				} else {
					break _n0$6;
				}
			} else {
				if (_n0.a.a.$ === 'Unchecked') {
					if (_n0.b.$ === 'Nothing') {
						var _n1 = _n0.a.a;
						var _n2 = _n0.b;
						return elm$core$Maybe$Just(author$project$Internal$Checkbox$Model$UncheckedIndeterminate);
					} else {
						if (_n0.b.a.$ === 'Checked') {
							var _n9 = _n0.a.a;
							var _n10 = _n0.b.a;
							return elm$core$Maybe$Just(author$project$Internal$Checkbox$Model$UncheckedChecked);
						} else {
							break _n0$6;
						}
					}
				} else {
					if (_n0.b.$ === 'Nothing') {
						var _n3 = _n0.a.a;
						var _n4 = _n0.b;
						return elm$core$Maybe$Just(author$project$Internal$Checkbox$Model$CheckedIndeterminate);
					} else {
						if (_n0.b.a.$ === 'Unchecked') {
							var _n11 = _n0.a.a;
							var _n12 = _n0.b.a;
							return elm$core$Maybe$Just(author$project$Internal$Checkbox$Model$CheckedUnchecked);
						} else {
							break _n0$6;
						}
					}
				}
			}
		}
		return elm$core$Maybe$Nothing;
	});
var author$project$Internal$Checkbox$Implementation$update = F3(
	function (_n0, msg, model) {
		switch (msg.$) {
			case 'NoOp':
				return _Utils_Tuple2(elm$core$Maybe$Nothing, elm$core$Platform$Cmd$none);
			case 'SetFocus':
				var focus = msg.a;
				return _Utils_Tuple2(
					elm$core$Maybe$Just(
						_Utils_update(
							model,
							{isFocused: focus})),
					elm$core$Platform$Cmd$none);
			case 'Init':
				var lastKnownState = msg.a;
				var state = msg.b;
				var animation = A2(
					elm$core$Maybe$andThen,
					function (lastKnownState_) {
						return A2(author$project$Internal$Checkbox$Implementation$animationState, lastKnownState_, state);
					},
					lastKnownState);
				return _Utils_Tuple2(
					elm$core$Maybe$Just(
						_Utils_update(
							model,
							{
								animation: animation,
								lastKnownState: elm$core$Maybe$Just(state)
							})),
					elm$core$Platform$Cmd$none);
			default:
				return _Utils_Tuple2(
					elm$core$Maybe$Just(
						_Utils_update(
							model,
							{animation: elm$core$Maybe$Nothing})),
					elm$core$Platform$Cmd$none);
		}
	});
var author$project$Internal$Msg$CheckboxMsg = F2(
	function (a, b) {
		return {$: 'CheckboxMsg', a: a, b: b};
	});
var author$project$Internal$Checkbox$Implementation$react = A4(author$project$Internal$Component$react, author$project$Internal$Checkbox$Implementation$getSet.get, author$project$Internal$Checkbox$Implementation$getSet.set, author$project$Internal$Msg$CheckboxMsg, author$project$Internal$Checkbox$Implementation$update);
var author$project$Internal$Chip$Model$defaultModel = {ripple: author$project$Internal$Ripple$Model$defaultModel};
var author$project$Internal$Chip$Implementation$getSet = A3(
	author$project$Internal$Component$indexed,
	function ($) {
		return $.chip;
	},
	F2(
		function (x, y) {
			return _Utils_update(
				y,
				{chip: x});
		}),
	author$project$Internal$Chip$Model$defaultModel);
var author$project$Internal$Chip$Model$RippleMsg = function (a) {
	return {$: 'RippleMsg', a: a};
};
var author$project$Internal$Chip$Implementation$update = F3(
	function (lift, msg, model) {
		if (msg.$ === 'RippleMsg') {
			var msg_ = msg.a;
			var _n1 = A2(author$project$Internal$Ripple$Implementation$update, msg_, model.ripple);
			var ripple = _n1.a;
			var cmd = _n1.b;
			return _Utils_Tuple2(
				elm$core$Maybe$Just(
					_Utils_update(
						model,
						{ripple: ripple})),
				A2(
					elm$core$Platform$Cmd$map,
					A2(elm$core$Basics$composeL, lift, author$project$Internal$Chip$Model$RippleMsg),
					cmd));
		} else {
			var msg_ = msg.a;
			return _Utils_Tuple2(
				elm$core$Maybe$Nothing,
				A2(author$project$Internal$Helpers$delayedCmd, 150, msg_));
		}
	});
var author$project$Internal$Msg$ChipMsg = F2(
	function (a, b) {
		return {$: 'ChipMsg', a: a, b: b};
	});
var author$project$Internal$Chip$Implementation$react = A4(author$project$Internal$Component$react, author$project$Internal$Chip$Implementation$getSet.get, author$project$Internal$Chip$Implementation$getSet.set, author$project$Internal$Msg$ChipMsg, author$project$Internal$Chip$Implementation$update);
var author$project$Internal$Dialog$Model$defaultModel = {animating: false, open: false};
var author$project$Internal$Dialog$Implementation$getSet = A3(
	author$project$Internal$Component$indexed,
	function ($) {
		return $.dialog;
	},
	F2(
		function (x, c) {
			return _Utils_update(
				c,
				{dialog: x});
		}),
	author$project$Internal$Dialog$Model$defaultModel);
var elm$core$Basics$neq = _Utils_notEqual;
var author$project$Internal$Dialog$Implementation$update = F3(
	function (_n0, msg, model) {
		switch (msg.$) {
			case 'NoOp':
				return _Utils_Tuple2(elm$core$Maybe$Nothing, elm$core$Platform$Cmd$none);
			case 'StartAnimation':
				var isOpen = msg.a;
				return (!_Utils_eq(isOpen, model.open)) ? _Utils_Tuple2(
					elm$core$Maybe$Just(
						_Utils_update(
							model,
							{animating: true, open: isOpen})),
					elm$core$Platform$Cmd$none) : _Utils_Tuple2(elm$core$Maybe$Nothing, elm$core$Platform$Cmd$none);
			default:
				return _Utils_Tuple2(
					elm$core$Maybe$Just(
						_Utils_update(
							model,
							{animating: false})),
					elm$core$Platform$Cmd$none);
		}
	});
var author$project$Internal$Msg$DialogMsg = F2(
	function (a, b) {
		return {$: 'DialogMsg', a: a, b: b};
	});
var author$project$Internal$Dialog$Implementation$react = A4(author$project$Internal$Component$react, author$project$Internal$Dialog$Implementation$getSet.get, author$project$Internal$Dialog$Implementation$getSet.set, author$project$Internal$Msg$DialogMsg, author$project$Internal$Dialog$Implementation$update);
var author$project$Internal$Dispatch$forward = function (msgs) {
	return elm$core$Platform$Cmd$batch(
		A2(
			elm$core$List$map,
			A2(
				elm$core$Basics$composeL,
				elm$core$Task$perform(elm$core$Basics$identity),
				elm$core$Task$succeed),
			msgs));
};
var author$project$Internal$Drawer$Model$defaultModel = {animating: false, closeOnAnimationEnd: false, open: false};
var author$project$Internal$Drawer$Implementation$getSet = A3(
	author$project$Internal$Component$indexed,
	function ($) {
		return $.drawer;
	},
	F2(
		function (x, y) {
			return _Utils_update(
				y,
				{drawer: x});
		}),
	author$project$Internal$Drawer$Model$defaultModel);
var author$project$Internal$Drawer$Implementation$update = F3(
	function (lift, msg, model) {
		switch (msg.$) {
			case 'NoOp':
				return _Utils_Tuple2(elm$core$Maybe$Nothing, elm$core$Platform$Cmd$none);
			case 'StartAnimation':
				var isOpen = msg.a;
				return _Utils_Tuple2(
					elm$core$Maybe$Just(
						_Utils_update(
							model,
							{animating: true, closeOnAnimationEnd: !isOpen, open: true})),
					elm$core$Platform$Cmd$none);
			default:
				return _Utils_Tuple2(
					elm$core$Maybe$Just(
						_Utils_update(
							model,
							{
								animating: false,
								closeOnAnimationEnd: false,
								open: model.closeOnAnimationEnd ? false : model.open
							})),
					elm$core$Platform$Cmd$none);
		}
	});
var author$project$Internal$Msg$DrawerMsg = F2(
	function (a, b) {
		return {$: 'DrawerMsg', a: a, b: b};
	});
var author$project$Internal$Drawer$Implementation$react = A4(author$project$Internal$Component$react, author$project$Internal$Drawer$Implementation$getSet.get, author$project$Internal$Drawer$Implementation$getSet.set, author$project$Internal$Msg$DrawerMsg, author$project$Internal$Drawer$Implementation$update);
var elm$core$Tuple$mapSecond = F2(
	function (func, _n0) {
		var x = _n0.a;
		var y = _n0.b;
		return _Utils_Tuple2(
			x,
			func(y));
	});
var author$project$Internal$Component$generalise = F4(
	function (update, lift, msg, model) {
		return A2(
			elm$core$Tuple$mapSecond,
			elm$core$Platform$Cmd$map(lift),
			A2(
				elm$core$Tuple$mapFirst,
				elm$core$Maybe$Just,
				A2(update, msg, model)));
	});
var author$project$Internal$Fab$Model$defaultModel = {ripple: author$project$Internal$Ripple$Model$defaultModel};
var author$project$Internal$Fab$Implementation$getSet = A3(
	author$project$Internal$Component$indexed,
	function ($) {
		return $.fab;
	},
	F2(
		function (x, y) {
			return _Utils_update(
				y,
				{fab: x});
		}),
	author$project$Internal$Fab$Model$defaultModel);
var author$project$Internal$Fab$Model$RippleMsg = function (a) {
	return {$: 'RippleMsg', a: a};
};
var author$project$Internal$Fab$Implementation$update = F2(
	function (msg, model) {
		if (msg.$ === 'RippleMsg') {
			var msg_ = msg.a;
			var _n1 = A2(author$project$Internal$Ripple$Implementation$update, msg_, model.ripple);
			var rippleState = _n1.a;
			var rippleCmd = _n1.b;
			return _Utils_Tuple2(
				_Utils_update(
					model,
					{ripple: rippleState}),
				A2(elm$core$Platform$Cmd$map, author$project$Internal$Fab$Model$RippleMsg, rippleCmd));
		} else {
			return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
		}
	});
var author$project$Internal$Msg$FabMsg = F2(
	function (a, b) {
		return {$: 'FabMsg', a: a, b: b};
	});
var author$project$Internal$Fab$Implementation$react = A4(
	author$project$Internal$Component$react,
	author$project$Internal$Fab$Implementation$getSet.get,
	author$project$Internal$Fab$Implementation$getSet.set,
	author$project$Internal$Msg$FabMsg,
	author$project$Internal$Component$generalise(author$project$Internal$Fab$Implementation$update));
var author$project$Internal$IconButton$Model$defaultModel = {on: false, ripple: author$project$Internal$Ripple$Model$defaultModel};
var author$project$Internal$IconButton$Implementation$getSet = A3(
	author$project$Internal$Component$indexed,
	function ($) {
		return $.iconButton;
	},
	F2(
		function (x, y) {
			return _Utils_update(
				y,
				{iconButton: x});
		}),
	author$project$Internal$IconButton$Model$defaultModel);
var author$project$Internal$IconButton$Model$RippleMsg = function (a) {
	return {$: 'RippleMsg', a: a};
};
var author$project$Internal$IconButton$Implementation$update = F2(
	function (msg, model) {
		var msg_ = msg.a;
		var _n1 = A2(author$project$Internal$Ripple$Implementation$update, msg_, model.ripple);
		var ripple = _n1.a;
		var effects = _n1.b;
		return _Utils_Tuple2(
			_Utils_update(
				model,
				{ripple: ripple}),
			A2(elm$core$Platform$Cmd$map, author$project$Internal$IconButton$Model$RippleMsg, effects));
	});
var author$project$Internal$Msg$IconButtonMsg = F2(
	function (a, b) {
		return {$: 'IconButtonMsg', a: a, b: b};
	});
var author$project$Internal$IconButton$Implementation$react = A4(
	author$project$Internal$Component$react,
	author$project$Internal$IconButton$Implementation$getSet.get,
	author$project$Internal$IconButton$Implementation$getSet.set,
	author$project$Internal$Msg$IconButtonMsg,
	author$project$Internal$Component$generalise(author$project$Internal$IconButton$Implementation$update));
var author$project$Internal$List$Model$defaultModel = {focused: elm$core$Maybe$Nothing, ripples: elm$core$Dict$empty};
var author$project$Internal$List$Implementation$getSet = A3(
	author$project$Internal$Component$indexed,
	function ($) {
		return $.list;
	},
	F2(
		function (x, y) {
			return _Utils_update(
				y,
				{list: x});
		}),
	author$project$Internal$List$Model$defaultModel);
var author$project$Internal$List$Implementation$send = function (msg) {
	return A2(
		elm$core$Task$perform,
		elm$core$Basics$identity,
		elm$core$Task$succeed(msg));
};
var author$project$Internal$List$Model$NoOp = {$: 'NoOp'};
var author$project$Internal$List$Model$RippleMsg = F2(
	function (a, b) {
		return {$: 'RippleMsg', a: a, b: b};
	});
var elm$browser$Browser$Dom$focus = _Browser_call('focus');
var author$project$Internal$List$Implementation$update = F3(
	function (lift, msg, model) {
		switch (msg.$) {
			case 'RippleMsg':
				var index = msg.a;
				var msg_ = msg.b;
				var _n1 = A2(
					author$project$Internal$Ripple$Implementation$update,
					msg_,
					A2(
						elm$core$Maybe$withDefault,
						author$project$Internal$Ripple$Model$defaultModel,
						A2(elm$core$Dict$get, index, model.ripples)));
				var ripple = _n1.a;
				var effects = _n1.b;
				return _Utils_Tuple2(
					elm$core$Maybe$Just(
						_Utils_update(
							model,
							{
								ripples: A3(elm$core$Dict$insert, index, ripple, model.ripples)
							})),
					A2(
						elm$core$Platform$Cmd$map,
						A2(
							elm$core$Basics$composeL,
							lift,
							author$project$Internal$List$Model$RippleMsg(index)),
						effects));
			case 'ResetFocusedItem':
				return _Utils_Tuple2(
					elm$core$Maybe$Just(
						_Utils_update(
							model,
							{focused: elm$core$Maybe$Nothing})),
					elm$core$Platform$Cmd$none);
			case 'FocusItem':
				var id = msg.b;
				return _Utils_Tuple2(
					elm$core$Maybe$Just(
						_Utils_update(
							model,
							{focused: elm$core$Maybe$Nothing})),
					A2(
						elm$core$Task$attempt,
						function (_n2) {
							return lift(author$project$Internal$List$Model$NoOp);
						},
						elm$browser$Browser$Dom$focus(id)));
			case 'SelectItem':
				var index = msg.a;
				var m = msg.b;
				return _Utils_Tuple2(
					elm$core$Maybe$Just(
						_Utils_update(
							model,
							{focused: elm$core$Maybe$Nothing})),
					author$project$Internal$List$Implementation$send(
						m(index)));
			default:
				return _Utils_Tuple2(elm$core$Maybe$Nothing, elm$core$Platform$Cmd$none);
		}
	});
var author$project$Internal$Msg$ListMsg = F2(
	function (a, b) {
		return {$: 'ListMsg', a: a, b: b};
	});
var author$project$Internal$List$Implementation$react = A4(author$project$Internal$Component$react, author$project$Internal$List$Implementation$getSet.get, author$project$Internal$List$Implementation$getSet.set, author$project$Internal$Msg$ListMsg, author$project$Internal$List$Implementation$update);
var author$project$Internal$Menu$Model$defaultModel = {animating: false, geometry: elm$core$Maybe$Nothing, index: elm$core$Maybe$Nothing, keyDownWithinMenu: false, list: author$project$Internal$List$Model$defaultModel, open: false, quickOpen: elm$core$Maybe$Nothing};
var author$project$Internal$Menu$Implementation$getSet = A3(
	author$project$Internal$Component$indexed,
	function ($) {
		return $.menu;
	},
	F2(
		function (x, y) {
			return _Utils_update(
				y,
				{menu: x});
		}),
	author$project$Internal$Menu$Model$defaultModel);
var author$project$Internal$Menu$Model$AnimationEnd = {$: 'AnimationEnd'};
var author$project$Internal$Menu$Model$Close = {$: 'Close'};
var author$project$Internal$Menu$Model$ListMsg = function (a) {
	return {$: 'ListMsg', a: a};
};
var author$project$Internal$Menu$Model$NoOp = {$: 'NoOp'};
var author$project$Internal$Menu$Model$Open = {$: 'Open'};
var author$project$Internal$Menu$Implementation$update = F3(
	function (lift, msg, model) {
		update:
		while (true) {
			switch (msg.$) {
				case 'NoOp':
					return _Utils_Tuple2(elm$core$Maybe$Nothing, elm$core$Platform$Cmd$none);
				case 'Toggle':
					var $temp$lift = lift,
						$temp$msg = model.open ? author$project$Internal$Menu$Model$Close : author$project$Internal$Menu$Model$Open,
						$temp$model = model;
					lift = $temp$lift;
					msg = $temp$msg;
					model = $temp$model;
					continue update;
				case 'Open':
					return (!model.open) ? _Utils_Tuple2(
						elm$core$Maybe$Just(
							_Utils_update(
								model,
								{animating: true, geometry: elm$core$Maybe$Nothing, open: true})),
						elm$core$Platform$Cmd$none) : _Utils_Tuple2(elm$core$Maybe$Nothing, elm$core$Platform$Cmd$none);
				case 'Close':
					return model.open ? _Utils_Tuple2(
						elm$core$Maybe$Just(
							_Utils_update(
								model,
								{animating: true, open: false})),
						A2(elm$core$Maybe$withDefault, false, model.quickOpen) ? A2(
							author$project$Internal$Helpers$delayedCmd,
							70,
							lift(author$project$Internal$Menu$Model$AnimationEnd)) : A2(
							author$project$Internal$Helpers$delayedCmd,
							0,
							lift(author$project$Internal$Menu$Model$AnimationEnd))) : _Utils_Tuple2(elm$core$Maybe$Nothing, elm$core$Platform$Cmd$none);
				case 'CloseDelayed':
					return _Utils_Tuple2(
						elm$core$Maybe$Nothing,
						A2(
							author$project$Internal$Helpers$delayedCmd,
							50,
							lift(author$project$Internal$Menu$Model$Close)));
				case 'Init':
					var config = msg.a;
					var geometry = msg.b;
					return _Utils_Tuple2(
						elm$core$Maybe$Just(
							_Utils_update(
								model,
								{
									geometry: elm$core$Maybe$Just(geometry),
									quickOpen: elm$core$Maybe$Just(config.quickOpen)
								})),
						elm$core$Platform$Cmd$batch(
							_List_fromArray(
								[
									A2(
									elm$core$Task$attempt,
									function (_n1) {
										return lift(author$project$Internal$Menu$Model$NoOp);
									},
									elm$browser$Browser$Dom$focus(config.focusedItemId)),
									config.quickOpen ? A2(
									author$project$Internal$Helpers$delayedCmd,
									120,
									lift(author$project$Internal$Menu$Model$AnimationEnd)) : A2(
									author$project$Internal$Helpers$delayedCmd,
									0,
									lift(author$project$Internal$Menu$Model$AnimationEnd))
								])));
				case 'AnimationEnd':
					return _Utils_Tuple2(
						elm$core$Maybe$Just(
							_Utils_update(
								model,
								{animating: false})),
						elm$core$Platform$Cmd$none);
				case 'DocumentClick':
					if (model.open && (!_Utils_eq(model.geometry, elm$core$Maybe$Nothing))) {
						var $temp$lift = lift,
							$temp$msg = author$project$Internal$Menu$Model$Close,
							$temp$model = model;
						lift = $temp$lift;
						msg = $temp$msg;
						model = $temp$model;
						continue update;
					} else {
						return _Utils_Tuple2(elm$core$Maybe$Nothing, elm$core$Platform$Cmd$none);
					}
				case 'KeyDown':
					var shiftKey = msg.a.shiftKey;
					var altKey = msg.a.altKey;
					var ctrlKey = msg.a.ctrlKey;
					var metaKey = msg.a.metaKey;
					var key = msg.b;
					var keyCode = msg.c;
					var isSpace = (key === 'Space') || (keyCode === 32);
					var isEscape = (key === 'Escape') || (keyCode === 27);
					var isEnter = (key === 'Enter') || (keyCode === 13);
					return (isEscape || (isSpace || isEnter)) ? _Utils_Tuple2(
						elm$core$Maybe$Just(
							_Utils_update(
								model,
								{keyDownWithinMenu: true})),
						elm$core$Platform$Cmd$none) : _Utils_Tuple2(elm$core$Maybe$Nothing, elm$core$Platform$Cmd$none);
				case 'KeyUp':
					var shiftKey = msg.a.shiftKey;
					var altKey = msg.a.altKey;
					var ctrlKey = msg.a.ctrlKey;
					var metaKey = msg.a.metaKey;
					var key = msg.b;
					var keyCode = msg.c;
					var isSpace = (key === 'Space') || (keyCode === 32);
					var isEscape = (key === 'Escape') || (keyCode === 27);
					var isEnter = (key === 'Enter') || (keyCode === 13);
					return A2(
						elm$core$Tuple$mapFirst,
						elm$core$Maybe$map(
							function (newModel) {
								return _Utils_update(
									newModel,
									{keyDownWithinMenu: false});
							}),
						((isEscape || (isSpace || isEnter)) && ((!(altKey || (ctrlKey || metaKey))) && model.keyDownWithinMenu)) ? A3(author$project$Internal$Menu$Implementation$update, lift, author$project$Internal$Menu$Model$Close, model) : _Utils_Tuple2(elm$core$Maybe$Nothing, elm$core$Platform$Cmd$none));
				default:
					var msg_ = msg.a;
					return A2(
						elm$core$Tuple$mapFirst,
						function (maybeNewList) {
							if (maybeNewList.$ === 'Just') {
								var newList = maybeNewList.a;
								return elm$core$Maybe$Just(
									_Utils_update(
										model,
										{list: newList}));
							} else {
								return elm$core$Maybe$Nothing;
							}
						},
						A3(
							author$project$Internal$List$Implementation$update,
							A2(elm$core$Basics$composeL, lift, author$project$Internal$Menu$Model$ListMsg),
							msg_,
							model.list));
			}
		}
	});
var author$project$Internal$Menu$Implementation$react = A4(author$project$Internal$Component$react, author$project$Internal$Menu$Implementation$getSet.get, author$project$Internal$Menu$Implementation$getSet.set, author$project$Internal$Msg$MenuMsg, author$project$Internal$Menu$Implementation$update);
var author$project$Internal$Msg$RadioButtonMsg = F2(
	function (a, b) {
		return {$: 'RadioButtonMsg', a: a, b: b};
	});
var author$project$Internal$RadioButton$Model$defaultModel = {isFocused: false, ripple: author$project$Internal$Ripple$Model$defaultModel};
var author$project$Internal$RadioButton$Implementation$getSet = A3(
	author$project$Internal$Component$indexed,
	function ($) {
		return $.radio;
	},
	F2(
		function (x, y) {
			return _Utils_update(
				y,
				{radio: x});
		}),
	author$project$Internal$RadioButton$Model$defaultModel);
var author$project$Internal$RadioButton$Model$RippleMsg = function (a) {
	return {$: 'RippleMsg', a: a};
};
var author$project$Internal$RadioButton$Implementation$update = F3(
	function (lift, msg, model) {
		switch (msg.$) {
			case 'RippleMsg':
				var msg_ = msg.a;
				var _n1 = A2(author$project$Internal$Ripple$Implementation$update, msg_, model.ripple);
				var ripple = _n1.a;
				var effects = _n1.b;
				return _Utils_Tuple2(
					elm$core$Maybe$Just(
						_Utils_update(
							model,
							{ripple: ripple})),
					A2(
						elm$core$Platform$Cmd$map,
						A2(elm$core$Basics$composeL, lift, author$project$Internal$RadioButton$Model$RippleMsg),
						effects));
			case 'NoOp':
				return _Utils_Tuple2(elm$core$Maybe$Nothing, elm$core$Platform$Cmd$none);
			default:
				var focus = msg.a;
				return _Utils_Tuple2(
					elm$core$Maybe$Just(
						_Utils_update(
							model,
							{isFocused: focus})),
					elm$core$Platform$Cmd$none);
		}
	});
var author$project$Internal$RadioButton$Implementation$react = A4(author$project$Internal$Component$react, author$project$Internal$RadioButton$Implementation$getSet.get, author$project$Internal$RadioButton$Implementation$getSet.set, author$project$Internal$Msg$RadioButtonMsg, author$project$Internal$RadioButton$Implementation$update);
var author$project$Internal$Msg$RippleMsg = F2(
	function (a, b) {
		return {$: 'RippleMsg', a: a, b: b};
	});
var author$project$Internal$Ripple$Implementation$getSet = A3(
	author$project$Internal$Component$indexed,
	function ($) {
		return $.ripple;
	},
	F2(
		function (x, y) {
			return _Utils_update(
				y,
				{ripple: x});
		}),
	author$project$Internal$Ripple$Model$defaultModel);
var author$project$Internal$Ripple$Implementation$react = A4(
	author$project$Internal$Component$react,
	author$project$Internal$Ripple$Implementation$getSet.get,
	author$project$Internal$Ripple$Implementation$getSet.set,
	author$project$Internal$Msg$RippleMsg,
	author$project$Internal$Component$generalise(author$project$Internal$Ripple$Implementation$update));
var author$project$Internal$Msg$SelectMsg = F2(
	function (a, b) {
		return {$: 'SelectMsg', a: a, b: b};
	});
var author$project$Internal$Select$Model$defaultModel = {focused: false, isDirty: false, ripple: author$project$Internal$Ripple$Model$defaultModel};
var author$project$Internal$Select$Implementation$getSet = A3(
	author$project$Internal$Component$indexed,
	function ($) {
		return $.select;
	},
	F2(
		function (x, y) {
			return _Utils_update(
				y,
				{select: x});
		}),
	author$project$Internal$Select$Model$defaultModel);
var author$project$Internal$Select$Model$RippleMsg = function (a) {
	return {$: 'RippleMsg', a: a};
};
var author$project$Internal$Select$Implementation$update = F3(
	function (lift, msg, model) {
		switch (msg.$) {
			case 'Change':
				var changedValue = msg.a;
				var dirty = changedValue !== '';
				return _Utils_Tuple2(
					elm$core$Maybe$Just(
						_Utils_update(
							model,
							{isDirty: dirty})),
					elm$core$Platform$Cmd$none);
			case 'Blur':
				return _Utils_Tuple2(
					elm$core$Maybe$Just(
						_Utils_update(
							model,
							{focused: false})),
					elm$core$Platform$Cmd$none);
			case 'Focus':
				return _Utils_Tuple2(
					elm$core$Maybe$Just(
						_Utils_update(
							model,
							{focused: true})),
					elm$core$Platform$Cmd$none);
			default:
				var msg_ = msg.a;
				var _n1 = A2(author$project$Internal$Ripple$Implementation$update, msg_, model.ripple);
				var ripple = _n1.a;
				var effects = _n1.b;
				return _Utils_Tuple2(
					elm$core$Maybe$Just(
						_Utils_update(
							model,
							{ripple: ripple})),
					A2(
						elm$core$Platform$Cmd$map,
						A2(elm$core$Basics$composeL, lift, author$project$Internal$Select$Model$RippleMsg),
						effects));
		}
	});
var author$project$Internal$Select$Implementation$react = A4(author$project$Internal$Component$react, author$project$Internal$Select$Implementation$getSet.get, author$project$Internal$Select$Implementation$getSet.set, author$project$Internal$Msg$SelectMsg, author$project$Internal$Select$Implementation$update);
var author$project$Internal$Msg$SliderMsg = F2(
	function (a, b) {
		return {$: 'SliderMsg', a: a, b: b};
	});
var author$project$Internal$Slider$Model$defaultModel = {active: false, activeValue: elm$core$Maybe$Nothing, focus: false, geometry: elm$core$Maybe$Nothing, inTransit: false, preventFocus: false};
var author$project$Internal$Slider$Implementation$getSet = A3(
	author$project$Internal$Component$indexed,
	function ($) {
		return $.slider;
	},
	F2(
		function (x, y) {
			return _Utils_update(
				y,
				{slider: x});
		}),
	author$project$Internal$Slider$Model$defaultModel);
var author$project$Internal$Slider$Implementation$valueFromPageX = F2(
	function (geometry, pageX) {
		var xPos = pageX - geometry.rect.left;
		var isRtl = false;
		var pctComplete = isRtl ? (1 - (xPos / geometry.rect.width)) : (xPos / geometry.rect.width);
		return geometry.min + (pctComplete * (geometry.max - geometry.min));
	});
var author$project$Internal$Slider$Model$ActualUp = {$: 'ActualUp'};
var author$project$Internal$Slider$Model$Init = function (a) {
	return {$: 'Init', a: a};
};
var author$project$Internal$Slider$Model$defaultGeometry = {
	discrete: false,
	max: 100,
	min: 0,
	rect: {left: 0, width: 0},
	step: elm$core$Maybe$Nothing
};
var author$project$Internal$Slider$Implementation$update = F3(
	function (lift, msg, model) {
		update:
		while (true) {
			switch (msg.$) {
				case 'NoOp':
					return _Utils_Tuple2(elm$core$Maybe$Nothing, elm$core$Platform$Cmd$none);
				case 'Focus':
					return (!model.preventFocus) ? _Utils_Tuple2(
						elm$core$Maybe$Just(
							_Utils_update(
								model,
								{focus: true})),
						elm$core$Platform$Cmd$none) : _Utils_Tuple2(elm$core$Maybe$Nothing, elm$core$Platform$Cmd$none);
				case 'Blur':
					return _Utils_Tuple2(
						elm$core$Maybe$Just(
							_Utils_update(
								model,
								{focus: false, preventFocus: false})),
						elm$core$Platform$Cmd$none);
				case 'TransitionEnd':
					return _Utils_Tuple2(
						elm$core$Maybe$Just(
							_Utils_update(
								model,
								{inTransit: false})),
						elm$core$Platform$Cmd$none);
				case 'InteractionStart':
					var pageX = msg.b.pageX;
					var geometry = A2(elm$core$Maybe$withDefault, author$project$Internal$Slider$Model$defaultGeometry, model.geometry);
					var activeValue = A2(author$project$Internal$Slider$Implementation$valueFromPageX, geometry, pageX);
					return _Utils_Tuple2(
						elm$core$Maybe$Just(
							_Utils_update(
								model,
								{
									active: true,
									activeValue: elm$core$Maybe$Just(activeValue),
									inTransit: true,
									preventFocus: true
								})),
						elm$core$Platform$Cmd$none);
				case 'ThumbContainerPointer':
					var pageX = msg.b.pageX;
					var geometry = A2(elm$core$Maybe$withDefault, author$project$Internal$Slider$Model$defaultGeometry, model.geometry);
					var activeValue = A2(author$project$Internal$Slider$Implementation$valueFromPageX, geometry, pageX);
					return _Utils_Tuple2(
						elm$core$Maybe$Just(
							_Utils_update(
								model,
								{
									active: true,
									activeValue: elm$core$Maybe$Just(activeValue),
									inTransit: false,
									preventFocus: true
								})),
						elm$core$Platform$Cmd$none);
				case 'Drag':
					var pageX = msg.a.pageX;
					if (model.active) {
						var geometry = A2(elm$core$Maybe$withDefault, author$project$Internal$Slider$Model$defaultGeometry, model.geometry);
						var activeValue = A2(author$project$Internal$Slider$Implementation$valueFromPageX, geometry, pageX);
						return _Utils_Tuple2(
							elm$core$Maybe$Just(
								_Utils_update(
									model,
									{
										activeValue: elm$core$Maybe$Just(activeValue),
										inTransit: false
									})),
							elm$core$Platform$Cmd$none);
					} else {
						return _Utils_Tuple2(elm$core$Maybe$Nothing, elm$core$Platform$Cmd$none);
					}
				case 'Init':
					var geometry = msg.a;
					return _Utils_Tuple2(
						elm$core$Maybe$Just(
							_Utils_update(
								model,
								{
									geometry: elm$core$Maybe$Just(geometry)
								})),
						elm$core$Platform$Cmd$none);
				case 'Resize':
					var geometry = msg.a;
					var $temp$lift = lift,
						$temp$msg = author$project$Internal$Slider$Model$Init(geometry),
						$temp$model = model;
					lift = $temp$lift;
					msg = $temp$msg;
					model = $temp$model;
					continue update;
				case 'KeyDown':
					return _Utils_Tuple2(
						elm$core$Maybe$Just(
							_Utils_update(
								model,
								{focus: true})),
						elm$core$Platform$Cmd$none);
				case 'Up':
					return _Utils_Tuple2(
						elm$core$Maybe$Just(model),
						A2(
							elm$core$Task$perform,
							lift,
							elm$core$Task$succeed(author$project$Internal$Slider$Model$ActualUp)));
				default:
					return _Utils_Tuple2(
						elm$core$Maybe$Just(
							_Utils_update(
								model,
								{active: false, activeValue: elm$core$Maybe$Nothing})),
						elm$core$Platform$Cmd$none);
			}
		}
	});
var author$project$Internal$Slider$Implementation$react = A4(author$project$Internal$Component$react, author$project$Internal$Slider$Implementation$getSet.get, author$project$Internal$Slider$Implementation$getSet.set, author$project$Internal$Msg$SliderMsg, author$project$Internal$Slider$Implementation$update);
var author$project$Internal$Msg$SnackbarMsg = F2(
	function (a, b) {
		return {$: 'SnackbarMsg', a: a, b: b};
	});
var author$project$Internal$Snackbar$Model$Inert = {$: 'Inert'};
var author$project$Internal$Snackbar$Model$defaultModel = {open: false, queue: _List_Nil, seq: -1, state: author$project$Internal$Snackbar$Model$Inert};
var author$project$Internal$Snackbar$Implementation$getSet = A3(
	author$project$Internal$Component$indexed,
	function ($) {
		return $.snackbar;
	},
	F2(
		function (x, y) {
			return _Utils_update(
				y,
				{snackbar: x});
		}),
	author$project$Internal$Snackbar$Model$defaultModel);
var author$project$Internal$Helpers$cmd = function (msg) {
	return A2(
		elm$core$Task$perform,
		elm$core$Basics$identity,
		elm$core$Task$succeed(msg));
};
var author$project$Internal$Snackbar$Model$Move = F2(
	function (a, b) {
		return {$: 'Move', a: a, b: b};
	});
var author$project$Internal$Snackbar$Implementation$next = function (model) {
	return elm$core$Platform$Cmd$map(
		author$project$Internal$Snackbar$Model$Move(model.seq));
};
var author$project$Internal$Snackbar$Model$Active = function (a) {
	return {$: 'Active', a: a};
};
var author$project$Internal$Snackbar$Model$Timeout = {$: 'Timeout'};
var author$project$Internal$Snackbar$Implementation$tryDequeue = function (model) {
	var _n0 = _Utils_Tuple2(model.state, model.queue);
	if ((_n0.a.$ === 'Inert') && _n0.b.b) {
		var _n1 = _n0.a;
		var _n2 = _n0.b;
		var c = _n2.a;
		var cs = _n2.b;
		return _Utils_Tuple2(
			_Utils_update(
				model,
				{
					open: false,
					queue: cs,
					seq: model.seq + 1,
					state: author$project$Internal$Snackbar$Model$Active(c)
				}),
			A2(
				elm$core$Platform$Cmd$map,
				author$project$Internal$Snackbar$Model$Move(model.seq + 1),
				A2(author$project$Internal$Helpers$delayedCmd, c.timeout, author$project$Internal$Snackbar$Model$Timeout)));
	} else {
		return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
	}
};
var author$project$Internal$Snackbar$Model$Fading = function (a) {
	return {$: 'Fading', a: a};
};
var author$project$Internal$Snackbar$Implementation$move = F2(
	function (transition, model) {
		var _n0 = _Utils_Tuple2(model.state, transition);
		if (_n0.b.$ === 'Clicked') {
			if (_n0.a.$ === 'Active') {
				var contents = _n0.a.a;
				var _n3 = _n0.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							state: author$project$Internal$Snackbar$Model$Fading(contents)
						}),
					A2(
						author$project$Internal$Snackbar$Implementation$next,
						model,
						A2(author$project$Internal$Helpers$delayedCmd, contents.fade, author$project$Internal$Snackbar$Model$Timeout)));
			} else {
				return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
			}
		} else {
			switch (_n0.a.$) {
				case 'Inert':
					var _n1 = _n0.a;
					var _n2 = _n0.b;
					return author$project$Internal$Snackbar$Implementation$tryDequeue(model);
				case 'Active':
					var contents = _n0.a.a;
					var _n4 = _n0.b;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								state: author$project$Internal$Snackbar$Model$Fading(contents)
							}),
						A2(
							author$project$Internal$Snackbar$Implementation$next,
							model,
							A2(author$project$Internal$Helpers$delayedCmd, contents.fade, author$project$Internal$Snackbar$Model$Timeout)));
				default:
					var contents = _n0.a.a;
					var _n5 = _n0.b;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{state: author$project$Internal$Snackbar$Model$Inert}),
						A2(
							author$project$Internal$Snackbar$Implementation$next,
							model,
							author$project$Internal$Helpers$cmd(author$project$Internal$Snackbar$Model$Timeout)));
			}
		}
	});
var author$project$Internal$Snackbar$Model$Clicked = {$: 'Clicked'};
var author$project$Internal$Snackbar$Implementation$update = F3(
	function (fwd, msg, model) {
		switch (msg.$) {
			case 'Move':
				var seq = msg.a;
				var transition = msg.b;
				return _Utils_eq(seq, model.seq) ? A2(
					elm$core$Tuple$mapSecond,
					elm$core$Platform$Cmd$map(fwd),
					A2(author$project$Internal$Snackbar$Implementation$move, transition, model)) : _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
			case 'Dismiss':
				var dismissOnAction = msg.a;
				var actionOnDismiss = msg.b;
				var fwdEffect = function () {
					if (actionOnDismiss.$ === 'Just') {
						var msg_ = actionOnDismiss.a;
						return author$project$Internal$Helpers$cmd(msg_);
					} else {
						return elm$core$Platform$Cmd$none;
					}
				}();
				return A2(
					elm$core$Tuple$mapSecond,
					function (cmd) {
						return elm$core$Platform$Cmd$batch(
							_List_fromArray(
								[cmd, fwdEffect]));
					},
					dismissOnAction ? A3(
						author$project$Internal$Snackbar$Implementation$update,
						fwd,
						A2(author$project$Internal$Snackbar$Model$Move, model.seq, author$project$Internal$Snackbar$Model$Clicked),
						model) : _Utils_Tuple2(model, elm$core$Platform$Cmd$none));
			default:
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{open: true}),
					elm$core$Platform$Cmd$none);
		}
	});
var author$project$Internal$Snackbar$Implementation$react = A4(
	author$project$Internal$Component$react,
	author$project$Internal$Snackbar$Implementation$getSet.get,
	author$project$Internal$Snackbar$Implementation$getSet.set,
	author$project$Internal$Msg$SnackbarMsg,
	F3(
		function (fwd, msg, model) {
			return A2(
				elm$core$Tuple$mapFirst,
				elm$core$Maybe$Just,
				A3(author$project$Internal$Snackbar$Implementation$update, fwd, msg, model));
		}));
var author$project$Internal$Msg$SwitchMsg = F2(
	function (a, b) {
		return {$: 'SwitchMsg', a: a, b: b};
	});
var author$project$Internal$Switch$Model$defaultModel = {isFocused: false, ripple: author$project$Internal$Ripple$Model$defaultModel};
var author$project$Internal$Switch$Implementation$getSet = A3(
	author$project$Internal$Component$indexed,
	function ($) {
		return $._switch;
	},
	F2(
		function (x, y) {
			return _Utils_update(
				y,
				{_switch: x});
		}),
	author$project$Internal$Switch$Model$defaultModel);
var author$project$Internal$Switch$Model$RippleMsg = function (a) {
	return {$: 'RippleMsg', a: a};
};
var author$project$Internal$Switch$Implementation$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 'RippleMsg':
				var msg_ = msg.a;
				var _n1 = A2(author$project$Internal$Ripple$Implementation$update, msg_, model.ripple);
				var rippleState = _n1.a;
				var rippleCmd = _n1.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{ripple: rippleState}),
					A2(elm$core$Platform$Cmd$map, author$project$Internal$Switch$Model$RippleMsg, rippleCmd));
			case 'SetFocus':
				var focus = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{isFocused: focus}),
					elm$core$Platform$Cmd$none);
			default:
				return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
		}
	});
var author$project$Internal$Switch$Implementation$react = A4(
	author$project$Internal$Component$react,
	author$project$Internal$Switch$Implementation$getSet.get,
	author$project$Internal$Switch$Implementation$getSet.set,
	author$project$Internal$Msg$SwitchMsg,
	author$project$Internal$Component$generalise(author$project$Internal$Switch$Implementation$update));
var author$project$Internal$Msg$TabBarMsg = F2(
	function (a, b) {
		return {$: 'TabBarMsg', a: a, b: b};
	});
var author$project$Internal$TabBar$Model$defaultModel = {activeTab: 0, geometry: elm$core$Maybe$Nothing, ripples: elm$core$Dict$empty, translateOffset: 0};
var author$project$Internal$TabBar$Implementation$getSet = A3(
	author$project$Internal$Component$indexed,
	function ($) {
		return $.tabbar;
	},
	F2(
		function (x, y) {
			return _Utils_update(
				y,
				{tabbar: x});
		}),
	author$project$Internal$TabBar$Model$defaultModel);
var elm$core$Basics$min = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) < 0) ? x : y;
	});
var author$project$Internal$TabBar$Implementation$calculateScrollIncrement = F5(
	function (geometry, index, nextIndex, scrollPosition, barWidth) {
		var maybe_next_tab = elm$core$List$head(
			A2(elm$core$List$drop, nextIndex, geometry.tabs));
		var extraScrollAmount = 20;
		if (maybe_next_tab.$ === 'Just') {
			var next_tab = maybe_next_tab.a;
			var relativeContentRight = next_tab.contentRight - scrollPosition;
			var relativeContentLeft = (next_tab.contentLeft - scrollPosition) - barWidth;
			var rightIncrement = relativeContentLeft + extraScrollAmount;
			var leftIncrement = relativeContentRight - extraScrollAmount;
			return (_Utils_cmp(nextIndex, index) < 0) ? A2(elm$core$Basics$min, leftIncrement, 0) : A2(elm$core$Basics$max, rightIncrement, 0);
		} else {
			return 0;
		}
	});
var author$project$Internal$TabBar$Implementation$findAdjacentTabIndexClosestToEdge = F4(
	function (index, tab_, scrollPosition, barWidth) {
		var rootRight = tab_.offsetLeft + tab_.offsetWidth;
		var rootLeft = tab_.offsetLeft;
		var relativeRootRight = (rootRight - scrollPosition) - barWidth;
		var relativeRootLeft = rootLeft - scrollPosition;
		var relativeRootDelta = relativeRootLeft + relativeRootRight;
		var rightEdgeIsCloser = (relativeRootRight > 0) || (relativeRootDelta > 0);
		var leftEdgeIsCloser = (relativeRootLeft < 0) || (relativeRootDelta < 0);
		return leftEdgeIsCloser ? (index - 1) : (rightEdgeIsCloser ? (index + 1) : (-1));
	});
var author$project$Internal$TabBar$Model$NoOp = {$: 'NoOp'};
var author$project$Internal$TabBar$Model$RippleMsg = F2(
	function (a, b) {
		return {$: 'RippleMsg', a: a, b: b};
	});
var author$project$Internal$TabBar$Model$defaultGeometry = {
	scrollArea: {offsetWidth: 0},
	tabBar: {offsetWidth: 0},
	tabs: _List_Nil
};
var elm$browser$Browser$Dom$setViewportOf = _Browser_setViewportOf;
var author$project$Internal$TabBar$Implementation$update = F3(
	function (lift, msg, model) {
		switch (msg.$) {
			case 'RippleMsg':
				var index = msg.a;
				var msg_ = msg.b;
				var _n1 = A2(
					author$project$Internal$Ripple$Implementation$update,
					msg_,
					A2(
						elm$core$Maybe$withDefault,
						author$project$Internal$Ripple$Model$defaultModel,
						A2(elm$core$Dict$get, index, model.ripples)));
				var ripple = _n1.a;
				var effects = _n1.b;
				return _Utils_Tuple2(
					elm$core$Maybe$Just(
						_Utils_update(
							model,
							{
								ripples: A3(elm$core$Dict$insert, index, ripple, model.ripples)
							})),
					A2(
						elm$core$Platform$Cmd$map,
						A2(
							elm$core$Basics$composeL,
							lift,
							author$project$Internal$TabBar$Model$RippleMsg(index)),
						effects));
			case 'Dispatch':
				var msgs = msg.a;
				return _Utils_Tuple2(
					elm$core$Maybe$Nothing,
					author$project$Internal$Dispatch$forward(msgs));
			case 'NoOp':
				return _Utils_Tuple2(elm$core$Maybe$Nothing, elm$core$Platform$Cmd$none);
			case 'Init':
				var geometry = msg.a;
				return _Utils_Tuple2(
					function () {
						var tabBarWidth = geometry.tabBar.offsetWidth;
						var scrollAreaWidth = geometry.scrollArea.offsetWidth;
						var isOverflowing = _Utils_cmp(tabBarWidth, scrollAreaWidth) > 0;
						var translateOffset = (!isOverflowing) ? 0 : model.translateOffset;
						return elm$core$Maybe$Just(
							_Utils_update(
								model,
								{
									geometry: elm$core$Maybe$Just(geometry),
									translateOffset: translateOffset
								}));
					}(),
					elm$core$Platform$Cmd$none);
			default:
				var domId = msg.a;
				var tab_index = msg.b;
				var scrollPosition = msg.c;
				var geometry = A2(elm$core$Maybe$withDefault, author$project$Internal$TabBar$Model$defaultGeometry, model.geometry);
				var tabAtIndex = function (i) {
					return A2(
						elm$core$Maybe$withDefault,
						{contentLeft: 0, contentRight: 0, offsetLeft: 0, offsetWidth: 0},
						elm$core$List$head(
							A2(elm$core$List$drop, i, geometry.tabs)));
				};
				var tab_ = tabAtIndex(tab_index);
				var barWidth = geometry.tabBar.offsetWidth;
				var next_tab_index = A4(author$project$Internal$TabBar$Implementation$findAdjacentTabIndexClosestToEdge, tab_index, tab_, scrollPosition, barWidth);
				var scrollIncrement = A5(author$project$Internal$TabBar$Implementation$calculateScrollIncrement, geometry, tab_index, next_tab_index, scrollPosition, barWidth);
				var newScrollPosition = (!tab_index) ? 0 : (_Utils_eq(
					tab_index,
					elm$core$List$length(geometry.tabs) - 1) ? geometry.scrollArea.offsetWidth : (scrollPosition + scrollIncrement));
				return _Utils_Tuple2(
					elm$core$Maybe$Just(
						_Utils_update(
							model,
							{activeTab: tab_index})),
					A2(
						elm$core$Task$perform,
						lift,
						A2(
							elm$core$Task$onError,
							function (_n3) {
								return elm$core$Task$succeed(author$project$Internal$TabBar$Model$NoOp);
							},
							A2(
								elm$core$Task$map,
								function (_n2) {
									return author$project$Internal$TabBar$Model$NoOp;
								},
								A3(elm$browser$Browser$Dom$setViewportOf, domId + '__scroll-area', newScrollPosition, 0)))));
		}
	});
var author$project$Internal$TabBar$Implementation$react = A4(author$project$Internal$Component$react, author$project$Internal$TabBar$Implementation$getSet.get, author$project$Internal$TabBar$Implementation$getSet.set, author$project$Internal$Msg$TabBarMsg, author$project$Internal$TabBar$Implementation$update);
var author$project$Internal$Msg$TextFieldMsg = F2(
	function (a, b) {
		return {$: 'TextFieldMsg', a: a, b: b};
	});
var author$project$Internal$TextField$Model$defaultModel = {focused: false, geometry: elm$core$Maybe$Nothing, isDirty: false, value: elm$core$Maybe$Nothing};
var author$project$Internal$TextField$Implementation$getSet = A3(
	author$project$Internal$Component$indexed,
	function ($) {
		return $.textfield;
	},
	F2(
		function (x, c) {
			return _Utils_update(
				c,
				{textfield: x});
		}),
	author$project$Internal$TextField$Model$defaultModel);
var author$project$Internal$TextField$Implementation$update = F3(
	function (lift, msg, model) {
		switch (msg.$) {
			case 'Input':
				var str = msg.a;
				var dirty = str !== '';
				return _Utils_Tuple2(
					elm$core$Maybe$Just(
						_Utils_update(
							model,
							{
								isDirty: dirty,
								value: elm$core$Maybe$Just(str)
							})),
					elm$core$Platform$Cmd$none);
			case 'Blur':
				var geometry = function () {
					var _n1 = model.value;
					if (_n1.$ === 'Nothing') {
						return elm$core$Maybe$Nothing;
					} else {
						return model.geometry;
					}
				}();
				return _Utils_Tuple2(
					elm$core$Maybe$Just(
						_Utils_update(
							model,
							{focused: false, geometry: geometry})),
					elm$core$Platform$Cmd$none);
			case 'Focus':
				var geometry = msg.a;
				return _Utils_Tuple2(
					elm$core$Maybe$Just(
						_Utils_update(
							model,
							{
								focused: true,
								geometry: elm$core$Maybe$Just(geometry)
							})),
					elm$core$Platform$Cmd$none);
			default:
				return _Utils_Tuple2(
					elm$core$Maybe$Just(model),
					elm$core$Platform$Cmd$none);
		}
	});
var author$project$Internal$TextField$Implementation$react = A4(author$project$Internal$Component$react, author$project$Internal$TextField$Implementation$getSet.get, author$project$Internal$TextField$Implementation$getSet.set, author$project$Internal$Msg$TextFieldMsg, author$project$Internal$TextField$Implementation$update);
var author$project$Internal$Msg$ToolbarMsg = F2(
	function (a, b) {
		return {$: 'ToolbarMsg', a: a, b: b};
	});
var author$project$Internal$Toolbar$Model$defaultModel = {calculations: elm$core$Maybe$Nothing, config: elm$core$Maybe$Nothing, geometry: elm$core$Maybe$Nothing, scrollTop: 0};
var author$project$Internal$Toolbar$Implementation$getSet = A3(
	author$project$Internal$Component$indexed,
	function ($) {
		return $.toolbar;
	},
	F2(
		function (x, y) {
			return _Utils_update(
				y,
				{toolbar: x});
		}),
	author$project$Internal$Toolbar$Model$defaultModel);
var author$project$Internal$Toolbar$Model$defaultCalculations = {flexibleExpansionHeight: 0, flexibleExpansionRatio: 0, maxTranslateYDistance: 0, maxTranslateYRatio: 0, scrollThreshold: 0, scrollThresholdRatio: 0, toolbarHeight: 0, toolbarRatio: 0, toolbarRowHeight: 0};
var author$project$Internal$Toolbar$Implementation$initKeyRatio = F2(
	function (config, geometry) {
		var toolbarRowHeight = geometry.getRowHeight;
		var toolbarRatio = (!toolbarRowHeight) ? 0 : (geometry.getOffsetHeight / toolbarRowHeight);
		var firstRowMaxRatio = (!toolbarRowHeight) ? 0 : (geometry.getFirstRowElementOffsetHeight / toolbarRowHeight);
		var flexibleExpansionRatio_ = firstRowMaxRatio - 1;
		var maxTranslateYRatio = config.fixedLastrow ? (toolbarRatio - firstRowMaxRatio) : 0;
		var scrollThresholdRatio = config.fixedLastrow ? (toolbarRatio - 1) : (firstRowMaxRatio - 1);
		return _Utils_update(
			author$project$Internal$Toolbar$Model$defaultCalculations,
			{flexibleExpansionRatio: flexibleExpansionRatio_, maxTranslateYRatio: maxTranslateYRatio, scrollThresholdRatio: scrollThresholdRatio, toolbarRatio: toolbarRatio});
	});
var author$project$Internal$Toolbar$Implementation$setKeyHeights = F2(
	function (geometry, calculations) {
		var toolbarRowHeight = geometry.getRowHeight;
		var toolbarHeight = calculations.toolbarRatio * toolbarRowHeight;
		var scrollThreshold = calculations.scrollThresholdRatio * toolbarRowHeight;
		var maxTranslateYDistance = calculations.maxTranslateYRatio * toolbarRowHeight;
		var flexibleExpansionHeight = calculations.flexibleExpansionRatio * toolbarRowHeight;
		return _Utils_update(
			calculations,
			{flexibleExpansionHeight: flexibleExpansionHeight, maxTranslateYDistance: maxTranslateYDistance, scrollThreshold: scrollThreshold, toolbarHeight: toolbarHeight, toolbarRowHeight: toolbarRowHeight});
	});
var author$project$Internal$Toolbar$Implementation$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 'Init':
				var config = msg.a;
				var geometry = msg.b;
				var calculations = A2(
					author$project$Internal$Toolbar$Implementation$setKeyHeights,
					geometry,
					A2(author$project$Internal$Toolbar$Implementation$initKeyRatio, config, geometry));
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							calculations: elm$core$Maybe$Just(calculations),
							config: elm$core$Maybe$Just(config),
							geometry: elm$core$Maybe$Just(geometry)
						}),
					elm$core$Platform$Cmd$none);
			case 'Resize':
				var config = msg.a;
				var geometry = msg.b;
				var calculations = A2(
					elm$core$Maybe$map,
					author$project$Internal$Toolbar$Implementation$setKeyHeights(geometry),
					model.calculations);
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							calculations: calculations,
							config: elm$core$Maybe$Just(config),
							geometry: elm$core$Maybe$Just(geometry)
						}),
					elm$core$Platform$Cmd$none);
			default:
				var config = msg.a;
				var scrollTop = msg.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							config: elm$core$Maybe$Just(config),
							scrollTop: scrollTop
						}),
					elm$core$Platform$Cmd$none);
		}
	});
var author$project$Internal$Toolbar$Implementation$react = A4(
	author$project$Internal$Component$react,
	author$project$Internal$Toolbar$Implementation$getSet.get,
	author$project$Internal$Toolbar$Implementation$getSet.set,
	author$project$Internal$Msg$ToolbarMsg,
	author$project$Internal$Component$generalise(author$project$Internal$Toolbar$Implementation$update));
var author$project$Internal$Msg$TopAppBarMsg = F2(
	function (a, b) {
		return {$: 'TopAppBarMsg', a: a, b: b};
	});
var author$project$Internal$TopAppBar$Model$defaultModel = {currentAppBarOffsetTop: 0, isDockedShowing: true, lastScrollPosition: elm$core$Maybe$Nothing, ripples: elm$core$Dict$empty, styleTop: elm$core$Maybe$Nothing, topAppBarHeight: elm$core$Maybe$Nothing, wasDocked: true};
var author$project$Internal$TopAppBar$Implementation$getSet = A3(
	author$project$Internal$Component$indexed,
	function ($) {
		return $.topAppBar;
	},
	F2(
		function (x, y) {
			return _Utils_update(
				y,
				{topAppBar: x});
		}),
	author$project$Internal$TopAppBar$Model$defaultModel);
var author$project$Internal$TopAppBar$Implementation$checkForUpdate = function (model) {
	return A2(
		elm$core$Maybe$map,
		function (topAppBarHeight) {
			var offscreenBoundaryTop = -topAppBarHeight;
			var hasAnyPixelsOnscreen = _Utils_cmp(model.currentAppBarOffsetTop, offscreenBoundaryTop) > 0;
			var hasAnyPixelsOffscreen = model.currentAppBarOffsetTop < 0;
			var partiallyShowing = hasAnyPixelsOffscreen && hasAnyPixelsOnscreen;
			return partiallyShowing ? _Utils_Tuple2(
				_Utils_update(
					model,
					{wasDocked: false}),
				true) : ((!model.wasDocked) ? _Utils_Tuple2(
				_Utils_update(
					model,
					{wasDocked: true}),
				true) : ((!_Utils_eq(model.isDockedShowing, hasAnyPixelsOnscreen)) ? _Utils_Tuple2(
				_Utils_update(
					model,
					{isDockedShowing: hasAnyPixelsOnscreen}),
				true) : _Utils_Tuple2(model, false)));
		},
		model.topAppBarHeight);
};
var author$project$Internal$TopAppBar$Implementation$moveTopAppBar = function (model) {
	return A2(
		elm$core$Maybe$andThen,
		function (_n0) {
			var updatedModel = _n0.a;
			var partiallyShowing = _n0.b;
			return partiallyShowing ? A2(
				elm$core$Maybe$map,
				function (topAppBarHeight) {
					var styleTop = function () {
						var maxTopAppBarHeight = 128;
						return (_Utils_cmp(
							elm$core$Basics$abs(updatedModel.currentAppBarOffsetTop),
							topAppBarHeight) > 0) ? (-maxTopAppBarHeight) : updatedModel.currentAppBarOffsetTop;
					}();
					return _Utils_update(
						updatedModel,
						{
							styleTop: elm$core$Maybe$Just(styleTop)
						});
				},
				updatedModel.topAppBarHeight) : elm$core$Maybe$Just(updatedModel);
		},
		author$project$Internal$TopAppBar$Implementation$checkForUpdate(model));
};
var author$project$Internal$TopAppBar$Implementation$topAppBarScrollHandler = F2(
	function (scrollPosition, model) {
		return A2(
			elm$core$Maybe$withDefault,
			model,
			A2(
				elm$core$Maybe$andThen,
				author$project$Internal$TopAppBar$Implementation$moveTopAppBar,
				A2(
					elm$core$Maybe$map,
					function (_n0) {
						var topAppBarHeight = _n0.a;
						var lastScrollPosition = _n0.b;
						var isCurrentlyBeingResized = false;
						var currentScrollPosition = A2(elm$core$Basics$max, scrollPosition, 0);
						var diff = currentScrollPosition - lastScrollPosition;
						var currentAppBarOffsetTop = model.currentAppBarOffsetTop - diff;
						var updatedAppBarOffsetTop = (!isCurrentlyBeingResized) ? ((currentAppBarOffsetTop > 0) ? 0 : ((_Utils_cmp(
							elm$core$Basics$abs(currentAppBarOffsetTop),
							topAppBarHeight) > 0) ? (-topAppBarHeight) : currentAppBarOffsetTop)) : model.currentAppBarOffsetTop;
						var updatedModel = _Utils_update(
							model,
							{
								currentAppBarOffsetTop: updatedAppBarOffsetTop,
								lastScrollPosition: elm$core$Maybe$Just(currentScrollPosition)
							});
						return A2(
							elm$core$Maybe$withDefault,
							updatedModel,
							author$project$Internal$TopAppBar$Implementation$moveTopAppBar(updatedModel));
					},
					A3(
						elm$core$Maybe$map2,
						F2(
							function (topAppBarHeight, lastScrollPosition) {
								return _Utils_Tuple2(topAppBarHeight, lastScrollPosition);
							}),
						model.topAppBarHeight,
						model.lastScrollPosition))));
	});
var author$project$Internal$TopAppBar$Model$RippleMsg = F2(
	function (a, b) {
		return {$: 'RippleMsg', a: a, b: b};
	});
var author$project$Internal$TopAppBar$Implementation$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 'RippleMsg':
				var index = msg.a;
				var msg_ = msg.b;
				var _n1 = A2(
					author$project$Internal$Ripple$Implementation$update,
					msg_,
					A2(
						elm$core$Maybe$withDefault,
						author$project$Internal$Ripple$Model$defaultModel,
						A2(elm$core$Dict$get, index, model.ripples)));
				var ripple = _n1.a;
				var effects = _n1.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							ripples: A3(elm$core$Dict$insert, index, ripple, model.ripples)
						}),
					A2(
						elm$core$Platform$Cmd$map,
						author$project$Internal$TopAppBar$Model$RippleMsg(index),
						effects));
			case 'Init':
				var scrollPosition = msg.a.scrollPosition;
				var topAppBarHeight = msg.a.topAppBarHeight;
				return _Utils_Tuple2(
					A2(
						author$project$Internal$TopAppBar$Implementation$topAppBarScrollHandler,
						scrollPosition,
						_Utils_update(
							model,
							{
								lastScrollPosition: elm$core$Maybe$Just(scrollPosition),
								topAppBarHeight: elm$core$Maybe$Just(topAppBarHeight)
							})),
					elm$core$Platform$Cmd$none);
			case 'Scroll':
				var scrollPosition = msg.a.scrollPosition;
				return _Utils_Tuple2(
					A2(author$project$Internal$TopAppBar$Implementation$topAppBarScrollHandler, scrollPosition, model),
					elm$core$Platform$Cmd$none);
			default:
				var scrollPosition = msg.a.scrollPosition;
				var topAppBarHeight = msg.a.topAppBarHeight;
				var currentHeight = topAppBarHeight;
				var currentAppBarOffsetTop = model.currentAppBarOffsetTop - (topAppBarHeight - currentHeight);
				var updatedModel = (!_Utils_eq(
					elm$core$Maybe$Just(topAppBarHeight),
					model.topAppBarHeight)) ? _Utils_update(
					model,
					{
						currentAppBarOffsetTop: currentAppBarOffsetTop,
						topAppBarHeight: elm$core$Maybe$Just(currentHeight),
						wasDocked: false
					}) : model;
				return _Utils_Tuple2(
					A2(author$project$Internal$TopAppBar$Implementation$topAppBarScrollHandler, scrollPosition, updatedModel),
					elm$core$Platform$Cmd$none);
		}
	});
var author$project$Internal$TopAppBar$Implementation$react = A4(
	author$project$Internal$Component$react,
	author$project$Internal$TopAppBar$Implementation$getSet.get,
	author$project$Internal$TopAppBar$Implementation$getSet.set,
	author$project$Internal$Msg$TopAppBarMsg,
	author$project$Internal$Component$generalise(author$project$Internal$TopAppBar$Implementation$update));
var author$project$Material$update_ = F3(
	function (lift, msg, store) {
		switch (msg.$) {
			case 'Dispatch':
				var msgs = msg.a;
				return _Utils_Tuple2(
					elm$core$Maybe$Nothing,
					author$project$Internal$Dispatch$forward(msgs));
			case 'ButtonMsg':
				var idx = msg.a;
				var msg_ = msg.b;
				return A4(author$project$Internal$Button$Implementation$react, lift, msg_, idx, store);
			case 'CheckboxMsg':
				var idx = msg.a;
				var msg_ = msg.b;
				return A4(author$project$Internal$Checkbox$Implementation$react, lift, msg_, idx, store);
			case 'ChipMsg':
				var idx = msg.a;
				var msg_ = msg.b;
				return A4(author$project$Internal$Chip$Implementation$react, lift, msg_, idx, store);
			case 'DialogMsg':
				var idx = msg.a;
				var msg_ = msg.b;
				return A4(author$project$Internal$Dialog$Implementation$react, lift, msg_, idx, store);
			case 'DrawerMsg':
				var idx = msg.a;
				var msg_ = msg.b;
				return A4(author$project$Internal$Drawer$Implementation$react, lift, msg_, idx, store);
			case 'FabMsg':
				var idx = msg.a;
				var msg_ = msg.b;
				return A4(author$project$Internal$Fab$Implementation$react, lift, msg_, idx, store);
			case 'IconButtonMsg':
				var idx = msg.a;
				var msg_ = msg.b;
				return A4(author$project$Internal$IconButton$Implementation$react, lift, msg_, idx, store);
			case 'ListMsg':
				var idx = msg.a;
				var msg_ = msg.b;
				return A4(author$project$Internal$List$Implementation$react, lift, msg_, idx, store);
			case 'MenuMsg':
				var idx = msg.a;
				var msg_ = msg.b;
				return A4(author$project$Internal$Menu$Implementation$react, lift, msg_, idx, store);
			case 'RadioButtonMsg':
				var idx = msg.a;
				var msg_ = msg.b;
				return A4(author$project$Internal$RadioButton$Implementation$react, lift, msg_, idx, store);
			case 'RippleMsg':
				var idx = msg.a;
				var msg_ = msg.b;
				return A4(author$project$Internal$Ripple$Implementation$react, lift, msg_, idx, store);
			case 'SelectMsg':
				var idx = msg.a;
				var msg_ = msg.b;
				return A4(author$project$Internal$Select$Implementation$react, lift, msg_, idx, store);
			case 'SliderMsg':
				var idx = msg.a;
				var msg_ = msg.b;
				return A4(author$project$Internal$Slider$Implementation$react, lift, msg_, idx, store);
			case 'SnackbarMsg':
				var idx = msg.a;
				var msg_ = msg.b;
				return A4(author$project$Internal$Snackbar$Implementation$react, lift, msg_, idx, store);
			case 'SwitchMsg':
				var idx = msg.a;
				var msg_ = msg.b;
				return A4(author$project$Internal$Switch$Implementation$react, lift, msg_, idx, store);
			case 'TabBarMsg':
				var idx = msg.a;
				var msg_ = msg.b;
				return A4(author$project$Internal$TabBar$Implementation$react, lift, msg_, idx, store);
			case 'TextFieldMsg':
				var idx = msg.a;
				var msg_ = msg.b;
				return A4(author$project$Internal$TextField$Implementation$react, lift, msg_, idx, store);
			case 'ToolbarMsg':
				var idx = msg.a;
				var msg_ = msg.b;
				return A4(author$project$Internal$Toolbar$Implementation$react, lift, msg_, idx, store);
			default:
				var idx = msg.a;
				var msg_ = msg.b;
				return A4(author$project$Internal$TopAppBar$Implementation$react, lift, msg_, idx, store);
		}
	});
var author$project$Material$update = F3(
	function (lift, msg, container) {
		return A2(
			elm$core$Tuple$mapFirst,
			elm$core$Maybe$withDefault(container),
			A2(
				elm$core$Tuple$mapFirst,
				elm$core$Maybe$map(
					function (mdc) {
						return _Utils_update(
							container,
							{mdc: mdc});
					}),
				A3(
					author$project$Material$update_,
					lift,
					msg,
					function ($) {
						return $.mdc;
					}(container))));
	});
var author$project$Page$Internal = function (a) {
	return {$: 'Internal', a: a};
};
var author$project$Page$GotCodeMsg = function (a) {
	return {$: 'GotCodeMsg', a: a};
};
var author$project$Page$GotDataMsg = function (a) {
	return {$: 'GotDataMsg', a: a};
};
var author$project$Page$GotErrorMsg = function (a) {
	return {$: 'GotErrorMsg', a: a};
};
var author$project$Page$GotHomeMsg = function (a) {
	return {$: 'GotHomeMsg', a: a};
};
var author$project$Page$GotLoginMsg = function (a) {
	return {$: 'GotLoginMsg', a: a};
};
var author$project$Page$GotStartPageMsg = function (a) {
	return {$: 'GotStartPageMsg', a: a};
};
var author$project$Page$GotUploadMsg = function (a) {
	return {$: 'GotUploadMsg', a: a};
};
var author$project$Page$PageMsg = function (a) {
	return {$: 'PageMsg', a: a};
};
var author$project$Page$Change = F2(
	function (a, b) {
		return {$: 'Change', a: a, b: b};
	});
var author$project$Page$Move = F3(
	function (a, b, c) {
		return {$: 'Move', a: a, b: b, c: c};
	});
var author$project$Page$matchCodeOutMsg = function (msg) {
	if (msg.$ === 'ChangedAnswer') {
		var caid = msg.a;
		var value = msg.b;
		return A2(author$project$Page$Change, caid, value);
	} else {
		var direction = msg.a;
		var object = msg.b;
		var coding = msg.c;
		return A3(author$project$Page$Move, direction, object, coding);
	}
};
var author$project$Page$SelectCoding = function (a) {
	return {$: 'SelectCoding', a: a};
};
var author$project$Page$UpdateDB = {$: 'UpdateDB'};
var author$project$Page$matchHomeOutMsg = function (msg) {
	if (msg.$ === 'GotSelection') {
		var coding = msg.a;
		return author$project$Page$SelectCoding(coding);
	} else {
		return author$project$Page$UpdateDB;
	}
};
var author$project$Page$matchUploadOutMsg = function (msg) {
	return author$project$Page$UpdateDB;
};
var author$project$Page$Code$ChangedAnswer = F2(
	function (a, b) {
		return {$: 'ChangedAnswer', a: a, b: b};
	});
var author$project$Page$Code$Mdc = function (a) {
	return {$: 'Mdc', a: a};
};
var author$project$Page$Code$Move = F3(
	function (a, b, c) {
		return {$: 'Move', a: a, b: b, c: c};
	});
var author$project$Page$Code$update = F3(
	function (lift, msg, model) {
		switch (msg.$) {
			case 'Mdc':
				var msg_ = msg.a;
				var _n1 = A3(
					author$project$Material$update,
					A2(elm$core$Basics$composeL, lift, author$project$Page$Code$Mdc),
					msg_,
					model);
				var mdcmodel = _n1.a;
				var mdccmd = _n1.b;
				return _Utils_Tuple3(mdcmodel, mdccmd, elm$core$Maybe$Nothing);
			case 'Change':
				var caid = msg.a;
				var value = msg.b;
				return _Utils_Tuple3(
					model,
					elm$core$Platform$Cmd$none,
					elm$core$Maybe$Just(
						A2(author$project$Page$Code$ChangedAnswer, caid, value)));
			default:
				var direction = msg.a;
				var object = msg.b;
				var coding = msg.c;
				return _Utils_Tuple3(
					model,
					elm$core$Platform$Cmd$none,
					elm$core$Maybe$Just(
						A3(author$project$Page$Code$Move, direction, object, coding)));
		}
	});
var author$project$Page$Data$Mdc = function (a) {
	return {$: 'Mdc', a: a};
};
var author$project$Page$Data$update = F3(
	function (lift, msg, model) {
		if (msg.$ === 'Mdc') {
			var msg_ = msg.a;
			return A3(
				author$project$Material$update,
				A2(elm$core$Basics$composeL, lift, author$project$Page$Data$Mdc),
				msg_,
				model);
		} else {
			return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
		}
	});
var author$project$Page$Error$Mdc = function (a) {
	return {$: 'Mdc', a: a};
};
var author$project$Page$Error$update = F3(
	function (lift, msg, model) {
		var msg_ = msg.a;
		return A3(
			author$project$Material$update,
			A2(elm$core$Basics$composeL, lift, author$project$Page$Error$Mdc),
			msg_,
			model);
	});
var author$project$Page$Home$GotFile = function (a) {
	return {$: 'GotFile', a: a};
};
var author$project$Page$Home$GotSelection = function (a) {
	return {$: 'GotSelection', a: a};
};
var author$project$Page$Home$Mdc = function (a) {
	return {$: 'Mdc', a: a};
};
var elm$file$File$Select$file = F2(
	function (mimes, toMsg) {
		return A2(
			elm$core$Task$perform,
			toMsg,
			_File_uploadOne(mimes));
	});
var author$project$Page$Home$update = F3(
	function (lift, msg, model) {
		update:
		while (true) {
			switch (msg.$) {
				case 'Mdc':
					var msg_ = msg.a;
					var _n1 = A3(
						author$project$Material$update,
						A2(elm$core$Basics$composeL, lift, author$project$Page$Home$Mdc),
						msg_,
						model);
					var md = _n1.a;
					var effect = _n1.b;
					return _Utils_Tuple3(md, effect, elm$core$Maybe$Nothing);
				case 'ListMsg':
					var lmsg_ = msg.a;
					switch (lmsg_.$) {
						case 'Select':
							var coding = lmsg_.a;
							return _Utils_Tuple3(
								model,
								elm$core$Platform$Cmd$none,
								elm$core$Maybe$Just(
									author$project$Page$Home$GotSelection(coding)));
						case 'Mdc':
							var mdcmsg_ = lmsg_.a;
							var $temp$lift = lift,
								$temp$msg = author$project$Page$Home$Mdc(mdcmsg_),
								$temp$model = model;
							lift = $temp$lift;
							msg = $temp$msg;
							model = $temp$model;
							continue update;
						default:
							return _Utils_Tuple3(model, elm$core$Platform$Cmd$none, elm$core$Maybe$Nothing);
					}
				case 'CardMsg':
					if (msg.a.$ === 'Mdc') {
						var msg_ = msg.a.a;
						var $temp$lift = lift,
							$temp$msg = author$project$Page$Home$Mdc(msg_),
							$temp$model = model;
						lift = $temp$lift;
						msg = $temp$msg;
						model = $temp$model;
						continue update;
					} else {
						var coding = msg.a.a;
						return _Utils_Tuple3(
							model,
							elm$core$Platform$Cmd$none,
							elm$core$Maybe$Just(
								author$project$Page$Home$GotSelection(coding)));
					}
				case 'Pick':
					return _Utils_Tuple3(
						model,
						A2(
							elm$core$Platform$Cmd$map,
							lift,
							A2(
								elm$file$File$Select$file,
								_List_fromArray(
									['text/csv']),
								author$project$Page$Home$GotFile)),
						elm$core$Maybe$Nothing);
				default:
					var file = msg.a;
					return _Utils_Tuple3(model, elm$core$Platform$Cmd$none, elm$core$Maybe$Nothing);
			}
		}
	});
var author$project$Page$Login$Mdc = function (a) {
	return {$: 'Mdc', a: a};
};
var author$project$Page$Login$update = F4(
	function (lift, msg, model, data) {
		switch (msg.$) {
			case 'Mdc':
				var msg_ = msg.a;
				return A3(
					author$project$Material$update,
					A2(elm$core$Basics$composeL, lift, author$project$Page$Login$Mdc),
					msg_,
					model);
			case 'UpdateTextField':
				var txt = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{field: txt}),
					elm$core$Platform$Cmd$none);
			default:
				var index = msg.a;
				return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
		}
	});
var author$project$Page$StartPage$Mdc = function (a) {
	return {$: 'Mdc', a: a};
};
var author$project$Page$StartPage$update = F3(
	function (lift, msg, model) {
		if (msg.$ === 'Mdc') {
			var msg_ = msg.a;
			return A3(
				author$project$Material$update,
				A2(elm$core$Basics$composeL, lift, author$project$Page$StartPage$Mdc),
				msg_,
				model);
		} else {
			return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
		}
	});
var author$project$Page$Upload$GotFiles = F2(
	function (a, b) {
		return {$: 'GotFiles', a: a, b: b};
	});
var author$project$Page$Upload$Mdc = function (a) {
	return {$: 'Mdc', a: a};
};
var elm$file$File$Select$files = F2(
	function (mimes, toMsg) {
		return A2(
			elm$core$Task$perform,
			function (_n0) {
				var f = _n0.a;
				var fs = _n0.b;
				return A2(toMsg, f, fs);
			},
			_File_uploadOneOrMore(mimes));
	});
var author$project$Page$Upload$update = F3(
	function (lift, msg, model) {
		switch (msg.$) {
			case 'Mdc':
				var msg_ = msg.a;
				var _n1 = A3(
					author$project$Material$update,
					A2(elm$core$Basics$composeL, lift, author$project$Page$Upload$Mdc),
					msg_,
					model);
				var newmodel = _n1.a;
				var effect = _n1.b;
				return _Utils_Tuple3(newmodel, effect, elm$core$Maybe$Nothing);
			case 'Pick':
				return _Utils_Tuple3(
					model,
					A2(
						elm$core$Platform$Cmd$map,
						lift,
						A2(
							elm$file$File$Select$files,
							_List_fromArray(
								['text/*']),
							author$project$Page$Upload$GotFiles)),
					elm$core$Maybe$Nothing);
			case 'DragEnter':
				return _Utils_Tuple3(
					_Utils_update(
						model,
						{hover: true}),
					elm$core$Platform$Cmd$none,
					elm$core$Maybe$Nothing);
			case 'DragLeave':
				return _Utils_Tuple3(
					_Utils_update(
						model,
						{hover: false}),
					elm$core$Platform$Cmd$none,
					elm$core$Maybe$Nothing);
			default:
				var file = msg.a;
				var files = msg.b;
				return _Utils_Tuple3(
					_Utils_update(
						model,
						{
							files: A2(elm$core$List$cons, file, files),
							hover: false
						}),
					elm$core$Platform$Cmd$none,
					elm$core$Maybe$Nothing);
		}
	});
var author$project$Page$updatePage = F3(
	function (msg, model, data) {
		switch (msg.$) {
			case 'GotLoginMsg':
				var msg_ = msg.a;
				var _n1 = A4(
					author$project$Page$Login$update,
					A2(elm$core$Basics$composeL, author$project$Page$PageMsg, author$project$Page$GotLoginMsg),
					msg_,
					model.login,
					data);
				var login = _n1.a;
				var effects = _n1.b;
				return _Utils_Tuple3(
					_Utils_update(
						model,
						{login: login}),
					effects,
					elm$core$Maybe$Nothing);
			case 'GotErrorMsg':
				var msg_ = msg.a;
				var _n2 = A3(
					author$project$Page$Error$update,
					A2(elm$core$Basics$composeL, author$project$Page$PageMsg, author$project$Page$GotErrorMsg),
					msg_,
					model.error);
				var error = _n2.a;
				var effects = _n2.b;
				return _Utils_Tuple3(
					_Utils_update(
						model,
						{error: error}),
					effects,
					elm$core$Maybe$Nothing);
			case 'GotDataMsg':
				var msg_ = msg.a;
				var _n3 = A3(
					author$project$Page$Data$update,
					A2(elm$core$Basics$composeL, author$project$Page$PageMsg, author$project$Page$GotDataMsg),
					msg_,
					model.data);
				var datam = _n3.a;
				var effects = _n3.b;
				return _Utils_Tuple3(
					_Utils_update(
						model,
						{data: datam}),
					effects,
					elm$core$Maybe$Nothing);
			case 'GotHomeMsg':
				var msg_ = msg.a;
				var _n4 = A3(
					author$project$Page$Home$update,
					A2(elm$core$Basics$composeL, author$project$Page$PageMsg, author$project$Page$GotHomeMsg),
					msg_,
					model.home);
				var homem = _n4.a;
				var effects = _n4.b;
				var outmsg = _n4.c;
				return _Utils_Tuple3(
					_Utils_update(
						model,
						{home: homem}),
					effects,
					A2(elm$core$Maybe$map, author$project$Page$matchHomeOutMsg, outmsg));
			case 'GotCodeMsg':
				var msg_ = msg.a;
				var _n5 = A3(
					author$project$Page$Code$update,
					A2(elm$core$Basics$composeL, author$project$Page$PageMsg, author$project$Page$GotCodeMsg),
					msg_,
					model.code);
				var codem = _n5.a;
				var effects = _n5.b;
				var outmsg = _n5.c;
				return _Utils_Tuple3(
					_Utils_update(
						model,
						{code: codem}),
					effects,
					A2(elm$core$Maybe$map, author$project$Page$matchCodeOutMsg, outmsg));
			case 'GotStartPageMsg':
				var msg_ = msg.a;
				var _n6 = A3(
					author$project$Page$StartPage$update,
					A2(elm$core$Basics$composeL, author$project$Page$PageMsg, author$project$Page$GotStartPageMsg),
					msg_,
					model.start_page);
				var startpage = _n6.a;
				var effect = _n6.b;
				return _Utils_Tuple3(
					_Utils_update(
						model,
						{start_page: startpage}),
					effect,
					elm$core$Maybe$Nothing);
			default:
				var msg_ = msg.a;
				var _n7 = A3(
					author$project$Page$Upload$update,
					A2(elm$core$Basics$composeL, author$project$Page$PageMsg, author$project$Page$GotUploadMsg),
					msg_,
					model.upload);
				var upload = _n7.a;
				var effect = _n7.b;
				var upmsg = _n7.c;
				return _Utils_Tuple3(
					_Utils_update(
						model,
						{upload: upload}),
					effect,
					A2(elm$core$Maybe$map, author$project$Page$matchUploadOutMsg, upmsg));
		}
	});
var author$project$Page$Internal$DrawerMsg = function (a) {
	return {$: 'DrawerMsg', a: a};
};
var author$project$Page$Internal$AppBarMsg = function (a) {
	return {$: 'AppBarMsg', a: a};
};
var author$project$Page$Internal$Mdc = function (a) {
	return {$: 'Mdc', a: a};
};
var author$project$Page$Internal$AppBar$Mdc = function (a) {
	return {$: 'Mdc', a: a};
};
var author$project$Page$Internal$AppBar$update = F3(
	function (lift, msg, model) {
		switch (msg.$) {
			case 'Mdc':
				var msg_ = msg.a;
				return A3(
					author$project$Material$update,
					A2(elm$core$Basics$composeL, lift, author$project$Page$Internal$AppBar$Mdc),
					msg_,
					model);
			case 'DrawerMsg':
				var msg_ = msg.a;
				return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
			default:
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{overflow: true}),
					elm$core$Platform$Cmd$none);
		}
	});
var author$project$Page$Internal$Drawer$Mdc = function (a) {
	return {$: 'Mdc', a: a};
};
var author$project$Page$Internal$Drawer$update = F3(
	function (lift, msg, model) {
		switch (msg.$) {
			case 'Mdc':
				var msg_ = msg.a;
				return A3(
					author$project$Material$update,
					A2(elm$core$Basics$composeL, lift, author$project$Page$Internal$Drawer$Mdc),
					msg_,
					model);
			case 'CloseDrawer':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{drawer: false}),
					elm$core$Platform$Cmd$none);
			default:
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{drawer: true}),
					elm$core$Platform$Cmd$none);
		}
	});
var author$project$Page$Internal$update = F3(
	function (lift, msg, model) {
		switch (msg.$) {
			case 'Mdc':
				var msg_ = msg.a;
				return A3(
					author$project$Material$update,
					A2(elm$core$Basics$composeL, lift, author$project$Page$Internal$Mdc),
					msg_,
					model);
			case 'DrawerMsg':
				var msg_ = msg.a;
				var _n1 = A3(
					author$project$Page$Internal$Drawer$update,
					A2(elm$core$Basics$composeL, lift, author$project$Page$Internal$DrawerMsg),
					msg_,
					model.drawer);
				var drawer = _n1.a;
				var effect = _n1.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{drawer: drawer}),
					effect);
			case 'OpenOverflow':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{overflow: true}),
					elm$core$Platform$Cmd$none);
			case 'AppBarMsg':
				var msg_ = msg.a;
				var _n2 = A3(
					author$project$Page$Internal$AppBar$update,
					A2(elm$core$Basics$composeL, lift, author$project$Page$Internal$AppBarMsg),
					msg_,
					model.appbar);
				var appbar = _n2.a;
				var effect = _n2.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{appbar: appbar}),
					effect);
			default:
				var msg_ = msg.a;
				return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
		}
	});
var author$project$Page$Internal$Drawer$CloseDrawer = {$: 'CloseDrawer'};
var elm$core$String$toLower = _String_toLower;
var author$project$Page$Login$getFilteredList = F2(
	function (db, name) {
		return A2(
			elm$core$List$filter,
			function (_n0) {
				var i = _n0.a;
				var m = _n0.b;
				return A2(
					elm$core$String$startsWith,
					elm$core$String$toLower(name),
					elm$core$String$toLower(m.name));
			},
			Chadtech$elm_relational_database$Db$toList(db));
	});
var author$project$Page$update = F3(
	function (msg, data, model) {
		switch (msg.$) {
			case 'Mdc':
				var msg_ = msg.a;
				var _n1 = A3(author$project$Material$update, author$project$Page$Mdc, msg_, model);
				var mdc = _n1.a;
				var effect = _n1.b;
				return _Utils_Tuple3(mdc, effect, elm$core$Maybe$Nothing);
			case 'PageMsg':
				var m = msg.a;
				if ((m.$ === 'GotLoginMsg') && (m.a.$ === 'Select')) {
					var index = m.a.a;
					var list = A2(author$project$Page$Login$getFilteredList, data.coders, model.page.login.field);
					var mb_row = A2(elm_community$list_extra$List$Extra$getAt, index, list);
					return _Utils_Tuple3(
						_Utils_update(
							model,
							{user: mb_row}),
						elm$core$Platform$Cmd$none,
						elm$core$Maybe$Nothing);
				} else {
					var _n3 = A3(author$project$Page$updatePage, m, model.page, data);
					var page = _n3.a;
					var effects = _n3.b;
					var pmsg = _n3.c;
					return _Utils_Tuple3(
						_Utils_update(
							model,
							{page: page}),
						effects,
						pmsg);
				}
			case 'Internal':
				var msg_ = msg.a;
				var _n4 = A3(author$project$Page$Internal$update, author$project$Page$Internal, msg_, model.internal);
				var internal = _n4.a;
				var effects = _n4.b;
				return _Utils_Tuple3(
					_Utils_update(
						model,
						{internal: internal}),
					effects,
					elm$core$Maybe$Nothing);
			default:
				var url = msg.a;
				var _n5 = A3(
					author$project$Page$update,
					author$project$Page$Internal(
						author$project$Page$Internal$DrawerMsg(author$project$Page$Internal$Drawer$CloseDrawer)),
					data,
					model);
				var newmodel = _n5.a;
				var effects = _n5.b;
				var outmsg = _n5.c;
				return _Utils_Tuple3(
					_Utils_update(
						newmodel,
						{url: url}),
					effects,
					outmsg);
		}
	});
var elm$browser$Browser$Navigation$load = _Browser_load;
var elm$browser$Browser$Navigation$pushUrl = _Browser_pushUrl;
var elm$url$Url$addPort = F2(
	function (maybePort, starter) {
		if (maybePort.$ === 'Nothing') {
			return starter;
		} else {
			var port_ = maybePort.a;
			return starter + (':' + elm$core$String$fromInt(port_));
		}
	});
var elm$url$Url$addPrefixed = F3(
	function (prefix, maybeSegment, starter) {
		if (maybeSegment.$ === 'Nothing') {
			return starter;
		} else {
			var segment = maybeSegment.a;
			return _Utils_ap(
				starter,
				_Utils_ap(prefix, segment));
		}
	});
var elm$url$Url$toString = function (url) {
	var http = function () {
		var _n0 = url.protocol;
		if (_n0.$ === 'Http') {
			return 'http://';
		} else {
			return 'https://';
		}
	}();
	return A3(
		elm$url$Url$addPrefixed,
		'#',
		url.fragment,
		A3(
			elm$url$Url$addPrefixed,
			'?',
			url.query,
			_Utils_ap(
				A2(
					elm$url$Url$addPort,
					url.port_,
					_Utils_ap(http, url.host)),
				url.path)));
};
var author$project$Main$update = F2(
	function (msg, model) {
		update:
		while (true) {
			switch (msg.$) {
				case 'GotPageMsg':
					var msg_ = msg.a;
					var _n1 = A3(author$project$Page$update, msg_, model.data, model.page);
					var page = _n1.a;
					var effect = _n1.b;
					var mbpmsg = _n1.c;
					var newmodel = _Utils_update(
						model,
						{page: page});
					if (mbpmsg.$ === 'Nothing') {
						return _Utils_Tuple2(
							newmodel,
							A2(elm$core$Platform$Cmd$map, author$project$Main$GotPageMsg, effect));
					} else {
						var pmsg = mbpmsg.a;
						switch (pmsg.$) {
							case 'GenerateFrame':
								var coding = pmsg.a;
								var $temp$msg = author$project$Main$GotDataMsg(
									A3(
										author$project$Data$Generate,
										author$project$Data$CodingFrame(elm$core$Maybe$Nothing),
										coding,
										elm$core$Maybe$Nothing)),
									$temp$model = model;
								msg = $temp$msg;
								model = $temp$model;
								continue update;
							case 'SelectCoding':
								var coding = pmsg.a;
								var old_page = model.page;
								var new_page = _Utils_update(
									old_page,
									{
										coding: elm$core$Maybe$Just(coding)
									});
								var _n4 = A2(
									author$project$Main$update,
									author$project$Main$GotPageMsg(
										author$project$Page$OnUrlChange(author$project$Page$Url$Code)),
									_Utils_update(
										model,
										{page: new_page}));
								var newest_model = _n4.a;
								var newest_effect = _n4.b;
								var _n5 = A2(
									author$project$Data$update,
									A3(
										author$project$Data$Generate,
										author$project$Data$CodingAnswer(elm$core$Maybe$Nothing),
										coding,
										elm$core$Maybe$Nothing),
									model.data);
								var new_data = _n5.a;
								var new_effect = _n5.b;
								var new_model = _Utils_update(
									model,
									{data: new_data});
								return _Utils_Tuple2(
									newest_model,
									elm$core$Platform$Cmd$batch(
										_List_fromArray(
											[
												newest_effect,
												A2(elm$core$Platform$Cmd$map, author$project$Main$GotDataMsg, new_effect)
											])));
							case 'Change':
								var caid = pmsg.a;
								var value = pmsg.b;
								var old_data = model.data;
								var new_data = _Utils_update(
									old_data,
									{
										coding_answers: A3(
											Chadtech$elm_relational_database$Db$update,
											caid,
											elm$core$Maybe$map(
												function (c) {
													return _Utils_update(
														c,
														{value: value});
												}),
											old_data.coding_answers)
									});
								return A2(
									elm$core$Debug$log,
									'got changed',
									_Utils_Tuple2(
										_Utils_update(
											model,
											{data: new_data}),
										elm$core$Platform$Cmd$none));
							case 'Move':
								var direction = pmsg.a;
								var object = pmsg.b;
								var coding = pmsg.c;
								var $temp$msg = author$project$Main$GotDataMsg(
									A3(author$project$Data$Move, direction, object, coding)),
									$temp$model = model;
								msg = $temp$msg;
								model = $temp$model;
								continue update;
							default:
								return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
						}
					}
				case 'GotDataMsg':
					var msg_ = msg.a;
					var _n6 = A2(author$project$Data$update, msg_, model.data);
					var data = _n6.a;
					var effect = _n6.b;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{data: data}),
						A2(elm$core$Platform$Cmd$map, author$project$Main$GotDataMsg, effect));
				case 'LinkClicked':
					var urlRequest = msg.a;
					if (urlRequest.$ === 'Internal') {
						var url = urlRequest.a;
						return _Utils_Tuple2(
							model,
							A2(
								elm$browser$Browser$Navigation$pushUrl,
								model.key,
								elm$url$Url$toString(url)));
					} else {
						var href = urlRequest.a;
						return _Utils_Tuple2(
							model,
							elm$browser$Browser$Navigation$load(href));
					}
				default:
					var url = msg.a;
					var _n8 = A3(
						author$project$Page$update,
						author$project$Page$onUrlChange(url),
						model.data,
						model.page);
					var page = _n8.a;
					var effect = _n8.b;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{page: page}),
						A2(elm$core$Platform$Cmd$map, author$project$Main$GotPageMsg, effect));
			}
		}
	});
var elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var elm$html$Html$text = elm$virtual_dom$VirtualDom$text;
var author$project$Page$Internal$Drawer$headerFromCoder = function (_n0) {
	var cid = _n0.a;
	var model = _n0.b;
	return {
		subtitle: elm$html$Html$text(
			Chadtech$elm_relational_database$Id$toString(cid)),
		title: elm$html$Html$text(model.name)
	};
};
var author$project$Page$Url$toIcon = function (url) {
	switch (url.$) {
		case 'Home':
			return 'home';
		case 'StartPage':
			return 'home';
		case 'Data':
			return 'account_tree';
		case 'Code':
			return 'ballot';
		case 'Error':
			return 'error';
		case 'Error404':
			return 'error_outline';
		default:
			return 'upload';
	}
};
var author$project$Page$Url$toString = function (url) {
	switch (url.$) {
		case 'StartPage':
			return '#';
		case 'Error404':
			var requestedHash = url.a;
			return requestedHash;
		case 'Data':
			return '#data';
		case 'Error':
			return '#error';
		case 'Home':
			return '#home';
		case 'Code':
			return '#code';
		default:
			return '#upload';
	}
};
var author$project$Page$Internal$Drawer$locationFromUrl = F2(
	function (url, active) {
		return {
			active: active,
			href: author$project$Page$Url$toString(url),
			icon: elm$core$Maybe$Just(
				author$project$Page$Url$toIcon(url)),
			label: author$project$Page$Url$toString(url)
		};
	});
var author$project$Page$Url$navigatableUrl = _List_fromArray(
	[author$project$Page$Url$Home, author$project$Page$Url$Code, author$project$Page$Url$Data, author$project$Page$Url$Upload]);
var author$project$Page$drawerConfig = function (model) {
	return {
		favourites: _List_Nil,
		header: A2(elm$core$Maybe$map, author$project$Page$Internal$Drawer$headerFromCoder, model.user),
		locations: A2(
			elm$core$List$map,
			function (x) {
				return A2(
					author$project$Page$Internal$Drawer$locationFromUrl,
					x,
					_Utils_eq(x, model.url));
			},
			author$project$Page$Url$navigatableUrl)
	};
};
var author$project$Data$Navigation$question2questionary = F2(
	function (model, question) {
		return A3(
			author$project$Db$Extra$getDB,
			model.questionaries,
			function (c) {
				return c.questionary;
			},
			question);
	});
var author$project$Data$Navigation$coding2questionary = F2(
	function (model, coding) {
		return A2(
			author$project$Data$Navigation$question2questionary,
			model,
			A2(
				author$project$Data$Navigation$coding_frame2question,
				model,
				A2(author$project$Data$Navigation$coding2coding_frame, model, coding)));
	});
var author$project$Data$Navigation$questionary2question = F2(
	function (model, questionary) {
		return A3(
			author$project$Db$Extra$selectFrom,
			model.questions,
			function (c) {
				return c.questionary;
			},
			questionary);
	});
var author$project$Data$Access$max_coding_frame_index = F2(
	function (model, coding) {
		return function (x) {
			return x - 1;
		}(
			elm$core$List$length(
				Chadtech$elm_relational_database$Db$toList(
					A2(
						author$project$Data$Navigation$question2answer,
						model,
						A2(
							author$project$Data$Navigation$questionary2question,
							model,
							A2(
								author$project$Data$Navigation$coding2questionary,
								model,
								Chadtech$elm_relational_database$Db$fromList(
									_List_fromArray(
										[coding]))))))));
	});
var author$project$Db$Extra$selectFromRow = F3(
	function (db, accessor, _n0) {
		var id = _n0.a;
		var row = _n0.b;
		return A2(
			Chadtech$elm_relational_database$Db$filter,
			function (_n1) {
				var value = _n1.b;
				return _Utils_eq(
					accessor(value),
					id);
			},
			db);
	});
var author$project$Data$getCodingAnswers = F2(
	function (answers, frame) {
		return Chadtech$elm_relational_database$Db$toList(
			A3(
				author$project$Db$Extra$selectFromRow,
				answers,
				function (c) {
					return c.coding_frame;
				},
				frame));
	});
var author$project$Db$Extra$Absent = {$: 'Absent'};
var author$project$Db$Extra$get = F3(
	function (b, accessor, _n0) {
		var ida = _n0.a;
		var valuea = _n0.b;
		var idb = accessor(valuea);
		var _n1 = A2(Chadtech$elm_relational_database$Db$get, b, idb);
		if (_n1.$ === 'Just') {
			var valueb = _n1.a;
			return elm$core$Result$Ok(
				_Utils_Tuple2(idb, valueb));
		} else {
			return elm$core$Result$Err(author$project$Db$Extra$Absent);
		}
	});
var author$project$Internal$Options$Class = function (a) {
	return {$: 'Class', a: a};
};
var author$project$Internal$Options$cs = function (c) {
	return author$project$Internal$Options$Class(c);
};
var author$project$Internal$LayoutGrid$Implementation$alignMiddle = author$project$Internal$Options$cs('mdc-layout-grid__cell--align-middle');
var author$project$Material$LayoutGrid$alignMiddle = author$project$Internal$LayoutGrid$Implementation$alignMiddle;
var elm$core$Result$toMaybe = function (result) {
	if (result.$ === 'Ok') {
		var v = result.a;
		return elm$core$Maybe$Just(v);
	} else {
		return elm$core$Maybe$Nothing;
	}
};
var author$project$Internal$Dispatch$flatten = function (decoders) {
	var tryMergeStep = F3(
		function (value, decoder, result) {
			return A2(
				elm$core$Maybe$withDefault,
				result,
				A2(
					elm$core$Maybe$map,
					function (_n0) {
						var message = _n0.message;
						var stopPropagation = _n0.stopPropagation;
						var preventDefault = _n0.preventDefault;
						return {
							message: A2(elm$core$List$cons, message, result.message),
							preventDefault: preventDefault || result.preventDefault,
							stopPropagation: stopPropagation || result.stopPropagation
						};
					},
					elm$core$Result$toMaybe(
						A2(elm$json$Json$Decode$decodeValue, decoder, value))));
		});
	var tryMerge = function (value) {
		return A3(
			elm$core$List$foldl,
			tryMergeStep(value),
			{message: _List_Nil, preventDefault: false, stopPropagation: false},
			decoders);
	};
	return A2(elm$json$Json$Decode$map, tryMerge, elm$json$Json$Decode$value);
};
var elm$core$Dict$map = F2(
	function (func, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			return A5(
				elm$core$Dict$RBNode_elm_builtin,
				color,
				key,
				A2(func, key, value),
				A2(elm$core$Dict$map, func, left),
				A2(elm$core$Dict$map, func, right));
		}
	});
var elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3(elm$core$List$foldr, elm$core$List$cons, ys, xs);
		}
	});
var elm$core$List$concat = function (lists) {
	return A3(elm$core$List$foldr, elm$core$List$append, _List_Nil, lists);
};
var elm$core$List$concatMap = F2(
	function (f, list) {
		return elm$core$List$concat(
			A2(elm$core$List$map, f, list));
	});
var elm$virtual_dom$VirtualDom$Custom = function (a) {
	return {$: 'Custom', a: a};
};
var elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var elm$html$Html$Events$custom = F2(
	function (event, decoder) {
		return A2(
			elm$virtual_dom$VirtualDom$on,
			event,
			elm$virtual_dom$VirtualDom$Custom(decoder));
	});
var author$project$Internal$Dispatch$toAttributes = function (_n0) {
	var config = _n0.a;
	var _n1 = config.lift;
	if (_n1.$ === 'Just') {
		var lift = _n1.a;
		return A2(
			elm$core$List$map,
			function (_n3) {
				var event = _n3.a;
				var flatDecoder = _n3.b;
				return A2(
					elm$html$Html$Events$custom,
					event,
					lift(flatDecoder));
			},
			elm$core$Dict$toList(
				A2(
					elm$core$Dict$map,
					function (_n2) {
						return author$project$Internal$Dispatch$flatten;
					},
					config.decoders)));
	} else {
		return A2(
			elm$core$List$concatMap,
			function (_n4) {
				var event = _n4.a;
				var decoders = _n4.b;
				return A2(
					elm$core$List$map,
					elm$html$Html$Events$custom(event),
					decoders);
			},
			elm$core$Dict$toList(config.decoders));
	}
};
var elm$virtual_dom$VirtualDom$attribute = F2(
	function (key, value) {
		return A2(
			_VirtualDom_attribute,
			_VirtualDom_noOnOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlUri(value));
	});
var elm$html$Html$Attributes$attribute = elm$virtual_dom$VirtualDom$attribute;
var elm$json$Json$Encode$string = _Json_wrap;
var elm$html$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			_VirtualDom_property,
			key,
			elm$json$Json$Encode$string(string));
	});
var elm$html$Html$Attributes$class = elm$html$Html$Attributes$stringProperty('className');
var author$project$Internal$Options$addAttributes = F2(
	function (summary, attrs) {
		var styleText = A2(
			elm$core$String$join,
			'; ',
			A2(
				elm$core$List$map,
				function (_n0) {
					var key = _n0.a;
					var value = _n0.b;
					return A2(
						elm$core$String$join,
						': ',
						_List_fromArray(
							[key, value]));
				},
				summary.css));
		var style = (styleText !== '') ? _List_fromArray(
			[
				A2(elm$html$Html$Attributes$attribute, 'style', styleText)
			]) : _List_Nil;
		var all = _Utils_ap(
			summary.attrs,
			_Utils_ap(
				style,
				_Utils_ap(
					A2(
						elm$core$List$map,
						elm$html$Html$Attributes$class,
						elm$core$List$reverse(summary.classes)),
					_Utils_ap(
						attrs,
						_Utils_ap(
							summary.internal,
							author$project$Internal$Dispatch$toAttributes(summary.dispatch))))));
		return all;
	});
var author$project$Internal$Dispatch$Config = function (a) {
	return {$: 'Config', a: a};
};
var author$project$Internal$Dispatch$defaultConfig = author$project$Internal$Dispatch$Config(
	{decoders: elm$core$Dict$empty, lift: elm$core$Maybe$Nothing});
var author$project$Internal$Options$Summary = F6(
	function (classes, css, attrs, internal, dispatch, config) {
		return {attrs: attrs, classes: classes, config: config, css: css, dispatch: dispatch, internal: internal};
	});
var author$project$Internal$Dispatch$add = F3(
	function (event, decoder, _n0) {
		var config = _n0.a;
		return author$project$Internal$Dispatch$Config(
			_Utils_update(
				config,
				{
					decoders: A3(
						elm$core$Dict$update,
						event,
						A2(
							elm$core$Basics$composeR,
							elm$core$Maybe$map(
								elm$core$List$cons(decoder)),
							A2(
								elm$core$Basics$composeR,
								elm$core$Maybe$withDefault(
									_List_fromArray(
										[decoder])),
								elm$core$Maybe$Just)),
						config.decoders)
				}));
	});
var author$project$Internal$Dispatch$setLift = F2(
	function (lift, _n0) {
		var decoders = _n0.a.decoders;
		return author$project$Internal$Dispatch$Config(
			{
				decoders: decoders,
				lift: elm$core$Maybe$Just(lift)
			});
	});
var author$project$Internal$Options$collect1_ = F2(
	function (options, acc) {
		switch (options.$) {
			case 'Class':
				var x = options.a;
				return _Utils_update(
					acc,
					{
						classes: A2(elm$core$List$cons, x, acc.classes)
					});
			case 'CSS':
				var x = options.a;
				return _Utils_update(
					acc,
					{
						css: A2(elm$core$List$cons, x, acc.css)
					});
			case 'Attribute':
				var x = options.a;
				return _Utils_update(
					acc,
					{
						attrs: A2(elm$core$List$cons, x, acc.attrs)
					});
			case 'Internal':
				var x = options.a;
				return _Utils_update(
					acc,
					{
						internal: A2(elm$core$List$cons, x, acc.internal)
					});
			case 'Listener':
				var event = options.a;
				var decoder = options.b;
				return _Utils_update(
					acc,
					{
						dispatch: A3(author$project$Internal$Dispatch$add, event, decoder, acc.dispatch)
					});
			case 'Many':
				var opts = options.a;
				return A3(elm$core$List$foldl, author$project$Internal$Options$collect1_, acc, opts);
			case 'Lift':
				var lift = options.a;
				return _Utils_update(
					acc,
					{
						dispatch: A2(author$project$Internal$Dispatch$setLift, lift, acc.dispatch)
					});
			case 'Set':
				return acc;
			default:
				return acc;
		}
	});
var author$project$Internal$Options$collect_ = A2(
	elm$core$List$foldl,
	author$project$Internal$Options$collect1_,
	A6(author$project$Internal$Options$Summary, _List_Nil, _List_Nil, _List_Nil, _List_Nil, author$project$Internal$Dispatch$defaultConfig, _Utils_Tuple0));
var author$project$Internal$Options$styled = F2(
	function (ctor, props) {
		return ctor(
			A2(
				author$project$Internal$Options$addAttributes,
				author$project$Internal$Options$collect_(props),
				_List_Nil));
	});
var elm$html$Html$div = _VirtualDom_node('div');
var author$project$Internal$LayoutGrid$Implementation$cell = function (options) {
	return A2(
		author$project$Internal$Options$styled,
		elm$html$Html$div,
		A2(
			elm$core$List$cons,
			author$project$Internal$Options$cs('mdc-layout-grid__cell'),
			options));
};
var author$project$Material$LayoutGrid$cell = author$project$Internal$LayoutGrid$Implementation$cell;
var author$project$Internal$LayoutGrid$Implementation$inner = function (options) {
	return A2(
		author$project$Internal$Options$styled,
		elm$html$Html$div,
		A2(
			elm$core$List$cons,
			author$project$Internal$Options$cs('mdc-layout-grid__inner'),
			options));
};
var author$project$Material$LayoutGrid$inner = author$project$Internal$LayoutGrid$Implementation$inner;
var author$project$Internal$LayoutGrid$Implementation$span = F2(
	function (device, value) {
		if (device.$ === 'Just') {
			var device_ = device.a;
			return author$project$Internal$Options$cs(
				'mdc-layout-grid__cell--span-' + (elm$core$String$fromInt(value) + ('-' + device_)));
		} else {
			return author$project$Internal$Options$cs(
				'mdc-layout-grid__cell--span-' + elm$core$String$fromInt(value));
		}
	});
var author$project$Internal$LayoutGrid$Implementation$span10Desktop = A2(
	author$project$Internal$LayoutGrid$Implementation$span,
	elm$core$Maybe$Just('desktop'),
	10);
var author$project$Material$LayoutGrid$span10Desktop = author$project$Internal$LayoutGrid$Implementation$span10Desktop;
var author$project$Internal$LayoutGrid$Implementation$span12Desktop = A2(
	author$project$Internal$LayoutGrid$Implementation$span,
	elm$core$Maybe$Just('desktop'),
	12);
var author$project$Material$LayoutGrid$span12Desktop = author$project$Internal$LayoutGrid$Implementation$span12Desktop;
var author$project$Internal$LayoutGrid$Implementation$span1Desktop = A2(
	author$project$Internal$LayoutGrid$Implementation$span,
	elm$core$Maybe$Just('desktop'),
	1);
var author$project$Material$LayoutGrid$span1Desktop = author$project$Internal$LayoutGrid$Implementation$span1Desktop;
var author$project$Internal$LayoutGrid$Implementation$span1Tablet = A2(
	author$project$Internal$LayoutGrid$Implementation$span,
	elm$core$Maybe$Just('tablet'),
	1);
var author$project$Material$LayoutGrid$span1Tablet = author$project$Internal$LayoutGrid$Implementation$span1Tablet;
var author$project$Internal$LayoutGrid$Implementation$span4Phone = A2(
	author$project$Internal$LayoutGrid$Implementation$span,
	elm$core$Maybe$Just('phone'),
	4);
var author$project$Material$LayoutGrid$span4Phone = author$project$Internal$LayoutGrid$Implementation$span4Phone;
var author$project$Internal$LayoutGrid$Implementation$span6Tablet = A2(
	author$project$Internal$LayoutGrid$Implementation$span,
	elm$core$Maybe$Just('tablet'),
	6);
var author$project$Material$LayoutGrid$span6Tablet = author$project$Internal$LayoutGrid$Implementation$span6Tablet;
var author$project$Internal$LayoutGrid$Implementation$span8Tablet = A2(
	author$project$Internal$LayoutGrid$Implementation$span,
	elm$core$Maybe$Just('tablet'),
	8);
var author$project$Material$LayoutGrid$span8Tablet = author$project$Internal$LayoutGrid$Implementation$span8Tablet;
var author$project$Internal$Options$CSS = function (a) {
	return {$: 'CSS', a: a};
};
var author$project$Internal$Options$css = F2(
	function (key, value) {
		return author$project$Internal$Options$CSS(
			_Utils_Tuple2(key, value));
	});
var author$project$Material$Options$css = author$project$Internal$Options$css;
var author$project$Material$Options$styled = author$project$Internal$Options$styled;
var author$project$Internal$Typography$Implementation$headline4 = author$project$Internal$Options$cs('mdc-typography--headline4');
var author$project$Material$Typography$headline4 = author$project$Internal$Typography$Implementation$headline4;
var author$project$Internal$Typography$Implementation$typography = author$project$Internal$Options$cs('mdc-typography');
var author$project$Material$Typography$typography = author$project$Internal$Typography$Implementation$typography;
var author$project$Page$Code$viewAnswer = function (answer) {
	var text_ = function () {
		if (answer.$ === 'Ok') {
			var _n1 = answer.a;
			var id = _n1.a;
			var value = _n1.b;
			return value.value;
		} else {
			var error = answer.a;
			return 'error';
		}
	}();
	return A3(
		author$project$Material$Options$styled,
		elm$html$Html$div,
		_List_fromArray(
			[
				author$project$Material$Typography$typography,
				A2(author$project$Material$Options$css, 'text-align', 'center')
			]),
		_List_fromArray(
			[
				A3(
				author$project$Material$Options$styled,
				elm$html$Html$div,
				_List_fromArray(
					[author$project$Material$Typography$headline4]),
				_List_fromArray(
					[
						elm$html$Html$text(text_)
					]))
			]));
};
var author$project$Form$inputTypeToComparable = function (input_type) {
	switch (input_type.$) {
		case 'InputString':
			return 'String';
		case 'InputNumber':
			return 'Number';
		default:
			return 'Choice';
	}
};
var author$project$Form$Change = function (a) {
	return {$: 'Change', a: a};
};
var elm$html$Html$input = _VirtualDom_node('input');
var elm$html$Html$Attributes$placeholder = elm$html$Html$Attributes$stringProperty('placeholder');
var elm$html$Html$Attributes$value = elm$html$Html$Attributes$stringProperty('value');
var elm$html$Html$Events$alwaysStop = function (x) {
	return _Utils_Tuple2(x, true);
};
var elm$virtual_dom$VirtualDom$MayStopPropagation = function (a) {
	return {$: 'MayStopPropagation', a: a};
};
var elm$html$Html$Events$stopPropagationOn = F2(
	function (event, decoder) {
		return A2(
			elm$virtual_dom$VirtualDom$on,
			event,
			elm$virtual_dom$VirtualDom$MayStopPropagation(decoder));
	});
var elm$json$Json$Decode$at = F2(
	function (fields, decoder) {
		return A3(elm$core$List$foldr, elm$json$Json$Decode$field, decoder, fields);
	});
var elm$html$Html$Events$targetValue = A2(
	elm$json$Json$Decode$at,
	_List_fromArray(
		['target', 'value']),
	elm$json$Json$Decode$string);
var elm$html$Html$Events$onInput = function (tagger) {
	return A2(
		elm$html$Html$Events$stopPropagationOn,
		'input',
		A2(
			elm$json$Json$Decode$map,
			elm$html$Html$Events$alwaysStop,
			A2(elm$json$Json$Decode$map, tagger, elm$html$Html$Events$targetValue)));
};
var author$project$Form$viewInputChoice = F4(
	function (lift, mdc, id, value) {
		return A2(
			elm$html$Html$div,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					elm$html$Html$input,
					_List_fromArray(
						[
							elm$html$Html$Attributes$placeholder('Your answer'),
							elm$html$Html$Attributes$value(value),
							elm$html$Html$Events$onInput(
							A2(elm$core$Basics$composeL, lift, author$project$Form$Change))
						]),
					_List_Nil),
					elm$html$Html$text(value)
				]));
	});
var author$project$Form$viewInputNumber = F5(
	function (lift, mdc, id, value, bounds) {
		return A2(
			elm$html$Html$div,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					elm$html$Html$input,
					_List_fromArray(
						[
							elm$html$Html$Attributes$placeholder('Your answer'),
							elm$html$Html$Attributes$value(value),
							elm$html$Html$Events$onInput(
							A2(elm$core$Basics$composeL, lift, author$project$Form$Change))
						]),
					_List_Nil),
					elm$html$Html$text(value)
				]));
	});
var author$project$Form$Mdc = function (a) {
	return {$: 'Mdc', a: a};
};
var author$project$Internal$Options$Listener = F2(
	function (a, b) {
		return {$: 'Listener', a: a, b: b};
	});
var author$project$Internal$Options$on = F2(
	function (event, decodeMessage) {
		return A2(
			author$project$Internal$Options$Listener,
			event,
			A2(
				elm$json$Json$Decode$map,
				function (message) {
					return {message: message, preventDefault: false, stopPropagation: false};
				},
				decodeMessage));
	});
var author$project$Internal$Options$onInput = function (f) {
	return A2(
		author$project$Internal$Options$on,
		'input',
		A2(elm$json$Json$Decode$map, f, elm$html$Html$Events$targetValue));
};
var author$project$Material$Options$onInput = author$project$Internal$Options$onInput;
var author$project$Internal$Options$Set = function (a) {
	return {$: 'Set', a: a};
};
var author$project$Internal$Options$option = author$project$Internal$Options$Set;
var author$project$Internal$TextField$Implementation$label = A2(
	elm$core$Basics$composeL,
	author$project$Internal$Options$option,
	F2(
		function (str, config) {
			return _Utils_update(
				config,
				{
					labelText: elm$core$Maybe$Just(str)
				});
		}));
var author$project$Material$TextField$label = author$project$Internal$TextField$Implementation$label;
var author$project$Internal$TextField$Implementation$value = function (value_) {
	return author$project$Internal$Options$option(
		function (config) {
			return _Utils_update(
				config,
				{
					value: elm$core$Maybe$Just(value_)
				});
		});
};
var author$project$Material$TextField$value = author$project$Internal$TextField$Implementation$value;
var author$project$Internal$Msg$Dispatch = function (a) {
	return {$: 'Dispatch', a: a};
};
var author$project$Internal$Options$Lift = function (a) {
	return {$: 'Lift', a: a};
};
var author$project$Internal$Options$dispatch = function (lift) {
	return author$project$Internal$Options$Lift(
		elm$json$Json$Decode$map(
			function (_n0) {
				var message = _n0.message;
				var stopPropagation = _n0.stopPropagation;
				var preventDefault = _n0.preventDefault;
				return {
					message: lift(
						author$project$Internal$Msg$Dispatch(message)),
					preventDefault: preventDefault,
					stopPropagation: stopPropagation
				};
			}));
};
var author$project$Internal$Component$render = F3(
	function (get_model, view, ctor) {
		return F4(
			function (lift, idx, store, options) {
				return A3(
					view,
					A2(
						elm$core$Basics$composeL,
						lift,
						ctor(idx)),
					A2(get_model, idx, store),
					A2(
						elm$core$List$cons,
						author$project$Internal$Options$dispatch(lift),
						options));
			});
	});
var author$project$Internal$Options$internalId = function (id_) {
	return author$project$Internal$Options$option(
		function (config) {
			return _Utils_update(
				config,
				{id_: id_});
		});
};
var author$project$Internal$Options$collect1 = F2(
	function (opt, acc) {
		switch (opt.$) {
			case 'Class':
				var x = opt.a;
				return _Utils_update(
					acc,
					{
						classes: A2(elm$core$List$cons, x, acc.classes)
					});
			case 'CSS':
				var x = opt.a;
				return _Utils_update(
					acc,
					{
						css: A2(elm$core$List$cons, x, acc.css)
					});
			case 'Attribute':
				var x = opt.a;
				return _Utils_update(
					acc,
					{
						attrs: A2(elm$core$List$cons, x, acc.attrs)
					});
			case 'Internal':
				var x = opt.a;
				return _Utils_update(
					acc,
					{
						internal: A2(elm$core$List$cons, x, acc.internal)
					});
			case 'Many':
				var opts = opt.a;
				return A3(elm$core$List$foldl, author$project$Internal$Options$collect1, acc, opts);
			case 'Set':
				var g = opt.a;
				return _Utils_update(
					acc,
					{
						config: g(acc.config)
					});
			case 'Listener':
				var event = opt.a;
				var decoder = opt.b;
				return _Utils_update(
					acc,
					{
						dispatch: A3(author$project$Internal$Dispatch$add, event, decoder, acc.dispatch)
					});
			case 'Lift':
				var lift = opt.a;
				return _Utils_update(
					acc,
					{
						dispatch: A2(author$project$Internal$Dispatch$setLift, lift, acc.dispatch)
					});
			default:
				return acc;
		}
	});
var author$project$Internal$Options$recollect = elm$core$List$foldl(author$project$Internal$Options$collect1);
var author$project$Internal$Options$apply = F4(
	function (summary, ctor, options, attrs) {
		return ctor(
			A2(
				author$project$Internal$Options$addAttributes,
				A2(author$project$Internal$Options$recollect, summary, options),
				attrs));
	});
var author$project$Internal$Dispatch$clear = function (_n0) {
	var config = _n0.a;
	return author$project$Internal$Dispatch$Config(
		_Utils_update(
			config,
			{decoders: elm$core$Dict$empty}));
};
var author$project$Internal$Options$applyNativeControl = F3(
	function (summary, ctor, options) {
		return ctor(
			A2(
				author$project$Internal$Options$addAttributes,
				A2(
					author$project$Internal$Options$recollect,
					{
						attrs: _List_Nil,
						classes: _List_Nil,
						config: _Utils_Tuple0,
						css: _List_Nil,
						dispatch: author$project$Internal$Dispatch$clear(summary.dispatch),
						internal: _List_Nil
					},
					_Utils_ap(summary.config.nativeControl, options)),
				_List_Nil));
	});
var author$project$Internal$Options$Attribute = function (a) {
	return {$: 'Attribute', a: a};
};
var elm$virtual_dom$VirtualDom$mapAttribute = _VirtualDom_mapAttribute;
var elm$html$Html$Attributes$map = elm$virtual_dom$VirtualDom$mapAttribute;
var author$project$Internal$Options$attribute = A2(
	elm$core$Basics$composeL,
	author$project$Internal$Options$Attribute,
	elm$html$Html$Attributes$map(elm$core$Basics$never));
var author$project$Internal$Options$collect = A2(
	elm$core$Basics$composeR,
	A5(author$project$Internal$Options$Summary, _List_Nil, _List_Nil, _List_Nil, _List_Nil, author$project$Internal$Dispatch$defaultConfig),
	author$project$Internal$Options$recollect);
var elm$html$Html$Attributes$for = elm$html$Html$Attributes$stringProperty('htmlFor');
var author$project$Internal$Options$for = A2(elm$core$Basics$composeL, author$project$Internal$Options$Attribute, elm$html$Html$Attributes$for);
var elm$html$Html$Attributes$id = elm$html$Html$Attributes$stringProperty('id');
var author$project$Internal$Options$id = A2(elm$core$Basics$composeL, author$project$Internal$Options$Attribute, elm$html$Html$Attributes$id);
var author$project$Internal$Options$Many = function (a) {
	return {$: 'Many', a: a};
};
var author$project$Internal$Options$many = author$project$Internal$Options$Many;
var author$project$Internal$Options$onBlur = function (msg) {
	return A2(
		author$project$Internal$Options$on,
		'blur',
		elm$json$Json$Decode$succeed(msg));
};
var author$project$Internal$Options$None = {$: 'None'};
var author$project$Internal$Options$nop = author$project$Internal$Options$None;
var author$project$Internal$Options$when = F2(
	function (guard, prop) {
		return guard ? prop : author$project$Internal$Options$nop;
	});
var author$project$Internal$TextField$Model$Geometry = F3(
	function (width, height, labelWidth) {
		return {height: height, labelWidth: labelWidth, width: width};
	});
var debois$elm_dom$DOM$childNode = function (idx) {
	return elm$json$Json$Decode$at(
		_List_fromArray(
			[
				'childNodes',
				elm$core$String$fromInt(idx)
			]));
};
var elm$json$Json$Decode$float = _Json_decodeFloat;
var debois$elm_dom$DOM$offsetHeight = A2(elm$json$Json$Decode$field, 'offsetHeight', elm$json$Json$Decode$float);
var debois$elm_dom$DOM$offsetWidth = A2(elm$json$Json$Decode$field, 'offsetWidth', elm$json$Json$Decode$float);
var debois$elm_dom$DOM$parentElement = function (decoder) {
	return A2(elm$json$Json$Decode$field, 'parentElement', decoder);
};
var debois$elm_dom$DOM$target = function (decoder) {
	return A2(elm$json$Json$Decode$field, 'target', decoder);
};
var elm$json$Json$Decode$map3 = _Json_map3;
var author$project$Internal$TextField$Implementation$decodeGeometry = debois$elm_dom$DOM$target(
	debois$elm_dom$DOM$parentElement(
		A4(
			elm$json$Json$Decode$map3,
			author$project$Internal$TextField$Model$Geometry,
			A2(debois$elm_dom$DOM$childNode, 2, debois$elm_dom$DOM$offsetWidth),
			A2(debois$elm_dom$DOM$childNode, 2, debois$elm_dom$DOM$offsetHeight),
			A2(debois$elm_dom$DOM$childNode, 1, debois$elm_dom$DOM$offsetWidth))));
var author$project$Internal$TextField$Implementation$defaultConfig = {
	cols: elm$core$Maybe$Nothing,
	defaultValue: elm$core$Maybe$Nothing,
	disabled: false,
	fullWidth: false,
	id_: '',
	invalid: false,
	labelFloat: false,
	labelText: elm$core$Maybe$Nothing,
	leadingIcon: elm$core$Maybe$Nothing,
	nativeControl: _List_Nil,
	onLeadingIconClick: elm$core$Maybe$Nothing,
	onTrailingIconClick: elm$core$Maybe$Nothing,
	outlined: false,
	pattern: elm$core$Maybe$Nothing,
	placeholder: elm$core$Maybe$Nothing,
	required: false,
	rows: elm$core$Maybe$Nothing,
	textarea: false,
	trailingIcon: elm$core$Maybe$Nothing,
	type_: elm$core$Maybe$Just('text'),
	value: elm$core$Maybe$Nothing
};
var author$project$Internal$Options$onClick = function (msg) {
	return A2(
		author$project$Internal$Options$on,
		'click',
		elm$json$Json$Decode$succeed(msg));
};
var author$project$Internal$Options$role = function (value) {
	return author$project$Internal$Options$Attribute(
		A2(elm$html$Html$Attributes$attribute, 'role', value));
};
var elm$html$Html$Attributes$tabindex = function (n) {
	return A2(
		_VirtualDom_attribute,
		'tabIndex',
		elm$core$String$fromInt(n));
};
var author$project$Internal$Options$tabindex = function (value) {
	return author$project$Internal$Options$Attribute(
		elm$html$Html$Attributes$tabindex(value));
};
var elm$html$Html$i = _VirtualDom_node('i');
var author$project$Internal$TextField$Implementation$iconView = F3(
	function (lift, icon, handler) {
		if (icon.$ === 'Just') {
			var name = icon.a;
			return A3(
				author$project$Internal$Options$styled,
				elm$html$Html$i,
				_List_fromArray(
					[
						author$project$Internal$Options$cs('material-icons mdc-text-field__icon'),
						A2(
						author$project$Internal$Options$when,
						!_Utils_eq(handler, elm$core$Maybe$Nothing),
						author$project$Internal$Options$tabindex(0)),
						A2(
						author$project$Internal$Options$when,
						!_Utils_eq(handler, elm$core$Maybe$Nothing),
						author$project$Internal$Options$role('button')),
						A2(
						elm$core$Maybe$withDefault,
						author$project$Internal$Options$nop,
						A2(elm$core$Maybe$map, author$project$Internal$Options$onClick, handler))
					]),
				_List_fromArray(
					[
						elm$html$Html$text(name)
					]));
		} else {
			return elm$html$Html$text('');
		}
	});
var author$project$Internal$TextField$Model$Blur = {$: 'Blur'};
var author$project$Internal$TextField$Model$Focus = function (a) {
	return {$: 'Focus', a: a};
};
var author$project$Internal$TextField$Model$Input = function (a) {
	return {$: 'Input', a: a};
};
var author$project$Internal$TextField$Model$defaultGeometry = {height: 0, labelWidth: 0, width: 0};
var elm$html$Html$label = _VirtualDom_node('label');
var elm$html$Html$textarea = _VirtualDom_node('textarea');
var elm$html$Html$Attributes$cols = function (n) {
	return A2(
		_VirtualDom_attribute,
		'cols',
		elm$core$String$fromInt(n));
};
var elm$json$Json$Encode$bool = _Json_wrap;
var elm$html$Html$Attributes$boolProperty = F2(
	function (key, bool) {
		return A2(
			_VirtualDom_property,
			key,
			elm$json$Json$Encode$bool(bool));
	});
var elm$html$Html$Attributes$disabled = elm$html$Html$Attributes$boolProperty('disabled');
var elm$virtual_dom$VirtualDom$property = F2(
	function (key, value) {
		return A2(
			_VirtualDom_property,
			_VirtualDom_noInnerHtmlOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlUri(value));
	});
var elm$html$Html$Attributes$property = elm$virtual_dom$VirtualDom$property;
var elm$html$Html$Attributes$rows = function (n) {
	return A2(
		_VirtualDom_attribute,
		'rows',
		elm$core$String$fromInt(n));
};
var elm$html$Html$Attributes$type_ = elm$html$Html$Attributes$stringProperty('type');
var elm$regex$Regex$Match = F4(
	function (match, index, number, submatches) {
		return {index: index, match: match, number: number, submatches: submatches};
	});
var elm$regex$Regex$contains = _Regex_contains;
var elm$regex$Regex$fromStringWith = _Regex_fromStringWith;
var elm$regex$Regex$fromString = function (string) {
	return A2(
		elm$regex$Regex$fromStringWith,
		{caseInsensitive: false, multiline: false},
		string);
};
var author$project$Internal$TextField$Implementation$textField = F5(
	function (domId, lift, model, options, list) {
		var summary = A2(author$project$Internal$Options$collect, author$project$Internal$TextField$Implementation$defaultConfig, options);
		var config = summary.config;
		var focused = model.focused && (!config.disabled);
		var isDirty = model.isDirty || A2(
			elm$core$Maybe$withDefault,
			false,
			A2(
				elm$core$Maybe$map,
				elm$core$Basics$neq(''),
				config.value));
		var htmlLabel = A3(
			author$project$Internal$Options$styled,
			elm$html$Html$label,
			_List_fromArray(
				[
					author$project$Internal$Options$cs('mdc-floating-label'),
					A2(
					author$project$Internal$Options$when,
					focused || isDirty,
					author$project$Internal$Options$cs('mdc-floating-label--float-above')),
					author$project$Internal$Options$for(config.id_)
				]),
			function () {
				var _n1 = config.labelText;
				if (_n1.$ === 'Just') {
					var str = _n1.a;
					return _List_fromArray(
						[
							elm$html$Html$text(str)
						]);
				} else {
					return _List_Nil;
				}
			}());
		var isInvalid = config.invalid || function () {
			var _n0 = config.pattern;
			if (_n0.$ === 'Just') {
				var pattern_ = _n0.a;
				return A2(
					elm$core$Maybe$withDefault,
					false,
					A3(
						elm$core$Maybe$map2,
						function (regex) {
							return A2(
								elm$core$Basics$composeL,
								elm$core$Basics$not,
								elm$regex$Regex$contains(regex));
						},
						elm$regex$Regex$fromString('^' + (pattern_ + '$')),
						model.value));
			} else {
				return false;
			}
		}();
		var leadingIcon_ = A3(author$project$Internal$TextField$Implementation$iconView, lift, config.leadingIcon, config.onLeadingIconClick);
		var trailingIcon_ = A3(author$project$Internal$TextField$Implementation$iconView, lift, config.trailingIcon, config.onTrailingIconClick);
		return A5(
			author$project$Internal$Options$apply,
			summary,
			elm$html$Html$div,
			_List_fromArray(
				[
					author$project$Internal$Options$cs('mdc-text-field'),
					A2(
					author$project$Internal$Options$when,
					focused,
					author$project$Internal$Options$cs('mdc-text-field--focused')),
					A2(
					author$project$Internal$Options$when,
					config.disabled,
					author$project$Internal$Options$cs('mdc-text-field--disabled')),
					A2(
					author$project$Internal$Options$when,
					config.fullWidth,
					author$project$Internal$Options$cs('mdc-text-field--fullwidth')),
					A2(
					author$project$Internal$Options$when,
					isInvalid,
					author$project$Internal$Options$cs('mdc-text-field--invalid')),
					A2(
					author$project$Internal$Options$when,
					config.textarea,
					author$project$Internal$Options$cs('mdc-text-field--textarea')),
					A2(
					author$project$Internal$Options$when,
					config.outlined && (!config.textarea),
					author$project$Internal$Options$cs('mdc-text-field--outlined')),
					A2(
					author$project$Internal$Options$when,
					!_Utils_eq(config.leadingIcon, elm$core$Maybe$Nothing),
					author$project$Internal$Options$cs('mdc-text-field--with-leading-icon')),
					A2(
					author$project$Internal$Options$when,
					!_Utils_eq(config.trailingIcon, elm$core$Maybe$Nothing),
					author$project$Internal$Options$cs('mdc-text-field--with-trailing-icon'))
				]),
			_List_Nil,
			_Utils_ap(
				list,
				_List_fromArray(
					[
						leadingIcon_,
						A4(
						author$project$Internal$Options$applyNativeControl,
						summary,
						config.textarea ? elm$html$Html$textarea : elm$html$Html$input,
						_List_fromArray(
							[
								author$project$Internal$Options$cs('mdc-text-field__input'),
								author$project$Internal$Options$id(config.id_),
								(config.outlined && (!config.textarea)) ? A2(
								author$project$Internal$Options$on,
								'focus',
								A2(
									elm$json$Json$Decode$map,
									A2(elm$core$Basics$composeL, lift, author$project$Internal$TextField$Model$Focus),
									author$project$Internal$TextField$Implementation$decodeGeometry)) : A2(
								author$project$Internal$Options$on,
								'focus',
								elm$json$Json$Decode$succeed(
									lift(
										author$project$Internal$TextField$Model$Focus(author$project$Internal$TextField$Model$defaultGeometry)))),
								author$project$Internal$Options$onBlur(
								lift(author$project$Internal$TextField$Model$Blur)),
								author$project$Internal$Options$onInput(
								A2(elm$core$Basics$composeL, lift, author$project$Internal$TextField$Model$Input)),
								A3(
								elm$core$Basics$composeL,
								A2(
									elm$core$Basics$composeL,
									author$project$Internal$Options$many,
									elm$core$List$map(author$project$Internal$Options$attribute)),
								elm$core$List$filterMap(elm$core$Basics$identity),
								_List_fromArray(
									[
										((!config.textarea) ? elm$core$Maybe$Just : elm$core$Basics$always(elm$core$Maybe$Nothing))(
										elm$html$Html$Attributes$type_(
											A2(elm$core$Maybe$withDefault, 'text', config.type_))),
										(config.disabled ? elm$core$Maybe$Just : elm$core$Basics$always(elm$core$Maybe$Nothing))(
										elm$html$Html$Attributes$disabled(true)),
										(config.required ? elm$core$Maybe$Just : elm$core$Basics$always(elm$core$Maybe$Nothing))(
										A2(
											elm$html$Html$Attributes$property,
											'required',
											elm$json$Json$Encode$bool(true))),
										((!_Utils_eq(config.pattern, elm$core$Maybe$Nothing)) ? elm$core$Maybe$Just : elm$core$Basics$always(elm$core$Maybe$Nothing))(
										A2(
											elm$html$Html$Attributes$property,
											'pattern',
											elm$json$Json$Encode$string(
												A2(elm$core$Maybe$withDefault, '', config.pattern)))),
										((!_Utils_eq(config.value, elm$core$Maybe$Nothing)) ? elm$core$Maybe$Just : elm$core$Basics$always(elm$core$Maybe$Nothing))(
										elm$html$Html$Attributes$value(
											A2(elm$core$Maybe$withDefault, '', config.value)))
									])),
								A2(
								author$project$Internal$Options$when,
								!_Utils_eq(config.placeholder, elm$core$Maybe$Nothing),
								author$project$Internal$Options$attribute(
									elm$html$Html$Attributes$placeholder(
										A2(elm$core$Maybe$withDefault, '', config.placeholder)))),
								A2(
								author$project$Internal$Options$when,
								config.textarea && (!_Utils_eq(config.rows, elm$core$Maybe$Nothing)),
								author$project$Internal$Options$attribute(
									elm$html$Html$Attributes$rows(
										A2(elm$core$Maybe$withDefault, 0, config.rows)))),
								A2(
								author$project$Internal$Options$when,
								config.textarea && (!_Utils_eq(config.cols, elm$core$Maybe$Nothing)),
								author$project$Internal$Options$attribute(
									elm$html$Html$Attributes$cols(
										A2(elm$core$Maybe$withDefault, 0, config.cols))))
							]),
						_List_Nil),
						((!config.fullWidth) && ((!config.outlined) && (!config.textarea))) ? htmlLabel : elm$html$Html$text(''),
						trailingIcon_,
						((!config.outlined) && (!config.textarea)) ? A3(
						author$project$Internal$Options$styled,
						elm$html$Html$div,
						_List_fromArray(
							[
								author$project$Internal$Options$cs('mdc-line-ripple'),
								A2(
								author$project$Internal$Options$when,
								model.focused,
								author$project$Internal$Options$cs('mdc-line-ripple--active'))
							]),
						_List_Nil) : elm$html$Html$text(''),
						(config.outlined || config.textarea) ? A3(
						author$project$Internal$Options$styled,
						elm$html$Html$div,
						_List_fromArray(
							[
								author$project$Internal$Options$cs('mdc-notched-outline'),
								A2(
								author$project$Internal$Options$when,
								focused || isDirty,
								author$project$Internal$Options$cs('mdc-notched-outline--notched'))
							]),
						_List_fromArray(
							[
								A3(
								author$project$Internal$Options$styled,
								elm$html$Html$div,
								_List_fromArray(
									[
										author$project$Internal$Options$cs('mdc-notched-outline__leading')
									]),
								_List_Nil),
								A3(
								author$project$Internal$Options$styled,
								elm$html$Html$div,
								_List_fromArray(
									[
										author$project$Internal$Options$cs('mdc-notched-outline__notch')
									]),
								_List_fromArray(
									[htmlLabel])),
								A3(
								author$project$Internal$Options$styled,
								elm$html$Html$div,
								_List_fromArray(
									[
										author$project$Internal$Options$cs('mdc-notched-outline__trailing')
									]),
								_List_Nil)
							])) : elm$html$Html$text('')
					])));
	});
var author$project$Internal$TextField$Implementation$view = F4(
	function (lift, domId, store, options) {
		return A7(
			author$project$Internal$Component$render,
			author$project$Internal$TextField$Implementation$getSet.get,
			author$project$Internal$TextField$Implementation$textField(domId),
			author$project$Internal$Msg$TextFieldMsg,
			lift,
			domId,
			store,
			A2(
				elm$core$List$cons,
				author$project$Internal$Options$internalId(domId),
				options));
	});
var author$project$Material$TextField$view = author$project$Internal$TextField$Implementation$view;
var author$project$Form$viewInputString = F4(
	function (lift, mdc, id, value) {
		return A5(
			author$project$Material$TextField$view,
			A2(elm$core$Basics$composeL, lift, author$project$Form$Mdc),
			'form-string-' + Chadtech$elm_relational_database$Id$toString(id),
			mdc,
			_List_fromArray(
				[
					author$project$Material$TextField$label('Text field'),
					author$project$Material$Options$onInput(
					A2(elm$core$Basics$composeL, lift, author$project$Form$Change)),
					author$project$Material$TextField$value(value)
				]),
			_List_Nil);
	});
var author$project$Form$view = F5(
	function (lift, mdc, id, formtype, value) {
		switch (formtype.$) {
			case 'InputString':
				return A4(author$project$Form$viewInputString, lift, mdc, id, value);
			case 'InputNumber':
				var n = formtype.a;
				return A5(author$project$Form$viewInputNumber, lift, mdc, id, value, n);
			default:
				return A4(author$project$Form$viewInputChoice, lift, mdc, id, value);
		}
	});
var author$project$Internal$LayoutGrid$Implementation$alignLeft = author$project$Internal$Options$cs('mdc-layout-grid--align-left');
var author$project$Material$LayoutGrid$alignLeft = author$project$Internal$LayoutGrid$Implementation$alignLeft;
var author$project$Internal$LayoutGrid$Implementation$alignRight = author$project$Internal$Options$cs('mdc-layout-grid--align-right');
var author$project$Material$LayoutGrid$alignRight = author$project$Internal$LayoutGrid$Implementation$alignRight;
var author$project$Internal$LayoutGrid$Implementation$span2Phone = A2(
	author$project$Internal$LayoutGrid$Implementation$span,
	elm$core$Maybe$Just('phone'),
	2);
var author$project$Material$LayoutGrid$span2Phone = author$project$Internal$LayoutGrid$Implementation$span2Phone;
var author$project$Internal$LayoutGrid$Implementation$span4Tablet = A2(
	author$project$Internal$LayoutGrid$Implementation$span,
	elm$core$Maybe$Just('tablet'),
	4);
var author$project$Material$LayoutGrid$span4Tablet = author$project$Internal$LayoutGrid$Implementation$span4Tablet;
var author$project$Internal$LayoutGrid$Implementation$span6Desktop = A2(
	author$project$Internal$LayoutGrid$Implementation$span,
	elm$core$Maybe$Just('desktop'),
	6);
var author$project$Material$LayoutGrid$span6Desktop = author$project$Internal$LayoutGrid$Implementation$span6Desktop;
var author$project$Page$Code$Change = F2(
	function (a, b) {
		return {$: 'Change', a: a, b: b};
	});
var author$project$Page$Code$msgAdapt = F2(
	function (aid, msg) {
		if (msg.$ === 'Change') {
			var str = msg.a;
			return A2(author$project$Page$Code$Change, aid, str);
		} else {
			var msg_ = msg.a;
			return author$project$Page$Code$Mdc(msg_);
		}
	});
var author$project$Page$Code$viewFormElement = F4(
	function (lift, model, _n0, _n1) {
		var qid = _n0.a;
		var question = _n0.b;
		var aid = _n1.a;
		var answer = _n1.b;
		return A2(
			author$project$Material$LayoutGrid$inner,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					author$project$Material$LayoutGrid$cell,
					_List_fromArray(
						[author$project$Material$LayoutGrid$span2Phone, author$project$Material$LayoutGrid$span4Tablet, author$project$Material$LayoutGrid$span6Desktop, author$project$Material$LayoutGrid$alignRight, author$project$Material$LayoutGrid$alignMiddle]),
					_List_fromArray(
						[
							elm$html$Html$text(question.text)
						])),
					A2(
					author$project$Material$LayoutGrid$cell,
					_List_fromArray(
						[author$project$Material$LayoutGrid$span2Phone, author$project$Material$LayoutGrid$span4Tablet, author$project$Material$LayoutGrid$span6Desktop, author$project$Material$LayoutGrid$alignLeft]),
					_List_fromArray(
						[
							A5(
							author$project$Form$view,
							A2(
								elm$core$Basics$composeL,
								lift,
								author$project$Page$Code$msgAdapt(aid)),
							model.mdc,
							qid,
							question.input_type,
							answer.value)
						]))
				]));
	});
var author$project$Page$Code$viewFormElements = F3(
	function (lift, mdc, list) {
		return A2(
			elm$html$Html$div,
			_List_Nil,
			A2(
				elm$core$List$map,
				function (_n0) {
					var a = _n0.a;
					var b = _n0.b;
					return A4(author$project$Page$Code$viewFormElement, lift, mdc, a, b);
				},
				list));
	});
var elm$core$Set$Set_elm_builtin = function (a) {
	return {$: 'Set_elm_builtin', a: a};
};
var elm$core$Set$empty = elm$core$Set$Set_elm_builtin(elm$core$Dict$empty);
var elm$core$Set$insert = F2(
	function (key, _n0) {
		var dict = _n0.a;
		return elm$core$Set$Set_elm_builtin(
			A3(elm$core$Dict$insert, key, _Utils_Tuple0, dict));
	});
var elm$core$Dict$member = F2(
	function (key, dict) {
		var _n0 = A2(elm$core$Dict$get, key, dict);
		if (_n0.$ === 'Just') {
			return true;
		} else {
			return false;
		}
	});
var elm$core$Set$member = F2(
	function (key, _n0) {
		var dict = _n0.a;
		return A2(elm$core$Dict$member, key, dict);
	});
var elm_community$list_extra$List$Extra$uniqueHelp = F4(
	function (f, existing, remaining, accumulator) {
		uniqueHelp:
		while (true) {
			if (!remaining.b) {
				return elm$core$List$reverse(accumulator);
			} else {
				var first = remaining.a;
				var rest = remaining.b;
				var computedFirst = f(first);
				if (A2(elm$core$Set$member, computedFirst, existing)) {
					var $temp$f = f,
						$temp$existing = existing,
						$temp$remaining = rest,
						$temp$accumulator = accumulator;
					f = $temp$f;
					existing = $temp$existing;
					remaining = $temp$remaining;
					accumulator = $temp$accumulator;
					continue uniqueHelp;
				} else {
					var $temp$f = f,
						$temp$existing = A2(elm$core$Set$insert, computedFirst, existing),
						$temp$remaining = rest,
						$temp$accumulator = A2(elm$core$List$cons, first, accumulator);
					f = $temp$f;
					existing = $temp$existing;
					remaining = $temp$remaining;
					accumulator = $temp$accumulator;
					continue uniqueHelp;
				}
			}
		}
	});
var elm_community$list_extra$List$Extra$unique = function (list) {
	return A4(elm_community$list_extra$List$Extra$uniqueHelp, elm$core$Basics$identity, elm$core$Set$empty, list, _List_Nil);
};
var elm_community$maybe_extra$Maybe$Extra$foldrValues = F2(
	function (item, list) {
		if (item.$ === 'Nothing') {
			return list;
		} else {
			var v = item.a;
			return A2(elm$core$List$cons, v, list);
		}
	});
var elm_community$maybe_extra$Maybe$Extra$values = A2(elm$core$List$foldr, elm_community$maybe_extra$Maybe$Extra$foldrValues, _List_Nil);
var author$project$Page$Code$viewCodingForm = F4(
	function (lift, mdc, answers, questions) {
		var f = function (_n7) {
			var a = _n7.a;
			var b = _n7.b;
			if (a.$ === 'Just') {
				var value = a.a;
				return elm$core$Maybe$Just(
					_Utils_Tuple2(value, b));
			} else {
				return elm$core$Maybe$Nothing;
			}
		};
		var res = elm_community$maybe_extra$Maybe$Extra$values(
			A2(
				elm$core$List$map,
				f,
				A2(
					elm$core$List$map,
					function (_n5) {
						var a = _n5.a;
						var b = _n5.b;
						return _Utils_Tuple2(
							elm$core$Result$toMaybe(a),
							b);
					},
					A2(
						elm$core$List$map,
						function (d) {
							return _Utils_Tuple2(
								A3(
									author$project$Db$Extra$get,
									questions,
									function (c) {
										return c.coding_question;
									},
									d),
								d);
						},
						answers))));
		var types = elm_community$list_extra$List$Extra$unique(
			A2(
				elm$core$List$map,
				function (_n2) {
					var a = _n2.a;
					var b = _n2.b;
					return author$project$Form$inputTypeToComparable(a);
				},
				A2(
					elm$core$List$map,
					function (_n3) {
						var _n4 = _n3.a;
						var id = _n4.a;
						var a = _n4.b;
						var b = _n3.b;
						return _Utils_Tuple2(a.input_type, b);
					},
					res)));
		return A2(
			elm$core$List$map,
			A2(author$project$Page$Code$viewFormElements, lift, mdc),
			A2(
				elm$core$List$map,
				function (x) {
					return A2(
						elm$core$List$filter,
						function (_n0) {
							var _n1 = _n0.a;
							var id = _n1.a;
							var a = _n1.b;
							return _Utils_eq(
								author$project$Form$inputTypeToComparable(a.input_type),
								x);
						},
						res);
				},
				types));
	});
var author$project$Data$Answer = function (a) {
	return {$: 'Answer', a: a};
};
var author$project$Data$Next = {$: 'Next'};
var author$project$Data$Access$has_next_coding_frame = F2(
	function (model, coding) {
		return A2(
			elm$core$Debug$log,
			'CodingFrame',
			_Utils_cmp(
				A2(
					elm$core$Maybe$withDefault,
					0,
					A2(author$project$Data$Access$current_codingFrame_index, model, coding)),
				A2(author$project$Data$Access$max_coding_frame_index, model, coding)) < 0);
	});
var author$project$Internal$Button$Implementation$onClick = function (handler) {
	return author$project$Internal$Options$option(
		function (options) {
			return _Utils_update(
				options,
				{
					onClick: elm$core$Maybe$Just(handler)
				});
		});
};
var author$project$Material$Button$onClick = author$project$Internal$Button$Implementation$onClick;
var author$project$Internal$Button$Implementation$outlined = author$project$Internal$Options$cs('mdc-button--outlined');
var author$project$Material$Button$outlined = author$project$Internal$Button$Implementation$outlined;
var author$project$Internal$Button$Implementation$ripple = author$project$Internal$Options$option(
	function (options) {
		return _Utils_update(
			options,
			{ripple: true});
	});
var author$project$Material$Button$ripple = author$project$Internal$Button$Implementation$ripple;
var author$project$Internal$Button$Implementation$defaultConfig = {disabled: false, icon: elm$core$Maybe$Nothing, link: elm$core$Maybe$Nothing, onClick: elm$core$Maybe$Nothing, ripple: false, trailingIcon: false};
var author$project$Internal$Button$Model$Click = F2(
	function (a, b) {
		return {$: 'Click', a: a, b: b};
	});
var author$project$Internal$Icon$Implementation$defaultConfig = {node: 'i'};
var author$project$Internal$Options$aria = F2(
	function (key, val) {
		return author$project$Internal$Options$Attribute(
			A2(elm$html$Html$Attributes$attribute, 'aria-' + key, val));
	});
var elm$virtual_dom$VirtualDom$node = function (tag) {
	return _VirtualDom_node(
		_VirtualDom_noScript(tag));
};
var elm$html$Html$node = elm$virtual_dom$VirtualDom$node;
var author$project$Internal$Icon$Implementation$view = F2(
	function (options, name) {
		var summary = A2(author$project$Internal$Options$collect, author$project$Internal$Icon$Implementation$defaultConfig, options);
		var config = summary.config;
		return A5(
			author$project$Internal$Options$apply,
			summary,
			elm$html$Html$node(config.node),
			_List_fromArray(
				[
					author$project$Internal$Options$cs('material-icons'),
					A2(author$project$Internal$Options$aria, 'hidden', 'true')
				]),
			_List_Nil,
			_List_fromArray(
				[
					elm$html$Html$text(name)
				]));
	});
var author$project$Internal$Options$data = F2(
	function (key, val) {
		return author$project$Internal$Options$Attribute(
			A2(elm$html$Html$Attributes$attribute, 'data-' + key, val));
	});
var author$project$Material$Options$data = author$project$Internal$Options$data;
var author$project$Material$Options$many = author$project$Internal$Options$many;
var author$project$Material$Options$on = author$project$Internal$Options$on;
var author$project$Internal$GlobalEvents$listener = F2(
	function (name, decoder) {
		return author$project$Material$Options$many(
			_List_fromArray(
				[
					A2(author$project$Material$Options$on, name, decoder),
					A2(author$project$Material$Options$data, name, '{}')
				]));
	});
var author$project$Internal$GlobalEvents$onMouseUp = author$project$Internal$GlobalEvents$listener('globalmouseup');
var author$project$Internal$GlobalEvents$onPointerUp = author$project$Internal$GlobalEvents$listener('globalpointerup');
var author$project$Internal$GlobalEvents$onTick = author$project$Internal$GlobalEvents$listener('globaltick');
var author$project$Internal$GlobalEvents$onTouchEnd = author$project$Internal$GlobalEvents$listener('globaltouchend');
var author$project$Internal$Ripple$Model$strings = {varFgScale: '--mdc-ripple-fg-scale', varFgSize: '--mdc-ripple-fg-size', varFgTranslateEnd: '--mdc-ripple-fg-translate-end', varFgTranslateStart: '--mdc-ripple-fg-translate-start', varLeft: '--mdc-ripple-left', varTop: '--mdc-ripple-top'};
var elm$core$Basics$round = _Basics_round;
var author$project$Internal$Ripple$Implementation$cssVariables = F2(
	function (isUnbounded, _n0) {
		var fgScale = _n0.fgScale;
		var translateStart = _n0.translateStart;
		var translateEnd = _n0.translateEnd;
		var initialSize = _n0.initialSize;
		var frame = _n0.frame;
		var unboundedCoords = isUnbounded ? {
			left: elm$core$Basics$round((frame.width - initialSize) / 2),
			top: elm$core$Basics$round((frame.height - initialSize) / 2)
		} : {left: 0, top: 0};
		var fgSize = elm$core$String$fromInt(initialSize) + 'px';
		var variables = elm$core$List$concat(
			_List_fromArray(
				[
					_List_fromArray(
					[
						A2(author$project$Internal$Options$css, author$project$Internal$Ripple$Model$strings.varFgSize, fgSize),
						A2(
						author$project$Internal$Options$css,
						author$project$Internal$Ripple$Model$strings.varFgScale,
						elm$core$String$fromFloat(fgScale))
					]),
					isUnbounded ? _List_fromArray(
					[
						A2(
						author$project$Internal$Options$css,
						author$project$Internal$Ripple$Model$strings.varTop,
						elm$core$String$fromFloat(unboundedCoords.top) + 'px'),
						A2(
						author$project$Internal$Options$css,
						author$project$Internal$Ripple$Model$strings.varLeft,
						elm$core$String$fromFloat(unboundedCoords.left) + 'px')
					]) : _List_fromArray(
					[
						A2(author$project$Internal$Options$css, author$project$Internal$Ripple$Model$strings.varFgTranslateStart, translateStart),
						A2(author$project$Internal$Options$css, author$project$Internal$Ripple$Model$strings.varFgTranslateEnd, translateEnd)
					])
				]));
		return variables;
	});
var author$project$Internal$Ripple$Model$Activate0 = F2(
	function (a, b) {
		return {$: 'Activate0', a: a, b: b};
	});
var author$project$Internal$Ripple$Model$Event = F2(
	function (eventType, pagePoint) {
		return {eventType: eventType, pagePoint: pagePoint};
	});
var elm$json$Json$Decode$list = _Json_decodeList;
var author$project$Internal$Ripple$Implementation$decodeActivate = function (_n0) {
	var domId = _n0.domId;
	var isUnbounded = _n0.isUnbounded;
	var isActivated = _n0.isActivated;
	var previousActivationEvent = _n0.previousActivationEvent;
	var decodePagePoint = A3(
		elm$json$Json$Decode$map2,
		F2(
			function (pageX, pageY) {
				return {pageX: pageX, pageY: pageY};
			}),
		A2(
			elm$json$Json$Decode$at,
			_List_fromArray(
				['pageX']),
			elm$json$Json$Decode$float),
		A2(
			elm$json$Json$Decode$at,
			_List_fromArray(
				['pageY']),
			elm$json$Json$Decode$float));
	var firstChangedTouch = A2(
		elm$json$Json$Decode$andThen,
		function (changedTouches) {
			var _n3 = elm$core$List$head(changedTouches);
			if (_n3.$ === 'Just') {
				var pagePoint = _n3.a;
				return elm$json$Json$Decode$succeed(pagePoint);
			} else {
				return elm$json$Json$Decode$fail('');
			}
		},
		A2(
			elm$json$Json$Decode$at,
			_List_fromArray(
				['changedTouches']),
			elm$json$Json$Decode$list(decodePagePoint)));
	var decodeIsSurfaceDisabled = elm$json$Json$Decode$oneOf(
		_List_fromArray(
			[
				A2(
				elm$json$Json$Decode$map,
				elm$core$Basics$always(true),
				A2(
					elm$json$Json$Decode$at,
					_List_fromArray(
						['disabled']),
					elm$json$Json$Decode$string)),
				elm$json$Json$Decode$succeed(false)
			]));
	var decodeEventType = A2(
		elm$json$Json$Decode$at,
		_List_fromArray(
			['type']),
		elm$json$Json$Decode$string);
	var decodeIsSameInteraction = function () {
		if (previousActivationEvent.$ === 'Nothing') {
			return elm$json$Json$Decode$succeed(false);
		} else {
			var event = previousActivationEvent.a;
			return A2(
				elm$json$Json$Decode$map,
				elm$core$Basics$eq(event.eventType),
				decodeEventType);
		}
	}();
	var decodeEvent = A2(
		elm$json$Json$Decode$andThen,
		function (eventType) {
			if (eventType === 'touchstart') {
				return A2(
					elm$json$Json$Decode$map,
					author$project$Internal$Ripple$Model$Event(eventType),
					firstChangedTouch);
			} else {
				return A2(
					elm$json$Json$Decode$map,
					author$project$Internal$Ripple$Model$Event(eventType),
					decodePagePoint);
			}
		},
		decodeEventType);
	return A2(
		elm$json$Json$Decode$andThen,
		A2(
			elm$core$Basics$composeR,
			elm$core$Maybe$map(elm$json$Json$Decode$succeed),
			elm$core$Maybe$withDefault(
				elm$json$Json$Decode$fail(''))),
		A4(
			elm$json$Json$Decode$map3,
			F3(
				function (isSurfaceDisabled, isSameInteraction, event) {
					return (isActivated || (isSurfaceDisabled || isSameInteraction)) ? elm$core$Maybe$Nothing : elm$core$Maybe$Just(
						A2(
							author$project$Internal$Ripple$Model$Activate0,
							domId,
							{event: event, isSurfaceDisabled: false, isUnbounded: isUnbounded, wasElementMadeActive: false}));
				}),
			decodeIsSurfaceDisabled,
			decodeIsSameInteraction,
			decodeEvent));
};
var author$project$Internal$Ripple$Model$ClientRect = F4(
	function (top, left, width, height) {
		return {height: height, left: left, top: top, width: width};
	});
var debois$elm_dom$DOM$offsetLeft = A2(elm$json$Json$Decode$field, 'offsetLeft', elm$json$Json$Decode$float);
var debois$elm_dom$DOM$offsetTop = A2(elm$json$Json$Decode$field, 'offsetTop', elm$json$Json$Decode$float);
var elm$json$Json$Decode$map4 = _Json_map4;
var author$project$Internal$Ripple$Implementation$decodeClientRect = debois$elm_dom$DOM$target(
	A5(elm$json$Json$Decode$map4, author$project$Internal$Ripple$Model$ClientRect, debois$elm_dom$DOM$offsetTop, debois$elm_dom$DOM$offsetLeft, debois$elm_dom$DOM$offsetWidth, debois$elm_dom$DOM$offsetHeight));
var author$project$Internal$Ripple$Model$Blur = {$: 'Blur'};
var author$project$Internal$Ripple$Model$Deactivate = {$: 'Deactivate'};
var author$project$Internal$Ripple$Model$Focus = {$: 'Focus'};
var author$project$Internal$Ripple$Model$SetCssVariables = F2(
	function (a, b) {
		return {$: 'SetCssVariables', a: a, b: b};
	});
var author$project$Internal$Ripple$Model$activationEventTypes = _List_fromArray(
	['touchstart', 'pointerdown', 'mousedown']);
var author$project$Internal$Ripple$Model$cssClasses = {bgFocused: 'mdc-ripple-upgraded--background-focused', fgActivation: 'mdc-ripple-upgraded--foreground-activation', fgDeactivation: 'mdc-ripple-upgraded--foreground-deactivation', root: 'mdc-ripple-upgraded', unbounded: 'mdc-ripple-upgraded--unbounded'};
var author$project$Internal$Ripple$Implementation$view = F5(
	function (isUnbounded, domId, lift, model, options) {
		var noStyle = elm$html$Html$text('');
		var focusHandler = A2(
			author$project$Internal$Options$on,
			'focus',
			elm$json$Json$Decode$succeed(
				lift(author$project$Internal$Ripple$Model$Focus)));
		var deactivateHandler = function (event) {
			var deactivate = elm$json$Json$Decode$succeed(
				lift(author$project$Internal$Ripple$Model$Deactivate));
			return author$project$Internal$Options$many(
				_List_fromArray(
					[
						author$project$Internal$GlobalEvents$onTouchEnd(deactivate),
						author$project$Internal$GlobalEvents$onMouseUp(deactivate),
						author$project$Internal$GlobalEvents$onPointerUp(deactivate)
					]));
		};
		var blurHandler = A2(
			author$project$Internal$Options$on,
			'blur',
			elm$json$Json$Decode$succeed(
				lift(author$project$Internal$Ripple$Model$Blur)));
		var baseProperties = author$project$Internal$Options$many(
			_List_fromArray(
				[
					author$project$Internal$Options$id(domId),
					author$project$Internal$Options$cs(author$project$Internal$Ripple$Model$cssClasses.root),
					A2(
					author$project$Internal$Options$when,
					isUnbounded,
					author$project$Internal$Options$cs(author$project$Internal$Ripple$Model$cssClasses.unbounded)),
					model.focused ? author$project$Internal$Options$cs(author$project$Internal$Ripple$Model$cssClasses.bgFocused) : author$project$Internal$Options$nop
				]));
		var baseInteractionHandler = author$project$Internal$Options$many(
			_List_fromArray(
				[focusHandler, blurHandler]));
		var activateHandler = author$project$Internal$Options$many(
			A2(
				elm$core$List$map,
				function (tipe) {
					return A2(
						author$project$Internal$Options$on,
						tipe,
						A2(
							elm$json$Json$Decode$map,
							lift,
							author$project$Internal$Ripple$Implementation$decodeActivate(
								{
									domId: domId,
									isActivated: function () {
										var _n3 = model.animationState;
										if (_n3.$ === 'Activated') {
											var activationState = _n3.a;
											return !activationState.deactivated;
										} else {
											return false;
										}
									}(),
									isUnbounded: isUnbounded,
									previousActivationEvent: function () {
										var _n4 = model.animationState;
										if (_n4.$ === 'Activated') {
											var activationEvent = _n4.a.activationEvent;
											return elm$core$Maybe$Just(activationEvent);
										} else {
											return elm$core$Maybe$Nothing;
										}
									}()
								})));
				},
				author$project$Internal$Ripple$Model$activationEventTypes));
		var _n0 = model.animationState;
		switch (_n0.$) {
			case 'Idle':
				var interactionHandler = author$project$Internal$Options$many(
					_List_fromArray(
						[baseInteractionHandler, activateHandler]));
				var cssVars = function () {
					var _n1 = model.clientRect;
					if (_n1.$ === 'Just') {
						var clientRect = _n1.a;
						var _n2 = A2(author$project$Internal$Ripple$Implementation$layoutInternal, isUnbounded, clientRect);
						var fgScale = _n2.fgScale;
						var initialSize = _n2.initialSize;
						return A2(
							author$project$Internal$Ripple$Implementation$cssVariables,
							isUnbounded,
							{fgScale: fgScale, frame: clientRect, initialSize: initialSize, translateEnd: '0px', translateStart: '0px'});
					} else {
						return _List_Nil;
					}
				}();
				var properties = author$project$Internal$Options$many(
					_List_fromArray(
						[
							baseProperties,
							author$project$Internal$Options$many(cssVars),
							A2(
							author$project$Internal$Options$when,
							_Utils_eq(model.clientRect, elm$core$Maybe$Nothing),
							author$project$Internal$GlobalEvents$onTick(
								A2(
									elm$json$Json$Decode$map,
									A2(
										elm$core$Basics$composeL,
										lift,
										author$project$Internal$Ripple$Model$SetCssVariables(isUnbounded)),
									author$project$Internal$Ripple$Implementation$decodeClientRect)))
						]));
				return {interactionHandler: interactionHandler, properties: properties, style: noStyle};
			case 'Activated':
				var activatedData = _n0.a;
				var interactionHandler = author$project$Internal$Options$many(
					_List_fromArray(
						[
							baseInteractionHandler,
							activateHandler,
							deactivateHandler(activatedData.activationEvent)
						]));
				var cssVars = A2(
					author$project$Internal$Ripple$Implementation$cssVariables,
					isUnbounded,
					{fgScale: activatedData.fgScale, frame: activatedData.frame, initialSize: activatedData.initialSize, translateEnd: activatedData.translateEnd, translateStart: activatedData.translateStart});
				var properties = author$project$Internal$Options$many(
					_List_fromArray(
						[
							baseProperties,
							author$project$Internal$Options$many(cssVars),
							author$project$Internal$Options$cs(author$project$Internal$Ripple$Model$cssClasses.fgActivation),
							A2(
							author$project$Internal$Options$when,
							isUnbounded,
							A2(author$project$Internal$Options$data, 'mdc-ripple-is-unbounded', '1'))
						]));
				return {interactionHandler: interactionHandler, properties: properties, style: noStyle};
			default:
				var activatedData = _n0.a;
				var interactionHandler = author$project$Internal$Options$many(
					_List_fromArray(
						[baseInteractionHandler, activateHandler]));
				var cssVars = A2(
					author$project$Internal$Ripple$Implementation$cssVariables,
					isUnbounded,
					{fgScale: activatedData.fgScale, frame: activatedData.frame, initialSize: activatedData.initialSize, translateEnd: activatedData.translateEnd, translateStart: activatedData.translateStart});
				var properties = author$project$Internal$Options$many(
					_List_fromArray(
						[
							baseProperties,
							author$project$Internal$Options$many(cssVars),
							author$project$Internal$Options$cs(author$project$Internal$Ripple$Model$cssClasses.fgDeactivation)
						]));
				return {interactionHandler: interactionHandler, properties: properties, style: noStyle};
		}
	});
var elm$html$Html$a = _VirtualDom_node('a');
var elm$html$Html$button = _VirtualDom_node('button');
var elm$html$Html$Attributes$href = function (url) {
	return A2(
		elm$html$Html$Attributes$stringProperty,
		'href',
		_VirtualDom_noJavaScriptUri(url));
};
var author$project$Internal$Button$Implementation$button = F5(
	function (domId, lift, model, options, nodes) {
		var rippleInterface = A5(
			author$project$Internal$Ripple$Implementation$view,
			false,
			domId,
			A2(elm$core$Basics$composeL, lift, author$project$Internal$Button$Model$RippleMsg),
			model.ripple,
			_List_Nil);
		var summary = A2(author$project$Internal$Options$collect, author$project$Internal$Button$Implementation$defaultConfig, options);
		var config = summary.config;
		return A5(
			author$project$Internal$Options$apply,
			summary,
			(!_Utils_eq(config.link, elm$core$Maybe$Nothing)) ? elm$html$Html$a : elm$html$Html$button,
			_List_fromArray(
				[
					author$project$Internal$Options$cs('mdc-button'),
					author$project$Internal$Options$cs('mdc-js-button'),
					A2(
					author$project$Internal$Options$when,
					summary.config.ripple,
					author$project$Internal$Options$cs('mdc-js-ripple-effect')),
					A2(
					author$project$Internal$Options$when,
					(!_Utils_eq(config.link, elm$core$Maybe$Nothing)) && (!config.disabled),
					author$project$Internal$Options$attribute(
						elm$html$Html$Attributes$href(
							A2(elm$core$Maybe$withDefault, '', config.link)))),
					A2(
					author$project$Internal$Options$when,
					config.disabled,
					author$project$Internal$Options$attribute(
						elm$html$Html$Attributes$disabled(true))),
					A2(
					author$project$Internal$Options$when,
					config.disabled,
					author$project$Internal$Options$cs('mdc-button--disabled')),
					A3(
					elm$core$Basics$composeL,
					author$project$Internal$Options$when(config.ripple),
					author$project$Internal$Options$many,
					_List_fromArray(
						[rippleInterface.interactionHandler, rippleInterface.properties])),
					A2(
					elm$core$Maybe$withDefault,
					author$project$Internal$Options$nop,
					A2(
						elm$core$Maybe$map,
						A2(
							elm$core$Basics$composeL,
							A2(elm$core$Basics$composeL, author$project$Internal$Options$onClick, lift),
							author$project$Internal$Button$Model$Click(config.ripple)),
						config.onClick))
				]),
			_List_Nil,
			elm$core$List$concat(
				_List_fromArray(
					[
						(!config.trailingIcon) ? A2(
						elm$core$Maybe$withDefault,
						_List_Nil,
						A2(
							elm$core$Maybe$map,
							function (icon_) {
								return _List_fromArray(
									[
										A2(
										author$project$Internal$Icon$Implementation$view,
										_List_fromArray(
											[
												author$project$Internal$Options$cs('mdc-button__icon')
											]),
										icon_)
									]);
							},
							config.icon)) : _List_Nil,
						nodes,
						config.trailingIcon ? A2(
						elm$core$Maybe$withDefault,
						_List_Nil,
						A2(
							elm$core$Maybe$map,
							function (icon_) {
								return _List_fromArray(
									[
										A2(
										author$project$Internal$Icon$Implementation$view,
										_List_fromArray(
											[
												author$project$Internal$Options$cs('mdc-button__icon')
											]),
										icon_)
									]);
							},
							config.icon)) : _List_Nil
					])));
	});
var author$project$Internal$Button$Implementation$view = F2(
	function (lift, index) {
		return A5(
			author$project$Internal$Component$render,
			author$project$Internal$Button$Implementation$getSet.get,
			author$project$Internal$Button$Implementation$button(index),
			author$project$Internal$Msg$ButtonMsg,
			lift,
			index);
	});
var author$project$Material$Button$view = author$project$Internal$Button$Implementation$view;
var author$project$Internal$Icon$Implementation$size48 = A2(author$project$Internal$Options$css, 'font-size', '48px');
var author$project$Material$Icon$size48 = author$project$Internal$Icon$Implementation$size48;
var author$project$Material$Icon$view = author$project$Internal$Icon$Implementation$view;
var author$project$Page$Code$Click = F3(
	function (a, b, c) {
		return {$: 'Click', a: a, b: b, c: c};
	});
var author$project$Page$Code$viewNextAnswer = F6(
	function (lift, mdc, data, _n0, cur, max) {
		var id = _n0.a;
		var coding = _n0.b;
		var _n1 = A2(
			author$project$Data$Access$has_next_coding_frame,
			data,
			_Utils_Tuple2(id, coding));
		if (!_n1) {
			return A2(elm$html$Html$div, _List_Nil, _List_Nil);
		} else {
			return A5(
				author$project$Material$Button$view,
				A2(elm$core$Basics$composeL, lift, author$project$Page$Code$Mdc),
				'navigation-side-next-answer',
				mdc,
				_List_fromArray(
					[
						author$project$Material$Button$ripple,
						A2(author$project$Material$Options$css, 'height', '64px'),
						A2(author$project$Material$Options$css, 'width', '64px'),
						author$project$Material$Button$outlined,
						A2(author$project$Material$Options$css, 'border-radius', '32px'),
						author$project$Material$Button$onClick(
						A2(
							elm$core$Basics$composeL,
							lift,
							A2(
								author$project$Page$Code$Click,
								author$project$Data$Next,
								author$project$Data$Answer(elm$core$Maybe$Nothing)))(
							_Utils_Tuple2(id, coding)))
					]),
				_List_fromArray(
					[
						A2(
						author$project$Material$Icon$view,
						_List_fromArray(
							[author$project$Material$Icon$size48]),
						'navigate_next')
					]));
		}
	});
var author$project$Data$Question = function (a) {
	return {$: 'Question', a: a};
};
var author$project$Internal$Icon$Implementation$size24 = A2(author$project$Internal$Options$css, 'font-size', '24px');
var author$project$Material$Icon$size24 = author$project$Internal$Icon$Implementation$size24;
var author$project$Page$Code$viewNextQuestion = F5(
	function (lift, mdc, _n0, cur, max) {
		var id = _n0.a;
		var coding = _n0.b;
		var _n1 = _Utils_eq(cur, max);
		if (_n1) {
			return A2(elm$html$Html$div, _List_Nil, _List_Nil);
		} else {
			return A5(
				author$project$Material$Button$view,
				A2(elm$core$Basics$composeL, lift, author$project$Page$Code$Mdc),
				'navigation-side-next-question',
				mdc,
				_List_fromArray(
					[
						A2(author$project$Material$Options$css, 'height', '48px'),
						A2(author$project$Material$Options$css, 'width', '48px'),
						A2(author$project$Material$Options$css, 'border-radius', '24px'),
						author$project$Material$Button$onClick(
						A2(
							elm$core$Basics$composeL,
							lift,
							A2(
								author$project$Page$Code$Click,
								author$project$Data$Next,
								author$project$Data$Question(elm$core$Maybe$Nothing)))(
							_Utils_Tuple2(id, coding)))
					]),
				_List_fromArray(
					[
						A2(
						author$project$Material$Icon$view,
						_List_fromArray(
							[author$project$Material$Icon$size24]),
						'navigate_next')
					]));
		}
	});
var author$project$Data$Previous = {$: 'Previous'};
var author$project$Data$Access$has_previous_coding_frame = F2(
	function (model, coding) {
		var _n0 = A2(author$project$Data$Access$current_codingFrame_index, model, coding);
		if (_n0.$ === 'Nothing') {
			return false;
		} else {
			if (!_n0.a) {
				return false;
			} else {
				return true;
			}
		}
	});
var author$project$Page$Code$viewPreviousAnswer = F6(
	function (lift, mdc, data, _n0, cur, max) {
		var id = _n0.a;
		var coding = _n0.b;
		var _n1 = A2(
			author$project$Data$Access$has_previous_coding_frame,
			data,
			_Utils_Tuple2(id, coding));
		if (!_n1) {
			return A2(elm$html$Html$div, _List_Nil, _List_Nil);
		} else {
			return A5(
				author$project$Material$Button$view,
				A2(elm$core$Basics$composeL, lift, author$project$Page$Code$Mdc),
				'navigation-side-prev-answer',
				mdc,
				_List_fromArray(
					[
						author$project$Material$Button$ripple,
						A2(author$project$Material$Options$css, 'height', '64px'),
						A2(author$project$Material$Options$css, 'width', '64px'),
						author$project$Material$Button$outlined,
						A2(author$project$Material$Options$css, 'border-radius', '32px'),
						author$project$Material$Button$onClick(
						A2(
							elm$core$Basics$composeL,
							lift,
							A2(
								author$project$Page$Code$Click,
								author$project$Data$Previous,
								author$project$Data$Answer(elm$core$Maybe$Nothing)))(
							_Utils_Tuple2(id, coding)))
					]),
				_List_fromArray(
					[
						A2(
						author$project$Material$Icon$view,
						_List_fromArray(
							[author$project$Material$Icon$size48]),
						'navigate_before')
					]));
		}
	});
var author$project$Page$Code$viewPreviousQuestion = F5(
	function (lift, mdc, _n0, cur, max) {
		var id = _n0.a;
		var coding = _n0.b;
		if (!cur) {
			return A2(elm$html$Html$div, _List_Nil, _List_Nil);
		} else {
			return A5(
				author$project$Material$Button$view,
				A2(elm$core$Basics$composeL, lift, author$project$Page$Code$Mdc),
				'navigation-side-prev-question',
				mdc,
				_List_fromArray(
					[
						A2(author$project$Material$Options$css, 'height', '48px'),
						A2(author$project$Material$Options$css, 'width', '48px'),
						author$project$Material$Button$ripple,
						A2(author$project$Material$Options$css, 'border-radius', '24px'),
						author$project$Material$Button$onClick(
						A2(
							elm$core$Basics$composeL,
							lift,
							A2(
								author$project$Page$Code$Click,
								author$project$Data$Previous,
								author$project$Data$Question(elm$core$Maybe$Nothing)))(
							_Utils_Tuple2(id, coding)))
					]),
				_List_fromArray(
					[
						A2(
						author$project$Material$Icon$view,
						_List_fromArray(
							[author$project$Material$Icon$size24]),
						'navigate_before')
					]));
		}
	});
var author$project$Internal$Typography$Implementation$headline6 = author$project$Internal$Options$cs('mdc-typography--headline6');
var author$project$Material$Typography$headline6 = author$project$Internal$Typography$Implementation$headline6;
var author$project$Page$Code$viewQuestion = function (question) {
	var text_ = function () {
		if (question.$ === 'Ok') {
			var _n1 = question.a;
			var id = _n1.a;
			var value = _n1.b;
			return value.text;
		} else {
			var error = question.a;
			return 'error';
		}
	}();
	return A3(
		author$project$Material$Options$styled,
		elm$html$Html$div,
		_List_fromArray(
			[
				author$project$Material$Typography$typography,
				A2(author$project$Material$Options$css, 'text-align', 'center')
			]),
		_List_fromArray(
			[
				A3(
				author$project$Material$Options$styled,
				elm$html$Html$div,
				_List_fromArray(
					[author$project$Material$Typography$headline6]),
				_List_fromArray(
					[
						elm$html$Html$text(text_)
					]))
			]));
};
var elm$core$Result$andThen = F2(
	function (callback, result) {
		if (result.$ === 'Ok') {
			var value = result.a;
			return callback(value);
		} else {
			var msg = result.a;
			return elm$core$Result$Err(msg);
		}
	});
var author$project$Page$Code$viewCoding = F5(
	function (lift, model, data, current, coding) {
		var answer = A3(
			author$project$Db$Extra$get,
			data.answers,
			function (x) {
				return x.answer;
			},
			current);
		var question = A2(
			elm$core$Result$andThen,
			A2(
				author$project$Db$Extra$get,
				data.questions,
				function (x) {
					return x.question;
				}),
			answer);
		return A2(
			author$project$Material$LayoutGrid$inner,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					author$project$Material$LayoutGrid$inner,
					_List_fromArray(
						[author$project$Material$LayoutGrid$span4Phone, author$project$Material$LayoutGrid$span8Tablet, author$project$Material$LayoutGrid$span12Desktop]),
					_List_fromArray(
						[
							A2(
							author$project$Material$LayoutGrid$cell,
							_List_fromArray(
								[author$project$Material$LayoutGrid$span1Tablet, author$project$Material$LayoutGrid$span1Desktop, author$project$Material$LayoutGrid$alignMiddle]),
							_List_fromArray(
								[
									A5(author$project$Page$Code$viewPreviousQuestion, lift, model.mdc, coding, 4, 10)
								])),
							A2(
							author$project$Material$LayoutGrid$cell,
							_List_fromArray(
								[author$project$Material$LayoutGrid$span6Tablet, author$project$Material$LayoutGrid$span10Desktop, author$project$Material$LayoutGrid$alignMiddle]),
							_List_fromArray(
								[
									author$project$Page$Code$viewQuestion(question)
								])),
							A2(
							author$project$Material$LayoutGrid$cell,
							_List_fromArray(
								[author$project$Material$LayoutGrid$span1Tablet, author$project$Material$LayoutGrid$span1Desktop, author$project$Material$LayoutGrid$alignMiddle]),
							_List_fromArray(
								[
									A5(author$project$Page$Code$viewNextQuestion, lift, model.mdc, coding, 4, 10)
								]))
						])),
					A2(
					author$project$Material$LayoutGrid$inner,
					_List_fromArray(
						[author$project$Material$LayoutGrid$span4Phone, author$project$Material$LayoutGrid$span8Tablet, author$project$Material$LayoutGrid$span12Desktop]),
					_List_fromArray(
						[
							A2(
							author$project$Material$LayoutGrid$cell,
							_List_fromArray(
								[author$project$Material$LayoutGrid$span1Tablet, author$project$Material$LayoutGrid$span1Desktop, author$project$Material$LayoutGrid$alignMiddle]),
							_List_fromArray(
								[
									A6(author$project$Page$Code$viewPreviousAnswer, lift, model.mdc, data, coding, 4, 10)
								])),
							A2(
							author$project$Material$LayoutGrid$inner,
							_List_fromArray(
								[author$project$Material$LayoutGrid$span6Tablet, author$project$Material$LayoutGrid$span10Desktop, author$project$Material$LayoutGrid$alignMiddle]),
							_List_fromArray(
								[
									A2(
									author$project$Material$LayoutGrid$cell,
									_List_fromArray(
										[author$project$Material$LayoutGrid$span4Phone, author$project$Material$LayoutGrid$span8Tablet, author$project$Material$LayoutGrid$span12Desktop]),
									_List_fromArray(
										[
											author$project$Page$Code$viewAnswer(answer)
										])),
									A2(
									author$project$Material$LayoutGrid$cell,
									_List_fromArray(
										[author$project$Material$LayoutGrid$span4Phone, author$project$Material$LayoutGrid$span8Tablet, author$project$Material$LayoutGrid$span12Desktop]),
									A4(
										author$project$Page$Code$viewCodingForm,
										lift,
										model,
										A2(author$project$Data$getCodingAnswers, data.coding_answers, current),
										data.coding_questions))
								])),
							A2(
							author$project$Material$LayoutGrid$cell,
							_List_fromArray(
								[author$project$Material$LayoutGrid$span1Tablet, author$project$Material$LayoutGrid$span1Desktop, author$project$Material$LayoutGrid$alignMiddle]),
							_List_fromArray(
								[
									A6(author$project$Page$Code$viewNextAnswer, lift, model.mdc, data, coding, 4, 10)
								]))
						]))
				]));
	});
var author$project$Page$Code$viewBody = F5(
	function (lift, mdc, data, mb_current, coding) {
		if (mb_current.$ === 'Just') {
			var current = mb_current.a;
			return A2(
				elm$core$List$cons,
				A5(author$project$Page$Code$viewCoding, lift, mdc, data, current, coding),
				_List_Nil);
		} else {
			return _List_fromArray(
				[
					elm$html$Html$text('An Error occured while loadeng your Coding Frame')
				]);
		}
	});
var author$project$Page$Internal$Paginate = F2(
	function (a, b) {
		return {$: 'Paginate', a: a, b: b};
	});
var author$project$Page$Internal$Progress = function (a) {
	return {$: 'Progress', a: a};
};
var author$project$Page$Code$view = F4(
	function (lift, model, data, coding) {
		var mb_current = A2(author$project$Data$Access$current_codingFrame, data, coding);
		return {
			appbar: {
				action_items: _List_Nil,
				other: _List_Nil,
				title: elm$html$Html$text('Coding')
			},
			body: A5(author$project$Page$Code$viewBody, lift, model, data, mb_current, coding),
			navigation: A2(
				elm$core$Maybe$map,
				function (x) {
					return A2(
						author$project$Page$Internal$Paginate,
						x,
						A2(author$project$Data$Access$max_coding_frame_index, data, coding));
				},
				A2(author$project$Data$Access$current_codingFrame_index, data, coding)),
			progress: elm$core$Maybe$Just(
				author$project$Page$Internal$Progress(
					A2(
						elm$core$Maybe$withDefault,
						0,
						A2(author$project$Data$Access$current_codingFrame_index, data, coding)) / A2(author$project$Data$Access$max_coding_frame_index, data, coding))),
			title: 'Coding'
		};
	});
var author$project$Page$Data$GotDBMsg = function (a) {
	return {$: 'GotDBMsg', a: a};
};
var elm$virtual_dom$VirtualDom$map = _VirtualDom_map;
var elm$html$Html$map = elm$virtual_dom$VirtualDom$map;
var author$project$Page$Data$view = F4(
	function (lift, model, data, user) {
		return {
			appbar: {
				action_items: _List_Nil,
				other: _List_Nil,
				title: elm$html$Html$text('Data')
			},
			body: _List_fromArray(
				[
					A2(
					elm$html$Html$map,
					A2(elm$core$Basics$composeL, lift, author$project$Page$Data$GotDBMsg),
					A2(elm$html$Html$div, _List_Nil, _List_Nil))
				]),
			navigation: elm$core$Maybe$Nothing,
			progress: elm$core$Maybe$Nothing,
			title: 'Data'
		};
	});
var author$project$Page$Error$viewError = function (error) {
	var err = error.a;
	return elm$html$Html$text(
		elm$json$Json$Decode$errorToString(err));
};
var elm$html$Html$h2 = _VirtualDom_node('h2');
var author$project$Page$Error$view = F3(
	function (lift, model, _n0) {
		return {
			appbar: {
				action_items: _List_Nil,
				other: _List_Nil,
				title: elm$html$Html$text('Error')
			},
			body: A2(
				elm$core$List$cons,
				A2(
					elm$html$Html$h2,
					_List_Nil,
					_List_fromArray(
						[
							elm$html$Html$text('Error:')
						])),
				A2(elm$core$List$map, author$project$Page$Error$viewError, model.error)),
			navigation: elm$core$Maybe$Nothing,
			progress: elm$core$Maybe$Nothing,
			title: 'Error'
		};
	});
var author$project$Material$Options$onClick = author$project$Internal$Options$onClick;
var author$project$Page$Home$Pick = {$: 'Pick'};
var author$project$Page$Home$viewActionItems = F3(
	function (lift, model, data) {
		return _List_fromArray(
			[
				{
				configs: _List_fromArray(
					[
						author$project$Material$Options$onClick(
						lift(author$project$Page$Home$Pick))
					]),
				icon: 'publish'
			}
			]);
	});
var author$project$Internal$LayoutGrid$Implementation$span12 = A2(author$project$Internal$LayoutGrid$Implementation$span, elm$core$Maybe$Nothing, 12);
var author$project$Material$LayoutGrid$span12 = author$project$Internal$LayoutGrid$Implementation$span12;
var elm$core$List$singleton = function (value) {
	return _List_fromArray(
		[value]);
};
var author$project$Internal$LayoutGrid$Implementation$view = function (options) {
	return A2(
		elm$core$Basics$composeL,
		A2(
			elm$core$Basics$composeL,
			A2(
				author$project$Internal$Options$styled,
				elm$html$Html$div,
				A2(
					elm$core$List$cons,
					author$project$Internal$Options$cs('mdc-layout-grid'),
					options)),
			elm$core$List$singleton),
		author$project$Internal$LayoutGrid$Implementation$inner(_List_Nil));
};
var author$project$Material$LayoutGrid$view = author$project$Internal$LayoutGrid$Implementation$view;
var author$project$Internal$LayoutGrid$Implementation$span4 = A2(author$project$Internal$LayoutGrid$Implementation$span, elm$core$Maybe$Nothing, 4);
var author$project$Material$LayoutGrid$span4 = author$project$Internal$LayoutGrid$Implementation$span4;
var author$project$Internal$Card$Implementation$actionButton = author$project$Internal$Options$cs('mdc-card__action mdc-card__action-button');
var author$project$Material$Card$actionButton = author$project$Internal$Card$Implementation$actionButton;
var author$project$Internal$Card$Implementation$actionButtons = function (options) {
	return A2(
		author$project$Internal$Options$styled,
		elm$html$Html$div,
		A2(
			elm$core$List$cons,
			author$project$Internal$Options$cs('mdc-card__action-buttons'),
			options));
};
var author$project$Material$Card$actionButtons = author$project$Internal$Card$Implementation$actionButtons;
var author$project$Internal$Card$Implementation$actionIcon = author$project$Internal$Options$cs('mdc-card__action mdc-card__action-icon');
var author$project$Material$Card$actionIcon = author$project$Internal$Card$Implementation$actionIcon;
var author$project$Internal$Card$Implementation$actionIcons = function (options) {
	return A2(
		author$project$Internal$Options$styled,
		elm$html$Html$div,
		A2(
			elm$core$List$cons,
			author$project$Internal$Options$cs('mdc-card__action-icons'),
			options));
};
var author$project$Material$Card$actionIcons = author$project$Internal$Card$Implementation$actionIcons;
var author$project$Internal$Card$Implementation$actions = function (options) {
	return A2(
		author$project$Internal$Options$styled,
		elm$html$Html$div,
		A2(
			elm$core$List$cons,
			author$project$Internal$Options$cs('mdc-card__actions'),
			options));
};
var author$project$Material$Card$actions = author$project$Internal$Card$Implementation$actions;
var author$project$Internal$Card$Implementation$aspect16To9 = author$project$Internal$Options$cs('mdc-card__media--16-9');
var author$project$Material$Card$aspect16To9 = author$project$Internal$Card$Implementation$aspect16To9;
var author$project$Internal$Card$Implementation$backgroundImage = function (url) {
	return A2(author$project$Internal$Options$css, 'background-image', 'url(' + (url + ')'));
};
var author$project$Material$Card$backgroundImage = author$project$Internal$Card$Implementation$backgroundImage;
var author$project$Internal$Card$Implementation$fullBleed = author$project$Internal$Options$cs('mdc-card__actions--full-bleed');
var author$project$Material$Card$fullBleed = author$project$Internal$Card$Implementation$fullBleed;
var author$project$Internal$Card$Implementation$media = function (options) {
	return A2(
		author$project$Internal$Options$styled,
		elm$html$Html$div,
		A2(
			elm$core$List$cons,
			author$project$Internal$Options$cs('mdc-card__media'),
			options));
};
var author$project$Material$Card$media = author$project$Internal$Card$Implementation$media;
var author$project$Internal$Card$Implementation$primaryAction = function (options) {
	return A2(
		author$project$Internal$Options$styled,
		elm$html$Html$div,
		A2(
			elm$core$List$cons,
			author$project$Internal$Options$cs('mdc-card__primary-action'),
			options));
};
var author$project$Material$Card$primaryAction = author$project$Internal$Card$Implementation$primaryAction;
var author$project$Internal$Card$Implementation$stroked = author$project$Internal$Options$cs('mdc-card--stroked');
var author$project$Material$Card$stroked = author$project$Internal$Card$Implementation$stroked;
var author$project$Internal$Card$Implementation$view = function (options) {
	return A2(
		author$project$Internal$Options$styled,
		elm$html$Html$div,
		A2(
			elm$core$List$cons,
			author$project$Internal$Options$cs('mdc-card'),
			options));
};
var author$project$Material$Card$view = author$project$Internal$Card$Implementation$view;
var author$project$Internal$IconButton$Implementation$icon = function (value) {
	return author$project$Internal$Options$option(
		function (config) {
			return _Utils_update(
				config,
				{icon: value});
		});
};
var author$project$Material$IconButton$icon = author$project$Internal$IconButton$Implementation$icon;
var author$project$Internal$IconButton$Implementation$label = function (value) {
	return author$project$Internal$Options$option(
		function (config) {
			return _Utils_update(
				config,
				{label: value});
		});
};
var author$project$Material$IconButton$label = author$project$Internal$IconButton$Implementation$label;
var author$project$Internal$IconButton$Implementation$defaultConfig = {
	alternativeIconLibrary: elm$core$Maybe$Nothing,
	disabled: false,
	icon: {off: '', on: ''},
	label: {off: '', on: ''},
	on: false
};
var author$project$Internal$IconButton$Implementation$iconElement = author$project$Internal$Options$cs('mdc-icon-button__icon');
var author$project$Internal$IconButton$Implementation$onIconElement = author$project$Internal$Options$cs('mdc-icon-button__icon--on');
var author$project$Internal$IconButton$Implementation$iconButton = F5(
	function (domId, lift, model, options, list) {
		var ripple = A5(
			author$project$Internal$Ripple$Implementation$view,
			true,
			domId,
			A2(elm$core$Basics$composeL, lift, author$project$Internal$IconButton$Model$RippleMsg),
			model.ripple,
			_List_Nil);
		var summary = A2(author$project$Internal$Options$collect, author$project$Internal$IconButton$Implementation$defaultConfig, options);
		var config = summary.config;
		var icons = _List_fromArray(
			[
				A3(
				author$project$Internal$Options$styled,
				elm$html$Html$i,
				_List_fromArray(
					[
						author$project$Internal$IconButton$Implementation$iconElement,
						author$project$Internal$Options$cs('material-icons'),
						author$project$Internal$IconButton$Implementation$onIconElement
					]),
				_List_fromArray(
					[
						elm$html$Html$text(config.icon.on)
					])),
				A3(
				author$project$Internal$Options$styled,
				elm$html$Html$i,
				_List_fromArray(
					[
						author$project$Internal$IconButton$Implementation$iconElement,
						author$project$Internal$Options$cs('material-icons')
					]),
				_List_fromArray(
					[
						elm$html$Html$text(config.icon.off)
					]))
			]);
		var isToggle = !_Utils_eq(config.icon.on, config.icon.off);
		return A5(
			author$project$Internal$Options$apply,
			summary,
			elm$html$Html$button,
			_List_fromArray(
				[
					author$project$Internal$Options$cs('mdc-icon-button'),
					A2(
					author$project$Internal$Options$when,
					_Utils_eq(config.alternativeIconLibrary, elm$core$Maybe$Nothing),
					author$project$Internal$Options$cs('material-icons')),
					A2(
					author$project$Internal$Options$when,
					config.on,
					author$project$Internal$Options$cs('mdc-icon-button--on')),
					A2(
					author$project$Internal$Options$aria,
					'label',
					config.on ? config.label.on : config.label.off),
					A2(
					author$project$Internal$Options$when,
					isToggle,
					A2(author$project$Internal$Options$aria, 'hidden', 'True')),
					A2(
					author$project$Internal$Options$when,
					isToggle && config.on,
					A2(author$project$Internal$Options$aria, 'pressed', 'True')),
					A2(
					author$project$Internal$Options$when,
					isToggle && (!config.on),
					A2(author$project$Internal$Options$aria, 'pressed', 'False')),
					A2(
					author$project$Internal$Options$when,
					config.disabled,
					author$project$Internal$Options$attribute(
						elm$html$Html$Attributes$disabled(true))),
					author$project$Internal$Options$many(
					_List_fromArray(
						[ripple.interactionHandler, ripple.properties]))
				]),
			_List_Nil,
			_Utils_ap(
				list,
				(!_Utils_eq(config.alternativeIconLibrary, elm$core$Maybe$Nothing)) ? _List_fromArray(
					[
						A3(
						author$project$Internal$Options$styled,
						elm$html$Html$i,
						_List_fromArray(
							[
								author$project$Internal$Options$cs(
								A2(elm$core$Maybe$withDefault, 'material-icons', config.alternativeIconLibrary)),
								config.on ? author$project$Internal$Options$cs(config.icon.on) : author$project$Internal$Options$cs(config.icon.off)
							]),
						_List_Nil)
					]) : (_Utils_eq(config.icon.on, config.icon.off) ? _List_fromArray(
					[
						elm$html$Html$text(config.icon.on)
					]) : icons)));
	});
var author$project$Internal$IconButton$Implementation$view = F2(
	function (lift, index) {
		return A5(
			author$project$Internal$Component$render,
			author$project$Internal$IconButton$Implementation$getSet.get,
			author$project$Internal$IconButton$Implementation$iconButton(index),
			author$project$Internal$Msg$IconButtonMsg,
			lift,
			index);
	});
var author$project$Material$IconButton$view = author$project$Internal$IconButton$Implementation$view;
var author$project$Material$SimplifiedCard$Mdc = function (a) {
	return {$: 'Mdc', a: a};
};
var author$project$Material$SimplifiedCard$Select = function (a) {
	return {$: 'Select', a: a};
};
var author$project$Internal$Typography$Implementation$subtitle1 = author$project$Internal$Options$cs('mdc-typography--subtitle1');
var author$project$Material$Typography$subtitle1 = author$project$Internal$Typography$Implementation$subtitle1;
var author$project$Material$Typography$subheading1 = author$project$Material$Typography$subtitle1;
var elm$html$Html$h3 = _VirtualDom_node('h3');
var author$project$Material$SimplifiedCard$viewSubtitle = function (card) {
	var _n0 = card.subtitle;
	if (_n0.$ === 'Nothing') {
		return A2(elm$html$Html$div, _List_Nil, _List_Nil);
	} else {
		var subtitle = _n0.a;
		return A3(
			author$project$Material$Options$styled,
			elm$html$Html$h3,
			_List_fromArray(
				[
					author$project$Material$Typography$subheading1,
					A2(author$project$Material$Options$css, 'margin', '0')
				]),
			_List_fromArray(
				[
					elm$html$Html$text('by Kurt Wagner')
				]));
	}
};
var author$project$Internal$Typography$Implementation$body1 = author$project$Internal$Options$cs('mdc-typography--body1');
var author$project$Material$Typography$body1 = author$project$Internal$Typography$Implementation$body1;
var author$project$Internal$Typography$Implementation$headline5 = author$project$Internal$Options$cs('mdc-typography--headline5');
var author$project$Material$Typography$title = author$project$Internal$Typography$Implementation$headline5;
var author$project$Material$SimplifiedCard$view = F3(
	function (lift, mdc, card) {
		return A2(
			author$project$Material$Card$view,
			_List_fromArray(
				[author$project$Material$Card$stroked, author$project$Material$Card$fullBleed]),
			_List_fromArray(
				[
					A2(
					author$project$Material$Card$primaryAction,
					_List_fromArray(
						[
							author$project$Material$Options$onClick(
							A2(elm$core$Basics$composeL, lift, author$project$Material$SimplifiedCard$Select)(card.return_value))
						]),
					_List_fromArray(
						[
							A2(
							author$project$Material$Card$media,
							_List_fromArray(
								[
									author$project$Material$Card$aspect16To9,
									author$project$Material$Card$backgroundImage('images/16-9.jpg')
								]),
							_List_Nil),
							A3(
							author$project$Material$Options$styled,
							elm$html$Html$div,
							_List_fromArray(
								[
									A2(author$project$Material$Options$css, 'padding', '1rem')
								]),
							_List_fromArray(
								[
									A3(
									author$project$Material$Options$styled,
									elm$html$Html$h2,
									_List_fromArray(
										[
											author$project$Material$Typography$title,
											A2(author$project$Material$Options$css, 'margin', '0')
										]),
									_List_fromArray(
										[
											elm$html$Html$text(card.title)
										])),
									author$project$Material$SimplifiedCard$viewSubtitle(card)
								])),
							A3(
							author$project$Material$Options$styled,
							elm$html$Html$div,
							_List_fromArray(
								[
									A2(author$project$Material$Options$css, 'padding', '0 1rem 8px 1rem'),
									A2(author$project$Material$Options$css, 'color', 'rgba(0, 0, 0, 0.54)'),
									author$project$Material$Typography$body1
								]),
							_List_fromArray(
								[
									elm$html$Html$text('\n      Visit ten places on our planet that are undergoing the\n      biggest changes today.')
								]))
						])),
					A2(
					author$project$Material$Card$actions,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							author$project$Material$Card$actionButtons,
							_List_Nil,
							_List_fromArray(
								[
									A5(
									author$project$Material$Button$view,
									A2(elm$core$Basics$composeL, lift, author$project$Material$SimplifiedCard$Mdc),
									'my-read-action',
									mdc,
									_List_fromArray(
										[author$project$Material$Card$actionButton, author$project$Material$Button$ripple]),
									_List_fromArray(
										[
											elm$html$Html$text('Read')
										]))
								])),
							A2(
							author$project$Material$Card$actionIcons,
							_List_Nil,
							_List_fromArray(
								[
									A5(
									author$project$Material$IconButton$view,
									A2(elm$core$Basics$composeL, lift, author$project$Material$SimplifiedCard$Mdc),
									'my-favorite-action',
									mdc,
									_List_fromArray(
										[
											author$project$Material$Card$actionIcon,
											author$project$Material$IconButton$icon(
											{off: 'favorite_border', on: 'favorite'}),
											author$project$Material$IconButton$label(
											{off: 'Add to favorites', on: 'Remove from favorites'})
										]),
									_List_Nil)
								]))
						]))
				]));
	});
var author$project$Page$Home$CardMsg = function (a) {
	return {$: 'CardMsg', a: a};
};
var author$project$Page$Home$coding2card = function (_n0) {
	var id = _n0.a;
	var value = _n0.b;
	return {
		description: elm$core$Maybe$Nothing,
		return_value: _Utils_Tuple2(id, value),
		subtitle: elm$core$Maybe$Nothing,
		title: Chadtech$elm_relational_database$Id$toString(id)
	};
};
var author$project$Page$Home$viewCodingsCards = F4(
	function (lift, model, data, coder) {
		var cards = A2(
			elm$core$List$map,
			function (x) {
				return A2(
					author$project$Material$LayoutGrid$cell,
					_List_fromArray(
						[author$project$Material$LayoutGrid$span4]),
					_List_fromArray(
						[x]));
			},
			A2(
				elm$core$List$map,
				A2(
					author$project$Material$SimplifiedCard$view,
					A2(elm$core$Basics$composeL, lift, author$project$Page$Home$CardMsg),
					model.mdc),
				A2(
					elm$core$List$map,
					author$project$Page$Home$coding2card,
					Chadtech$elm_relational_database$Db$toList(
						A3(
							author$project$Db$Extra$selectFrom,
							data.codings,
							function (c) {
								return c.coder;
							},
							Chadtech$elm_relational_database$Db$fromList(
								_List_fromArray(
									[coder])))))));
		return cards;
	});
var author$project$Page$Home$viewMaybe = function (coding) {
	if (coding.$ === 'Just') {
		var _n1 = coding.a;
		var id = _n1.a;
		var value = _n1.b;
		return elm$html$Html$text(
			Chadtech$elm_relational_database$Id$toString(id));
	} else {
		var option2 = coding;
		return elm$html$Html$text('NoCoding');
	}
};
var author$project$Page$Home$viewBody = F5(
	function (lift, model, data, user, coding) {
		return A2(
			author$project$Material$LayoutGrid$view,
			_List_Nil,
			elm$core$List$concat(
				_List_fromArray(
					[
						_List_fromArray(
						[
							A2(
							author$project$Material$LayoutGrid$cell,
							_List_fromArray(
								[author$project$Material$LayoutGrid$span12]),
							_List_fromArray(
								[
									elm$html$Html$text('My codings in Process:')
								]))
						]),
						A4(author$project$Page$Home$viewCodingsCards, lift, model, data, user),
						_List_fromArray(
						[
							A2(
							author$project$Material$LayoutGrid$cell,
							_List_fromArray(
								[author$project$Material$LayoutGrid$span12]),
							_List_fromArray(
								[
									author$project$Page$Home$viewMaybe(coding)
								]))
						])
					])));
	});
var author$project$Page$Home$view = F5(
	function (coding, lift, model, data, user) {
		return {
			appbar: {
				action_items: A3(author$project$Page$Home$viewActionItems, lift, model, data),
				other: _List_Nil,
				title: elm$html$Html$text('Home')
			},
			body: _List_fromArray(
				[
					A5(author$project$Page$Home$viewBody, lift, model, data, user, coding)
				]),
			navigation: elm$core$Maybe$Nothing,
			progress: elm$core$Maybe$Nothing,
			title: 'Home'
		};
	});
var author$project$Material$Options$cs = author$project$Internal$Options$cs;
var author$project$Internal$TopAppBar$Implementation$fixedAdjust = author$project$Internal$Options$cs('mdc-top-app-bar--fixed-adjust');
var author$project$Material$TopAppBar$fixedAdjust = author$project$Internal$TopAppBar$Implementation$fixedAdjust;
var author$project$Internal$Drawer$Implementation$content = function (options) {
	return A2(
		author$project$Internal$Options$styled,
		elm$html$Html$div,
		A2(
			elm$core$List$cons,
			author$project$Internal$Options$cs('mdc-drawer__content'),
			options));
};
var author$project$Internal$Drawer$Modal$Implementation$content = author$project$Internal$Drawer$Implementation$content;
var author$project$Material$Drawer$Modal$content = author$project$Internal$Drawer$Modal$Implementation$content;
var author$project$Internal$Drawer$Implementation$open = author$project$Internal$Options$option(
	function (config) {
		return _Utils_update(
			config,
			{open: true});
	});
var author$project$Internal$Drawer$Modal$Implementation$open = author$project$Internal$Drawer$Implementation$open;
var author$project$Material$Drawer$Modal$open = author$project$Internal$Drawer$Modal$Implementation$open;
var author$project$Internal$Drawer$Modal$Implementation$scrim = function (options) {
	return A2(
		author$project$Internal$Options$styled,
		elm$html$Html$div,
		A2(
			elm$core$List$cons,
			author$project$Internal$Options$cs('mdc-drawer-scrim'),
			options));
};
var author$project$Material$Drawer$Modal$scrim = author$project$Internal$Drawer$Modal$Implementation$scrim;
var author$project$Internal$Drawer$Implementation$defaultConfig = {onClose: elm$core$Maybe$Nothing, open: false};
var author$project$Internal$Drawer$Model$EndAnimation = {$: 'EndAnimation'};
var author$project$Internal$Drawer$Model$NoOp = {$: 'NoOp'};
var author$project$Internal$Drawer$Model$StartAnimation = function (a) {
	return {$: 'StartAnimation', a: a};
};
var elm$html$Html$aside = _VirtualDom_node('aside');
var author$project$Internal$Drawer$Implementation$view = F5(
	function (className, lift, model, options, nodes) {
		var summary = A2(author$project$Internal$Options$collect, author$project$Internal$Drawer$Implementation$defaultConfig, options);
		var config = summary.config;
		var stateChanged = (!model.closeOnAnimationEnd) && (!_Utils_eq(config.open, model.open));
		return A3(
			author$project$Internal$Options$styled,
			elm$html$Html$aside,
			_Utils_ap(
				_List_fromArray(
					[
						author$project$Internal$Options$cs('mdc-drawer'),
						author$project$Internal$Options$cs(className),
						A2(
						author$project$Internal$Options$when,
						stateChanged,
						author$project$Internal$GlobalEvents$onTick(
							elm$json$Json$Decode$succeed(
								lift(
									author$project$Internal$Drawer$Model$StartAnimation(config.open))))),
						A2(
						author$project$Internal$Options$when,
						config.open || model.open,
						author$project$Internal$Options$cs('mdc-drawer--open')),
						A2(
						author$project$Internal$Options$when,
						config.open && (stateChanged || model.animating),
						author$project$Internal$Options$cs('mdc-drawer--animate')),
						A2(
						author$project$Internal$Options$when,
						config.open && model.animating,
						author$project$Internal$Options$cs('mdc-drawer--opening')),
						A2(
						author$project$Internal$Options$when,
						(!config.open) && model.animating,
						author$project$Internal$Options$cs('mdc-drawer--closing')),
						A2(
						author$project$Internal$Options$when,
						model.animating,
						A2(
							author$project$Internal$Options$on,
							'transitionend',
							elm$json$Json$Decode$succeed(
								lift(author$project$Internal$Drawer$Model$EndAnimation)))),
						A2(
						author$project$Internal$Options$when,
						(!elm$core$String$isEmpty(className)) && (config.open || model.open),
						A2(author$project$Internal$Options$data, 'focustrap', '{}')),
						A2(
						author$project$Internal$Options$on,
						'keydown',
						A3(
							elm$json$Json$Decode$map2,
							F2(
								function (key, keyCode) {
									return (_Utils_eq(
										key,
										elm$core$Maybe$Just('Escape')) || (keyCode === 27)) ? A2(
										elm$core$Maybe$withDefault,
										lift(author$project$Internal$Drawer$Model$NoOp),
										config.onClose) : lift(author$project$Internal$Drawer$Model$NoOp);
								}),
							elm$json$Json$Decode$oneOf(
								_List_fromArray(
									[
										A2(
										elm$json$Json$Decode$map,
										elm$core$Maybe$Just,
										A2(
											elm$json$Json$Decode$at,
											_List_fromArray(
												['key']),
											elm$json$Json$Decode$string)),
										elm$json$Json$Decode$succeed(elm$core$Maybe$Nothing)
									])),
							A2(
								elm$json$Json$Decode$at,
								_List_fromArray(
									['keyCode']),
								elm$json$Json$Decode$int)))
					]),
				options),
			nodes);
	});
var author$project$Internal$Drawer$Implementation$render = function (className) {
	return A3(
		author$project$Internal$Component$render,
		author$project$Internal$Drawer$Implementation$getSet.get,
		author$project$Internal$Drawer$Implementation$view(className),
		author$project$Internal$Msg$DrawerMsg);
};
var author$project$Internal$Drawer$Modal$Implementation$className = 'mdc-drawer--modal';
var author$project$Internal$Drawer$Modal$Implementation$view = author$project$Internal$Drawer$Implementation$render(author$project$Internal$Drawer$Modal$Implementation$className);
var author$project$Material$Drawer$Modal$view = author$project$Internal$Drawer$Modal$Implementation$view;
var author$project$Internal$List$Implementation$defaultConfig = {activated: false, isRadioGroup: false, isSingleSelectionList: false, node: elm$core$Maybe$Nothing, onSelectListItem: elm$core$Maybe$Nothing, selected: false, selectedIndex: elm$core$Maybe$Nothing, useActivated: false};
var author$project$Internal$List$Implementation$asListItemView = F9(
	function (domId, lift, model, config, listItemsIds, focusedIndex, index, options, children) {
		var summary = A2(author$project$Internal$Options$collect, author$project$Internal$List$Implementation$defaultConfig, options);
		return A5(
			author$project$Internal$Options$apply,
			summary,
			A2(elm$core$Maybe$withDefault, elm$html$Html$div, summary.config.node),
			_List_Nil,
			_List_Nil,
			children);
	});
var author$project$Internal$List$Implementation$node = function (nodeFunc) {
	return author$project$Internal$Options$option(
		function (config) {
			return _Utils_update(
				config,
				{
					node: elm$core$Maybe$Just(nodeFunc)
				});
		});
};
var author$project$Internal$List$Implementation$asListItem = F3(
	function (dom_node, options, children) {
		return {
			children: children,
			focusable: false,
			options: A2(
				elm$core$List$cons,
				author$project$Internal$List$Implementation$node(dom_node),
				options),
			view: author$project$Internal$List$Implementation$asListItemView
		};
	});
var elm$html$Html$li = _VirtualDom_node('li');
var author$project$Internal$List$Implementation$divider = function (options) {
	return A2(
		author$project$Internal$List$Implementation$asListItem,
		elm$html$Html$li,
		A2(
			elm$core$List$cons,
			author$project$Internal$Options$cs('mdc-list-divider'),
			A2(
				elm$core$List$cons,
				author$project$Internal$Options$role('separator'),
				options)));
};
var author$project$Material$List$divider = author$project$Internal$List$Implementation$divider;
var author$project$Internal$List$Implementation$listItemDomId = F2(
	function (domId, index) {
		return domId + ('--' + elm$core$String$fromInt(index));
	});
var author$project$Internal$List$Implementation$doListItemDomId = F3(
	function (domId, index, listItem) {
		return listItem.focusable ? A2(author$project$Internal$List$Implementation$listItemDomId, domId, index) : '';
	});
var author$project$Internal$List$Implementation$findIndexHelp = F3(
	function (index, predicate, list) {
		findIndexHelp:
		while (true) {
			if (!list.b) {
				return elm$core$Maybe$Nothing;
			} else {
				var first = list.a;
				var rest = list.b;
				if (predicate(first)) {
					return elm$core$Maybe$Just(index);
				} else {
					var $temp$index = index + 1,
						$temp$predicate = predicate,
						$temp$list = rest;
					index = $temp$index;
					predicate = $temp$predicate;
					list = $temp$list;
					continue findIndexHelp;
				}
			}
		}
	});
var author$project$Internal$List$Implementation$findIndex = author$project$Internal$List$Implementation$findIndexHelp(0);
var author$project$Internal$List$Implementation$liIsSelectedOrActivated = function (li_) {
	var li_summary = A2(author$project$Internal$Options$collect, author$project$Internal$List$Implementation$defaultConfig, li_.options);
	var li_config = li_summary.config;
	return li_config.selected || li_config.activated;
};
var author$project$Internal$List$Implementation$listItemView = F8(
	function (domId, lift, model, config, listItemsIds, focusedIndex, index, li_) {
		return A9(li_.view, domId, lift, model, config, listItemsIds, focusedIndex, index, li_.options, li_.children);
	});
var elm$json$Json$Decode$maybe = function (decoder) {
	return elm$json$Json$Decode$oneOf(
		_List_fromArray(
			[
				A2(elm$json$Json$Decode$map, elm$core$Maybe$Just, decoder),
				elm$json$Json$Decode$succeed(elm$core$Maybe$Nothing)
			]));
};
var author$project$Internal$List$Implementation$invertDecoder = function (decoder) {
	return A2(
		elm$json$Json$Decode$andThen,
		function (maybe) {
			return _Utils_eq(maybe, elm$core$Maybe$Nothing) ? elm$json$Json$Decode$succeed(_Utils_Tuple0) : elm$json$Json$Decode$fail('');
		},
		elm$json$Json$Decode$maybe(decoder));
};
var author$project$Internal$List$Implementation$succeedIfContainerOrChildOfContainer = function (targetId) {
	return A2(
		elm$json$Json$Decode$andThen,
		function (id) {
			return _Utils_eq(id, targetId) ? elm$json$Json$Decode$succeed(_Utils_Tuple0) : A2(
				elm$json$Json$Decode$field,
				'parentNode',
				author$project$Internal$List$Implementation$succeedIfContainerOrChildOfContainer(targetId));
		},
		A2(elm$json$Json$Decode$field, 'id', elm$json$Json$Decode$string));
};
var author$project$Internal$List$Implementation$succeedIfLeavingList = function (targetId) {
	return author$project$Internal$List$Implementation$invertDecoder(
		A2(
			elm$json$Json$Decode$field,
			'relatedTarget',
			author$project$Internal$List$Implementation$succeedIfContainerOrChildOfContainer(targetId)));
};
var author$project$Internal$List$Model$ResetFocusedItem = {$: 'ResetFocusedItem'};
var elm$core$Array$fromListHelp = F3(
	function (list, nodeList, nodeListSize) {
		fromListHelp:
		while (true) {
			var _n0 = A2(elm$core$Elm$JsArray$initializeFromList, elm$core$Array$branchFactor, list);
			var jsArray = _n0.a;
			var remainingItems = _n0.b;
			if (_Utils_cmp(
				elm$core$Elm$JsArray$length(jsArray),
				elm$core$Array$branchFactor) < 0) {
				return A2(
					elm$core$Array$builderToArray,
					true,
					{nodeList: nodeList, nodeListSize: nodeListSize, tail: jsArray});
			} else {
				var $temp$list = remainingItems,
					$temp$nodeList = A2(
					elm$core$List$cons,
					elm$core$Array$Leaf(jsArray),
					nodeList),
					$temp$nodeListSize = nodeListSize + 1;
				list = $temp$list;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue fromListHelp;
			}
		}
	});
var elm$core$Array$fromList = function (list) {
	if (!list.b) {
		return elm$core$Array$empty;
	} else {
		return A3(elm$core$Array$fromListHelp, list, _List_Nil, 0);
	}
};
var elm$html$Html$ul = _VirtualDom_node('ul');
var author$project$Internal$List$Implementation$ul = F5(
	function (domId, lift, model, options, items) {
		var listItemIds = elm$core$Array$fromList(
			A2(
				elm$core$List$indexedMap,
				author$project$Internal$List$Implementation$doListItemDomId(domId),
				items));
		var summary = A2(author$project$Internal$Options$collect, author$project$Internal$List$Implementation$defaultConfig, options);
		var config = summary.config;
		var focusedIndex = function () {
			var _n0 = model.focused;
			if (_n0.$ === 'Just') {
				var focused = _n0.a;
				return focused;
			} else {
				var _n1 = config.selectedIndex;
				if (_n1.$ === 'Just') {
					var index = _n1.a;
					return index;
				} else {
					var _n2 = A2(author$project$Internal$List$Implementation$findIndex, author$project$Internal$List$Implementation$liIsSelectedOrActivated, items);
					if (_n2.$ === 'Just') {
						var i = _n2.a;
						return i;
					} else {
						return 0;
					}
				}
			}
		}();
		var list_nodes = A2(
			elm$core$List$indexedMap,
			A6(author$project$Internal$List$Implementation$listItemView, domId, lift, model, config, listItemIds, focusedIndex),
			items);
		return A5(
			author$project$Internal$Options$apply,
			summary,
			A2(elm$core$Maybe$withDefault, elm$html$Html$ul, config.node),
			_List_fromArray(
				[
					author$project$Internal$Options$cs('mdc-list'),
					A2(
					author$project$Internal$Options$when,
					config.isSingleSelectionList,
					author$project$Internal$Options$role('listbox')),
					A2(
					author$project$Internal$Options$when,
					config.isRadioGroup,
					author$project$Internal$Options$role('radiogroup')),
					author$project$Internal$Options$id(domId),
					A2(
					author$project$Internal$Options$on,
					'focusout',
					A2(
						elm$json$Json$Decode$map,
						elm$core$Basics$always(
							lift(author$project$Internal$List$Model$ResetFocusedItem)),
						author$project$Internal$List$Implementation$succeedIfLeavingList(domId)))
				]),
			_List_Nil,
			list_nodes);
	});
var author$project$Internal$List$Implementation$view = F2(
	function (lift, domId) {
		return A5(
			author$project$Internal$Component$render,
			author$project$Internal$List$Implementation$getSet.get,
			author$project$Internal$List$Implementation$ul(domId),
			author$project$Internal$Msg$ListMsg,
			lift,
			domId);
	});
var elm$html$Html$nav = _VirtualDom_node('nav');
var author$project$Material$List$nav = F5(
	function (lift, domId, model, options, items) {
		return A5(
			author$project$Internal$List$Implementation$view,
			lift,
			domId,
			model,
			A2(
				elm$core$List$cons,
				author$project$Internal$List$Implementation$node(elm$html$Html$nav),
				options),
			items);
	});
var author$project$Internal$List$Implementation$singleSelection = author$project$Internal$Options$option(
	function (config) {
		return _Utils_update(
			config,
			{isRadioGroup: false, isSingleSelectionList: true});
	});
var author$project$Material$List$singleSelection = author$project$Internal$List$Implementation$singleSelection;
var author$project$Internal$List$Implementation$useActivated = author$project$Internal$Options$option(
	function (config) {
		return _Utils_update(
			config,
			{useActivated: true});
	});
var author$project$Material$List$useActivated = author$project$Internal$List$Implementation$useActivated;
var author$project$Material$Options$when = author$project$Internal$Options$when;
var author$project$Page$Internal$Drawer$viewFavourites = F3(
	function (lift, model, favourites) {
		return _List_Nil;
	});
var elm$html$Html$header = _VirtualDom_node('header');
var author$project$Internal$Drawer$Implementation$header = function (options) {
	return A2(
		author$project$Internal$Options$styled,
		elm$html$Html$header,
		A2(
			elm$core$List$cons,
			author$project$Internal$Options$cs('mdc-drawer__header'),
			options));
};
var author$project$Internal$Drawer$Modal$Implementation$header = author$project$Internal$Drawer$Implementation$header;
var author$project$Material$Drawer$Modal$header = author$project$Internal$Drawer$Modal$Implementation$header;
var author$project$Internal$Drawer$Implementation$subTitle = author$project$Internal$Options$cs('mdc-drawer__subtitle');
var author$project$Internal$Drawer$Modal$Implementation$subTitle = author$project$Internal$Drawer$Implementation$subTitle;
var author$project$Material$Drawer$Modal$subTitle = author$project$Internal$Drawer$Modal$Implementation$subTitle;
var author$project$Internal$Drawer$Implementation$title = author$project$Internal$Options$cs('mdc-drawer__title');
var author$project$Internal$Drawer$Modal$Implementation$title = author$project$Internal$Drawer$Implementation$title;
var author$project$Material$Drawer$Modal$title = author$project$Internal$Drawer$Modal$Implementation$title;
var elm$html$Html$h6 = _VirtualDom_node('h6');
var author$project$Page$Internal$Drawer$viewHeader = F3(
	function (lift, model, mb_config) {
		if (mb_config.$ === 'Nothing') {
			return A2(elm$html$Html$div, _List_Nil, _List_Nil);
		} else {
			var config = mb_config.a;
			return A2(
				author$project$Material$Drawer$Modal$header,
				_List_Nil,
				_List_fromArray(
					[
						A3(
						author$project$Material$Options$styled,
						elm$html$Html$h3,
						_List_fromArray(
							[author$project$Material$Drawer$Modal$title]),
						_List_fromArray(
							[config.title])),
						A3(
						author$project$Material$Options$styled,
						elm$html$Html$h6,
						_List_fromArray(
							[author$project$Material$Drawer$Modal$subTitle]),
						_List_fromArray(
							[config.subtitle]))
					]));
		}
	});
var author$project$Internal$List$Implementation$find = F2(
	function (predicate, list) {
		find:
		while (true) {
			if (!list.b) {
				return elm$core$Maybe$Nothing;
			} else {
				var first = list.a;
				var rest = list.b;
				if (predicate(first)) {
					return elm$core$Maybe$Just(first);
				} else {
					var $temp$predicate = predicate,
						$temp$list = rest;
					predicate = $temp$predicate;
					list = $temp$list;
					continue find;
				}
			}
		}
	});
var elm$core$Elm$JsArray$appendN = _JsArray_appendN;
var elm$core$Elm$JsArray$slice = _JsArray_slice;
var elm$core$Array$appendHelpBuilder = F2(
	function (tail, builder) {
		var tailLen = elm$core$Elm$JsArray$length(tail);
		var notAppended = (elm$core$Array$branchFactor - elm$core$Elm$JsArray$length(builder.tail)) - tailLen;
		var appended = A3(elm$core$Elm$JsArray$appendN, elm$core$Array$branchFactor, builder.tail, tail);
		return (notAppended < 0) ? {
			nodeList: A2(
				elm$core$List$cons,
				elm$core$Array$Leaf(appended),
				builder.nodeList),
			nodeListSize: builder.nodeListSize + 1,
			tail: A3(elm$core$Elm$JsArray$slice, notAppended, tailLen, tail)
		} : ((!notAppended) ? {
			nodeList: A2(
				elm$core$List$cons,
				elm$core$Array$Leaf(appended),
				builder.nodeList),
			nodeListSize: builder.nodeListSize + 1,
			tail: elm$core$Elm$JsArray$empty
		} : {nodeList: builder.nodeList, nodeListSize: builder.nodeListSize, tail: appended});
	});
var elm$core$Bitwise$shiftLeftBy = _Bitwise_shiftLeftBy;
var elm$core$Array$tailIndex = function (len) {
	return (len >>> 5) << 5;
};
var elm$core$Basics$ge = _Utils_ge;
var elm$core$Array$sliceLeft = F2(
	function (from, array) {
		var len = array.a;
		var tree = array.c;
		var tail = array.d;
		if (!from) {
			return array;
		} else {
			if (_Utils_cmp(
				from,
				elm$core$Array$tailIndex(len)) > -1) {
				return A4(
					elm$core$Array$Array_elm_builtin,
					len - from,
					elm$core$Array$shiftStep,
					elm$core$Elm$JsArray$empty,
					A3(
						elm$core$Elm$JsArray$slice,
						from - elm$core$Array$tailIndex(len),
						elm$core$Elm$JsArray$length(tail),
						tail));
			} else {
				var skipNodes = (from / elm$core$Array$branchFactor) | 0;
				var helper = F2(
					function (node, acc) {
						if (node.$ === 'SubTree') {
							var subTree = node.a;
							return A3(elm$core$Elm$JsArray$foldr, helper, acc, subTree);
						} else {
							var leaf = node.a;
							return A2(elm$core$List$cons, leaf, acc);
						}
					});
				var leafNodes = A3(
					elm$core$Elm$JsArray$foldr,
					helper,
					_List_fromArray(
						[tail]),
					tree);
				var nodesToInsert = A2(elm$core$List$drop, skipNodes, leafNodes);
				if (!nodesToInsert.b) {
					return elm$core$Array$empty;
				} else {
					var head = nodesToInsert.a;
					var rest = nodesToInsert.b;
					var firstSlice = from - (skipNodes * elm$core$Array$branchFactor);
					var initialBuilder = {
						nodeList: _List_Nil,
						nodeListSize: 0,
						tail: A3(
							elm$core$Elm$JsArray$slice,
							firstSlice,
							elm$core$Elm$JsArray$length(head),
							head)
					};
					return A2(
						elm$core$Array$builderToArray,
						true,
						A3(elm$core$List$foldl, elm$core$Array$appendHelpBuilder, initialBuilder, rest));
				}
			}
		}
	});
var elm$core$Array$bitMask = 4294967295 >>> (32 - elm$core$Array$shiftStep);
var elm$core$Elm$JsArray$unsafeGet = _JsArray_unsafeGet;
var elm$core$Array$fetchNewTail = F4(
	function (shift, end, treeEnd, tree) {
		fetchNewTail:
		while (true) {
			var pos = elm$core$Array$bitMask & (treeEnd >>> shift);
			var _n0 = A2(elm$core$Elm$JsArray$unsafeGet, pos, tree);
			if (_n0.$ === 'SubTree') {
				var sub = _n0.a;
				var $temp$shift = shift - elm$core$Array$shiftStep,
					$temp$end = end,
					$temp$treeEnd = treeEnd,
					$temp$tree = sub;
				shift = $temp$shift;
				end = $temp$end;
				treeEnd = $temp$treeEnd;
				tree = $temp$tree;
				continue fetchNewTail;
			} else {
				var values = _n0.a;
				return A3(elm$core$Elm$JsArray$slice, 0, elm$core$Array$bitMask & end, values);
			}
		}
	});
var elm$core$Array$hoistTree = F3(
	function (oldShift, newShift, tree) {
		hoistTree:
		while (true) {
			if ((_Utils_cmp(oldShift, newShift) < 1) || (!elm$core$Elm$JsArray$length(tree))) {
				return tree;
			} else {
				var _n0 = A2(elm$core$Elm$JsArray$unsafeGet, 0, tree);
				if (_n0.$ === 'SubTree') {
					var sub = _n0.a;
					var $temp$oldShift = oldShift - elm$core$Array$shiftStep,
						$temp$newShift = newShift,
						$temp$tree = sub;
					oldShift = $temp$oldShift;
					newShift = $temp$newShift;
					tree = $temp$tree;
					continue hoistTree;
				} else {
					return tree;
				}
			}
		}
	});
var elm$core$Elm$JsArray$unsafeSet = _JsArray_unsafeSet;
var elm$core$Array$sliceTree = F3(
	function (shift, endIdx, tree) {
		var lastPos = elm$core$Array$bitMask & (endIdx >>> shift);
		var _n0 = A2(elm$core$Elm$JsArray$unsafeGet, lastPos, tree);
		if (_n0.$ === 'SubTree') {
			var sub = _n0.a;
			var newSub = A3(elm$core$Array$sliceTree, shift - elm$core$Array$shiftStep, endIdx, sub);
			return (!elm$core$Elm$JsArray$length(newSub)) ? A3(elm$core$Elm$JsArray$slice, 0, lastPos, tree) : A3(
				elm$core$Elm$JsArray$unsafeSet,
				lastPos,
				elm$core$Array$SubTree(newSub),
				A3(elm$core$Elm$JsArray$slice, 0, lastPos + 1, tree));
		} else {
			return A3(elm$core$Elm$JsArray$slice, 0, lastPos, tree);
		}
	});
var elm$core$Array$sliceRight = F2(
	function (end, array) {
		var len = array.a;
		var startShift = array.b;
		var tree = array.c;
		var tail = array.d;
		if (_Utils_eq(end, len)) {
			return array;
		} else {
			if (_Utils_cmp(
				end,
				elm$core$Array$tailIndex(len)) > -1) {
				return A4(
					elm$core$Array$Array_elm_builtin,
					end,
					startShift,
					tree,
					A3(elm$core$Elm$JsArray$slice, 0, elm$core$Array$bitMask & end, tail));
			} else {
				var endIdx = elm$core$Array$tailIndex(end);
				var depth = elm$core$Basics$floor(
					A2(
						elm$core$Basics$logBase,
						elm$core$Array$branchFactor,
						A2(elm$core$Basics$max, 1, endIdx - 1)));
				var newShift = A2(elm$core$Basics$max, 5, depth * elm$core$Array$shiftStep);
				return A4(
					elm$core$Array$Array_elm_builtin,
					end,
					newShift,
					A3(
						elm$core$Array$hoistTree,
						startShift,
						newShift,
						A3(elm$core$Array$sliceTree, startShift, endIdx, tree)),
					A4(elm$core$Array$fetchNewTail, startShift, end, endIdx, tree));
			}
		}
	});
var elm$core$Array$translateIndex = F2(
	function (index, _n0) {
		var len = _n0.a;
		var posIndex = (index < 0) ? (len + index) : index;
		return (posIndex < 0) ? 0 : ((_Utils_cmp(posIndex, len) > 0) ? len : posIndex);
	});
var elm$core$Array$slice = F3(
	function (from, to, array) {
		var correctTo = A2(elm$core$Array$translateIndex, to, array);
		var correctFrom = A2(elm$core$Array$translateIndex, from, array);
		return (_Utils_cmp(correctFrom, correctTo) > 0) ? elm$core$Array$empty : A2(
			elm$core$Array$sliceLeft,
			correctFrom,
			A2(elm$core$Array$sliceRight, correctTo, array));
	});
var elm$core$Tuple$second = function (_n0) {
	var y = _n0.b;
	return y;
};
var elm$core$Array$toIndexedList = function (array) {
	var len = array.a;
	var helper = F2(
		function (entry, _n0) {
			var index = _n0.a;
			var list = _n0.b;
			return _Utils_Tuple2(
				index - 1,
				A2(
					elm$core$List$cons,
					_Utils_Tuple2(index, entry),
					list));
		});
	return A3(
		elm$core$Array$foldr,
		helper,
		_Utils_Tuple2(len - 1, _List_Nil),
		array).b;
};
var author$project$Internal$List$Implementation$slicedIndexedList = F3(
	function (from, to, array) {
		return elm$core$Array$toIndexedList(
			A3(elm$core$Array$slice, from, to, array));
	});
var elm$core$Array$length = function (_n0) {
	var len = _n0.a;
	return len;
};
var author$project$Internal$List$Implementation$firstNonEmptyId = F2(
	function (from, array) {
		var list = A3(
			author$project$Internal$List$Implementation$slicedIndexedList,
			from,
			elm$core$Array$length(array),
			array);
		var non_empty_id = A2(
			author$project$Internal$List$Implementation$find,
			function (_n0) {
				var id = _n0.b;
				return id !== '';
			},
			list);
		return non_empty_id;
	});
var author$project$Internal$List$Implementation$lastNonEmptyId = F2(
	function (to, array) {
		var list = A3(author$project$Internal$List$Implementation$slicedIndexedList, 0, to, array);
		var non_empty_id = A2(
			author$project$Internal$List$Implementation$find,
			function (_n0) {
				var i = _n0.a;
				var id = _n0.b;
				return id !== '';
			},
			elm$core$List$reverse(list));
		return non_empty_id;
	});
var author$project$Internal$List$Implementation$listItemClass = author$project$Internal$Options$cs('mdc-list-item');
var author$project$Internal$List$Model$FocusItem = F2(
	function (a, b) {
		return {$: 'FocusItem', a: a, b: b};
	});
var author$project$Internal$List$Model$SelectItem = F2(
	function (a, b) {
		return {$: 'SelectItem', a: a, b: b};
	});
var author$project$Internal$Options$onWithOptions = function (evt) {
	return author$project$Internal$Options$Listener(evt);
};
var elm$core$Array$getHelp = F3(
	function (shift, index, tree) {
		getHelp:
		while (true) {
			var pos = elm$core$Array$bitMask & (index >>> shift);
			var _n0 = A2(elm$core$Elm$JsArray$unsafeGet, pos, tree);
			if (_n0.$ === 'SubTree') {
				var subTree = _n0.a;
				var $temp$shift = shift - elm$core$Array$shiftStep,
					$temp$index = index,
					$temp$tree = subTree;
				shift = $temp$shift;
				index = $temp$index;
				tree = $temp$tree;
				continue getHelp;
			} else {
				var values = _n0.a;
				return A2(elm$core$Elm$JsArray$unsafeGet, elm$core$Array$bitMask & index, values);
			}
		}
	});
var elm$core$Array$get = F2(
	function (index, _n0) {
		var len = _n0.a;
		var startShift = _n0.b;
		var tree = _n0.c;
		var tail = _n0.d;
		return ((index < 0) || (_Utils_cmp(index, len) > -1)) ? elm$core$Maybe$Nothing : ((_Utils_cmp(
			index,
			elm$core$Array$tailIndex(len)) > -1) ? elm$core$Maybe$Just(
			A2(elm$core$Elm$JsArray$unsafeGet, elm$core$Array$bitMask & index, tail)) : elm$core$Maybe$Just(
			A3(elm$core$Array$getHelp, startShift, index, tree)));
	});
var author$project$Internal$List$Implementation$liView = F9(
	function (domId, lift, model, config, listItemIds, focusedIndex, index, options, children) {
		var tab_index = _Utils_eq(focusedIndex, index) ? 0 : (-1);
		var list_item_dom_id = A2(author$project$Internal$List$Implementation$listItemDomId, domId, index);
		var ripple = A5(
			author$project$Internal$Ripple$Implementation$view,
			false,
			list_item_dom_id,
			A2(
				elm$core$Basics$composeL,
				lift,
				author$project$Internal$List$Model$RippleMsg(list_item_dom_id)),
			A2(
				elm$core$Maybe$withDefault,
				author$project$Internal$Ripple$Model$defaultModel,
				A2(elm$core$Dict$get, list_item_dom_id, model.ripples)),
			_List_Nil);
		var li_summary = A2(author$project$Internal$Options$collect, author$project$Internal$List$Implementation$defaultConfig, options);
		var li_config = li_summary.config;
		var is_selected = function () {
			var _n8 = config.selectedIndex;
			if (_n8.$ === 'Just') {
				var i = _n8.a;
				return _Utils_eq(i, index);
			} else {
				return li_config.selected || li_config.activated;
			}
		}();
		return A5(
			author$project$Internal$Options$apply,
			li_summary,
			A2(elm$core$Maybe$withDefault, elm$html$Html$li, li_config.node),
			_List_fromArray(
				[
					author$project$Internal$List$Implementation$listItemClass,
					author$project$Internal$Options$tabindex(tab_index),
					A2(
					author$project$Internal$Options$when,
					config.isSingleSelectionList && (is_selected && (!config.useActivated)),
					author$project$Internal$Options$cs('mdc-list-item--selected')),
					A2(
					author$project$Internal$Options$when,
					config.isSingleSelectionList && (is_selected && config.useActivated),
					author$project$Internal$Options$cs('mdc-list-item--activated')),
					A2(
					author$project$Internal$Options$when,
					config.isRadioGroup,
					A2(
						author$project$Internal$Options$aria,
						'checked',
						is_selected ? 'True' : 'False')),
					A2(
					author$project$Internal$Options$when,
					config.isSingleSelectionList,
					author$project$Internal$Options$role('option')),
					A2(
					author$project$Internal$Options$when,
					config.isRadioGroup,
					author$project$Internal$Options$role('radio')),
					ripple.interactionHandler,
					ripple.properties,
					function () {
					var _n0 = config.onSelectListItem;
					if (_n0.$ === 'Just') {
						var onSelect = _n0.a;
						return author$project$Internal$Options$onClick(
							onSelect(index));
					} else {
						return author$project$Internal$Options$nop;
					}
				}(),
					A2(
					author$project$Internal$Options$onWithOptions,
					'keydown',
					A3(
						elm$json$Json$Decode$map2,
						F2(
							function (key, keyCode) {
								var selectItem = _Utils_eq(
									key,
									elm$core$Maybe$Just('Enter')) || ((keyCode === 13) || (_Utils_eq(
									key,
									elm$core$Maybe$Just('Space')) || (keyCode === 32)));
								var _n1 = function () {
									if (_Utils_eq(
										key,
										elm$core$Maybe$Just('ArrowDown')) || (keyCode === 40)) {
										var focusable_element = A2(author$project$Internal$List$Implementation$firstNonEmptyId, index + 1, listItemIds);
										if (focusable_element.$ === 'Just') {
											var _n3 = focusable_element.a;
											var next_index = _n3.a;
											var next_item = _n3.b;
											return _Utils_Tuple2(
												elm$core$Maybe$Just(next_index),
												elm$core$Maybe$Just(next_item));
										} else {
											return _Utils_Tuple2(
												elm$core$Maybe$Just(index + 1),
												elm$core$Maybe$Nothing);
										}
									} else {
										if (_Utils_eq(
											key,
											elm$core$Maybe$Just('ArrowUp')) || (keyCode === 38)) {
											var focusable_element = A2(author$project$Internal$List$Implementation$lastNonEmptyId, index, listItemIds);
											if (focusable_element.$ === 'Just') {
												var _n5 = focusable_element.a;
												var previous_index = _n5.a;
												var previous_item = _n5.b;
												return _Utils_Tuple2(
													elm$core$Maybe$Just(previous_index),
													elm$core$Maybe$Just(previous_item));
											} else {
												return _Utils_Tuple2(
													elm$core$Maybe$Just(index - 1),
													elm$core$Maybe$Nothing);
											}
										} else {
											if (_Utils_eq(
												key,
												elm$core$Maybe$Just('Home')) || (keyCode === 36)) {
												return _Utils_Tuple2(
													elm$core$Maybe$Just(0),
													A2(elm$core$Array$get, 0, listItemIds));
											} else {
												if (_Utils_eq(
													key,
													elm$core$Maybe$Just('End')) || (keyCode === 35)) {
													var last_index = elm$core$Array$length(listItemIds) - 1;
													return _Utils_Tuple2(
														elm$core$Maybe$Just(last_index),
														A2(elm$core$Array$get, last_index, listItemIds));
												} else {
													return _Utils_Tuple2(elm$core$Maybe$Nothing, elm$core$Maybe$Nothing);
												}
											}
										}
									}
								}();
								var index_to_focus = _n1.a;
								var id_to_focus = _n1.b;
								var msg = function () {
									if (selectItem) {
										var _n6 = config.onSelectListItem;
										if (_n6.$ === 'Just') {
											var onSelect = _n6.a;
											return A2(author$project$Internal$List$Model$SelectItem, index, onSelect);
										} else {
											return author$project$Internal$List$Model$NoOp;
										}
									} else {
										var _n7 = _Utils_Tuple2(index_to_focus, id_to_focus);
										if ((_n7.a.$ === 'Just') && (_n7.b.$ === 'Just')) {
											var idx = _n7.a.a;
											var id = _n7.b.a;
											return A2(author$project$Internal$List$Model$FocusItem, idx, id);
										} else {
											return author$project$Internal$List$Model$NoOp;
										}
									}
								}();
								return {
									message: lift(msg),
									preventDefault: (!_Utils_eq(index_to_focus, elm$core$Maybe$Nothing)) || selectItem,
									stopPropagation: false
								};
							}),
						elm$json$Json$Decode$oneOf(
							_List_fromArray(
								[
									A2(
									elm$json$Json$Decode$map,
									elm$core$Maybe$Just,
									A2(
										elm$json$Json$Decode$at,
										_List_fromArray(
											['key']),
										elm$json$Json$Decode$string)),
									elm$json$Json$Decode$succeed(elm$core$Maybe$Nothing)
								])),
						A2(
							elm$json$Json$Decode$at,
							_List_fromArray(
								['keyCode']),
							elm$json$Json$Decode$int)))
				]),
			_List_Nil,
			children);
	});
var author$project$Internal$List$Implementation$li = F2(
	function (options, children) {
		return {children: children, focusable: true, options: options, view: author$project$Internal$List$Implementation$liView};
	});
var author$project$Material$List$a = F2(
	function (options, items) {
		return A2(
			author$project$Internal$List$Implementation$li,
			A2(
				elm$core$List$cons,
				author$project$Internal$List$Implementation$node(elm$html$Html$a),
				options),
			items);
	});
var author$project$Internal$List$Implementation$graphicClass = author$project$Internal$Options$cs('mdc-list-item__graphic');
var author$project$Internal$List$Implementation$graphicIcon = function (options) {
	return author$project$Internal$Icon$Implementation$view(
		A2(elm$core$List$cons, author$project$Internal$List$Implementation$graphicClass, options));
};
var author$project$Material$List$graphicIcon = author$project$Internal$List$Implementation$graphicIcon;
var author$project$Page$Internal$Drawer$locationContent = function (location) {
	var _n0 = location.icon;
	if (_n0.$ === 'Nothing') {
		return _List_fromArray(
			[
				elm$html$Html$text(location.label)
			]);
	} else {
		var icon = _n0.a;
		return _List_fromArray(
			[
				A2(author$project$Material$List$graphicIcon, _List_Nil, icon),
				elm$html$Html$text(location.label)
			]);
	}
};
var author$project$Internal$List$Implementation$activated = author$project$Internal$Options$option(
	function (config) {
		return _Utils_update(
			config,
			{activated: true});
	});
var author$project$Material$List$activated = author$project$Internal$List$Implementation$activated;
var author$project$Material$Options$attribute = author$project$Internal$Options$attribute;
var author$project$Page$Internal$Drawer$locationOptions = function (location) {
	var _n0 = location.active;
	if (_n0) {
		return _List_fromArray(
			[
				author$project$Material$Options$attribute(
				elm$html$Html$Attributes$href(location.href)),
				author$project$Material$List$activated
			]);
	} else {
		return _List_fromArray(
			[
				author$project$Material$Options$attribute(
				elm$html$Html$Attributes$href(location.href))
			]);
	}
};
var author$project$Page$Internal$Drawer$viewLocations = F3(
	function (lift, model, locations) {
		var f = function (location) {
			return A2(
				author$project$Material$List$a,
				author$project$Page$Internal$Drawer$locationOptions(location),
				author$project$Page$Internal$Drawer$locationContent(location));
		};
		return A2(elm$core$List$map, f, locations);
	});
var author$project$Page$Internal$Drawer$view = F3(
	function (lift, model, config) {
		return _List_fromArray(
			[
				A5(
				author$project$Material$Drawer$Modal$view,
				A2(elm$core$Basics$composeL, lift, author$project$Page$Internal$Drawer$Mdc),
				'my-drawer',
				model.mdc,
				_List_fromArray(
					[
						A2(author$project$Material$Options$when, model.drawer, author$project$Material$Drawer$Modal$open)
					]),
				_List_fromArray(
					[
						A3(author$project$Page$Internal$Drawer$viewHeader, lift, model, config.header),
						A2(
						author$project$Material$Drawer$Modal$content,
						_List_Nil,
						_List_fromArray(
							[
								A5(
								author$project$Material$List$nav,
								A2(elm$core$Basics$composeL, lift, author$project$Page$Internal$Drawer$Mdc),
								'my-list',
								model.mdc,
								_List_fromArray(
									[author$project$Material$List$singleSelection, author$project$Material$List$useActivated]),
								elm$core$List$concat(
									_List_fromArray(
										[
											A3(author$project$Page$Internal$Drawer$viewLocations, lift, model, config.locations),
											_List_fromArray(
											[
												A2(author$project$Material$List$divider, _List_Nil, _List_Nil)
											]),
											A3(author$project$Page$Internal$Drawer$viewFavourites, lift, model, config.favourites)
										])))
							]))
					])),
				A2(
				author$project$Material$Drawer$Modal$scrim,
				_List_fromArray(
					[
						author$project$Material$Options$onClick(
						lift(author$project$Page$Internal$Drawer$CloseDrawer))
					]),
				_List_Nil)
			]);
	});
var author$project$Page$Internal$viewDrawer = F3(
	function (lift, model, config) {
		return A3(
			author$project$Page$Internal$Drawer$view,
			A2(elm$core$Basics$composeL, lift, author$project$Page$Internal$DrawerMsg),
			model.drawer,
			config);
	});
var author$project$Internal$LinearProgress$Implementation$determinate = function (value) {
	return author$project$Internal$Options$option(
		function (config) {
			return _Utils_update(
				config,
				{determinate: true, value: value});
		});
};
var author$project$Material$LinearProgress$determinate = author$project$Internal$LinearProgress$Implementation$determinate;
var author$project$Internal$LinearProgress$Implementation$indeterminate = author$project$Internal$Options$option(
	function (config) {
		return _Utils_update(
			config,
			{indeterminate: true});
	});
var author$project$Material$LinearProgress$indeterminate = author$project$Internal$LinearProgress$Implementation$indeterminate;
var author$project$Internal$LinearProgress$Implementation$defaultConfig = {buffer: 0, buffered: false, determinate: false, indeterminate: false, reversed: false, value: 0};
var elm$html$Html$span = _VirtualDom_node('span');
var author$project$Internal$LinearProgress$Implementation$view = F2(
	function (options, _n0) {
		var summary = A2(author$project$Internal$Options$collect, author$project$Internal$LinearProgress$Implementation$defaultConfig, options);
		var config = summary.config;
		return A5(
			author$project$Internal$Options$apply,
			summary,
			elm$html$Html$div,
			_List_fromArray(
				[
					author$project$Internal$Options$cs('mdc-linear-progress'),
					A2(
					author$project$Internal$Options$when,
					config.indeterminate,
					author$project$Internal$Options$cs('mdc-linear-progress--indeterminate')),
					A2(
					author$project$Internal$Options$when,
					config.reversed,
					author$project$Internal$Options$cs('mdc-linear-progress--reversed'))
				]),
			_List_Nil,
			_List_fromArray(
				[
					A3(
					author$project$Internal$Options$styled,
					elm$html$Html$div,
					_List_fromArray(
						[
							author$project$Internal$Options$cs('mdc-linear-progress__buffering-dots')
						]),
					_List_Nil),
					A3(
					author$project$Internal$Options$styled,
					elm$html$Html$div,
					_List_fromArray(
						[
							author$project$Internal$Options$cs('mdc-linear-progress__buffer'),
							A2(
							author$project$Internal$Options$when,
							config.buffered,
							A2(
								author$project$Internal$Options$css,
								'transform',
								'scaleX(' + (elm$core$String$fromFloat(config.buffer) + ')')))
						]),
					_List_Nil),
					A3(
					author$project$Internal$Options$styled,
					elm$html$Html$div,
					_List_fromArray(
						[
							author$project$Internal$Options$cs('mdc-linear-progress__bar mdc-linear-progress__primary-bar'),
							A2(
							author$project$Internal$Options$when,
							!config.indeterminate,
							A2(
								author$project$Internal$Options$css,
								'transform',
								'scaleX(' + (elm$core$String$fromFloat(config.value) + ')')))
						]),
					_List_fromArray(
						[
							A3(
							author$project$Internal$Options$styled,
							elm$html$Html$span,
							_List_fromArray(
								[
									author$project$Internal$Options$cs('mdc-linear-progress__bar-inner')
								]),
							_List_Nil)
						])),
					A3(
					author$project$Internal$Options$styled,
					elm$html$Html$div,
					_List_fromArray(
						[
							author$project$Internal$Options$cs('mdc-linear-progress__bar mdc-linear-progress__secondary-bar')
						]),
					_List_fromArray(
						[
							A3(
							author$project$Internal$Options$styled,
							elm$html$Html$span,
							_List_fromArray(
								[
									author$project$Internal$Options$cs('mdc-linear-progress__bar-inner')
								]),
							_List_Nil)
						]))
				]));
	});
var author$project$Material$LinearProgress$view = author$project$Internal$LinearProgress$Implementation$view;
var author$project$Page$Internal$viewProgress = function (progress) {
	if (progress.$ === 'Just') {
		var progress_type = progress.a;
		if (progress_type.$ === 'Progress') {
			var value = progress_type.a;
			return A2(
				author$project$Material$LinearProgress$view,
				_List_fromArray(
					[
						author$project$Material$LinearProgress$determinate(value)
					]),
				_List_Nil);
		} else {
			return A2(
				author$project$Material$LinearProgress$view,
				_List_fromArray(
					[author$project$Material$LinearProgress$indeterminate]),
				_List_Nil);
		}
	} else {
		return A2(elm$html$Html$div, _List_Nil, _List_Nil);
	}
};
var author$project$Page$Internal$viewBody = F5(
	function (lift, bar, document, model, drawer_config) {
		return A3(
			author$project$Material$Options$styled,
			elm$html$Html$div,
			_List_fromArray(
				[
					A2(author$project$Material$Options$css, 'display', 'flex'),
					A2(author$project$Material$Options$css, 'flex-flow', 'column'),
					A2(author$project$Material$Options$css, 'height', '100%'),
					author$project$Material$Typography$typography
				]),
			_List_fromArray(
				[
					bar,
					A3(
					author$project$Material$Options$styled,
					elm$html$Html$div,
					_List_fromArray(
						[
							author$project$Material$Options$cs('demo-panel'),
							A2(author$project$Material$Options$css, 'display', 'flex')
						]),
					_List_fromArray(
						[
							A2(
							elm$html$Html$div,
							_List_Nil,
							A3(author$project$Page$Internal$viewDrawer, lift, model, drawer_config)),
							A3(
							author$project$Material$Options$styled,
							elm$html$Html$div,
							_List_fromArray(
								[
									author$project$Material$Options$cs('demo-content'),
									author$project$Material$TopAppBar$fixedAdjust,
									A2(author$project$Material$Options$css, 'width', '100%'),
									A2(author$project$Material$Options$css, 'display', 'flex'),
									A2(author$project$Material$Options$css, 'justify-content', 'flex-start'),
									A2(author$project$Material$Options$css, 'flex-direction', 'column'),
									A2(author$project$Material$Options$css, 'align-items', 'center')
								]),
							_List_fromArray(
								[
									author$project$Page$Internal$viewProgress(document.progress),
									A3(
									author$project$Material$Options$styled,
									elm$html$Html$div,
									_List_fromArray(
										[
											author$project$Material$Options$cs('demo-content-transition'),
											A2(author$project$Material$Options$css, 'width', '100%'),
											A2(author$project$Material$Options$css, 'max-width', '1200px')
										]),
									document.body)
								]))
						]))
				]));
	});
var author$project$Internal$TopAppBar$Implementation$alignEnd = author$project$Internal$Options$cs('mdc-top-app-bar__section--align-end');
var author$project$Material$TopAppBar$alignEnd = author$project$Internal$TopAppBar$Implementation$alignEnd;
var author$project$Internal$TopAppBar$Implementation$alignStart = author$project$Internal$Options$cs('mdc-top-app-bar__section--align-start');
var author$project$Material$TopAppBar$alignStart = author$project$Internal$TopAppBar$Implementation$alignStart;
var author$project$Internal$Icon$Implementation$node = function (ctor) {
	return author$project$Internal$Options$option(
		function (config) {
			return _Utils_update(
				config,
				{node: ctor});
		});
};
var author$project$Internal$Icon$Implementation$button = author$project$Internal$Icon$Implementation$node('button');
var author$project$Internal$TopAppBar$Implementation$actionItemView = F5(
	function (domId, lift, model, options, name) {
		var ripple = A5(
			author$project$Internal$Ripple$Implementation$view,
			true,
			domId,
			A2(
				elm$core$Basics$composeL,
				lift,
				author$project$Internal$TopAppBar$Model$RippleMsg(domId)),
			A2(
				elm$core$Maybe$withDefault,
				author$project$Internal$Ripple$Model$defaultModel,
				A2(elm$core$Dict$get, domId, model.ripples)),
			_List_Nil);
		return A2(
			author$project$Internal$Icon$Implementation$view,
			A2(
				elm$core$List$cons,
				author$project$Internal$Icon$Implementation$button,
				A2(
					elm$core$List$cons,
					author$project$Internal$Options$cs('mdc-icon-button'),
					A2(
						elm$core$List$cons,
						ripple.interactionHandler,
						A2(elm$core$List$cons, ripple.properties, options)))),
			name);
	});
var author$project$Internal$TopAppBar$Implementation$actionItem = F2(
	function (lift, index) {
		return A5(
			author$project$Internal$Component$render,
			author$project$Internal$TopAppBar$Implementation$getSet.get,
			author$project$Internal$TopAppBar$Implementation$actionItemView(index),
			author$project$Internal$Msg$TopAppBarMsg,
			lift,
			index);
	});
var author$project$Material$TopAppBar$navigationIcon = F5(
	function (lift, index, model, options, name) {
		return A5(
			author$project$Internal$TopAppBar$Implementation$actionItem,
			lift,
			index,
			model,
			A2(
				elm$core$List$cons,
				author$project$Material$Options$cs('mdc-top-app-bar__navigation-icon'),
				options),
			name);
	});
var elm$html$Html$section = _VirtualDom_node('section');
var author$project$Internal$TopAppBar$Implementation$section = function (options) {
	return A2(
		author$project$Internal$Options$styled,
		elm$html$Html$section,
		A2(
			elm$core$List$cons,
			author$project$Internal$Options$cs('mdc-top-app-bar__section'),
			options));
};
var author$project$Material$TopAppBar$section = author$project$Internal$TopAppBar$Implementation$section;
var author$project$Internal$TopAppBar$Implementation$title = function (options) {
	return A2(
		author$project$Internal$Options$styled,
		elm$html$Html$span,
		A2(
			elm$core$List$cons,
			author$project$Internal$Options$cs('mdc-top-app-bar__title'),
			options));
};
var author$project$Material$TopAppBar$title = author$project$Internal$TopAppBar$Implementation$title;
var author$project$Internal$GlobalEvents$onResize = author$project$Internal$GlobalEvents$listener('globalresize');
var author$project$Internal$GlobalEvents$onScroll = author$project$Internal$GlobalEvents$listener('globalscroll');
var author$project$Internal$TopAppBar$Implementation$cssClasses = {collapsed: 'mdc-top-app-bar--short-collapsed', dense: 'mdc-top-app-bar--dense', fixed: 'mdc-top-app-bar--fixed', prominent: 'mdc-top-app-bar--prominent', scrolled: 'mdc-top-app-bar--fixed-scrolled', _short: 'mdc-top-app-bar--short'};
var author$project$Internal$TopAppBar$Implementation$getAppBarHeight = A2(
	elm$json$Json$Decode$at,
	_List_fromArray(
		['target', 'clientHeight']),
	elm$json$Json$Decode$float);
var author$project$Internal$TopAppBar$Implementation$getViewportScrollY = debois$elm_dom$DOM$target(
	A2(
		elm$json$Json$Decode$at,
		_List_fromArray(
			['ownerDocument', 'defaultView', 'scrollY']),
		elm$json$Json$Decode$float));
var author$project$Internal$TopAppBar$Implementation$row = function (options) {
	return A2(
		author$project$Internal$Options$styled,
		elm$html$Html$div,
		A2(
			elm$core$List$cons,
			author$project$Internal$Options$cs('mdc-top-app-bar__row'),
			options));
};
var author$project$Internal$TopAppBar$Model$Init = function (a) {
	return {$: 'Init', a: a};
};
var author$project$Internal$TopAppBar$Model$Resize = function (a) {
	return {$: 'Resize', a: a};
};
var author$project$Internal$TopAppBar$Model$Scroll = function (a) {
	return {$: 'Scroll', a: a};
};
var author$project$Internal$TopAppBar$Model$defaultConfig = {collapsed: false, dense: false, fixed: false, prominent: false, _short: false};
var author$project$Internal$TopAppBar$Implementation$topAppBar = F4(
	function (lift, model, options, sections) {
		var top = A2(elm$core$Maybe$withDefault, 0, model.styleTop);
		var lastScrollPosition = A2(elm$core$Maybe$withDefault, 0, model.lastScrollPosition);
		var summary = A2(author$project$Internal$Options$collect, author$project$Internal$TopAppBar$Model$defaultConfig, options);
		var config = summary.config;
		return A5(
			author$project$Internal$Options$apply,
			summary,
			elm$html$Html$header,
			_List_fromArray(
				[
					author$project$Internal$Options$cs('mdc-top-app-bar'),
					A2(
					author$project$Internal$Options$when,
					config.dense,
					author$project$Internal$Options$cs(author$project$Internal$TopAppBar$Implementation$cssClasses.dense)),
					A2(
					author$project$Internal$Options$when,
					config.fixed,
					author$project$Internal$Options$cs(author$project$Internal$TopAppBar$Implementation$cssClasses.fixed)),
					A2(
					author$project$Internal$Options$when,
					config.fixed && (lastScrollPosition > 0),
					author$project$Internal$Options$cs(author$project$Internal$TopAppBar$Implementation$cssClasses.scrolled)),
					A2(
					author$project$Internal$Options$when,
					config.prominent,
					author$project$Internal$Options$cs(author$project$Internal$TopAppBar$Implementation$cssClasses.prominent)),
					A2(
					author$project$Internal$Options$when,
					config._short,
					author$project$Internal$Options$cs(author$project$Internal$TopAppBar$Implementation$cssClasses._short)),
					A2(
					author$project$Internal$Options$when,
					config.collapsed || (config._short && (lastScrollPosition > 0)),
					author$project$Internal$Options$cs(author$project$Internal$TopAppBar$Implementation$cssClasses.collapsed)),
					A2(
					author$project$Internal$Options$when,
					(!config.fixed) && (!config._short),
					A2(
						author$project$Internal$Options$css,
						'top',
						elm$core$String$fromFloat(top) + 'px')),
					author$project$Internal$GlobalEvents$onScroll(
					A2(
						elm$json$Json$Decode$map,
						lift,
						A2(
							elm$json$Json$Decode$map,
							function (scrollPosition) {
								return author$project$Internal$TopAppBar$Model$Scroll(
									{scrollPosition: scrollPosition});
							},
							author$project$Internal$TopAppBar$Implementation$getViewportScrollY))),
					author$project$Internal$GlobalEvents$onResize(
					A2(
						elm$json$Json$Decode$map,
						lift,
						A3(
							elm$json$Json$Decode$map2,
							F2(
								function (scrollPosition, topAppBarHeight) {
									return author$project$Internal$TopAppBar$Model$Resize(
										{scrollPosition: scrollPosition, topAppBarHeight: topAppBarHeight});
								}),
							author$project$Internal$TopAppBar$Implementation$getViewportScrollY,
							author$project$Internal$TopAppBar$Implementation$getAppBarHeight))),
					A2(
					author$project$Internal$Options$when,
					A2(
						elm$core$List$any,
						elm$core$Basics$identity,
						_List_fromArray(
							[
								_Utils_eq(model.lastScrollPosition, elm$core$Maybe$Nothing),
								_Utils_eq(model.topAppBarHeight, elm$core$Maybe$Nothing)
							])),
					author$project$Internal$GlobalEvents$onTick(
						A2(
							elm$json$Json$Decode$map,
							lift,
							A3(
								elm$json$Json$Decode$map2,
								F2(
									function (scrollPosition, topAppBarHeight) {
										return author$project$Internal$TopAppBar$Model$Init(
											{scrollPosition: scrollPosition, topAppBarHeight: topAppBarHeight});
									}),
								author$project$Internal$TopAppBar$Implementation$getViewportScrollY,
								author$project$Internal$TopAppBar$Implementation$getAppBarHeight))))
				]),
			_List_Nil,
			_List_fromArray(
				[
					A2(author$project$Internal$TopAppBar$Implementation$row, _List_Nil, sections)
				]));
	});
var author$project$Internal$TopAppBar$Implementation$view = A3(author$project$Internal$Component$render, author$project$Internal$TopAppBar$Implementation$getSet.get, author$project$Internal$TopAppBar$Implementation$topAppBar, author$project$Internal$Msg$TopAppBarMsg);
var author$project$Material$TopAppBar$view = author$project$Internal$TopAppBar$Implementation$view;
var author$project$Material$TopAppBar$actionItem = F5(
	function (lift, index, model, options, name) {
		return A5(
			author$project$Internal$TopAppBar$Implementation$actionItem,
			lift,
			index,
			model,
			A2(
				elm$core$List$cons,
				author$project$Material$Options$cs('mdc-top-app-bar__action-item'),
				options),
			name);
	});
var author$project$Page$Internal$AppBar$viewActionItems = F3(
	function (lift, model, config) {
		return A2(
			elm$core$List$map,
			function (item) {
				return A5(
					author$project$Material$TopAppBar$actionItem,
					A2(elm$core$Basics$composeL, lift, author$project$Page$Internal$AppBar$Mdc),
					'my' + item.icon,
					model.mdc,
					item.configs,
					item.icon);
			},
			config.action_items);
	});
var author$project$Page$Internal$AppBar$view = F4(
	function (lift, model, config, drawer_callback) {
		return A5(
			author$project$Material$TopAppBar$view,
			A2(elm$core$Basics$composeL, lift, author$project$Page$Internal$AppBar$Mdc),
			'my-top-app-bar',
			model.mdc,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					author$project$Material$TopAppBar$section,
					_List_fromArray(
						[author$project$Material$TopAppBar$alignStart]),
					_List_fromArray(
						[
							A5(
							author$project$Material$TopAppBar$navigationIcon,
							A2(elm$core$Basics$composeL, lift, author$project$Page$Internal$AppBar$Mdc),
							'my-menu',
							model.mdc,
							_List_fromArray(
								[
									author$project$Material$Options$onClick(drawer_callback)
								]),
							'menu')
						])),
					A2(
					author$project$Material$TopAppBar$section,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							author$project$Material$TopAppBar$title,
							_List_Nil,
							_List_fromArray(
								[config.title]))
						])),
					A2(
					author$project$Material$TopAppBar$section,
					_List_fromArray(
						[author$project$Material$TopAppBar$alignEnd]),
					elm$core$List$concat(
						_List_fromArray(
							[
								A3(author$project$Page$Internal$AppBar$viewActionItems, lift, model, config),
								config.other
							])))
				]));
	});
var author$project$Page$Internal$Drawer$OpenDrawer = {$: 'OpenDrawer'};
var author$project$Page$Internal$viewHeader = F3(
	function (lift, model, config) {
		return A4(
			author$project$Page$Internal$AppBar$view,
			A2(elm$core$Basics$composeL, lift, author$project$Page$Internal$AppBarMsg),
			model.appbar,
			config,
			lift(
				author$project$Page$Internal$DrawerMsg(author$project$Page$Internal$Drawer$OpenDrawer)));
	});
var author$project$Page$Internal$NavigationMsg = function (a) {
	return {$: 'NavigationMsg', a: a};
};
var author$project$Internal$Elevation$Implementation$z = function (v) {
	return author$project$Internal$Options$cs(
		'mdc-elevation--z' + elm$core$String$fromInt(v));
};
var author$project$Internal$Elevation$Implementation$z3 = author$project$Internal$Elevation$Implementation$z(3);
var author$project$Material$Elevation$z3 = author$project$Internal$Elevation$Implementation$z3;
var author$project$Internal$Theme$Implementation$primaryBg = author$project$Internal$Options$cs('mdc-theme--primary-bg');
var author$project$Material$Theme$primaryBg = author$project$Internal$Theme$Implementation$primaryBg;
var author$project$Internal$Button$Implementation$icon = function (str) {
	return author$project$Internal$Options$option(
		function (config) {
			return _Utils_update(
				config,
				{
					icon: elm$core$Maybe$Just(str)
				});
		});
};
var author$project$Material$Button$icon = author$project$Internal$Button$Implementation$icon;
var author$project$Internal$LayoutGrid$Implementation$fixedColumnWidth = author$project$Internal$Options$cs('mdc-layout-grid--fixed-column-width');
var author$project$Material$LayoutGrid$fixedColumnWidth = author$project$Internal$LayoutGrid$Implementation$fixedColumnWidth;
var author$project$Internal$Theme$Implementation$textIconOnBackground = author$project$Internal$Options$cs('mdc-theme--text-icon-on-background');
var author$project$Material$Theme$textIconOnBackground = author$project$Internal$Theme$Implementation$textIconOnBackground;
var author$project$Page$Internal$Navigation$Back = {$: 'Back'};
var author$project$Page$Internal$Navigation$Mdc = function (a) {
	return {$: 'Mdc', a: a};
};
var author$project$Page$Internal$Navigation$viewPaginate = F3(
	function (lift, mdc, state) {
		return A2(
			author$project$Material$LayoutGrid$view,
			_List_fromArray(
				[author$project$Material$LayoutGrid$fixedColumnWidth]),
			_List_fromArray(
				[
					A2(
					author$project$Material$LayoutGrid$cell,
					_List_fromArray(
						[author$project$Material$LayoutGrid$alignLeft]),
					_List_fromArray(
						[
							A5(
							author$project$Material$Button$view,
							A2(elm$core$Basics$composeL, lift, author$project$Page$Internal$Navigation$Mdc),
							'paginate-first',
							mdc,
							_List_fromArray(
								[
									author$project$Material$Theme$textIconOnBackground,
									author$project$Material$Button$outlined,
									author$project$Material$Button$ripple,
									author$project$Material$Options$onClick(
									lift(author$project$Page$Internal$Navigation$Back)),
									author$project$Material$Button$icon('person')
								]),
							_List_Nil)
						])),
					A2(
					author$project$Material$LayoutGrid$cell,
					_List_fromArray(
						[author$project$Material$LayoutGrid$alignMiddle]),
					_List_Nil),
					A2(
					author$project$Material$LayoutGrid$cell,
					_List_fromArray(
						[author$project$Material$LayoutGrid$alignRight]),
					_List_Nil)
				]));
	});
var author$project$Page$Internal$Navigation$view = F3(
	function (lift, mdc, state) {
		return A3(
			author$project$Material$Options$styled,
			elm$html$Html$div,
			_List_fromArray(
				[
					author$project$Material$Typography$typography,
					author$project$Material$Elevation$z3,
					A2(author$project$Material$Options$css, 'position', 'fixed'),
					A2(author$project$Material$Options$css, 'left', '0'),
					A2(author$project$Material$Options$css, 'bottom', '0'),
					A2(author$project$Material$Options$css, 'width', '100%'),
					author$project$Material$Theme$primaryBg
				]),
			_List_fromArray(
				[
					A3(author$project$Page$Internal$Navigation$viewPaginate, lift, mdc, state)
				]));
	});
var author$project$Page$Internal$viewNavigation = F3(
	function (lift, mdc, wntype) {
		if (wntype.$ === 'Just') {
			var _n1 = wntype.a;
			var cur_index = _n1.a;
			var max_index = _n1.b;
			return A3(
				author$project$Page$Internal$Navigation$view,
				A2(elm$core$Basics$composeL, lift, author$project$Page$Internal$NavigationMsg),
				mdc,
				{cur_index: cur_index, max_index: max_index});
		} else {
			return A2(elm$html$Html$div, _List_Nil, _List_Nil);
		}
	});
var author$project$Page$Internal$view = F4(
	function (lift, model, document, drawer) {
		var header = A3(author$project$Page$Internal$viewHeader, lift, model, document.appbar);
		return {
			body: A2(
				elm$core$List$cons,
				A5(author$project$Page$Internal$viewBody, lift, header, document, model, drawer),
				_List_fromArray(
					[
						A3(author$project$Page$Internal$viewNavigation, lift, model.mdc, document.navigation)
					])),
			title: document.title + ' - M²C'
		};
	});
var author$project$Internal$TextField$Implementation$outlined = author$project$Internal$Options$option(
	function (config) {
		return _Utils_update(
			config,
			{outlined: true});
	});
var author$project$Material$TextField$outlined = author$project$Internal$TextField$Implementation$outlined;
var author$project$Page$Login$UpdateTextField = function (a) {
	return {$: 'UpdateTextField', a: a};
};
var author$project$Page$Login$ask = F3(
	function (lift, model, data) {
		return A5(
			author$project$Material$TextField$view,
			A2(elm$core$Basics$composeL, lift, author$project$Page$Login$Mdc),
			'my-text-field',
			model.mdc,
			_List_fromArray(
				[
					author$project$Material$TextField$label('Text field'),
					author$project$Material$Options$onInput(
					A2(elm$core$Basics$composeL, lift, author$project$Page$Login$UpdateTextField)),
					author$project$Material$TextField$outlined,
					author$project$Material$Options$cs('demo-text-field-outlined-shaped')
				]),
			_List_Nil);
	});
var author$project$Internal$List$Implementation$avatarList = author$project$Internal$Options$cs('mdc-list--avatar-list');
var author$project$Material$List$avatarList = author$project$Internal$List$Implementation$avatarList;
var author$project$Internal$List$Implementation$onSelectListItem = function (handler) {
	return author$project$Internal$Options$option(
		function (config) {
			return _Utils_update(
				config,
				{
					onSelectListItem: elm$core$Maybe$Just(handler)
				});
		});
};
var author$project$Material$List$onSelectListItem = author$project$Internal$List$Implementation$onSelectListItem;
var author$project$Internal$List$Implementation$twoLine = author$project$Internal$Options$cs('mdc-list--two-line');
var author$project$Material$List$twoLine = author$project$Internal$List$Implementation$twoLine;
var author$project$Material$List$ul = author$project$Internal$List$Implementation$view;
var author$project$Page$Login$Select = function (a) {
	return {$: 'Select', a: a};
};
var author$project$Material$List$li = author$project$Internal$List$Implementation$li;
var author$project$Internal$List$Implementation$metaClass = author$project$Internal$Options$cs('mdc-list-item__meta');
var author$project$Internal$List$Implementation$metaIcon = function (options) {
	return author$project$Internal$Icon$Implementation$view(
		A2(elm$core$List$cons, author$project$Internal$List$Implementation$metaClass, options));
};
var author$project$Material$List$metaIcon = author$project$Internal$List$Implementation$metaIcon;
var author$project$Internal$List$Implementation$primaryText = function (options) {
	return A2(
		author$project$Internal$Options$styled,
		elm$html$Html$span,
		A2(
			elm$core$List$cons,
			author$project$Internal$Options$cs('mdc-list-item__primary-text'),
			options));
};
var author$project$Material$List$primaryText = author$project$Internal$List$Implementation$primaryText;
var author$project$Internal$List$Implementation$secondaryText = function (options) {
	return A2(
		author$project$Internal$Options$styled,
		elm$html$Html$span,
		A2(
			elm$core$List$cons,
			author$project$Internal$Options$cs('mdc-list-item__secondary-text'),
			options));
};
var author$project$Material$List$secondaryText = author$project$Internal$List$Implementation$secondaryText;
var author$project$Internal$List$Implementation$text = function (options) {
	return A2(
		author$project$Internal$Options$styled,
		elm$html$Html$span,
		A2(
			elm$core$List$cons,
			author$project$Internal$Options$cs('mdc-list-item__text'),
			options));
};
var author$project$Material$List$text = author$project$Internal$List$Implementation$text;
var author$project$Page$Login$viewCoderRow = function (_n0) {
	var id = _n0.a;
	var model = _n0.b;
	return A2(
		author$project$Material$List$li,
		_List_Nil,
		_List_fromArray(
			[
				A2(author$project$Material$List$graphicIcon, _List_Nil, 'person'),
				A2(
				author$project$Material$List$text,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						author$project$Material$List$primaryText,
						_List_Nil,
						_List_fromArray(
							[
								elm$html$Html$text(model.name)
							])),
						A2(
						author$project$Material$List$secondaryText,
						_List_Nil,
						_List_fromArray(
							[
								elm$html$Html$text(
								Chadtech$elm_relational_database$Id$toString(id))
							]))
					])),
				A2(author$project$Material$List$metaIcon, _List_Nil, 'info')
			]));
};
var author$project$Page$Login$toPersonList = F3(
	function (lift, model, persons) {
		return A5(
			author$project$Material$List$ul,
			A2(elm$core$Basics$composeL, lift, author$project$Page$Login$Mdc),
			'my-list',
			model.mdc,
			_List_fromArray(
				[
					author$project$Material$List$twoLine,
					author$project$Material$List$avatarList,
					author$project$Material$List$onSelectListItem(
					A2(elm$core$Basics$composeL, lift, author$project$Page$Login$Select))
				]),
			A2(elm$core$List$map, author$project$Page$Login$viewCoderRow, persons));
	});
var author$project$Page$Login$showResults = F4(
	function (lift, name, db, model) {
		return A3(
			author$project$Page$Login$toPersonList,
			lift,
			model,
			A2(author$project$Page$Login$getFilteredList, db, name));
	});
var elm$html$Html$p = _VirtualDom_node('p');
var author$project$Page$Login$viewSearch = F3(
	function (lift, model, data) {
		return {
			appbar: {
				action_items: _List_Nil,
				other: _List_Nil,
				title: elm$html$Html$text('Login')
			},
			body: _List_fromArray(
				[
					elm$html$Html$text('You\'re not logged in yet.'),
					A2(
					elm$html$Html$p,
					_List_Nil,
					_List_fromArray(
						[
							A3(author$project$Page$Login$ask, lift, model, data)
						])),
					A2(
					elm$html$Html$p,
					_List_Nil,
					_List_fromArray(
						[
							A4(author$project$Page$Login$showResults, lift, model.field, data.coders, model)
						]))
				]),
			navigation: elm$core$Maybe$Nothing,
			progress: elm$core$Maybe$Nothing,
			title: 'Please log in.'
		};
	});
var author$project$Page$Login$view = F4(
	function (lift, model, data, user) {
		if (user.$ === 'Nothing') {
			return A3(author$project$Page$Login$viewSearch, lift, model, data);
		} else {
			var row = user.a;
			return {
				appbar: {
					action_items: _List_Nil,
					other: _List_Nil,
					title: elm$html$Html$text('Login')
				},
				body: _List_fromArray(
					[
						elm$html$Html$text('You\'re already logged in as')
					]),
				navigation: elm$core$Maybe$Nothing,
				progress: elm$core$Maybe$Just(
					author$project$Page$Internal$Progress(1.0)),
				title: 'Already logged in as'
			};
		}
	});
var author$project$Page$StartPage$getAppBar = F2(
	function (lift, mdc) {
		return {
			action_items: _List_fromArray(
				[
					{configs: _List_Nil, icon: 'person'}
				]),
			other: _List_Nil,
			title: elm$html$Html$text('Start Page')
		};
	});
var author$project$Page$StartPage$longBody = A2(
	elm$html$Html$div,
	_List_Nil,
	_List_fromArray(
		[
			A2(
			elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					elm$html$Html$text('Line')
				])),
			A2(
			elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					elm$html$Html$text('Line')
				])),
			A2(
			elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					elm$html$Html$text('Line')
				])),
			A2(
			elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					elm$html$Html$text('Line')
				])),
			A2(
			elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					elm$html$Html$text('Line')
				])),
			A2(
			elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					elm$html$Html$text('Line')
				])),
			A2(
			elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					elm$html$Html$text('Line')
				])),
			A2(
			elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					elm$html$Html$text('Line')
				])),
			A2(
			elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					elm$html$Html$text('Line')
				])),
			A2(
			elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					elm$html$Html$text('Line')
				])),
			A2(
			elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					elm$html$Html$text('Line')
				])),
			A2(
			elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					elm$html$Html$text('Line')
				])),
			A2(
			elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					elm$html$Html$text('Line')
				])),
			A2(
			elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					elm$html$Html$text('Line')
				])),
			A2(
			elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					elm$html$Html$text('Line')
				])),
			A2(
			elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					elm$html$Html$text('Line')
				])),
			A2(
			elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					elm$html$Html$text('Line')
				])),
			A2(
			elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					elm$html$Html$text('Line')
				])),
			A2(
			elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					elm$html$Html$text('Line')
				])),
			A2(
			elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					elm$html$Html$text('Line')
				])),
			A2(
			elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					elm$html$Html$text('Line')
				])),
			A2(
			elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					elm$html$Html$text('Line')
				])),
			A2(
			elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					elm$html$Html$text('Line')
				])),
			A2(
			elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					elm$html$Html$text('Line')
				])),
			A2(
			elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					elm$html$Html$text('Line')
				])),
			A2(
			elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					elm$html$Html$text('Line')
				])),
			A2(
			elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					elm$html$Html$text('Line')
				])),
			A2(
			elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					elm$html$Html$text('Line')
				])),
			A2(
			elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					elm$html$Html$text('Line')
				])),
			A2(
			elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					elm$html$Html$text('Line')
				])),
			A2(
			elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					elm$html$Html$text('Line')
				])),
			A2(
			elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					elm$html$Html$text('Line')
				])),
			A2(
			elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					elm$html$Html$text('Line')
				])),
			A2(
			elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					elm$html$Html$text('Line')
				]))
		]));
var author$project$Page$StartPage$view = F2(
	function (lift, mdc) {
		return {
			appbar: A2(author$project$Page$StartPage$getAppBar, lift, mdc),
			body: _List_fromArray(
				[author$project$Page$StartPage$longBody]),
			navigation: elm$core$Maybe$Nothing,
			progress: elm$core$Maybe$Nothing,
			title: 'Start Page'
		};
	});
var author$project$Page$Upload$DragEnter = {$: 'DragEnter'};
var author$project$Page$Upload$DragLeave = {$: 'DragLeave'};
var author$project$Page$Upload$Pick = {$: 'Pick'};
var elm$file$File$decoder = _File_decoder;
var elm$json$Json$Decode$oneOrMoreHelp = F2(
	function (toValue, xs) {
		if (!xs.b) {
			return elm$json$Json$Decode$fail('a ARRAY with at least ONE element');
		} else {
			var y = xs.a;
			var ys = xs.b;
			return elm$json$Json$Decode$succeed(
				A2(toValue, y, ys));
		}
	});
var elm$json$Json$Decode$oneOrMore = F2(
	function (toValue, decoder) {
		return A2(
			elm$json$Json$Decode$andThen,
			elm$json$Json$Decode$oneOrMoreHelp(toValue),
			elm$json$Json$Decode$list(decoder));
	});
var author$project$Page$Upload$dropDecoder = function (lift) {
	return A2(
		elm$json$Json$Decode$map,
		lift,
		A2(
			elm$json$Json$Decode$at,
			_List_fromArray(
				['dataTransfer', 'files']),
			A2(elm$json$Json$Decode$oneOrMore, author$project$Page$Upload$GotFiles, elm$file$File$decoder)));
};
var author$project$Page$Upload$hijack = function (msg) {
	return _Utils_Tuple2(msg, true);
};
var elm$virtual_dom$VirtualDom$MayPreventDefault = function (a) {
	return {$: 'MayPreventDefault', a: a};
};
var elm$html$Html$Events$preventDefaultOn = F2(
	function (event, decoder) {
		return A2(
			elm$virtual_dom$VirtualDom$on,
			event,
			elm$virtual_dom$VirtualDom$MayPreventDefault(decoder));
	});
var author$project$Page$Upload$hijackOn = F2(
	function (event, decoder) {
		return A2(
			elm$html$Html$Events$preventDefaultOn,
			event,
			A2(elm$json$Json$Decode$map, author$project$Page$Upload$hijack, decoder));
	});
var elm$virtual_dom$VirtualDom$style = _VirtualDom_style;
var elm$html$Html$Attributes$style = elm$virtual_dom$VirtualDom$style;
var elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 'Normal', a: a};
};
var elm$html$Html$Events$on = F2(
	function (event, decoder) {
		return A2(
			elm$virtual_dom$VirtualDom$on,
			event,
			elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var elm$html$Html$Events$onClick = function (msg) {
	return A2(
		elm$html$Html$Events$on,
		'click',
		elm$json$Json$Decode$succeed(msg));
};
var author$project$Page$Upload$viewBody = F3(
	function (lift, mdc, model) {
		return _List_fromArray(
			[
				A2(
				author$project$Material$LayoutGrid$view,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						author$project$Material$LayoutGrid$cell,
						_List_fromArray(
							[author$project$Material$LayoutGrid$span12Desktop, author$project$Material$LayoutGrid$span8Tablet, author$project$Material$LayoutGrid$span4Phone]),
						_List_fromArray(
							[
								A2(
								elm$html$Html$div,
								_List_fromArray(
									[
										A2(
										elm$html$Html$Attributes$style,
										'border',
										model.hover ? '6px dashed purple' : '6px dashed #ccc'),
										A2(elm$html$Html$Attributes$style, 'border-radius', '20px'),
										A2(elm$html$Html$Attributes$style, 'height', '100px'),
										A2(elm$html$Html$Attributes$style, 'margin', '100px auto'),
										A2(elm$html$Html$Attributes$style, 'padding', '20px'),
										A2(elm$html$Html$Attributes$style, 'display', 'flex'),
										A2(elm$html$Html$Attributes$style, 'flex-direction', 'column'),
										A2(elm$html$Html$Attributes$style, 'justify-content', 'center'),
										A2(elm$html$Html$Attributes$style, 'align-items', 'center'),
										A2(
										author$project$Page$Upload$hijackOn,
										'dragenter',
										elm$json$Json$Decode$succeed(
											lift(author$project$Page$Upload$DragEnter))),
										A2(
										author$project$Page$Upload$hijackOn,
										'dragover',
										elm$json$Json$Decode$succeed(
											lift(author$project$Page$Upload$DragEnter))),
										A2(
										author$project$Page$Upload$hijackOn,
										'dragleave',
										elm$json$Json$Decode$succeed(
											lift(author$project$Page$Upload$DragLeave))),
										A2(
										author$project$Page$Upload$hijackOn,
										'drop',
										author$project$Page$Upload$dropDecoder(lift))
									]),
								_List_fromArray(
									[
										A2(
										elm$html$Html$button,
										_List_fromArray(
											[
												elm$html$Html$Events$onClick(
												lift(author$project$Page$Upload$Pick))
											]),
										_List_fromArray(
											[
												elm$html$Html$text('Upload Images')
											]))
									]))
							]))
					]))
			]);
	});
var author$project$Page$Upload$view = F3(
	function (lift, model, data) {
		return {
			appbar: {
				action_items: _List_Nil,
				other: _List_Nil,
				title: elm$html$Html$text('hi')
			},
			body: A3(author$project$Page$Upload$viewBody, lift, model.mdc, model),
			navigation: elm$core$Maybe$Nothing,
			progress: elm$core$Maybe$Nothing,
			title: 'Nö'
		};
	});
var author$project$Page$view = F2(
	function (model, data) {
		var viewLoggedIn = F3(
			function (viewf, msg, page) {
				var _n2 = model.user;
				if (_n2.$ === 'Just') {
					var user = _n2.a;
					return A4(
						author$project$Page$Internal$view,
						author$project$Page$Internal,
						model.internal,
						A4(
							viewf,
							A2(elm$core$Basics$composeL, author$project$Page$PageMsg, msg),
							page,
							data,
							user),
						author$project$Page$drawerConfig(model));
				} else {
					return A4(
						author$project$Page$Internal$view,
						author$project$Page$Internal,
						model.internal,
						A4(
							author$project$Page$Login$view,
							A2(elm$core$Basics$composeL, author$project$Page$PageMsg, author$project$Page$GotLoginMsg),
							model.page.login,
							data,
							model.user),
						author$project$Page$drawerConfig(model));
				}
			});
		var _n0 = model.url;
		switch (_n0.$) {
			case 'Data':
				return A3(viewLoggedIn, author$project$Page$Data$view, author$project$Page$GotDataMsg, model.page.data);
			case 'Error':
				return A4(
					author$project$Page$Internal$view,
					author$project$Page$Internal,
					model.internal,
					A3(
						author$project$Page$Error$view,
						A2(elm$core$Basics$composeL, author$project$Page$PageMsg, author$project$Page$GotErrorMsg),
						model.page.error,
						data),
					author$project$Page$drawerConfig(model));
			case 'StartPage':
				return A4(
					author$project$Page$Internal$view,
					author$project$Page$Internal,
					model.internal,
					A2(
						author$project$Page$StartPage$view,
						A2(elm$core$Basics$composeL, author$project$Page$PageMsg, author$project$Page$GotStartPageMsg),
						model.mdc),
					author$project$Page$drawerConfig(model));
			case 'Error404':
				return A4(
					author$project$Page$Internal$view,
					author$project$Page$Internal,
					model.internal,
					A3(
						author$project$Page$Error$view,
						A2(elm$core$Basics$composeL, author$project$Page$PageMsg, author$project$Page$GotErrorMsg),
						model.page.error,
						data),
					author$project$Page$drawerConfig(model));
			case 'Home':
				return A3(
					viewLoggedIn,
					author$project$Page$Home$view(model.coding),
					author$project$Page$GotHomeMsg,
					model.page.home);
			case 'Code':
				var _n1 = model.coding;
				if (_n1.$ === 'Just') {
					var coding = _n1.a;
					return A4(
						author$project$Page$Internal$view,
						author$project$Page$Internal,
						model.internal,
						A4(
							author$project$Page$Code$view,
							A2(elm$core$Basics$composeL, author$project$Page$PageMsg, author$project$Page$GotCodeMsg),
							model.page.code,
							data,
							coding),
						author$project$Page$drawerConfig(model));
				} else {
					return A3(
						viewLoggedIn,
						author$project$Page$Home$view(model.coding),
						author$project$Page$GotHomeMsg,
						model.page.home);
				}
			default:
				return A4(
					author$project$Page$Internal$view,
					author$project$Page$Internal,
					model.internal,
					A3(
						author$project$Page$Upload$view,
						A2(elm$core$Basics$composeL, author$project$Page$PageMsg, author$project$Page$GotUploadMsg),
						model.page.upload,
						data),
					author$project$Page$drawerConfig(model));
		}
	});
var author$project$Main$view = function (model) {
	var _n0 = A2(author$project$Page$view, model.page, model.data);
	var title = _n0.title;
	var body = _n0.body;
	return {
		body: A2(
			elm$core$List$map,
			elm$html$Html$map(author$project$Main$GotPageMsg),
			body),
		title: title
	};
};
var elm$browser$Browser$application = _Browser_application;
var author$project$Main$main = elm$browser$Browser$application(
	{init: author$project$Main$init, onUrlChange: author$project$Main$UrlChanged, onUrlRequest: author$project$Main$LinkClicked, subscriptions: author$project$Main$subscriptions, update: author$project$Main$update, view: author$project$Main$view});
_Platform_export({'Main':{'init':author$project$Main$main(elm$json$Json$Decode$value)(0)}});}(this));