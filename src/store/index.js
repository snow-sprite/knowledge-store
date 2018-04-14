import Vue from 'vue'
import Vuex from 'vuex'
// import songsId from '../../static/data'
// vuex
import getters from './getters'
import actions from './actions'
import mutations from './mutations'
Vue.use(Vuex)

const state = {
  // 正在播放的音乐
  playSong: {}
}

const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})

export default store
