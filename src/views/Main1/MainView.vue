<template>
      <div>
       <a-layout style="min-height: 100vh;">
      <a-layout-sider  :trigger="null" collapsible>
      <div class="logo">
        <div class="logoName">蜗牛电影</div>
        <div class="logoText">管理系统</div>
      </div>
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline" :items="limitRoute" @click="handleMenuClick">
      </a-menu>

    </a-layout-sider>
    <a-layout>
      <div style="text-align: end; padding: 8px 20px 0 0; height: 70px; background-color: white;">
      <a-popover placement="bottomRight">
        <template #content>
          <a style="display: block;">个人中心</a>
          <a @click="goLogin">退出登录</a>
        </template>
        管理员：{{globalStore.adminInfo?.name  }}&nbsp;
        <a-avatar :size="54" :src=globalStore.adminInfo?.avatar>
        <template #icon><UserOutlined/></template>
      </a-avatar>
      </a-popover>
     </div>

      <router-view :style="{margin: '24px 16px'}"></router-view>
    </a-layout>
  </a-layout>
  </div>
</template>

<script setup lang="ts">
import { computed, h, onMounted, reactive, ref} from 'vue';
import  {
    HomeOutlined,
    PlayCircleOutlined,
    ScheduleOutlined,
    VideoCameraOutlined,
    BarsOutlined,
    UserOutlined,
    AuditOutlined,
    UsergroupDeleteOutlined
} from '@ant-design/icons-vue';
import { useGlobalStore } from '@/Store/global';
import { goLogin } from '@/router';
import { useRouter } from 'vue-router';
const selectedKeys = ref<string[]>(['HomePage']);
const globalStore=useGlobalStore();
onMounted(async()=>{
 await globalStore.getActivePinia()

})

const items=reactive([
    {
      key:'HomePage',
      icon:()=>h(HomeOutlined),
      label:'首页'
    },
    {
      key:'movie',
      icon:()=>h(PlayCircleOutlined),
      label:'电影管理',
      children:[
          {
            key:'MovieTabulation',
            label:'电影列表',
          },
          {
            key:'MovieType',
            label:'电影类型',
          }
      ]
    },
    {
      key:'Cinema',
      icon:()=>h(VideoCameraOutlined),
      label:'影院管理',
      children:[
          {
            key:'Cinema',
            label:'影院列表',
          },
          {
            key:'CinemaD2',
            label:'影院品牌',
          }
      ]
    },
    {
      key:'Ranking',
      icon:()=>h(ScheduleOutlined),
      label:'排片管理',
    },
    {
      key:'Order',
      icon:()=>h(BarsOutlined),
      label:'订单管理',
    },
    {
      key:'Performer',
      icon:()=>h(UsergroupDeleteOutlined),
      label:'演职人员',
    },
    {
      key:'User',
      icon:()=>h(UserOutlined),
      label:'用户管理',
    },
      {
      key:'obj',
      icon:()=>h(AuditOutlined),
      label:'权限管理',
      children:[
          {
            key:'manage',
            label:'管理员管理',
          },
          {
            key:'juese',
            label:'角色管理',
          }
      ]
    },
])

//点击切换
const router = useRouter();

const handleMenuClick = ({ key }: { key: string }) => {
  router.push(key);
};

const limitRoute=computed(()=>{
  return[
     {
      key:'HomePage',
      icon:()=>h(HomeOutlined),
      label:'首页'
    },

     ...mapMenu(items),
      {
      key:'manage',
      icon:()=>h(AuditOutlined),
      label:'权限管理',
      children:[
          {
            key:'manage',
            label:'管理员管理',
          },
          {
            key:'juese',
            label:'角色管理',
          }
      ]
    },
    ];
})

function mapMenu(menuData: any = []){
   return menuData.reduce((prev:any,item:any)=>{
      //当前数组对象在不在权限数组中
      if(globalStore.permissions?.includes(item.key)){
          const permissionChildren = mapMenu(item.children);
          if(permissionChildren.length > 0){
            return[
              ...prev,
              {
                ...item,
                children: permissionChildren
              }
            ]
          }
          delete item.children;
            return [
                ...prev,
                item
            ]
      }
      return prev;
    },[])


}
</script>

<style scoped>
  #components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}

.site-layout .site-layout-background {
  background: #fff;
}

.logo{
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.logo>.logoName{
  color: white;
  font-size: 24px;
  text-align: center;
}
.logo> .logoText{
  color: white;
  font-size: 14px;
  text-align: center;
  
}

</style>