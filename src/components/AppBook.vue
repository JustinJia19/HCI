<template>
    <div class="app-container">
      <!-- 顶部导航栏 -->
      <header class="header">
        <div class="logo"><router-link to="/main">高数超好学</router-link></div>
        <nav class="nav">
          <router-link to="/work">课程</router-link>
          <a href="#">数字教材</a>
          <a href="#">学校</a>
          <router-link to="/exam">考研</router-link>
        </nav>
        <div class="user-section">
          <span style="margin-right: 10px;">Hi，小郑</span>
          <button class="search-btn" @click="goSearch">搜索</button>
        </div>
      </header>
  
      <!-- 书籍展示区域 -->
      <div class="book-grid">
        <div v-for="(book, index) in 6" :key="index" class="book-item">
          <div class="book-cover">
            <div class="cover-image"></div>
          </div>
          <div class="book-info">
            <div class="book-title">计算机组成原理（第二版）</div>
            <div class="book-author">王小明 等编著</div>
            <div class="book-description">
              本书系统介绍计算机系统组成结构与工作原理，涵盖数字逻辑、指令系统等核心内容...
            </div>
          </div>
        </div>
      </div>
  
      <!-- 底部导航 -->
      <div class="bottom-nav">
        <div class="nav-item active">
          <el-icon><Notebook /></el-icon>
          <span>书架</span>
        </div>
        <div class="nav-item">
          <el-icon><Shop /></el-icon>
          <span>资源库</span>
        </div>
        <div class="nav-item">
          <el-icon><User /></el-icon>
          <span>我的</span>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default{
    methods: {
        goSearch() {
      this.$router.push('/search')
    }
    }
  }
  </script>

  <style scoped>
  .app-container {
    font-family: 'Arial', sans-serif;
    background-color: #f2f7fb;
    color: #333;
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #0057b8;
    padding: 1rem;
    color: white;
  }
  .logo {
    font-size: 1.5rem;
    font-weight: bold;
  }
  .nav a {
    margin: 0 1rem;
    text-decoration: none;
    color: white;
  }
  .user-section {
    display: flex;
    align-items: center;
  }
  .search-btn {
    background-color: #007fff;
    border: none;
    padding: 0.5rem 1rem;
    color: white;
    border-radius: 5px;
    cursor: pointer;
  }  
  /* 顶部导航栏样式 */
  .nav-bar {
    height: 56px;
    background: #ffffff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  }
  
  .nav-title {
    font-size: 18px;
    font-weight: 600;
    color: #1a1a1a;
  }
  
  .nav-actions {
    display: flex;
    gap: 24px;
    color: #666;
  }
  
  /* 书籍网格布局 */
  .book-grid {
    flex: 1;
    overflow-y: auto;
    padding: 20px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 24px;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  /* 书籍项样式 */
  .book-item {
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    overflow: hidden;
    transition: transform 0.2s;
  }
  
  .book-item:hover {
    transform: translateY(-4px);
  }
  
  .book-cover {
    height: 180px;
    background: #e9ecef;
    position: relative;
  }
  
  .cover-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  /* 书籍信息 */
  .book-info {
    padding: 16px;
  }
  
  .book-title {
    font-size: 16px;
    font-weight: 600;
    color: #1a1a1a;
    margin-bottom: 8px;
  }
  
  .book-author {
    font-size: 13px;
    color: #666;
    margin-bottom: 12px;
  }
  
  .book-description {
    font-size: 13px;
    color: #666;
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  /* 底部导航栏 */
  .bottom-nav {
    height: 64px;
    background: #fff;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-top: 1px solid #eee;
  }
  
  .nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    color: #666;
    font-size: 12px;
    padding: 8px 16px;
    border-radius: 8px;
    transition: all 0.2s;
  }
  
  .nav-item.active {
    color: #007bff;
    background: #f0f8ff;
  }
  
  .el-icon {
    font-size: 20px;
  }
  /* 修正后的全局样式（推荐） */
  a.router-link-active,
  a.router-link-exact-active {
    color: inherit !important;        /* 强制继承父级颜色 */
    text-decoration: none !important; /* 强制去除下划线 */
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  </style>