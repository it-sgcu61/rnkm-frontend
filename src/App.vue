<template>
  <div id="app">
    <transition name="fade" mode='out-in' duration='400'>
      <router-view/>
    </transition>
  </div>
</template>

<script>
export default {
}
</script>

<style>
html {
  min-height: 100%;
}
#app {
  background-color: black;
  color: white;
}
</style>
