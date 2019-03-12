'use strict'
import moment from 'moment'
var $moment = {}
$moment.install = function (Vue, option) {
  Object.defineProperty(Vue.prototype, '$moment', { value: moment })
}
export default $moment
