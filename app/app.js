import Vue from 'vue'
import VueJsModal from 'vue-js-modal'
import Vuex from 'vuex'
import App from './components/App.vue'

Vue.use(VueJsModal, { componentName: 'vue-js-modal' })
Vue.use(Vuex)

const store = new Vuex.Store({

  mutations: {

    setUser(state, user) {
      state.user = user
    },

  },

  state: {
    user: null
  },

})

new Vue({
  el: '#app',
  store: store,
  render: h => h(App),
})
