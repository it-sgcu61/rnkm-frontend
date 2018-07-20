<template lang='pug'>
div

  // LOADING
  div.container(v-if='loading' align='middle')
    div.scale-x2
      rotate-square5

  // EXPIRE
  div#expired.container(v-else-if='expired')
    div.flex
      div.mcenter
        h1.is-size-1.zingR Registration expired.

  // SUCCESS
  div.container(v-else-if='success')
    div.flex
      div.mcenter
        h1.is-size-1.zingR Registration success.
        h2.is-size-2.space Announce the result on Sat Jul 25 2018
        p.space.is-size-4 please like our facebook page to receive news and information.
          a(href='https://fb.com/chulafreshmen/' target="_blank" rel="noopener noreferrer")
            img(src='@/theme/material/FB.png' style='width:40px; margin-left:20px;' align='middle')

  // COUNTDOWN
  div.container(v-else-if='countdown')
    vue-countdown(:time="timeLeft" @countdownend="$emit('ready')")
      template(slot-scope="props")
        div.flex
          div.mcenter
            h1.zingR(style='font-size:3em;') Registration will start in:
            h1.zingR(style='font-size:5em;') {{ props.days }}:{{ props.hours }}:{{ props.minutes }}:{{ props.seconds }}
            h1.zingR(style='font-size:1.5em; color: #3a225c') ({{ (new Date(formState.closeOn.datetime[0])).toString() }})

</template>

<script>
import {RotateSquare5} from 'vue-loading-spinner'
import VueCountdown from '@xkeshi/vue-countdown';
export default {
  props: ['timeLeft', 'formState', 'loading', 'success', 'expired', 'countdown'],
  components: {RotateSquare5, VueCountdown},
  data() {
    return {
    }
  }
}
</script>

<style lang='stylus' scoped>
</style>

<style lang='stylus' scoped>
  .scale-x2
    transform: scale(2)
  .zingR
    font-family: ZingRust
  .space
    font-family: Superspace
  #expired
    color: #f53131a6
</style>

