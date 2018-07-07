<template lang='pug'>
div
  absolute-background(top)
    img.big-logo(src='@/theme/material/Instruction.png')
  div.section
    rnkm-form

  div(style='height: 400px; background-color: black')
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
    padding: calc(100px + 5vmax) 0 0 0
    margin-bottom: -400px
  img.big-logo
    position: relative;
    z-index: 40;
    margin-top: -40px;
    padding: 10px;
    min-width: 280px;
    max-width: 70vw;
    filter: drop-shadow(20px 10px 12px #222f)
</style>
