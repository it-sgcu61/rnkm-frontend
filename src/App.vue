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
  background-color: #020202;
  /* background-image: */
  color: white;
}
.section {
  background-color: transparent;
}
</style>
