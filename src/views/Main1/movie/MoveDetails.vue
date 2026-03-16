<template>
    <kapin>
            <div style="display: flex; justify-content: space-between;">
        <h2>电影详情</h2>
        <div>
             <a-button :icon="h(RollbackOutlined)" style="margin-right: 10px;"  @click="$router.replace({ name: 'MovieTabulation' })">返回</a-button>
              <a-button type="primary" :icon="h(EditOutlined)" >编辑</a-button>
        </div>
    </div>
    
    <a-row style="margin-top: 20px; display: flex; flex-wrap: nowrap; border-bottom: 1px solid #ccc; padding-bottom: 40px;">
        <a-col>
          <a-image
         :width="220"
         :height="300"
         :src="saveMovieperformer?.cover_image"
         />
        </a-col>

        <a-col style="margin-left: 20px;">
            <div style="display: flex;">
                 <h1 style="margin-right: 10px;">
                {{ saveMovieperformer?.name }}
                </h1>
                <h1 v-if="saveMovieperformer?.ename">({{saveMovieperformer?.ename  }})</h1>
            </div>
           
            <div class="headDiv">
                <span class="headSpan">类型：</span>
                <span>{{saveMovieperformer?.typeIds.map((item:{name:string})=>item.name).join(' ') }}</span>
            </div>

            <div class="headDiv">
                <span class="headSpan">制片国家：</span>
                <span>{{ saveMovieperformer?.regionIds.map((item:{name:string})=>item.name).join(' ')}}</span>
            </div>

            <div class="headDiv">
                <span class="headSpan">制片时间：</span>
                <span>{{ saveMovieperformer?.year }}</span>
            </div>

            <div class="headDiv">
                <span class="headSpan">上映日期：</span>
                <span>{{ saveMovieperformer?.release.join(' / ')}}</span>
            </div>

            <div class="headDiv">
                <span class="headSpan">片长：</span>
                <span>{{saveMovieperformer?.duration}}分钟</span>
            </div>

            <div class="headDiv">
                <span class="headSpan">简介：</span>
                <a-typography-text  class="jj">{{ saveMovieperformer?.synopsis }}</a-typography-text>
            </div>
        </a-col>
    </a-row>

    <a-row style=" display: inline;" >
        <h2 style="margin: 20px 0 20px 0;">演职人员</h2>
        <div>
           <a-col style="display: flex;">

            <div style="width: 150px; margin-right: 20px;" v-for="item in OneMoviePerformer" :key="item._id">
               <a-image
              :width="150"
              :height="200"
              :src="item.personId?.avatar"
              style="border-radius: 10px;"
              />
              <div style="font-size: 18px; text-align: center; margin-top: 10px;">{{ item.personId.name }}</div>
              <div style="font-size: 16px; text-align: center; color: #a2a2a2;">{{ item.role==='导演'? '导演':'饰：'+`${item.role}` }}</div>
            </div>

            <div class="addperformer" @click="showDrawer('default')">
                <PlusOutlined/>
                <div>添加演职人员</div>
            </div>
        </a-col>
        
        </div>
       
    </a-row>
  
    <a-drawer title="添加演职人员" :size="size" :open="open" @close="onClose">
    <template #extra>
      <a-button style="margin-right: 8px" @click="onClose">取消</a-button>
      <a-button type="primary" @click="SaveAdd()">保存</a-button>
    </template>

    演职人员：
    <a-select placeholder="选择演职人员"  style="display: block; margin: 10px 0 20px 0" allow-clear v-model:value="preserveNumber.personId">
        <a-select-option :value=item._id v-for="item in MoviePerformer" >{{ item.name }}</a-select-option>
    </a-select>

    所饰角色：
         <a-input  allow-clear style="margin-top: 10px;" v-model:value="preserveNumber.role"/>
  </a-drawer>
    </kapin>
</template>

<script setup lang="ts">
import { addMoviePerformerApi, addOneMoviePerformerApi, obtainDetailsApi, OneMoviePerformerApi } from '@/assets/apis/adminApi';
import { EditOutlined, PlusOutlined, RollbackOutlined} from '@ant-design/icons-vue';
import { h, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { message, type DrawerProps } from 'ant-design-vue';
const open = ref<boolean>(false);
const size = ref<DrawerProps['size']>('default');
const saveMovieperformer=ref()
const addMovieperformer=useRoute()
const MoviePerformer=ref()
const OneMoviePerformer=ref()
const preserveNumber=ref({
    movieId:addMovieperformer.params?.movieId,
    personId:'',
    role:'',
})

const onClose = () => {
  open.value = false;
};

onMounted(()=>{
    obtainDetailsApi({_id:addMovieperformer.params?.movieId}).then(res=>{
        saveMovieperformer.value=res.data
    })
    addOneMoviePerformerApi({movieId:addMovieperformer.params?.movieId}).then(res=>{
        if(res.code==200){
             OneMoviePerformer.value=res.data?.rows
             console.log(OneMoviePerformer.value);
        }else{}
    })
})



const showDrawer = (val: DrawerProps['size']) => {
     addMoviePerformerApi().then(res=>{
        if(res.code==200){
            MoviePerformer.value=res.data?.rows
        }else{}
  })
  size.value = val;
  open.value = true;

};

function SaveAdd(){
    if(!(preserveNumber.value.personId==''||preserveNumber.value.role=='')){
         OneMoviePerformerApi({...preserveNumber.value}).then(res=>{
        if(res.code==200){
            message.success('添加成功！');
            preserveNumber.value.personId='';
            preserveNumber.value.role='';
        }else{}
    })
    }else{
        message.error('演职人员或所饰角色不能为空！');
    }
   
}




</script>

<style scoped>
.headDiv{
    display: flex;
    margin-top: 10px;
    font-size: 16px;
}
.headSpan{
    display: flex;
    flex-shrink: 0;
    width: 80px;
    color: #a2a2a2;
    font-size: 14px;
}
.jj{
    width: 100%;
    height: 100px;
    overflow: hidden;
    overflow: auto; 
}
.addperformer{
     width:150px;
    height:200px;
    border: 1.5px dashed #ccc;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer !important;
}
</style>