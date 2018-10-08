<template lang="html">
  <div class="">
    <router-link :to="{ name: 'MainA1', params: {id: 1} }">a</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'MainA',
  data () {
    return {}
  }
}
</script>

<style lang="css">
</style>
