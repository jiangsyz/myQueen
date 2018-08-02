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

var NewAddress = function (_wepy$page) {
  _inherits(NewAddress, _wepy$page);

  function NewAddress() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, NewAddress);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = NewAddress.__proto__ || Object.getPrototypeOf(NewAddress)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '新增地址'
    }, _this.data = {
      token: '',
      userName: '',
      userPhone: '',
      postcode: '',
      myreg: /^[1][0-9]{10}$/,
      userAdd: '',
      topArray: [],
      topIndex: 0,
      topAreaId: [],
      cityArray: [],
      cityIndex: 0,
      cityAreaId: [],
      disArray: [],
      disIndex: 0,
      disAreaId: [],
      pickerValue: '',
      result: ['请选择省', '请选择市', '请选择区'],
      topDisable: true,
      cityDisable: true,
      disDisable: true
    }, _this.methods = {
      nameTap: function nameTap(e) {
        this.userName = this.$parent.filteremoji(e.detail.value);
        return this.userName;
      },
      phoneTap: function phoneTap(e) {
        this.userPhone = e.detail.value;
        return this.userPhone;
      },
      postTap: function postTap(e) {
        this.postcode = e.detail.value;
        return this.postcode;
      },
      userAddTap: function userAddTap(e) {
        this.userAdd = this.$parent.filteremoji(e.detail.value);
      },
      pickTopArea: function pickTopArea(e) {
        var _this2 = this;

        this.topIndex = e.detail.value;
        this.result[0] = this.topArray[this.topIndex];
        this.result[1] = '请选择市';
        this.result[2] = '请选择区';
        this.getCity(this.topAreaId[this.topIndex], function () {
          _this2.getArea(_this2.cityAreaId[0]);
        });
      },
      pickCity: function pickCity(e) {
        this.cityIndex = e.detail.value;
        this.result[1] = this.cityArray[this.cityIndex];
        this.result[2] = '请选择区';
        this.getArea(this.cityAreaId[this.cityIndex]);
      },
      pickDistrict: function pickDistrict(e) {
        this.disIndex = e.detail.value;
        this.result[2] = this.disArray[this.disIndex];
        this.pickerValue = this.disAreaId[this.disIndex];
      },

      // topArea (e) {
      //   this.multiIndex = e.detail.value
      //   this.multiArray.forEach((item, index) => {
      //     this.result[index] = item[this.multiIndex[index]]
      //   })
      //   // var temp = []
      //   // temp = this.multiValue.map((item, index) => {
      //   //   return this.multiAreaId[index][this.multiIndex[index]]
      //   // })
      //   // this.multiValue = temp
      //   // console.log(this.multiValue)
      // },
      // childArea (e) {
      //   this.multiIndex[e.detail.column] = e.detail.value
      //   switch (e.detail.column) {
      //     case 0:
      //       // 选择省
      //       this.getCity(this.multiAreaId[0][e.detail.value], () => {
      //         this.getArea(this.multiAreaId[1][0])
      //       })
      //       break
      //     case 1:
      //       // 选择市
      //       console.log(this.multiAreaId[1][e.detail.value])
      //       this.getArea(this.multiAreaId[1][e.detail.value])
      //       break
      //     case 2:
      //       this.multiIndex[2] = e.detail.value
      //       this.multiValue = this.multiAreaId[2][e.detail.value]
      //       break
      //   }
      // },
      cancel: function cancel() {
        this.initTopArea();
      },
      confirm: function confirm() {
        var _this3 = this;

        this.token = this.$parent.getToken();
        if (this.userName && this.userPhone && this.userAdd && this.pickerValue) {
          if (this.myreg.test(this.userPhone)) {
            var data = {
              token: this.token,
              name: this.userName,
              phone: this.userPhone,
              areaId: this.pickerValue,
              detail: this.userAdd,
              postCode: this.postcode
            };
            this.$parent.HttpRequest.AddAddress(data).then(function (res) {
              console.log(res);
              if (res.data.error === 0) {
                _wepy2.default.navigateBack();
              } else {
                if (_this3.$parent.missToken) {
                  // this.token = this.$parent.getToken(res.data.error)
                }
              }
            });
          } else {
            _wepy2.default.showToast({
              title: '请输入正确的手机号',
              icon: 'none'
            });
          }
        } else {
          _wepy2.default.showToast({
            title: '请填写完整收货信息',
            icon: 'none'
          });
        }
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(NewAddress, [{
    key: 'initTopArea',

    // initTopArea () {
    //   this.multiArray[0] = []
    //   this.multiAreaId[0] = []
    //   this.getAreaData(0, (res) => {
    //     var data = res.data.data
    //     data.forEach((item) => {
    //       this.multiArray[0].push(item.area_name)
    //       this.multiAreaId[0].push(item.area_id)
    //       this.multiIndex = [0, 0, 0]
    //     })
    //     this.getCity(this.multiAreaId[0][0], () => {
    //       this.getArea(this.multiAreaId[1][0])
    //     })
    //   })
    // }
    value: function initTopArea() {
      var _this4 = this;

      this.topArray = [];
      this.topAreaId = [];
      this.topIndex = 0;
      this.getAreaData(0, function (res) {
        _this4.topDisable = false;
        var data = res.data.data;
        data.forEach(function (item) {
          _this4.topArray.push(item.area_name);
          _this4.topAreaId.push(item.area_id);
        });
        _this4.getCity(_this4.topAreaId[0], function () {
          _this4.getArea(_this4.cityAreaId[0], function () {});
        });
      });
    }
  }, {
    key: 'getAreaData',
    value: function getAreaData(id, cb) {
      var _this5 = this;

      var data = {
        parentId: id
      };
      this.$parent.HttpRequest.GetTopArea(data).then(function (res) {
        console.log(res);
        if (res.data.error === 0) {
          cb && cb(res);
        }
        _this5.$apply();
      });
    }
  }, {
    key: 'getCity',
    value: function getCity(id, cb) {
      var _this6 = this;

      this.cityDisable = true;
      this.cityArray = [];
      this.cityAreaId = [];
      this.cityIndex = 0;
      this.getAreaData(id, function (res) {
        _this6.cityDisable = false;
        var data = res.data.data;
        data.forEach(function (item) {
          _this6.cityArray.push(item.area_name);
          _this6.cityAreaId.push(item.area_id);
        });
        cb && cb();
      });
    }
  }, {
    key: 'getArea',
    value: function getArea(id, cb) {
      var _this7 = this;

      this.disDisable = true;
      this.disArray = [];
      this.disAreaId = [];
      this.disIndex = 0;
      this.getAreaData(id, function (res) {
        _this7.disDisable = false;
        var data = res.data.data;
        data.forEach(function (item) {
          _this7.disArray.push(item.area_name);
          _this7.disAreaId.push(item.area_id);
        });
        cb && cb();
      });
    }
    // getCity (id, cb) {
    //   this.multiArray[1] = []
    //   this.multiAreaId[1] = []
    //   this.getAreaData(id, (res) => {
    //     var data = res.data.data
    //     data.forEach((item) => {
    //       this.multiArray[1].push(item.area_name)
    //       this.multiAreaId[1].push(item.area_id)
    //     })
    //     this.multiIndex[1] = 0
    //     cb && cb()
    //   })
    // }
    // getArea (id) {
    //   this.multiArray[2] = []
    //   this.multiAreaId[2] = []
    //   this.getAreaData(id, (res) => {
    //     var data = res.data.data
    //     data.forEach((item) => {
    //       this.multiArray[2].push(item.area_name)
    //       this.multiAreaId[2].push(item.area_id)
    //     })
    //     this.multiIndex[2] = 0
    //     this.multiValue = this.multiAreaId[2][0]
    //   })
    // }

  }, {
    key: 'onLoad',
    value: function onLoad() {
      this.initTopArea();
      this.$apply();
    }
  }]);

  return NewAddress;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(NewAddress , 'pages/newAdd'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5ld0FkZC5qcyJdLCJuYW1lcyI6WyJOZXdBZGRyZXNzIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJ0b2tlbiIsInVzZXJOYW1lIiwidXNlclBob25lIiwicG9zdGNvZGUiLCJteXJlZyIsInVzZXJBZGQiLCJ0b3BBcnJheSIsInRvcEluZGV4IiwidG9wQXJlYUlkIiwiY2l0eUFycmF5IiwiY2l0eUluZGV4IiwiY2l0eUFyZWFJZCIsImRpc0FycmF5IiwiZGlzSW5kZXgiLCJkaXNBcmVhSWQiLCJwaWNrZXJWYWx1ZSIsInJlc3VsdCIsInRvcERpc2FibGUiLCJjaXR5RGlzYWJsZSIsImRpc0Rpc2FibGUiLCJtZXRob2RzIiwibmFtZVRhcCIsImUiLCIkcGFyZW50IiwiZmlsdGVyZW1vamkiLCJkZXRhaWwiLCJ2YWx1ZSIsInBob25lVGFwIiwicG9zdFRhcCIsInVzZXJBZGRUYXAiLCJwaWNrVG9wQXJlYSIsImdldENpdHkiLCJnZXRBcmVhIiwicGlja0NpdHkiLCJwaWNrRGlzdHJpY3QiLCJjYW5jZWwiLCJpbml0VG9wQXJlYSIsImNvbmZpcm0iLCJnZXRUb2tlbiIsInRlc3QiLCJuYW1lIiwicGhvbmUiLCJhcmVhSWQiLCJwb3N0Q29kZSIsIkh0dHBSZXF1ZXN0IiwiQWRkQWRkcmVzcyIsInRoZW4iLCJyZXMiLCJjb25zb2xlIiwibG9nIiwiZXJyb3IiLCJuYXZpZ2F0ZUJhY2siLCJtaXNzVG9rZW4iLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJnZXRBcmVhRGF0YSIsImZvckVhY2giLCJpdGVtIiwicHVzaCIsImFyZWFfbmFtZSIsImFyZWFfaWQiLCJpZCIsImNiIiwicGFyZW50SWQiLCJHZXRUb3BBcmVhIiwiJGFwcGx5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7Ozs7Ozs7OztJQUVxQkEsVTs7Ozs7Ozs7Ozs7Ozs7OExBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFH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QUFLRSxTQUF4QjtBQUNBLGlCQUFLOUMsU0FBTCxDQUFlNkMsSUFBZixDQUFvQkQsS0FBS0csT0FBekI7QUFDRCxTQUhEO0FBSUFFLGNBQU1BLElBQU47QUFDRCxPQVJEO0FBU0Q7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OzZCQUNVO0FBQ1IsV0FBSzNCLFdBQUw7QUFDQSxXQUFLOEIsTUFBTDtBQUNEOzs7O0VBNU9xQyxlQUFLQyxJOztrQkFBeEJ2RSxVIiwiZmlsZSI6Im5ld0FkZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIE5ld0FkZHJlc3MgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmlrDlop7lnLDlnYAnXG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICB0b2tlbjogJycsXG4gICAgICB1c2VyTmFtZTogJycsXG4gICAgICB1c2VyUGhvbmU6ICcnLFxuICAgICAgcG9zdGNvZGU6ICcnLFxuICAgICAgbXlyZWc6IC9eWzFdWzAtOV17MTB9JC8sXG4gICAgICB1c2VyQWRkOiAnJyxcbiAgICAgIHRvcEFycmF5OiBbXSxcbiAgICAgIHRvcEluZGV4OiAwLFxuICAgICAgdG9wQXJlYUlkOiBbXSxcbiAgICAgIGNpdHlBcnJheTogW10sXG4gICAgICBjaXR5SW5kZXg6IDAsXG4gICAgICBjaXR5QXJlYUlkOiBbXSxcbiAgICAgIGRpc0FycmF5OiBbXSxcbiAgICAgIGRpc0luZGV4OiAwLFxuICAgICAgZGlzQXJlYUlkOiBbXSxcbiAgICAgIHBpY2tlclZhbHVlOiAnJyxcbiAgICAgIHJlc3VsdDogWyfor7fpgInmi6nnnIEnLCAn6K+36YCJ5oup5biCJywgJ+ivt+mAieaLqeWMuiddLFxuICAgICAgdG9wRGlzYWJsZTogdHJ1ZSxcbiAgICAgIGNpdHlEaXNhYmxlOiB0cnVlLFxuICAgICAgZGlzRGlzYWJsZTogdHJ1ZVxuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgbmFtZVRhcCAoZSkge1xuICAgICAgICB0aGlzLnVzZXJOYW1lID0gdGhpcy4kcGFyZW50LmZpbHRlcmVtb2ppKGUuZGV0YWlsLnZhbHVlKVxuICAgICAgICByZXR1cm4gdGhpcy51c2VyTmFtZVxuICAgICAgfSxcbiAgICAgIHBob25lVGFwIChlKSB7XG4gICAgICAgIHRoaXMudXNlclBob25lID0gZS5kZXRhaWwudmFsdWVcbiAgICAgICAgcmV0dXJuIHRoaXMudXNlclBob25lXG4gICAgICB9LFxuICAgICAgcG9zdFRhcCAoZSkge1xuICAgICAgICB0aGlzLnBvc3Rjb2RlID0gZS5kZXRhaWwudmFsdWVcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zdGNvZGVcbiAgICAgIH0sXG4gICAgICB1c2VyQWRkVGFwIChlKSB7XG4gICAgICAgIHRoaXMudXNlckFkZCA9IHRoaXMuJHBhcmVudC5maWx0ZXJlbW9qaShlLmRldGFpbC52YWx1ZSlcbiAgICAgIH0sXG4gICAgICBwaWNrVG9wQXJlYSAoZSkge1xuICAgICAgICB0aGlzLnRvcEluZGV4ID0gZS5kZXRhaWwudmFsdWVcbiAgICAgICAgdGhpcy5yZXN1bHRbMF0gPSB0aGlzLnRvcEFycmF5W3RoaXMudG9wSW5kZXhdXG4gICAgICAgIHRoaXMucmVzdWx0WzFdID0gJ+ivt+mAieaLqeW4gidcbiAgICAgICAgdGhpcy5yZXN1bHRbMl0gPSAn6K+36YCJ5oup5Yy6J1xuICAgICAgICB0aGlzLmdldENpdHkodGhpcy50b3BBcmVhSWRbdGhpcy50b3BJbmRleF0sICgpID0+IHtcbiAgICAgICAgICB0aGlzLmdldEFyZWEodGhpcy5jaXR5QXJlYUlkWzBdKVxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIHBpY2tDaXR5IChlKSB7XG4gICAgICAgIHRoaXMuY2l0eUluZGV4ID0gZS5kZXRhaWwudmFsdWVcbiAgICAgICAgdGhpcy5yZXN1bHRbMV0gPSB0aGlzLmNpdHlBcnJheVt0aGlzLmNpdHlJbmRleF1cbiAgICAgICAgdGhpcy5yZXN1bHRbMl0gPSAn6K+36YCJ5oup5Yy6J1xuICAgICAgICB0aGlzLmdldEFyZWEodGhpcy5jaXR5QXJlYUlkW3RoaXMuY2l0eUluZGV4XSlcbiAgICAgIH0sXG4gICAgICBwaWNrRGlzdHJpY3QgKGUpIHtcbiAgICAgICAgdGhpcy5kaXNJbmRleCA9IGUuZGV0YWlsLnZhbHVlXG4gICAgICAgIHRoaXMucmVzdWx0WzJdID0gdGhpcy5kaXNBcnJheVt0aGlzLmRpc0luZGV4XVxuICAgICAgICB0aGlzLnBpY2tlclZhbHVlID0gdGhpcy5kaXNBcmVhSWRbdGhpcy5kaXNJbmRleF1cbiAgICAgIH0sXG4gICAgICAvLyB0b3BBcmVhIChlKSB7XG4gICAgICAvLyAgIHRoaXMubXVsdGlJbmRleCA9IGUuZGV0YWlsLnZhbHVlXG4gICAgICAvLyAgIHRoaXMubXVsdGlBcnJheS5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgLy8gICAgIHRoaXMucmVzdWx0W2luZGV4XSA9IGl0ZW1bdGhpcy5tdWx0aUluZGV4W2luZGV4XV1cbiAgICAgIC8vICAgfSlcbiAgICAgIC8vICAgLy8gdmFyIHRlbXAgPSBbXVxuICAgICAgLy8gICAvLyB0ZW1wID0gdGhpcy5tdWx0aVZhbHVlLm1hcCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgIC8vICAgLy8gICByZXR1cm4gdGhpcy5tdWx0aUFyZWFJZFtpbmRleF1bdGhpcy5tdWx0aUluZGV4W2luZGV4XV1cbiAgICAgIC8vICAgLy8gfSlcbiAgICAgIC8vICAgLy8gdGhpcy5tdWx0aVZhbHVlID0gdGVtcFxuICAgICAgLy8gICAvLyBjb25zb2xlLmxvZyh0aGlzLm11bHRpVmFsdWUpXG4gICAgICAvLyB9LFxuICAgICAgLy8gY2hpbGRBcmVhIChlKSB7XG4gICAgICAvLyAgIHRoaXMubXVsdGlJbmRleFtlLmRldGFpbC5jb2x1bW5dID0gZS5kZXRhaWwudmFsdWVcbiAgICAgIC8vICAgc3dpdGNoIChlLmRldGFpbC5jb2x1bW4pIHtcbiAgICAgIC8vICAgICBjYXNlIDA6XG4gICAgICAvLyAgICAgICAvLyDpgInmi6nnnIFcbiAgICAgIC8vICAgICAgIHRoaXMuZ2V0Q2l0eSh0aGlzLm11bHRpQXJlYUlkWzBdW2UuZGV0YWlsLnZhbHVlXSwgKCkgPT4ge1xuICAgICAgLy8gICAgICAgICB0aGlzLmdldEFyZWEodGhpcy5tdWx0aUFyZWFJZFsxXVswXSlcbiAgICAgIC8vICAgICAgIH0pXG4gICAgICAvLyAgICAgICBicmVha1xuICAgICAgLy8gICAgIGNhc2UgMTpcbiAgICAgIC8vICAgICAgIC8vIOmAieaLqeW4glxuICAgICAgLy8gICAgICAgY29uc29sZS5sb2codGhpcy5tdWx0aUFyZWFJZFsxXVtlLmRldGFpbC52YWx1ZV0pXG4gICAgICAvLyAgICAgICB0aGlzLmdldEFyZWEodGhpcy5tdWx0aUFyZWFJZFsxXVtlLmRldGFpbC52YWx1ZV0pXG4gICAgICAvLyAgICAgICBicmVha1xuICAgICAgLy8gICAgIGNhc2UgMjpcbiAgICAgIC8vICAgICAgIHRoaXMubXVsdGlJbmRleFsyXSA9IGUuZGV0YWlsLnZhbHVlXG4gICAgICAvLyAgICAgICB0aGlzLm11bHRpVmFsdWUgPSB0aGlzLm11bHRpQXJlYUlkWzJdW2UuZGV0YWlsLnZhbHVlXVxuICAgICAgLy8gICAgICAgYnJlYWtcbiAgICAgIC8vICAgfVxuICAgICAgLy8gfSxcbiAgICAgIGNhbmNlbCAoKSB7XG4gICAgICAgIHRoaXMuaW5pdFRvcEFyZWEoKVxuICAgICAgfSxcbiAgICAgIGNvbmZpcm0gKCkge1xuICAgICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgICAgaWYgKHRoaXMudXNlck5hbWUgJiYgdGhpcy51c2VyUGhvbmUgJiYgdGhpcy51c2VyQWRkICYmIHRoaXMucGlja2VyVmFsdWUpIHtcbiAgICAgICAgICBpZiAodGhpcy5teXJlZy50ZXN0KHRoaXMudXNlclBob25lKSkge1xuICAgICAgICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICAgICAgICBuYW1lOiB0aGlzLnVzZXJOYW1lLFxuICAgICAgICAgICAgICBwaG9uZTogdGhpcy51c2VyUGhvbmUsXG4gICAgICAgICAgICAgIGFyZWFJZDogdGhpcy5waWNrZXJWYWx1ZSxcbiAgICAgICAgICAgICAgZGV0YWlsOiB0aGlzLnVzZXJBZGQsXG4gICAgICAgICAgICAgIHBvc3RDb2RlOiB0aGlzLnBvc3Rjb2RlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuQWRkQWRkcmVzcyhkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlQmFjaygpXG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuJHBhcmVudC5taXNzVG9rZW4pIHtcbiAgICAgICAgICAgICAgICAgIC8vIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4ocmVzLmRhdGEuZXJyb3IpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XG4gICAgICAgICAgICAgIHRpdGxlOiAn6K+36L6T5YWl5q2j56Gu55qE5omL5py65Y+3JyxcbiAgICAgICAgICAgICAgaWNvbjogJ25vbmUnXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XG4gICAgICAgICAgICB0aXRsZTogJ+ivt+Whq+WGmeWujOaVtOaUtui0p+S/oeaBrycsXG4gICAgICAgICAgICBpY29uOiAnbm9uZSdcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIC8vIGluaXRUb3BBcmVhICgpIHtcbiAgICAvLyAgIHRoaXMubXVsdGlBcnJheVswXSA9IFtdXG4gICAgLy8gICB0aGlzLm11bHRpQXJlYUlkWzBdID0gW11cbiAgICAvLyAgIHRoaXMuZ2V0QXJlYURhdGEoMCwgKHJlcykgPT4ge1xuICAgIC8vICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAvLyAgICAgZGF0YS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgLy8gICAgICAgdGhpcy5tdWx0aUFycmF5WzBdLnB1c2goaXRlbS5hcmVhX25hbWUpXG4gICAgLy8gICAgICAgdGhpcy5tdWx0aUFyZWFJZFswXS5wdXNoKGl0ZW0uYXJlYV9pZClcbiAgICAvLyAgICAgICB0aGlzLm11bHRpSW5kZXggPSBbMCwgMCwgMF1cbiAgICAvLyAgICAgfSlcbiAgICAvLyAgICAgdGhpcy5nZXRDaXR5KHRoaXMubXVsdGlBcmVhSWRbMF1bMF0sICgpID0+IHtcbiAgICAvLyAgICAgICB0aGlzLmdldEFyZWEodGhpcy5tdWx0aUFyZWFJZFsxXVswXSlcbiAgICAvLyAgICAgfSlcbiAgICAvLyAgIH0pXG4gICAgLy8gfVxuICAgIGluaXRUb3BBcmVhICgpIHtcbiAgICAgIHRoaXMudG9wQXJyYXkgPSBbXVxuICAgICAgdGhpcy50b3BBcmVhSWQgPSBbXVxuICAgICAgdGhpcy50b3BJbmRleCA9IDBcbiAgICAgIHRoaXMuZ2V0QXJlYURhdGEoMCwgKHJlcykgPT4ge1xuICAgICAgICB0aGlzLnRvcERpc2FibGUgPSBmYWxzZVxuICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgZGF0YS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgdGhpcy50b3BBcnJheS5wdXNoKGl0ZW0uYXJlYV9uYW1lKVxuICAgICAgICAgIHRoaXMudG9wQXJlYUlkLnB1c2goaXRlbS5hcmVhX2lkKVxuICAgICAgICB9KVxuICAgICAgICB0aGlzLmdldENpdHkodGhpcy50b3BBcmVhSWRbMF0sICgpID0+IHtcbiAgICAgICAgICB0aGlzLmdldEFyZWEodGhpcy5jaXR5QXJlYUlkWzBdLCAoKSA9PiB7XG4gICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfVxuICAgIGdldEFyZWFEYXRhIChpZCwgY2IpIHtcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICBwYXJlbnRJZDogaWRcbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5HZXRUb3BBcmVhKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIGNiICYmIGNiKHJlcylcbiAgICAgICAgfVxuICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB9KVxuICAgIH1cbiAgICBnZXRDaXR5IChpZCwgY2IpIHtcbiAgICAgIHRoaXMuY2l0eURpc2FibGUgPSB0cnVlXG4gICAgICB0aGlzLmNpdHlBcnJheSA9IFtdXG4gICAgICB0aGlzLmNpdHlBcmVhSWQgPSBbXVxuICAgICAgdGhpcy5jaXR5SW5kZXggPSAwXG4gICAgICB0aGlzLmdldEFyZWFEYXRhKGlkLCAocmVzKSA9PiB7XG4gICAgICAgIHRoaXMuY2l0eURpc2FibGUgPSBmYWxzZVxuICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgZGF0YS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgdGhpcy5jaXR5QXJyYXkucHVzaChpdGVtLmFyZWFfbmFtZSlcbiAgICAgICAgICB0aGlzLmNpdHlBcmVhSWQucHVzaChpdGVtLmFyZWFfaWQpXG4gICAgICAgIH0pXG4gICAgICAgIGNiICYmIGNiKClcbiAgICAgIH0pXG4gICAgfVxuICAgIGdldEFyZWEgKGlkLCBjYikge1xuICAgICAgdGhpcy5kaXNEaXNhYmxlID0gdHJ1ZVxuICAgICAgdGhpcy5kaXNBcnJheSA9IFtdXG4gICAgICB0aGlzLmRpc0FyZWFJZCA9IFtdXG4gICAgICB0aGlzLmRpc0luZGV4ID0gMFxuICAgICAgdGhpcy5nZXRBcmVhRGF0YShpZCwgKHJlcykgPT4ge1xuICAgICAgICB0aGlzLmRpc0Rpc2FibGUgPSBmYWxzZVxuICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgZGF0YS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgdGhpcy5kaXNBcnJheS5wdXNoKGl0ZW0uYXJlYV9uYW1lKVxuICAgICAgICAgIHRoaXMuZGlzQXJlYUlkLnB1c2goaXRlbS5hcmVhX2lkKVxuICAgICAgICB9KVxuICAgICAgICBjYiAmJiBjYigpXG4gICAgICB9KVxuICAgIH1cbiAgICAvLyBnZXRDaXR5IChpZCwgY2IpIHtcbiAgICAvLyAgIHRoaXMubXVsdGlBcnJheVsxXSA9IFtdXG4gICAgLy8gICB0aGlzLm11bHRpQXJlYUlkWzFdID0gW11cbiAgICAvLyAgIHRoaXMuZ2V0QXJlYURhdGEoaWQsIChyZXMpID0+IHtcbiAgICAvLyAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgLy8gICAgIGRhdGEuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgIC8vICAgICAgIHRoaXMubXVsdGlBcnJheVsxXS5wdXNoKGl0ZW0uYXJlYV9uYW1lKVxuICAgIC8vICAgICAgIHRoaXMubXVsdGlBcmVhSWRbMV0ucHVzaChpdGVtLmFyZWFfaWQpXG4gICAgLy8gICAgIH0pXG4gICAgLy8gICAgIHRoaXMubXVsdGlJbmRleFsxXSA9IDBcbiAgICAvLyAgICAgY2IgJiYgY2IoKVxuICAgIC8vICAgfSlcbiAgICAvLyB9XG4gICAgLy8gZ2V0QXJlYSAoaWQpIHtcbiAgICAvLyAgIHRoaXMubXVsdGlBcnJheVsyXSA9IFtdXG4gICAgLy8gICB0aGlzLm11bHRpQXJlYUlkWzJdID0gW11cbiAgICAvLyAgIHRoaXMuZ2V0QXJlYURhdGEoaWQsIChyZXMpID0+IHtcbiAgICAvLyAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgLy8gICAgIGRhdGEuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgIC8vICAgICAgIHRoaXMubXVsdGlBcnJheVsyXS5wdXNoKGl0ZW0uYXJlYV9uYW1lKVxuICAgIC8vICAgICAgIHRoaXMubXVsdGlBcmVhSWRbMl0ucHVzaChpdGVtLmFyZWFfaWQpXG4gICAgLy8gICAgIH0pXG4gICAgLy8gICAgIHRoaXMubXVsdGlJbmRleFsyXSA9IDBcbiAgICAvLyAgICAgdGhpcy5tdWx0aVZhbHVlID0gdGhpcy5tdWx0aUFyZWFJZFsyXVswXVxuICAgIC8vICAgfSlcbiAgICAvLyB9XG4gICAgb25Mb2FkICgpIHtcbiAgICAgIHRoaXMuaW5pdFRvcEFyZWEoKVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgfVxuIl19