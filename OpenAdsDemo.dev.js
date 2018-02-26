/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 78);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(80);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),
/* 2 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.3' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(4);
var core = __webpack_require__(2);
var ctx = __webpack_require__(13);
var hide = __webpack_require__(14);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && key in exports) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(41)('wks');
var uid = __webpack_require__(28);
var Symbol = __webpack_require__(4).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(109), __esModule: true };

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof2 = __webpack_require__(64);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _setPrototypeOf = __webpack_require__(121);

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = __webpack_require__(125);

var _create2 = _interopRequireDefault(_create);

var _typeof2 = __webpack_require__(64);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
};

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(12);
var IE8_DOM_DEFINE = __webpack_require__(55);
var toPrimitive = __webpack_require__(32);
var dP = Object.defineProperty;

exports.f = __webpack_require__(11) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(15)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(9);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(18);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(10);
var createDesc = __webpack_require__(24);
module.exports = __webpack_require__(11) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 16 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(38);
var defined = __webpack_require__(36);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(84), __esModule: true };

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 21 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(10).f;
var has = __webpack_require__(16);
var TAG = __webpack_require__(5)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(13);
var call = __webpack_require__(94);
var isArrayIter = __webpack_require__(95);
var anObject = __webpack_require__(12);
var toLength = __webpack_require__(39);
var getIterFn = __webpack_require__(96);
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(12);
var dPs = __webpack_require__(87);
var enumBugKeys = __webpack_require__(42);
var IE_PROTO = __webpack_require__(40)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(31)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(58).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(57);
var enumBugKeys = __webpack_require__(42);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 28 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(36);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 30 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(9);
var document = __webpack_require__(4).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(9);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 33 */
/***/ (function(module, exports) {



/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(85)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(37)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 35 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 36 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(25);
var $export = __webpack_require__(3);
var redefine = __webpack_require__(56);
var hide = __webpack_require__(14);
var has = __webpack_require__(16);
var Iterators = __webpack_require__(20);
var $iterCreate = __webpack_require__(86);
var setToStringTag = __webpack_require__(22);
var getPrototypeOf = __webpack_require__(59);
var ITERATOR = __webpack_require__(5)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = (!BUGGY && $native) || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(21);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(35);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(41)('keys');
var uid = __webpack_require__(28);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(4);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 42 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(90);
var global = __webpack_require__(4);
var hide = __webpack_require__(14);
var Iterators = __webpack_require__(20);
var TO_STRING_TAG = __webpack_require__(5)('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var hide = __webpack_require__(14);
module.exports = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};


/***/ }),
/* 45 */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(21);
var TAG = __webpack_require__(5)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(28)('meta');
var isObject = __webpack_require__(9);
var has = __webpack_require__(16);
var setDesc = __webpack_require__(10).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(15)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(5);


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(4);
var core = __webpack_require__(2);
var LIBRARY = __webpack_require__(25);
var wksExt = __webpack_require__(48);
var defineProperty = __webpack_require__(10).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 50 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(146), __esModule: true };

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__(18);

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var POSITION_VISIBLE = exports.POSITION_VISIBLE = 'VISIBLE';
var POSITION_NOT_VISIBLE = exports.POSITION_NOT_VISIBLE = 'NOT_VISIBLE';

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var AD_AVAILABLE = exports.AD_AVAILABLE = 'adAvailable';
var AD_BAD_REQUEST = exports.AD_BAD_REQUEST = 'adBadRequest';
var AD_ERROR = exports.AD_ERROR = 'adError';
var AD_NO_BID = exports.AD_NO_BID = 'adNoBid';
var AD_REQUEST_FAILURE = exports.AD_REQUEST_FAILURE = 'adRequestFailure';

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(11) && !__webpack_require__(15)(function () {
  return Object.defineProperty(__webpack_require__(31)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(14);


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(16);
var toIObject = __webpack_require__(17);
var arrayIndexOf = __webpack_require__(88)(false);
var IE_PROTO = __webpack_require__(40)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(4).document;
module.exports = document && document.documentElement;


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(16);
var toObject = __webpack_require__(29);
var IE_PROTO = __webpack_require__(40)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 60 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(4);
var core = __webpack_require__(2);
var dP = __webpack_require__(10);
var DESCRIPTORS = __webpack_require__(11);
var SPECIES = __webpack_require__(5)('species');

module.exports = function (KEY) {
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(9);
module.exports = function (it, TYPE) {
  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(21);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(112);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(114);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(57);
var hiddenKeys = __webpack_require__(42).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(30);
var createDesc = __webpack_require__(24);
var toIObject = __webpack_require__(17);
var toPrimitive = __webpack_require__(32);
var has = __webpack_require__(16);
var IE8_DOM_DEFINE = __webpack_require__(55);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(11) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _map = __webpack_require__(19);

var _map2 = _interopRequireDefault(_map);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _observerErrorThrown = __webpack_require__(68);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DomainEventBus = function () {
  function DomainEventBus() {
    (0, _classCallCheck3.default)(this, DomainEventBus);

    this._observers = new _map2.default();
  }

  (0, _createClass3.default)(DomainEventBus, [{
    key: 'register',
    value: function register(_ref) {
      var eventName = _ref.eventName,
          observer = _ref.observer;

      if (!eventName) {
        throw new Error('Event Name is required');
      }
      if (typeof observer !== 'function') {
        throw new Error('Observer must be a function');
      }
      if (!this._observers.has(eventName)) {
        this._observers.set(eventName, [observer]);
      } else {
        this._observers.get(eventName).push(observer);
      }
    }
  }, {
    key: 'raise',
    value: function raise(_ref2) {
      var _this = this;

      var domainEvent = _ref2.domainEvent;

      if (this._observers.has(domainEvent.eventName)) {
        this._observers.get(domainEvent.eventName).forEach(function (observer) {
          try {
            observer({
              payload: domainEvent.payload,
              dispatcher: function dispatcher(data) {
                return _this.raise({ domainEvent: data });
              }
            });
          } catch (err) {
            _this.raise({
              domainEvent: (0, _observerErrorThrown.observerErrorThrown)({
                message: 'Error processing the observer.',
                error: err
              })
            });
          }
        });
      }
    }
  }, {
    key: 'getNumberOfRegisteredEvents',
    value: function getNumberOfRegisteredEvents() {
      return this._observers.size;
    }
  }, {
    key: 'getNumberOfObserversRegisteredForAnEvent',
    value: function getNumberOfObserversRegisteredForAnEvent(_ref3) {
      var eventName = _ref3.eventName;

      return this._observers.has(eventName) ? this._observers.get(eventName).length : 0;
    }
  }, {
    key: 'clearAllObservers',
    value: function clearAllObservers() {
      this._observers.clear();
    }
  }]);
  return DomainEventBus;
}();

var domainEventBus = new DomainEventBus();
exports.default = domainEventBus;

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var OBSERVER_ERROR_THROWN = exports.OBSERVER_ERROR_THROWN = 'OBSERVER_ERROR_THROWN';
var observerErrorThrown = exports.observerErrorThrown = function observerErrorThrown(payload) {
  return { eventName: OBSERVER_ERROR_THROWN, payload: payload };
};

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(12);
var aFunction = __webpack_require__(18);
var SPECIES = __webpack_require__(5)('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(13);
var invoke = __webpack_require__(148);
var html = __webpack_require__(58);
var cel = __webpack_require__(31);
var global = __webpack_require__(4);
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__(21)(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),
/* 71 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(12);
var isObject = __webpack_require__(9);
var newPromiseCapability = __webpack_require__(52);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var POSITION_CREATED = exports.POSITION_CREATED = 'POSITION_CREATED';
var positionCreated = exports.positionCreated = function positionCreated(payload) {
  return { eventName: POSITION_CREATED, payload: payload };
};

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var POSITION_ALREADY_DISPLAYED = exports.POSITION_ALREADY_DISPLAYED = 'POSITION_ALREADY_DISPLAYED';
var positionAlreadyDisplayed = exports.positionAlreadyDisplayed = function positionAlreadyDisplayed(payload) {
  return { eventName: POSITION_ALREADY_DISPLAYED, payload: payload };
};

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var POSITION_DISPLAYED = exports.POSITION_DISPLAYED = 'POSITION_DISPLAYED';
var positionDisplayed = exports.positionDisplayed = function positionDisplayed(payload) {
  return { eventName: POSITION_DISPLAYED, payload: payload };
};

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var POSITION_SEGMENTATION_CHANGED = exports.POSITION_SEGMENTATION_CHANGED = 'POSITION_SEGMENTATION_CHANGED';
var positionSegmentationChanged = exports.positionSegmentationChanged = function positionSegmentationChanged(payload) {
  return { eventName: POSITION_SEGMENTATION_CHANGED, payload: payload };
};

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getPrototypeOf = __webpack_require__(6);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(8);

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PositionNotFoundException = function (_Error) {
  (0, _inherits3.default)(PositionNotFoundException, _Error);

  function PositionNotFoundException(_ref) {
    var id = _ref.id;
    (0, _classCallCheck3.default)(this, PositionNotFoundException);

    var _this = (0, _possibleConstructorReturn3.default)(this, (PositionNotFoundException.__proto__ || (0, _getPrototypeOf2.default)(PositionNotFoundException)).call(this));

    _this.name = 'PositionNotFoundException';
    _this.message = 'Position ' + id + ' not found.';
    _this.stack = new Error().stack;
    return _this;
  }

  return PositionNotFoundException;
}(Error);

exports.default = PositionNotFoundException;

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _index = __webpack_require__(79);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var openAds = _index2.default.init({ config: {
    Sources: {
      AppNexus: {
        Member: 3397
      }
    }
  } });

openAds.addPosition({
  id: 'ad1',
  name: 'ad number one',
  source: 'AppNexus',
  placement: 'es-cn-wph-ocasion-list-x_65',
  segmentation: {
    'es-sch-ads_name_page': 'cochesnet/ocasion/listado',
    'es-sch-event_name': 'list',
    'aa-sch-country_code': 'es',
    'aa-sch-supply_type': 'wph',
    'es-sch-section': 'ocasion',
    'aa-sch-page_type': 'list',
    'es-sch-adformat': 'x65'
  },
  sizes: [[300, 250], [320, 250]]
}).then(function (top1) {
  return top1.ad;
}).then(function (adResponse) {
  return openAds.displayPosition({ id: 'ad1' });
}).catch(function (error) {
  return console.log(error);
});

openAds.addPosition({
  id: 'ad2',
  name: 'ad number two',
  source: 'AppNexus',
  placement: 'es-cn-wde-ocasion-list-top_2',
  segmentation: {
    'es-sch-ads_name_page': 'cochesnet/ocasion/listado',
    'es-sch-event_name': 'list',
    'aa-sch-country_code': 'es',
    'aa-sch-supply_type': 'wde',
    'es-sch-section': 'ocasion',
    'aa-sch-page_type': 'list',
    'es-sch-adformat': 'top2'
  },
  sizes: [[728, 90], [1, 1], [728, 161]]
}).then(function (top2) {
  return top2.ad;
}).then(function (top2) {
  return openAds.displayPosition({ id: 'ad2' });
}).catch(function (error) {
  return console.log(error);
});

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _Container = __webpack_require__(83);

var _Container2 = _interopRequireDefault(_Container);

var _OpenAds = __webpack_require__(177);

var _OpenAds2 = _interopRequireDefault(_OpenAds);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Bootstrap = function () {
  function Bootstrap() {
    (0, _classCallCheck3.default)(this, Bootstrap);
  }

  (0, _createClass3.default)(Bootstrap, null, [{
    key: 'init',
    value: function init(_ref) {
      var config = _ref.config;

      return new _OpenAds2.default({ container: new _Container2.default({ config: config }) });
    }
  }]);
  return Bootstrap;
}();

exports.default = Bootstrap;

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(81), __esModule: true };

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(82);
var $Object = __webpack_require__(2).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(3);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(11), 'Object', { defineProperty: __webpack_require__(10).f });


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _map = __webpack_require__(19);

var _map2 = _interopRequireDefault(_map);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _HTMLDOMDriver = __webpack_require__(108);

var _HTMLDOMDriver2 = _interopRequireDefault(_HTMLDOMDriver);

var _AppNexusConnectorImpl = __webpack_require__(129);

var _AppNexusConnectorImpl2 = _interopRequireDefault(_AppNexusConnectorImpl);

var _AppNexusClient = __webpack_require__(132);

var _AppNexusClient2 = _interopRequireDefault(_AppNexusClient);

var _DomainEventBus = __webpack_require__(67);

var _DomainEventBus2 = _interopRequireDefault(_DomainEventBus);

var _loglevel = __webpack_require__(135);

var _loglevel2 = _interopRequireDefault(_loglevel);

var _loglevelPluginPrefix = __webpack_require__(136);

var _loglevelPluginPrefix2 = _interopRequireDefault(_loglevelPluginPrefix);

var _LogLevelLoggerInitializer = __webpack_require__(137);

var _LogLevelLoggerInitializer2 = _interopRequireDefault(_LogLevelLoggerInitializer);

var _LogLevelPrefixConfigurator = __webpack_require__(138);

var _LogLevelPrefixConfigurator2 = _interopRequireDefault(_LogLevelPrefixConfigurator);

var _LogLevelConfigurator = __webpack_require__(139);

var _LogLevelConfigurator2 = _interopRequireDefault(_LogLevelConfigurator);

var _AddPositionUseCase = __webpack_require__(143);

var _AddPositionUseCase2 = _interopRequireDefault(_AddPositionUseCase);

var _InMemoryPositionRepository = __webpack_require__(145);

var _InMemoryPositionRepository2 = _interopRequireDefault(_InMemoryPositionRepository);

var _ProxyPositionFactory = __webpack_require__(154);

var _ProxyPositionFactory2 = _interopRequireDefault(_ProxyPositionFactory);

var _errorObserverFactory = __webpack_require__(158);

var _observerErrorThrown = __webpack_require__(68);

var _proxyHandlerFactory = __webpack_require__(159);

var _proxyHandlerFactory2 = _interopRequireDefault(_proxyHandlerFactory);

var _AppNexusConsumersRepository = __webpack_require__(161);

var _AppNexusConsumersRepository2 = _interopRequireDefault(_AppNexusConsumersRepository);

var _positionCreatedObserver = __webpack_require__(162);

var _positionCreatedObserver2 = _interopRequireDefault(_positionCreatedObserver);

var _positionCreated = __webpack_require__(73);

var _RefreshPositionUseCase = __webpack_require__(163);

var _RefreshPositionUseCase2 = _interopRequireDefault(_RefreshPositionUseCase);

var _DisplayPositionUseCase = __webpack_require__(170);

var _DisplayPositionUseCase2 = _interopRequireDefault(_DisplayPositionUseCase);

var _positionDisplayedObserver = __webpack_require__(174);

var _positionDisplayedObserver2 = _interopRequireDefault(_positionDisplayedObserver);

var _positionDisplayed = __webpack_require__(75);

var _positionAlreadyDisplayedObserver = __webpack_require__(175);

var _positionAlreadyDisplayedObserver2 = _interopRequireDefault(_positionAlreadyDisplayedObserver);

var _positionAlreadyDisplayed = __webpack_require__(74);

var _positionSegmentationChanged = __webpack_require__(76);

var _positionSegmentationChangedObserver = __webpack_require__(176);

var _positionSegmentationChangedObserver2 = _interopRequireDefault(_positionSegmentationChangedObserver);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Container = function () {
  function Container(_ref) {
    var config = _ref.config;
    (0, _classCallCheck3.default)(this, Container);

    this._config = config;
    this._instances = new _map2.default();
    this._buildEagerSingletonInstances();
  }

  (0, _createClass3.default)(Container, [{
    key: 'getInstance',
    value: function getInstance(_ref2) {
      var key = _ref2.key;

      if (undefined === this._instances.get(key)) {
        try {
          this._instances.set(key, this['_build' + key]());
        } catch (e) {
          throw new Error('Error creating instance: ' + key, e);
        }
      }
      return this._instances.get(key);
    }
  }, {
    key: '_buildLogger',
    value: function _buildLogger() {
      return this.getInstance({ key: 'LoggerInitializer' }).logger({
        loggerName: 'OpenAds'
      });
    }
  }, {
    key: '_buildLoggerInitializer',
    value: function _buildLoggerInitializer() {
      return new _LogLevelLoggerInitializer2.default({
        loggerPrefixConfigurator: this.getInstance({ key: 'LoggerPrefixConfigurator' }),
        loggerLevelConfigurator: this.getInstance({ key: 'LoggerLevelConfigurator' })
      });
    }
  }, {
    key: '_buildLoggerPrefixConfigurator',
    value: function _buildLoggerPrefixConfigurator() {
      return new _LogLevelPrefixConfigurator2.default({
        logLevelPrefix: _loglevelPluginPrefix2.default,
        options: this._config.LogLevelPrefix
      });
    }
  }, {
    key: '_buildLoggerLevelConfigurator',
    value: function _buildLoggerLevelConfigurator() {
      return new _LogLevelConfigurator2.default({
        domDriver: this.getInstance({ key: 'DOMDriver' }),
        logLevel: _loglevel2.default,
        options: this._config.LogLevel
      });
    }
  }, {
    key: '_buildDOMDriver',
    value: function _buildDOMDriver() {
      return new _HTMLDOMDriver2.default({ dom: window.document });
    }
  }, {
    key: '_buildAddPositionUseCase',
    value: function _buildAddPositionUseCase() {
      return new _AddPositionUseCase2.default({
        positionRepository: this.getInstance({ key: 'PositionRepository' }),
        positionFactory: this.getInstance({ key: 'PositionFactory' })
      });
    }
  }, {
    key: '_buildRefreshPositionUseCase',
    value: function _buildRefreshPositionUseCase() {
      return new _RefreshPositionUseCase2.default({
        positionRepository: this.getInstance({ key: 'PositionRepository' })
      });
    }
  }, {
    key: '_buildPositionRepository',
    value: function _buildPositionRepository() {
      return new _InMemoryPositionRepository2.default();
    }
  }, {
    key: '_buildPositionFactory',
    value: function _buildPositionFactory() {
      return new _ProxyPositionFactory2.default({
        proxyHandler: this.getInstance({ key: 'ProxyHandler' })
      });
    }
  }, {
    key: '_buildProxyHandler',
    value: function _buildProxyHandler() {
      return (0, _proxyHandlerFactory2.default)(this.getInstance({ key: 'AppNexusConsumersRepository' }))({
        wait: this._config.Sources.Pulling,
        timeout: this._config.Sources.Timeout
      });
    }
  }, {
    key: '_buildAppNexusConsumersRepository',
    value: function _buildAppNexusConsumersRepository() {
      return new _AppNexusConsumersRepository2.default();
    }
  }, {
    key: '_buildAppNexusConnector',
    value: function _buildAppNexusConnector() {
      return new _AppNexusConnectorImpl2.default({
        source: 'AppNexus',
        connectorData: this._config.Sources.AppNexus,
        appNexusClient: this.getInstance({ key: 'AppNexusClient' }),
        logger: this.getInstance({ key: 'Logger' })
      });
    }
  }, {
    key: '_buildAppNexusClient',
    value: function _buildAppNexusClient() {
      return _AppNexusClient2.default.build();
    }
  }, {
    key: '_buildErrorObserverFactory',
    value: function _buildErrorObserverFactory() {
      var logger = this.getInstance({ key: 'Logger' });
      return (0, _errorObserverFactory.errorObserverFactory)(logger);
    }
  }, {
    key: '_buildDisplayPositionUseCase',
    value: function _buildDisplayPositionUseCase() {
      return new _DisplayPositionUseCase2.default({
        positionRepository: this.getInstance({ key: 'PositionRepository' })
      });
    }
  }, {
    key: '_buildPositionDisplayedObserver',
    value: function _buildPositionDisplayedObserver() {
      var appNexusConnector = this.getInstance({ key: 'AppNexusConnector' });
      return (0, _positionDisplayedObserver2.default)(appNexusConnector);
    }
  }, {
    key: '_buildPositionAlreadyDisplayedObserver',
    value: function _buildPositionAlreadyDisplayedObserver() {
      var appNexusConnector = this.getInstance({ key: 'AppNexusConnector' });
      return (0, _positionAlreadyDisplayedObserver2.default)(appNexusConnector);
    }
  }, {
    key: '_buildPositionCreatedObserver',
    value: function _buildPositionCreatedObserver() {
      var connector = this.getInstance({ key: 'AppNexusConnector' });
      var appnexusConsumerRepository = this.getInstance({ key: 'AppNexusConsumersRepository' });
      return (0, _positionCreatedObserver2.default)(connector)(appnexusConsumerRepository);
    }
  }, {
    key: '_buildPositionSegmentationChangedObserver',
    value: function _buildPositionSegmentationChangedObserver() {
      var connector = this.getInstance({ key: 'AppNexusConnector' });
      return (0, _positionSegmentationChangedObserver2.default)(connector);
    }
  }, {
    key: '_buildEagerSingletonInstances',
    value: function _buildEagerSingletonInstances() {
      var errorObserver = this.getInstance({ key: 'ErrorObserverFactory' });
      var positionCreatedObserver = this.getInstance({ key: 'PositionCreatedObserver' });
      var positionDisplayedObserver = this.getInstance({ key: 'PositionDisplayedObserver' });
      var positionAlreadyDisplayedObserver = this.getInstance({ key: 'PositionAlreadyDisplayedObserver' });
      var positionSegmentationChangedObserver = this.getInstance({ key: 'PositionSegmentationChangedObserver' });

      _DomainEventBus2.default.register({
        eventName: _observerErrorThrown.OBSERVER_ERROR_THROWN,
        observer: errorObserver });
      _DomainEventBus2.default.register({
        eventName: _positionDisplayed.POSITION_DISPLAYED,
        observer: positionDisplayedObserver });
      _DomainEventBus2.default.register({
        eventName: _positionAlreadyDisplayed.POSITION_ALREADY_DISPLAYED,
        observer: positionAlreadyDisplayedObserver });
      _DomainEventBus2.default.register({
        eventName: _positionCreated.POSITION_CREATED,
        observer: positionCreatedObserver
      });
      _DomainEventBus2.default.register({
        eventName: _positionSegmentationChanged.POSITION_SEGMENTATION_CHANGED,
        observer: positionSegmentationChangedObserver
      });
    }
  }]);
  return Container;
}();

exports.default = Container;

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(33);
__webpack_require__(34);
__webpack_require__(43);
__webpack_require__(92);
__webpack_require__(101);
__webpack_require__(104);
__webpack_require__(106);
module.exports = __webpack_require__(2).Map;


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(35);
var defined = __webpack_require__(36);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(26);
var descriptor = __webpack_require__(24);
var setToStringTag = __webpack_require__(22);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(14)(IteratorPrototype, __webpack_require__(5)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(10);
var anObject = __webpack_require__(12);
var getKeys = __webpack_require__(27);

module.exports = __webpack_require__(11) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(17);
var toLength = __webpack_require__(39);
var toAbsoluteIndex = __webpack_require__(89);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(35);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(91);
var step = __webpack_require__(60);
var Iterators = __webpack_require__(20);
var toIObject = __webpack_require__(17);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(37)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 91 */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(93);
var validate = __webpack_require__(62);
var MAP = 'Map';

// 23.1 Map Objects
module.exports = __webpack_require__(97)(MAP, function (get) {
  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key) {
    var entry = strong.getEntry(validate(this, MAP), key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value) {
    return strong.def(validate(this, MAP), key === 0 ? 0 : key, value);
  }
}, strong, true);


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dP = __webpack_require__(10).f;
var create = __webpack_require__(26);
var redefineAll = __webpack_require__(44);
var ctx = __webpack_require__(13);
var anInstance = __webpack_require__(45);
var forOf = __webpack_require__(23);
var $iterDefine = __webpack_require__(37);
var step = __webpack_require__(60);
var setSpecies = __webpack_require__(61);
var DESCRIPTORS = __webpack_require__(11);
var fastKey = __webpack_require__(47).fastKey;
var validate = __webpack_require__(62);
var SIZE = DESCRIPTORS ? '_s' : 'size';

var getEntry = function (that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index];
  // frozen object case
  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;         // collection type
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = validate(this, NAME);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        validate(this, NAME);
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while (entry && entry.r) entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(validate(this, NAME), key);
      }
    });
    if (DESCRIPTORS) dP(C.prototype, 'size', {
      get: function () {
        return validate(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var entry = getEntry(that, key);
    var prev, index;
    // change existing entry
    if (entry) {
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++;
      // add to index
      if (index !== 'F') that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function (C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function (iterated, kind) {
      this._t = validate(iterated, NAME); // target
      this._k = kind;                     // kind
      this._l = undefined;                // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l;
      // revert to the last existing entry
      while (entry && entry.r) entry = entry.p;
      // get next entry
      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if (kind == 'keys') return step(0, entry.k);
      if (kind == 'values') return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(12);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(20);
var ITERATOR = __webpack_require__(5)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(46);
var ITERATOR = __webpack_require__(5)('iterator');
var Iterators = __webpack_require__(20);
module.exports = __webpack_require__(2).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(4);
var $export = __webpack_require__(3);
var meta = __webpack_require__(47);
var fails = __webpack_require__(15);
var hide = __webpack_require__(14);
var redefineAll = __webpack_require__(44);
var forOf = __webpack_require__(23);
var anInstance = __webpack_require__(45);
var isObject = __webpack_require__(9);
var setToStringTag = __webpack_require__(22);
var dP = __webpack_require__(10).f;
var each = __webpack_require__(98)(0);
var DESCRIPTORS = __webpack_require__(11);

module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  if (!DESCRIPTORS || typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    C = wrapper(function (target, iterable) {
      anInstance(target, C, NAME, '_c');
      target._c = new Base();
      if (iterable != undefined) forOf(iterable, IS_MAP, target[ADDER], target);
    });
    each('add,clear,delete,forEach,get,has,set,keys,values,entries,toJSON'.split(','), function (KEY) {
      var IS_ADDER = KEY == 'add' || KEY == 'set';
      if (KEY in proto && !(IS_WEAK && KEY == 'clear')) hide(C.prototype, KEY, function (a, b) {
        anInstance(this, C, KEY);
        if (!IS_ADDER && IS_WEAK && !isObject(a)) return KEY == 'get' ? undefined : false;
        var result = this._c[KEY](a === 0 ? 0 : a, b);
        return IS_ADDER ? this : result;
      });
    });
    IS_WEAK || dP(C.prototype, 'size', {
      get: function () {
        return this._c.size;
      }
    });
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F, O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__(13);
var IObject = __webpack_require__(38);
var toObject = __webpack_require__(29);
var toLength = __webpack_require__(39);
var asc = __webpack_require__(99);
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__(100);

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(9);
var isArray = __webpack_require__(63);
var SPECIES = __webpack_require__(5)('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(3);

$export($export.P + $export.R, 'Map', { toJSON: __webpack_require__(102)('Map') });


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = __webpack_require__(46);
var from = __webpack_require__(103);
module.exports = function (NAME) {
  return function toJSON() {
    if (classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

var forOf = __webpack_require__(23);

module.exports = function (iter, ITERATOR) {
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.of
__webpack_require__(105)('Map');


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(3);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { of: function of() {
    var length = arguments.length;
    var A = new Array(length);
    while (length--) A[length] = arguments[length];
    return new this(A);
  } });
};


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.from
__webpack_require__(107)('Map');


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(3);
var aFunction = __webpack_require__(18);
var ctx = __webpack_require__(13);
var forOf = __webpack_require__(23);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { from: function from(source /* , mapFn, thisArg */) {
    var mapFn = arguments[1];
    var mapping, A, n, cb;
    aFunction(this);
    mapping = mapFn !== undefined;
    if (mapping) aFunction(mapFn);
    if (source == undefined) return new this();
    A = [];
    if (mapping) {
      n = 0;
      cb = ctx(mapFn, arguments[2], 2);
      forOf(source, false, function (nextItem) {
        A.push(cb(nextItem, n++));
      });
    } else {
      forOf(source, false, A.push, A);
    }
    return new this(A);
  } });
};


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getPrototypeOf = __webpack_require__(6);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(8);

var _inherits3 = _interopRequireDefault(_inherits2);

var _DOMDriver2 = __webpack_require__(128);

var _DOMDriver3 = _interopRequireDefault(_DOMDriver2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HTMLDOMDriver = function (_DOMDriver) {
  (0, _inherits3.default)(HTMLDOMDriver, _DOMDriver);

  function HTMLDOMDriver(_ref) {
    var dom = _ref.dom;
    (0, _classCallCheck3.default)(this, HTMLDOMDriver);

    var _this = (0, _possibleConstructorReturn3.default)(this, (HTMLDOMDriver.__proto__ || (0, _getPrototypeOf2.default)(HTMLDOMDriver)).call(this));

    _this._dom = dom;
    return _this;
  }

  (0, _createClass3.default)(HTMLDOMDriver, [{
    key: 'getElementById',
    value: function getElementById(_ref2) {
      var id = _ref2.id;

      return this._dom.getElementById(id);
    }
  }, {
    key: 'getElementsByClassName',
    value: function getElementsByClassName(_ref3) {
      var className = _ref3.className;

      return this._dom.getElementsByClassName(className);
    }
  }, {
    key: 'getElementsByTagName',
    value: function getElementsByTagName(_ref4) {
      var tagName = _ref4.tagName;

      return this._dom.getElementsByTagName(tagName);
    }
  }, {
    key: 'writeElementById',
    value: function writeElementById(_ref5) {
      var id = _ref5.id,
          value = _ref5.value;

      var domElement = this._dom.getElementById(id);
      if (domElement === null) throw new Error('Element with ID ' + id + ' not found!');
      domElement.innerHTML = value;
      return domElement;
    }
  }, {
    key: 'createElement',
    value: function createElement(_ref6) {
      var tagName = _ref6.tagName;

      return this._dom.createElement(tagName);
    }
  }, {
    key: 'getQueryString',
    value: function getQueryString() {
      return this._dom.location.search.slice(1);
    }
  }]);
  return HTMLDOMDriver;
}(_DOMDriver3.default);

exports.default = HTMLDOMDriver;

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(110);
module.exports = __webpack_require__(2).Object.getPrototypeOf;


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(29);
var $getPrototypeOf = __webpack_require__(59);

__webpack_require__(111)('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(3);
var core = __webpack_require__(2);
var fails = __webpack_require__(15);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(113), __esModule: true };

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(34);
__webpack_require__(43);
module.exports = __webpack_require__(48).f('iterator');


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(115), __esModule: true };

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(116);
__webpack_require__(33);
__webpack_require__(119);
__webpack_require__(120);
module.exports = __webpack_require__(2).Symbol;


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(4);
var has = __webpack_require__(16);
var DESCRIPTORS = __webpack_require__(11);
var $export = __webpack_require__(3);
var redefine = __webpack_require__(56);
var META = __webpack_require__(47).KEY;
var $fails = __webpack_require__(15);
var shared = __webpack_require__(41);
var setToStringTag = __webpack_require__(22);
var uid = __webpack_require__(28);
var wks = __webpack_require__(5);
var wksExt = __webpack_require__(48);
var wksDefine = __webpack_require__(49);
var enumKeys = __webpack_require__(117);
var isArray = __webpack_require__(63);
var anObject = __webpack_require__(12);
var isObject = __webpack_require__(9);
var toIObject = __webpack_require__(17);
var toPrimitive = __webpack_require__(32);
var createDesc = __webpack_require__(24);
var _create = __webpack_require__(26);
var gOPNExt = __webpack_require__(118);
var $GOPD = __webpack_require__(66);
var $DP = __webpack_require__(10);
var $keys = __webpack_require__(27);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(65).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(30).f = $propertyIsEnumerable;
  __webpack_require__(50).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(25)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(14)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(27);
var gOPS = __webpack_require__(50);
var pIE = __webpack_require__(30);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(17);
var gOPN = __webpack_require__(65).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(49)('asyncIterator');


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(49)('observable');


/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(122), __esModule: true };

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(123);
module.exports = __webpack_require__(2).Object.setPrototypeOf;


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(3);
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(124).set });


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(9);
var anObject = __webpack_require__(12);
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(13)(Function.call, __webpack_require__(66).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(126), __esModule: true };

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(127);
var $Object = __webpack_require__(2).Object;
module.exports = function create(P, D) {
  return $Object.create(P, D);
};


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(3);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(26) });


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @interface
 */
var DOMDriver = function () {
  function DOMDriver() {
    (0, _classCallCheck3.default)(this, DOMDriver);
  }

  (0, _createClass3.default)(DOMDriver, [{
    key: 'getElementById',
    value: function getElementById(_ref) {
      var id = _ref.id;

      throw new Error('DOMDriver#getElementById must be implemented');
    }
  }, {
    key: 'getElementsByClassName',
    value: function getElementsByClassName(_ref2) {
      var className = _ref2.className;

      throw new Error('DOMDriver#getElementsByClassName must be implemented');
    }
  }, {
    key: 'getElementsByTagName',
    value: function getElementsByTagName(_ref3) {
      var tagName = _ref3.tagName;

      throw new Error('DOMDriver#getElementsByTagName must be implemented');
    }
  }, {
    key: 'writeElementById',
    value: function writeElementById(_ref4) {
      var id = _ref4.id,
          value = _ref4.value;

      throw new Error('DOMDriver#writeElementById must be implemented');
    }
  }, {
    key: 'createElement',
    value: function createElement(_ref5) {
      var tagName = _ref5.tagName;

      throw new Error('DOMDriver#createElement must be implemented');
    }
  }, {
    key: 'getQueryString',
    value: function getQueryString() {
      throw new Error('DOMDriver#getQueryString must be implemented');
    }
  }]);
  return DOMDriver;
}();

exports.default = DOMDriver;

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _map = __webpack_require__(19);

var _map2 = _interopRequireDefault(_map);

var _getPrototypeOf = __webpack_require__(6);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(8);

var _inherits3 = _interopRequireDefault(_inherits2);

var _AppNexusConnector2 = __webpack_require__(130);

var _AppNexusConnector3 = _interopRequireDefault(_AppNexusConnector2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AppNexusConnectorImpl = function (_AppNexusConnector) {
  (0, _inherits3.default)(AppNexusConnectorImpl, _AppNexusConnector);

  function AppNexusConnectorImpl(_ref) {
    var source = _ref.source,
        connectorData = _ref.connectorData,
        appNexusClient = _ref.appNexusClient,
        logger = _ref.logger;
    (0, _classCallCheck3.default)(this, AppNexusConnectorImpl);

    var _this = (0, _possibleConstructorReturn3.default)(this, (AppNexusConnectorImpl.__proto__ || (0, _getPrototypeOf2.default)(AppNexusConnectorImpl)).call(this, {
      source: source,
      configuration: connectorData
    }));

    _this._member = _this.configuration.Member;
    _this._appNexusClient = appNexusClient;
    _this._registeredEvents = new _map2.default();
    _this._logger = logger;
    return _this;
  }

  (0, _createClass3.default)(AppNexusConnectorImpl, [{
    key: 'activateDebugMode',
    value: function activateDebugMode() {
      this._logger.debug('Activating AppNexus Debug Mode');
      this._appNexusClient.debug = true;
      return this;
    }
  }, {
    key: 'setPageOpts',
    value: function setPageOpts(_ref2) {
      var _this2 = this;

      var member = _ref2.member,
          keywords = _ref2.keywords;

      this._logger.debug('Setting AppNexus Page Opts', '| member:', member, '| keywords:', keywords);
      this._appNexusClient.anq.push(function () {
        return _this2._appNexusClient.setPageOpts({ member: member, keywords: keywords });
      });
      return this;
    }
  }, {
    key: 'onEvent',
    value: function onEvent(_ref3) {
      var _this3 = this;

      var event = _ref3.event,
          targetId = _ref3.targetId,
          callback = _ref3.callback;

      this._logger.debug('Activating AppNexus Listener', '| event:', event, '|targetId:', targetId);
      this._appNexusClient.anq.push(function () {
        _this3._appNexusClient.onEvent(event, targetId, callback);
        if (!_this3._registeredEvents.has(targetId)) {
          _this3._registeredEvents.set(targetId, []);
        }
        _this3._registeredEvents.get(targetId).push(event);
      });
      return this;
    }
  }, {
    key: 'defineTag',
    value: function defineTag(_ref4) {
      var _this4 = this;

      var member = _ref4.member,
          targetId = _ref4.targetId,
          invCode = _ref4.invCode,
          sizes = _ref4.sizes,
          keywords = _ref4.keywords,
          native = _ref4.native;

      this._logger.debug('Defining AppNexus Tag', '| member:', member, '| targetId:', targetId, '| invCode:', invCode, '| sizes:', sizes, '| keywords:', keywords, '| native:', native);
      this._appNexusClient.anq.push(function () {
        return _this4._appNexusClient.defineTag({ member: member, targetId: targetId, invCode: invCode, sizes: sizes, keywords: keywords, native: native });
      });
      return this;
    }
  }, {
    key: 'loadTags',
    value: function loadTags() {
      var _this5 = this;

      this._logger.debug('Loading AppNexus Tags');
      this._appNexusClient.anq.push(function () {
        return _this5._appNexusClient.loadTags();
      });
      return this;
    }
  }, {
    key: 'showTag',
    value: function showTag(_ref5) {
      var _this6 = this;

      var target = _ref5.target;

      this._logger.debug('Showing AppNexus Tag', '| target:', target);
      this._appNexusClient.anq.push(function () {
        return _this6._appNexusClient.showTag(target);
      });
      return this;
    }
  }, {
    key: 'reset',
    value: function reset() {
      var _this7 = this;

      this._logger.debug('Reset AppNexus connector');
      this._appNexusClient.anq.push(function () {
        _this7._appNexusClient.clearRequest();
        _this7._registeredEvents.forEach(function (eventArray, targetId) {
          eventArray.forEach(function (event) {
            return _this7._appNexusClient.offEvent(event, targetId);
          });
        });
        _this7._registeredEvents = new _map2.default();
      });
      return this;
    }
  }, {
    key: 'refresh',
    value: function refresh(target) {
      var _this8 = this;

      this._logger.debug('Refresh AppNexus Tag', '| target:', target);
      this._appNexusClient.anq.push(function () {
        return _this8._appNexusClient.refresh(target);
      });
      return this;
    }
  }, {
    key: 'modifyTag',
    value: function modifyTag(_ref6) {
      var _this9 = this;

      var targetId = _ref6.targetId,
          data = _ref6.data;

      this._logger.debug('Modify AppNexus Tag', '| targetId:', targetId, '| data:', data);
      this._appNexusClient.anq.push(function () {
        return _this9._appNexusClient.modifyTag(targetId, data);
      });
      return this;
    }
  }, {
    key: 'member',
    get: function get() {
      return this._member;
    }
  }]);
  return AppNexusConnectorImpl;
}(_AppNexusConnector3.default);

exports.default = AppNexusConnectorImpl;

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getPrototypeOf = __webpack_require__(6);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(8);

var _inherits3 = _interopRequireDefault(_inherits2);

var _Connector2 = __webpack_require__(131);

var _Connector3 = _interopRequireDefault(_Connector2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @abstract
 */
var AppNexusConnector = function (_Connector) {
  (0, _inherits3.default)(AppNexusConnector, _Connector);

  function AppNexusConnector() {
    (0, _classCallCheck3.default)(this, AppNexusConnector);
    return (0, _possibleConstructorReturn3.default)(this, (AppNexusConnector.__proto__ || (0, _getPrototypeOf2.default)(AppNexusConnector)).apply(this, arguments));
  }

  (0, _createClass3.default)(AppNexusConnector, [{
    key: 'activateDebugMode',

    /**
     * Activates the Debug mode.
     */
    value: function activateDebugMode() {
      throw new Error('AppNexusConnector#activateDebugMode must be implemented');
    }

    /**
     * Sets page options.
     * @param member
     * @param keywords
     */

  }, {
    key: 'setPageOpts',
    value: function setPageOpts(_ref) {
      var member = _ref.member,
          keywords = _ref.keywords;

      throw new Error('AppNexusConnector#setPageOpts must be implemented');
    }

    /**
     * Defines onEvent
     * @param event
     * @param targetId
     * @param callback
     */

  }, {
    key: 'onEvent',
    value: function onEvent(_ref2) {
      var event = _ref2.event,
          targetId = _ref2.targetId,
          callback = _ref2.callback;

      throw new Error('AppNexusConnector#onEvent must be implemented');
    }

    /**
     * Method to define tags.
     * @param member
     * @param targetId
     * @param invCode
     * @param sizes
     * @param keywords
     * @param native
     */

  }, {
    key: 'defineTag',
    value: function defineTag(_ref3) {
      var member = _ref3.member,
          targetId = _ref3.targetId,
          invCode = _ref3.invCode,
          sizes = _ref3.sizes,
          keywords = _ref3.keywords,
          native = _ref3.native;

      throw new Error('AppNexusConnector#defineTag must be implemented');
    }

    /**
     * Load tags.
     */

  }, {
    key: 'loadTags',
    value: function loadTags() {
      throw new Error('AppNexusConnector#loadTags must be implemented');
    }

    /**
     * Shows tags in the target.
     * @param target
     */

  }, {
    key: 'showTag',
    value: function showTag(_ref4) {
      var target = _ref4.target;

      throw new Error('AppNexusConnector#showTag must be implemented');
    }

    /**
     * Resets the state to it's pre uninitialized state.
     */

  }, {
    key: 'reset',
    value: function reset() {
      throw new Error('AppNexusConnector#clearRequest must be implemented');
    }

    /**
     * Refreshes ads on the page.
     * @param target : an array of ids
     */

  }, {
    key: 'refresh',
    value: function refresh(target) {
      throw new Error('AppNexusConnector#refresh must be implemented');
    }

    /**
     * Updates tag information.
     * @param targetId : an array of ids
     * @param data : the data to update
     * @param data.member
     * @param data.invCode
     * @param data.sizes
     * @param data.keywords
     * @param data.native
     */

  }, {
    key: 'modifyTag',
    value: function modifyTag(_ref5) {
      var targetId = _ref5.targetId,
          data = _ref5.data;

      throw new Error('AppNexusConnector#modifyTag must be implemented');
    }
  }]);
  return AppNexusConnector;
}(_Connector3.default);

exports.default = AppNexusConnector;

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @abstract
 */
var Connector = function () {
  function Connector() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        source = _ref.source,
        configuration = _ref.configuration;

    (0, _classCallCheck3.default)(this, Connector);

    this._source = source;
    this._configuration = configuration;
  }

  /**
   * @return {string} the attached source ID of the connector
   */


  (0, _createClass3.default)(Connector, [{
    key: "source",
    get: function get() {
      return this._source;
    }

    /**
     * @return {Object} the custom connector configuration, depending on source
     */

  }, {
    key: "configuration",
    get: function get() {
      return this._configuration;
    }
  }]);
  return Connector;
}();

exports.default = Connector;

/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-undef */
__webpack_require__(133);

var AppNexusClient = function () {
  function AppNexusClient() {
    (0, _classCallCheck3.default)(this, AppNexusClient);
  }

  (0, _createClass3.default)(AppNexusClient, null, [{
    key: 'build',
    value: function build() {
      return apntag;
    }
  }]);
  return AppNexusClient;
}();

exports.default = AppNexusClient;

/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(134);

/***/ }),
/* 134 */
/***/ (function(module, exports) {

/* AST v0.11.0 Updated : 2017-11-29 */
!function(e){function t(r){if(n[r])return n[r].exports;var i=n[r]={exports:{},id:r,loaded:!1};return e[r].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){n(1),n(7),n(14),n(12),n(9),n(5),n(17),n(19),n(6),n(10),n(11),n(22),n(8),n(15),n(16),n(18),n(13),n(20),n(2),n(3),e.exports=n(23)},function(e,t,n){function r(e){var t=a(e.uuid);if(this.targetId=t.targetId,e.nobid)return this.nobid=!0,this.tagId=e.tag_id,this.auctionId=e.auction_id,this;e.ads&&e.ads.length>1;var n=e.ads[0];this.adType=n.ad_type,this.buyerMemberId=n.buyer_member_id,this.tagId=e.tag_id,this.auctionId=e.auction_id,this.source=n.content_source,this.cpm=n.cpm,this.creativeId=n.creative_id;var r,o,l=i(t);if(s.isArray(l)&&l[0]&&(r=l[0].height,o=l[0].width),n.rtb&&n.rtb.banner)this.banner={width:n.rtb.banner.width,height:n.rtb.banner.height,content:n.rtb.banner.content,trackers:n.rtb.trackers},r=n.rtb.banner.height,o=n.rtb.banner.width;else if(n.rtb&&n.rtb.video){var c=n.rtb.video;this.video={duration:c.duration_ms,playbackMethods:c.playback_methods,frameworks:c.frameworks,content:c.content,trackers:n.rtb.trackers}}else if(n.rtb&&n.rtb[u.MEDIA_TYPE.NATIVE]){var g=n.rtb[u.MEDIA_TYPE.NATIVE];if(this[u.MEDIA_TYPE.NATIVE]={type:g.type,title:g.title,body:g.desc,fullText:g.full_text,icon:g.icon,image:g.main_img,cta:g.ctatext,sponsoredBy:g.sponsored,impressionTrackers:g.impression_trackers,clickTrackers:g.link.click_trackers,clickUrl:g.link.url,clickFallbackUrl:g.link.fallback_url,javascriptTrackers:g.javascript_trackers},n.viewability&&n.viewability.config){var f=n.viewability.config;"string"==typeof this.targetId&&(f=f.replace("%native_dom_id%",this.targetId)),f.indexOf("document.write")!==-1&&(f='<script type="text/javascript">'+f+"</script>"),d.createIframe({strategy:"WithContent",data:f})}}this.height=r,this.width=o}function i(e){var t=[];return s.isEmpty(e.sizes)||(t=o.getSizes(e.sizes)),t}function a(e){var t={};return s._each(apntag.requests.tags,function(n){e===n.uuid&&(t=n)}),t}var o=n(2),s=n(3),d=n(6),u=n(4),l={},c=function(e){return new r(e)};t.getAdObj=function(e){if(!e||!e.uuid)return{};if(l[e.uuid])return l[e.uuid];try{var t=c(e);return l[e.uuid]=t,t}catch(n){s.logError("adManager.getAdObj: Error trying to instantiate new adObj: "+n.message)}},t.getAdErrorObj=function(e,t,n,r){return{code:r,errMessage:e||n.message,exception:n,targetId:t}}},function(e,t,n){function r(e,t,n){var r={};return apntag.debug&&!a.isEmpty(t)&&(r.enabled=!0,e&&(r.member_id=Number(e)),t&&(r.dongle=String(t)),n&&(r.bidder_id=Number(n)),r.debug_timeout=1e3),apntag.test&&(r.test=apntag.test),r}function i(e){var t=[];return a._each(e,function(e,n){if(a.isArray(e)){var r=[];a._each(e,function(e){e=a.getValueString("keywords."+n,e),e&&r.push(e)}),e=r}else{if(e=a.getValueString("keywords."+n,e),!a.isStr(e))return;e=[e]}var i={key:n,value:e};t.push(i)}),t}var a=n(3),o=n(4),s=n(5),d=window.localStorage,u=o.TYPE.STRING,l=o.TYPE.NUM,c=o.TYPE.BOOL,g=t,f=o.DEBUG.AST_DONGLE,p=o.DEBUG.AST_TOOLKIT,m=o.DEBUG.AST_TEST,h=o.DEBUG.AST_DEBUG_MEMBER,v=o.DEBUG.AST_DEBUG_BIDDER,y=function(e){var t={},n=e.site;return a.isEmpty(n)||a.isEmpty(n.id)||(t.id=n.id),t},E=function(e){var t={},n=e.app;return a.isEmpty(n)||a.isEmpty(n.appid)||(t.appid=n.appid),t},b=function(e){var t={},n=e.device;if(!a.isEmpty(n)){a.isEmpty(n.useragent)||(t.useragent=n.useragent),a.isEmpty(n.geo)||(t.geo=n.geo),a.isEmpty(n.ip)||(t.ip=n.ip),a.isEmpty(n.deviceType)||(t.devicetype=n.deviceType),a.isEmpty(n.make)||(t.make=n.make),a.isEmpty(n.model)||(t.model=n.model),a.isEmpty(n.os)||(t.os=n.os),a.isEmpty(n.osVersion)||(t.os_version=n.osVersion),a.isEmpty(n.carrier)||(t.carrier=n.carrier);var r=a.getValueAsType("device.connectionType",n.connectionType,l);t.connectiontype=r,a.isEmpty(n.mcc)||(t.mcc=n.mcc),a.isEmpty(n.mnc)||(t.mnc=n.mnc),a.isEmpty(n.lmt)||(t.lmt=n.lmt),a.isEmpty(n.deviceId)||(t.device_id=n.deviceId);var i=a.getValueAsType("device.devTime",n.devTime,l);t.devtime=i}return t};g.createPageUser=function(e){var t={};if(!a.isEmpty(e)){e.externalUid&&a.isStr(e.externalUid)&&(t.external_uid=e.externalUid),a.isEmpty(e.segments)||(t.segments=e.segments);var n=a.getValueAsType("user.age",e.age,l);t.age=n;var r=a.getValueAsType("user.gender",e.gender,l);t.gender=r;var i=a.getValueAsType("user.language",e.language,u);t.language=i;var o=a.getValueAsType("user.dnt",e.dnt,c);t.dnt=o}return t},g.createTag=function(e){var t={};if(e.uuid=a.getUUID(),!a.isEmpty(e.sizes)){var n=this.getSizes(e.sizes);a.isEmpty(n)||(t.sizes=n,t.primary_size=n[0])}if(!a.isEmpty(e.privateSizes)){var r=this.getSizes(e.privateSizes);a.isEmpty(r)||(t.private_sizes=r)}if(e.supplyType&&a.isStr(e.supplyType)&&(t.supply_type=e.supplyType),e.pubClick&&a.isStr(e.pubClick)&&(t.pubclick={url:e.pubClick}),e.pubClickEnc&&a.isStr(e.pubClickEnc)&&(t.pubclickenc={url:e.pubClickEnc}),e.reserve&&(a.isNumber(e.reserve)||a.isArray(e.reserve))&&(t.reserve=e.reserve),e.extInvCode&&a.isStr(e.extInvCode)&&(t.ext_inv_code=e.extInvCode),t.uuid=e.uuid,e.tagId&&(t.id=e.tagId),e.formats&&(t.formats=e.formats),e.position&&("above"===e.position?t.position=1:"below"===e.position?t.position=2:t.position=0),e.invCode&&(t.code=e.invCode),e.prebid&&(t.prebid=e.prebid),e.externalImpId&&(t.external_imp_id=e.externalImpId),e.allowSmallerSizes===!0?t.allow_smaller_sizes=!0:t.allow_smaller_sizes=!1,e.disablePsa===!0&&(t.disable_psa=!0),e.allowedFormats&&(t.ad_types=e.allowedFormats),!a.isEmpty(e.video)){var o=e.video,s={};o.id&&(s.id=o.id),a.isEmpty(o.mimes)||(s.mimes=o.mimes),o.maxDuration&&(s.maxduration=o.maxDuration),o.minDuration&&(s.minduration=o.minDuration),o.startDelay&&(s.startdelay=o.startDelay),o.skippable&&(s.skippable=o.skippable),a.isEmpty(o.playbackMethod)||(s.playback_method=o.playbackMethod),a.isEmpty(o.frameworks)||(s.frameworks=o.frameworks),t.video=s}if(!a.isEmpty(e["native"])){var d=e["native"],u={};d.renderer_id&&(u.renderer_id=d.renderer_id),d.placement_type&&(u.placement_type=d.placement_type);var l={};d.id&&(l.id=d.id),d.title&&(l.title=d.title),d.body&&(l.description=d.body),d.sponsoredBy&&(l.sponsored_by=d.sponsoredBy),d.image&&(l.main_image=d.image,a.isEmpty(l.main_image.sizes)&&(l.main_image.sizes=[{}])),d.icon&&(l.icon=d.icon,a.isEmpty(l.icon.sizes)&&(l.icon.sizes=[{}])),d.cta&&(l.ctatext=d.cta),l&&(u.layouts=[l]),t.ad_types=t.ad_types||[],t.ad_types.indexOf("native")===-1&&t.ad_types.push("native"),t["native"]=u}if(!a.isEmpty(e.keywords)){var c=i(e.keywords);t.keywords=c}if(e.forceCreativeId){var g=Number(e.forceCreativeId);isNaN(g)?a.logError("Force Creative must be a number"):(t.force_creative_id=g,a.logMessage("Force Creative in use for targetId: "+e.targetId))}return e.nobidIfUnsold&&(t.nobid_if_unsold=!0),e.trafficSourceCode&&(t.traffic_source_code=e.trafficSourceCode.toString()),e.customPubLog&&(a.isStr(e.customPubLog)?t.custom_pub_log=e.customPubLog:a.logError("customPubLog must be a string")),t},g.getSizes=function(e){var t=[],n={};if(a.isArray(e)&&2===e.length&&!a.isArray(e[0]))n.width=parseInt(e[0],10),n.height=parseInt(e[1],10),t.push(n);else if("object"==typeof e)for(var r=0;r<e.length;r++){var i=e[r];n={},n.width=parseInt(i[0],10),n.height=parseInt(i[1],10),t.push(n)}return t},g.buildRequestJsonByMemberId=function(e,t,n){var o={};e.disablePsa&&a._each(e.tags,function(e){e.disablePsa=!0});var u=[],l=0;a._each(e.tags,function(e){if(!e.utCalled&&e.member===t){var n=g.createTag(e);e.utCalled=!0,e.tagNumber=l,l++,u.push(n)}}),s.build(e.tags,u,n),o.tags=u,o.uuid=a.getUUID(),o.member_id=t,o.sdk={source:"ast",version:"0.11.0"};var c=null;a.isEmpty(e.keywords)?a.isEmpty(e.targetingParams)||(c=i(e.targetingParams),o.keywords=c):(c=i(e.keywords),o.keywords=c),a.isEmpty(e.user)||(o.user=this.createPageUser(e.user)),a.isEmpty(e.device)||(o.device=b(e)),a.isEmpty(e.app)||(o.app=E(e)),a.isEmpty(e.site)||(o.site=y(e)),e.publisherId&&(o.publisher_id=e.publisherId),o.tags=u;var w=a.getParameterByName(f),I=d&&d.getItem(f),T=w||I;T&&""!==T&&(apntag.dongle=T);var _=a.getParameterByName(p);(_&&""!==_&&T&&""!==T||!a.isEmpty(e.toolkit))&&(o.toolkit={enabled:!0,dongle:T||e.toolkit.dongle});var A=a.getParameterByName(h);A&&""!==A&&(apntag.debug_member=A);var S=a.getParameterByName(v);S&&""!==S&&(apntag.debug_bidder=S);var O="TRUE"===a.getParameterByName(m).toUpperCase();if(O&&""!==O&&(apntag.test=O),apntag.test||apntag.debug&&!a.isEmpty(apntag.dongle)){var N="";apntag.debug_member&&(N=apntag.debug_member);var x=r(N,apntag.dongle,apntag.debug_bidder);o.debug=x}return o}},function(e,t,n){function r(){return!(typeof $sf===f||!$sf.ext)&&!!$sf.ext.debug}var i=n(4),a=i.TYPE.ARRAY,o=i.TYPE.STRING,s=i.TYPE.FUNC,d=i.TYPE.NUM,u=i.TYPE.OBJ,l=Object.prototype.hasOwnProperty,c=!1,g=i.DEBUG.DEBUG_MODE,f=i.OBJECT_TYPE.UNDEFINED,p=i.CONTENT_SOURCE.RTB,m=i.CONTENT_SOURCE.CSM,h=i.CONTENT_SOURCE.SSM,v=null;try{v="object"==typeof console.info?console.info:console.info.bind(window.console)}catch(y){}t.addEventHandler=function(e,t,n,r){e.addEventListener?e.addEventListener(t,n,r):e.attachEvent&&e.attachEvent("on"+t,n)},t.removeEventHandler=function(e,t,n,r){e.removeEventListener?e.removeEventListener(t,n,r):e.detachEvent&&e.detachEvent("on"+t,n)},t.isA=function(e,t){return Object.prototype.toString.call(e)==="[object "+t+"]"},t.isObj=function(e){return this.isA(e,u)},t.isFn=function(e){return this.isA(e,s)},t.isStr=function(e){return this.isA(e,o)},t.isArray=function(e){return this.isA(e,a)},t.isNumber=function(e){return this.isA(e,d)},t.isEmpty=function(e){if(!e)return!0;if(this.isArray(e)||this.isStr(e))return 0===e.length;for(var t in e)if(l.call(e,t))return!1;return!0},t.logMessage=function(e){var t=b();if(this.debugTurnedOn()&&E()){var n=r()?"SAFEFRAME MESSAGE: ":"MESSAGE: ";console.log(t+n+e)}},t.logWarn=function(e){var t=b();if(this.debugTurnedOn()&&E()){var n=r()?"SAFEFRAME WARN: ":"WARN: ";console.warn?console.warn(t+n+e):console.log(t+n+e)}},t.logError=function(e,t){var n=t||"GENERAL_ERROR",i=b();if(this.debugTurnedOn()&&E()){var a=r()?"SAFEFRAME ":"";console.error?console.error(i+a+n+": "+e):console.log(i+a+n+": "+e)}},t.logTimestamp=function(e){this.debugTurnedOn()&&E()&&console.timeStamp&&console.timeStamp(e)},t.logInfo=function(e,t){if(this.debugTurnedOn()&&E()){var n=b();if(v){t&&0!==t.length||(t="");var i=r()?"SAFEFRAME INFO: ":"INFO: ";v(n+i+e+(""===t?"":" : params : "),t)}}},t.loadScript=function(e,t,n){var r=e.document,i=r.createElement("script");i.type="text/javascript",i.async=!0,n&&"function"==typeof n&&(i.readyState?i.onreadystatechange=function(){"loaded"!==i.readyState&&"complete"!==i.readyState||(i.onreadystatechange=null,n())}:i.onload=function(){n()}),i.src=t;var a=r.getElementsByTagName("head");return a=a.length?a:r.getElementsByTagName("body"),a.length&&(a=a[0],a.insertBefore(i,a.firstChild)),i},t.getUUID=function(){var e=(new Date).getTime(),t="xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(t){var n=(e+16*Math.random())%16|0;return e=Math.floor(e/16),("x"===t?n:3&n|8).toString(16)});return t},t.loadPixelUrl=function(e,t,n){var r;if(n="anx_"+n+(new Date).getTime(),e&&t){r=new Image,r.id=n,r.src=t,r.height=0,r.width=0,r.style.display="none",r.onload=function(){try{this.parentNode.removeChild(this)}catch(e){}};try{e.insertBefore(r,e.firstChild)}catch(i){this.logError("Error logging impression for tag: "+n+" :"+i.message)}}},t._each=function(e,t){if(!this.isEmpty(e)){if(this.isFn(e.forEach))return e.forEach(t);var n=0,r=e.length;if(r>0)for(;n<r;n++)t(e[n],n,e);else for(n in e)l.call(e,n)&&t(e[n],n,e)}},t.contains=function(e,t){if(this.isEmpty(e))return!1;for(var n=e.length;n--;)if(e[n]===t)return!0;return!1};var E=function(){return window.console&&window.console.log};t.debugTurnedOn=function(){return!!r()||(this.getWindow().apntag=this.getWindow().apntag||{},apntag&&apntag.debug===!1&&c===!1&&(apntag.debug="TRUE"===this.getParameterByName(g).toUpperCase(),c=!0),!(!apntag||!apntag.debug))},t.stringContains=function(e,t){return!!e&&e.indexOf(t)!==-1},t.getSearchQuery=function(){try{return window.top.location.search}catch(e){try{return window.location.search}catch(e){return""}}},t.getParameterByName=function(e,t){var n="[\\?&]"+e+"=([^&#]*)",r=new RegExp(n),i=r.exec(t||this.getSearchQuery());return null===i?"":decodeURIComponent(i[1].replace(/\+/g," "))},t.hasOwn=function(e,t){return e.hasOwnProperty?e.hasOwnProperty(t):typeof e[t]!==f&&e.constructor.prototype[t]!==e[t]};var b=function(){var e=new Date,t="["+e.getHours()+":"+e.getMinutes()+":"+e.getSeconds()+":"+e.getMilliseconds()+"] ";return t};t.getTargetArrayforRefresh=function(e){var t=[];return this.isArray(e)?t=e:this.isStr(e)&&t.push(e),t},t._map=function(e,t){if(this.isEmpty(e))return[];if(this.isFn(e.map))return e.map(t);var n=[];return this._each(e,function(r,i){n.push(t(r,i,e))}),n},t.getValueString=function(e,t,n){return void 0===t||null===t?n:this.isStr(t)?t:this.isNumber(t)?t.toString():void this.logWarn("Unsuported type for param: "+e+" required type: String")},t.getValueAsType=function(e,t,n,r){return void 0===t||null===t?r:this.isA(t,n)?t:(this.logWarn("Unsuported type for param: "+e+" required type: "+n),n===d&&(t=Number(t)),isNaN(t)?r:t)},t.getWindow=function(){return window},t.getAdObjFromAdsArray=function(e){if(e&&e.length>0){if(e[0][p])return e[0][p];if(e[0][m])return e[0][m];if(e[0][h])return e[0][h]}},t.cloneAsObject=function(e){if(null===e||!(e instanceof Object))return e;var t=e instanceof Array?[]:{};for(var n in e)t[n]=this.cloneAsObject(e[n]);return t},t.getCdnOrigin=function(){return this.getWindow().document.location.protocol+"//"+i.EXTERNAL_LIB.CDN_ORIGIN}},function(e,t){e.exports={PREFIX:{UT_IFRAME:"utif_",UT_DIV:"div_utif_"},LOG:{WARN:"WARN"},DEBUG:{DEBUG_MODE:"ast_debug",AST_DONGLE:"ast_dongle",AST_DEBUG_MEMBER:"ast_debug_member",AST_DEBUG_BIDDER:"ast_debug_bidder",AST_TEST:"ast_test",AST_TOOLKIT:"ast_toolkit",AST_OVERRIDE:{BASE:"ast_override_",DIV:"div",INDEX:"index",TAG_ID:"tag_id",INV_CODE:"inv_code",PUBLISHER_ID:"publisher_id"}},OBJECT_TYPE:{UNDEFINED:"undefined",OBJECT:"object",STRING:"string",NUMBER:"number"},BROWSER_TYPE:{IE:"msie",OPERA:"opera"},RENDERER_EVENTS:{LOADED:"loaded",IMPRESSION:"impression"},ENDPOINT:{UT_BASE:"/ut/v3",IMPBUS:"ib.adnxs.com",UT_PREBID:"/ut/v3/prebid"},UT_RESPONSE_PROP:{MEDIA_TYPE:"media_type",CREATIVE_ID:"creative_id",AD_TYPE:"ad_type",BANNER:"banner",VIDEO:"video",CONTENT:"content",UUID:"uuid"},MEDIA_TYPE:{BANNER:"banner",NATIVE:"native",VIDEO:"video"},AD:{CREATIVE_ID:"creative_id",NOTIFY:"notify_url",NOAD:"no_ad_url",IMP_URLS:"impression_urls",TRACKERS:"trackers"},CONTENT_SOURCE:{RTB:"rtb",CSM:"csm",SSM:"ssm"},AD_TYPE:{BANNER:"banner",NATIVE:"native",VIDEO:"video"},EXTERNAL_LIB:{VIDEO_MEDIATION_JS:"https://acdn.adnxs.com/video/astMediation/AstMediationManager.js",BANNER_MEDIATION_JS:"//acdn.adnxs.com/mediation/v2/mediation.js",SAFE_FRAME_URL:"//acdn.adnxs.com/ast/safeframe/1-0-0/html/safeframe-v2.html",CDN_ORIGIN:"acdn.adnxs.com"},EVENTS:{REQUEST:"adRequested",AVAILABLE:"adAvailable",LOADED:"adLoaded",REQUEST_FAIL:"adRequestFailure",NO_BID:"adNoBid",DEFAULT:"adDefault",ERROR:"adError",COLLAPSE:"adCollapse",BAD_REQUEST:"adBadRequest"},TYPE:{ARRAY:"Array",STRING:"String",FUNC:"Function",NUM:"Number",OBJ:"Object",BOOL:"Boolean"},SAFEFRAME:{DEFAULT_ZINDEX:3e3,STATUS:{READY:"ready",NOTIFY_EXPANDED:"expanded",NOTIFY_COLLAPSED:"collapsed",NOTIFY_ERROR:"error",FOCUS_CHANGE:"focus-change",GEOM_UPDATE:"geom-update"}}}},function(e,t,n){function r(e){return o.getParameterByName(e,d.queryString)}function i(e,t){var n=null;return o._each(t,function(t){t.uuid===e.uuid&&(n=t.targetId)}),n}function a(e,t,n){var r=Number(t);if(isNaN(r))o.logError("Force Creative must be a number");else{e[y]=r,apntag.test=!0;var a=i(e,n);o.logMessage("Force Creative in use for targetId: "+a)}}var o=n(3),s=n(4),d=t,u=[],l=s.DEBUG.AST_OVERRIDE,c=l.BASE,g=c+l.DIV,f=c+l.INDEX,p=c+l.TAG_ID,m=c+l.INV_CODE,h=",",v=":",y="force_creative_id";d.queryString=void 0,d.build=function(e,t,n){if(o.stringContains(d.queryString||o.getSearchQuery(),c)){var i,s,l,y,E,b;if(!o.isEmpty(r(f)))for(u=r(f).split(h),i=0;i<u.length;i++){E=u[i].split(v);var w=Number(E[0]);if(isNaN(w)||void 0===t[w])o.logError("Invalid ast_override value for index : "+w);else{b=null;var I=null;for(y=0;y<n.length;y++)y===w&&(I=n[y].uuid);for(l=0;l<t.length;l++)t[l].uuid===I&&a(t[l],E[1],e)}}if(!o.isEmpty(r(g)))for(u=r(g).split(h),i=0;i<u.length;i++){E=u[i].split(v);var T=null,_=Object.keys(e);for(l=0;l<_.length;l++)E[0]===_[l]&&(T=e[_[l]].uuid);if(T)for(s=0;s<t.length;s++)t[s].uuid===T&&a(t[s],E[1],e);else o.logError("Invalid ast_override value for target div id : "+E[0])}if(!o.isEmpty(r(p)))for(u=r(p).split(h),i=0;i<u.length;i++){E=u[i].split(v);var A=!1;for(s=0;s<t.length;s++)b=t[s],b.id===Number(E[0])&&(a(b,E[1],e),A=!0);A||o.logError("Invalid ast_override value for tag id : "+E[0])}if(!o.isEmpty(r(m)))for(u=r(m).split(h),i=0;i<u.length;i++){E=u[i].split(v);var S=!1;for(s=0;s<t.length;s++)b=t[s],b.code===E[0]&&(a(b,E[1],e),S=!0);S||o.logError("Invalid ast_override value for invCode : "+E[0])}return t}}},function(e,t,n){function r(e,t){a(e),e.contentWindow.document.open(),e.contentWindow.document.write(t),e.contentWindow.document.close()}function i(e,t){e.src=t.src,e.id=t.id,a(e)}function a(e){var t=g.getWindow(),n=t.document.getElementsByTagName("body");n.length&&n[0].appendChild(e)}function o(e){var t=e.targetId,n="";if(e.isMediated)n=e.ad.mediatedContent,g.logMessage("Invoking mediation for displaying banner ad: "+t);else if(e.adResponse&&1===e.adResponse.ads.length){var r=g.getAdObjFromAdsArray(e.adResponse.ads);n=r[f][p]}return d(t,n,e.alwaysUseXDomainIframe||e.enableSafeFrame)}function s(e,t){return t?"":'window.onerror = function(e) {\n        if(window.parent && window.parent.apntag) {\n          window.parent.apntag.recordErrorEvent(e,"'+e+'");\n          return true;\n        }\n      };'}function d(e,t,n){var r=s(e,n);return'<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"><html><head>\n    <script>inDapIF=true;\n    apntag_targetId = "'+e+'";\n    '+r+'\n    </script></head>\n    <body>\n    <script>\n    document.body.id = "'+e+'";\n    </script>\n    '+t+"\n    </body></html>"}function u(e){return e.replace("/&/g","&amp;").replace("/</g","&lt;").replace("/>/g","&gt;").replace('/"/g',"&quot;").replace("/'/g","&#39;")}var l=n(4),c=t,g=n(3),f=l.UT_RESPONSE_PROP.BANNER,p=l.UT_RESPONSE_PROP.CONTENT;c.getIframe=function(e){var t,n=m(e),r=g.getWindow();if(t=null!==r.document.getElementById(n)?r.document.getElementById(n):r.document.createElement("iframe"),t.id=n,e.alwaysUseXDomainIframe||e.enableSafeFrame){g.logMessage("targetId: "+e.targetId+" is using safeFrame. Loading this ad into sandboxed iframe");var i;e.isMediated?i=apntag.getAdMarkup(e.targetId,e.uuid):(i=o(e),i=u(i),i=""+i);var a={targetId:e.targetId,ad:i,host:r.location.protocol+"//"+r.location.host,geom:e.geom,debug:g.debugTurnedOn(),hasFocus:document.hasFocus(),hostSfSupport:e.safeframe,isMediated:e.isMediated};t.name=JSON.stringify(a)}else t.name=n;return t.setAttribute("height",e.initialHeight),t.setAttribute("width",e.initialWidth),t.tabIndex="-1",t.width=e.initialWidth+"px",t.height=e.initialHeight+"px",t.border="0",t.hspace="0",t.vspace="0",t.marginWidth="0",t.marginHeight="0",t.style.border="0",t.scrolling="no",t.frameBorder="0",t},c.loadIeIframe=function(e,t){if(t.alwaysUseXDomainIframe||t.enableSafeFrame)e.src=l.EXTERNAL_LIB.SAFE_FRAME_URL;else{var n="";n=o(t);try{e.contentWindow.contents=n}catch(r){e.src="javascript:document.write('<script>document.domain=\""+document.domain+"\"</script>')",e.contentWindow.contents=n}var i,a=document.getElementsByTagName("base");a.length&&(i=a.target,a[0].target="_self"),e.src='javascript:window["contents"];',a.length&&(a[0].target=i)}},c.loadIframe=function(e,t){if(t.alwaysUseXDomainIframe||t.enableSafeFrame)e.src=l.EXTERNAL_LIB.SAFE_FRAME_URL;else{var n="",r=h(e);n=o(t),r.open("text/html","replace"),r.write(n),r.close()}},c.createIframe=function(e){var t=e.strategy,n=e.data,a=g.getWindow(),o=a.document.createElement("iframe");o.width=0,o.height=0,o.border="0",o.hspace="0",o.vspace="0",o.tabIndex="-1",o.marginWidth="0",o.marginHeight="0",o.style.border="0",o.scrolling="no",o.frameBorder="0","WithContent"===t&&r(o,n),"WithAttributes"===t&&i(o,n)};var m=function(e){return l.PREFIX.UT_IFRAME+e.targetId+"_"+g.getUUID()},h=function(e){var t;try{t=e.contentWindow?e.contentWindow.document:e.contentDocument.document?e.contentDocument.document:e.contentDocument}catch(n){g.logError("Error getting iframe document: "+n)}return t}},function(e,t,n){function r(e){e?(_=A.stringContains(e,"http")?e:("https:"===fe.document.location.protocol?"https:":"http:")+"//"+e,A.logMessage("Setting endpoint to: "+_)):A.logError("Cannot set an empty endpoint")}function i(e){return A.logMessage("getTag called for tag "+e),Pe(e)?e&&X[e]?X[e]:void 0:void A.logError("the "+e+" tag is not defined.",O.LOG.WARN)}function a(e){var t="defaultKey";return e.targetId&&(t=e.targetId),t}function o(e,t){A.logMessage("showTag called for "+e),Y[e]=!0;var n=Pe(e);if(n){var r=me.requests.tags[e];if(r.showTagCalled=!0,r.curWindow=t,r.displayed)return void A.logWarn("Attempting to display ad that is already displayed, will not render this ad again: "+e);me.requests.utCalled?r.adResponse?(p(r),me.requests.hasLeft&&qe()):me.requests.checkDisplay=!0:A.logWarn(e+" : showTag() called before ad request was made. This placement might not display if a subsequent loadTags() call is not made")}else A.logMessage("the "+e+" tag was loaded before the ad placement was available.",O.LOG.WARN)}function s(e,t,n,r,i){A._each(V[t],function(t){d(e,t,n,r,i)})}function d(e,t,n,r,i){0===n&&(e="Failure to contact endpoint. This can be caused by invalid CORS headers or failure of server to respond.");var a,o=me.requests.tags[t];o&&(a=R.getAdObj(o.adResponse));var s=R.getAdErrorObj(e,t,i,n);S.emit(r,t,s,a)}function u(e,t,n){A.logMessage("renderAd is called"),A._each(me.requests.tags,function(e){e.uuid===t&&(e.adResponse=n,n.ad&&n.ad.ad_type===ee&&(e.ad={mediatedContent:n.ad.rtb.banner.content},e.initialHeight=n.ad.rtb.banner.height,e.initialWidth=n.ad.rtb.banner.width),p(e))})}function l(){}function c(e,t){var n=null;if(me.requests.cbCalled=!0,typeof e===ue||null===e||e.error){var r="malformed response from ad server";e&&e.error&&(r=e.error),A.logError("Error response from impbus: "+r);var i={};try{i=JSON.parse(t)}catch(a){}return void A._each(me.requests.tags,function(e,t){var n=R.getAdErrorObj(r,t,void 0,200);if(e)var a=R.getAdObj(e.adResponse);A._each(i.tags,function(r){r.uuid===e.uuid&&S.emit(O.EVENTS.BAD_REQUEST,t,n,a)})})}e.debug&&e.debug.debug_info&&x.load(e.debug.debug_info),e.toolkit&&e.toolkit.enabled&&x.loadToolkit(e.tags),A._each(e.tags,function(e){if(e.error)return void A._each(me.requests.tags,function(t){if(t.uuid===e.uuid){var n="There was an exception from targetId:"+t.targetId+" this usually means there is a setup error on the tag (invalid ID etc)";A.logError(n,e.error);var r=R.getAdErrorObj(n,t.targetId,void 0,200);S.emit(O.EVENTS.BAD_REQUEST,t.targetId,r)}});if(e.ads&&e.ads.length&&e.ads[0].ad_type===Z){var t=g(e);if(!t)return void A.logError("required native assets missing from response")}var r=e.ads,i=N.checkIfMediatedResponse(r);i?A._each(me.requests.tags,function(t,i){if(t.uuid===e.uuid){t.utCalled=!0,t.isMediated=!0;var a=N.getMediationType(r),o=N.getMediationOptions(me.requests.tags,e);if(a===te)n=R.getAdObj(e),S.emit(O.EVENTS.AVAILABLE,i,n),N.callMediationFramework(a,e,o,u);else{var s=N.getContentForBannerMediation(t.targetId,e);e.ad={ad_type:ee},t.ad={mediatedContent:s},f(t,e,i)}}}):A._each(me.requests.tags,function(t,n){f(t,e,n)})}),me.requests.checkDisplay&&qe()}function g(e){var t,n={};A._each(Q,function(n){n.uuid===e.uuid&&(t=n)}),t&&(n=t["native"]);var r=[];A._each(n,function(e,t){e.required===!0&&r.push(t)});var i=R.getAdObj(e),a=[];A._each(i["native"],function(e,t){A.isEmpty(e)||a.push(t)});var o=a.length>0;return A._each(r,function(e){o=o&&a.indexOf(e)>-1}),o}function f(e,t,n){var r;e.uuid===t.uuid&&(t.nobid===!0?(A.logMessage("No bid for targetId:"+e.targetId),r=R.getAdObj(t),S.emit(O.EVENTS.NO_BID,n,r)):(e.adResponse=t,e.utCalled=!0,r=R.getAdObj(t),S.emit(O.EVENTS.AVAILABLE,n,r),e.prebid||e.displayed||p(e)))}function p(e){var t,n,r,i,a=fe,o=e.adResponse;if(e.adResponse&&e.adResponse.ads){var s=A.getAdObjFromAdsArray(e.adResponse.ads);s.banner&&(e.initialHeight=s.banner.height,e.initialWidth=s.banner.width)}if(r=N.getAdObjByMediation(e),null===r||typeof r.error!==ue)return void b(o);if(typeof o!==ue&&e.showTagCalled){if(o&&r.renderer_url&&r.renderer_id){var d=r.renderer_id,u=N.getContentSourceForMediation(r);if(typeof u===ue)return void A.logError("No Content Source Found");if(r[r.ad_type]=u,L[d]){var l=L[d];A.isFn(l)||A.isObj(l)?(E(e),N.copyAdObjforMediation(e),D.invokeRendererRenderAd(l,e,m),e.displayed=!0,i=R.getAdObj(e.adResponse),S.emit(O.EVENTS.LOADED,e.targetId,i),A.logTimestamp("The "+e.targetId+" ad is loaded.")):(W[d]=typeof W[d]===ue?[]:W[d],W[d].push(e))}else A.loadScript(fe,r.renderer_url),W[d]=typeof W[d]===ue?[]:W[d],W[d].push(e),L[d]=!0}else if(r[$]===Z)A.logMessage("Render for the following ad should be handled outside of ast.js :"+e.tagId),e.displayed=!0,i=R.getAdObj(e.adResponse),S.emit(O.EVENTS.LOADED,e.targetId,i),A.logTimestamp("The "+e.targetId+" ad is loaded.");else{if(r[$]===te)return void A.logWarn("Response has no renderer for video");if(r[$]===ee){if(!e.isMediated){var c=r[ae][ne];if(A.isEmpty(c)||typeof c!==le)return void A.logError("Response has no banner object");if(!A.hasOwn(c,re))return void A.logError("Response has no banner content");if(!A.hasOwn(c,"width"))return void A.logError("Response has no banner width");if(!A.hasOwn(c,"height"))return void A.logError("Response has no banner height")}var g;A.hasOwn(J,e.targetId)&&(g=J[e.targetId]);var f;if(e.alwaysUseXDomainIframe||e.enableSafeFrame){f=a.document.getElementById(e.targetId);var p=f.style.height,h=f.style.width;f.style.height=e.initialHeight,f.style.width=e.initialWidth,f.style.height=p,f.style.width=h}var v=A.cloneAsObject(K);A.hasOwn(e.safeframe,"expansionByPush")&&(v.expansionByPush=e.safeframe.expansionByPush),A.hasOwn(e.safeframe,"expansionByOverlay")&&(v.expansionByOverlay=e.safeframe.expansionByOverlay),e.safeframe=v,n=_e(e),(e.alwaysUseXDomainIframe||e.enableSafeFrame)&&(n.style.height=e.initialHeight+"px",n.style.width=e.initialWidth+"px",n.style.display="block",f.appendChild(n),e.geom=q.geom(e.targetId,n)),t=M.getIframe(e);var y=B.getInstance(),w={};if(w.iframe=t,w.originalWidth=e.initialWidth,w.originalHeight=e.initialHeight,y.add(e.targetId,w),J[e.targetId]=t,typeof g!==ue&&a.document.getElementById(g.id)?n.replaceChild(t,g):n.appendChild(t),e.displayed=!0,a.document.body)try{Ae(e,n,t)}catch(I){A.logError("Error rendering ad: "+I.message)}else A.logError("Error rendering ad: window.document.body is undefined")}else A.logError("Error rendering ad: unknown type")}j.push(e.targetId)}}function m(e,t){if(A.logMessage("handling event for:  "+e+" eventType : "+t),t=t===O.RENDERER_EVENTS.LOADED?"adLoaded":t,t===O.EVENTS.LOADED){var n=h(e),r=R.getAdObj(n.adResponse);S.emit(O.EVENTS.LOADED,e,r)}else S.emit(t,e)}function h(e){var t={};return A._each(me.requests.tags,function(n){e===n.targetId&&(t=n)}),t}function v(){A.addEventHandler(fe,"focus",q.handleWindowFocus),A.addEventHandler(fe,"blur",q.handleWindowBlur),A.addEventHandler(fe,"resize",q.handleGeomUpdate),A.addEventHandler(fe,"scroll",q.handleGeomUpdate);var e=/(iPhone)/i.test(navigator.userAgent);e&&A.addEventHandler(fe.document,"apntag_iTunesLaunch",y),A.addEventHandler(fe,"unload",function(){try{A.removeEventHandler(fe,"focus",q.handleWindowFocus),A.removeEventHandler(fe,"blur",q.handleWindowBlur),A.removeEventHandler(fe,"resize",q.handleGeomUpdate),A.removeEventHandler(fe,"scroll",q.handleGeomUpdate),e&&A.removeEventHandler(fe,"apntag_iTunesLaunch",y),q.removeHandlers()}catch(t){}})}function y(e){M.createIframe({strategy:"WithAttributes",data:{id:"itunes-launch-store",src:e.detail.url}})}function E(e){if(!e||!e.isMediated){var t=N.getAdObjByMediation(e);A.loadPixelUrl(fe.document.body,t[ie],t[ce])}}function b(e){A.loadPixelUrl(fe.document.body,e[oe],e.uuid)}function w(e,t){for(var n=e[ae][de][0][se],r=0;r<n.length;r++)A.loadPixelUrl(t.parentElement,n[r],e[ce])}function I(){K.expansionByPush=!1,K.expansionByOverlay=!0,K.readCookie=!1,K.writeCookie=!1}function T(e,t){var n=!1,r=e;if(2===arguments.length?(r=fe.apntag.requests.tags[t],e.sizes&&r.sizeMapping?n=!0:e.sizeMapping&&!r.sizeMapping&&(n=!0)):(t=e.targetId,e.sizes&&e.sizeMapping&&(n=!0)),n)return A.logError("sizes and sizeMapping both cannot be defined for targetId: "+t),!1;if(e.sizeMapping){var i=U.mapSizes(e);if(""===i)return"";e.sizes=i}return!0}n(8);var _,A=n(3),S=n(9),O=n(4),N=(n(10),n(11)),x=n(12),k=n(2),R=n(1),D=n(13),M=n(6),C=n(14),P=(n(15),n(16)),q=n(17),B=n(18),U=n(20),F=n(21),L={},W={},j=[],z=[],V={},H=0,G=0,Y={},J={},X={},Q=[],K={},$=O.UT_RESPONSE_PROP.AD_TYPE,Z=O.AD_TYPE.NATIVE,ee=O.AD_TYPE.BANNER,te=O.AD_TYPE.VIDEO,ne=O.UT_RESPONSE_PROP.BANNER,re=O.UT_RESPONSE_PROP.CONTENT,ie=O.AD.NOTIFY,ae=O.CONTENT_SOURCE.RTB,oe=O.AD.NOAD,se=O.AD.IMP_URLS,de=O.AD.TRACKERS,ue=O.OBJECT_TYPE.UNDEFINED,le=O.OBJECT_TYPE.OBJECT,ce=O.AD.CREATIVE_ID,ge=O.OBJECT_TYPE.NUMBER,fe=A.getWindow();P.attach(fe,"message",P.handleMessage),I(),v();try{console.info?console.info("AST library loaded: 0.11.0"):console.log("AST library loaded: 0.11.0")}catch(pe){}fe.apntag=typeof fe.apntag!==ue?fe.apntag:{};var me=fe.apntag;me.anq=me.anq||[],me.debug=me.debug||!1,me.dongle=me.dongle||void 0,me.test=me.test||!1,me.loaded=!0,me.requests=me.requests||{},me.requests.keywords=me.requests.keywords||{},r(O.ENDPOINT.IMPBUS),me.requests.tagsOnPageCount=me.requests.tagsOnPageCount||H,me.requests.waitOnTagsCount=me.requests.waitOnTagsCount||G,me.requests.showTagDefinedMap=me.requests.showTagDefinedMap||Y,me.highlightAd=function(e){if(A.logInfo("Invoking apntag.highlightAd",arguments),e){var t=J[e];t&&(t.style.border="3px solid #e67300")}},me.anq.push=function(e){e.call()},me.setEndpoint=function(e){A.logInfo("Invoking apntag.setEndpoint",arguments),r(e)},me.setPageOpts=function(e){A.logInfo("Invoking apntag.setPageOpts",arguments),e&&(e.member&&(me.requests.member=e.member),e.targetingParams&&(me.requests.targetingParams=e.targetingParams,A.logWarn("targetingParams will be deprecated soon. Please use keywords instead")),e.keywords&&(me.requests.keywords=e.keywords),e.user&&(me.requests.user=e.user),e.app&&(me.requests.app=e.app),e.device&&(me.requests.device=e.device),e.site&&(me.requests.site=e.site),e.disablePsa&&(me.requests.disablePsa=!0),me.requests.enableSafeFrame=!1,e.enableSafeFrame&&(me.requests.enableSafeFrame=!0),e.publisherId&&(me.requests.publisherId=e.publisherId))},me.defineTag=function(e){A.logInfo("Invoking apntag.defineTag",arguments);var t=Se(e);if(Q.push(t),X[t.targetId])return X[t.targetId];var n={targetId:t.targetId,on:t.on,off:t.off,modifyTag:t.modifyTag,setKeywords:t.setKeywords};return X[t.targetId]=n,n},me.getAdWrap=function(e){return A.logInfo("Invoking apntag.getAdWrap",arguments),Pe(e)?e&&me.requests.tags&&me.requests.tags[e]&&me.requests.tags[e].adWrap?me.requests.tags[e].adWrap:void 0:void A.logError("the "+e+" tag is not defined.",O.LOG.WARN)},me.setSizes=function(e,t){return A.logInfo("Invoking apntag.setSizes",arguments),arguments.length<2&&(t=e,e=this.targetId),Pe(e)?void(me.requests.tags[e].sizes=t):void A.logError("the "+e+" tag is not defined.",O.LOG.WARN)},me.modifyTag=function(e,t){A.logInfo("Invoking apntag.modifyTag",arguments);var n={};return arguments.length<2&&(t=e,e=this.targetId),Pe(e)?((t.sizes||t.sizeMapping)&&T(t,e),A._each(me.requests.tags[e],function(e,t){n[t]=e}),A._each(t,function(e,t){n[t]=e}),void(me.requests.tags[e]=n)):void A.logError("the "+e+" tag is not defined.",O.LOG.WARN)},
me.setKeywords=function(e,t){A.logInfo("Invoking apntag.setKeywords",arguments);var n={};return arguments.length<2&&(t=e,e=this.targetId),Pe(e)?(A._each(me.requests.tags[e],function(e,t){n[t]=e}),n.keywords=n.keywords||{},A._each(t,function(e,t){A.hasOwn(n.keywords,t)?A.isArray(n.keywords[t])?n.keywords[t]=n.keywords[t].concat(e):n.keywords[t]=[n.keywords[t]].concat(e):n.keywords[t]=e}),void(me.requests.tags[e]=n)):void A.logError("the "+e+" tag is not defined.",O.LOG.WARN)},me.onEvent=function(e,t,n){if(A.logInfo("Invoking apntag.onEvent",arguments),2===arguments.length&&"function"==typeof t&&typeof this.targetId===ue)n=t,t="*";else if(arguments.length<3&&(n=t,t=this.targetId,!Pe(t)))return void A.logError("the "+t+" tag is not defined.",O.LOG.WARN);S.on(e,t,n)},me.offEvent=function(e,t,n){if(A.logInfo("Invoking apntag.offEvent",arguments),1===arguments.length&&typeof this.targetId===ue)t="*";else if(arguments.length<2&&(t=this.targetId,!Pe(t)))return void A.logError("the "+t+" tag is not defined.",O.LOG.WARN);if(A.isArray(e))for(var r=0;r<e.length;r++)S.off(e[r],t,n);else S.off(e,t,n)},me.loadTags=function(){A.logInfo("Invoking apntag.loadTags",arguments),ke()},me.refresh=function(e){A.logInfo("Invoking apntag.refresh",arguments),Oe(e)},me.resizeAd=function(e,t){A.logInfo("Invoking apntag.resizeAd",arguments);var n=0,r=0;A.isArray(t)&&2===t.length?(r=t[0],n=t[1]):A.logError("resizeAd must be invoked with a (targetId,[width, height])");var a=J[e];if(!a)return void A.logError("Failed to find target for resizeAd : "+e);var o=i(e),s=Te(o),d=fe.document.getElementById(s);return d?(d.style.height=n,d.style.width=r,a.height=n+"px",a.width=r+"px",a.height=n,a.width=r,void A.logMessage("ResizeAd successful for targetId: "+e)):void A.logError("Failed to find target for resizeAd: "+e)},me.enableCookieSet=function(){F.enable()},me.collapseAd=function(e,t,n){A.logInfo("Invoking apntag.collapseAd",arguments);var r,a=0,o=0,s=i(e);if(!s)return void A.logError("CollapseAd failed to find targetId : "+e);r=Te(s),typeof t===ge&&(a=t),typeof n===ge&&(o=n);var d=fe.document.getElementById(r);if(null===d)return void A.logError("CollapseAd failed to find ad div : "+e);me.resizeAd(e,[o,a]),d.style.height=a,d.style.width=o,d.style.display="none";var u=me.requests.tags[e],l=R.getAdObj(u.adResponse);S.emit(O.EVENTS.COLLAPSE,e,l)},me.showTag=function(e,t){A.logInfo("Invoking apntag.showTag",arguments),t=t||fe,o(e,t)},me.setPageTargeting=function(e,t){A.logInfo("Invoking apntag.setPageTargeting",arguments),me.requests.targetingParams&&e&&t&&(me.requests.targetingParams[e]=t)},me.getPageTargeting=function(e){if(A.logInfo("Invoking apntag.getPageTargeting",arguments),me.requests.targetingParams&&e)return me.requests.targetingParams[e]},me.clearPageTargeting=function(e){A.logInfo("Invoking apntag.clearPageTargeting",arguments),me.requests.targetingParams&&e&&delete me.requests.targetingParams[e]},me.enableDebug=function(){me.debug=!0,A.logInfo("Invoking apntag.enableDebug",arguments)},me.disableDebug=function(){A.logInfo("Invoking apntag.disableDebug",arguments),me.debug=!1},me.notify=function(e,t,n){if(!e)return void A.logError("apntag.notify must be called with `messageType`");var r=D.createNotifyObj(e,t,n);z.push(r),A._each(L,function(e){D.invokeNotify(z,e)})},me.registerRenderer=function(e,t){A.logInfo("Invoking apntag.registerRenderer",arguments),e&&(A.isFn(t)||A.isObj(t))?(L[e]=t,D.invokeNotify(z,t),W[e]&&A._each(W[e],function(t){t.displayed||(E(t),N.copyAdObjforMediation(t),D.invokeRendererRenderAd(L[e],t,m),t.displayed=!0)})):A.logError("ast.js","registerRenderer must be called with (id, cbFn)")},me.getAstVersion=function(){return A.logInfo("Invoking apntag.getAstVersion"),"0.11.0"},me.recordErrorEvent=function(e,t){A.logInfo("Invoking apntag.recordErrorEvent",arguments);var n=me.requests.tags[t],r=R.getAdObj(n.adResponse),i=R.getAdErrorObj(e.message,t,e,200);S.emit(O.EVENTS.ERROR,t,i,r)};var he=function(e){A._each(me.requests.tags,function(e){e.utCalled||S.emit(O.EVENTS.REQUEST,e.targetId)}),A.logTimestamp("Ad is requested for member "+e)};me.clearRequest=function(){A.logInfo("Invoking apntag.clearRequest",arguments),me.requests={},me.requests.tags={},Y={},B.getInstance().resetInstance(),J={}},me.handleCb=function(e,t){A.logInfo("Invoking apntag.handleCb",arguments);try{c(e,t)}catch(n){var r=n.message?n.message:n;A.logError("Internal AST error : "+r);var i=l(e);s(r,i,200,O.EVENTS.BAD_REQUEST,n)}},me.emitEvent=function(e,t,n){A.logInfo("Invoking apntag.emitEvent",arguments),m(e,t,n)},me.getAdMarkup=function(e,t){if(me.requests.tags&&me.requests.tags[e]){var n=me.requests.tags[e];if(n.uuid===t)return n.adResponse.ads}},me.setSafeFrameConfig=function(e){A.hasOwn(e,"allowExpansionByPush")&&(K.expansionByPush=e.allowExpansionByPush),A.hasOwn(e,"allowExpansionByOverlay")&&(K.expansionByOverlay=e.allowExpansionByOverlay)},me.fireImpressionTrackers=function(e){if(!e.impressionTrackersFired){e.impressionTrackersFired=!0,A.logInfo("Firing impression trackers for",e.tagId);var t=e["native"]&&e["native"].impressionTrackers;t&&t.length&&t.forEach(function(e){A.loadPixelUrl(fe.document.body,e)});var n=e["native"]&&e["native"].javaScriptTrackers;n&&M.createIframe({strategy:"WithContent",data:n})}};var ve=function(){for(var e=0;e<me.anq.length;e++)typeof me.anq[e].called===ue&&(me.anq[e].call(),me.anq[e].called=!0)},ye=function(e,t){var n=!0;return A._each(t,function(t){A.isEmpty(e[t])&&(A.logError("Tag has missing paramater: "+t),n=!1)}),n},Ee=function(e){var t=["utUrlEncoded"];if(ye(e,t)){var n=decodeURIComponent(e.utUrlEncoded),r=null,i=new XMLHttpRequest;return i.open("GET",n,!1),i.withCredentials="true",i.send(null),A.logTimestamp("Ad is requested"),200===i.status?r=i.responseText:A.logError("Error request ut URL"),r}},be=function(e,t){var n=e.data,r=!0,i=new XMLHttpRequest;i.onload=function(){var e=null;if(200===i.status)try{e=JSON.parse(i.responseText),me.handleCb(e,n)}catch(r){A.logError("failed to parse ad response from impbus: "+r.message),s(r.message,t,i.status,O.EVENTS.REQUEST_FAIL,r)}else A.logError(i.status+" : "+i.statusText),s(i.statusText,t,i.status,O.EVENTS.REQUEST_FAIL)},i.onerror=function(n){var r=n.target.status,i="Error contacting impbus endpoint: "+e.url+" http response code:"+r;s(i,t,r,O.EVENTS.REQUEST_FAIL)},i.open("POST",e.url,r),i.setRequestHeader("Content-Type","text/plain"),i.withCredentials=!0;try{i.send(n),me.requests.utCalled=!0}catch(a){A.logError("Error making POST request: "+a),Me(e,t)}},we=function(e){var t={},n=Ie();return t.url=n,t.data=JSON.stringify(e),t},Ie=function(){var e=!1;return A._each(me.requests.tags,function(t){t.prebid&&(e=!0)}),e?_+O.ENDPOINT.UT_PREBID:_+O.ENDPOINT.UT_BASE},Te=function(e){return O.PREFIX.UT_DIV+e.targetId},_e=function(e){var t,n=Te(e),r=e.curWindow||fe;return t=r.document.getElementById(n)?r.document.getElementById(n):r.document.createElement("div"),t.style.display="none",t.id=n,t},Ae=function(e,t,n){var r=C.getBrowserType(),i=e.curWindow||fe,a=i.document.getElementById(e.targetId);if(a){e.alwaysUseXDomainIframe||e.enableSafeFrame||(a.appendChild(t),t.style.display="inline"),e.utDivId=t.id,e.utiframeId=n.id,r===O.BROWSER_TYPE.IE||r===O.BROWSER_TYPE.OPERA?M.loadIeIframe(n,e):M.loadIframe(n,e);var o=e.adResponse.ads?e.adResponse.ads[0]:e.adResponse.ad;if("undefined"==typeof o)return void A.logWarn("No ad found in response, nothing to display.");(!e.isMediated||e.adResponse.ad&&"rtb"===e.adResponse.ad.content_source)&&(w(o,n),A.logMessage("Win notification sent for ad tag: "+e.targetId));var s=N.getContentSourceForMediation(o),d=Number(a.style.width.replace(/[^\d\.\-]/g,""));!isNaN(d)&&d>s.width&&("center"===e.promoAlignment?a.setAttribute("align","center"):a.setAttribute("align","left")),A.logMessage("The "+e.targetId+" ad is loaded."),A.logTimestamp("The "+e.targetId+" ad is loaded.");var u=R.getAdObj(e.adResponse);S.emit(O.EVENTS.LOADED,e.targetId,u)}else A.logWarn("No div element found for display ad. This ad will not show. Div id: "+e.targetId)},Se=function(e){if(e.rid&&(me.requests.keywords.rid=e.rid),e.provider_id&&(me.requests.keywords.provider_id=e.provider_id),e.debug&&(me.debug=e.debug),e.astToolkit&&e.astDongle&&(me.requests.toolkit={enabled:!0,dongle:e.astDongle}),e.size)return void A.logError("Size is deprecated, please use sizes instead.");if(e.member||(e.member=me.requests.member),e.member||(e.member="none"),!(e.tagId||e.invCode&&e.member))return void A.logError("tagId or (invCode & memberId) should be defined for targetId: "+e.targetId);if(!e.sizeMapping||T(e))try{var t=e.targetId,n=De(e,t);return A.logMessage("defineTag called for: "+t),me.requests&&me.requests.utCalled===!0&&!me.requests.tags[t].utCalled&&A.logMessage("A placement was loaded after ut call was started. These ad calls will not be coordinated"),n}catch(r){A.logError("buildAdTagContainer: "+r.message)}},Oe=function(e){me.requests.utCalled=!1,me.requests.hasLeft=!1,me.requests.cbCalled=!1,me.requests.errorReported=!1;var t=A.getTargetArrayforRefresh(e),n=xe(t);A._each(n,function(e,t){A._each(j,function(e){if(t===e){var n=fe.document,r=n.getElementById(e);if(!r)return;for(;r.hasChildNodes();)r.removeChild(r.firstChild)}})}),A._each(n,function(e){e.utCalled=!1,e.displayed=!1});try{ke()}catch(r){A.logError("refreshTags "+r.message)}},Ne=function(){Oe(this.targetId)},xe=function(e){var t={};return 0===e.length?me.requests.tags:(A._each(me.requests.tags,function(n,r){for(var i=0;i<e.length;i++)e[i]===r&&(t[r]=n)}),t)},ke=function(){A._each(V,function(e,t){if("none"===t)Re(t);else{var n=Number(t);isNaN(n)?A.logError("Invalid value for member"):Re(n)}})},Re=function(e){he(e);var t=k.buildRequestJsonByMemberId(me.requests,e,Q),n=we(t);return A.isEmpty(t.tags)?void A.logWarn("ast.loadTagsByMemberId: no defined tags at this point so no /UT request will be made"):void("withCredentials"in new XMLHttpRequest?be(n,e):Me(n,e))},De=function(e,t){var n=e.member;return me.requests=me.requests||{},me.requests.tags=me.requests.tags||{},me.requests.utCalled=me.requests.utCalled||!1,me.requests.hasLeft=me.requests.hasLeft||!1,me.requests.cbCalled=me.requests.cbCalled||!1,me.requests.enableSafeFrame&&(e.enableSafeFrame=!0),e.safeframe=A.cloneAsObject(K)||{},A.hasOwn(e,"safeframeConfig")&&(A.hasOwn(e.safeframeConfig,"allowExpansionByPush")&&(e.safeframe.expansionByPush=e.safeframeConfig.allowExpansionByPush),A.hasOwn(e.safeframeConfig,"allowExpansionByOverlay")&&(e.safeframe.expansionByOverlay=e.safeframeConfig.allowExpansionByOverlay)),me.requests.tags[t]=e,me.requests.tags[t].utCalled=me.requests.tags[t].utCalled||!1,me.requests.tags[t].showTagCalled=me.requests.tags[t].showTagCalled||!1,me.requests.tags[t].displayed=me.requests.tags[t].displayed||!1,me.requests.tags[t].on=me.onEvent||void 0,me.requests.tags[t].off=me.offEvent||void 0,me.requests.tags[t].setSizes=me.setSizes||void 0,me.requests.tags[t].modifyTag=me.modifyTag||void 0,me.requests.tags[t].setKeywords=me.setKeywords||void 0,me.requests.tags[t].refresh=Ne||void 0,V[n]=typeof V[n]===ue?[]:V[n],V[n].push(e.targetId),Y[e.targetId]&&(me.requests.tags[t].showTagCalled=!0),me.requests.tags[t]},Me=function(e,t){var n=fe,r=Ce(e),i=A.loadScript(n,r);me.requests.utCalled=!0,i.onload=function(){A.logMessage("JSONP fallback used instead of POST.")},i.onerror=function(n){if(!me.requests.errorReported){var r="Unknown script error contacting endpoint over JSONP. Endpoint: "+e.url;s(r,t,"-1",O.EVENTS.REQUEST_FAIL,n),A.logError(r)}},i.onreadystatechange=function(n){if(!("loaded"!==i.readyState&&"complete"!==i.readyState||me.requests.cbCalled||me.requests.errorReported)){me.requests.errorReported=!0;var r="Unknown network error contacting endpoint over JSONP. Endpoint: "+e.url;s(r,t,"-1",O.EVENTS.REQUEST_FAIL,n),A.logError(r)}}},Ce=function(e){var t=e.url+(e.url.indexOf("?")+1?"&":"?")+"cb=apntag.handleCb&q="+encodeURI(e.data);return t},Pe=function(e){me.requests.tags=me.requests.tags||{};var t=!0,n=me.requests.tags[e];return typeof n===ue&&(t=!1),t},qe=function(){me.requests.hasLeft=!1,A._each(me.requests.tags,function(e,t){e.displayed||e.prebid||e.isMediated||(A.logWarn(t+" is not displayed.",O.LOG.WARN),me.requests.hasLeft=!0)}),me.requests.hasLeft||A.logMessage("all Tags are displayed.")},Be=function(e){function t(){n||(n=!0,e())}var n=!1;if(document.addEventListener)document.addEventListener("DOMContentLoaded",t,!1);else if(document.attachEvent){var r;try{r=null!==window.frameElement}catch(i){}if(document.documentElement.doScroll&&!r){var a=function(){if(!n)try{document.documentElement.doScroll("left"),t()}catch(e){setTimeout(a,10)}};a()}document.attachEvent("onreadystatechange",function(){"complete"===document.readyState&&t()})}if(window.addEventListener)window.addEventListener("load",t,!1);else if(window.attachEvent)window.attachEvent("onload",t);else{var o=window.onload;window.onload=function(){o&&o(),t()}}};A.logTimestamp("AST library loaded"),ve(),me.requests.checkDisplay||Be(qe),"function"==typeof window.define&&window.define.amd&&window.define("appnexusAst",[],function(){return window.apntag}),window.apn_testonly={};var Ue=window.apn_testonly;Ue.getPageTargetingParams=function(){return me.requests.targetingParams},Ue.getEvents=function(){return S.get()},Ue.getEvent=function(e,t){var n,r=S.get();return A._each(r[e],function(e){null!==e[t]&&void 0!==e[t]&&(n=e[t])}),n},Ue.buildPostRequestParams=function(e){return we(e)},Ue.getContentSourceForMediation=function(e){return N.getContentSourceForMediation(e)},Ue.getRequestTagsforRefresh=function(e){return xe(e)},Ue.getTag=function(e){return A.logMessage("getTag called for tag "+e),Pe(e)?e&&me.requests.tags&&me.requests.tags[e]?me.requests.tags[e]:void 0:void A.logError("the "+e+" tag is not defined.",O.LOG.WARN)},Ue.getEndPoint=function(){return Ie()},Ue.getKeyForSyncTags=function(e){return a(e)},Ue.getAllRequest=function(){return me.requests},Ue.getJSONPUrl=function(e){return Ce(e)},Ue.getInternalTagArr=function(){return Q},Ue.makeGetRequest=function(e){return Ee(e)},Ue.doSizeMapping=function(e,t){return typeof t===ue?T(e):T(e,t)}},function(e,t){Array.prototype.indexOf||(Array.prototype.indexOf=function(e,t){var n;if(null===this)throw new TypeError('"this" is null or not defined');var r=Object(this),i=r.length>>>0;if(0===i)return-1;var a=+t||0;if(Math.abs(a)===1/0&&(a=0),a>=i)return-1;for(n=Math.max(a>=0?a:i-Math.abs(a),0);n<i;){if(n in r&&r[n]===e)return n;n++}return-1})},function(e,t,n){var r=n(3),i=n(4),a=Array.prototype.slice,o=r._map(i.EVENTS,function(e){return e});e.exports=function(){function e(e,t){var i=t[0],o=a.call(t,1);r.logMessage("Emitting event for: "+e+" for ad tag: "+i),r._each(n[e],function(e){var t="";if(t=r.hasOwn(e,"*")?e["*"]:e[i],null!==t&&void 0!==t&&"function"==typeof t)try{t.apply(null,o)}catch(n){r.logError("events._dispatch: Error executing event handler function: "+n.message)}})}function t(e){return r.contains(o,e)}var n={},i={};return i.on=function(e,i,a){if(t(e)){var s={};s[i]=a,n[e]=n[e]||[],n[e].push(s)}else r.logError("Wrong event name : "+e+" Valid event names :"+o)},i.emit=function(t){var n=a.call(arguments,1);e(t,n)},i.off=function(e,t,i){r.isEmpty(n[e])||r._each(n[e],function(e){"*"===t&&null!==e[Object.keys(e)[0]]&&void 0!==e[Object.keys(e)[0]]?"undefined"!=typeof i&&Object.values(e)!==i||(e[Object.keys(e)[0]]=null):null!==e[t]&&void 0!==e[t]&&("undefined"!=typeof i&&e[t]!==i||(e[t]=null))})},i.get=function(){return n},i}()},function(e,t){"object"!=typeof JSON&&(JSON={}),function(){"use strict";function e(e){return e<10?"0"+e:e}function t(){return this.valueOf()}function n(e){return i.lastIndex=0,i.test(e)?'"'+e.replace(i,function(e){var t=s[e];return"string"==typeof t?t:"\\u"+("0000"+e.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+e+'"'}function r(e,t){var i,s,u,l,c,g=a,f=t[e];switch(f&&"object"==typeof f&&"function"==typeof f.toJSON&&(f=f.toJSON(e)),"function"==typeof d&&(f=d.call(t,e,f)),typeof f){case"string":return n(f);case"number":return isFinite(f)?String(f):"null";case"boolean":case"null":return String(f);case"object":if(!f)return"null";if(a+=o,c=[],"[object Array]"===Object.prototype.toString.apply(f)){for(l=f.length,i=0;i<l;i+=1)c[i]=r(i,f)||"null";return u=0===c.length?"[]":a?"[\n"+a+c.join(",\n"+a)+"\n"+g+"]":"["+c.join(",")+"]",a=g,u}if(d&&"object"==typeof d)for(l=d.length,i=0;i<l;i+=1)"string"==typeof d[i]&&(s=d[i],u=r(s,f),u&&c.push(n(s)+(a?": ":":")+u));else for(s in f)Object.prototype.hasOwnProperty.call(f,s)&&(u=r(s,f),u&&c.push(n(s)+(a?": ":":")+u));return u=0===c.length?"{}":a?"{\n"+a+c.join(",\n"+a)+"\n"+g+"}":"{"+c.join(",")+"}",a=g,u}}var i=/[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;"function"!=typeof Date.prototype.toJSON&&(Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+e(this.getUTCMonth()+1)+"-"+e(this.getUTCDate())+"T"+e(this.getUTCHours())+":"+e(this.getUTCMinutes())+":"+e(this.getUTCSeconds())+"Z":null},Boolean.prototype.toJSON=t,Number.prototype.toJSON=t,String.prototype.toJSON=t);var a,o,s,d;"function"!=typeof JSON.stringify&&(s={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},JSON.stringify=function(e,t,n){var i;if(a="",o="","number"==typeof n)for(i=0;i<n;i+=1)o+=" ";else"string"==typeof n&&(o=n);if(d=t,t&&"function"!=typeof t&&("object"!=typeof t||"number"!=typeof t.length))throw new Error("JSON.stringify");return r("",{"":e})})}()},function(e,t,n){var r=n(3),i=n(4),a=t,o=[],s=!1,d=i.EXTERNAL_LIB.VIDEO_MEDIATION_JS,u=i.EXTERNAL_LIB.BANNER_MEDIATION_JS,l=i.UT_RESPONSE_PROP.AD_TYPE,c=i.AD_TYPE.BANNER,g=i.AD_TYPE.VIDEO;a.checkIfMediatedResponse=function(e){var t=!1;return e&&r._each(e,function(e){if("csm"===e.content_source)return void(t=!0)}),t},a.getMediationType=function(e){var t=c;return e&&r._each(e,function(e){if(e[l]===g)return void(t=g)}),t},a.callMediationFramework=function(e,t,n,i){var a=this;e===g&&(null!==t&&o.push(t),s&&window.APNVideo_AstMediationManager?r._each(o,function(e){if(!e.called)try{window.APNVideo_AstMediationManager.selectAd(e.uuid,e,n,i),e.called=!0}catch(t){r.logError("Error invoking video mediation","mediationmanager.js",t)}}):(r.loadScript(window,d,function(){a.callMediationFramework(g,null,n,i)}),s=!0))},a.getMediationOptions=function(e,t){var n={};return r._each(e,function(e){e.uuid===t.uuid&&e.mediationOptions&&(n=e.mediationOptions)}),n},a.getAdObjByMediation=function(e){return e.isMediated?e.adResponse.ad:e.adResponse.ads[0]},a.copyAdObjforMediation=function(e){return e.isMediated||(e.adResponse.ad=e.adResponse.ads[0]),e},a.getContentSourceForMediation=function(e){var t=e.content_source,n=e.ad_type;if(t)return e[t][n]},a.getContentForBannerMediation=function(e,t){var n="<script>";return n+="var APN_macros = {};",n+='APN_macros.uuid = "'+e+'";',n+="APN_macros.ads = ",n+='window.parent.apntag.getAdMarkup("'+e+'", "'+t.uuid+'");',n+=";",n+="document.write('<scr' + 'ipt src=\""+u+"\"></scr' + 'ipt>');",n+="</script>"}},function(e,t){function n(){var e=document.createElement("iframe");return e.id="appnexus-debug-console-loader",e.height="100%",e.width="100%",e.border="0px",e.hspace="0",e.vspace="0",e.marginWidth="0",e.marginHeight="0",e.style.border="0",e.frameBorder="0",e}function r(){var e;return window.localStorage&&(e=window.localStorage.getItem("ast_dongle")),'<div style="margin-top:10px;margin-bottom:10px;"><span style="font-weight:bold">AST Dongle Value:</span> <input\n            id="ast-dongle-input"\n            type="text"\n            length="400"\n            style="border-radius:5px;"\n            placeholder="Enter ast_dongle value"\n            onkeyup=if(window.localStorage){window.localStorage.setItem(\'ast_dongle\',event.target.value)};\n            value='+e+"\n         /></div>"}function i(e){var t=e.map(function(e){return'\n      <table style="border: 1px solid black; border-radius: 5px; font-family: sans-serif; margin: 1em; padding: .5em">\n        <tr>\n          <td style="padding-right: 5em;"><b>Target&nbsp;ID</b></td>\n          <td style="width: 100%;">'+a(e)+"</td>\n        </tr>\n        <tr>\n          <td><b>Creative ID</b></td>\n          <td>"+o(e,"creative_id")+"</td>\n        </tr>\n        <tr>\n          <td><b>Buyer Member ID</b></td>\n          <td>"+o(e,"buyer_member_id")+"</td></tr>\n        <tr>\n          <td><b>Creative Size</b></td>\n          <td>"+s(e)+"</td>\n        </tr>\n        <tr>\n          <td><b>Available Sizes</b></td>\n          <td>"+d(e)+"</td></tr>\n        <tr>\n          <td><b>Winning Bid</b></td>\n          <td>"+o(e,"cpm")+"</td></tr>\n        <tr>\n          <td><b>Demand Source</b></td>\n          <td>"+u(e)+"</td></tr>\n        <tr>\n          <td><b>Ad Type</b></td>\n          <td>"+o(e,"ad_type")+"</td></tr>\n        <tr>\n          <td><b>Media Type</b></td>\n          <td>"+o(e,"media_type_id")+'</td></tr>\n        <tr>\n          <td style="color: #555; font-size: smaller; padding-top: .5em;" colspan="2">\n            Console Ad Profile:\n            <a href="'+l(e)+'" target="_blank">'+e.ad_profile_id+"</a>\n            "+c(e)+"\n          </td>\n        </tr>\n      </table>\n    "}).join(" ");return t}function a(e){try{return Object.keys(apntag.requests.tags).filter(function(t){return apntag.requests.tags[t].uuid===e.uuid})[0]}catch(t){return""}}function o(e,t){if(e.nobid)return f;var n=e.ads&&e.ads[0][t];return n||0===n?n:""}function s(e){if(e.nobid)return f;var t=null,n=null,r=e.ads&&e.ads.length?e.ads[0]:{};return r.rtb&&r.rtb.banner&&(t=r.rtb.banner.height,n=r.rtb.banner.width),t&&n?n+" x "+t:""}function d(e){try{var t=a(e),n=apntag.requests.tags[t].sizes;return JSON.stringify(n)}catch(r){return""}}function u(e){if(e.nobid)return f;var t="";return t=e.ads[0].csm?"CSM":e.ads[0].buyer_member_id===e.ads[0].seller_member_id||e.ads[0].deal_id?e.ads[0].buyer_member_id!==e.ads[0].seller_member_id&&e.ads[0].deal_id?"Deal":e.ads[0].buyer_member_id===e.ads[0].seller_member_id?"Direct":"":"RTB"}function l(e){return"//console.appnexus.com/ad-quality?id="+e.placement.publisher.id}function c(e){if(!e.ads)return"";var t="//ib.adnxs.com/cr?id="+e.ads[0].creative_id;return'| <a href="'+t+'" target="_blank">Creative Preview<a/>'}var g=t;g.load=function(e){e=e.replace(/(\n)/g,"<br>"),e=r()+e;var t=document.body,i=document.createElement("div");i.id="appnexus_debug_window";var a=document.createElement("div");a.style.width="100%",a.style.height="400px",a.style.clear="both",t.insertBefore(a,null);var o=i.style;o.position="fixed",o.bottom="0px",o.left="0px",o.width="100%",o.height="450px",o.overflow="hidden",o["border-top"]="1px solid",o["z-index"]=999999,o.background="white",t.insertBefore(i,null);var s=document.createElement("div");s.style.width="100%",s.style.height="30px";var d=n();i.appendChild(d);var u=d.contentWindow.document;d.onload=function(){var e,t,n,r=u.getElementsByTagName("br"),i=r.length,a=0;for(a;a<i-1;a++)n=!1,e=r[a].nextSibling,t=e.nodeName.toLowerCase(),"br"===t&&(n=!0),n&&(e.style.display="none")};var l="</script>";u.open(),u.write(e),u.write(l),u.close()},g.loadToolkit=function(e){var t=r()+i(e),a=document.body,o=document.createElement("div");o.id="appnexus_debug_window";var s=document.createElement("div");s.style.width="100%",s.style.height="400px",s.style.clear="both",a.insertBefore(s,null);var d=o.style;d.position="fixed",d.bottom="0px",d.left="0px",d.width="100%",d.height="450px",d.overflow="hidden",d["border-top"]="1px solid",d["z-index"]=999999,d.background="white",a.insertBefore(o,null);var u=document.createElement("div");u.style.width="100%",u.style.height="30px";var l=n();o.appendChild(l);var c=l.contentWindow.document;c.open(),c.write(t),c.close()};var f='<span style="color: #ccc">nobid</span>'},function(e,t,n){var r=n(3),i=t;i.invokeNotify=function(e,t){r.isFn(t)?r.logWarn("apntag.notify not supported by renderer"):r.isObj(t)&&r._each(e,function(e){r.isFn(t.notify)&&!e.sent&&(e.sent=!0,t.notify(e.messageType,e.messagePayload))})},i.invokeRendererRenderAd=function(e,t,n){r.isFn(e)?e.call(apntag,t,n):r.isObj(e)&&(r.isFn(e.renderAd)?e.renderAd.call(apntag,t,n):r.logError("Error invoking rendererObj.renderAd(). renderAd must be a function"))},i.createNotifyObj=function(e,t,n){return{messageType:e,messagePayload:t,targetId:n,sent:!1}}},function(e,t){t.getBrowserType=function(){var e=n(),t=/(webkit)[ \/]([\w.]+)/.exec(e)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e)||/(msie) ([\w.]+)/.exec(e)||e.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e)||[];return t[1]};var n=function(){return navigator.userAgent.toLowerCase()}},function(e,t,n){var r=n(3),i=t;i.startListening=function(){r.addEventHandler(window,"message",function(e){if(e&&e.origin&&e.origin.indexOf(".adnxs.com")>0)try{var t=JSON.parse(e.data);"adError"===t.eventType&&apntag.recordErrorEvent(t.exception,t.targetId)}catch(n){r.logError(n)}})},i.sendMessage=function(e,t){e&&e.postMessage(t,"*")}},function(e,t,n){var r=n(3),i=n(17),a=t;a.attach=function(e,t,n){r.addEventHandler(e,t,n)},a.handleMessage=function(e){if(e.origin===r.getCdnOrigin()){r.logInfo("Data sent from creative",e.data);var t;try{t=JSON.parse(e.data)}catch(n){return void r.logError(n)}if(r.hasOwn(t,"eventType"))"adError"===t.eventType&&window.apntag.recordErrorEvent(t.exception,t.targetId);else switch(t.name){case"expand":i.expandIframe(t);break;case"collapse":i.collapseIframe(t);break;case"resizeAd":apntag.resizeAd(t.targetId,t.cmd);break;case"emitEvent":apntag.emitEvent.apply(null,t.cmd);break;case"message":}}},a.sendMessage=function(e,t,n){e.postMessage(t,n)}},function(e,t,n){function r(e){i(),h=window.setTimeout(function(){s(e)},y)}function i(){h&&(clearTimeout(h),h=0)}function a(){m&&(clearTimeout(m),m=0)}function o(){var e=l.getInstance().getIframes();d._each(e,function(e,t){var n=apntag.requests.tags[t];(n.alwaysUseXDomainIframe||n.enableSafeFrame)&&p.sendGeom(e.iframe,t)}),a()}function s(e){var t=l.getInstance().getIframes();d._each(t,function(t,n){var r=apntag.requests.tags[n];if(r.alwaysUseXDomainIframe||r.enableSafeFrame){var i=t.iframe.contentWindow,a={};a.targetId=n,a.value=e,a.status=u.SAFEFRAME.STATUS.FOCUS_CHANGE,c.sendMessage(i,JSON.stringify(a),d.getCdnOrigin())}}),i()}var d=n(3),u=n(4),l=n(18),c=n(16),g=n(19),f=u.TYPE.NUM,p=t,m=0,h=0,v=500,y=2;p.expandIframe=function(e){d.logMessage("Expand iframe started by host");var t,n,r,i,a=!1,o=!1,s=0,g=0,m=0,h=0,v=d.getWindow(),y=v.document.getElementById(u.PREFIX.UT_DIV+e.targetId),E=l.getInstance(),b=E.getIframe(e.targetId),w=b.iframe.style,I=y.style;I.display="";var T=parseInt(I.width,10),_=parseInt(I.height,10);if(e.bounds.multiDir?(n=d.getValueAsType("data.bounds.left",e.bounds.left,f),i=d.getValueAsType("data.bounds.right",e.bounds.right,f),t=d.getValueAsType("data.bounds.top",e.bounds.top,f),r=d.getValueAsType("data.bounds.bottom",e.bounds.bottom,f),m=T+n+i,h=_+t+r,t?(g=t*-1,o=!0):g=0,n?(s=n*-1,a=!0):s=0):(s=e.bounds.x,g=e.bounds.y,a=s<0,o=g<0,m=a?T+s*-1:T+s,h=o?_+g*-1:_+g),!(m<=T&&h<=_)){w.width=m+"px",w.height=h+"px",a&&(w.left=s+"px"),o&&(w.top=g+"px"),w.zIndex=u.SAFEFRAME.DEFAULT_ZINDEX;var A=v.document.getElementById(u.PREFIX.UT_DIV+e.targetId),S=A.style;S.position="relative",e.bounds.push?(S.width=m+"px",S.height=h+"px"):(S.width=T+"px",S.height=_+"px");var O=b.iframe.contentWindow,N={};N.targetId=e.targetId,N.status=u.SAFEFRAME.STATUS.NOTIFY_EXPANDED,N.geom=p.geom(e.targetId,b.iframe),c.sendMessage(O,JSON.stringify(N),d.getCdnOrigin())}},p.collapseIframe=function(e){d.logMessage("Collapse iframe started by host");var t=d.getWindow(),n=t.document.getElementById(u.PREFIX.UT_DIV+e.targetId),r=n.style,i=l.getInstance(),a=i.getIframe(e.targetId),o=a.iframe.style,s=a.originalWidth,g=a.originalHeight;o.left="",o.top="0px",r.width=s+"px",o.width=s+"px",r.height=g+"px",o.height=g+"px",o.zIndex="";var f=a.iframe.contentWindow,m={};m.targetId=e.targetId,m.geom=p.geom(e.targetId,a.iframe),m.status=u.SAFEFRAME.STATUS.NOTIFY_COLLAPSED,c.sendMessage(f,JSON.stringify(m),d.getCdnOrigin())},p.geom=function(e,t){return d.logMessage("Geom starting"),g.build_geom(e,t)},p.handleWindowFocus=function(){r(!0)},p.handleWindowBlur=function(){r(!1)},p.sendGeomWithGeom=function(e,t,n){var r=e.contentWindow,i={};i.targetId=t,i.geom=n,i.status=u.SAFEFRAME.STATUS.GEOM_UPDATE,c.sendMessage(r,JSON.stringify(i),d.getCdnOrigin())},p.sendGeom=function(e,t){p.sendGeomWithGeom(e,t,p.geom(t,e))},p.handleGeomUpdate=function(){m||(m=window.setTimeout(o,v))},p.removeHandlers=function(){var e=l.getInstance().getIframes();d._each(e,function(e,t){var n=apntag.requests.tags[t];(n.alwaysUseXDomainIframe||n.enableSafeFrame)&&g.removeHandlers(t)})}},function(e,t,n){var r=n(3),i=function(){function e(){return{add:function(e,t){n[e]=t},getIframe:function(e){return r.hasOwn(n,e)?n[e]:null},getIframes:function(){return n},resetInstance:function(){n={}}}}var t,n={};return{getInstance:function(){return t||(t=e()),t}}}();e.exports=i},function(e,t,n){function r(e){return e=i(e),e&&e.search(/\D+/g)==-1?be:e&&e.search(/px/gi)!=-1?be:void 0}function i(e){var t=typeof e;return t==re?e:t!=Q||e?t==ne&&e&&e.join?e.join(""):e===!1?"false":e===!0?"true":e?ce(e):"":"0"}function a(e){var t=0;return parseFloat(e.replace(/\./g,function(){return 1==t++?"":"."}))}function o(e,t,n){var r=e&&e.match(t);return n==Ee?r:r&&r[n]||Ee}function s(e,t){return e.test(t)}function d(){var e,t={};t.ie=t.opera=t.gecko=t.webkit=t.safari=t.chrome=t.air=t.ipod=t.ipad=t.iphone=t.android=t.webos=t.silk=t.nodejs=t.phantomjs=0,t.mobile=t.ios=t.accel=!1,t.caja=ve&&ve.cajaVersion;var n=ye;return n&&(s(/KHTML/,n)&&(t.webkit=1),s(/IEMobile|XBLWP7/,n)&&(t.mobile="windows"),s(/Fennec/,n)&&(t.mobile="gecko"),e=o(n,/AppleWebKit\/([^\s]*)/,1),e&&(t.webkit=a(e),t.safari=t.webkit,s(/PhantomJS/,n)&&(e=o(n,/PhantomJS\/([^\s]*)/,1),e&&(t.phantomjs=a(e))),s(/ Mobile\//,n)||s(/iPad|iPod|iPhone/,n)?(t.mobile="Apple",e=o(n,/OS ([^\s]*)/,1),e=e&&a(e.replace("_",".")),t.ios=e,t.ipad=t.ipod=t.iphone=0,e=o(n,/iPad|iPod|iPhone/,0),e&&(t[e[ie]()]=t.ios)):(e=o(n,/NokiaN[^\/]*|Android \d\.\d|webOS\/\d\.\d/,0),e&&(t.mobile=e),s(/webOS/,n)&&(t.mobile="WebOS",e=o(n,/webOS\/([^\s]*);/,1),e&&(t.webos=a(e))),s(/ Android/,n)&&(t.mobile="Android",e=o(n,/Android ([^\s]*);/,1),e&&(t.android=a(e))),s(/Silk/,n)&&(e=o(n,/Silk\/([^\s]*)\)/,1),e&&(t.silk=a(e)),s(/Accelerated=true/,n)&&(t.accel=!0))),e=n.match(/(Chrome|CrMo)\/([^\s]*)/),e&&e[1]&&e[2]?(t.chrome=a(e[2]),t.safari=0,"CrMo"===e[1]&&(t.mobile="chrome")):(e=o(n,/AdobeAIR\/([^\s]*)/),e&&(t.air=e[0]))),t.webkit||(e=o(n,/Opera[\s\/]([^\s]*)/,1),e?(t.opera=a(e),e=o(n,/Opera Mini[^;]*/,0),e&&(t.mobile=e)):(e=o(n,/MSIE\s([^;]*)/,1),e?t.ie=a(e):(e=o(n,/Gecko\/([^\s]*)/),e&&(t.gecko=1,e=o(n,/rv:([^\s\)]*)/,1),e&&(t.gecko=a(e))))))),t}function u(e){var t,n=Ee,r="parentWindow",i="defaultView";try{e&&(n=e[r]||e[i]||Ee,n||(t=p(e),n=t&&(t[r]||t[i])||Ee))}catch(a){n=Ee}return n}function l(e,t){var n="",r=!(!arguments[se]||!t),i="getComputedStyle";if(r)if(Te&&Te<9)try{n=e.currentStyle[t]}catch(a){n=""}else try{n=u(e)[i](e,Ee)[t]}catch(a){n=""}else if(Te&&Te<9)try{n=e.currentStyle}catch(a){n=Ee}else try{n=u(e)[i](e,Ee)}catch(a){n=Ee}return n}function c(e,t){var n,i=0,a=0,o=/^t(?:able|d|h|r|head|foot)$/i;return n=l(e),n&&(i=n.borderTopWidth,a=n.borderLeftWidth,i=r(i)?v(i,0):0,a=r(a)?v(a,0):0,Ae&&o.test(b(e))&&(i=a=0)),t=t||{t:0,l:0},t.t+=i,t.l+=a,t}function g(e){var t,n,r,i={t:0,l:0,r:0,b:0,w:0,h:0,z:0},a=0,o=0,s=we,d=m(e),u=O(e);if(e&&1==e[W])try{for(i.l=e.offsetLeft||0,i.t=e.offsetTop||0,t=e,s=Ae||_e>519;(t=t.offsetParent)&&(i.t+=t.offsetTop||0,i.l+=t.offsetLeft||0,s&&c(t,i),t!=d););if(t=e,"fixed"!=l(t,"position")){for(t=e;(t=f(t))&&(1==t[W]&&(a=t.scrollTop||0,o=t.scrollLeft||0,Ae&&"visible"!=l(t,de)&&c(t,i),i.l-=o,i.t-=a),t!=d););i.t+=u.y,i.l+=u.x}else i.t+=u.y,i.l+=u.x;Te||e!=m(e)?(r=e.offsetHeight,n=e.offsetWidth):(r=e.clientHeight,n=e.clientWidth),i.b=i.t+r,i.r=i.l+n,i.w=fe(i.r-i.l,0),i.h=fe(i.b-i.t,0),i.z=l(e,"zIndex")}catch(g){
i={t:0,l:0,r:0,b:0,w:0,h:0,z:0}}return i}function f(e){return e&&(e.parentNode||e.parentElement)}function p(e){var t=Ee;try{e&&(t=9==e[W]?e:e[ue]||e.ownerDocument||Ee)}catch(n){t=Ee}return t}function m(e){var t=e&&p(e)||B,n=t[F],r=t[L];return n&&!Se&&"CSS1Compat"!=n&&(r=t.body),r}function h(e){var t,n,i,a,o=[-1,-1,-1,-1],s=[K+"Top",K+"Right",K+"Bottom",K+"Left"],d=0;if(!e)return o;if(Te)for(;n=s[d];)t=e[n],r(t)&&(t=v(t,-1),t>=0&&(o[d]=t)),d++;else if(t=e[K],t&&t.search(/\d+/g)!=-1)for(t=t.replace(/\w+\(([^\)]*?)\)/g,"$1"),o=t.split(" "),o=o[se]<=1?o.split(","):o,a=o[se],d=0;a--;)i=o[d],r(i)?o[d]=v(i,-1):o[d]=-1,d++;return o}function v(e,t,n,r){if(typeof e!=Q)try{e=e?parseFloat(e):$.NaN}catch(i){e=$.NaN}return r==Ee&&(r=Z),n==Ee&&(n=ee),(isNaN(e)||e<n||e>r)&&t!=Ee?t:e}function y(e,t){var n=we,r=e&&e[W]||-1,i=t&&t[W]||-1;if(1==r&&i!=-1)if(e[V])if(Se||1==i)n=e[V](t);else for(;t;){if(e===t){n=be;break}t=t.parentNode}else e[te]&&(n=e===t||!!(16&e[te](t)));return n}function E(e){var t,n=arguments,r=n[se];return t=r>1?p(n[1]):U,t&&t.getElementById(e)||Ee}function b(e){return e&&1==e[W]&&e.tagName[ie]()||""}function w(e,t,n){try{arguments[se]>2?n===Ee?e[X](t):(n=i(n),"class"==t[ie]()?e.className=n:e[J](t,n)):n=i(e[Y](t))}catch(r){n=""}return n}function I(){return(new Date).getTime()}function T(){return ge.round(100*ge.random())}function _(e){return i([e||"","_",I(),"_",T(),"_",Ne++])}function A(e,t){var n,r,i,a,o,s,d,u,l,c=Oe(e),g=p(e),f=m(g),h=c.t,b=c.l,I=c.r-c.l,T=c.b-c.t,A=H,S=[],O=me(I/A),x=me(T/A),k=O,R=x,D={},M={},C=[],P=0;if(mgr_bounds_details?M=mgr_bounds_details:N(e,M,be),s=M.refNode,d=M.refRect,d&&s&&s!=f?(u=d.r,l=d.b):(u=b+I,l=h+T),g&&f&&g[oe]){for(;k<I;){for(R=x;R<T;)n=b+k,r=h+R,n<u&&r<l&&C.push([n,r]),R+=x;k+=O}for(t=v(t,C[se]);i=C[P++];){o=g[oe](i[0],i[1]);try{o&&1==o.nodeType&&o!==f&&o!==e&&!y(e,o)&&(a=w(o,"id"),a||(a=_("geom_inter"),w(o,"id",a)),!D[a]&&S[se]<t&&(D[a]=1,S.push(o)))}catch(q){}}}a="";for(a in D)0==a.indexOf("geom_inter")&&(o=E(a),o&&w(o,"id",Ee));return S}function S(e){var t=m(e),n=0,r=0;return t&&(n=t.scrollWidth||0,r=t.scrollHeight||0),{t:0,l:0,b:r,r:n,w:n,h:r}}function O(e){var t,n,r,i,a={x:0,y:0,w:0,h:0},o={scrollLeft:0,scrollTop:0,scrollWidth:0,scrollHeight:0},s=0,d=0;return t=p(e)||B,n=t[L]||o,i=t.body||o,r=t.defaultView,r&&(s=v(r.pageXOffset,0),d=v(r.pageYOffset,0)),a.x=fe(n.scrollLeft,i.scrollLeft,s),a.y=fe(n.scrollTop,i.scrollTop,d),a.w=fe(n.scrollWidth,i.scrollWidth,0),a.h=fe(n.scrollHeight,i.scrollHeight,0),a}function N(e,t,n){var r,i,a,o,s,d,u,c,g,p,y,E,I,T,_,N,k,R,D,M,C,P,q=e&&f(e),U=m(e),L=Oe(e),V=Oe(U),H=O(U),Y=S(e),J={t:0,l:0,r:0,b:0,w:0,h:0},X={t:0,l:0,r:0,b:0,xs:0,ys:0,xiv:0,yiv:0,iv:0,w:0,h:0},Q=0,K=0,$=we,Z=we,ee=we;if(t=t&&typeof t==ne?t:{},q)for(;(r=l(q))&&("block"!=r.display&&"absolute"!=r.position&&"none"==r["float"]&&"none"==r.clear||(T=r[de+"X"],k=r[de+"Y"],R=h(r),q==U?(c=H.w,y=H.h):(c=q.scrollWidth,y=q.scrollHeight),g=q.offsetWidth,E=q.offsetHeight,p=q.clientWidth,I=q.clientHeight,(T==j||R[1]>0||R[3]>0)&&(C||(D=1,C=q)),(k==j||R[0]>0||R[2]>0)&&(C||(M=1,C=q)),T==G&&(C=q,Q=E-I,$=be),k==G&&(C||(C=q),K=g-p,$=be),T==z&&(C||(C=q),c>p&&(Q=E-I),$=be),k==z&&(C||(C=q),y>I&&(K=g-p),$=be),!C))&&(q==U&&(c>p&&(a=he.innerHeight||0||E,Q=a-I),y>I&&(i=he.innerWidth||0||g,K=i-p),$=be),q=f(q),q&&1==q[W]););return L.w&&L.h&&(C&&C!=U?(r=l(C),"body"==b(C)?(C=U,o=L.t,s=L.l):o=s=0,J=Oe(C),R[1]>0&&(J.w=R[1],J.r=J.l+J.w),R[3]>0&&(J.l=J.l+R[3],J.w=J.w-R[3]),R[2]>0&&(J.h=R[2],J.b=J.t+J.h),R[0]>0&&(J.t=J.t+R[0],J.h=J.h-R[0]),L.t>J.t&&J.t>0&&(o=L.t-J.t),L.l>J.l&&J.l>0&&(s=L.l-J.l),N=C.scrollTop,_=C.scrollLeft,y=C.scrollHeight,c=C.scrollWidth,X.t=fe(o,0),X.l=fe(s,0),r&&(D=r[de+"X"]==j||R[1]>0||R[3]>0,M=r[de+"Y"]==j||R[0]>0||R[2]>0),L.t>=J.b?X.b=0:(!M&&L.t>=J.b&&(M=1),y>C.clientHeight?M?X.b=0:X.b=fe(y-L.h-Q-o,0):X.b=fe(J.h-L.h-Q-o,0)),L.l>=J.r?X.r=0:(!D&&L.l>=J.r&&(D=1),c>C.clientWidth?D?X.r=0:X.r=fe(c-L.w-K-s,0):X.r=fe(J.w-L.w-K-s,0))):(X.t=fe(L.t,0),X.l=fe(L.l,0),Te&&"BackCompat"==B[F]&&"no"==w(U,G)?M=D=1:(r=l(U),r&&(D=r[de+"X"]==j,M=r[de+"Y"]==j)),H.h>U.clientHeight?M?X.b=0:(ee=be,X.b=fe(Y.h-L.h-Q-L.t,0)):X.b=fe(V.h-L.h-Q-L.t,0),H.w>U.clientWidth?D?X.r=0:(Z=be,X.r=fe(Y.w-L.w-K-L.l,0)):X.r=fe(V.r-L.w-K-L.l,0)),X.xs=Q?1:0,X.ys=K?1:0,X.w=X.r+X.l,X.h=X.t+X.b,C&&C!=U?P=J:(P=V,C=U),s=fe(L.l,P.l),d=pe(L.r,Z?pe(Y.r,P.r):P.r),i=fe(d-s,0),o=fe(L.t,P.t),u=pe(L.b,ee?pe(Y.b,P.b):P.b),a=fe(u-o,0),X.xiv=0,X.yiv=0,X.iv=0,x(e)&&(X.xiv=v((i/L.w)[ae](2)),X.yiv=v((a/L.h)[ae](2)),X.iv=v((i*a/(L.w*L.h))[ae](2)))),t.refNode=C||U,t.isRoot=C==U,t.canScroll=$,t.refRect=C&&C!=U?J:V,t.expRect=X,t.rect=L,n&&!function(){var r,i,a,o,s,d,u,l,c,g,f,p,m,h,y,E,b=0,w=0;if(X.iv>.5&&(mgr_bounds_details=t,r=A(e,v(n,1,1)),mgr_bounds_details=Ee,w=r[se],i=L.w,a=L.h,o=i*a,w))for(;s=r[b++];)d=Oe(s),c=fe(L.l,d.l),g=pe(L.r,d.r),u=fe(L.t,d.t),l=pe(L.b,d.b),p=g-c,f=l-u,m=p*f,y=(1-p/i)[ae](2),E=(1-f/a)[ae](2),h=(1-m/o)[ae](2),(y>0&&y<X.xiv||E>0&&E<X.yiv)&&(X.xiv=y,X.yiv=E,X.iv=h)}(),X}function x(e){if(Te&&Te<9){if(e.style)for(;"BODY"!=e.tagName;){if("hidden"==e.style.visibility)return!1;if(e=e.parentNode,!e)return!1}return!0}var t=l(e,"visibility");return void 0==t||"visible"==t}function k(e){var t=e&&u(e)||he,n=t.innerHeight||0,r=t.innerWidth||0,i=t.screenY||t.screenTop||0,a=n+i,o=t.screenX||t.screenLeft||0,s=r+o,d=m(e);return n||r||!d||(n=d.clientHeight||0,r=d.clientWidth||0,s=o+r,a=i+n),{t:i,l:o,b:a,r:s,w:r,h:n}}function R(e,t,n){var r,i,a,o,s,d={},u={};return N(t,u,be),n||u.isRoot||!u.canScroll||(o=u.expRect,(o.xs||o.ys)&&(r=xe[e],a=u.refNode,r&&r.node!=a&&(r.tID&&clearTimeout(r.tID),q.removeEventHandler(i,G,r[le]),r.node=r[le]=Ee,xe[e]=Ee,delete xe[e]),xe[e]||(r={},r.node=a,r[le]=function(n){D(n,e,t)},xe[e]=r,q.addEventHandler(a,G,r[le])))),d.win=k(),d.par=u.refRect,o=u.expRect,s=u.rect,s.iv=o.iv,s.xiv=o.xiv,s.yiv=o.yiv,delete o.iv,delete o.xiv,delete o.yiv,d.exp=o,d.self=s,d}function D(e,t,n){var r=xe[t];r&&(r.tID&&(clearTimeout(r.tID),delete r.tID),r.tID=setTimeout(function(){var e=P.getInstance().getIframe(t);e&&C.sendGeomWithGeom(e.iframe,t,R(t,e.iframe,be)),delete r.tID},C.GEOM_UPDATE_INTRVAL))}function M(e){var t=xe[e];t&&(t.tID&&clearTimeout(t.tID),q.removeEventHandler(t.node,G,t[le]),t.node=t[le]=Ee,xe[e]=Ee,delete xe[e])}var C=n(17),P=n(18),q=n(3),B=window.document,U=B,F="compatMode",L="documentElement",W="nodeType",j="hidden",z="auto",V="contains",H=10,G="scroll",Y="getAttribute",J="setAttribute",X="removeAttribute",Q="number",K="clip",$=window.Number,Z=$&&$.MAX_VALUE,ee=-1*Z,te="compareDocumentPosition",ne="object",re="string",Q="number",ie="toLowerCase",ae="toFixed",oe="elementFromPoint",se="length",de="overflow",ue="document",le="onscroll",ce=window.String,ge=window.Math,fe=Math.max,pe=Math.min,me=Math.round,he=window,ve=window.navigator,ye=ve.userAgent||"",Ee=(!window.ActiveXObject&&"ActiveXObject"in window,null),be=!0,we=!1,Ie=d(),Te=Ie.ie||0,_e=Ie.webkit||0,Ae=Ie.gecko||0,Se=Ie.opera||0,Oe=g,Ne=0,xe={};mgr_bounds_details=we,t.removeHandler=M,t.build_geom=R},function(e,t,n){function r(e){return!!(a.isArray(e)&&e.length>0)||(a.logInfo("No size mapping defined"),!1)}var i,a=n(3),o=t;o.mapSizes=function(e){if(!r(e.sizeMapping))return e.sizes;var t,n=o.getScreenWidth();if(!n){t=e.sizeMapping[0];for(var i=0;i<e.sizeMapping.length;i++)e.sizeMapping[i].minWidth>t.minWidth&&(t=e.sizeMapping[i]);return t.sizes?t.sizes:e.sizes}for(var s="",d=0;d<e.sizeMapping.length;d++)if(n>=e.sizeMapping[d].minWidth){t=e.sizeMapping[d];break}return t&&t.sizes?(s=t.sizes,a.logMessage("tag : "+e.targetId+" resized based on device width to : "+s)):a.logMessage("tag : "+e.targetId+" not mapped to any sizes for device width. This request will be suppressed."),s},o.getScreenWidth=function(e){var t=e||i||a.getWindow(),n=t.document;return t.innerWidth?t.innerWidth:n.body.clientWidth?n.body.clientWidth:n.documentElement.clientWidth?n.documentElement.clientWidth:0},o.setWindow=function(e){i=e}},function(e,t){"use strict";function n(){var e=document.createElement("div");e.id="cookiemsg-slider";var t='<style media="screen">'+v+"</style>";return e.innerHTML=t+h,e}function r(e){y.setParentNode(e);var t=y.getContainer().querySelector("#ancookie-close");t.addEventListener("click",function(){e.remove()});var n=i();n(),window.addEventListener("resize",n)}function i(){var e;return function(){var t=y.getSliderElement(),n=d(t),r=y.getMessageElement();r.setAttribute("style","-webkit-transition: none; -webkit-transform: translateX(0); -webkit-column-width: "+n+"px;");var i=y.getNav();i.innerHTML="",clearTimeout(e),e=setTimeout(function(){clearInterval(m),r.style.webkitTransition="opacity 0.3s ease-out",r.style.opacity=1;var e=t.scrollWidth+10,o=Math.round(e/n);1<o&&(s(i),a())},300)}}function a(){var e,t=3e3,n=y.getSliderElement(),r=d(n),i={cycles:2,isFirstSlide:!0};m=setInterval(function(){i.cycles||clearInterval(m),e=i.isFirstSlide?1:0,i=o(-1*e*r,1.2,i)},t)}function o(e,t,n){var r=y.getMessageElement();r.style.webkitTransition="opacity 0.3s ease-out, -webkit-transform "+t+"s cubic-bezier(0.23, 1, 0.32, 1)",r.style.webkitTransform="translateX("+e+"px)",0==e&&n.cycles--,n.isFirstSlide=!n.isFirstSlide;for(var i=y.getContainer().querySelectorAll("span"),a=0;a<i.length;a++)"selected"===i[a].className?i[a].removeAttribute("class"):i[a].setAttribute("class","selected");return n}function s(e){for(var t="<span class=selected></span>",n=1;n<2;n++)t+="<span></span>";e.innerHTML=t}function d(e){return e.offsetWidth}function u(e){e&&e.override&&(E=e.override),e&&e.cookieUrl&&(b=e.cookieUrl);var t=window.addEventListener?"addEventListener":"attachEvent",n=window[t],r="attachEvent"==t?"onload":"load";"complete"===document.readyState||"interactive"===document.readyState?l():n(r,function(e){l()},!1)}function l(){if(!w){w=!0;var e=/^((?!chrome|android).)*safari/i.test(navigator.userAgent);if(!e)return void console.log("Not safari, skipping link override");p(),c(b,g)}}function c(e,t){var n;try{n=new XMLHttpRequest}catch(r){return}n.open("GET",e),n.withCredentials=!0,n.onreadystatechange=function(){if(4===n.readyState&&200===n.status)try{var e=JSON.parse(n.responseText);t(e)}catch(r){console.error(r)}},n.send()}function g(e){console.log(e.uid);var t=parseInt(e.uid,10)||0;0===t&&f()}function f(){console.log("Perfoming link override.");for(var e=0;e<document.links.length;e++){var t=document.links[e];t.href=E+encodeURIComponent(t.href)}}function p(){if("true"!==document.cookie.replace(/(?:(?:^|.*;\s*)anCookiesetFooter\s*\=\s*([^;]*).*$)|^.*$/,"$1")){var e=n();document.body.appendChild(e),r(e),document.cookie="anCookiesetFooter=true; expires=Fri, 31 Dec 9999 23:59:59 GMT"}}Object.defineProperty&&function(){try{return Object.defineProperty({},"x",{}),!0}catch(e){return!1}}()||(Object.defineProperty=function(e,t,n){e[t]=n.value}),Object.defineProperty(t,"__esModule",{value:!0});var m,h='<div class="ancookie-header" id="ancookie-container">\n  <div id="ancookie-nav">\n    <div></div>\n  </div>\n  <div id="ancookie-slider">\n    <p id="ancookie-msg">Your browser blocks 3rd party cookies by default. By clicking on page you allow our partner AppNexus to place cookies to show relevant ads. Read more or opt out of these cookies <a href="https://www.appnexus.com/en/company/platform-privacy-policy#choices" target="_blank" style="color: #4f4f4f;">here</a>. This notice appears once </p>\n    <div id="ancookie-close">&times</div>\n  </div>\n</div>\n',v=".ancookie-header {\n  background: #d3d3d3;\n  text-overflow: ellipsis;\n  border-collapse: collapse;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  min-height: 38px;\n}\n\n.ancookie-header * {\n  font-size: 12px;\n  font-family: Verdana, Arial, Helvetica, sans-serif !important;\n  color: #555;\n  line-height: normal !important;\n  margin: 0;\n  padding: 0;\n}\n\n.ancookie-header p {\n  padding: 10px 10px 10px 38px;\n  text-align: left;\n}\n\n.ancookie-header a:link,\n.ancookie-header a:hover,\n.ancookie-header a:visited,\n.ancookie-header a:active {\n  color: #e6e6e6;\n  text-decoration: underline;\n  font-weight: 700;\n}\n\n.ancookie-header {\n  position: fixed;\n  opacity: 0.9;\n}\n\n.ancookie-header * {\n  font-size: 11px !important;\n}\n\n#ancookie-msg {\n  height: 34px;\n  opacity: 0;\n}\n\n@media only screen and (min-width: 1224px) {\n  .ancookie-header * {\n    font-size: 12px !important;\n  }\n\n  #ancookie-msg {\n    height: 20px;\n    opacity: 0;\n  }\n}\n\n@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) {\n  .ancookie-header {\n    position: fixed;\n  }\n}\n\n.ancookie-header {\n  z-index: 9999;\n  opacity: 1;\n}\n\n#ancookie-slider {\n  overflow: hidden;\n  padding: 10px;\n  box-sizing: border-box;\n}\n\n#ancookie-slider p {\n  position: relative;\n  margin: 0;\n  padding: 0;\n  opacity: 0;\n  -webkit-column-gap: 20px;\n  -webkit-column-rule-width: 0;\n}\n\n#ancookie-nav {\n  position: absolute;\n  right: 0;\n  left: 0;\n  top: -11px;\n  z-index: 200;\n  text-align: center;\n}\n\n#ancookie-nav div {\n  display: inline-block;\n  padding: 0 10px;\n  background-color: #d3d3d3;\n  border-radius: 10px 10px 0 0;\n}\n\n#ancookie-nav span {\n  display: inline-block;\n  width: 6px;\n  height: 6px;\n  background-color: #e6e6e6;\n  border-radius: 50%;\n  margin: 1px 2px;\n  box-sizing: border-box;\n  -webkit-transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);\n  -webkit-opacity: 0.5;\n}\n\n#ancookie-nav span.selected {\n  background-color: #555;\n  -webkit-transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);\n  -webkit-opacity: 1;\n}\n\n#ancookie-close {\n  position: absolute;\n  right: 5px;\n  bottom: 20px;\n  cursor: pointer;\n  -webkit-transform: scale(1.5);\n  transform: scale(1.5);\n}\n",y=function(){function e(e){u=e}function t(){return a||(a=u.querySelector("#ancookie-container")),a}function n(){return o||(o=u.querySelector("#ancookie-msg")),o}function r(){return d||(d=u.querySelector("#ancookie-nav div")),d}function i(){return s||(s=u.querySelector("#ancookie-slider")),s}var a,o,s,d,u;return{getContainer:t,getMessageElement:n,getSliderElement:i,getNav:r,setParentNode:e}}(),E="http://ib.adnxs.com/seg?add=1&redir=",b="//ib.adnxs.com/getuidj",w=!1;t.enable=u},function(e,t){function n(e,t,n,r){return{eventType:e,targetId:t,data:n,exception:r}}var r=t;r.createMessage=function(e,t,r,i){return new n(e,t,r,i)}},function(e,t){}]);

/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
* loglevel - https://github.com/pimterry/loglevel
*
* Copyright (c) 2013 Tim Perry
* Licensed under the MIT license.
*/
(function (root, definition) {
    "use strict";
    if (true) {
        !(__WEBPACK_AMD_DEFINE_FACTORY__ = (definition),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof module === 'object' && module.exports) {
        module.exports = definition();
    } else {
        root.log = definition();
    }
}(this, function () {
    "use strict";

    // Slightly dubious tricks to cut down minimized file size
    var noop = function() {};
    var undefinedType = "undefined";

    var logMethods = [
        "trace",
        "debug",
        "info",
        "warn",
        "error"
    ];

    // Cross-browser bind equivalent that works at least back to IE6
    function bindMethod(obj, methodName) {
        var method = obj[methodName];
        if (typeof method.bind === 'function') {
            return method.bind(obj);
        } else {
            try {
                return Function.prototype.bind.call(method, obj);
            } catch (e) {
                // Missing bind shim or IE8 + Modernizr, fallback to wrapping
                return function() {
                    return Function.prototype.apply.apply(method, [obj, arguments]);
                };
            }
        }
    }

    // Build the best logging method possible for this env
    // Wherever possible we want to bind, not wrap, to preserve stack traces
    function realMethod(methodName) {
        if (methodName === 'debug') {
            methodName = 'log';
        }

        if (typeof console === undefinedType) {
            return false; // No method possible, for now - fixed later by enableLoggingWhenConsoleArrives
        } else if (console[methodName] !== undefined) {
            return bindMethod(console, methodName);
        } else if (console.log !== undefined) {
            return bindMethod(console, 'log');
        } else {
            return noop;
        }
    }

    // These private functions always need `this` to be set properly

    function replaceLoggingMethods(level, loggerName) {
        /*jshint validthis:true */
        for (var i = 0; i < logMethods.length; i++) {
            var methodName = logMethods[i];
            this[methodName] = (i < level) ?
                noop :
                this.methodFactory(methodName, level, loggerName);
        }

        // Define log.log as an alias for log.debug
        this.log = this.debug;
    }

    // In old IE versions, the console isn't present until you first open it.
    // We build realMethod() replacements here that regenerate logging methods
    function enableLoggingWhenConsoleArrives(methodName, level, loggerName) {
        return function () {
            if (typeof console !== undefinedType) {
                replaceLoggingMethods.call(this, level, loggerName);
                this[methodName].apply(this, arguments);
            }
        };
    }

    // By default, we use closely bound real methods wherever possible, and
    // otherwise we wait for a console to appear, and then try again.
    function defaultMethodFactory(methodName, level, loggerName) {
        /*jshint validthis:true */
        return realMethod(methodName) ||
               enableLoggingWhenConsoleArrives.apply(this, arguments);
    }

    function Logger(name, defaultLevel, factory) {
      var self = this;
      var currentLevel;
      var storageKey = "loglevel";
      if (name) {
        storageKey += ":" + name;
      }

      function persistLevelIfPossible(levelNum) {
          var levelName = (logMethods[levelNum] || 'silent').toUpperCase();

          if (typeof window === undefinedType) return;

          // Use localStorage if available
          try {
              window.localStorage[storageKey] = levelName;
              return;
          } catch (ignore) {}

          // Use session cookie as fallback
          try {
              window.document.cookie =
                encodeURIComponent(storageKey) + "=" + levelName + ";";
          } catch (ignore) {}
      }

      function getPersistedLevel() {
          var storedLevel;

          if (typeof window === undefinedType) return;

          try {
              storedLevel = window.localStorage[storageKey];
          } catch (ignore) {}

          // Fallback to cookies if local storage gives us nothing
          if (typeof storedLevel === undefinedType) {
              try {
                  var cookie = window.document.cookie;
                  var location = cookie.indexOf(
                      encodeURIComponent(storageKey) + "=");
                  if (location !== -1) {
                      storedLevel = /^([^;]+)/.exec(cookie.slice(location))[1];
                  }
              } catch (ignore) {}
          }

          // If the stored level is not valid, treat it as if nothing was stored.
          if (self.levels[storedLevel] === undefined) {
              storedLevel = undefined;
          }

          return storedLevel;
      }

      /*
       *
       * Public logger API - see https://github.com/pimterry/loglevel for details
       *
       */

      self.name = name;

      self.levels = { "TRACE": 0, "DEBUG": 1, "INFO": 2, "WARN": 3,
          "ERROR": 4, "SILENT": 5};

      self.methodFactory = factory || defaultMethodFactory;

      self.getLevel = function () {
          return currentLevel;
      };

      self.setLevel = function (level, persist) {
          if (typeof level === "string" && self.levels[level.toUpperCase()] !== undefined) {
              level = self.levels[level.toUpperCase()];
          }
          if (typeof level === "number" && level >= 0 && level <= self.levels.SILENT) {
              currentLevel = level;
              if (persist !== false) {  // defaults to true
                  persistLevelIfPossible(level);
              }
              replaceLoggingMethods.call(self, level, name);
              if (typeof console === undefinedType && level < self.levels.SILENT) {
                  return "No console available for logging";
              }
          } else {
              throw "log.setLevel() called with invalid level: " + level;
          }
      };

      self.setDefaultLevel = function (level) {
          if (!getPersistedLevel()) {
              self.setLevel(level, false);
          }
      };

      self.enableAll = function(persist) {
          self.setLevel(self.levels.TRACE, persist);
      };

      self.disableAll = function(persist) {
          self.setLevel(self.levels.SILENT, persist);
      };

      // Initialize with the right level
      var initialLevel = getPersistedLevel();
      if (initialLevel == null) {
          initialLevel = defaultLevel == null ? "WARN" : defaultLevel;
      }
      self.setLevel(initialLevel, false);
    }

    /*
     *
     * Top-level API
     *
     */

    var defaultLogger = new Logger();

    var _loggersByName = {};
    defaultLogger.getLogger = function getLogger(name) {
        if (typeof name !== "string" || name === "") {
          throw new TypeError("You must supply a name when creating a logger.");
        }

        var logger = _loggersByName[name];
        if (!logger) {
          logger = _loggersByName[name] = new Logger(
            name, defaultLogger.getLevel(), defaultLogger.methodFactory);
        }
        return logger;
    };

    // Grab the current global log variable in case of overwrite
    var _log = (typeof window !== undefinedType) ? window.log : undefined;
    defaultLogger.noConflict = function() {
        if (typeof window !== undefinedType &&
               window.log === defaultLogger) {
            window.log = _log;
        }

        return defaultLogger;
    };

    defaultLogger.getLoggers = function getLoggers() {
        return _loggersByName;
    };

    return defaultLogger;
}));


/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (root, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.prefix = factory(root);
  }
}(this, function (root) {
  'use strict';

  var merge = function (target) {
    var i = 1;
    var length = arguments.length;
    var key;
    for (; i < length; i++) {
      for (key in arguments[i]) {
        if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
          target[key] = arguments[i][key];
        }
      }
    }
    return target;
  };

  var defaults = {
    template: '[%t] %l:',
    timestampFormatter: function (date) {
      return date.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
    },
    levelFormatter: function (level) {
      return level.toUpperCase();
    },
    nameFormatter: function (name) {
      return name || 'root';
    }
  };

  var configs = {};

  var apply = function (logger, config) {
    if (!logger || !logger.setLevel) {
      throw new TypeError('Argument is not a logger');
    }

    /* eslint-disable vars-on-top */
    var originalFactory = logger.methodFactory;
    var name = logger.name || '';
    var parent = configs[name] || configs[''] || defaults;
    /* eslint-enable vars-on-top */

    function methodFactory(methodName, logLevel, loggerName) {
      var originalMethod = originalFactory(methodName, logLevel, loggerName);
      var options = configs[loggerName] || configs[''];

      var hasTimestamp = options.template.indexOf('%t') !== -1;
      var hasLevel = options.template.indexOf('%l') !== -1;
      var hasName = options.template.indexOf('%n') !== -1;

      return function () {
        var content = '';

        var length = arguments.length;
        var args = Array(length);
        var key = 0;
        for (; key < length; key++) {
          args[key] = arguments[key];
        }

        // skip the root method for child loggers to prevent duplicate logic
        if (name || !configs[loggerName]) {
          if (options.format) {
            content += options.format(methodName, loggerName);
          } else {
            content += options.template;
            if (hasTimestamp) {
              content = content.replace(/%t/, options.timestampFormatter(new Date()));
            }
            if (hasLevel) content = content.replace(/%l/, options.levelFormatter(methodName));
            if (hasName) content = content.replace(/%n/, options.nameFormatter(loggerName));
          }

          if (args.length && typeof args[0] === 'string') {
            // concat prefix with first argument to support string substitutions
            args[0] = content + ' ' + args[0];
          } else {
            args.unshift(content);
          }
        }

        originalMethod.apply(undefined, args);
      };
    }

    if (!configs[name]) {
      logger.methodFactory = methodFactory;
    }

    // for remove inherited format option if own format option not preset
    config = config || {};
    config.format = config.format;

    configs[name] = merge({}, parent, config);

    logger.setLevel(logger.getLevel());
    return logger;
  };

  var api = {
    apply: apply
  };

  var save;

  if (root) {
    save = root.prefix;
    api.noConflict = function () {
      if (root.prefix === api) {
        root.prefix = save;
      }
      return api;
    };
  }

  return api;
}));


/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LogLevelLoggerInitializer = function () {
  /**
   *
   * @param {PrefixConfigurator} prefixConfigurator
   * @param {LoggerLevelConfigurator} loggerLevelConfigurator
   */
  function LogLevelLoggerInitializer(_ref) {
    var loggerPrefixConfigurator = _ref.loggerPrefixConfigurator,
        loggerLevelConfigurator = _ref.loggerLevelConfigurator;
    (0, _classCallCheck3.default)(this, LogLevelLoggerInitializer);

    this._loggerPrefixConfigurator = loggerPrefixConfigurator;
    this._loggerLevelConfigurator = loggerLevelConfigurator;
  }

  (0, _createClass3.default)(LogLevelLoggerInitializer, [{
    key: "logger",
    value: function logger(_ref2) {
      var loggerName = _ref2.loggerName;

      var loggerInstance = this._loggerLevelConfigurator.init({ loggerName: loggerName });
      this._loggerPrefixConfigurator.applyPrefix({ logger: loggerInstance });
      return loggerInstance;
    }
  }]);
  return LogLevelLoggerInitializer;
}();

exports.default = LogLevelLoggerInitializer;

/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LogLevelPrefixConfigurator = function () {
  function LogLevelPrefixConfigurator() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        logLevelPrefix = _ref.logLevelPrefix,
        _ref$options = _ref.options,
        options = _ref$options === undefined ? {} : _ref$options;

    (0, _classCallCheck3.default)(this, LogLevelPrefixConfigurator);

    this._logLevelPrefix = logLevelPrefix;
    this._options = options;
  }

  (0, _createClass3.default)(LogLevelPrefixConfigurator, [{
    key: 'applyPrefix',
    value: function applyPrefix() {
      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          logger = _ref2.logger;

      if (logger) {
        if (!this._options.template) {
          this._options.template = this._defaultTemplate();
        }
        if (!this._options.timestampFormatter) {
          this._options.timestampFormatter = this._defaultTimestampFormatter();
        }
        this._logLevelPrefix.apply(logger, this._options);
      }
    }
  }, {
    key: '_defaultTemplate',
    value: function _defaultTemplate() {
      return '[%t] %l | %n:';
    }
  }, {
    key: '_defaultTimestampFormatter',
    value: function _defaultTimestampFormatter() {
      return function (date) {
        var pad = function pad(number, format) {
          var temp = format + number;
          return temp.substr(temp.length - format.length);
        };
        return date.getFullYear() + '-' + pad(date.getMonth(), '00') + '-' + pad(date.getDay(), '00') + ' ' + pad(date.getHours(), '00') + ':' + pad(date.getMinutes(), '00') + ':' + pad(date.getSeconds(), '00') + '.' + pad(date.getMilliseconds(), '000');
      };
    }
  }]);
  return LogLevelPrefixConfigurator;
}();

exports.default = LogLevelPrefixConfigurator;

/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _querystring = __webpack_require__(140);

var _querystring2 = _interopRequireDefault(_querystring);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LogLevelConfigurator = function () {
  function LogLevelConfigurator(_ref) {
    var domDriver = _ref.domDriver,
        logLevel = _ref.logLevel,
        _ref$options = _ref.options,
        options = _ref$options === undefined ? {} : _ref$options;
    (0, _classCallCheck3.default)(this, LogLevelConfigurator);

    this._domDriver = domDriver;
    this._logLevel = logLevel;
    this._options = options;
  }

  (0, _createClass3.default)(LogLevelConfigurator, [{
    key: 'init',
    value: function init() {
      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          loggerName = _ref2.loggerName;

      var logger = this._logLevel.getLogger(loggerName);
      if (this._enableDebug({ loggerName: loggerName })) {
        logger.setLevel('debug');
      } else {
        var level = this._options.Level || 'error';
        logger.setLevel(level);
      }
      return logger;
    }
  }, {
    key: '_enableDebug',
    value: function _enableDebug(_ref3) {
      var loggerName = _ref3.loggerName;

      var queryString = this._domDriver.getQueryString();
      var parameters = _querystring2.default.parse(queryString);
      return parameters[loggerName.toLowerCase() + '_debug'] !== undefined;
    }
  }]);
  return LogLevelConfigurator;
}();

exports.default = LogLevelConfigurator;

/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.decode = exports.parse = __webpack_require__(141);
exports.encode = exports.stringify = __webpack_require__(142);


/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};


/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};


/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _PositionAlreadyExists = __webpack_require__(144);

var _PositionAlreadyExists2 = _interopRequireDefault(_PositionAlreadyExists);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AddPositionUseCase = function () {
  /**
   * @constructor
   * @param {PositionRepository} positionRepository
   * @param {PositionFactory} positionFactory
   */
  function AddPositionUseCase(_ref) {
    var positionRepository = _ref.positionRepository,
        positionFactory = _ref.positionFactory;
    (0, _classCallCheck3.default)(this, AddPositionUseCase);

    this._positionRepository = positionRepository;
    this._positionFactory = positionFactory;
  }
  /**
   * Create a new Position on the page
   * @param {string} id
   * @param {string} name
   * @param {string} source
   * @param {string} placement
   * @param {string} segmentation
   * @param {Array<Array<>>}sizes
   * @param {Object} native
   * @param {Function} native.renderer - The function to be used when display use case is used in this position and the Ad is Native type
   * @param {Object} native.fields - Fields requested to the ad server
   * @param {string} native.domClickableId - DOM id where will be included the clickable action from native
   * @returns {Promise<Position>}
   */


  (0, _createClass3.default)(AddPositionUseCase, [{
    key: 'addPosition',
    value: function addPosition(_ref2) {
      var _this = this;

      var id = _ref2.id,
          name = _ref2.name,
          source = _ref2.source,
          placement = _ref2.placement,
          segmentation = _ref2.segmentation,
          sizes = _ref2.sizes,
          native = _ref2.native;

      return this._positionRepository.find({ id: id }).then(this._filterPositionAlreadyExists).then(function () {
        return _this._positionFactory.create({ id: id, name: name, source: source, placement: placement, segmentation: segmentation, sizes: sizes, native: native });
      }).then(function (position) {
        return _this._positionRepository.saveOrUpdate({ position: position });
      });
    }
  }, {
    key: '_filterPositionAlreadyExists',
    value: function _filterPositionAlreadyExists(optionalPosition) {
      if (optionalPosition) {
        throw new _PositionAlreadyExists2.default({ id: optionalPosition.id });
      }
      return optionalPosition;
    }
  }]);
  return AddPositionUseCase;
}();

exports.default = AddPositionUseCase;

/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getPrototypeOf = __webpack_require__(6);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(8);

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PositionAlreadyExists = function (_Error) {
  (0, _inherits3.default)(PositionAlreadyExists, _Error);

  function PositionAlreadyExists(_ref) {
    var id = _ref.id;
    (0, _classCallCheck3.default)(this, PositionAlreadyExists);

    var _this = (0, _possibleConstructorReturn3.default)(this, (PositionAlreadyExists.__proto__ || (0, _getPrototypeOf2.default)(PositionAlreadyExists)).call(this));

    _this.message = 'Position ' + id + ' already exists';
    _this.name = 'PositionAlreadyExists';
    _this.stack = new Error().stack;
    return _this;
  }

  return PositionAlreadyExists;
}(Error);

exports.default = PositionAlreadyExists;

/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _promise = __webpack_require__(51);

var _promise2 = _interopRequireDefault(_promise);

var _map = __webpack_require__(19);

var _map2 = _interopRequireDefault(_map);

var _getPrototypeOf = __webpack_require__(6);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(8);

var _inherits3 = _interopRequireDefault(_inherits2);

var _PositionRepository2 = __webpack_require__(153);

var _PositionRepository3 = _interopRequireDefault(_PositionRepository2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InMemoryPositionRepository = function (_PositionRepository) {
  (0, _inherits3.default)(InMemoryPositionRepository, _PositionRepository);

  function InMemoryPositionRepository() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$positions = _ref.positions,
        positions = _ref$positions === undefined ? [[]] : _ref$positions;

    (0, _classCallCheck3.default)(this, InMemoryPositionRepository);

    var _this = (0, _possibleConstructorReturn3.default)(this, (InMemoryPositionRepository.__proto__ || (0, _getPrototypeOf2.default)(InMemoryPositionRepository)).call(this));

    _this._positions = new _map2.default(positions);
    return _this;
  }

  /**
   * Store the position in memory
   * @param {Position} position
   * @returns {Promise<Position>}
   */


  (0, _createClass3.default)(InMemoryPositionRepository, [{
    key: 'saveOrUpdate',
    value: function saveOrUpdate(_ref2) {
      var _this2 = this;

      var position = _ref2.position;

      return _promise2.default.resolve().then(function () {
        return _this2._positions.set(position.id, position);
      }).then(function () {
        return position;
      });
    }
    /**
     * Find a Position by id
     * @param {string} id
     * @returns {Promise<Position>}
     */

  }, {
    key: 'find',
    value: function find(_ref3) {
      var _this3 = this;

      var id = _ref3.id;

      return _promise2.default.resolve().then(function () {
        return _this3._positions.has(id) && _this3._positions.get(id);
      });
    }
  }]);
  return InMemoryPositionRepository;
}(_PositionRepository3.default);

exports.default = InMemoryPositionRepository;

/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(33);
__webpack_require__(34);
__webpack_require__(43);
__webpack_require__(147);
__webpack_require__(151);
__webpack_require__(152);
module.exports = __webpack_require__(2).Promise;


/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(25);
var global = __webpack_require__(4);
var ctx = __webpack_require__(13);
var classof = __webpack_require__(46);
var $export = __webpack_require__(3);
var isObject = __webpack_require__(9);
var aFunction = __webpack_require__(18);
var anInstance = __webpack_require__(45);
var forOf = __webpack_require__(23);
var speciesConstructor = __webpack_require__(69);
var task = __webpack_require__(70).set;
var microtask = __webpack_require__(149)();
var newPromiseCapabilityModule = __webpack_require__(52);
var perform = __webpack_require__(71);
var promiseResolve = __webpack_require__(72);
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__(5)('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value);
            if (domain) domain.exit();
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(44)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__(22)($Promise, PROMISE);
__webpack_require__(61)(PROMISE);
Wrapper = __webpack_require__(2)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(150)(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),
/* 148 */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(4);
var macrotask = __webpack_require__(70).set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(21)(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    var promise = Promise.resolve();
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(5)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__(3);
var core = __webpack_require__(2);
var global = __webpack_require__(4);
var speciesConstructor = __webpack_require__(69);
var promiseResolve = __webpack_require__(72);

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });


/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__(3);
var newPromiseCapability = __webpack_require__(52);
var perform = __webpack_require__(71);

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });


/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @interface
 */
var PositionRepository = function () {
  function PositionRepository() {
    (0, _classCallCheck3.default)(this, PositionRepository);
  }

  (0, _createClass3.default)(PositionRepository, [{
    key: 'saveOrUpdate',

    /**
     * Given a domain position will store it or update it in persistence layer
     * @param {Position} page
     * @returns {Promise<Position>}
     */
    value: function saveOrUpdate(_ref) {
      var position = _ref.position;

      throw new Error('PositionRepository#save must be implemented');
    }
    /**
     * Given a position id will search it on persistence layer
     * @param {string} id
     */

  }, {
    key: 'find',
    value: function find(_ref2) {
      var id = _ref2.id;

      throw new Error('PositionRepository#find must be implemented');
    }
  }]);
  return PositionRepository;
}();

exports.default = PositionRepository;

/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getPrototypeOf = __webpack_require__(6);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(8);

var _inherits3 = _interopRequireDefault(_inherits2);

var _PositionFactory2 = __webpack_require__(155);

var _PositionFactory3 = _interopRequireDefault(_PositionFactory2);

var _Position = __webpack_require__(156);

var _Position2 = _interopRequireDefault(_Position);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ProxyPositionFactory = function (_PositionFactory) {
  (0, _inherits3.default)(ProxyPositionFactory, _PositionFactory);

  function ProxyPositionFactory(_ref) {
    var proxyHandler = _ref.proxyHandler;
    (0, _classCallCheck3.default)(this, ProxyPositionFactory);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ProxyPositionFactory.__proto__ || (0, _getPrototypeOf2.default)(ProxyPositionFactory)).call(this));

    _this._proxyHandler = proxyHandler;
    return _this;
  }

  (0, _createClass3.default)(ProxyPositionFactory, [{
    key: 'create',
    value: function create(_ref2) {
      var id = _ref2.id,
          name = _ref2.name,
          source = _ref2.source,
          placement = _ref2.placement,
          segmentation = _ref2.segmentation,
          sizes = _ref2.sizes,
          native = _ref2.native,
          ad = _ref2.ad,
          status = _ref2.status;

      return new Proxy(new _Position2.default({
        id: id,
        name: name,
        source: source,
        placement: placement,
        segmentation: segmentation,
        sizes: sizes,
        native: native,
        ad: ad,
        status: status
      }), this._proxyHandler);
    }
  }]);
  return ProxyPositionFactory;
}(_PositionFactory3.default);

exports.default = ProxyPositionFactory;

/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @Interface
 */
var PositionFactory = function () {
  function PositionFactory() {
    (0, _classCallCheck3.default)(this, PositionFactory);
  }

  (0, _createClass3.default)(PositionFactory, [{
    key: 'create',
    value: function create(_ref) {
      var id = _ref.id,
          name = _ref.name,
          source = _ref.source,
          placement = _ref.placement,
          segmentation = _ref.segmentation,
          sizes = _ref.sizes,
          native = _ref.native,
          ad = _ref.ad,
          status = _ref.status;

      throw new Error('PositionFactory#create must be implemented');
    }
  }]);
  return PositionFactory;
}();

exports.default = PositionFactory;

/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _positionStatus = __webpack_require__(53);

var _positionCreated = __webpack_require__(73);

var _positionAlreadyDisplayed = __webpack_require__(74);

var _positionDisplayed = __webpack_require__(75);

var _DomainEventBus = __webpack_require__(67);

var _DomainEventBus2 = _interopRequireDefault(_DomainEventBus);

var _positionSegmentationChanged = __webpack_require__(76);

var _InvalidPositionStatusException = __webpack_require__(157);

var _InvalidPositionStatusException2 = _interopRequireDefault(_InvalidPositionStatusException);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Position = function () {
  /**
   * Create a new Position
   * @param {string} id
   * @param {string} name
   * @param {string} source
   * @param {string} placement
   * @param {string} segmentation
   * @param {Array<Array<>>}sizes
   * @param {Object} native
   * @param {Function} native.renderer - The function to be used when display use case is used in this position and the Ad is Native type
   * @param {Object} native.fields - Fields requested to the ad server
   * @param {string} native.domClickableId - DOM id where will be included the clickable action from native
   * @param {Ad} ad - ValueObject width data from the ad loaded in this position
   * @param {string} status - Status of the position
   * @returns {Position}
   */
  function Position() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        id = _ref.id,
        name = _ref.name,
        source = _ref.source,
        placement = _ref.placement,
        segmentation = _ref.segmentation,
        sizes = _ref.sizes,
        native = _ref.native,
        ad = _ref.ad,
        _ref$status = _ref.status,
        status = _ref$status === undefined ? _positionStatus.POSITION_NOT_VISIBLE : _ref$status;

    (0, _classCallCheck3.default)(this, Position);

    this._id = id;
    this._name = name;
    this._source = source;
    this._placement = placement;
    this._segmentation = segmentation;
    this._sizes = sizes;
    this._native = native;
    this._status = status;
    this._ad = ad;

    _DomainEventBus2.default.raise({
      domainEvent: (0, _positionCreated.positionCreated)({
        id: this._id,
        name: this._name,
        source: this._source,
        placement: this._placement,
        segmentation: this._segmentation,
        sizes: this._sizes,
        native: this._native,
        status: this._status
      })
    });
  }

  (0, _createClass3.default)(Position, [{
    key: 'changeStatus',


    /**
     * Changes the position status
     * @param {PositionStatus} newStatus
     * @return {Position}
     */
    value: function changeStatus(_ref2) {
      var newStatus = _ref2.newStatus;

      if (_positionStatus.POSITION_VISIBLE === newStatus && _positionStatus.POSITION_NOT_VISIBLE === this._status) {
        this._status = _positionStatus.POSITION_VISIBLE;
        _DomainEventBus2.default.raise({ domainEvent: (0, _positionDisplayed.positionDisplayed)({
            id: this._id,
            name: this._name,
            source: this._source,
            placement: this._placement,
            segmentation: this._segmentation,
            sizes: this._sizes,
            native: this._native,
            status: this._status
          }) });
      } else if (_positionStatus.POSITION_VISIBLE === newStatus && _positionStatus.POSITION_VISIBLE === this._status) {
        this._status = _positionStatus.POSITION_VISIBLE;
        _DomainEventBus2.default.raise({ domainEvent: (0, _positionAlreadyDisplayed.positionAlreadyDisplayed)({
            id: this._id,
            name: this._name,
            source: this._source,
            placement: this._placement,
            segmentation: this._segmentation,
            sizes: this._sizes,
            native: this._native,
            status: this._status
          }) });
      } else {
        throw new _InvalidPositionStatusException2.default({ status: newStatus });
      }
      return this;
    }

    /**
     * Update Position with given changes
     * @param {{name: *, placement: *}} position
     * @param {string} position.name
     * @param {string} position.placement
     * @param {string} position.segmentation
     * @param {Array} position.sizes
     * @returns {Position}
     */

  }, {
    key: 'changeSegmentation',
    value: function changeSegmentation() {
      var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref3$name = _ref3.name,
          name = _ref3$name === undefined ? this._name : _ref3$name,
          _ref3$placement = _ref3.placement,
          placement = _ref3$placement === undefined ? this._placement : _ref3$placement,
          _ref3$segmentation = _ref3.segmentation,
          segmentation = _ref3$segmentation === undefined ? this._segmentation : _ref3$segmentation,
          _ref3$sizes = _ref3.sizes,
          sizes = _ref3$sizes === undefined ? this._sizes : _ref3$sizes;

      this._ad = undefined;
      this._name = name;
      this._placement = placement;
      this._segmentation = segmentation;
      this._sizes = sizes;

      _DomainEventBus2.default.raise({
        domainEvent: (0, _positionSegmentationChanged.positionSegmentationChanged)({
          id: this._id,
          name: this._name,
          source: this._source,
          placement: this._placement,
          segmentation: this._segmentation,
          sizes: this._sizes,
          native: this._native,
          status: this._status
        })
      });
      return this;
    }
  }, {
    key: 'id',
    get: function get() {
      return this._id;
    }
  }, {
    key: 'name',
    get: function get() {
      return this._name;
    }
  }, {
    key: 'source',
    get: function get() {
      return this._source;
    }
  }, {
    key: 'placement',
    get: function get() {
      return this._placement;
    }
  }, {
    key: 'segmentation',
    get: function get() {
      return this._segmentation;
    }
  }, {
    key: 'sizes',
    get: function get() {
      return this._sizes;
    }
  }, {
    key: 'native',
    get: function get() {
      return this._native;
    }
  }, {
    key: 'status',
    get: function get() {
      return this._status;
    }
  }, {
    key: 'ad',
    get: function get() {
      return this._ad;
    },
    set: function set(value) {
      this._ad = value;
    }
  }]);
  return Position;
}();

exports.default = Position;

/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getPrototypeOf = __webpack_require__(6);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(8);

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InvalidPositionStatusException = function (_Error) {
  (0, _inherits3.default)(InvalidPositionStatusException, _Error);

  function InvalidPositionStatusException(_ref) {
    var status = _ref.status;
    (0, _classCallCheck3.default)(this, InvalidPositionStatusException);

    var _this = (0, _possibleConstructorReturn3.default)(this, (InvalidPositionStatusException.__proto__ || (0, _getPrototypeOf2.default)(InvalidPositionStatusException)).call(this));

    _this.name = 'InvalidPositionStatusException';
    _this.message = 'Invalid Position Status: ' + status;
    _this.stack = new Error().stack;
    return _this;
  }

  return InvalidPositionStatusException;
}(Error);

exports.default = InvalidPositionStatusException;

/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var errorObserverFactory = exports.errorObserverFactory = function errorObserverFactory(logger) {
  return function (_ref) {
    var payload = _ref.payload,
        dispatcher = _ref.dispatcher;
    return logger.error('ERROR_EVENT', payload);
  };
};

/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = __webpack_require__(51);

var _promise2 = _interopRequireDefault(_promise);

var _events = __webpack_require__(54);

var _AppNexusErrorException = __webpack_require__(160);

var _AppNexusErrorException2 = _interopRequireDefault(_AppNexusErrorException);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PROXY_PROPERTY = 'ad';
var TIMEOUT_EXCEPTION = 'Something in appnexus consumer failed to set adResponse data';
var DEFAULT_TIMEOUT = 20000;
var DEFAULT_WAIT = 50;

var proxyHandlerFactory = function proxyHandlerFactory(repository) {
  return function () {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$wait = _ref.wait,
        wait = _ref$wait === undefined ? DEFAULT_WAIT : _ref$wait,
        _ref$timeout = _ref.timeout,
        timeout = _ref$timeout === undefined ? DEFAULT_TIMEOUT : _ref$timeout;

    return {
      get: function get(target, name) {
        if (name !== PROXY_PROPERTY) {
          return target[name];
        } else {
          return _promise2.default.race([resolveAdData(repository)(target)(name)(wait), timeoutPromise(timeout)]);
        }
      }
    };
  };
};
var resolveAdData = function resolveAdData(repository) {
  return function (target) {
    return function (name) {
      return function (wait) {
        return new _promise2.default(function (resolve, reject) {
          if (target[name] !== undefined) {
            resolve(target[name]);
          } else {
            target[name] = repository.find({ id: target['id'] });
            if (target[name] === undefined) {
              var stopper = setInterval(function () {
                target[name] = repository.find({ id: target['id'] });
                if (target[name] !== undefined) {
                  clearInterval(stopper);
                  resolveOrRejectByStatus(target)(name)(resolve)(reject);
                }
              }, wait);
            } else {
              resolveOrRejectByStatus(target)(name)(resolve)(reject);
            }
          }
        });
      };
    };
  };
};
var resolveOrRejectByStatus = function resolveOrRejectByStatus(target) {
  return function (name) {
    return function (resolve) {
      return function (reject) {
        switch (target[name].status) {
          case _events.AD_AVAILABLE:
            resolve(target[name]);
            break;
          default:
            reject(new _AppNexusErrorException2.default({
              position: target['id'],
              cause: target[name],
              status: target[name].status
            }));
            break;
        }
      };
    };
  };
};
var timeoutPromise = function timeoutPromise(timeout) {
  return new _promise2.default(function (resolve, reject) {
    var wait = setTimeout(function () {
      clearTimeout(wait);
      reject(new Error(TIMEOUT_EXCEPTION));
    }, timeout);
  });
};

exports.default = proxyHandlerFactory;

/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getPrototypeOf = __webpack_require__(6);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(8);

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AppNexusErrorException = function (_Error) {
  (0, _inherits3.default)(AppNexusErrorException, _Error);

  function AppNexusErrorException(_ref) {
    var cause = _ref.cause,
        status = _ref.status,
        position = _ref.position;
    (0, _classCallCheck3.default)(this, AppNexusErrorException);

    var _this = (0, _possibleConstructorReturn3.default)(this, (AppNexusErrorException.__proto__ || (0, _getPrototypeOf2.default)(AppNexusErrorException)).call(this));

    _this.message = 'Some error ocurred in appnexus with position id: ' + position + ' ';
    _this.name = 'AppNexusErrorException';
    _this.status = status;
    _this.cause = cause;
    _this.stack = new Error().stack;
    return _this;
  }

  return AppNexusErrorException;
}(Error);

exports.default = AppNexusErrorException;

/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _map = __webpack_require__(19);

var _map2 = _interopRequireDefault(_map);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AppNexusConsumersRepository = function () {
  function AppNexusConsumersRepository() {
    (0, _classCallCheck3.default)(this, AppNexusConsumersRepository);

    this._positions = new _map2.default();
  }

  /**
   * Returns value stored from appnexus consumer by position id
   * @param {string} id
   * @returns {V | undefined}
   */


  (0, _createClass3.default)(AppNexusConsumersRepository, [{
    key: "find",
    value: function find(_ref) {
      var id = _ref.id;

      return this._positions.get(id);
    }

    /**
     * Save appnexus response from event
     * @param {string} id
     * @param {object} adResponse
     * @param {object} adResponse.data
     * @param {string} adResponse.status
     */

  }, {
    key: "save",
    value: function save(_ref2) {
      var id = _ref2.id,
          adResponse = _ref2.adResponse;

      this._positions.set(id, adResponse);
    }
  }]);
  return AppNexusConsumersRepository;
}();

exports.default = AppNexusConsumersRepository;

/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = __webpack_require__(54);

var positionCreatedObserverFactory = function positionCreatedObserverFactory(appnexusConnector) {
  return function (appNexusConsumersRepository) {
    return function (_ref) {
      var payload = _ref.payload,
          dispatcher = _ref.dispatcher;
      return appnexusConnector.defineTag({
        member: appnexusConnector.member,
        targetId: payload.id,
        invCode: payload.placement,
        sizes: payload.sizes,
        keywords: payload.segmentation,
        native: payload.native && payload.native.fields
      }).onEvent({
        event: _events.AD_AVAILABLE,
        targetId: payload.id,
        callback: consumer(appNexusConsumersRepository)(payload.id)(_events.AD_AVAILABLE)
      }).onEvent({
        event: _events.AD_BAD_REQUEST,
        targetId: payload.id,
        callback: consumer(appNexusConsumersRepository)(payload.id)(_events.AD_BAD_REQUEST)
      }).onEvent({
        event: _events.AD_ERROR,
        targetId: payload.id,
        callback: consumer(appNexusConsumersRepository)(payload.id)(_events.AD_ERROR)
      }).onEvent({
        event: _events.AD_NO_BID,
        targetId: payload.id,
        callback: consumer(appNexusConsumersRepository)(payload.id)(_events.AD_NO_BID)
      }).onEvent({
        event: _events.AD_REQUEST_FAILURE,
        targetId: payload.id,
        callback: consumer(appNexusConsumersRepository)(payload.id)(_events.AD_REQUEST_FAILURE)
      }).loadTags();
    };
  };
};

var consumer = function consumer(appnexusConsumersRepository) {
  return function (id) {
    return function (status) {
      return function (data) {
        return appnexusConsumersRepository.save({ id: id, adResponse: { data: data, status: status } });
      };
    };
  };
};

exports.default = positionCreatedObserverFactory;

/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends2 = __webpack_require__(164);

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _PositionNotFoundException = __webpack_require__(77);

var _PositionNotFoundException2 = _interopRequireDefault(_PositionNotFoundException);

var _positionStatus = __webpack_require__(53);

var _PositionNotVisibleException = __webpack_require__(169);

var _PositionNotVisibleException2 = _interopRequireDefault(_PositionNotVisibleException);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RefreshPositionUseCase = function () {
  /**
   * Update a Position with given changes and refresh his Ad
   * @param {PositionRepository} positionRepository
   */
  function RefreshPositionUseCase(_ref) {
    var positionRepository = _ref.positionRepository;
    (0, _classCallCheck3.default)(this, RefreshPositionUseCase);

    this._positionRepository = positionRepository;
  }
  /**
   * Update a Position with given changes and refresh his Ad
   * @param {string} id
   * @param {object} position
   * @param {string} position.name
   * @param {string} position.placement
   * @param {string} position.segmentation
   * @param {Array} position.sizes
   * @returns {Promise<Position>}
   */


  (0, _createClass3.default)(RefreshPositionUseCase, [{
    key: 'refreshPosition',
    value: function refreshPosition(_ref2) {
      var _this = this;

      var id = _ref2.id,
          position = _ref2.position;

      return this._positionRepository.find({ id: id }).then(function (optionalPosition) {
        return { id: id, position: optionalPosition };
      }).then(this._filterPositionExists).then(this._filterPositionVisible).then(function (positionToBeUpdated) {
        return positionToBeUpdated.changeSegmentation((0, _extends3.default)({}, position));
      }).then(function (positionUpdated) {
        return _this._positionRepository.saveOrUpdate({ position: positionUpdated });
      });
    }
  }, {
    key: '_filterPositionExists',
    value: function _filterPositionExists(optionalPositionWithId) {
      if (!optionalPositionWithId.position) {
        throw new _PositionNotFoundException2.default({ id: optionalPositionWithId.id });
      }
      return optionalPositionWithId.position;
    }
  }, {
    key: '_filterPositionVisible',
    value: function _filterPositionVisible(position) {
      if (_positionStatus.POSITION_NOT_VISIBLE === position.status) {
        throw new _PositionNotVisibleException2.default({ id: position.id });
      }
      return position;
    }
  }]);
  return RefreshPositionUseCase;
}();

exports.default = RefreshPositionUseCase;

/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _assign = __webpack_require__(165);

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _assign2.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(166), __esModule: true };

/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(167);
module.exports = __webpack_require__(2).Object.assign;


/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(3);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(168) });


