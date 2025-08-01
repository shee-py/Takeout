# Takeout

微信小程序外卖系统：模拟美团拼好饭（WeChat Mini Program Takeout System: Meituan Group Meal Simulation）

## 项目介绍 (Project Introduction)

Takeout 是一个基于微信小程序的外卖系统，模拟美团拼好饭的功能。该项目允许用户浏览附近的餐厅、查看菜单、下单和拼团。

## 功能特点 (Features)

- 基于位置的餐厅推荐
- 用户登录和个人中心
- 餐厅菜单浏览
- 拼团功能
- 订单管理

## 技术栈 (Tech Stack)

- 微信小程序框架
- 腾讯地图 API（用于位置服务）

## 安装与配置 (Installation & Configuration)

### 前提条件 (Prerequisites)

- 微信开发者工具
- 腾讯地图 API 密钥

### 配置步骤 (Setup Steps)

1. 克隆本仓库
2. 在微信开发者工具中导入项目
3. 配置腾讯地图 API（详见 [位置服务配置说明](docs/location-setup.md)）
4. 在 [`config/api.js`](config/api.js) 中更新 API 密钥

## 项目结构 (Project Structure)

```
Takeout/
├── pages/             # 小程序页面
├── images/            # 图片资源
├── config/            # 配置文件
├── utils/             # 工具函数
└── docs/              # 文档
```

## 文档 (Documentation)

- [位置服务配置说明](docs/location-setup.md)

## 许可证 (License)

本项目使用 MIT 许可证 - 详情请查看 [LICENSE](LICENSE) 文件
