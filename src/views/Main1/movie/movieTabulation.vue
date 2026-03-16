<template>
  <kapin>
      <a-breadcrumb style="margin: 0 0 10px 0;">
    <a-breadcrumb-item v-for="value in $route.meta.title"> {{ value }}</a-breadcrumb-item>
    </a-breadcrumb>
    <div class="selectDiv">
          <a-form-item style="width: 340px ;">
          <a-select placeholder="选择电影状态"  v-model:value="TypeMovie.type" allow-clear>
         <a-select-option value="hot">热映</a-select-option>
         <a-select-option value="coming">即将上映</a-select-option>
         </a-select>
         </a-form-item>

         <a-form-item style="width: 340px">
      <a-select v-model:value="ssss.typeId"  placeholder="选择电影类型" allow-clear>
        <a-select-option :value="item._id" v-for="item in movieType">{{ item.name }}</a-select-option>
      </a-select>
    </a-form-item>
        
      <a-form-item style="width: 340px">
      <a-select placeholder="选择制片国家"  v-model:value="country2.regionId" allow-clear>
        <a-select-option :value="itemD2._id" v-for="itemD2 in country">{{ itemD2.name }}</a-select-option>
      </a-select>
    </a-form-item>

     <a-form-item style="width: 340px">
      <a-select placeholder="请选择年份" v-model:value="movieYear2.year" allow-clear>
        <a-select-option :value="item3.year" v-for="item3 in movieYear">{{ item3.year }}</a-select-option>
      </a-select>
    </a-form-item>

    </div>

    <div class="inputDiv">
        <a-input-search
            placeholder="请输入电影名称"
            enter-button
            style="width: 340px;"
            v-model:value="search.name"
            allow-clear
            @search="addallMovie"/>

        <div class="button">
            <a-button type="primary">搜索</a-button>
             <a-button style="margin-left: 10px;" @click="emptyType">重置</a-button>
        </div>
    </div>

     <div style="display: flex; align-items: center; justify-content: space-between;">
      <h1>电影列表</h1>
     <a-button type="primary"  style="margin-left: 10px;" @click="$router.push('AddMovie')" v-auth="'AddMovie'">
        <plus-outlined />
         添加新影院
      </a-button>
     </div>

     <a-table :columns="columns" :data-source="tableData.rows"  :style="{ width: '100%', height: '550px' }" 
     :pagination="false" size="small" @change="sortchange">
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex=='name'">
       {{record.name}}
      </template>

        <template v-if="column.dataIndex=='cover_image'">
          <img :src=record.cover_image alt="" style="width: 40px; height: 60px;">
      </template>

       <template v-if="column.dataIndex=='typeIds'">
        <div style="display: flex; flex-wrap: wrap;">
          <template v-for="item in record.typeIds">
              <span class="backcolorSpan"> {{ item.name }}</span>
          </template>
        </div>
      </template>

       <template v-if="column.dataIndex=='country'">
        {{ record.regionIds.map((item:{name:string})=>item.name).join('、')}}
      </template>
 
      <template v-if="column.dataIndex=='Time'">
       {{ record.duration }}分钟
      </template>

      <template v-if="column.dataIndex=='year'">
       {{ record.year }}
      </template>

      <template v-if="column.dataIndex=='boxOffice'"> 
       {{ unit(record.box_office) }}
      </template>

        <template v-if="column.dataIndex=='want'">
       {{record.want}}人
      </template>

       <template v-if="column.dataIndex=='score'">
       {{record.score}}
      </template>
      
      <div style="display: flex; justify-content: space-between;">
        <template v-if="column.dataIndex=='operate'">
        <a @click="$router.push(`MovieDetails/${record._id}`)">详情</a>
        <a  @click="$router.push(`modifyMovie/${record._id}`)">编辑</a>
        <a style="color: red;" @click="showConfirm(record._id)">删除</a>
      </template>
      </div>
  
      </template>

    </a-table>
        <div style="margin-top: 30px;display: flex; justify-content: end;">
            <a-pagination v-model:current="pageData.currentPage" show-size-changer v-model:page-size="pageData.pageSize"
                :total="tableData.total"   :show-total="(total: number) => `共计 ${total} 条数据`" />
        </div>
  </kapin>
</template>


