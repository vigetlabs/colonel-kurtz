module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!********************************!*\
  !*** ./colonel-kurtz/index.js ***!
  \********************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Colonel Kurts
	 * A custom block editor
	 * @flow
	 */
	
	// Polyfill Object.assign for splat arguments
	if (!Object.assign) {
	  Object.assign = __webpack_require__(/*! object-assign */ 13);
	}
	
	// Polyfill Array.prototype.find for easy record retrieval
	__webpack_require__(/*! array.prototype.find */ 14)
	
	var App              = __webpack_require__(/*! ./components/app */ 3)
	var BlockActions     = __webpack_require__(/*! ./actions/block_actions */ 4)
	var BlockListActions = __webpack_require__(/*! ./actions/block_list_actions */ 5)
	var BlockListStore   = __webpack_require__(/*! ./stores/block_list_store */ 7)
	var EditorActions    = __webpack_require__(/*! ./actions/editor_actions */ 6)
	var Immutable        = __webpack_require__(/*! immutable */ 15)
	var React            = __webpack_require__(/*! react */ 1)
	var uid              = __webpack_require__(/*! ./utils/uid */ 8)
	var Bus              = __webpack_require__(/*! ./bus */ 12)
	var seed             = __webpack_require__(/*! ./utils/seed */ 9)
	
	__webpack_require__(/*! style/colonel */ 27)
	
	
	                                      
	              
	             
	
	  function ColonelKurtz(config)                                 {"use strict";
	    this.id = uid()
	    this.el = config.el
	    this.$ColonelKurtz_callbacks = Immutable.Set()
	
	    Bus.subscribe(function()  {return this.simulateChange();}.bind(this))
	
	    EditorActions.create(Object.assign({ id: this.id}, config ))
	    BlockListActions.create({ editorId: this.id })
	
	    if (config.seed) {
	      seed(BlockListStore.last().id, config.seed)
	    }
	
	    setTimeout(this.simulateChange.bind(this), 10)
	  }
	
	  ColonelKurtz.prototype.render=function()               {"use strict";
	    React.render(this.$ColonelKurtz_rootComponent(), this.$ColonelKurtz_getDomElement())
	    return this
	  };
	
	  ColonelKurtz.prototype.simulateChange=function()       {"use strict";
	    this.$ColonelKurtz_runCallbacks()
	  };
	
	  ColonelKurtz.prototype.addCallback=function(callback)                 {"use strict";
	    this.$ColonelKurtz_callbacks = this.$ColonelKurtz_callbacks.add(callback)
	  };
	
	  ColonelKurtz.prototype.toJSON=function()         {"use strict";
	    var root = BlockListStore.findByEditorId(this.id)
	
	    return root ? root.toJSON() : {}
	  };
	
	  ColonelKurtz.prototype.toHtml=function()         {"use strict";
	    return React.renderToStaticMarkup(this.$ColonelKurtz_rootComponent())
	  };
	
	  // Private
	
	  ColonelKurtz.prototype.$ColonelKurtz_rootComponent=function()               {"use strict";
	    return React.createElement(App, {editorId:  this.id})
	  };
	
	  ColonelKurtz.prototype.$ColonelKurtz_getDomElement=function()          {"use strict";
	    return this.el
	  };
	
	  ColonelKurtz.prototype.$ColonelKurtz_runCallbacks=function()       {"use strict";
	    var json = this.toJSON()
	
	    this.$ColonelKurtz_callbacks.forEach(function(callback){
	      callback(json)
	    })
	  };
	
	
	
	ColonelKurtz.addons       = __webpack_require__(/*! ./addons */ 2)
	ColonelKurtz.createBlock  = __webpack_require__(/*! ./utils/createBlock */ 10)
	ColonelKurtz.addBlockType = __webpack_require__(/*! ./utils/addBlockType */ 11)
	
	module.exports = ColonelKurtz


/***/ },
/* 1 */
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = require("react");

/***/ },
/* 2 */
/*!*********************************!*\
  !*** ./colonel-kurtz/addons.js ***!
  \*********************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
	  Medium  : __webpack_require__(/*! ../addons/medium */ 29),
	  Image   : __webpack_require__(/*! ../addons/image */ 30),
	  YouTube : __webpack_require__(/*! ../addons/youtube */ 31)
	}


/***/ },
/* 3 */
/*!*****************************************!*\
  !*** ./colonel-kurtz/components/app.js ***!
  \*****************************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * This is the root component that contains sections for
	 * toggling between viewing modes and viewing managed content
	 *
	 * @flow
	 */
	
	var BlockListStore = __webpack_require__(/*! ../stores/block_list_store */ 7)
	var EditorActions  = __webpack_require__(/*! ../actions/editor_actions */ 6)
	var EditorStore    = __webpack_require__(/*! ../stores/editor_store */ 16)
	var ContentSection = __webpack_require__(/*! ./content_section */ 17)
	var ModeSelection  = __webpack_require__(/*! ./mode_selection */ 18)
	var Monitor        = __webpack_require__(/*! ../mixins/monitor */ 21)
	var React          = __webpack_require__(/*! react */ 1)
	var Types          = React.PropTypes
	
	var App = React.createClass({displayName: 'App',
	
	  mixins: [ Monitor ],
	
	  propTypes: {
	    editorId: Types.number.isRequired
	  },
	
	  getState:function()         {
	    return {
	      blockList : BlockListStore.findByEditorId(this.props.editorId),
	      editor    : EditorStore.find(this.props.editorId)
	    }
	  },
	
	  render:function()      {
	    var $__0=     this.state,blockList=$__0.blockList,editor=$__0.editor
	
	    return (
	      React.createElement("div", {className: "colonel"}, 
	        React.createElement(ModeSelection, {mode:  editor.mode, onChange:  this._onModeChange}), 
	        React.createElement(ContentSection, {editor: editor, initialBlockListId:  blockList.id})
	      )
	    )
	  },
	
	  _onModeChange:function(mode)       {
	    EditorActions.update(this.props.editorId, { mode:mode })
	  }
	
	})
	
	module.exports = App


/***/ },
/* 4 */
/*!************************************************!*\
  !*** ./colonel-kurtz/actions/block_actions.js ***!
  \************************************************/
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	
	var BlockConstants = __webpack_require__(/*! ../constants/block_constants */ 24)
	var Dispatcher = __webpack_require__(/*! ../dispatcher */ 25)
	
	var BlockActions = {
	
	  create:function(params                                                                                 ) {
	    var type     = BlockConstants.BLOCK_CREATE
	    var position = params.position
	
	    Dispatcher.dispatch({ type:type, params:params, position:position })
	  },
	
	  destroy:function(params                                                ) {
	    var type = BlockConstants.BLOCK_DESTROY
	
	    Dispatcher.dispatch(Object.assign({ type:type}, params ))
	  },
	
	  update:function(blockId        , content        ) {
	    var type = BlockConstants.BLOCK_UPDATE
	
	    Dispatcher.dispatch({ type:type, blockId:blockId, content:content })
	  }
	
	}
	
	module.exports = BlockActions


/***/ },
/* 5 */
/*!*****************************************************!*\
  !*** ./colonel-kurtz/actions/block_list_actions.js ***!
  \*****************************************************/
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	
	var BlockListConstants = __webpack_require__(/*! ../constants/block_list_constants */ 23)
	
	var Dispatcher = __webpack_require__(/*! ../dispatcher */ 25)
	
	var BlockListActions = {
	
	  create:function(params                                       )       {
	    var type = BlockListConstants.BLOCK_LIST_CREATE
	
	    Dispatcher.dispatch({ type:type, params:params })
	  },
	
	  move:function(blockListId        , fromId        , toId        ) {
	    var type = BlockListConstants.BLOCK_LIST_MOVE;
	    Dispatcher.dispatch({ type:type, blockListId:blockListId, fromId:fromId, toId:toId })
	  }
	
	}
	
	module.exports = BlockListActions


/***/ },
/* 6 */
/*!*************************************************!*\
  !*** ./colonel-kurtz/actions/editor_actions.js ***!
  \*************************************************/
/***/ function(module, exports, __webpack_require__) {

	var Constants  = __webpack_require__(/*! ../constants/editor_constants */ 32)
	var Dispatcher = __webpack_require__(/*! ../dispatcher */ 25)
	
	var EditorActions = {
	
	  create:function(params) {
	    var type = Constants.EDITOR_CREATE
	    Dispatcher.dispatch({ type:type, params:params })
	  },
	
	  update:function(id, params) {
	    var type = Constants.EDITOR_UPDATE
	    Dispatcher.dispatch({ type:type, id:id, params:params })
	  }
	
	}
	
	module.exports = EditorActions


/***/ },
/* 7 */
/*!**************************************************!*\
  !*** ./colonel-kurtz/stores/block_list_store.js ***!
  \**************************************************/
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	
	var BlockConstants = __webpack_require__(/*! ../constants/block_constants */ 24)
	var BlockList      = __webpack_require__(/*! ../models/block_list */ 26)
	var BlockStore     = __webpack_require__(/*! ../stores/block_store */ 19)
	var Bus            = __webpack_require__(/*! ../bus */ 12)
	var Constants      = __webpack_require__(/*! ../constants/block_list_constants */ 23)
	var Dispatcher     = __webpack_require__(/*! ../dispatcher */ 25)
	var Immutable      = __webpack_require__(/*! immutable */ 15)
	
	var _blockLists = Immutable.List()
	
	var BlockListStore = {
	
	  all:function()                   {
	    return _blockLists
	  },
	
	  last:function() {
	    return _blockLists.last()
	  },
	
	  findByKey:function(key       , value    )      {
	    return this.all().find(function(item)  {return item[key] === value;}) || null
	  },
	
	  findByEditorId:function(id        )             {
	    return BlockListStore.findByKey('editorId', id)
	  },
	
	  findByBlockId:function(id        )             {
	    return BlockListStore.findByKey('blockId', id)
	  },
	
	  find:function(id        )             {
	    return BlockListStore.findByKey('id', id)
	  },
	
	  _create:function(params        )       {
	    var blockList = new BlockList({ editorId: params.editorId, blockId: params.blockId })
	
	    _blockLists = _blockLists.push(blockList)
	  },
	
	  _createFromParent:function(block      , position       )       {
	    var parent = this.find(block.parentBlockListId)
	
	    if (parent) {
	      var blockList = new BlockList({ editorId: parent.editorId, blockId: block.id})
	      _blockLists = _blockLists.push(blockList)
	    }
	  },
	
	  _addBlockToList:function(block       , position        )       {
	    var blockList = this.find(block.parentBlockListId)
	
	    if (blockList) {
	      blockList.insertBlock(block.id, position)
	      Bus.publish()
	    }
	  },
	
	  _removeBlockFromList:function(blockId        , blockListId        ) {
	    var blockList = this.find(blockListId)
	
	    if (blockList) {
	      blockList.removeBlock(blockId)
	      Bus.publish()
	    }
	  },
	
	  _move:function(blockListId, fromId        , toId        ) {
	    var blockList = this.find(blockListId)
	
	    if (blockList) {
	      blockList.move(fromId, toId)
	      Bus.publish()
	    }
	  },
	
	  dispatchToken: Dispatcher.register(function(action) {
	    switch (action.type) {
	      case BlockConstants.BLOCK_CREATE:
	        Dispatcher.waitFor([ BlockStore.dispatchToken ])
	        BlockListStore._addBlockToList(action.block, action.position)
	        BlockListStore._createFromParent(action.block, action.position)
	        break
	      case BlockConstants.BLOCK_DESTROY:
	        Dispatcher.waitFor([ BlockStore.dispatchToken ])
	        BlockListStore._removeBlockFromList(action.blockId, action.parentBlockListId)
	        break
	      case Constants.BLOCK_LIST_CREATE:
	        BlockListStore._create(action.params)
	        break
	      case Constants.BLOCK_LIST_MOVE:
	        BlockListStore._move(action.blockListId, action.fromId, action.toId)
	        break
	      default:
	        // do nothing
	    }
	  })
	}
	
	module.exports = BlockListStore


/***/ },
/* 8 */
/*!************************************!*\
  !*** ./colonel-kurtz/utils/uid.js ***!
  \************************************/
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	
	var uidCounter = 0;
	
	var uid = function()         {
	  return uidCounter += 1
	}
	
	module.exports = uid


/***/ },
/* 9 */
/*!*************************************!*\
  !*** ./colonel-kurtz/utils/seed.js ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Given a root block list, this function will populate
	 * an editor with content
	 *
	 * @flow
	 */
	
	var BlockActions   = __webpack_require__(/*! ../actions/block_actions */ 4)
	var BlockListStore = __webpack_require__(/*! ../stores/block_list_store */ 7)
	
	module.exports = function seed (parentBlockListId        , blocks       )       {
	
	  blocks.forEach(function(block, position) {
	
	    BlockActions.create(Object.assign({ position:position, parentBlockListId:parentBlockListId}, block ))
	
	    if (Array.isArray(block.blocks)) {
	      seed(BlockListStore.last().id, block.blocks)
	    }
	
	  })
	
	}


/***/ },
/* 10 */
/*!********************************************!*\
  !*** ./colonel-kurtz/utils/createBlock.js ***!
  \********************************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * This utility takes an object and mixes in the required boilerplate
	 * needed to integrate it into ColonelKurtz.
	 *
	 * @flow
	 */
	
	var React     = __webpack_require__(/*! react */ 1)
	var BlockType = __webpack_require__(/*! ../mixins/block_type */ 22)
	var assign    = __webpack_require__(/*! object-assign */ 13)
	
	module.exports = function (spec        )      {
	  var mixins = spec.mixins || []
	
	  if (mixins.indexOf(BlockType) < 0) {
	    mixins = mixins.concat(BlockType)
	  }
	
	  return React.createClass(
	    assign({}, spec, { React:React, mixins:mixins })
	  )
	}


/***/ },
/* 11 */
/*!*********************************************!*\
  !*** ./colonel-kurtz/utils/addBlockType.js ***!
  \*********************************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * This utility adds a new block type to ColonelKurtz. If not given a
	 * valid React element, it produces one using ./createBlock
	 *
	 * @flow
	 */
	
	var BlockTypeActions = __webpack_require__(/*! ../actions/block_type_actions */ 20)
	var createBlock      = __webpack_require__(/*! ./createBlock */ 10)
	var React            = __webpack_require__(/*! react */ 1)
	
	module.exports = function (options        )       {
	  var component = options.component
	
	  if (React.isValidElement(component) === false) {
	    component = createBlock(component)
	  }
	
	  BlockTypeActions.create(Object.assign({}, options, {component:component }))
	}


/***/ },
/* 12 */
/*!************************************!*\
  !*** ./colonel-kurtz/bus/index.js ***!
  \************************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * The Bus emits a heartbeat whenever any store state has changed.
	 * When Stores change, they can use this entity to broadcast
	 * that state has changed.
	 */
	
	var Immutable  = __webpack_require__(/*! immutable */ 15);
	var invariant  = __webpack_require__(/*! react/lib/invariant */ 41);
	
	var _callbacks = Immutable.Set();
	
	var Bus = {
	
	  /**
	   * Given a CALLBACK function, remove it from the Set of callbacks.
	   * Throws an error if the callback is not included in the Set.
	   */
	  unsubscribe:function(callback) {
	    if (true) {
	      invariant(_callbacks.has(callback), 'Bus.stopListeningTo() was asked to remove callback that it was not subscribed to.');
	    }
	
	    _callbacks = _callbacks.remove(callback);
	  },
	
	  /**
	   * Given a CALLBACK function, add it to the Set of all callbacks.
	   */
	  subscribe:function(callback) {
	    if (true) {
	      var type = typeof callback
	      invariant(type === 'function', 'Bus.listenTo() expects a function, instead it received a ' + type)
	    }
	
	    _callbacks = _callbacks.add(callback);
	  },
	
	  /**
	   * Trigger every callback in the Set
	   */
	  publish:function() {
	    _callbacks.forEach(function(callback)  {return callback();});
	  }
	
	}
	
	module.exports = Bus;


/***/ },
/* 13 */
/*!**********************************!*\
  !*** ./~/object-assign/index.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	function ToObject(val) {
		if (val == null) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}
	
		return Object(val);
	}
	
	module.exports = Object.assign || function (target, source) {
		var from;
		var keys;
		var to = ToObject(target);
	
		for (var s = 1; s < arguments.length; s++) {
			from = arguments[s];
			keys = Object.keys(Object(from));
	
			for (var i = 0; i < keys.length; i++) {
				to[keys[i]] = from[keys[i]];
			}
		}
	
		return to;
	};


/***/ },
/* 14 */
/*!*****************************************!*\
  !*** ./~/array.prototype.find/index.js ***!
  \*****************************************/