/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(27);
var gOPS = __webpack_require__(50);
var pIE = __webpack_require__(30);
var toObject = __webpack_require__(29);
var IObject = __webpack_require__(38);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(15)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getPrototypeOf = __webpack_require__(6);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(8);

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PositionNotVisibleException = function (_Error) {
  (0, _inherits3.default)(PositionNotVisibleException, _Error);

  function PositionNotVisibleException(_ref) {
    var id = _ref.id;
    (0, _classCallCheck3.default)(this, PositionNotVisibleException);

    var _this = (0, _possibleConstructorReturn3.default)(this, (PositionNotVisibleException.__proto__ || (0, _getPrototypeOf2.default)(PositionNotVisibleException)).call(this));

    _this.name = 'PositionNotVisibleException';
    _this.message = 'Position ' + id + ' not visible.';
    _this.stack = new Error().stack;
    return _this;
  }

  return PositionNotVisibleException;
}(Error);

exports.default = PositionNotVisibleException;

/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _promise = __webpack_require__(51);

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _positionStatus = __webpack_require__(53);

var _PositionNotFoundException = __webpack_require__(77);

var _PositionNotFoundException2 = _interopRequireDefault(_PositionNotFoundException);

var _events = __webpack_require__(54);

var _PositionAdNotAvailableError = __webpack_require__(171);

