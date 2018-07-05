<template lang='pug'>
div
  absolute-background(top)
    img.big-logo(src='@/theme/material/Instruction.png')

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
  img.big-logo
    position: relative;
    z-index: 40;
    margin-top: -60px;
    padding: 10px;
    min-width: 280px;
    max-width: 70vw;
    filter: drop-shadow(20px 10px 12px #222f)
</style>
