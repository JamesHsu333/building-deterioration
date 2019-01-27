import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const getters = {

  building(state) {
    const i = state.iBuilding
    if (undefined === i)
      return undefined
    return state.buildings[i]
  },

  deterioration(state, getters) {
    const i = state.iDeterioration
    const items = getters.deteriorations
    if (undefined === i || undefined === items)
      return undefined
    return items[i]
  },

  deteriorations(state, getters) {
    if (undefined === getters.building)
      return []
    return getters.building.deteriorations
  },

}

const mutations = {

  addBuilding(state, item) {
    state.buildings.push(item)
  },

  addDeterioration(state, item) {
    const building = state.buildings[state.iBuilding]
    building.deteriorations.push(item)
  },

  setDeterioration(state, item) {
    const building = state.buildings[state.iBuilding]
    building.deteriorations[state.iDeterioration] = {
      ...building.deteriorations[state.iDeterioration],
      ...item,
    }
  },

  setBuilding(state, item) {
    state.buildings[state.iBuilding] = {
      ...state.buildings[state.iBuilding],
      ...item,
    }
  },

  setIBuilding(state, i) {
    if (i < 0)
      i += state.buildings.length
    state.iBuilding = i
    state.iDeteorioration = undefined
  },

  setIDeterioration(state, i) {
    const building = state.buildings[state.iBuilding]
    if (!building)
      return
    if (i < 0)
      i += building.deteriorations.length
    state.iDeterioration = i
  },

  setUser(state, user) {
    state.user = user
  },

}

const state = {
  buildings: [],
  iBuilding: undefined,
  iDeterioration: undefined,
  user: undefined,
}

export default new Vuex.Store({
  getters,
  mutations,
  state,
})

// vi:et:sw=2:ts=2
