<template lang='pug'>
div
    absolute-background(top)
      img.big-logo(src='@/theme/material/Annoucment.png')
    section.section
      div.container
        div.field
          h1 Check For House
      div#result-wrapper.section(v-if='result.show=="ready"')
        div.logo-wrap
          img.logo(@click='result.url' :src='result.img')
        div.logo-wrap
          img.back(@click='result.show = "query"' src='../theme/material/back_btn.png')
      div.scale-x2(v-else-if='result.show=="loading"' align="middle")
        rotate-square5
      form.container(v-else)
        div.field
          input.input(v-model='login.usr' type="tel" v-mask="'###-###-####'" :masked="false" placeholder='phone number' pattern='[0-9]{10}' title="10 digit tel number")
        div.field
          input.input(v-model='login.pwd' type='password' placeholder='personal ID')
        div.field
          img#submit(@click='submit' src='../theme/material/submit_btn.png')
    absolute-background(bot)
</template>

<script>
  import AbsoluteBackground from '@/components/AbsoluteBackground.vue'
  import {mask} from 'vue-the-mask'
  import {RotateSquare5} from 'vue-loading-spinner'
  import {announcement} from '../middle-api'
  export default {
    components: {AbsoluteBackground, RotateSquare5},
    directives: {mask},
    data() {
      return {
        login: {
          usr: '',
          pwd: ''
        },
        result: {
          show: "query",
          img: '',
          url: ''
        }
      }
    },
    methods: {
      async submit () {
        this.result.show = "loading"
        var baanResult = await announcement(this.login.usr, this.login.pwd)
        this.result.img = require(`../theme/house/${baanResult}.png`)
        this.result.url = () => this.$router.push(`/house/${baanResult}`)
        this.result.show = "ready"
      }
    },
    watch: {
      login: {
        deep: true,
        handler() {
          this.result.show = "query"
        }
      }
    }
  }
</script>

<style lang='stylus' scoped>
  .scale-x2
    transform: scale(2)
  .section
    background-color: #020202

  h1
    font-size: calc(7vmin + 2vw)
    font-family: ZingRust

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

  .field
    text-align center

  .input
    background-color #eee
    text-align center
    font-size calc(9px + 1vmin + 1vw)
    font-family ZingRust
    font-weight regular
    font-style normal
    letter-spacing: .07em
    padding 0
    width 450px
    background-color #eee
    @media screen and (min-width: 600px)
      width 550px
    @media screen and (min-width: 1025px)
      width 1000px

  #submit
    margin-top 10vmin
    max-width 180px
    cursor pointer

  #result-wrapper
    transform all 1s
    .logo-wrap
      text-align center
      transition opacity 1s ease
      .logo
        width calc(300px + 7vmin)
        background-color white
        border-radius 15px
      .back
        margin-top 0
        width: calc(140px + 7vmin)
        height: @width

</style>
