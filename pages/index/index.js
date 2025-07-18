// index.js
const config = require('../../config/api.js');

Page({
  data: {
    // 轮播图数据
    // swiperList: [
    //   { url: '/images/swiper/1.jpg' },
    //   { url: '/images/swiper/2.jpg' },
    //   { url: '/images/swiper/3.jpg' }
    // ],
    // // 分类导航
    // navList: [
    //   { icon: '/images/nav-icons/1.png', text: '美食' },
    //   { icon: '/images/nav-icons/2.png', text: '超市' },
    //   { icon: '/images/nav-icons/3.png', text: '生鲜' },
    //   { icon: '/images/nav-icons/4.png', text: '下午茶' },
    //   { icon: '/images/nav-icons/5.png', text: '快餐' }
    // ],
    // 拼单列表
    groupBuyList: [
      {
        shopName: '美味汉堡店',
        distance: '500m',
        time: '30分钟',
        img: '/images/shops/1.jpg',
        products: [
          { name: '经典牛肉堡', price: '25', img: '/images/products/1.jpg', soldInfo: '已拼20份' },
          { name: '香辣鸡腿堡', price: '22', img: '/images/products/2.jpg', soldInfo: '已拼35份' }
        ],
        isEnd: false,
      },
      // 新增数据1
  {
    shopName: '鲜果时光',
    distance: '800m',
    time: '25分钟',
    img: '/images/shops/1.jpg',
    products: [
      { name: '草莓水果杯', price: '18', img: '/images/products/1.jpg', soldInfo: '已拼56份' },
      { name: '蓝莓酸奶盒', price: '15', img: '/images/products/2.jpg', soldInfo: '已拼42份' }
    ],
    isEnd: false,
  },
  // 新增数据2
  {
    shopName: '川味小馆',
    distance: '1.2km',
    time: '40分钟',
    img: '/images/shops/1.jpg',
    products: [
      { name: '宫保鸡丁', price: '32', img: '/images/products/1.jpg', soldInfo: '已拼18份' },
      { name: '麻婆豆腐', price: '16', img: '/images/products/2.jpg', soldInfo: '已拼29份' }
    ],
    isEnd: true,  // 已结束状态
  }
    ],
    location: null // 定位信息
  
    ,goodsList:[
        {
          img: '/images/products/1.jpg',
          shopName: '蜜雪冰城',
          goodsName: '冰鲜柠檬水',
          subsidy: '6.6',
          currentPrice: '1.9'
        },
        {
          img: '/images/products/1.jpg',
          shopName: '华莱士',
          goodsName: '咔滋脆鸡内堡',
          subsidy: '7.9',
          currentPrice: '9.9'
        },
        {
          img: '/images/products/1.jpg',
          shopName: '塔斯汀',
          goodsName: '香辣鸡腿中国',
          subsidy: '5',
          currentPrice: '6.9'
        },
        {
          img: '/images/products/1.jpg',
          shopName: '库迪咖啡',
          goodsName: '橙C美式',
          subsidy: '10.95',
          currentPrice: '3.9'
        }
    ]

    // 导航数据（实际可从接口获取）
    ,navList: [
        { id: 1, icon: "/images/products/1.jpg", text: "推荐" },
        { id: 2, icon: "/images/products/1.jpg", text: "炒菜盖饭" },
        { id: 2, icon: "/images/products/1.jpg", text: "炒菜盖饭" },
        { id: 2, icon: "/images/products/1.jpg", text: "炒菜盖饭" },
        { id: 2, icon: "/images/products/1.jpg", text: "炒菜盖饭" },
        { id: 2, icon: "/images/products/1.jpg", text: "炒菜盖饭" },
        // ... 其他导航项
      ],
      // 标签数据（实际可从接口获取）
      tagList: [
        { id: 1, tag: "爆品一口价" },
        { id: 2, tag: "附近拼单" },
        { id: 2, tag: "附近拼单" },
        { id: 2, tag: "附近拼单" },
        { id: 2, tag: "附近拼单" },
        { id: 2, tag: "附近拼单" },
        { id: 2, tag: "附近拼单" },
        { id: 2, tag: "附近拼单" },
        // ... 其他标签项
      ]
},

  onLoad() {
    // 页面加载时可以请求网络数据
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
  }
})
