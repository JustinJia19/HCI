<template>
    <div class="app-container">
      <!-- 顶部导航栏 -->
      <header class="header">
        <div class="logo">高数超好学</div>
        <nav class="nav">
          <router-link to="/work">课程</router-link>
          <a href="#">数字教材</a>
          <a href="#">学校</a>
          <router-link to="/exam">考研</router-link>
        </nav>
        <div class="user-section">
          <span style="margin-right: 10px;">Hi，小郑</span>
          <button class="search-btn">搜索</button>
        </div>
      </header>
  
      <!-- 主内容区 -->
      <main class="main-content">
        <!-- 左侧分类 -->
        <aside class="sidebar">
          <h3>精品</h3>
          <ul>
            <li>极限的定义与性质</li>
            <li>函数的连续性</li>
            <li>导数的定义与计算</li>
            <li>高阶导数与微分</li>
            <li>导数的应用</li>
            <li>不定积分</li>
            <li>定积分的应用</li>
            <li>一阶微分方程</li>
          </ul>
        </aside>
  
        <!-- 中间推荐和轮播 -->
        <section class="banner-section">
          <div class="carousel-container">
            <div class="carousel-container" 
     @mouseenter="stopAutoPlay" 
     @mouseleave="startAutoPlay">
    <!-- 轮播项 -->
    <div v-for="(_, index) in slidesLength" 
        :key="index" 
        class="slide-item" 
        :class="{ active: currentSlideIndex === index }">
      <img :src="`image${index+1}.jpg`" :alt="`图片${index+1}`">
    </div>

    <!-- 控制按钮 -->
    <button class="carousel-control prev" @click="plusSlides(-1)">&#10094;</button>
    <button class="carousel-control next" @click="plusSlides(1)">&#10095;</button>

    <!-- 导航点 -->
    <div class="carousel-dots">
      <span v-for="(_, index) in slidesLength" 
            :key="index" 
            class="dot" 
            :class="{ active: currentSlideIndex === index }" 
            @click="currentSlide(index)"></span>
    </div>
  </div>
</div>
</section>
  
        <!-- 右侧用户信息 -->
        <aside class="user-info">
        <div class="avatar"></div>
        <p>小郑</p>
        <ul class="todo-list">
          <li 
            v-for="(item, index) in todos"
            :key="index"
            class="todo-item"
            :class="{ completed: item.completed }"
            @click="toggleTodo(index)"
          >
            <span class="check-circle"></span>
            {{ item.text }}
          </li>
        </ul>
        <button class="my-goal" @click="go">今日计划</button>
      </aside>
      </main>
  
      <!-- 最近直播 -->
      <section class="live-section">
        <h3>最近直播</h3>
        <div class="live-list">
          <div class="live-card">
            <span class="status live">直播中</span>
            <p>【26考研】全科400分备考攻略</p>
          </div>
          <div class="live-card">
            <span class="status live">直播中</span>
            <p>零基础入门C+Python人工智能</p>
          </div>
          <div class="live-card">
            <span class="status upcoming">未开始</span>
            <p>四六级课程规划，一节课搞定40分！</p>
          </div>
        </div>
      </section>
    </div>
  </template>
  
  <script>
export default {
  name: 'BlueThemePage',
  data() {
    return {
      // 原有数据
      todos: [
        { text: '完成数据结构课后习题', completed: false },
        { text: '准备项目进展汇报PPT', completed: false },
        { text: '复习操作系统内存管理章节', completed: false },
        { text: '复习数列极限', completed: false }
      ],
      
      // 新增轮播相关数据
      currentSlideIndex: 0,
      autoPlayInterval: null,
      slidesLength: 3 // 根据实际图片数量设置
    }
  },
  methods: {
    // 原有方法
    go() {
      this.$router.push('/exam')
    },
    toggleTodo(index) {
      this.todos[index].completed = !this.todos[index].completed
    },

    // 新增轮播方法
    showSlides(n) {
      if (n >= this.slidesLength) this.currentSlideIndex = 0
      if (n < 0) this.currentSlideIndex = this.slidesLength - 1
    },
    plusSlides(n) {
      this.showSlides(this.currentSlideIndex += n)
    },
    currentSlide(n) {
      this.currentSlideIndex = n
    },
    startAutoPlay() {
      this.autoPlayInterval = setInterval(() => {
        this.plusSlides(1)
      }, 5000)
    },
    stopAutoPlay() {
      clearInterval(this.autoPlayInterval)
    }
  },
  mounted() {
    // 初始化自动播放
    this.startAutoPlay()
  },
  beforeUnmount() {
    // 清除定时器
    this.stopAutoPlay()
  }
}
</script>
  

  
  <style scoped>
  /* 新增图片相关样式 */
  .carousel-container {
    position: relative;
    max-width: 1000px;
    margin: auto;
    overflow: hidden;
}

