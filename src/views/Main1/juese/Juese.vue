<template>
    <kapin>
        <div style="display: flex;justify-content: space-between;">
            <h2>角色管理</h2>
             <a-button type="primary" @click="characterButto">
                <PlusOutlined />
               添加新角色
            </a-button>
        </div>
        
        <Tablel :columns="columns" :tableData="addadministratorArray">
            <template #power="{record}">
                {{ record.permissions?.map((item:any)=>item).join(` 、`)}}
            </template>

            <template #operate="{record}">
          <a-button type="primary">
            <EditOutlined />
            编辑</a-button>
          <a-divider type="vertical" />
         <a-button type="primary" danger @click="showDeleteConfirm(record._id)">
          <DeleteOutlined/>
                删除
            </a-button>
            </template>
        </Tablel>
            <a-modal v-model:open="open" title="添加新角色" @ok="confirmAdd">
            <a-row :gutter="[0,20]" style="display: flex; flex-direction: column;">
             <a-col >
                名称：<a-input  placeholder="输入角色名称" style="width: 400px;" v-model:value="characterName"/>
            </a-col>
          
            <a-col>
                权限：
                <a-tree
                v-model:checkedKeys="checkedKeys"
                checkable
                :tree-data="treeData"
                >
                </a-tree>
            </a-col>
         
            </a-row>
           
        </a-modal>
    </kapin>
</template>

<script setup lang="ts">
import { addadministratorApi, addcharacterApi, deletecharacterApi } from '@/assets/apis/adminApi';
import kapin from '@/components/kapian/kapin.vue';
import Tablel from '@/components/Table/Tablel.vue';
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons-vue';
import { message, Modal, type TreeProps } from 'ant-design-vue';
import { h, onMounted, ref } from 'vue';

const addadministratorArray=ref({
    rows:[],
    total:0
})
const open=ref<boolean>(false)

onMounted(()=>{
    addadministrator()
})

const columns=[
    {
    title: '角色名称',
    dataIndex: 'name',
    key:'name',
    },
    {
    title: '权限',
    dataIndex: 'power',
    key:'power',
    },
    {
    title: '操作',
    dataIndex: 'operate',
    key:'operate',
    width:'250px'
    }
]

const addadministrator=()=>{
    addadministratorApi().then(res=>{
        if(res.code==200){
            addadministratorArray.value=res.data
            console.log(addadministratorArray.value); 
        }
    })
}

const characterButto=()=>{
open.value=true;
}


const treeData: TreeProps['treeData'] = [
  {
    title: '电影管理',
    key: 'movie',
    children: [
      {
        title: '电影列表',
        key: 'MovieTabulation',
        children: [
          { title: '添加电影', key: 'AddMovie'},
          { title: '修改电影', key: 'modifyMovie/:movieId' },
          { title: '电影详情', key: 'MovieDetails/:movieId' },
        ],
      },
      {
        title: '电影类型列表',
        key: 'MovieType',
        children: [
            { key: 'MovieType1', title: '添加电影类型' },
            { key: 'MovieType2', title: '修改电影类型'},
        ],
      },
    ],
  },
  {
    title: '影院管理',
    key: 'cinema',
    children: [
      {
        title: '影院列表',
        key: 'Cinema',
        children: [
          { title: '添加影院', key: 'Cinema1'},
          { title: '修改影院', key: 'Cinema2'},
          { title: '影院详情', key: 'CinemaSelect/:movieId'},
        ],
      },
      {
        title: '影院品牌列表',
        key: 'CinemaD2',
        children: [
            { key: 'CinemaD21', title: '添加影院品牌' },
            { key: 'CinemaD22', title: '修改影院品牌'},
        ],
      },
    ],
  },
  {
    title: '排片管理',
    key: 'Ranking',
  },
  {
    title: '订单管理',
    key: 'Order',
  },
  {
    title: '演职人员',
    key: 'Performer',
  },
    {
    title: '用户管理',
    key: 'User',
  },
    {
    title: '权限管理',
    key: 'movie',
    children: [
      {
        title: '管理员管理',
        key: 'manage',
      },
      {
        title: '角色管理',
        key: 'juese',
      },
    ],
  },
];


//添加角色
const checkedKeys = ref<string[]>([]);
const characterName=ref('')
const confirmAdd=()=>{
    if(characterName.value!=''){
         addcharacterApi({name:characterName.value,permissions:checkedKeys.value}).then(res=>{
        if(res.code==200){
        message.success('添加成功！');
        checkedKeys.value=[]
        characterName.value=''
        addadministrator()
        open.value=false
    }
  })
    }else{
        message.error('角色名称不能为空！');
    }
 
    
}

//删除角色
const showDeleteConfirm = (id:string) => {
  Modal.confirm({
    title: '确认要删除吗?',
    icon: h(ExclamationCircleOutlined),
    content: '此操作不可恢复',
    okText: '删除',
    cancelText: '取消',
    onOk() {
     deletecharacterApi({_id:id}).then(res=>{
     if(res.code==200){
          message.success('删除成功！');
          addadministrator()
     }
    })
    },
    onCancel() {
    },
  });
};
</script>

<style scoped>

</style>