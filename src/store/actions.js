import * as types from './mutation-types'
const actions = {
  getMusicList ({ commit }) {
    commit(types.GET_RANDOM_SONG)
  }
}

export default actions
