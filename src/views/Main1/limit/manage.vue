<template>
  <kapin>
    <div style="display: flex; justify-content: space-between;">
      <h2>管理员列表</h2>
      <a-button type="primary" @click="addadministrator">
             <PlusOutlined />
            添加新管理员
       </a-button>
    </div>
      
    <Tablel :columns="columns" :tableData="tableData">
          <template #operation="{record}">
          <a-button type="primary" @click="modifyAdministrator(record._id)">
            <EditOutlined />
            编辑</a-button>
          <a-divider type="vertical" />
         <a-button type="primary" danger @click="deleteadministrator(record._id)">
          <DeleteOutlined/>
                删除
            </a-button>
            </template>

            <template #avatar="{record}">
                <img :src="record.avatar" alt="" width="60px" height="80px">
            </template>

            <template #juese="{record}">
                {{ record.roleId?.name }}
            </template>
    </Tablel>

          <a-modal v-model:open="open" title="修改管理员"  @ok="arratyu">
            <a-row :gutter="[0,20]" style="display: flex; flex-direction: column; margin-top: 10px;">
             <a-col class="flex" >
                <div class="nameDIv">管理员姓名：</div>
                <a-input  placeholder="请输入账号" style="width: 340px;" v-model:value="newAdministrator.name"/>
            </a-col>
                
            <a-col class="flex">
                <div class="nameDIv">设置管理员账号：</div>
                <a-input  placeholder="请输入密码" style="width: 340px;" v-model:value="newAdministrator.phone"/>
            </a-col>

            <a-col class="flex">
               <div class="nameDIv">设置管理员账密码：</div>
               <a-input-password  style="width: 340px;" v-model:value="newAdministrator.password"/>
            </a-col>
            <a-col class="flex">
              <div class="nameDIv">请选择角色：</div>
              <Selectt _placeholder :options="owner" style="width: 340px;" v-model:value="newAdministrator.roleId"></Selectt>
            </a-col>
            <a-col style="display: flex;">
              <div class="nameDIv">设置头像：</div>
              <div>
                <a-upload
                  v-model:file-list="fileList"
                  name="file"
                  list-type="picture-card"
                  class="avatar-uploader"
                  :show-upload-list="false"
                  action="http://nocat.life:3014/images/upload"
                  
                  @change="handleChange">
                  <img v-if="newAdministrator.avatar" :src="newAdministrator.avatar" alt="file" />
                  <div v-else>
                    <LoadingOutlined v-if="false"></LoadingOutlined>
                    <plus-outlined v-else></plus-outlined>
                    <div class="ant-upload-text">上传图片</div>
                  </div>
                  </a-upload>
              </div>
               
            </a-col>
            </a-row>
           
        </a-modal>  
  </kapin>
</template>

<script setup lang="ts">
import { addadministrator2Api, addadministratorApi, deleteadministratorApi, getTableDataApi, modifyAdministratorApi } from '@/assets/apis/adminApi';
import { DeleteOutlined, EditOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons-vue';
import Selectt from '@/components/select/Selectt.vue';
import Tablel from '@/components/Table/Tablel.vue';
import { onMounted, ref } from 'vue';
import { message,  type UploadChangeParam } from 'ant-design-vue';
import { confirmDelete } from '@/hooks/useDelete';

const attendantData=ref()
const open=ref<boolean>(false)
const fileList = ref([]);
const owner=ref([]);
const tableData = ref({ 
        rows: [], 
        total: 0 
    });
const newAdministrator=ref({
    name:'' as string,
    phone:'' as string,
    password:'' as string,
    roleId:'' as string,
    avatar:''as string
})

onMounted(()=>{
    getTableData()
    addadministratorApi().then(res=>{
    if(res.code==200){
      owner.value=res.data.rows
    }
  })
})
const columns = [
     {
    title: '头像',
    dataIndex: 'avatar',
    key:'avatar',
  },
  {
    title: '姓名',
    dataIndex: 'name',
    key:'name',
  },
  {
    title: '账号',
    dataIndex: 'phone',
    key:'phone',
  },
   {
    title: '密码',
    dataIndex: 'password',
    key:'password',
   
  },
    {
    title: '角色',
    dataIndex: 'juese',
    key:'juese',
    
  },

  {
    title: '操作',
    dataIndex: 'operation',
    key:'operation',
    
  },
];

const getTableData =()=>{
    getTableDataApi().then(res=>{
        if(res.code==200){
            tableData.value=res.data
            console.log(tableData.value);
            
        }
    })
}


const addadministrator=()=>{
  attendantData.value = null;
  newAdministrator.value={
    name:'',
    phone:'' ,
    password:'',
    roleId:'',
    avatar:''
  }
  open.value=true
}
const arratyu=()=>{
  if(!attendantData.value || !attendantData.value._id){
    //添加
    addadministrator2Api({...newAdministrator.value}).then(res=>{
    if(res.code==200){
      message.success('添加成功！');
    }else{
      message.error(res.message)
    }
  })
  }else{
    //修改
    modifyAdministratorApi({ ...newAdministrator.value,_id:attendantData.value?._id,name:newAdministrator.value?.name}).then(res=>{
      if(res.code==200){
        message.success('修改成功！');
       getTableData()
      }else{
        message.error(res.message)
      }
    })
  }
}

const handleChange = (info: UploadChangeParam) => {
  if (info.file.status === 'done') {
    newAdministrator.value.avatar=info.file.response?.data
  }
  if (info.file.status === 'error') {
    message.error('upload error');
  }
};

//删除管理员
const deleteadministrator=(id:string)=>{
  confirmDelete(id,deleteadministratorApi,getTableData)
}
//修改管理员
const modifyAdministrator=(id:string)=>{
open.value=true
 attendantData.value= tableData.value?.rows.find(((item:any)=>{
    return item._id==id
  }))
  console.log('55',attendantData.value);
  newAdministrator.value = {
  name: attendantData.value.name || '',
  phone: attendantData.value.phone || '',
  password: attendantData.value.password || '',
  roleId: attendantData.value?.roleId?._id || '',  // 从对象中提取 _id
  avatar: attendantData.value.avatar || ''
};
}

</script>

<style scoped>
.flex{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nameDIv{
  width: 130px;
  text-align: right;
  padding-right: 10px;
}


</style>