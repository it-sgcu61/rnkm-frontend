<template lang='pug'>
div
  absolute-background(top)
    div.logo-wrap
      img.big-logo(:src='require(`@/theme/house/${data.nameTH}.png`)')
  div.section.has-text-centered
    div.head-wrap
      div.is-inline.title {{data.nameTH}} - {{data.nameEN}}
      img.is-inline.icon(:src='require(`../theme/material/${data.size}_btn.png`)')
    div.body-wrap.has-text-centered
      div.subtitle {{data.description}}
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
      let raw_data = _.keyBy(require('@/others/house_data.json').data, "nameEN")[this.name]
      console.log(this.data)
      if (raw_data) {
        this.data = raw_data
      } else {
        alert('Bad request')
      }
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
    font-size 13vmin

  .subtitle
    font-weight light
    font-size 6vmin
    line-height 1.7em

  .logo-wrap
    text-align: center;
    padding-top: 10vmin;

  .head-wrap
    display inline-block
    align-items: center;
    justify-content: center;
    padding-bottom calc(5px + 5vmin + 5vh)
    display flex
    vertical-align middle

  .body-wrap
    white-space:pre-wrap;
    text-align center
    max-width 1100px
    margin 0 auto
    padding 0 calc(5px + 2vw)

  .section
    color: white
    min-height: 500px;
    background-color: black


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
</style>
