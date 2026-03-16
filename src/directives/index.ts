import { useGlobalStore } from "@/Store/global";
import type { App } from "vue";

export function setupDirectives(app: App) {
    app.directive('auth', {
        mounted(el, binding) {
            const globalStore = useGlobalStore();
            console.log(globalStore.permissions);

            if (!globalStore.permissions?.includes(binding.value)) {
                el.remove();
            }
        }
    })
}