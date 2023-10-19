import Vue from 'vue'
import { createPinia, PiniaVuePlugin } from 'pinia'

import router from './router'
import { BootstrapVue } from 'bootstrap-vue'

import "./assets/scss/style.scss"

Vue.use(PiniaVuePlugin)

Vue.use(BootstrapVue)

import App from './App.vue'

new Vue({
  pinia: createPinia(),
  router,
  render: (h) => h(App)
}).$mount('#app')
