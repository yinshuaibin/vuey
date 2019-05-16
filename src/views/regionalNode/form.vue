<style scoped>
.divC {

}
.inputC{
  text-align:center;
  width: 400px;
}
</style>
<template>
    <div class="divC">
    <Form  :model="formParam"  ref='formParam'  :rules="ruleValidate">
        <label style="color:black">区域唯一标识编号</label>
        <FormItem prop="regionalId">
            <Input  v-model.trim="formParam.regionalId" class="inputC"></Input>
        </FormItem>

        <label style="color:black">区域名称</label>
        <FormItem  prop="regionalName">
            <Input v-model.trim="formParam.regionalName" class="inputC"></Input>
        </FormItem>

        <label style="color:black">服务器ip</label>
        <FormItem  prop="nodeServerIp">
            <Input v-model.trim="formParam.nodeServerIp" class="inputC" ></Input>
        </FormItem>
        <label style="color:black">服务器端口</label>
        <FormItem  prop="nodeServerPort">
            <Input v-model.trim="formParam.nodeServerPort" class="inputC" ></Input>
        </FormItem>

          <Button v-if="!formParam.id" @click="addParam()" type="primary" style="width:28%;margin-left:16px;">增加</Button>
          <Button v-else  @click="updateParam()" type="primary" style="width:45%;margin-left:10%">修改</Button>
          <Button v-if="!formParam.id" @click="restart()" style="background: #00000;border: 1px solid #00000;width:28%;margin-left:10px;">重置</Button>
          <Button  @click="closeAndClear()" style="background: #00000;border: 1px solid #00000;width:45%;margin-top: 3%;margin-left:10%">关闭</Button>
    </Form>
    </div>
</template>
<script>
import restApi from '@/api/restApi.js'
export default {
  name: 'regionalForm',
  props: {
    formParam: {
      type: Object
    }
  },
  data () {
    const validateRegionalId = (rule, value, callback) => {
      restApi.checkoutRegionNodeId(this.formParam.id, value).then((data) => {
        if (data < 1) {
          return callback()
        }
        return callback(new Error('区域唯一标识编号不能重复'))
      })
    }
    const validatePort = (rule, value, callback) => {
      if (value < 65535) {
        return callback()
      }
      return callback(new Error('服务器端口不符合要求'))
    }
    const validateIp = (rule, value, callback) => {
      let checkIp = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
      if (checkIp.test(value)) {
        return callback()
      }
      return callback(new Error('服务器ip不符合要求'))
    }
    return {
      form: {
        regionalId: '',
        regionalName: '',
        nodeServerIp: '',
        nodeServerPort: ''
      },
      ruleValidate: {
        regionalId: [
          { required: true, message: '区域唯一编号不能为空', trigger: 'blur' },
          {max: 18, message: '最多允许18位字符'},
          {min: 3, message: '最少允许3位字符'},
          {validator: validateRegionalId, trigger: 'blur'}
        ],
        regionalName: [
          { required: true, message: '区域名称不能为空', trigger: 'blur' }
        ],
        nodeServerIp: [
          { required: true, message: '服务器ip不能为空', trigger: 'blur' },
          {validator: validateIp, trigger: 'blur'}
        ],
        nodeServerPort: [
          { required: true, message: '服务器端口不能为空', trigger: 'blur' },
          {validator: validatePort, trigger: 'blur'}
        ]
      }
    }
  },
  computed: {

  },
  methods: {
    restart () {
      this.$refs['formParam'].resetFields()
    },
    addParam () {
      this.$refs['formParam'].validate(valid => {
        if (valid) {
          restApi.insertRegionalNode(this.formParam).then((data) => {
            this.$Notice.success({
              title: '增加成功',
              desc: ' 增加区域节点所信息成功 '
            })
            this.$emit('success')
          })
        }
      })
    },
    closeAndClear () {
      this.$emit('closeAndClear')
    },
    updateParam () {
      this.$refs['formParam'].validate(valid => {
        if (valid) {
          restApi.updateRegionalNode(this.formParam).then((data) => {
            this.$Notice.success({
              title: '修改成功',
              desc: ' 修改区域节点信息成功 '
            })
            this.$emit('success')
          })
        }
      })
    }
  },
  mounted () {

  }
}
</script>
