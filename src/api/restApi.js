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
