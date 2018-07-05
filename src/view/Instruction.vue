<template lang='pug'>
div
    absolute-background(top)
      img.big-logo(src='@/theme/material/Instruction.png')
    div(style='height: 500px; background-color: black')
    absolute-background(bot)
</template>

<script>
  import AbsoluteBackground from '@/components/AbsoluteBackground.vue'
  export default {
    components: {AbsoluteBackground},
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
