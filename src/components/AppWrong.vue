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
          <button class="search-btn">搜索</button>
        </div>
      </header>
  
      <!-- 主内容区 -->
      <main class="main-content">
        <!-- 左侧分类 -->
        <aside class="sidebar">
          <h3>错题分类</h3>
          <ul>
            <li v-for="category in categories" 
                :key="category.type"
                @click="selectCategory(category.type)"
                :class="{active: selectedCategory === category.type}">
              {{category.name}} ({{category.count}})
            </li>
          </ul>
        </aside>
  
        <!-- 中间错题列表 -->
        <section class="mistake-section">
          <div class="section-header">
            <h2>{{selectedCategoryName}} 错题</h2>
            <div class="sort-options">
              <span>排序方式：</span>
              <select v-model="sortBy">
                <option value="time">按时间</option>
                <option value="chapter">按章节</option>
                <option value="frequency">按错误频率</option>
              </select>
            </div>
          </div>
          
          <div class="mistake-list">
            <div v-for="mistake in filteredMistakes" 
                 :key="mistake.id" 
                 class="mistake-card"
                 @click="goToOriginal(mistake)">
              <div class="mistake-header">
                <span class="chapter-tag">{{mistake.chapter}}</span>
                <span class="date">{{mistake.date}}</span>
              </div>
              <div class="mistake-content">
                <p class="question">{{mistake.question}}</p>
                <p class="mistake-reason">错误原因: {{mistake.reason}}</p>
              </div>
            </div>
          </div>
        </section>
  
        <!-- 右侧复习计划和强化训练 -->
        <aside class="right-sidebar">
          <!-- 复习计划日历 -->
          <div class="review-plan">
            <h3>复习计划</h3>
            <div class="calendar">
              <div class="calendar-header">
                <button class="nav-btn">&lt;</button>
                <span class="month">2023年11月</span>
                <button class="nav-btn">&gt;</button>
              </div>
              <div class="calendar-grid">
                <div v-for="day in calendarDays" 
                     :key="day.date" 
                     class="calendar-day"
                     :class="{active: day.hasReview, today: day.isToday}">
                  <span class="day-number">{{day.day}}</span>
                  <span v-if="day.reviewCount" class="review-count">{{day.reviewCount}}题</span>
                </div>
              </div>
            </div>
            <div class="today-review" v-if="todayReviews.length">
              <h4>今日复习任务</h4>
              <ul>
                <li v-for="review in todayReviews" :key="review.id">
                  {{review.topic}} ({{review.count}}题)
                </li>
              </ul>
            </div>
          </div>
  
          <!-- 强化训练 -->
          <div class="enhance-training">
            <h3>强化训练</h3>
            <p>根据你的错题推荐以下练习</p>
            <div class="recommend-list">
              <div v-for="recommend in recommendations" 
                   :key="recommend.id"
                   class="recommend-item"
                   @click="goToPractice(recommend)">
                <p class="recommend-title">{{recommend.title}}</p>
                <p class="recommend-desc">{{recommend.desc}}</p>
                <button class="view-solution">查看分步解析</button>
              </div>
            </div>
          </div>
        </aside>
      </main>
    </div>
  </template>
  
  <script>
  export default {
    name: 'MistakesBookPage',
    data() {
      return {
        selectedCategory: 'calculation',
        sortBy: 'time',
        categories: [
          { type: 'calculation', name: '计算错误', count: 24 },
          { type: 'concept', name: '概念混淆', count: 18 },
          { type: 'careless', name: '粗心大意', count: 12 },
          { type: 'method', name: '方法不当', count: 8 },
          { type: 'formula', name: '公式记错', count: 5 },
          { type: 'time', name: '时间不足', count: 3 }
        ],
        mistakes: [
          {
            id: 1,
            type: 'calculation',
            chapter: '导数与微分',
            question: '求函数f(x)=x³-3x²+2在区间[-1,3]上的最大值和最小值',
            date: '2023-11-05',
            reason: '导数计算错误导致临界点求错',
            frequency: 3
          },
          {
            id: 2,
            type: 'concept',
            chapter: '多元函数微分',
            question: '判断函数z=ln(x²+y²)在点(0,0)处的可微性',
            date: '2023-11-03',
            reason: '混淆了连续、偏导数存在和可微的关系',
            frequency: 2
          },
          {
            id: 3,
            type: 'careless',
            chapter: '定积分应用',
            question: '求曲线y=sinx在[0,π]上与x轴围成的面积',
            date: '2023-11-01',
            reason: '忘记取绝对值导致结果为0',
            frequency: 1
          },
          {
            id: 4,
            type: 'method',
            chapter: '微分方程',
            question: '解微分方程y\'+y/x=sinx/x',
            date: '2023-10-28',
            reason: '使用了错误的积分因子',
            frequency: 2
          },
          {
            id: 5,
            type: 'formula',
            chapter: '重积分',
            question: '计算二重积分∬(x²+y²)dxdy，其中D为x²+y²≤1',
            date: '2023-10-25',
            reason: '记错了极坐标转换公式',
            frequency: 1
          }
        ],
        calendarDays: [
          { day: 29, date: '2023-10-29', isToday: false, hasReview: false },
          { day: 30, date: '2023-10-30', isToday: false, hasReview: true, reviewCount: 2 },
          { day: 31, date: '2023-10-31', isToday: false, hasReview: false },
          { day: 1, date: '2023-11-01', isToday: false, hasReview: true, reviewCount: 1 },
          { day: 2, date: '2023-11-02', isToday: false, hasReview: false },
          { day: 3, date: '2023-11-03', isToday: false, hasReview: true, reviewCount: 1 },
          { day: 4, date: '2023-11-04', isToday: false, hasReview: false },
          { day: 5, date: '2023-11-05', isToday: true, hasReview: true, reviewCount: 3 },
          { day: 6, date: '2023-11-06', isToday: false, hasReview: true, reviewCount: 2 },
          // ... 更多日期
        ],
        todayReviews: [
          { id: 1, topic: '函数极值问题', count: 2 },
          { id: 2, topic: '多元函数可微性', count: 1 }
        ],
        recommendations: [
          {
            id: 1,
            title: '导数应用专题练习',
            desc: '5道与极值计算相关的练习题',
            relatedMistake: 1
          },
          {
            id: 2,
            title: '多元函数可微性判断',
            desc: '3道关于多元函数可微性的判断题',
            relatedMistake: 2
          },
          {
            id: 3,
            title: '积分因子法专题',
            desc: '4道一阶线性微分方程的练习题',
            relatedMistake: 4
          }
        ]
      }
    },
    computed: {
      selectedCategoryName() {
        const category = this.categories.find(c => c.type === this.selectedCategory);
        return category ? category.name : '';
      },
      filteredMistakes() {
        let mistakes = this.mistakes.filter(m => m.type === this.selectedCategory);
        
        // 排序逻辑
        if (this.sortBy === 'time') {
          mistakes.sort((a, b) => new Date(b.date) - new Date(a.date));
        } else if (this.sortBy === 'chapter') {
          mistakes.sort((a, b) => a.chapter.localeCompare(b.chapter));
        } else if (this.sortBy === 'frequency') {
          mistakes.sort((a, b) => b.frequency - a.frequency);
        }
        
        return mistakes;
      }
    },
    methods: {
      selectCategory(type) {
        this.selectedCategory = type;
      },
      goToOriginal(mistake) {
        // 跳转到原始习题页的逻辑
        console.log('跳转到错题原始页面:', mistake.id);
        // this.$router.push(`/question/${mistake.id}`);
      },
      goToPractice(recommend) {
        // 跳转到相似题型练习页的逻辑
        console.log('跳转到练习:', recommend.id);
        // this.$router.push(`/practice/${recommend.id}`);
      }
    }
  }
  </script>
  
  <style scoped>
  /* 保持原有样式不变 */
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
  .nav a.active {
    font-weight: bold;
    text-decoration: underline;
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
  
  /* 主内容区布局 */
  .main-content {
    display: flex;
    margin: 2rem;
    gap: 1.5rem;
  }
  
  /* 左侧分类样式 */
  .sidebar {
    width: 15%;
    background: white;
    padding: 1rem;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }
  .sidebar h3 {
    color: #0057b8;
    margin-bottom: 1rem;
  }
  .sidebar ul {
    list-style: none;
    padding: 0;
  }
  .sidebar li {
    margin: 0.8rem 0;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 5px;
  }
  .sidebar li:hover {
    background-color: #e6f0fa;
  }
  .sidebar li.active {
    background-color: #007fff;
    color: white;
    font-weight: bold;
  }
  
  /* 中间错题列表样式 */
  .mistake-section {
    flex: 1;
    background: white;
    padding: 1.5rem;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }
  .section-header h2 {
    color: #0057b8;
    margin: 0;
  }
  .sort-options {
    display: flex;
    align-items: center;
  }
  .sort-options select {
    padding: 0.3rem;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
  
  .mistake-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .mistake-card {
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 1rem;
    cursor: pointer;
    transition: all 0.3s;
  }
  .mistake-card:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    transform: translateY(-2px);
    border-color: #007fff;
  }
  .mistake-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
  }
  .chapter-tag {
    background-color: #e6f0fa;
    color: #007fff;
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    font-size: 0.8rem;
  }
  .date {
    color: #666;
    font-size: 0.9rem;
  }
  .question {
    font-weight: bold;
    margin: 0.5rem 0;
  }
  .mistake-reason {
    color: #e74c3c;
    font-size: 0.9rem;
    margin: 0.5rem 0 0;
  }
  
  /* 右侧复习计划和强化训练样式 */
  .right-sidebar {
    width: 25%;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  .review-plan, .enhance-training {
    background: white;
    padding: 1.5rem;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }
  .review-plan h3, .enhance-training h3 {
    color: #0057b8;
    margin-top: 0;
  }
  
  /* 日历样式 */
  .calendar {
    margin-bottom: 1.5rem;
  }
  .calendar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }
  .month {
    font-weight: bold;
  }
  .nav-btn {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    color: #007fff;
  }
  .calendar-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 0.5rem;
  }
  .calendar-day {
    aspect-ratio: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    cursor: pointer;
  }
  .calendar-day:hover {
    background-color: #f0f7ff;
  }
  .calendar-day.active {
    background-color: #e6f0fa;
    color: #007fff;
    font-weight: bold;
  }
  .calendar-day.today {
    background-color: #007fff;
    color: white;
  }
  .day-number {
    font-size: 0.9rem;
  }
  .review-count {
    font-size: 0.6rem;
    margin-top: 0.2rem;
  }
  
  /* 今日复习任务 */
  .today-review h4 {
    margin-bottom: 0.5rem;
    color: #333;
  }
  .today-review ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .today-review li {
    padding: 0.5rem 0;
    border-bottom: 1px solid #eee;
    font-size: 0.9rem;
  }
  
  /* 强化训练推荐 */
  .enhance-training p {
    color: #666;
    margin-top: 0;
  }
  .recommend-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1rem;
  }
  .recommend-item {
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 1rem;
    cursor: pointer;
    transition: all 0.3s;
  }
  .recommend-item:hover {
    border-color: #007fff;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }
  .recommend-title {
    font-weight: bold;
    margin: 0 0 0.3rem;
    color: #0057b8;
  }
  .recommend-desc {
    color: #666;
    font-size: 0.9rem;
    margin: 0 0 0.5rem;
  }
  .view-solution {
    background-color: #e6f0fa;
    border: none;
    padding: 0.3rem 0.8rem;
    color: #007fff;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.8rem;
  }
  .view-solution:hover {
    background-color: #d0e2f7;
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