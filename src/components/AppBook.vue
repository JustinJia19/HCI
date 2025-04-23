<template>
    <div class="app-container">
      <!-- 顶部导航栏 -->
      <header class="header">
        <div class="logo"><router-link to="/main">高数超好学</router-link></div>
        <nav class="nav">
          <router-link to="/work">课程</router-link>
          <router-link to="/book">数字教材</router-link>
          <router-link to="/ai">数字学习伴侣</router-link>
          <router-link to="/exam">考研</router-link>
        </nav>
        <div class="user-section">
          <span style="margin-right: 10px;">Hi，小郑</span>
          <button class="search-btn" @click="goSearch">搜索</button>
        </div>
      </header>
  
      <!-- 书籍展示区域 -->
      <div class="book-grid">
      <div v-for="(book, index) in books" :key="index" class="book-item" @click="goBook">
        <div class="book-cover">
          <img 
            :src="book.cover" 
            class="cover-image" 
            alt="教材封面"
            @error="handleImageError"
          >
        </div>
        <div class="book-info">
          <div class="book-title">{{ book.title }}</div>
          <div class="book-author">{{ book.author }}</div>
          <div class="book-description">{{ book.description }}</div>
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
    data() {
    return {
      books: [ // 将books移到data中
        {
          cover: require('@/resource/cover1.png'), // 本地图片
      title: '高等数学',
      author: '赵利娟 王理峰等编著',
      description: '高等职业教育课程改革系列教材'
    },
    {
      cover: require('@/resource/cover2.png'), // 网络图片
      title: '高等数学精选题解1600题（下册）',
      author: '张天德 孙钦福 著',
      description: '790道习题及参考答案，170余个知识点精讲视频'
    },
    {
      cover: require('@/resource/cover3.png'), // 本地图片
      title: '高等数学',
      author: '甘建强 等编著',
      description: '国防科技大学出版社出版，高等教育精品教材'
    },
    {
      cover: require('@/resource/cover4.png'), // 网络图片
      title: '高等数学',
      author: '周光亚 张宏伟 著',
      description: '全国高职高专教育十一五规划教材'
    },
    {
      cover: require('@/resource/cover5.png'), // 本地图片
      title: '高等数学（微课版）',
      author: '王妍 斯日古冷 主编',
      description: '高等职业教育公共基础课教材'
    },
    {
      cover: require('@/resource/cover6.png'), // 网络图片
      title: '高等数学（第二版） 下册',
      author: '高军安 著',
      description: '高等教育出版社出版，高等学校教材'
    }
      ]
    }
  },
    methods: {
        goSearch() {
      this.$router.push('/search')
      },
      goBook(){
        window.location.href = 'https://weread.qq.com/web/reader/00b32b40813ab7e51g019e27k16732dc0161679091c5aeb1'; // 跳转到指定的外部链接
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
  height: 200px; /* 增大封面高度 */
  background: #f0f2f5; /* 默认背景色 */
  position: relative;
  overflow: hidden;
}

.cover-image {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 保持比例填充 */
  transition: transform 0.3s ease;
}

/* 添加悬停放大效果 */
.book-item:hover .cover-image {
  transform: scale(1.05);
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