import { createApp } from 'vue'
import './App.css'
import App from './App.vue'
import { setupRouter } from './router';
import { setupAntd } from './plugins/antd';
import { registerGlobalComponents } from './plugins/globalComponents';
import { setupPinia } from './Store';
import { setupDirectives } from './directives';
import { setupEcharts } from './plugins/echarts';
const app = createApp(App)
setupAntd(app);
setupRouter(app);  // 调用路由的注册方法
setupPinia(app); //全局注册Pinia
setupDirectives(app);//注册自定义指令
setupEcharts(app)//注册全局图表组件
app.mount('#app')
registerGlobalComponents(app);//全局组件引用