/***/ function(module, exports, __webpack_require__) {

	// Array.prototype.find - MIT License (c) 2013 Paul Miller <http://paulmillr.com>
	// For all details and docs: https://github.com/paulmillr/array.prototype.find
	// Fixes and tests supplied by Duncan Hall <http://duncanhall.net> 
	(function(globals){
	  if (Array.prototype.find) return;
	
	  var find = function(predicate) {
	    var list = Object(this);
	    var length = list.length < 0 ? 0 : list.length >>> 0; // ES.ToUint32;
	    if (length === 0) return undefined;
	    if (typeof predicate !== 'function' || Object.prototype.toString.call(predicate) !== '[object Function]') {
	      throw new TypeError('Array#find: predicate must be a function');
	    }
	    var thisArg = arguments[1];
	    for (var i = 0, value; i < length; i++) {
	      value = list[i];
	      if (predicate.call(thisArg, value, i, list)) return value;
	    }
	    return undefined;
	  };
	
	  if (Object.defineProperty) {
	    try {
	      Object.defineProperty(Array.prototype, 'find', {
	        value: find, configurable: true, enumerable: false, writable: true
	      });
	    } catch(e) {}
	  }
	
	  if (!Array.prototype.find) {
	    Array.prototype.find = find;
	  }
	})(this);


/***/ },
/* 15 */
/*!***************************************!*\
  !*** ./~/immutable/dist/immutable.js ***!
  \***************************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 *  Copyright (c) 2014, Facebook, Inc.
	 *  All rights reserved.
	 *
	 *  This source code is licensed under the BSD-style license found in the
	 *  LICENSE file in the root directory of this source tree. An additional grant
	 *  of patent rights can be found in the PATENTS file in the same directory.
	 */
	function universalModule() {
	  var $Object = Object;
	
	function createClass(ctor, methods, staticMethods, superClass) {
	  var proto;
	  if (superClass) {
	    var superProto = superClass.prototype;
	    proto = $Object.create(superProto);
	  } else {
	    proto = ctor.prototype;
	  }
	  $Object.keys(methods).forEach(function (key) {
	    proto[key] = methods[key];
	  });
	  $Object.keys(staticMethods).forEach(function (key) {
	    ctor[key] = staticMethods[key];
	  });
	  proto.constructor = ctor;
	  ctor.prototype = proto;
	  return ctor;
	}
	
	function superCall(self, proto, name, args) {
	  return $Object.getPrototypeOf(proto)[name].apply(self, args);
	}
	
	function defaultSuperCall(self, proto, args) {
	  superCall(self, proto, 'constructor', args);
	}
	
	var $traceurRuntime = {};
	$traceurRuntime.createClass = createClass;
	$traceurRuntime.superCall = superCall;
	$traceurRuntime.defaultSuperCall = defaultSuperCall;
	"use strict";
	function is(valueA, valueB) {
	  if (valueA === valueB || (valueA !== valueA && valueB !== valueB)) {
	    return true;
	  }
	  if (!valueA || !valueB) {
	    return false;
	  }
	  if (typeof valueA.valueOf === 'function' && typeof valueB.valueOf === 'function') {
	    valueA = valueA.valueOf();
	    valueB = valueB.valueOf();
	  }
	  return typeof valueA.equals === 'function' && typeof valueB.equals === 'function' ? valueA.equals(valueB) : valueA === valueB || (valueA !== valueA && valueB !== valueB);
	}
	function invariant(condition, error) {
	  if (!condition)
	    throw new Error(error);
	}
	var DELETE = 'delete';
	var SHIFT = 5;
	var SIZE = 1 << SHIFT;
	var MASK = SIZE - 1;
	var NOT_SET = {};
	var CHANGE_LENGTH = {value: false};
	var DID_ALTER = {value: false};
	function MakeRef(ref) {
	  ref.value = false;
	  return ref;
	}
	function SetRef(ref) {
	  ref && (ref.value = true);
	}
	function OwnerID() {}
	function arrCopy(arr, offset) {
	  offset = offset || 0;
	  var len = Math.max(0, arr.length - offset);
	  var newArr = new Array(len);
	  for (var ii = 0; ii < len; ii++) {
	    newArr[ii] = arr[ii + offset];
	  }
	  return newArr;
	}
	function assertNotInfinite(size) {
	  invariant(size !== Infinity, 'Cannot perform this action with an infinite size.');
	}
	function ensureSize(iter) {
	  if (iter.size === undefined) {
	    iter.size = iter.__iterate(returnTrue);
	  }
	  return iter.size;
	}
	function wrapIndex(iter, index) {
	  return index >= 0 ? (+index) : ensureSize(iter) + (+index);
	}
	function returnTrue() {
	  return true;
	}
	function wholeSlice(begin, end, size) {
	  return (begin === 0 || (size !== undefined && begin <= -size)) && (end === undefined || (size !== undefined && end >= size));
	}
	function resolveBegin(begin, size) {
	  return resolveIndex(begin, size, 0);
	}
	function resolveEnd(end, size) {
	  return resolveIndex(end, size, size);
	}
	function resolveIndex(index, size, defaultIndex) {
	  return index === undefined ? defaultIndex : index < 0 ? Math.max(0, size + index) : size === undefined ? index : Math.min(size, index);
	}
	var imul = typeof Math.imul === 'function' && Math.imul(0xffffffff, 2) === -2 ? Math.imul : function imul(a, b) {
	  a = a | 0;
	  b = b | 0;
	  var c = a & 0xffff;
	  var d = b & 0xffff;
	  return (c * d) + ((((a >>> 16) * d + c * (b >>> 16)) << 16) >>> 0) | 0;
	};
	function smi(i32) {
	  return ((i32 >>> 1) & 0x40000000) | (i32 & 0xBFFFFFFF);
	}
	function hash(o) {
	  if (o === false || o === null || o === undefined) {
	    return 0;
	  }
	  if (typeof o.valueOf === 'function') {
	    o = o.valueOf();
	    if (o === false || o === null || o === undefined) {
	      return 0;
	    }
	  }
	  if (o === true) {
	    return 1;
	  }
	  var type = typeof o;
	  if (type === 'number') {
	    var h = o | 0;
	    while (o > 0xFFFFFFFF) {
	      o /= 0xFFFFFFFF;
	      h ^= o;
	    }
	    return smi(h);
	  }
	  if (type === 'string') {
	    return o.length > STRING_HASH_CACHE_MIN_STRLEN ? cachedHashString(o) : hashString(o);
	  }
	  if (typeof o.hashCode === 'function') {
	    return o.hashCode();
	  }
	  return hashJSObj(o);
	}
	function cachedHashString(string) {
	  var hash = stringHashCache[string];
	  if (hash === undefined) {
	    hash = hashString(string);
	    if (STRING_HASH_CACHE_SIZE === STRING_HASH_CACHE_MAX_SIZE) {
	      STRING_HASH_CACHE_SIZE = 0;
	      stringHashCache = {};
	    }
	    STRING_HASH_CACHE_SIZE++;
	    stringHashCache[string] = hash;
	  }
	  return hash;
	}
	function hashString(string) {
	  var hash = 0;
	  for (var ii = 0; ii < string.length; ii++) {
	    hash = 31 * hash + string.charCodeAt(ii) | 0;
	  }
	  return smi(hash);
	}
	function hashJSObj(obj) {
	  var hash = weakMap && weakMap.get(obj);
	  if (hash)
	    return hash;
	  hash = obj[UID_HASH_KEY];
	  if (hash)
	    return hash;
	  if (!canDefineProperty) {
	    hash = obj.propertyIsEnumerable && obj.propertyIsEnumerable[UID_HASH_KEY];
	    if (hash)
	      return hash;
	    hash = getIENodeHash(obj);
	    if (hash)
	      return hash;
	  }
	  if (Object.isExtensible && !Object.isExtensible(obj)) {
	    throw new Error('Non-extensible objects are not allowed as keys.');
	  }
	  hash = ++objHashUID;
	  if (objHashUID & 0x40000000) {
	    objHashUID = 0;
	  }
	  if (weakMap) {
	    weakMap.set(obj, hash);
	  } else if (canDefineProperty) {
	    Object.defineProperty(obj, UID_HASH_KEY, {
	      'enumerable': false,
	      'configurable': false,
	      'writable': false,
	      'value': hash
	    });
	  } else if (obj.propertyIsEnumerable && obj.propertyIsEnumerable === obj.constructor.prototype.propertyIsEnumerable) {
	    obj.propertyIsEnumerable = function() {
	      return this.constructor.prototype.propertyIsEnumerable.apply(this, arguments);
	    };
	    obj.propertyIsEnumerable[UID_HASH_KEY] = hash;
	  } else if (obj.nodeType) {
	    obj[UID_HASH_KEY] = hash;
	  } else {
	    throw new Error('Unable to set a non-enumerable property on object.');
	  }
	  return hash;
	}
	var canDefineProperty = (function() {
	  try {
	    Object.defineProperty({}, 'x', {});
	    return true;
	  } catch (e) {
	    return false;
	  }
	}());
	function getIENodeHash(node) {
	  if (node && node.nodeType > 0) {
	    switch (node.nodeType) {
	      case 1:
	        return node.uniqueID;
	      case 9:
	        return node.documentElement && node.documentElement.uniqueID;
	    }
	  }
	}
	var weakMap = typeof WeakMap === 'function' && new WeakMap();
	var objHashUID = 0;
	var UID_HASH_KEY = '__immutablehash__';
	if (typeof Symbol === 'function') {
	  UID_HASH_KEY = Symbol(UID_HASH_KEY);
	}
	var STRING_HASH_CACHE_MIN_STRLEN = 16;
	var STRING_HASH_CACHE_MAX_SIZE = 255;
	var STRING_HASH_CACHE_SIZE = 0;
	var stringHashCache = {};
	var ITERATE_KEYS = 0;
	var ITERATE_VALUES = 1;
	var ITERATE_ENTRIES = 2;
	var FAUX_ITERATOR_SYMBOL = '@@iterator';
	var REAL_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
	var ITERATOR_SYMBOL = REAL_ITERATOR_SYMBOL || FAUX_ITERATOR_SYMBOL;
	var Iterator = function Iterator(next) {
	  this.next = next;
	};
	($traceurRuntime.createClass)(Iterator, {toString: function() {
	    return '[Iterator]';
	  }}, {});
	Iterator.KEYS = ITERATE_KEYS;
	Iterator.VALUES = ITERATE_VALUES;
	Iterator.ENTRIES = ITERATE_ENTRIES;
	var IteratorPrototype = Iterator.prototype;
	IteratorPrototype.inspect = IteratorPrototype.toSource = function() {
	  return this.toString();
	};
	IteratorPrototype[ITERATOR_SYMBOL] = function() {
	  return this;
	};
	function iteratorValue(type, k, v, iteratorResult) {
	  var value = type === 0 ? k : type === 1 ? v : [k, v];
	  iteratorResult ? (iteratorResult.value = value) : (iteratorResult = {
	    value: value,
	    done: false
	  });
	  return iteratorResult;
	}
	function iteratorDone() {
	  return {
	    value: undefined,
	    done: true
	  };
	}
	function hasIterator(maybeIterable) {
	  return !!_iteratorFn(maybeIterable);
	}
	function isIterator(maybeIterator) {
	  return maybeIterator && typeof maybeIterator.next === 'function';
	}
	function getIterator(iterable) {
	  var iteratorFn = _iteratorFn(iterable);
	  return iteratorFn && iteratorFn.call(iterable);
	}
	function _iteratorFn(iterable) {
	  var iteratorFn = iterable && ((REAL_ITERATOR_SYMBOL && iterable[REAL_ITERATOR_SYMBOL]) || iterable[FAUX_ITERATOR_SYMBOL]);
	  if (typeof iteratorFn === 'function') {
	    return iteratorFn;
	  }
	}
	var Iterable = function Iterable(value) {
	  return isIterable(value) ? value : Seq(value);
	};
	var $Iterable = Iterable;
	($traceurRuntime.createClass)(Iterable, {
	  toArray: function() {
	    assertNotInfinite(this.size);
	    var array = new Array(this.size || 0);
	    this.valueSeq().__iterate((function(v, i) {
	      array[i] = v;
	    }));
	    return array;
	  },
	  toIndexedSeq: function() {
	    return new ToIndexedSequence(this);
	  },
	  toJS: function() {
	    return this.toSeq().map((function(value) {
	      return value && typeof value.toJS === 'function' ? value.toJS() : value;
	    })).__toJS();
	  },
	  toKeyedSeq: function() {
	    return new ToKeyedSequence(this, true);
	  },
	  toMap: function() {
	    return Map(this.toKeyedSeq());
	  },
	  toObject: function() {
	    assertNotInfinite(this.size);
	    var object = {};
	    this.__iterate((function(v, k) {
	      object[k] = v;
	    }));
	    return object;
	  },
	  toOrderedMap: function() {
	    return OrderedMap(this.toKeyedSeq());
	  },
	  toOrderedSet: function() {
	    return OrderedSet(isKeyed(this) ? this.valueSeq() : this);
	  },
	  toSet: function() {
	    return Set(isKeyed(this) ? this.valueSeq() : this);
	  },
	  toSetSeq: function() {
	    return new ToSetSequence(this);
	  },
	  toSeq: function() {
	    return isIndexed(this) ? this.toIndexedSeq() : isKeyed(this) ? this.toKeyedSeq() : this.toSetSeq();
	  },
	  toStack: function() {
	    return Stack(isKeyed(this) ? this.valueSeq() : this);
	  },
	  toList: function() {
	    return List(isKeyed(this) ? this.valueSeq() : this);
	  },
	  toString: function() {
	    return '[Iterable]';
	  },
	  __toString: function(head, tail) {
	    if (this.size === 0) {
	      return head + tail;
	    }
	    return head + ' ' + this.toSeq().map(this.__toStringMapper).join(', ') + ' ' + tail;
	  },
	  concat: function() {
	    for (var values = [],
	        $__2 = 0; $__2 < arguments.length; $__2++)
	      values[$__2] = arguments[$__2];
	    return reify(this, concatFactory(this, values));
	  },
	  contains: function(searchValue) {
	    return this.some((function(value) {
	      return is(value, searchValue);
	    }));
	  },
	  entries: function() {
	    return this.__iterator(ITERATE_ENTRIES);
	  },
	  every: function(predicate, context) {
	    assertNotInfinite(this.size);
	    var returnValue = true;
	    this.__iterate((function(v, k, c) {
	      if (!predicate.call(context, v, k, c)) {
	        returnValue = false;
	        return false;
	      }
	    }));
	    return returnValue;
	  },
	  filter: function(predicate, context) {
	    return reify(this, filterFactory(this, predicate, context, true));
	  },
	  find: function(predicate, context, notSetValue) {
	    var foundValue = notSetValue;
	    this.__iterate((function(v, k, c) {
	      if (predicate.call(context, v, k, c)) {
	        foundValue = v;
	        return false;
	      }
	    }));
	    return foundValue;
	  },
	  forEach: function(sideEffect, context) {
	    assertNotInfinite(this.size);
	    return this.__iterate(context ? sideEffect.bind(context) : sideEffect);
	  },
	  join: function(separator) {
	    assertNotInfinite(this.size);
	    separator = separator !== undefined ? '' + separator : ',';
	    var joined = '';
	    var isFirst = true;
	    this.__iterate((function(v) {
	      isFirst ? (isFirst = false) : (joined += separator);
	      joined += v !== null && v !== undefined ? v : '';
	    }));
	    return joined;
	  },
	  keys: function() {
	    return this.__iterator(ITERATE_KEYS);
	  },
	  map: function(mapper, context) {
	    return reify(this, mapFactory(this, mapper, context));
	  },
	  reduce: function(reducer, initialReduction, context) {
	    assertNotInfinite(this.size);
	    var reduction;
	    var useFirst;
	    if (arguments.length < 2) {
	      useFirst = true;
	    } else {
	      reduction = initialReduction;
	    }
	    this.__iterate((function(v, k, c) {
	      if (useFirst) {
	        useFirst = false;
	        reduction = v;
	      } else {
	        reduction = reducer.call(context, reduction, v, k, c);
	      }
	    }));
	    return reduction;
	  },
	  reduceRight: function(reducer, initialReduction, context) {
	    var reversed = this.toKeyedSeq().reverse();
	    return reversed.reduce.apply(reversed, arguments);
	  },
	  reverse: function() {
	    return reify(this, reverseFactory(this, true));
	  },
	  slice: function(begin, end) {
	    if (wholeSlice(begin, end, this.size)) {
	      return this;
	    }
	    var resolvedBegin = resolveBegin(begin, this.size);
	    var resolvedEnd = resolveEnd(end, this.size);
	    if (resolvedBegin !== resolvedBegin || resolvedEnd !== resolvedEnd) {
	      return this.toSeq().cacheResult().slice(begin, end);
	    }
	    var skipped = resolvedBegin === 0 ? this : this.skip(resolvedBegin);
	    return reify(this, resolvedEnd === undefined || resolvedEnd === this.size ? skipped : skipped.take(resolvedEnd - resolvedBegin));
	  },
	  some: function(predicate, context) {
	    return !this.every(not(predicate), context);
	  },
	  sort: function(comparator) {
	    return reify(this, sortFactory(this, comparator));
	  },
	  values: function() {
	    return this.__iterator(ITERATE_VALUES);
	  },
	  butLast: function() {
	    return this.slice(0, -1);
	  },
	  count: function(predicate, context) {
	    return ensureSize(predicate ? this.toSeq().filter(predicate, context) : this);
	  },
	  countBy: function(grouper, context) {
	    return countByFactory(this, grouper, context);
	  },
	  equals: function(other) {
	    return deepEqual(this, other);
	  },
	  entrySeq: function() {
	    var iterable = this;
	    if (iterable._cache) {
	      return new ArraySeq(iterable._cache);
	    }
	    var entriesSequence = iterable.toSeq().map(entryMapper).toIndexedSeq();
	    entriesSequence.fromEntrySeq = (function() {
	      return iterable.toSeq();
	    });
	    return entriesSequence;
	  },
	  filterNot: function(predicate, context) {
	    return this.filter(not(predicate), context);
	  },
	  findLast: function(predicate, context, notSetValue) {
	    return this.toKeyedSeq().reverse().find(predicate, context, notSetValue);
	  },
	  first: function() {
	    return this.find(returnTrue);
	  },
	  flatMap: function(mapper, context) {
	    return reify(this, flatMapFactory(this, mapper, context));
	  },
	  flatten: function(depth) {
	    return reify(this, flattenFactory(this, depth, true));
	  },
	  fromEntrySeq: function() {
	    return new FromEntriesSequence(this);
	  },
	  get: function(searchKey, notSetValue) {
	    return this.find((function(_, key) {
	      return is(key, searchKey);
	    }), undefined, notSetValue);
	  },
	  getIn: function(searchKeyPath, notSetValue) {
	    var nested = this;
	    if (searchKeyPath) {
	      var iter = getIterator(searchKeyPath) || getIterator($Iterable(searchKeyPath));
	      var step;
	      while (!(step = iter.next()).done) {
	        var key = step.value;
	        nested = nested && nested.get ? nested.get(key, NOT_SET) : NOT_SET;
	        if (nested === NOT_SET) {
	          return notSetValue;
	        }
	      }
	    }
	    return nested;
	  },
	  groupBy: function(grouper, context) {
	    return groupByFactory(this, grouper, context);
	  },
	  has: function(searchKey) {
	    return this.get(searchKey, NOT_SET) !== NOT_SET;
	  },
	  hasIn: function(searchKeyPath) {
	    return this.getIn(searchKeyPath, NOT_SET) !== NOT_SET;
	  },
	  isSubset: function(iter) {
	    iter = typeof iter.contains === 'function' ? iter : $Iterable(iter);
	    return this.every((function(value) {
	      return iter.contains(value);
	    }));
	  },
	  isSuperset: function(iter) {
	    return iter.isSubset(this);
	  },
	  keySeq: function() {
	    return this.toSeq().map(keyMapper).toIndexedSeq();
	  },
	  last: function() {
	    return this.toSeq().reverse().first();
	  },
	  max: function(comparator) {
	    return maxFactory(this, comparator);
	  },
	  maxBy: function(mapper, comparator) {
	    return maxFactory(this, comparator, mapper);
	  },
	  min: function(comparator) {
	    return maxFactory(this, comparator ? neg(comparator) : defaultNegComparator);
	  },
	  minBy: function(mapper, comparator) {
	    return maxFactory(this, comparator ? neg(comparator) : defaultNegComparator, mapper);
	  },
	  rest: function() {
	    return this.slice(1);
	  },
	  skip: function(amount) {
	    return reify(this, skipFactory(this, amount, true));
	  },
	  skipLast: function(amount) {
	    return reify(this, this.toSeq().reverse().skip(amount).reverse());
	  },
	  skipWhile: function(predicate, context) {
	    return reify(this, skipWhileFactory(this, predicate, context, true));
	  },
	  skipUntil: function(predicate, context) {
	    return this.skipWhile(not(predicate), context);
	  },
	  sortBy: function(mapper, comparator) {
	    return reify(this, sortFactory(this, comparator, mapper));
	  },
	  take: function(amount) {
	    return reify(this, takeFactory(this, amount));
	  },
	  takeLast: function(amount) {
	    return reify(this, this.toSeq().reverse().take(amount).reverse());
	  },
	  takeWhile: function(predicate, context) {
	    return reify(this, takeWhileFactory(this, predicate, context));
	  },
	  takeUntil: function(predicate, context) {
	    return this.takeWhile(not(predicate), context);
	  },
	  valueSeq: function() {
	    return this.toIndexedSeq();
	  },
	  hashCode: function() {
	    return this.__hash || (this.__hash = hashIterable(this));
	  }
	}, {});
	var IS_ITERABLE_SENTINEL = '@@__IMMUTABLE_ITERABLE__@@';
	var IS_KEYED_SENTINEL = '@@__IMMUTABLE_KEYED__@@';
	var IS_INDEXED_SENTINEL = '@@__IMMUTABLE_INDEXED__@@';
	var IS_ORDERED_SENTINEL = '@@__IMMUTABLE_ORDERED__@@';
	var IterablePrototype = Iterable.prototype;
	IterablePrototype[IS_ITERABLE_SENTINEL] = true;
	IterablePrototype[ITERATOR_SYMBOL] = IterablePrototype.values;
	IterablePrototype.toJSON = IterablePrototype.toJS;
	IterablePrototype.__toJS = IterablePrototype.toArray;
	IterablePrototype.__toStringMapper = quoteString;
	IterablePrototype.inspect = IterablePrototype.toSource = function() {
	  return this.toString();
	};
	IterablePrototype.chain = IterablePrototype.flatMap;
	(function() {
	  try {
	    Object.defineProperty(IterablePrototype, 'length', {get: function() {
	        if (!Iterable.noLengthWarning) {
	          var stack;
	          try {
	            throw new Error();
	          } catch (error) {
	            stack = error.stack;
	          }
	          if (stack.indexOf('_wrapObject') === -1) {
	            console && console.warn && console.warn('iterable.length has been deprecated, ' + 'use iterable.size or iterable.count(). ' + 'This warning will become a silent error in a future version. ' + stack);
	            return this.size;
	          }
	        }
	      }});
	  } catch (e) {}
	})();
	var KeyedIterable = function KeyedIterable(value) {
	  return isKeyed(value) ? value : KeyedSeq(value);
	};
	($traceurRuntime.createClass)(KeyedIterable, {
	  flip: function() {
	    return reify(this, flipFactory(this));
	  },
	  findKey: function(predicate, context) {
	    var foundKey;
	    this.__iterate((function(v, k, c) {
	      if (predicate.call(context, v, k, c)) {
	        foundKey = k;
	        return false;
	      }
	    }));
	    return foundKey;
	  },
	  findLastKey: function(predicate, context) {
	    return this.toSeq().reverse().findKey(predicate, context);
	  },
	  keyOf: function(searchValue) {
	    return this.findKey((function(value) {
	      return is(value, searchValue);
	    }));
	  },
	  lastKeyOf: function(searchValue) {
	    return this.toSeq().reverse().keyOf(searchValue);
	  },
	  mapEntries: function(mapper, context) {
	    var $__0 = this;
	    var iterations = 0;
	    return reify(this, this.toSeq().map((function(v, k) {
	      return mapper.call(context, [k, v], iterations++, $__0);
	    })).fromEntrySeq());
	  },
	  mapKeys: function(mapper, context) {
	    var $__0 = this;
	    return reify(this, this.toSeq().flip().map((function(k, v) {
	      return mapper.call(context, k, v, $__0);
	    })).flip());
	  }
	}, {}, Iterable);
	var KeyedIterablePrototype = KeyedIterable.prototype;
	KeyedIterablePrototype[IS_KEYED_SENTINEL] = true;
	KeyedIterablePrototype[ITERATOR_SYMBOL] = IterablePrototype.entries;
	KeyedIterablePrototype.__toJS = IterablePrototype.toObject;
	KeyedIterablePrototype.__toStringMapper = (function(v, k) {
	  return k + ': ' + quoteString(v);
	});
	var IndexedIterable = function IndexedIterable(value) {
	  return isIndexed(value) ? value : IndexedSeq(value);
	};
	($traceurRuntime.createClass)(IndexedIterable, {
	  toKeyedSeq: function() {
	    return new ToKeyedSequence(this, false);
	  },
	  filter: function(predicate, context) {
	    return reify(this, filterFactory(this, predicate, context, false));
	  },
	  findIndex: function(predicate, context) {
	    var key = this.toKeyedSeq().findKey(predicate, context);
	    return key === undefined ? -1 : key;
	  },
	  indexOf: function(searchValue) {
	    var key = this.toKeyedSeq().keyOf(searchValue);
	    return key === undefined ? -1 : key;
	  },
	  lastIndexOf: function(searchValue) {
	    var key = this.toKeyedSeq().lastKeyOf(searchValue);
	    return key === undefined ? -1 : key;
	  },
	  reverse: function() {
	    return reify(this, reverseFactory(this, false));
	  },
	  splice: function(index, removeNum) {
	    var numArgs = arguments.length;
	    removeNum = Math.max(removeNum | 0, 0);
	    if (numArgs === 0 || (numArgs === 2 && !removeNum)) {
	      return this;
	    }
	    index = resolveBegin(index, this.size);
	    var spliced = this.slice(0, index);
	    return reify(this, numArgs === 1 ? spliced : spliced.concat(arrCopy(arguments, 2), this.slice(index + removeNum)));
	  },
	  findLastIndex: function(predicate, context) {
	    var key = this.toKeyedSeq().findLastKey(predicate, context);
	    return key === undefined ? -1 : key;
	  },
	  first: function() {
	    return this.get(0);
	  },
	  flatten: function(depth) {
	    return reify(this, flattenFactory(this, depth, false));
	  },
	  get: function(index, notSetValue) {
	    index = wrapIndex(this, index);
	    return (index < 0 || (this.size === Infinity || (this.size !== undefined && index > this.size))) ? notSetValue : this.find((function(_, key) {
	      return key === index;
	    }), undefined, notSetValue);
	  },
	  has: function(index) {
	    index = wrapIndex(this, index);
	    return index >= 0 && (this.size !== undefined ? this.size === Infinity || index < this.size : this.indexOf(index) !== -1);
	  },
	  interpose: function(separator) {
	    return reify(this, interposeFactory(this, separator));
	  },
	  last: function() {
	    return this.get(-1);
	  },
	  skip: function(amount) {
	    var iter = this;
	    var skipSeq = skipFactory(iter, amount, false);
	    if (isSeq(iter) && skipSeq !== iter) {
	      skipSeq.get = function(index, notSetValue) {
	        index = wrapIndex(this, index);
	        return index >= 0 ? iter.get(index + amount, notSetValue) : notSetValue;
	      };
	    }
	    return reify(this, skipSeq);
	  },
	  skipWhile: function(predicate, context) {
	    return reify(this, skipWhileFactory(this, predicate, context, false));
	  },
	  take: function(amount) {
	    var iter = this;
	    var takeSeq = takeFactory(iter, amount);
	    if (isSeq(iter) && takeSeq !== iter) {
	      takeSeq.get = function(index, notSetValue) {
	        index = wrapIndex(this, index);
	        return index >= 0 && index < amount ? iter.get(index, notSetValue) : notSetValue;
	      };
	    }
	    return reify(this, takeSeq);
	  }
	}, {}, Iterable);
	IndexedIterable.prototype[IS_INDEXED_SENTINEL] = true;
	IndexedIterable.prototype[IS_ORDERED_SENTINEL] = true;
	var SetIterable = function SetIterable(value) {
	  return isIterable(value) && !isAssociative(value) ? value : SetSeq(value);
	};
	($traceurRuntime.createClass)(SetIterable, {
	  get: function(value, notSetValue) {
	    return this.has(value) ? value : notSetValue;
	  },
	  contains: function(value) {
	    return this.has(value);
	  },
	  keySeq: function() {
	    return this.valueSeq();
	  }
	}, {}, Iterable);
	SetIterable.prototype.has = IterablePrototype.contains;
	function isIterable(maybeIterable) {
	  return !!(maybeIterable && maybeIterable[IS_ITERABLE_SENTINEL]);
	}
	function isKeyed(maybeKeyed) {
	  return !!(maybeKeyed && maybeKeyed[IS_KEYED_SENTINEL]);
	}
	function isIndexed(maybeIndexed) {
	  return !!(maybeIndexed && maybeIndexed[IS_INDEXED_SENTINEL]);
	}
	function isAssociative(maybeAssociative) {
	  return isKeyed(maybeAssociative) || isIndexed(maybeAssociative);
	}
	function isOrdered(maybeOrdered) {
	  return !!(maybeOrdered && maybeOrdered[IS_ORDERED_SENTINEL]);
	}
	Iterable.isIterable = isIterable;
	Iterable.isKeyed = isKeyed;
	Iterable.isIndexed = isIndexed;
	Iterable.isAssociative = isAssociative;
	Iterable.isOrdered = isOrdered;
	Iterable.Keyed = KeyedIterable;
	Iterable.Indexed = IndexedIterable;
	Iterable.Set = SetIterable;
	Iterable.Iterator = Iterator;
	function keyMapper(v, k) {
	  return k;
	}
	function entryMapper(v, k) {
	  return [k, v];
	}
	function not(predicate) {
	  return function() {
	    return !predicate.apply(this, arguments);
	  };
	}
	function neg(predicate) {
	  return function() {
	    return -predicate.apply(this, arguments);
	  };
	}
	function quoteString(value) {
	  return typeof value === 'string' ? JSON.stringify(value) : value;
	}
	function defaultNegComparator(a, b) {
	  return a > b ? -1 : a < b ? 1 : 0;
	}
	function deepEqual(a, b) {
	  if (a === b) {
	    return true;
	  }
	  if (!isIterable(b) || a.size !== undefined && b.size !== undefined && a.size !== b.size || a.__hash !== undefined && b.__hash !== undefined && a.__hash !== b.__hash || isKeyed(a) !== isKeyed(b) || isIndexed(a) !== isIndexed(b) || isOrdered(a) !== isOrdered(b)) {
	    return false;
	  }
	  if (a.size === 0 && b.size === 0) {
	    return true;
	  }
	  var notAssociative = !isAssociative(a);
	  if (isOrdered(a)) {
	    var entries = a.entries();
	    return b.every((function(v, k) {
	      var entry = entries.next().value;
	      return entry && is(entry[1], v) && (notAssociative || is(entry[0], k));
	    })) && entries.next().done;
	  }
	  var flipped = false;
	  if (a.size === undefined) {
	    if (b.size === undefined) {
	      a.cacheResult();
	    } else {
	      flipped = true;
	      var _ = a;
	      a = b;
	      b = _;
	    }
	  }
	  var allEqual = true;
	  var bSize = b.__iterate((function(v, k) {
	    if (notAssociative ? !a.has(v) : flipped ? !is(v, a.get(k, NOT_SET)) : !is(a.get(k, NOT_SET), v)) {
	      allEqual = false;
	      return false;
	    }
	  }));
	  return allEqual && a.size === bSize;
	}
	function hashIterable(iterable) {
	  if (iterable.size === Infinity) {
	    return 0;
	  }
	  var ordered = isOrdered(iterable);
	  var keyed = isKeyed(iterable);
	  var h = ordered ? 1 : 0;
	  var size = iterable.__iterate(keyed ? ordered ? (function(v, k) {
	    h = 31 * h + hashMerge(hash(v), hash(k)) | 0;
	  }) : (function(v, k) {
	    h = h + hashMerge(hash(v), hash(k)) | 0;
	  }) : ordered ? (function(v) {
	    h = 31 * h + hash(v) | 0;
	  }) : (function(v) {
	    h = h + hash(v) | 0;
	  }));
	  return murmurHashOfSize(size, h);
	}
	function murmurHashOfSize(size, h) {
	  h = imul(h, 0xCC9E2D51);
	  h = imul(h << 15 | h >>> -15, 0x1B873593);
	  h = imul(h << 13 | h >>> -13, 5);
	  h = (h + 0xE6546B64 | 0) ^ size;
	  h = imul(h ^ h >>> 16, 0x85EBCA6B);
	  h = imul(h ^ h >>> 13, 0xC2B2AE35);
	  h = smi(h ^ h >>> 16);
	  return h;
	}
	function hashMerge(a, b) {
	  return a ^ b + 0x9E3779B9 + (a << 6) + (a >> 2) | 0;
	}
	function mixin(ctor, methods) {
	  var proto = ctor.prototype;
	  var keyCopier = (function(key) {
	    proto[key] = methods[key];
	  });
	  Object.keys(methods).forEach(keyCopier);
	  Object.getOwnPropertySymbols && Object.getOwnPropertySymbols(methods).forEach(keyCopier);
	  return ctor;
	}
	var Seq = function Seq(value) {
	  return value === null || value === undefined ? emptySequence() : isIterable(value) ? value.toSeq() : seqFromValue(value);
	};
	var $Seq = Seq;
	($traceurRuntime.createClass)(Seq, {
	  toSeq: function() {
	    return this;
	  },
	  toString: function() {
	    return this.__toString('Seq {', '}');
	  },
	  cacheResult: function() {
	    if (!this._cache && this.__iterateUncached) {
	      this._cache = this.entrySeq().toArray();
	      this.size = this._cache.length;
	    }
	    return this;
	  },
	  __iterate: function(fn, reverse) {
	    return seqIterate(this, fn, reverse, true);
	  },
	  __iterator: function(type, reverse) {
	    return seqIterator(this, type, reverse, true);
	  }
	}, {of: function() {
	    return $Seq(arguments);
	  }}, Iterable);
	var KeyedSeq = function KeyedSeq(value) {
	  return value === null || value === undefined ? emptySequence().toKeyedSeq() : isIterable(value) ? (isKeyed(value) ? value.toSeq() : value.fromEntrySeq()) : keyedSeqFromValue(value);
	};
	var $KeyedSeq = KeyedSeq;
	($traceurRuntime.createClass)(KeyedSeq, {
	  toKeyedSeq: function() {
	    return this;
	  },
	  toSeq: function() {
	    return this;
	  }
	}, {of: function() {
	    return $KeyedSeq(arguments);
	  }}, Seq);
	mixin(KeyedSeq, KeyedIterable.prototype);
	var IndexedSeq = function IndexedSeq(value) {
	  return value === null || value === undefined ? emptySequence() : !isIterable(value) ? indexedSeqFromValue(value) : isKeyed(value) ? value.entrySeq() : value.toIndexedSeq();
	};
	var $IndexedSeq = IndexedSeq;
	($traceurRuntime.createClass)(IndexedSeq, {
	  toIndexedSeq: function() {
	    return this;
	  },
	  toString: function() {
	    return this.__toString('Seq [', ']');
	  },
	  __iterate: function(fn, reverse) {
	    return seqIterate(this, fn, reverse, false);
	  },
	  __iterator: function(type, reverse) {
	    return seqIterator(this, type, reverse, false);
	  }
	}, {of: function() {
	    return $IndexedSeq(arguments);
	  }}, Seq);
	mixin(IndexedSeq, IndexedIterable.prototype);
	var SetSeq = function SetSeq(value) {
	  return (value === null || value === undefined ? emptySequence() : !isIterable(value) ? indexedSeqFromValue(value) : isKeyed(value) ? value.entrySeq() : value).toSetSeq();
	};
	var $SetSeq = SetSeq;
	($traceurRuntime.createClass)(SetSeq, {toSetSeq: function() {
	    return this;
	  }}, {of: function() {
	    return $SetSeq(arguments);
	  }}, Seq);
	mixin(SetSeq, SetIterable.prototype);
	Seq.isSeq = isSeq;
	Seq.Keyed = KeyedSeq;
	Seq.Set = SetSeq;
	Seq.Indexed = IndexedSeq;
	var IS_SEQ_SENTINEL = '@@__IMMUTABLE_SEQ__@@';
	Seq.prototype[IS_SEQ_SENTINEL] = true;
	var ArraySeq = function ArraySeq(array) {
	  this._array = array;
	  this.size = array.length;
	};
	($traceurRuntime.createClass)(ArraySeq, {
	  get: function(index, notSetValue) {
	    return this.has(index) ? this._array[wrapIndex(this, index)] : notSetValue;
	  },
	  __iterate: function(fn, reverse) {
	    var array = this._array;
	    var maxIndex = array.length - 1;
	    for (var ii = 0; ii <= maxIndex; ii++) {
	      if (fn(array[reverse ? maxIndex - ii : ii], ii, this) === false) {
	        return ii + 1;
	      }
	    }
	    return ii;
	  },
	  __iterator: function(type, reverse) {
	    var array = this._array;
	    var maxIndex = array.length - 1;
	    var ii = 0;
	    return new Iterator((function() {
	      return ii > maxIndex ? iteratorDone() : iteratorValue(type, ii, array[reverse ? maxIndex - ii++ : ii++]);
	    }));
	  }
	}, {}, IndexedSeq);
	var ObjectSeq = function ObjectSeq(object) {
	  var keys = Object.keys(object);
	  this._object = object;
	  this._keys = keys;
	  this.size = keys.length;
	};
	($traceurRuntime.createClass)(ObjectSeq, {
	  get: function(key, notSetValue) {
	    if (notSetValue !== undefined && !this.has(key)) {
	      return notSetValue;
	    }
	    return this._object[key];
	  },
	  has: function(key) {
	    return this._object.hasOwnProperty(key);
	  },
	  __iterate: function(fn, reverse) {
	    var object = this._object;
	    var keys = this._keys;
	    var maxIndex = keys.length - 1;
	    for (var ii = 0; ii <= maxIndex; ii++) {
	      var key = keys[reverse ? maxIndex - ii : ii];
	      if (fn(object[key], key, this) === false) {
	        return ii + 1;
	      }
	    }
	    return ii;
	  },
	  __iterator: function(type, reverse) {
	    var object = this._object;
	    var keys = this._keys;
	    var maxIndex = keys.length - 1;
	    var ii = 0;
	    return new Iterator((function() {
	      var key = keys[reverse ? maxIndex - ii : ii];
	      return ii++ > maxIndex ? iteratorDone() : iteratorValue(type, key, object[key]);
	    }));
	  }
	}, {}, KeyedSeq);
	ObjectSeq.prototype[IS_ORDERED_SENTINEL] = true;
	var IterableSeq = function IterableSeq(iterable) {
	  this._iterable = iterable;
	  this.size = iterable.length || iterable.size;
	};
	($traceurRuntime.createClass)(IterableSeq, {
	  __iterateUncached: function(fn, reverse) {
	    if (reverse) {
	      return this.cacheResult().__iterate(fn, reverse);
	    }
	    var iterable = this._iterable;
	    var iterator = getIterator(iterable);
	    var iterations = 0;
	    if (isIterator(iterator)) {
	      var step;
	      while (!(step = iterator.next()).done) {
	        if (fn(step.value, iterations++, this) === false) {
	          break;
	        }
	      }
	    }
	    return iterations;
	  },
	  __iteratorUncached: function(type, reverse) {
	    if (reverse) {
	      return this.cacheResult().__iterator(type, reverse);
	    }
	    var iterable = this._iterable;
	    var iterator = getIterator(iterable);
	    if (!isIterator(iterator)) {
	      return new Iterator(iteratorDone);
	    }
	    var iterations = 0;
	    return new Iterator((function() {
	      var step = iterator.next();
	      return step.done ? step : iteratorValue(type, iterations++, step.value);
	    }));
	  }
	}, {}, IndexedSeq);
	var IteratorSeq = function IteratorSeq(iterator) {
	  this._iterator = iterator;
	  this._iteratorCache = [];
	};
	($traceurRuntime.createClass)(IteratorSeq, {
	  __iterateUncached: function(fn, reverse) {
	    if (reverse) {
	      return this.cacheResult().__iterate(fn, reverse);
	    }
	    var iterator = this._iterator;
	    var cache = this._iteratorCache;
	    var iterations = 0;
	    while (iterations < cache.length) {
	      if (fn(cache[iterations], iterations++, this) === false) {
	        return iterations;
	      }
	    }
	    var step;
	    while (!(step = iterator.next()).done) {
	      var val = step.value;
	      cache[iterations] = val;
	      if (fn(val, iterations++, this) === false) {
	        break;
	      }
	    }
	    return iterations;
	  },
	  __iteratorUncached: function(type, reverse) {
	    if (reverse) {
	      return this.cacheResult().__iterator(type, reverse);
	    }
	    var iterator = this._iterator;
	    var cache = this._iteratorCache;
	    var iterations = 0;
	    return new Iterator((function() {
	      if (iterations >= cache.length) {
	        var step = iterator.next();
	        if (step.done) {
	          return step;
	        }
	        cache[iterations] = step.value;
	      }
	      return iteratorValue(type, iterations, cache[iterations++]);
	    }));
	  }
	}, {}, IndexedSeq);
	function isSeq(maybeSeq) {
	  return !!(maybeSeq && maybeSeq[IS_SEQ_SENTINEL]);
	}
	var EMPTY_SEQ;
	function emptySequence() {
	  return EMPTY_SEQ || (EMPTY_SEQ = new ArraySeq([]));
	}
	function keyedSeqFromValue(value) {
	  var seq = Array.isArray(value) ? new ArraySeq(value).fromEntrySeq() : isIterator(value) ? new IteratorSeq(value).fromEntrySeq() : hasIterator(value) ? new IterableSeq(value).fromEntrySeq() : typeof value === 'object' ? new ObjectSeq(value) : undefined;
	  if (!seq) {
	    throw new TypeError('Expected Array or iterable object of [k, v] entries, ' + 'or keyed object: ' + value);
	  }
	  return seq;
	}
	function indexedSeqFromValue(value) {
	  var seq = maybeIndexedSeqFromValue(value);
	  if (!seq) {
	    throw new TypeError('Expected Array or iterable object of values: ' + value);
	  }
	  return seq;
	}
	function seqFromValue(value) {
	  var seq = maybeIndexedSeqFromValue(value) || (typeof value === 'object' && new ObjectSeq(value));
	  if (!seq) {
	    throw new TypeError('Expected Array or iterable object of values, or keyed object: ' + value);
	  }
	  return seq;
	}
	function maybeIndexedSeqFromValue(value) {
	  return (isArrayLike(value) ? new ArraySeq(value) : isIterator(value) ? new IteratorSeq(value) : hasIterator(value) ? new IterableSeq(value) : undefined);
	}
	function isArrayLike(value) {
	  return value && typeof value.length === 'number';
	}
	function seqIterate(seq, fn, reverse, useKeys) {
	  var cache = seq._cache;
	  if (cache) {
	    var maxIndex = cache.length - 1;
	    for (var ii = 0; ii <= maxIndex; ii++) {
	      var entry = cache[reverse ? maxIndex - ii : ii];
	      if (fn(entry[1], useKeys ? entry[0] : ii, seq) === false) {
	        return ii + 1;
	      }
	    }
	    return ii;
	  }
	  return seq.__iterateUncached(fn, reverse);
	}
	function seqIterator(seq, type, reverse, useKeys) {
	  var cache = seq._cache;
	  if (cache) {
	    var maxIndex = cache.length - 1;
	    var ii = 0;
	    return new Iterator((function() {
	      var entry = cache[reverse ? maxIndex - ii : ii];
	      return ii++ > maxIndex ? iteratorDone() : iteratorValue(type, useKeys ? entry[0] : ii - 1, entry[1]);
	    }));
	  }
	  return seq.__iteratorUncached(type, reverse);
	}
	function fromJS(json, converter) {
	  return converter ? _fromJSWith(converter, json, '', {'': json}) : _fromJSDefault(json);
	}
	function _fromJSWith(converter, json, key, parentJSON) {
	  if (Array.isArray(json)) {
	    return converter.call(parentJSON, key, IndexedSeq(json).map((function(v, k) {
	      return _fromJSWith(converter, v, k, json);
	    })));
	  }
	  if (isPlainObj(json)) {
	    return converter.call(parentJSON, key, KeyedSeq(json).map((function(v, k) {
	      return _fromJSWith(converter, v, k, json);
	    })));
	  }
	  return json;
	}
	function _fromJSDefault(json) {
	  if (Array.isArray(json)) {
	    return IndexedSeq(json).map(_fromJSDefault).toList();
	  }
	  if (isPlainObj(json)) {
	    return KeyedSeq(json).map(_fromJSDefault).toMap();
	  }
	  return json;
	}
	function isPlainObj(value) {
	  return value && value.constructor === Object;
	}
	var Collection = function Collection() {
	  throw TypeError('Abstract');
	};
	($traceurRuntime.createClass)(Collection, {}, {}, Iterable);
	var KeyedCollection = function KeyedCollection() {
	  $traceurRuntime.defaultSuperCall(this, $KeyedCollection.prototype, arguments);
	};
	var $KeyedCollection = KeyedCollection;
	($traceurRuntime.createClass)(KeyedCollection, {}, {}, Collection);
	mixin(KeyedCollection, KeyedIterable.prototype);
	var IndexedCollection = function IndexedCollection() {
	  $traceurRuntime.defaultSuperCall(this, $IndexedCollection.prototype, arguments);
	};
	var $IndexedCollection = IndexedCollection;
	($traceurRuntime.createClass)(IndexedCollection, {}, {}, Collection);
	mixin(IndexedCollection, IndexedIterable.prototype);
	var SetCollection = function SetCollection() {
	  $traceurRuntime.defaultSuperCall(this, $SetCollection.prototype, arguments);
	};
	var $SetCollection = SetCollection;
	($traceurRuntime.createClass)(SetCollection, {}, {}, Collection);
	mixin(SetCollection, SetIterable.prototype);
	Collection.Keyed = KeyedCollection;
	Collection.Indexed = IndexedCollection;
	Collection.Set = SetCollection;
	var Map = function Map(value) {
	  return value === null || value === undefined ? emptyMap() : isMap(value) ? value : emptyMap().withMutations((function(map) {
	    var iter = KeyedIterable(value);
	    assertNotInfinite(iter.size);
	    iter.forEach((function(v, k) {
	      return map.set(k, v);
	    }));
	  }));
	};
	($traceurRuntime.createClass)(Map, {
	  toString: function() {
	    return this.__toString('Map {', '}');
	  },
	  get: function(k, notSetValue) {
	    return this._root ? this._root.get(0, undefined, k, notSetValue) : notSetValue;
	  },
	  set: function(k, v) {
	    return updateMap(this, k, v);
	  },
	  setIn: function(keyPath, v) {
	    return this.updateIn(keyPath, NOT_SET, (function() {
	      return v;
	    }));
	  },
	  remove: function(k) {
	    return updateMap(this, k, NOT_SET);
	  },
	  removeIn: function(keyPath) {
	    return this.updateIn(keyPath, (function() {
	      return NOT_SET;
	    }));
	  },
	  update: function(k, notSetValue, updater) {
	    return arguments.length === 1 ? k(this) : this.updateIn([k], notSetValue, updater);
	  },
	  updateIn: function(keyPath, notSetValue, updater) {
	    if (!updater) {
	      updater = notSetValue;
	      notSetValue = undefined;
	    }
	    var updatedValue = updateInDeepMap(this, getIterator(keyPath) || getIterator(Iterable(keyPath)), notSetValue, updater);
	    return updatedValue === NOT_SET ? undefined : updatedValue;
	  },
	  clear: function() {
	    if (this.size === 0) {
	      return this;
	    }
	    if (this.__ownerID) {
	      this.size = 0;
	      this._root = null;
	      this.__hash = undefined;
	      this.__altered = true;
	      return this;
	    }
	    return emptyMap();
	  },
	  merge: function() {
	    return mergeIntoMapWith(this, undefined, arguments);
	  },
	  mergeWith: function(merger) {
	    for (var iters = [],
	        $__3 = 1; $__3 < arguments.length; $__3++)
	      iters[$__3 - 1] = arguments[$__3];
	    return mergeIntoMapWith(this, merger, iters);
	  },
	  mergeIn: function(keyPath) {
	    for (var iters = [],
	        $__4 = 1; $__4 < arguments.length; $__4++)
	      iters[$__4 - 1] = arguments[$__4];
	    return this.updateIn(keyPath, emptyMap(), (function(m) {
	      return m.merge.apply(m, iters);
	    }));
	  },
	  mergeDeep: function() {
	    return mergeIntoMapWith(this, deepMerger(undefined), arguments);
	  },
	  mergeDeepWith: function(merger) {
	    for (var iters = [],
	        $__5 = 1; $__5 < arguments.length; $__5++)
	      iters[$__5 - 1] = arguments[$__5];
	    return mergeIntoMapWith(this, deepMerger(merger), iters);
	  },
	  mergeDeepIn: function(keyPath) {
	    for (var iters = [],
	        $__6 = 1; $__6 < arguments.length; $__6++)
	      iters[$__6 - 1] = arguments[$__6];
	    return this.updateIn(keyPath, emptyMap(), (function(m) {
	      return m.mergeDeep.apply(m, iters);
	    }));
	  },
	  sort: function(comparator) {
	    return OrderedMap(sortFactory(this, comparator));
	  },
	  sortBy: function(mapper, comparator) {
	    return OrderedMap(sortFactory(this, comparator, mapper));
	  },
	  withMutations: function(fn) {
	    var mutable = this.asMutable();
	    fn(mutable);
	    return mutable.wasAltered() ? mutable.__ensureOwner(this.__ownerID) : this;
	  },
	  asMutable: function() {
	    return this.__ownerID ? this : this.__ensureOwner(new OwnerID());
	  },
	  asImmutable: function() {
	    return this.__ensureOwner();
	  },
	  wasAltered: function() {
	    return this.__altered;
	  },
	  __iterator: function(type, reverse) {
	    return new MapIterator(this, type, reverse);
	  },
	  __iterate: function(fn, reverse) {
	    var $__0 = this;
	    var iterations = 0;
	    this._root && this._root.iterate((function(entry) {
	      iterations++;
	      return fn(entry[1], entry[0], $__0);
	    }), reverse);
	    return iterations;
	  },
	  __ensureOwner: function(ownerID) {
	    if (ownerID === this.__ownerID) {
	      return this;
	    }
	    if (!ownerID) {
	      this.__ownerID = ownerID;
	      this.__altered = false;
	      return this;
	    }
	    return makeMap(this.size, this._root, ownerID, this.__hash);
	  }
	}, {}, KeyedCollection);
	function isMap(maybeMap) {
	  return !!(maybeMap && maybeMap[IS_MAP_SENTINEL]);
	}
	Map.isMap = isMap;
	var IS_MAP_SENTINEL = '@@__IMMUTABLE_MAP__@@';
	var MapPrototype = Map.prototype;
	MapPrototype[IS_MAP_SENTINEL] = true;
	MapPrototype[DELETE] = MapPrototype.remove;
	var ArrayMapNode = function ArrayMapNode(ownerID, entries) {
	  this.ownerID = ownerID;
	  this.entries = entries;
	};
	var $ArrayMapNode = ArrayMapNode;
	($traceurRuntime.createClass)(ArrayMapNode, {
	  get: function(shift, keyHash, key, notSetValue) {
	    var entries = this.entries;
	    for (var ii = 0,
	        len = entries.length; ii < len; ii++) {
	      if (is(key, entries[ii][0])) {
	        return entries[ii][1];
	      }
	    }
	    return notSetValue;
	  },
	  update: function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
	    var removed = value === NOT_SET;
	    var entries = this.entries;
	    var idx = 0;
	    for (var len = entries.length; idx < len; idx++) {
	      if (is(key, entries[idx][0])) {
	        break;
	      }
	    }
	    var exists = idx < len;
	    if (exists ? entries[idx][1] === value : removed) {
	      return this;
	    }
	    SetRef(didAlter);
	    (removed || !exists) && SetRef(didChangeSize);
	    if (removed && entries.length === 1) {
	      return;
	    }
	    if (!exists && !removed && entries.length >= MAX_ARRAY_MAP_SIZE) {
	      return createNodes(ownerID, entries, key, value);
	    }
	    var isEditable = ownerID && ownerID === this.ownerID;
	    var newEntries = isEditable ? entries : arrCopy(entries);
	    if (exists) {
	      if (removed) {
	        idx === len - 1 ? newEntries.pop() : (newEntries[idx] = newEntries.pop());
	      } else {
	        newEntries[idx] = [key, value];
	      }
	    } else {
	      newEntries.push([key, value]);
	    }
	    if (isEditable) {
	      this.entries = newEntries;
	      return this;
	    }
	    return new $ArrayMapNode(ownerID, newEntries);
	  }
	}, {});
	var BitmapIndexedNode = function BitmapIndexedNode(ownerID, bitmap, nodes) {
	  this.ownerID = ownerID;
	  this.bitmap = bitmap;
	  this.nodes = nodes;
	};
	var $BitmapIndexedNode = BitmapIndexedNode;
	($traceurRuntime.createClass)(BitmapIndexedNode, {
	  get: function(shift, keyHash, key, notSetValue) {
	    if (keyHash === undefined) {
	      keyHash = hash(key);
	    }
	    var bit = (1 << ((shift === 0 ? keyHash : keyHash >>> shift) & MASK));
	    var bitmap = this.bitmap;
	    return (bitmap & bit) === 0 ? notSetValue : this.nodes[popCount(bitmap & (bit - 1))].get(shift + SHIFT, keyHash, key, notSetValue);
	  },
	  update: function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
	    if (keyHash === undefined) {
	      keyHash = hash(key);
	    }
	    var keyHashFrag = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
	    var bit = 1 << keyHashFrag;
	    var bitmap = this.bitmap;
	    var exists = (bitmap & bit) !== 0;
	    if (!exists && value === NOT_SET) {
	      return this;
	    }
	    var idx = popCount(bitmap & (bit - 1));
	    var nodes = this.nodes;
	    var node = exists ? nodes[idx] : undefined;
	    var newNode = updateNode(node, ownerID, shift + SHIFT, keyHash, key, value, didChangeSize, didAlter);
	    if (newNode === node) {
	      return this;
	    }
	    if (!exists && newNode && nodes.length >= MAX_BITMAP_INDEXED_SIZE) {
	      return expandNodes(ownerID, nodes, bitmap, keyHashFrag, newNode);
	    }
	    if (exists && !newNode && nodes.length === 2 && isLeafNode(nodes[idx ^ 1])) {
	      return nodes[idx ^ 1];
	    }
	    if (exists && newNode && nodes.length === 1 && isLeafNode(newNode)) {
	      return newNode;
	    }
	    var isEditable = ownerID && ownerID === this.ownerID;
	    var newBitmap = exists ? newNode ? bitmap : bitmap ^ bit : bitmap | bit;
	    var newNodes = exists ? newNode ? setIn(nodes, idx, newNode, isEditable) : spliceOut(nodes, idx, isEditable) : spliceIn(nodes, idx, newNode, isEditable);
	    if (isEditable) {
	      this.bitmap = newBitmap;
	      this.nodes = newNodes;
	      return this;
	    }
	    return new $BitmapIndexedNode(ownerID, newBitmap, newNodes);
	  }
	}, {});
	var HashArrayMapNode = function HashArrayMapNode(ownerID, count, nodes) {
	  this.ownerID = ownerID;
	  this.count = count;
	  this.nodes = nodes;
	};
	var $HashArrayMapNode = HashArrayMapNode;
	($traceurRuntime.createClass)(HashArrayMapNode, {
	  get: function(shift, keyHash, key, notSetValue) {
	    if (keyHash === undefined) {
	      keyHash = hash(key);
	    }
	    var idx = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
	    var node = this.nodes[idx];
	    return node ? node.get(shift + SHIFT, keyHash, key, notSetValue) : notSetValue;
	  },
	  update: function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
	    if (keyHash === undefined) {
	      keyHash = hash(key);
	    }
	    var idx = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
	    var removed = value === NOT_SET;
	    var nodes = this.nodes;
	    var node = nodes[idx];
	    if (removed && !node) {
	      return this;
	    }
	    var newNode = updateNode(node, ownerID, shift + SHIFT, keyHash, key, value, didChangeSize, didAlter);
	    if (newNode === node) {
	      return this;
	    }
	    var newCount = this.count;
	    if (!node) {
	      newCount++;
	    } else if (!newNode) {
	      newCount--;
	      if (newCount < MIN_HASH_ARRAY_MAP_SIZE) {
	        return packNodes(ownerID, nodes, newCount, idx);
	      }
	    }
	    var isEditable = ownerID && ownerID === this.ownerID;
	    var newNodes = setIn(nodes, idx, newNode, isEditable);
	    if (isEditable) {
	      this.count = newCount;
	      this.nodes = newNodes;
	      return this;
	    }
	    return new $HashArrayMapNode(ownerID, newCount, newNodes);
	  }
	}, {});
	var HashCollisionNode = function HashCollisionNode(ownerID, keyHash, entries) {
	  this.ownerID = ownerID;
	  this.keyHash = keyHash;
	  this.entries = entries;
	};
	var $HashCollisionNode = HashCollisionNode;
	($traceurRuntime.createClass)(HashCollisionNode, {
	  get: function(shift, keyHash, key, notSetValue) {
	    var entries = this.entries;
	    for (var ii = 0,
	        len = entries.length; ii < len; ii++) {
	      if (is(key, entries[ii][0])) {
	        return entries[ii][1];
	      }
	    }
	    return notSetValue;
	  },
	  update: function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
	    if (keyHash === undefined) {
	      keyHash = hash(key);
	    }
	    var removed = value === NOT_SET;
	    if (keyHash !== this.keyHash) {
	      if (removed) {
	        return this;
	      }
	      SetRef(didAlter);
	      SetRef(didChangeSize);
	      return mergeIntoNode(this, ownerID, shift, keyHash, [key, value]);
	    }
	    var entries = this.entries;
	    var idx = 0;
	    for (var len = entries.length; idx < len; idx++) {
	      if (is(key, entries[idx][0])) {
	        break;
	      }
	    }
	    var exists = idx < len;
	    if (exists ? entries[idx][1] === value : removed) {
	      return this;
	    }
	    SetRef(didAlter);
	    (removed || !exists) && SetRef(didChangeSize);
	    if (removed && len === 2) {
	      return new ValueNode(ownerID, this.keyHash, entries[idx ^ 1]);
	    }
	    var isEditable = ownerID && ownerID === this.ownerID;
	    var newEntries = isEditable ? entries : arrCopy(entries);
	    if (exists) {
	      if (removed) {
	        idx === len - 1 ? newEntries.pop() : (newEntries[idx] = newEntries.pop());
	      } else {
	        newEntries[idx] = [key, value];
	      }
	    } else {
	      newEntries.push([key, value]);
	    }
	    if (isEditable) {
	      this.entries = newEntries;
	      return this;
	    }
	    return new $HashCollisionNode(ownerID, this.keyHash, newEntries);
	  }
	}, {});
	var ValueNode = function ValueNode(ownerID, keyHash, entry) {
	  this.ownerID = ownerID;
	  this.keyHash = keyHash;
	  this.entry = entry;
	};
	var $ValueNode = ValueNode;
	($traceurRuntime.createClass)(ValueNode, {
	  get: function(shift, keyHash, key, notSetValue) {
	    return is(key, this.entry[0]) ? this.entry[1] : notSetValue;
	  },
	  update: function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
	    var removed = value === NOT_SET;
	    var keyMatch = is(key, this.entry[0]);
	    if (keyMatch ? value === this.entry[1] : removed) {
	      return this;
	    }
	    SetRef(didAlter);
	    if (removed) {
	      SetRef(didChangeSize);
	      return;
	    }
	    if (keyMatch) {
	      if (ownerID && ownerID === this.ownerID) {
	        this.entry[1] = value;
	        return this;
	      }
	      return new $ValueNode(ownerID, this.keyHash, [key, value]);
	    }
	    SetRef(didChangeSize);
	    return mergeIntoNode(this, ownerID, shift, hash(key), [key, value]);
	  }
	}, {});
	ArrayMapNode.prototype.iterate = HashCollisionNode.prototype.iterate = function(fn, reverse) {
	  var entries = this.entries;
	  for (var ii = 0,
	      maxIndex = entries.length - 1; ii <= maxIndex; ii++) {
	    if (fn(entries[reverse ? maxIndex - ii : ii]) === false) {
	      return false;
	    }
	  }
	};
	BitmapIndexedNode.prototype.iterate = HashArrayMapNode.prototype.iterate = function(fn, reverse) {
	  var nodes = this.nodes;
	  for (var ii = 0,
	      maxIndex = nodes.length - 1; ii <= maxIndex; ii++) {
	    var node = nodes[reverse ? maxIndex - ii : ii];
	    if (node && node.iterate(fn, reverse) === false) {
	      return false;
	    }
	  }
	};
	ValueNode.prototype.iterate = function(fn, reverse) {
	  return fn(this.entry);
	};
	var MapIterator = function MapIterator(map, type, reverse) {
	  this._type = type;
	  this._reverse = reverse;
	  this._stack = map._root && mapIteratorFrame(map._root);
	};
	($traceurRuntime.createClass)(MapIterator, {next: function() {
	    var type = this._type;
	    var stack = this._stack;
	    while (stack) {
	      var node = stack.node;
	      var index = stack.index++;
	      var maxIndex;
	      if (node.entry) {
	        if (index === 0) {
	          return mapIteratorValue(type, node.entry);
	        }
	      } else if (node.entries) {
	        maxIndex = node.entries.length - 1;
	        if (index <= maxIndex) {
	          return mapIteratorValue(type, node.entries[this._reverse ? maxIndex - index : index]);
	        }
	      } else {
	        maxIndex = node.nodes.length - 1;
	        if (index <= maxIndex) {
	          var subNode = node.nodes[this._reverse ? maxIndex - index : index];
	          if (subNode) {
	            if (subNode.entry) {
	              return mapIteratorValue(type, subNode.entry);
	            }
	            stack = this._stack = mapIteratorFrame(subNode, stack);
	          }
	          continue;
	        }
	      }
	      stack = this._stack = this._stack.__prev;
	    }
	    return iteratorDone();
	  }}, {}, Iterator);
	function mapIteratorValue(type, entry) {
	  return iteratorValue(type, entry[0], entry[1]);
	}
	function mapIteratorFrame(node, prev) {
	  return {
	    node: node,
	    index: 0,
	    __prev: prev
	  };
	}
	function makeMap(size, root, ownerID, hash) {
	  var map = Object.create(MapPrototype);
	  map.size = size;
	  map._root = root;
	  map.__ownerID = ownerID;
	  map.__hash = hash;
	  map.__altered = false;
	  return map;
	}
	var EMPTY_MAP;
	function emptyMap() {
	  return EMPTY_MAP || (EMPTY_MAP = makeMap(0));
	}
	function updateMap(map, k, v) {
	  var newRoot;
	  var newSize;
	  if (!map._root) {
	    if (v === NOT_SET) {
	      return map;
	    }
	    newSize = 1;
	    newRoot = new ArrayMapNode(map.__ownerID, [[k, v]]);
	  } else {
	    var didChangeSize = MakeRef(CHANGE_LENGTH);
	    var didAlter = MakeRef(DID_ALTER);
	    newRoot = updateNode(map._root, map.__ownerID, 0, undefined, k, v, didChangeSize, didAlter);
	    if (!didAlter.value) {
	      return map;
	    }
	    newSize = map.size + (didChangeSize.value ? v === NOT_SET ? -1 : 1 : 0);
	  }
	  if (map.__ownerID) {
	    map.size = newSize;
	    map._root = newRoot;
	    map.__hash = undefined;
	    map.__altered = true;
	    return map;
	  }
	  return newRoot ? makeMap(newSize, newRoot) : emptyMap();
	}
	function updateNode(node, ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
	  if (!node) {
	    if (value === NOT_SET) {
	      return node;
	    }
	    SetRef(didAlter);
	    SetRef(didChangeSize);
	    return new ValueNode(ownerID, keyHash, [key, value]);
	  }
	  return node.update(ownerID, shift, keyHash, key, value, didChangeSize, didAlter);
	}
	function isLeafNode(node) {
	  return node.constructor === ValueNode || node.constructor === HashCollisionNode;
	}
	function mergeIntoNode(node, ownerID, shift, keyHash, entry) {
	  if (node.keyHash === keyHash) {
	    return new HashCollisionNode(ownerID, keyHash, [node.entry, entry]);
	  }
	  var idx1 = (shift === 0 ? node.keyHash : node.keyHash >>> shift) & MASK;
	  var idx2 = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
	  var newNode;
	  var nodes = idx1 === idx2 ? [mergeIntoNode(node, ownerID, shift + SHIFT, keyHash, entry)] : ((newNode = new ValueNode(ownerID, keyHash, entry)), idx1 < idx2 ? [node, newNode] : [newNode, node]);
	  return new BitmapIndexedNode(ownerID, (1 << idx1) | (1 << idx2), nodes);
	}
	function createNodes(ownerID, entries, key, value) {
	  if (!ownerID) {
	    ownerID = new OwnerID();
	  }
	  var node = new ValueNode(ownerID, hash(key), [key, value]);
	  for (var ii = 0; ii < entries.length; ii++) {
	    var entry = entries[ii];
	    node = node.update(ownerID, 0, undefined, entry[0], entry[1]);
	  }
	  return node;
	}
	function packNodes(ownerID, nodes, count, excluding) {
	  var bitmap = 0;
	  var packedII = 0;
	  var packedNodes = new Array(count);
	  for (var ii = 0,
	      bit = 1,
	      len = nodes.length; ii < len; ii++, bit <<= 1) {
	    var node = nodes[ii];
	    if (node !== undefined && ii !== excluding) {
	      bitmap |= bit;
	      packedNodes[packedII++] = node;
	    }
	  }
	  return new BitmapIndexedNode(ownerID, bitmap, packedNodes);
	}
	function expandNodes(ownerID, nodes, bitmap, including, node) {
	  var count = 0;
	  var expandedNodes = new Array(SIZE);
	  for (var ii = 0; bitmap !== 0; ii++, bitmap >>>= 1) {
	    expandedNodes[ii] = bitmap & 1 ? nodes[count++] : undefined;
	  }
	  expandedNodes[including] = node;
	  return new HashArrayMapNode(ownerID, count + 1, expandedNodes);
	}
	function mergeIntoMapWith(map, merger, iterables) {
	  var iters = [];
	  for (var ii = 0; ii < iterables.length; ii++) {
	    var value = iterables[ii];
	    var iter = KeyedIterable(value);
	    if (!isIterable(value)) {
	      iter = iter.map((function(v) {
	        return fromJS(v);
	      }));
	    }
	    iters.push(iter);
	  }
	  return mergeIntoCollectionWith(map, merger, iters);
	}
	function deepMerger(merger) {
	  return (function(existing, value) {
	    return existing && existing.mergeDeepWith && isIterable(value) ? existing.mergeDeepWith(merger, value) : merger ? merger(existing, value) : value;
	  });
	}
	function mergeIntoCollectionWith(collection, merger, iters) {
	  iters = iters.filter((function(x) {
	    return x.size !== 0;
	  }));
	  if (iters.length === 0) {
	    return collection;
	  }
	  if (collection.size === 0 && iters.length === 1) {
	    return collection.constructor(iters[0]);
	  }
	  return collection.withMutations((function(collection) {
	    var mergeIntoMap = merger ? (function(value, key) {
	      collection.update(key, NOT_SET, (function(existing) {
	        return existing === NOT_SET ? value : merger(existing, value);
	      }));
	    }) : (function(value, key) {
	      collection.set(key, value);
	    });
	    for (var ii = 0; ii < iters.length; ii++) {
	      iters[ii].forEach(mergeIntoMap);
	    }
	  }));
	}
	function updateInDeepMap(existing, keyPathIter, notSetValue, updater) {
	  var isNotSet = existing === NOT_SET;
	  var step = keyPathIter.next();
	  if (step.done) {
	    var existingValue = isNotSet ? notSetValue : existing;
	    var newValue = updater(existingValue);
	    return newValue === existingValue ? existing : newValue;
	  }
	  invariant(isNotSet || (existing && existing.set), 'invalid keyPath');
	  var key = step.value;
	  var nextExisting = isNotSet ? NOT_SET : existing.get(key, NOT_SET);
	  var nextUpdated = updateInDeepMap(nextExisting, keyPathIter, notSetValue, updater);
	  return nextUpdated === nextExisting ? existing : nextUpdated === NOT_SET ? existing.remove(key) : (isNotSet ? emptyMap() : existing).set(key, nextUpdated);
	}
	function popCount(x) {
	  x = x - ((x >> 1) & 0x55555555);
	  x = (x & 0x33333333) + ((x >> 2) & 0x33333333);
	  x = (x + (x >> 4)) & 0x0f0f0f0f;
	  x = x + (x >> 8);
	  x = x + (x >> 16);
	  return x & 0x7f;
	}
	function setIn(array, idx, val, canEdit) {
	  var newArray = canEdit ? array : arrCopy(array);
	  newArray[idx] = val;
	  return newArray;
	}
	function spliceIn(array, idx, val, canEdit) {
	  var newLen = array.length + 1;
	  if (canEdit && idx + 1 === newLen) {
	    array[idx] = val;
	    return array;
	  }
	  var newArray = new Array(newLen);
	  var after = 0;
	  for (var ii = 0; ii < newLen; ii++) {
	    if (ii === idx) {
	      newArray[ii] = val;
	      after = -1;
	    } else {
	      newArray[ii] = array[ii + after];
	    }
	  }
	  return newArray;
	}
	function spliceOut(array, idx, canEdit) {
	  var newLen = array.length - 1;
	  if (canEdit && idx === newLen) {
	    array.pop();
	    return array;
	  }
	  var newArray = new Array(newLen);
	  var after = 0;
	  for (var ii = 0; ii < newLen; ii++) {
	    if (ii === idx) {
	      after = 1;
	    }
	    newArray[ii] = array[ii + after];
	  }
	  return newArray;
	}
	var MAX_ARRAY_MAP_SIZE = SIZE / 4;
	var MAX_BITMAP_INDEXED_SIZE = SIZE / 2;
	var MIN_HASH_ARRAY_MAP_SIZE = SIZE / 4;
	var ToKeyedSequence = function ToKeyedSequence(indexed, useKeys) {
	  this._iter = indexed;
	  this._useKeys = useKeys;
	  this.size = indexed.size;
	};
	($traceurRuntime.createClass)(ToKeyedSequence, {
	  get: function(key, notSetValue) {
	    return this._iter.get(key, notSetValue);
	  },
	  has: function(key) {
	    return this._iter.has(key);
	  },
	  valueSeq: function() {
	    return this._iter.valueSeq();
	  },
	  reverse: function() {
	    var $__0 = this;
	    var reversedSequence = reverseFactory(this, true);
	    if (!this._useKeys) {
	      reversedSequence.valueSeq = (function() {
	        return $__0._iter.toSeq().reverse();
	      });
	    }
	    return reversedSequence;
	  },
	  map: function(mapper, context) {
	    var $__0 = this;
	    var mappedSequence = mapFactory(this, mapper, context);
	    if (!this._useKeys) {
	      mappedSequence.valueSeq = (function() {
	        return $__0._iter.toSeq().map(mapper, context);
	      });
	    }
	    return mappedSequence;
	  },
	  __iterate: function(fn, reverse) {
	    var $__0 = this;
	    var ii;
	    return this._iter.__iterate(this._useKeys ? (function(v, k) {
	      return fn(v, k, $__0);
	    }) : ((ii = reverse ? resolveSize(this) : 0), (function(v) {
	      return fn(v, reverse ? --ii : ii++, $__0);
	    })), reverse);
	  },
	  __iterator: function(type, reverse) {
	    if (this._useKeys) {
	      return this._iter.__iterator(type, reverse);
	    }
	    var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
	    var ii = reverse ? resolveSize(this) : 0;
	    return new Iterator((function() {
	      var step = iterator.next();
	      return step.done ? step : iteratorValue(type, reverse ? --ii : ii++, step.value, step);
	    }));
	  }
	}, {}, KeyedSeq);
	ToKeyedSequence.prototype[IS_ORDERED_SENTINEL] = true;
	var ToIndexedSequence = function ToIndexedSequence(iter) {
	  this._iter = iter;
	  this.size = iter.size;
	};
	($traceurRuntime.createClass)(ToIndexedSequence, {
	  contains: function(value) {
	    return this._iter.contains(value);
	  },
	  __iterate: function(fn, reverse) {
	    var $__0 = this;
	    var iterations = 0;
	    return this._iter.__iterate((function(v) {
	      return fn(v, iterations++, $__0);
	    }), reverse);
	  },
	  __iterator: function(type, reverse) {
	    var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
	    var iterations = 0;
	    return new Iterator((function() {
	      var step = iterator.next();
	      return step.done ? step : iteratorValue(type, iterations++, step.value, step);
	    }));
	  }
	}, {}, IndexedSeq);
	var ToSetSequence = function ToSetSequence(iter) {
	  this._iter = iter;
	  this.size = iter.size;
	};
	($traceurRuntime.createClass)(ToSetSequence, {
	  has: function(key) {
	    return this._iter.contains(key);
	  },
	  __iterate: function(fn, reverse) {
	    var $__0 = this;
	    return this._iter.__iterate((function(v) {
	      return fn(v, v, $__0);
	    }), reverse);
	  },
	  __iterator: function(type, reverse) {
	    var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
	    return new Iterator((function() {
	      var step = iterator.next();
	      return step.done ? step : iteratorValue(type, step.value, step.value, step);
	    }));
	  }
	}, {}, SetSeq);
	var FromEntriesSequence = function FromEntriesSequence(entries) {
	  this._iter = entries;
	  this.size = entries.size;
	};
	($traceurRuntime.createClass)(FromEntriesSequence, {
	  entrySeq: function() {
	    return this._iter.toSeq();
	  },
	  __iterate: function(fn, reverse) {
	    var $__0 = this;
	    return this._iter.__iterate((function(entry) {
	      if (entry) {
	        validateEntry(entry);
	        return fn(entry[1], entry[0], $__0);
	      }
	    }), reverse);
	  },
	  __iterator: function(type, reverse) {
	    var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
	    return new Iterator((function() {
	      while (true) {
	        var step = iterator.next();
	        if (step.done) {
	          return step;
	        }
	        var entry = step.value;
	        if (entry) {
	          validateEntry(entry);
	          return type === ITERATE_ENTRIES ? step : iteratorValue(type, entry[0], entry[1], step);
	        }
	      }
	    }));
	  }
	}, {}, KeyedSeq);
	ToIndexedSequence.prototype.cacheResult = ToKeyedSequence.prototype.cacheResult = ToSetSequence.prototype.cacheResult = FromEntriesSequence.prototype.cacheResult = cacheResultThrough;
	function flipFactory(iterable) {
	  var flipSequence = makeSequence(iterable);
	  flipSequence._iter = iterable;
	  flipSequence.size = iterable.size;
	  flipSequence.flip = (function() {
	    return iterable;
	  });
	  flipSequence.reverse = function() {
	    var reversedSequence = iterable.reverse.apply(this);
	    reversedSequence.flip = (function() {
	      return iterable.reverse();
	    });
	    return reversedSequence;
	  };
	  flipSequence.has = (function(key) {
	    return iterable.contains(key);
	  });
	  flipSequence.contains = (function(key) {
	    return iterable.has(key);
	  });
	  flipSequence.cacheResult = cacheResultThrough;
	  flipSequence.__iterateUncached = function(fn, reverse) {
	    var $__0 = this;
	    return iterable.__iterate((function(v, k) {
	      return fn(k, v, $__0) !== false;
	    }), reverse);
	  };
	  flipSequence.__iteratorUncached = function(type, reverse) {
	    if (type === ITERATE_ENTRIES) {
	      var iterator = iterable.__iterator(type, reverse);
	      return new Iterator((function() {
	        var step = iterator.next();
	        if (!step.done) {
	          var k = step.value[0];
	          step.value[0] = step.value[1];
	          step.value[1] = k;
	        }
	        return step;
	      }));
	    }
	    return iterable.__iterator(type === ITERATE_VALUES ? ITERATE_KEYS : ITERATE_VALUES, reverse);
	  };
	  return flipSequence;
	}
	function mapFactory(iterable, mapper, context) {
	  var mappedSequence = makeSequence(iterable);
	  mappedSequence.size = iterable.size;
	  mappedSequence.has = (function(key) {
	    return iterable.has(key);
	  });
	  mappedSequence.get = (function(key, notSetValue) {
	    var v = iterable.get(key, NOT_SET);
	    return v === NOT_SET ? notSetValue : mapper.call(context, v, key, iterable);
	  });
	  mappedSequence.__iterateUncached = function(fn, reverse) {
	    var $__0 = this;
	    return iterable.__iterate((function(v, k, c) {
	      return fn(mapper.call(context, v, k, c), k, $__0) !== false;
	    }), reverse);
	  };
	  mappedSequence.__iteratorUncached = function(type, reverse) {
	    var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
	    return new Iterator((function() {
	      var step = iterator.next();
	      if (step.done) {
	        return step;
	      }
	      var entry = step.value;
	      var key = entry[0];
	      return iteratorValue(type, key, mapper.call(context, entry[1], key, iterable), step);
	    }));
	  };
	  return mappedSequence;
	}
	function reverseFactory(iterable, useKeys) {
	  var reversedSequence = makeSequence(iterable);
	  reversedSequence._iter = iterable;
	  reversedSequence.size = iterable.size;
	  reversedSequence.reverse = (function() {
	    return iterable;
	  });
	  if (iterable.flip) {
	    reversedSequence.flip = function() {
	      var flipSequence = flipFactory(iterable);
	      flipSequence.reverse = (function() {
	        return iterable.flip();
	      });
	      return flipSequence;
	    };
	  }
	  reversedSequence.get = (function(key, notSetValue) {
	    return iterable.get(useKeys ? key : -1 - key, notSetValue);
	  });
	  reversedSequence.has = (function(key) {
	    return iterable.has(useKeys ? key : -1 - key);
	  });
	  reversedSequence.contains = (function(value) {
	    return iterable.contains(value);
	  });
	  reversedSequence.cacheResult = cacheResultThrough;
	  reversedSequence.__iterate = function(fn, reverse) {
	    var $__0 = this;
	    return iterable.__iterate((function(v, k) {
	      return fn(v, k, $__0);
	    }), !reverse);
	  };
	  reversedSequence.__iterator = (function(type, reverse) {
	    return iterable.__iterator(type, !reverse);
	  });
	  return reversedSequence;
	}
	function filterFactory(iterable, predicate, context, useKeys) {
	  var filterSequence = makeSequence(iterable);
	  if (useKeys) {
	    filterSequence.has = (function(key) {
	      var v = iterable.get(key, NOT_SET);
	      return v !== NOT_SET && !!predicate.call(context, v, key, iterable);
	    });
	    filterSequence.get = (function(key, notSetValue) {
	      var v = iterable.get(key, NOT_SET);
	      return v !== NOT_SET && predicate.call(context, v, key, iterable) ? v : notSetValue;
	    });
	  }
	  filterSequence.__iterateUncached = function(fn, reverse) {
	    var $__0 = this;
	    var iterations = 0;
	    iterable.__iterate((function(v, k, c) {
	      if (predicate.call(context, v, k, c)) {
	        iterations++;
	        return fn(v, useKeys ? k : iterations - 1, $__0);
	      }
	    }), reverse);
	    return iterations;
	  };
	  filterSequence.__iteratorUncached = function(type, reverse) {
	    var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
	    var iterations = 0;
	    return new Iterator((function() {
	      while (true) {
	        var step = iterator.next();
	        if (step.done) {
	          return step;
	        }
	        var entry = step.value;
	        var key = entry[0];
	        var value = entry[1];
	        if (predicate.call(context, value, key, iterable)) {
	          return iteratorValue(type, useKeys ? key : iterations++, value, step);
	        }
	      }
	    }));
	  };
	  return filterSequence;
	}
	function countByFactory(iterable, grouper, context) {
	  var groups = Map().asMutable();
	  iterable.__iterate((function(v, k) {
	    groups.update(grouper.call(context, v, k, iterable), 0, (function(a) {
	      return a + 1;
	    }));
	  }));
	  return groups.asImmutable();
	}
	function groupByFactory(iterable, grouper, context) {
	  var isKeyedIter = isKeyed(iterable);
	  var groups = Map().asMutable();
	  iterable.__iterate((function(v, k) {
	    groups.update(grouper.call(context, v, k, iterable), (function(a) {
	      return (a = a || [], a.push(isKeyedIter ? [k, v] : v), a);
	    }));
	  }));
	  var coerce = iterableClass(iterable);
	  return groups.map((function(arr) {
	    return reify(iterable, coerce(arr));
	  }));
	}
	function takeFactory(iterable, amount) {
	  if (amount > iterable.size) {
	    return iterable;
	  }
	  if (amount < 0) {
	    amount = 0;
	  }
	  var takeSequence = makeSequence(iterable);
	  takeSequence.size = iterable.size && Math.min(iterable.size, amount);
	  takeSequence.__iterateUncached = function(fn, reverse) {
	    var $__0 = this;
	    if (amount === 0) {
	      return 0;
	    }
	    if (reverse) {
	      return this.cacheResult().__iterate(fn, reverse);
	    }
	    var iterations = 0;
	    iterable.__iterate((function(v, k) {
	      return ++iterations && fn(v, k, $__0) !== false && iterations < amount;
	    }));
	    return iterations;
	  };
	  takeSequence.__iteratorUncached = function(type, reverse) {
	    if (reverse) {
	      return this.cacheResult().__iterator(type, reverse);
	    }
	    var iterator = amount && iterable.__iterator(type, reverse);
	    var iterations = 0;
	    return new Iterator((function() {
	      if (iterations++ > amount) {
	        return iteratorDone();
	      }
	      return iterator.next();
	    }));
	  };
	  return takeSequence;
	}
	function takeWhileFactory(iterable, predicate, context) {
	  var takeSequence = makeSequence(iterable);
	  takeSequence.__iterateUncached = function(fn, reverse) {
	    var $__0 = this;
	    if (reverse) {
	      return this.cacheResult().__iterate(fn, reverse);
	    }
	    var iterations = 0;
	    iterable.__iterate((function(v, k, c) {
	      return predicate.call(context, v, k, c) && ++iterations && fn(v, k, $__0);
	    }));
	    return iterations;
	  };
	  takeSequence.__iteratorUncached = function(type, reverse) {
	    var $__0 = this;
	    if (reverse) {
	      return this.cacheResult().__iterator(type, reverse);
	    }
	    var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
	    var iterating = true;
	    return new Iterator((function() {
	      if (!iterating) {
	        return iteratorDone();
	      }
	      var step = iterator.next();
	      if (step.done) {
	        return step;
	      }
	      var entry = step.value;
	      var k = entry[0];
	      var v = entry[1];
	      if (!predicate.call(context, v, k, $__0)) {
	        iterating = false;
	        return iteratorDone();
	      }
	      return type === ITERATE_ENTRIES ? step : iteratorValue(type, k, v, step);
	    }));
	  };
	  return takeSequence;
	}
	function skipFactory(iterable, amount, useKeys) {
	  if (amount <= 0) {
	    return iterable;
	  }
	  var skipSequence = makeSequence(iterable);
	  skipSequence.size = iterable.size && Math.max(0, iterable.size - amount);
	  skipSequence.__iterateUncached = function(fn, reverse) {
	    var $__0 = this;
	    if (reverse) {
	      return this.cacheResult().__iterate(fn, reverse);
	    }
	    var skipped = 0;
	    var isSkipping = true;
	    var iterations = 0;
	    iterable.__iterate((function(v, k) {
	      if (!(isSkipping && (isSkipping = skipped++ < amount))) {
	        iterations++;
	        return fn(v, useKeys ? k : iterations - 1, $__0);
	      }
	    }));
	    return iterations;
	  };
	  skipSequence.__iteratorUncached = function(type, reverse) {
	    if (reverse) {
	      return this.cacheResult().__iterator(type, reverse);
	    }
	    var iterator = amount && iterable.__iterator(type, reverse);
	    var skipped = 0;
	    var iterations = 0;
	    return new Iterator((function() {
	      while (skipped < amount) {
	        skipped++;
	        iterator.next();
	      }
	      var step = iterator.next();
	      if (useKeys || type === ITERATE_VALUES) {
	        return step;
	      } else if (type === ITERATE_KEYS) {
	        return iteratorValue(type, iterations++, undefined, step);
	      } else {
	        return iteratorValue(type, iterations++, step.value[1], step);
	      }
	    }));
	  };
	  return skipSequence;
	}
	function skipWhileFactory(iterable, predicate, context, useKeys) {
	  var skipSequence = makeSequence(iterable);
	  skipSequence.__iterateUncached = function(fn, reverse) {
	    var $__0 = this;
	    if (reverse) {
	      return this.cacheResult().__iterate(fn, reverse);
	    }
	    var isSkipping = true;
	    var iterations = 0;
	    iterable.__iterate((function(v, k, c) {
	      if (!(isSkipping && (isSkipping = predicate.call(context, v, k, c)))) {
	        iterations++;
	        return fn(v, useKeys ? k : iterations - 1, $__0);
	      }
	    }));
	    return iterations;
	  };
	  skipSequence.__iteratorUncached = function(type, reverse) {
	    var $__0 = this;
	    if (reverse) {
	      return this.cacheResult().__iterator(type, reverse);
	    }
	    var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
	    var skipping = true;
	    var iterations = 0;
	    return new Iterator((function() {
	      var step,
	          k,
	          v;
	      do {
	        step = iterator.next();
	        if (step.done) {
	          if (useKeys || type === ITERATE_VALUES) {
	            return step;
	          } else if (type === ITERATE_KEYS) {
	            return iteratorValue(type, iterations++, undefined, step);
	          } else {
	            return iteratorValue(type, iterations++, step.value[1], step);
	          }
	        }
	        var entry = step.value;
	        k = entry[0];
	        v = entry[1];
	        skipping && (skipping = predicate.call(context, v, k, $__0));
	      } while (skipping);
	      return type === ITERATE_ENTRIES ? step : iteratorValue(type, k, v, step);
	    }));
	  };
	  return skipSequence;
	}
	function concatFactory(iterable, values) {
	  var isKeyedIterable = isKeyed(iterable);
	  var iters = [iterable].concat(values).map((function(v) {
	    if (!isIterable(v)) {
	      v = isKeyedIterable ? keyedSeqFromValue(v) : indexedSeqFromValue(Array.isArray(v) ? v : [v]);
	    } else if (isKeyedIterable) {
	      v = KeyedIterable(v);
	    }
	    return v;
	  })).filter((function(v) {
	    return v.size !== 0;
	  }));
	  if (iters.length === 0) {
	    return iterable;
	  }
	  if (iters.length === 1) {
	    var singleton = iters[0];
	    if (singleton === iterable || isKeyedIterable && isKeyed(singleton) || isIndexed(iterable) && isIndexed(singleton)) {
	      return singleton;
	    }
	  }
	  var concatSeq = new ArraySeq(iters);
	  if (isKeyedIterable) {
	    concatSeq = concatSeq.toKeyedSeq();
	  } else if (!isIndexed(iterable)) {
	    concatSeq = concatSeq.toSetSeq();
	  }
	  concatSeq = concatSeq.flatten(true);
	  concatSeq.size = iters.reduce((function(sum, seq) {
	    if (sum !== undefined) {
	      var size = seq.size;
	      if (size !== undefined) {
	        return sum + size;
	      }
	    }
	  }), 0);
	  return concatSeq;
	}
	function flattenFactory(iterable, depth, useKeys) {
	  var flatSequence = makeSequence(iterable);
	  flatSequence.__iterateUncached = function(fn, reverse) {
	    var iterations = 0;
	    var stopped = false;
	    function flatDeep(iter, currentDepth) {
	      var $__0 = this;
	      iter.__iterate((function(v, k) {
	        if ((!depth || currentDepth < depth) && isIterable(v)) {
	          flatDeep(v, currentDepth + 1);
	        } else if (fn(v, useKeys ? k : iterations++, $__0) === false) {
	          stopped = true;
	        }
	        return !stopped;
	      }), reverse);
	    }
	    flatDeep(iterable, 0);
	    return iterations;
	  };
	  flatSequence.__iteratorUncached = function(type, reverse) {
	    var iterator = iterable.__iterator(type, reverse);
	    var stack = [];
	    var iterations = 0;
	    return new Iterator((function() {
	      while (iterator) {
	        var step = iterator.next();
	        if (step.done !== false) {
	          iterator = stack.pop();
	          continue;
	        }
	        var v = step.value;
	        if (type === ITERATE_ENTRIES) {
	          v = v[1];
	        }
	        if ((!depth || stack.length < depth) && isIterable(v)) {
	          stack.push(iterator);
	          iterator = v.__iterator(type, reverse);
	        } else {
	          return useKeys ? step : iteratorValue(type, iterations++, v, step);
	        }
	      }
	      return iteratorDone();
	    }));
	  };
	  return flatSequence;
	}
	function flatMapFactory(iterable, mapper, context) {
	  var coerce = iterableClass(iterable);
	  return iterable.toSeq().map((function(v, k) {
	    return coerce(mapper.call(context, v, k, iterable));
	  })).flatten(true);
	}
	function interposeFactory(iterable, separator) {
	  var interposedSequence = makeSequence(iterable);
	  interposedSequence.size = iterable.size && iterable.size * 2 - 1;
	  interposedSequence.__iterateUncached = function(fn, reverse) {
	    var $__0 = this;
	    var iterations = 0;
	    iterable.__iterate((function(v, k) {
	      return (!iterations || fn(separator, iterations++, $__0) !== false) && fn(v, iterations++, $__0) !== false;
	    }), reverse);
	    return iterations;
	  };
	  interposedSequence.__iteratorUncached = function(type, reverse) {
	    var iterator = iterable.__iterator(ITERATE_VALUES, reverse);
	    var iterations = 0;
	    var step;
	    return new Iterator((function() {
	      if (!step || iterations % 2) {
	        step = iterator.next();
	        if (step.done) {
	          return step;
	        }
	      }
	      return iterations % 2 ? iteratorValue(type, iterations++, separator) : iteratorValue(type, iterations++, step.value, step);
	    }));
	  };
	  return interposedSequence;
	}
	function sortFactory(iterable, comparator, mapper) {
	  if (!comparator) {
	    comparator = defaultComparator;
	  }
	  var isKeyedIterable = isKeyed(iterable);
	  var index = 0;
	  var entries = iterable.toSeq().map((function(v, k) {
	    return [k, v, index++, mapper ? mapper(v, k, iterable) : v];
	  })).toArray();
	  entries.sort((function(a, b) {
	    return comparator(a[3], b[3]) || a[2] - b[2];
	  })).forEach(isKeyedIterable ? (function(v, i) {
	    entries[i].length = 2;
	  }) : (function(v, i) {
	    entries[i] = v[1];
	  }));
	  return isKeyedIterable ? KeyedSeq(entries) : isIndexed(iterable) ? IndexedSeq(entries) : SetSeq(entries);
	}
	function maxFactory(iterable, comparator, mapper) {
	  if (!comparator) {
	    comparator = defaultComparator;
	  }
	  if (mapper) {
	    var entry = iterable.toSeq().map((function(v, k) {
	      return [v, mapper(v, k, iterable)];
	    })).reduce((function(max, next) {
	      return comparator(next[1], max[1]) > 0 ? next : max;
	    }));
	    return entry && entry[0];
	  } else {
	    return iterable.reduce((function(max, next) {
	      return comparator(next, max) > 0 ? next : max;
	    }));
	  }
	}
	function reify(iter, seq) {
	  return isSeq(iter) ? seq : iter.constructor(seq);
	}
	function validateEntry(entry) {
	  if (entry !== Object(entry)) {
	    throw new TypeError('Expected [K, V] tuple: ' + entry);
	  }
	}
	function resolveSize(iter) {
	  assertNotInfinite(iter.size);
	  return ensureSize(iter);
	}
	function iterableClass(iterable) {
	  return isKeyed(iterable) ? KeyedIterable : isIndexed(iterable) ? IndexedIterable : SetIterable;
	}
	function makeSequence(iterable) {
	  return Object.create((isKeyed(iterable) ? KeyedSeq : isIndexed(iterable) ? IndexedSeq : SetSeq).prototype);
	}
	function cacheResultThrough() {
	  if (this._iter.cacheResult) {
	    this._iter.cacheResult();
	    this.size = this._iter.size;
	    return this;
	  } else {
	    return Seq.prototype.cacheResult.call(this);
	  }
	}
	function defaultComparator(a, b) {
	  return a > b ? 1 : a < b ? -1 : 0;
	}
	var List = function List(value) {
	  var empty = emptyList();
	  if (value === null || value === undefined) {
	    return empty;
	  }
	  if (isList(value)) {
	    return value;
	  }
	  var iter = IndexedIterable(value);
	  var size = iter.size;
	  if (size === 0) {
	    return empty;
	  }
	  assertNotInfinite(size);
	  if (size > 0 && size < SIZE) {
	    return makeList(0, size, SHIFT, null, new VNode(iter.toArray()));
	  }
	  return empty.withMutations((function(list) {
	    list.setSize(size);
	    iter.forEach((function(v, i) {
	      return list.set(i, v);
	    }));
	  }));
	};
	($traceurRuntime.createClass)(List, {
	  toString: function() {
	    return this.__toString('List [', ']');
	  },
	  get: function(index, notSetValue) {
	    index = wrapIndex(this, index);
	    if (index < 0 || index >= this.size) {
	      return notSetValue;
	    }
	    index += this._origin;
	    var node = listNodeFor(this, index);
	    return node && node.array[index & MASK];
	  },
	  set: function(index, value) {
	    return updateList(this, index, value);
	  },
	  remove: function(index) {
	    return !this.has(index) ? this : index === 0 ? this.shift() : index === this.size - 1 ? this.pop() : this.splice(index, 1);
	  },
	  clear: function() {
	    if (this.size === 0) {
	      return this;
	    }
	    if (this.__ownerID) {
	      this.size = this._origin = this._capacity = 0;
	      this._level = SHIFT;
	      this._root = this._tail = null;
	      this.__hash = undefined;
	      this.__altered = true;
	      return this;
	    }
	    return emptyList();
	  },
	  push: function() {
	    var values = arguments;
	    var oldSize = this.size;
	    return this.withMutations((function(list) {
	      setListBounds(list, 0, oldSize + values.length);
	      for (var ii = 0; ii < values.length; ii++) {
	        list.set(oldSize + ii, values[ii]);
	      }
	    }));
	  },
	  pop: function() {
	    return setListBounds(this, 0, -1);
	  },
	  unshift: function() {
	    var values = arguments;
	    return this.withMutations((function(list) {
	      setListBounds(list, -values.length);
	      for (var ii = 0; ii < values.length; ii++) {
	        list.set(ii, values[ii]);
	      }
	    }));
	  },
	  shift: function() {
	    return setListBounds(this, 1);
	  },
	  merge: function() {
	    return mergeIntoListWith(this, undefined, arguments);
	  },
	  mergeWith: function(merger) {
	    for (var iters = [],
	        $__7 = 1; $__7 < arguments.length; $__7++)
	      iters[$__7 - 1] = arguments[$__7];
	    return mergeIntoListWith(this, merger, iters);
	  },
	  mergeDeep: function() {
	    return mergeIntoListWith(this, deepMerger(undefined), arguments);
	  },
	  mergeDeepWith: function(merger) {
	    for (var iters = [],
	        $__8 = 1; $__8 < arguments.length; $__8++)
	      iters[$__8 - 1] = arguments[$__8];
	    return mergeIntoListWith(this, deepMerger(merger), iters);
	  },
	  setSize: function(size) {
	    return setListBounds(this, 0, size);
	  },
	  slice: function(begin, end) {
	    var size = this.size;
	    if (wholeSlice(begin, end, size)) {
	      return this;
	    }
	    return setListBounds(this, resolveBegin(begin, size), resolveEnd(end, size));
	  },
	  __iterator: function(type, reverse) {
	    var index = 0;
	    var values = iterateList(this, reverse);
	    return new Iterator((function() {
	      var value = values();
	      return value === DONE ? iteratorDone() : iteratorValue(type, index++, value);
	    }));
	  },
	  __iterate: function(fn, reverse) {
	    var index = 0;
	    var values = iterateList(this, reverse);
	    var value;
	    while ((value = values()) !== DONE) {
	      if (fn(value, index++, this) === false) {
	        break;
	      }
	    }
	    return index;
	  },
	  __ensureOwner: function(ownerID) {
	    if (ownerID === this.__ownerID) {
	      return this;
	    }
	    if (!ownerID) {
	      this.__ownerID = ownerID;
	      return this;
	    }
	    return makeList(this._origin, this._capacity, this._level, this._root, this._tail, ownerID, this.__hash);
	  }
	}, {of: function() {
	    return this(arguments);
	  }}, IndexedCollection);
	function isList(maybeList) {
	  return !!(maybeList && maybeList[IS_LIST_SENTINEL]);
	}
	List.isList = isList;
	var IS_LIST_SENTINEL = '@@__IMMUTABLE_LIST__@@';
	var ListPrototype = List.prototype;
	ListPrototype[IS_LIST_SENTINEL] = true;
	ListPrototype[DELETE] = ListPrototype.remove;
	ListPrototype.setIn = MapPrototype.setIn;
	ListPrototype.deleteIn = ListPrototype.removeIn = MapPrototype.removeIn;
	ListPrototype.update = MapPrototype.update;
	ListPrototype.updateIn = MapPrototype.updateIn;
	ListPrototype.mergeIn = MapPrototype.mergeIn;
	ListPrototype.mergeDeepIn = MapPrototype.mergeDeepIn;
	ListPrototype.withMutations = MapPrototype.withMutations;
	ListPrototype.asMutable = MapPrototype.asMutable;
	ListPrototype.asImmutable = MapPrototype.asImmutable;
	ListPrototype.wasAltered = MapPrototype.wasAltered;
	var VNode = function VNode(array, ownerID) {
	  this.array = array;
	  this.ownerID = ownerID;
	};
	var $VNode = VNode;
	($traceurRuntime.createClass)(VNode, {
	  removeBefore: function(ownerID, level, index) {
	    if (index === level ? 1 << level : 0 || this.array.length === 0) {
	      return this;
	    }
	    var originIndex = (index >>> level) & MASK;
	    if (originIndex >= this.array.length) {
	      return new $VNode([], ownerID);
	    }
	    var removingFirst = originIndex === 0;
	    var newChild;
	    if (level > 0) {
	      var oldChild = this.array[originIndex];
	      newChild = oldChild && oldChild.removeBefore(ownerID, level - SHIFT, index);
	      if (newChild === oldChild && removingFirst) {
	        return this;
	      }
	    }
	    if (removingFirst && !newChild) {
	      return this;
	    }
	    var editable = editableVNode(this, ownerID);
	    if (!removingFirst) {
	      for (var ii = 0; ii < originIndex; ii++) {
	        editable.array[ii] = undefined;
	      }
	    }
	    if (newChild) {
	      editable.array[originIndex] = newChild;
	    }
	    return editable;
	  },
	  removeAfter: function(ownerID, level, index) {
	    if (index === level ? 1 << level : 0 || this.array.length === 0) {
	      return this;
	    }
	    var sizeIndex = ((index - 1) >>> level) & MASK;
	    if (sizeIndex >= this.array.length) {
	      return this;
	    }
	    var removingLast = sizeIndex === this.array.length - 1;
	    var newChild;
	    if (level > 0) {
	      var oldChild = this.array[sizeIndex];
	      newChild = oldChild && oldChild.removeAfter(ownerID, level - SHIFT, index);
	      if (newChild === oldChild && removingLast) {
	        return this;
	      }
	    }
	    if (removingLast && !newChild) {
	      return this;
	    }
	    var editable = editableVNode(this, ownerID);
	    if (!removingLast) {
	      editable.array.pop();
	    }
	    if (newChild) {
	      editable.array[sizeIndex] = newChild;
	    }
	    return editable;
	  }
	}, {});
	var DONE = {};
	function iterateList(list, reverse) {
	  var left = list._origin;
	  var right = list._capacity;
	  var tailPos = getTailOffset(right);
	  var tail = list._tail;
	  return iterateNodeOrLeaf(list._root, list._level, 0);
	  function iterateNodeOrLeaf(node, level, offset) {
	    return level === 0 ? iterateLeaf(node, offset) : iterateNode(node, level, offset);
	  }
	  function iterateLeaf(node, offset) {
	    var array = offset === tailPos ? tail && tail.array : node && node.array;
	    var from = offset > left ? 0 : left - offset;
	    var to = right - offset;
	    if (to > SIZE) {
	      to = SIZE;
	    }
	    return (function() {
	      if (from === to) {
	        return DONE;
	      }
	      var idx = reverse ? --to : from++;
	      return array && array[idx];
	    });
	  }
	  function iterateNode(node, level, offset) {
	    var values;
	    var array = node && node.array;
	    var from = offset > left ? 0 : (left - offset) >> level;
	    var to = ((right - offset) >> level) + 1;
	    if (to > SIZE) {
	      to = SIZE;
	    }
	    return (function() {
	      do {
	        if (values) {
	          var value = values();
	          if (value !== DONE) {
	            return value;
	          }
	          values = null;
	        }
	        if (from === to) {
	          return DONE;
	        }
	        var idx = reverse ? --to : from++;
	        values = iterateNodeOrLeaf(array && array[idx], level - SHIFT, offset + (idx << level));
	      } while (true);
	    });
	  }
	}
	function makeList(origin, capacity, level, root, tail, ownerID, hash) {
	  var list = Object.create(ListPrototype);
	  list.size = capacity - origin;
	  list._origin = origin;
	  list._capacity = capacity;
	  list._level = level;
	  list._root = root;
	  list._tail = tail;
	  list.__ownerID = ownerID;
	  list.__hash = hash;
	  list.__altered = false;
	  return list;
	}
	var EMPTY_LIST;
	function emptyList() {
	  return EMPTY_LIST || (EMPTY_LIST = makeList(0, 0, SHIFT));
	}
	function updateList(list, index, value) {
	  index = wrapIndex(list, index);
	  if (index >= list.size || index < 0) {
	    return list.withMutations((function(list) {
	      index < 0 ? setListBounds(list, index).set(0, value) : setListBounds(list, 0, index + 1).set(index, value);
	    }));
	  }
	  index += list._origin;
	  var newTail = list._tail;
	  var newRoot = list._root;
	  var didAlter = MakeRef(DID_ALTER);
	  if (index >= getTailOffset(list._capacity)) {
	    newTail = updateVNode(newTail, list.__ownerID, 0, index, value, didAlter);
	  } else {
	    newRoot = updateVNode(newRoot, list.__ownerID, list._level, index, value, didAlter);
	  }
	  if (!didAlter.value) {
	    return list;
	  }
	  if (list.__ownerID) {
	    list._root = newRoot;
	    list._tail = newTail;
	    list.__hash = undefined;
	    list.__altered = true;
	    return list;
	  }
	  return makeList(list._origin, list._capacity, list._level, newRoot, newTail);
	}
	function updateVNode(node, ownerID, level, index, value, didAlter) {
	  var idx = (index >>> level) & MASK;
	  var nodeHas = node && idx < node.array.length;
	  if (!nodeHas && value === undefined) {
	    return node;
	  }
	  var newNode;
	  if (level > 0) {
	    var lowerNode = node && node.array[idx];
	    var newLowerNode = updateVNode(lowerNode, ownerID, level - SHIFT, index, value, didAlter);
	    if (newLowerNode === lowerNode) {
	      return node;
	    }
	    newNode = editableVNode(node, ownerID);
	    newNode.array[idx] = newLowerNode;
	    return newNode;
	  }
	  if (nodeHas && node.array[idx] === value) {
	    return node;
	  }
	  SetRef(didAlter);
	  newNode = editableVNode(node, ownerID);
	  if (value === undefined && idx === newNode.array.length - 1) {
	    newNode.array.pop();
	  } else {
	    newNode.array[idx] = value;
	  }
	  return newNode;
	}
	function editableVNode(node, ownerID) {
	  if (ownerID && node && ownerID === node.ownerID) {
	    return node;
	  }
	  return new VNode(node ? node.array.slice() : [], ownerID);
	}
	function listNodeFor(list, rawIndex) {
	  if (rawIndex >= getTailOffset(list._capacity)) {
	    return list._tail;
	  }
	  if (rawIndex < 1 << (list._level + SHIFT)) {
	    var node = list._root;
	    var level = list._level;
	    while (node && level > 0) {
	      node = node.array[(rawIndex >>> level) & MASK];
	      level -= SHIFT;
	    }
	    return node;
	  }
	}
	function setListBounds(list, begin, end) {
	  var owner = list.__ownerID || new OwnerID();
	  var oldOrigin = list._origin;
	  var oldCapacity = list._capacity;
	  var newOrigin = oldOrigin + begin;
	  var newCapacity = end === undefined ? oldCapacity : end < 0 ? oldCapacity + end : oldOrigin + end;
	  if (newOrigin === oldOrigin && newCapacity === oldCapacity) {
	    return list;
	  }
	  if (newOrigin >= newCapacity) {
	    return list.clear();
	  }
	  var newLevel = list._level;
	  var newRoot = list._root;
	  var offsetShift = 0;
	  while (newOrigin + offsetShift < 0) {
	    newRoot = new VNode(newRoot && newRoot.array.length ? [undefined, newRoot] : [], owner);
	    newLevel += SHIFT;
	    offsetShift += 1 << newLevel;
	  }
	  if (offsetShift) {
	    newOrigin += offsetShift;
	    oldOrigin += offsetShift;
	    newCapacity += offsetShift;
	    oldCapacity += offsetShift;
	  }
	  var oldTailOffset = getTailOffset(oldCapacity);
	  var newTailOffset = getTailOffset(newCapacity);
	  while (newTailOffset >= 1 << (newLevel + SHIFT)) {
	    newRoot = new VNode(newRoot && newRoot.array.length ? [newRoot] : [], owner);
	    newLevel += SHIFT;
	  }
	  var oldTail = list._tail;
	  var newTail = newTailOffset < oldTailOffset ? listNodeFor(list, newCapacity - 1) : newTailOffset > oldTailOffset ? new VNode([], owner) : oldTail;
	  if (oldTail && newTailOffset > oldTailOffset && newOrigin < oldCapacity && oldTail.array.length) {
	    newRoot = editableVNode(newRoot, owner);
	    var node = newRoot;
	    for (var level = newLevel; level > SHIFT; level -= SHIFT) {
	      var idx = (oldTailOffset >>> level) & MASK;
	      node = node.array[idx] = editableVNode(node.array[idx], owner);
	    }
	    node.array[(oldTailOffset >>> SHIFT) & MASK] = oldTail;
	  }
	  if (newCapacity < oldCapacity) {
	    newTail = newTail && newTail.removeAfter(owner, 0, newCapacity);
	  }
	  if (newOrigin >= newTailOffset) {
	    newOrigin -= newTailOffset;
	    newCapacity -= newTailOffset;
	    newLevel = SHIFT;
	    newRoot = null;
	    newTail = newTail && newTail.removeBefore(owner, 0, newOrigin);
	  } else if (newOrigin > oldOrigin || newTailOffset < oldTailOffset) {
	    offsetShift = 0;
	    while (newRoot) {
	      var beginIndex = (newOrigin >>> newLevel) & MASK;
	      if (beginIndex !== (newTailOffset >>> newLevel) & MASK) {
	        break;
	      }
	      if (beginIndex) {
	        offsetShift += (1 << newLevel) * beginIndex;
	      }
	      newLevel -= SHIFT;
	      newRoot = newRoot.array[beginIndex];
	    }
	    if (newRoot && newOrigin > oldOrigin) {
	      newRoot = newRoot.removeBefore(owner, newLevel, newOrigin - offsetShift);
	    }
	    if (newRoot && newTailOffset < oldTailOffset) {
	      newRoot = newRoot.removeAfter(owner, newLevel, newTailOffset - offsetShift);
	    }
	    if (offsetShift) {
	      newOrigin -= offsetShift;
	      newCapacity -= offsetShift;
	    }
	  }
	  if (list.__ownerID) {
	    list.size = newCapacity - newOrigin;
	    list._origin = newOrigin;
	    list._capacity = newCapacity;
	    list._level = newLevel;
	    list._root = newRoot;
	    list._tail = newTail;
	    list.__hash = undefined;
	    list.__altered = true;
	    return list;
	  }
	  return makeList(newOrigin, newCapacity, newLevel, newRoot, newTail);
	}
	function mergeIntoListWith(list, merger, iterables) {
	  var iters = [];
	  var maxSize = 0;
	  for (var ii = 0; ii < iterables.length; ii++) {
	    var value = iterables[ii];
	    var iter = IndexedIterable(value);
	    if (iter.size > maxSize) {
	      maxSize = iter.size;
	    }
	    if (!isIterable(value)) {
	      iter = iter.map((function(v) {
	        return fromJS(v);
	      }));
	    }
	    iters.push(iter);
	  }
	  if (maxSize > list.size) {
	    list = list.setSize(maxSize);
	  }
	  return mergeIntoCollectionWith(list, merger, iters);
	}
	function getTailOffset(size) {
	  return size < SIZE ? 0 : (((size - 1) >>> SHIFT) << SHIFT);
	}
	var OrderedMap = function OrderedMap(value) {
	  return value === null || value === undefined ? emptyOrderedMap() : isOrderedMap(value) ? value : emptyOrderedMap().withMutations((function(map) {
	    var iter = KeyedIterable(value);
	    assertNotInfinite(iter.size);
	    iter.forEach((function(v, k) {
	      return map.set(k, v);
	    }));
	  }));
	};
	($traceurRuntime.createClass)(OrderedMap, {
	  toString: function() {
	    return this.__toString('OrderedMap {', '}');
	  },
	  get: function(k, notSetValue) {
	    var index = this._map.get(k);
	    return index !== undefined ? this._list.get(index)[1] : notSetValue;
	  },
	  clear: function() {
	    if (this.size === 0) {
	      return this;
	    }
	    if (this.__ownerID) {
	      this.size = 0;
	      this._map.clear();
	      this._list.clear();
	      return this;
	    }
	    return emptyOrderedMap();
	  },
	  set: function(k, v) {
	    return updateOrderedMap(this, k, v);
	  },
	  remove: function(k) {
	    return updateOrderedMap(this, k, NOT_SET);
	  },
	  wasAltered: function() {
	    return this._map.wasAltered() || this._list.wasAltered();
	  },
	  __iterate: function(fn, reverse) {
	    var $__0 = this;
	    return this._list.__iterate((function(entry) {
	      return entry && fn(entry[1], entry[0], $__0);
	    }), reverse);
	  },
	  __iterator: function(type, reverse) {
	    return this._list.fromEntrySeq().__iterator(type, reverse);
	  },
	  __ensureOwner: function(ownerID) {
	    if (ownerID === this.__ownerID) {
	      return this;
	    }
	    var newMap = this._map.__ensureOwner(ownerID);
	    var newList = this._list.__ensureOwner(ownerID);
	    if (!ownerID) {
	      this.__ownerID = ownerID;
	      this._map = newMap;
	      this._list = newList;
	      return this;
	    }
	    return makeOrderedMap(newMap, newList, ownerID, this.__hash);
	  }
	}, {of: function() {
	    return this(arguments);
	  }}, Map);
	function isOrderedMap(maybeOrderedMap) {
	  return isMap(maybeOrderedMap) && isOrdered(maybeOrderedMap);
	}
	OrderedMap.isOrderedMap = isOrderedMap;
	OrderedMap.prototype[IS_ORDERED_SENTINEL] = true;
	OrderedMap.prototype[DELETE] = OrderedMap.prototype.remove;
	function makeOrderedMap(map, list, ownerID, hash) {
	  var omap = Object.create(OrderedMap.prototype);
	  omap.size = map ? map.size : 0;
	  omap._map = map;
	  omap._list = list;
	  omap.__ownerID = ownerID;
	  omap.__hash = hash;
	  return omap;
	}
	var EMPTY_ORDERED_MAP;
	function emptyOrderedMap() {
	  return EMPTY_ORDERED_MAP || (EMPTY_ORDERED_MAP = makeOrderedMap(emptyMap(), emptyList()));
	}
	function updateOrderedMap(omap, k, v) {
	  var map = omap._map;
	  var list = omap._list;
	  var i = map.get(k);
	  var has = i !== undefined;
	  var newMap;
	  var newList;
	  if (v === NOT_SET) {
	    if (!has) {
	      return omap;
	    }
	    if (list.size >= SIZE && list.size >= map.size * 2) {
	      newList = list.filter((function(entry, idx) {
	        return entry !== undefined && i !== idx;
	      }));
	      newMap = newList.toKeyedSeq().map((function(entry) {
	        return entry[0];
	      })).flip().toMap();
	      if (omap.__ownerID) {
	        newMap.__ownerID = newList.__ownerID = omap.__ownerID;
	      }
	    } else {
	      newMap = map.remove(k);
	      newList = i === list.size - 1 ? list.pop() : list.set(i, undefined);
	    }
	  } else {
	    if (has) {
	      if (v === list.get(i)[1]) {
	        return omap;
	      }
	      newMap = map;
	      newList = list.set(i, [k, v]);
	    } else {
	      newMap = map.set(k, list.size);
	      newList = list.set(list.size, [k, v]);
	    }
	  }
	  if (omap.__ownerID) {
	    omap.size = newMap.size;
	    omap._map = newMap;
	    omap._list = newList;
	    omap.__hash = undefined;
	    return omap;
	  }
	  return makeOrderedMap(newMap, newList);
	}
	var Stack = function Stack(value) {
	  return value === null || value === undefined ? emptyStack() : isStack(value) ? value : emptyStack().unshiftAll(value);
	};
	var $Stack = Stack;
	($traceurRuntime.createClass)(Stack, {
	  toString: function() {
	    return this.__toString('Stack [', ']');
	  },
	  get: function(index, notSetValue) {
	    var head = this._head;
	    while (head && index--) {
	      head = head.next;
	    }
	    return head ? head.value : notSetValue;
	  },
	  peek: function() {
	    return this._head && this._head.value;
	  },
	  push: function() {
	    if (arguments.length === 0) {
	      return this;
	    }
	    var newSize = this.size + arguments.length;
	    var head = this._head;
	    for (var ii = arguments.length - 1; ii >= 0; ii--) {
	      head = {
	        value: arguments[ii],
	        next: head
	      };
	    }
	    if (this.__ownerID) {
	      this.size = newSize;
	      this._head = head;
	      this.__hash = undefined;
	      this.__altered = true;
	      return this;
	    }
	    return makeStack(newSize, head);
	  },
	  pushAll: function(iter) {
	    iter = IndexedIterable(iter);
	    if (iter.size === 0) {
	      return this;
	    }
	    assertNotInfinite(iter.size);
	    var newSize = this.size;
	    var head = this._head;
	    iter.reverse().forEach((function(value) {
	      newSize++;
	      head = {
	        value: value,
	        next: head
	      };
	    }));
	    if (this.__ownerID) {
	      this.size = newSize;
	      this._head = head;
	      this.__hash = undefined;
	      this.__altered = true;
	      return this;
	    }
	    return makeStack(newSize, head);
	  },
	  pop: function() {
	    return this.slice(1);
	  },
	  unshift: function() {
	    return this.push.apply(this, arguments);
	  },
	  unshiftAll: function(iter) {
	    return this.pushAll(iter);
	  },
	  shift: function() {
	    return this.pop.apply(this, arguments);
	  },
	  clear: function() {
	    if (this.size === 0) {
	      return this;
	    }
	    if (this.__ownerID) {
	      this.size = 0;
	      this._head = undefined;
	      this.__hash = undefined;
	      this.__altered = true;
	      return this;
	    }
	    return emptyStack();
	  },
	  slice: function(begin, end) {
	    if (wholeSlice(begin, end, this.size)) {
	      return this;
	    }
	    var resolvedBegin = resolveBegin(begin, this.size);
	    var resolvedEnd = resolveEnd(end, this.size);
	    if (resolvedEnd !== this.size) {
	      return $traceurRuntime.superCall(this, $Stack.prototype, "slice", [begin, end]);
	    }
	    var newSize = this.size - resolvedBegin;
	    var head = this._head;
	    while (resolvedBegin--) {
	      head = head.next;
	    }
	    if (this.__ownerID) {
	      this.size = newSize;
	      this._head = head;
	      this.__hash = undefined;
	      this.__altered = true;
	      return this;
	    }
	    return makeStack(newSize, head);
	  },
	  __ensureOwner: function(ownerID) {
	    if (ownerID === this.__ownerID) {
	      return this;
	    }
	    if (!ownerID) {
	      this.__ownerID = ownerID;
	      this.__altered = false;
	      return this;
	    }
	    return makeStack(this.size, this._head, ownerID, this.__hash);
	  },
	  __iterate: function(fn, reverse) {
	    if (reverse) {
	      return this.toSeq().cacheResult.__iterate(fn, reverse);
	    }
	    var iterations = 0;
	    var node = this._head;
	    while (node) {
	      if (fn(node.value, iterations++, this) === false) {
	        break;
	      }
	      node = node.next;
	    }
	    return iterations;
	  },
	  __iterator: function(type, reverse) {
	    if (reverse) {
	      return this.toSeq().cacheResult().__iterator(type, reverse);
	    }
	    var iterations = 0;
	    var node = this._head;
	    return new Iterator((function() {
	      if (node) {
	        var value = node.value;
	        node = node.next;
	        return iteratorValue(type, iterations++, value);
	      }
	      return iteratorDone();
	    }));
	  }
	}, {of: function() {
	    return this(arguments);
	  }}, IndexedCollection);
	function isStack(maybeStack) {
	  return !!(maybeStack && maybeStack[IS_STACK_SENTINEL]);
	}
	Stack.isStack = isStack;
	var IS_STACK_SENTINEL = '@@__IMMUTABLE_STACK__@@';
	var StackPrototype = Stack.prototype;
	StackPrototype[IS_STACK_SENTINEL] = true;
	StackPrototype.withMutations = MapPrototype.withMutations;
	StackPrototype.asMutable = MapPrototype.asMutable;
	StackPrototype.asImmutable = MapPrototype.asImmutable;
	StackPrototype.wasAltered = MapPrototype.wasAltered;
	function makeStack(size, head, ownerID, hash) {
	  var map = Object.create(StackPrototype);
	  map.size = size;
	  map._head = head;
	  map.__ownerID = ownerID;
	  map.__hash = hash;
	  map.__altered = false;
	  return map;
	}
	var EMPTY_STACK;
	function emptyStack() {
	  return EMPTY_STACK || (EMPTY_STACK = makeStack(0));
	}
	var Set = function Set(value) {
	  return value === null || value === undefined ? emptySet() : isSet(value) ? value : emptySet().withMutations((function(set) {
	    var iter = SetIterable(value);
	    assertNotInfinite(iter.size);
	    iter.forEach((function(v) {
	      return set.add(v);
	    }));
	  }));
	};
	($traceurRuntime.createClass)(Set, {
	  toString: function() {
	    return this.__toString('Set {', '}');
	  },
	  has: function(value) {
	    return this._map.has(value);
	  },
	  add: function(value) {
	    return updateSet(this, this._map.set(value, true));
	  },
	  remove: function(value) {
	    return updateSet(this, this._map.remove(value));
	  },
	  clear: function() {
	    return updateSet(this, this._map.clear());
	  },
	  union: function() {
	    for (var iters = [],
	        $__9 = 0; $__9 < arguments.length; $__9++)
	      iters[$__9] = arguments[$__9];
	    iters = iters.filter((function(x) {
	      return x.size !== 0;
	    }));
	    if (iters.length === 0) {
	      return this;
	    }
	    if (this.size === 0 && iters.length === 1) {
	      return this.constructor(iters[0]);
	    }
	    return this.withMutations((function(set) {
	      for (var ii = 0; ii < iters.length; ii++) {
	        SetIterable(iters[ii]).forEach((function(value) {
	          return set.add(value);
	        }));
	      }
	    }));
	  },
	  intersect: function() {
	    for (var iters = [],
	        $__10 = 0; $__10 < arguments.length; $__10++)
	      iters[$__10] = arguments[$__10];
	    if (iters.length === 0) {
	      return this;
	    }
	    iters = iters.map((function(iter) {
	      return SetIterable(iter);
	    }));
	    var originalSet = this;
	    return this.withMutations((function(set) {
	      originalSet.forEach((function(value) {
	        if (!iters.every((function(iter) {
	          return iter.contains(value);
	        }))) {
	          set.remove(value);
	        }
	      }));
	    }));
	  },
	  subtract: function() {
	    for (var iters = [],
	        $__11 = 0; $__11 < arguments.length; $__11++)
	      iters[$__11] = arguments[$__11];
	    if (iters.length === 0) {
	      return this;
	    }
	    iters = iters.map((function(iter) {
	      return SetIterable(iter);
	    }));
	    var originalSet = this;
	    return this.withMutations((function(set) {
	      originalSet.forEach((function(value) {
	        if (iters.some((function(iter) {
	          return iter.contains(value);
	        }))) {
	          set.remove(value);
	        }
	      }));
	    }));
	  },
	  merge: function() {
	    return this.union.apply(this, arguments);
	  },
	  mergeWith: function(merger) {
	    for (var iters = [],
	        $__12 = 1; $__12 < arguments.length; $__12++)
	      iters[$__12 - 1] = arguments[$__12];
	    return this.union.apply(this, iters);
	  },
	  sort: function(comparator) {
	    return OrderedSet(sortFactory(this, comparator));
	  },
	  sortBy: function(mapper, comparator) {
	    return OrderedSet(sortFactory(this, comparator, mapper));
	  },
	  wasAltered: function() {
	    return this._map.wasAltered();
	  },
	  __iterate: function(fn, reverse) {
	    var $__0 = this;
	    return this._map.__iterate((function(_, k) {
	      return fn(k, k, $__0);
	    }), reverse);
	  },
	  __iterator: function(type, reverse) {
	    return this._map.map((function(_, k) {
	      return k;
	    })).__iterator(type, reverse);
	  },
	  __ensureOwner: function(ownerID) {
	    if (ownerID === this.__ownerID) {
	      return this;
	    }
	    var newMap = this._map.__ensureOwner(ownerID);
	    if (!ownerID) {
	      this.__ownerID = ownerID;
	      this._map = newMap;
	      return this;
	    }
	    return this.__make(newMap, ownerID);
	  }
	}, {
	  of: function() {
	    return this(arguments);
	  },
	  fromKeys: function(value) {
	    return this(KeyedIterable(value).keySeq());
	  }
	}, SetCollection);
	function isSet(maybeSet) {
	  return !!(maybeSet && maybeSet[IS_SET_SENTINEL]);
	}
	Set.isSet = isSet;
	var IS_SET_SENTINEL = '@@__IMMUTABLE_SET__@@';
	var SetPrototype = Set.prototype;
	SetPrototype[IS_SET_SENTINEL] = true;
	SetPrototype[DELETE] = SetPrototype.remove;
	SetPrototype.mergeDeep = SetPrototype.merge;
	SetPrototype.mergeDeepWith = SetPrototype.mergeWith;
	SetPrototype.withMutations = MapPrototype.withMutations;
	SetPrototype.asMutable = MapPrototype.asMutable;
	SetPrototype.asImmutable = MapPrototype.asImmutable;
	SetPrototype.__empty = emptySet;
	SetPrototype.__make = makeSet;
	function updateSet(set, newMap) {
	  if (set.__ownerID) {
	    set.size = newMap.size;
	    set._map = newMap;
	    return set;
	  }
	  return newMap === set._map ? set : newMap.size === 0 ? set.__empty() : set.__make(newMap);
	}
	function makeSet(map, ownerID) {
	  var set = Object.create(SetPrototype);
	  set.size = map ? map.size : 0;
	  set._map = map;
	  set.__ownerID = ownerID;
	  return set;
	}
	var EMPTY_SET;
	function emptySet() {
	  return EMPTY_SET || (EMPTY_SET = makeSet(emptyMap()));
	}
	var OrderedSet = function OrderedSet(value) {
	  return value === null || value === undefined ? emptyOrderedSet() : isOrderedSet(value) ? value : emptyOrderedSet().withMutations((function(set) {
	    var iter = SetIterable(value);
	    assertNotInfinite(iter.size);
	    iter.forEach((function(v) {
	      return set.add(v);
	    }));
	  }));
	};
	($traceurRuntime.createClass)(OrderedSet, {toString: function() {
	    return this.__toString('OrderedSet {', '}');
	  }}, {
	  of: function() {
	    return this(arguments);
	  },
	  fromKeys: function(value) {
	    return this(KeyedIterable(value).keySeq());
	  }
	}, Set);
	function isOrderedSet(maybeOrderedSet) {
	  return isSet(maybeOrderedSet) && isOrdered(maybeOrderedSet);
	}
	OrderedSet.isOrderedSet = isOrderedSet;
	var OrderedSetPrototype = OrderedSet.prototype;
	OrderedSetPrototype[IS_ORDERED_SENTINEL] = true;
	OrderedSetPrototype.__empty = emptyOrderedSet;
	OrderedSetPrototype.__make = makeOrderedSet;
	function makeOrderedSet(map, ownerID) {
	  var set = Object.create(OrderedSetPrototype);
	  set.size = map ? map.size : 0;
	  set._map = map;
	  set.__ownerID = ownerID;
	  return set;
	}
	var EMPTY_ORDERED_SET;
	function emptyOrderedSet() {
	  return EMPTY_ORDERED_SET || (EMPTY_ORDERED_SET = makeOrderedSet(emptyOrderedMap()));
	}
	var Record = function Record(defaultValues, name) {
	  var RecordType = function Record(values) {
	    if (!(this instanceof RecordType)) {
	      return new RecordType(values);
	    }
	    this._map = Map(values);
	  };
	  var keys = Object.keys(defaultValues);
	  var RecordTypePrototype = RecordType.prototype = Object.create(RecordPrototype);
	  RecordTypePrototype.constructor = RecordType;
	  name && (RecordTypePrototype._name = name);
	  RecordTypePrototype._defaultValues = defaultValues;
	  RecordTypePrototype._keys = keys;
	  RecordTypePrototype.size = keys.length;
	  try {
	    keys.forEach((function(key) {
	      Object.defineProperty(RecordType.prototype, key, {
	        get: function() {
	          return this.get(key);
	        },
	        set: function(value) {
	          invariant(this.__ownerID, 'Cannot set on an immutable record.');
	          this.set(key, value);
	        }
	      });
	    }));
	  } catch (error) {}
	  return RecordType;
	};
	($traceurRuntime.createClass)(Record, {
	  toString: function() {
	    return this.__toString(recordName(this) + ' {', '}');
	  },
	  has: function(k) {
	    return this._defaultValues.hasOwnProperty(k);
	  },
	  get: function(k, notSetValue) {
	    if (!this.has(k)) {
	      return notSetValue;
	    }
	    var defaultVal = this._defaultValues[k];
	    return this._map ? this._map.get(k, defaultVal) : defaultVal;
	  },
	  clear: function() {
	    if (this.__ownerID) {
	      this._map && this._map.clear();
	      return this;
	    }
	    var SuperRecord = Object.getPrototypeOf(this).constructor;
	    return SuperRecord._empty || (SuperRecord._empty = makeRecord(this, emptyMap()));
	  },
	  set: function(k, v) {
	    if (!this.has(k)) {
	      throw new Error('Cannot set unknown key "' + k + '" on ' + recordName(this));
	    }
	    var newMap = this._map && this._map.set(k, v);
	    if (this.__ownerID || newMap === this._map) {
	      return this;
	    }
	    return makeRecord(this, newMap);
	  },
	  remove: function(k) {
	    if (!this.has(k)) {
	      return this;
	    }
	    var newMap = this._map && this._map.remove(k);
	    if (this.__ownerID || newMap === this._map) {
	      return this;
	    }
	    return makeRecord(this, newMap);
	  },
	  wasAltered: function() {
	    return this._map.wasAltered();
	  },
	  __iterator: function(type, reverse) {
	    var $__0 = this;
	    return KeyedIterable(this._defaultValues).map((function(_, k) {
	      return $__0.get(k);
	    })).__iterator(type, reverse);
	  },
	  __iterate: function(fn, reverse) {
	    var $__0 = this;
	    return KeyedIterable(this._defaultValues).map((function(_, k) {
	      return $__0.get(k);
	    })).__iterate(fn, reverse);
	  },
	  __ensureOwner: function(ownerID) {
	    if (ownerID === this.__ownerID) {
	      return this;
	    }
	    var newMap = this._map && this._map.__ensureOwner(ownerID);
	    if (!ownerID) {
	      this.__ownerID = ownerID;
	      this._map = newMap;
	      return this;
	    }
	    return makeRecord(this, newMap, ownerID);
	  }
	}, {}, KeyedCollection);
	var RecordPrototype = Record.prototype;
	RecordPrototype[DELETE] = RecordPrototype.remove;
	RecordPrototype.deleteIn = RecordPrototype.removeIn = MapPrototype.removeIn;
	RecordPrototype.merge = MapPrototype.merge;
	RecordPrototype.mergeWith = MapPrototype.mergeWith;
	RecordPrototype.mergeIn = MapPrototype.mergeIn;
	RecordPrototype.mergeDeep = MapPrototype.mergeDeep;
	RecordPrototype.mergeDeepWith = MapPrototype.mergeDeepWith;
	RecordPrototype.mergeDeepIn = MapPrototype.mergeDeepIn;
	RecordPrototype.setIn = MapPrototype.setIn;
	RecordPrototype.update = MapPrototype.update;
	RecordPrototype.updateIn = MapPrototype.updateIn;
	RecordPrototype.withMutations = MapPrototype.withMutations;
	RecordPrototype.asMutable = MapPrototype.asMutable;
	RecordPrototype.asImmutable = MapPrototype.asImmutable;
	function makeRecord(likeRecord, map, ownerID) {
	  var record = Object.create(Object.getPrototypeOf(likeRecord));
	  record._map = map;
	  record.__ownerID = ownerID;
	  return record;
	}
	function recordName(record) {
	  return record._name || record.constructor.name;
	}
	var Range = function Range(start, end, step) {
	  if (!(this instanceof $Range)) {
	    return new $Range(start, end, step);
	  }
	  invariant(step !== 0, 'Cannot step a Range by 0');
	  start = start || 0;
	  if (end === undefined) {
	    end = Infinity;
	  }
	  if (start === end && __EMPTY_RANGE) {
	    return __EMPTY_RANGE;
	  }
	  step = step === undefined ? 1 : Math.abs(step);
	  if (end < start) {
	    step = -step;
	  }
	  this._start = start;
	  this._end = end;
	  this._step = step;
	  this.size = Math.max(0, Math.ceil((end - start) / step - 1) + 1);
	};
	var $Range = Range;
	($traceurRuntime.createClass)(Range, {
	  toString: function() {
	    if (this.size === 0) {
	      return 'Range []';
	    }
	    return 'Range [ ' + this._start + '...' + this._end + (this._step > 1 ? ' by ' + this._step : '') + ' ]';
	  },
	  get: function(index, notSetValue) {
	    return this.has(index) ? this._start + wrapIndex(this, index) * this._step : notSetValue;
	  },
	  contains: function(searchValue) {
	    var possibleIndex = (searchValue - this._start) / this._step;
	    return possibleIndex >= 0 && possibleIndex < this.size && possibleIndex === Math.floor(possibleIndex);
	  },
	  slice: function(begin, end) {
	    if (wholeSlice(begin, end, this.size)) {
	      return this;
	    }
	    begin = resolveBegin(begin, this.size);
	    end = resolveEnd(end, this.size);
	    if (end <= begin) {
	      return __EMPTY_RANGE;
	    }
	    return new $Range(this.get(begin, this._end), this.get(end, this._end), this._step);
	  },
	  indexOf: function(searchValue) {
	    var offsetValue = searchValue - this._start;
	    if (offsetValue % this._step === 0) {
	      var index = offsetValue / this._step;
	      if (index >= 0 && index < this.size) {
	        return index;
	      }
	    }
	    return -1;
	  },
	  lastIndexOf: function(searchValue) {
	    return this.indexOf(searchValue);
	  },
	  take: function(amount) {
	    return this.slice(0, Math.max(0, amount));
	  },
	  skip: function(amount) {
	    return this.slice(Math.max(0, amount));
	  },
	  __iterate: function(fn, reverse) {
	    var maxIndex = this.size - 1;
	    var step = this._step;
	    var value = reverse ? this._start + maxIndex * step : this._start;
	    for (var ii = 0; ii <= maxIndex; ii++) {
	      if (fn(value, ii, this) === false) {
	        return ii + 1;
	      }
	      value += reverse ? -step : step;
	    }
	    return ii;
	  },
	  __iterator: function(type, reverse) {
	    var maxIndex = this.size - 1;
	    var step = this._step;
	    var value = reverse ? this._start + maxIndex * step : this._start;
	    var ii = 0;
	    return new Iterator((function() {
	      var v = value;
	      value += reverse ? -step : step;
	      return ii > maxIndex ? iteratorDone() : iteratorValue(type, ii++, v);
	    }));
	  },
	  equals: function(other) {
	    return other instanceof $Range ? this._start === other._start && this._end === other._end && this._step === other._step : deepEqual(this, other);
	  }
	}, {}, IndexedSeq);
	var RangePrototype = Range.prototype;
	RangePrototype.__toJS = RangePrototype.toArray;
	RangePrototype.first = ListPrototype.first;
	RangePrototype.last = ListPrototype.last;
	var __EMPTY_RANGE = Range(0, 0);
	var Repeat = function Repeat(value, times) {
	  if (times <= 0 && EMPTY_REPEAT) {
	    return EMPTY_REPEAT;
	  }
	  if (!(this instanceof $Repeat)) {
	    return new $Repeat(value, times);
	  }
	  this._value = value;
	  this.size = times === undefined ? Infinity : Math.max(0, times);
	  if (this.size === 0) {
	    EMPTY_REPEAT = this;
	  }
	};
	var $Repeat = Repeat;
	($traceurRuntime.createClass)(Repeat, {
	  toString: function() {
	    if (this.size === 0) {
	      return 'Repeat []';
	    }
	    return 'Repeat [ ' + this._value + ' ' + this.size + ' times ]';
	  },
	  get: function(index, notSetValue) {
	    return this.has(index) ? this._value : notSetValue;
	  },
	  contains: function(searchValue) {
	    return is(this._value, searchValue);
	  },
	  slice: function(begin, end) {
	    var size = this.size;
	    return wholeSlice(begin, end, size) ? this : new $Repeat(this._value, resolveEnd(end, size) - resolveBegin(begin, size));
	  },
	  reverse: function() {
	    return this;
	  },
	  indexOf: function(searchValue) {
	    if (is(this._value, searchValue)) {
	      return 0;
	    }
	    return -1;
	  },
	  lastIndexOf: function(searchValue) {
	    if (is(this._value, searchValue)) {
	      return this.size;
	    }
	    return -1;
	  },
	  __iterate: function(fn, reverse) {
	    for (var ii = 0; ii < this.size; ii++) {
	      if (fn(this._value, ii, this) === false) {
	        return ii + 1;
	      }
	    }
	    return ii;
	  },
	  __iterator: function(type, reverse) {
	    var $__0 = this;
	    var ii = 0;
	    return new Iterator((function() {
	      return ii < $__0.size ? iteratorValue(type, ii++, $__0._value) : iteratorDone();
	    }));
	  },
	  equals: function(other) {
	    return other instanceof $Repeat ? is(this._value, other._value) : deepEqual(other);
	  }
	}, {}, IndexedSeq);
	var RepeatPrototype = Repeat.prototype;
	RepeatPrototype.last = RepeatPrototype.first;
	RepeatPrototype.has = RangePrototype.has;
	RepeatPrototype.take = RangePrototype.take;
	RepeatPrototype.skip = RangePrototype.skip;
	RepeatPrototype.__toJS = RangePrototype.__toJS;
	var EMPTY_REPEAT;
	var Immutable = {
	  Iterable: Iterable,
	  Seq: Seq,
	  Collection: Collection,
	  Map: Map,
	  OrderedMap: OrderedMap,
	  List: List,
	  Stack: Stack,
	  Set: Set,
	  OrderedSet: OrderedSet,
	  Record: Record,
	  Range: Range,
	  Repeat: Repeat,
	  is: is,
	  fromJS: fromJS
	};
	
	  return Immutable;
	}
	true ? module.exports = universalModule() :
	  typeof define === 'function' && define.amd ? define(universalModule) :
	    Immutable = universalModule();


