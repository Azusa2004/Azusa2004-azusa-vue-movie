import { getglobalApi, type IAdmin } from "@/assets/apis/adminApi";
import { defineStore } from "pinia";

export const useGlobalStore = defineStore('global', {
    state: () => ({
        adminInfo: null as (null | IAdmin),  // 初始值
    }),
    getters: {
        permissions: (state) => {
            return state.adminInfo?.roleId?.permissions
        }
    },
    actions: {
        async getActivePinia() {
            const res = await getglobalApi();
            if (res.code == 200) {
                this.adminInfo = res.data
            }
        }
    }
})