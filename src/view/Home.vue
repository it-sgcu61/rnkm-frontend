<template lang='pug'>
div#home-wrapper(@click='$router.push("/introduction")')
    div.animated.rotateInDownLeft
      img.logo(src='../theme/material/Title_name.png')
    div.columns.space-top
      div.column.field
        div.logo-wrap
         div.animated.bounceIn(style='animation-delay: 1.7s')
          img.icon(src='../theme/material/power_btn.png' @click='$router.push("/introduction")')
      div.column.field
        div.animated.rotateInUpRight(style='animation-delay: .4s')
          h1 rubnongkaomai
          h2 4-5 August 2018
          h3 Chulalongkorn University
</div>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>

<style lang='stylus' scoped>
  #home-wrapper
    min-height: 100vh;
    text-align center
    overflow hidden
    background-image: url('../theme/wallpaper/background.jpg')
    background-size cover
    z-index 0
    .columns
      padding 10px 10vmin
      @media screen and (min-width 1000px)
        padding 10px 15vmax
  .column.field
    margin 10px 0
    @media screen and (min-width 1000px)
      &:nth-child(1)
        margin-right 10px
      &:nth-child(2)
        margin-left 10px

  .space-top
    margin-top: 2vh

  img
    &.bg
      display: block;
      object-fit: contain;
    &.logo
      right 0
      margin-top 10vh
      width 85vmin
      transition: transform .2s;
      &:hover
        transform: scale(1.1, 1.1)
        filter: drop-shadow(2px 5px 9px #f005)

    &.icon
      width: 35vmin
      height: @width;
      transition: transform .2s;
      z-index 100
      &:hover
        transform: scale(1.1, 1.1) rotate(10deg)
        filter: drop-shadow(2px 5px 9px #ff05)

  h1
    font-size calc(20px + 5vmin)
    margin: 0.3em 0;
  h2
    font-size calc(20px + 3vmin)
  h3
    font-size calc(15px +2vmin)
  h1, h2, h3
    font-family ZingRust
    transition: transform .2s;
    &:hover
      transform: scale(1.2, 1.1)
      filter: drop-shadow(2px 5px 9px #00f5)

</style>
