<template lang='pug'>
div
  absolute-background(top)
    img.big-logo(src='@/theme/material/Registeration.png')
  div.section
    condition(v-if='!accept' @accept-condition='acceptedCondition')
    rnkm-form(v-else :lang="lang")

  absolute-background(bot)
</template>

<script>
  import AbsoluteBackground from '@/components/AbsoluteBackground.vue'
  import RnkmForm from '@/components/Form.vue'
  import Condition from '@/components/Condition.vue'
  export default {
    components: {AbsoluteBackground, RnkmForm, Condition},
    data() {
      return {
        lang: null,
        accept: false
      }
    },
    methods: {
      acceptedCondition(lang) {
        this.lang=lang
        this.accept=true
      }
    }
  }
</script>

<style lang='stylus' scoped>
  .section
    background-color transparentify
    padding 2em 1em
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
