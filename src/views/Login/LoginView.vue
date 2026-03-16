<template>
    <footer>
    <div class="head">
        <div class="imgDiv">
            <img src="../../assets/bg.svg" alt="">
        </div>
        <div class="TextDiv">

       <a-card class="TextCard">
            <div class="administrator">管理员登录</div>
            <p class="TextP">欢迎使用蜗牛电影后台管理平台</p>
           <a-form
    layout="inline"
    :model="formState"
        class="formD1">

    <a-form-item>
        <a-input v-model:value="formState.user" placeholder="请输入账号" class="phone" autocomplete="username" >
        <template #prefix><UserOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
        </a-input>
        </a-form-item>
        <a-form-item>
          <a-input v-model:value="formState.password" type="password" placeholder="请输入密码" class="passord"  autocomplete="current-password">
            <template #prefix><LockOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
          </a-input>
        </a-form-item>
        <a-form-item class="butt"> 
            <a-button type="primary" @click="onLogin2">登录</a-button>
        </a-form-item>
        </a-form>
        </a-card>

        </div>
    </div>
    </footer>
    
</template>

<script setup lang="ts">
   import { reactive, ref } from 'vue';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import type { UnwrapRef } from 'vue';
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue';
import { adminLoginApi } from '@/assets/apis/adminApi';
const router = useRouter();
const LoginName=ref()

interface FormState {
  user: string;
  password: string;
}
const formState: UnwrapRef<FormState> = reactive({
  user: '',
  password: '',
});



const onLogin2=async()=>{
        const res=await adminLoginApi({
        phone: formState.user,
        password: formState.password
    }
    )
    if(formState.user!=''&&formState.password!=''){
        if(res.code==200){
        localStorage.setItem('userId',res.data.token)
        LoginName.value=res.data.adminInfo?.name
         message.success('欢迎您，'+LoginName.value)
        router.replace('/');
    }else{
        message.error('账号或密码错误');
    }
    }else{
        message.error('账号或密码不能为空');
    }

}

</script>

<style scoped>
    footer{
       width: 100vw;
       height: 100vh;
        background-color: #f1f2fd;
        display: flex;
        justify-content: center;
        align-items: center;
    }
.head{
    width: 1100px;
    height: 600px;
    display: flex;
}
.imgDiv>img{
    width: 600px;
    height: 600px;
}
.TextDiv{
    display: flex;
    align-items: center;
}
.TextCard{
    width: 450px;
    height: 300px;
    display: flex;
    align-items: center;
}
.administrator{
    font-size: 25px;
    color: rgb(106, 106, 249);
    text-align: center;
}
.TextP{
    text-align: center;
}
.phone,.passord{
    width: 320px;
    height: 40px;
    margin: 24px 0 0 0;
}
.formD1{
    display: flex;
    justify-content: center;
}
.butt{
    margin-top: 24px;
}
</style>