var _PositionAdNotAvailableError2 = _interopRequireDefault(_PositionAdNotAvailableError);

var _PositionAdIsNativeError = __webpack_require__(172);

var _PositionAdIsNativeError2 = _interopRequireDefault(_PositionAdIsNativeError);

var _AdTypes = __webpack_require__(173);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DisplayPositionUseCase = function () {
  /**
   * @constructor
   * @param {PositionRepository} positionRepository
   */
  function DisplayPositionUseCase(_ref) {
    var positionRepository = _ref.positionRepository;
    (0, _classCallCheck3.default)(this, DisplayPositionUseCase);

    this._positionRepository = positionRepository;
  }

  /**
   * Displays a position in the page
   * @param {string} position id
   * @return {Promise<Position>}
   */


  (0, _createClass3.default)(DisplayPositionUseCase, [{
    key: 'displayPosition',
    value: function displayPosition(_ref2) {
      var _this = this;

      var id = _ref2.id;

      return this._positionRepository.find({ id: id }).then(function (optionalPosition) {
        return { id: id, position: optionalPosition };
      }).then(this._filterPositionExists).then(this._filterPositionAdAvailable).then(this._filterPositionAdNoNative).then(function (foundPosition) {
        return foundPosition.changeStatus({ newStatus: _positionStatus.POSITION_VISIBLE });
      }).then(function (modifiedPosition) {
        return _this._positionRepository.saveOrUpdate({ position: modifiedPosition });
      });
    }
  }, {
    key: '_filterPositionExists',
    value: function _filterPositionExists(optionalPositionWithId) {
      if (!optionalPositionWithId.position) {
        throw new _PositionNotFoundException2.default({ id: optionalPositionWithId.id });
      }
      return optionalPositionWithId.position;
    }
  }, {
    key: '_filterPositionAdAvailable',
    value: function _filterPositionAdAvailable(position) {
      return position.ad.then(function (adResponse) {
        return adResponse.status;
      }).then(function (status) {
        return _events.AD_AVAILABLE === status;
      }).then(function (available) {
        return available ? position : _promise2.default.reject(new _PositionAdNotAvailableError2.default({ id: position.id }));
      });
    }
  }, {
    key: '_filterPositionAdNoNative',
    value: function _filterPositionAdNoNative(position) {
      return position.ad.then(function (adResponse) {
        return adResponse.data.adType;
      }).then(function (adType) {
        return adType === _AdTypes.NATIVE;
      }).then(function (isNative) {
        return isNative ? _promise2.default.reject(new _PositionAdIsNativeError2.default({ id: position.id })) : position;
      });
    }
  }]);
  return DisplayPositionUseCase;
}();

