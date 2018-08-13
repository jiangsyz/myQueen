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
        this.userPhone = e.detail.value.replace(/\s+/g, '');
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVkaXRBZGQuanMiXSwibmFtZXMiOlsiRWRpdEFkZHJlc3MiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsInRva2VuIiwidXNlck5hbWUiLCJ1c2VyUGhvbmUiLCJwb3N0Y29kZSIsImZ1bGxhcmVhIiwiYXJlYUZ1bGxOYW1lIiwiaWQiLCJteXJlZyIsInVzZXJBZGQiLCJ0b3BBcnJheSIsInRvcEluZGV4IiwidG9wQXJlYUlkIiwiY2l0eUFycmF5IiwiY2l0eUluZGV4IiwiY2l0eUFyZWFJZCIsImRpc0FycmF5IiwiZGlzSW5kZXgiLCJkaXNBcmVhSWQiLCJwaWNrZXJWYWx1ZSIsInJlc3VsdCIsInRvcERpc2FibGUiLCJjaXR5RGlzYWJsZSIsImRpc0Rpc2FibGUiLCJjb21wdXRlZCIsIm1ldGhvZHMiLCJuYW1lVGFwIiwiZSIsIiRwYXJlbnQiLCJmaWx0ZXJlbW9qaSIsImRldGFpbCIsInZhbHVlIiwicGhvbmVUYXAiLCJyZXBsYWNlIiwicG9zdFRhcCIsInVzZXJBZGRUYXAiLCJwaWNrVG9wQXJlYSIsImdldENpdHkiLCJnZXRBcmVhIiwicGlja0NpdHkiLCJwaWNrRGlzdHJpY3QiLCJjYW5jZWwiLCJpbml0VG9wQXJlYSIsImNvbmZpcm0iLCJnZXRUb2tlbiIsImNvbnNvbGUiLCJsb2ciLCJ0ZXN0IiwibmFtZSIsInBob25lIiwiYXJlYUlkIiwicG9zdENvZGUiLCJhZGRyZXNzSWQiLCJIdHRwUmVxdWVzdCIsInRoZW4iLCJyZXMiLCJlcnJvciIsIm5hdmlnYXRlQmFjayIsIm1pc3NUb2tlbiIsInNob3dUb2FzdCIsInRpdGxlIiwiaWNvbiIsImdldEFyZWFEYXRhIiwiZm9yRWFjaCIsIml0ZW0iLCJwdXNoIiwiYXJlYV9uYW1lIiwiYXJlYV9pZCIsImluZGV4T2YiLCJwYXJzZUludCIsImNiIiwicGFyZW50SWQiLCJHZXRUb3BBcmVhIiwiJGFwcGx5IiwicGFyYW0iLCJhZGRyZXNzIiwiSlNPTiIsInBhcnNlIiwiYXJl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QUNBLGFBQUs3QyxRQUFMLEdBQWdCc0UsUUFBUUcsVUFBUixDQUFtQkMsS0FBbkIsQ0FBeUIsR0FBekIsQ0FBaEI7QUFDQSxhQUFLekUsWUFBTCxHQUFvQnFFLFFBQVFyRSxZQUFSLENBQXFCeUUsS0FBckIsQ0FBMkIsR0FBM0IsQ0FBcEI7QUFDQSxhQUFLeEUsRUFBTCxHQUFVb0UsUUFBUXBFLEVBQWxCO0FBQ0Q7QUFDRCxXQUFLa0UsTUFBTDtBQUNEOzs7NkJBQ1M7QUFDUixXQUFLL0IsV0FBTDtBQUNBLFdBQUsrQixNQUFMO0FBQ0Q7Ozs7RUFwTXNDLGVBQUtPLEk7O2tCQUF6Qm5GLFciLCJmaWxlIjoiZWRpdEFkZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIEVkaXRBZGRyZXNzIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn57yW6L6R5Zyw5Z2AJ1xuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgdG9rZW46ICcnLFxuICAgICAgdXNlck5hbWU6ICcnLFxuICAgICAgdXNlclBob25lOiAnJyxcbiAgICAgIHBvc3Rjb2RlOiAnJyxcbiAgICAgIGZ1bGxhcmVhOiAnJyxcbiAgICAgIGFyZWFGdWxsTmFtZTogJycsXG4gICAgICBpZDogJycsXG4gICAgICBteXJlZzogL15bMV1bMC05XXsxMH0kLyxcbiAgICAgIHVzZXJBZGQ6ICcnLFxuICAgICAgdG9wQXJyYXk6IFtdLFxuICAgICAgdG9wSW5kZXg6IDAsXG4gICAgICB0b3BBcmVhSWQ6IFtdLFxuICAgICAgY2l0eUFycmF5OiBbXSxcbiAgICAgIGNpdHlJbmRleDogMCxcbiAgICAgIGNpdHlBcmVhSWQ6IFtdLFxuICAgICAgZGlzQXJyYXk6IFtdLFxuICAgICAgZGlzSW5kZXg6IDAsXG4gICAgICBkaXNBcmVhSWQ6IFtdLFxuICAgICAgcGlja2VyVmFsdWU6ICcnLFxuICAgICAgcmVzdWx0OiBbJ+ivt+mAieaLqeecgScsICfor7fpgInmi6nluIInLCAn6K+36YCJ5oup5Yy6J10sXG4gICAgICB0b3BEaXNhYmxlOiB0cnVlLFxuICAgICAgY2l0eURpc2FibGU6IHRydWUsXG4gICAgICBkaXNEaXNhYmxlOiB0cnVlXG4gICAgfVxuICAgIGNvbXB1dGVkID0ge1xuICAgICAgLy8gbXVsdGlWYWx1ZSAoKSB7XG4gICAgICAvLyAgIHZhciB0ZW1wQXJyID0gW11cbiAgICAgIC8vICAgdGhpcy5tdWx0aUFyZWFJZC5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgLy8gICAgIHRlbXBBcnIucHVzaChpdGVtWzBdKVxuICAgICAgLy8gICB9KVxuICAgICAgLy8gICByZXR1cm4gdGVtcEFyclxuICAgICAgLy8gfVxuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgbmFtZVRhcCAoZSkge1xuICAgICAgICB0aGlzLnVzZXJOYW1lID0gdGhpcy4kcGFyZW50LmZpbHRlcmVtb2ppKGUuZGV0YWlsLnZhbHVlKVxuICAgICAgICByZXR1cm4gdGhpcy51c2VyTmFtZVxuICAgICAgfSxcbiAgICAgIHBob25lVGFwIChlKSB7XG4gICAgICAgIHRoaXMudXNlclBob25lID0gZS5kZXRhaWwudmFsdWUucmVwbGFjZSgvXFxzKy9nLCAnJylcbiAgICAgICAgcmV0dXJuIHRoaXMudXNlclBob25lXG4gICAgICB9LFxuICAgICAgcG9zdFRhcCAoZSkge1xuICAgICAgICB0aGlzLnBvc3Rjb2RlID0gZS5kZXRhaWwudmFsdWVcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zdGNvZGVcbiAgICAgIH0sXG4gICAgICB1c2VyQWRkVGFwIChlKSB7XG4gICAgICAgIHRoaXMudXNlckFkZCA9IHRoaXMuJHBhcmVudC5maWx0ZXJlbW9qaShlLmRldGFpbC52YWx1ZSlcbiAgICAgIH0sXG4gICAgICBwaWNrVG9wQXJlYSAoZSkge1xuICAgICAgICB0aGlzLnRvcEluZGV4ID0gZS5kZXRhaWwudmFsdWVcbiAgICAgICAgdGhpcy5yZXN1bHRbMF0gPSB0aGlzLnRvcEFycmF5W3RoaXMudG9wSW5kZXhdXG4gICAgICAgIHRoaXMucmVzdWx0WzFdID0gJ+ivt+mAieaLqeW4gidcbiAgICAgICAgdGhpcy5yZXN1bHRbMl0gPSAn6K+36YCJ5oup5Yy6J1xuICAgICAgICB0aGlzLmdldENpdHkodGhpcy50b3BBcmVhSWRbdGhpcy50b3BJbmRleF0sICgpID0+IHtcbiAgICAgICAgICB0aGlzLmdldEFyZWEodGhpcy5jaXR5QXJlYUlkWzBdKVxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIHBpY2tDaXR5IChlKSB7XG4gICAgICAgIHRoaXMuY2l0eUluZGV4ID0gZS5kZXRhaWwudmFsdWVcbiAgICAgICAgdGhpcy5yZXN1bHRbMV0gPSB0aGlzLmNpdHlBcnJheVt0aGlzLmNpdHlJbmRleF1cbiAgICAgICAgdGhpcy5yZXN1bHRbMl0gPSAn6K+36YCJ5oup5Yy6J1xuICAgICAgICB0aGlzLmdldEFyZWEodGhpcy5jaXR5QXJlYUlkW3RoaXMuY2l0eUluZGV4XSlcbiAgICAgIH0sXG4gICAgICBwaWNrRGlzdHJpY3QgKGUpIHtcbiAgICAgICAgdGhpcy5kaXNJbmRleCA9IGUuZGV0YWlsLnZhbHVlXG4gICAgICAgIHRoaXMucmVzdWx0WzJdID0gdGhpcy5kaXNBcnJheVt0aGlzLmRpc0luZGV4XVxuICAgICAgICB0aGlzLnBpY2tlclZhbHVlID0gdGhpcy5kaXNBcmVhSWRbdGhpcy5kaXNJbmRleF1cbiAgICAgIH0sXG4gICAgICBjYW5jZWwgKCkge1xuICAgICAgICB0aGlzLmluaXRUb3BBcmVhKClcbiAgICAgIH0sXG4gICAgICBjb25maXJtICgpIHtcbiAgICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMudXNlck5hbWUsIHRoaXMudXNlclBob25lLCB0aGlzLnVzZXJBZGQsIHRoaXMucGlja2VyVmFsdWUpXG4gICAgICAgIGlmICh0aGlzLnVzZXJOYW1lICYmIHRoaXMudXNlclBob25lICYmIHRoaXMudXNlckFkZCAmJiB0aGlzLnBpY2tlclZhbHVlKSB7XG4gICAgICAgICAgaWYgKHRoaXMubXlyZWcudGVzdCh0aGlzLnVzZXJQaG9uZSkpIHtcbiAgICAgICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgICAgICAgbmFtZTogdGhpcy51c2VyTmFtZSxcbiAgICAgICAgICAgICAgcGhvbmU6IHRoaXMudXNlclBob25lLFxuICAgICAgICAgICAgICBhcmVhSWQ6IHRoaXMucGlja2VyVmFsdWUsXG4gICAgICAgICAgICAgIGRldGFpbDogdGhpcy51c2VyQWRkLFxuICAgICAgICAgICAgICBwb3N0Q29kZTogdGhpcy5wb3N0Y29kZSxcbiAgICAgICAgICAgICAgYWRkcmVzc0lkOiB0aGlzLmlkXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuRWRpdEFkZHJlc3MoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZUJhY2soKVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLiRwYXJlbnQubWlzc1Rva2VuKSB7XG4gICAgICAgICAgICAgICAgICAvLyB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKHJlcy5kYXRhLmVycm9yKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgICB0aXRsZTogJ+ivt+i+k+WFpeato+ehrueahOaJi+acuuWPtycsXG4gICAgICAgICAgICAgIGljb246ICdub25lJ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgdGl0bGU6ICfor7floavlhpnlrozmlbTmlLbotKfkv6Hmga8nLFxuICAgICAgICAgICAgaWNvbjogJ25vbmUnXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpbml0VG9wQXJlYSAoKSB7XG4gICAgICB0aGlzLnJlc3VsdCA9IHRoaXMuYXJlYUZ1bGxOYW1lXG4gICAgICB0aGlzLnRvcEFycmF5ID0gW11cbiAgICAgIHRoaXMudG9wQXJlYUlkID0gW11cbiAgICAgIHRoaXMudG9wSW5kZXggPSAwXG4gICAgICB0aGlzLmdldEFyZWFEYXRhKDAsIChyZXMpID0+IHtcbiAgICAgICAgdGhpcy50b3BEaXNhYmxlID0gZmFsc2VcbiAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgIGRhdGEuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgIHRoaXMudG9wQXJyYXkucHVzaChpdGVtLmFyZWFfbmFtZSlcbiAgICAgICAgICB0aGlzLnRvcEFyZWFJZC5wdXNoKGl0ZW0uYXJlYV9pZClcbiAgICAgICAgICB0aGlzLnRvcEluZGV4ID0gdGhpcy50b3BBcmVhSWQuaW5kZXhPZihwYXJzZUludCh0aGlzLmZ1bGxhcmVhWzBdKSlcbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy5nZXRDaXR5KHRoaXMuZnVsbGFyZWFbMF0sICgpID0+IHtcbiAgICAgICAgICB0aGlzLmNpdHlJbmRleCA9IHRoaXMuY2l0eUFyZWFJZC5pbmRleE9mKHBhcnNlSW50KHRoaXMuZnVsbGFyZWFbMV0pKVxuICAgICAgICAgIHRoaXMuZ2V0QXJlYSh0aGlzLmZ1bGxhcmVhWzFdLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmRpc0luZGV4ID0gdGhpcy5kaXNBcmVhSWQuaW5kZXhPZihwYXJzZUludCh0aGlzLmZ1bGxhcmVhWzJdKSlcbiAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9XG4gICAgZ2V0QXJlYURhdGEgKGlkLCBjYikge1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHBhcmVudElkOiBpZFxuICAgICAgfVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkdldFRvcEFyZWEoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgY2IgJiYgY2IocmVzKVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIH0pXG4gICAgfVxuICAgIGdldENpdHkgKGlkLCBjYikge1xuICAgICAgdGhpcy5jaXR5RGlzYWJsZSA9IHRydWVcbiAgICAgIHRoaXMuY2l0eUFycmF5ID0gW11cbiAgICAgIHRoaXMuY2l0eUFyZWFJZCA9IFtdXG4gICAgICB0aGlzLmNpdHlJbmRleCA9IDBcbiAgICAgIHRoaXMuZ2V0QXJlYURhdGEoaWQsIChyZXMpID0+IHtcbiAgICAgICAgdGhpcy5jaXR5RGlzYWJsZSA9IGZhbHNlXG4gICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICBkYXRhLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICB0aGlzLmNpdHlBcnJheS5wdXNoKGl0ZW0uYXJlYV9uYW1lKVxuICAgICAgICAgIHRoaXMuY2l0eUFyZWFJZC5wdXNoKGl0ZW0uYXJlYV9pZClcbiAgICAgICAgfSlcbiAgICAgICAgY2IgJiYgY2IoKVxuICAgICAgfSlcbiAgICB9XG4gICAgZ2V0QXJlYSAoaWQsIGNiKSB7XG4gICAgICB0aGlzLmRpc0Rpc2FibGUgPSB0cnVlXG4gICAgICB0aGlzLmRpc0FycmF5ID0gW11cbiAgICAgIHRoaXMuZGlzQXJlYUlkID0gW11cbiAgICAgIHRoaXMuZGlzSW5kZXggPSAwXG4gICAgICB0aGlzLmdldEFyZWFEYXRhKGlkLCAocmVzKSA9PiB7XG4gICAgICAgIHRoaXMuZGlzRGlzYWJsZSA9IGZhbHNlXG4gICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICBkYXRhLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICB0aGlzLmRpc0FycmF5LnB1c2goaXRlbS5hcmVhX25hbWUpXG4gICAgICAgICAgdGhpcy5kaXNBcmVhSWQucHVzaChpdGVtLmFyZWFfaWQpXG4gICAgICAgIH0pXG4gICAgICAgIGNiICYmIGNiKClcbiAgICAgIH0pXG4gICAgfVxuICAgIG9uTG9hZCAocGFyYW0pIHtcbiAgICAgIGNvbnNvbGUubG9nKHBhcmFtKVxuICAgICAgaWYgKHBhcmFtKSB7XG4gICAgICAgIHZhciBhZGRyZXNzID0gSlNPTi5wYXJzZShwYXJhbS5kZXRhaWwpXG4gICAgICAgIHRoaXMudXNlck5hbWUgPSBhZGRyZXNzLm5hbWVcbiAgICAgICAgdGhpcy51c2VyUGhvbmUgPSBhZGRyZXNzLnBob25lXG4gICAgICAgIHRoaXMudXNlckFkZCA9IGFkZHJlc3MuZGV0YWlsXG4gICAgICAgIHRoaXMucG9zdGNvZGUgPSBhZGRyZXNzLnBvc3RDb2RlXG4gICAgICAgIHRoaXMucGlja2VyVmFsdWUgPSBhZGRyZXNzLmFyZWFJZFxuICAgICAgICB0aGlzLmZ1bGxhcmVhID0gYWRkcmVzcy5hcmVhRnVsbElkLnNwbGl0KCcsJylcbiAgICAgICAgdGhpcy5hcmVhRnVsbE5hbWUgPSBhZGRyZXNzLmFyZWFGdWxsTmFtZS5zcGxpdCgnLCcpXG4gICAgICAgIHRoaXMuaWQgPSBhZGRyZXNzLmlkXG4gICAgICB9XG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICAgIG9uU2hvdyAoKSB7XG4gICAgICB0aGlzLmluaXRUb3BBcmVhKClcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gIH1cbiJdfQ==