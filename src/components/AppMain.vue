<template>
    <div class="app-container">
      <!-- 顶部导航栏 -->
      <header class="header">
        <div class="logo">高数超好学</div>
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
  
      <!-- 主内容区 -->
      <main class="main-content">
        <!-- 左侧分类 -->
        <aside class="sidebar">
          <h3>精品</h3>
          <ul>
            <router-link to="/work">极限的定义与性质</router-link><br><br>
            <router-link to="/work">函数的连续性</router-link><br><br>
            <router-link to="/work">导数的定义与计算</router-link><br><br>
            <router-link to="/work">高阶导数与微分</router-link><br><br>
            <router-link to="/work">导数的应用</router-link><br><br>
            <router-link to="/work">不定积分</router-link><br><br>
            <router-link to="/work">定积分的应用</router-link><br><br>
            <router-link to="/work">一阶微分方程</router-link><br><br>
          </ul>
        </aside>
  
        <!-- 中间推荐和轮播 -->
        <section class="banner-section">
          <!-- 轮播图部分 -->
    <div class="carousel-container" 
         @mouseenter="stopAutoPlay" 
         @mouseleave="startAutoPlay">
      <div v-for="(slide, index) in slides" 
           :key="index"
           class="slide-item" 
           :class="{ active: currentSlideIndex === index }">
        <img :src="slide.img" :alt="slide.alt">
      </div>

      <button class="carousel-control prev" @click="prevSlide">‹</button>
      <button class="carousel-control next" @click="nextSlide">›</button>

      <div class="carousel-dots">
        <span v-for="(dot, dotIndex) in slides" 
              :key="dotIndex" 
              class="dot" 
              :class="{ active: currentSlideIndex === dotIndex }" 
              @click="jumpToSlide(dotIndex)"></span>
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
        <button class="my-goal" @click="goSearch">今日计划</button>
      </aside>
      </main>
  
      <!-- 最近直播 -->
      <section class="live-section">
        <h3>最近课程</h3>
        <div class="live-list">
          <div class="live-card">
            <span class="status live">已完结</span>
            <p>【26考研】高数部分备考全攻略</p>
          </div>
          <div class="live-card">
            <span class="status live">已完结</span>
            <p>多元微分学在实际中的应用</p>
          </div>
          <div class="live-card">
            <span class="status live">已完结</span>
            <p>不定积分重难点总结</p>
          </div>
          <div class="live-card">
            <span class="status live">已完结</span>
            <p>三月模拟卷讲解</p>
          </div>
          <div class="live-card">
            <span class="status upcoming">更新中</span>
            <p>从不定积分到定积分，一个视频入门积分计算</p>
          </div>
          <div class="live-card">
            <span class="status upcoming">更新中</span>
            <p>一个视频搞定极限计算</p>
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
      // 待办事项数据
      todos: [
        { text: '完成数据结构课后习题', completed: false },
        { text: '准备项目进展汇报PPT', completed: false },
        { text: '复习操作系统内存管理章节', completed: false },
        { text: '复习数列极限', completed: false }
      ],
      
      // 轮播图数据
      currentSlideIndex: 0,
      autoPlayInterval: null,
      slides: [
        {
          img: require('@/resource/cycle1.jpg'),
          alt: '图片1'
        },
        {
          img: require('@/resource/cycle2.jpg'),
          alt: '图片2'
        },
        {
          img: require('@/resource/cycle3.png'),
          alt: '图片3'
        }
      ]
    }
  },
  methods: {
    // 跳转方法
    goSearch() {
      this.$router.push('/search')
    },
    toggleTodo(index) {
      this.todos[index].completed = !this.todos[index].completed
    },

    // 轮播图方法
    nextSlide() {
      this.currentSlideIndex = (this.currentSlideIndex + 1) % this.slides.length
    },
    prevSlide() {
      this.currentSlideIndex = (this.currentSlideIndex - 1 + this.slides.length) % this.slides.length
    },
    jumpToSlide(index) {
      this.currentSlideIndex = index
    },
    startAutoPlay() {
      this.autoPlayInterval = setInterval(() => {
        this.nextSlide()
      }, 3000)
    },
    stopAutoPlay() {
      clearInterval(this.autoPlayInterval)
    }
  },
  mounted() {
    this.startAutoPlay()
  },
  beforeUnmount() {
    this.stopAutoPlay()
  }
}
</script>
  

  
  <style scoped>
  /* 图片相关样式 */
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
  
  