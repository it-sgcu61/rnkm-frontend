<template lang='pug'>
  div
    div.bg.top(v-if='top')
      rnkm-nav
      slot
      div.flex.jcenter
        div.mcenter.is-inline-block
          img.big-logo.abs.mcenter(v-if='src2' :src='src2')
          img.big-logo.abs.mcenter(v-if='src' :src='src')
    div.bg.bot(v-if='bot' style='height: 30vh; margin-top: -8vh')
      slot
      div(style='padding-top: 20vh')
      rnkm-nav
</template>

<script>
  export default {
    props: {
      top: Boolean,
      bot: Boolean,
      src: String,
      src2: String
    }
  }
</script>

<style lang='stylus' scoped>
  .abs
    position absolute !important
  .bg
    color: red;
    width: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    background-color: transparentify;
    text-align: center;
    background-image: url('../theme/wallpaper/background.jpg');
    &.top::before
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      height: 0;
      background-size: cover contain;
      background-position: bottom right;
      background-color: #020202;
      background-image: linear-gradient(to bottom, #ac422544, #002f4b00);
      opacity: 0.6;
      z-index: 0;
      z-index: -10;
    &.top
      height 95vh;
      background-position: bottom right;
      background-image: url('../theme/wallpaper/top_violet_1280x950.png')
    &.bot
      padding-bottom 5vmin
      background-position: top right;
      background-image: url('../theme/wallpaper/bottom_violet_1280x950.png');

  .big-logo
    position: absolute;
    padding: 10px;
    top 50%
    left 50%
    transform translate(-50%, -50%)
    min-width: 280px;
    max-width: 90vw;
    max-height: 70vh;
    border-radius: 5vmin;
    margin 0 auto
    filter: drop-shadow(5px 10px 12px #050505cc);
    @media screen and (orientation: landscape)
      margin-top: calc(-70px + 20vh - 1vw);
    @media screen and (orientation: portrait)
      margin-top: calc(-120px + 37vh - 5vw);
</style>
