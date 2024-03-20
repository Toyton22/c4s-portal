import Vuex from 'vuex'

export default new Vuex.Store({
  state: {
    status: 'logout',
    user: {},
    c4suser: {}
  },
  mutations: {
    setStatus (state, snapshot) { state.status = snapshot },
    setUser (state, snapshot) { state.user = snapshot },
    setC4sUser (state, snapshot) { state.c4suser = snapshot }
  }
})