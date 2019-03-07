<template>
  <div>
    <Form :model="loginUser" rule="">
      <FormItem class="formItem" prop="username" label="用户名">
        <Input type="text" v-model="loginUser.username" placeholder="用户名">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem class="formItem" prop="password" label="密码">
        <Input type="password" v-model="loginUser.password" placeholder="密码">
          <Icon type="ios-lock-outline" slot="prepend"></Icon>
        </Input>
       </FormItem>
    </Form>
  </div>
</template>

<script>
import restApi from '@/api/restApi.js'
export default {
  name: 'HelloWorld',
  data () {
    return {
      loginUser: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    getAllUser () {
      restApi.getAllUser(1, 100).then(data => {
        alert(data)
      })
    }
  },
  mounted () { }
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
