// 获取统一计算处理后的state属性值,并缓存起来,直至重新计算
import listToTree from '@/utils/listToTree'
export default {
  getErrorCode: (state) => {
    return state.errorCode
  },
  token: (state) => {
    return state.token
  },
  getMenus: (state) => {
    return listToTree(state.menuList)
  }
}
