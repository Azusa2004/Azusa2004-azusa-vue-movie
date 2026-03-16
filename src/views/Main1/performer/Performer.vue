<template>
    <kapin>
      <div  class="flex">
          <h1>演职人员</h1>
          <a-row :gutter="12">
            <a-col>
              <Selectt placeholder="选择职业" :options="occupation" v-model:value="professionId" ></Selectt>
            </a-col>
            <a-col>
               <a-input-search placeholder="搜索演职人员姓名" enter-button @search="performer" style="width: 300px;" v-model:value="actorName" allow-clear/>
            </a-col>
            <a-col>
                <a-button type="primary" @click="">
                <PlusOutlined/>
                添加演职人员
                </a-button>
            </a-col>
          </a-row>
          </div>

          <Tablel :columns="columns" :tableData="tableData"  :pagination="false">
             <template #avatar="{record}">
                <img :src="record.avatar" alt="" width="60px" height="80px">
            </template>
            <template #professionIds="{record}">
                {{ record.professionIds.map((item:{name:string})=>item.name).join(' 、') }}
            </template>
            <template #operate>
                <a-button type="primary" @click="">
            <EditOutlined />
            编辑</a-button>
            <a-divider type="vertical" />
            <a-button type="primary" danger @click="">
            <DeleteOutlined/>
                删除
            </a-button>
            </template>
            
          </Tablel>
             <a-pagination v-model:current="pageData.currentPage" show-quick-jumper :total="tableData.total" @change="onSearch" v-model:page-size="pageData.pageSize"
   :show-total="(total: number) => `共计 ${total} 条数据`"/>
    </kapin>
  
</template>

<script setup lang="ts">
import {  addoccupationApi,  addperformerApi } from '@/assets/apis/adminApi';
import kapin from '@/components/kapian/kapin.vue';
import Tablel from '@/components/Table/Tablel.vue';
import Selectt from '@/components/select/Selectt.vue';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons-vue';
import { onMounted, ref, watch } from 'vue';

const professionId=ref(undefined)
const actorName=ref()
const columns=[
  {
    title: '名字',
    dataIndex: 'name',
    key:'name',
  },
  {
    title: '头像',
    dataIndex: 'avatar',
    key:'avatar',
  },
  {
    title: '职业',
    dataIndex: 'professionIds',
    key:'professionIds',
  },
    {
    title: '操作',
    dataIndex: 'operate',
    key:'operate',
    width:'260px'
  },
]
const pageData = ref({ currentPage: 1, pageSize: 5 })
const tableData = ref({ 
        rows: [], 
        total: 0 
    });

const occupation=ref([])
onMounted(()=>{
  performer()
  addoccupationApi().then(res=>{
    if(res.code==200){
      occupation.value=res.data.rows
    }
  })
})

function onSearch(){
  performer()
}
watch(professionId,()=>{
   performer()
})
watch(actorName,()=>{
  console.log(actorName.value);
})

const performer=()=>{
 addperformerApi({...pageData.value, professionId: professionId.value,name:actorName.value}).then(res=>{
    if(res.code==200){
      console.log('2',res);
      tableData.value=res.data
    }
  })
}

</script>

<style scoped lang="scss">
@mixin flex-center {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.flex {
  @include flex-center;
}
</style>