# 🍚米饭的导航 

> 一个简洁美观的个人导航网站，支持分类管理和自定义收藏夹
## 项目介绍
基于 Vue 3 + Vite 构建，加载速度极快
简洁美观的界面，支持响应式布局
支持自定义分类和网站管理
支持 Cloudflare Pages 免费部署
支持 Cloudflare Pages 免费部署
## 快速开始
### 部署到 Cloudflare（推荐）

**1. Fork 本项目**
- 点击页面右上角的 **"Fork"** 按钮
- 将项目 Fork 到你的 GitHub 账号下

**2. 在 Cloudflare Pages 控制台部署**
1. 访问 [Cloudflare Dashboard](https://dash.cloudflare.com)
2. 注册/登录 Cloudflare 账号（免费）
3. 点击左侧菜单 **"Workers & Pages"**
4. 点击 **"Create application"** → **"Pages"** → **"Connect to Git"**
5. 授权 GitHub 并选择你 Fork 的 `mifan_nav123` 仓库
6. 配置构建设置：
   - **Framework preset**: `Vue`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
7.（可选）在 **Environment Variables** 里添加你的环境变量（如需用到管理员功能）
8. 点击 **"Save and Deploy"**

✅ **完成！** 几分钟后你就有了自己的导航网站，每次修改代码都会自动重新部署。

**3. 自定义你的导航**
- 编辑 `src/mock/mock_data.js` 文件，添加你自己的网站分类和链接
- 提交更改，Cloudflare 会自动重新部署

**4. 绑定自定义域名（可选）**
- 在 Cloudflare Pages 项目设置中点击 **"Custom domains"**
- 添加你的域名并按提示配置 DNS
### 项目结构

```
mao_nav/
├── src/
│   ├── apis/           # API 接口
│   ├── assets/         # 静态资源（图片、样式等）
│   ├── components/     # Vue 组件
│   ├── mock/          # 模拟数据
│   ├── router/        # 路由配置
│   ├── stores/        # Pinia 状态管理
│   ├── views/         # 页面组件
│   ├── App.vue        # 根组件
│   └── main.js        # 入口文件
├── public/            # 公共静态文件
├── index.html         # HTML 模板
├── package.json       # 项目配置
├── vite.config.js     # Vite 配置
└── wrangler.toml      # Cloudflare 部署配置
```

