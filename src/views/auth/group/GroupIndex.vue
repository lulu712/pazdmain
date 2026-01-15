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
      <el-form-item label="名稱">
        <el-input v-model="form.name" placeholder="請輸入名稱" />
      </el-form-item>

      <el-form-item label="權限">
        <el-tree
          ref="treeRef"
          :data="permissionData"
          node-key="id"
          show-checkbox
          default-expand-all
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
import { userGetMenu, menuList } from '@/api'

// 表格資料
const tableData = ref([])

// Dialog 狀態
const dialogVisible = ref(false)

// 表單資料
const form = reactive({
  id: '',
  name: '',
  permissions: []
})

// Tree
const treeRef = ref()
const permissionData = ref([])

// 初始化
onMounted(() => {
  // 表格資料
  menuList().then(res => {
    tableData.value = res.data.data.list || []
  })

  // 權限樹
  userGetMenu().then(res => {
    permissionData.value = res.data.data || []
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
</script>

<style lang="less" scoped>
.el-table {
  margin-top: 16px;
}
</style>