/***/ },
/* 16 */
/*!**********************************************!*\
  !*** ./colonel-kurtz/stores/editor_store.js ***!
  \**********************************************/
/***/ function(module, exports, __webpack_require__) {

	var BlockType  = __webpack_require__(/*! ./block_type_store */ 34)
	var Bus        = __webpack_require__(/*! ../bus */ 12)
	var Constants  = __webpack_require__(/*! ../constants/editor_constants */ 32)
	var Dispatcher = __webpack_require__(/*! ../dispatcher */ 25)
	var Immutable  = __webpack_require__(/*! immutable */ 15)
	var Modes      = __webpack_require__(/*! ../constants/mode_constants */ 35)
	var invariant  = __webpack_require__(/*! react/lib/invariant */ 41)
	
	var _editors  = Immutable.List()
	var getDefaults = function() {
	  return {
	    mode  : Modes.EDIT_MODE,
	    types : BlockType.keys()
	  }
	}
	
	var EditorStore = {
	
	  find:function(id) {
	    return _editors.find(function(block)  {return block.id === id;} ) || null
	  },
	
	  _create:function(params) {
	    var editor = Object.assign({}, getDefaults(), params )
	
	    invariant(Modes[editor.mode], 'Unacceptable mode for editor: ' + editor.mode)
	    invariant(EditorStore.find(editor.id) === null, 'Editors must have a unique identifier')
	
	    _editors = _editors.push(editor)
	
	    Bus.publish()
	  },
	
	  _update:function(id, params) {
	    var editor = EditorStore.find(id)
	    var index  = _editors.indexOf(editor)
	
	    invariant(index >= 0, 'Unable to find editor with an id of ' + id)
	
	    _editors = _editors.set(index, Object.assign({}, getDefaults(), editor, params ))
	
	    Bus.publish()
	  },
	
	  dispatchToken: Dispatcher.register(function(action) {
	    switch (action.type) {
	      case Constants.EDITOR_CREATE:
	        EditorStore._create(action.params)
	        break
	      case Constants.EDITOR_UPDATE:
	        EditorStore._update(action.id, action.params)
	        break
	      default:
	        // do nothing
	    }
	  })
	
	}
	
	module.exports = EditorStore


/***/ },
/* 17 */
/*!*****************************************************!*\
  !*** ./colonel-kurtz/components/content_section.js ***!
  \*****************************************************/
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	
	var React = __webpack_require__(/*! react */ 1)
	var Modes = __webpack_require__(/*! ../constants/mode_constants */ 35)
	
	var _types = {}
	
	_types[Modes.EDIT_MODE]    = __webpack_require__(/*! ../components/editor */ 36)
	_types[Modes.PREVIEW_MODE] = __webpack_require__(/*! ../components/previewer */ 37)
	
	var ContentSection = React.createClass({displayName: 'ContentSection',
	
	  propTypes: {
	    editor             : React.PropTypes.any.isRequired,
	    initialBlockListId : React.PropTypes.number.isRequired
	  },
	
	  render:function()      {
	    var editor      = this.props.editor
	    var ContentType = _types[editor.mode]
	
	    return (
	      React.createElement("div", {className: "col-content"}, 
	        React.createElement(ContentType, {editor: editor, initialBlockListId:  this.props.initialBlockListId})
	      )
	    )
	  }
	
	})
	
	module.exports = ContentSection