exports.default = DisplayPositionUseCase;

/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getPrototypeOf = __webpack_require__(6);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(8);

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PositionAdNotAvailableError = function (_Error) {
  (0, _inherits3.default)(PositionAdNotAvailableError, _Error);

  function PositionAdNotAvailableError(_ref) {
    var id = _ref.id;
    (0, _classCallCheck3.default)(this, PositionAdNotAvailableError);

    var _this = (0, _possibleConstructorReturn3.default)(this, (PositionAdNotAvailableError.__proto__ || (0, _getPrototypeOf2.default)(PositionAdNotAvailableError)).call(this));

    _this.name = 'PositionAdNotAvailableError';
    _this.message = 'Position ' + id + ' AD not available.';
    _this.stack = new Error().stack;
    return _this;
  }

  return PositionAdNotAvailableError;
}(Error);

exports.default = PositionAdNotAvailableError;

/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getPrototypeOf = __webpack_require__(6);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(8);

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PositionAdIsNativeError = function (_Error) {
  (0, _inherits3.default)(PositionAdIsNativeError, _Error);

  function PositionAdIsNativeError(_ref) {
    var id = _ref.id;
    (0, _classCallCheck3.default)(this, PositionAdIsNativeError);

    var _this = (0, _possibleConstructorReturn3.default)(this, (PositionAdIsNativeError.__proto__ || (0, _getPrototypeOf2.default)(PositionAdIsNativeError)).call(this));

    _this.name = 'PositionAdIsNativeError';
    _this.message = 'Position ' + id + ' AD is Native.';
    _this.stack = new Error().stack;
    return _this;
  }

  return PositionAdIsNativeError;
}(Error);

