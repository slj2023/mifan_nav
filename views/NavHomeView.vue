<template>
  <div  class="nav-home">
    <!-- 左侧边栏 -->
    <aside class="sidebar">
      <!-- Logo区域 -->
       <!-- <button  @click="toadmin" class="logo-btn"
       title="点击进入管理页面"> -->
       <span @click="toadmin" class="logo-btn"
       title="点击进入管理页面">
      <div class="logo-section">
        <img src="/logo.png" alt="logo" class="logo" />
        <h1 class="site-title">{{ title || '米饭的导航' }}</h1>
      </div>
    </span>
      <!-- </button> -->
      <!-- 分类导航 -->
      <nav class="category-nav">
        <h2 class="nav-title">分类导航</h2>
                <ul class="category-list">
          <li
            v-for="category in categories"
            :key="category.id"
            class="category-item"
            @click="scrollToCategory(category.id)"
          >
            <span class="category-icon">{{ category.icon }}</span>
            <span class="category-name">{{ category.name }}</span>
          </li>
        </ul>
      </nav>

      <!-- 左侧边栏底部信息 -->
      <div class="sidebar-footer">
        <a
          href="https://github.com/slj2023/mifan_nav"
          target="_blank"
          rel="noopener noreferrer"
          class="github-link"
          title="查看源代码"
        >
          <svg width="80" height="80" viewBox="0 0 200 200" style="transform: translateY(-15px);" fill="#FFA500" xmlns="http://www.w3.org/2000/svg">
            <path d="M40 120 Q100 180 160 120 L150 120 Q150 150 100 160 Q50 150 50 120 Z M50 120 Q40 80 70 70 Q80 50 100 55 Q120 50 130 70 Q160 80 150 120 Z M80 85 l5 5 M95 75 l5 5 M110 90 l5 5 M100 100 l5 5 M120 80 l5 5" stroke="currentColor" stroke-width="3"/>
          </svg>
          <span>一个简洁美观的个人导航网站，支持分类管理和自定义收藏夹</span>
        </a>
      </div>
    </aside>

    <!-- 右侧主内容区 -->
    <main class="main-content">
                  <!-- 顶部搜索栏 -->
      <header class="search-header">
        <div class="search-container">
          <div class="search-engine-selector">
            <img :src="searchEngines[selectedEngine].icon" :alt="selectedEngine" class="engine-logo" />
            <select v-model="selectedEngine" class="engine-select">
              <option value="google">Google</option>
              <option value="baidu">百度</option>
              <option value="bing">Bing</option>
              <option value="duckduckgo">DuckDuckGo</option>
            </select>
          </div>
          <input
            type="text"
            v-model="searchQuery"
            :placeholder="searchEngines[selectedEngine].placeholder"
            class="search-input"
            @keyup.enter="handleSearch"
          />
        </div>
   </header>
      <!-- 导航内容区 -->
      <div class="content-area">
        <!-- 加载状态 -->
        <div v-if="loading" class="loading">
          <div class="loading-spinner"></div>
          <p>加载中...</p>
        </div>

        <!-- 错误状态 -->
        <div v-else-if="error" class="error">
          <p>{{ error }}</p>
          <button @click="fetchCategories" class="retry-btn">重试</button>
        </div>

        <!-- 分类内容 -->
        <div v-else class="categories-container">
          <AiBot/>
          <section
            v-for="category in categories"
            :key="category.id"
            class="category-section"
            :id="`category-${category.id}`"
         >  <!-- 分类标题。 使用:id 属性，将分类标题的 id 设置为 category-${category.id}
            在scrollToCategory 函数中，通过这个 ID 实现分类项的滚动定位。 -->
            <h2 class="category-title">
              <span class="category-icon">{{ category.icon }}</span>
              <span class="category-name">{{ category.name }}</span>
            </h2>
            <div class="sites-grid">
              <a
                v-for="site in category.sites"
                :key="site.id"
                :href="site.url"
                target="_blank"
                rel="noopener noreferrer"
                class="site-card"
              >
                <div class="site-icon">
                  <img :src="site.icon" :alt="site.name" @error="handleImageError" />
                </div>
                <div class="site-info">
                  <h3 class="site-name">{{ site.name }}</h3>
                  <p class="site-description">{{ site.description }}</p>
                </div>
              </a>
            </div>
          </section>

          <!-- 页面底部信息 -->
          <footer class="page-footer" >
            <div class="footer-content">
              <div class="footer-info">
                <h3>{{ title || '米饭的导航' }}</h3>
                <p>一个简洁、美观的导航网站，收录优质网站资源</p>
              </div>
            </div>
            <div class="footer-bottom">
              <p>&copy; {{ new Date().getFullYear() }} 米饭的导航 - 由 狂炫一碗大🍚 用 ❤️ 制作</p>
              <p class="footer-tech">基于 Vue.js 构建 </p>
            </div>
          </footer>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useNavigation } from '@/apis/useNavigation.js'
