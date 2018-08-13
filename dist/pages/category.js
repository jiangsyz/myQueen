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
    value: function getTopCate(cb) {
      this.categoryTab = [];
      this.goods = [];
      this.$parent.showLoading();
      this.token = this.$parent.getToken();
      var _this = this;
      var data = {
        token: this.token
      };
      this.$parent.HttpRequest.GetTopCategory(data).then(function (res) {
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
          _this.getSpu(_this.sourceId, function () {
            cb && cb();
          });
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
      this.pageNum = 1;
      this.isLoading = false;
      this.currentTab = 0;
      this.currentItem = 0;
      this.childCategory = [{
        name: '',
        id: ''
      }];
      this.sourceId = '';
      this.totalPageNum = '';
      this.$apply();
      // this.goods = []
      // if (this.categoryTab.length > 0) {
      //   this.getSpu(this.categoryTab[0].id, () => {
      //     wepy.stopPullDownRefresh()
      //   })
      // }
      this.getTopCate(function () {
        _wepy2.default.stopPullDownRefresh();
      });
      this.getShowMore();
    }
  }]);

  return Category;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Category , 'pages/category'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhdGVnb3J5LmpzIl0sIm5hbWVzIjpbIkNhdGVnb3J5IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImVuYWJsZVB1bGxEb3duUmVmcmVzaCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsIkNhdGVnb29kcyIsImRlZmVjdEltYWdlIiwic2VhcmNoYmFyIiwiaXNEb3duIiwiZGF0YSIsInRva2VuIiwiY2F0ZWdvcnlJbWciLCJjYXRlZ29yeVRhYiIsImNoaWxkQ2F0ZWdvcnkiLCJuYW1lIiwiaWQiLCJnb29kcyIsInBhZ2VUaWxlIiwiY3VycmVudFRhYiIsImN1cnJlbnRJdGVtIiwiaXNOdWxsIiwic2hvd01vcmUiLCJwYWdlU2l6ZSIsInBhZ2VOdW0iLCJzb3VyY2VJZCIsInRvdGFsUGFnZU51bSIsImlzTG9hZGluZyIsIm1ldGhvZHMiLCJjaGFuZ2VUYWIiLCJpbmRleCIsImdldFNwdSIsInJlcUNhdGVnb3J5IiwiZ29EZXRhaWwiLCJuYXZpZ2F0ZVRvIiwidXJsIiwiZm9yRWFjaCIsIml0ZW0iLCJjYXRlZ29yeSIsImxlbmd0aCIsImNiIiwiJHBhcmVudCIsInNob3dMb2FkaW5nIiwiZ2V0VG9rZW4iLCJfdGhpcyIsIkh0dHBSZXF1ZXN0IiwiR2V0VG9wQ2F0ZWdvcnkiLCJ0aGVuIiwicmVzIiwiaGlkZUxvYWRpbmciLCJlcnJvciIsIm9iaiIsInRpdGxlIiwiY2hpbGQiLCJnZXRDaGlsZENhdGUiLCJwdXNoIiwibWlzc1Rva2VuIiwiZ2V0VG9wQ2F0ZSIsIiRhcHBseSIsImNhdGNoIiwiY2F0ZWdvcnlJZCIsImluY2x1ZFNlbGYiLCJHZXRDaGlsZENhdGVnb3J5IiwiR2V0U3B1SHR0cCIsImNvbnNvbGUiLCJsb2ciLCJzcHVzIiwidG90YWxDb3VudCIsImdvb2QiLCJwYXRoIiwiY292ZXIiLCJwcmljZSIsIm1lbWJlclByaWNlIiwib2xkcHJpY2UiLCJkZXRhaWwiLCJ2aWNlVGl0bGUiLCJyZWR1Y3Rpb24iLCJkZXNjcmlwdCIsImRlc2MiLCJzaG93RmFpbCIsImdldFNob3dNb3JlIiwicGFnZVJvb3QiLCJzdG9wUHVsbERvd25SZWZyZXNoIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxROzs7Ozs7Ozs7Ozs7Ozs2TEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0IsTUFEakI7QUFFUEMsNkJBQXVCO0FBRmhCLEssU0FJVkMsTyxHQUFVLEUsU0FDYkMsTSxHQUFTLEVBQUMsYUFBWSxFQUFDLHlCQUF3QixPQUF6QixFQUFpQyxjQUFhLEVBQTlDLEVBQWIsRUFBK0QsZUFBYyxFQUFDLFFBQU8sR0FBUixFQUE3RSxFQUEwRixhQUFZLEVBQUMsZ0JBQWUsRUFBaEIsRUFBbUIsd0JBQXVCLFVBQTFDLEVBQXRHLEVBQTRKLFVBQVMsRUFBckssRSxTQUNUQyxPLEdBQVUsRUFBQyxhQUFZLEVBQUMsaUJBQWdCLFVBQWpCLEVBQWIsRSxTQUNUQyxVLEdBQWE7QUFDUkMsZ0NBRFE7QUFFUkMsbUNBRlE7QUFHUkMsb0NBSFE7QUFJUkM7QUFKUSxLLFNBTVZDLEksR0FBTztBQUNMQyxhQUFPLEVBREY7QUFFTEMsbUJBQWEsQ0FBQyxtREFBRCxFQUFzRCxtREFBdEQsRUFBMkcsb0RBQTNHLEVBQWlLLG1EQUFqSyxFQUFzTixpREFBdE4sQ0FGUjtBQUdMQyxtQkFBYSxFQUhSO0FBSUxDLHFCQUFlLENBQUM7QUFDZEMsY0FBTSxFQURRO0FBRWRDLFlBQUk7QUFGVSxPQUFELENBSlY7QUFRTEMsYUFBTyxFQVJGO0FBU0xDLGdCQUFVLFVBVEw7QUFVTEMsa0JBQVksQ0FWUDtBQVdMQyxtQkFBYSxDQVhSO0FBWUxDLGNBQVEsS0FaSDtBQWFMQyxnQkFBVSxFQWJMO0FBY0xDLGdCQUFVLENBZEw7QUFlTEMsZUFBUyxDQWZKO0FBZ0JMQyxnQkFBVSxFQWhCTDtBQWlCTEMsb0JBQWMsRUFqQlQ7QUFrQkxqQixjQUFRLEtBbEJI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LGNBQU1ILE9BQU4sQ0FBY3NDLFFBQWQ7QUFDRCxPQTFDRDtBQTJDRDs7OzZCQUNTO0FBQ1IsV0FBS3RCLFVBQUw7QUFDQSxXQUFLdUIsV0FBTDtBQUNBLFdBQUt0QixNQUFMO0FBQ0Q7Ozs2QkFDUztBQUNSLFVBQUksS0FBS2pCLE9BQUwsQ0FBYXdDLFFBQWpCLEVBQTJCO0FBQ3pCLGFBQUt4QyxPQUFMLENBQWF3QyxRQUFiLEdBQXdCLEtBQXhCO0FBQ0QsT0FGRCxNQUVPO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNEO0FBQ0Y7Ozt3Q0FDb0I7QUFDbkIsV0FBS3pELE9BQUwsR0FBZSxDQUFmO0FBQ0EsV0FBS0csU0FBTCxHQUFpQixLQUFqQjtBQUNBLFdBQUtSLFVBQUwsR0FBa0IsQ0FBbEI7QUFDQSxXQUFLQyxXQUFMLEdBQW1CLENBQW5CO0FBQ0EsV0FBS04sYUFBTCxHQUFxQixDQUFDO0FBQ3BCQyxjQUFNLEVBRGM7QUFFcEJDLFlBQUk7QUFGZ0IsT0FBRCxDQUFyQjtBQUlBLFdBQUtTLFFBQUwsR0FBZ0IsRUFBaEI7QUFDQSxXQUFLQyxZQUFMLEdBQW9CLEVBQXBCO0FBQ0EsV0FBS2dDLE1BQUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFLRCxVQUFMLENBQWdCLFlBQU07QUFDcEIsdUJBQUt5QixtQkFBTDtBQUNELE9BRkQ7QUFHQSxXQUFLRixXQUFMO0FBQ0Q7Ozs7RUEvT21DLGVBQUtHLEk7O2tCQUF0QnJGLFEiLCJmaWxlIjoiY2F0ZWdvcnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgaW1wb3J0IEdvb2RzIGZyb20gJy4uL2NvbXBvbmVudHMvZ29vZHMnXG4gIGltcG9ydCBTZWFyY2ggZnJvbSAnLi4vY29tcG9uZW50cy9zZWFyY2hiYXInXG4gIGltcG9ydCBEZWZlY3QgZnJvbSAnLi4vY29tcG9uZW50cy9kZWZlY3QnXG4gIGltcG9ydCBSZWFjaGRvd24gZnJvbSAnLi4vY29tcG9uZW50cy9yZWFjaGRvd24nXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2F0ZWdvcnkgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfllYblk4HliIbnsbsnLFxuICAgICAgZW5hYmxlUHVsbERvd25SZWZyZXNoOiB0cnVlXG4gICAgfVxuICAgJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJDYXRlZ29vZHNcIjp7XCJ2LWJpbmQ6Z29vZHNJdGVtLnN5bmNcIjpcImdvb2RzXCIsXCJ4bWxuczp2LW9uXCI6XCJcIn0sXCJkZWZlY3RJbWFnZVwiOntcInR5cGVcIjpcIjFcIn0sXCJzZWFyY2hiYXJcIjp7XCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOnBhZ2Vmcm9tLnN5bmNcIjpcInBhZ2VUaWxlXCJ9LFwiaXNEb3duXCI6e319O1xyXG4kZXZlbnRzID0ge1wiQ2F0ZWdvb2RzXCI6e1widi1vbjpnb29kc1RhcFwiOlwiZ29EZXRhaWxcIn19O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICAgIENhdGVnb29kczogR29vZHMsXG4gICAgICBkZWZlY3RJbWFnZTogRGVmZWN0LFxuICAgICAgc2VhcmNoYmFyOiBTZWFyY2gsXG4gICAgICBpc0Rvd246IFJlYWNoZG93blxuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgdG9rZW46ICcnLFxuICAgICAgY2F0ZWdvcnlJbWc6IFsnaHR0cDovL3AzM21udXZyby5ia3QuY2xvdWRkbi5jb20vZmxpbWdfbml1cGFpLnBuZycsICdodHRwOi8vcDMzbW51dnJvLmJrdC5jbG91ZGRuLmNvbS9mbGltZ19uaXVyb3UucG5nJywgJ2h0dHA6Ly9wMzNtbnV2cm8uYmt0LmNsb3VkZG4uY29tL2ZsaW1nX2hhaXhpYW4ucG5nJywgJ2h0dHA6Ly9wMzNtbnV2cm8uYmt0LmNsb3VkZG4uY29tL2ZsaW1nX2ppdWxlaS5wbmcnLCAnaHR0cDovL3AzM21udXZyby5ia3QuY2xvdWRkbi5jb20vZmxpbWdfcWl0YS5wbmcnXSxcbiAgICAgIGNhdGVnb3J5VGFiOiBbXSxcbiAgICAgIGNoaWxkQ2F0ZWdvcnk6IFt7XG4gICAgICAgIG5hbWU6ICcnLFxuICAgICAgICBpZDogJydcbiAgICAgIH1dLFxuICAgICAgZ29vZHM6IFtdLFxuICAgICAgcGFnZVRpbGU6ICdjYXRlZ29yeScsXG4gICAgICBjdXJyZW50VGFiOiAwLFxuICAgICAgY3VycmVudEl0ZW06IDAsXG4gICAgICBpc051bGw6IGZhbHNlLFxuICAgICAgc2hvd01vcmU6ICcnLFxuICAgICAgcGFnZVNpemU6IDUsXG4gICAgICBwYWdlTnVtOiAxLFxuICAgICAgc291cmNlSWQ6ICcnLFxuICAgICAgdG90YWxQYWdlTnVtOiAnJyxcbiAgICAgIGlzRG93bjogZmFsc2UsXG4gICAgICBpc0xvYWRpbmc6IGZhbHNlXG4gICAgfVxuICAgIGdldFNob3dNb3JlICgpIHtcbiAgICAgIHRoaXMuY2F0ZWdvcnlUYWIuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgaWYgKGl0ZW0uY2F0ZWdvcnkubGVuZ3RoID4gNSkge1xuICAgICAgICAgIHRoaXMuc2hvd01vcmUgPSBpbmRleFxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgY2hhbmdlVGFiIChpbmRleCwgaWQpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50VGFiID0gaW5kZXhcbiAgICAgICAgdGhpcy5jdXJyZW50SXRlbSA9IDBcbiAgICAgICAgdGhpcy5zb3VyY2VJZCA9IGlkXG4gICAgICAgIHRoaXMuaXNOdWxsID0gZmFsc2VcbiAgICAgICAgdGhpcy5wYWdlTnVtID0gMVxuICAgICAgICB0aGlzLmdldFNwdSh0aGlzLnNvdXJjZUlkKVxuICAgICAgfSxcbiAgICAgIHJlcUNhdGVnb3J5IChpbmRleCwgaWQpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50SXRlbSA9IGluZGV4XG4gICAgICAgIHRoaXMuc291cmNlSWQgPSBpZFxuICAgICAgICB0aGlzLmlzTnVsbCA9IGZhbHNlXG4gICAgICAgIHRoaXMucGFnZU51bSA9IDFcbiAgICAgICAgdGhpcy5nZXRTcHUodGhpcy5zb3VyY2VJZClcbiAgICAgIH0sXG4gICAgICBnb0RldGFpbCAoaWQpIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL2RldGFpbD9pZD0nICsgaWRcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gICAgb25SZWFjaEJvdHRvbSAoKSB7XG4gICAgICBpZiAodGhpcy5wYWdlTnVtIDwgdGhpcy50b3RhbFBhZ2VOdW0pIHtcbiAgICAgICAgLy8g5pi+56S65LiL5LiA6aG15pWw5o2uXG4gICAgICAgIHRoaXMucGFnZU51bSArK1xuICAgICAgICB0aGlzLmdldFNwdSh0aGlzLnNvdXJjZUlkKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHRoaXMuZ29vZHMubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgdGhpcy5pc0Rvd24gPSB0cnVlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZ2V0VG9wQ2F0ZSAoY2IpIHtcbiAgICAgIHRoaXMuY2F0ZWdvcnlUYWIgPSBbXVxuICAgICAgdGhpcy5nb29kcyA9IFtdXG4gICAgICB0aGlzLiRwYXJlbnQuc2hvd0xvYWRpbmcoKVxuICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW5cbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5HZXRUb3BDYXRlZ29yeShkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgX3RoaXMuJHBhcmVudC5oaWRlTG9hZGluZygpXG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIF90aGlzLmlzTG9hZGluZyA9IHRydWVcbiAgICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgICBkYXRhLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHZhciBvYmogPSB7fVxuICAgICAgICAgICAgb2JqLnRpdGxlID0gaXRlbS5uYW1lXG4gICAgICAgICAgICBvYmouaWQgPSBpdGVtLmlkXG4gICAgICAgICAgICBvYmouY2hpbGQgPSBfdGhpcy5nZXRDaGlsZENhdGUoaXRlbS5pZClcbiAgICAgICAgICAgIF90aGlzLmNhdGVnb3J5VGFiLnB1c2gob2JqKVxuICAgICAgICAgIH0pXG4gICAgICAgICAgX3RoaXMuc291cmNlSWQgPSBfdGhpcy5jYXRlZ29yeVRhYlswXS5pZFxuICAgICAgICAgIF90aGlzLmdldFNwdShfdGhpcy5zb3VyY2VJZCwgKCkgPT4ge1xuICAgICAgICAgICAgY2IgJiYgY2IoKVxuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgX3RoaXMuaXNOdWxsID0gdHJ1ZVxuICAgICAgICAgIGlmIChfdGhpcy4kcGFyZW50Lm1pc3NUb2tlbikge1xuICAgICAgICAgICAgX3RoaXMuZ2V0VG9wQ2F0ZSgpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgIF90aGlzLiRwYXJlbnQuaGlkZUxvYWRpbmcoKVxuICAgICAgICBfdGhpcy5pc051bGwgPSB0cnVlXG4gICAgICAgIC8vIF90aGlzLiRwYXJlbnQuc2hvd0ZhaWwoKVxuICAgICAgfSlcbiAgICB9XG4gICAgZ2V0Q2hpbGRDYXRlIChzb3VyY2VJZCkge1xuICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgIGNhdGVnb3J5SWQ6IHNvdXJjZUlkLFxuICAgICAgICBpbmNsdWRTZWxmOiAxXG4gICAgICB9XG4gICAgICB2YXIgY2hpbGQgPSBbe1xuICAgICAgICBuYW1lOiAn5YWo6YOoJyxcbiAgICAgICAgaWQ6IHNvdXJjZUlkXG4gICAgICB9XVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkdldENoaWxkQ2F0ZWdvcnkoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICAgIGRhdGEuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgdmFyIG9iaiA9IHt9XG4gICAgICAgICAgICBvYmoubmFtZSA9IGl0ZW0ubmFtZVxuICAgICAgICAgICAgb2JqLmlkID0gaXRlbS5pZFxuICAgICAgICAgICAgY2hpbGQucHVzaChvYmopXG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBfdGhpcy5pc051bGwgPSB0cnVlXG4gICAgICAgICAgaWYgKF90aGlzLiRwYXJlbnQubWlzc1Rva2VuKSB7XG4gICAgICAgICAgICAvLyBfdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbihyZXMuZGF0YS5lcnJvcilcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgX3RoaXMuaXNOdWxsID0gdHJ1ZVxuICAgICAgfSlcbiAgICAgIHJldHVybiBjaGlsZFxuICAgIH1cbiAgICBnZXRTcHUgKHNvdXJjZUlkLCBjYikge1xuICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICB0aGlzLiRwYXJlbnQuc2hvd0xvYWRpbmcoKVxuICAgICAgdGhpcy5pc0Rvd24gPSBmYWxzZVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIGNhdGVnb3J5SWQ6IHNvdXJjZUlkLFxuICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgcGFnZVNpemU6IHRoaXMucGFnZVNpemUsXG4gICAgICAgIHBhZ2VOdW06IHRoaXMucGFnZU51bVxuICAgICAgfVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkdldFNwdUh0dHAoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgaWYgKF90aGlzLnBhZ2VOdW0gPT09IDEpIHtcbiAgICAgICAgICBfdGhpcy5nb29kcyA9IFtdXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgX3RoaXMuJHBhcmVudC5oaWRlTG9hZGluZygpXG4gICAgICAgICAgX3RoaXMudG90YWxQYWdlTnVtID0gcmVzLmRhdGEuZGF0YS50b3RhbFBhZ2VOdW1cbiAgICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhLmRhdGEuc3B1c1xuICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgX3RoaXMuaXNOdWxsID0gdHJ1ZVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfdGhpcy5pc051bGwgPSBmYWxzZVxuICAgICAgICAgICAgaWYgKHJlcy5kYXRhLmRhdGEudG90YWxDb3VudCA8PSB0aGlzLnBhZ2VTaXplKSB7XG4gICAgICAgICAgICAgIF90aGlzLmlzRG93biA9IHRydWVcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIF90aGlzLmlzRG93biA9IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGRhdGEuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgdmFyIGdvb2QgPSB7fVxuICAgICAgICAgICAgZ29vZC5wYXRoID0gaXRlbS5jb3ZlclxuICAgICAgICAgICAgZ29vZC50aXRsZSA9IGl0ZW0udGl0bGVcbiAgICAgICAgICAgIGdvb2QucHJpY2UgPSBpdGVtLm1lbWJlclByaWNlXG4gICAgICAgICAgICBnb29kLm9sZHByaWNlID0gaXRlbS5wcmljZVxuICAgICAgICAgICAgZ29vZC5kZXRhaWwgPSBpdGVtLnZpY2VUaXRsZVxuICAgICAgICAgICAgZ29vZC5yZWR1Y3Rpb24gPSBpdGVtLnJlZHVjdGlvblxuICAgICAgICAgICAgZ29vZC5pZCA9IGl0ZW0uc291cmNlSWRcbiAgICAgICAgICAgIGdvb2QuZGVzY3JpcHQgPSBpdGVtLmRlc2NcbiAgICAgICAgICAgIF90aGlzLmdvb2RzLnB1c2goZ29vZClcbiAgICAgICAgICB9KVxuICAgICAgICAgIGNiICYmIGNiKClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBfdGhpcy5pc051bGwgPSB0cnVlXG4gICAgICAgICAgaWYgKF90aGlzLiRwYXJlbnQubWlzc1Rva2VuKSB7XG4gICAgICAgICAgICBfdGhpcy5nZXRTcHUoc291cmNlSWQsIGNiKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICBfdGhpcy5pc051bGwgPSB0cnVlXG4gICAgICAgIF90aGlzLiRwYXJlbnQuc2hvd0ZhaWwoKVxuICAgICAgfSlcbiAgICB9XG4gICAgb25Mb2FkICgpIHtcbiAgICAgIHRoaXMuZ2V0VG9wQ2F0ZSgpXG4gICAgICB0aGlzLmdldFNob3dNb3JlKClcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gICAgb25TaG93ICgpIHtcbiAgICAgIGlmICh0aGlzLiRwYXJlbnQucGFnZVJvb3QpIHtcbiAgICAgICAgdGhpcy4kcGFyZW50LnBhZ2VSb290ID0gZmFsc2VcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHRoaXMuY3VycmVudFRhYiA9IDBcbiAgICAgICAgLy8gdGhpcy5jdXJyZW50SXRlbSA9IDBcbiAgICAgICAgLy8gaWYgKHRoaXMuY2F0ZWdvcnlUYWIubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgIC8vICAgdGhpcy5nZXRTcHUodGhpcy5jYXRlZ29yeVRhYlswXS5pZClcbiAgICAgICAgLy8gfVxuICAgICAgfVxuICAgIH1cbiAgICBvblB1bGxEb3duUmVmcmVzaCAoKSB7XG4gICAgICB0aGlzLnBhZ2VOdW0gPSAxXG4gICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlXG4gICAgICB0aGlzLmN1cnJlbnRUYWIgPSAwXG4gICAgICB0aGlzLmN1cnJlbnRJdGVtID0gMFxuICAgICAgdGhpcy5jaGlsZENhdGVnb3J5ID0gW3tcbiAgICAgICAgbmFtZTogJycsXG4gICAgICAgIGlkOiAnJ1xuICAgICAgfV1cbiAgICAgIHRoaXMuc291cmNlSWQgPSAnJ1xuICAgICAgdGhpcy50b3RhbFBhZ2VOdW0gPSAnJ1xuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgLy8gdGhpcy5nb29kcyA9IFtdXG4gICAgICAvLyBpZiAodGhpcy5jYXRlZ29yeVRhYi5sZW5ndGggPiAwKSB7XG4gICAgICAvLyAgIHRoaXMuZ2V0U3B1KHRoaXMuY2F0ZWdvcnlUYWJbMF0uaWQsICgpID0+IHtcbiAgICAgIC8vICAgICB3ZXB5LnN0b3BQdWxsRG93blJlZnJlc2goKVxuICAgICAgLy8gICB9KVxuICAgICAgLy8gfVxuICAgICAgdGhpcy5nZXRUb3BDYXRlKCgpID0+IHtcbiAgICAgICAgd2VweS5zdG9wUHVsbERvd25SZWZyZXNoKClcbiAgICAgIH0pXG4gICAgICB0aGlzLmdldFNob3dNb3JlKClcbiAgICB9XG4gIH1cbiJdfQ==