import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';


// 创建应用实例
const app = createApp(App);

// 注册 Element Plus 插件
app.use(ElementPlus);

// 注册 Element Plus 图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

// 使用路由
app.use(router);

// 挂载应用
app.mount('#app');

// app.mount('#app');