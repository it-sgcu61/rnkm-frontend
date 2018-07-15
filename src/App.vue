<template lang='pug'>
  div#app
    transition(name="fade" mode='out-in' duration='400')
      router-view(:key="$route.fullPath")
</template>

<script>
export default {
}
</script>

<style lang='stylus'>
</style>
