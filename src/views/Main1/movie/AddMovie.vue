<template>
  <kapin>
       <h2  style="padding-bottom: 20px; border-bottom: 1px solid #ccc;">{{addmovieId.params.movieId? '编辑' :'添加'}}电影</h2>

    <a-row>
       <a-col :span="12" style="margin-top: 20px; padding-right: 10px;">
        <div>
          电影中文名
         <a-input  v-model:value.lazy="addMovieNumber.numbD1.name" allow-clear style="margin-top: 10px;"/>
        </div>

        <div style="margin-top: 15px;">
          电影原名
         <a-input v-model:value.lazy="addMovieNumber.numbD1.ename" allow-clear style="margin-top: 10px;"/>
        </div>

        <div style="margin-top: 15px;">
            电影类型
             <a-select placeholder="请选择电影类型" v-model:value.lazy=addMovieNumber.numbD1.typeIds  style="display: block; margin-top: 10px;" allow-clear mode="multiple">
            <a-select-option :value=item._id v-for="item in addMovieNumber.numbD2" >{{item.name}}</a-select-option>
            </a-select>
        </div>

        <div style="display: flex; justify-content: end; margin-top: 10px;">
        <a>
            <plus-outlined />
            添加新类型
        </a>
        </div>

        <div style="margin-top: 15px;">
          上映时间
         <a-input  allow-clear style="margin-top: 10px;" v-model:value="addMovieNumber.numbD1.release"/>
        </div>

        <a-row style="margin-top: 15px; display: flex; justify-content: space-between;" :gutter="[25]">
        <a-col :span="12">
            制片国家/地区
          <a-select placeholder="请选择制片国家" v-model:value.lazy=addMovieNumber.numbD1.regionIds style="display: block; margin-top: 10px" allow-clear mode="multiple">
            <a-select-option :value=item2._id v-for="item2 in addMovieNumber.numbD3">{{ item2.name }}</a-select-option>
            </a-select>
            </a-col>
        <a-col :span="12">
                   制片年份
                    <a-date-picker  picker="year" style="display: block;margin-top: 10px" v-model:value="addMovieNumber.numbD1.year" value-format="YYYY"/>
            </a-col>
        </a-row>

        <a-row style="margin-top: 15px; display: flex; justify-content: space-between;" :gutter="[25]">
        <a-col :span="12">
            时长
          <a-input  allow-clear style="margin-top: 10px;" placeholder="电影时长" v-model:value="addMovieNumber.numbD1.duration"/>
            </a-col>
        <a-col :span="12">
            语言
        <a-select placeholder="请选择语言"  style="display: block; margin-top: 10px" allow-clear>
            <a-select-option value="31">31</a-select-option>
            </a-select>
            </a-col>
        </a-row>

        <div style="margin-top: 15px;">
             简介
            <a-textarea  placeholder="电影简介" :rows="4"  style="margin-top: 10px; resize: none;" v-model:value="addMovieNumber.numbD1.synopsis"/>
        </div>
        <div style="display: flex; justify-content: end; margin-top: 90px;">
            <a-button @click="$router.replace({ name: 'MovieTabulation' })">返回</a-button>
             <a-button type="primary" style="margin-left: 10px;" @click="isAddismodify">保存</a-button>
        </div>

       </a-col>
       <a-col :span="12" style="margin-top: 20px; padding-left: 10px">
            电影海报
             <a-upload
              v-model:file-list="fileList"
              name="file"
              list-type="picture-card"
              class="avatar-uploader"
              :show-upload-list="false"
              action="http://nocat.life:3014/images/upload"
              :before-upload="beforeUpload"
              @change="handleChange">

              <img v-if="addMovieNumber.numbD1.cover_image" :src="addMovieNumber.numbD1.cover_image" alt="file" />
              <div v-else>
                <loading-outlined v-if="loading"></loading-outlined>
                <plus-outlined v-else></plus-outlined>
                <div class="ant-upload-text">上传图片</div>
              </div>
              </a-upload>
       </a-col>
    </a-row>
  </kapin>
