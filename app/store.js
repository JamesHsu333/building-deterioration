import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const getters = {

  item(state) {
    return state.buildings[state.iBuilding]
  },

}

const mutations = {

  addBuilding(state, building) {
    state.buildings.push(building)
  },

  setBuilding(state, building) {
    state.buildings[state.iBuilding] = {
      ...state.buildings[state.iBuilding],
      ...building,
    }
  },

  setIBuilding(state, i) {
    if (i < 0)
      i += state.buildings.length
    state.iBuilding = i
  },

  setUser(state, user) {
    state.user = user
  },

}

const state = {
  buildings: [],
  iBuilding: undefined,
  user: undefined,
}

export default new Vuex.Store({
  getters,
  mutations,
  state,
})

// vi:et:sw=2:ts=2
