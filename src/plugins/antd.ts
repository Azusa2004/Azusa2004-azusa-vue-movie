import Antd from 'ant-design-vue';
import type { App } from 'vue';
export function setupAntd(app: App) {
    app.use(Antd);
}