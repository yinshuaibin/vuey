<template>
  <div style="width:200px;margin-left:50px">
    <Form :model="loginUser"  ref="loginUser" :rules="loginRule">
      <FormItem prop="username" label="用户名">
        <Input  v-model="loginUser.username" placeholder="用户名">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="password" label="密码">
        <Input :type="pwdType" width="30%" v-model="loginUser.password" placeholder="密码">
          <Icon type="ios-lock-outline" slot="prepend"></Icon>
        </Input>
       </FormItem>
       <div>{{errorMsg}}</div>
       <Button @click="showPwd">{{this.pwdType === 'password' ? '显示密码' : '隐藏密码'}}</Button>
       <Button @click="login" type="primary" :loading="loading">登录</Button>
    </Form>
  </div>
</template>

<script>
import { isvalidUsername } from '@/utils/validate'
import restApi from '@/api/restApi'

export default {
  name: 'Login',
  data () {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value.length > 10) {
        callback(new Error('密码不能大于10位'))
      } else {
        callback()
      }
    }
    return {
      errorMsg: '',
      loginUser: {
        username: 'ss',
        password: '1'
      },
      loginRule: {
        username: [
          {required: true, message: '用户名不能为空', trigger: 'blur'},
          { validator: validateUsername }
        ],
        password: [
          {required: true, message: '密码不能为空', trigger: 'blur'},
          { validator: validatePass }
        ]
      },
      loading: false,
      pwdType: 'password',
      redirect: undefined
    }
  },
  watch: {
    // $route: {
    //   handler: function (route) {
    //     this.redirect = route.query && route.query.redirect
    //   },
    //   immediate: true
    // }
  },
  created () {
    if (this.$store.getters.getErrorCode === '399') {
      this.$Message.error('尚未登录或登录状态失效, 请重新登录')
    }
  },
  methods: {
    showPwd () {
      if (this.pwdType === 'password') {
        this.pwdType = 'text'
      } else {
        this.pwdType = 'password'
      }
    },
    login () {
      this.$http({
        method: 'get',
        url: 'http://127.0.0.1:8090/y/findUser?' + 'pageNum=' + 1 + '&pageSize=' + 100,
        emulateJSON: true
      }).then(data => {

      })
      this.$refs['loginUser'].validate(valid => {
        if (valid) {
          // this.loading = true
          // this.$store.dispatch('Login', this.loginForm).then(() => {
          //   this.loading = false
          //   this.$router.push({ path: this.redirect || '/' })
          // }).catch(() => {
          //   this.loading = false
          // })
          this.loading = true
          restApi.login(this.loginUser).then(data => {
            if (data.msg === '登录成功') {
              this.$router.push('/index')
            } else {
              this.errorMsg = data.msg
            }
          })
          this.loading = false
          console.log('success submit!!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style>
</style>
