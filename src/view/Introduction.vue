<template lang='pug'>
  div
    absolute-background(top)
      div
        img.big-logo(src='@/theme/material/Introduction.png')
        div(style='min-height: 15vmin')
    div
      div.header LIST BAAN
      house-preview
    absolute-background(bot)
</template>

<script>
  import HousePreview from '@/components/HousePreview.vue'
  import AbsoluteBackground from '@/components/AbsoluteBackground.vue'
  export default {
    components: {HousePreview, AbsoluteBackground},
  }

</script>

<style lang='stylus' scoped>
  .header
    font-size 5rem
    font-family ZingRust
    color white
    text-align center

  img.big-logo
    position: relative;
    z-index: 40;
    margin-top: -40px;
    padding: 10px;
    min-width: 280px;
    max-width: 70vw;
    filter: drop-shadow(20px 10px 12px #222f)
</style>
