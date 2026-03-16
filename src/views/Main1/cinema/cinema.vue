<template>
     <kapin>
          <a-breadcrumb style="margin: 0 0 10px 0;">
    <a-breadcrumb-item v-for="value in $route.meta.title"> {{ value }}</a-breadcrumb-item>
    </a-breadcrumb>
        <div class="head">
          <h1>影院列表</h1>
         <div class="addMovie">
            <a-input-search
            placeholder="请输入品牌名称"
            enter-button
            style="width: 260px;"
            v-model:value="search.name"
            allow-clear
            @search="onSearch"/>
          
            <a-button type="primary" @click="showModal" style="margin-left: 10px;" >
                <PlusOutlined />
               添加新影院
            </a-button>
            <a-modal v-model:open="open" title="添加影院品牌" :confirm-loading="confirmLoading" @ok="handleOk(); success()">
                 影院名称：<a-input style="width: 400px;margin-bottom: 5px;" v-model:value="addname.name"/>
                 影院地址：<a-input style="width: 400px; margin-bottom: 5px;" v-model:value="addaddress.address"/>
                 联系电话：<a-input style="width: 400px; margin-bottom: 5px;" v-model:value="addphone.tel"/>
                 影院图片：<a-input style="width: 400px; margin-bottom: 5px;" v-model:value="addimge.image"/>
            </a-modal>
         </div>
    </div>


  <a-table bordered :data-source="tableData.rows" :columns="columns" :pagination="false">
    <template #bodyCell="{ column, text, record }"> 
        
      <template v-if="column.dataIndex === 'name'">
        <div class="editable-cell">
          <div v-if="editableData[record.key]" class="editable-cell-input-wrapper">
            <a-input v-model:value="editableData[record.key]!.name" @pressEnter="save(record.key)" />
          </div>
          <div v-else class="editable-cell-text-wrapper">
            <img :src=record.image alt="" style="width: 40px; height: 40px;">
            {{ text || ' ' }}
          </div>
        </div>
      </template>

      <template v-else-if="column.dataIndex === 'phone'">
        {{ record.tel }}
        
      </template>
      <template v-else-if="column.dataIndex === 'address'">
      </template>
      <template v-else-if="column.dataIndex === 'operation'">
         <a-button  danger @click="$router.push(`CinemaSelect/${record._id}`)">查看详情</a-button>
         <a-divider type="vertical" />
          <a-button type="primary">
            <EditOutlined />
            编辑</a-button>
          <a-divider type="vertical" />
           <a-button type="primary" danger @click="showDeleteConfirm(record._id)">
             <DeleteRowOutlined/>
                删除
           </a-button>
      </template>
    </template>
  </a-table>

   <a-pagination v-model:current="pageData.currentPage" show-quick-jumper :total="tableData.total" @change="onSearch" v-model:page-size="pageData.pageSize"
   :show-total="(total: number) => `共计 ${total} 条数据`"/>
     </kapin>
</template>

<script setup lang="ts">
import {h, onMounted, ref} from 'vue';
import { addmovieCityApi,deletecinemaApi,addcinemaApi} from '@/assets/apis/adminApi';
import { reactive } from 'vue';
import type { Ref, UnwrapRef } from 'vue';
import { EditOutlined, ExclamationCircleOutlined, DeleteRowOutlined, PlusOutlined} from '@ant-design/icons-vue';
import { message, Modal } from 'ant-design-vue';


const open = ref<boolean>(false);
const confirmLoading = ref<boolean>(false);
const search=ref({name:''})
const addname=ref({name:''})
const addaddress=ref({address:''})
const addphone=ref({tel:''})
const addimge=ref({image:''})
const pageData = ref({ currentPage: 1, pageSize: 7 })
const tableData = ref({
    rows: [],
    total: 0,
})

function onSearch(){
  onLogin2()
}

onMounted(() => {
     onLogin2()
})
//渲染
const onLogin2=()=>{
       addmovieCityApi({...pageData.value,...search.value}).then(res => {
            tableData.value=res.data
        }) 
}

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
    onLogin2()
};
const success = () => {
    setTimeout(()=>{
        message.success('操作成功！', 1.5);
    },2300)
};

const onLogin3=()=>{
  const { name } = addname.value
  const {address}=addaddress.value
  const {tel}=addphone.value
  const{image}=addimge.value
  console.log(addimge.value);
  console.log(image);
  addcinemaApi({name,address,tel,image})
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
    title: '联系电话',
    dataIndex: 'phone',
  },
   {
    title: '影院地址',
    dataIndex: 'address',
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


//确认删除框
const showDeleteConfirm = (id: string) => {
  Modal.confirm({
    title: '提示',
    icon: h(ExclamationCircleOutlined),
    content: '删除后数据无法恢复，确认要删除吗？',
    okText: '确认删除',
    okType: 'danger',
    cancelText: '取消',
    onOk() {
   deletecinemaApi({_id:id})
   onLogin2()
  message.success('删除成功！');
    },
    onCancel() {
    },
  });
};

</script>

<style scoped>
.head{
    display: flex;
    justify-content: space-between;
}
.editable-cell-text-wrapper{
    display: flex;
    align-items: center;
}

</style>