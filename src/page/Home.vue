<template>
  <section>
    <h2>{{msg}}</h2>
  </section>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      msg: 'Each increment of knowledge tells us more of our world.'
    }
  }
}
</script>
<style>
li {
  list-style: none;
}
</style>
