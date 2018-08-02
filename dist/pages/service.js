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

var Service = function (_wepy$page) {
  _inherits(Service, _wepy$page);

  function Service() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Service);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Service.__proto__ || Object.getPrototypeOf(Service)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '会员服务协议'
    }, _this.data = {
      url: ''
    }, _this.methods = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Service, [{
    key: 'onLoad',
    value: function onLoad() {
      this.url = this.$parent.HttpRequest.$$baseHtml + this.$parent.HttpRequest.$$pathHtml.service + '?' + Math.random() / 9999;
      this.$apply();
    }
  }]);

  return Service;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Service , 'pages/service'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2UuanMiXSwibmFtZXMiOlsiU2VydmljZSIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwidXJsIiwibWV0aG9kcyIsIiRwYXJlbnQiLCJIdHRwUmVxdWVzdCIsIiQkYmFzZUh0bWwiLCIkJHBhdGhIdG1sIiwic2VydmljZSIsIk1hdGgiLCJyYW5kb20iLCIkYXBwbHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7Ozs7Ozs7Ozs7O0lBRXFCQSxPOzs7Ozs7Ozs7Ozs7Ozt3TEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdUQyxJLEdBQU87QUFDTEMsV0FBSztBQURBLEssUUFHUEMsTyxHQUFVLEU7Ozs7OzZCQUVBO0FBQ1IsV0FBS0QsR0FBTCxHQUFXLEtBQUtFLE9BQUwsQ0FBYUMsV0FBYixDQUF5QkMsVUFBekIsR0FBc0MsS0FBS0YsT0FBTCxDQUFhQyxXQUFiLENBQXlCRSxVQUF6QixDQUFvQ0MsT0FBMUUsR0FBb0YsR0FBcEYsR0FBMEZDLEtBQUtDLE1BQUwsS0FBZ0IsSUFBckg7QUFDQSxXQUFLQyxNQUFMO0FBQ0Q7Ozs7RUFaa0MsZUFBS0MsSTs7a0JBQXJCZCxPIiwiZmlsZSI6InNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBTZXJ2aWNlIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5Lya5ZGY5pyN5Yqh5Y2P6K6uJ1xuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgdXJsOiAnJ1xuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgIH1cbiAgICBvbkxvYWQgKCkge1xuICAgICAgdGhpcy51cmwgPSB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuJCRiYXNlSHRtbCArIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC4kJHBhdGhIdG1sLnNlcnZpY2UgKyAnPycgKyBNYXRoLnJhbmRvbSgpIC8gOTk5OVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgfVxuIl19