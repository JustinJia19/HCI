<template>
  <div class="app-container">
    <!-- 顶部导航栏 -->
    <header class="header">
      <div class="logo"><router-link to="/main">高数超好学</router-link></div>
        <nav class="nav">
          <router-link to="/work">课程</router-link>
          <router-link to="/book">数字教材</router-link>
          <a href="#">学校</a>
          <router-link to="/exam">考研</router-link>
        </nav>
        <div class="user-section">
          <span style="margin-right: 10px;">Hi，小郑</span>
        </div>
    </header>

    <div class="search-title">高数超好学</div>

    <form @submit.prevent="handleSearch" class="search-wrapper">
      <div class="input-group">
        <input
          type="text"
          v-model="searchText"
          placeholder="输入搜索内容"
          class="search-input"
        >
        <button type="submit" class="search-btn">搜索</button>
      </div>
    </form>
  </div>
</template>

<script setup>
</script>

<style scoped>
.search-title {
  text-align: center; /* 文字居中 */
  font-size: 1.5rem; /* 字体大小 */
  font-weight: bold; /* 加粗 */
  color: #333; /* 文字颜色 */
  margin-bottom: 20px; /* 与搜索框之间的间距 */
  gap: 10px;
  position: absolute; /* 固定位置 */
  top: 43%; /* 距离顶部 50% */
  left: 50%; /* 距离左侧 50% */
  transform: translate(-50%, -50%); /* 完全居中 */
  width: 100%;
}

.search-wrapper {
  width: 100%;
  max-width: 600px;
  padding: 0 20px;
}

.input-group {
  display: flex;
  gap: 10px;
  position: absolute; /* 固定位置 */
  top: 50%; /* 距离顶部 50% */
  left: 50%; /* 距离左侧 50% */
  transform: translate(-50%, -50%); /* 完全居中 */
  width: 100%;
  max-width: 600px; /* 限制最大宽度 */
}

.search-input {
  flex: 1;
  padding: 12px 20px;
  border: 2px solid #dfe1e5;
  border-radius: 24px;
  font-size: 16px;
  outline: none;
  transition: all 0.3s;
}

.search-input:focus {
  border-color: #1a73e8;
}

.search-btn {
  background: #1a73e8;
  color: white;
  border: none;
  border-radius: 24px;
  padding: 12px 24px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;
}

.search-btn:hover {
  background: #1557b0;
}

@media (max-width: 480px) {
  .input-group {
    flex-direction: column;
  }
  
  .search-btn {
    width: 100%;
    padding: 12px;
  }
}
.app-container {
    font-family: 'Arial', sans-serif;
    background-color: #f2f7fb;
    flex-direction: column; /* 确保内容垂直排列 */
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