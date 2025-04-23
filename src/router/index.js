import { createRouter, createWebHistory } from 'vue-router';

// 定义路由规则
const routes = [
  {
    path: '/exam',
    name: 'Exam',
    component: () => import('@/components/Exam.vue'), // 使用别名路径
  },
  {
    path: '/ai',
    name: 'ai',
    component: () => import('@/components/AppAI.vue'), // AI界面
  },
  {
    path: '/work',
    name: 'work',
    component: () => import('@/components/Work.vue'), // 课程页面
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/components/AppSearch.vue'), // 搜索页面
  },
  {
    path: '/book',
    name: 'book',
    component: () => import('@/components/AppBook.vue'), // 搜索页面
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/components/AppMain.vue'), // 主页面
  },
  {
    // path: '/', // 默认路径
    // name: 'default',
    // component: () => import('@/App.vue'), // 登录页面
    path: '/', // 默认路径
    redirect: '/main', // 重定向
  },
];

// 创建路由实例
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL), // 使用 HTML5 History 模式
  routes, // 路由规则
});

// 导出路由实例
export default router;