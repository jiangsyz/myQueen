'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

require('./npm/wepy-async-function/index.js');

var _HttpRequestServer = require('./service/HttpRequestServer.js');

var _HttpRequestServer2 = _interopRequireDefault(_HttpRequestServer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import { setStore } from 'wepy-redux'
// import configStore from './store'

var Md5 = require('./service/md5.js');

// const store = configStore()
// setStore(store)

var _default = function (_wepy$app) {
  _inherits(_default, _wepy$app);

  function _default() {
    _classCallCheck(this, _default);

    var _this2 = _possibleConstructorReturn(this, (_default.__proto__ || Object.getPrototypeOf(_default)).call(this));

    _this2.config = {
      pages: ['pages/login', 'pages/start', 'pages/detail', 'pages/index', 'pages/cart', 'pages/system', 'pages/category', 'pages/search', 'pages/address', 'pages/newAdd', 'pages/editAdd', 'pages/paycart', 'pages/paybuy', 'pages/rules', 'pages/user', 'pages/collect', 'pages/logistica', 'pages/order', 'pages/orderDetail', 'pages/invoice', 'pages/applyVip', 'pages/service', 'pages/link', 'pages/custom'],
      window: {
        backgroundTextStyle: 'dark',
        backgroundColor: '#f8f8f8',
        navigationBarBackgroundColor: '#ec3d3a',
        navigationBarTitleText: 'WeChat',
        navigationBarTextStyle: 'white'
      },
      tabBar: {
        color: '#282626',
        selectedColor: '#cb1d1c',
        backgroundColor: '#f8f8f8',
        list: [{
          pagePath: 'pages/index',
          iconPath: 'image/index-default.png',
          selectedIconPath: 'image/index-active.png',
          text: '首页'
        }, {
          pagePath: 'pages/category',
          iconPath: 'image/category-default.png',
          selectedIconPath: 'image/category-active.png',
          text: '分类'
        }, {
          pagePath: 'pages/cart',
          iconPath: 'image/cart-default.png',
          selectedIconPath: 'image/cart-active.png',
          text: '购物车'
        }, {
          pagePath: 'pages/user',
          iconPath: 'image/user-default.png',
          selectedIconPath: 'image/user-active.png',
          text: '个人中心'
        }]
      }
    };
    _this2.globalData = {
      userInfo: null,
      userLevel: null,
      userHash: null,
      code: null,
      nickName: null,
      userImage: null
    };
    _this2.missToken = false;
    _this2.getTokenTime = 0;
    _this2.httpId = [];
    _this2.errorHttpId = '';
    _this2.pageRoot = false;
    _this2.HttpRequest = new _HttpRequestServer2.default();
    _this2.Md5 = Md5.hexMD5;

    _this2.use('requestfix');
    _this2.intercept('request', {
      config: function config(p) {
        return p;
      },
      success: function success(p) {
        var _this3 = this;

        if (p.statusCode === 200) {
          if (p.data.error === undefined || p.data.error !== 0) {
            this.errorHttpId = p.data.httpId;
          }
          if (p.data.error !== undefined && p.data.error === -1 && p.data.msg === 'miss token') {
            console.log('miss token');
            this.missToken = true;
            if (this.getTokenTime < 3) {
              this.getToken(p.data.error, function () {
                _this3.missToken = false;
                _this3.getTokenTime = 0;
              }, function () {
                _this3.missToken = true;
                _this3.getTokenTime++;
              });
            }
            // this.getTokenTime++
            // if (this.getTokenTime < 3) {
            //   this.missToken = true
            //   this.getToken(p.data.error)
            // } else {
            //   this.showFail()
            //   this.missToken = false
            // }
          } else if (p.data.error !== undefined && p.data.error === -1 && p.data.msg === 'member locked') {
            this.hideLoading();
            _wepy2.default.clearStorage();
            _wepy2.default.showModal({
              title: '提示',
              content: '当前账号已被锁定',
              showCancel: false,
              success: function success(res) {
                if (res.confirm) {
                  _wepy2.default.redirectTo({
                    url: './login'
                  });
                }
              }
            });
          } else if (p.data.error !== undefined && p.data.error === -1) {
            this.showFail(null, p.data.httpId);
          } else if (p.data.error !== undefined && p.data.error === -2) {
            this.showFail(p.data.msg, p.data.httpId);
          } else if (p.data.error !== undefined && p.data.error === 0) {
            this.missToken = false;
            this.getTokenTime = 0;
          }
        } else {
          this.missToken = false;
          this.getTokenTime = 0;
          this.showFail();
        }
        return p;
      },
      fail: function fail(p) {
        return p;
      },
      complete: function complete(p) {
        // 记录request info
        if (p.statusCode === 200) {
          if (p.data.httpId) {
            if (this.httpId.length < 10) {
              this.httpId.push(p.data.httpId);
            } else {
              this.httpId.shift();
              this.httpId.push(p.data.httpId);
            }
          }
        }
        return p;
      }
    });
    return _this2;
  }

  // 判断tabbar回退页面


  _createClass(_default, [{
    key: 'onLaunch',
    value: function onLaunch() {}
  }, {
    key: 'getLogin',
    value: function getLogin(cb) {
      _wepy2.default.login({
        success: function success(res) {
          console.log(res);
          cb && cb(res.code);
          // 发送code
        },
        fail: function fail() {
          _wepy2.default.showToast({
            title: '网络连接失败',
            icon: 'none',
            image: '../image/cancel.png'
          });
        }
      });
    }
  }, {
    key: 'getUserInfo',
    value: function getUserInfo(e, code, refrenceCode, cb, fail) {
      // this.globalData.userInfo = e.detail.userInfo
      console.log(e, code, refrenceCode);
      var data = {
        jscode: code,
        encryptedData: e.detail.encryptedData,
        iv: e.detail.iv,
        referenceId: refrenceCode
      };
      this.HttpRequest.SendCode(data).then(function (res) {
        console.log(res);
        if (res.data.error !== undefined && res.data.error === 0) {
          var phoneNumber = res.data.data.phone;
          _wepy2.default.setStorageSync('phone', phoneNumber);
          cb && cb();
          // var data = {
          //   phone: phoneNumber
          // }
          // this.requestToken(data, cb)
        } else {
          fail && fail();
        }
      }).catch(function () {
        _wepy2.default.showModal({
          title: '登录失败',
          content: '请检查网络连接',
          showCancel: false,
          success: function success(res) {
            if (res.confirm) {
              fail && fail();
            }
          }
        });
      });
    }
    // 已有手机号获取token

  }, {
    key: 'requestToken',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(data, cb, fail) {
        var _this4 = this;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.HttpRequest.UserLogin(data).then(function (res) {
                  if (res.data.error !== undefined && res.data.error === 0) {
                    var token = res.data.data.token;
                    var timeOut = res.data.data.timeOut;
                    _wepy2.default.setStorageSync('token', token);
                    _wepy2.default.setStorageSync('timeout', timeOut);
                    // 设置global的user level 和 hash
                    _this4.getUserLevel(token, function () {
                      cb && cb(token);
                    }, function () {
                      fail && fail();
                    });
                  } else {
                    fail && fail();
                  }
                }).catch(function () {
                  fail && fail();
                });

              case 2:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function requestToken(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
      }

      return requestToken;
    }()
    // 判断token是否过期

  }, {
    key: 'refreshToken',
    value: function refreshToken() {
      // 判断token是否过期 如果没过期直接返回token值
      var nowTime = Math.floor(new Date().getTime() / 1000);
      var timeOut = _wepy2.default.getStorageSync('timeout');
      if (nowTime > timeOut) {
        return false;
      } else {
        return true;
      }
    }

    // 返回当前token

  }, {
    key: 'getToken',
    value: function getToken(error, refrence, cb, fail) {
      var refrenceCode = '';
      if (refrence) {
        refrenceCode = refrence;
      }
      if (_wepy2.default.getStorageSync('token') === '') {
        _wepy2.default.navigateTo({
          url: './login?refrenceCode=' + refrenceCode
        });
      } else {
        if (!this.refreshToken() || error === -1) {
          // token过期 重新发送请求获取新的token
          var data = {
            phone: _wepy2.default.getStorageSync('phone')
          };
          this.requestToken(data, cb, fail);
          return _wepy2.default.getStorageSync('token');
        } else {
          return _wepy2.default.getStorageSync('token');
        }
      }
    }

    // 获取 user level 和 hash

  }, {
    key: 'getUserLevel',
    value: function getUserLevel(token, cb, fail) {
      var _this = this;
      this.HttpRequest.GetUserInfo({ token: token }).then(function (res) {
        if (res.data.error !== undefined && res.data.error === 0) {
          _this.globalData.userLevel = res.data.data.level;
          _this.globalData.userHash = res.data.data.memberHash;
          _this.globalData.vipEnd = res.data.data.vipEnd;
          _this.globalData.reduction = res.data.data.reduction;
          _this.globalData.memberId = res.data.data.memberId;
          _this.globalData.expectedReduction = res.data.data.expectedReduction;
          cb && cb();
        } else {
          fail && fail();
        }
      }).catch(function () {
        fail && fail();
      });
    }
    // 判断当前user hash是否需要重置

  }, {
    key: 'resetUserLevel',
    value: function resetUserLevel(hash, token, cb) {
      if (hash !== this.globalData.userHash) {
        this.getUserLevel(token, cb);
      }
    }
    // 存用户global信息

  }, {
    key: 'getUser',
    value: function getUser(cb) {
      var _this5 = this;

      _wepy2.default.getUserInfo({
        success: function success(res) {
          _this5.globalData.userInfo = res.userInfo;
          cb && cb();
        }
      });
    }
    // 发送用户昵称

  }, {
    key: 'sendNickname',
    value: function sendNickname(token, name) {
      var data = {
        token: token,
        nickName: this.base64Encode(name)
      };
      console.log(data);
      this.HttpRequest.SetNickname(data).then(function (res) {
        console.log(res);
      });
    }
  }, {
    key: 'showLoading',
    value: function showLoading() {
      _wepy2.default.showLoading({
        title: '加载中',
        icon: 'loading'
      });
    }
  }, {
    key: 'hideLoading',
    value: function hideLoading() {
      _wepy2.default.hideLoading();
    }
  }, {
    key: 'showFail',
    value: function showFail(error, content) {
      // wepy.showToast({
      //   title: error || '加载失败',
      //   icon: 'none',
      //   image: '../image/cancel.png'
      // })/
      var contentTxt = content || '5b4813d15ee41';
      _wepy2.default.showModal({
        title: error || '系统开小差了',
        content: '请截图联系客服 ' + contentTxt,
        showCancel: false
      });
    }
  }, {
    key: 'payFail',
    value: function payFail() {
      _wepy2.default.showModal({
        title: '提示',
        content: '支付失败',
        showCancel: false,
        success: function success(res) {
          if (res.confirm) {
            _wepy2.default.redirectTo({
              url: './order?orderType=unpaid'
            });
          }
        }
      });
    }
  }, {
    key: 'disableApi',
    value: function disableApi() {
      _wepy2.default.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      });
    }
    // 时间戳格式化

  }, {
    key: 'dateFormat',
    value: function dateFormat(timestamp, formats) {
      formats = formats || 'Y-m-d';
      var zero = function zero(value) {
        if (value < 10) {
          return '0' + value;
        }
        return value;
      };
      var myDate = timestamp ? new Date(timestamp) : new Date();
      var year = myDate.getFullYear();
      var month = zero(myDate.getMonth() + 1);
      var day = zero(myDate.getDate());
      var hour = zero(myDate.getHours());
      var minite = zero(myDate.getMinutes());
      var second = zero(myDate.getSeconds());
      return formats.replace(/Y|m|d|H|i|s/ig, function (matches) {
        return {
          Y: year,
          m: month,
          d: day,
          H: hour,
          i: minite,
          s: second
        }[matches];
      });
    }
    // 过滤emoji

  }, {
    key: 'filteremoji',
    value: function filteremoji(str) {
      var ranges = ['\uD83C[\uDF00-\uDFFF]', '\uD83D[\uDC00-\uDE4F]', '\uD83D[\uDE80-\uDEFF]'];
      return str.replace(new RegExp(ranges.join('|'), 'g'), '');
    }
    // 客服消息

  }, {
    key: 'getUserName',
    value: function getUserName() {
      if (!this.globalData.userInfo) {
        this.getUser();
      }
      return this.filteremoji(this.globalData.userInfo.nickName);
    }
  }, {
    key: 'getUserAvatar',
    value: function getUserAvatar() {
      if (!this.globalData.userInfo) {
        this.getUser();
      }
      return this.globalData.userInfo.avatarUrl;
    }
  }, {
    key: 'getMessage',
    value: function getMessage(pageDetail, tags) {
      var messageObj = {
        'level': '',
        'cellphones': ''
      };
      if (this.globalData.userLevel === 0) {
        messageObj.level = 'normal';
      } else if (this.globalData.userLevel === 1) {
        messageObj.level = 'vip';
      }
      messageObj.cellphones = [['', _wepy2.default.getStorageSync('phone')]];
      // messageObj.description = pageDetail
      // messageObj.tags = pageDetail + ',' + tags
      // messageObj.custom_fields = {
      //   'TextField_13010': 'test'
      // }
      return JSON.stringify(messageObj);
    }
  }, {
    key: 'getBusiness',
    value: function getBusiness(title, content, orderId) {
      var phone = '';
      if (_wepy2.default.getStorageSync('phone') !== '') {
        phone = _wepy2.default.getStorageSync('phone');
      }
      var noteObj = {
        'title': title,
        'custom_fields': {
          'TextField_28227': content,
          'TextField_28233': orderId,
          'TextField_29513': phone
        }
      };
      return JSON.stringify(noteObj);
    }

    // base64 编码

  }, {
    key: 'base64Encode',
    value: function base64Encode(str) {
      var c1 = '';
      var c2 = '';
      var c3 = '';
      var base64EncodeChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
      var i = 0;
      var len = str.length;
      var strin = '';
      while (i < len) {
        c1 = str.charCodeAt(i++) & 0xff;
        if (i === len) {
          strin += base64EncodeChars.charAt(c1 >> 2);
          strin += base64EncodeChars.charAt((c1 & 0x3) << 4);
          strin += '==';
          break;
        }
        c2 = str.charCodeAt(i++);
        if (i === len) {
          strin += base64EncodeChars.charAt(c1 >> 2);
          strin += base64EncodeChars.charAt((c1 & 0x3) << 4 | (c2 & 0xF0) >> 4);
          strin += base64EncodeChars.charAt((c2 & 0xF) << 2);
          strin += '=';
          break;
        }
        c3 = str.charCodeAt(i++);
        strin += base64EncodeChars.charAt(c1 >> 2);
        strin += base64EncodeChars.charAt((c1 & 0x3) << 4 | (c2 & 0xF0) >> 4);
        strin += base64EncodeChars.charAt((c2 & 0xF) << 2 | (c3 & 0xC0) >> 6);
        strin += base64EncodeChars.charAt(c3 & 0x3F);
      }
      return strin;
    }

    // base64 解码

  }, {
    key: 'base64Decode',
    value: function base64Decode(input) {
      var base64EncodeChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
      var output = '';
      var chr1 = '';
      var chr2 = '';
      var chr3 = '';
      var enc1 = '';
      var enc2 = '';
      var enc3 = '';
      var enc4 = '';
      var i = 0;
      input = input.replace(/[^A-Za-z0-9+/=]/g, '');
      while (i < input.length) {
        enc1 = base64EncodeChars.indexOf(input.charAt(i++));
        enc2 = base64EncodeChars.indexOf(input.charAt(i++));
        enc3 = base64EncodeChars.indexOf(input.charAt(i++));
        enc4 = base64EncodeChars.indexOf(input.charAt(i++));
        chr1 = enc1 << 2 | enc2 >> 4;
        chr2 = (enc2 & 15) << 4 | enc3 >> 2;
        chr3 = (enc3 & 3) << 6 | enc4;
        output = output + String.fromCharCode(chr1);
        if (enc3 !== 64) {
          output = output + String.fromCharCode(chr2);
        }
        if (enc4 !== 64) {
          output = output + String.fromCharCode(chr3);
        }
      }
      return this.utf8Decode(output);
    }

    // utf8

  }, {
    key: 'utf8Decode',
    value: function utf8Decode(utftext) {
      var string = '';
      var i = 0;
      var c = 0;
      var c1 = 0;
      var c2 = 0;
      while (i < utftext.length) {
        c = utftext.charCodeAt(i);
        if (c < 128) {
          string += String.fromCharCode(c);
          i++;
        } else if (c > 191 && c < 224) {
          c1 = utftext.charCodeAt(i + 1);
          string += String.fromCharCode((c & 31) << 6 | c1 & 63);
          i += 2;
        } else {
          c1 = utftext.charCodeAt(i + 1);
          c2 = utftext.charCodeAt(i + 2);
          string += String.fromCharCode((c & 15) << 12 | (c1 & 63) << 6 | c2 & 63);
          i += 3;
        }
      }
      return string;
    }
  }]);

  return _default;
}(_wepy2.default.app);