import AiBot from '@/components/aibot/AiBot.vue'
// 导入搜索引擎logo图片
import { useRouter } from 'vue-router'
import googleLogo from '@/assets/goolge.png'
import baiduLogo from '@/assets/baidu.png'
import bingLogo from '@/assets/bing.png'
import duckLogo from '@/assets/duck.png'
// 使用导航API
const { categories, title, loading, error, fetchCategories } = useNavigation()

// 响应式数据
const searchQuery = ref('') // 搜索查询
const selectedEngine = ref('bing') // 选中的搜索引擎
// 搜索引擎配置
const searchEngines = {
  google: {
    url: 'https://www.google.com/search?q=',
    icon: googleLogo,
    placeholder: 'Google 搜索'
  },
  baidu: {
    url: 'https://www.baidu.com/s?wd=',
    icon: baiduLogo,
    placeholder: '百度一下'
  },
  bing: {
    url: 'https://www.bing.com/search?q=',
    icon: bingLogo,
    placeholder: 'Bing (点logo切换搜索引擎)'
  },
  duckduckgo: {
    url: 'https://duckduckgo.com/?q=',
    icon: duckLogo,
    placeholder: 'DuckDuckGo 搜索'
  }
}
const router = useRouter()
const toadmin=()=>{
  router.push('/admin')

}
// 自定义固定时间滚动函数
const smoothScrollTo = (container, targetTop, duration = 600) => {
  const startTop = container.scrollTop
  const distance = targetTop - startTop
  let startTime = null

  const animateScroll = (currentTime) => {
    if (startTime === null) startTime = currentTime
    const timeElapsed = currentTime - startTime
    const progress = Math.min(timeElapsed / duration, 1)

    // 使用缓动函数 (easeInOutCubic)
    const ease = progress < 0.5
      ? 4 * progress * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 3) / 2

    container.scrollTop = startTop + distance * ease

    if (progress < 1) {
      requestAnimationFrame(animateScroll)
    }
  }

  requestAnimationFrame(animateScroll)
}

// 滚动到指定分类
const scrollToCategory = (categoryId) => {
  const element = document.getElementById(`category-${categoryId}`)
  const container = document.querySelector('.content-area')

  if (element && container) {
     //在容器内滚动
      const searchHeader = document.querySelector('.search-header')
      const elementOffsetTop = element.offsetTop
      const searchHeaderHeight = searchHeader ? searchHeader.offsetHeight + 20 : 100
      const targetTop = elementOffsetTop - searchHeaderHeight
    // 使用固定时间滚动（600毫秒）
    smoothScrollTo(container, Math.max(0, targetTop), 600)
  }
}

// 处理搜索
const handleSearch = () => {
  if (!searchQuery.value.trim()) return

  const engine = searchEngines[selectedEngine.value]
  const url = engine.url + encodeURIComponent(searchQuery.value)
  window.open(url, '_blank')
}

// 处理图片加载错误
const handleImageError = (event) => {
  // 设置默认的 logo.png 作为 fallback 图片
  event.target.src = '/logo.png'
  event.target.onerror = null // 防止无限循环
}
// 组件挂载时获取数据
onMounted(() => {
  fetchCategories()
})

