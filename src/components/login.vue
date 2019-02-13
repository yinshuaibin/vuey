<template>
  <div>
    <h1>{{ msg }}</h1>
    <h2>1111111111111111111111111111111111111111111111111111111111111111</h2>
    <Button @click="getAllUser()">点我</Button>
  </div>
</template>

<script>
import restApi from '@/api/restApi.js'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    getAllUser () {
      restApi.getAllUser(1, 100).then(data => {
        alert(data)
      })
    },
    checkIsError () {
      if (this.$route.query.errorCode === '399') {
        alert('您还没有登录,请重新登录后再进行操作')
      }
    }
  },
  mounted () {
    this.checkIsError()
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
