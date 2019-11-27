import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let state = {
  powerUser: {
    userName: "",
    nickName: ""
  },
  currentGame: null,
  systemGame: [],
  roleSelected: null,
}
let mutations = {
  setPowerUser: (state, powerUser) => {
    state.powerUser = powerUser;
  },
  setSystemGame: (state, systemgame) => {
    state.systemGame = systemgame;
  },
  setPowerCurGame: (state, currentGame) => {
    state.currentGame = currentGame;
  },
  setRoleSelected: (state, item) => {
    state.roleSelected = item;
  },
  clearPowerInfo: (state) => {
    state.currentGame = null
    state.roleSelected = null
  },
  clearSystemGameState: (state) => {
    state.currentGame = null
    for(let i=0;i<state.systemGame.length;i++){
      state.systemGame[i].open=false;
    }
  }
}
let actions = {

}
let getters = {

}
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
export default store
