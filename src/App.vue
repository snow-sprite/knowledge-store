<template>
  <div id="app">
    <Head />
    <router-view/>
    <!-- <Home /> -->
    <!-- <Foot /> -->
  </div>
</template>

<script>
import Head from '@/components/Head'
import Home from '@/page/Home'
import Foot from '@/components/Foot'
export default {
  name: 'App',
  components: {
    Head,
    Home,
    Foot
  }
}
</script>

<style>
/* @import '../../static/css/public.css'; */
</style>
