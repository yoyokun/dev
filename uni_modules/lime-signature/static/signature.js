(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Signature = {}));
}(this, (function (exports) { 'use strict';

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }

    return target;
  }

  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    Object.defineProperty(subClass, "prototype", {
      writable: false
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }

    return _assertThisInitialized(self);
  }

  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();

    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn(this, result);
    };
  }

  var isObject = function isObject(value) {
    /**
     * isObject({}) => true
     * isObject([1, 2, 3]) => true
     * isObject(Function) => true
     * isObject(null) => false
     */
    var type = _typeof(value);

    return value !== null && type === 'object' || type === 'function';
  };
  var toString = {}.toString;

  var isType = function isType(value, type) {
    return toString.call(value) === '[object ' + type + ']';
  };

  var isString = function isString(str) {
    return isType(str, 'String');
  };
  var isNumber = function isNumber(value) {
    return isType(value, 'Number');
  };
  var isFunction = function isFunction(value) {
    return isType(value, 'Function');
  };

  var EventEmit = /*#__PURE__*/function () {
    function EventEmit() {
      _classCallCheck(this, EventEmit);

      this.__events = void 0;
      this.__events = {};
    }

    _createClass(EventEmit, [{
      key: "on",
      value: function on(type, listener) {
        if (!type || !listener) {
          return;
        }

        var events = this.__events[type] || [];
        events.push(listener);
        this.__events[type] = events;
      }
    }, {
      key: "emit",
      value: function emit(type, e) {
        var _this = this;

        if (isObject(type)) {
          e = type;
          type = e && e.type;
        }

        if (!type) {
          return;
        }

        var events = this.__events[type];

        if (!events || !events.length) {
          return;
        }

        events.forEach(function (listener) {
          listener.call(_this, e);
        });
      }
    }, {
      key: "off",
      value: function off(type, listener) {
        var __events = this.__events;
        var events = __events[type];

        if (!events || !events.length) {
          return;
        } // ?????????????????????????????????????????????


        if (!listener) {
          delete __events[type];
          return;
        } // ??????????????? listener


        for (var i = 0, len = events.length; i < len; i++) {
          if (events[i] === listener) {
            events.splice(i, 1);
            i--;
          }
        }
      }
      /* ????????????????????? */

    }, {
      key: "getEvents",
      value: function getEvents() {
        return this.__events;
      }
    }]);

    return EventEmit;
  }();

  var CanvasElement = /*#__PURE__*/function (_EventEmit) {
    _inherits(CanvasElement, _EventEmit);

    var _super = _createSuper(CanvasElement);

    // width: number;
    // height: number;
    function CanvasElement(ctx, attrs) {
      var _this;

      _classCallCheck(this, CanvasElement);

      _this = _super.call(this);
      _this.context = void 0;
      _this.canvas = void 0;
      _this.attrs = void 0;
      _this.isCanvasElement = void 0;
      _this.context = ctx; // canvas??????????????? (width/height) * pixelRatio
      // ???????????? ????????? ??? node canvas   ????????? context ??????

      _this.canvas = attrs.canvas || ctx.canvas || {
        width: attrs.width || 0,
        height: attrs.height || 0
      }; // this.width = canvas.width || attrs.width || 0;
      // this.height = canvas.height || attrs.height || 0;
      // this.el = attrs.canvas || {}

      _this.attrs = attrs || {}; // ???????????????CanvasElement??????

      _this.isCanvasElement = true;
      return _this;
    }

    _createClass(CanvasElement, [{
      key: "width",
      get: function get() {
        return this.canvas.width;
      },
      set: function set(v) {
        this.canvas.width = v;
      }
    }, {
      key: "height",
      get: function get() {
        return this.canvas.height;
      },
      set: function set(v) {
        this.canvas.height = v;
      }
    }, {
      key: "getContext",
      value: function
        /* type */
      getContext() {
        return this.context;
      }
    }, {
      key: "getBoundingClientRect",
      value: function getBoundingClientRect() {
        // const width = this.width;
        // const height = this.height;
        var _ref = this.attrs || {},
            _ref$top = _ref.top,
            top = _ref$top === void 0 ? 0 : _ref$top,
            _ref$right = _ref.right,
            right = _ref$right === void 0 ? 0 : _ref$right,
            _ref$width = _ref.width,
            width = _ref$width === void 0 ? 0 : _ref$width,
            _ref$height = _ref.height,
            height = _ref$height === void 0 ? 0 : _ref$height,
            _ref$left = _ref.left,
            left = _ref$left === void 0 ? 0 : _ref$left,
            _ref$bottom = _ref.bottom,
            bottom = _ref$bottom === void 0 ? 0 : _ref$bottom; // ?????????????????????????????????????????????


        return {
          top: top,
          width: width,
          right: right,
          height: height,
          bottom: bottom,
          left: left
        };
      }
    }, {
      key: "setAttribute",
      value: function setAttribute(key, value) {
        this.attrs[key] = value;
      }
    }, {
      key: "addEventListener",
      value: function addEventListener(type, listener) {
        this.on(type, listener);
      }
    }, {
      key: "removeEventListener",
      value: function removeEventListener(type, listener) {
        this.off(type, listener);
      }
    }, {
      key: "dispatchEvent",
      value: function dispatchEvent(type, e) {
        this.emit(type, e);
      }
    }]);

    return CanvasElement;
  }(EventEmit);

  function supportEventListener(canvas) {
    if (!canvas) {
      return false;
    } // ??? HTMLCanvasElement


    if (canvas.nodeType !== 1 || !canvas.nodeName || canvas.nodeName.toLowerCase() !== 'canvas') {
      return false;
    } // ???????????????canvas.getContext('2d')?????????CanvasRenderingContext2D
    // ?????????ctx.canvas, ??????nodeType??????1????????????????????????????????????addEventListener


    var support = false;

    try {
      canvas.addEventListener('eventTest', function () {
        support = true;
      });
      canvas.dispatchEvent(new Event('eventTest'));
    } catch (error) {
      support = false;
    }

    return support;
  }

  var CanvasElement$1 = {
    create: function create(ctx, cfg) {
      if (!ctx) {
        return null;
      }

      if (supportEventListener(ctx.canvas)) {
        return ctx.canvas;
      }

      return new CanvasElement(ctx, cfg);
    }
  };

  function getPixelRatio() {
    return window && window.devicePixelRatio || 1;
  }
  function getDomById(id) {
    if (!id) {
      return null;
    }

    return document.getElementById(id);
  }
  function getWidth(el) {
    var width = getStyle(el, 'width');

    if (width === 'auto') {
      width = el.offsetWidth;
    }

    return parseFloat(width);
  }
  function getHeight(el) {
    var height = getStyle(el, 'height');

    if (height === 'auto') {
      height = el.offsetHeight;
    }

    return parseFloat(height);
  }
  function getStyle(el, property) {
    try {
      return el.currentStyle ? el.currentStyle[property] : document.defaultView && document.defaultView.getComputedStyle(el, null).getPropertyValue(property);
    } catch (e) {
      var result = {
        width: 300,
        height: 150
      };
      return result[property];
    }
  }
  function isCanvasElement(el) {
    if (!el || _typeof(el) !== 'object') return false;

    if (el.nodeType === 1 && el.nodeName) {
      // HTMLCanvasElement
      return true;
    } // CanvasElement


    return !!el.isCanvasElement;
  }
  function getRelativePosition(point, canvas) {
    var canvasDom = canvas.get('el');
    if (!canvasDom) return point;

    var _canvasDom$getBoundin = canvasDom.getBoundingClientRect(),
        _canvasDom$getBoundin2 = _canvasDom$getBoundin.top,
        top = _canvasDom$getBoundin2 === void 0 ? 0 : _canvasDom$getBoundin2,
        _canvasDom$getBoundin3 = _canvasDom$getBoundin.left,
        left = _canvasDom$getBoundin3 === void 0 ? 0 : _canvasDom$getBoundin3;

    var paddingLeft = parseFloat(getStyle(canvasDom, 'padding-left')) || 0;
    var paddingTop = parseFloat(getStyle(canvasDom, 'padding-top')) || 0;
    var mouseX = point.x - left - paddingLeft;
    var mouseY = point.y - top - paddingTop;
    return {
      x: mouseX,
      y: mouseY
    };
  }
  function landscapePoint(point, canvas) {
    var landscape = canvas.get('landscape');

    if (!landscape) {
      return point;
    }

    if (isFunction(landscape)) {
      return landscape(point, canvas);
    } // ?????????????????????90???


    var height = canvas.get('height');
    var x = point.y;
    var y = height - point.x;
    return {
      x: x,
      y: y
    };
  }
  function convertPoints(ev, canvas) {
    var touches = ev.touches; // ?????????mouse??????

    if (!touches || !touches.length) {
      var point = getRelativePosition({
        x: ev.clientX,
        y: ev.clientY
      }, canvas);
      return [landscapePoint(point, canvas)];
    } // ?????? touchend ??????touchs ?????????????????????????????????changedTouches??????


    if (!touches.length) {
      // ????????????????????????????????????
      touches = ev.changedTouches || [];
    }

    var points = [];

    for (var i = 0, len = touches.length; i < len; i++) {
      var touch = touches[i]; // x, y: ??????canvas??????????????????clientX, clientY ?????????????????????????????? pageX, pageY ????????????

      var x = touch.x,
          y = touch.y,
          clientX = touch.clientX,
          clientY = touch.clientY;

      var _point = void 0; // ?????????????????????x,y


      if (isNumber(x) || isNumber(y)) {
        _point = {
          x: x,
          y: y
        };
      } else {
        // ???????????????????????????canvas???????????????
        _point = getRelativePosition({
          x: clientX,
          y: clientY
        }, canvas);
      }

      points.push(landscapePoint(_point, canvas));
    }

    return points;
  }

  var convertPoints$1 = convertPoints; // ?????????????????????

  var calcDirection = function calcDirection(start, end) {
    var xDistance = end.x - start.x;
    var yDistance = end.y - start.y; // x ???????????????y ????????????????????????????????????

    if (Math.abs(xDistance) > Math.abs(yDistance)) {
      return xDistance > 0 ? 'right' : 'left';
    }

    return yDistance > 0 ? 'down' : 'up';
  }; // ??????2??????????????????


  var calcDistance = function calcDistance(point1, point2) {
    var xDistance = Math.abs(point2.x - point1.x);
    var yDistance = Math.abs(point2.y - point1.y);
    return Math.sqrt(xDistance * xDistance + yDistance * yDistance);
  }; // ??????2??????????????????


  var getCenter = function getCenter(point1, point2) {
    var x = point1.x + (point2.x - point1.x) / 2;
    var y = point1.y + (point2.y - point1.y) / 2;
    return {
      x: x,
      y: y
    };
  };

  var PRESS_DELAY = 250;
  var EventController = /*#__PURE__*/function () {
    //NodeJS.Timeout;
    function EventController(_ref) {
      var _this = this;

      var canvas = _ref.canvas,
          el = _ref.el;

      _classCallCheck(this, EventController);

      this.processEvent = void 0;
      this.canvas = void 0;
      this.startTime = 0;
      this.endTime = 0;
      this.startPoints = null;
      this.startDistance = 0;
      this.center = null;
      this.pressTimeout = void 0;
      this.eventType = null;
      this.direction = null;
      this.lastMoveTime = 0;
      this.prevMovePoints = null;
      this.prevMoveTime = 0;
      this.lastMovePoints = null;
      this.pinch = false;

      this._click = function (ev) {
        var points = convertPoints$1(ev, _this.canvas);
        ev.points = points;

        _this.emitEvent('click', ev);
      };

      this._start = function (ev) {
        var points = convertPoints$1(ev, _this.canvas);

        if (!points) {
          return;
        }

        ev.points = points;

        _this.emitEvent('touchstart', ev); // ????????????
        // ?????????????????????????????????????????????reset???


        _this.reset(); // ??????touch start ?????????


        _this.startTime = Date.now(); // ??????touch start ??????

        _this.startPoints = points;

        if (points.length > 1) {
          _this.startDistance = calcDistance(points[0], points[1]);
          _this.center = getCenter(points[0], points[1]);
        } else {
          // ??????touchstart?????????250ms, ????????????press??????
          _this.pressTimeout = setTimeout(function () {
            // ??????????????????press??????
            var eventType = 'press';
            var direction = 'none';
            ev.direction = direction;

            _this.emitStart(eventType, ev);

            _this.emitEvent(eventType, ev);

            _this.eventType = eventType;
            _this.direction = direction;
          }, PRESS_DELAY);
        }
      };

      this._move = function (ev) {
        var points = convertPoints$1(ev, _this.canvas);
        if (!points) return;
        ev.points = points;

        _this.emitEvent('touchmove', ev); // ???????????????


        var startPoints = _this.startPoints;
        if (!startPoints) return; // ????????????

        if (points.length > 1) {
          // touchstart?????????
          var startDistance = _this.startDistance;
          var currentDistance = calcDistance(points[0], points[1]);
          ev.zoom = currentDistance / startDistance;
          ev.center = _this.center; // ??????????????????

          _this.emitStart('pinch', ev);

          _this.emitEvent('pinch', ev);
        } else {
          var deltaX = points[0].x - startPoints[0].x;
          var deltaY = points[0].y - startPoints[0].y;
          var direction = _this.direction || calcDirection(startPoints[0], points[0]);
          _this.direction = direction; // ??????press??????pan???????????????
          // press ????????????, pan????????????
          // ??????start?????????move????????????pan, ???????????????????????????press

          var eventType = _this.getEventType(points);

          ev.direction = direction;
          ev.deltaX = deltaX;
          ev.deltaY = deltaY;

          _this.emitStart(eventType, ev);

          _this.emitEvent(eventType, ev); // ????????????2???move??????????????????????????????swipe?????????


          var prevMoveTime = _this.lastMoveTime;
          var now = Date.now(); // ??????2?????????????????????????????????0?????????swipe????????????

          if (now - prevMoveTime > 0) {
            _this.prevMoveTime = prevMoveTime;
            _this.prevMovePoints = _this.lastMovePoints;
            _this.lastMoveTime = now;
            _this.lastMovePoints = points;
          }
        }
      };

      this._end = function (ev) {
        var points = convertPoints$1(ev, _this.canvas);
        ev.points = points;

        _this.emitEnd(ev);

        _this.emitEvent('touchend', ev); // ???????????????
        // swipe????????????, ???touchend????????????


        var lastMoveTime = _this.lastMoveTime;
        var now = Date.now(); // ????????????????????????????????????touchmove??????end?????????????????????????????????
        // 100 ????????????????????????????????????????????????????????????????????????10ms??????

        if (now - lastMoveTime < 100) {
          var prevMoveTime = _this.prevMoveTime || _this.startTime;
          var intervalTime = lastMoveTime - prevMoveTime; // ???????????????????????????0, ?????????????????????

          if (intervalTime > 0) {
            var prevMovePoints = _this.prevMovePoints || _this.startPoints;
            var lastMovePoints = _this.lastMovePoints; // move??????

            if (!prevMovePoints || !lastMovePoints) return;
            var velocity = calcDistance(prevMovePoints[0], lastMovePoints[0]) / intervalTime; // 0.3 ?????????hammerjs?????????

            if (velocity > 0.3) {
              ev.velocity = velocity;
              ev.direction = calcDirection(prevMovePoints[0], lastMovePoints[0]);

              _this.emitEvent('swipe', ev);
            }
          }
        }

        _this.reset();

        var touches = ev.touches; // ?????????????????????1??????????????????end, ????????????????????????start

        if (touches && touches.length > 0) {
          _this._start(ev);
        }
      };

      this._cancel = function (ev) {
        _this.emitEvent('touchcancel', ev);

        _this.reset();
      };

      this.canvas = canvas;
      this.delegateEvent(el); // ?????????????????????????????????

      this.processEvent = {};
    }

    _createClass(EventController, [{
      key: "delegateEvent",
      value: function delegateEvent(canvasEl) {
        // ?????????????????????
        canvasEl.addEventListener('click', this._click);
        canvasEl.addEventListener('touchstart', this._start);
        canvasEl.addEventListener('touchmove', this._move);
        canvasEl.addEventListener('touchend', this._end);
        canvasEl.addEventListener('touchcancel', this._cancel);
      }
    }, {
      key: "emitEvent",
      value: function emitEvent(type, ev) {
        var canvas = this.canvas;
        canvas.emit(type, ev);
      }
    }, {
      key: "getEventType",
      value: function getEventType(points) {
        var eventType = this.eventType,
            canvas = this.canvas,
            startTime = this.startTime,
            startPoints = this.startPoints;

        if (eventType) {
          return eventType;
        }

        var type;
        var panEventListeners = canvas.__events.pan; // ????????????pan??????????????????????????????press

        if (!panEventListeners || !panEventListeners.length) {
          type = 'press';
        } else {
          // ?????????pan??????????????????press???????????????250ms, ?????????????????????10
          var now = Date.now();
          if (!startPoints) return;

          if (now - startTime > PRESS_DELAY && calcDistance(startPoints[0], points[0]) < 10) {
            type = 'press';
          } else {
            type = 'pan';
          }
        }

        this.eventType = type;
        return type;
      }
    }, {
      key: "enable",
      value: function enable(eventType) {
        this.processEvent[eventType] = true;
      } // ????????????????????????

    }, {
      key: "isProcess",
      value: function isProcess(eventType) {
        return this.processEvent[eventType];
      } // ??????start??????

    }, {
      key: "emitStart",
      value: function emitStart(type, ev) {
        if (this.isProcess(type)) {
          return;
        }

        this.enable(type);
        this.emitEvent("".concat(type, "start"), ev);
      }
    }, {
      key: "emitEnd",
      value: function emitEnd(ev) {// const processEvent = this.processEvent;
        // Object.keys(processEvent).forEach((type) => {
        //   this.emitEvent(`${type}end`, ev);
        //   delete processEvent[type];
        // });
      }
    }, {
      key: "clearPressTimeout",
      value: function clearPressTimeout() {
        if (this.pressTimeout) {
          clearTimeout(this.pressTimeout);
          this.pressTimeout = null;
        }
      }
    }, {
      key: "reset",
      value: function reset() {
        this.clearPressTimeout();
        this.startTime = 0;
        this.startPoints = null;
        this.startDistance = 0;
        this.direction = null;
        this.eventType = null;
        this.pinch = false;
        this.prevMoveTime = 0;
        this.prevMovePoints = null;
        this.lastMoveTime = 0;
        this.lastMovePoints = null;
      }
    }]);

    return EventController;
  }();

  var Canvas = /*#__PURE__*/function (_EventEmit) {
    _inherits(Canvas, _EventEmit);

    var _super = _createSuper(Canvas);

    function Canvas(cfg) {
      var _this;

      _classCallCheck(this, Canvas);

      _this = _super.call(this);
      _this._attrs = {};
      _this._isWindow = void 0;
      _this._attrs = Object.assign({}, cfg);
      _this._isWindow = typeof window != 'undefined';

      _this._initPixelRatio();

      _this._initCanvas();

      var attrs = ['createImage', 'toDataURL', 'requestAnimationFrame'];
      attrs.forEach(function (name) {
        _this._initAttrs(name, cfg.canvas || _this.get('el'));
      });
      return _this;
    }

    _createClass(Canvas, [{
      key: "get",
      value: // _node: HTMLCanvasElement = {}
      function get(name) {
        // if(['createImage','toDataURL', 'requestAnimationFrame' ].includes(name) && !this._attrs[name]) {
        // 	if(this._attrs['el'][name]){
        // 		return this._attrs['el'][name]
        // 	} else if(typeof window != 'undefined') {
        // 		return window[name] || function() {return new Image() }
        // 	}
        // }
        return this._attrs[name];
      }
    }, {
      key: "set",
      value: function set(name, value) {
        this._attrs[name] = value;
      }
    }, {
      key: "_initAttrs",
      value: function _initAttrs(name, node) {
        var _this2 = this;

        if (!this.get(name)) {
          var fu = function fu() {
            if (node[name]) {
              return node[name].apply(node, arguments);
            } else if (_this2._isWindow) {
              var _window;

              return window[name] ? (_window = window)[name].apply(_window, arguments) : name == 'createImage' ? new Image() : null;
            }
          };

          this.set(name, fu);
        }
      }
    }, {
      key: "_initCanvas",
      value: function _initCanvas() {
        var el = this.get('el');
        var context = this.get('context');

        if (!el && !context) {
          throw new Error('????????? id???el ??? context!');
        }

        var canvas;

        if (el) {
          // DOMElement or String
          canvas = isString(el) ? getDomById(el) : el;
        } else {
          // ??????????????????el
          canvas = CanvasElement$1.create(context, this._attrs);
        }

        if (context && canvas && !canvas.getContext) {
          canvas.getContext = function () {
            return context;
          };
        }

        var width = this.get('width') || getWidth(canvas) || canvas.width;
        var height = this.get('height') || getHeight(canvas) || canvas.height;
        this.set('canvas', this);
        this.set('el', canvas);
        this.set('context', context || canvas.getContext('2d'));
        this.changeSize(width, height); // ????????????????????????

        var eventController = new EventController({
          canvas: this,
          el: canvas,
          parent: this.get('parent')
        });
        this.set('eventController', eventController);
      }
    }, {
      key: "_initPixelRatio",
      value: function _initPixelRatio() {
        var pixelRatio = this.get('pixelRatio');

        if (!pixelRatio) {
          this.set('pixelRatio', getPixelRatio());
        }
      }
    }, {
      key: "changeSize",
      value: function changeSize(width, height) {
        var pixelRatio = this.get('pixelRatio');
        var canvasDOM = this.get('el'); // HTMLCanvasElement or canvasElement
        // ?????????????????????style??????

        if (canvasDOM.style) {
          canvasDOM.style.width = width + 'px';
          canvasDOM.style.height = height + 'px';
        }

        if (isCanvasElement(canvasDOM)) {
          canvasDOM.width = width * pixelRatio;
          canvasDOM.height = height * pixelRatio;

          if (pixelRatio !== 1) {
            var ctx = this.get('context');
            ctx.scale(pixelRatio, pixelRatio);
          }
        }

        this.set('width', width);
        this.set('height', height);
      }
    }, {
      key: "destroy",
      value: function destroy() {
        if (this.get('destroyed')) {
          return;
        }

        var el = this.get('el');
        el.width = 0;
        el.height = 0;
        this.clear();
        this._attrs = {};
        this.set('destroyed', true);
      }
    }, {
      key: "clear",
      value: function clear() {}
    }, {
      key: "isDestroyed",
      value: function isDestroyed() {
        return this.get('destroyed');
      }
    }]);

    return Canvas;
  }(EventEmit);
  function createCanvas(cfg) {
    return new Canvas(cfg);
  }

  var options = {
    // ????????????
    penColor: 'black',
    // ??????????????????
    backgroundColor: '',
    // ??????
    openSmooth: true,
    // ????????????
    penSize: 2,
    // ???????????????
    minLineWidth: 2,
    // ???????????????
    maxLineWidth: 6,
    // ??????????????????????????????????????????(px/ms)???????????????1.0-10.0?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
    minSpeed: 1.5,
    // ?????????????????????(???)?????????????????????????????????1-100????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????maxWidthDiffRate?????????????????????????????????????????????????????????????????????????????????????????????????????????
    maxWidthDiffRate: 20,
    // ??????????????????????????????????????????????????????0???????????????????????????
    maxHistoryLength: 20
  };

  var Pen = /*#__PURE__*/function () {
    // emptyData: any
    function Pen(canvas) {
      var _this = this;

      _classCallCheck(this, Pen);

      this.canAddHistory = true;
      this.points = [];
      this.historyList = [];
      this.canvas = void 0;
      this._isEmpty = true;
      this.active = false;

      this.getLineWidth = function (speed) {
        var _this$get = _this.get('options'),
            minSpeed = _this$get.minSpeed,
            minLineWidth = _this$get.minLineWidth;

        var maxLineWidth = _this.getMaxLineWidth();

        var addWidth = (maxLineWidth - minLineWidth) * speed / Math.max(Math.min(minSpeed, 10), 1);
        var lineWidth = Math.max(maxLineWidth - addWidth, minLineWidth);
        return Math.min(lineWidth, maxLineWidth);
      };

      this.drawTrapezoid = function (point1, point2, point3, point4) {
        var ctx = _this.get('context');

        ctx.beginPath();
        ctx.moveTo(Number(point1.x.toFixed(1)), Number(point1.y.toFixed(1)));
        ctx.lineTo(Number(point2.x.toFixed(1)), Number(point2.y.toFixed(1)));
        ctx.lineTo(Number(point3.x.toFixed(1)), Number(point3.y.toFixed(1)));
        ctx.lineTo(Number(point4.x.toFixed(1)), Number(point4.y.toFixed(1)));
        ctx.fillStyle = _this.get('options').penColor;
        ctx.fill();
        ctx.draw && ctx.draw(true);
      };

      this.drawNoSmoothLine = function (prePoint, point) {
        point.lastX = prePoint.x + (point.x - prePoint.x) * 0.5;
        point.lastY = prePoint.y + (point.y - prePoint.y) * 0.5;

        if (typeof prePoint.lastX === 'number') {
          _this.drawCurveLine(prePoint.lastX, prePoint.lastY, prePoint.x, prePoint.y, point.lastX, point.lastY, _this.getMaxLineWidth());
        }
      };

      this.drawCurveLine = function (x1, y1, x2, y2, x3, y3, lineWidth) {
        lineWidth = Number(lineWidth.toFixed(1));

        var ctx = _this.get('context');

        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.moveTo(Number(x1.toFixed(1)), Number(y1.toFixed(1)));
        ctx.quadraticCurveTo(Number(x2.toFixed(1)), Number(y2.toFixed(1)), Number(x3.toFixed(1)), Number(y3.toFixed(1)));
        ctx.stroke();
        ctx.draw && ctx.draw(true);
      };

      this.getRadianData = function (x1, y1, x2, y2) {
        var dis_x = x2 - x1;
        var dis_y = y2 - y1;

        if (dis_x === 0) {
          return {
            val: 0,
            pos: -1
          };
        }

        if (dis_y === 0) {
          return {
            val: 0,
            pos: 1
          };
        }

        var val = Math.abs(Math.atan(dis_y / dis_x));

        if (x2 > x1 && y2 < y1 || x2 < x1 && y2 > y1) {
          return {
            val: val,
            pos: 1
          };
        }

        return {
          val: val,
          pos: -1
        };
      };

      this.getRadianPoints = function (radianData, x, y, halfLineWidth) {
        if (radianData.val === 0) {
          if (radianData.pos === 1) {
            return [{
              x: x,
              y: y + halfLineWidth
            }, {
              x: x,
              y: y - halfLineWidth
            }];
          }

          return [{
            y: y,
            x: x + halfLineWidth
          }, {
            y: y,
            x: x - halfLineWidth
          }];
        }

        var dis_x = Math.sin(radianData.val) * halfLineWidth;
        var dis_y = Math.cos(radianData.val) * halfLineWidth;

        if (radianData.pos === 1) {
          return [{
            x: x + dis_x,
            y: y + dis_y
          }, {
            x: x - dis_x,
            y: y - dis_y
          }];
        }

        return [{
          x: x + dis_x,
          y: y - dis_y
        }, {
          x: x - dis_x,
          y: y + dis_y
        }];
      };

      this.drawSmoothLine = function (prePoint, point) {
        var dis_x = point.x - prePoint.x;
        var dis_y = point.y - prePoint.y;

        if (Math.abs(dis_x) + Math.abs(dis_y) <= 2) {
          point.lastX1 = point.lastX2 = prePoint.x + dis_x * 0.5;
          point.lastY1 = point.lastY2 = prePoint.y + dis_y * 0.5;
        } else {
          point.lastX1 = prePoint.x + dis_x * 0.3;
          point.lastY1 = prePoint.y + dis_y * 0.3;
          point.lastX2 = prePoint.x + dis_x * 0.7;
          point.lastY2 = prePoint.y + dis_y * 0.7;
        }

        point.perLineWidth = (prePoint.lineWidth + point.lineWidth) / 2;

        if (typeof prePoint.lastX1 === 'number') {
          _this.drawCurveLine(prePoint.lastX2, prePoint.lastY2, prePoint.x, prePoint.y, point.lastX1, point.lastY1, point.perLineWidth);

          if (prePoint.isFirstPoint) return;
          if (prePoint.lastX1 === prePoint.lastX2 && prePoint.lastY1 === prePoint.lastY2) return;

          var data = _this.getRadianData(prePoint.lastX1, prePoint.lastY1, prePoint.lastX2, prePoint.lastY2);

          var points1 = _this.getRadianPoints(data, prePoint.lastX1, prePoint.lastY1, prePoint.perLineWidth / 2);

          var points2 = _this.getRadianPoints(data, prePoint.lastX2, prePoint.lastY2, point.perLineWidth / 2);

          _this.drawTrapezoid(points1[0], points2[0], points2[1], points1[1]);
        } else {
          point.isFirstPoint = true;
        }
      };

      this.addHistory = function () {
        var _this$get2 = _this.get('options'),
            maxHistoryLength = _this$get2.maxHistoryLength;

        if (!maxHistoryLength || !_this.canAddHistory) return;
        _this.canAddHistory = false; //  || !this.get('toDataURL')

        if (!_this.get('createImage')) {
          _this.historyList.length++;
          return;
        } // this.set('loading', true);


        var image = null;
        image = _this.get('createImage')();

        var toDataURL = _this.get('toDataURL') && _this.get('toDataURL')();

        if (isString(toDataURL)) {
          image.src = toDataURL;
        } else {
          toDataURL.then(function (res) {
            image.src = res;
          });
        } // if (isPromise(toDataURL)) {
        // 	toDataURL.then(res => {
        // 		image.src = res
        // 	})
        // } else {
        // 	image.src = toDataURL //this.get('el').toDataURL() //toDataURL()
        // }


        image.onload = function () {
          // this.set('loading', false);
          _this.historyList.push(image);

          _this.historyList = _this.historyList.slice(-maxHistoryLength);
        };
      };

      this.drawByImage = function (url) {
        var ctx = _this.get('context');

        var width = _this.get('width');

        var height = _this.get('height');

        ctx.clearRect(0, 0, width, height);

        try {
          ctx.drawImage(url, 0, 0, width, height);
          ctx.draw && ctx.draw(true);
        } catch (e) {
          _this.historyList.length = 0;
        }
      };

      this.isEmpty = function () {
        var _this$get3 = _this.get('options'),
            maxHistoryLength = _this$get3.maxHistoryLength;

        return maxHistoryLength > 0 ? _this.historyList.length === 0 : _this._isEmpty;
      };

      this.clear = function () {
        var ctx = _this.get('context');

        ctx.clearRect(0, 0, _this.get('width'), _this.get('height'));
        ctx.draw && ctx.draw();
        _this._isEmpty = true; // this.drawBgColor();

        _this.historyList.length = 0;
      };

      this.undo = function () {
        if (_this.get('options').maxHistoryLength === 0) _this.clear();
        if (!_this.get('createImage') || !_this.historyList.length) return;

        var pngURL = _this.historyList.splice(-1)[0];

        _this.drawByImage(pngURL);

        if (_this.historyList.length === 0) {
          _this.clear();
        }
      };

      this.canvas = canvas;
      this.canvas.set('pen', options);
      this.init();
    }

    _createClass(Pen, [{
      key: "getOption",
      value: function getOption() {}
    }, {
      key: "setOption",
      value: function setOption() {
        var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        var cloneOptions = _objectSpread2({}, v);

        var maxLineWidth = cloneOptions.maxLineWidth; // ??????????????????????????????????????? ????????????penSize

        if (maxLineWidth && v.penSize && maxLineWidth == options.maxLineWidth) {
          var penSize = Math.max(maxLineWidth, v.penSize);
          cloneOptions.maxLineWidth = penSize;
        }

        this.canvas.set('pen', Object.assign({}, options, cloneOptions));
      }
    }, {
      key: "get",
      value: function get(name) {
        if (name == 'options') {
          return this.canvas.get('pen');
        } else {
          return this.canvas.get(name);
        }
      } // set(name: string, value: any) {
      // 	return this.canvas.set(name, value)
      // }

    }, {
      key: "init",
      value: function init() {
        var _this2 = this;

        var ctx = this.get('context');
        ctx.lineCap = 'round'; // this.drawBackground()

        this.canvas.on('touchstart', function (e) {
          return _this2.onDrawStart(e);
        });
        this.canvas.on('touchmove', function (e) {
          return _this2.onDrawMove(e);
        });
        this.canvas.on('touchend', function (e) {
          return _this2.onDrawEnd(e);
        });
      }
    }, {
      key: "drawBackground",
      value: function drawBackground() {
        var ctx = this.get('context');
        var width = this.get('width');
        var height = this.get('height');

        var _this$get4 = this.get('options'),
            backgroundColor = _this$get4.backgroundColor,
            backgroundImage = _this$get4.backgroundImage;

        if (backgroundColor) {
          ctx.fillStyle = backgroundColor;
          ctx.fillRect(0, 0, width, height);
          ctx.draw && ctx.draw(true);
        }

        if (backgroundImage) {
          this.drawByImage(backgroundImage);
        }
      }
    }, {
      key: "remove",
      value: function remove() {
        var _this3 = this;

        this.canvas.off('touchstart', function (e) {
          return _this3.onDrawStart(e);
        });
        this.canvas.off('touchmove', function (e) {
          return _this3.onDrawMove(e);
        });
        this.canvas.off('touchend', function (e) {
          return _this3.onDrawEnd(e);
        });
      }
    }, {
      key: "disableScroll",
      value: function disableScroll(e) {
        if (e.preventDefault && this.get('options').disableScroll) {
          e.preventDefault();
        }
      }
    }, {
      key: "onDrawStart",
      value: function onDrawStart(e) {
        this.disableScroll(e);
        var points = e.points;
        if (!this.active) return;
        this.canAddHistory = true;
        var ctx = this.get('context');
        ctx.strokeStyle = this.get('options').penColor;
        var _points$ = points[0],
            x = _points$.x,
            y = _points$.y;
        this.initPoint(x, y);
      }
    }, {
      key: "onDrawMove",
      value: function onDrawMove(e) {
        this.disableScroll(e);
        var points = e.points;
        if (!this.active) return;
        var _points$2 = points[0],
            x = _points$2.x,
            y = _points$2.y;
        this.initPoint(x, y);
        this.onDraw();
      }
    }, {
      key: "onDrawEnd",
      value: function onDrawEnd(_ref) {
        var points = _ref.points;
        if (!this.active) return;
        this.canAddHistory = true;
        this.points = [];
      }
    }, {
      key: "onDraw",
      value: function onDraw() {
        var _this4 = this;

        var ctx = this.get('context');
        if (this.points.length < 2) return;
        this.addHistory();
        ctx.lineWidth = this.get('options').penSize || 2;
        var point = this.points.slice(-1)[0];
        var prePoint = this.points.slice(-2, -1)[0];

        var onDraw = function onDraw() {
          _this4._isEmpty = false;

          if (_this4.get('options').openSmooth) {
            _this4.drawSmoothLine(prePoint, point);
          } else {
            _this4.drawNoSmoothLine(prePoint, point);
          }
        };

        if (typeof this.get('el').requestAnimationFrame === 'function') {
          this.get('el').requestAnimationFrame(function () {
            return onDraw();
          });
        } else {
          onDraw();
        }
      }
    }, {
      key: "getMaxLineWidth",
      value: function getMaxLineWidth() {
        var _this$get5 = this.get('options'),
            penSize = _this$get5.penSize,
            maxLineWidth = _this$get5.maxLineWidth;

        return Math.min(penSize, maxLineWidth);
      }
    }, {
      key: "initPoint",
      value: function initPoint(x, y) {
        var point = {
          x: x,
          y: y,
          t: Date.now()
        };
        var prePoint = this.points.slice(-1)[0];

        if (prePoint && (prePoint.t === point.t || prePoint.x === x && prePoint.y === y)) {
          return;
        }

        if (this.get('options').openSmooth && prePoint) {
          var prePoint2 = this.points.slice(-2, -1)[0];
          point.distance = Math.sqrt(Math.pow(point.x - prePoint.x, 2) + Math.pow(point.y - prePoint.y, 2));
          point.speed = point.distance / (point.t - prePoint.t || 0.1);
          point.lineWidth = this.getLineWidth(point.speed);

          if (prePoint2 && prePoint2.lineWidth && prePoint.lineWidth) {
            var rate = (point.lineWidth - prePoint.lineWidth) / prePoint.lineWidth;
            var maxRate = this.get('options').maxWidthDiffRate / 100;
            maxRate = maxRate > 1 ? 1 : maxRate < 0.01 ? 0.01 : maxRate;

            if (Math.abs(rate) > maxRate) {
              var per = rate > 0 ? maxRate : -maxRate;
              point.lineWidth = prePoint.lineWidth * (1 + per);
            }
          }
        }

        this.points.push(point);
        this.points = this.points.slice(-3);
      }
    }]);

    return Pen;
  }();

  var Signature = /*#__PURE__*/function () {
    // options: Options = penDefaultOptions
    function Signature(config) {
      _classCallCheck(this, Signature);

      this.canvas = void 0;
      this._ee = void 0;
      this.pen = void 0;
      var canvas = createCanvas(config);
      canvas.set('parent', this);
      this.canvas = canvas;
      this._ee = new EventEmit(); // Object.assign(penDefaultOptions, options)
      // this.canvas.set('pen', options)

      this.pen = new Pen(canvas);
      this.init();
    }

    _createClass(Signature, [{
      key: "init",
      value: function init() {
        this.pen.active = true;
      } // setOption(options: Options = {}) {
      // 	// this.canvas.set('options', Object.assign({}, this.options, options))
      // }

    }, {
      key: "destroy",
      value: function destroy() {
        this.canvas.destroy();
      }
    }, {
      key: "clear",
      value: function clear() {
        this.pen.clear();
      }
    }, {
      key: "undo",
      value: function undo() {
        this.pen.undo();
      }
    }, {
      key: "save",
      value: function save() {// this.pen.save();
      }
    }, {
      key: "isEmpty",
      value: function isEmpty() {
        return this.pen.isEmpty();
      }
    }, {
      key: "on",
      value: function on(type, listener) {
        this._ee.on(type, listener);
      }
    }, {
      key: "emit",
      value: function emit(type, listener) {
        this._ee.emit(type, listener);
      }
    }, {
      key: "off",
      value: function off(type, listener) {
        this._ee.off(type, listener);
      }
    }]);

    return Signature;
  }();

  exports.Signature = Signature;
  exports.default = Signature;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
