// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import store from './store/index.js'

import {
  Tree,
  Dialog,
  Carousel,
  DatePicker,
  TimePicker,
  CarouselItem,
  Upload
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(iView)
Vue.component(Tree.name, Tree)
Vue.component(Dialog.name, Dialog)
Vue.component(Carousel.name, Carousel)
Vue.component(DatePicker.name, DatePicker)
Vue.component(TimePicker.name, TimePicker)
Vue.component(CarouselItem.name, CarouselItem)
Vue.component(Upload.name, Upload)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
