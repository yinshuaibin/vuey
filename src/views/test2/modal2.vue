<template>
  <div>
    <h1>子页面21</h1>
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
      errorMsg: '',
      loginUser: {
        username: 'ss',
        password: '1'
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
            } else {
              this.errorMsg = data.msg
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
