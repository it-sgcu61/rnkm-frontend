<template lang='pug'>
div
  absolute-background(top)
    div.logo-wrap
      img.big-logo(:src='require(`@/theme/house/${data.nameURL}.png`)' :alt='data.nameTH')
  div.section.has-text-centered
    div.head-wrap.level
      div.title {{data.nameTH}} - {{data.nameEN}}
      // img.is-inline.icon(:src='require(`../theme/material/${data.size}_btn.png`)')
    div.subtitle.slogan "{{data.slogan}}"
    div.body-wrap.has-text-centered
      div.subtitle {{data.description}}
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

  .logo-wrap
    text-align: center;
    padding-top: 10vmin;

  .head-wrap
    display inline-block
    align-items: center;
    justify-content: center;
    padding-bottom calc(5px + 3vmin + 5vh)
    display flex
    vertical-align middle

  .body-wrap
    white-space:pre-wrap;
    text-align center
    max-width 900px
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
      filter: drop-shadow(7px 8px 25px #000f)
    &.icon
      width: calc(10px + 7vmin)
      height: @width
      margin-bottom 2.4em
    &.back
      margin-top 5em
      width: calc(100px + 7vmin)
      height: @width

</style>
