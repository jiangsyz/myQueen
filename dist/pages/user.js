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

var User = function (_wepy$page) {
  _inherits(User, _wepy$page);

  function User() {
    var _ref;

    var _temp, _this2, _ret;

    _classCallCheck(this, User);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_ref = User.__proto__ || Object.getPrototypeOf(User)).call.apply(_ref, [this].concat(args))), _this2), _this2.config = {
      navigationBarTitleText: '个人中心'
    }, _this2.data = {
      token: '',
      userInfo: '',
      isVip: false,
      validation: '',
      refunding: '',
      undelivered: '',
      unpaid: '',
      unreceipted: '',
      isLogin: false,
      jscode: '',
      userPhone: ''
    }, _this2.methods = {
      goService: function goService() {
        _wepy2.default.navigateTo({
          url: './applyVip'
        });
      },
      goAddress: function goAddress() {
        _wepy2.default.navigateTo({
          url: './address'
        });
      },
      goCollect: function goCollect() {
        _wepy2.default.navigateTo({
          url: './collect'
        });
      },
      goOrder: function goOrder() {
        _wepy2.default.navigateTo({
          url: './order'
        });
      },
      goSystem: function goSystem() {
        _wepy2.default.navigateTo({
          url: './system'
        });
      },
      goUnpaid: function goUnpaid() {
        _wepy2.default.navigateTo({
          url: './order?orderType=unpaid'
        });
      },
      goUndelivered: function goUndelivered() {
        _wepy2.default.navigateTo({
          url: './order?orderType=undelivered'
        });
      },
      goUnreceipted: function goUnreceipted() {
        _wepy2.default.navigateTo({
          url: './order?orderType=unreceipted'
        });
      },
      goRefunding: function goRefunding() {
        _wepy2.default.navigateTo({
          url: './order?orderType=refunding'
        });
      },
      goApplyVip: function goApplyVip() {
        _wepy2.default.navigateTo({
          url: './applyVip'
        });
      },
      goCustom: function goCustom() {
        _wepy2.default.navigateTo({
          url: './custom'
        });
      },
      bindGetUserInfo: function bindGetUserInfo(e) {
        console.log(e.detail);
        if (e.detail.userInfo) {
          this.isLogin = false;
          this.$parent.globalData.userInfo = e.detail.userInfo;
          this.userInfo = e.detail.userInfo;
          var data = {
            jscode: this.jscode,
            encryptedData: e.detail.encryptedData,
            iv: e.detail.iv
          };
          this.$parent.HttpRequest.SendUserInfo(data).then(function (res) {
            console.log(res);
          });
        } else {
          this.isLogin = true;
          _wepy2.default.showModal({
            title: '提示',
            content: '拒绝授权将无法获取用户信息'
          });
        }
      },
      clear: function clear() {
        _wepy2.default.getStorageInfo({
          success: function success(res) {
            _wepy2.default.showModal({
              title: '提示',
              content: '是否退出当前账号',
              success: function success(res) {
                if (res.confirm) {
                  _wepy2.default.clearStorage();
                  _wepy2.default.switchTab({
                    url: './index'
                  });
                }
              }
            });
          }
        });
      }
    }, _temp), _possibleConstructorReturn(_this2, _ret);
  }

  _createClass(User, [{
    key: 'initUserData',
    value: function initUserData() {
      var _this3 = this;

      this.token = this.$parent.getToken();
      var _this = this;
      var data = {
        token: this.token
      };
      this.$parent.HttpRequest.GetUserInfo(data).then(function (res) {
        console.log(res);
        if (res.data.error === 0) {
          var data = res.data.data;
          if (data.level === 0) {
            _this.isVip = false;
          } else if (data.level === 1) {
            _this.isVip = true;
          }
          _this3.validation = _this3.$parent.dateFormat(data.vipEnd * 1000, 'Y年m月d日');
        } else {
          if (_this.$parent.missToken) {
            _this.initUserData();
          }
        }
        _this.$apply();
      }).catch(function () {
        // _this.$parent.showFail()
      });
    }
  }, {
    key: 'initUserOrder',
    value: function initUserOrder() {
      this.token = this.$parent.getToken();
      this.$parent.showLoading();
      var _this = this;
      var data = {
        token: this.token
      };
      this.$parent.HttpRequest.GetUserOrder(data).then(function (res) {
        console.log(res);
        _this.$parent.hideLoading();
        if (res.data.error === 0) {
          var data = res.data.data;
          _this.refunding = data.refunding;
          _this.undelivered = data.undelivered;
          _this.unpaid = data.unpaid;
          _this.unreceipted = data.unreceipted;
        } else {
          if (_this.$parent.missToken) {
            _this.initUserOrder();
          }
        }
        _this.$apply();
      }).catch(function () {
        _this.$parent.hideLoading();
        // _this.$parent.showFail()
      });
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {
      var _this4 = this;

      this.$parent.getLogin(function (code) {
        _this4.jscode = code;
      });
      this.userPhone = _wepy2.default.getStorageSync('phone');
      var _this = this;
      _wepy2.default.getSetting({
        success: function success(res) {
          if (res.authSetting['scope.userInfo']) {
            _this.isLogin = false;
            // 已经授权，获取新的token
            _this.$parent.getUser(function () {
              _this.userInfo = _this4.$parent.globalData.userInfo;
            });
          } else {
            _this.isLogin = true;
          }
          _this.$apply();
        }
      });
      this.$apply();
    }
  }, {
    key: 'onShow',
    value: function onShow() {
      // if (this.$parent.globalData.userLevel === 0) {
      //   this.isVip = false
      // } else if (this.$parent.globalData.userLevel === 1) {
      //   this.isVip = true
      // }
      this.initUserData();
      this.initUserOrder();
      this.$apply();
    }
  }]);

  return User;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(User , 'pages/user'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVzZXIuanMiXSwibmFtZXMiOlsiVXNlciIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwidG9rZW4iLCJ1c2VySW5mbyIsImlzVmlwIiwidmFsaWRhdGlvbiIsInJlZnVuZGluZyIsInVuZGVsaXZlcmVkIiwidW5wYWlkIiwidW5yZWNlaXB0ZWQiLCJpc0xvZ2luIiwianNjb2RlIiwidXNlclBob25lIiwibWV0aG9kcyIsImdvU2VydmljZSIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJnb0FkZHJlc3MiLCJnb0NvbGxlY3QiLCJnb09yZGVyIiwiZ29TeXN0ZW0iLCJnb1VucGFpZCIsImdvVW5kZWxpdmVyZWQiLCJnb1VucmVjZWlwdGVkIiwiZ29SZWZ1bmRpbmciLCJnb0FwcGx5VmlwIiwiZ29DdXN0b20iLCJiaW5kR2V0VXNlckluZm8iLCJlIiwiY29uc29sZSIsImxvZyIsImRldGFpbCIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwiZW5jcnlwdGVkRGF0YSIsIml2IiwiSHR0cFJlcXVlc3QiLCJTZW5kVXNlckluZm8iLCJ0aGVuIiwicmVzIiwic2hvd01vZGFsIiwidGl0bGUiLCJjb250ZW50IiwiY2xlYXIiLCJnZXRTdG9yYWdlSW5mbyIsInN1Y2Nlc3MiLCJjb25maXJtIiwiY2xlYXJTdG9yYWdlIiwic3dpdGNoVGFiIiwiZ2V0VG9rZW4iLCJfdGhpcyIsIkdldFVzZXJJbmZvIiwiZXJyb3IiLCJsZXZlbCIsImRhdGVGb3JtYXQiLCJ2aXBFbmQiLCJtaXNzVG9rZW4iLCJpbml0VXNlckRhdGEiLCIkYXBwbHkiLCJjYXRjaCIsInNob3dMb2FkaW5nIiwiR2V0VXNlck9yZGVyIiwiaGlkZUxvYWRpbmciLCJpbml0VXNlck9yZGVyIiwiZ2V0TG9naW4iLCJjb2RlIiwiZ2V0U3RvcmFnZVN5bmMiLCJnZXRTZXR0aW5nIiwiYXV0aFNldHRpbmciLCJnZXRVc2VyIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7Ozs7Ozs7OztJQUVxQkEsSTs7Ozs7Ozs7Ozs7Ozs7cUxBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssU0FHVEMsSSxHQUFPO0FBQ0xDLGFBQU8sRUFERjtBQUVMQyxnQkFBVSxFQUZMO0FBR0xDLGFBQU8sS0FIRjtBQUlMQyxrQkFBWSxFQUpQO0FBS0xDLGlCQUFXLEVBTE47QUFNTEMsbUJBQWEsRUFOUjtBQU9MQyxjQUFRLEVBUEg7QUFRTEMsbUJBQWEsRUFSUjtBQVNMQyxlQUFTLEtBVEo7QUFVTEMsY0FBUSxFQVZIO0FBV0xDLGlCQUFXO0FBWE4sSyxTQWFQQyxPLEdBQVU7QUFDUkMsZUFEUSx1QkFDSztBQUNYLHVCQUFLQyxVQUFMLENBQWdCO0FBQ2RDLGVBQUs7QUFEUyxTQUFoQjtBQUdELE9BTE87QUFNUkMsZUFOUSx1QkFNSztBQUNYLHVCQUFLRixVQUFMLENBQWdCO0FBQ2RDLGVBQUs7QUFEUyxTQUFoQjtBQUdELE9BVk87QUFXUkUsZUFYUSx1QkFXSztBQUNYLHVCQUFLSCxVQUFMLENBQWdCO0FBQ2RDLGVBQUs7QUFEUyxTQUFoQjtBQUdELE9BZk87QUFnQlJHLGFBaEJRLHFCQWdCRztBQUNULHVCQUFLSixVQUFMLENBQWdCO0FBQ2RDLGVBQUs7QUFEUyxTQUFoQjtBQUdELE9BcEJPO0FBcUJSSSxjQXJCUSxzQkFxQkk7QUFDVix1QkFBS0wsVUFBTCxDQUFnQjtBQUNkQyxlQUFLO0FBRFMsU0FBaEI7QUFHRCxPQXpCTztBQTBCUkssY0ExQlEsc0JBMEJJO0FBQ1YsdUJBQUtOLFVBQUwsQ0FBZ0I7QUFDZEMsZUFBSztBQURTLFNBQWhCO0FBR0QsT0E5Qk87QUErQlJNLG1CQS9CUSwyQkErQlM7QUFDZix1QkFBS1AsVUFBTCxDQUFnQjtBQUNkQyxlQUFLO0FBRFMsU0FBaEI7QUFHRCxPQW5DTztBQW9DUk8sbUJBcENRLDJCQW9DUztBQUNmLHVCQUFLUixVQUFMLENBQWdCO0FBQ2RDLGVBQUs7QUFEUyxTQUFoQjtBQUdELE9BeENPO0FBeUNSUSxpQkF6Q1EseUJBeUNPO0FBQ2IsdUJBQUtULFVBQUwsQ0FBZ0I7QUFDZEMsZUFBSztBQURTLFNBQWhCO0FBR0QsT0E3Q087QUE4Q1JTLGdCQTlDUSx3QkE4Q007QUFDWix1QkFBS1YsVUFBTCxDQUFnQjtBQUNkQyxlQUFLO0FBRFMsU0FBaEI7QUFHRCxPQWxETztBQW1EUlUsY0FuRFEsc0JBbURJO0FBQ1YsdUJBQUtYLFVBQUwsQ0FBZ0I7QUFDZEMsZUFBSztBQURTLFNBQWhCO0FBR0QsT0F2RE87QUF3RFJXLHFCQXhEUSwyQkF3RFNDLENBeERULEVBd0RZO0FBQ2xCQyxnQkFBUUMsR0FBUixDQUFZRixFQUFFRyxNQUFkO0FBQ0EsWUFBSUgsRUFBRUcsTUFBRixDQUFTNUIsUUFBYixFQUF1QjtBQUNyQixlQUFLTyxPQUFMLEdBQWUsS0FBZjtBQUNBLGVBQUtzQixPQUFMLENBQWFDLFVBQWIsQ0FBd0I5QixRQUF4QixHQUFtQ3lCLEVBQUVHLE1BQUYsQ0FBUzVCLFFBQTVDO0FBQ0EsZUFBS0EsUUFBTCxHQUFnQnlCLEVBQUVHLE1BQUYsQ0FBUzVCLFFBQXpCO0FBQ0EsY0FBSUYsT0FBTztBQUNUVSxvQkFBUSxLQUFLQSxNQURKO0FBRVR1QiwyQkFBZU4sRUFBRUcsTUFBRixDQUFTRyxhQUZmO0FBR1RDLGdCQUFJUCxFQUFFRyxNQUFGLENBQVNJO0FBSEosV0FBWDtBQUtBLGVBQUtILE9BQUwsQ0FBYUksV0FBYixDQUF5QkMsWUFBekIsQ0FBc0NwQyxJQUF0QyxFQUE0Q3FDLElBQTVDLENBQWlELFVBQUNDLEdBQUQsRUFBUztBQUN4RFYsb0JBQVFDLEdBQVIsQ0FBWVMsR0FBWjtBQUNELFdBRkQ7QUFHRCxTQVpELE1BWU87QUFDTCxlQUFLN0IsT0FBTCxHQUFlLElBQWY7QUFDQSx5QkFBSzhCLFNBQUwsQ0FBZTtBQUNiQyxtQkFBTyxJQURNO0FBRWJDLHFCQUFTO0FBRkksV0FBZjtBQUlEO0FBQ0YsT0E3RU87QUE4RVJDLFdBOUVRLG1CQThFQztBQUNQLHVCQUFLQyxjQUFMLENBQW9CO0FBQ2xCQyxtQkFBUyxpQkFBQ04sR0FBRCxFQUFTO0FBQ2hCLDJCQUFLQyxTQUFMLENBQWU7QUFDYkMscUJBQU8sSUFETTtBQUViQyx1QkFBUyxVQUZJO0FBR2JHLHVCQUFTLGlCQUFDTixHQUFELEVBQVM7QUFDaEIsb0JBQUlBLElBQUlPLE9BQVIsRUFBaUI7QUFDZixpQ0FBS0MsWUFBTDtBQUNBLGlDQUFLQyxTQUFMLENBQWU7QUFDYmhDLHlCQUFLO0FBRFEsbUJBQWY7QUFHRDtBQUNGO0FBVlksYUFBZjtBQVlEO0FBZGlCLFNBQXBCO0FBZ0JEO0FBL0ZPLEs7Ozs7O21DQWlHTTtBQUFBOztBQUNkLFdBQUtkLEtBQUwsR0FBYSxLQUFLOEIsT0FBTCxDQUFhaUIsUUFBYixFQUFiO0FBQ0EsVUFBSUMsUUFBUSxJQUFaO0FBQ0EsVUFBSWpELE9BQU87QUFDVEMsZUFBTyxLQUFLQTtBQURILE9BQVg7QUFHQSxXQUFLOEIsT0FBTCxDQUFhSSxXQUFiLENBQXlCZSxXQUF6QixDQUFxQ2xELElBQXJDLEVBQTJDcUMsSUFBM0MsQ0FBZ0QsVUFBQ0MsR0FBRCxFQUFTO0FBQ3ZEVixnQkFBUUMsR0FBUixDQUFZUyxHQUFaO0FBQ0EsWUFBSUEsSUFBSXRDLElBQUosQ0FBU21ELEtBQVQsS0FBbUIsQ0FBdkIsRUFBMEI7QUFDeEIsY0FBSW5ELE9BQU9zQyxJQUFJdEMsSUFBSixDQUFTQSxJQUFwQjtBQUNBLGNBQUlBLEtBQUtvRCxLQUFMLEtBQWUsQ0FBbkIsRUFBc0I7QUFDcEJILGtCQUFNOUMsS0FBTixHQUFjLEtBQWQ7QUFDRCxXQUZELE1BRU8sSUFBSUgsS0FBS29ELEtBQUwsS0FBZSxDQUFuQixFQUFzQjtBQUMzQkgsa0JBQU05QyxLQUFOLEdBQWMsSUFBZDtBQUNEO0FBQ0QsaUJBQUtDLFVBQUwsR0FBa0IsT0FBSzJCLE9BQUwsQ0FBYXNCLFVBQWIsQ0FBd0JyRCxLQUFLc0QsTUFBTCxHQUFjLElBQXRDLEVBQTRDLFFBQTVDLENBQWxCO0FBQ0QsU0FSRCxNQVFPO0FBQ0wsY0FBSUwsTUFBTWxCLE9BQU4sQ0FBY3dCLFNBQWxCLEVBQTZCO0FBQzNCTixrQkFBTU8sWUFBTjtBQUNEO0FBQ0Y7QUFDRFAsY0FBTVEsTUFBTjtBQUNELE9BaEJELEVBZ0JHQyxLQWhCSCxDQWdCUyxZQUFNO0FBQ2I7QUFDRCxPQWxCRDtBQW1CRDs7O29DQUNnQjtBQUNmLFdBQUt6RCxLQUFMLEdBQWEsS0FBSzhCLE9BQUwsQ0FBYWlCLFFBQWIsRUFBYjtBQUNBLFdBQUtqQixPQUFMLENBQWE0QixXQUFiO0FBQ0EsVUFBSVYsUUFBUSxJQUFaO0FBQ0EsVUFBSWpELE9BQU87QUFDVEMsZUFBTyxLQUFLQTtBQURILE9BQVg7QUFHQSxXQUFLOEIsT0FBTCxDQUFhSSxXQUFiLENBQXlCeUIsWUFBekIsQ0FBc0M1RCxJQUF0QyxFQUE0Q3FDLElBQTVDLENBQWlELFVBQUNDLEdBQUQsRUFBUztBQUN4RFYsZ0JBQVFDLEdBQVIsQ0FBWVMsR0FBWjtBQUNBVyxjQUFNbEIsT0FBTixDQUFjOEIsV0FBZDtBQUNBLFlBQUl2QixJQUFJdEMsSUFBSixDQUFTbUQsS0FBVCxLQUFtQixDQUF2QixFQUEwQjtBQUN4QixjQUFJbkQsT0FBT3NDLElBQUl0QyxJQUFKLENBQVNBLElBQXBCO0FBQ0FpRCxnQkFBTTVDLFNBQU4sR0FBa0JMLEtBQUtLLFNBQXZCO0FBQ0E0QyxnQkFBTTNDLFdBQU4sR0FBb0JOLEtBQUtNLFdBQXpCO0FBQ0EyQyxnQkFBTTFDLE1BQU4sR0FBZVAsS0FBS08sTUFBcEI7QUFDQTBDLGdCQUFNekMsV0FBTixHQUFvQlIsS0FBS1EsV0FBekI7QUFDRCxTQU5ELE1BTU87QUFDTCxjQUFJeUMsTUFBTWxCLE9BQU4sQ0FBY3dCLFNBQWxCLEVBQTZCO0FBQzNCTixrQkFBTWEsYUFBTjtBQUNEO0FBQ0Y7QUFDRGIsY0FBTVEsTUFBTjtBQUNELE9BZkQsRUFlR0MsS0FmSCxDQWVTLFlBQU07QUFDYlQsY0FBTWxCLE9BQU4sQ0FBYzhCLFdBQWQ7QUFDQTtBQUNELE9BbEJEO0FBbUJEOzs7NkJBQ1M7QUFBQTs7QUFDUixXQUFLOUIsT0FBTCxDQUFhZ0MsUUFBYixDQUFzQixVQUFDQyxJQUFELEVBQVU7QUFDOUIsZUFBS3RELE1BQUwsR0FBY3NELElBQWQ7QUFDRCxPQUZEO0FBR0EsV0FBS3JELFNBQUwsR0FBaUIsZUFBS3NELGNBQUwsQ0FBb0IsT0FBcEIsQ0FBakI7QUFDQSxVQUFJaEIsUUFBUSxJQUFaO0FBQ0EscUJBQUtpQixVQUFMLENBQWdCO0FBQ2R0QixpQkFBUyxpQkFBQ04sR0FBRCxFQUFTO0FBQ2hCLGNBQUlBLElBQUk2QixXQUFKLENBQWdCLGdCQUFoQixDQUFKLEVBQXVDO0FBQ3JDbEIsa0JBQU14QyxPQUFOLEdBQWdCLEtBQWhCO0FBQ0E7QUFDQXdDLGtCQUFNbEIsT0FBTixDQUFjcUMsT0FBZCxDQUFzQixZQUFNO0FBQzFCbkIsb0JBQU0vQyxRQUFOLEdBQWlCLE9BQUs2QixPQUFMLENBQWFDLFVBQWIsQ0FBd0I5QixRQUF6QztBQUNELGFBRkQ7QUFHRCxXQU5ELE1BTU87QUFDTCtDLGtCQUFNeEMsT0FBTixHQUFnQixJQUFoQjtBQUNEO0FBQ0R3QyxnQkFBTVEsTUFBTjtBQUNEO0FBWmEsT0FBaEI7QUFjQSxXQUFLQSxNQUFMO0FBQ0Q7Ozs2QkFDUztBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFLRCxZQUFMO0FBQ0EsV0FBS00sYUFBTDtBQUNBLFdBQUtMLE1BQUw7QUFDRDs7OztFQXRNK0IsZUFBS1ksSTs7a0JBQWxCeEUsSSIsImZpbGUiOiJ1c2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXNlciBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+S4quS6uuS4reW/gydcbiAgICB9XG4gICAgZGF0YSA9IHtcbiAgICAgIHRva2VuOiAnJyxcbiAgICAgIHVzZXJJbmZvOiAnJyxcbiAgICAgIGlzVmlwOiBmYWxzZSxcbiAgICAgIHZhbGlkYXRpb246ICcnLFxuICAgICAgcmVmdW5kaW5nOiAnJyxcbiAgICAgIHVuZGVsaXZlcmVkOiAnJyxcbiAgICAgIHVucGFpZDogJycsXG4gICAgICB1bnJlY2VpcHRlZDogJycsXG4gICAgICBpc0xvZ2luOiBmYWxzZSxcbiAgICAgIGpzY29kZTogJycsXG4gICAgICB1c2VyUGhvbmU6ICcnXG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBnb1NlcnZpY2UgKCkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vYXBwbHlWaXAnXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29BZGRyZXNzICgpIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL2FkZHJlc3MnXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29Db2xsZWN0ICgpIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL2NvbGxlY3QnXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29PcmRlciAoKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9vcmRlcidcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBnb1N5c3RlbSAoKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9zeXN0ZW0nXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29VbnBhaWQgKCkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vb3JkZXI/b3JkZXJUeXBlPXVucGFpZCdcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBnb1VuZGVsaXZlcmVkICgpIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL29yZGVyP29yZGVyVHlwZT11bmRlbGl2ZXJlZCdcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBnb1VucmVjZWlwdGVkICgpIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL29yZGVyP29yZGVyVHlwZT11bnJlY2VpcHRlZCdcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBnb1JlZnVuZGluZyAoKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9vcmRlcj9vcmRlclR5cGU9cmVmdW5kaW5nJ1xuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGdvQXBwbHlWaXAgKCkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vYXBwbHlWaXAnXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29DdXN0b20gKCkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vY3VzdG9tJ1xuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGJpbmRHZXRVc2VySW5mbyAoZSkge1xuICAgICAgICBjb25zb2xlLmxvZyhlLmRldGFpbClcbiAgICAgICAgaWYgKGUuZGV0YWlsLnVzZXJJbmZvKSB7XG4gICAgICAgICAgdGhpcy5pc0xvZ2luID0gZmFsc2VcbiAgICAgICAgICB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VySW5mbyA9IGUuZGV0YWlsLnVzZXJJbmZvXG4gICAgICAgICAgdGhpcy51c2VySW5mbyA9IGUuZGV0YWlsLnVzZXJJbmZvXG4gICAgICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICAgICBqc2NvZGU6IHRoaXMuanNjb2RlLFxuICAgICAgICAgICAgZW5jcnlwdGVkRGF0YTogZS5kZXRhaWwuZW5jcnlwdGVkRGF0YSxcbiAgICAgICAgICAgIGl2OiBlLmRldGFpbC5pdlxuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuU2VuZFVzZXJJbmZvKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5pc0xvZ2luID0gdHJ1ZVxuICAgICAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICAgIGNvbnRlbnQ6ICfmi5Lnu53mjojmnYPlsIbml6Dms5Xojrflj5bnlKjmiLfkv6Hmga8nXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGNsZWFyICgpIHtcbiAgICAgICAgd2VweS5nZXRTdG9yYWdlSW5mbyh7XG4gICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgICAgICAgIGNvbnRlbnQ6ICfmmK/lkKbpgIDlh7rlvZPliY3otKblj7cnLFxuICAgICAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgICAgICB3ZXB5LmNsZWFyU3RvcmFnZSgpXG4gICAgICAgICAgICAgICAgICB3ZXB5LnN3aXRjaFRhYih7XG4gICAgICAgICAgICAgICAgICAgIHVybDogJy4vaW5kZXgnXG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICAgIGluaXRVc2VyRGF0YSAoKSB7XG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlblxuICAgICAgfVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkdldFVzZXJJbmZvKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICAgIGlmIChkYXRhLmxldmVsID09PSAwKSB7XG4gICAgICAgICAgICBfdGhpcy5pc1ZpcCA9IGZhbHNlXG4gICAgICAgICAgfSBlbHNlIGlmIChkYXRhLmxldmVsID09PSAxKSB7XG4gICAgICAgICAgICBfdGhpcy5pc1ZpcCA9IHRydWVcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy52YWxpZGF0aW9uID0gdGhpcy4kcGFyZW50LmRhdGVGb3JtYXQoZGF0YS52aXBFbmQgKiAxMDAwLCAnWeW5tG3mnIhk5pelJylcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoX3RoaXMuJHBhcmVudC5taXNzVG9rZW4pIHtcbiAgICAgICAgICAgIF90aGlzLmluaXRVc2VyRGF0YSgpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgIC8vIF90aGlzLiRwYXJlbnQuc2hvd0ZhaWwoKVxuICAgICAgfSlcbiAgICB9XG4gICAgaW5pdFVzZXJPcmRlciAoKSB7XG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgIHRoaXMuJHBhcmVudC5zaG93TG9hZGluZygpXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW5cbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5HZXRVc2VyT3JkZXIoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgX3RoaXMuJHBhcmVudC5oaWRlTG9hZGluZygpXG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICAgIF90aGlzLnJlZnVuZGluZyA9IGRhdGEucmVmdW5kaW5nXG4gICAgICAgICAgX3RoaXMudW5kZWxpdmVyZWQgPSBkYXRhLnVuZGVsaXZlcmVkXG4gICAgICAgICAgX3RoaXMudW5wYWlkID0gZGF0YS51bnBhaWRcbiAgICAgICAgICBfdGhpcy51bnJlY2VpcHRlZCA9IGRhdGEudW5yZWNlaXB0ZWRcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoX3RoaXMuJHBhcmVudC5taXNzVG9rZW4pIHtcbiAgICAgICAgICAgIF90aGlzLmluaXRVc2VyT3JkZXIoKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICBfdGhpcy4kcGFyZW50LmhpZGVMb2FkaW5nKClcbiAgICAgICAgLy8gX3RoaXMuJHBhcmVudC5zaG93RmFpbCgpXG4gICAgICB9KVxuICAgIH1cbiAgICBvbkxvYWQgKCkge1xuICAgICAgdGhpcy4kcGFyZW50LmdldExvZ2luKChjb2RlKSA9PiB7XG4gICAgICAgIHRoaXMuanNjb2RlID0gY29kZVxuICAgICAgfSlcbiAgICAgIHRoaXMudXNlclBob25lID0gd2VweS5nZXRTdG9yYWdlU3luYygncGhvbmUnKVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgd2VweS5nZXRTZXR0aW5nKHtcbiAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICAgIGlmIChyZXMuYXV0aFNldHRpbmdbJ3Njb3BlLnVzZXJJbmZvJ10pIHtcbiAgICAgICAgICAgIF90aGlzLmlzTG9naW4gPSBmYWxzZVxuICAgICAgICAgICAgLy8g5bey57uP5o6I5p2D77yM6I635Y+W5paw55qEdG9rZW5cbiAgICAgICAgICAgIF90aGlzLiRwYXJlbnQuZ2V0VXNlcigoKSA9PiB7XG4gICAgICAgICAgICAgIF90aGlzLnVzZXJJbmZvID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckluZm9cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIF90aGlzLmlzTG9naW4gPSB0cnVlXG4gICAgICAgICAgfVxuICAgICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICAgIG9uU2hvdyAoKSB7XG4gICAgICAvLyBpZiAodGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckxldmVsID09PSAwKSB7XG4gICAgICAvLyAgIHRoaXMuaXNWaXAgPSBmYWxzZVxuICAgICAgLy8gfSBlbHNlIGlmICh0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VyTGV2ZWwgPT09IDEpIHtcbiAgICAgIC8vICAgdGhpcy5pc1ZpcCA9IHRydWVcbiAgICAgIC8vIH1cbiAgICAgIHRoaXMuaW5pdFVzZXJEYXRhKClcbiAgICAgIHRoaXMuaW5pdFVzZXJPcmRlcigpXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICB9XG4iXX0=