// 组件卸载时清理样式
onUnmounted(() => {
  // 确保卸载时恢复body滚动
  document.body.style.overflow = ''
})
</script>

<style scoped>
.nav-home {
  display: flex;
  min-height: 100vh;/* 确保内容区域至少填充满视口高度 */
  background-color: #f5f7fa;
}

/* 左侧边栏样式 */
.sidebar {
  width: 280px;
  background-color: #2c3e50;
  color: white;
  padding: 0;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  height: 100vh;
  overflow: hidden;
  flex-shrink: 0;
}
.logo-btn{
  border: none;
  background: none;
  outline: none;
  width: 100%;
  padding: 0px;
  margin: 0;
  align-items: center;
}
.logo-section {
  display: flex;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transform: all 0.3s ease;
}
.logo-section:hover{
  background: rgba(255, 255, 255, 0.1);
  color: white;
  transform: translateY(-1px);
}
.logo {
  width: 55px;
  height: 55px;
  border-radius: 12px;
  margin-right: 15px;
}

.site-title {
  font-size: 24px;
  font-weight: 600;
  margin: 0;
  color: white;
}

.category-nav {
  padding: 20px 0;
  height: calc(100vh - 180px); /* 为底部留出空间 */
  overflow-y: auto;
}

.nav-title {
  font-size: 16px;
  font-weight: 600;
  margin: 0 20px 15px;
  color: #bdc3c7;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.category-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.category-item {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.category-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
  box-shadow: inset 4px 0 0 #3498db;
}

.category-icon {
  font-size: 18px;
  margin-right: 12px;
  width: 20px;
  text-align: center;
}

.category-name {
  font-size: 15px;
  font-weight: 500;
}

/* 左侧边栏底部 */
.sidebar-footer {
  display: flex;
  padding: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: auto;
}

.github-link {
  display: flex;
  align-items: center;
  color: #bdc3c7;
  text-decoration: none;
  padding: 8px 12px;
  border-radius: 6px;
  transition: all 0.3s ease;
  font-size: 14px;
}

.github-link:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  transform: translateY(-1px);
}

.github-link svg {
  margin-right: 8px;
  transition: transform 0.3s ease;
}

.github-link:hover svg {
  transform: scale(1.1);
}

/* 右侧主内容区样式 */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100vh;/* 确保内容区域至少填充满视口高度 */
  overflow: hidden;/* 隐藏滚动条 */
}

.search-header {
  background: white;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 100;/* 确保搜索栏在顶部 */
  display: flex;
  align-items: center;
  gap: 15px;
}

.search-container {
  display: flex;
  max-width: 600px;
  margin: 0 auto;
  gap: 0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  flex: 1;
}

@media (max-width: 768px) {
  .search-container {
    margin: 0;
    max-width: none;
  }
}

.search-engine-selector {
  position: relative;
  display: flex;
  align-items: center;
  background: #f8f9fa;
  border-right: 1px solid #e9ecef;
  transition: background-color 0.2s ease;
}

.search-engine-selector:hover {
  background: #e9ecef;
}

.engine-logo {
  width: 24px;
  height: 24px;
  margin: 8px;
  object-fit: contain;
  pointer-events: none;
  border-radius: 4px;
}

.engine-select {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  border: none;
  outline: none;
  background: transparent;
}

.search-input {
  flex: 1;
  border: none;
  padding: 12px 16px;
  font-size: 16px;
  outline: none;
  background: white;
}

.search-input::placeholder {
  color: #95a5a6;
}
.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}
.header-github-icon {
  width: 30px;
  height: 30px;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.3s ease;
  opacity: 0.8;
}

.header-github-icon:hover {
  opacity: 1;
  transform: scale(1.1);
}

.close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: background-color 0.2s ease;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}
/* 内容区域样式 */
.content-area {
  flex: 1;
  padding: 30px;
  padding-bottom: 30px;
  overflow-y: auto;
}

.loading, .error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  color: #7f8c8d;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #ecf0f1;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.retry-btn {
  margin-top: 10px;
  padding: 8px 16px;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.categories-container {
  max-width: 1200px;
  margin: 0 auto;
}

