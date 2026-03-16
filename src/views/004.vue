<template>
       <a-menu-item key="1" @click="$router.push({name:'HomePage'})">
          <HomeOutlined />
          <span>首页</span>
        </a-menu-item>
        
          <a-sub-menu key="sub3">
              <template #title>
                <PlayCircleOutlined />
                <span>
                 电影管理
                </span>
              </template>
            
              <a-menu-item key="2" @click="$router.push({name:'MovieTabulation'})">电影列表</a-menu-item>
    
              <a-menu-item key="3" @click="$router.push({name:'MovieType'})">电影类型</a-menu-item>
            </a-sub-menu>
          
            <a-sub-menu key="sub4">
              <template #title>
                <VideoCameraOutlined/>
                <span>
                  影院管理
                </span>
              </template>
              <a-menu-item key="7" @click="$router.push({name:'Cinema'})">影院列表</a-menu-item>
              <a-menu-item key="8" @click="$router.push({name:'CinemaD2'})">影院品牌</a-menu-item>
            </a-sub-menu>

        <a-menu-item key="4" @click="$router.push({name:'Ranking'})">
          <ScheduleOutlined />
          <span>排片管理</span>
        </a-menu-item>

         <a-menu-item key="5" @click="$router.push({name:'Order'})">
          <BarsOutlined />
          <span>订单管理</span>
        </a-menu-item>

        <a-menu-item key="6" @click="$router.push({name:'User'})">
          <UserOutlined />
          <span>用户管理</span>
        </a-menu-item>

        <a-sub-menu key="9">
          <template #title>
            <AuditOutlined />
            <span>
              权限管理
            </span>
          </template>
          <a-menu-item key="10" @click="$router.push({name:'Manage'})">管理员管理</a-menu-item>
          <a-menu-item key="11" @click="$router.push({name:'Juese'})">角色管理</a-menu-item>
        </a-sub-menu>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>