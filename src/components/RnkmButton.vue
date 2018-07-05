<template lang='pug'>
div#container
  div#text hello2352354
  img#btn(src='@/theme/material/text_btn.png')
</template>

<script>
export default {
  data() {
    return {
    }
  }
}
</script>Z

<style lang='stylus' scoped>
#container
  overflow hidden
  #btn
    max-height 180px
    margin auto
    background-color red
    filter: drop-shadow(20px 10px 12px #222f)
  #text
    max-width 70%
    position: absolute;
    z-index 1
    margin 0 1rem
    translate 50% 50% 0
</style>
