<template>
  <footer>
    <ul>
      <li v-for="(item, ind) in songs" :key="ind">{{item.name}}</li>
    </ul>
    <audio autoplay loop preload="auto">
      <source src="../../static/music/烟火里的尘埃-华晨宇.mp3" type="audio/mpeg">
      请换个浏览器试试 - -!!
    </audio>
  </footer>
</template>

<script>
export default {
  name: 'Foot',
  data () {
    return {
      songs: [{
        name: '烟火里的尘埃'
      }]
    }
  }
}
</script>
<style>

</style>
