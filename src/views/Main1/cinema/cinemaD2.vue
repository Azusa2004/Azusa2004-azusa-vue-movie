<template>
  <kapin>
          <a-breadcrumb style="margin: 0 0 10px 0;">
    <a-breadcrumb-item v-for="value in $route.meta.title"> {{ value }}</a-breadcrumb-item>
    </a-breadcrumb>
        <div class="head">
          <h1>影院品牌</h1>
         <div class="addMovie">
            <a-input-search
            placeholder="请输入品牌名称"
            enter-button
            style="width: 260px;"
            v-model:value="search.name"
            @search="onSearch"/>
          
            <a-button type="primary" @click="showModal" style="margin-left: 10px;">
                <PlusOutlined />
               添加新品牌
            </a-button>
            <a-modal v-model:open="open" title="添加影院品牌" :confirm-loading="confirmLoading" @ok="handleOk(); success()">
                 品牌名称：<a-input style="width: 400px;" v-model:value="addType.name"/>
            </a-modal>
         </div>
    </div>


  <a-table bordered :data-source="dataSource" :columns="columns">
    <template #bodyCell="{ column, text, record }">
      <template v-if="column.dataIndex === 'name'">
        <div class="editable-cell">
          <div v-if="editableData[record.key]" class="editable-cell-input-wrapper">
            <a-input v-model:value="editableData[record.key]!.name" @pressEnter="save(record.key)" />
          </div>
          <div v-else class="editable-cell-text-wrapper">
            {{ text || ' ' }}
            
          </div>
        </div>
      </template>
      <template v-else-if="column.dataIndex === 'operation'">
          <a-button type="primary">
            <EditOutlined />
            编辑</a-button>
          <a-divider type="vertical" />
         <a-button type="primary" danger>
                <a-popconfirm
          v-if="dataSource.length"
          title="确定要删除吗?"
          @confirm="onDelete(record._id)">
          <DeleteOutlined/>
                删除
        </a-popconfirm>
            </a-button>
        
      </template>
    </template>
  </a-table>
  </kapin>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue';
import { addCinemaBrandApi,deleteMoviebrandApi,addMoviebrandApi} from '@/assets/apis/adminApi';
import { reactive } from 'vue';
import type { Ref, UnwrapRef } from 'vue';
import { EditOutlined, DeleteOutlined, PlusOutlined} from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';


const open = ref<boolean>(false);
const confirmLoading = ref<boolean>(false);
const search=ref({name:''})
const addType=ref({name:''})

function onSearch(){
  onLogin2()
}

onMounted(() => {
     onLogin2()
})
//渲染
const onLogin2=()=>{
       addCinemaBrandApi({...search.value}).then(res => {
            dataSource.value=res.data.rows
        }) 
}
//删除
const onDelete = (key: string) => {
   deleteMoviebrandApi({ params:key})
  dataSource.value = dataSource.value.filter(item => item._id !== key);
};

const showModal = () => {
  open.value = true;
};

const handleOk = () => {
  confirmLoading.value = true;
  onLogin3()
  setTimeout(() => {
    open.value = false;
    confirmLoading.value = false;
  }, 2000);
};
const success = () => {
    setTimeout(()=>{
        message.success('操作成功！', 1.5);
    },2300)
};

const onLogin3=()=>{
  const { name } = addType.value
  addMoviebrandApi({name})
}

interface DataItem {
  _id: string;
  name: string;
  age: number;
  address: string;
}

const columns = [
  {
    title: '品牌名称',
    dataIndex: 'name',
    width: '30%',
  },

  {
    title: '操作',
    dataIndex: 'operation',
  },
];
const dataSource: Ref<DataItem[]> = ref([
   
]);

const editableData: UnwrapRef<Record<string, DataItem>> = reactive({});


const save = (key: string) => {
  Object.assign(dataSource.value.filter(item => key === item._id)[0]!, editableData[key]);
  delete editableData[key];
};



</script>

<style scoped>
.head{
    display: flex;
    justify-content: space-between;
}


</style>