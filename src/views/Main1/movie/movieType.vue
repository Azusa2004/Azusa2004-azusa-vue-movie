<template>
  <kapin>
      <a-breadcrumb style="margin: 0 0 10px 0;">
    <a-breadcrumb-item v-for="value in $route.meta.title"> {{ value }}</a-breadcrumb-item>
    </a-breadcrumb>
    <div class="head">
         <h1>电影类型</h1>
         <div class="addMovie">
            <a-input-search
            placeholder="请输入电影名称"
            enter-button
            style="width: 260px;"
            v-model:value="search.name"
            allow-clear
            @search="onSearch"/>
          
            <a-button type="primary" @click="showModal" style="margin-left: 10px;">
                <PlusOutlined />
               添加新类型
            </a-button>
            <a-modal v-model:open="open" :title="`${addType.name? '修改':'添加'}电影类型`" :confirm-loading="confirmLoading" @ok="handleOk()">
                 类型名称：<a-input style="width: 400px;" v-model:value="addType.name"/>
            </a-modal>
         </div>
    </div>
    
    <a-table :columns="columns" :data-source="tableData.rows" >
    <template #headerCell="{ column }">
      <template v-if="column.key === 'name'">
        <span>
          类型名称
        </span>
      </template>
    </template>
    
    <template #bodyCell="{ column,record }">
      <template v-if="column.key === 'name'">
      </template>
      <template v-else-if="column.key === 'action'">
        <span>
          <a-divider type="vertical" />
           <a-button type="primary" @click="onmodify(record)">
            <EditOutlined />
            编辑</a-button>
          <a-divider type="vertical" />
          <a class="ant-dropdown-link">
             <a-button type="primary" danger @click="onDelete">
                <DeleteOutlined/>
                删除
            </a-button>
          </a>
        </span>
      </template>
    </template>
  </a-table>
  </kapin>
</template>

<script setup lang="ts">
    import { DeleteOutlined ,EditOutlined,PlusOutlined} from '@ant-design/icons-vue';
    import { onMounted, ref, watch } from 'vue';
    import { message } from 'ant-design-vue';
    import { adminMovieApi,addMovieTypeApi } from '@/assets/apis/adminApi';

const open = ref<boolean>(false);
const confirmLoading = ref<boolean>(false);
const search=ref({name:''})
const addType=ref({name:''})

const showModal = () => {
  open.value = true;
};

function onSearch(){
  onLogin2()
}

onMounted(() => {
     onLogin2()
})

const onLogin3=()=>{
  const { name } = addType.value
  addMovieTypeApi({name}).then(res=>{
      if(res.code==200){
        setTimeout(()=>{
        message.success('操作成功！', 1.5);
    },2300)
      }else{
        setTimeout(()=>{
        message.error(res.message, 1.5);
    },2300)
      }
  })
  console.log(name);
}



const tableData = ref({
    rows: [],
    total: 0,
})
const onLogin2=()=>{
       adminMovieApi({...search.value}).then(res => {
            if (res.code == 200) {
                 tableData.value=res.data
            } else {
                message.error(res.message);
            }
        }) 
}


const handleOk = () => {
  confirmLoading.value = true;
  onLogin3()
  setTimeout(() => {
    open.value = false;
    confirmLoading.value = false;
  }, 2000);
};


const onDelete = () => {
message.success('删除成功！', 1.5);
    
};

watch(open, () => {
    if (!open.value) {
        addType.value = {name:''}
    }
})

const onmodify=(record:any)=>{
  addType.value={...record}
  open.value = true;
}

const columns = [
  {
    name: 'Name',
    dataIndex: 'name',
    key: 'name',
  },

  {
    title: '操作',
    key: 'action',
  },
]

</script>

<style scoped>
.head{
    display: flex;
    justify-content: space-between;
}

</style>