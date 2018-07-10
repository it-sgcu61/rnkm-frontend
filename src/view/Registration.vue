<template lang='pug'>
div
  absolute-background(top)
    img.big-logo(src='@/theme/material/Registeration.png')
  div.section
    rnkm-form

  absolute-background(bot)
</template>

<script>
  import AbsoluteBackground from '@/components/AbsoluteBackground.vue'
  import RnkmForm from '@/components/Form.vue'
  export default {
    components: {AbsoluteBackground, RnkmForm},
  }
</script>

<style lang='stylus' scoped>
  .section
    background-color #020202
  .big-logo
    position: relative;
    padding: 10px;
    min-width: 280px;
    max-width: 90vw;
    max-height: 70vh;
    filter: drop-shadow(20px 10px 12px #222f)
    @media screen and (orientation: landscape)
      margin-top: calc(-70px + 20vh - 1vw)
    @media screen and (orientation: portrait)
      margin-top: calc(-120px + 37vh - 5vw)
</style>
