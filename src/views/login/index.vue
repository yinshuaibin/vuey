<template>
  <div>
    <Form ref="loginUser" :model="loginUser" :rule="loginRules">
      <FormItem class="formItem" prop="username" label="用户名">
        <Input type="text" v-model="loginUser.username" placeholder="用户名">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem class="formItem" prop="password" label="密码">
        <Input :type="pwdType" width="30%" v-model="loginUser.password" placeholder="密码">
          <Icon type="ios-lock-outline" slot="prepend"></Icon>
        </Input>
       </FormItem>
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
      if (value.length < 10) {
        callback(new Error('密码不能小于10位'))
      } else {
        callback()
      }
    }
    return {
      loginUser: {
        username: 'admin',
        password: 'admin'
      },
      loginRules: {
        username: [{required: true, trigger: 'blur'}, { validator: validateUsername }],
        password: [{required: true, trigger: 'blur'}, { validator: validatePass }]
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
  methods: {
    showPwd () {
      if (this.pwdType === 'password') {
        this.pwdType = 'text'
      } else {
        this.pwdType = 'password'
      }
    },
    login () {
      alert(this.$_.add(6, 4))
      let x = this.$moment().add(3, 'month').format('YYYY-MM-DD')
      alert(x)
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
              this.$router.push('/main')
            }
          })
          this.loading = false
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
