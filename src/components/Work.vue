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

      <div class="main-layout">
        <!-- 视频播放区 + 左侧目录 -->
        <section class="video-and-sidebar">
          <!-- 左侧章节目录嵌入视频区 -->
          <div class="sidebar">
            <h3>学习目录</h3>
            <ul>
              <li
                v-for="(chapter, index) in chapters"
                :key="index"
                :class="{ active: currentChapterIndex === index }"
                @click="selectChapter(index)"
              >
                {{ chapter.title }}
                <ul class="video-list">
                  <li v-for="(video, i) in chapter.videos" :key="i">
                    <a href="#" @click.prevent="playVideo(index, i)">{{ video }}</a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
  
          <!-- 视频播放区 -->
          <div class="video-section">
            <h2>{{ currentChapter.title }}</h2>
            <video controls class="video-player">
              <source :src="currentVideoSrc" type="video/mp4" />
              当前浏览器不支持 video 标签。
            </video>
          </div>
        </section>
  
        <!-- 课后习题轮播 -->
        <aside class="exercise-section">
          <h3>课后习题</h3>
          <div class="carousel">
            <button @click="prevQuestion" :disabled="currentQuestionIndex === 0">←</button>
            <div class="question">
              <p>{{ currentQuestion.text }}</p>
              <label v-for="(option, idx) in currentQuestion.options" :key="idx">
                <input
                  type="radio"
                  :name="'question-' + currentQuestionIndex"
                  :value="option"
                  v-model="userAnswers[currentQuestionIndex]"
                />
                {{ option }}
              </label>
              <button class="check-btn" @click="checkAnswer">提交答案</button>
              <div v-if="feedback" class="feedback">{{ feedback }}</div>
            </div>
            <button @click="nextQuestion" :disabled="currentQuestionIndex >= questions.length -1">→</button>
          </div>
        </aside>
  
        <!-- 学习进度 & 评论区 -->
        <section class="bottom-section">
          <!-- 学习进度 -->
          <div class="progress-section">
            <h3>学习进度</h3>
            <div class="progress-circle">
              <svg viewBox="0 0 36 36">
                <path class="background" stroke-width="3.8" fill="none"
                  d="M18 2.0845a15.9155 15.9155 0 1 1 0 31.831a15.9155 15.9155 0 1 1 0-31.831" />
                <path class="progress" stroke-width="3.8"
                  :stroke-dasharray="progressValue + ', 100'"
                  fill="none"
                  d="M18 2.0845a15.9155 15.9155 0 1 1 0 31.831a15.9155 15.9155 0 1 1 0-31.831" />
              </svg>
              <div class="progress-text">{{ progressValue }}%</div>
            </div>
          </div>
  
          <!-- 评论区 -->
          <div class="comment-section">
            <h3>交流评论</h3>
            <div class="comment" v-for="(comment, index) in comments" :key="index">
              <p><strong>{{ comment.user }}：</strong> {{ comment.text }}</p>
              <div class="actions">
                <button @click="likeComment(index)">👍 {{ comment.likes }}</button>
                <button @click="replyToComment(comment)">回复</button>
              </div>
            </div>
  
            <!-- 评论输入 -->
            <div class="new-comment">
              <input
                type="text"
                v-model="newCommentText"
                placeholder="写下你的想法..."
              />
              <button @click="addComment">发表</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "BlueThemeLearningPage",
    data() {
      return {
        chapters: [
          { title: "第3章：条件概率", videos: ["事件独立性", "条件概率公式"] },
          { title: "第4章：概率密度函数", videos: ["密度函数定义", "积分性质讲解"] },
          { title: "第5章：多维随机变量", videos: ["二维分布函数", "边缘密度求法"] }
        ],
        currentChapterIndex: 1,
        currentVideoIndex: 0,
  
        questions: [
          {
            text: "概率密度函数的基本性质是？",
            options: ["累积分布函数", "非负性，积分为1", "二项式性质"],
            answer: "非负性，积分为1"
          },
          {
            text: "密度函数的积分等于多少？",
            options: ["0", "1", "视情况而定"],
            answer: "1"
          }
        ],
        currentQuestionIndex: 0,
        userAnswers: {},
        feedback: "",
  
        comments: [
          { user: "小张", text: "这一节讲得非常棒！原来有理函数的密度积分是一个确定的值👍", likes: 3 },
          { user: "学习者007", text: "有无配套练习册呢？", likes: 1 }
        ],
        newCommentText: ""
      };
    },
    computed: {
      currentChapter() {
        return this.chapters[this.currentChapterIndex];
      },
      currentVideoSrc() {
        return "https://ali-cdn.xuetangx.com/796f6a36b7329309-10.mp4?auth_key=1745580234-0-0-443369ab3f33db50476eb6034d680853"; // 可根据章节生成实际地址
      },
      currentQuestion() {
        return this.questions[this.currentQuestionIndex];
      },
      progressValue() {
        return Math.floor(
          ((this.currentQuestionIndex + 1) / this.questions.length) * 100
        );
      }
    },
    methods: {
      goSearch() {
      this.$router.push('/search')
    },
      selectChapter(index) {
        this.currentChapterIndex = index;
        this.currentVideoIndex = 0;
      },
      playVideo(chapterIndex, videoIndex) {
        this.currentChapterIndex = chapterIndex;
        this.currentVideoIndex = videoIndex;
      },
      nextQuestion() {
        if (this.currentQuestionIndex < this.questions.length - 1) {
          this.currentQuestionIndex++;
          this.feedback = "";
        }
      },
      prevQuestion() {
        if (this.currentQuestionIndex > 0) {
          this.currentQuestionIndex--;
          this.feedback = "";
        }
      },
      checkAnswer() {
        const selected = this.userAnswers[this.currentQuestionIndex];
        if (!selected) {
          this.feedback = "请先选择一个答案哦~";
          return;
        }
        this.feedback =
          selected === this.currentQuestion.answer ? "✅ 答对啦！" : "❌ 答错了，请重试！";
      },
      addComment() {
        if (this.newCommentText.trim() !== "") {
          this.comments.push({
            user: "我",
            text: this.newCommentText,
            likes: 0
          });
          this.newCommentText = "";
        }
      },
      likeComment(index) {
        this.comments[index].likes++;
      },
      replyToComment(comment) {
        this.newCommentText = `回复@${comment.user}: `;
      }
    }
  };
  </script>
  
  <style scoped>
  /* 蓝色主题风格统一 */
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
  .main-layout {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  /* 视频 + 左侧目录 */
  .video-and-sidebar {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }
  
  .sidebar {
    width: 250px;
    background: white;
    border-radius: 10px;
    padding: 1rem;
    overflow-y: auto;
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
  .sidebar li.active {
    color: #007fff;
    font-weight: bold;
  }
  .video-list {
    padding-left: 1rem;
  }
  .video-list li {
    font-size: 0.9rem;
    margin: 0.3rem 0;
  }
  .video-list a {
    color: #007fff;
    text-decoration: none;
  }
  .video-list a:hover {
    text-decoration: underline;
  }
  
  /* 视频播放区样式 */
  .video-section {
    flex: 1;
    background: white;
    border-radius: 10px;
    padding: 1rem;
  }
  .video-section h2 {
    color: #0057b8;
  }
  .video-player {
    width: 100%;
    border-radius: 10px;
  }
  
  /* 习题轮播样式 */
  .exercise-section {
    background: white;
    border-radius: 10px;
    padding: 1rem;
  }
  .carousel {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .carousel button {
    background: #007fff;
    border: none;
    color: white;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    cursor: pointer;
  }
  .carousel button:disabled {
    background: #ccc;
  }
  .question {
    width: 100%;
    text-align: left;
    padding: 0 1rem;
  }
  .question label {
    display: block;
    margin: 0.3rem 0;
    background: #e6f0fa;
    padding: 0.4rem 0.6rem;
    border-radius: 5px;
    cursor: pointer;
  }
  .check-btn {
    background-color: #007fff;
    border: none;
    padding: 0.5rem 1rem;
    color: white;
    cursor: pointer;
    /* 强制关键属性 */
    border-radius: 5px !important; 
    /* 使用更具体的选择器 */
    min-width: 90px !important;
    /* 阻断继承 */
    writing-mode: horizontal-tb !important;
  }
  .feedback {
    margin-top: 0.5rem;
    color: #007fff;
    font-weight: bold;
  }
  
  /* 进度与评论布局 */
  .bottom-section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .progress-section {
    background: white;
    border-radius: 10px;
    padding: 1rem;
    width: 100%;
  }
  .progress-section h3 {
    color: #0057b8;
  }
  .progress-circle {
    position: relative;
    width: 120px;
    height: 120px;
    margin: 0 auto;
  }
  .progress-circle svg {
    transform: rotate(-90deg);
    width: 100%;
    height: 100%;
  }
  path.background {
    stroke: #cce4ff;
  }
  path.progress {
    stroke: #007fff;
    stroke-linecap: round;
  }
  .progress-text {
    position: absolute;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #007fff;
    font-weight: bold;
    font-size: 1.2rem;
  }
  
  /* 评论区 */
  .comment-section {
    background: white;
    border-radius: 10px;
    padding: 1rem;
    width: 100%;
  }
  .comment-section h3 {
    color: #0057b8;
  }
  .comment {
    border-bottom: 1px solid #e1eaf4;
    padding: 0.5rem 0;
  }
  .actions button {
    background: none;
    border: none;
    color: #007fff;
    cursor: pointer;
    margin-right: 1rem;
  }
  .actions button:hover {
    text-decoration: underline;
  }
  .new-comment {
    display: flex;
    margin-top: 1rem;
  }
  .new-comment input {
    flex: 1;
    padding: 0.5rem;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
  .new-comment button {
    background: #007fff;
    color: white;
    border: none;
    padding: 0 1rem;
    margin-left: 0.5rem;
    border-radius: 5px;
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
  