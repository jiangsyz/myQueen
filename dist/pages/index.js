'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _searchbar = require('./../components/searchbar.js');

var _searchbar2 = _interopRequireDefault(_searchbar);

var _goods = require('./../components/goods.js');

var _goods2 = _interopRequireDefault(_goods);

var _loading = require('./../components/loading.js');

var _loading2 = _interopRequireDefault(_loading);

var _defect = require('./../components/defect.js');

var _defect2 = _interopRequireDefault(_defect);

var _reachdown = require('./../components/reachdown.js');

var _reachdown2 = _interopRequireDefault(_reachdown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Main = function (_wepy$page) {
  _inherits(Main, _wepy$page);

  function Main() {
    var _ref;

    var _temp, _this2, _ret;

    _classCallCheck(this, Main);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_ref = Main.__proto__ || Object.getPrototypeOf(Main)).call.apply(_ref, [this].concat(args))), _this2), _this2.config = {
      navigationBarTitleText: '正善牛肉',
      enablePullDownRefresh: true,
      usingComponents: {
        'wxc-flex': '../../packages/@minui/wxc-flex/dist/index'
      }
    }, _this2.$repeat = { "topnavigation": { "com": "recGoods", "props": "" } }, _this2.$props = { "recGoods": { "v-bind:goodsItem.sync": { "value": "goods", "for": "topnavigation", "item": "item", "index": "index", "key": "key" }, "xmlns:v-on": { "value": "", "for": "topnavigation", "item": "item", "index": "index", "key": "key" } }, "searchbar": { "xmlns:v-bind": "", "v-bind:pagefrom.sync": "pageTitle" }, "defect": { "type": "1" }, "isDown": {} }, _this2.$events = { "recGoods": { "v-on:goodsTap": "goDetail" } }, _this2.components = {
      recGoods: _goods2.default,
      hotGoods: _goods2.default,
      load: _loading2.default,
      searchbar: _searchbar2.default,
      defect: _defect2.default,
      isDown: _reachdown2.default
    }, _this2.data = {
      token: '',
      pageTitle: 'index',
      bannerLink: [],
      topnavigation: [{
        title: '推荐',
        image: '../image/rmd_icon.png'
      }, {
        title: '热门',
        image: '../image/hot_icon.png'
      }],
      currentPage: 0,
      pageauto: false,
      swiperOpt: {
        autoplay: true,
        interval: 3000,
        duration: 1000,
        currentTab: 0,
        indicatorDots: true,
        indicatorColor: '#cccccc',
        indicatorActive: '#ec3d3a',
        circular: true
      },
      goods: [],
      loaded: false,
      pageNum: 1,
      totalPageNum: '',
      isNull: true,
      isDown: false,
      isLoading: false,
      userLevel: 0,
      vipEnd: '',
      vipReduction: '',
      categoryImage: ['../image/sptj_img.png', '../image/rmsp_img.png'],
      showPromot: true,
      nick_name: '',
      avatar: '',
      customer_info_str: '',
      note_info_str: ''
    }, _this2.methods = {
      navTab: function navTab(index) {
        this.currentPage = index;
        this.initPage();
      },
      changeTab: function changeTab(e) {
        this.currentPage = e.detail.current;
      },
      changeBanner: function changeBanner(e) {
        if (e.detail.source === 'touch') {
          this.swiperOpt.currentTab = e.detail.current;
        }
      },
      goDetail: function goDetail(id) {
        _wepy2.default.navigateTo({
          url: './detail?id=' + id
        });
      },
      goApplyVip: function goApplyVip() {
        _wepy2.default.navigateTo({
          url: './applyVip'
        });
      }
    }, _temp), _possibleConstructorReturn(_this2, _ret);
  }

  _createClass(Main, [{
    key: 'onShow',
    value: function onShow() {
      var _this3 = this;

      this.token = this.$parent.getToken();
      this.$parent.getUserLevel(this.token, function () {
        _this3.getUserLevel();
        _this3.$apply();
      });
      this.nick_name = this.$parent.getUserName();
      this.avatar = this.$parent.getUserAvatar();
      this.customer_info_str = this.$parent.getMessage();
      this.note_info_str = this.$parent.getBusiness('首页', null, null);
      // this.currentPage = 0
      // this.isLoading = false
    }
  }, {
    key: 'getUserLevel',
    value: function getUserLevel() {
      this.userLevel = this.$parent.globalData.userLevel;
      this.vipReduction = this.$parent.globalData.expectedReduction;
      this.vipEnd = this.$parent.dateFormat(this.$parent.globalData.vipEnd * 1000, 'Y年m月d日');
      this.showPromot = true;
    }
  }, {
    key: 'onReachBottom',
    value: function onReachBottom() {
      // 显示加载状态
      if (this.pageNum < this.totalPageNum) {
        // 显示下一页数据
        this.pageNum++;
        this.getInitData();
      } else {
        if (this.goods.length !== 0) {
          this.isDown = true;
        }
      }
    }
  }, {
    key: 'getInitData',
    value: function getInitData(cb) {
      var _this4 = this;

      this.token = this.$parent.getToken();
      this.$parent.showLoading();
      this.isDown = false;
      var parent = this.$parent;
      var _this = this;
      var data = {
        pageNum: this.pageNum,
        recommendType: this.currentPage + 1,
        token: this.token,
        pageSize: '5'
      };
      parent.HttpRequest.IndexHttp(data, function () {
        _this.$parent.hideLoading();
        // _this.$parent.showFail()
        _this.isNull = true;
      }).then(function (res) {
        if (_this.pageNum === 1) {
          _this.goods = [];
        }
        console.log(res);
        _this.$parent.hideLoading();
        if (res.data.error === 0) {
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
          data.forEach(function (item, index) {
            var good = {};
            good.path = item.cover;
            good.title = item.title;
            good.price = item.memberPrice;
            good.oldprice = item.price;
            good.reduction = item.reduction;
            good.id = item.sourceId;
            good.detail = item.viceTitle;
            good.descript = item.desc;
            _this.goods.push(good);
          });
          cb && cb();
        } else {
          _wepy2.default.hideLoading();
          _this.isNull = true;
          if (_this.$parent.missToken) {
            _this.initPage();
          }
        }
        _this.$apply();
      }).catch(function () {
        _this.$parent.hideLoading();
        // _this.$parent.showFail()
        _this.isNull = true;
      });
    }
  }, {
    key: 'initPage',
    value: function initPage() {
      this.pageNum = 1;
      this.isNull = false;
      this.getInitData(function () {
        _wepy2.default.stopPullDownRefresh();
      });
    }
  }, {
    key: 'onPullDownRefresh',
    value: function onPullDownRefresh() {
      var _this5 = this;

      this.currentPage = 0;
      this.getBanner();
      this.$parent.getUserLevel(this.token, function () {
        _this5.getUserLevel();
      });
      this.initPage();
    }
  }, {
    key: 'getBanner',
    value: function getBanner() {
      this.token = this.$parent.getToken();
      this.bannerLink = [];
      var _this = this;
      var data = {
        token: this.token,
        siteNo: 'index'
      };
      this.$parent.HttpRequest.GetBanner(data).then(function (res) {
        console.log(res);
        if (res.data.error === 0) {
          var data = res.data.data;
          data.forEach(function (item) {
            var obj = {};
            obj.path = item.image;
            obj.id = item.id;
            obj.sortId = item.sort;
            obj.detailId = item.uri.split(',')[1];
            _this.bannerLink.push(obj);
            _this.bannerLink.sort(function (obj1, obj2) {
              var val1 = obj1.sortId;
              var val2 = obj2.sortId;
              if (val1 < val2) {
                return -1;
              } else if (val1 > val2) {
                return 1;
              } else {
                return 0;
              }
            });
          });
        } else {
          if (_this.$parent.missToken) {
            _this.getBanner();
          }
        }
        _this.isLoading = true;
        _this.$apply();
      });
    }
  }, {
    key: 'onShareAppMessage',
    value: function onShareAppMessage(res) {
      return {
        title: '正善牛肉',
        path: '/pages/login'
      };
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {
      this.initPage();
      this.getBanner();
      this.$apply();
    }
  }]);

  return Main;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Main , 'pages/index'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIk1haW4iLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZW5hYmxlUHVsbERvd25SZWZyZXNoIiwidXNpbmdDb21wb25lbnRzIiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwicmVjR29vZHMiLCJob3RHb29kcyIsImxvYWQiLCJzZWFyY2hiYXIiLCJkZWZlY3QiLCJpc0Rvd24iLCJkYXRhIiwidG9rZW4iLCJwYWdlVGl0bGUiLCJiYW5uZXJMaW5rIiwidG9wbmF2aWdhdGlvbiIsInRpdGxlIiwiaW1hZ2UiLCJjdXJyZW50UGFnZSIsInBhZ2VhdXRvIiwic3dpcGVyT3B0IiwiYXV0b3BsYXkiLCJpbnRlcnZhbCIsImR1cmF0aW9uIiwiY3VycmVudFRhYiIsImluZGljYXRvckRvdHMiLCJpbmRpY2F0b3JDb2xvciIsImluZGljYXRvckFjdGl2ZSIsImNpcmN1bGFyIiwiZ29vZHMiLCJsb2FkZWQiLCJwYWdlTnVtIiwidG90YWxQYWdlTnVtIiwiaXNOdWxsIiwiaXNMb2FkaW5nIiwidXNlckxldmVsIiwidmlwRW5kIiwidmlwUmVkdWN0aW9uIiwiY2F0ZWdvcnlJbWFnZSIsInNob3dQcm9tb3QiLCJuaWNrX25hbWUiLCJhdmF0YXIiLCJjdXN0b21lcl9pbmZvX3N0ciIsIm5vdGVfaW5mb19zdHIiLCJtZXRob2RzIiwibmF2VGFiIiwiaW5kZXgiLCJpbml0UGFnZSIsImNoYW5nZVRhYiIsImUiLCJkZXRhaWwiLCJjdXJyZW50IiwiY2hhbmdlQmFubmVyIiwic291cmNlIiwiZ29EZXRhaWwiLCJpZCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJnb0FwcGx5VmlwIiwiJHBhcmVudCIsImdldFRva2VuIiwiZ2V0VXNlckxldmVsIiwiJGFwcGx5IiwiZ2V0VXNlck5hbWUiLCJnZXRVc2VyQXZhdGFyIiwiZ2V0TWVzc2FnZSIsImdldEJ1c2luZXNzIiwiZ2xvYmFsRGF0YSIsImV4cGVjdGVkUmVkdWN0aW9uIiwiZGF0ZUZvcm1hdCIsImdldEluaXREYXRhIiwibGVuZ3RoIiwiY2IiLCJzaG93TG9hZGluZyIsInBhcmVudCIsIl90aGlzIiwicmVjb21tZW5kVHlwZSIsInBhZ2VTaXplIiwiSHR0cFJlcXVlc3QiLCJJbmRleEh0dHAiLCJoaWRlTG9hZGluZyIsInRoZW4iLCJyZXMiLCJjb25zb2xlIiwibG9nIiwiZXJyb3IiLCJzcHVzIiwidG90YWxDb3VudCIsImZvckVhY2giLCJpdGVtIiwiZ29vZCIsInBhdGgiLCJjb3ZlciIsInByaWNlIiwibWVtYmVyUHJpY2UiLCJvbGRwcmljZSIsInJlZHVjdGlvbiIsInNvdXJjZUlkIiwidmljZVRpdGxlIiwiZGVzY3JpcHQiLCJkZXNjIiwicHVzaCIsIm1pc3NUb2tlbiIsImNhdGNoIiwic3RvcFB1bGxEb3duUmVmcmVzaCIsImdldEJhbm5lciIsInNpdGVObyIsIkdldEJhbm5lciIsIm9iaiIsInNvcnRJZCIsInNvcnQiLCJkZXRhaWxJZCIsInVyaSIsInNwbGl0Iiwib2JqMSIsIm9iajIiLCJ2YWwxIiwidmFsMiIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxJOzs7Ozs7Ozs7Ozs7OztxTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0IsTUFEakI7QUFFUEMsNkJBQXVCLElBRmhCO0FBR1BDLHVCQUFpQjtBQUNmLG9CQUFZO0FBREc7QUFIVixLLFNBT1ZDLE8sR0FBVSxFQUFDLGlCQUFnQixFQUFDLE9BQU0sVUFBUCxFQUFrQixTQUFRLEVBQTFCLEVBQWpCLEUsU0FDYkMsTSxHQUFTLEVBQUMsWUFBVyxFQUFDLHlCQUF3QixFQUFDLFNBQVEsT0FBVCxFQUFpQixPQUFNLGVBQXZCLEVBQXVDLFFBQU8sTUFBOUMsRUFBcUQsU0FBUSxPQUE3RCxFQUFxRSxPQUFNLEtBQTNFLEVBQXpCLEVBQTJHLGNBQWEsRUFBQyxTQUFRLEVBQVQs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QUFDRCxlQUZNLE1BRUE7QUFDTCx1QkFBTyxDQUFQO0FBQ0Q7QUFDRixhQVZEO0FBV0QsV0FsQkQ7QUFtQkQsU0FyQkQsTUFxQk87QUFDTCxjQUFJMUMsTUFBTWhCLE9BQU4sQ0FBYzJDLFNBQWxCLEVBQTZCO0FBQzNCM0Isa0JBQU04QixTQUFOO0FBQ0Q7QUFDRjtBQUNEOUIsY0FBTXpDLFNBQU4sR0FBa0IsSUFBbEI7QUFDQXlDLGNBQU1iLE1BQU47QUFDRCxPQTlCRDtBQStCRDs7O3NDQUNrQm9CLEcsRUFBSztBQUN0QixhQUFPO0FBQ0xsRSxlQUFPLE1BREY7QUFFTDJFLGNBQU07QUFGRCxPQUFQO0FBSUQ7Ozs2QkFDUztBQUNSLFdBQUs1QyxRQUFMO0FBQ0EsV0FBSzBELFNBQUw7QUFDQSxXQUFLM0MsTUFBTDtBQUNEOzs7O0VBbFArQixlQUFLd0QsSTs7a0JBQWxCMUgsSSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBpbXBvcnQgU2VhcmNoIGZyb20gJy4uL2NvbXBvbmVudHMvc2VhcmNoYmFyJ1xuICBpbXBvcnQgR29vZHMgZnJvbSAnLi4vY29tcG9uZW50cy9nb29kcydcbiAgaW1wb3J0IExvYWRpbmcgZnJvbSAnLi4vY29tcG9uZW50cy9sb2FkaW5nJ1xuICBpbXBvcnQgRGVmZWN0IGZyb20gJy4uL2NvbXBvbmVudHMvZGVmZWN0J1xuICBpbXBvcnQgUmVhY2hkb3duIGZyb20gJy4uL2NvbXBvbmVudHMvcmVhY2hkb3duJ1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIE1haW4gZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmraPlloTniZvogoknLFxuICAgICAgZW5hYmxlUHVsbERvd25SZWZyZXNoOiB0cnVlLFxuICAgICAgdXNpbmdDb21wb25lbnRzOiB7XG4gICAgICAgICd3eGMtZmxleCc6ICcuLi8uLi9wYWNrYWdlcy9AbWludWkvd3hjLWZsZXgvZGlzdC9pbmRleCdcbiAgICAgIH1cbiAgICB9XG4gICAkcmVwZWF0ID0ge1widG9wbmF2aWdhdGlvblwiOntcImNvbVwiOlwicmVjR29vZHNcIixcInByb3BzXCI6XCJcIn19O1xyXG4kcHJvcHMgPSB7XCJyZWNHb29kc1wiOntcInYtYmluZDpnb29kc0l0ZW0uc3luY1wiOntcInZhbHVlXCI6XCJnb29kc1wiLFwiZm9yXCI6XCJ0b3BuYXZpZ2F0aW9uXCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwia2V5XCJ9LFwieG1sbnM6di1vblwiOntcInZhbHVlXCI6XCJcIixcImZvclwiOlwidG9wbmF2aWdhdGlvblwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImtleVwifX0sXCJzZWFyY2hiYXJcIjp7XCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOnBhZ2Vmcm9tLnN5bmNcIjpcInBhZ2VUaXRsZVwifSxcImRlZmVjdFwiOntcInR5cGVcIjpcIjFcIn0sXCJpc0Rvd25cIjp7fX07XHJcbiRldmVudHMgPSB7XCJyZWNHb29kc1wiOntcInYtb246Z29vZHNUYXBcIjpcImdvRGV0YWlsXCJ9fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgICByZWNHb29kczogR29vZHMsXG4gICAgICBob3RHb29kczogR29vZHMsXG4gICAgICBsb2FkOiBMb2FkaW5nLFxuICAgICAgc2VhcmNoYmFyOiBTZWFyY2gsXG4gICAgICBkZWZlY3Q6IERlZmVjdCxcbiAgICAgIGlzRG93bjogUmVhY2hkb3duXG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICB0b2tlbjogJycsXG4gICAgICBwYWdlVGl0bGU6ICdpbmRleCcsXG4gICAgICBiYW5uZXJMaW5rOiBbXSxcbiAgICAgIHRvcG5hdmlnYXRpb246IFt7XG4gICAgICAgIHRpdGxlOiAn5o6o6I2QJyxcbiAgICAgICAgaW1hZ2U6ICcuLi9pbWFnZS9ybWRfaWNvbi5wbmcnXG4gICAgICB9LCB7XG4gICAgICAgIHRpdGxlOiAn54Ot6ZeoJyxcbiAgICAgICAgaW1hZ2U6ICcuLi9pbWFnZS9ob3RfaWNvbi5wbmcnXG4gICAgICB9XSxcbiAgICAgIGN1cnJlbnRQYWdlOiAwLFxuICAgICAgcGFnZWF1dG86IGZhbHNlLFxuICAgICAgc3dpcGVyT3B0OiB7XG4gICAgICAgIGF1dG9wbGF5OiB0cnVlLFxuICAgICAgICBpbnRlcnZhbDogMzAwMCxcbiAgICAgICAgZHVyYXRpb246IDEwMDAsXG4gICAgICAgIGN1cnJlbnRUYWI6IDAsXG4gICAgICAgIGluZGljYXRvckRvdHM6IHRydWUsXG4gICAgICAgIGluZGljYXRvckNvbG9yOiAnI2NjY2NjYycsXG4gICAgICAgIGluZGljYXRvckFjdGl2ZTogJyNlYzNkM2EnLFxuICAgICAgICBjaXJjdWxhcjogdHJ1ZVxuICAgICAgfSxcbiAgICAgIGdvb2RzOiBbXSxcbiAgICAgIGxvYWRlZDogZmFsc2UsXG4gICAgICBwYWdlTnVtOiAxLFxuICAgICAgdG90YWxQYWdlTnVtOiAnJyxcbiAgICAgIGlzTnVsbDogdHJ1ZSxcbiAgICAgIGlzRG93bjogZmFsc2UsXG4gICAgICBpc0xvYWRpbmc6IGZhbHNlLFxuICAgICAgdXNlckxldmVsOiAwLFxuICAgICAgdmlwRW5kOiAnJyxcbiAgICAgIHZpcFJlZHVjdGlvbjogJycsXG4gICAgICBjYXRlZ29yeUltYWdlOiBbJy4uL2ltYWdlL3NwdGpfaW1nLnBuZycsICcuLi9pbWFnZS9ybXNwX2ltZy5wbmcnXSxcbiAgICAgIHNob3dQcm9tb3Q6IHRydWUsXG4gICAgICBuaWNrX25hbWU6ICcnLFxuICAgICAgYXZhdGFyOiAnJyxcbiAgICAgIGN1c3RvbWVyX2luZm9fc3RyOiAnJyxcbiAgICAgIG5vdGVfaW5mb19zdHI6ICcnXG4gICAgfVxuXG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIG5hdlRhYiAoaW5kZXgpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50UGFnZSA9IGluZGV4XG4gICAgICAgIHRoaXMuaW5pdFBhZ2UoKVxuICAgICAgfSxcbiAgICAgIGNoYW5nZVRhYiAoZSkge1xuICAgICAgICB0aGlzLmN1cnJlbnRQYWdlID0gZS5kZXRhaWwuY3VycmVudFxuICAgICAgfSxcbiAgICAgIGNoYW5nZUJhbm5lciAoZSkge1xuICAgICAgICBpZiAoZS5kZXRhaWwuc291cmNlID09PSAndG91Y2gnKSB7XG4gICAgICAgICAgdGhpcy5zd2lwZXJPcHQuY3VycmVudFRhYiA9IGUuZGV0YWlsLmN1cnJlbnRcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGdvRGV0YWlsIChpZCkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vZGV0YWlsP2lkPScgKyBpZFxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGdvQXBwbHlWaXAgKCkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vYXBwbHlWaXAnXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICAgIG9uU2hvdyAoKSB7XG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgIHRoaXMuJHBhcmVudC5nZXRVc2VyTGV2ZWwodGhpcy50b2tlbiwgKCkgPT4ge1xuICAgICAgICB0aGlzLmdldFVzZXJMZXZlbCgpXG4gICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIH0pXG4gICAgICB0aGlzLm5pY2tfbmFtZSA9IHRoaXMuJHBhcmVudC5nZXRVc2VyTmFtZSgpXG4gICAgICB0aGlzLmF2YXRhciA9IHRoaXMuJHBhcmVudC5nZXRVc2VyQXZhdGFyKClcbiAgICAgIHRoaXMuY3VzdG9tZXJfaW5mb19zdHIgPSB0aGlzLiRwYXJlbnQuZ2V0TWVzc2FnZSgpXG4gICAgICB0aGlzLm5vdGVfaW5mb19zdHIgPSB0aGlzLiRwYXJlbnQuZ2V0QnVzaW5lc3MoJ+mmlumhtScsIG51bGwsIG51bGwpXG4gICAgICAvLyB0aGlzLmN1cnJlbnRQYWdlID0gMFxuICAgICAgLy8gdGhpcy5pc0xvYWRpbmcgPSBmYWxzZVxuICAgIH1cbiAgICBnZXRVc2VyTGV2ZWwgKCkge1xuICAgICAgdGhpcy51c2VyTGV2ZWwgPSB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VyTGV2ZWxcbiAgICAgIHRoaXMudmlwUmVkdWN0aW9uID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuZXhwZWN0ZWRSZWR1Y3Rpb25cbiAgICAgIHRoaXMudmlwRW5kID0gdGhpcy4kcGFyZW50LmRhdGVGb3JtYXQodGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudmlwRW5kICogMTAwMCwgJ1nlubRt5pyIZOaXpScpXG4gICAgICB0aGlzLnNob3dQcm9tb3QgPSB0cnVlXG4gICAgfVxuICAgIG9uUmVhY2hCb3R0b20gKCkge1xuICAgICAgLy8g5pi+56S65Yqg6L2954q25oCBXG4gICAgICBpZiAodGhpcy5wYWdlTnVtIDwgdGhpcy50b3RhbFBhZ2VOdW0pIHtcbiAgICAgICAgLy8g5pi+56S65LiL5LiA6aG15pWw5o2uXG4gICAgICAgIHRoaXMucGFnZU51bSArK1xuICAgICAgICB0aGlzLmdldEluaXREYXRhKClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh0aGlzLmdvb2RzLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgIHRoaXMuaXNEb3duID0gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGdldEluaXREYXRhIChjYikge1xuICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICB0aGlzLiRwYXJlbnQuc2hvd0xvYWRpbmcoKVxuICAgICAgdGhpcy5pc0Rvd24gPSBmYWxzZVxuICAgICAgdmFyIHBhcmVudCA9IHRoaXMuJHBhcmVudFxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHBhZ2VOdW06IHRoaXMucGFnZU51bSxcbiAgICAgICAgcmVjb21tZW5kVHlwZTogdGhpcy5jdXJyZW50UGFnZSArIDEsXG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICBwYWdlU2l6ZTogJzUnXG4gICAgICB9XG4gICAgICBwYXJlbnQuSHR0cFJlcXVlc3QuSW5kZXhIdHRwKGRhdGEsICgpID0+IHtcbiAgICAgICAgX3RoaXMuJHBhcmVudC5oaWRlTG9hZGluZygpXG4gICAgICAgIC8vIF90aGlzLiRwYXJlbnQuc2hvd0ZhaWwoKVxuICAgICAgICBfdGhpcy5pc051bGwgPSB0cnVlXG4gICAgICB9KS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgaWYgKF90aGlzLnBhZ2VOdW0gPT09IDEpIHtcbiAgICAgICAgICBfdGhpcy5nb29kcyA9IFtdXG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICBfdGhpcy4kcGFyZW50LmhpZGVMb2FkaW5nKClcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgX3RoaXMudG90YWxQYWdlTnVtID0gcmVzLmRhdGEuZGF0YS50b3RhbFBhZ2VOdW1cbiAgICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhLmRhdGEuc3B1c1xuICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgX3RoaXMuaXNOdWxsID0gdHJ1ZVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfdGhpcy5pc051bGwgPSBmYWxzZVxuICAgICAgICAgICAgaWYgKHJlcy5kYXRhLmRhdGEudG90YWxDb3VudCA8PSB0aGlzLnBhZ2VTaXplKSB7XG4gICAgICAgICAgICAgIF90aGlzLmlzRG93biA9IHRydWVcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIF90aGlzLmlzRG93biA9IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGRhdGEuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIHZhciBnb29kID0ge31cbiAgICAgICAgICAgIGdvb2QucGF0aCA9IGl0ZW0uY292ZXJcbiAgICAgICAgICAgIGdvb2QudGl0bGUgPSBpdGVtLnRpdGxlXG4gICAgICAgICAgICBnb29kLnByaWNlID0gaXRlbS5tZW1iZXJQcmljZVxuICAgICAgICAgICAgZ29vZC5vbGRwcmljZSA9IGl0ZW0ucHJpY2VcbiAgICAgICAgICAgIGdvb2QucmVkdWN0aW9uID0gaXRlbS5yZWR1Y3Rpb25cbiAgICAgICAgICAgIGdvb2QuaWQgPSBpdGVtLnNvdXJjZUlkXG4gICAgICAgICAgICBnb29kLmRldGFpbCA9IGl0ZW0udmljZVRpdGxlXG4gICAgICAgICAgICBnb29kLmRlc2NyaXB0ID0gaXRlbS5kZXNjXG4gICAgICAgICAgICBfdGhpcy5nb29kcy5wdXNoKGdvb2QpXG4gICAgICAgICAgfSlcbiAgICAgICAgICBjYiAmJiBjYigpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgd2VweS5oaWRlTG9hZGluZygpXG4gICAgICAgICAgX3RoaXMuaXNOdWxsID0gdHJ1ZVxuICAgICAgICAgIGlmIChfdGhpcy4kcGFyZW50Lm1pc3NUb2tlbikge1xuICAgICAgICAgICAgX3RoaXMuaW5pdFBhZ2UoKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICBfdGhpcy4kcGFyZW50LmhpZGVMb2FkaW5nKClcbiAgICAgICAgLy8gX3RoaXMuJHBhcmVudC5zaG93RmFpbCgpXG4gICAgICAgIF90aGlzLmlzTnVsbCA9IHRydWVcbiAgICAgIH0pXG4gICAgfVxuICAgIGluaXRQYWdlICgpIHtcbiAgICAgIHRoaXMucGFnZU51bSA9IDFcbiAgICAgIHRoaXMuaXNOdWxsID0gZmFsc2VcbiAgICAgIHRoaXMuZ2V0SW5pdERhdGEoKCkgPT4ge1xuICAgICAgICB3ZXB5LnN0b3BQdWxsRG93blJlZnJlc2goKVxuICAgICAgfSlcbiAgICB9XG4gICAgb25QdWxsRG93blJlZnJlc2ggKCkge1xuICAgICAgdGhpcy5jdXJyZW50UGFnZSA9IDBcbiAgICAgIHRoaXMuZ2V0QmFubmVyKClcbiAgICAgIHRoaXMuJHBhcmVudC5nZXRVc2VyTGV2ZWwodGhpcy50b2tlbiwgKCkgPT4ge1xuICAgICAgICB0aGlzLmdldFVzZXJMZXZlbCgpXG4gICAgICB9KVxuICAgICAgdGhpcy5pbml0UGFnZSgpXG4gICAgfVxuICAgIGdldEJhbm5lciAoKSB7XG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgIHRoaXMuYmFubmVyTGluayA9IFtdXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgIHNpdGVObzogJ2luZGV4J1xuICAgICAgfVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkdldEJhbm5lcihkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgICBkYXRhLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHZhciBvYmogPSB7fVxuICAgICAgICAgICAgb2JqLnBhdGggPSBpdGVtLmltYWdlXG4gICAgICAgICAgICBvYmouaWQgPSBpdGVtLmlkXG4gICAgICAgICAgICBvYmouc29ydElkID0gaXRlbS5zb3J0XG4gICAgICAgICAgICBvYmouZGV0YWlsSWQgPSBpdGVtLnVyaS5zcGxpdCgnLCcpWzFdXG4gICAgICAgICAgICBfdGhpcy5iYW5uZXJMaW5rLnB1c2gob2JqKVxuICAgICAgICAgICAgX3RoaXMuYmFubmVyTGluay5zb3J0KChvYmoxLCBvYmoyKSA9PiB7XG4gICAgICAgICAgICAgIHZhciB2YWwxID0gb2JqMS5zb3J0SWRcbiAgICAgICAgICAgICAgdmFyIHZhbDIgPSBvYmoyLnNvcnRJZFxuICAgICAgICAgICAgICBpZiAodmFsMSA8IHZhbDIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gLTFcbiAgICAgICAgICAgICAgfSBlbHNlIGlmICh2YWwxID4gdmFsMikge1xuICAgICAgICAgICAgICAgIHJldHVybiAxXG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDBcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChfdGhpcy4kcGFyZW50Lm1pc3NUb2tlbikge1xuICAgICAgICAgICAgX3RoaXMuZ2V0QmFubmVyKClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuaXNMb2FkaW5nID0gdHJ1ZVxuICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgfSlcbiAgICB9XG4gICAgb25TaGFyZUFwcE1lc3NhZ2UgKHJlcykge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdGl0bGU6ICfmraPlloTniZvogoknLFxuICAgICAgICBwYXRoOiAnL3BhZ2VzL2xvZ2luJ1xuICAgICAgfVxuICAgIH1cbiAgICBvbkxvYWQgKCkge1xuICAgICAgdGhpcy5pbml0UGFnZSgpXG4gICAgICB0aGlzLmdldEJhbm5lcigpXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICB9XG4iXX0=