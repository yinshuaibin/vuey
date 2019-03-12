'use strict'
import _ from 'lodash'
var lodash = {}
lodash.install = function (Vue, option) {
  Object.defineProperty(Vue.prototype, '$_', { value: _ })
}
export default lodash
