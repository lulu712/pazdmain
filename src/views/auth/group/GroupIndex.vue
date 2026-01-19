<template>
  <el-button type="primary" @click="open()">新增權限</el-button>

  <el-table :data="tableData" style="width: 100%; margin-top: 16px">
    <el-table-column prop="id" label="ID" />
    <el-table-column prop="name" label="名稱" />
    <el-table-column label="操作">
      <template #default="scope">
        <el-button size="small" @click="open(scope.row)">編輯</el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-dialog v-model="dialogVisible" title="權限設定" width="500">
    <el-form>
      <el-form-item label="名稱" prop="name">
        <el-input v-model="form.name" placeholder="請輸入名稱" />
      </el-form-item>

      <el-form-item label="權限" prop="permissions">
        <el-tree
          style="max-width: 600px;"
          ref="treeRef"
          :data="permissionData"
          node-key="id"
          show-checkbox
          :default-checked-keys="defaultkeys"
        />
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button @click="closeDialog">取消</el-button>
      <el-button type="primary" @click="submit">確定</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick } from 'vue'
import { userGetMenu, menuList,userSetMenu } from '@/api'

// 表格資料
const tableData = ref([])

// Dialog 狀態
const dialogVisible = ref(false)

// form的數據
const form = reactive({
  id: '',
  name: '',
  permissions: []
})

//樹形菜單權限數據
const treeRef = ref()
const permissionData = ref([])


onMounted(() => {
  // 菜單數據
  menuList({ pageNum: 1, pageSize: 10 }).then(res => {
    console.log('menuList API 回傳:', res); // ✅ 觀察完整回傳物件
    tableData.value = res.data?.data?.list || []
  })

  // 權限樹
  userGetMenu().then(res => {
    permissionData.value = res.data?.data || []
  })
})

// 打開 Dialog (新增 / 編輯)
const open = (row = null) => {
  dialogVisible.value = true

  nextTick(() => {
    if (!row) {
      // 新增
      form.id = ''
      form.name = ''
      form.permissions = []
      treeRef.value?.setCheckedKeys([])
      return
    }

    // 編輯
    form.id = row.id
    form.name = row.name
    form.permissions = row.permissions || []
    treeRef.value?.setCheckedKeys(form.permissions)
  })
}

// 關閉 Dialog
const closeDialog = () => {
  dialogVisible.value = false
  form.id = ''
  form.name = ''
  form.permissions = []
  treeRef.value?.setCheckedKeys([])
}

// 送出資料
const submit = () => {
  form.permissions = treeRef.value?.getCheckedKeys() || []
  console.log('送出資料：', { ...form })
  dialogVisible.value = false
}
//選中權限
const defaultkeys=[4,5]


</script>

<style lang="less" scoped>
.el-table {
  margin-top: 16px;
}
</style>