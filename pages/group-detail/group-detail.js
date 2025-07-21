// pages/group-detail/group-detail.js
Page({
    data: {
        // 商品基本信息
        goodsInfo: {
            name: '茉莉奶绿',
            shopName: '蜜雪冰城（高州水阳店）',
            shopAddress: '高州水阳店',
            originalPrice: '9.9',
            currentPrice: '4.9',
            subsidy: '4.9',
            soldCount: '1000+',
            mainImage: '/images/products/1.jpg',
            description: '新鲜茉莉花茶底，搭配香浓奶绿，口感清香甘甜',
            tags: ['热销', '好评如潮'],
            deliveryTime: '39分钟送达',
            distance: '1.3km',
            deliveryFee: '0',
            rating: '4.9',
            ratingCount: '97%',
            shopRating: '4.9',
            isChain: true
        },

        // 拼单信息
        groupInfo: {
            totalNeeded: 3,
            currentCount: 2,
            remaining: 1,
            timeLeft: '23:59',
            isAlmostFull: true,
            participantCount: '1000+'
        },

        // 推荐商品
        recommendList: [
            {
                name: '茶马古韵（中杯）',
                price: '6.4',
                originalPrice: '10.4',
                image: '/images/products/1.jpg',
                tag: '送雪'
            },
            {
                name: '清香茉莉珍珠奶茶700ml',
                price: '6.1',
                originalPrice: '10.1',
                image: '/images/products/2.jpg',
                tag: '超值补贴'
            },
            {
                name: '西瓜椰椰中杯',
                price: '6.97',
                originalPrice: '12.97',
                image: '/images/products/1.jpg',
                tag: '送雪'
            }
        ],

        // 用户评价
        reviewInfo: {
            totalCount: 193,
            goodCount: 148,
            avgRating: '4.9',
            goodRate: '97%',
            tags: ['清爽(193)', '回头客(148)', '价格实惠']
        },

        // 拼单参与者信息
        participants: [
            {
                avatar: '/images/Avatar (头像).png',
                nickname: 'SiberiaDante',
                joinTime: '06:07',
                daysBefore: '7',
                isGroupLeader: true
            }
        ],

        // AI总结评价
        aiSummary: 'AI总结近期3条真实评价生成',

        // 商家信息
        shopInfo: {
            name: '蜜雪冰城（高州水阳店）',
            isOfficial: true,
            rating: '4.9',
            monthlyOrders: '1000+',
            deliveryTime: '39分钟',
            distance: '1.1km'
        }
    },

    onLoad(options) {
        // 接收传递的商品信息
        if (options.shopName) {
            this.setData({
                'goodsInfo.shopName': decodeURIComponent(options.shopName)
            });
        }
        if (options.productName) {
            this.setData({
                'goodsInfo.name': decodeURIComponent(options.productName)
            });
        }
    },

      // 返回上一页
  goBack() {
    wx.navigateBack();
  },

    // 立即拼团
    joinGroup() {
        wx.showModal({
            title: '确认拼团',
            content: '确认以¥4.9的价格参与拼团吗？',
            confirmText: '立即拼团',
            success: (res) => {
                if (res.confirm) {
                    wx.showToast({
                        title: '拼团成功！',
                        icon: 'success'
                    });
                    // 这里可以跳转到支付页面或订单页面
                    setTimeout(() => {
                        wx.navigateBack();
                    }, 1500);
                }
            }
        });
    },

    // 发起拼团
    startGroup() {
        this.joinGroup();
    },

    // 查看商品详情图片
    previewImage() {
        wx.previewImage({
            urls: [this.data.goodsInfo.mainImage]
        });
    }
}); 