<template>
  <div>
    <h1>{{ msg }}</h1>
    <h2>1111111111111111111111111111111111111111111111111111111111111111</h2>
    <Button @click="getAllUser()">点我</Button>
  </div>
</template>

<script>
import restApi from '@/api/restApi.js'
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'
import Vue from 'vue'
import {
  WS_URL,
  WS_DEST_USER
} from '../utils/config'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  created () {
    Vue.prototype.$stompClient = Stomp.over(new SockJS(WS_URL))
  },
  watch: {
    errorCode (val, oldVar) {
      if (val === '399') {
        this.alert1()
      }
      this.$store.commit('setErrorCode', '0')
    }
  },
  computed: {
    errorCode () {
      return this.$store.getters.getErrorCode
    }
  },
  methods: {
    connect () {
      this.$stompClient.connect({ }, frame => {
        this.onConnected(frame)
      })
    },
    onConnected (frame) {
      // web端订阅后端发布接口
      let destination = WS_DEST_USER + '/'
      this.$stompClient.subscribe(destination, val => {
        // 如果返回了结果,则说明报警刷新,提示报警服务.
        if (val.body) {
          alert('websocket发送消息成功')
        }
      })
    },
    getAllUser () {
      restApi.getAllUser(1, 100).then(data => {
        alert(data)
      })
    },
    alert1 () {
      alert('未登录, 请先登录')
    },
    checkIsError () {
      if (this.$route.query.errorCode === '399') {
        alert('您还没有登录,请重新登录后再进行操作')
      }
    }
  },
  mounted () {
    this.checkIsError()
    this.connect()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
