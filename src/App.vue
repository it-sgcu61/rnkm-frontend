<template>
  <div id="app">
    <transition name="fade">
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
</style>
