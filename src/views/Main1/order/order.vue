<template>
    <div>
    <kapin class="kapianSize">
     <div class="SelectDiv">
        <Selectt placeholder="选择电影" class="Select"  :options="Movie.rows"></Selectt>
        <Selectt placeholder="选择影院"   class="Select" :options="cinema.rows"></Selectt>
        <Selectt placeholder="选择放映厅"  class="Select" :options="Screening.rows"></Selectt>
        <a-input-search placeholder="搜索演职人员姓名" enter-button @search="" style="width: 300px;" allow-clear class="Select"/>
    </div>
    <div class="ButtonDiv">
        <a-button type="primary">搜索</a-button>
         <a-button style="margin-left: 10px;" >重置</a-button>
    </div>
    </kapin>
    <kapin>
         <div>
        <h2>订单管理</h2>
            <Tablel :columns="columns" :tableData="tableData">
                <template #MovieName="{record}">
                    《{{ record?.scheduleId?.movieId?.name }}》
                </template>
                <template #cinema="{record}">
                    {{ record?.scheduleId?.theatreId?.name }}
                </template>
                <template #Screening="{record}">
                    {{ record?.scheduleId?.hallId?.name }}
                </template>
                <template #seat="{record}">
                    <a-tag color="orange" v-for="item in record?.seatIds">{{ item?.row }}排{{ item?.col }}坐</a-tag>
                </template>
                <template #ShowingTime="{record}">
                   {{ record?.create_time }}
                </template>
                <template #money="{record}">
                    <div style="color: crimson;">
                         ￥{{ record?.price }}
                    </div>
                </template>
                <template #Time="{record}">
                    {{ record.userId?.create_time }}
                </template>
                <template #user="{record}">
                    {{ record.userId?.nickname }}
                </template>
                <template #operate>
                     <a-button type="primary" danger @click="">
                    <DeleteOutlined/>
                     删除
                    </a-button>
                </template>
            </Tablel>
    </div>
    </kapin>
    </div>
   

   
</template>

<script setup lang="ts">
import { addMovieApi, addmovieCityApi, addorderApi, addScreeningApi } from '@/assets/apis/adminApi';
import kapin from '@/components/kapian/kapin.vue';
import Selectt from '@/components/select/Selectt.vue';
import { onMounted, ref } from 'vue';
import Tablel from '@/components/Table/Tablel.vue';
import { DeleteOutlined } from '@ant-design/icons-vue';
const tableData = ref({ 
        rows: [], 
        total: 0 ,
        
 });
const Movie=ref({
        rows: [], 
        total: 0,
        search:'',
})
const cinema=ref({
        rows: [], 
        total: 0 ,
        search:'',
})
const Screening=ref({
        rows: [], 
        total: 0 ,
        search:'',
})

const columns=[
     {
        title:'电影',
        dataIndex: 'MovieName',
        key:'MovieName',
    },
     {
        title:'影院',
        dataIndex: 'cinema',
        key:'cinema',
    },
      {
        title:'放映厅',
        dataIndex: 'Screening',
        key:'Screening',
    },
      {
        title:'座位',
        dataIndex: 'seat',
        key:'seat',
    },
    {
        title:'放映时间',
        dataIndex: 'ShowingTime',
        key:'ShowingTime',
    },
    {
        title:'订单金额',
        dataIndex: 'money',
        key:'money',
    },
    {
        title:'下单时间',
        dataIndex: 'Time',
        key:'Time',
    },
     {
        title:'购买用户',
        dataIndex: 'user',
        key:'user',
    },
     {
        title:'操作',
        dataIndex: 'operate',
        key:'operate',
    },
]
onMounted(()=>{
    addData()
    allorder()
})

const addData=()=>{
    addMovieApi().then(res=>{
        if(res.code==200){
            Movie.value=res.data
        }
    })
    addmovieCityApi().then(res=>{
        if(res.code==200){
            cinema.value=res.data
        }
    })
    addScreeningApi().then(res=>{
        if(res.code==200){
            Screening.value=res.data
        }
    })
}
const allorder=()=>{
    addorderApi().then(res=>{
        if(res.code==200){
            tableData.value=res.data
        }
        console.log(res);
        
    })
}
</script>

<style scoped>
.kapianSize{
    margin-bottom: 15px;
}
.ButtonDiv{
    display: flex;
    justify-content: end;
}
.Select{
    width: 343px;
}
.SelectDiv{
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
}
</style>