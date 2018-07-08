<template lang='pug'>
div#home-wrapper
    div.animated.rotateInDownLeft
      img.logo(src='../theme/material/Title_name.png')
    div.columns(style='margin-top: 2vh')
      div.column.field
        // div.animated.fadeIn(style='animation-delay: 1.5s')
        // img.icon.big.spin(src='../theme/material/home_base_btn.png')
        div
          img.icon.small(src='../theme/material/power_btn.png' @click='$router.push("/introduction")')
      div.column.field
        div.animated.rotateInUpRight(style='animation-delay: .7s')
          h1 rubnongkaomai
          h2 4-5 August 2018
          h3 Chulalongkorn University
    div.section
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
    z-index 10
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

  .abs
    position absolute

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
      &.small
        width: 35vmin
        height: @width;
        transition: transform .2s;
        &:hover
          transform: scale(1.1, 1.1) rotate(10deg)
          filter: drop-shadow(2px 5px 9px #ff05)
      &.big
        opacity .6
        filter: blur(.5px)
        width: 70vmin
        height: @width;

      &.spin
        -webkit-animation: spin 10s linear infinite;
        -moz-animation: spin 10s linear infinite;
        animation: spin 10s linear infinite;

  @-moz-keyframes spin    { 100% { -moz-transform:    rotate(360deg); } }
  @-webkit-keyframes spin { 100% { -webkit-transform: rotate(360deg); } }
  @keyframes spin         { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } }

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
