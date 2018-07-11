<template lang='pug'>
  div
    div.bg.top(v-if='top')
      rnkm-nav
      slot
    div.bg.bot(v-if='bot' style='height: 40vh')
      slot
      div(style='padding-top: 30vh')
      rnkm-nav
</template>

<script>
  export default {
    props: {
      top: Boolean,
      bot: Boolean,
      url: String,
    },
    data(){
      return {
      }
    },
  }

</script>

<style lang='stylus' scoped>
  .bg
    color: red;
    width: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    background-color: #020202;
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
      background-size: contain;
      background-position: bottom right;
      background-color: #020202;
      background-image: linear-gradient(to bottom, #ac422544, #002f4b00);
      opacity: 0.6;
      z-index: 0;
    &.top
      z-index: -10;
      height 90vh;
      background-position: bottom right;
      background-image: url('../theme/wallpaper/top_violet_1280x950.png')
    &.bot
      z-index: -10;
      padding-bottom 5vmin
      background-position: top right;
      background-image: url('../theme/wallpaper/bottom_violet_1280x950.png');

</style>
