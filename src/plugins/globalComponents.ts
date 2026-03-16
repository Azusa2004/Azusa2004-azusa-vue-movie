//注册全局组件
import Kapin from "@/components/kapian/kapin.vue";
import type { App } from "vue";

export function registerGlobalComponents(app: App) {
    app
        .component('kapin', Kapin)
}