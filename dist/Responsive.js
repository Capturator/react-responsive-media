'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _mediaquery = require('mediaquery');

var _mediaquery2 = _interopRequireDefault(_mediaquery);

function Responsive(Element) {
  return (function (_Component) {
    _inherits(ResponsiveComponent, _Component);

    function ResponsiveComponent(props) {
      _classCallCheck(this, ResponsiveComponent);

      _get(Object.getPrototypeOf(ResponsiveComponent.prototype), 'constructor', this).call(this);
      var mq = _mediaquery2['default'].asArray(props.mq);

      var isTouch = Modernizr ? Modernizr.touch
      // inline Modernizr check
      : 'ontouchstart' in window || window.DocumentTouch && document instanceof DocumentTouch;
      this.state = {
        mm: window.matchMedia,
        mq: mq,
        isTouch: isTouch,
        currentMedia: mq.reduce(function (prev, next, index, array) {
          if (index === array.length) {
            prev[next[0]] = true;
          } else {
            prev[next[0]] = false;
          }
          return prev;
        }, {})
      };
    }

    _createClass(ResponsiveComponent, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        var _this = this;

        this.updateMediaQueries();
        var _state = this.state;
        var mm = _state.mm;
        var mq = _state.mq;

        Object.keys(mq).forEach(function (q) {
          mm(mq[q]).addListener(function () {
            _this.updateMediaQueries();
          });
        });
      }
    }, {
      key: 'updateMediaQueries',
      value: function updateMediaQueries() {
        var _state2 = this.state;
        var mm = _state2.mm;
        var mq = _state2.mq;

        this.setState({
          currentMedia: mq.reduce(function (prev, next) {
            prev[next[0]] = mm(next[1]).matches;
            return prev;
          }, {})
        });
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2['default'].createElement(Element, _extends({}, this.props, {
          isTouch: this.state.isTouch,
          currentMedia: this.state.currentMedia }));
      }
    }]);

    return ResponsiveComponent;
  })(_react.Component);
}

exports['default'] = Responsive;
module.exports = exports['default'];