exports.default = PositionAdIsNativeError;

/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var NATIVE = exports.NATIVE = 'native';
var BANNER = exports.BANNER = 'banner';
var VIDEO = exports.VIDEO = 'video';

/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var positionDisplayedObserver = function positionDisplayedObserver(appNexusConnector) {
  return function (_ref) {
    var payload = _ref.payload,
        dispatcher = _ref.dispatcher;
    return appNexusConnector.showTag({ target: payload.id });
  };
};

exports.default = positionDisplayedObserver;

/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var positionAlreadyDisplayedObserver = function positionAlreadyDisplayedObserver(appNexusConnector) {
  return function (_ref) {
    var payload = _ref.payload,
        dispatcher = _ref.dispatcher;
    return appNexusConnector.refresh(payload.id);
  };
};

exports.default = positionAlreadyDisplayedObserver;

/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var positionSegmentationChangedObserverFactory = function positionSegmentationChangedObserverFactory(appnexusConnector) {
  return function (_ref) {
    var payload = _ref.payload,
        dispatcher = _ref.dispatcher;
    return appnexusConnector.modifyTag({
      targetId: payload.id,
      data: {
        invCode: payload.placement,
        sizes: payload.sizes,
        keywords: payload.segmentation
      }
    }).refresh([payload.id]);
  };
};

