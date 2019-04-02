<style>
  .formItem {
    width: 14%;
    font-size: 18px
  }
</style>
<template>
  <div>
    <h1>{{ msg }}</h1>
    <h2>1111111111111111111111111111111111111111111111111111111111111111</h2>
    <div>{{progress}}</div>
    <Button @click="getAllUser()">点我</Button>
    <Progress :percent="progress" v-show="progress > 0" :hide-info="progress === 100">
        <Icon type="checkmark-circled"></Icon>
        <span>成功</span>
    </Progress>
    <Button @click="getProgress()">测试进度条</Button>
    <Button @click="test">测试全局lodash与moment</Button>
    <Button @click="webSocketSend">测试向客户端发送消息</Button>
  </div>
</template>

<script>
import restApi from '@/api/restApi.js'
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'
import Vue from 'vue'
import {
  WS_URL,
  WS_DEST_USER,
  WS_DEST_TOPIC,
  WS_SEND_WEB,
  WS_STOMP
} from '../utils/config'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      loginUser: {
        username: ''
      },
      progress: 0
    }
  },
  created () {
    Vue.prototype.$stompClient = Stomp.over(new SockJS(WS_URL))
  },
  watch: {

  },
  computed: {

  },
  methods: {
    connect () {
      this.$stompClient.connect({ }, frame => {
        this.onConnectedOneToOne(frame)
        this.onConnectedTopic(frame)
      })
    },
    onConnectedOneToOne (frame) {
      // web端订阅后端发布接口
      let destination = WS_DEST_USER + '/1/user'
      this.$stompClient.subscribe(destination, val => {
        // 如果返回了结果
        console.log(val.body)
        if (val.body) {
          // alert('websocket发送消息成功')
        }
      })
    },
    onConnectedTopic (frame) {
      // web端订阅后端发布接口
      let destination = WS_DEST_TOPIC + WS_DEST_TOPIC
      this.$stompClient.subscribe(destination, val => {
        // 如果返回了结果
        console.log(val.body)
        if (val.body) {
          // alert('websocket发送消息成功')
        }
      })
    },
    webSocketSend () {
      this.$stompClient.send(WS_SEND_WEB + WS_STOMP, { atytopic: 'greetings' }, JSON.stringify({ 'name': name }))
    },
    test () {
      alert(this.$_.add(6, 4))
      let x = this.$moment().add(3, 'month').format('YYYY-MM-DD')
      alert(x)
    },
    getAllUser () {
      restApi.getAllUser(1, 100).then(data => {
        alert(data)
      })
    },
    checkIsError () {
      if (this.$route.query.errorCode === '399') {
        alert('您还没有登录,请重新登录后再进行操作')
      }
    },
    getProgress () {
      restApi.getProgress().then(data => {
        return data
      }).then(data => {
        this.startProdress(new Date().getTime())
      })
    },
    startProdress (startTime) {
      let _this = this
      restApi.startProgress().then(data => {
        _this.progress = data
        if (data < 100) {
          var timer = window.setTimeout(() => {
            let nowTime = new Date().getTime()
            // 模拟超时请求
            if ((nowTime - startTime) > 13000) {
              clearTimeout(timer)
              return
            }
            this.startProdress(startTime)
          }, 500)
        }
      })
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
