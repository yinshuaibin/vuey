<style scoped>
.header {
  width: 100%;
  /*border-bottom: 1px rgba(255,255,255,.4) solid;*/
  background-color: rgba(51, 51, 51, 0.425);
  box-shadow: 5px 0px 10px 5px #444444;
}
</style>
<template>
  <Layout :style="{minHeight: '100vh'}">
    <Layout>
       <Sider :style="{width:'150px !important',maxWidth:'150px !important',minWidth:'150px !important'}">
            <el-menu
              :default-active="defultMenuName"
              class="el-menu-vertical-demo"
              router
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b">
              <div v-for="(menu, key) in menuList" :key="key">
              <el-menu-item  :index="menu.router"  >
                  <i :class="menu.calss"></i>
                  <span>{{menu.name}}</span>
              </el-menu-item>
              </div>
            </el-menu>
        </Sider>
        <Layout style="background-color:#f1f1f1">
            <router-view></router-view>
        </Layout>
        <h1>欢迎访问测试项目</h1>
    </Layout>
   </Layout>
</template>
<script>
import ICol from '../../node_modules/iview/src/components/grid/col'
export default {
  components: {
    ICol
  },
  data () {
    return {
      formUser: {},
      defultMenuName: ''
    }
  },

  computed: {
    menuList () {
      return this.$store.getters.getMenus
    }
  },
  watch: {},
  methods: {
  },
  mounted () {
    let href = window.location.href
    this.defultMenuName = href.substring(href.indexOf('#') + 1)
  }

}
</script>