/***/ },
/* 18 */
/*!****************************************************!*\
  !*** ./colonel-kurtz/components/mode_selection.js ***!
  \****************************************************/
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	
	var React  = __webpack_require__(/*! react */ 1)
	var Button = __webpack_require__(/*! ./ui/button */ 40);
	var Modes  = __webpack_require__(/*! ../constants/mode_constants */ 35)
	
	var ModeSelection = React.createClass({displayName: 'ModeSelection',
	
	  propType: {
	    mode     : React.PropTypes.oneOf(Object.keys(Modes)),
	    modes    : React.PropTypes.object,
	    onChange : React.PropTypes.func.isRequired
	  },
	
	  getDefaultProps:function()         {
	    return {
	      mode: Modes.EDIT_MODE,
	      modes: {
	        'Edit'    : Modes.EDIT_MODE,
	        'Preview' : Modes.PREVIEW_MODE
	      }
	    }
	  },
	
	  getTab:function(key       )      {
	    var $__0=      this.props,mode=$__0.mode,modes=$__0.modes,setMode=$__0.setMode
	
	    var props = {
	      className : "col-tabs-btn",
	      disabled  : mode === modes[key],
	      onClick   : function(e)  {return this._onModeClick(e, modes[key]);}.bind(this)
	    }
	
	    return (
	      React.createElement("li", {key: key, className: "col-tabs-list-item", role: "tab"}, 
	        React.createElement(Button, React.__spread({},   props ), key )
	      )
	    )
	  },
	
	  getTabs:function()      {
	    return Object.keys(this.props.modes).map(this.getTab);
	  },
	
	  render:function()      {
	    return (
	      React.createElement("nav", {role: "navigation", className: "col-tabs"}, 
	        React.createElement("ul", {className: "col-tabs-list", role: "tablist"}, 
	           this.getTabs() 
	        )
	      )
	    )
	  },
	
	  _onModeClick:function(e       , mode        )       {
	    e.preventDefault()
	
	    this.props.onChange(mode)
	  }
	
	})
	
	module.exports = ModeSelection


