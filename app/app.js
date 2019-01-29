import Vue from 'vue'
import VueJsModal from 'vue-js-modal'

import App from './components/App.vue'

Vue.use(VueJsModal, { componentName: 'vue-js-modal' })

new Vue({
  el: '#app',
  render: h => h(App),
})
