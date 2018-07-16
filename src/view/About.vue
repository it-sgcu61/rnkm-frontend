<template lang='pug'>
div
    absolute-background(top :src="require('@/theme/material/logo_1.png')")
    rnkm-info
    rnkm-sponsor
    absolute-background(bot)
</template>

<script>
  import AbsoluteBackground from '@/components/AbsoluteBackground.vue'
  import RnkmInfo from '@/components/Info.vue'
  export default {
    components: {AbsoluteBackground, RnkmInfo},
  }
</script>

<style lang='stylus' scoped>
</style>