/***/ },
/* 19 */
/*!*********************************************!*\
  !*** ./colonel-kurtz/stores/block_store.js ***!
  \*********************************************/
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	
	var Bus        = __webpack_require__(/*! ../bus */ 12)
	var Block      = __webpack_require__(/*! ../models/block */ 38)
	var Constants  = __webpack_require__(/*! ../constants/block_constants */ 24)
	var Dispatcher = __webpack_require__(/*! ../dispatcher */ 25)
	var Immutable  = __webpack_require__(/*! immutable */ 15)
	
	var _blocks = Immutable.List()
	
	var BlockStore = {
	
	  all:function()               {
	    return _blocks
	  },
	
	  last:function() {
	    return _blocks.last()
	  },
	
	  find:function(id        )        {
	    return _blocks.find(function(block)  {return block.id === id;} )
	  },
	
	  _create:function($__0    )        {var content=$__0.content,type=$__0.type,parentBlockListId=$__0.parentBlockListId;
	    var block = new Block({ content:content, type:type, parentBlockListId:parentBlockListId })
	
	    _blocks = _blocks.push(block)
	
	    Bus.publish()
	
	    return block
	  },
	
	  _destroy:function(id        ) {
	    _blocks = _blocks.filter(function(b)  {return b.id !== id;})
	    Bus.publish()
	  },
	
	  _update:function(blockId        , content         ) {
	    var block = BlockStore.find(blockId)
	
	    if (block) {
	      block.content = Object.assign({}, block.content, content )
	      Bus.publish()
	    }
	  },
	
	  dispatchToken: Dispatcher.register(function(action) {
	    switch (action.type) {
	      case Constants.BLOCK_CREATE:
	        var block = BlockStore._create(action.params)
	        action.block = block
	        break
	      case Constants.BLOCK_DESTROY:
	        BlockStore._destroy(action.blockId)
	        break
	      case Constants.BLOCK_UPDATE:
	        BlockStore._update(action.blockId, action.content)
	        break
	      default:
	        // do nothing
	    }
	  })
	
	}
	
	module.exports = BlockStore


/***/ },
/* 20 */
/*!*****************************************************!*\
  !*** ./colonel-kurtz/actions/block_type_actions.js ***!
  \*****************************************************/
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	
	var Constants  = __webpack_require__(/*! ../constants/block_type_constants */ 39)
	var Dispatcher = __webpack_require__(/*! ../dispatcher */ 25)
	
	var BlockTypeActions = {
	
	  create:function(params         )        {
	    var type        = Constants.BLOCK_TYPE_CREATE
	
	    Dispatcher.dispatch({ type:type, params:params })
	  }
	
	}
	
	module.exports = BlockTypeActions


/***/ },
/* 21 */
/*!*****************************************!*\
  !*** ./colonel-kurtz/mixins/monitor.js ***!
  \*****************************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Listens to the Bus and calls a provided `getState` function when
	 * the Bus publishes.
	 *
	 * @flow
	 */
	
	var Bus       = __webpack_require__(/*! ../bus */ 12);
	var invariant = __webpack_require__(/*! react/lib/invariant */ 41);
	
	var Monitor = {
	
	  getInitialState:function()         {
	    if (true) {
	      invariant(this.getState, "Monitor mixin requires `getState` implementation.");
	    }
	
	    return this.getState();
	  },
	
	  updateState:function()       {
	    this.setState(this.getState());
	  },
	
	  componentDidMount:function()       {
	    Bus.subscribe(this.updateState);
	  },
	
	  componentWillUnmount:function()       {
	    Bus.unsubscribe(this.updateState);
	  },
	
	  componentWillReceiveProps:function()       {
	    this.updateState();
	  }
	
	};
	
	module.exports = Monitor;


/***/ },
/* 22 */
/*!********************************************!*\
  !*** ./colonel-kurtz/mixins/block_type.js ***!
  \********************************************/
/***/ function(module, exports, __webpack_require__) {

	/* Begin: Common Block Type Interface
	 *
	 * Each block type component must include the BlockType mixin and implement:
	 * - defaultContent()
	 * - renderEditor()
	 * - renderPreviewer()
	 *
	 * Block content is managed via calls to setContent(), which updates both
	 * this component's state as well as the block instance's content.
	 *
	 * @flow
	 */
	
	var React     = __webpack_require__(/*! react */ 1)
	var Modes     = __webpack_require__(/*! ../constants/mode_constants */ 35)
	var invariant = __webpack_require__(/*! react/lib/invariant */ 41)
	
	var BlockType = {
	
	  getInitialState:function()         {
	    if (true) {
	      invariant(this.defaultContent, "BlockType mixin requires `defaultContent` implementation.");
	    }
	
	    return {
	      content: this.props.initialContent || this.defaultContent()
	    }
	  },
	
	  setContent:function(content       )       {
	    this.setState({ content: Object.assign({}, this.state.content, content ) }, function() {
	      this.props.updateContent(this.state.content)
	    })
	  },
	
	  editMode:function()          {
	    return this.props.mode === Modes.EDIT_MODE
	  },
	
	  render:function()               {
	    if (true) {
	      invariant(this.renderEditor, "BlockType mixin requires `renderEditor` implementation.");
	      invariant(this.renderPreviewer, "BlockType mixin requires `renderPreviewer` implementation.");
	    }
	
	    return this.editMode() ? this.renderEditor() : this.renderPreviewer()
	  }
	
	}
	
	module.exports = BlockType


/***/ },
/* 23 */
/*!*********************************************************!*\
  !*** ./colonel-kurtz/constants/block_list_constants.js ***!
  \*********************************************************/
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	
	var KeyMirror = __webpack_require__(/*! react/lib/keyMirror */ 42)
	
	var BlockListConstants = KeyMirror({
	  BLOCK_LIST_CREATE : null,
	  BLOCK_LIST_MOVE   : null
	})
	
	module.exports = BlockListConstants


/***/ },
/* 24 */
/*!****************************************************!*\
  !*** ./colonel-kurtz/constants/block_constants.js ***!
  \****************************************************/
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	
	var KeyMirror = __webpack_require__(/*! react/lib/keyMirror */ 42)
	
	var BlockConstants = KeyMirror({
	  BLOCK_CREATE  : null,
	  BLOCK_UPDATE  : null,
	  BLOCK_DESTROY : null
	})
	
	module.exports = BlockConstants


/***/ },
/* 25 */
/*!*******************************************!*\
  !*** ./colonel-kurtz/dispatcher/index.js ***!
  \*******************************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Dispatcher is used to broadcast payloads to registered callbacks.
	 *
	 * This is different from generic pub-sub systems in two ways:
	 *
	 * - Callbacks are not subscribed to particular events. Every payload is dispatched to every registered callback.
	 * - Callbacks can be deferred in whole or part until other callbacks have been executed.
	 *
	 * See http://facebook.github.io/flux/docs/dispatcher.html
	 */
	
	var Dispatcher = __webpack_require__(/*! flux */ 58).Dispatcher
	
	module.exports = new Dispatcher()


/***/ },
/* 26 */
/*!********************************************!*\
  !*** ./colonel-kurtz/models/block_list.js ***!
  \********************************************/
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	var uid  = __webpack_require__(/*! ../utils/uid */ 8)
	
	
	                  
	                   
	             
	                         
	
	  function BlockList(params)                                        {"use strict";
	    this.editorId = params.editorId
	    this.blockId = params.blockId
	    this.id      = uid()
	    this.$BlockList_blocks = []
	  }
	
	  BlockList.prototype.all=function()        {"use strict";
	    return this.$BlockList_blocks
	  };
	
	  BlockList.prototype.has=function(id) {"use strict";
	    return this.indexOf(id) > -1
	  };
	
	  BlockList.prototype.indexOf=function(id) {"use strict";
	    return this.$BlockList_blocks.indexOf(id)
	  };
	
	  BlockList.prototype.removeBlock=function(blockId)              {"use strict";
	    this.$BlockList_blocks = this.$BlockList_blocks.filter(function(id)  {return id !== blockId;})
	  };
	
	  BlockList.prototype.insertBlock=function(blockId       , position)              {"use strict";
	    this.$BlockList_blocks.splice(position, 0, blockId)
	  };
	
	  BlockList.prototype.move=function(fromId       , toId)              {"use strict";
	    var from = this.indexOf(fromId)
	    var to   = this.indexOf(toId)
	
	    this.$BlockList_blocks.splice(to, 0, this.$BlockList_blocks.splice(from, 1)[0]);
	  };
	
	  BlockList.prototype.toJSON=function()         {"use strict";
	    // Note: This is to get around circular dependency issues
	    var Block = __webpack_require__(/*! ../stores/block_store */ 19)
	
	    return this.all().map(Block.find).filter(Boolean).map(function(b)  {return b.toJSON();})
	  };
	
	
	
	module.exports = BlockList


/***/ },
/* 27 */
/*!******************************************!*\
  !*** ./colonel-kurtz/style/colonel.scss ***!
  \******************************************/
/***/ function(module, exports, __webpack_require__) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 28 */,
/* 29 */
/*!********************************!*\
  !*** ./addons/medium/index.js ***!
  \********************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * This component adds a medium.com-like rich text editor block type.
	 *
	 * Source for this component can be found here:
	 * https://github.com/daviferreira/medium-editor
	 */
	
	var Editor    = __webpack_require__(/*! ./editor */ 43)
	var Previewer = __webpack_require__(/*! ./previewer */ 44)
	var React     = __webpack_require__(/*! react */ 1)
	
	__webpack_require__(/*! ./style */ 45)
	
	var Medium = {
	
	  defaultContent:function() {
	    return { html: '', text: '' }
	  },
	
	  renderEditor:function() {
	    return React.createElement(Editor, React.__spread({onBlur:  this.setContent},   this.state.content ))
	  },
	
	  renderPreviewer:function() {
	    return React.createElement(Previewer, React.__spread({},   this.state.content ))
	  }
	
	}
	
	module.exports = Medium


/***/ },
/* 30 */
/*!*******************************!*\
  !*** ./addons/image/index.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Image Colonel Kurtz Addon
	 * This component adds a basic image block type, including a
	 * src, caption, and credit
	 */
	
	var Editor    = __webpack_require__(/*! ./editor */ 47)
	var Previewer = __webpack_require__(/*! ./previewer */ 48)
	var React     = __webpack_require__(/*! react */ 1)
	
	__webpack_require__(/*! ./style */ 49)
	
	var Image = {
	
	  defaultContent:function() {
	    return { src: '', caption: '', attribution: '' }
	  },
	
	  renderEditor:function() {
	    return React.createElement(Editor, React.__spread({onChange:  this.setContent},   this.state.content ))
	  },
	
	  renderPreviewer:function() {
	    return React.createElement(Previewer, React.__spread({},   this.state.content ))
	  }
	
	}
	
	module.exports = Image


/***/ },
/* 31 */
/*!*********************************!*\
  !*** ./addons/youtube/index.js ***!
  \*********************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Image Colonel Kurtz Addon
	 * This component adds a basic image block type, including a
	 * src, caption, and credit
	 */
	
	var Editor    = __webpack_require__(/*! ./editor */ 51)
	var Previewer = __webpack_require__(/*! ./previewer */ 52)
	var React     = __webpack_require__(/*! react */ 1)
	
	__webpack_require__(/*! ./style */ 53)
	
	var YouTube = {
	
	  defaultContent:function() {
	    return { video_id: '' }
	  },
	
	  renderEditor:function() {
	    return React.createElement(Editor, React.__spread({onChange:  this.setContent},   this.state.content ))
	  },
	
	  renderPreviewer:function() {
	    return React.createElement(Previewer, React.__spread({},   this.state.content ))
	  }
	
	}
	
	module.exports = YouTube


/***/ },
/* 32 */
/*!*****************************************************!*\
  !*** ./colonel-kurtz/constants/editor_constants.js ***!
  \*****************************************************/
