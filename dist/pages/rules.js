'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Rules = function (_wepy$page) {
  _inherits(Rules, _wepy$page);

  function Rules() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Rules);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Rules.__proto__ || Object.getPrototypeOf(Rules)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '配送规则'
    }, _this.data = {
      url: ''
    }, _this.methods = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Rules, [{
    key: 'onLoad',
    value: function onLoad() {
      this.url = this.$parent.HttpRequest.$$baseHtml + this.$parent.HttpRequest.$$pathHtml.rules + '?' + Math.random() / 9999;
      console.log(this.url);
      this.$apply();
    }
  }]);

  return Rules;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Rules , 'pages/rules'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzLmpzIl0sIm5hbWVzIjpbIlJ1bGVzIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJ1cmwiLCJtZXRob2RzIiwiJHBhcmVudCIsIkh0dHBSZXF1ZXN0IiwiJCRiYXNlSHRtbCIsIiQkcGF0aEh0bWwiLCJydWxlcyIsIk1hdGgiLCJyYW5kb20iLCJjb25zb2xlIiwibG9nIiwiJGFwcGx5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7Ozs7Ozs7OztJQUVxQkEsSzs7Ozs7Ozs7Ozs7Ozs7b0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVEMsSSxHQUFPO0FBQ0xDLFdBQUs7QUFEQSxLLFFBR1BDLE8sR0FBVSxFOzs7Ozs2QkFFQTtBQUNSLFdBQUtELEdBQUwsR0FBVyxLQUFLRSxPQUFMLENBQWFDLFdBQWIsQ0FBeUJDLFVBQXpCLEdBQXNDLEtBQUtGLE9BQUwsQ0FBYUMsV0FBYixDQUF5QkUsVUFBekIsQ0FBb0NDLEtBQTFFLEdBQWtGLEdBQWxGLEdBQXdGQyxLQUFLQyxNQUFMLEtBQWdCLElBQW5IO0FBQ0FDLGNBQVFDLEdBQVIsQ0FBWSxLQUFLVixHQUFqQjtBQUNBLFdBQUtXLE1BQUw7QUFDRDs7OztFQWJnQyxlQUFLQyxJOztrQkFBbkJoQixLIiwiZmlsZSI6InJ1bGVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgUnVsZXMgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfphY3pgIHop4TliJknXG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICB1cmw6ICcnXG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgfVxuICAgIG9uTG9hZCAoKSB7XG4gICAgICB0aGlzLnVybCA9IHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC4kJGJhc2VIdG1sICsgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LiQkcGF0aEh0bWwucnVsZXMgKyAnPycgKyBNYXRoLnJhbmRvbSgpIC8gOTk5OVxuICAgICAgY29uc29sZS5sb2codGhpcy51cmwpXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICB9XG4iXX0=