exports.default = positionSegmentationChangedObserverFactory;

/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OpenAds = function () {
  /**
   *
   * @param {Container} container
   */
  function OpenAds(_ref) {
    var container = _ref.container;
    (0, _classCallCheck3.default)(this, OpenAds);

    this._container = container;
  }
  /**
   * Create a new Position on the page
   * @param {string} id
   * @param {string} name
   * @param {string} source
   * @param {string} placement
   * @param {string} segmentation
   * @param {Array<Array<>>}sizes
   * @param {Object} native
   * @param {Function} native.renderer - The function to be used when display use case is used in this position and the Ad is Native type
   * @param {Object} native.fields - Fields requested to the ad server
   * @param {string} native.domClickableId - DOM id where will be included the clickable action from native
   * @returns {Promise<Position>}
   */


  (0, _createClass3.default)(OpenAds, [{
    key: 'addPosition',
    value: function addPosition(_ref2) {
      var id = _ref2.id,
          name = _ref2.name,
          source = _ref2.source,
          placement = _ref2.placement,
          segmentation = _ref2.segmentation,
          sizes = _ref2.sizes,
          native = _ref2.native;

      return this._container.getInstance({ key: 'AddPositionUseCase' }).addPosition({ id: id, name: name, source: source, placement: placement, segmentation: segmentation, sizes: sizes, native: native });
    }

    /**
     * Update a Position with given changes and refresh his Ad
     * @param {string} id
     * @param {object} position
     * @param {string} position.name
     * @param {string} position.placement
     * @param {string} position.segmentation
     * @param {Array} position.sizes
     * @returns {Promise<Position>}
     */

  }, {
    key: 'refreshPosition',
    value: function refreshPosition(_ref3) {
      var id = _ref3.id,
          position = _ref3.position;

      return this._container.getInstance({ key: 'RefreshPositionUseCase' }).refreshPosition({ id: id, position: position });
    }
    /**
     * Displays a position in the page
     * @param {string} position id
     * @return {Promise<Position>}
     */

  }, {
    key: 'displayPosition',
    value: function displayPosition() {
      var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          id = _ref4.id;

      return this._container.getInstance({ key: 'DisplayPositionUseCase' }).displayPosition({ id: id });
    }

    /**
     * Returns current configuration loaded
     * @returns {Object}
     */

  }, {
    key: 'environment',
    value: function environment() {
      return this._container.config;
    }
  }]);
  return OpenAds;
}();

exports.default = OpenAds;

/***/ })
/******/ ]);