<template>
  <header>
    <router-link :to="{ name: `Main${item.toUpperCase()}` }" v-for="(item, ind) in nav" :key="ind"><span>{{item}}  </span></router-link>
  </header>
</template>

<script>
export default {
  name: 'Head',
  data () {
    return {
      nav: ['a', 'b', 'c', 'd']
    }
  }
}
</script>
