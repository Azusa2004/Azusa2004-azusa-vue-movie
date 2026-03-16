<template>
    <div>
         <kapin class="kapianSize">
     <div class="SelectDiv">
        <Selectt placeholder="选择电影" :options="Movie.rows" class="Select" v-model:value="Movie.search"></Selectt>
        <Selectt placeholder="选择影院" :options="cinema.rows"  class="Select" v-model:value="cinema.search"></Selectt>
        <Selectt placeholder="选择放映厅" :options="Screening.rows" class="Select" v-model:value="Screening.search"></Selectt>
        <Selectt placeholder="选择放映语言" :options="language.rows" class="Select" v-model:value="language.search"  value-key="name"></Selectt>
    </div>
    <div class="ButtonDiv">
        <a-button type="primary">搜索</a-button>
         <a-button style="margin-left: 10px;" >重置</a-button>
    </div>
    </kapin>
    
    <kapin class="kapianSize">
        <div class="SelectDiv">
            <h2>排片列表</h2>
            <a-button type="primary"  style="margin-left: 10px;" @click="showDrawer" v-auth="'AddMovie'">
            <PlusOutlined/>
                添加排片
            </a-button>   
        </div>

        <Tablel :columns="columns" :tableData="tableData">
            <template #MovieName="{record}">
                <div style="color: #787ef0;">
                    《{{ record.movieId?.name}}》
                </div>
            </template>
            <template #cinema="{record}">{{ record.theatreId?.name }}</template>
            <template #Screening="{record}">{{ record.hallId?.name }}</template>
            <template #ScreeningTime="{record}">{{ record.showDate }} {{ record.showTime}}</template>
            <template #Time="{record}">{{ record.movieId?.duration }}分钟</template>
            <template #ticketprice="{record}">
                <div style="color: red;">
                    ￥{{ record.price }}
                </div>
            </template>
            <template #operate="{record}">
                <a-button type="primary" @click="editqueue(record)">
                <EditOutlined/>
                编辑</a-button>
                <a-divider type="vertical" />
                <a-button type="primary" danger @click="deletequeue(record._id)">
                <DeleteOutlined/>
                删除
            </a-button>
            </template>
        </Tablel>
    </kapin>

        <a-drawer :title="MovieIDD? '编辑排片': '添加排片'" :open="open" @close="onClose">
        <template #extra>
        <a-button type="primary" @click="afterOpenChange">保存</a-button>
        </template>
        电影
        <Selectt placeholder="选择电影" :options="Movie.rows" class="Select2" v-model:value="addqueue.movieId"></Selectt>
        影院
        <Selectt placeholder="选择影院" :options="cinema.rows"  class="Select2" v-model:value="addqueue.theatreId"></Selectt>
        放映厅
        <Selectt placeholder="选择放映厅" :options="Screening.rows" class="Select2" v-model:value="addqueue.hallId"></Selectt>
        放映时间
        <a-form-item  name="date1" class="Select2">
        <a-date-picker
        show-time
        type="date"
        placeholder="选择放映时间"
        style="width: 100%"
        value-format="YYYY-MM-MM HH:mm"
         v-model:value="addqueue.fullTime"/>
        </a-form-item>
        语言版本
        <Selectt placeholder="选择放映语言" :options="language.rows" class="Select2"  value-key="name" v-model:value="addqueue.language"></Selectt>
        票价
        <a-input-number id="inputNumber" v-model:value="addqueue.price" :min="1"  class="Select2"/>
        </a-drawer>
        </div>

</template>

<script setup lang="ts">
 import { onMounted, ref, watch } from 'vue';
 import kapin from '@/components/kapian/kapin.vue';
import Selectt from '@/components/select/Selectt.vue';
import Tablel from '@/components/Table/Tablel.vue';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons-vue';
import { addlanguageApi, addMovieApi, addmovieCityApi, addMovierankingApi, addqueueApi, addScreeningApi, deletequeueApi, rankingApi } from '@/assets/apis/adminApi';
import { message } from 'ant-design-vue';
const MovieIDD=ref()
const open = ref<boolean>(false);
const columns=[
    {
        title:'电影名称',
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
        title:'放映时间',
        dataIndex: 'ScreeningTime',
        key:'ScreeningTime',
    },
     {
        title:'时长',
        dataIndex: 'Time',
        key:'Time',
    },
     {
        title:'语言',
        dataIndex: 'language',
        key:'language',
    },
     {
        title:'票价',
        dataIndex: 'ticketprice',
        key:'ticketprice',
    },
      {
        title:'操作',
        dataIndex: 'operate',
        key:'operate',
        width:'214px'
    },
    
]
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
const language=ref({
        rows: [], 
        total: 0 ,
        search:'',
})

const addqueue=ref({
    movieId:'',
    theatreId:'',
    hallId:'',
    fullTime:'',
    language:'',
    price:'',
})

onMounted(()=>{
    addData()
    addMovie()
})

watch([Movie,cinema,Screening,language],()=>{
   addMovie()
},{deep:2})

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
    addlanguageApi().then(res=>{
        if(res.code==200){
            language.value=res.data
        }
    })
}

const addMovie=()=>{
       addMovierankingApi({
        movieId:Movie.value.search,
        theatreId:cinema.value.search,
        hallId:Screening.value.search,
        language:language.value.search
    }).then(res=>{
        if(res.code==200){
            tableData.value=res.data
        }
    })
}
//添加排片
const afterOpenChange = () => {
    if(!MovieIDD.value){
        addqueueApi({...addqueue.value}).then(res=>{
        if(res.code==200){
            message.success('添加成功！');
              addqueue.value = {
                movieId: '',
                theatreId: '',
                hallId: '',
                fullTime: '',
                language: '',
                price: '',
                
            }
            addMovie()
        }else{
            message.error(res.message);
        }
    })

    }else{
        rankingApi({_id:MovieIDD.value._id, ...addqueue.value}).then(res=>{
            if(res.code==200){
             message.success('修改成功！');
              addMovie()
            }else{
                message.error(res.message);
            }
           
        })
       
    }
 
  
};
//删除排片
const deletequeue=(id:string)=>{
    deletequeueApi({_id:id}).then(res=>{
        if(res.code==200){
            message.success('删除成功！');
            addMovie()
        }else{
            message.error(res.message);
        }
    })
}
//编辑排片
const editqueue=(movie:{})=>{
    MovieIDD.value=movie
    open.value=true
     addqueue.value = {
        movieId:MovieIDD.value.movieId._id,
        theatreId:MovieIDD.value.theatreId._id,
        hallId: MovieIDD.value.hallId._id,
        fullTime: MovieIDD.value.fullTime,
        language: MovieIDD.value.language,
        price: MovieIDD.value.price
,
    }

}
const showDrawer = () => {
MovieIDD.value=null
  open.value = true;
};
const onClose = () => {
   addqueue.value = {
    movieId: '',
    theatreId: '',
    hallId: '',
    fullTime: '',
    language: '',
    price: '',
  }
  open.value = false;
};
</script>

<style scoped>
.kapianSize{
    margin: 15px;
}
.Select{
    width: 343px;
}
.SelectDiv{
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
}
.ButtonDiv{
    display: flex;
    justify-content: end;
}
.Select2{
    width: 343px;
    margin: 5px 0 20px 0;
}
</style>