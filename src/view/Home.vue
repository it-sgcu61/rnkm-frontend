<template lang='pug'>
div#home-wrapper(@click='$router.push("/introduction")')
    div.animated.rotateInDownLeft
      img.logo(src='../theme/material/Title_name.png')
    div.columns(style='margin-top: 2vh')
      div.column.field
        div.logo-wrap
          img.icon(src='../theme/material/power_btn.png' @click='$router.push("/introduction")')
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
      width: 35vmin
      height: @width;
      transition: transform .2s;
      z-index 100
      &:hover
        transform: scale(1.1, 1.1) rotate(10deg)
        filter: drop-shadow(2px 5px 9px #ff05)

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

<style scoped>
  @-webkit-keyframes rotating /* Safari and Chrome */ {
    from {
      -webkit-transform: rotate(0deg);
      -o-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(360deg);
      -o-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes rotating {
    from {
      -ms-transform: rotate(0deg);
      -moz-transform: rotate(0deg);
      -webkit-transform: rotate(0deg);
      -o-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    to {
      -ms-transform: rotate(360deg);
      -moz-transform: rotate(360deg);
      -webkit-transform: rotate(360deg);
      -o-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  .logo-wrap::before {
    position: absolute;
    margin: 0;
    top: 0;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    margin-top: calc(140px);
    transform-origin: 50% 50%;
    content: "";
    background: url("../theme/material/home_base_btn.png");
    background-size: 100% 100%;
    width: calc(200px + 29vw);
    height: calc(200px + 29vw);
    z-index: 1;
    opacity: .7;

    -webkit-animation: rotating 2s linear infinite;
    -moz-animation: rotating 2s linear infinite;
    -ms-animation: rotating 2s linear infinite;
    -o-animation: rotating 2s linear infinite;
    animation: rotating 2s linear infinite;

    float: left;
  }


</style>
