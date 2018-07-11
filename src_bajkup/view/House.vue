<template lang='pug'>
div
  absolute-background(top)
    div.logo-wrap
      img.big-logo(:src='require(`@/theme/house/${data.nameURL}.png`)' :alt='data.nameTH')
  div.section.has-text-centered.body-wrap
    div.head-wrap.level
      div.title {{data.nameTH}} - {{data.nameEN}}
    div.subtitle.slogan "{{data.slogan}}"
    div.info-wrap.has-text-centered
      div.subtitle {{data.description}}

    div.social-btn
      a(href='https://line.me')
        img(src='../theme/material/line.svg')
      a(href='https://facebook.com')
        img(src='../theme/material/facebook-square.svg')
      a(href='https://www.instagram.com')
        img(src='../theme/material/instagram.svg')
      a(href='https://twitter.com')
        img(src='../theme/material/twitter-square.svg')

    div.social-btn
      a.is-block(href='https://goo.gl/forms/7hJjvI418Vhe70YY2') ประสานบ้านกรอก link
      a.is-block(href='https://docs.google.com/spreadsheets/d/1iC9097qVOkSIqARIhlvavPVB_erGyJ4sGf1kHL83Eik')  ตรวจสอบข้อมูล
      h1 เดียวจะอัพเดต link ให้ภายในวันนี้
    img.back(@click='$router.push("/house")' src='../theme/material/back_btn.png')
  absolute-background(bot)
</template>

<script>
  import AbsoluteBackground from '@/components/AbsoluteBackground.vue'
  export default {
    components: {AbsoluteBackground},
    data() {
      return {
        name: this.$route.params.name,
        data: {}
      }
    },
    created(){
      console.log('house created')
      let raw_data = _.keyBy(require('@/others/house_data.json').data, "nameURL")[this.name]
      if (raw_data) {
        this.data = raw_data
        window.scrollTo(0, 0);
      } else {
        this.$router.push('/house')
      }
    },
    mounted(){
      window.scrollTo(0, 0);
    }
  }
</script>

<style lang='stylus' scoped>
  .title,
  .subtitle
    color: white
    font-family: Superspace

  .title
    font-weight bold
    font-size 10vmin
    margin 0

  .subtitle
    font-weight lighter
    font-size 5vmin
    line-height 1.5em
    &.slogan
      font-style: italic
      font-size: 6vmin

  .social-btn
    & img
      width 20%
      padding 1em
      padding-top 6em
      min-width 50px
      max-width 100px
      filter: invert(100%)

    margin 20px
  .logo-wrap
    text-align: center;
    @media screen and (orientation: landscape)
      padding-top: calc(5vh);
      padding-button: calc(5vh);
    @media screen and (orientation: portrait)
      padding-top: calc(15vh);
      padding-button: calc(5vh);

  .head-wrap
    display inline-block
    align-items: center;
    justify-content: center;
    padding-bottom calc(5px + 3vmin + 5vh)
    display flex
    vertical-align middle

  .body-wrap
    max-width 1000px
    margin 0 auto

  .info-wrap
    white-space:pre-wrap;
    text-align center
    margin 0 auto
    padding 0 calc(5px + 2vw)

  .section
    color: white
    background-color: black
    padding: 3rem 3rem


  img
    &.big-logo
      padding: 10px;
      min-width: 280px;
      max-width: 80vmin;
      border-radius 30px
      filter: drop-shadow(7px 8px 25px #000f)
    &.icon
      width: calc(10px + 7vmin)
      height: @width
      margin-bottom 2.4em
    &.back
      margin-top 5em
      width: calc(100px + 7vmin)
      height: @width

  .fa
    font-size 30px
    max-width 20%

</style>
