<template>
        <a-config-provider :locale="zhCN" :theme="{
        token: {
            colorPrimary: '#787EF0',
        }
    }">
        <!-- 一级路由出口 -->
        <router-view></router-view>
    </a-config-provider>


</template>

<script setup lang="ts">
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
dayjs.locale('zh-cn');


</script>

<style scoped>

</style>