/***/ function(module, exports, __webpack_require__) {

	var KeyMirror = __webpack_require__(/*! react/lib/keyMirror */ 42)
	
	module.exports = KeyMirror({
	  EDITOR_CREATE : null,
	  EDITOR_UPDATE : null
	})


/***/ },
/* 33 */,
/* 34 */
/*!**************************************************!*\
  !*** ./colonel-kurtz/stores/block_type_store.js ***!
  \**************************************************/
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	
	var Constants  = __webpack_require__(/*! ../constants/block_type_constants */ 39)
	var Dispatcher = __webpack_require__(/*! ../dispatcher */ 25)
	var Immutable  = __webpack_require__(/*! immutable */ 15)
	var React      = __webpack_require__(/*! react */ 1)
	var invariant  = __webpack_require__(/*! react/lib/invariant */ 41)
	
	var _blockTypes = Immutable.List()
	var _defaults   = {
	  icon  : null,
	  types : null
	}
	
	var BlockTypeStore = {
	
	  keys:function()                {
	    return _blockTypes.toArray().map(function(b)  {return b.id;})
	  },
	
	  find:function (id       )          {
	    return _blockTypes.find(function(b)  {return b.id === id;}) || null
	  },
	
	  _create:function (params        )       {
	    var record = Object.assign({}, _defaults, params )
	
	    invariant(record.id, 'BlockType must have an identifier')
	
	    _blockTypes = _blockTypes.push(record)
	  },
	
	  dispatchToken: Dispatcher.register(function(action        ) {
	    switch (action.type) {
	      case Constants.BLOCK_TYPE_CREATE:
	        BlockTypeStore._create(action.params)
	        break
	      default:
	        // do nothing
	    }
	  })
	
	}
	
	module.exports = BlockTypeStore


/***/ },
/* 35 */
/*!***************************************************!*\
  !*** ./colonel-kurtz/constants/mode_constants.js ***!
  \***************************************************/
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	
	var KeyMirror = __webpack_require__(/*! react/lib/keyMirror */ 42)
	
	module.exports = KeyMirror({
	  EDIT_MODE    : null,
	  PREVIEW_MODE : null
	})


/***/ },
/* 36 */
/*!********************************************!*\
  !*** ./colonel-kurtz/components/editor.js ***!
  \********************************************/
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	
	var React           = __webpack_require__(/*! react */ 1)
	var EditorBlockList = __webpack_require__(/*! ./editor_block_list */ 56)
	
	var Editor = React.createClass({displayName: 'Editor',
	
	  render:function()      {
	    var $__0=     this.props,editor=$__0.editor,initialBlockListId=$__0.initialBlockListId
	
	    return (
	      React.createElement(EditorBlockList, {editor: editor, initialBlockListId: initialBlockListId })
	    )
	  }
	
	})
	
	module.exports = Editor


/***/ },
/* 37 */
/*!***********************************************!*\
  !*** ./colonel-kurtz/components/previewer.js ***!
  \***********************************************/
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	
	var React              = __webpack_require__(/*! react */ 1)
	var PreviewerBlockList = __webpack_require__(/*! ./previewer_block_list */ 57)
	
	var Previewer = React.createClass({displayName: 'Previewer',
	
	  render:function()      {
	    return(
	      React.createElement(PreviewerBlockList, {initialBlockListId:  this.props.initialBlockListId})
	    )
	  }
	
	})
	
	module.exports = Previewer


/***/ },
/* 38 */
/*!***************************************!*\
  !*** ./colonel-kurtz/models/block.js ***!
  \***************************************/
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	var uid       = __webpack_require__(/*! ../utils/uid */ 8)
	var BlockList = __webpack_require__(/*! ../stores/block_list_store */ 7)
	
	
	                   
	             
	                            
	               
	
	  function Block(params)                                                               {"use strict";
	    this.content = params.content || null
	    this.id = uid()
	    this.parentBlockListId = params.parentBlockListId
	    this.type = params.type || 'text'
	  }
	
	  Block.prototype.toJSON=function()         {"use strict";
	    // Note: This is to get around circular dependency issues
	    var BlockList = __webpack_require__(/*! ../stores/block_list_store */ 7)
	
	    var blockList = BlockList.findByBlockId(this.id)
	
	    return {
	      blocks  : blockList ? blockList.toJSON() : [],
	      content : this.content,
	      type    : this.type
	    }
	  };
	
	
	module.exports = Block


/***/ },
/* 39 */
/*!*********************************************************!*\
  !*** ./colonel-kurtz/constants/block_type_constants.js ***!
  \*********************************************************/
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	
	var KeyMirror = __webpack_require__(/*! react/lib/keyMirror */ 42)
	
	var BlockTypeConstants = KeyMirror({
	  BLOCK_TYPE_CREATE : null
	})
	
	module.exports = BlockTypeConstants


/***/ },
/* 40 */
/*!***********************************************!*\
  !*** ./colonel-kurtz/components/ui/button.js ***!
  \***********************************************/
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(/*! react */ 1);
	
	var Button = React.createClass({displayName: 'Button',
	
	  getDefaultProps:function() {
	    return {
	      tagName  : 'button'
	    }
	  },
	
	  render:function() {
	    var $__0=      this.props,children=$__0.children,tagName=$__0.tagName,attrs=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{children:1,tagName:1});
	
	    return (
	      React.createElement(tagName, attrs, [
	        children
	      ])
	    );
	  }
	});
	
	module.exports = Button;


/***/ },
/* 41 */
/*!**********************************!*\
  !*** ./~/react/lib/invariant.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule invariant
	 */
	
	"use strict";
	
	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */
	
	var invariant = function(condition, format, a, b, c, d, e, f) {
	  if (true) {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }
	
	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error(
	        'Minified exception occurred; use the non-minified dev environment ' +
	        'for the full error message and additional helpful warnings.'
	      );
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(
	        'Invariant Violation: ' +
	        format.replace(/%s/g, function() { return args[argIndex++]; })
	      );
	    }
	
	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	};
	
	module.exports = invariant;


/***/ },
/* 42 */
/*!**********************************!*\
  !*** ./~/react/lib/keyMirror.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule keyMirror
	 * @typechecks static-only
	 */
	
	"use strict";
	
	var invariant = __webpack_require__(/*! ./invariant */ 41);
	
	/**
	 * Constructs an enumeration with keys equal to their value.
	 *
	 * For example:
	 *
	 *   var COLORS = keyMirror({blue: null, red: null});
	 *   var myColor = COLORS.blue;
	 *   var isColorValid = !!COLORS[myColor];
	 *
	 * The last line could not be performed if the values of the generated enum were
	 * not equal to their keys.
	 *
	 *   Input:  {key1: val1, key2: val2}
	 *   Output: {key1: key1, key2: key2}
	 *
	 * @param {object} obj
	 * @return {object}
	 */
	var keyMirror = function(obj) {
	  var ret = {};
	  var key;
	  (true ? invariant(
	    obj instanceof Object && !Array.isArray(obj),
	    'keyMirror(...): Argument must be an object.'
	  ) : invariant(obj instanceof Object && !Array.isArray(obj)));
	  for (key in obj) {
	    if (!obj.hasOwnProperty(key)) {
	      continue;
	    }
	    ret[key] = key;
	  }
	  return ret;
	};
	
	module.exports = keyMirror;


/***/ },
/* 43 */
/*!*********************************!*\
  !*** ./addons/medium/editor.js ***!
  \*********************************/
/***/ function(module, exports, __webpack_require__) {

	var MediumEditor = __webpack_require__(/*! ./vendor/medium-editor */ 61)
	var React        = __webpack_require__(/*! react */ 1)
	var Types        = React.PropTypes
	
	var Editor = React.createClass({displayName: 'Editor',
	
	  propTypes: {
	    html   : Types.string.isRequired,
	    onBlur : Types.func.isRequired
	  },
	
	  getDefaultProps:function() {
	    return {
	      options: {
	        buttons: [ 'header1', 'header2', 'bold', 'italic', 'underline', 'anchor', 'quote',  'unorderedlist', 'orderedlist' ],
	        firstHeader: 'h1',
	        secondHeader: 'h2',
	        diffLeft: 0,
	        diffTop: -10,
	        disableDoubleReturn: true
	      }
	    }
	  },
	
	  shouldComponentUpdate:function(props        , state        ){
	    return false
	  },
	
	  componentDidMount:function() {
	    this.setState({
	      editor: new MediumEditor(this.refs.editor.getDOMNode(), this.props.options)
	    })
	  },
	
	  componentWillUnmount:function() {
	    this.state.editor.deactivate()
	  },
	
	  render:function() {
	    return (
	      React.createElement("div", {className: "col-block-content"}, 
	        React.createElement("div", {className: "col-medium", onBlur:  this._onBlur, role: "textarea", 'aria-multiline': "true", ref: "editor", dangerouslySetInnerHTML: { __html: this.props.html}})
	      )
	    )
	  },
	
	  _onBlur:function() {
	    var editor = this.refs.editor.getDOMNode()
	
	    this.props.onBlur({
	      text: editor.textContent,
	      html: editor.innerHTML
	    })
	  }
	
	})
	
	module.exports = Editor


/***/ },
/* 44 */
/*!************************************!*\
  !*** ./addons/medium/previewer.js ***!
  \************************************/
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(/*! react */ 1)
	
	var Previewer = React.createClass({displayName: 'Previewer',
	
	  render:function() {
	    return (
	      React.createElement("div", {className: "col-block-content"}, 
	        React.createElement("div", {className: "col-medium-preview", dangerouslySetInnerHTML: { __html: this.props.html}})
	      )
	    )
	  }
	
	})
	
	module.exports = Previewer


/***/ },
/* 45 */
/*!**********************************!*\
  !*** ./addons/medium/style.scss ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 46 */,
/* 47 */
/*!********************************!*\
  !*** ./addons/image/editor.js ***!
  \********************************/
/***/ function(module, exports, __webpack_require__) {

	var Field   = __webpack_require__(/*! ../common/field */ 62)
	var Graphic = __webpack_require__(/*! ./graphic */ 59)
	var React   = __webpack_require__(/*! react */ 1)
	var Types   = React.PropTypes
	
	var Editor = React.createClass({displayName: 'Editor',
	
	  propTypes: {
	    src         : Types.string,
	    caption     : Types.string,
	    attribution : Types.string,
	    onChange    : Types.func.isRequired
	  },
	
	  render:function() {
	    var $__0=      this.props,src=$__0.src,caption=$__0.caption,attribution=$__0.attribution
	
	    return (
	      React.createElement("div", {className: "col-img"}, 
	        React.createElement(Graphic, React.__spread({},   this.props )), 
	
	        React.createElement("fieldset", {className: "col-img-fieldset"}, 
	          React.createElement(Field, {label: "Image Source", type: "url", value: src, name: "image_src", onChange:  this._onSrcChange}), 
	          React.createElement(Field, {label: "Caption", type: "text", value: caption, name: "image_caption", onChange:  this._onCaptionChange}), 
	          React.createElement(Field, {label: "Attribution", type: "text", value: attribution, name: "image_attribution", onChange:  this._onAttributionChange})
	        )
	      )
	    )
	  },
	
	  _onSrcChange:function(e) {
	    this.props.onChange({ src: e.currentTarget.value })
	  },
	
	  _onCaptionChange:function(e) {
	    this.props.onChange({ caption: e.currentTarget.value })
	  },
	
	  _onAttributionChange:function(e) {
	    this.props.onChange({ attribution: e.currentTarget.value })
	  }
	
	})
	
	module.exports = Editor


/***/ },
/* 48 */
/*!***********************************!*\
  !*** ./addons/image/previewer.js ***!
  \***********************************/
/***/ function(module, exports, __webpack_require__) {

	var React   = __webpack_require__(/*! react */ 1)
	var Graphic = __webpack_require__(/*! ./graphic */ 59)
	
	var Previewer = React.createClass({displayName: 'Previewer',
	
	  render:function() {
	    return React.createElement(Graphic, React.__spread({},  this.props ))
	  }
	
	})
	
	module.exports = Previewer


/***/ },
/* 49 */
/*!*********************************!*\
  !*** ./addons/image/style.scss ***!
  \*********************************/
/***/ function(module, exports, __webpack_require__) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 50 */,
/* 51 */
/*!**********************************!*\
  !*** ./addons/youtube/editor.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	var Field   = __webpack_require__(/*! ../common/field */ 62)
	var Player  = __webpack_require__(/*! ./player */ 60)
	var React   = __webpack_require__(/*! react */ 1)
	var Types   = React.PropTypes
	
	var Editor = React.createClass({displayName: 'Editor',
	
	  propTypes: {
	    src      : Types.string,
	    onChange : Types.func.isRequired
	  },
	
	  render:function() {
	    var $__0=    this.props,video_id=$__0.video_id
	
	    return (
	      React.createElement("div", {className: "col-youtube"}, 
	        React.createElement(Player, {video_id: video_id }), 
	
	        React.createElement("fieldset", {className: "col-youtube-fieldset"}, 
	          React.createElement(Field, {label: "YouTube Video ID", value: video_id, name: "youtube_video_id", onChange:  this._onChange})
	        )
	      )
	    )
	  },
	
	  _onChange:function(e) {
	    this.props.onChange({ video_id: e.currentTarget.value })
	  }
	
	})
	
	module.exports = Editor


/***/ },
/* 52 */
/*!*************************************!*\
  !*** ./addons/youtube/previewer.js ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	var React  = __webpack_require__(/*! react */ 1)
	var Player = __webpack_require__(/*! ./player */ 60)
	
	var Previewer = React.createClass({displayName: 'Previewer',
	
	  render:function() {
	    return (
	      React.createElement("div", {className: "col-youtube"}, 
	        React.createElement(Player, {src:  this.props.src})
	      )
	    )
	  }
	
	})
	
	module.exports = Previewer


/***/ },
/* 53 */
/*!***********************************!*\
  !*** ./addons/youtube/style.scss ***!
  \***********************************/
/***/ function(module, exports, __webpack_require__) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 54 */,
/* 55 */,
/* 56 */
/*!*******************************************************!*\
  !*** ./colonel-kurtz/components/editor_block_list.js ***!
  \*******************************************************/
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	
	var BlockMenu    = __webpack_require__(/*! ./block_menu */ 64)
	var EditorBlock  = __webpack_require__(/*! ./editor_block */ 65)
	var HasBlockList = __webpack_require__(/*! ../mixins/has_block_list */ 66)
	var React        = __webpack_require__(/*! react/addons */ 63)
	var Animation    = React.addons.CSSTransitionGroup;
	
	var EditorBlockList = React.createClass({displayName: 'EditorBlockList',
	
	  mixins: [ HasBlockList ],
	
	  getBlockMenu:function(position) {
	    var $__0=     this.props,block=$__0.block,editor=$__0.editor
	
	    return (
	      React.createElement(BlockMenu, {key: "block_menu", block: block, editor: editor, parentBlockListId:  this.blockListId(), position: position })
	    )
	  },
	
	  getBlock:function(blockId, i) {
	    return (
	      React.createElement("div", {key: blockId }, 
	        React.createElement(EditorBlock, {initialBlockId: blockId, editor:  this.props.editor}), 
	         this.getBlockMenu(i + 1) 
	      )
	    )
	  },
	
	  render:function()      {
	    var blockIds = this.state.blockIds
	
	    return (
	      React.createElement(Animation, {component: "div", className: "col-blocks", transitionName: "col-block"}, 
	         this.getBlockMenu(0), 
	         blockIds.map(this.getBlock) 
	      )
	    )
	  }
	
	})
	
	module.exports = EditorBlockList


/***/ },
/* 57 */
/*!**********************************************************!*\
  !*** ./colonel-kurtz/components/previewer_block_list.js ***!
  \**********************************************************/
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	
	var HasBlockList   = __webpack_require__(/*! ../mixins/has_block_list */ 66)
	var PreviewerBlock = __webpack_require__(/*! ./previewer_block */ 67)
	var React          = __webpack_require__(/*! react */ 1)
	
	var PreviewerBlockList = React.createClass({displayName: 'PreviewerBlockList',
	
	  mixins: [ HasBlockList ],
	
	  blockComponents:function()                      {
	    return this.state.blockIds.map(function(blockId) {
	      return React.createElement(PreviewerBlock, {key: blockId, initialBlockId: blockId })
	    })
	  },
	
	  render:function()      {
	    return (
	      React.createElement("div", {className: "col-blocks"}, 
	         this.blockComponents() 
	      )
	    )
	  }
	
	})
	
	module.exports = PreviewerBlockList


/***/ },
/* 58 */
/*!*************************!*\
  !*** ./~/flux/index.js ***!
  \*************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */
	
	module.exports.Dispatcher = __webpack_require__(/*! ./lib/Dispatcher */ 68)


/***/ },
/* 59 */
/*!*********************************!*\
  !*** ./addons/image/graphic.js ***!
  \*********************************/
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(/*! react */ 1)
	var Types = React.PropTypes
	
	var Graphic = React.createClass({displayName: 'Graphic',
	
	  getCaption:function() {
	    var caption = this.props.caption
	
	    return caption ? (
	      React.createElement("figcaption", {className: "col-img-caption"}, caption )
	    ) : null
	  },
	
	  render:function() {
	    var $__0=     this.props,src=$__0.src,credit=$__0.credit
	
	    return src ? (
	      React.createElement("figure", {className: "col-img-figure"}, 
	        React.createElement("img", {className: "col-img-graphic", src: src, alt: ""}), 
	         this.getCaption() 
	      )
	    ) : null
	  }
	
	})
	
	module.exports = Graphic


/***/ },
/* 60 */
/*!**********************************!*\
  !*** ./addons/youtube/player.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(/*! react */ 1)
	
	var _baseUrl = "https://www.youtube.com/embed/"
	
	var Player = React.createClass({displayName: 'Player',
	
	  render:function() {
	    var $__0=    this.props,video_id=$__0.video_id
	
	    return video_id ? (
	      React.createElement("div", {className: "col-youtube-player"}, 
	        React.createElement("iframe", {className: "col-youtube-frame", src:  _baseUrl + video_id, frameBorder: "0", allowFullScreen: true})
	      )
	    ) : null
	  },
	
	})
	
	module.exports = Player


/***/ },
/* 61 */
/*!***********************************************!*\
  !*** ./addons/medium/vendor/medium-editor.js ***!
  \***********************************************/
