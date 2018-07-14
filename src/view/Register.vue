<template lang='pug'>
div
  absolute-background(top :src='require("../theme/heading/Registeration_text.png")' :src2='require("../theme/heading/Registeration_frame.png")')
  div.section
    term-and-condition(v-if='!accept' @accept-condition='acceptedCondition')
    rnkm-form(v-else :lang="lang")

  absolute-background(bot)
</template>

<script>
  import AbsoluteBackground from '@/components/AbsoluteBackground.vue'
  import TermAndCondition from '@/components/TermAndCondition.vue'
  import RnkmForm from '@/components/Form.vue'
  export default {
    components: {AbsoluteBackground, RnkmForm, TermAndCondition},
    data() {
      return {
        lang: null,
        accept: false
      }
    },
    methods: {
      acceptedCondition(lang) {
        this.lang = lang
        this.accept = true
      }
    }
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