</template>


<script setup lang="ts">
import { addcountryApi, addNewMovieApi, adminMovieApi, obtainDetailsApi, onMoviedetailsApi } from '@/assets/apis/adminApi';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons-vue';
import { message, type UploadChangeParam } from 'ant-design-vue';
import { onMounted, ref} from 'vue';
import { useRoute } from 'vue-router';
const fileList = ref([]);
const loading = ref<boolean>(false);
const addmovieId=useRoute();


const addMovieNumber=ref({
    numbD1:{
      name:'' as string,
      ename:'' as string,
      typeIds:[] as string[],
      release:'' as string,
      regionIds:[] as [],
      year:'' as string ,
      duration:'' as string,
      synopsis:'' as string,
      cover_image:'' as string,
    },
    numbD2:[] as any[],
    numbD3:[] as any[],
})

onMounted(()=>{
    addApi();
    if(addmovieId.params.movieId){
      modifyMovie()
    }
})   

function addApi(){
    adminMovieApi().then(res=>{
        addMovieNumber.value.numbD2=res.data?.rows
    })
    addcountryApi().then(res=>{
        addMovieNumber.value.numbD3=res.data
    })
}

function isAddismodify(){
  if(addmovieId.params.movieId){
    onMoviedetails()
  }else{
    addpreserve()
  }
  addMovieNumber.value.numbD1 = {
      name:'',
      ename:'',
      typeIds:[],
      release:'',
      regionIds:[],
      year:'',
      duration:'',
      synopsis:'',
      cover_image:'',
    };
}

//添加电影请求
function addpreserve(){
  if(addMovieNumber.value.numbD1.name!=''){
    addNewMovieApi({...addMovieNumber.value?.numbD1}).then(res=>{
    if(res.code==200){
      message.success('添加成功！');
    }else{
      message.error(res.message);
    }
})
  }else{
     message.error('电影名字不能为空！');
  } 
}
//修改电影请求
function onMoviedetails(){
  onMoviedetailsApi({_id:addmovieId.params.movieId,...addMovieNumber.value?.numbD1}).then(res=>{
      if(res.code==200){
         message.success('修改成功成功！');
      }
      
  })
}

//获取电影详情（回显）
function modifyMovie(){
    obtainDetailsApi({_id:addmovieId.params.movieId}).then(res=>{
      addMovieNumber.value.numbD1 = {
      name: res.data?.name,
      ename:res.data?.ename,
      typeIds: res.data?.typeIds.map((item:{_id:string})=>item._id),
      release:res.data?.release.join(' / '),
      regionIds: res.data?.regionIds.map((item:{_id:string})=>item._id),
      year: res.data?.year,
      duration: res.data?.duration,
      synopsis: res.data?.synopsis,
      cover_image: res.data?.cover_image,
    };
    })
}

const beforeUpload = (file:any) => {
  const isJpgOrPng =['image/jpeg','image/png','image/webp','image/avif' ]
  if (!isJpgOrPng.includes(file.type)) {
    message.error('请上传jpg、png、webp格式的图片');
    return false
  }
  const isLt2M = file.size / 1024 / 1024 < 10;
  if (!isLt2M) {
    message.error('图片大小不能超过10MB!');
    return false
  }
   message.success('图片上传成功!');
    return true
};

const handleChange = (info: UploadChangeParam) => {
  if (info.file.status === 'done') {
    addMovieNumber.value.numbD1.cover_image=info.file.response.data
  }
  if (info.file.status === 'error') {
    message.error('upload error');
  }
};

</script>

<style >
.avatar-uploader>.ant-upload {
    width: 220px !important;
    height: 290px !important;
    margin-top: 10px;
}
.avatar-uploader img {
    width: 220px;
    height: 290px;
}
</style>
