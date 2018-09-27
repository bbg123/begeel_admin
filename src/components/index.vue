<template>
  <div class="index">
    <el-container>
      <el-aside width="200px">
        <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#35e082"
        text-color="#fff"
        active-text-color="red">
          <el-submenu v-for="(item, index) in menu_list" :key="index" :index="item.id">
            <template slot="title">
              <i class="el-icon-location" style="color:#fff;"></i>
              <span>{{item.list_name}}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item v-for="(items, indexs) in item.list" :key="indexs" :index="items.superior_id" @click.native="go_link(items.list_link)">{{items.list_name}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header
        direction="vertical"
        style="background-color:#32a5f9;">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="(item, index) in route_list" @click.native="go_link('')" :key="index" :to="{ path: (item.path === '' ? '/' : item.path) }">{{item.name}}</el-breadcrumb-item>
          </el-breadcrumb>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { GetMenuList } from '../api/index.js'
export default {
  data () {
    return {
      menu_list: [],
      route_list: []
    }
  },
  methods: {
    handleOpen (key) {
      console.log(key)
    },
    handleClose (key) {
      console.log(key)
    },
    go_link (link) {
      if (link !== '') {
        this.$router.push({path: link})
      }
      console.log(this.$route.matched)
      this.route_list = this.$route.matched
    }
  },
  mounted () {
    // 获取列表数据
    GetMenuList().then(res => {
      this.menu_list = res.data
      res.data.forEach((item, index) => {
        let arr = []
        res.data2.forEach((item2, indexs) => {
          if (item.id === item2.superior_id) {
            item2.superior_id = item.id + '-' + indexs
            arr.push(item2)
          }
        })
        this.menu_list[index].list = arr
      })
    })

    // 获取历史
    this.route_list = this.$route.matched
  }
}
</script>

<style scoped>
.el-header {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e6e6e6;
}
.home_main_title {
  font-size: 30px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
}
.el-submenu {
  border-top: 1px solid yellow;
}
</style>