/***/ function(module, exports, __webpack_require__) {

	/*global module, console, define*/
	
	function MediumEditor(elements, options) {
	    'use strict';
	    return this.init(elements, options);
	}
	
	if (true) {
	    module.exports = MediumEditor;
	}
	// AMD support
	else if (typeof define === 'function' && define.amd) {
	    define(function () {
	        'use strict';
	        return MediumEditor;
	    });
	}
	
	(function (window, document) {
	    'use strict';
	
	    function extend(b, a) {
	        var prop;
	        if (b === undefined) {
	            return a;
	        }
	        for (prop in a) {
	            if (a.hasOwnProperty(prop) && b.hasOwnProperty(prop) === false) {
	                b[prop] = a[prop];
	            }
	        }
	        return b;
	    }
	
	    function isDescendant(parent, child) {
	         var node = child.parentNode;
	         while (node !== null) {
	             if (node === parent) {
	                 return true;
	             }
	             node = node.parentNode;
	         }
	         return false;
	    }
	
	    // http://stackoverflow.com/questions/5605401/insert-link-in-contenteditable-element
	    // by Tim Down
	    function saveSelection() {
	        var i,
	            len,
	            ranges,
	            sel = this.options.contentWindow.getSelection();
	        if (sel.getRangeAt && sel.rangeCount) {
	            ranges = [];
	            for (i = 0, len = sel.rangeCount; i < len; i += 1) {
	                ranges.push(sel.getRangeAt(i));
	            }
	            return ranges;
	        }
	        return null;
	    }
	
	    function restoreSelection(savedSel) {
	        var i,
	            len,
	            sel = this.options.contentWindow.getSelection();
	        if (savedSel) {
	            sel.removeAllRanges();
	            for (i = 0, len = savedSel.length; i < len; i += 1) {
	                sel.addRange(savedSel[i]);
	            }
	        }
	    }
	
	    // http://stackoverflow.com/questions/1197401/how-can-i-get-the-element-the-caret-is-in-with-javascript-when-using-contentedi
	    // by You
	    function getSelectionStart() {
	        var node = this.options.ownerDocument.getSelection().anchorNode,
	            startNode = (node && node.nodeType === 3 ? node.parentNode : node);
	        return startNode;
	    }
	
	    // http://stackoverflow.com/questions/4176923/html-of-selected-text
	    // by Tim Down
	    function getSelectionHtml() {
	        var i,
	            html = '',
	            sel,
	            len,
	            container;
	        if (this.options.contentWindow.getSelection !== undefined) {
	            sel = this.options.contentWindow.getSelection();
	            if (sel.rangeCount) {
	                container = this.options.ownerDocument.createElement('div');
	                for (i = 0, len = sel.rangeCount; i < len; i += 1) {
	                    container.appendChild(sel.getRangeAt(i).cloneContents());
	                }
	                html = container.innerHTML;
	            }
	        } else if (this.options.ownerDocument.selection !== undefined) {
	            if (this.options.ownerDocument.selection.type === 'Text') {
	                html = this.options.ownerDocument.selection.createRange().htmlText;
	            }
	        }
	        return html;
	    }
	
	    // https://github.com/jashkenas/underscore
	    function isElement(obj) {
	        return !!(obj && obj.nodeType === 1);
	    }
	
	    MediumEditor.prototype = {
	        defaults: {
	            allowMultiParagraphSelection: true,
	            anchorInputPlaceholder: 'Paste or type a link',
	            anchorPreviewHideDelay: 500,
	            buttons: ['bold', 'italic', 'underline', 'anchor', 'header1', 'header2', 'quote'],
	            buttonLabels: false,
	            checkLinkFormat: false,
	            cleanPastedHTML: false,
	            delay: 0,
	            diffLeft: 0,
	            diffTop: -10,
	            disableReturn: false,
	            disableDoubleReturn: false,
	            disableToolbar: false,
	            disableEditing: false,
	            elementsContainer: false,
	            contentWindow: window,
	            ownerDocument: document,
	            firstHeader: 'h3',
	            forcePlainText: true,
	            placeholder: 'Type your text',
	            secondHeader: 'h4',
	            targetBlank: false,
	            anchorTarget: false,
	            anchorButton: false,
	            anchorButtonClass: 'btn',
	            extensions: {},
	            activeButtonClass: 'medium-editor-button-active',
	            firstButtonClass: 'medium-editor-button-first',
	            lastButtonClass: 'medium-editor-button-last'
	        },
	
	        // http://stackoverflow.com/questions/17907445/how-to-detect-ie11#comment30165888_17907562
	        // by rg89
	        isIE: ((navigator.appName === 'Microsoft Internet Explorer') || ((navigator.appName === 'Netscape') && (new RegExp('Trident/.*rv:([0-9]{1,}[.0-9]{0,})').exec(navigator.userAgent) !== null))),
	
	        init: function (elements, options) {
	            this.options = extend(options, this.defaults);
	            this.setElementSelection(elements);
	            if (this.elements.length === 0) {
	                return;
	            }
	            this.parentElements = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'pre'];
	            if (!this.options.elementsContainer) {
	                this.options.elementsContainer = document.body;
	            }
	            this.id = this.options.elementsContainer.querySelectorAll('.medium-editor-toolbar').length + 1;
	            return this.setup();
	        },
	
	        setup: function () {
	            this.events = [];
	            this.isActive = true;
	            this.initElements()
	                .bindSelect()
	                .bindPaste()
	                .setPlaceholders()
	                .bindWindowActions()
	                .passInstance();
	        },
	
	        on: function(target, event, listener, useCapture) {
	            target.addEventListener(event, listener, useCapture);
	            this.events.push([target, event, listener, useCapture]);
	        },
	
	        off: function(target, event, listener, useCapture) {
	            var index = this.events.indexOf([target, event, listener, useCapture]),
	                e;
	            if(index !== -1) {
	                e = this.events.splice(index, 1);
	                e[0].removeEventListener(e[1], e[2], e[3]);
	            }
	        },
	
	        removeAllEvents: function() {
	            var e = this.events.pop();
	            while(e) {
	                e[0].removeEventListener(e[1], e[2], e[3]);
	                e = this.events.pop();
	            }
	        },
	
	        initElements: function () {
	            this.updateElementList();
	            var i,
	                addToolbar = false;
	            for (i = 0; i < this.elements.length; i += 1) {
	                if (!this.options.disableEditing && !this.elements[i].getAttribute('data-disable-editing')) {
	                    this.elements[i].setAttribute('contentEditable', true);
	                }
	                if (!this.elements[i].getAttribute('data-placeholder')) {
	                    this.elements[i].setAttribute('data-placeholder', this.options.placeholder);
	                }
	                this.elements[i].setAttribute('data-medium-element', true);
	                this.bindParagraphCreation(i).bindReturn(i).bindTab(i);
	                if (!this.options.disableToolbar && !this.elements[i].getAttribute('data-disable-toolbar')) {
	                    addToolbar = true;
	                }
	            }
	            // Init toolbar
	            if (addToolbar) {
	                this.initToolbar()
	                    .bindButtons()
	                    .bindAnchorForm()
	                    .bindAnchorPreview();
	            }
	            return this;
	        },
	
	        setElementSelection: function (selector) {
	            this.elementSelection = selector;
	            this.updateElementList();
	        },
	
	        updateElementList: function () {
	            this.elements = typeof this.elementSelection === 'string' ? this.options.ownerDocument.querySelectorAll(this.elementSelection) : this.elementSelection;
	            if (this.elements.nodeType === 1) {
	                this.elements = [this.elements];
	            }
	        },
	
	        serialize: function () {
	            var i,
	                elementid,
	                content = {};
	            for (i = 0; i < this.elements.length; i += 1) {
	                elementid = (this.elements[i].id !== '') ? this.elements[i].id : 'element-' + i;
	                content[elementid] = {
	                    value: this.elements[i].innerHTML.trim()
	                };
	            }
	            return content;
	        },
	
	        /**
	         * Helper function to call a method with a number of parameters on all registered extensions.
	         * The function assures that the function exists before calling.
	         *
	         * @param {string} funcName name of the function to call
	         * @param [args] arguments passed into funcName
	         */
	        callExtensions: function (funcName) {
	            if (arguments.length < 1) {
	                return;
	            }
	
	            var args = Array.prototype.slice.call(arguments, 1),
	                ext,
	                name;
	
	            for (name in this.options.extensions) {
	                if (this.options.extensions.hasOwnProperty(name)) {
	                    ext = this.options.extensions[name];
	                    if (ext[funcName] !== undefined) {
	                        ext[funcName].apply(ext, args);
	                    }
	                }
	            }
	        },
	
	        /**
	         * Pass current Medium Editor instance to all extensions
	         * if extension constructor has 'parent' attribute set to 'true'
	         *
	         */
	        passInstance: function () {
	            var self = this,
	                ext,
	                name;
	
	            for (name in self.options.extensions) {
	                if (self.options.extensions.hasOwnProperty(name)) {
	                    ext = self.options.extensions[name];
	
	                    if (ext.parent) {
	                        ext.base = self;
	                    }
	                }
	            }
	
	            return self;
	        },
	
	        bindParagraphCreation: function (index) {
	            var self = this;
	            this.on(this.elements[index], 'keypress', function (e) {
	                var node = getSelectionStart.call(self),
	                    tagName;
	                if (e.which === 32) {
	                    tagName = node.tagName.toLowerCase();
	                    if (tagName === 'a') {
	                        document.execCommand('unlink', false, null);
	                    }
	                }
	            });
	
	            this.on(this.elements[index], 'keyup', function (e) {
	                var node = getSelectionStart.call(self),
	                    tagName,
	                    editorElement;
	
	                if (node && node.getAttribute('data-medium-element') && node.children.length === 0 && !(self.options.disableReturn || node.getAttribute('data-disable-return'))) {
	                    document.execCommand('formatBlock', false, 'p');
	                }
	                if (e.which === 13) {
	                    node = getSelectionStart.call(self);
	                    tagName = node.tagName.toLowerCase();
	                    editorElement = self.getSelectionElement();
	
	                    if (!(self.options.disableReturn || editorElement.getAttribute('data-disable-return')) &&
	                        tagName !== 'li' && !self.isListItemChild(node)) {
	                        if (!e.shiftKey) {
	                            document.execCommand('formatBlock', false, 'p');
	                        }
	                        if (tagName === 'a') {
	                            document.execCommand('unlink', false, null);
	                        }
	                    }
	                }
	            });
	            return this;
	        },
	
	        isListItemChild: function (node) {
	            var parentNode = node.parentNode,
	                tagName = parentNode.tagName.toLowerCase();
	            while (this.parentElements.indexOf(tagName) === -1 && tagName !== 'div') {
	                if (tagName === 'li') {
	                    return true;
	                }
	                parentNode = parentNode.parentNode;
	                if (parentNode && parentNode.tagName) {
	                    tagName = parentNode.tagName.toLowerCase();
	                } else {
	                    return false;
	                }
	            }
	            return false;
	        },
	
	        bindReturn: function (index) {
	            var self = this;
	            this.on(this.elements[index], 'keypress', function (e) {
	                if (e.which === 13) {
	                    if (self.options.disableReturn || this.getAttribute('data-disable-return')) {
	                        e.preventDefault();
	                    } else if (self.options.disableDoubleReturn || this.getAttribute('data-disable-double-return')) {
	                        var node = getSelectionStart.call(self);
	                        if (node && node.innerText === '\n') {
	                            e.preventDefault();
	                        }
	                    }
	                }
	            });
	            return this;
	        },
	
	        bindTab: function (index) {
	            var self = this;
	            this.on(this.elements[index], 'keydown', function (e) {
	                if (e.which === 9) {
	                    // Override tab only for pre nodes
	                    var tag = getSelectionStart.call(self).tagName.toLowerCase();
	                    if (tag === 'pre') {
	                        e.preventDefault();
	                        document.execCommand('insertHtml', null, '    ');
	                    }
	
	                    // Tab to indent list structures!
	                    if (tag === 'li') {
	                        e.preventDefault();
	
	                        // If Shift is down, outdent, otherwise indent
	                        if (e.shiftKey) {
	                            document.execCommand('outdent', e);
	                        } else {
	                            document.execCommand('indent', e);
	                        }
	                    }
	                }
	            });
	            return this;
	        },
	
	        buttonTemplate: function (btnType) {
	            var buttonLabels = this.getButtonLabels(this.options.buttonLabels),
	                buttonTemplates = {
	                    'bold': '<button class="medium-editor-action medium-editor-action-bold" data-action="bold" data-element="b">' + buttonLabels.bold + '</button>',
	                    'italic': '<button class="medium-editor-action medium-editor-action-italic" data-action="italic" data-element="i">' + buttonLabels.italic + '</button>',
	                    'underline': '<button class="medium-editor-action medium-editor-action-underline" data-action="underline" data-element="u">' + buttonLabels.underline + '</button>',
	                    'strikethrough': '<button class="medium-editor-action medium-editor-action-strikethrough" data-action="strikethrough" data-element="strike">' + buttonLabels.strikethrough +'</button>',
	                    'superscript': '<button class="medium-editor-action medium-editor-action-superscript" data-action="superscript" data-element="sup">' + buttonLabels.superscript + '</button>',
	                    'subscript': '<button class="medium-editor-action medium-editor-action-subscript" data-action="subscript" data-element="sub">' + buttonLabels.subscript + '</button>',
	                    'anchor': '<button class="medium-editor-action medium-editor-action-anchor" data-action="anchor" data-element="a">' + buttonLabels.anchor + '</button>',
	                    'image': '<button class="medium-editor-action medium-editor-action-image" data-action="image" data-element="img">' + buttonLabels.image + '</button>',
	                    'header1': '<button class="medium-editor-action medium-editor-action-header1" data-action="append-' + this.options.firstHeader + '" data-element="' + this.options.firstHeader + '">' + buttonLabels.header1 + '</button>',
	                    'header2': '<button class="medium-editor-action medium-editor-action-header2" data-action="append-' + this.options.secondHeader + '" data-element="' + this.options.secondHeader + '">' + buttonLabels.header2 + '</button>',
	                    'quote': '<button class="medium-editor-action medium-editor-action-quote" data-action="append-blockquote" data-element="blockquote">' + buttonLabels.quote + '</button>',
	                    'orderedlist': '<button class="medium-editor-action medium-editor-action-orderedlist" data-action="insertorderedlist" data-element="ol">' + buttonLabels.orderedlist + '</button>',
	                    'unorderedlist': '<button class="medium-editor-action medium-editor-action-unorderedlist" data-action="insertunorderedlist" data-element="ul">' + buttonLabels.unorderedlist + '</button>',
	                    'pre': '<button class="medium-editor-action medium-editor-action-pre" data-action="append-pre" data-element="pre">' + buttonLabels.pre + '</button>',
	                    'indent': '<button class="medium-editor-action medium-editor-action-indent" data-action="indent" data-element="ul">' + buttonLabels.indent + '</button>',
	                    'outdent': '<button class="medium-editor-action medium-editor-action-outdent" data-action="outdent" data-element="ul">' + buttonLabels.outdent + '</button>',
	                    'justifyCenter': '<button class="medium-editor-action medium-editor-action-justifyCenter" data-action="justifyCenter" data-element="">' + buttonLabels.justifyCenter + '</button>',
	                    'justifyFull': '<button class="medium-editor-action medium-editor-action-justifyFull" data-action="justifyFull" data-element="">' + buttonLabels.justifyFull + '</button>',
	                    'justifyLeft': '<button class="medium-editor-action medium-editor-action-justifyLeft" data-action="justifyLeft" data-element="">' + buttonLabels.justifyLeft + '</button>',
	                    'justifyRight': '<button class="medium-editor-action medium-editor-action-justifyRight" data-action="justifyRight" data-element="">' + buttonLabels.justifyRight + '</button>'
	                };
	            return buttonTemplates[btnType] || false;
	        },
	
	        // TODO: break method
	        getButtonLabels: function (buttonLabelType) {
	            var customButtonLabels,
	                attrname,
	                buttonLabels = {
	                    'bold': '<b>B</b>',
	                    'italic': '<b><i>I</i></b>',
	                    'underline': '<b><u>U</u></b>',
	                    'strikethrough': '<s>A</s>',
	                    'superscript': '<b>x<sup>1</sup></b>',
	                    'subscript': '<b>x<sub>1</sub></b>',
	                    'anchor': '<b>#</b>',
	                    'image': '<b>image</b>',
	                    'header1': '<b>H1</b>',
	                    'header2': '<b>H2</b>',
	                    'quote': '<b>&ldquo;</b>',
	                    'orderedlist': '<b>1.</b>',
	                    'unorderedlist': '<b>&bull;</b>',
	                    'pre': '<b>0101</b>',
	                    'indent': '<b>&rarr;</b>',
	                    'outdent': '<b>&larr;</b>',
	                    'justifyCenter': '<b>C</b>',
	                    'justifyFull': '<b>J</b>',
	                    'justifyLeft': '<b>L</b>',
	                    'justifyRight': '<b>R</b>'
	                };
	            if (buttonLabelType === 'fontawesome') {
	                customButtonLabels = {
	                    'bold': '<i class="fa fa-bold"></i>',
	                    'italic': '<i class="fa fa-italic"></i>',
	                    'underline': '<i class="fa fa-underline"></i>',
	                    'strikethrough': '<i class="fa fa-strikethrough"></i>',
	                    'superscript': '<i class="fa fa-superscript"></i>',
	                    'subscript': '<i class="fa fa-subscript"></i>',
	                    'anchor': '<i class="fa fa-link"></i>',
	                    'image': '<i class="fa fa-picture-o"></i>',
	                    'quote': '<i class="fa fa-quote-right"></i>',
	                    'orderedlist': '<i class="fa fa-list-ol"></i>',
	                    'unorderedlist': '<i class="fa fa-list-ul"></i>',
	                    'pre': '<i class="fa fa-code fa-lg"></i>',
	                    'indent': '<i class="fa fa-indent"></i>',
	                    'outdent': '<i class="fa fa-outdent"></i>',
	                    'justifyCenter': '<i class="fa fa-align-center"></i>',
	                    'justifyFull': '<i class="fa fa-align-justify"></i>',
	                    'justifyLeft': '<i class="fa fa-align-left"></i>',
	                    'justifyRight': '<i class="fa fa-align-right"></i>'
	                };
	            } else if (typeof buttonLabelType === 'object') {
	                customButtonLabels = buttonLabelType;
	            }
	            if (typeof customButtonLabels === 'object') {
	                for (attrname in customButtonLabels) {
	                    if (customButtonLabels.hasOwnProperty(attrname)) {
	                        buttonLabels[attrname] = customButtonLabels[attrname];
	                    }
	                }
	            }
	            return buttonLabels;
	        },
	
	        initToolbar: function () {
	            if (this.toolbar) {
	                return this;
	            }
	            this.toolbar = this.createToolbar();
	            this.keepToolbarAlive = false;
	            this.anchorForm = this.toolbar.querySelector('.medium-editor-toolbar-form-anchor');
	            this.anchorInput = this.anchorForm.querySelector('input.medium-editor-toolbar-anchor-input');
	            this.anchorTarget = this.anchorForm.querySelector('input.medium-editor-toolbar-anchor-target');
	            this.anchorButton = this.anchorForm.querySelector('input.medium-editor-toolbar-anchor-button');
	            this.toolbarActions = this.toolbar.querySelector('.medium-editor-toolbar-actions');
	            this.anchorPreview = this.createAnchorPreview();
	
	            return this;
	        },
	
	        createToolbar: function () {
	            var toolbar = document.createElement('div');
	            toolbar.id = 'medium-editor-toolbar-' + this.id;
	            toolbar.className = 'medium-editor-toolbar';
	            toolbar.appendChild(this.toolbarButtons());
	            toolbar.appendChild(this.toolbarFormAnchor());
	            this.options.elementsContainer.appendChild(toolbar);
	            return toolbar;
	        },
	
	        //TODO: actionTemplate
	        toolbarButtons: function () {
	            var btns = this.options.buttons,
	                ul = document.createElement('ul'),
	                li,
	                i,
	                btn,
	                ext;
	
	            ul.id = 'medium-editor-toolbar-actions';
	            ul.className = 'medium-editor-toolbar-actions clearfix';
	
	            for (i = 0; i < btns.length; i += 1) {
	                if (this.options.extensions.hasOwnProperty(btns[i])) {
	                    ext = this.options.extensions[btns[i]];
	                    btn = ext.getButton !== undefined ? ext.getButton() : null;
	                } else {
	                    btn = this.buttonTemplate(btns[i]);
	                }
	
	                if (btn) {
	                    li = document.createElement('li');
	                    if (isElement(btn)) {
	                        li.appendChild(btn);
	                    } else {
	                        li.innerHTML = btn;
	                    }
	                    ul.appendChild(li);
	                }
	            }
	
	            return ul;
	        },
	
	        toolbarFormAnchor: function () {
	            var anchor = document.createElement('div'),
	                input = document.createElement('input'),
	                target_label = document.createElement('label'),
	                target = document.createElement('input'),
	                button_label = document.createElement('label'),
	                button = document.createElement('input'),
	                close = document.createElement('a'),
	                save = document.createElement('a');
	
	            close.setAttribute('href', '#');
	            close.className = 'medium-editor-toobar-anchor-close';
	            close.innerHTML = '&times;';
	
	            save.setAttribute('href', '#');
	            save.className = 'medium-editor-toobar-anchor-save';
	            save.innerHTML = '&#10003;';
	
	            input.setAttribute('type', 'text');
	            input.className = 'medium-editor-toolbar-anchor-input';
	            input.setAttribute('placeholder', this.options.anchorInputPlaceholder);
	
	
	            target.setAttribute('type', 'checkbox');
	            target.className = 'medium-editor-toolbar-anchor-target';
	            target_label.innerHTML = "Open in New Window?";
	            target_label.insertBefore(target, target_label.firstChild);
	
	            button.setAttribute('type', 'checkbox');
	            button.className = 'medium-editor-toolbar-anchor-button';
	            button_label.innerHTML = "Button";
	            button_label.insertBefore(button, button_label.firstChild);
	
	
	            anchor.className = 'medium-editor-toolbar-form-anchor';
	            anchor.id = 'medium-editor-toolbar-form-anchor';
	            anchor.appendChild(input);
	
	            anchor.appendChild(save);
	            anchor.appendChild(close);
	
	            if (this.options.anchorTarget) {
	                anchor.appendChild(target_label);
	            }
	
	            if (this.options.anchorButton) {
	                anchor.appendChild(button_label);
	            }
	
	            return anchor;
	        },
	
	        bindSelect: function () {
	            var self = this,
	                timer = '',
	                i;
	
	            this.checkSelectionWrapper = function (e) {
	
	                // Do not close the toolbar when bluring the editable area and clicking into the anchor form
	                if (e && self.clickingIntoArchorForm(e)) {
	                    return false;
	                }
	
	                clearTimeout(timer);
	                timer = setTimeout(function () {
	                    self.checkSelection();
	                }, self.options.delay);
	            };
	
	            this.on(document.documentElement, 'mouseup', this.checkSelectionWrapper);
	
	            for (i = 0; i < this.elements.length; i += 1) {
	                this.on(this.elements[i], 'keyup', this.checkSelectionWrapper);
	                this.on(this.elements[i], 'blur', this.checkSelectionWrapper);
	            }
	            return this;
	        },
	
	        checkSelection: function () {
	            var newSelection,
	                selectionElement;
	
	            if (this.keepToolbarAlive !== true && !this.options.disableToolbar) {
	
	                newSelection = this.options.contentWindow.getSelection();
	                if (newSelection.toString().trim() === '' ||
	                    (this.options.allowMultiParagraphSelection === false && this.hasMultiParagraphs()) ||
	                    this.selectionInContentEditableFalse()) {
	                    this.hideToolbarActions();
	                } else {
	                    selectionElement = this.getSelectionElement();
	                    if (!selectionElement || selectionElement.getAttribute('data-disable-toolbar')) {
	                        this.hideToolbarActions();
	                    } else {
	                        this.checkSelectionElement(newSelection, selectionElement);
	                    }
	                }
	            }
	            return this;
	        },
	
	        clickingIntoArchorForm: function (e) {
	            var self = this;
	
	            if (e.type && e.type.toLowerCase() === 'blur' && e.relatedTarget && e.relatedTarget === self.anchorInput) {
	                return true;
	            }
	
	            return false;
	        },
	
	        hasMultiParagraphs: function () {
	            var selectionHtml = getSelectionHtml.call(this).replace(/<[\S]+><\/[\S]+>/gim, ''),
	                hasMultiParagraphs = selectionHtml.match(/<(p|h[0-6]|blockquote)>([\s\S]*?)<\/(p|h[0-6]|blockquote)>/g);
	
	            return (hasMultiParagraphs ? hasMultiParagraphs.length : 0);
	        },
	
	        checkSelectionElement: function (newSelection, selectionElement) {
	            var i;
	            this.selection = newSelection;
	            this.selectionRange = this.selection.getRangeAt(0);
	            for (i = 0; i < this.elements.length; i += 1) {
	                if (this.elements[i] === selectionElement) {
	                    this.setToolbarButtonStates()
	                        .setToolbarPosition()
	                        .showToolbarActions();
	                    return;
	                }
	            }
	            this.hideToolbarActions();
	        },
	
	        findMatchingSelectionParent: function(testElementFunction) {
	            var selection = this.options.contentWindow.getSelection(), range, current;
	
	            if (selection.rangeCount === 0) {
	                return false;
	            }
	
	            range = selection.getRangeAt(0);
	            current = range.commonAncestorContainer;
	
	            do {
	              if (current.nodeType === 1){
	                if ( testElementFunction(current) )
	                {
	                    return current;
	                }
	                // do not traverse upwards past the nearest containing editor
	                if (current.getAttribute('data-medium-element')) {
	                    return false;
	                }
	              }
	
	              current = current.parentNode;
	            } while (current);
	
	            return false;
	        },
	
	        getSelectionElement: function () {
	            return this.findMatchingSelectionParent(function(el) {
	                return el.getAttribute('data-medium-element');
	            });
	        },
	
	        selectionInContentEditableFalse: function () {
	            return this.findMatchingSelectionParent(function(el) {
	                return (el && el.nodeName !== '#text' && el.getAttribute('contenteditable') === 'false');
	            });
	        },
	
	        setToolbarPosition: function () {
	            var buttonHeight = 50,
	                selection = this.options.contentWindow.getSelection(),
	                range = selection.getRangeAt(0),
	                boundary = range.getBoundingClientRect(),
	                defaultLeft = (this.options.diffLeft) - (this.toolbar.offsetWidth / 2),
	                middleBoundary = (boundary.left + boundary.right) / 2,
	                halfOffsetWidth = this.toolbar.offsetWidth / 2;
	            if (boundary.top < buttonHeight) {
	                this.toolbar.classList.add('medium-toolbar-arrow-over');
	                this.toolbar.classList.remove('medium-toolbar-arrow-under');
	                this.toolbar.style.top = buttonHeight + boundary.bottom - this.options.diffTop + this.options.contentWindow.pageYOffset - this.toolbar.offsetHeight + 'px';
	            } else {
	                this.toolbar.classList.add('medium-toolbar-arrow-under');
	                this.toolbar.classList.remove('medium-toolbar-arrow-over');
	                this.toolbar.style.top = boundary.top + this.options.diffTop + this.options.contentWindow.pageYOffset - this.toolbar.offsetHeight + 'px';
	            }
	            if (middleBoundary < halfOffsetWidth) {
	                this.toolbar.style.left = defaultLeft + halfOffsetWidth + 'px';
	            } else if ((this.options.contentWindow.innerWidth - middleBoundary) < halfOffsetWidth) {
	                this.toolbar.style.left = this.options.contentWindow.innerWidth + defaultLeft - halfOffsetWidth + 'px';
	            } else {
	                this.toolbar.style.left = defaultLeft + middleBoundary + 'px';
	            }
	
	            this.hideAnchorPreview();
	
	            return this;
	        },
	
	        setToolbarButtonStates: function () {
	            var buttons = this.toolbarActions.querySelectorAll('button'),
	                i;
	            for (i = 0; i < buttons.length; i += 1) {
	                buttons[i].classList.remove(this.options.activeButtonClass);
	            }
	            this.checkActiveButtons();
	            return this;
	        },
	
	        checkActiveButtons: function () {
	            var elements = Array.prototype.slice.call(this.elements),
	                parentNode = this.getSelectedParentElement();
	            while (parentNode.tagName !== undefined && this.parentElements.indexOf(parentNode.tagName.toLowerCase) === -1) {
	                this.activateButton(parentNode.tagName.toLowerCase());
	                this.callExtensions('checkState', parentNode);
	
	                // we can abort the search upwards if we leave the contentEditable element
	                if (elements.indexOf(parentNode) !== -1) {
	                    break;
	                }
	                parentNode = parentNode.parentNode;
	            }
	        },
	
	        activateButton: function (tag) {
	            var el = this.toolbar.querySelector('[data-element="' + tag + '"]');
	            if (el !== null && el.className.indexOf(this.options.activeButtonClass) === -1) {
	                el.className += ' ' + this.options.activeButtonClass;
	            }
	        },
	
	        bindButtons: function () {
	            var buttons = this.toolbar.querySelectorAll('button'),
	                i,
	                self = this,
	                triggerAction = function (e) {
	                    e.preventDefault();
	                    e.stopPropagation();
	                    if (self.selection === undefined) {
	                        self.checkSelection();
	                    }
	                    if (this.className.indexOf(self.options.activeButtonClass) > -1) {
	                        this.classList.remove(self.options.activeButtonClass);
	                    } else {
	                        this.className += ' ' + self.options.activeButtonClass;
	                    }
	                    if (this.hasAttribute('data-action')) {
	                        self.execAction(this.getAttribute('data-action'), e);
	                    }
	                };
	            for (i = 0; i < buttons.length; i += 1) {
	                this.on(buttons[i], 'click', triggerAction);
	            }
	            this.setFirstAndLastItems(buttons);
	            return this;
	        },
	
	        setFirstAndLastItems: function (buttons) {
	            if (buttons.length > 0) {
	                buttons[0].className += ' ' + this.options.firstButtonClass;
	                buttons[buttons.length - 1].className += ' ' + this.options.lastButtonClass;
	            }
	            return this;
	        },
	
	        execAction: function (action, e) {
	            if (action.indexOf('append-') > -1) {
	                this.execFormatBlock(action.replace('append-', ''));
	                this.setToolbarPosition();
	                this.setToolbarButtonStates();
	            } else if (action === 'anchor') {
	                this.triggerAnchorAction(e);
	            } else if (action === 'image') {
	                this.options.ownerDocument.execCommand('insertImage', false, this.options.contentWindow.getSelection());
	            } else {
	                this.options.ownerDocument.execCommand(action, false, null);
	                this.setToolbarPosition();
	            }
	        },
	
	        // http://stackoverflow.com/questions/15867542/range-object-get-selection-parent-node-chrome-vs-firefox
	        rangeSelectsSingleNode: function (range) {
	            var startNode = range.startContainer;
	            return startNode === range.endContainer &&
	                startNode.hasChildNodes() &&
	                range.endOffset === range.startOffset + 1;
	        },
	
	        getSelectedParentElement: function () {
	            var selectedParentElement = null,
	                range = this.selectionRange;
	            if (this.rangeSelectsSingleNode(range)) {
	                selectedParentElement = range.startContainer.childNodes[range.startOffset];
	            } else if (range.startContainer.nodeType === 3) {
	                selectedParentElement = range.startContainer.parentNode;
	            } else {
	                selectedParentElement = range.startContainer;
	            }
	            return selectedParentElement;
	        },
	
	        triggerAnchorAction: function () {
	            var selectedParentElement = this.getSelectedParentElement();
	            if (selectedParentElement.tagName &&
	                    selectedParentElement.tagName.toLowerCase() === 'a') {
	                this.options.ownerDocument.execCommand('unlink', false, null);
	            } else {
	                if (this.anchorForm.style.display === 'block') {
	                    this.showToolbarActions();
	                } else {
	                    this.showAnchorForm();
	                }
	            }
	            return this;
	        },
	
	        execFormatBlock: function (el) {
	            var selectionData = this.getSelectionData(this.selection.anchorNode);
	            // FF handles blockquote differently on formatBlock
	            // allowing nesting, we need to use outdent
	            // https://developer.mozilla.org/en-US/docs/Rich-Text_Editing_in_Mozilla
	            if (el === 'blockquote' && selectionData.el &&
	                selectionData.el.parentNode.tagName.toLowerCase() === 'blockquote') {
	                return this.options.ownerDocument.execCommand('outdent', false, null);
	            }
	            if (selectionData.tagName === el) {
	                el = 'p';
	            }
	            // When IE we need to add <> to heading elements and
	            //  blockquote needs to be called as indent
	            // http://stackoverflow.com/questions/10741831/execcommand-formatblock-headings-in-ie
	            // http://stackoverflow.com/questions/1816223/rich-text-editor-with-blockquote-function/1821777#1821777
	            if (this.isIE) {
	                if (el === 'blockquote') {
	                    return this.options.ownerDocument.execCommand('indent', false, el);
	                }
	                el = '<' + el + '>';
	            }
	            return this.options.ownerDocument.execCommand('formatBlock', false, el);
	        },
	
	        getSelectionData: function (el) {
	            var tagName;
	
	            if (el && el.tagName) {
	                tagName = el.tagName.toLowerCase();
	            }
	
	            while (el && this.parentElements.indexOf(tagName) === -1) {
	                el = el.parentNode;
	                if (el && el.tagName) {
	                    tagName = el.tagName.toLowerCase();
	                }
	            }
	
	            return {
	                el: el,
	                tagName: tagName
	            };
	        },
	
	        getFirstChild: function (el) {
	            var firstChild = el.firstChild;
	            while (firstChild !== null && firstChild.nodeType !== 1) {
	                firstChild = firstChild.nextSibling;
	            }
	            return firstChild;
	        },
	
	        hideToolbarActions: function () {
	            this.keepToolbarAlive = false;
	            if (this.toolbar !== undefined) {
	                this.toolbar.classList.remove('medium-editor-toolbar-active');
	            }
	        },
	
	        showToolbarActions: function () {
	            var self = this,
	                timer;
	            this.anchorForm.style.display = 'none';
	            this.toolbarActions.style.display = 'block';
	            this.keepToolbarAlive = false;
	            clearTimeout(timer);
	            timer = setTimeout(function () {
	                if (self.toolbar && !self.toolbar.classList.contains('medium-editor-toolbar-active')) {
	                    self.toolbar.classList.add('medium-editor-toolbar-active');
	                }
	            }, 100);
	        },
	
	        saveSelection: function() {
	            this.savedSelection = saveSelection.call(this);
	        },
	
	        restoreSelection: function() {
	            restoreSelection.call(this, this.savedSelection);
	        },
	
	        showAnchorForm: function (link_value) {
	            this.toolbarActions.style.display = 'none';
	            this.saveSelection();
	            this.anchorForm.style.display = 'block';
	            this.setToolbarPosition();
	            this.keepToolbarAlive = true;
	            this.anchorInput.focus();
	            this.anchorInput.value = link_value || '';
	        },
	
	        bindAnchorForm: function () {
	            var linkCancel = this.anchorForm.querySelector('a.medium-editor-toobar-anchor-close'),
	                linkSave = this.anchorForm.querySelector('a.medium-editor-toobar-anchor-save'),
	                self = this;
	
	            this.on(this.anchorForm, 'click', function (e) {
	                e.stopPropagation();
	                self.keepToolbarAlive = true;
	            });
	
	            this.on(this.anchorInput, 'keyup', function (e) {
	                var button = null,
	                    target;
	
	                if (e.keyCode === 13) {
	                    e.preventDefault();
	                    if (self.options.anchorTarget && self.anchorTarget.checked) {
	                        target = "_blank";
	                    }
	                    else {
	                        target = "_self";
	                    }
	
	                    if (self.options.anchorButton && self.anchorButton.checked) {
	                        button = self.options.anchorButtonClass;
	                    }
	
	                    self.createLink(this, target, button);
	                }
	            });
	
	            this.on(linkSave, 'click', function(e) {
	                var button = null,
	                    target;
	                e.preventDefault();
	                if ( self.options.anchorTarget && self.anchorTarget.checked) {
	                    target = "_blank";
	                }
	                else {
	                    target = "_self";
	                }
	
	                if (self.options.anchorButton && self.anchorButton.checked) {
	                    button = self.options.anchorButtonClass;
	                }
	
	                self.createLink(self.anchorInput, target, button);
	            }, true);
	
	            this.on(this.anchorInput, 'click', function (e) {
	                // make sure not to hide form when cliking into the input
	                e.stopPropagation();
	                self.keepToolbarAlive = true;
	            });
	
	            // Hide the anchor form when focusing outside of it.
	            this.on(this.options.ownerDocument.body, 'click', function (e) {
	                if (e.target !== self.anchorForm && !isDescendant(self.anchorForm, e.target) && !isDescendant(self.toolbarActions, e.target)) {
	                    self.keepToolbarAlive = false;
	                    self.checkSelection();
	                }
	            }, true);
	            this.on(this.options.ownerDocument.body, 'focus', function (e) {
	                if (e.target !== self.anchorForm && !isDescendant(self.anchorForm, e.target) && !isDescendant(self.toolbarActions, e.target)) {
	                    self.keepToolbarAlive = false;
	                    self.checkSelection();
	                }
	            }, true);
	
	            this.on(linkCancel, 'click', function (e) {
	                e.preventDefault();
	                self.showToolbarActions();
	                restoreSelection.call(self, self.savedSelection);
	            });
	            return this;
	        },
	
	
	        hideAnchorPreview: function () {
	            this.anchorPreview.classList.remove('medium-editor-anchor-preview-active');
	        },
	
	        // TODO: break method
	        showAnchorPreview: function (anchorEl) {
	            if (this.anchorPreview.classList.contains('medium-editor-anchor-preview-active')
	                || anchorEl.getAttribute('data-disable-preview')) {
	                return true;
	            }
	
	            var self = this,
	                buttonHeight = 40,
	                boundary = anchorEl.getBoundingClientRect(),
	                middleBoundary = (boundary.left + boundary.right) / 2,
	                halfOffsetWidth,
	                defaultLeft,
	                timer;
	
	            self.anchorPreview.querySelector('i').textContent = anchorEl.href;
	            halfOffsetWidth = self.anchorPreview.offsetWidth / 2;
	            defaultLeft = self.options.diffLeft - halfOffsetWidth;
	
	            clearTimeout(timer);
	            timer = setTimeout(function () {
	                if (self.anchorPreview && !self.anchorPreview.classList.contains('medium-editor-anchor-preview-active')) {
	                    self.anchorPreview.classList.add('medium-editor-anchor-preview-active');
	                }
	            }, 100);
	
	            self.observeAnchorPreview(anchorEl);
	
	            self.anchorPreview.classList.add('medium-toolbar-arrow-over');
	            self.anchorPreview.classList.remove('medium-toolbar-arrow-under');
	            self.anchorPreview.style.top = Math.round(buttonHeight + boundary.bottom - self.options.diffTop + this.options.contentWindow.pageYOffset - self.anchorPreview.offsetHeight) + 'px';
	            if (middleBoundary < halfOffsetWidth) {
	                self.anchorPreview.style.left = defaultLeft + halfOffsetWidth + 'px';
	            } else if ((this.options.contentWindow.innerWidth - middleBoundary) < halfOffsetWidth) {
	                self.anchorPreview.style.left = this.options.contentWindow.innerWidth + defaultLeft - halfOffsetWidth + 'px';
	            } else {
	                self.anchorPreview.style.left = defaultLeft + middleBoundary + 'px';
	            }
	
	            return this;
	        },
	
	        // TODO: break method
	        observeAnchorPreview: function (anchorEl) {
	            var self = this,
	                lastOver = (new Date()).getTime(),
	                over = true,
	                stamp = function () {
	                    lastOver = (new Date()).getTime();
	                    over = true;
	                },
	                unstamp = function (e) {
	                    if (!e.relatedTarget || !/anchor-preview/.test(e.relatedTarget.className)) {
	                        over = false;
	                    }
	                },
	                interval_timer = setInterval(function () {
	                    if (over) {
	                        return true;
	                    }
	                    var durr = (new Date()).getTime() - lastOver;
	                    if (durr > self.options.anchorPreviewHideDelay) {
	                        // hide the preview 1/2 second after mouse leaves the link
	                        self.hideAnchorPreview();
	
	                        // cleanup
	                        clearInterval(interval_timer);
	                        self.off(self.anchorPreview, 'mouseover', stamp);
	                        self.off(self.anchorPreview, 'mouseout', unstamp);
	                        self.off(anchorEl, 'mouseover', stamp);
	                        self.off(anchorEl, 'mouseout', unstamp);
	
	                    }
	                }, 200);
	
	            this.on(self.anchorPreview, 'mouseover', stamp);
	            this.on(self.anchorPreview, 'mouseout', unstamp);
	            this.on(anchorEl, 'mouseover', stamp);
	            this.on(anchorEl, 'mouseout', unstamp);
	        },
	
	        createAnchorPreview: function () {
	            var self = this,
	                anchorPreview = this.options.ownerDocument.createElement('div');
	
	            anchorPreview.id = 'medium-editor-anchor-preview-' + this.id;
	            anchorPreview.className = 'medium-editor-anchor-preview';
	            anchorPreview.innerHTML = this.anchorPreviewTemplate();
	            this.options.elementsContainer.appendChild(anchorPreview);
	
	            this.on(anchorPreview, 'click', function () {
	                self.anchorPreviewClickHandler();
	            });
	
	            return anchorPreview;
	        },
	
	        anchorPreviewTemplate: function () {
	            return '<div class="medium-editor-toolbar-anchor-preview" id="medium-editor-toolbar-anchor-preview">' +
	                '    <i class="medium-editor-toolbar-anchor-preview-inner"></i>' +
	                '</div>';
	        },
	
	        anchorPreviewClickHandler: function (e) {
	            if (this.activeAnchor) {
	
	                var self = this,
	                    range = this.options.ownerDocument.createRange(),
	                    sel = this.options.contentWindow.getSelection();
	
	                range.selectNodeContents(self.activeAnchor);
	                sel.removeAllRanges();
	                sel.addRange(range);
	                setTimeout(function () {
	                    if (self.activeAnchor) {
	                        self.showAnchorForm(self.activeAnchor.href);
	                    }
	                    self.keepToolbarAlive = false;
	                }, 100 + self.options.delay);
	
	            }
	
	            this.hideAnchorPreview();
	        },
	
	        editorAnchorObserver: function (e) {
	            var self = this,
	                overAnchor = true,
	                leaveAnchor = function () {
	                    // mark the anchor as no longer hovered, and stop listening
	                    overAnchor = false;
	                    self.off(self.activeAnchor, 'mouseout', leaveAnchor);
	                };
	
	            if (e.target && e.target.tagName.toLowerCase() === 'a') {
	
	                // Detect empty href attributes
	                // The browser will make href="" or href="#top"
	                // into absolute urls when accessed as e.targed.href, so check the html
	                if (!/href=["']\S+["']/.test(e.target.outerHTML) || /href=["']#\S+["']/.test(e.target.outerHTML)) {
	                    return true;
	                }
	
	                // only show when hovering on anchors
	                if (this.toolbar.classList.contains('medium-editor-toolbar-active')) {
	                    // only show when toolbar is not present
	                    return true;
	                }
	                this.activeAnchor = e.target;
	                this.on(this.activeAnchor, 'mouseout', leaveAnchor);
	                // show the anchor preview according to the configured delay
	                // if the mouse has not left the anchor tag in that time
	                setTimeout(function () {
	                    if (overAnchor) {
	                        self.showAnchorPreview(e.target);
	                    }
	                }, self.options.delay);
	
	
	            }
	        },
	
	        bindAnchorPreview: function (index) {
	            var i, self = this;
	            this.editorAnchorObserverWrapper = function (e) {
	                self.editorAnchorObserver(e);
	            };
	            for (i = 0; i < this.elements.length; i += 1) {
	                this.on(this.elements[i], 'mouseover', this.editorAnchorObserverWrapper);
	            }
	            return this;
	        },
	
	        checkLinkFormat: function (value) {
	            var re = /^(https?|ftps?|rtmpt?):\/\/|mailto:/;
	            return (re.test(value) ? '' : 'http://') + value;
	        },
	
	        setTargetBlank: function (el) {
	            var i;
	            el = el || getSelectionStart.call(this);
	            if (el.tagName.toLowerCase() === 'a') {
	                el.target = '_blank';
	            } else {
	                el = el.getElementsByTagName('a');
	
	                for (i = 0; i < el.length; i += 1) {
	                    el[i].target = '_blank';
	                }
	            }
	        },
	
	        setButtonClass: function (buttonClass) {
	            var el = getSelectionStart.call(this),
	                classes = buttonClass.split(' '),
	                i, j;
	            if (el.tagName.toLowerCase() === 'a') {
	                for (j = 0; j < classes.length; j += 1) {
	                    el.classList.add(classes[j]);
	                }
	            } else {
	                el = el.getElementsByTagName('a');
	                for (i = 0; i < el.length; i += 1) {
	                    for (j = 0; j < classes.length; j += 1) {
	                        el[i].classList.add(classes[j]);
	                    }
	                }
	            }
	        },
	
	        createLink: function (input, target, buttonClass) {
	            var i, event;
	
	            if (input.value.trim().length === 0) {
	                this.hideToolbarActions();
	                return;
	            }
	
	            restoreSelection.call(this, this.savedSelection);
	
	            if (this.options.checkLinkFormat) {
	                input.value = this.checkLinkFormat(input.value);
	            }
	
	            this.options.ownerDocument.execCommand('createLink', false, input.value);
	
	            if (this.options.targetBlank || target === "_blank") {
	                this.setTargetBlank();
	            }
	
	            if (buttonClass) {
	                this.setButtonClass(buttonClass);
	            }
	
	            if (this.options.targetBlank || target === "_blank" || buttonClass) {
	                event = this.options.ownerDocument.createEvent("HTMLEvents");
	                event.initEvent("input", true, true, this.options.contentWindow);
	                for (i = 0; i < this.elements.length; i += 1) {
	                    this.elements[i].dispatchEvent(event);
	                }
	            }
	
	            this.checkSelection();
	            this.showToolbarActions();
	            input.value = '';
	        },
	
	        bindWindowActions: function () {
	            var timerResize,
	                self = this;
	            this.windowResizeHandler = function () {
	                clearTimeout(timerResize);
	                timerResize = setTimeout(function () {
	                    if (self.toolbar && self.toolbar.classList.contains('medium-editor-toolbar-active')) {
	                        self.setToolbarPosition();
	                    }
	                }, 100);
	            };
	            this.on(this.options.contentWindow, 'resize', this.windowResizeHandler);
	            return this;
	        },
	
	        activate: function () {
	            if (this.isActive) {
	                return;
	            }
	
	            this.setup();
	        },
	
	        // TODO: break method
	        deactivate: function () {
	            var i;
	            if (!this.isActive) {
	                return;
	            }
	            this.isActive = false;
	
	            if (this.toolbar !== undefined) {
	                this.options.elementsContainer.removeChild(this.anchorPreview);
	                this.options.elementsContainer.removeChild(this.toolbar);
	                delete this.toolbar;
	                delete this.anchorPreview;
	            }
	
	            for (i = 0; i < this.elements.length; i += 1) {
	                this.elements[i].removeAttribute('contentEditable');
	                this.elements[i].removeAttribute('data-medium-element');
	            }
	
	            this.removeAllEvents();
	        },
	
	        htmlEntities: function (str) {
	            // converts special characters (like <) into their escaped/encoded values (like &lt;).
	            // This allows you to show to display the string without the browser reading it as HTML.
	            return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
	        },
	
	        bindPaste: function () {
	            var i, self = this;
	            this.pasteWrapper = function (e) {
	                var paragraphs,
	                    html = '',
	                    p;
	
	                this.classList.remove('medium-editor-placeholder');
	                if (!self.options.forcePlainText && !self.options.cleanPastedHTML) {
	                    return this;
	                }
	
	                if (e.clipboardData && e.clipboardData.getData && !e.defaultPrevented) {
	                    e.preventDefault();
	
	                    if (self.options.cleanPastedHTML && e.clipboardData.getData('text/html')) {
	                        return self.cleanPaste(e.clipboardData.getData('text/html'));
	                    }
	                    if (!(self.options.disableReturn || this.getAttribute('data-disable-return'))) {
	                        paragraphs = e.clipboardData.getData('text/plain').split(/[\r\n]/g);
	                        for (p = 0; p < paragraphs.length; p += 1) {
	                            if (paragraphs[p] !== '') {
	                                if (navigator.userAgent.match(/firefox/i) && p === 0) {
	                                    html += self.htmlEntities(paragraphs[p]);
	                                } else {
	                                    html += '<p>' + self.htmlEntities(paragraphs[p]) + '</p>';
	                                }
	                            }
	                        }
	                        self.options.ownerDocument.execCommand('insertHTML', false, html);
	                    } else {
	                        html = self.htmlEntities(e.clipboardData.getData('text/plain'));
	                        self.options.ownerDocument.execCommand('insertHTML', false, html);
	                    }
	                }
	            };
	            for (i = 0; i < this.elements.length; i += 1) {
	                this.on(this.elements[i], 'paste', this.pasteWrapper);
	            }
	            return this;
	        },
	
	        setPlaceholders: function () {
	            var i,
	                activatePlaceholder = function (el) {
	                    if (!(el.querySelector('img')) &&
	                            !(el.querySelector('blockquote')) &&
	                            el.textContent.replace(/^\s+|\s+$/g, '') === '') {
	                        el.classList.add('medium-editor-placeholder');
	                    }
	                },
	                placeholderWrapper = function (e) {
	                    this.classList.remove('medium-editor-placeholder');
	                    if (e.type !== 'keypress') {
	                        activatePlaceholder(this);
	                    }
	                };
	            for (i = 0; i < this.elements.length; i += 1) {
	                activatePlaceholder(this.elements[i]);
	                this.on(this.elements[i], 'blur', placeholderWrapper);
	                this.on(this.elements[i], 'keypress', placeholderWrapper);
	            }
	            return this;
	        },
	
	        cleanPaste: function (text) {
	
	            /*jslint regexp: true*/
	            /*
	                jslint does not allow character negation, because the negation
	                will not match any unicode characters. In the regexes in this
	                block, negation is used specifically to match the end of an html
	                tag, and in fact unicode characters *should* be allowed.
	            */
	            var i, elList, workEl,
	                el = this.getSelectionElement(),
	                multiline = /<p|<br|<div/.test(text),
	                replacements = [
	
	                    // replace two bogus tags that begin pastes from google docs
	                    [new RegExp(/<[^>]*docs-internal-guid[^>]*>/gi), ""],
	                    [new RegExp(/<\/b>(<br[^>]*>)?$/gi), ""],
	
	                     // un-html spaces and newlines inserted by OS X
	                    [new RegExp(/<span class="Apple-converted-space">\s+<\/span>/g), ' '],
	                    [new RegExp(/<br class="Apple-interchange-newline">/g), '<br>'],
	
	                    // replace google docs italics+bold with a span to be replaced once the html is inserted
	                    [new RegExp(/<span[^>]*(font-style:italic;font-weight:bold|font-weight:bold;font-style:italic)[^>]*>/gi), '<span class="replace-with italic bold">'],
	
	                    // replace google docs italics with a span to be replaced once the html is inserted
	                    [new RegExp(/<span[^>]*font-style:italic[^>]*>/gi), '<span class="replace-with italic">'],
	
	                    //[replace google docs bolds with a span to be replaced once the html is inserted
	                    [new RegExp(/<span[^>]*font-weight:bold[^>]*>/gi), '<span class="replace-with bold">'],
	
	                     // replace manually entered b/i/a tags with real ones
	                    [new RegExp(/&lt;(\/?)(i|b|a)&gt;/gi), '<$1$2>'],
	
	                     // replace manually a tags with real ones, converting smart-quotes from google docs
	                    [new RegExp(/&lt;a\s+href=(&quot;|&rdquo;|&ldquo;|“|”)([^&]+)(&quot;|&rdquo;|&ldquo;|“|”)&gt;/gi), '<a href="$2">']
	
	                ];
	            /*jslint regexp: false*/
	
	            for (i = 0; i < replacements.length; i += 1) {
	                text = text.replace(replacements[i][0], replacements[i][1]);
	            }
	
	            if (multiline) {
	
	                // double br's aren't converted to p tags, but we want paragraphs.
	                elList = text.split('<br><br>');
	
	                this.pasteHTML('<p>' + elList.join('</p><p>') + '</p>');
	                this.options.ownerDocument.execCommand('insertText', false, "\n");
	
	                // block element cleanup
	                elList = el.querySelectorAll('a,p,div,br');
	                for (i = 0; i < elList.length; i += 1) {
	
	                    workEl = elList[i];
	
	                    switch (workEl.tagName.toLowerCase()) {
	                    case 'a':
	                        if (this.options.targetBlank){
	                          this.setTargetBlank(workEl);
	                        }
	                        break;
	                    case 'p':
	                    case 'div':
	                        this.filterCommonBlocks(workEl);
	                        break;
	                    case 'br':
	                        this.filterLineBreak(workEl);
	                        break;
	                    }
	
	                }
	
	
	            } else {
	
	                this.pasteHTML(text);
	
	            }
	
	        },
	
	        pasteHTML: function (html) {
	            var elList, workEl, i, fragmentBody, pasteBlock = this.options.ownerDocument.createDocumentFragment();
	
	            pasteBlock.appendChild(this.options.ownerDocument.createElement('body'));
	
	            fragmentBody = pasteBlock.querySelector('body');
	            fragmentBody.innerHTML = html;
	
	            this.cleanupSpans(fragmentBody);
	
	            elList = fragmentBody.querySelectorAll('*');
	            for (i = 0; i < elList.length; i += 1) {
	
	                workEl = elList[i];
	
	                // delete ugly attributes
	                workEl.removeAttribute('class');
	                workEl.removeAttribute('style');
	                workEl.removeAttribute('dir');
	
	                if (workEl.tagName.toLowerCase() === 'meta') {
	                    workEl.parentNode.removeChild(workEl);
	                }
	
	            }
	            this.options.ownerDocument.execCommand('insertHTML', false, fragmentBody.innerHTML.replace(/&nbsp;/g, ' '));
	        },
	        isCommonBlock: function (el) {
	            return (el && (el.tagName.toLowerCase() === 'p' || el.tagName.toLowerCase() === 'div'));
	        },
	        filterCommonBlocks: function (el) {
	            if (/^\s*$/.test(el.innerText)) {
	                el.parentNode.removeChild(el);
	            }
	        },
	        filterLineBreak: function (el) {
	            if (this.isCommonBlock(el.previousElementSibling)) {
	
	                // remove stray br's following common block elements
	                el.parentNode.removeChild(el);
	
	            } else if (this.isCommonBlock(el.parentNode) && (el.parentNode.firstChild === el || el.parentNode.lastChild === el)) {
	
	                // remove br's just inside open or close tags of a div/p
	                el.parentNode.removeChild(el);
	
	            } else if (el.parentNode.childElementCount === 1) {
	
	                // and br's that are the only child of a div/p
	                this.removeWithParent(el);
	
	            }
	
	        },
	
	        // remove an element, including its parent, if it is the only element within its parent
	        removeWithParent: function (el) {
	            if (el && el.parentNode) {
	                if (el.parentNode.parentNode && el.parentNode.childElementCount === 1) {
	                    el.parentNode.parentNode.removeChild(el.parentNode);
	                } else {
	                    el.parentNode.removeChild(el.parentNode);
	                }
	            }
	        },
	
	        cleanupSpans: function (container_el) {
	
	            var i,
	                el,
	                new_el,
	                spans = container_el.querySelectorAll('.replace-with');
	
	            for (i = 0; i < spans.length; i += 1) {
	
	                el = spans[i];
	                new_el = this.options.ownerDocument.createElement(el.classList.contains('bold') ? 'b' : 'i');
	
	                if (el.classList.contains('bold') && el.classList.contains('italic')) {
	
	                    // add an i tag as well if this has both italics and bold
	                    new_el.innerHTML = '<i>' + el.innerHTML + '</i>';
	
	                } else {
	
	                    new_el.innerHTML = el.innerHTML;
	
	                }
	                el.parentNode.replaceChild(new_el, el);
	
	            }
	
	            spans = container_el.querySelectorAll('span');
	            for (i = 0; i < spans.length; i += 1) {
	
	                el = spans[i];
	
	                // remove empty spans, replace others with their contents
	                if (/^\s*$/.test()) {
	                    el.parentNode.removeChild(el);
	                } else {
	                    el.parentNode.replaceChild(this.options.ownerDocument.createTextNode(el.innerText), el);
	                }
	
	            }
	
	        }
	
	    };
	
	}(window, document));