.category-section {
  margin-bottom: 50px;
}

.category-title {
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 25px;
  color: #2c3e50;
  display: flex;
  align-items: center;
}

.category-title .category-icon {
  font-size: 32px;
  margin-right: 16px;
}

.category-title .category-name {
  margin-left: 10px;
  font-size: 26px;
}

.sites-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.site-card {
  display: flex;
  align-items: center;
  background: white;
  border-radius: 12px;
  padding: 20px;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  border: 1px solid #e9ecef;
  position: relative;
  overflow: hidden;
}

.site-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(52, 152, 219, 0.1), rgba(155, 89, 182, 0.1));
  opacity: 0;
  transition: opacity 0.3s ease;
}

.site-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.site-card:hover::before {
  opacity: 1;
}

.site-icon {
  width: 48px;
  height: 48px;
  margin-right: 16px;
  border-radius: 8px;
  /* overflow: hidden; */
  background: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
}

.site-icon img {
  width: 32px;
  height: 32px;
  object-fit: contain;
}

.site-info {
  flex: 1;
  position: relative;
  z-index: 1;
}

.site-name {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 5px 0;
  color: #2c3e50;
}

.site-description {
  font-size: 14px;
  color: #7f8c8d;
  margin: 0;
  line-height: 1.4;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 页面底部 */
.page-footer {
  margin-top: 60px;
  padding: 40px 0;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 12px;
  border-top: 3px solid #3498db;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 30px;
  gap: 30px;
}

.footer-info h3 {
  color: #2c3e50;
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 8px 0;
}

.footer-info p {
  color: #7f8c8d;
  font-size: 14px;
  margin: 0;
  line-height: 1.5;
}

.footer-links {
  display: flex;
  gap: 15px;
}

.footer-link {
  display: flex;
  align-items: center;
  color: #3498db;
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 20px;
  background: white;
  border: 1px solid #e9ecef;
  transition: all 0.3s ease;
  font-size: 14px;
  font-weight: 500;
}

.footer-link:hover {
  background: #3498db;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3);
}

.footer-link svg {
  margin-right: 6px;
  transition: transform 0.3s ease;
}

.footer-link:hover svg {
  transform: scale(1.1);
}

.footer-bottom {
  border-top: 1px solid #e9ecef;
  padding-top: 20px;
  text-align: center;
}

.footer-bottom p {
  color: #7f8c8d;
  font-size: 13px;
  margin: 5px 0;
  line-height: 1.4;
}

.footer-bottom a {
  color: #3498db;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.footer-bottom a:hover {
  color: #2980b9;
  text-decoration: underline;
}

.footer-tech {
  font-size: 12px !important;
  opacity: 0.8;
}

/* 响应式设计 */
 @media (max-width: 768px) {
  .nav-home {
    flex-direction: column;
    height: 100vh;
    height: 100svh; /* 使用动态视口高度*/
    overflow: hidden;
  }
  .main-content {
    flex: 1;
    height: 100vh;
    height: 100svh; /* 使用动态视口高度，更准确*/
    margin-left: 0;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .search-header {
    padding: 15px 20px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 500;
    background: white;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  .content-area {
    flex: 1;
    padding: 20px 15px;
    padding-top: 100px; /* 为固定的搜索框留出空间*/
    padding-bottom: 300px; /* 增加底部padding确保内容可以完全滚动*/
    overflow-y: auto;
  }
  .sites-grid {
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }

  .site-card {
    padding: 12px;
    flex-direction: column;
    text-align: center;
  }

  .site-card .site-icon {
    margin-right: 0;
    margin-bottom: 8px;
  }

  .site-card .site-name {
    font-size: 15px;
  }

  .site-card .site-description {
    font-size: 12px;
  }

  .category-title {
    font-size: 24px;
    margin-bottom: 20px;
  }

  .category-title .category-icon {
    font-size: 28px;
    margin-right: 12px;
  }
  .category-title .category-name {
    font-size: 22px;
  }
}
</style>
