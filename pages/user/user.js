// pages/user/user.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({
    data: {
        userInfo: {
            avatarUrl: defaultAvatarUrl,
            nickName: '微信用户',
        },
        hasUserInfo: false,
    },

    onChooseAvatar(e) {
        const { avatarUrl } = e.detail;
        this.setData({
            'userInfo.avatarUrl': avatarUrl,
            hasUserInfo: true, // 只要选择了头像，就认为有了用户信息
        });
    },

    onInputChange(e) {
        const nickName = e.detail.value;
        // 如果用户没输入昵称，给一个默认值
        if (!nickName) {
            this.setData({
                'userInfo.nickName': '微信用户'
            });
            return;
        }
        this.setData({
            'userInfo.nickName': nickName,
        });
    },

    // 这里可以添加一个“保存”按钮的事件，将用户信息上传到服务器
    // 现在的保存就是假的，只是为了测试
    saveUserProfile() {
        if (this.data.hasUserInfo) {
            wx.showLoading({ title: '保存中...' });

            // 模拟网络请求
            setTimeout(() => {
                wx.hideLoading();
                wx.showToast({
                    title: '保存成功',
                    icon: 'success'
                });
                console.log('将要保存的用户信息:', this.data.userInfo);
                // 在这里调用 wx.request 将 this.data.userInfo 发送到你的后端服务器
            }, 1000);
        } else {
            wx.showToast({
                title: '请先选择头像',
                icon: 'none'
            });
        }
    }
}) 