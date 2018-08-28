// import axios from 'axios'
import utils from '@/lib/utils'
import songs from '../../static/data/index'
import * as types from './mutation-types'

const mutations = {
  [types.GET_RANDOM_SONG] (state) {
    return new Promise((resolve, reject) => {
      var randomId = utils.getRandomItem(songs)
      state.playSong.id = songs[randomId].id
      state.playSong.name = songs[randomId].name
      state.playSong.imgUlr = songs[randomId].imgUlr
      /**
        2. 注 : 部分用户反馈获取的 url 会 403,解决方案是当获取到音乐的 id 后，将 http://music.163.com/song/media/outer/url?id=id.mp3 以 src 赋予 Audio 即可播放
      */
      state.playSong.url = 'http://music.163.com/song/media/outer/url?id=' + state.playSong.id + '.mp3'
    })
  }
}

export default mutations
