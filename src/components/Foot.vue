<template>
  <footer>
    <ul>
      <li class="music-operation">
        <!-- <p>{{playSong.name}}</p> -->
        <p class="swap-icon">
          <img :src="playSong.imgUlr" class="song-icon" />
          <span class="icon-cover"></span>
        </p>
        <p class="play-pause" @click="playOrPause">
          <img class="play" src="../assets/play.svg" v-show="songPlay"/>
          <img class="pause" src="../assets/pause.svg" v-show="!songPlay"/>
        </p>
        <p v-if="playSong.url">
          <audio autoplay loop preload="auto">
            <source :src="playSong.url" type="audio/mp3">
            <source :src="playSong.url" type="audio/mpeg">
            请换个浏览器试试 - -!!
          </audio>
        </p>
      </li>
    </ul>
  </footer>
</template>

<script>
import { mapGetters } from 'vuex'
import utils from '@/lib/utils'

export default {
  name: 'Foot',
  data () {
    return {
      songPlay: true
    }
  },
  methods: {
    playOrPause () {
      this.songPlay = !this.songPlay
      utils.playOrPause()
    }
  },
  computed: mapGetters([
    'playSong'
  ]),
  created () {
    this.$store.dispatch('getMusicList')
  }
}
</script>
<style>
footer {
  position: fixed;
  left: 0;
  bottom: 0;
}
.music-operation {
  position: relative;
}
.swap-icon {
  width: 80px;
  height: 80px;
  position: relative;
  animation:mymove 5s infinite linear;
}
@keyframes mymove {
  0% {
    transform: rotateZ(0deg);
  }
  100% {
    transform: rotateZ(360deg);
  }
}
@-webkit-keyframes mymove {
  0% {
    transform: rotateZ(0deg);
  }
  100% {
    transform: rotateZ(360deg);
  }
}
.icon-cover {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 5px;
  opacity: .5;
  background: url(http://image.kuwo.cn/website/pc/singles/splice.png) no-repeat center;
}
.song-icon {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.play-pause {
  cursor: pointer;
  width: 30px;
  height: 30px;
  position: absolute;
  left: 25px;
  top: 25px;
}
.play-pause .play, .pause {
  width: 100%;
  height: 100%;
}
</style>
