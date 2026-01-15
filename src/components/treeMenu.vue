<template>
    <!-- 第一層 SubMenu -->
    <!-- <el-sub-menu index="1">
        <template #title>
        <el-icon><Location /></el-icon>
        <span>Navigator One</span>
        </template>  -->

        <!-- Group One -->
        <!-- <el-menu-item-group title="Group One">
        <el-menu-item index="1-1">item one</el-menu-item>
        <el-menu-item index="1-2">item two</el-menu-item>
        </el-menu-item-group> -->

        <!-- Group Two -->
        <!-- <el-menu-item-group title="Group Two">
        <el-menu-item index="1-3">item three</el-menu-item>
        </el-menu-item-group> -->

        <!-- 第二層 SubMenu -->
        <!-- <el-sub-menu index="1-4">
        <template #title>item four</template>
        <el-menu-item index="1-4-1">item one</el-menu-item>
        </el-sub-menu>
    </el-sub-menu> -->

    <!-- Menu Item 2 -->
    <!-- <el-menu-item index="2">
        <el-icon><Menu /></el-icon>
        <span>Navigator Two</span>
    </el-menu-item> -->

    <!-- Menu Item 3 -->
    <!-- <el-menu-item index="3" disabled>
        <el-icon><Document /></el-icon>
        <span>Navigator Three</span>
    </el-menu-item> -->

    <template v-for="item in props.menuData" :key="item.meta.id">
    <!-- 沒有子菜單 -->
    <el-menu-item   
        @click="handeClick(item,'`${props.index}-${item.meta.id}`')"
        v-if="!item.children || item.children.length ==0"   
        :index="`${props.index}-${item.meta.id}`"
        :key="`${props.index}-${item.meta.id}`">

        <el-icon size="20">
             <component :is="item.meta.icon"></component>
        </el-icon>
             <span>{{item.meta.name}}</span> 
    </el-menu-item> 

    <!-- 有子菜單 -->
    <el-sub-menu v-else :index="`${props.index}-${item.meta.id}`">
            <!-- #title是插槽用來識別這是標題,# 是 v-slot: 的簡寫 -->
             <template #title>   
                <el-icon size="20">
                    <component :is="item.meta.icon"></component>
                </el-icon>
                <span>{{item.meta.name}}</span> 
             </template>     
        <tree-menu :index="`${props.index}-${item.meta.id}`" 
        :menuData="item.children.filter(c=>c.meta && c.meta.name)" />       
    </el-sub-menu>           

   
      
    </template>  
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useStore} from 'vuex';
// defineProps()是Vue 3的方式，用來讓子元件接收父元件傳進來的資料。
const props= defineProps(['menuData','index'])

//創建router實例
const router= useRouter()
const store = useStore()
//點擊菜單
const handeClick=(item)=>{
    // console.log(item,'item') 拿到跳轉路徑
    //把數據傳遞進去
    store.commit('addMenu',item.meta)
    router.push(item.meta.path)
}

</script>

<style scoped>

</style>