.slide-item {
    display: none;
    position: relative;
    animation: fade 1.5s ease;
}

.slide-item.active {
    display: block;
}

.slide-item img {
    width: 100%;
    height: auto;
    vertical-align: middle;
}

.carousel-control {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    padding: 15px;
    background: rgba(0,0,0,0.3);
    color: white;
    border: none;
    cursor: pointer;
    font-size: 18px;
}

.prev {
    left: 0;
}

.next {
    right: 0;
}

.carousel-dots {
    position: absolute;
    bottom: 15px;
    left: 50%;
    transform: translateX(-50%);
}

.dot {
    display: inline-block;
    width: 12px;
    height: 12px;
    margin: 0 5px;
    background: rgba(255,255,255,0.5);
    border-radius: 50%;
    cursor: pointer;
    transition: background 0.3s ease;
}

.dot.active {
    background: rgba(255,255,255,0.9);
}

@keyframes fade {
    from {opacity: 0.4}
    to {opacity: 1}
}
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
  .main-content {
    display: flex;
    margin: 2rem;
  }
  .sidebar {
    width: 15%;
  }
  .sidebar h3 {
    color: #0057b8;
  }
  .sidebar ul {
    list-style: none;
    padding: 0;
  }
  .sidebar li {
    margin: 0.5rem 0;
    cursor: pointer;
  }
  .banner-section {
    width: 55%;
    text-align: center;
    background: #cce4ff;
    padding: 2rem;
    border-radius: 10px;
  }
  .banner-section h2 {
    color: #003f7f;
  }
  .join-btn {
    background-color: #007fff;
    border: none;
    padding: 0.7rem 1.5rem;
    color: white;
    border-radius: 5px;
    cursor: pointer;
  }
  .user-info {
    width: 20%;
    background: #e6f0fa;
    padding: 1rem;
    border-radius: 10px;
    text-align: center;
  }
  .avatar {
    width: 60px;
    height: 60px;
    background-image: url('/src/resource/face.jpg');
    background-size: cover; /* 让图片覆盖整个区域 */
    background-position: center; /* 图片居中显示 */
    background-repeat: no-repeat; /* 防止图片重复 */
    border-radius: 50%; /* 保持圆形 */
    margin: 0 auto 1rem;
  }
  .todo-list {
  list-style: none;
  padding: 0;
  margin: 20px 0;
}

.todo-item {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  margin: 8px 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  transition: all 0.2s ease;
}

.todo-item:hover {
  transform: translateX(4px);
  box-shadow: 0 3px 6px rgba(0,0,0,0.15);
}

.check-circle {
  display: inline-block;
  width: 18px;
  height: 18px;
  border: 2px solid #4a90e2;
  border-radius: 50%;
  margin-right: 12px;
  position: relative;
}

.check-circle::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 10px;
  height: 10px;
  background: #4a90e2;
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.todo-item.completed .check-circle::after {
  opacity: 1;
}

.todo-item.completed {
  color: #999;
  background: #f8f9fb;
}

.my-goal {
  background: #007fff;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  cursor: pointer;
  width: 100%;
  font-size: 14px;
  transition: background 0.3s ease;
}

.my-goal:hover {
  background: #8aa7c4;
}
  .live-section {
    margin: 2rem;
  }
  .live-list {
    display: flex;
    gap: 1rem;
  }
  .live-card {
    background: #ffffff;
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    width: 200px;
  }
  .status.live {
    color: green;
  }
  .status.upcoming {
    color: orange;
  }
  </style>
  
  