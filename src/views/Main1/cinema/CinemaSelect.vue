<template>
    <div>
     <kapin>
        <h2 class="Moviename">影院详情</h2>
        <a-row style="margin-top: 15px; display: flex; flex-wrap: nowrap;">
            <a-col>
            <a-image
              :width="220"
              :height="220"
              :src=cinemaData?.image />
            </a-col>
            
            <a-col style="margin-left: 20px; width: 100%;">
                <div style=" width: 100%;" class="flex">
                    <h2>{{cinemaData?.name}}</h2>
                    <div>
                        <a-button type="primary" style="margin-right: 10px;" @click="$router.replace({name:'Cinema'})">返回</a-button>
                        <a-button type="primary" danger>删除</a-button>
                    </div>
                </div>
                <p style="margin-top: 10px; color: #8d8d8d;">影院地址：{{ cinemaData?.address }}</p>
                <p style="margin-top: 10px; color: #8d8d8d">联系方式：{{ cinemaData?.tel }}</p>
                
                <img src="" alt="">
            </a-col>
        </a-row>

    </kapin>
        
    <kapin style="margin-top: 20px;">
        <div class="flex">
             <h2 style="padding-bottom: 14px;">放映厅管理（{{ScreeningRoomData?.length}}）</h2>
               <a-button type="primary" @click="showModal">
                <PlusOutlined />
               添加新影院
            </a-button>
        </div>

         <a-row>
            <a-col v-for="item in ScreeningRoomData" style="margin:0 20px 20px 0;">
             <a-card hoverable style="width: 300px">
            <template #actions>
            <SettingOutlined key="setting" />
            <EditOutlined key="edit" />
            <EllipsisOutlined key="ellipsis" />
            </template>
            <div class="flex">
                <h3>{{ item?.name }}</h3>
                <a-tag color="green">营业中</a-tag>
            </div>
            <p style="color: #8d8d8d;">{{ item.typeId?.name }}</p>
            
            <div class="flex" style="margin-top: 15px;">
                <span>位置总数</span>
                <span>{{item.seatCols*item?.seatRows}}个</span>
            </div>

             <div  style="margin-top: 15px;">
                <div style="margin-bottom: 15px;">设备配置</div>
                <a-tag color="default" v-for="itemAge in item.facilityIds">
                <template #icon>
                </template>
                {{ itemAge?.name }}
                </a-tag>
            </div>
            </a-card>
            </a-col>
         </a-row>  
         
        <a-modal v-model:open="open" title="添加放映厅" @ok="handleOk">
            <a-row justify="end" :gutter="[0,20]">
                 <a-col>名称：<a-input  placeholder="放映厅名称"  class="Textwidth"  v-model:value="windowNumber.name"/></a-col>
            <a-col>
                类型：<a-select placeholder="选择放映厅类型" class="Textwidth" v-model:value="windowNumber.typeId" allow-clear>
                    <a-select-option :value="item._id" v-for="item in Abutton.getqueryType.rows">{{ item.name }}</a-select-option>
                    </a-select>
            </a-col>
            <a-col>
                座位行数：<a-input  placeholder="放映厅座位行数" class="Textwidth" v-model:value="windowNumber.seatRows"/>
            </a-col>
            <a-col>
                座位列数：<a-input  placeholder="放映厅座位列数" class="Textwidth" v-model:value="windowNumber.seatCols"/>
            </a-col>
            <a-col>
                设备配置：<a-select placeholder="选择放映厅设备配置" class="Textwidth" v-model:value="windowNumber.facilityIds" allow-clear mode="multiple">
                        <a-select-option :value="item._id" v-for="item in Abutton.getequipment.rows">{{ item.name }}</a-select-option>
                        </a-select>
            </a-col>
            </a-row>
           
        </a-modal>
    </kapin>
    </div>
</template>

<script setup lang="ts">
import { addqueryApi, getCinemaApi, getequipmentApi, getqueryTypeApi, oneCinemaApi } from '@/assets/apis/adminApi';
import { EditOutlined, EllipsisOutlined, PlusOutlined, SettingOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
const getoneCinemaID=useRoute();
const cinemaData=ref()
const ScreeningRoomData=ref()
const facilityIdsArray=ref()
const open = ref<boolean>(false);
const reg=/^[1-9][0-9]*$/
interface AbuttonRowsT {
    _id: number;
    name: string
}
const Abutton=ref({
    getqueryType:{
        rows:[] as AbuttonRowsT[],
        total:'' as string,
    },
    getequipment:{
        rows:[] as AbuttonRowsT[],
        total:'' as string,
    }
})
const windowNumber=ref({
    theatreId:getoneCinemaID.params?.movieId,
    name:'',
    typeId:undefined,
    seatRows:'',
    seatCols:'',
    facilityIds:undefined
})




//主页面渲染
onMounted(()=>{
    oneCinema()
})
const oneCinema=()=>{
    oneCinemaApi({_id:getoneCinemaID.params?.movieId}).then(res=>{
        if(res.code==200){
            cinemaData.value=res.data
            getCinemaApi({theatreId:cinemaData.value?._id}).then(res=>{
                if(res.code==200){
                    ScreeningRoomData.value=res.data
                    facilityIdsArray.value=ScreeningRoomData.value?.facilityIds?.map((item:any)=>item)
                }else{
                }
             })
        }else{}
    })
    
}


//对话框下拉框渲染
const showModal = () => {
  open.value = true;
  getqueryTypeApi().then(res=>{
    if(res.code==200){
        Abutton.value.getqueryType=res.data
        console.log(Abutton.value.getqueryType);
    }else{}
  })

    getequipmentApi().then(res=>{
        if(res.code==200){
           Abutton.value.getequipment=res.data
        }else{}       
   })
};

//确定添加
const handleOk = () => {
     if(windowNumber.value.name!=''&&windowNumber.value.seatRows!=''&&windowNumber.value.seatCols!=''){
        if(reg.test(windowNumber.value.seatRows)&&reg.test(windowNumber.value.seatCols)){
            addqueryApi({...windowNumber.value}).then(res=>{
                if(res.code==200){
                    console.log(res);
                    message.success('添加成功');
                    open.value = false;
                    windowNumber.value={
                     theatreId:'',
                    name:'',
                    typeId:undefined,
                    seatRows:'',
                    seatCols:'',
                    facilityIds:undefined
            }
                }
            })
            
        }else{
            message.error('请输入正确的行列数');
        }
        }else{
             message.error('影厅名称、座位行数或座位列数不能为空！');
        }
};
</script>

<style scoped>
.Moviename{
    padding-bottom: 14px;
    border-bottom: 1px solid #ccc;
}
.flex{
    display: flex;
    justify-content: space-between;
}
.Textwidth{
    width: 400px;
}
</style>