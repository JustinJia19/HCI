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
  
      <!-- 数字学习伴侣主内容区 -->
      <main class="companion-container">
        <!-- 左侧功能区 -->
        <aside class="companion-sidebar">
          <h3>学习工具</h3>
          <ul>
            <li class="active">智能答疑</li>
            <li>知识图谱</li>
            <li>学习计划</li>
            <li>错题本</li>
            <li>学习报告</li>
          </ul>
        </aside>
  
        <!-- 中间问答区 -->
        <section class="companion-main">
          <div class="chat-container">
            <div class="chat-history">
              <div class="message ai-message">
                <div class="avatar">AI</div>
                <div class="content">
                  你好！我是你的数字学习伴侣，可以解答你的学习问题、生成知识图谱、制定学习计划等。有什么我可以帮你的吗？
                </div>
              </div>
              <div class="message user-message" v-if="userQuestion">
                <div class="avatar">你</div>
                <div class="content">{{ userQuestion }}</div>
              </div>
              <div class="message ai-message" v-if="aiResponse">
                <div class="avatar">AI</div>
                <div class="content">{{ aiResponse }}</div>
              </div>
            </div>
            
            <div class="input-area">
              <textarea 
                v-model="currentQuestion" 
                placeholder="请帮我生成当前知识点的知识图谱" 
                @keyup.enter="submitQuestion"
              ></textarea>
              <button class="send-btn" @click="submitQuestion">发送</button>
            </div>
          </div>
        </section>
  
        <!-- 右侧知识图谱预览 -->
        <aside class="knowledge-graph">
          <h3>知识图谱预览</h3>
          <div class="graph-placeholder">
            <p v-if="!userQuestion">输入问题后，将在此处显示相关知识图谱</p>
            <div v-else class="graph-visualization">
              <!-- 这里可以放置实际的知识图谱可视化 -->
              <div class="node center-node">当前知识点</div>
              <div class="node">相关概念1</div>
              <div class="node">相关概念2</div>
              <div class="node">相关概念3</div>
            </div>
          </div>
        </aside>
      </main>
    </div>
  </template>
  
  <script>
  export default {
    name: 'DigitalCompanionPage',
    data() {
      return {
        currentQuestion: '',
        userQuestion: '',
        aiResponse: ''
      }
    },
    methods: {
      submitQuestion() {
        if (this.currentQuestion.trim()) {
          this.userQuestion = this.currentQuestion;
          this.currentQuestion = '';
          
          // 模拟AI响应
          setTimeout(() => {
            this.aiResponse = `关于"${this.userQuestion}"，这是一个非常重要的知识点。它通常包含以下几个核心概念：
            1. 基础定义
            2. 相关定理
            3. 应用场景
            4. 常见问题
            
            我已为您生成了知识图谱，可以在右侧查看。如需更详细的解释，请告诉我。`;
          }, 1000);
        }
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
  
  /* 数字学习伴侣特定样式 */
  .companion-container {
    display: flex;
    margin: 2rem;
    min-height: 70vh;
  }
  
  .companion-sidebar {
    width: 15%;
    background: white;
    border-radius: 10px;
    padding: 1rem;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }
  
  .companion-sidebar h3 {
    color: #0057b8;
    border-bottom: 1px solid #e0e0e0;
    padding-bottom: 0.5rem;
  }
  
  .companion-sidebar ul {
    list-style: none;
    padding: 0;
  }
  
  .companion-sidebar li {
    padding: 0.8rem 0.5rem;
    cursor: pointer;
    border-radius: 5px;
    margin: 0.2rem 0;
  }
  
  .companion-sidebar li:hover {
    background-color: #e6f0fa;
  }
  
  .companion-sidebar li.active {
    background-color: #cce4ff;
    font-weight: bold;
  }
  
  .companion-main {
    flex: 1;
    margin: 0 1.5rem;
    background: white;
    border-radius: 10px;
    padding: 1.5rem;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }
  
  .chat-container {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  
  .chat-history {
    flex: 1;
    overflow-y: auto;
    margin-bottom: 1rem;
    padding: 1rem;
    background: #f9f9f9;
    border-radius: 8px;
    min-height: 400px;
  }
  
  .message {
    display: flex;
    margin-bottom: 1rem;
  }
  
  .message .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #007fff;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 1rem;
    flex-shrink: 0;
  }
  
  .user-message .avatar {
    background-color: #0057b8;
  }
  
  .message .content {
    padding: 0.8rem;
    border-radius: 8px;
    max-width: 80%;
  }
  
  .ai-message .content {
    background-color: #e6f0fa;
  }
  
  .user-message .content {
    background-color: #cce4ff;
  }
  
  .input-area {
    display: flex;
    margin-top: 1rem;
  }
  
  .input-area textarea {
    flex: 1;
    padding: 0.8rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    resize: none;
    min-height: 60px;
    font-family: inherit;
  }
  
  .send-btn {
    margin-left: 1rem;
    background-color: #007fff;
    border: none;
    padding: 0 1.5rem;
    color: white;
    border-radius: 8px;
    cursor: pointer;
  }
  
  .send-btn:hover {
    background-color: #0057b8;
  }
  
  .knowledge-graph {
    width: 25%;
    background: white;
    border-radius: 10px;
    padding: 1.5rem;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }
  
  .knowledge-graph h3 {
    color: #0057b8;
    border-bottom: 1px solid #e0e0e0;
    padding-bottom: 0.5rem;
  }
  
  .graph-placeholder {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #777;
    min-height: 300px;
  }
  
  .graph-visualization {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .node {
    padding: 0.8rem 1.2rem;
    background-color: #e6f0fa;
    border-radius: 20px;
    margin: 0.5rem;
    text-align: center;
    width: 80%;
  }
  
  .center-node {
    background-color: #007fff;
    color: white;
    font-weight: bold;
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