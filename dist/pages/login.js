'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _loading = require('./../components/loading.js');

var _loading2 = _interopRequireDefault(_loading);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Login = function (_wepy$page) {
  _inherits(Login, _wepy$page);

  function Login() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Login);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Login.__proto__ || Object.getPrototypeOf(Login)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '用户登录'
    }, _this.data = {
      isNull: true,
      jscode: null,
      refrenceCode: '',
      overflow: false,
      hasPhone: false,
      isError: false,
      httpId: '',
      nick_name: '',
      avatar: '',
      customer_info_str: '',
      note_info_str: ''
    }, _this.components = {
      loading: _loading2.default
    }, _this.methods = {
      login: function login(e) {
        var _this2 = this;

        if (!this.hasPhone) {
          if (e.detail.encryptedData) {
            this.$parent.getUserInfo(e, this.jscode, this.refrenceCode, function () {
              // wepy.navigateTo({
              //   url: './getUserInfo'
              // })
              _this2.hasPhone = true;
              _this2.$apply();
            }, function () {
              _this2.showError();
              _this2.$apply();
            });
          } else {
            _wepy2.default.showModal({
              title: '提示',
              content: '拒绝授权将无法正常使用小程序全部功能，请重新开启授权'
            });
          }
        }
      },
      loginAgain: function loginAgain() {
        var _this3 = this;

        _wepy2.default.clearStorageSync();
        this.$parent.getLogin(function (code) {
          _this3.jscode = code;
        });
        this.isNull = false;
        this.isError = false;
        this.hasPhone = false;
      },
      callPhone: function callPhone() {
        _wepy2.default.makePhoneCall({
          phoneNumber: '021-65870021'
        });
      },
      bindGetUserInfo: function bindGetUserInfo(e) {
        var _this4 = this;

        this.$parent.getLogin(function (code) {
          _this4.jscode = code;
          _wepy2.default.getSetting({
            success: function success(res) {
              if (res.authSetting['scope.userInfo']) {
                _this4.$parent.globalData.userInfo = e.detail.userInfo;
                var data = {
                  jscode: _this4.jscode,
                  encryptedData: e.detail.encryptedData,
                  iv: e.detail.iv
                };
                _this4.$parent.HttpRequest.SendUserInfo(data).then(function (res) {
                  _this4.$parent.showLoading();
                  console.log(res);
                  if (res.data.error !== undefined && res.data.error === 0) {
                    var data = {
                      phone: _wepy2.default.getStorageSync('phone')
                    };
                    _this4.$parent.requestToken(data, function () {
                      _this4.$parent.hideLoading();
                      var pages = _this4.getCurrentPages();
                      var prevPage = pages[pages.length - 2];
                      if (prevPage) {
                        _wepy2.default.navigateBack();
                      } else {
                        _this4.goIndex();
                      }
                    }, function () {
                      _this4.$parent.hideLoading();
                      _this4.showError();
                      _this4.$apply();
                    });
                  } else {
                    _this4.$parent.hideLoading();
                    _this4.showError();
                    _this4.$apply();
                  }
                });
              } else {
                _wepy2.default.showModal({
                  title: '提示',
                  content: '拒绝授权将无法正常使用小程序全部功能，请重新开启授权'
                });
              }
            }
          });
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Login, [{
    key: 'goIndex',
    value: function goIndex() {
      _wepy2.default.switchTab({
        url: './index'
      });
    }
  }, {
    key: 'showError',
    value: function showError() {
      this.isError = true;
      this.httpId = this.$parent.errorHttpId;
      this.note_info_str = this.$parent.getBusiness('用户登录错误码：' + this.$parent.errorHttpId, null, null);
    }
  }, {
    key: 'onLoad',
    value: function onLoad(param) {
      var _this5 = this;

      if (param.refrenceCode) {
        this.refrenceCode = param.refrenceCode;
      } else if (param.scene) {
        this.refrenceCode = decodeURIComponent(param.scene);
      } else {
        this.refrenceCode = '';
      }
      // 获取跳转页面来源
      this.$parent.getLogin(function (code) {
        _this5.jscode = code;
      });
      if (_wepy2.default.getStorageSync('phone') === '') {
        _wepy2.default.clearStorageSync();
        this.isNull = false;
      } else {
        _wepy2.default.getSetting({
          success: function success(res) {
            // res.authSetting['scope.userInfo']
            if (_wepy2.default.getStorageSync('token')) {
              _this5.$parent.getUser();
              _this5.isNull = true;
              // 已经授权，获取新的token
              var data = {
                phone: _wepy2.default.getStorageSync('phone')
              };
              _this5.$parent.requestToken(data, function () {
                _this5.goIndex();
              }, function () {
                _this5.showError();
                _this5.$apply();
              });
            } else {
              _this5.isNull = false;
            }
            _this5.$apply();
          }
        });
      }
    }
  }, {
    key: 'onShow',
    value: function onShow() {
      if (_wepy2.default.getStorageSync('phone')) {
        this.hasPhone = true;
      } else {
        this.hasPhone = false;
      }
    }
  }]);

  return Login;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Login , 'pages/login'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2luLmpzIl0sIm5hbWVzIjpbIkxvZ2luIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJpc051bGwiLCJqc2NvZGUiLCJyZWZyZW5jZUNvZGUiLCJvdmVyZmxvdyIsImhhc1Bob25lIiwiaXNFcnJvciIsImh0dHBJZCIsIm5pY2tfbmFtZSIsImF2YXRhciIsImN1c3RvbWVyX2luZm9fc3RyIiwibm90ZV9pbmZvX3N0ciIsImNvbXBvbmVudHMiLCJsb2FkaW5nIiwibWV0aG9kcyIsImxvZ2luIiwiZSIsImRldGFpbCIsImVuY3J5cHRlZERhdGEiLCIkcGFyZW50IiwiZ2V0VXNlckluZm8iLCIkYXBwbHkiLCJzaG93RXJyb3IiLCJzaG93TW9kYWwiLCJ0aXRsZSIsImNvbnRlbnQiLCJsb2dpbkFnYWluIiwiY2xlYXJTdG9yYWdlU3luYyIsImdldExvZ2luIiwiY29kZSIsImNhbGxQaG9uZSIsIm1ha2VQaG9uZUNhbGwiLCJwaG9uZU51bWJlciIsImJpbmRHZXRVc2VySW5mbyIsImdldFNldHRpbmciLCJzdWNjZXNzIiwicmVzIiwiYXV0aFNldHRpbmciLCJnbG9iYWxEYXRhIiwidXNlckluZm8iLCJpdiIsIkh0dHBSZXF1ZXN0IiwiU2VuZFVzZXJJbmZvIiwidGhlbiIsInNob3dMb2FkaW5nIiwiY29uc29sZSIsImxvZyIsImVycm9yIiwidW5kZWZpbmVkIiwicGhvbmUiLCJnZXRTdG9yYWdlU3luYyIsInJlcXVlc3RUb2tlbiIsImhpZGVMb2FkaW5nIiwicGFnZXMiLCJnZXRDdXJyZW50UGFnZXMiLCJwcmV2UGFnZSIsImxlbmd0aCIsIm5hdmlnYXRlQmFjayIsImdvSW5kZXgiLCJzd2l0Y2hUYWIiLCJ1cmwiLCJlcnJvckh0dHBJZCIsImdldEJ1c2luZXNzIiwicGFyYW0iLCJzY2VuZSIsImRlY29kZVVSSUNvbXBvbmVudCIsImdldFVzZXIiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7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QUtBLFFBQUwsR0FBZ0IsS0FBaEI7QUFDRDtBQUNGOzs7O0VBbEtnQyxlQUFLOEQsSTs7a0JBQW5CdEUsSyIsImZpbGUiOiJsb2dpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBpbXBvcnQgTG9hZGluZyBmcm9tICcuLi9jb21wb25lbnRzL2xvYWRpbmcnXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9naW4gZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfnlKjmiLfnmbvlvZUnXG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICBpc051bGw6IHRydWUsXG4gICAgICBqc2NvZGU6IG51bGwsXG4gICAgICByZWZyZW5jZUNvZGU6ICcnLFxuICAgICAgb3ZlcmZsb3c6IGZhbHNlLFxuICAgICAgaGFzUGhvbmU6IGZhbHNlLFxuICAgICAgaXNFcnJvcjogZmFsc2UsXG4gICAgICBodHRwSWQ6ICcnLFxuICAgICAgbmlja19uYW1lOiAnJyxcbiAgICAgIGF2YXRhcjogJycsXG4gICAgICBjdXN0b21lcl9pbmZvX3N0cjogJycsXG4gICAgICBub3RlX2luZm9fc3RyOiAnJ1xuICAgIH1cbiAgICBjb21wb25lbnRzID0ge1xuICAgICAgbG9hZGluZzogTG9hZGluZ1xuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgbG9naW4gKGUpIHtcbiAgICAgICAgaWYgKCF0aGlzLmhhc1Bob25lKSB7XG4gICAgICAgICAgaWYgKGUuZGV0YWlsLmVuY3J5cHRlZERhdGEpIHtcbiAgICAgICAgICAgIHRoaXMuJHBhcmVudC5nZXRVc2VySW5mbyhlLCB0aGlzLmpzY29kZSwgdGhpcy5yZWZyZW5jZUNvZGUsICgpID0+IHtcbiAgICAgICAgICAgICAgLy8gd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgICAgLy8gICB1cmw6ICcuL2dldFVzZXJJbmZvJ1xuICAgICAgICAgICAgICAvLyB9KVxuICAgICAgICAgICAgICB0aGlzLmhhc1Bob25lID0gdHJ1ZVxuICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuc2hvd0Vycm9yKClcbiAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgICAgICAgIGNvbnRlbnQ6ICfmi5Lnu53mjojmnYPlsIbml6Dms5XmraPluLjkvb/nlKjlsI/nqIvluo/lhajpg6jlip/og73vvIzor7fph43mlrDlvIDlkK/mjojmnYMnXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGxvZ2luQWdhaW4gKCkge1xuICAgICAgICB3ZXB5LmNsZWFyU3RvcmFnZVN5bmMoKVxuICAgICAgICB0aGlzLiRwYXJlbnQuZ2V0TG9naW4oKGNvZGUpID0+IHtcbiAgICAgICAgICB0aGlzLmpzY29kZSA9IGNvZGVcbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy5pc051bGwgPSBmYWxzZVxuICAgICAgICB0aGlzLmlzRXJyb3IgPSBmYWxzZVxuICAgICAgICB0aGlzLmhhc1Bob25lID0gZmFsc2VcbiAgICAgIH0sXG4gICAgICBjYWxsUGhvbmUgKCkge1xuICAgICAgICB3ZXB5Lm1ha2VQaG9uZUNhbGwoe1xuICAgICAgICAgIHBob25lTnVtYmVyOiAnMDIxLTY1ODcwMDIxJ1xuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGJpbmRHZXRVc2VySW5mbyAoZSkge1xuICAgICAgICB0aGlzLiRwYXJlbnQuZ2V0TG9naW4oKGNvZGUpID0+IHtcbiAgICAgICAgICB0aGlzLmpzY29kZSA9IGNvZGVcbiAgICAgICAgICB3ZXB5LmdldFNldHRpbmcoe1xuICAgICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICAgICAgICBpZiAocmVzLmF1dGhTZXR0aW5nWydzY29wZS51c2VySW5mbyddKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckluZm8gPSBlLmRldGFpbC51c2VySW5mb1xuICAgICAgICAgICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgICAgICAgICAganNjb2RlOiB0aGlzLmpzY29kZSxcbiAgICAgICAgICAgICAgICAgIGVuY3J5cHRlZERhdGE6IGUuZGV0YWlsLmVuY3J5cHRlZERhdGEsXG4gICAgICAgICAgICAgICAgICBpdjogZS5kZXRhaWwuaXZcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LlNlbmRVc2VySW5mbyhkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuJHBhcmVudC5zaG93TG9hZGluZygpXG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgICAgICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgIT09IHVuZGVmaW5lZCAmJiByZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICBwaG9uZTogd2VweS5nZXRTdG9yYWdlU3luYygncGhvbmUnKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHBhcmVudC5yZXF1ZXN0VG9rZW4oZGF0YSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHBhcmVudC5oaWRlTG9hZGluZygpXG4gICAgICAgICAgICAgICAgICAgICAgdmFyIHBhZ2VzID0gdGhpcy5nZXRDdXJyZW50UGFnZXMoKVxuICAgICAgICAgICAgICAgICAgICAgIHZhciBwcmV2UGFnZSA9IHBhZ2VzW3BhZ2VzLmxlbmd0aCAtIDJdXG4gICAgICAgICAgICAgICAgICAgICAgaWYgKHByZXZQYWdlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlQmFjaygpXG4gICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ29JbmRleCgpXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy4kcGFyZW50LmhpZGVMb2FkaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dFcnJvcigpXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kcGFyZW50LmhpZGVMb2FkaW5nKClcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93RXJyb3IoKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICAgICAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgICAgICAgICAgICBjb250ZW50OiAn5ouS57ud5o6I5p2D5bCG5peg5rOV5q2j5bi45L2/55So5bCP56iL5bqP5YWo6YOo5Yqf6IO977yM6K+36YeN5paw5byA5ZCv5o6I5p2DJ1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgICBnb0luZGV4ICgpIHtcbiAgICAgIHdlcHkuc3dpdGNoVGFiKHtcbiAgICAgICAgdXJsOiAnLi9pbmRleCdcbiAgICAgIH0pXG4gICAgfVxuICAgIHNob3dFcnJvciAoKSB7XG4gICAgICB0aGlzLmlzRXJyb3IgPSB0cnVlXG4gICAgICB0aGlzLmh0dHBJZCA9IHRoaXMuJHBhcmVudC5lcnJvckh0dHBJZFxuICAgICAgdGhpcy5ub3RlX2luZm9fc3RyID0gdGhpcy4kcGFyZW50LmdldEJ1c2luZXNzKCfnlKjmiLfnmbvlvZXplJnor6/noIHvvJonICsgdGhpcy4kcGFyZW50LmVycm9ySHR0cElkLCBudWxsLCBudWxsKVxuICAgIH1cbiAgICBvbkxvYWQgKHBhcmFtKSB7XG4gICAgICBpZiAocGFyYW0ucmVmcmVuY2VDb2RlKSB7XG4gICAgICAgIHRoaXMucmVmcmVuY2VDb2RlID0gcGFyYW0ucmVmcmVuY2VDb2RlXG4gICAgICB9IGVsc2UgaWYgKHBhcmFtLnNjZW5lKSB7XG4gICAgICAgIHRoaXMucmVmcmVuY2VDb2RlID0gZGVjb2RlVVJJQ29tcG9uZW50KHBhcmFtLnNjZW5lKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5yZWZyZW5jZUNvZGUgPSAnJ1xuICAgICAgfVxuICAgICAgLy8g6I635Y+W6Lez6L2s6aG16Z2i5p2l5rqQXG4gICAgICB0aGlzLiRwYXJlbnQuZ2V0TG9naW4oKGNvZGUpID0+IHtcbiAgICAgICAgdGhpcy5qc2NvZGUgPSBjb2RlXG4gICAgICB9KVxuICAgICAgaWYgKHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3Bob25lJykgPT09ICcnKSB7XG4gICAgICAgIHdlcHkuY2xlYXJTdG9yYWdlU3luYygpXG4gICAgICAgIHRoaXMuaXNOdWxsID0gZmFsc2VcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdlcHkuZ2V0U2V0dGluZyh7XG4gICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICAgICAgLy8gcmVzLmF1dGhTZXR0aW5nWydzY29wZS51c2VySW5mbyddXG4gICAgICAgICAgICBpZiAod2VweS5nZXRTdG9yYWdlU3luYygndG9rZW4nKSkge1xuICAgICAgICAgICAgICB0aGlzLiRwYXJlbnQuZ2V0VXNlcigpXG4gICAgICAgICAgICAgIHRoaXMuaXNOdWxsID0gdHJ1ZVxuICAgICAgICAgICAgICAvLyDlt7Lnu4/mjojmnYPvvIzojrflj5bmlrDnmoR0b2tlblxuICAgICAgICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICAgICAgICBwaG9uZTogd2VweS5nZXRTdG9yYWdlU3luYygncGhvbmUnKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHRoaXMuJHBhcmVudC5yZXF1ZXN0VG9rZW4oZGF0YSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZ29JbmRleCgpXG4gICAgICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dFcnJvcigpXG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpcy5pc051bGwgPSBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gICAgb25TaG93ICgpIHtcbiAgICAgIGlmICh3ZXB5LmdldFN0b3JhZ2VTeW5jKCdwaG9uZScpKSB7XG4gICAgICAgIHRoaXMuaGFzUGhvbmUgPSB0cnVlXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmhhc1Bob25lID0gZmFsc2VcbiAgICAgIH1cbiAgICB9XG4gIH1cbiJdfQ==