<script setup lang="ts">
import { adminMovieApi ,addcountryApi,addMovieYear,addMovieApi, deleteMovie2Api} from '@/assets/apis/adminApi';
import { ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons-vue';
import { message, Modal } from 'ant-design-vue';
import { createVNode, onMounted, ref, watch } from 'vue';
interface MovieType{
  _id:string;
  name:string
}
const movieType=ref<MovieType[]>([])
const country=ref()
const movieYear=ref()
const pageData = ref({ currentPage: 1, pageSize: 6 })
const search=ref({name:""})
const ssss=ref({typeId:undefined})
const country2=ref({regionId:undefined})
const movieYear2=ref({year:undefined})
const TypeMovie=ref({type:undefined})
const searchData = ref<any>({})

const tableData = ref({
    rows: [],
    total: 0,
})
watch([ssss.value,country2.value,movieYear2.value,TypeMovie.value],()=>{
  addallMovie()
})
watch(pageData, () => {
    addallMovie();
}, { deep: 2 })

//顶部下拉框渲染
onMounted(()=>{
  addallMovie()
})

  function addallMovie(){
    adminMovieApi().then(res=>{
  if(res.code==200){
     movieType.value=res.data.rows
  }else{
  }
})
addcountryApi().then(res=>{
  if(res.code==200){
    country.value=res.data
  }else{
  }
})
addMovieYear().then(res=>{
  if(res.code==200){
    movieYear.value=res.data
  }else{}
})
addMovieApi({
  ...pageData.value,
  ...search.value,
  ...ssss.value,
  ...country2.value,
  ...movieYear2.value,
  ...TypeMovie.value,
  ...searchData.value
}).then(res=>{
  if(res.code==200){
    tableData.value.rows=res.data.rows
    tableData.value.total=res.data.total
  }else{}
})
}

function emptyType(){
ssss.value.typeId=undefined
country2.value.regionId=undefined
movieYear2.value.year=undefined
TypeMovie.value.type=undefined
}

//删除电影
const showConfirm = (id:string) => {
  Modal.confirm({
    title: '警告',
    icon: createVNode(ExclamationCircleOutlined),
    content: '执行后数据无法恢复，确定要删除吗',
    onOk() {
      deleteMovie2Api({_id:id}).then(res=>{
    if(res.code==200){
       message.success('删除成功！');
      addallMovie();
    }else{
      message.error('失败！');
    }
  });
    },
    onCancel() {
    },
  });
};

const columns = [
  {
    title: '电影名称',
    dataIndex: 'name',
     width: 180,  
    ellipsis: true,
  },
   {
    title: '海报',
    dataIndex: 'cover_image',
    width: 100, 
    align: 'center',
  },
    {
    title: '类型',
    dataIndex: 'typeIds',
    width: 200,
  },
    {
    title: '制片国家',
    dataIndex: 'country',
  },
   {
    title: '时长',
    dataIndex: 'Time',
  },
   {
    title: '电影年份',
    dataIndex: 'year',
    key:'year',
    sorter:true
  },
  {
    title: '票房',
    dataIndex: 'boxOffice',
    key:'box_office',
    sorter: true
  },
  {
    title: '想看',
    dataIndex: 'want',
    key:'want',
    sorter:true
  },
  {
    title: '评分',
    dataIndex: 'score',
    key:'score',
    width: 80,
    sorter: true
  },
   {
    title: '操作',
    dataIndex: 'operate',
  },
];

const sortchange=(_pagination:any, _filters:any, sorter:any)=>{
  searchData.value.sort=sorter.columnKey;
  searchData.value.sortOrder = sorter.order === 'ascend' ? 'asc' : 'desc';
  addallMovie();
}

//数字单位转换
function unit(num:any, decimal = 1) {
    if (num < 10000) return num.toString();
    const units = ['万', '亿'];
    let unitIndex = 0;
    let n = num / 10000;
    if (n >= 10000) {
        n /= 10000;
        unitIndex = 1;
    }
    const result = n % 1 === 0 ? n.toFixed(0) : n.toFixed(decimal);
    return result + units[unitIndex];
}
</script>

<style scoped>
    h1{
        margin: 20px 0;
    }
.selectDiv,.inputDiv{
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}
.backcolorSpan{
  display: block;
  background-color: #e8f4fe;
  color: #3874f7;
  height: 22px;
  margin: 10px 10px 0 0;
  text-align: center;
  border-radius: 4px;
  padding: 0 5px ;
}
</style>