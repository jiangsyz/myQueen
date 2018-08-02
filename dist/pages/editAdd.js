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

var EditAddress = function (_wepy$page) {
  _inherits(EditAddress, _wepy$page);

  function EditAddress() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, EditAddress);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = EditAddress.__proto__ || Object.getPrototypeOf(EditAddress)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '编辑地址'
    }, _this.data = {
      token: '',
      userName: '',
      userPhone: '',
      postcode: '',
      fullarea: '',
      areaFullName: '',
      id: '',
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
    }, _this.computed = {
      // multiValue () {
      //   var tempArr = []
      //   this.multiAreaId.forEach((item, index) => {
      //     tempArr.push(item[0])
      //   })
      //   return tempArr
      // }
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
      cancel: function cancel() {
        this.initTopArea();
      },
      confirm: function confirm() {
        var _this3 = this;

        this.token = this.$parent.getToken();
        console.log(this.userName, this.userPhone, this.userAdd, this.pickerValue);
        if (this.userName && this.userPhone && this.userAdd && this.pickerValue) {
          if (this.myreg.test(this.userPhone)) {
            var data = {
              token: this.token,
              name: this.userName,
              phone: this.userPhone,
              areaId: this.pickerValue,
              detail: this.userAdd,
              postCode: this.postcode,
              addressId: this.id
            };
            this.$parent.HttpRequest.EditAddress(data).then(function (res) {
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

  _createClass(EditAddress, [{
    key: 'initTopArea',
    value: function initTopArea() {
      var _this4 = this;

      this.result = this.areaFullName;
      this.topArray = [];
      this.topAreaId = [];
      this.topIndex = 0;
      this.getAreaData(0, function (res) {
        _this4.topDisable = false;
        var data = res.data.data;
        data.forEach(function (item) {
          _this4.topArray.push(item.area_name);
          _this4.topAreaId.push(item.area_id);
          _this4.topIndex = _this4.topAreaId.indexOf(parseInt(_this4.fullarea[0]));
        });
        _this4.getCity(_this4.fullarea[0], function () {
          _this4.cityIndex = _this4.cityAreaId.indexOf(parseInt(_this4.fullarea[1]));
          _this4.getArea(_this4.fullarea[1], function () {
            _this4.disIndex = _this4.disAreaId.indexOf(parseInt(_this4.fullarea[2]));
          });
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
  }, {
    key: 'onLoad',
    value: function onLoad(param) {
      console.log(param);
      if (param) {
        var address = JSON.parse(param.detail);
        this.userName = address.name;
        this.userPhone = address.phone;
        this.userAdd = address.detail;
        this.postcode = address.postCode;
        this.pickerValue = address.areaId;
        this.fullarea = address.areaFullId.split(',');
        this.areaFullName = address.areaFullName.split(',');
        this.id = address.id;
      }
      this.$apply();
    }
  }, {
    key: 'onShow',
    value: function onShow() {
      this.initTopArea();
      this.$apply();
    }
  }]);

  return EditAddress;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(EditAddress , 'pages/editAdd'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVkaXRBZGQuanMiXSwibmFtZXMiOlsiRWRpdEFkZHJlc3MiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsInRva2VuIiwidXNlck5hbWUiLCJ1c2VyUGhvbmUiLCJwb3N0Y29kZSIsImZ1bGxhcmVhIiwiYXJlYUZ1bGxOYW1lIiwiaWQiLCJteXJlZyIsInVzZXJBZGQiLCJ0b3BBcnJheSIsInRvcEluZGV4IiwidG9wQXJlYUlkIiwiY2l0eUFycmF5IiwiY2l0eUluZGV4IiwiY2l0eUFyZWFJZCIsImRpc0FycmF5IiwiZGlzSW5kZXgiLCJkaXNBcmVhSWQiLCJwaWNrZXJWYWx1ZSIsInJlc3VsdCIsInRvcERpc2FibGUiLCJjaXR5RGlzYWJsZSIsImRpc0Rpc2FibGUiLCJjb21wdXRlZCIsIm1ldGhvZHMiLCJuYW1lVGFwIiwiZSIsIiRwYXJlbnQiLCJmaWx0ZXJlbW9qaSIsImRldGFpbCIsInZhbHVlIiwicGhvbmVUYXAiLCJwb3N0VGFwIiwidXNlckFkZFRhcCIsInBpY2tUb3BBcmVhIiwiZ2V0Q2l0eSIsImdldEFyZWEiLCJwaWNrQ2l0eSIsInBpY2tEaXN0cmljdCIsImNhbmNlbCIsImluaXRUb3BBcmVhIiwiY29uZmlybSIsImdldFRva2VuIiwiY29uc29sZSIsImxvZyIsInRlc3QiLCJuYW1lIiwicGhvbmUiLCJhcmVhSWQiLCJwb3N0Q29kZSIsImFkZHJlc3NJZCIsIkh0dHBSZXF1ZXN0IiwidGhlbiIsInJlcyIsImVycm9yIiwibmF2aWdhdGVCYWNrIiwibWlzc1Rva2VuIiwic2hvd1RvYXN0IiwidGl0bGUiLCJpY29uIiwiZ2V0QXJlYURhdGEiLCJmb3JFYWNoIiwiaXRlbSIsInB1c2giLCJhcmVhX25hbWUiLCJhcmVhX2lkIiwiaW5kZXhPZiIsInBhcnNlSW50IiwiY2IiLCJwYXJlbnRJZCIsIkdldFRvcEFyZWEiLCIkYXBwbHkiLCJwYXJhbSIsImFkZHJlc3MiLCJKU09OIiwicGFyc2UiLCJhcmVhRnVsbElkIiwi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eUIsR0FBekIsQ0FBaEI7QUFDQSxhQUFLeEUsWUFBTCxHQUFvQm9FLFFBQVFwRSxZQUFSLENBQXFCd0UsS0FBckIsQ0FBMkIsR0FBM0IsQ0FBcEI7QUFDQSxhQUFLdkUsRUFBTCxHQUFVbUUsUUFBUW5FLEVBQWxCO0FBQ0Q7QUFDRCxXQUFLaUUsTUFBTDtBQUNEOzs7NkJBQ1M7QUFDUixXQUFLL0IsV0FBTDtBQUNBLFdBQUsrQixNQUFMO0FBQ0Q7Ozs7RUFwTXNDLGVBQUtPLEk7O2tCQUF6QmxGLFciLCJmaWxlIjoiZWRpdEFkZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIEVkaXRBZGRyZXNzIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn57yW6L6R5Zyw5Z2AJ1xuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgdG9rZW46ICcnLFxuICAgICAgdXNlck5hbWU6ICcnLFxuICAgICAgdXNlclBob25lOiAnJyxcbiAgICAgIHBvc3Rjb2RlOiAnJyxcbiAgICAgIGZ1bGxhcmVhOiAnJyxcbiAgICAgIGFyZWFGdWxsTmFtZTogJycsXG4gICAgICBpZDogJycsXG4gICAgICBteXJlZzogL15bMV1bMC05XXsxMH0kLyxcbiAgICAgIHVzZXJBZGQ6ICcnLFxuICAgICAgdG9wQXJyYXk6IFtdLFxuICAgICAgdG9wSW5kZXg6IDAsXG4gICAgICB0b3BBcmVhSWQ6IFtdLFxuICAgICAgY2l0eUFycmF5OiBbXSxcbiAgICAgIGNpdHlJbmRleDogMCxcbiAgICAgIGNpdHlBcmVhSWQ6IFtdLFxuICAgICAgZGlzQXJyYXk6IFtdLFxuICAgICAgZGlzSW5kZXg6IDAsXG4gICAgICBkaXNBcmVhSWQ6IFtdLFxuICAgICAgcGlja2VyVmFsdWU6ICcnLFxuICAgICAgcmVzdWx0OiBbJ+ivt+mAieaLqeecgScsICfor7fpgInmi6nluIInLCAn6K+36YCJ5oup5Yy6J10sXG4gICAgICB0b3BEaXNhYmxlOiB0cnVlLFxuICAgICAgY2l0eURpc2FibGU6IHRydWUsXG4gICAgICBkaXNEaXNhYmxlOiB0cnVlXG4gICAgfVxuICAgIGNvbXB1dGVkID0ge1xuICAgICAgLy8gbXVsdGlWYWx1ZSAoKSB7XG4gICAgICAvLyAgIHZhciB0ZW1wQXJyID0gW11cbiAgICAgIC8vICAgdGhpcy5tdWx0aUFyZWFJZC5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgLy8gICAgIHRlbXBBcnIucHVzaChpdGVtWzBdKVxuICAgICAgLy8gICB9KVxuICAgICAgLy8gICByZXR1cm4gdGVtcEFyclxuICAgICAgLy8gfVxuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgbmFtZVRhcCAoZSkge1xuICAgICAgICB0aGlzLnVzZXJOYW1lID0gdGhpcy4kcGFyZW50LmZpbHRlcmVtb2ppKGUuZGV0YWlsLnZhbHVlKVxuICAgICAgICByZXR1cm4gdGhpcy51c2VyTmFtZVxuICAgICAgfSxcbiAgICAgIHBob25lVGFwIChlKSB7XG4gICAgICAgIHRoaXMudXNlclBob25lID0gZS5kZXRhaWwudmFsdWVcbiAgICAgICAgcmV0dXJuIHRoaXMudXNlclBob25lXG4gICAgICB9LFxuICAgICAgcG9zdFRhcCAoZSkge1xuICAgICAgICB0aGlzLnBvc3Rjb2RlID0gZS5kZXRhaWwudmFsdWVcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zdGNvZGVcbiAgICAgIH0sXG4gICAgICB1c2VyQWRkVGFwIChlKSB7XG4gICAgICAgIHRoaXMudXNlckFkZCA9IHRoaXMuJHBhcmVudC5maWx0ZXJlbW9qaShlLmRldGFpbC52YWx1ZSlcbiAgICAgIH0sXG4gICAgICBwaWNrVG9wQXJlYSAoZSkge1xuICAgICAgICB0aGlzLnRvcEluZGV4ID0gZS5kZXRhaWwudmFsdWVcbiAgICAgICAgdGhpcy5yZXN1bHRbMF0gPSB0aGlzLnRvcEFycmF5W3RoaXMudG9wSW5kZXhdXG4gICAgICAgIHRoaXMucmVzdWx0WzFdID0gJ+ivt+mAieaLqeW4gidcbiAgICAgICAgdGhpcy5yZXN1bHRbMl0gPSAn6K+36YCJ5oup5Yy6J1xuICAgICAgICB0aGlzLmdldENpdHkodGhpcy50b3BBcmVhSWRbdGhpcy50b3BJbmRleF0sICgpID0+IHtcbiAgICAgICAgICB0aGlzLmdldEFyZWEodGhpcy5jaXR5QXJlYUlkWzBdKVxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIHBpY2tDaXR5IChlKSB7XG4gICAgICAgIHRoaXMuY2l0eUluZGV4ID0gZS5kZXRhaWwudmFsdWVcbiAgICAgICAgdGhpcy5yZXN1bHRbMV0gPSB0aGlzLmNpdHlBcnJheVt0aGlzLmNpdHlJbmRleF1cbiAgICAgICAgdGhpcy5yZXN1bHRbMl0gPSAn6K+36YCJ5oup5Yy6J1xuICAgICAgICB0aGlzLmdldEFyZWEodGhpcy5jaXR5QXJlYUlkW3RoaXMuY2l0eUluZGV4XSlcbiAgICAgIH0sXG4gICAgICBwaWNrRGlzdHJpY3QgKGUpIHtcbiAgICAgICAgdGhpcy5kaXNJbmRleCA9IGUuZGV0YWlsLnZhbHVlXG4gICAgICAgIHRoaXMucmVzdWx0WzJdID0gdGhpcy5kaXNBcnJheVt0aGlzLmRpc0luZGV4XVxuICAgICAgICB0aGlzLnBpY2tlclZhbHVlID0gdGhpcy5kaXNBcmVhSWRbdGhpcy5kaXNJbmRleF1cbiAgICAgIH0sXG4gICAgICBjYW5jZWwgKCkge1xuICAgICAgICB0aGlzLmluaXRUb3BBcmVhKClcbiAgICAgIH0sXG4gICAgICBjb25maXJtICgpIHtcbiAgICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMudXNlck5hbWUsIHRoaXMudXNlclBob25lLCB0aGlzLnVzZXJBZGQsIHRoaXMucGlja2VyVmFsdWUpXG4gICAgICAgIGlmICh0aGlzLnVzZXJOYW1lICYmIHRoaXMudXNlclBob25lICYmIHRoaXMudXNlckFkZCAmJiB0aGlzLnBpY2tlclZhbHVlKSB7XG4gICAgICAgICAgaWYgKHRoaXMubXlyZWcudGVzdCh0aGlzLnVzZXJQaG9uZSkpIHtcbiAgICAgICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgICAgICAgbmFtZTogdGhpcy51c2VyTmFtZSxcbiAgICAgICAgICAgICAgcGhvbmU6IHRoaXMudXNlclBob25lLFxuICAgICAgICAgICAgICBhcmVhSWQ6IHRoaXMucGlja2VyVmFsdWUsXG4gICAgICAgICAgICAgIGRldGFpbDogdGhpcy51c2VyQWRkLFxuICAgICAgICAgICAgICBwb3N0Q29kZTogdGhpcy5wb3N0Y29kZSxcbiAgICAgICAgICAgICAgYWRkcmVzc0lkOiB0aGlzLmlkXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuRWRpdEFkZHJlc3MoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZUJhY2soKVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLiRwYXJlbnQubWlzc1Rva2VuKSB7XG4gICAgICAgICAgICAgICAgICAvLyB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKHJlcy5kYXRhLmVycm9yKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgICB0aXRsZTogJ+ivt+i+k+WFpeato+ehrueahOaJi+acuuWPtycsXG4gICAgICAgICAgICAgIGljb246ICdub25lJ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgdGl0bGU6ICfor7floavlhpnlrozmlbTmlLbotKfkv6Hmga8nLFxuICAgICAgICAgICAgaWNvbjogJ25vbmUnXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpbml0VG9wQXJlYSAoKSB7XG4gICAgICB0aGlzLnJlc3VsdCA9IHRoaXMuYXJlYUZ1bGxOYW1lXG4gICAgICB0aGlzLnRvcEFycmF5ID0gW11cbiAgICAgIHRoaXMudG9wQXJlYUlkID0gW11cbiAgICAgIHRoaXMudG9wSW5kZXggPSAwXG4gICAgICB0aGlzLmdldEFyZWFEYXRhKDAsIChyZXMpID0+IHtcbiAgICAgICAgdGhpcy50b3BEaXNhYmxlID0gZmFsc2VcbiAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgIGRhdGEuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgIHRoaXMudG9wQXJyYXkucHVzaChpdGVtLmFyZWFfbmFtZSlcbiAgICAgICAgICB0aGlzLnRvcEFyZWFJZC5wdXNoKGl0ZW0uYXJlYV9pZClcbiAgICAgICAgICB0aGlzLnRvcEluZGV4ID0gdGhpcy50b3BBcmVhSWQuaW5kZXhPZihwYXJzZUludCh0aGlzLmZ1bGxhcmVhWzBdKSlcbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy5nZXRDaXR5KHRoaXMuZnVsbGFyZWFbMF0sICgpID0+IHtcbiAgICAgICAgICB0aGlzLmNpdHlJbmRleCA9IHRoaXMuY2l0eUFyZWFJZC5pbmRleE9mKHBhcnNlSW50KHRoaXMuZnVsbGFyZWFbMV0pKVxuICAgICAgICAgIHRoaXMuZ2V0QXJlYSh0aGlzLmZ1bGxhcmVhWzFdLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmRpc0luZGV4ID0gdGhpcy5kaXNBcmVhSWQuaW5kZXhPZihwYXJzZUludCh0aGlzLmZ1bGxhcmVhWzJdKSlcbiAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9XG4gICAgZ2V0QXJlYURhdGEgKGlkLCBjYikge1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHBhcmVudElkOiBpZFxuICAgICAgfVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkdldFRvcEFyZWEoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgY2IgJiYgY2IocmVzKVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIH0pXG4gICAgfVxuICAgIGdldENpdHkgKGlkLCBjYikge1xuICAgICAgdGhpcy5jaXR5RGlzYWJsZSA9IHRydWVcbiAgICAgIHRoaXMuY2l0eUFycmF5ID0gW11cbiAgICAgIHRoaXMuY2l0eUFyZWFJZCA9IFtdXG4gICAgICB0aGlzLmNpdHlJbmRleCA9IDBcbiAgICAgIHRoaXMuZ2V0QXJlYURhdGEoaWQsIChyZXMpID0+IHtcbiAgICAgICAgdGhpcy5jaXR5RGlzYWJsZSA9IGZhbHNlXG4gICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICBkYXRhLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICB0aGlzLmNpdHlBcnJheS5wdXNoKGl0ZW0uYXJlYV9uYW1lKVxuICAgICAgICAgIHRoaXMuY2l0eUFyZWFJZC5wdXNoKGl0ZW0uYXJlYV9pZClcbiAgICAgICAgfSlcbiAgICAgICAgY2IgJiYgY2IoKVxuICAgICAgfSlcbiAgICB9XG4gICAgZ2V0QXJlYSAoaWQsIGNiKSB7XG4gICAgICB0aGlzLmRpc0Rpc2FibGUgPSB0cnVlXG4gICAgICB0aGlzLmRpc0FycmF5ID0gW11cbiAgICAgIHRoaXMuZGlzQXJlYUlkID0gW11cbiAgICAgIHRoaXMuZGlzSW5kZXggPSAwXG4gICAgICB0aGlzLmdldEFyZWFEYXRhKGlkLCAocmVzKSA9PiB7XG4gICAgICAgIHRoaXMuZGlzRGlzYWJsZSA9IGZhbHNlXG4gICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICBkYXRhLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICB0aGlzLmRpc0FycmF5LnB1c2goaXRlbS5hcmVhX25hbWUpXG4gICAgICAgICAgdGhpcy5kaXNBcmVhSWQucHVzaChpdGVtLmFyZWFfaWQpXG4gICAgICAgIH0pXG4gICAgICAgIGNiICYmIGNiKClcbiAgICAgIH0pXG4gICAgfVxuICAgIG9uTG9hZCAocGFyYW0pIHtcbiAgICAgIGNvbnNvbGUubG9nKHBhcmFtKVxuICAgICAgaWYgKHBhcmFtKSB7XG4gICAgICAgIHZhciBhZGRyZXNzID0gSlNPTi5wYXJzZShwYXJhbS5kZXRhaWwpXG4gICAgICAgIHRoaXMudXNlck5hbWUgPSBhZGRyZXNzLm5hbWVcbiAgICAgICAgdGhpcy51c2VyUGhvbmUgPSBhZGRyZXNzLnBob25lXG4gICAgICAgIHRoaXMudXNlckFkZCA9IGFkZHJlc3MuZGV0YWlsXG4gICAgICAgIHRoaXMucG9zdGNvZGUgPSBhZGRyZXNzLnBvc3RDb2RlXG4gICAgICAgIHRoaXMucGlja2VyVmFsdWUgPSBhZGRyZXNzLmFyZWFJZFxuICAgICAgICB0aGlzLmZ1bGxhcmVhID0gYWRkcmVzcy5hcmVhRnVsbElkLnNwbGl0KCcsJylcbiAgICAgICAgdGhpcy5hcmVhRnVsbE5hbWUgPSBhZGRyZXNzLmFyZWFGdWxsTmFtZS5zcGxpdCgnLCcpXG4gICAgICAgIHRoaXMuaWQgPSBhZGRyZXNzLmlkXG4gICAgICB9XG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICAgIG9uU2hvdyAoKSB7XG4gICAgICB0aGlzLmluaXRUb3BBcmVhKClcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gIH1cbiJdfQ==