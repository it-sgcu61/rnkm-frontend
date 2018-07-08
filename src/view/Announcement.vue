<template lang='pug'>
div
    absolute-background(top)
      img.big-logo(src='@/theme/material/Annoucment.png')
    section.section(style='height: 700px; background-color: black')
      div.container
        div.field
          h1 Check For House
      div#result-wrapper.section(v-if='result.show')
        div.logo-wrap
          img.logo(@click='result.url' :src='result.img')
        div.logo-wrap
          img.back(@click='result.show = false' src='../theme/material/back_btn.png')
      form.container(v-else)
        div.field
          input.input(v-model='login.usr' name="usr_name" placeholder='phone number' pattern='[0-9]{10}' title="10 digit tel number")
        div.field
          input.input(v-model='login.pwd' type='password' placeholder='personal ID')
        div.field
          img#submit(@click='submit' src='../theme/material/submit_btn.png')
    absolute-background(bot)
</template>

<script>
  import AbsoluteBackground from '@/components/AbsoluteBackground.vue'
  export default {
    components: {AbsoluteBackground},
    data() {
      return {
        login: {
          usr: '',
          pwd: ''
        },
        result: {
          show: false,
          img: '',
          url: ''
        }
      }
    },
    methods: {
      submit () {
        this.result.show = true
        this.result.img = require('../theme/house/dork.png')
        this.result.url = () => this.$router.push('/house/dork')
      }
    },
    watch: {
      login: {
        deep: true,
        handler() {
          this.result.show = false
        }
      }
    }
  }
</script>

<style lang='stylus' scoped>

  h1
    font-size: calc(7vmin + 2vw)
    font-family: ZingRust

  img.big-logo
    position: relative;
    z-index: 40;
    margin-top: -60px;
    padding: 10px;
    min-width: 280px;
    max-width: 70vw;
    filter: drop-shadow(20px 10px 12px #222f)

  .field
    text-align center

  input.input
    background-color #eee
    text-align center
    max-width 400px
    font-size calc(5vmin + 1vw)
    font-family ZingRust
    font-weight regular
    font-style normal
    letter-spacing: .07em

  #submit
    margin-top -30px
    max-width 200px
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
