<template>
    <div>
        <a-breadcrumb style="margin: 0 0 10px 0;">
    <a-breadcrumb-item v-for="value in $route.meta.title"> {{ value }}</a-breadcrumb-item>
    </a-breadcrumb>
        <h1>用户管理</h1>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>