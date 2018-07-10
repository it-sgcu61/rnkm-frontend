<template lang='pug'>
  div
    absolute-background(top)
      div
        img.big-logo(src='@/theme/material/Introduction.png')
    div
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
