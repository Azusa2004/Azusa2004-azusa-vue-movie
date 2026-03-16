import VueEcharts from 'vue-echarts';
import * as echarts from 'echarts';
import type { App } from 'vue';
export const setupEcharts = (app: App) => {
    // 注册全局图标表组件
    app.component('VueEcharts', VueEcharts);
    // 将echarts对象全局挂载到 $echarts 属性
    app.config.globalProperties.$echarts = echarts;
}