import {
  // 查询
  get,
  // add,insert
  post
  // update
  // put,
  // update
  // patch,
  // delete
  // remove
} from './http.js'
let restApi = {}

export default restApi

restApi.getAllUser = (pageNum, pageSize) => {
  return get('/findUser', {'pageNum': pageNum, 'pageSize': pageSize})
}
restApi.insertUser = (param) => {
  return post('/insertUser', param)
}
restApi.login = (param) => {
  return post('/login', param)
}
restApi.getProgress = () => {
  return get('/getProgress')
}
restApi.startProgress = () => {
  return get('/startProgress')
}
/**
 * 分页查询区域节点数据
 */
restApi.findRegionalNodeByPage = (pageNum, pageSize) => {
  return get('/findNodeByPage', {'pageNum': pageNum, 'pageSize': pageSize})
}
/**
 * 增加区域节点
 */
restApi.insertRegionalNode = (params) => {
  return post('/insertNode', params)
}
/**
 * 修改区域节点
 */
restApi.updateRegionalNode = (params) => {
  return post('/updateNode', params)
}
/**
 * 删除区域节点
 */
restApi.deleteRegionalNode = (id) => {
  return get('/deleteNode', {'id': id})
}
/**
 * 校验区域节点编号重复
 */
restApi.checkoutRegionNodeId = (id, regionalNodeId) => {
  return get('/checkoutRegionalId', {'id': id, 'regionalNodeId': regionalNodeId})
}