/***/ },
/* 62 */
/*!********************************!*\
  !*** ./addons/common/field.js ***!
  \********************************/
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(/*! react */ 1)
	var Types = React.PropTypes
	
	var Field = React.createClass({displayName: 'Field',
	
	  getDefaultProps:function() {
	    return {
	      type: 'text'
	    }
	  },
	
	  render:function() {
	    var $__0=       this.props,label=$__0.label,name=$__0.name,type=$__0.type,props=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{label:1,name:1,type:1})
	
	    return (
	      React.createElement("div", {className: "col-img-field"}, 
	        React.createElement("label", {className: "col-img-label", htmlFor:  name || this.props.id}, 
	          label 
	        ), 
	        React.createElement("input", React.__spread({className: "col-img-input", type: type },   props , {name:  name || this.props.id}))
	      )
	    )
	  }
	
	})
	
	module.exports = Field


/***/ },
/* 63 */
/*!*******************************!*\
  !*** external "react/addons" ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = require("react/addons");

/***/ },
/* 64 */
/*!************************************************!*\
  !*** ./colonel-kurtz/components/block_menu.js ***!
  \************************************************/
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	
	var AddBlock  = __webpack_require__(/*! ./add_block */ 69)
	var BlockType = __webpack_require__(/*! ../stores/block_type_store */ 34)
	var Monitor   = __webpack_require__(/*! ../mixins/monitor */ 21)
	var React     = __webpack_require__(/*! react */ 1)
	
	var BlockMenu = React.createClass({displayName: 'BlockMenu',
	
	  mixins: [ Monitor ],
	
	  propTypes: {
	    editor: React.PropTypes.any.isRequired
	  },
	
	  getDefaultProps:function()                       {
	    return {
	      position: 0
	    }
	  },
	
	  getState:function()                           {
	    var $__0=     this.props,block=$__0.block,editor=$__0.editor
	
	    // If there is a given block, then use the accepted types provided by that definition
	    // Otherwise, fallback to the editor.
	    return {
	      types: block ? BlockType.find(block.type).types : editor.types
	    }
	  },
	
	  getButton:function(type       )               {
	    var $__0=     this.props,parentBlockListId=$__0.parentBlockListId,position=$__0.position
	
	    return React.createElement(AddBlock, {key: type, type: type, parentBlockListId: parentBlockListId, position: position })
	  },
	
	  getNavigation:function()               {
	    return (
	      React.createElement("nav", {className: "col-menu", role: "navigation"}, 
	         this.state.types.map(this.getButton) 
	      )
	    )
	  },
	
	  render:function()      {
	    return this.state.types ? this.getNavigation() : null
	  },
	
	})
	
	module.exports = BlockMenu


/***/ },
/* 65 */
/*!**************************************************!*\
  !*** ./colonel-kurtz/components/editor_block.js ***!
  \**************************************************/
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	
	var Block            = __webpack_require__(/*! ./block */ 70)
	var BlockListActions = __webpack_require__(/*! ../actions/block_list_actions */ 5)
	var Dragon           = __webpack_require__(/*! react-dragon */ 76)
	var HasBlockNesting  = __webpack_require__(/*! ../mixins/has_block_nesting */ 71)
	var Modes            = __webpack_require__(/*! ../constants/mode_constants */ 35)
	var React            = __webpack_require__(/*! react */ 1)
	var RemoveBlock      = __webpack_require__(/*! ./remove_block */ 72)
	
	var EditorBlock = React.createClass({displayName: 'EditorBlock',
	
	  mixins: [ HasBlockNesting ],
	
	  listComponent:function() {
	    return __webpack_require__(/*! ./editor_block_list */ 56)
	  },
	
	  render:function()      {
	    var $__0=     this.state.block,id=$__0.id,parentBlockListId=$__0.parentBlockListId
	
	    return (
	      React.createElement(Dragon, {className: "col-block", message: id, onDrop:  this._onDrop}, 
	
	        React.createElement(Block, {block:  this.state.block, mode:  Modes.EDIT_MODE}), 
	
	        React.createElement("div", {className: "col-toolbar"}, 
	          React.createElement(RemoveBlock, {blockId: id, parentBlockListId: parentBlockListId })
	        ), 
	
	         this.childBlockListComponent() 
	
	      )
	    )
	  },
	
	  _onDrop:function(fromId, toId) {
	    BlockListActions.move(this.state.block.parentBlockListId, fromId, toId)
	  }
	
	})
	
	module.exports = EditorBlock


/***/ },
/* 66 */
/*!************************************************!*\
  !*** ./colonel-kurtz/mixins/has_block_list.js ***!
  \************************************************/
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	
	var BlockList = __webpack_require__(/*! ../stores/block_list_store */ 7)
	var Monitor   = __webpack_require__(/*! ./monitor */ 21)
	var React     = __webpack_require__(/*! react */ 1)
	
	var HasBlockList = {
	
	  mixins: [ Monitor ],
	
	  getState:function()                              {
	    return {
	      blockIds : this.blockIds()
	    }
	  },
	
	  blockList:function()      {
	    return BlockList.find(this.blockListId())
	  },
	
	  blockListId:function()         {
	    return this.props.initialBlockListId
	  },
	
	  blockIds:function()                {
	    var blockList = this.blockList()
	    return blockList? blockList.all() : []
	  }
	
	}
	
	module.exports = HasBlockList


/***/ },
/* 67 */
/*!*****************************************************!*\
  !*** ./colonel-kurtz/components/previewer_block.js ***!
  \*****************************************************/
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	
	var Block           = __webpack_require__(/*! ./block */ 70)
	var HasBlockNesting = __webpack_require__(/*! ../mixins/has_block_nesting */ 71)
	var Modes           = __webpack_require__(/*! ../constants/mode_constants */ 35)
	var React           = __webpack_require__(/*! react */ 1)
	
	var PreviewerBlock = React.createClass({displayName: 'PreviewerBlock',
	
	  mixins: [ HasBlockNesting ],
	
	  listComponent:function()               {
	    return __webpack_require__(/*! ./previewer_block_list */ 57)
	  },
	
	  render:function()      {
	    return (
	      React.createElement("div", null, 
	        React.createElement(Block, {block:  this.state.block, mode:  Modes.PREVIEW_MODE}), 
	         this.childBlockListComponent() 
	      )
	    )
	  }
	
	})
	
	module.exports = PreviewerBlock


/***/ },
/* 68 */
/*!**********************************!*\
  !*** ./~/flux/lib/Dispatcher.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Copyright (c) 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule Dispatcher
	 * @typechecks
	 */
	
	"use strict";
	
	var invariant = __webpack_require__(/*! ./invariant */ 73);
	
	var _lastID = 1;
	var _prefix = 'ID_';
	
	/**
	 * Dispatcher is used to broadcast payloads to registered callbacks. This is
	 * different from generic pub-sub systems in two ways:
	 *
	 *   1) Callbacks are not subscribed to particular events. Every payload is
	 *      dispatched to every registered callback.
	 *   2) Callbacks can be deferred in whole or part until other callbacks have
	 *      been executed.
	 *
	 * For example, consider this hypothetical flight destination form, which
	 * selects a default city when a country is selected:
	 *
	 *   var flightDispatcher = new Dispatcher();
	 *
	 *   // Keeps track of which country is selected
	 *   var CountryStore = {country: null};
	 *
	 *   // Keeps track of which city is selected
	 *   var CityStore = {city: null};
	 *
	 *   // Keeps track of the base flight price of the selected city
	 *   var FlightPriceStore = {price: null}
	 *
	 * When a user changes the selected city, we dispatch the payload:
	 *
	 *   flightDispatcher.dispatch({
	 *     actionType: 'city-update',
	 *     selectedCity: 'paris'
	 *   });
	 *
	 * This payload is digested by `CityStore`:
	 *
	 *   flightDispatcher.register(function(payload) {
	 *     if (payload.actionType === 'city-update') {
	 *       CityStore.city = payload.selectedCity;
	 *     }
	 *   });
	 *
	 * When the user selects a country, we dispatch the payload:
	 *
	 *   flightDispatcher.dispatch({
	 *     actionType: 'country-update',
	 *     selectedCountry: 'australia'
	 *   });
	 *
	 * This payload is digested by both stores:
	 *
	 *    CountryStore.dispatchToken = flightDispatcher.register(function(payload) {
	 *     if (payload.actionType === 'country-update') {
	 *       CountryStore.country = payload.selectedCountry;
	 *     }
	 *   });
	 *
	 * When the callback to update `CountryStore` is registered, we save a reference
	 * to the returned token. Using this token with `waitFor()`, we can guarantee
	 * that `CountryStore` is updated before the callback that updates `CityStore`
	 * needs to query its data.
	 *
	 *   CityStore.dispatchToken = flightDispatcher.register(function(payload) {
	 *     if (payload.actionType === 'country-update') {
	 *       // `CountryStore.country` may not be updated.
	 *       flightDispatcher.waitFor([CountryStore.dispatchToken]);
	 *       // `CountryStore.country` is now guaranteed to be updated.
	 *
	 *       // Select the default city for the new country
	 *       CityStore.city = getDefaultCityForCountry(CountryStore.country);
	 *     }
	 *   });
	 *
	 * The usage of `waitFor()` can be chained, for example:
	 *
	 *   FlightPriceStore.dispatchToken =
	 *     flightDispatcher.register(function(payload) {
	 *       switch (payload.actionType) {
	 *         case 'country-update':
	 *           flightDispatcher.waitFor([CityStore.dispatchToken]);
	 *           FlightPriceStore.price =
	 *             getFlightPriceStore(CountryStore.country, CityStore.city);
	 *           break;
	 *
	 *         case 'city-update':
	 *           FlightPriceStore.price =
	 *             FlightPriceStore(CountryStore.country, CityStore.city);
	 *           break;
	 *     }
	 *   });
	 *
	 * The `country-update` payload will be guaranteed to invoke the stores'
	 * registered callbacks in order: `CountryStore`, `CityStore`, then
	 * `FlightPriceStore`.
	 */
	
	  function Dispatcher() {
	    this.$Dispatcher_callbacks = {};
	    this.$Dispatcher_isPending = {};
	    this.$Dispatcher_isHandled = {};
	    this.$Dispatcher_isDispatching = false;
	    this.$Dispatcher_pendingPayload = null;
	  }
	
	  /**
	   * Registers a callback to be invoked with every dispatched payload. Returns
	   * a token that can be used with `waitFor()`.
	   *
	   * @param {function} callback
	   * @return {string}
	   */
	  Dispatcher.prototype.register=function(callback) {
	    var id = _prefix + _lastID++;
	    this.$Dispatcher_callbacks[id] = callback;
	    return id;
	  };
	
	  /**
	   * Removes a callback based on its token.
	   *
	   * @param {string} id
	   */
	  Dispatcher.prototype.unregister=function(id) {
	    invariant(
	      this.$Dispatcher_callbacks[id],
	      'Dispatcher.unregister(...): `%s` does not map to a registered callback.',
	      id
	    );
	    delete this.$Dispatcher_callbacks[id];
	  };
	
	  /**
	   * Waits for the callbacks specified to be invoked before continuing execution
	   * of the current callback. This method should only be used by a callback in
	   * response to a dispatched payload.
	   *
	   * @param {array<string>} ids
	   */
	  Dispatcher.prototype.waitFor=function(ids) {
	    invariant(
	      this.$Dispatcher_isDispatching,
	      'Dispatcher.waitFor(...): Must be invoked while dispatching.'
	    );
	    for (var ii = 0; ii < ids.length; ii++) {
	      var id = ids[ii];
	      if (this.$Dispatcher_isPending[id]) {
	        invariant(
	          this.$Dispatcher_isHandled[id],
	          'Dispatcher.waitFor(...): Circular dependency detected while ' +
	          'waiting for `%s`.',
	          id
	        );
	        continue;
	      }
	      invariant(
	        this.$Dispatcher_callbacks[id],
	        'Dispatcher.waitFor(...): `%s` does not map to a registered callback.',
	        id
	      );
	      this.$Dispatcher_invokeCallback(id);
	    }
	  };
	
	  /**
	   * Dispatches a payload to all registered callbacks.
	   *
	   * @param {object} payload
	   */
	  Dispatcher.prototype.dispatch=function(payload) {
	    invariant(
	      !this.$Dispatcher_isDispatching,
	      'Dispatch.dispatch(...): Cannot dispatch in the middle of a dispatch.'
	    );
	    this.$Dispatcher_startDispatching(payload);
	    try {
	      for (var id in this.$Dispatcher_callbacks) {
	        if (this.$Dispatcher_isPending[id]) {
	          continue;
	        }
	        this.$Dispatcher_invokeCallback(id);
	      }
	    } finally {
	      this.$Dispatcher_stopDispatching();
	    }
	  };
	
	  /**
	   * Is this Dispatcher currently dispatching.
	   *
	   * @return {boolean}
	   */
	  Dispatcher.prototype.isDispatching=function() {
	    return this.$Dispatcher_isDispatching;
	  };
	
	  /**
	   * Call the callback stored with the given id. Also do some internal
	   * bookkeeping.
	   *
	   * @param {string} id
	   * @internal
	   */
	  Dispatcher.prototype.$Dispatcher_invokeCallback=function(id) {
	    this.$Dispatcher_isPending[id] = true;
	    this.$Dispatcher_callbacks[id](this.$Dispatcher_pendingPayload);
	    this.$Dispatcher_isHandled[id] = true;
	  };
	
	  /**
	   * Set up bookkeeping needed when dispatching.
	   *
	   * @param {object} payload
	   * @internal
	   */
	  Dispatcher.prototype.$Dispatcher_startDispatching=function(payload) {
	    for (var id in this.$Dispatcher_callbacks) {
	      this.$Dispatcher_isPending[id] = false;
	      this.$Dispatcher_isHandled[id] = false;
	    }
	    this.$Dispatcher_pendingPayload = payload;
	    this.$Dispatcher_isDispatching = true;
	  };
	
	  /**
	   * Clear bookkeeping used for dispatching.
	   *
	   * @internal
	   */
	  Dispatcher.prototype.$Dispatcher_stopDispatching=function() {
	    this.$Dispatcher_pendingPayload = null;
	    this.$Dispatcher_isDispatching = false;
	  };
	
	
	module.exports = Dispatcher;


/***/ },
/* 69 */
/*!***********************************************!*\
  !*** ./colonel-kurtz/components/add_block.js ***!
  \***********************************************/
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	
	var BlockType    = __webpack_require__(/*! ../stores/block_type_store */ 34)
	var Button       = __webpack_require__(/*! ./ui/button */ 40)
	var BlockActions = __webpack_require__(/*! ../actions/block_actions */ 4)
	var React        = __webpack_require__(/*! react */ 1)
	var Types        = React.PropTypes
	
	var AddBlock = React.createClass({displayName: 'AddBlock',
	
	  propTypes: {
	    parentBlockListId : Types.number.isRequired,
	    position          : Types.number,
	    type              : Types.string.isRequired
	  },
	
	  getInitialState:function() {
	    return BlockType.find(this.props.type)
	  },
	
	  render:function()      {
	    var $__0=      this.state,icon=$__0.icon,id=$__0.id,label=$__0.label
	
	    return (
	      React.createElement(Button, {'aria-label': label, className: "col-btn-icon", onClick:  this._onClick}, 
	        React.createElement("img", {src: icon, alt: id, 'aria-hidden': "true"})
	      )
	    )
	  },
	
	  _onClick:function(e) {
	    var $__0=      this.props,parentBlockListId=$__0.parentBlockListId,type=$__0.type,position=$__0.position
	
	    BlockActions.create({ parentBlockListId:parentBlockListId, position:position, type:type })
	
	    e.preventDefault()
	  }
	
	})
	
	module.exports = AddBlock


/***/ },
/* 70 */
/*!*******************************************!*\
  !*** ./colonel-kurtz/components/block.js ***!
  \*******************************************/
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	
	var BlockActions = __webpack_require__(/*! ../actions/block_actions */ 4)
	var BlockType    = __webpack_require__(/*! ../stores/block_type_store */ 34)
	var Monitor      = __webpack_require__(/*! ../mixins/monitor */ 21)
	var Pure         = __webpack_require__(/*! ../mixins/pure */ 74)
	var React        = __webpack_require__(/*! react */ 1)
	
	var Block = React.createClass({displayName: 'Block',
	
	  mixins: [ Monitor, Pure ],
	
	  propTypes: {
	    block: React.PropTypes.any.isRequired
	  },
	
	  getState:function()          {
	    return BlockType.find(this.props.block.type)
	  },
	
	  render:function()      {
	    var $__0=     this.props,block=$__0.block,props=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{block:1})
	    var $__1=    this.state,Component=$__1.component
	
	    return (
	      React.createElement(Component, React.__spread({initialContent:  block.content, updateContent:  this._onUpdateContent},   props ))
	    )
	  },
	
	  _onUpdateContent:function(content       )       {
	    BlockActions.update(this.props.block.id, content)
	  }
	
	})
	
	module.exports = Block


/***/ },
/* 71 */
/*!***************************************************!*\
  !*** ./colonel-kurtz/mixins/has_block_nesting.js ***!
  \***************************************************/
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	
	var React     = __webpack_require__(/*! react */ 1)
	var Block     = __webpack_require__(/*! ../stores/block_store */ 19)
	var BlockList = __webpack_require__(/*! ../stores/block_list_store */ 7)
	
	var HasBlockNesting = {
	
	  propTypes: {
	    editor: React.PropTypes.any.isRequired
	  },
	
	  getInitialState:function()         {
	    var id = this.props.initialBlockId;
	
	    return {
	      block     : Block.find(id),
	      blockList : BlockList.findByBlockId(id)
	    }
	  },
	
	  childBlockListComponent:function()               {
	    var $__0=     this.state,block=$__0.block,blockList=$__0.blockList;
	    var $__1=              this.props,editor=$__1.editor;
	    var ListComponent        = this.listComponent()
	
	    if (blockList) {
	      return React.createElement(ListComponent, {block: block, editor: editor, initialBlockListId:  blockList.id})
	    }
	  }
	
	}
	
	module.exports = HasBlockNesting


/***/ },
/* 72 */
/*!**************************************************!*\
  !*** ./colonel-kurtz/components/remove_block.js ***!
  \**************************************************/
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	
	var BlockActions = __webpack_require__(/*! ../actions/block_actions */ 4)
	var Button       = __webpack_require__(/*! ./ui/button */ 40)
	var React        = __webpack_require__(/*! react */ 1)
	var Strings      = __webpack_require__(/*! ../constants/strings */ 75)
	var Types        = React.PropTypes
	
	var RemoveBlock = React.createClass({displayName: 'RemoveBlock',
	
	  propTypes: {
	    blockId           : Types.number.isRequired,
	    parentBlockListId : Types.number.isRequired
	  },
	
	  render:function()      {
	    return (
	      React.createElement(Button, {'aria-label':  Strings.remove.label, className: "col-btn-remove", onClick:  this._onClick}, 
	        "×"
	      )
	    )
	  },
	
	  _onClick:function(e) {
	    var answer = confirm(Strings.remove.confirm)
	    var $__0=     this.props,blockId=$__0.blockId,parentBlockListId=$__0.parentBlockListId
	
	    e.preventDefault();
	
	    if (answer) {
	      BlockActions.destroy({ blockId:blockId, parentBlockListId:parentBlockListId })
	    }
	  }
	
	})
	
	module.exports = RemoveBlock


/***/ },
/* 73 */
/*!*********************************!*\
  !*** ./~/flux/lib/invariant.js ***!
  \*********************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule invariant
	 */
	
	"use strict";
	
	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */
	
	var invariant = function(condition, format, a, b, c, d, e, f) {
	  if (false) {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }
	
	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error(
	        'Minified exception occurred; use the non-minified dev environment ' +
	        'for the full error message and additional helpful warnings.'
	      );
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(
	        'Invariant Violation: ' +
	        format.replace(/%s/g, function() { return args[argIndex++]; })
	      );
	    }
	
	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	};
	
	module.exports = invariant;


/***/ },
/* 74 */
/*!**************************************!*\
  !*** ./colonel-kurtz/mixins/pure.js ***!
  \**************************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule ReactComponentWithPureRenderMixin
	 */
	
	"use strict";
	
	var shallowEqual = __webpack_require__(/*! react/lib/shallowEqual */ 77);
	
	/**
	 * If your React component's render function is "pure", e.g. it will render the
	 * same result given the same props and state, provide this Mixin for a
	 * considerable performance boost.
	 *
	 * Most React components have pure render functions.
	 *
	 * Example:
	 *
	 *   var ReactComponentWithPureRenderMixin =
	 *     require('ReactComponentWithPureRenderMixin');
	 *   React.createClass({
	 *     mixins: [ReactComponentWithPureRenderMixin],
	 *
	 *     render: function() {
	 *       return <div className={this.props.className}>foo</div>;
	 *     }
	 *   });
	 *
	 * Note: This only checks shallow equality for props and state. If these contain
	 * complex data structures this mixin may have false-negatives for deeper
	 * differences. Only mixin to components which have simple props and state, or
	 * use `forceUpdate()` when you know deep data structures have changed.
	 */
	var ReactComponentWithPureRenderMixin = {
	  shouldComponentUpdate: function(nextProps, nextState) {
	    return !shallowEqual(this.props, nextProps) ||
	    !shallowEqual(this.state, nextState);
	  }
	};
	
	module.exports = ReactComponentWithPureRenderMixin;


/***/ },
/* 75 */
/*!********************************************!*\
  !*** ./colonel-kurtz/constants/strings.js ***!
  \********************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
	  'remove' : {
	    'label'  : 'Remove this block',
	    'confirm': 'Are you sure you want to remove this block?'
	  },
	
	  'add' : {
	    'label' : 'Add a new block'
	  }
	}


/***/ },
/* 76 */
/*!*********************************************!*\
  !*** ./~/react-dragon/dist/react-dragon.js ***!
  \*********************************************/
/***/ function(module, exports, __webpack_require__) {

	(function webpackUniversalModuleDefinition(root, factory) {
		if(true)
			module.exports = factory(__webpack_require__(/*! react */ 1));
		else if(typeof define === 'function' && define.amd)
			define(["react"], factory);
		else {
			var a = typeof exports === 'object' ? factory(require("react")) : factory(root["react"]);
			for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
		}
	})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
	return /******/ (function(modules) { // webpackBootstrap
	/******/ 	// The module cache
	/******/ 	var installedModules = {};
	/******/
	/******/ 	// The require function
	/******/ 	function __webpack_require__(moduleId) {
	/******/
	/******/ 		// Check if module is in cache
	/******/ 		if(installedModules[moduleId])
	/******/ 			return installedModules[moduleId].exports;
	/******/
	/******/ 		// Create a new module (and put it into the cache)
	/******/ 		var module = installedModules[moduleId] = {
	/******/ 			exports: {},
	/******/ 			id: moduleId,
	/******/ 			loaded: false
	/******/ 		};
	/******/
	/******/ 		// Execute the module function
	/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
	/******/
	/******/ 		// Flag the module as loaded
	/******/ 		module.loaded = true;
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
	/******/ 	// __webpack_public_path__
	/******/ 	__webpack_require__.p = "";
	/******/
	/******/ 	// Load entry module and return exports
	/******/ 	return __webpack_require__(0);
	/******/ })
	/************************************************************************/
	/******/ ([
	/* 0 */
	/*!**********************!*\
	  !*** ./src/index.js ***!
	  \**********************/
	/***/ function(module, exports, __webpack_require__) {
	
		/**
		 * @jsx React.DOM
		 * Draggable
		 * A draggability component helper
		 */
		
		var React = __webpack_require__(/*! react */ 1);
		var Types = React.PropTypes;
		var cx    = __webpack_require__(/*! ./utils/classSet */ 2);
		
		var Draggable = React.createClass({displayName: 'Draggable',
		
		  propTypes: {
		    onDrop  : Types.func.isRequired,
		    message : Types.any.isRequired
		  },
		
		  getDefaultProps:function() {
		    return {
		      dropEffect    : 'copy',
		      effectAllowed : 'all'
		    }
		  },
		
		  getInitialState:function() {
		    return {
		      dragging  : false,
		      droppable : false
		    }
		  },
		
		
		  render:function() {
		    var className = cx(this.props.className, cx({
		      'dragon'           : true,
		      'dragon-dragging'  : this.state.dragging,
		      'dragon-droppable' : this.state.droppable
		    }));
		
		    return (
		      React.createElement("div", {className: className, 
		           onDragOver:  this._onDragOver, 
		           onDragLeave:  this._onDragLeave, 
		           onDrop:  this._onDrop, 
		           onDragStart:  this._onDragStart, 
		           onDragEnd:  this._onDragEnd, 
		           draggable: true}, 
		        React.createElement("div", {className: "dragon-children"},  this.props.children)
		      )
		    );
		  },
		
		  _onDragStart:function(e) {
		    var $__0=      this.props,message=$__0.message,dropEffect=$__0.dropEffect,effectAllowed=$__0.effectAllowed;
		
		    e.dataTransfer.setData('text/plain', JSON.stringify(message));
		    e.dataTransfer.dropEffect = dropEffect;
		    e.dataTransfer.effectAllowed = effectAllowed;
		
		    this.setState({ dragging: true });
		  },
		
		  _onDragEnd:function(e) {
		    e.preventDefault();
		    this.setState({ droppable: false, dragging: false });
		  },
		
		  _onDragOver:function(e) {
		    e.preventDefault();
		    this.setState({ droppable: true });
		  },
		
		  _onDragLeave:function(e) {
		    e.preventDefault();
		    this.setState({ droppable: false });
		  },
		
		  _onDrop:function(e) {
		    e.preventDefault();
		
		    var message  = JSON.parse(e.dataTransfer.getData('text/plain'));
		    var receiver = this.props.message;
		
		    this.props.onDrop(message, receiver);
		    this.setState({ droppable: false, dragging: false });
		  }
		
		});
		
		module.exports = Draggable;
	
	
	/***/ },
	/* 1 */
	/*!************************!*\
	  !*** external "react" ***!
	  \************************/
	/***/ function(module, exports, __webpack_require__) {
	
		module.exports = __WEBPACK_EXTERNAL_MODULE_1__;
	
	/***/ },
	/* 2 */
	/*!*******************************!*\
	  !*** ./src/utils/classSet.js ***!
	  \*******************************/
	/***/ function(module, exports, __webpack_require__) {
	
		/**
		 * Copyright 2013-2014, Facebook, Inc.
		 * All rights reserved.
		 *
		 * This source code is licensed under the BSD-style license found in the
		 * LICENSE file in the root directory of this source tree. An additional grant
		 * of patent rights can be found in the PATENTS file in the same directory.
		 *
		 * @providesModule cx
		 */
		
		/**
		 * This function is used to mark string literals representing CSS class names
		 * so that they can be transformed statically. This allows for modularization
		 * and minification of CSS class names.
		 *
		 * In static_upstream, this function is actually implemented, but it should
		 * eventually be replaced with something more descriptive, and the transform
		 * that is used in the main stack should be ported for use elsewhere.
		 *
		 * @param string|object className to modularize, or an object of key/values.
		 *                      In the object case, the values are conditions that
		 *                      determine if the className keys should be included.
		 * @param [string ...]  Variable list of classNames in the string case.
		 * @return string       Renderable space-separated CSS className.
		 */
		function cx(classNames) {
		  if (typeof classNames == 'object') {
		    return Object.keys(classNames).filter(function(className) {
		      return classNames[className];
		    }).join(' ');
		  } else {
		    return Array.prototype.join.call(arguments, ' ');
		  }
		}
		
		module.exports = cx;
	
	
	/***/ }
	/******/ ])
	});
	
	//# sourceMappingURL=react-dragon.js.map

/***/ },
/* 77 */
/*!*************************************!*\
  !*** ./~/react/lib/shallowEqual.js ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule shallowEqual
	 */
	
	"use strict";
	
	/**
	 * Performs equality by iterating through keys on an object and returning
	 * false when any key has values which are not strictly equal between
	 * objA and objB. Returns true when the values of all keys are strictly equal.
	 *
	 * @return {boolean}
	 */
	function shallowEqual(objA, objB) {
	  if (objA === objB) {
	    return true;
	  }
	  var key;
	  // Test for A's keys different from B.
	  for (key in objA) {
	    if (objA.hasOwnProperty(key) &&
	        (!objB.hasOwnProperty(key) || objA[key] !== objB[key])) {
	      return false;
	    }
	  }
	  // Test for B's keys missing from A.
	  for (key in objB) {
	    if (objB.hasOwnProperty(key) && !objA.hasOwnProperty(key)) {
	      return false;
	    }
	  }
	  return true;
	}
	
	module.exports = shallowEqual;


/***/ }
/******/ ])
//# sourceMappingURL=colonel-kurtz.js.map