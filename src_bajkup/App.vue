<template>
  <div id="app">
    <transition name="fade" mode='out-in' duration='400'>
      <!-- <keep-alive> -->
        <router-view/>
      <!-- </keep-alive> -->
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
  color: white;
}
.section {
  background-color: transparent;
}
</style>
