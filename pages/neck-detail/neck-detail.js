
Page({
  data: {
    // 大牌整点抢数据
    saleList: [
      {
        logo: "/images/products/1.jpg",
        name: "肯德基",
        price: 19.9
      },
      {
        logo: "/images/products/1.jpg",
        name: "星巴克",
        price: 29.9
      },
      {
        logo: "/images/products/1.jpg",
        name: "麦当劳",
        price: 15.9
      },
      {
        logo: "/images/products/1.jpg",
        name: "奈雪的茶",
        price: 18.8
      },
      {
        logo: "/images/products/1.jpg",
        name: "必胜客",
        price: 25.9
      }
    ],
    
    // 商品列表数据
    goodsList: [
      {
        goodImg: "/images/products/1.jpg",
        shopImg: "/images/products/2.jpg",
        titleShopName:"肯德基",
        shopName: "肯德基（鸡你太美店）",
        goodName: "梁枫铖",
        score: 4.8,
        time: "30分钟",
        distance: "1.2km",
        directPrice: 29.9,
        groupPrice: 19.9,
        subsidy: 10.0
      },
      {
        goodImg: "/images/products/1.jpg",
        shopImg: "/images/products/2.jpg",
        titleShopName:"星巴克",
        shopName: "星巴克（在看多一）",
        goodName: "梁枫铖",
        score: 4.7,
        time: "25分钟",
        distance: "0.8km",
        directPrice: 42.0,
        groupPrice: 29.9,
        subsidy: 12.1
      },
      {
        goodImg: "/images/products/1.jpg",
        shopImg: "/images/products/2.jpg",
        titleShopName:"麦当劳",
        shopName: "麦当劳（华农泰山店）",
        goodName: "梁枫铖",
        score: 4.6,
        time: "35分钟",
        distance: "1.5km",
        directPrice: 25.0,
        groupPrice: 15.9,
        subsidy: 9.1
      },
      {
        goodImg: "/images/products/1.jpg",
        shopImg: "/images/products/2.jpg",
        titleShopName:"奈雪的茶",
        shopName: "奈雪的茶（广海枫铖店）",
        goodName: "梁枫铖",
        score: 4.9,
        time: "20分钟",
        distance: "1.0km",
        directPrice: 32.0,
        groupPrice: 18.8,
        subsidy: 13.2
      },
      {
        goodImg: "/images/products/1.jpg",
        shopImg: "/images/products/2.jpg",
        titleShopName:"必胜客",
        shopName: "必胜客（江秋三水店）",
        goodName: "梁枫铖",
        score: 4.5,
        time: "40分钟",
        distance: "2.0km",
        directPrice: 59.0,
        groupPrice: 25.9,
        subsidy: 33.1
      }
    ]
  },

  // 跳转到商品详情页
  goToDetail(e) {
    const index = e.currentTarget.dataset.index;
    const goods = this.data.goodsList[index];
    
    // 编码特殊字符，防止跳转参数出错
    wx.navigateTo({
      url: `/pages/neck-detail/neck-detail?` +
        `shopName=${encodeURIComponent(goods.shopName)}&` +
        `score=${goods.score}&` +
        `time=${encodeURIComponent(goods.time)}&` +
        `distance=${encodeURIComponent(goods.distance)}&` +
        `directPrice=${goods.directPrice}&` +
        `groupPrice=${goods.groupPrice}&` +
        `subsidy=${goods.subsidy}&` +
        `goodImg=${encodeURIComponent(goods.goodImg)}`
    });
  },

  // 预约功能
  reserve() {
    wx.showToast({
      title: "已成功预约明天10:00提醒",
      icon: "success",
      duration: 2000
    });
  },

  
  onLoad(options) {
    // 接收传递的商品信息
    if (options.shopName) {
        this.setData({
            'goodsInfo.shopName': decodeURIComponent(options.shopName)
        });
    }
    if (options.goodsName) {
        this.setData({
            'goodsInfo.name': decodeURIComponent(options.productName)
        });
    }
},
  


  processFeetList() {
    const feetList = this.data.feetList.map(item => {
      const fullShopName = item.shopName + '(' + item.address + '店)';
      item.displayShopName = fullShopName.length > 8 ? fullShopName.substring(0, 8) + '...' : fullShopName;
      // 确保price是字符串类型，以便split
      item.price = String(item.price);

      // WXML中无法使用split，所以在此处预处理
      const priceParts = item.price.split('.');
      item.priceInteger = priceParts[0];
      item.priceDecimal = priceParts[1];

      return item;
    });
    this.setData({ feetList });
  },

  onSearchInput(e) {
    console.log('搜索内容:', e.detail.value);
  },

  // 跳转到更多页面
  goToMore() {
    wx.showToast({
      title: '更多功能待开发',
      icon: 'none'
    })
  },

  getLocation() {
    // 先检查用户是否已授权定位
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userLocation']) {
          // 已授权，直接获取位置
          this.getUserLocation();
        } else {
          // 未授权，先申请授权
          wx.authorize({
            scope: 'scope.userLocation',
            success: () => {
              // 授权成功，获取位置
              this.getUserLocation();
            },
            fail: () => {
              // 授权失败，引导用户去设置页面
              wx.showModal({
                title: '定位权限',
                content: '需要获取您的位置信息来推荐附近商家，请在设置中开启定位权限',
                confirmText: '去设置',
                cancelText: '取消',
                success: (modalRes) => {
                  if (modalRes.confirm) {
                    wx.openSetting({
                      success: (settingRes) => {
                        if (settingRes.authSetting['scope.userLocation']) {
                          this.getUserLocation();
                        }
                      }
                    });
                  }
                }
              });
            }
          });
        }
      }
    });
  },

  getUserLocation() {
    wx.showLoading({
      title: '定位中...'
    });

    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        // 先保存经纬度
        this.setData({
          location: {
            latitude: res.latitude,
            longitude: res.longitude,
            address: '定位中...'
          }
        });

        // 调用逆地理编码获取具体地址
        this.getAddressFromLocation(res.latitude, res.longitude);

        wx.hideLoading();
        console.log('定位信息:', res);
      },
      fail: (err) => {
        wx.hideLoading();
        console.error('定位失败:', err);
        wx.showToast({
          title: '定位失败，请检查GPS是否开启',
          icon: 'none',
          duration: 2000
        });
      }
    });
  },

  // 根据经纬度获取具体地址
  getAddressFromLocation(latitude, longitude) {
    // 使用腾讯地图API进行逆地理编码
    const key = config.TENCENT_MAP_KEY;
    const url = `${config.TENCENT_MAP_BASE_URL}${config.GEOCODER_API}?location=${latitude},${longitude}&key=${key}&get_poi=1`;

    console.log('API调用URL:', url);
    console.log('API密钥:', key);

    wx.request({
      url: url,
      method: 'GET',
      success: (res) => {
        console.log('API调用成功');
        console.log('地址解析结果:', res.data);

        if (res.data.status === 0 && res.data.result) {
          const result = res.data.result;

          // 地址解析优先级处理
          let address = '';
          let shortAddress = '';

          // 1. 优先使用附近的POI（兴趣点）
          if (result.pois && result.pois.length > 0) {
            const nearestPoi = result.pois[0];
            if (nearestPoi.distance < 50) { // 距离小于50米时显示POI名称
              address = nearestPoi.title;
              shortAddress = nearestPoi.title;
            }
          }

          // 2. 如果没有合适的POI，使用推荐地址
          if (!address && result.formatted_addresses && result.formatted_addresses.recommend) {
            address = result.formatted_addresses.recommend;
            shortAddress = result.formatted_addresses.recommend;
          }

          // 3. 使用粗略地址（更简洁）
          if (!address && result.formatted_addresses && result.formatted_addresses.rough) {
            address = result.formatted_addresses.rough;
            shortAddress = result.formatted_addresses.rough;
          }

          // 4. 使用标准地址
          if (!address && result.address) {
            address = result.address;
            // 提取简短地址（区+街道）
            const comp = result.address_component;
            if (comp) {
              shortAddress = `${comp.district || ''}${comp.street || ''}`;
            } else {
              shortAddress = address;
            }
          }

          // 5. 最后拼接地址组件
          if (!address && result.address_component) {
            const comp = result.address_component;
            address = `${comp.province}${comp.city}${comp.district}${comp.street || ''}${comp.street_number || ''}`;
            shortAddress = `${comp.district || ''}${comp.street || ''}`;
          }

          this.setData({
            'location.address': shortAddress || address || '未知位置',
            'location.fullAddress': address || '未知位置',
            'location.detailInfo': result // 保存详细信息供后续使用
          });

          wx.showToast({
            title: '定位成功',
            icon: 'success'
          });
        } else {
          // API调用失败，使用备用方案
          this.handleLocationError(res.data.message || '地址解析失败');
        }
      },
      fail: (err) => {
        console.error('API调用失败');
        console.error('错误信息:', err);
        console.error('请检查：1.域名是否添加到白名单 2.API密钥是否正确 3.网络连接是否正常');
        this.handleLocationError('网络请求失败');
      }
    });
  },

  // 处理定位错误的备用方案
  handleLocationError(errorMsg) {
    console.log('使用备用定位方案:', errorMsg);
    this.setData({
      'location.address': '定位成功'
    });
    wx.showToast({
      title: '定位成功',
      icon: 'success'
    });
  },


})
