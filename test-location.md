# 定位功能测试说明

## 快速开始

### 1. 临时测试（无需API密钥）
如果你想先测试基本功能，可以暂时使用模拟数据：

在 `pages/index/index.js` 中临时替换 `getAddressFromLocation` 方法：

```javascript
// 临时测试用的模拟地址解析
getAddressFromLocation(latitude, longitude) {
  setTimeout(() => {
    // 根据经纬度模拟地址
    let address = '华南农业大学';
    let shortAddress = '华农';
    
    // 华农附近
    if (latitude > 23.15 && latitude < 23.17 && longitude > 113.35 && longitude < 113.37) {
      address = '华南农业大学';
      shortAddress = '华农';
    } 
    // 天河区
    else if (latitude > 23.1 && latitude < 23.2 && longitude > 113.3 && longitude < 113.4) {
      address = '广州市天河区';
      shortAddress = '天河区';
    }
    // 广州市
    else if (latitude > 23.0 && latitude < 23.3 && longitude > 113.2 && longitude < 113.5) {
      address = '广州市';
      shortAddress = '广州';
    }
    // 其他位置
    else {
      address = `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
      shortAddress = '已定位';
    }
    
    this.setData({
      'location.address': shortAddress,
      'location.fullAddress': address
    });
    
    wx.showToast({
      title: '定位成功',
      icon: 'success'
    });
  }, 1000);
}
```

### 2. 正式使用（需要API密钥）

#### 步骤1：申请腾讯地图API密钥
1. 访问 [腾讯地图开放平台](https://lbs.qq.com/)
2. 注册账号并完成实名认证
3. 创建应用，选择"微信小程序"类型
4. 申请"逆地理编码"服务
5. 获取API密钥

#### 步骤2：配置密钥
编辑 `config/api.js` 文件：
```javascript
const config = {
  TENCENT_MAP_KEY: '你的实际API密钥', // 替换这里
  // ... 其他配置保持不变
};
```

#### 步骤3：配置小程序后台
在微信小程序后台添加服务器域名：
- `https://apis.map.qq.com`

## 测试流程

### 1. 基础测试
1. 打开小程序
2. 点击顶部的定位按钮（重新定位图标）
3. 授权定位权限
4. 观察地址显示变化：
   - 点击前：显示"未定位"
   - 点击后：显示"定位中..."
   - 定位成功：显示具体地址

### 2. 功能验证
- **权限处理**：首次使用会弹出授权请求
- **错误处理**：拒绝授权会引导用户去设置
- **地址解析**：成功后显示具体位置信息
- **用户体验**：有加载提示和成功提示

### 3. 调试信息
打开开发者工具控制台，查看以下日志：
- `定位信息:` - 显示获取到的经纬度
- `地址解析结果:` - 显示API返回的详细信息

## 预期效果

### 地址显示优先级
1. **POI名称**：如"华南农业大学"、"天河城"
2. **推荐地址**：如"五山路483号华南农业大学"
3. **粗略地址**：如"华南农业大学附近"
4. **区域地址**：如"天河区五山路"

### 界面显示
- 定位前：`🗺️ 未定位`
- 定位中：`🗺️ 定位中...`
- 定位后：`🗺️ 华南农业大学`

## 常见问题

### 1. 定位失败
- 检查手机GPS是否开启
- 确认已授权定位权限
- 在真机上测试（开发者工具定位不准确）

### 2. 地址解析失败
- 检查API密钥是否正确
- 确认服务器域名已配置
- 查看网络连接是否正常

### 3. 显示"定位成功"而非具体地址
- 这是备用显示，表示定位成功但地址解析失败
- 检查API配置和网络连接

## 进阶功能

### 1. 添加长按显示完整地址
在 `index.wxml` 中：
```xml
<view class="location" bindtap="getLocation" bindlongpress="showFullAddress">
  <image src="/images/Repositioning (重新定位).png" class="location-icon"></image>
  <text>{{location ? location.address : '未定位'}}</text>
</view>
```

在 `index.js` 中添加：
```javascript
showFullAddress() {
  if (this.data.location && this.data.location.fullAddress) {
    wx.showModal({
      title: '完整地址',
      content: this.data.location.fullAddress,
      showCancel: false
    });
  }
}
```

### 2. 自动定位
在 `onLoad` 中添加：
```javascript
onLoad() {
  // 页面加载时自动定位
  this.getLocation();
}
```

这样就完成了精确的地址解析功能！ 