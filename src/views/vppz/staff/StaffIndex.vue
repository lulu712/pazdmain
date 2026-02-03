<template>
    <div class="btns">
        <el-button :icon="Plus" type="primary" @click="open()">新增</el-button>
    </div>
  <el-dialog
    v-model="dialogFormVisible"
    :before-close="closeFormDialog"
    title="護理師添加"
    width="500"
  >
    <el-form
      ref="formRef"
      label-width="100px"
      label-position="left"
      :model="form"
      :rules="rules"
    >
        <el-form-item v-show="false" prop="id">
            <el-input v-model="form.id" />
        </el-form-item>
        <el-form-item label="暱稱" prop="name">
            <el-input v-model="form.name" placeholder="請輸入名稱" />
        </el-form-item>
        <el-form-item label="頭像" prop="avatar">
            <el-button v-if="!form.avatar" type="primary" @click="dialogImgVisible=true">點擊上傳</el-button>
            <el-image
                v-else
                :src="form.avatar"
                style="width: 100px;height:100px;"
            />
        </el-form-item>
        <el-form-item label="性別" prop="sex">
            <el-select v-model="form.sex" placeholder="請選擇性別">
                <el-option label="男" value="1"/>
                <el-option label="女" value="2"/>
            </el-select>
        </el-form-item>
        <el-form-item label="年齡" prop="age">
            <el-input-number v-model="form.age" :min="18" :max="50"/>
        </el-form-item>
        <el-form-item label="手機號碼" prop="mobile">
            <el-input v-model="form.mobile" placeholder="請輸入手機號碼"/>
        </el-form-item>
        <el-form-item label="是否生效" prop="active">
            <el-radio-group v-model="form.active">
                <el-radio :label="0">失效</el-radio>
                <el-radio :label="1">生效</el-radio>
            </el-radio-group>
        </el-form-item>
    </el-form>
    <template #footer>
        <div class="dialog-footer">
            <el-button type="primary" @click="confirm()">確認</el-button>
        </div>
    </template>    
  </el-dialog>
   <el-dialog
        v-model="dialogImgVisible"
        :before-close="closeImgDialog"
        title="選擇頭像"
        width="680px"
    >
        <div class="image-list">
            <div 
                v-for="(item,index) in fileList" 
                :key="item.name" class="img-box" 
                @click="selectIndex = index"
            >
                <el-image
                    style="width:148px;height: 148px;"
                    :src="item.url"
                />  
                <div v-if="selectIndex === index" class="select">
                    <el-icon color="#fff"> <Check/> </el-icon>
                </div> 
            </div>  
        </div>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogImgVisible = false">取消</el-button>
                <el-button type="primary" @click="confirmImage()">確認</el-button>
            </div>
        </template>    
    </el-dialog>

</template>
<script setup>
import {Plus, Check }from '@element-plus/icons-vue';
import {reactive, ref, onMounted}from 'vue';
import { PhotoList, companion } from '@/api';
import { ElMessage } from 'element-plus';

onMounted(()=>{
    PhotoList().then(({data})=>{
        fileList.value=data.data
    })
})

const dialogFormVisible=ref(false)
const closeFormDialog = (done) => {
  dialogFormVisible.value = false
  formRef.value?.resetFields()
  if (typeof done === 'function') done()
}

const dialogImgVisible=ref(false)
const closeImgDialog = (done) => {
  dialogImgVisible.value = false
  if (typeof done === 'function') done()
}

//表單校驗規則
const rules= reactive({
    name:[{required:true,trigger:'blur',message:'請輸入名稱'}],
    avatar:[{required:true,message:'請選擇頭像'}],
    sex:[{required:true,trigger:'change',message:'請選擇性別'}],
    mobile:[{required:true,trigger:'blur',message:'請輸入手機號碼'}],
})

const formRef=ref()
const form = reactive({
    id:'',
    mobile:'',
    active: 1,
    age:18,
    avatar:'',
    name:'',
    sex:''
}) 

//表單校驗與提交
const confirm = async () => {
    if (!formRef.value) return
    formRef.value.validate((valid) => {
        if (valid) {
            companion(form).then(({data}) => {
                if (data.code === 10000) {
                    ElMessage.success('操作成功')
                    closeFormDialog()
                } else {
                    ElMessage.error(data.message)
                }
            })
        } else {
            console.log('表單驗證失敗')
            return false
        }
    })
}

const open = ()=> {
    dialogFormVisible.value=true
}

//拿到後端傳回來的圖片列表
const fileList=ref([])
//選中當前數據
const selectIndex=ref(0)
//確認選中頭像
const confirmImage=()=>{
    form.avatar = fileList.value[selectIndex.value].url
    //賦值後觸發表單校驗，使錯誤提示消失
    formRef.value?.validateField('avatar')
    dialogImgVisible.value=false
}

</script>
<style lang="less" scoped>

.btns {
    padding: 10px 0 10px 10px;
    background-color: #fff;
    }
.image-list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  .img-box {
    position: relative;
    .select {
      position: absolute;
      left: 0px;
      top: 0px;
      width: 24px;
      height: 24px;
      background-color: #67c23a;
      z-index: 999;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .el-image {
    margin-right: 10px;
    margin-bottom: 10px;
  }
}





</style>