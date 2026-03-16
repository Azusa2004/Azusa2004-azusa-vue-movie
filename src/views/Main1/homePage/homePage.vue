<template>
    <kapin>
        <a-breadcrumb style="margin: 0 0 10px 0;">
    <a-breadcrumb-item v-for="value in $route.meta.title"> {{ value }}</a-breadcrumb-item>
    </a-breadcrumb>
    <h1>首页</h1>
    <a-row>
        <a-col>
            <VueEcharts  class="VueEcha"></VueEcharts>
        </a-col>
    </a-row>
    </kapin>
</template>

<script setup lang="ts">

</script>

<style scoped>
.VueEcha{
  width: 900px;
  height: 600px;
}
</style>