<style scoped>
</style>

<template>
<Row>
      <Row>
      <Breadcrumb class="bread">
            <BreadcrumbItem>系统管理</BreadcrumbItem>
            <BreadcrumbItem>区域节点管理</BreadcrumbItem>
          </Breadcrumb>
      </Row>
      <Row>
          <Button type="primary" icon="plus"  style="margin-bottom:10px;margin-top:20px;margin-left:10px" @click="openElModal({})">添加区域节点信息</Button>
        <div :scan="'up'" :title="'区域节点列表'" :height="735" style="margin:10px">
          <Table height="520" border  stripe :columns="columns" :data="resultList"></Table>
            <Page :total="totalNum" :page-size="queryParam.pageSize" :current="queryParam.pageNum" show-elevator style="margin-top:10px;float: right;" show-total @on-change="pageChange"></Page>
        </div>

          <el-dialog  :close-on-click-modal="false" :visible.sync="elModal" :close-on-press-escape="false" :show-close="false" :modal-append-to-body="false" width="538px" top="100px">
            <p v-if="!formParam.id" slot="title" style="height:0px;font-size:15px;">增加区域节点信息</p>
            <p v-else slot="title" style="height:0px;font-size:15px;">区域节点信息修改</p>
            <regional-form :formParam="formParam" ref="regionalForm" @closeAndClear="closeAndClear" v-on:success="closeElModal" style="height:380px;margin-left:50px;margin-top:20px;width:630px"></regional-form>
         </el-dialog>

          <Modal v-model="delModel" title="确定删除么?" @on-ok="delParam">
              <p style="color:black">确定要删除此项么?</p>
        </Modal>
      </Row>
      </Row>
  </Row>
</template>
<script>
import restApi from '@/api/restApi.js'
import regionalForm from './form.vue'
export default {
  name: 'regionalNodeList',
  components: {regionalForm},
  data () {
    return {
      elModal: false,
      delModel: false,
      addModel: false,
      updateModel: false,
      resultList: [],
      totalNum: 0,
      queryParam: {
        pageSize: 10,
        pageNum: 1
      },
      formParam: {},
      rowId: '',
      columns: [
        {
          title: '区域唯一标识编号',
          key: 'regionalId',
          align: 'center'
        },
        {
          title: '区域名称',
          key: 'regionalName',
          align: 'center'
        },
        {
          title: '服务器ip',
          key: 'nodeServerIp',
          align: 'center'
        },
        {
          title: '服务器端口',
          key: 'nodeServerPort',
          align: 'center'
        },
        {
          title: '操作',
          width: 96,
          render: (h, params) => {
            return h(
              'Dropdown',
              {
                props: {
                  trigger: 'click'
                },
                on: {
                  'on-click': v => {
                    if (v === 'edit') {
                      let form = params.row
                      this.openElModal(form, params.index)
                    } else if (v === 'del') {
                      this.rowId = params.row.id
                      this.delModel = true
                    }
                  }
                }
              },
              [
                h(
                  'Button',
                  {
                    domProps: {
                      href: 'javascript:void(0)'
                    }
                  },
                  [
                    '操 作',
                    h('Icon', {
                      props: {
                        type: 'arrow-down-b'
                      }
                    })
                  ]
                ),
                h(
                  'DropdownMenu',
                  {
                    slot: 'list'
                  },
                  [
                    h(
                      'DropdownItem',
                      {
                        props: {
                          name: 'edit'
                        }
                      },
                      '编辑'
                    ),
                    h(
                      'DropdownItem',
                      {
                        props: {
                          name: 'del'
                        }
                      },
                      '删除'
                    )
                  ]
                )
              ]
            )
          }
        }
      ]
    }
  },
  computed: {

  },
  methods: {
    closeElModal () {
      this.elModal = false
      this.findByPage()
      this.$refs.regionalForm.restart()
    },
    openElModal (params) {
      this.formParam = params
      this.elModal = true
    },
    closeAndClear () {
      this.elModal = false
      this.findByPage()
      this.$refs.regionalForm.restart()
    },
    delParam () {
      restApi.deleteRegionalNode(this.rowId).then((data) => {
        if (data === 1) {
          this.$Notice.success({
            title: '删除成功',
            desc: ' 删除区域节点数据成功 '
          })
          this.findByPage('del')
        }
      })
    },
    // 分页查询
    findByPage (flage) {
      if (flage) {
        if (flage === 'del' && this.queryParam.pageNum !== 1 && this.resultList.length === 1) {
          this.queryParam.pageNum = this.queryParam.pageNum - 1
        }
      }
      restApi.findRegionalNodeByPage(this.queryParam.pageNum, this.queryParam.pageSize).then((data) => {
        this.resultList = data.resultList
        this.totalNum = data.totalNum
      })
    },
    pageChange (pageNum) {
      this.queryParam.pageNum = pageNum
      this.findByPage()
    }
  },
  mounted () {
    this.findByPage()
  }
}
</script>
