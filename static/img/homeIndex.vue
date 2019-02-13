<style scoped>
.home{
    height: 700px;
}

.btn-set {
  width: 380px;
  height: 220px;
  margin: 30px 60px;
  border: none;
  color: white;
  font-size: 2.0rem /* 30/16 */
}
</style>
<template>
    <div class="home">
        <Row>
            <Button v-for="menu,index in menus" :key="index" :style="menu.style" class="btn-set" @click="menuSelectHandler(menu.component)">
                {{menu.title}}
            </Button>
        </Row>

        <div style="position: relative">
        </div>
    </div>
</template>
<script>
import Widget from "../base/Widget.vue";
export default {
  name: "HomeIndex",
  data() {
    return {
      menus: [
        {
          title: "新流入人员",
          component: "clusterClassification",
          style: {
            backgroundColor: "#e18f84"
          }
        },
        {
          title: "报警查询",
          component: "warning",
          style: {
            backgroundColor: "#6ceeaa"
          }
        },
        {
          title: "布控统计",
          component: "alarmStatistic",
          style: {
            backgroundColor: "#dcedaa"
          }
        },
        {
          title: "动态检索",
          component: "dynamic",
          style: {
            backgroundColor: "#d265c2"
          }
        },
        {
          title: "历史查询",
          component: "history",
          style: {
            backgroundColor: "#fed2c8"
          }
        },
        {
          title: "实时监控",
          component: "monitor",
          style: {
            backgroundColor: "#bcedaa"
          }
        },
        {
          title: "档案反查",
          component: "clusterSearch",
          style: {
            backgroundColor: "#347ebf"
          }
        },
        {
          title: "档案浏览",
          component: "clusterBrowse",
          style: {
            backgroundColor: "#d1c0a4"
          }
        },
        {
          title: "用户添加",
          component: "userAdd",
          style: {
            backgroundColor: "#e18f84"
          }
        },
        {
          title: "用户列表",
          component: "userList",
          style: {
            backgroundColor: "#e18f84"
          }
        },
        {
          title: "角色添加",
          component: "roleAdd",
          style: {
            backgroundColor: "#e18f84"
          }
        },
        {
          title: "角色列表",
          component: "roleList",
          style: {
            backgroundColor: "#e18f84"
          }
        },
        {
          title: "摄像头列表",
          component: "cameraList",
          style: {
            backgroundColor: "#e18f84"
          }
        },
        {
          title: "新增摄像头",
          component: "addCamera",
          style: {
            backgroundColor: "#e18f84"
          }
        },
        {
          title: "相机分组",
          component: "cameraSetting",
          style: {
            backgroundColor: "#e18f84"
          }
        }
      ]
    };
  },
  components: {},
  watch: {},
  computed: {},
  methods: {
    menuSelectHandler(name) {
      this.$store.commit("menuSelectEvent", name);
    }
  }
};
</script>