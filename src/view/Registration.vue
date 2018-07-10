<template lang='pug'>
div
  absolute-background(top)
    img.big-logo(src='@/theme/material/Registeration.png')
  div.section
    transition(name='fadeIn' mode='out-in' duration='1000')
      condition(v-if='!lang' @accept='choose_lang')
      rnkm-form(:lang='lang' v-else)

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
      choose_lang(lang) {
        this.lang = lang
      }
    }
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
