import Vue from 'vue'
import VueJsModal from 'vue-js-modal'
import Vuex from 'vuex'

import App from './components/App.vue'
import store from './store'

Vue.use(VueJsModal, { componentName: 'vue-js-modal' })

new Vue({
  el: '#app',
  store,
  render: h => h(App),
})
