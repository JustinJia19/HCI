<template>
    <div class="app-container">
      <!-- 顶部导航栏 -->
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
        <!-- 左侧高频考点导航 -->
        <aside class="sidebar">
          <h3>高频考点分布</h3>
          <div class="frequency-nav">
            <div 
              class="frequency-item high" 
              :class="{active: currentTopic === '微分方程'}"
              @click="changeTopic('微分方程')"
            >
              微分方程
            </div>
            <div 
              class="frequency-item high" 
              :class="{active: currentTopic === '泰勒公式'}"
              @click="changeTopic('泰勒公式')"
            >
              泰勒公式
            </div>
            <div 
              class="frequency-item medium" 
              :class="{active: currentTopic === '多元函数微分'}"
              @click="changeTopic('多元函数微分')"
            >
              多元函数微分
            </div>
            <div 
              class="frequency-item medium" 
              :class="{active: currentTopic === '重积分'}"
              @click="changeTopic('重积分')"
            >
              重积分
            </div>
            <div 
              class="frequency-item low" 
              :class="{active: currentTopic === '向量代数'}"
              @click="changeTopic('向量代数')"
            >
              向量代数
            </div>
            <div 
              class="frequency-item low" 
              :class="{active: currentTopic === '无穷级数'}"
              @click="changeTopic('无穷级数')"
            >
              无穷级数
            </div>
          </div>
        </aside>
  
        <!-- 中间内容区 - 根据当前考点动态显示 -->
        <section class="exam-section">
          <!-- 微分方程考点内容 -->
          <div class="exam-detail" v-if="currentTopic === '微分方程'">
            <h2 class="exam-title">微分方程 - 高频考点</h2>
            <div class="exam-stats">
              <span>近5年出现频率: 92%</span>
              <span>平均分值: 15-20分</span>
            </div>
            
            <!-- 真题解析区 -->
            <div class="past-exam">
              <h3>经典真题解析</h3>
              <div class="exam-question">
                <p>2024年真题: 求微分方程 y'' + y = sinx 的通解</p>
                <button class="hint-btn" @click="toggleSolution('diff1')">查看解析</button>
                <div class="solution" :class="{hidden: !showSolution.diff1}">
                  <p>解题步骤: 1. 求齐次方程通解 2. 设特解形式 3. 代入原方程...</p>
                </div>
              </div>
            </div>
            
            <!-- 智能组卷面板 -->
            <div class="exam-generator">
              <h3>智能组卷</h3>
              <div class="generator-controls">
                <div class="control-group">
                  <label>考点范围:</label>
                  <select v-model="examScope">
                    <option>全部高频考点</option>
                    <option>仅微分方程</option>
                    <option>自定义选择...</option>
                  </select>
                </div>
                <div class="control-group">
                  <label>试卷难度:</label>
                  <select v-model="examDifficulty">
                    <option>基础</option>
                    <option>中等</option>
                    <option selected>真题难度</option>
                  </select>
                </div>
                <button class="generate-btn" @click="generateExam">生成模拟卷</button>
              </div>
            </div>
          </div>
  
          <!-- 泰勒公式考点内容 -->
          <div class="exam-detail" v-if="currentTopic === '泰勒公式'">
            <h2 class="exam-title">泰勒公式 - 高频考点</h2>
            <div class="exam-stats">
              <span>近5年出现频率: 88%</span>
              <span>平均分值: 10-15分</span>
            </div>
            
            <!-- 真题解析区 -->
            <div class="past-exam">
              <h3>经典真题解析</h3>
              <div class="exam-question">
                <p>2023年真题: 利用泰勒公式求极限 lim(x→0)(e^x - 1 - x)/x²</p>
                <button class="hint-btn" @click="toggleSolution('taylor1')">查看解析</button>
                <div class="solution" :class="{hidden: !showSolution.taylor1}">
                  <p>解题步骤: 1. 写出e^x的泰勒展开式 2. 代入分子 3. 约分化简...</p>
                </div>
              </div>
              <div class="exam-question">
                <p>2022年真题: 用泰勒公式证明不等式 e^x > 1 + x + x²/2 (x>0)</p>
                <button class="hint-btn" @click="toggleSolution('taylor2')">查看解析</button>
                <div class="solution" :class="{hidden: !showSolution.taylor2}">
                  <p>解题步骤: 1. 写出e^x的三阶泰勒展开 2. 分析余项符号...</p>
                </div>
              </div>
            </div>
            
            <!-- 智能组卷面板 -->
            <div class="exam-generator">
              <h3>智能组卷</h3>
              <div class="generator-controls">
                <div class="control-group">
                  <label>考点范围:</label>
                  <select v-model="examScope">
                    <option>全部高频考点</option>
                    <option>仅泰勒公式</option>
                    <option>自定义选择...</option>
                  </select>
                </div>
                <div class="control-group">
                  <label>试卷难度:</label>
                  <select v-model="examDifficulty">
                    <option>基础</option>
                    <option>中等</option>
                    <option selected>真题难度</option>
                  </select>
                </div>
                <button class="generate-btn" @click="generateExam">生成模拟卷</button>
              </div>
            </div>
          </div>
  
          <!-- 其他考点内容可以类似添加 -->
  
          <!-- 模拟考试区（初始隐藏） -->
          <div class="simulated-exam" :class="{hidden: !showSimulatedExam}">
            <div class="exam-header">
              <h2>模拟考试 - {{currentTopic}}专项</h2>
              <div class="exam-timer">剩余时间: {{formatTime(examTime)}}</div>
            </div>
            
            <div class="exam-questions">
              <div class="question" v-for="(q, index) in examQuestions" :key="index">
                <p>{{index + 1}}. {{q.text}} ({{q.points}}分)</p>
                <textarea v-model="q.answer" placeholder="在此输入你的解答..."></textarea>
                <button class="hint-btn" @click="showHint(q)">提示</button>
              </div>
            </div>
            
            <div class="exam-footer">
              <button class="submit-btn" @click="submitExam">提交试卷</button>
            </div>
          </div>
  
          <!-- 成绩报告区（提交后显示） -->
          <div class="exam-report" :class="{hidden: !showExamReport}">
            <h2>模拟考试成绩报告</h2>
            <div class="score-summary">
              <div class="score-card">
                <span class="score">{{examScore}}</span>
                <span class="label">总分</span>
              </div>
              <div class="score-card">
                <span class="score">{{examPercentile}}%</span>
                <span class="label">击败考生</span>
              </div>
            </div>
            
            <div class="wrong-questions">
              <h3>错题解析</h3>
              <div class="wrong-question" v-for="(q, index) in wrongQuestions" :key="index">
                <p>第{{q.number}}题: {{q.topic}}</p>
                <div class="correct-solution">
                  <p>正确解法: {{q.solution}}</p>
                </div>
              </div>
            </div>
            
            <button class="review-btn" @click="reviewWrongQuestions">复习错题</button>
            <button class="new-exam-btn" @click="startNewExam">再试一套</button>
          </div>
        </section>
      </main>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ExamPrepPage',
    data() {
      return {
        currentTopic: '微分方程', // 当前选中的考点
        examScope: '全部高频考点',
        examDifficulty: '真题难度',
        showSolution: {
          diff1: false,
          taylor1: false,
          taylor2: false
        },
        showSimulatedExam: false,
        showExamReport: false,
        examTime: 3600, // 考试时间(秒)
        examQuestions: [],
        examScore: 0,
        examPercentile: 0,
        wrongQuestions: []
      }
    },
    methods: {
      // 切换考点
      changeTopic(topic) {
        this.currentTopic = topic;
        this.showSimulatedExam = false;
        this.showExamReport = false;
        // 重置所有解析显示状态
        Object.keys(this.showSolution).forEach(key => {
          this.showSolution[key] = false;
        });
      },
      
      // 切换解析显示状态
      toggleSolution(id) {
        this.showSolution[id] = !this.showSolution[id];
      },
      
      // 生成模拟卷
      generateExam() {
        // 根据当前考点生成模拟题
        this.examQuestions = this.getQuestionsForTopic(this.currentTopic);
        this.showSimulatedExam = true;
        this.showExamReport = false;
        
        // 开始计时
        this.startTimer();
      },
      
      // 根据考点获取题目
      getQuestionsForTopic(topic) {
        // 这里应该是从后端API获取，这里简化处理
        if (topic === '微分方程') {
          return [
            { text: "求微分方程 y' + y = e^x 的通解", points: 15, answer: "" },
            { text: "解初值问题 y'' + 4y = 0, y(0)=1, y'(0)=0", points: 20, answer: "" },
            { text: "证明伯努利方程的解法", points: 10, answer: "" }
          ];
        } else if (topic === '泰勒公式') {
          return [
            { text: "利用泰勒公式求极限 lim(x→0)(sinx - x)/x³", points: 12, answer: "" },
            { text: "用泰勒展开估算√1.1的值，精确到0.001", points: 15, answer: "" },
            { text: "证明不等式 1 + x/2 - x²/8 < √(1+x) < 1 + x/2 (x>0)", points: 18, answer: "" }
          ];
        }
        return [];
      },
      
      // 开始计时器
      startTimer() {
        clearInterval(this.timer);
        this.examTime = 3600; // 重置为60分钟
        this.timer = setInterval(() => {
          if (this.examTime > 0) {
            this.examTime--;
          } else {
            clearInterval(this.timer);
            this.submitExam();
          }
        }, 1000);
      },
      
      // 格式化时间显示
      formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
      },
      
      // 显示提示
      showHint(question) {
        alert(`提示: ${question.text} 的关键步骤是...`);
      },
      
      // 提交试卷
      submitExam() {
        clearInterval(this.timer);
        this.showSimulatedExam = false;
        this.showExamReport = true;
        
        // 模拟评分 (实际应用中应该调用API)
        this.examScore = Math.floor(Math.random() * 30) + 70;
        this.examPercentile = Math.floor(Math.random() * 20) + 80;
        
        // 模拟错题 (取前两道作为错题)
        this.wrongQuestions = this.examQuestions.slice(0, 2).map((q, i) => ({
          number: i + 1,
          topic: q.text.split(':')[0],
          solution: `这是${q.text}的详细解答步骤...`
        }));
      },
      
      // 复习错题
      reviewWrongQuestions() {
        alert('跳转到错题复习模式');
      },
      
      // 开始新考试
      startNewExam() {
        this.showExamReport = false;
        this.generateExam();
      }
    },
    beforeUnmount() {
      clearInterval(this.timer);
    }
  }
  </script>
  
  <style scoped>
  /* 基础样式 */
  .app-container {
    font-family: 'Arial', sans-serif;
    background-color: #f2f7fb;
    color: #333;
    min-height: 100vh;
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
  
  .nav {
    display: flex;
    gap: 2rem;
  }
  
  .nav a {
    color: white;
    text-decoration: none;
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
  
  .main-content {
    display: flex;
    padding: 2rem;
    max-width: 1400px;
    margin: 0 auto;
  }
  
  .sidebar {
    width: 220px;
    background: white;
    padding: 1.5rem;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    margin-right: 2rem;
    flex-shrink: 0;
  }
  
  .frequency-nav {
    margin-top: 1.5rem;
  }
  
  .frequency-item {
    padding: 0.8rem 1rem;
    margin: 0.5rem 0;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s;
    font-size: 0.9rem;
  }
  
  .frequency-item:hover {
    background-color: #e6f0fa;
  }
  
  .frequency-item.high {
    border-left: 4px solid #ff4d4f;
    /* color: #ff4d4f; */
    /* font-weight: bold; */
  }
  
  .frequency-item.medium {
    border-left: 4px solid #faad14;
  }
  
  .frequency-item.low {
    border-left: 4px solid #52c41a;
  }
  
  .frequency-item.active {
    background-color: #007fff;
    color: white;
    font-weight: bold;
  }
  
  .exam-section {
    flex-grow: 1;
    min-width: 0;
  }
  
  .exam-detail, .simulated-exam, .exam-report {
    background: white;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    width: 100%;
  }
  
  .exam-title {
    color: #0057b8;
    margin-bottom: 0.5rem;
    font-size: 1.5rem;
  }
  
  .exam-stats {
    display: flex;
    gap: 2rem;
    color: #666;
    margin-bottom: 1.5rem;
    font-size: 0.9rem;
  }
  
  .past-exam {
    margin: 2rem 0;
  }
  
  .past-exam h3 {
    font-size: 1.2rem;
    margin-bottom: 1rem;
    color: #333;
  }
  
  .exam-question {
    background: #f5f5f5;
    padding: 1.2rem;
    border-radius: 5px;
    margin: 1rem 0;
  }
  
  .exam-question p {
    margin-bottom: 0.8rem;
    line-height: 1.5;
  }
  
  .hint-btn {
    background-color: #007fff;
    border: none;
    padding: 0.5rem 1rem;
    color: white;
    border-radius: 3px;
    cursor: pointer;
    margin-top: 0.5rem;
    font-size: 0.9rem;
    transition: background-color 0.2s;
  }
  
  .hint-btn:hover {
    background-color: #0066cc;
  }
  
  .solution {
    margin-top: 1rem;
    padding: 1rem;
    background: #e6f7ff;
    border-radius: 5px;
    line-height: 1.6;
  }
  
  .hidden {
    display: none;
  }
  
  .exam-generator {
    margin: 2rem 0;
    padding: 1.5rem;
    background: #f0f9ff;
    border-radius: 8px;
  }
  
  .exam-generator h3 {
    margin-bottom: 1rem;
    font-size: 1.2rem;
  }
  
  .generator-controls {
    display: flex;
    gap: 1.5rem;
    align-items: center;
    flex-wrap: wrap;
  }
  
  .control-group {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .control-group label {
    font-size: 0.9rem;
    white-space: nowrap;
  }
  
  .control-group select {
    padding: 0.5rem;
    border-radius: 4px;
    border: 1px solid #ddd;
    min-width: 120px;
  }
  
  .generate-btn {
    background-color: #007fff;
    border: none;
    padding: 0.7rem 1.5rem;
    color: white;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.2s;
  }
  
  .generate-btn:hover {
    background-color: #0066cc;
  }
  
  .simulated-exam {
    margin-top: 2rem;
  }
  
  .exam-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #eee;
  }
  
  .exam-header h2 {
    font-size: 1.3rem;
    color: #0057b8;
  }
  
  .exam-timer {
    background: #fff2f0;
    color: #ff4d4f;
    padding: 0.5rem 1rem;
    border-radius: 15px;
    font-weight: bold;
    font-size: 0.9rem;
  }
  
  .exam-questions {
    margin: 1.5rem 0;
  }
  
  .question {
    margin-bottom: 2rem;
  }
  
  .question p {
    font-size: 1rem;
    margin-bottom: 0.8rem;
    font-weight: 500;
  }
  
  .question textarea {
    width: 100%;
    min-height: 120px;
    margin: 0.5rem 0;
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 5px;
    resize: vertical;
    font-family: inherit;
    font-size: 0.95rem;
    line-height: 1.5;
  }
  
  .question textarea:focus {
    outline: none;
    border-color: #007fff;
    box-shadow: 0 0 0 2px rgba(0, 127, 255, 0.2);
  }
  
  .submit-btn {
    background-color: #ff4d4f;
    border: none;
    padding: 0.8rem 2rem;
    color: white;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    margin-top: 1rem;
    font-size: 1rem;
    transition: background-color 0.2s;
  }
  
  .submit-btn:hover {
    background-color: #e63939;
  }
  
  .exam-report {
    margin-top: 2rem;
  }
  
  .exam-report h2 {
    font-size: 1.5rem;
    color: #0057b8;
    margin-bottom: 1.5rem;
  }
  
  .score-summary {
    display: flex;
    justify-content: center;
    gap: 3rem;
    margin: 2rem 0;
  }
  
  .score-card {
    text-align: center;
    min-width: 120px;
  }
  
  .score-card .score {
    font-size: 2.5rem;
    font-weight: bold;
    color: #007fff;
    display: block;
    line-height: 1;
  }
  
  .score-card .label {
    color: #666;
    font-size: 0.9rem;
    margin-top: 0.5rem;
    display: block;
  }
  
  .wrong-questions {
    margin: 2rem 0;
  }
  
  .wrong-questions h3 {
    font-size: 1.2rem;
    margin-bottom: 1rem;
    color: #333;
  }
  
  .wrong-question {
    background: #fff2f0;
    padding: 1.2rem;
    border-radius: 5px;
    margin: 1rem 0;
  }
  
  .wrong-question p {
    font-weight: 500;
    margin-bottom: 0.5rem;
  }
  
  .correct-solution {
    background: #f6ffed;
    padding: 1rem;
    border-radius: 5px;
    margin-top: 0.8rem;
  }
  
  .correct-solution p {
    line-height: 1.6;
  }
  
  .review-btn, .new-exam-btn {
    padding: 0.8rem 1.8rem;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    margin-right: 1rem;
    font-size: 0.95rem;
    transition: all 0.2s;
  }
  
  .review-btn {
    background-color: #007fff;
    border: none;
    color: white;
  }
  
  .review-btn:hover {
    background-color: #0066cc;
  }
  
  .new-exam-btn {
    background-color: white;
    border: 1px solid #007fff;
    color: #007fff;
  }
  
  .new-exam-btn:hover {
    background-color: #f0f9ff;
  }
  
  @media (max-width: 992px) {
    .main-content {
      flex-direction: column;
      padding: 1rem;
    }
    
    .sidebar {
      width: 100%;
      margin-right: 0;
      margin-bottom: 1.5rem;
    }
    
    .generator-controls {
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;
    }
    
    .control-group {
      width: 100%;
    }
    
    .control-group select {
      width: 100%;
    }
    
    .generate-btn {
      width: 100%;
    }
  }
  
  @media (max-width: 768px) {
    .header {
      flex-direction: column;
      gap: 1rem;
      padding: 1rem;
    }
    
    .nav {
      flex-wrap: wrap;
      justify-content: center;
      gap: 1rem;
    }
    
    .exam-stats {
      flex-direction: column;
      gap: 0.5rem;
    }
    
    .score-summary {
      flex-direction: column;
      gap: 1.5rem;
    }
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