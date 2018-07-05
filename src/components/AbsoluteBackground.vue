<template>
  <div>
    <div v-if='top' class='bg top'>
        <rnkm-nav></rnkm-nav>
        <slot></slot>
      <div>
      </div>
    </div>

    <div v-if='bot' class='bg bot' style='margin-top: -50vmin'>
      <div style='min-height: 70vmin'></div>
      <slot></slot>
      <rnkm-nav></rnkm-nav>
    </div>
  </div>
</template>

<script>

  export default {
    props: {
      top: Boolean,
      bot: Boolean,
      url: String
    },
    data(){
      return {}
    }
  }

</script>

<style lang='stylus' scoped>
  .bg
    color: red;
    width: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    background-color: black;
    text-align: center;
    background-image: url('../theme/wallpaper/background.jpg');
    &.top::before
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      height: 100vh;
      background-size: cover;
      background-position: bottom right;
      background-image: linear-gradient(to bottom, #ac422544, #002f4b00);
      opacity: 0.6;
      z-index: 0;
    &.top
      z-index: -10;
      background-position: bottom right;
      background-image: url('../theme/wallpaper/header.jpg')
    &.bot
      z-index: -10;
      background-position: top right;
      background-image: url('../theme/wallpaper/footer.jpg');

</style>
