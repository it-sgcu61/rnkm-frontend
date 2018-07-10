<template lang='pug'>
div.wrapper
  div.box
    h1.title condition
    ol
      li.subtitle 234567
      li.subtitle 234567
      li.subtitle 234567
    button.button.is-warning(@click='$emit("accept-condition")')
      strong accept
</template>

<script>
export default {
  data() {
    return {
    }
  }
}
</script>

<style lang='stylus' scoped>
  .box
    max-width 500px
    margin 2em auto
    padding 4em
</style>
