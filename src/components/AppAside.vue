<template>
  <el-menu
  :style="{width:!isCollapse? '230px':'64px'}"
    default-active="2"
    class="aside-container"
    @open="handleOpen"
    @close="handleClose"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    :collapse="isCollapse"
  >
    <p class="logo-lg">{{isCollapse?'LULU': 'Lulu陪診'}}</p>
    <tree-menu :index="1" :menuData="menuData"/>
  </el-menu>
</template>


<script setup>

import treeMenu from './treeMenu.vue';
import { useRouter } from 'vue-router';
import { reactive,computed } from 'vue';
import { useStore } from 'vuex';

const router =useRouter()
const menuData=reactive(router.options.routes[0].children)
const store=useStore()
const isCollapse=computed(() => store.state.menu.isCollapse)


console.log(menuData);
const handleOpen = () => {}
const handleClose = () => {}

</script>

<style lang="less" scoped>

.aside-container{
  height: 100%;
  .logo-lg{
    font-size: 20px;
    height: 50px;
    line-height: 50px;
    color: #fff;
    text-align: center;
  }

}

</style>
