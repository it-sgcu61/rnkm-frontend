<template lang='pug'>
  div#app
    transition(name="fade" mode='out-in' duration='400')
      router-view
</template>

<script>
export default {
}
</script>

<style lang='stylus'>
</style>