App(require('./npm/wepy/lib/wepy.js').default.$createApp(_default, {"noPromiseAPI":["createSelectorQuery"]}));
require('./_wepylogs.js')

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJNZDUiLCJyZXF1aXJlIiwiY29uZmlnIiwicGFnZXMiLCJ3aW5kb3ciLCJiYWNrZ3JvdW5kVGV4dFN0eWxlIiwiYmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvciIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlIiwidGFiQmFyIiwiY29sb3IiLCJzZWxlY3RlZENvbG9yIiwibGlzdCIsInBhZ2VQYXRoIiwiaWNvblBhdGgiLCJzZWxlY3RlZEljb25QYXRoIiwidGV4dCIsImdsb2JhbERhdGEiLCJ1c2VySW5mbyIsInVzZXJMZXZlbCIsInVzZXJIYXNoIiwiY29kZSIsIm5pY2tOYW1lIiwidXNlckltYWdlIiwibWlzc1Rva2VuIiwiZ2V0VG9rZW5UaW1lIiwiaHR0cElkIiwiZXJyb3JIdHRwSWQiLCJwYWdlUm9vdCIsIkh0dHBSZXF1ZXN0IiwiaGV4TUQ1IiwidXNlIiwiaW50ZXJjZXB0IiwicCIsInN1Y2Nlc3MiLCJzdGF0dXNDb2RlIiwiZGF0YSIsImVycm9yIiwidW5kZWZpbmVkIiwibXNnIiwiY29uc29sZSIsImxvZyIsImdldFRva2VuIiwiaGlkZUxvYWRpbmciLCJjbGVhclN0b3JhZ2UiLCJzaG93TW9kYWwiLCJ0aXRsZSIsImNvbnRlbnQiLCJzaG93Q2FuY2VsIiwicmVzIiwiY29uZmlybSIsInJlZGlyZWN0VG8iLCJ1cmwiLCJzaG93RmFpbCIsImZhaWwiLCJjb21wbGV0ZSIsImxlbmd0aCIsInB1c2giLCJzaGlmdCIsImNiIiwibG9naW4iLCJzaG93VG9hc3QiLCJpY29uIiwiaW1hZ2UiLCJlIiwicmVmcmVuY2VDb2RlIiwianNjb2RlIiwiZW5jcnlwdGVkRGF0YSIsImRldGFpbCIsIml2IiwicmVmZXJlbmNlSWQiLCJTZW5kQ29kZSIsInRoZW4iLCJwaG9uZU51bWJlciIsInBob25lIiwic2V0U3RvcmFnZVN5bmMiLCJjYXRjaCIsIlVzZXJMb2dpbiIsInRva2VuIiwidGltZU91dCIsImdldFVzZXJMZXZlbCIsIm5vd1RpbWUiLCJNYXRoIiwiZmxvb3IiLCJEYXRlIiwiZ2V0VGltZSIsImdldFN0b3JhZ2VTeW5jIiwicmVmcmVuY2UiLCJuYXZpZ2F0ZVRvIiwicmVmcmVzaFRva2VuIiwicmVxdWVzdFRva2VuIiwiX3RoaXMiLCJHZXRVc2VySW5mbyIsImxldmVsIiwibWVtYmVySGFzaCIsInZpcEVuZCIsInJlZHVjdGlvbiIsIm1lbWJlcklkIiwiZXhwZWN0ZWRSZWR1Y3Rpb24iLCJoYXNoIiwiZ2V0VXNlckluZm8iLCJuYW1lIiwiYmFzZTY0RW5jb2RlIiwiU2V0Tmlja25hbWUiLCJzaG93TG9hZGluZyIsImNvbnRlbnRUeHQiLCJ0aW1lc3RhbXAiLCJmb3JtYXRzIiwiemVybyIsInZhbHVlIiwibXlEYXRlIiwieWVhciIsImdldEZ1bGxZZWFyIiwibW9udGgiLCJnZXRNb250aCIsImRheSIsImdldERhdGUiLCJob3VyIiwiZ2V0SG91cnMiLCJtaW5pdGUiLCJnZXRNaW51dGVzIiwic2Vjb25kIiwiZ2V0U2Vjb25kcyIsInJlcGxhY2UiLCJtYXRjaGVzIiwiWSIsIm0iLCJkIiwiSCIsImkiLCJzIiwic3RyIiwicmFuZ2VzIiwiUmVnRXhwIiwiam9pbiIsImdldFVzZXIiLCJmaWx0ZXJlbW9qaSIsImF2YXRhclVybCIsInBhZ2VEZXRhaWwiLCJ0YWdzIiwibWVzc2FnZU9iaiIsImNlbGxwaG9uZXMiLCJKU09OIiwic3RyaW5naWZ5Iiwib3JkZXJJZCIsIm5vdGVPYmoiLCJjMSIsImMyIiwiYzMiLCJiYXNlNjRFbmNvZGVDaGFycyIsImxlbiIsInN0cmluIiwiY2hhckNvZGVBdCIsImNoYXJBdCIsImlucHV0Iiwib3V0cHV0IiwiY2hyMSIsImNocjIiLCJjaHIzIiwiZW5jMSIsImVuYzIiLCJlbmMzIiwiZW5jNCIsImluZGV4T2YiLCJTdHJpbmciLCJmcm9tQ2hhckNvZGUiLCJ1dGY4RGVjb2RlIiwidXRmdGV4dCIsInN0cmluZyIsImMiLCJhcHAiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7O0FBS0E7Ozs7Ozs7Ozs7Ozs7O0FBSEE7QUFDQTs7QUFHQSxJQUFJQSxNQUFNQyxRQUFRLGVBQVIsQ0FBVjs7QUFFQTtBQUNBOzs7OztBQStFRSxzQkFBZTtBQUFBOztBQUFBOztBQUFBLFdBNUVmQyxNQTRFZSxHQTVFTjtBQUNQQyxhQUFPLENBQ0wsYUFESyxFQUVMLGFBRkssRUFHTCxjQUhLLEVBSUwsYUFKSyxFQUtMLFlBTEssRUFNTCxjQU5LLEVBT0wsZ0JBUEssRUFRTCxjQVJLLEVBU0wsZUFUSyxFQVVMLGNBVkssRUFXTCxlQVhLLEVBWUwsZUFaSyxFQWFMLGNBYkssRUFjTCxhQWRLLEVBZUwsWUFmSyxFQWdCTCxlQWhCSyxFQWlCTCxpQkFqQkssRUFrQkwsYUFsQkssRUFtQkwsbUJBbkJLLEVBb0JMLGVBcEJLLEVBcUJMLGdCQXJCSyxFQXNCTCxlQXRCSyxFQXVCTCxZQXZCSyxFQXdCTCxjQXhCSyxDQURBO0FBMkJQQyxjQUFRO0FBQ05DLDZCQUFxQixNQURmO0FBRU5DLHlCQUFpQixTQUZYO0FBR05DLHNDQUE4QixTQUh4QjtBQUlOQyxnQ0FBd0IsUUFKbEI7QUFLTkMsZ0NBQXdCO0FBTGxCLE9BM0JEO0FBa0NQQyxjQUFRO0FBQ05DLGVBQU8sU0FERDtBQUVOQyx1QkFBZSxTQUZUO0FBR05OLHlCQUFpQixTQUhYO0FBSU5PLGNBQU0sQ0FBQztBQUNMQyxvQkFBVSxhQURMO0FBRUxDLG9CQUFVLHlCQUZMO0FBR0xDLDRCQUFrQix3QkFIYjtBQUlMQyxnQkFBTTtBQUpELFNBQUQsRUFLSDtBQUNESCxvQkFBVSxnQkFEVDtBQUVEQyxvQkFBVSw0QkFGVDtBQUdEQyw0QkFBa0IsMkJBSGpCO0FBSURDLGdCQUFNO0FBSkwsU0FMRyxFQVVIO0FBQ0RILG9CQUFVLFlBRFQ7QUFFREMsb0JBQVUsd0JBRlQ7QUFHREMsNEJBQWtCLHVCQUhqQjtBQUlEQyxnQkFBTTtBQUpMLFNBVkcsRUFlSDtBQUNESCxvQkFBVSxZQURUO0FBRURDLG9CQUFVLHdCQUZUO0FBR0RDLDRCQUFrQix1QkFIakI7QUFJREMsZ0JBQU07QUFKTCxTQWZHO0FBSkE7QUFsQ0QsS0E0RU07QUFBQSxXQWRmQyxVQWNlLEdBZEY7QUFDWEMsZ0JBQVUsSUFEQztBQUVYQyxpQkFBVyxJQUZBO0FBR1hDLGdCQUFVLElBSEM7QUFJWEMsWUFBTSxJQUpLO0FBS1hDLGdCQUFVLElBTEM7QUFNWEMsaUJBQVc7QUFOQSxLQWNFO0FBQUEsV0FMZkMsU0FLZSxHQUxILEtBS0c7QUFBQSxXQUpmQyxZQUllLEdBSkEsQ0FJQTtBQUFBLFdBSGZDLE1BR2UsR0FITixFQUdNO0FBQUEsV0FGZkMsV0FFZSxHQUZELEVBRUM7QUFBQSxXQW1GZkMsUUFuRmUsR0FtRkosS0FuRkk7QUFBQSxXQXljZkMsV0F6Y2UsR0F5Y0QsaUNBemNDO0FBQUEsV0EwY2Y5QixHQTFjZSxHQTBjVEEsSUFBSStCLE1BMWNLOztBQUViLFdBQUtDLEdBQUwsQ0FBUyxZQUFUO0FBQ0EsV0FBS0MsU0FBTCxDQUFlLFNBQWYsRUFBMEI7QUFDeEIvQixZQUR3QixrQkFDaEJnQyxDQURnQixFQUNiO0FBQ1QsZUFBT0EsQ0FBUDtBQUNELE9BSHVCO0FBSXhCQyxhQUp3QixtQkFJZkQsQ0FKZSxFQUlaO0FBQUE7O0FBQ1YsWUFBSUEsRUFBRUUsVUFBRixLQUFpQixHQUFyQixFQUEwQjtBQUN4QixjQUFJRixFQUFFRyxJQUFGLENBQU9DLEtBQVAsS0FBaUJDLFNBQWpCLElBQThCTCxFQUFFRyxJQUFGLENBQU9DLEtBQVAsS0FBaUIsQ0FBbkQsRUFBc0Q7QUFDcEQsaUJBQUtWLFdBQUwsR0FBbUJNLEVBQUVHLElBQUYsQ0FBT1YsTUFBMUI7QUFDRDtBQUNELGNBQUlPLEVBQUVHLElBQUYsQ0FBT0MsS0FBUCxLQUFpQkMsU0FBakIsSUFBOEJMLEVBQUVHLElBQUYsQ0FBT0MsS0FBUCxLQUFpQixDQUFDLENBQWhELElBQXFESixFQUFFRyxJQUFGLENBQU9HLEdBQVAsS0FBZSxZQUF4RSxFQUFzRjtBQUNwRkMsb0JBQVFDLEdBQVIsQ0FBWSxZQUFaO0FBQ0EsaUJBQUtqQixTQUFMLEdBQWlCLElBQWpCO0FBQ0EsZ0JBQUksS0FBS0MsWUFBTCxHQUFvQixDQUF4QixFQUEyQjtBQUN6QixtQkFBS2lCLFFBQUwsQ0FBY1QsRUFBRUcsSUFBRixDQUFPQyxLQUFyQixFQUE0QixZQUFNO0FBQ2hDLHVCQUFLYixTQUFMLEdBQWlCLEtBQWpCO0FBQ0EsdUJBQUtDLFlBQUwsR0FBb0IsQ0FBcEI7QUFDRCxlQUhELEVBR0csWUFBTTtBQUNQLHVCQUFLRCxTQUFMLEdBQWlCLElBQWpCO0FBQ0EsdUJBQUtDLFlBQUw7QUFDRCxlQU5EO0FBT0Q7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0QsV0FwQkQsTUFvQk8sSUFBSVEsRUFBRUcsSUFBRixDQUFPQyxLQUFQLEtBQWlCQyxTQUFqQixJQUE4QkwsRUFBRUcsSUFBRixDQUFPQyxLQUFQLEtBQWlCLENBQUMsQ0FBaEQsSUFBcURKLEVBQUVHLElBQUYsQ0FBT0csR0FBUCxLQUFlLGVBQXhFLEVBQXlGO0FBQzlGLGlCQUFLSSxXQUFMO0FBQ0EsMkJBQUtDLFlBQUw7QUFDQSwyQkFBS0MsU0FBTCxDQUFlO0FBQ2JDLHFCQUFPLElBRE07QUFFYkMsdUJBQVMsVUFGSTtBQUdiQywwQkFBWSxLQUhDO0FBSWJkLHVCQUFTLGlCQUFDZSxHQUFELEVBQVM7QUFDaEIsb0JBQUlBLElBQUlDLE9BQVIsRUFBaUI7QUFDZixpQ0FBS0MsVUFBTCxDQUFnQjtBQUNkQyx5QkFBSztBQURTLG1CQUFoQjtBQUdEO0FBQ0Y7QUFWWSxhQUFmO0FBWUQsV0FmTSxNQWVBLElBQUluQixFQUFFRyxJQUFGLENBQU9DLEtBQVAsS0FBaUJDLFNBQWpCLElBQThCTCxFQUFFRyxJQUFGLENBQU9DLEtBQVAsS0FBaUIsQ0FBQyxDQUFwRCxFQUF1RDtBQUM1RCxpQkFBS2dCLFFBQUwsQ0FBYyxJQUFkLEVBQW9CcEIsRUFBRUcsSUFBRixDQUFPVixNQUEzQjtBQUNELFdBRk0sTUFFQSxJQUFJTyxFQUFFRyxJQUFGLENBQU9DLEtBQVAsS0FBaUJDLFNBQWpCLElBQThCTCxFQUFFRyxJQUFGLENBQU9DLEtBQVAsS0FBaUIsQ0FBQyxDQUFwRCxFQUF1RDtBQUM1RCxpQkFBS2dCLFFBQUwsQ0FBY3BCLEVBQUVHLElBQUYsQ0FBT0csR0FBckIsRUFBMEJOLEVBQUVHLElBQUYsQ0FBT1YsTUFBakM7QUFDRCxXQUZNLE1BRUEsSUFBSU8sRUFBRUcsSUFBRixDQUFPQyxLQUFQLEtBQWlCQyxTQUFqQixJQUE4QkwsRUFBRUcsSUFBRixDQUFPQyxLQUFQLEtBQWlCLENBQW5ELEVBQXNEO0FBQzNELGlCQUFLYixTQUFMLEdBQWlCLEtBQWpCO0FBQ0EsaUJBQUtDLFlBQUwsR0FBb0IsQ0FBcEI7QUFDRDtBQUNGLFNBL0NELE1BK0NPO0FBQ0wsZUFBS0QsU0FBTCxHQUFpQixLQUFqQjtBQUNBLGVBQUtDLFlBQUwsR0FBb0IsQ0FBcEI7QUFDQSxlQUFLNEIsUUFBTDtBQUNEO0FBQ0QsZUFBT3BCLENBQVA7QUFDRCxPQTFEdUI7QUEyRHhCcUIsVUEzRHdCLGdCQTJEbEJyQixDQTNEa0IsRUEyRGY7QUFDUCxlQUFPQSxDQUFQO0FBQ0QsT0E3RHVCO0FBOER4QnNCLGNBOUR3QixvQkE4RGR0QixDQTlEYyxFQThEWDtBQUNYO0FBQ0EsWUFBSUEsRUFBRUUsVUFBRixLQUFpQixHQUFyQixFQUEwQjtBQUN4QixjQUFJRixFQUFFRyxJQUFGLENBQU9WLE1BQVgsRUFBbUI7QUFDakIsZ0JBQUksS0FBS0EsTUFBTCxDQUFZOEIsTUFBWixHQUFxQixFQUF6QixFQUE2QjtBQUMzQixtQkFBSzlCLE1BQUwsQ0FBWStCLElBQVosQ0FBaUJ4QixFQUFFRyxJQUFGLENBQU9WLE1BQXhCO0FBQ0QsYUFGRCxNQUVPO0FBQ0wsbUJBQUtBLE1BQUwsQ0FBWWdDLEtBQVo7QUFDQSxtQkFBS2hDLE1BQUwsQ0FBWStCLElBQVosQ0FBaUJ4QixFQUFFRyxJQUFGLENBQU9WLE1BQXhCO0FBQ0Q7QUFDRjtBQUNGO0FBQ0QsZUFBT08sQ0FBUDtBQUNEO0FBM0V1QixLQUExQjtBQUhhO0FBZ0ZkOztBQUVEOzs7OzsrQkFHVyxDQUFFOzs7NkJBRUgwQixFLEVBQUk7QUFDWixxQkFBS0MsS0FBTCxDQUFXO0FBQ1QxQixpQkFBUyxpQkFBQ2UsR0FBRCxFQUFTO0FBQ2hCVCxrQkFBUUMsR0FBUixDQUFZUSxHQUFaO0FBQ0FVLGdCQUFNQSxHQUFHVixJQUFJNUIsSUFBUCxDQUFOO0FBQ0E7QUFDRCxTQUxRO0FBTVRpQyxjQUFNLGdCQUFNO0FBQ1YseUJBQUtPLFNBQUwsQ0FBZTtBQUNiZixtQkFBTyxRQURNO0FBRWJnQixrQkFBTSxNQUZPO0FBR2JDLG1CQUFPO0FBSE0sV0FBZjtBQUtEO0FBWlEsT0FBWDtBQWNEOzs7Z0NBRVdDLEMsRUFBRzNDLEksRUFBTTRDLFksRUFBY04sRSxFQUFJTCxJLEVBQU07QUFDM0M7QUFDQWQsY0FBUUMsR0FBUixDQUFZdUIsQ0FBWixFQUFlM0MsSUFBZixFQUFxQjRDLFlBQXJCO0FBQ0EsVUFBSTdCLE9BQU87QUFDVDhCLGdCQUFRN0MsSUFEQztBQUVUOEMsdUJBQWVILEVBQUVJLE1BQUYsQ0FBU0QsYUFGZjtBQUdURSxZQUFJTCxFQUFFSSxNQUFGLENBQVNDLEVBSEo7QUFJVEMscUJBQWFMO0FBSkosT0FBWDtBQU1BLFdBQUtwQyxXQUFMLENBQWlCMEMsUUFBakIsQ0FBMEJuQyxJQUExQixFQUFnQ29DLElBQWhDLENBQXFDLFVBQUN2QixHQUFELEVBQVM7QUFDNUNULGdCQUFRQyxHQUFSLENBQVlRLEdBQVo7QUFDQSxZQUFJQSxJQUFJYixJQUFKLENBQVNDLEtBQVQsS0FBbUJDLFNBQW5CLElBQWdDVyxJQUFJYixJQUFKLENBQVNDLEtBQVQsS0FBbUIsQ0FBdkQsRUFBMEQ7QUFDeEQsY0FBSW9DLGNBQWN4QixJQUFJYixJQUFKLENBQVNBLElBQVQsQ0FBY3NDLEtBQWhDO0FBQ0EseUJBQUtDLGNBQUwsQ0FBb0IsT0FBcEIsRUFBNkJGLFdBQTdCO0FBQ0FkLGdCQUFNQSxJQUFOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDRCxTQVJELE1BUU87QUFDTEwsa0JBQVFBLE1BQVI7QUFDRDtBQUNGLE9BYkQsRUFhR3NCLEtBYkgsQ0FhUyxZQUFNO0FBQ2IsdUJBQUsvQixTQUFMLENBQWU7QUFDYkMsaUJBQU8sTUFETTtBQUViQyxtQkFBUyxTQUZJO0FBR2JDLHNCQUFZLEtBSEM7QUFJYmQsbUJBQVMsaUJBQUNlLEdBQUQsRUFBUztBQUNoQixnQkFBSUEsSUFBSUMsT0FBUixFQUFpQjtBQUNmSSxzQkFBUUEsTUFBUjtBQUNEO0FBQ0Y7QUFSWSxTQUFmO0FBVUQsT0F4QkQ7QUF5QkQ7QUFDRDs7Ozs7MEZBQ29CbEIsSSxFQUFNdUIsRSxFQUFJTCxJOzs7Ozs7Ozt1QkFDdEIsS0FBS3pCLFdBQUwsQ0FBaUJnRCxTQUFqQixDQUEyQnpDLElBQTNCLEVBQWlDb0MsSUFBakMsQ0FBc0MsVUFBQ3ZCLEdBQUQsRUFBUztBQUNuRCxzQkFBSUEsSUFBSWIsSUFBSixDQUFTQyxLQUFULEtBQW1CQyxTQUFuQixJQUFnQ1csSUFBSWIsSUFBSixDQUFTQyxLQUFULEtBQW1CLENBQXZELEVBQTBEO0FBQ3hELHdCQUFJeUMsUUFBUTdCLElBQUliLElBQUosQ0FBU0EsSUFBVCxDQUFjMEMsS0FBMUI7QUFDQSx3QkFBSUMsVUFBVTlCLElBQUliLElBQUosQ0FBU0EsSUFBVCxDQUFjMkMsT0FBNUI7QUFDQSxtQ0FBS0osY0FBTCxDQUFvQixPQUFwQixFQUE2QkcsS0FBN0I7QUFDQSxtQ0FBS0gsY0FBTCxDQUFvQixTQUFwQixFQUErQkksT0FBL0I7QUFDQTtBQUNBLDJCQUFLQyxZQUFMLENBQWtCRixLQUFsQixFQUF5QixZQUFNO0FBQzdCbkIsNEJBQU1BLEdBQUdtQixLQUFILENBQU47QUFDRCxxQkFGRCxFQUVHLFlBQU07QUFDUHhCLDhCQUFRQSxNQUFSO0FBQ0QscUJBSkQ7QUFLRCxtQkFYRCxNQVdPO0FBQ0xBLDRCQUFRQSxNQUFSO0FBQ0Q7QUFDRixpQkFmSyxFQWVIc0IsS0FmRyxDQWVHLFlBQU07QUFDYnRCLDBCQUFRQSxNQUFSO0FBQ0QsaUJBakJLLEM7Ozs7Ozs7Ozs7Ozs7Ozs7QUFtQlI7Ozs7bUNBQ2dCO0FBQ2Q7QUFDQSxVQUFJMkIsVUFBVUMsS0FBS0MsS0FBTCxDQUFXLElBQUlDLElBQUosR0FBV0MsT0FBWCxLQUF1QixJQUFsQyxDQUFkO0FBQ0EsVUFBSU4sVUFBVSxlQUFLTyxjQUFMLENBQW9CLFNBQXBCLENBQWQ7QUFDQSxVQUFJTCxVQUFVRixPQUFkLEVBQXVCO0FBQ3JCLGVBQU8sS0FBUDtBQUNELE9BRkQsTUFFTztBQUNMLGVBQU8sSUFBUDtBQUNEO0FBQ0Y7O0FBRUQ7Ozs7NkJBQ1UxQyxLLEVBQU9rRCxRLEVBQVU1QixFLEVBQUlMLEksRUFBTTtBQUNuQyxVQUFJVyxlQUFlLEVBQW5CO0FBQ0EsVUFBSXNCLFFBQUosRUFBYztBQUNadEIsdUJBQWVzQixRQUFmO0FBQ0Q7QUFDRCxVQUFJLGVBQUtELGNBQUwsQ0FBb0IsT0FBcEIsTUFBaUMsRUFBckMsRUFBeUM7QUFDdkMsdUJBQUtFLFVBQUwsQ0FBZ0I7QUFDZHBDLGVBQUssMEJBQTBCYTtBQURqQixTQUFoQjtBQUdELE9BSkQsTUFJTztBQUNMLFlBQUksQ0FBQyxLQUFLd0IsWUFBTCxFQUFELElBQXdCcEQsVUFBVSxDQUFDLENBQXZDLEVBQTBDO0FBQ3hDO0FBQ0EsY0FBSUQsT0FBTztBQUNUc0MsbUJBQU8sZUFBS1ksY0FBTCxDQUFvQixPQUFwQjtBQURFLFdBQVg7QUFHQSxlQUFLSSxZQUFMLENBQWtCdEQsSUFBbEIsRUFBd0J1QixFQUF4QixFQUE0QkwsSUFBNUI7QUFDQSxpQkFBTyxlQUFLZ0MsY0FBTCxDQUFvQixPQUFwQixDQUFQO0FBQ0QsU0FQRCxNQU9PO0FBQ0wsaUJBQU8sZUFBS0EsY0FBTCxDQUFvQixPQUFwQixDQUFQO0FBQ0Q7QUFDRjtBQUNGOztBQUVEOzs7O2lDQUNjUixLLEVBQU9uQixFLEVBQUlMLEksRUFBTTtBQUM3QixVQUFJcUMsUUFBUSxJQUFaO0FBQ0EsV0FBSzlELFdBQUwsQ0FBaUIrRCxXQUFqQixDQUE2QixFQUFDZCxPQUFPQSxLQUFSLEVBQTdCLEVBQTZDTixJQUE3QyxDQUFrRCxVQUFDdkIsR0FBRCxFQUFTO0FBQ3pELFlBQUlBLElBQUliLElBQUosQ0FBU0MsS0FBVCxLQUFtQkMsU0FBbkIsSUFBZ0NXLElBQUliLElBQUosQ0FBU0MsS0FBVCxLQUFtQixDQUF2RCxFQUEwRDtBQUN4RHNELGdCQUFNMUUsVUFBTixDQUFpQkUsU0FBakIsR0FBNkI4QixJQUFJYixJQUFKLENBQVNBLElBQVQsQ0FBY3lELEtBQTNDO0FBQ0FGLGdCQUFNMUUsVUFBTixDQUFpQkcsUUFBakIsR0FBNEI2QixJQUFJYixJQUFKLENBQVNBLElBQVQsQ0FBYzBELFVBQTFDO0FBQ0FILGdCQUFNMUUsVUFBTixDQUFpQjhFLE1BQWpCLEdBQTBCOUMsSUFBSWIsSUFBSixDQUFTQSxJQUFULENBQWMyRCxNQUF4QztBQUNBSixnQkFBTTFFLFVBQU4sQ0FBaUIrRSxTQUFqQixHQUE2Qi9DLElBQUliLElBQUosQ0FBU0EsSUFBVCxDQUFjNEQsU0FBM0M7QUFDQUwsZ0JBQU0xRSxVQUFOLENBQWlCZ0YsUUFBakIsR0FBNEJoRCxJQUFJYixJQUFKLENBQVNBLElBQVQsQ0FBYzZELFFBQTFDO0FBQ0FOLGdCQUFNMUUsVUFBTixDQUFpQmlGLGlCQUFqQixHQUFxQ2pELElBQUliLElBQUosQ0FBU0EsSUFBVCxDQUFjOEQsaUJBQW5EO0FBQ0F2QyxnQkFBTUEsSUFBTjtBQUNELFNBUkQsTUFRTztBQUNMTCxrQkFBUUEsTUFBUjtBQUNEO0FBQ0YsT0FaRCxFQVlHc0IsS0FaSCxDQVlTLFlBQU07QUFDYnRCLGdCQUFRQSxNQUFSO0FBQ0QsT0FkRDtBQWVEO0FBQ0Q7Ozs7bUNBQ2dCNkMsSSxFQUFNckIsSyxFQUFPbkIsRSxFQUFJO0FBQy9CLFVBQUl3QyxTQUFTLEtBQUtsRixVQUFMLENBQWdCRyxRQUE3QixFQUF1QztBQUNyQyxhQUFLNEQsWUFBTCxDQUFrQkYsS0FBbEIsRUFBeUJuQixFQUF6QjtBQUNEO0FBQ0Y7QUFDRDs7Ozs0QkFDU0EsRSxFQUFJO0FBQUE7O0FBQ1gscUJBQUt5QyxXQUFMLENBQWlCO0FBQ2ZsRSxpQkFBUyxpQkFBQ2UsR0FBRCxFQUFTO0FBQ2hCLGlCQUFLaEMsVUFBTCxDQUFnQkMsUUFBaEIsR0FBMkIrQixJQUFJL0IsUUFBL0I7QUFDQXlDLGdCQUFNQSxJQUFOO0FBQ0Q7QUFKYyxPQUFqQjtBQU1EO0FBQ0Q7Ozs7aUNBQ2NtQixLLEVBQU91QixJLEVBQU07QUFDekIsVUFBSWpFLE9BQU87QUFDVDBDLGVBQU9BLEtBREU7QUFFVHhELGtCQUFVLEtBQUtnRixZQUFMLENBQWtCRCxJQUFsQjtBQUZELE9BQVg7QUFJQTdELGNBQVFDLEdBQVIsQ0FBWUwsSUFBWjtBQUNBLFdBQUtQLFdBQUwsQ0FBaUIwRSxXQUFqQixDQUE2Qm5FLElBQTdCLEVBQW1Db0MsSUFBbkMsQ0FBd0MsVUFBQ3ZCLEdBQUQsRUFBUztBQUMvQ1QsZ0JBQVFDLEdBQVIsQ0FBWVEsR0FBWjtBQUNELE9BRkQ7QUFHRDs7O2tDQUNjO0FBQ2IscUJBQUt1RCxXQUFMLENBQWlCO0FBQ2YxRCxlQUFPLEtBRFE7QUFFZmdCLGNBQU07QUFGUyxPQUFqQjtBQUlEOzs7a0NBQ2M7QUFDYixxQkFBS25CLFdBQUw7QUFDRDs7OzZCQUNTTixLLEVBQU9VLE8sRUFBUztBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBSTBELGFBQWExRCxXQUFXLGVBQTVCO0FBQ0EscUJBQUtGLFNBQUwsQ0FBZTtBQUNiQyxlQUFPVCxTQUFTLFFBREg7QUFFYlUsaUJBQVMsYUFBYTBELFVBRlQ7QUFHYnpELG9CQUFZO0FBSEMsT0FBZjtBQUtEOzs7OEJBQ1U7QUFDVCxxQkFBS0gsU0FBTCxDQUFlO0FBQ2JDLGVBQU8sSUFETTtBQUViQyxpQkFBUyxNQUZJO0FBR2JDLG9CQUFZLEtBSEM7QUFJYmQsaUJBQVMsaUJBQUNlLEdBQUQsRUFBUztBQUNoQixjQUFJQSxJQUFJQyxPQUFSLEVBQWlCO0FBQ2YsMkJBQUtDLFVBQUwsQ0FBZ0I7QUFDZEMsbUJBQUs7QUFEUyxhQUFoQjtBQUdEO0FBQ0Y7QUFWWSxPQUFmO0FBWUQ7OztpQ0FDYTtBQUNaLHFCQUFLUCxTQUFMLENBQWU7QUFDYkMsZUFBTyxJQURNO0FBRWJDLGlCQUFTO0FBRkksT0FBZjtBQUlEO0FBQ0Q7Ozs7K0JBQ1kyRCxTLEVBQVdDLE8sRUFBUztBQUM5QkEsZ0JBQVVBLFdBQVcsT0FBckI7QUFDQSxVQUFJQyxPQUFPLFNBQVBBLElBQU8sQ0FBVUMsS0FBVixFQUFpQjtBQUMxQixZQUFJQSxRQUFRLEVBQVosRUFBZ0I7QUFDZCxpQkFBTyxNQUFNQSxLQUFiO0FBQ0Q7QUFDRCxlQUFPQSxLQUFQO0FBQ0QsT0FMRDtBQU1BLFVBQUlDLFNBQVNKLFlBQVksSUFBSXRCLElBQUosQ0FBU3NCLFNBQVQsQ0FBWixHQUFrQyxJQUFJdEIsSUFBSixFQUEvQztBQUNBLFVBQUkyQixPQUFPRCxPQUFPRSxXQUFQLEVBQVg7QUFDQSxVQUFJQyxRQUFRTCxLQUFLRSxPQUFPSSxRQUFQLEtBQW9CLENBQXpCLENBQVo7QUFDQSxVQUFJQyxNQUFNUCxLQUFLRSxPQUFPTSxPQUFQLEVBQUwsQ0FBVjtBQUNBLFVBQUlDLE9BQU9ULEtBQUtFLE9BQU9RLFFBQVAsRUFBTCxDQUFYO0FBQ0EsVUFBSUMsU0FBU1gsS0FBS0UsT0FBT1UsVUFBUCxFQUFMLENBQWI7QUFDQSxVQUFJQyxTQUFTYixLQUFLRSxPQUFPWSxVQUFQLEVBQUwsQ0FBYjtBQUNBLGFBQU9mLFFBQVFnQixPQUFSLENBQWdCLGVBQWhCLEVBQWlDLFVBQVVDLE9BQVYsRUFBbUI7QUFDekQsZUFBUTtBQUNOQyxhQUFHZCxJQURHO0FBRU5lLGFBQUdiLEtBRkc7QUFHTmMsYUFBR1osR0FIRztBQUlOYSxhQUFHWCxJQUpHO0FBS05ZLGFBQUdWLE1BTEc7QUFNTlcsYUFBR1Q7QUFORyxTQUFELENBT0pHLE9BUEksQ0FBUDtBQVFELE9BVE0sQ0FBUDtBQVVEO0FBQ0Q7Ozs7Z0NBQ2FPLEcsRUFBSztBQUNoQixVQUFJQyxTQUFTLENBQ1gsdUJBRFcsRUFFWCx1QkFGVyxFQUdYLHVCQUhXLENBQWI7QUFLQSxhQUFPRCxJQUFJUixPQUFKLENBQVksSUFBSVUsTUFBSixDQUFXRCxPQUFPRSxJQUFQLENBQVksR0FBWixDQUFYLEVBQTZCLEdBQTdCLENBQVosRUFBK0MsRUFBL0MsQ0FBUDtBQUNEO0FBQ0Q7Ozs7a0NBQ2U7QUFDYixVQUFJLENBQUMsS0FBS3JILFVBQUwsQ0FBZ0JDLFFBQXJCLEVBQStCO0FBQzdCLGFBQUtxSCxPQUFMO0FBQ0Q7QUFDRCxhQUFPLEtBQUtDLFdBQUwsQ0FBaUIsS0FBS3ZILFVBQUwsQ0FBZ0JDLFFBQWhCLENBQXlCSSxRQUExQyxDQUFQO0FBQ0Q7OztvQ0FDZ0I7QUFDZixVQUFJLENBQUMsS0FBS0wsVUFBTCxDQUFnQkMsUUFBckIsRUFBK0I7QUFDN0IsYUFBS3FILE9BQUw7QUFDRDtBQUNELGFBQU8sS0FBS3RILFVBQUwsQ0FBZ0JDLFFBQWhCLENBQXlCdUgsU0FBaEM7QUFDRDs7OytCQUNXQyxVLEVBQVlDLEksRUFBTTtBQUM1QixVQUFJQyxhQUFhO0FBQ2YsaUJBQVMsRUFETTtBQUVmLHNCQUFjO0FBRkMsT0FBakI7QUFJQSxVQUFJLEtBQUszSCxVQUFMLENBQWdCRSxTQUFoQixLQUE4QixDQUFsQyxFQUFxQztBQUNuQ3lILG1CQUFXL0MsS0FBWCxHQUFtQixRQUFuQjtBQUNELE9BRkQsTUFFTyxJQUFJLEtBQUs1RSxVQUFMLENBQWdCRSxTQUFoQixLQUE4QixDQUFsQyxFQUFxQztBQUMxQ3lILG1CQUFXL0MsS0FBWCxHQUFtQixLQUFuQjtBQUNEO0FBQ0QrQyxpQkFBV0MsVUFBWCxHQUF3QixDQUFDLENBQUMsRUFBRCxFQUFLLGVBQUt2RCxjQUFMLENBQW9CLE9BQXBCLENBQUwsQ0FBRCxDQUF4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFPd0QsS0FBS0MsU0FBTCxDQUFlSCxVQUFmLENBQVA7QUFDRDs7O2dDQUNZOUYsSyxFQUFPQyxPLEVBQVNpRyxPLEVBQVM7QUFDcEMsVUFBSXRFLFFBQVEsRUFBWjtBQUNBLFVBQUksZUFBS1ksY0FBTCxDQUFvQixPQUFwQixNQUFpQyxFQUFyQyxFQUF5QztBQUN2Q1osZ0JBQVEsZUFBS1ksY0FBTCxDQUFvQixPQUFwQixDQUFSO0FBQ0Q7QUFDRCxVQUFJMkQsVUFBVTtBQUNaLGlCQUFTbkcsS0FERztBQUVaLHlCQUFpQjtBQUNmLDZCQUFtQkMsT0FESjtBQUVmLDZCQUFtQmlHLE9BRko7QUFHZiw2QkFBbUJ0RTtBQUhKO0FBRkwsT0FBZDtBQVFBLGFBQU9vRSxLQUFLQyxTQUFMLENBQWVFLE9BQWYsQ0FBUDtBQUNEOztBQUVEOzs7O2lDQUNjZCxHLEVBQUs7QUFDakIsVUFBSWUsS0FBSyxFQUFUO0FBQ0EsVUFBSUMsS0FBSyxFQUFUO0FBQ0EsVUFBSUMsS0FBSyxFQUFUO0FBQ0EsVUFBSUMsb0JBQW9CLG1FQUF4QjtBQUNBLFVBQUlwQixJQUFJLENBQVI7QUFDQSxVQUFJcUIsTUFBTW5CLElBQUkzRSxNQUFkO0FBQ0EsVUFBSStGLFFBQVEsRUFBWjtBQUNBLGFBQU90QixJQUFJcUIsR0FBWCxFQUFnQjtBQUNkSixhQUFLZixJQUFJcUIsVUFBSixDQUFldkIsR0FBZixJQUFzQixJQUEzQjtBQUNBLFlBQUlBLE1BQU1xQixHQUFWLEVBQWU7QUFDYkMsbUJBQVNGLGtCQUFrQkksTUFBbEIsQ0FBeUJQLE1BQU0sQ0FBL0IsQ0FBVDtBQUNBSyxtQkFBU0Ysa0JBQWtCSSxNQUFsQixDQUF5QixDQUFDUCxLQUFLLEdBQU4sS0FBYyxDQUF2QyxDQUFUO0FBQ0FLLG1CQUFTLElBQVQ7QUFDQTtBQUNEO0FBQ0RKLGFBQUtoQixJQUFJcUIsVUFBSixDQUFldkIsR0FBZixDQUFMO0FBQ0EsWUFBSUEsTUFBTXFCLEdBQVYsRUFBZTtBQUNiQyxtQkFBU0Ysa0JBQWtCSSxNQUFsQixDQUF5QlAsTUFBTSxDQUEvQixDQUFUO0FBQ0FLLG1CQUFTRixrQkFBa0JJLE1BQWxCLENBQTBCLENBQUNQLEtBQUssR0FBTixLQUFjLENBQWYsR0FBcUIsQ0FBQ0MsS0FBSyxJQUFOLEtBQWUsQ0FBN0QsQ0FBVDtBQUNBSSxtQkFBU0Ysa0JBQWtCSSxNQUFsQixDQUF5QixDQUFDTixLQUFLLEdBQU4sS0FBYyxDQUF2QyxDQUFUO0FBQ0FJLG1CQUFTLEdBQVQ7QUFDQTtBQUNEO0FBQ0RILGFBQUtqQixJQUFJcUIsVUFBSixDQUFldkIsR0FBZixDQUFMO0FBQ0FzQixpQkFBU0Ysa0JBQWtCSSxNQUFsQixDQUF5QlAsTUFBTSxDQUEvQixDQUFUO0FBQ0FLLGlCQUFTRixrQkFBa0JJLE1BQWxCLENBQTBCLENBQUNQLEtBQUssR0FBTixLQUFjLENBQWYsR0FBcUIsQ0FBQ0MsS0FBSyxJQUFOLEtBQWUsQ0FBN0QsQ0FBVDtBQUNBSSxpQkFBU0Ysa0JBQWtCSSxNQUFsQixDQUEwQixDQUFDTixLQUFLLEdBQU4sS0FBYyxDQUFmLEdBQXFCLENBQUNDLEtBQUssSUFBTixLQUFlLENBQTdELENBQVQ7QUFDQUcsaUJBQVNGLGtCQUFrQkksTUFBbEIsQ0FBeUJMLEtBQUssSUFBOUIsQ0FBVDtBQUNEO0FBQ0QsYUFBT0csS0FBUDtBQUNEOztBQUVEOzs7O2lDQUNjRyxLLEVBQU87QUFDbkIsVUFBSUwsb0JBQW9CLG1FQUF4QjtBQUNBLFVBQUlNLFNBQVMsRUFBYjtBQUNBLFVBQUlDLE9BQU8sRUFBWDtBQUNBLFVBQUlDLE9BQU8sRUFBWDtBQUNBLFVBQUlDLE9BQU8sRUFBWDtBQUNBLFVBQUlDLE9BQU8sRUFBWDtBQUNBLFVBQUlDLE9BQU8sRUFBWDtBQUNBLFVBQUlDLE9BQU8sRUFBWDtBQUNBLFVBQUlDLE9BQU8sRUFBWDtBQUNBLFVBQUlqQyxJQUFJLENBQVI7QUFDQXlCLGNBQVFBLE1BQU0vQixPQUFOLENBQWMsa0JBQWQsRUFBa0MsRUFBbEMsQ0FBUjtBQUNBLGFBQU9NLElBQUl5QixNQUFNbEcsTUFBakIsRUFBeUI7QUFDdkJ1RyxlQUFPVixrQkFBa0JjLE9BQWxCLENBQTBCVCxNQUFNRCxNQUFOLENBQWF4QixHQUFiLENBQTFCLENBQVA7QUFDQStCLGVBQU9YLGtCQUFrQmMsT0FBbEIsQ0FBMEJULE1BQU1ELE1BQU4sQ0FBYXhCLEdBQWIsQ0FBMUIsQ0FBUDtBQUNBZ0MsZUFBT1osa0JBQWtCYyxPQUFsQixDQUEwQlQsTUFBTUQsTUFBTixDQUFheEIsR0FBYixDQUExQixDQUFQO0FBQ0FpQyxlQUFPYixrQkFBa0JjLE9BQWxCLENBQTBCVCxNQUFNRCxNQUFOLENBQWF4QixHQUFiLENBQTFCLENBQVA7QUFDQTJCLGVBQVFHLFFBQVEsQ0FBVCxHQUFlQyxRQUFRLENBQTlCO0FBQ0FILGVBQVEsQ0FBQ0csT0FBTyxFQUFSLEtBQWUsQ0FBaEIsR0FBc0JDLFFBQVEsQ0FBckM7QUFDQUgsZUFBUSxDQUFDRyxPQUFPLENBQVIsS0FBYyxDQUFmLEdBQW9CQyxJQUEzQjtBQUNBUCxpQkFBU0EsU0FBU1MsT0FBT0MsWUFBUCxDQUFvQlQsSUFBcEIsQ0FBbEI7QUFDQSxZQUFJSyxTQUFTLEVBQWIsRUFBaUI7QUFDZk4sbUJBQVNBLFNBQVNTLE9BQU9DLFlBQVAsQ0FBb0JSLElBQXBCLENBQWxCO0FBQ0Q7QUFDRCxZQUFJSyxTQUFTLEVBQWIsRUFBaUI7QUFDZlAsbUJBQVNBLFNBQVNTLE9BQU9DLFlBQVAsQ0FBb0JQLElBQXBCLENBQWxCO0FBQ0Q7QUFDRjtBQUNELGFBQU8sS0FBS1EsVUFBTCxDQUFnQlgsTUFBaEIsQ0FBUDtBQUNEOztBQUVEOzs7OytCQUNZWSxPLEVBQVM7QUFDbkIsVUFBSUMsU0FBUyxFQUFiO0FBQ0EsVUFBSXZDLElBQUksQ0FBUjtBQUNBLFVBQUl3QyxJQUFJLENBQVI7QUFDQSxVQUFJdkIsS0FBSyxDQUFUO0FBQ0EsVUFBSUMsS0FBSyxDQUFUO0FBQ0EsYUFBT2xCLElBQUlzQyxRQUFRL0csTUFBbkIsRUFBMkI7QUFDekJpSCxZQUFJRixRQUFRZixVQUFSLENBQW1CdkIsQ0FBbkIsQ0FBSjtBQUNBLFlBQUl3QyxJQUFJLEdBQVIsRUFBYTtBQUNYRCxvQkFBVUosT0FBT0MsWUFBUCxDQUFvQkksQ0FBcEIsQ0FBVjtBQUNBeEM7QUFDRCxTQUhELE1BR08sSUFBS3dDLElBQUksR0FBTCxJQUFjQSxJQUFJLEdBQXRCLEVBQTRCO0FBQ2pDdkIsZUFBS3FCLFFBQVFmLFVBQVIsQ0FBbUJ2QixJQUFJLENBQXZCLENBQUw7QUFDQXVDLG9CQUFVSixPQUFPQyxZQUFQLENBQXFCLENBQUNJLElBQUksRUFBTCxLQUFZLENBQWIsR0FBbUJ2QixLQUFLLEVBQTVDLENBQVY7QUFDQWpCLGVBQUssQ0FBTDtBQUNELFNBSk0sTUFJQTtBQUNMaUIsZUFBS3FCLFFBQVFmLFVBQVIsQ0FBbUJ2QixJQUFJLENBQXZCLENBQUw7QUFDQWtCLGVBQUtvQixRQUFRZixVQUFSLENBQW1CdkIsSUFBSSxDQUF2QixDQUFMO0FBQ0F1QyxvQkFBVUosT0FBT0MsWUFBUCxDQUFxQixDQUFDSSxJQUFJLEVBQUwsS0FBWSxFQUFiLEdBQW9CLENBQUN2QixLQUFLLEVBQU4sS0FBYSxDQUFqQyxHQUF1Q0MsS0FBSyxFQUFoRSxDQUFWO0FBQ0FsQixlQUFLLENBQUw7QUFDRDtBQUNGO0FBQ0QsYUFBT3VDLE1BQVA7QUFDRDs7OztFQXJoQjBCLGVBQUtFLEciLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuaW1wb3J0ICd3ZXB5LWFzeW5jLWZ1bmN0aW9uJ1xuXG4vLyBpbXBvcnQgeyBzZXRTdG9yZSB9IGZyb20gJ3dlcHktcmVkdXgnXG4vLyBpbXBvcnQgY29uZmlnU3RvcmUgZnJvbSAnLi9zdG9yZSdcblxuaW1wb3J0IEh0dHBSZXF1ZXN0IGZyb20gJy4vc2VydmljZS9IdHRwUmVxdWVzdFNlcnZlcidcbnZhciBNZDUgPSByZXF1aXJlKCcuL3NlcnZpY2UvbWQ1JylcblxuLy8gY29uc3Qgc3RvcmUgPSBjb25maWdTdG9yZSgpXG4vLyBzZXRTdG9yZShzdG9yZSlcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyB3ZXB5LmFwcCB7XG4gIGNvbmZpZyA9IHtcbiAgICBwYWdlczogW1xuICAgICAgJ3BhZ2VzL2xvZ2luJyxcbiAgICAgICdwYWdlcy9zdGFydCcsXG4gICAgICAncGFnZXMvZGV0YWlsJyxcbiAgICAgICdwYWdlcy9pbmRleCcsXG4gICAgICAncGFnZXMvY2FydCcsXG4gICAgICAncGFnZXMvc3lzdGVtJyxcbiAgICAgICdwYWdlcy9jYXRlZ29yeScsXG4gICAgICAncGFnZXMvc2VhcmNoJyxcbiAgICAgICdwYWdlcy9hZGRyZXNzJyxcbiAgICAgICdwYWdlcy9uZXdBZGQnLFxuICAgICAgJ3BhZ2VzL2VkaXRBZGQnLFxuICAgICAgJ3BhZ2VzL3BheWNhcnQnLFxuICAgICAgJ3BhZ2VzL3BheWJ1eScsXG4gICAgICAncGFnZXMvcnVsZXMnLFxuICAgICAgJ3BhZ2VzL3VzZXInLFxuICAgICAgJ3BhZ2VzL2NvbGxlY3QnLFxuICAgICAgJ3BhZ2VzL2xvZ2lzdGljYScsXG4gICAgICAncGFnZXMvb3JkZXInLFxuICAgICAgJ3BhZ2VzL29yZGVyRGV0YWlsJyxcbiAgICAgICdwYWdlcy9pbnZvaWNlJyxcbiAgICAgICdwYWdlcy9hcHBseVZpcCcsXG4gICAgICAncGFnZXMvc2VydmljZScsXG4gICAgICAncGFnZXMvbGluaycsXG4gICAgICAncGFnZXMvY3VzdG9tJ1xuICAgIF0sXG4gICAgd2luZG93OiB7XG4gICAgICBiYWNrZ3JvdW5kVGV4dFN0eWxlOiAnZGFyaycsXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjZjhmOGY4JyxcbiAgICAgIG5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3I6ICcjZWMzZDNhJyxcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICdXZUNoYXQnLFxuICAgICAgbmF2aWdhdGlvbkJhclRleHRTdHlsZTogJ3doaXRlJ1xuICAgIH0sXG4gICAgdGFiQmFyOiB7XG4gICAgICBjb2xvcjogJyMyODI2MjYnLFxuICAgICAgc2VsZWN0ZWRDb2xvcjogJyNjYjFkMWMnLFxuICAgICAgYmFja2dyb3VuZENvbG9yOiAnI2Y4ZjhmOCcsXG4gICAgICBsaXN0OiBbe1xuICAgICAgICBwYWdlUGF0aDogJ3BhZ2VzL2luZGV4JyxcbiAgICAgICAgaWNvblBhdGg6ICdpbWFnZS9pbmRleC1kZWZhdWx0LnBuZycsXG4gICAgICAgIHNlbGVjdGVkSWNvblBhdGg6ICdpbWFnZS9pbmRleC1hY3RpdmUucG5nJyxcbiAgICAgICAgdGV4dDogJ+mmlumhtSdcbiAgICAgIH0sIHtcbiAgICAgICAgcGFnZVBhdGg6ICdwYWdlcy9jYXRlZ29yeScsXG4gICAgICAgIGljb25QYXRoOiAnaW1hZ2UvY2F0ZWdvcnktZGVmYXVsdC5wbmcnLFxuICAgICAgICBzZWxlY3RlZEljb25QYXRoOiAnaW1hZ2UvY2F0ZWdvcnktYWN0aXZlLnBuZycsXG4gICAgICAgIHRleHQ6ICfliIbnsbsnXG4gICAgICB9LCB7XG4gICAgICAgIHBhZ2VQYXRoOiAncGFnZXMvY2FydCcsXG4gICAgICAgIGljb25QYXRoOiAnaW1hZ2UvY2FydC1kZWZhdWx0LnBuZycsXG4gICAgICAgIHNlbGVjdGVkSWNvblBhdGg6ICdpbWFnZS9jYXJ0LWFjdGl2ZS5wbmcnLFxuICAgICAgICB0ZXh0OiAn6LSt54mp6L2mJ1xuICAgICAgfSwge1xuICAgICAgICBwYWdlUGF0aDogJ3BhZ2VzL3VzZXInLFxuICAgICAgICBpY29uUGF0aDogJ2ltYWdlL3VzZXItZGVmYXVsdC5wbmcnLFxuICAgICAgICBzZWxlY3RlZEljb25QYXRoOiAnaW1hZ2UvdXNlci1hY3RpdmUucG5nJyxcbiAgICAgICAgdGV4dDogJ+S4quS6uuS4reW/gydcbiAgICAgIH1dXG4gICAgfVxuICB9XG5cbiAgZ2xvYmFsRGF0YSA9IHtcbiAgICB1c2VySW5mbzogbnVsbCxcbiAgICB1c2VyTGV2ZWw6IG51bGwsXG4gICAgdXNlckhhc2g6IG51bGwsXG4gICAgY29kZTogbnVsbCxcbiAgICBuaWNrTmFtZTogbnVsbCxcbiAgICB1c2VySW1hZ2U6IG51bGxcbiAgfVxuXG4gIG1pc3NUb2tlbiA9IGZhbHNlXG4gIGdldFRva2VuVGltZSA9IDBcbiAgaHR0cElkID0gW11cbiAgZXJyb3JIdHRwSWQgPSAnJ1xuXG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICBzdXBlcigpXG4gICAgdGhpcy51c2UoJ3JlcXVlc3RmaXgnKVxuICAgIHRoaXMuaW50ZXJjZXB0KCdyZXF1ZXN0Jywge1xuICAgICAgY29uZmlnIChwKSB7XG4gICAgICAgIHJldHVybiBwXG4gICAgICB9LFxuICAgICAgc3VjY2VzcyAocCkge1xuICAgICAgICBpZiAocC5zdGF0dXNDb2RlID09PSAyMDApIHtcbiAgICAgICAgICBpZiAocC5kYXRhLmVycm9yID09PSB1bmRlZmluZWQgfHwgcC5kYXRhLmVycm9yICE9PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmVycm9ySHR0cElkID0gcC5kYXRhLmh0dHBJZFxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAocC5kYXRhLmVycm9yICE9PSB1bmRlZmluZWQgJiYgcC5kYXRhLmVycm9yID09PSAtMSAmJiBwLmRhdGEubXNnID09PSAnbWlzcyB0b2tlbicpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdtaXNzIHRva2VuJylcbiAgICAgICAgICAgIHRoaXMubWlzc1Rva2VuID0gdHJ1ZVxuICAgICAgICAgICAgaWYgKHRoaXMuZ2V0VG9rZW5UaW1lIDwgMykge1xuICAgICAgICAgICAgICB0aGlzLmdldFRva2VuKHAuZGF0YS5lcnJvciwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubWlzc1Rva2VuID0gZmFsc2VcbiAgICAgICAgICAgICAgICB0aGlzLmdldFRva2VuVGltZSA9IDBcbiAgICAgICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubWlzc1Rva2VuID0gdHJ1ZVxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0VG9rZW5UaW1lICsrXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyB0aGlzLmdldFRva2VuVGltZSsrXG4gICAgICAgICAgICAvLyBpZiAodGhpcy5nZXRUb2tlblRpbWUgPCAzKSB7XG4gICAgICAgICAgICAvLyAgIHRoaXMubWlzc1Rva2VuID0gdHJ1ZVxuICAgICAgICAgICAgLy8gICB0aGlzLmdldFRva2VuKHAuZGF0YS5lcnJvcilcbiAgICAgICAgICAgIC8vIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyAgIHRoaXMuc2hvd0ZhaWwoKVxuICAgICAgICAgICAgLy8gICB0aGlzLm1pc3NUb2tlbiA9IGZhbHNlXG4gICAgICAgICAgICAvLyB9XG4gICAgICAgICAgfSBlbHNlIGlmIChwLmRhdGEuZXJyb3IgIT09IHVuZGVmaW5lZCAmJiBwLmRhdGEuZXJyb3IgPT09IC0xICYmIHAuZGF0YS5tc2cgPT09ICdtZW1iZXIgbG9ja2VkJykge1xuICAgICAgICAgICAgdGhpcy5oaWRlTG9hZGluZygpXG4gICAgICAgICAgICB3ZXB5LmNsZWFyU3RvcmFnZSgpXG4gICAgICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICAgICAgY29udGVudDogJ+W9k+WJjei0puWPt+W3suiiq+mUgeWumicsXG4gICAgICAgICAgICAgIHNob3dDYW5jZWw6IGZhbHNlLFxuICAgICAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgICAgICB3ZXB5LnJlZGlyZWN0VG8oe1xuICAgICAgICAgICAgICAgICAgICB1cmw6ICcuL2xvZ2luJ1xuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSBlbHNlIGlmIChwLmRhdGEuZXJyb3IgIT09IHVuZGVmaW5lZCAmJiBwLmRhdGEuZXJyb3IgPT09IC0xKSB7XG4gICAgICAgICAgICB0aGlzLnNob3dGYWlsKG51bGwsIHAuZGF0YS5odHRwSWQpXG4gICAgICAgICAgfSBlbHNlIGlmIChwLmRhdGEuZXJyb3IgIT09IHVuZGVmaW5lZCAmJiBwLmRhdGEuZXJyb3IgPT09IC0yKSB7XG4gICAgICAgICAgICB0aGlzLnNob3dGYWlsKHAuZGF0YS5tc2csIHAuZGF0YS5odHRwSWQpXG4gICAgICAgICAgfSBlbHNlIGlmIChwLmRhdGEuZXJyb3IgIT09IHVuZGVmaW5lZCAmJiBwLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMubWlzc1Rva2VuID0gZmFsc2VcbiAgICAgICAgICAgIHRoaXMuZ2V0VG9rZW5UaW1lID0gMFxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLm1pc3NUb2tlbiA9IGZhbHNlXG4gICAgICAgICAgdGhpcy5nZXRUb2tlblRpbWUgPSAwXG4gICAgICAgICAgdGhpcy5zaG93RmFpbCgpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBcbiAgICAgIH0sXG4gICAgICBmYWlsIChwKSB7XG4gICAgICAgIHJldHVybiBwXG4gICAgICB9LFxuICAgICAgY29tcGxldGUgKHApIHtcbiAgICAgICAgLy8g6K6w5b2VcmVxdWVzdCBpbmZvXG4gICAgICAgIGlmIChwLnN0YXR1c0NvZGUgPT09IDIwMCkge1xuICAgICAgICAgIGlmIChwLmRhdGEuaHR0cElkKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5odHRwSWQubGVuZ3RoIDwgMTApIHtcbiAgICAgICAgICAgICAgdGhpcy5odHRwSWQucHVzaChwLmRhdGEuaHR0cElkKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpcy5odHRwSWQuc2hpZnQoKVxuICAgICAgICAgICAgICB0aGlzLmh0dHBJZC5wdXNoKHAuZGF0YS5odHRwSWQpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIC8vIOWIpOaWrXRhYmJhcuWbnumAgOmhtemdolxuICBwYWdlUm9vdCA9IGZhbHNlXG5cbiAgb25MYXVuY2goKSB7fVxuXG4gIGdldExvZ2luIChjYikge1xuICAgIHdlcHkubG9naW4oe1xuICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIGNiICYmIGNiKHJlcy5jb2RlKVxuICAgICAgICAvLyDlj5HpgIFjb2RlXG4gICAgICB9LFxuICAgICAgZmFpbDogKCkgPT4ge1xuICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XG4gICAgICAgICAgdGl0bGU6ICfnvZHnu5zov57mjqXlpLHotKUnLFxuICAgICAgICAgIGljb246ICdub25lJyxcbiAgICAgICAgICBpbWFnZTogJy4uL2ltYWdlL2NhbmNlbC5wbmcnXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGdldFVzZXJJbmZvKGUsIGNvZGUsIHJlZnJlbmNlQ29kZSwgY2IsIGZhaWwpIHtcbiAgICAvLyB0aGlzLmdsb2JhbERhdGEudXNlckluZm8gPSBlLmRldGFpbC51c2VySW5mb1xuICAgIGNvbnNvbGUubG9nKGUsIGNvZGUsIHJlZnJlbmNlQ29kZSlcbiAgICB2YXIgZGF0YSA9IHtcbiAgICAgIGpzY29kZTogY29kZSxcbiAgICAgIGVuY3J5cHRlZERhdGE6IGUuZGV0YWlsLmVuY3J5cHRlZERhdGEsXG4gICAgICBpdjogZS5kZXRhaWwuaXYsXG4gICAgICByZWZlcmVuY2VJZDogcmVmcmVuY2VDb2RlXG4gICAgfVxuICAgIHRoaXMuSHR0cFJlcXVlc3QuU2VuZENvZGUoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICBpZiAocmVzLmRhdGEuZXJyb3IgIT09IHVuZGVmaW5lZCAmJiByZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICB2YXIgcGhvbmVOdW1iZXIgPSByZXMuZGF0YS5kYXRhLnBob25lXG4gICAgICAgIHdlcHkuc2V0U3RvcmFnZVN5bmMoJ3Bob25lJywgcGhvbmVOdW1iZXIpXG4gICAgICAgIGNiICYmIGNiKClcbiAgICAgICAgLy8gdmFyIGRhdGEgPSB7XG4gICAgICAgIC8vICAgcGhvbmU6IHBob25lTnVtYmVyXG4gICAgICAgIC8vIH1cbiAgICAgICAgLy8gdGhpcy5yZXF1ZXN0VG9rZW4oZGF0YSwgY2IpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmYWlsICYmIGZhaWwoKVxuICAgICAgfVxuICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgdGl0bGU6ICfnmbvlvZXlpLHotKUnLFxuICAgICAgICBjb250ZW50OiAn6K+35qOA5p+l572R57uc6L+e5o6lJyxcbiAgICAgICAgc2hvd0NhbmNlbDogZmFsc2UsXG4gICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgIGZhaWwgJiYgZmFpbCgpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0pXG4gIH1cbiAgLy8g5bey5pyJ5omL5py65Y+36I635Y+WdG9rZW5cbiAgYXN5bmMgcmVxdWVzdFRva2VuIChkYXRhLCBjYiwgZmFpbCkge1xuICAgIGF3YWl0IHRoaXMuSHR0cFJlcXVlc3QuVXNlckxvZ2luKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgaWYgKHJlcy5kYXRhLmVycm9yICE9PSB1bmRlZmluZWQgJiYgcmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgdmFyIHRva2VuID0gcmVzLmRhdGEuZGF0YS50b2tlblxuICAgICAgICB2YXIgdGltZU91dCA9IHJlcy5kYXRhLmRhdGEudGltZU91dFxuICAgICAgICB3ZXB5LnNldFN0b3JhZ2VTeW5jKCd0b2tlbicsIHRva2VuKVxuICAgICAgICB3ZXB5LnNldFN0b3JhZ2VTeW5jKCd0aW1lb3V0JywgdGltZU91dClcbiAgICAgICAgLy8g6K6+572uZ2xvYmFs55qEdXNlciBsZXZlbCDlkowgaGFzaFxuICAgICAgICB0aGlzLmdldFVzZXJMZXZlbCh0b2tlbiwgKCkgPT4ge1xuICAgICAgICAgIGNiICYmIGNiKHRva2VuKVxuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgZmFpbCAmJiBmYWlsKClcbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZhaWwgJiYgZmFpbCgpXG4gICAgICB9XG4gICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgZmFpbCAmJiBmYWlsKClcbiAgICB9KVxuICB9XG4gIC8vIOWIpOaWrXRva2Vu5piv5ZCm6L+H5pyfXG4gIHJlZnJlc2hUb2tlbiAoKSB7XG4gICAgLy8g5Yik5patdG9rZW7mmK/lkKbov4fmnJ8g5aaC5p6c5rKh6L+H5pyf55u05o6l6L+U5ZuedG9rZW7lgLxcbiAgICB2YXIgbm93VGltZSA9IE1hdGguZmxvb3IobmV3IERhdGUoKS5nZXRUaW1lKCkgLyAxMDAwKVxuICAgIHZhciB0aW1lT3V0ID0gd2VweS5nZXRTdG9yYWdlU3luYygndGltZW91dCcpXG4gICAgaWYgKG5vd1RpbWUgPiB0aW1lT3V0KSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gIH1cblxuICAvLyDov5Tlm57lvZPliY10b2tlblxuICBnZXRUb2tlbiAoZXJyb3IsIHJlZnJlbmNlLCBjYiwgZmFpbCkge1xuICAgIHZhciByZWZyZW5jZUNvZGUgPSAnJ1xuICAgIGlmIChyZWZyZW5jZSkge1xuICAgICAgcmVmcmVuY2VDb2RlID0gcmVmcmVuY2VcbiAgICB9XG4gICAgaWYgKHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3Rva2VuJykgPT09ICcnKSB7XG4gICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICB1cmw6ICcuL2xvZ2luP3JlZnJlbmNlQ29kZT0nICsgcmVmcmVuY2VDb2RlXG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoIXRoaXMucmVmcmVzaFRva2VuKCkgfHwgZXJyb3IgPT09IC0xKSB7XG4gICAgICAgIC8vIHRva2Vu6L+H5pyfIOmHjeaWsOWPkemAgeivt+axguiOt+WPluaWsOeahHRva2VuXG4gICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgIHBob25lOiB3ZXB5LmdldFN0b3JhZ2VTeW5jKCdwaG9uZScpXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZXF1ZXN0VG9rZW4oZGF0YSwgY2IsIGZhaWwpXG4gICAgICAgIHJldHVybiB3ZXB5LmdldFN0b3JhZ2VTeW5jKCd0b2tlbicpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gd2VweS5nZXRTdG9yYWdlU3luYygndG9rZW4nKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIOiOt+WPliB1c2VyIGxldmVsIOWSjCBoYXNoXG4gIGdldFVzZXJMZXZlbCAodG9rZW4sIGNiLCBmYWlsKSB7XG4gICAgdmFyIF90aGlzID0gdGhpc1xuICAgIHRoaXMuSHR0cFJlcXVlc3QuR2V0VXNlckluZm8oe3Rva2VuOiB0b2tlbn0pLnRoZW4oKHJlcykgPT4ge1xuICAgICAgaWYgKHJlcy5kYXRhLmVycm9yICE9PSB1bmRlZmluZWQgJiYgcmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgX3RoaXMuZ2xvYmFsRGF0YS51c2VyTGV2ZWwgPSByZXMuZGF0YS5kYXRhLmxldmVsXG4gICAgICAgIF90aGlzLmdsb2JhbERhdGEudXNlckhhc2ggPSByZXMuZGF0YS5kYXRhLm1lbWJlckhhc2hcbiAgICAgICAgX3RoaXMuZ2xvYmFsRGF0YS52aXBFbmQgPSByZXMuZGF0YS5kYXRhLnZpcEVuZFxuICAgICAgICBfdGhpcy5nbG9iYWxEYXRhLnJlZHVjdGlvbiA9IHJlcy5kYXRhLmRhdGEucmVkdWN0aW9uXG4gICAgICAgIF90aGlzLmdsb2JhbERhdGEubWVtYmVySWQgPSByZXMuZGF0YS5kYXRhLm1lbWJlcklkXG4gICAgICAgIF90aGlzLmdsb2JhbERhdGEuZXhwZWN0ZWRSZWR1Y3Rpb24gPSByZXMuZGF0YS5kYXRhLmV4cGVjdGVkUmVkdWN0aW9uXG4gICAgICAgIGNiICYmIGNiKClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZhaWwgJiYgZmFpbCgpXG4gICAgICB9XG4gICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgZmFpbCAmJiBmYWlsKClcbiAgICB9KVxuICB9XG4gIC8vIOWIpOaWreW9k+WJjXVzZXIgaGFzaOaYr+WQpumcgOimgemHjee9rlxuICByZXNldFVzZXJMZXZlbCAoaGFzaCwgdG9rZW4sIGNiKSB7XG4gICAgaWYgKGhhc2ggIT09IHRoaXMuZ2xvYmFsRGF0YS51c2VySGFzaCkge1xuICAgICAgdGhpcy5nZXRVc2VyTGV2ZWwodG9rZW4sIGNiKVxuICAgIH1cbiAgfVxuICAvLyDlrZjnlKjmiLdnbG9iYWzkv6Hmga9cbiAgZ2V0VXNlciAoY2IpIHtcbiAgICB3ZXB5LmdldFVzZXJJbmZvKHtcbiAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgdGhpcy5nbG9iYWxEYXRhLnVzZXJJbmZvID0gcmVzLnVzZXJJbmZvXG4gICAgICAgIGNiICYmIGNiKClcbiAgICAgIH1cbiAgICB9KVxuICB9XG4gIC8vIOWPkemAgeeUqOaIt+aYteensFxuICBzZW5kTmlja25hbWUgKHRva2VuLCBuYW1lKSB7XG4gICAgdmFyIGRhdGEgPSB7XG4gICAgICB0b2tlbjogdG9rZW4sXG4gICAgICBuaWNrTmFtZTogdGhpcy5iYXNlNjRFbmNvZGUobmFtZSlcbiAgICB9XG4gICAgY29uc29sZS5sb2coZGF0YSlcbiAgICB0aGlzLkh0dHBSZXF1ZXN0LlNldE5pY2tuYW1lKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgIH0pXG4gIH1cbiAgc2hvd0xvYWRpbmcgKCkge1xuICAgIHdlcHkuc2hvd0xvYWRpbmcoe1xuICAgICAgdGl0bGU6ICfliqDovb3kuK0nLFxuICAgICAgaWNvbjogJ2xvYWRpbmcnXG4gICAgfSlcbiAgfVxuICBoaWRlTG9hZGluZyAoKSB7XG4gICAgd2VweS5oaWRlTG9hZGluZygpXG4gIH1cbiAgc2hvd0ZhaWwgKGVycm9yLCBjb250ZW50KSB7XG4gICAgLy8gd2VweS5zaG93VG9hc3Qoe1xuICAgIC8vICAgdGl0bGU6IGVycm9yIHx8ICfliqDovb3lpLHotKUnLFxuICAgIC8vICAgaWNvbjogJ25vbmUnLFxuICAgIC8vICAgaW1hZ2U6ICcuLi9pbWFnZS9jYW5jZWwucG5nJ1xuICAgIC8vIH0pL1xuICAgIHZhciBjb250ZW50VHh0ID0gY29udGVudCB8fCAnNWI0ODEzZDE1ZWU0MSdcbiAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICB0aXRsZTogZXJyb3IgfHwgJ+ezu+e7n+W8gOWwj+W3ruS6hicsXG4gICAgICBjb250ZW50OiAn6K+35oiq5Zu+6IGU57O75a6i5pyNICcgKyBjb250ZW50VHh0LFxuICAgICAgc2hvd0NhbmNlbDogZmFsc2VcbiAgICB9KVxuICB9XG4gIHBheUZhaWwgKCkge1xuICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgIGNvbnRlbnQ6ICfmlK/ku5jlpLHotKUnLFxuICAgICAgc2hvd0NhbmNlbDogZmFsc2UsXG4gICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgIHdlcHkucmVkaXJlY3RUbyh7XG4gICAgICAgICAgICB1cmw6ICcuL29yZGVyP29yZGVyVHlwZT11bnBhaWQnXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gIH1cbiAgZGlzYWJsZUFwaSAoKSB7XG4gICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgdGl0bGU6ICfmj5DnpLonLFxuICAgICAgY29udGVudDogJ+W9k+WJjeW+ruS/oeeJiOacrOi/h+S9ju+8jOaXoOazleS9v+eUqOivpeWKn+iDve+8jOivt+WNh+e6p+WIsOacgOaWsOW+ruS/oeeJiOacrOWQjumHjeivleOAgidcbiAgICB9KVxuICB9XG4gIC8vIOaXtumXtOaIs+agvOW8j+WMllxuICBkYXRlRm9ybWF0ICh0aW1lc3RhbXAsIGZvcm1hdHMpIHtcbiAgICBmb3JtYXRzID0gZm9ybWF0cyB8fCAnWS1tLWQnXG4gICAgdmFyIHplcm8gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIGlmICh2YWx1ZSA8IDEwKSB7XG4gICAgICAgIHJldHVybiAnMCcgKyB2YWx1ZVxuICAgICAgfVxuICAgICAgcmV0dXJuIHZhbHVlXG4gICAgfVxuICAgIHZhciBteURhdGUgPSB0aW1lc3RhbXAgPyBuZXcgRGF0ZSh0aW1lc3RhbXApIDogbmV3IERhdGUoKVxuICAgIHZhciB5ZWFyID0gbXlEYXRlLmdldEZ1bGxZZWFyKClcbiAgICB2YXIgbW9udGggPSB6ZXJvKG15RGF0ZS5nZXRNb250aCgpICsgMSlcbiAgICB2YXIgZGF5ID0gemVybyhteURhdGUuZ2V0RGF0ZSgpKVxuICAgIHZhciBob3VyID0gemVybyhteURhdGUuZ2V0SG91cnMoKSlcbiAgICB2YXIgbWluaXRlID0gemVybyhteURhdGUuZ2V0TWludXRlcygpKVxuICAgIHZhciBzZWNvbmQgPSB6ZXJvKG15RGF0ZS5nZXRTZWNvbmRzKCkpXG4gICAgcmV0dXJuIGZvcm1hdHMucmVwbGFjZSgvWXxtfGR8SHxpfHMvaWcsIGZ1bmN0aW9uIChtYXRjaGVzKSB7XG4gICAgICByZXR1cm4gKHtcbiAgICAgICAgWTogeWVhcixcbiAgICAgICAgbTogbW9udGgsXG4gICAgICAgIGQ6IGRheSxcbiAgICAgICAgSDogaG91cixcbiAgICAgICAgaTogbWluaXRlLFxuICAgICAgICBzOiBzZWNvbmRcbiAgICAgIH0pW21hdGNoZXNdXG4gICAgfSlcbiAgfVxuICAvLyDov4fmu6RlbW9qaVxuICBmaWx0ZXJlbW9qaSAoc3RyKSB7XG4gICAgdmFyIHJhbmdlcyA9IFtcbiAgICAgICdcXHVkODNjW1xcdWRmMDAtXFx1ZGZmZl0nLFxuICAgICAgJ1xcdWQ4M2RbXFx1ZGMwMC1cXHVkZTRmXScsXG4gICAgICAnXFx1ZDgzZFtcXHVkZTgwLVxcdWRlZmZdJ1xuICAgIF1cbiAgICByZXR1cm4gc3RyLnJlcGxhY2UobmV3IFJlZ0V4cChyYW5nZXMuam9pbignfCcpLCAnZycpLCAnJylcbiAgfVxuICAvLyDlrqLmnI3mtojmga9cbiAgZ2V0VXNlck5hbWUgKCkge1xuICAgIGlmICghdGhpcy5nbG9iYWxEYXRhLnVzZXJJbmZvKSB7XG4gICAgICB0aGlzLmdldFVzZXIoKVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5maWx0ZXJlbW9qaSh0aGlzLmdsb2JhbERhdGEudXNlckluZm8ubmlja05hbWUpXG4gIH1cbiAgZ2V0VXNlckF2YXRhciAoKSB7XG4gICAgaWYgKCF0aGlzLmdsb2JhbERhdGEudXNlckluZm8pIHtcbiAgICAgIHRoaXMuZ2V0VXNlcigpXG4gICAgfVxuICAgIHJldHVybiB0aGlzLmdsb2JhbERhdGEudXNlckluZm8uYXZhdGFyVXJsXG4gIH1cbiAgZ2V0TWVzc2FnZSAocGFnZURldGFpbCwgdGFncykge1xuICAgIHZhciBtZXNzYWdlT2JqID0ge1xuICAgICAgJ2xldmVsJzogJycsXG4gICAgICAnY2VsbHBob25lcyc6ICcnXG4gICAgfVxuICAgIGlmICh0aGlzLmdsb2JhbERhdGEudXNlckxldmVsID09PSAwKSB7XG4gICAgICBtZXNzYWdlT2JqLmxldmVsID0gJ25vcm1hbCdcbiAgICB9IGVsc2UgaWYgKHRoaXMuZ2xvYmFsRGF0YS51c2VyTGV2ZWwgPT09IDEpIHtcbiAgICAgIG1lc3NhZ2VPYmoubGV2ZWwgPSAndmlwJ1xuICAgIH1cbiAgICBtZXNzYWdlT2JqLmNlbGxwaG9uZXMgPSBbWycnLCB3ZXB5LmdldFN0b3JhZ2VTeW5jKCdwaG9uZScpXV1cbiAgICAvLyBtZXNzYWdlT2JqLmRlc2NyaXB0aW9uID0gcGFnZURldGFpbFxuICAgIC8vIG1lc3NhZ2VPYmoudGFncyA9IHBhZ2VEZXRhaWwgKyAnLCcgKyB0YWdzXG4gICAgLy8gbWVzc2FnZU9iai5jdXN0b21fZmllbGRzID0ge1xuICAgIC8vICAgJ1RleHRGaWVsZF8xMzAxMCc6ICd0ZXN0J1xuICAgIC8vIH1cbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkobWVzc2FnZU9iailcbiAgfVxuICBnZXRCdXNpbmVzcyAodGl0bGUsIGNvbnRlbnQsIG9yZGVySWQpIHtcbiAgICB2YXIgcGhvbmUgPSAnJ1xuICAgIGlmICh3ZXB5LmdldFN0b3JhZ2VTeW5jKCdwaG9uZScpICE9PSAnJykge1xuICAgICAgcGhvbmUgPSB3ZXB5LmdldFN0b3JhZ2VTeW5jKCdwaG9uZScpXG4gICAgfVxuICAgIHZhciBub3RlT2JqID0ge1xuICAgICAgJ3RpdGxlJzogdGl0bGUsXG4gICAgICAnY3VzdG9tX2ZpZWxkcyc6IHtcbiAgICAgICAgJ1RleHRGaWVsZF8yODIyNyc6IGNvbnRlbnQsXG4gICAgICAgICdUZXh0RmllbGRfMjgyMzMnOiBvcmRlcklkLFxuICAgICAgICAnVGV4dEZpZWxkXzI5NTEzJzogcGhvbmVcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KG5vdGVPYmopXG4gIH1cblxuICAvLyBiYXNlNjQg57yW56CBXG4gIGJhc2U2NEVuY29kZSAoc3RyKSB7XG4gICAgdmFyIGMxID0gJydcbiAgICB2YXIgYzIgPSAnJ1xuICAgIHZhciBjMyA9ICcnXG4gICAgdmFyIGJhc2U2NEVuY29kZUNoYXJzID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky89J1xuICAgIHZhciBpID0gMFxuICAgIHZhciBsZW4gPSBzdHIubGVuZ3RoXG4gICAgdmFyIHN0cmluID0gJydcbiAgICB3aGlsZSAoaSA8IGxlbikge1xuICAgICAgYzEgPSBzdHIuY2hhckNvZGVBdChpKyspICYgMHhmZlxuICAgICAgaWYgKGkgPT09IGxlbikge1xuICAgICAgICBzdHJpbiArPSBiYXNlNjRFbmNvZGVDaGFycy5jaGFyQXQoYzEgPj4gMilcbiAgICAgICAgc3RyaW4gKz0gYmFzZTY0RW5jb2RlQ2hhcnMuY2hhckF0KChjMSAmIDB4MykgPDwgNClcbiAgICAgICAgc3RyaW4gKz0gJz09J1xuICAgICAgICBicmVha1xuICAgICAgfVxuICAgICAgYzIgPSBzdHIuY2hhckNvZGVBdChpKyspXG4gICAgICBpZiAoaSA9PT0gbGVuKSB7XG4gICAgICAgIHN0cmluICs9IGJhc2U2NEVuY29kZUNoYXJzLmNoYXJBdChjMSA+PiAyKVxuICAgICAgICBzdHJpbiArPSBiYXNlNjRFbmNvZGVDaGFycy5jaGFyQXQoKChjMSAmIDB4MykgPDwgNCkgfCAoKGMyICYgMHhGMCkgPj4gNCkpXG4gICAgICAgIHN0cmluICs9IGJhc2U2NEVuY29kZUNoYXJzLmNoYXJBdCgoYzIgJiAweEYpIDw8IDIpXG4gICAgICAgIHN0cmluICs9ICc9J1xuICAgICAgICBicmVha1xuICAgICAgfVxuICAgICAgYzMgPSBzdHIuY2hhckNvZGVBdChpKyspXG4gICAgICBzdHJpbiArPSBiYXNlNjRFbmNvZGVDaGFycy5jaGFyQXQoYzEgPj4gMilcbiAgICAgIHN0cmluICs9IGJhc2U2NEVuY29kZUNoYXJzLmNoYXJBdCgoKGMxICYgMHgzKSA8PCA0KSB8ICgoYzIgJiAweEYwKSA+PiA0KSlcbiAgICAgIHN0cmluICs9IGJhc2U2NEVuY29kZUNoYXJzLmNoYXJBdCgoKGMyICYgMHhGKSA8PCAyKSB8ICgoYzMgJiAweEMwKSA+PiA2KSlcbiAgICAgIHN0cmluICs9IGJhc2U2NEVuY29kZUNoYXJzLmNoYXJBdChjMyAmIDB4M0YpXG4gICAgfVxuICAgIHJldHVybiBzdHJpblxuICB9XG5cbiAgLy8gYmFzZTY0IOino+eggVxuICBiYXNlNjREZWNvZGUgKGlucHV0KSB7XG4gICAgdmFyIGJhc2U2NEVuY29kZUNoYXJzID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky89J1xuICAgIHZhciBvdXRwdXQgPSAnJ1xuICAgIHZhciBjaHIxID0gJydcbiAgICB2YXIgY2hyMiA9ICcnXG4gICAgdmFyIGNocjMgPSAnJ1xuICAgIHZhciBlbmMxID0gJydcbiAgICB2YXIgZW5jMiA9ICcnXG4gICAgdmFyIGVuYzMgPSAnJ1xuICAgIHZhciBlbmM0ID0gJydcbiAgICB2YXIgaSA9IDBcbiAgICBpbnB1dCA9IGlucHV0LnJlcGxhY2UoL1teQS1aYS16MC05Ky89XS9nLCAnJylcbiAgICB3aGlsZSAoaSA8IGlucHV0Lmxlbmd0aCkge1xuICAgICAgZW5jMSA9IGJhc2U2NEVuY29kZUNoYXJzLmluZGV4T2YoaW5wdXQuY2hhckF0KGkrKykpXG4gICAgICBlbmMyID0gYmFzZTY0RW5jb2RlQ2hhcnMuaW5kZXhPZihpbnB1dC5jaGFyQXQoaSsrKSlcbiAgICAgIGVuYzMgPSBiYXNlNjRFbmNvZGVDaGFycy5pbmRleE9mKGlucHV0LmNoYXJBdChpKyspKVxuICAgICAgZW5jNCA9IGJhc2U2NEVuY29kZUNoYXJzLmluZGV4T2YoaW5wdXQuY2hhckF0KGkrKykpXG4gICAgICBjaHIxID0gKGVuYzEgPDwgMikgfCAoZW5jMiA+PiA0KVxuICAgICAgY2hyMiA9ICgoZW5jMiAmIDE1KSA8PCA0KSB8IChlbmMzID4+IDIpXG4gICAgICBjaHIzID0gKChlbmMzICYgMykgPDwgNikgfCBlbmM0XG4gICAgICBvdXRwdXQgPSBvdXRwdXQgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKGNocjEpXG4gICAgICBpZiAoZW5jMyAhPT0gNjQpIHtcbiAgICAgICAgb3V0cHV0ID0gb3V0cHV0ICsgU3RyaW5nLmZyb21DaGFyQ29kZShjaHIyKVxuICAgICAgfVxuICAgICAgaWYgKGVuYzQgIT09IDY0KSB7XG4gICAgICAgIG91dHB1dCA9IG91dHB1dCArIFN0cmluZy5mcm9tQ2hhckNvZGUoY2hyMylcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXMudXRmOERlY29kZShvdXRwdXQpXG4gIH1cblxuICAvLyB1dGY4XG4gIHV0ZjhEZWNvZGUgKHV0ZnRleHQpIHtcbiAgICB2YXIgc3RyaW5nID0gJydcbiAgICBsZXQgaSA9IDBcbiAgICBsZXQgYyA9IDBcbiAgICBsZXQgYzEgPSAwXG4gICAgbGV0IGMyID0gMFxuICAgIHdoaWxlIChpIDwgdXRmdGV4dC5sZW5ndGgpIHtcbiAgICAgIGMgPSB1dGZ0ZXh0LmNoYXJDb2RlQXQoaSlcbiAgICAgIGlmIChjIDwgMTI4KSB7XG4gICAgICAgIHN0cmluZyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGMpXG4gICAgICAgIGkrK1xuICAgICAgfSBlbHNlIGlmICgoYyA+IDE5MSkgJiYgKGMgPCAyMjQpKSB7XG4gICAgICAgIGMxID0gdXRmdGV4dC5jaGFyQ29kZUF0KGkgKyAxKVxuICAgICAgICBzdHJpbmcgKz0gU3RyaW5nLmZyb21DaGFyQ29kZSgoKGMgJiAzMSkgPDwgNikgfCAoYzEgJiA2MykpXG4gICAgICAgIGkgKz0gMlxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYzEgPSB1dGZ0ZXh0LmNoYXJDb2RlQXQoaSArIDEpXG4gICAgICAgIGMyID0gdXRmdGV4dC5jaGFyQ29kZUF0KGkgKyAyKVxuICAgICAgICBzdHJpbmcgKz0gU3RyaW5nLmZyb21DaGFyQ29kZSgoKGMgJiAxNSkgPDwgMTIpIHwgKChjMSAmIDYzKSA8PCA2KSB8IChjMiAmIDYzKSlcbiAgICAgICAgaSArPSAzXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzdHJpbmdcbiAgfVxuICBIdHRwUmVxdWVzdCA9IG5ldyBIdHRwUmVxdWVzdCgpXG4gIE1kNSA9IE1kNS5oZXhNRDVcbn1cbiJdfQ==