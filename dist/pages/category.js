'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _goods = require('./../components/goods.js');

var _goods2 = _interopRequireDefault(_goods);

var _searchbar = require('./../components/searchbar.js');

var _searchbar2 = _interopRequireDefault(_searchbar);

var _defect = require('./../components/defect.js');

var _defect2 = _interopRequireDefault(_defect);

var _reachdown = require('./../components/reachdown.js');

var _reachdown2 = _interopRequireDefault(_reachdown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Category = function (_wepy$page) {
  _inherits(Category, _wepy$page);

  function Category() {
    var _ref;

    var _temp, _this2, _ret;

    _classCallCheck(this, Category);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_ref = Category.__proto__ || Object.getPrototypeOf(Category)).call.apply(_ref, [this].concat(args))), _this2), _this2.config = {
      navigationBarTitleText: '商品分类',
      enablePullDownRefresh: true
    }, _this2.$repeat = {}, _this2.$props = { "Categoods": { "v-bind:goodsItem.sync": "goods", "xmlns:v-on": "" }, "defectImage": { "type": "1" }, "searchbar": { "xmlns:v-bind": "", "v-bind:pagefrom.sync": "pageTile" }, "isDown": {} }, _this2.$events = { "Categoods": { "v-on:goodsTap": "goDetail" } }, _this2.components = {
      Categoods: _goods2.default,
      defectImage: _defect2.default,
      searchbar: _searchbar2.default,
      isDown: _reachdown2.default
    }, _this2.data = {
      token: '',
      categoryImg: ['http://p33mnuvro.bkt.clouddn.com/flimg_niupai.png', 'http://p33mnuvro.bkt.clouddn.com/flimg_niurou.png', 'http://p33mnuvro.bkt.clouddn.com/flimg_haixian.png', 'http://p33mnuvro.bkt.clouddn.com/flimg_jiulei.png', 'http://p33mnuvro.bkt.clouddn.com/flimg_qita.png'],
      categoryTab: [],
      childCategory: [{
        name: '',
        id: ''
      }],
      goods: [],
      pageTile: 'category',
      currentTab: 0,
      currentItem: 0,
      isNull: false,
      showMore: '',
      pageSize: 5,
      pageNum: 1,
      sourceId: '',
      totalPageNum: '',
      isDown: false,
      isLoading: false
    }, _this2.methods = {
      changeTab: function changeTab(index, id) {
        this.currentTab = index;
        this.currentItem = 0;
        this.sourceId = id;
        this.isNull = false;
        this.pageNum = 1;
        this.getSpu(this.sourceId);
      },
      reqCategory: function reqCategory(index, id) {
        this.currentItem = index;
        this.sourceId = id;
        this.isNull = false;
        this.pageNum = 1;
        this.getSpu(this.sourceId);
      },
      goDetail: function goDetail(id) {
        _wepy2.default.navigateTo({
          url: './detail?id=' + id
        });
      }
    }, _temp), _possibleConstructorReturn(_this2, _ret);
  }

  _createClass(Category, [{
    key: 'getShowMore',
    value: function getShowMore() {
      var _this3 = this;

      this.categoryTab.forEach(function (item, index) {
        if (item.category.length > 5) {
          _this3.showMore = index;
        }
      });
    }
  }, {
    key: 'onReachBottom',
    value: function onReachBottom() {
      if (this.pageNum < this.totalPageNum) {
        // 显示下一页数据
        this.pageNum++;
        this.getSpu(this.sourceId);
      } else {
        if (this.goods.length !== 0) {
          this.isDown = true;
        }
      }
    }
  }, {
    key: 'getTopCate',
    value: function getTopCate() {
      this.$parent.showLoading();
      this.token = this.$parent.getToken();
      var _this = this;
      var data = {
        token: this.token
      };
      this.$parent.HttpRequest.GetTopCategory(data).then(function (res) {
        console.log(res);
        _this.$parent.hideLoading();
        if (res.data.error === 0) {
          _this.isLoading = true;
          var data = res.data.data;
          data.forEach(function (item) {
            var obj = {};
            obj.title = item.name;
            obj.id = item.id;
            obj.child = _this.getChildCate(item.id);
            _this.categoryTab.push(obj);
          });
          _this.sourceId = _this.categoryTab[0].id;
          _this.getSpu(_this.sourceId);
        } else {
          _this.isNull = true;
          if (_this.$parent.missToken) {
            _this.getTopCate();
          }
        }
        _this.$apply();
      }).catch(function () {
        _this.$parent.hideLoading();
        _this.isNull = true;
        // _this.$parent.showFail()
      });
    }
  }, {
    key: 'getChildCate',
    value: function getChildCate(sourceId) {
      this.token = this.$parent.getToken();
      var _this = this;
      var data = {
        token: this.token,
        categoryId: sourceId,
        includSelf: 1
      };
      var child = [{
        name: '全部',
        id: sourceId
      }];
      this.$parent.HttpRequest.GetChildCategory(data).then(function (res) {
        if (res.data.error === 0) {
          var data = res.data.data;
          data.forEach(function (item) {
            var obj = {};
            obj.name = item.name;
            obj.id = item.id;
            child.push(obj);
          });
        } else {
          _this.isNull = true;
          if (_this.$parent.missToken) {
            // _this.token = this.$parent.getToken(res.data.error)
          }
        }
        _this.$apply();
      }).catch(function () {
        _this.isNull = true;
      });
      return child;
    }
  }, {
    key: 'getSpu',
    value: function getSpu(sourceId, cb) {
      var _this4 = this;

      this.token = this.$parent.getToken();
      this.$parent.showLoading();
      this.isDown = false;
      var _this = this;
      var data = {
        categoryId: sourceId,
        token: this.token,
        pageSize: this.pageSize,
        pageNum: this.pageNum
      };
      this.$parent.HttpRequest.GetSpuHttp(data).then(function (res) {
        console.log(res);
        if (_this.pageNum === 1) {
          _this.goods = [];
        }
        if (res.data.error === 0) {
          _this.$parent.hideLoading();
          _this.totalPageNum = res.data.data.totalPageNum;
          var data = res.data.data.spus;
          if (data.length === 0) {
            _this.isNull = true;
          } else {
            _this.isNull = false;
            if (res.data.data.totalCount <= _this4.pageSize) {
              _this.isDown = true;
            } else {
              _this.isDown = false;
            }
          }
          data.forEach(function (item) {
            var good = {};
            good.path = item.cover;
            good.title = item.title;
            good.price = item.memberPrice;
            good.oldprice = item.price;
            good.detail = item.viceTitle;
            good.reduction = item.reduction;
            good.id = item.sourceId;
            good.descript = item.desc;
            _this.goods.push(good);
          });
          cb && cb();
        } else {
          _this.isNull = true;
          if (_this.$parent.missToken) {
            _this.getSpu(sourceId, cb);
          }
        }
        _this.$apply();
      }).catch(function () {
        _this.isNull = true;
        _this.$parent.showFail();
      });
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {
      this.getTopCate();
      this.getShowMore();
      this.$apply();
    }
  }, {
    key: 'onShow',
    value: function onShow() {
      if (this.$parent.pageRoot) {
        this.$parent.pageRoot = false;
      } else {
        // this.currentTab = 0
        // this.currentItem = 0
        // if (this.categoryTab.length !== 0) {
        //   this.getSpu(this.categoryTab[0].id)
        // }
      }
    }
  }, {
    key: 'onPullDownRefresh',
    value: function onPullDownRefresh() {
      this.currentTab = 0;
      this.currentItem = 0;
      if (this.categoryTab.length > 0) {
        this.getSpu(this.categoryTab[0].id, function () {
          _wepy2.default.stopPullDownRefresh();
        });
      }
    }
  }]);

  return Category;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Category , 'pages/category'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhdGVnb3J5LmpzIl0sIm5hbWVzIjpbIkNhdGVnb3J5IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImVuYWJsZVB1bGxEb3duUmVmcmVzaCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsIkNhdGVnb29kcyIsImRlZmVjdEltYWdlIiwic2VhcmNoYmFyIiwiaXNEb3duIiwiZGF0YSIsInRva2VuIiwiY2F0ZWdvcnlJbWciLCJjYXRlZ29yeVRhYiIsImNoaWxkQ2F0ZWdvcnkiLCJuYW1lIiwiaWQiLCJnb29kcyIsInBhZ2VUaWxlIiwiY3VycmVudFRhYiIsImN1cnJlbnRJdGVtIiwiaXNOdWxsIiwic2hvd01vcmUiLCJwYWdlU2l6ZSIsInBhZ2VOdW0iLCJzb3VyY2VJZCIsInRvdGFsUGFnZU51bSIsImlzTG9hZGluZyIsIm1ldGhvZHMiLCJjaGFuZ2VUYWIiLCJpbmRleCIsImdldFNwdSIsInJlcUNhdGVnb3J5IiwiZ29EZXRhaWwiLCJuYXZpZ2F0ZVRvIiwidXJsIiwiZm9yRWFjaCIsIml0ZW0iLCJjYXRlZ29yeSIsImxlbmd0aCIsIiRwYXJlbnQiLCJzaG93TG9hZGluZyIsImdldFRva2VuIiwiX3RoaXMiLCJIdHRwUmVxdWVzdCIsIkdldFRvcENhdGVnb3J5IiwidGhlbiIsInJlcyIsImNvbnNvbGUiLCJsb2ciLCJoaWRlTG9hZGluZyIsImVycm9yIiwib2JqIiwidGl0bGUiLCJjaGlsZCIsImdldENoaWxkQ2F0ZSIsInB1c2giLCJtaXNzVG9rZW4iLCJnZXRUb3BDYXRlIiwiJGFwcGx5IiwiY2F0Y2giLCJjYXRlZ29yeUlkIiwiaW5jbHVkU2VsZiIsIkdldENoaWxkQ2F0ZWdvcnkiLCJjYiIsIkdldFNwdUh0dHAiLCJzcHVzIiwidG90YWxDb3VudCIsImdvb2QiLCJwYXRoIiwiY292ZXIiLCJwcmljZSIsIm1lbWJlclByaWNlIiwib2xkcHJpY2UiLCJkZXRhaWwiLCJ2aWNlVGl0bGUiLCJyZWR1Y3Rpb24iLCJkZXNjcmlwdCIsImRlc2MiLCJzaG93RmFpbCIsImdldFNob3dNb3JlIiwicGFnZVJvb3QiLCJzdG9wUHVsbERvd25SZWZyZXNoIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxROzs7Ozs7Ozs7Ozs7Ozs2TEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0IsTUFEakI7QUFFUEMsNkJBQXVCO0FBRmhCLEssU0FJVkMsTyxHQUFVLEUsU0FDYkMsTSxHQUFTLEVBQUMsYUFBWSxFQUFDLHlCQUF3QixPQUF6QixFQUFpQyxjQUFhLEVBQTlDLEVBQWIsRUFBK0QsZUFBYyxFQUFDLFFBQU8sR0FBUixFQUE3RSxFQUEwRixhQUFZLEVBQUMsZ0JBQWUsRUFBaEIsRUFBbUIsd0JBQXVCLFVBQTFDLEVBQXRHLEVBQTRKLFVBQVMsRUFBckssRSxTQUNUQyxPLEdBQVUsRUFBQyxhQUFZLEVBQUMsaUJBQWdCLFVBQWpCLEVBQWIsRSxTQUNUQyxVLEdBQWE7QUFDUkMsZ0NBRFE7QUFFUkMsbUNBRlE7QUFHUkMsb0NBSFE7QUFJUkM7QUFKUSxLLFNBTVZDLEksR0FBTztBQUNMQyxhQUFPLEVBREY7QUFFTEMsbUJBQWEsQ0FBQyxtREFBRCxFQUFzRCxtREFBdEQsRUFBMkcsb0RBQTNHLEVBQWlLLG1EQUFqSyxFQUFzTixpREFBdE4sQ0FGUjtBQUdMQyxtQkFBYSxFQUhSO0FBSUxDLHFCQUFlLENBQUM7QUFDZEMsY0FBTSxFQURRO0FBRWRDLFlBQUk7QUFGVSxPQUFELENBSlY7QUFRTEMsYUFBTyxFQVJGO0FBU0xDLGdCQUFVLFVBVEw7QUFVTEMsa0JBQVksQ0FWUDtBQVdMQyxtQkFBYSxDQVhSO0FBWUxDLGNBQVEsS0FaSDtBQWFMQyxnQkFBVSxFQWJMO0FBY0xDLGdCQUFVLENBZEw7QUFlTEMsZUFBUyxDQWZKO0FBZ0JMQyxnQkFBVSxFQWhCTDtBQWlCTEMsb0JBQWMsRUFqQlQ7QUFrQkxqQixjQUFRLEtBbEJI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TDtBQUNBLFdBQUtzQixXQUFMO0FBQ0EsV0FBS3JCLE1BQUw7QUFDRDs7OzZCQUNTO0FBQ1IsVUFBSSxLQUFLbkIsT0FBTCxDQUFheUMsUUFBakIsRUFBMkI7QUFDekIsYUFBS3pDLE9BQUwsQ0FBYXlDLFFBQWIsR0FBd0IsS0FBeEI7QUFDRCxPQUZELE1BRU87QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Q7QUFDRjs7O3dDQUNvQjtBQUNuQixXQUFLOUQsVUFBTCxHQUFrQixDQUFsQjtBQUNBLFdBQUtDLFdBQUwsR0FBbUIsQ0FBbkI7QUFDQSxVQUFJLEtBQUtQLFdBQUwsQ0FBaUIwQixNQUFqQixHQUEwQixDQUE5QixFQUFpQztBQUMvQixhQUFLUixNQUFMLENBQVksS0FBS2xCLFdBQUwsQ0FBaUIsQ0FBakIsRUFBb0JHLEVBQWhDLEVBQW9DLFlBQU07QUFDeEMseUJBQUtrRSxtQkFBTDtBQUNELFNBRkQ7QUFHRDtBQUNGOzs7O0VBOU5tQyxlQUFLQyxJOztrQkFBdEJyRixRIiwiZmlsZSI6ImNhdGVnb3J5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gIGltcG9ydCBHb29kcyBmcm9tICcuLi9jb21wb25lbnRzL2dvb2RzJ1xuICBpbXBvcnQgU2VhcmNoIGZyb20gJy4uL2NvbXBvbmVudHMvc2VhcmNoYmFyJ1xuICBpbXBvcnQgRGVmZWN0IGZyb20gJy4uL2NvbXBvbmVudHMvZGVmZWN0J1xuICBpbXBvcnQgUmVhY2hkb3duIGZyb20gJy4uL2NvbXBvbmVudHMvcmVhY2hkb3duJ1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIENhdGVnb3J5IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5ZWG5ZOB5YiG57G7JyxcbiAgICAgIGVuYWJsZVB1bGxEb3duUmVmcmVzaDogdHJ1ZVxuICAgIH1cbiAgICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wiQ2F0ZWdvb2RzXCI6e1widi1iaW5kOmdvb2RzSXRlbS5zeW5jXCI6XCJnb29kc1wiLFwieG1sbnM6di1vblwiOlwiXCJ9LFwiZGVmZWN0SW1hZ2VcIjp7XCJ0eXBlXCI6XCIxXCJ9LFwic2VhcmNoYmFyXCI6e1wieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDpwYWdlZnJvbS5zeW5jXCI6XCJwYWdlVGlsZVwifSxcImlzRG93blwiOnt9fTtcclxuJGV2ZW50cyA9IHtcIkNhdGVnb29kc1wiOntcInYtb246Z29vZHNUYXBcIjpcImdvRGV0YWlsXCJ9fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgICBDYXRlZ29vZHM6IEdvb2RzLFxuICAgICAgZGVmZWN0SW1hZ2U6IERlZmVjdCxcbiAgICAgIHNlYXJjaGJhcjogU2VhcmNoLFxuICAgICAgaXNEb3duOiBSZWFjaGRvd25cbiAgICB9XG4gICAgZGF0YSA9IHtcbiAgICAgIHRva2VuOiAnJyxcbiAgICAgIGNhdGVnb3J5SW1nOiBbJ2h0dHA6Ly9wMzNtbnV2cm8uYmt0LmNsb3VkZG4uY29tL2ZsaW1nX25pdXBhaS5wbmcnLCAnaHR0cDovL3AzM21udXZyby5ia3QuY2xvdWRkbi5jb20vZmxpbWdfbml1cm91LnBuZycsICdodHRwOi8vcDMzbW51dnJvLmJrdC5jbG91ZGRuLmNvbS9mbGltZ19oYWl4aWFuLnBuZycsICdodHRwOi8vcDMzbW51dnJvLmJrdC5jbG91ZGRuLmNvbS9mbGltZ19qaXVsZWkucG5nJywgJ2h0dHA6Ly9wMzNtbnV2cm8uYmt0LmNsb3VkZG4uY29tL2ZsaW1nX3FpdGEucG5nJ10sXG4gICAgICBjYXRlZ29yeVRhYjogW10sXG4gICAgICBjaGlsZENhdGVnb3J5OiBbe1xuICAgICAgICBuYW1lOiAnJyxcbiAgICAgICAgaWQ6ICcnXG4gICAgICB9XSxcbiAgICAgIGdvb2RzOiBbXSxcbiAgICAgIHBhZ2VUaWxlOiAnY2F0ZWdvcnknLFxuICAgICAgY3VycmVudFRhYjogMCxcbiAgICAgIGN1cnJlbnRJdGVtOiAwLFxuICAgICAgaXNOdWxsOiBmYWxzZSxcbiAgICAgIHNob3dNb3JlOiAnJyxcbiAgICAgIHBhZ2VTaXplOiA1LFxuICAgICAgcGFnZU51bTogMSxcbiAgICAgIHNvdXJjZUlkOiAnJyxcbiAgICAgIHRvdGFsUGFnZU51bTogJycsXG4gICAgICBpc0Rvd246IGZhbHNlLFxuICAgICAgaXNMb2FkaW5nOiBmYWxzZVxuICAgIH1cbiAgICBnZXRTaG93TW9yZSAoKSB7XG4gICAgICB0aGlzLmNhdGVnb3J5VGFiLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgIGlmIChpdGVtLmNhdGVnb3J5Lmxlbmd0aCA+IDUpIHtcbiAgICAgICAgICB0aGlzLnNob3dNb3JlID0gaW5kZXhcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGNoYW5nZVRhYiAoaW5kZXgsIGlkKSB7XG4gICAgICAgIHRoaXMuY3VycmVudFRhYiA9IGluZGV4XG4gICAgICAgIHRoaXMuY3VycmVudEl0ZW0gPSAwXG4gICAgICAgIHRoaXMuc291cmNlSWQgPSBpZFxuICAgICAgICB0aGlzLmlzTnVsbCA9IGZhbHNlXG4gICAgICAgIHRoaXMucGFnZU51bSA9IDFcbiAgICAgICAgdGhpcy5nZXRTcHUodGhpcy5zb3VyY2VJZClcbiAgICAgIH0sXG4gICAgICByZXFDYXRlZ29yeSAoaW5kZXgsIGlkKSB7XG4gICAgICAgIHRoaXMuY3VycmVudEl0ZW0gPSBpbmRleFxuICAgICAgICB0aGlzLnNvdXJjZUlkID0gaWRcbiAgICAgICAgdGhpcy5pc051bGwgPSBmYWxzZVxuICAgICAgICB0aGlzLnBhZ2VOdW0gPSAxXG4gICAgICAgIHRoaXMuZ2V0U3B1KHRoaXMuc291cmNlSWQpXG4gICAgICB9LFxuICAgICAgZ29EZXRhaWwgKGlkKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9kZXRhaWw/aWQ9JyArIGlkXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICAgIG9uUmVhY2hCb3R0b20gKCkge1xuICAgICAgaWYgKHRoaXMucGFnZU51bSA8IHRoaXMudG90YWxQYWdlTnVtKSB7XG4gICAgICAgIC8vIOaYvuekuuS4i+S4gOmhteaVsOaNrlxuICAgICAgICB0aGlzLnBhZ2VOdW0gKytcbiAgICAgICAgdGhpcy5nZXRTcHUodGhpcy5zb3VyY2VJZClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh0aGlzLmdvb2RzLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgIHRoaXMuaXNEb3duID0gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGdldFRvcENhdGUgKCkge1xuICAgICAgdGhpcy4kcGFyZW50LnNob3dMb2FkaW5nKClcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuR2V0VG9wQ2F0ZWdvcnkoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgX3RoaXMuJHBhcmVudC5oaWRlTG9hZGluZygpXG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIF90aGlzLmlzTG9hZGluZyA9IHRydWVcbiAgICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgICBkYXRhLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHZhciBvYmogPSB7fVxuICAgICAgICAgICAgb2JqLnRpdGxlID0gaXRlbS5uYW1lXG4gICAgICAgICAgICBvYmouaWQgPSBpdGVtLmlkXG4gICAgICAgICAgICBvYmouY2hpbGQgPSBfdGhpcy5nZXRDaGlsZENhdGUoaXRlbS5pZClcbiAgICAgICAgICAgIF90aGlzLmNhdGVnb3J5VGFiLnB1c2gob2JqKVxuICAgICAgICAgIH0pXG4gICAgICAgICAgX3RoaXMuc291cmNlSWQgPSBfdGhpcy5jYXRlZ29yeVRhYlswXS5pZFxuICAgICAgICAgIF90aGlzLmdldFNwdShfdGhpcy5zb3VyY2VJZClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBfdGhpcy5pc051bGwgPSB0cnVlXG4gICAgICAgICAgaWYgKF90aGlzLiRwYXJlbnQubWlzc1Rva2VuKSB7XG4gICAgICAgICAgICBfdGhpcy5nZXRUb3BDYXRlKClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgX3RoaXMuJHBhcmVudC5oaWRlTG9hZGluZygpXG4gICAgICAgIF90aGlzLmlzTnVsbCA9IHRydWVcbiAgICAgICAgLy8gX3RoaXMuJHBhcmVudC5zaG93RmFpbCgpXG4gICAgICB9KVxuICAgIH1cbiAgICBnZXRDaGlsZENhdGUgKHNvdXJjZUlkKSB7XG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgY2F0ZWdvcnlJZDogc291cmNlSWQsXG4gICAgICAgIGluY2x1ZFNlbGY6IDFcbiAgICAgIH1cbiAgICAgIHZhciBjaGlsZCA9IFt7XG4gICAgICAgIG5hbWU6ICflhajpg6gnLFxuICAgICAgICBpZDogc291cmNlSWRcbiAgICAgIH1dXG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuR2V0Q2hpbGRDYXRlZ29yeShkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgICAgZGF0YS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICB2YXIgb2JqID0ge31cbiAgICAgICAgICAgIG9iai5uYW1lID0gaXRlbS5uYW1lXG4gICAgICAgICAgICBvYmouaWQgPSBpdGVtLmlkXG4gICAgICAgICAgICBjaGlsZC5wdXNoKG9iailcbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIF90aGlzLmlzTnVsbCA9IHRydWVcbiAgICAgICAgICBpZiAoX3RoaXMuJHBhcmVudC5taXNzVG9rZW4pIHtcbiAgICAgICAgICAgIC8vIF90aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKHJlcy5kYXRhLmVycm9yKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICBfdGhpcy5pc051bGwgPSB0cnVlXG4gICAgICB9KVxuICAgICAgcmV0dXJuIGNoaWxkXG4gICAgfVxuICAgIGdldFNwdSAoc291cmNlSWQsIGNiKSB7XG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgIHRoaXMuJHBhcmVudC5zaG93TG9hZGluZygpXG4gICAgICB0aGlzLmlzRG93biA9IGZhbHNlXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgY2F0ZWdvcnlJZDogc291cmNlSWQsXG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICBwYWdlU2l6ZTogdGhpcy5wYWdlU2l6ZSxcbiAgICAgICAgcGFnZU51bTogdGhpcy5wYWdlTnVtXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuR2V0U3B1SHR0cChkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICBpZiAoX3RoaXMucGFnZU51bSA9PT0gMSkge1xuICAgICAgICAgIF90aGlzLmdvb2RzID0gW11cbiAgICAgICAgfVxuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICBfdGhpcy4kcGFyZW50LmhpZGVMb2FkaW5nKClcbiAgICAgICAgICBfdGhpcy50b3RhbFBhZ2VOdW0gPSByZXMuZGF0YS5kYXRhLnRvdGFsUGFnZU51bVxuICAgICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YS5zcHVzXG4gICAgICAgICAgaWYgKGRhdGEubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBfdGhpcy5pc051bGwgPSB0cnVlXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIF90aGlzLmlzTnVsbCA9IGZhbHNlXG4gICAgICAgICAgICBpZiAocmVzLmRhdGEuZGF0YS50b3RhbENvdW50IDw9IHRoaXMucGFnZVNpemUpIHtcbiAgICAgICAgICAgICAgX3RoaXMuaXNEb3duID0gdHJ1ZVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgX3RoaXMuaXNEb3duID0gZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgZGF0YS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICB2YXIgZ29vZCA9IHt9XG4gICAgICAgICAgICBnb29kLnBhdGggPSBpdGVtLmNvdmVyXG4gICAgICAgICAgICBnb29kLnRpdGxlID0gaXRlbS50aXRsZVxuICAgICAgICAgICAgZ29vZC5wcmljZSA9IGl0ZW0ubWVtYmVyUHJpY2VcbiAgICAgICAgICAgIGdvb2Qub2xkcHJpY2UgPSBpdGVtLnByaWNlXG4gICAgICAgICAgICBnb29kLmRldGFpbCA9IGl0ZW0udmljZVRpdGxlXG4gICAgICAgICAgICBnb29kLnJlZHVjdGlvbiA9IGl0ZW0ucmVkdWN0aW9uXG4gICAgICAgICAgICBnb29kLmlkID0gaXRlbS5zb3VyY2VJZFxuICAgICAgICAgICAgZ29vZC5kZXNjcmlwdCA9IGl0ZW0uZGVzY1xuICAgICAgICAgICAgX3RoaXMuZ29vZHMucHVzaChnb29kKVxuICAgICAgICAgIH0pXG4gICAgICAgICAgY2IgJiYgY2IoKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIF90aGlzLmlzTnVsbCA9IHRydWVcbiAgICAgICAgICBpZiAoX3RoaXMuJHBhcmVudC5taXNzVG9rZW4pIHtcbiAgICAgICAgICAgIF90aGlzLmdldFNwdShzb3VyY2VJZCwgY2IpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgIF90aGlzLmlzTnVsbCA9IHRydWVcbiAgICAgICAgX3RoaXMuJHBhcmVudC5zaG93RmFpbCgpXG4gICAgICB9KVxuICAgIH1cbiAgICBvbkxvYWQgKCkge1xuICAgICAgdGhpcy5nZXRUb3BDYXRlKClcbiAgICAgIHRoaXMuZ2V0U2hvd01vcmUoKVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgICBvblNob3cgKCkge1xuICAgICAgaWYgKHRoaXMuJHBhcmVudC5wYWdlUm9vdCkge1xuICAgICAgICB0aGlzLiRwYXJlbnQucGFnZVJvb3QgPSBmYWxzZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gdGhpcy5jdXJyZW50VGFiID0gMFxuICAgICAgICAvLyB0aGlzLmN1cnJlbnRJdGVtID0gMFxuICAgICAgICAvLyBpZiAodGhpcy5jYXRlZ29yeVRhYi5sZW5ndGggIT09IDApIHtcbiAgICAgICAgLy8gICB0aGlzLmdldFNwdSh0aGlzLmNhdGVnb3J5VGFiWzBdLmlkKVxuICAgICAgICAvLyB9XG4gICAgICB9XG4gICAgfVxuICAgIG9uUHVsbERvd25SZWZyZXNoICgpIHtcbiAgICAgIHRoaXMuY3VycmVudFRhYiA9IDBcbiAgICAgIHRoaXMuY3VycmVudEl0ZW0gPSAwXG4gICAgICBpZiAodGhpcy5jYXRlZ29yeVRhYi5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMuZ2V0U3B1KHRoaXMuY2F0ZWdvcnlUYWJbMF0uaWQsICgpID0+IHtcbiAgICAgICAgICB3ZXB5LnN0b3BQdWxsRG93blJlZnJlc2goKVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgfVxuIl19