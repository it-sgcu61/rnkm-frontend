<template lang='pug'>
div.tcenter

  // PINTEREST
  div(v-sticky="stickyConfig")
    house-pinterest.abs(@click="setFavoriteHouse" :houses="houses")

  absolute-background(top :src='require(`@/theme/house/${data.nameURL}.png`)' :alt='data.nameTH')
  div.section.tcenter.mcenter

    // HOUSE INFO
    h1.is-size-1.bold {{data.nameTH}} - {{data.nameEN}}
    div.tab: h1.is-size-3.italic "{{data.slogan}}"
    div.tab: p.is-size-4 {{data.description}}
    div.tab: div
      template(v-for='atr in ["lineURL", "facebookURL", "instagramURL", "twitterURL"]')
        a(v-if='data[atr]' :href='data[atr]' :alt='atr' target="_blank" rel="noopener noreferrer")
          img.social-btn(:src="require(`../theme/material/${atr}.svg`)")

    // NAVIGATE
    span(@click='goPrev'): img.back(src='../theme/material/back_btn.png')
    router-link(:to='`/baan/${nextHouseUrl}`'): img.back(src='../theme/material/next_btn.png')

  absolute-background(bot)
</template>

<script>
  import AbsoluteBackground from '@/components/AbsoluteBackground.vue'
  import HousePinterest from '@/components/PinterestOnHouse.vue'
  import VueSticky from 'vue-sticky'
  import lodash from 'lodash'
  import axios from 'axios'
  export default {
    components: {AbsoluteBackground, HousePinterest},
    data() {
      return {
        name: this.$route.params.name,
        data: {},
        localStorage: localStorage,
        stickyConfig: {
          zIndex: 80,
          stickyTop: 50,
          postition:"absolute",
          disabled: false
        },
        houses: [],
        nextHouseUrl: null,
      }
    },
    directives: {
      'sticky': VueSticky,
    },
    created(){
      this.name = this.$route.params.name
      let all_data = require('@/others/house_data.json').data
      this.nextHouseUrl = _.shuffle(_.without(_.map(all_data, "nameURL"), this.name))[0]
      let raw_data = _.keyBy(all_data, "nameURL")[this.name]
      if (raw_data) {
        this.data = raw_data
      } else {
        this.$router.push('/house')
      }
      this.set_fav(this.get_fav())
    },
    methods:{
      get_fav(){
        return JSON.parse(localStorage.getItem('fav_house')) || []
      },
      set_fav(ar){
        localStorage.setItem('fav_house', JSON.stringify(ar))
        this.houses = _.map(ar, "url")
      },
      setFavoriteHouse(idx){
        let favHouseList = this.get_fav()
        let indexOfcurrentBaan = _.map(favHouseList, "url").indexOf(this.name)
        if (indexOfcurrentBaan != -1){ // remove exist
          const oldHouseAtoldIndex = favHouseList[idx-1]
          favHouseList[indexOfcurrentBaan] = oldHouseAtoldIndex
        }
        let {nameTH, nameEN} = this.data
        favHouseList[idx-1] = {"url": this.name, "nme": `${nameTH} - ${nameEN}`}
        this.set_fav(favHouseList)
      },
      goNext(){
        this.$router.push(`/baan/${this.nextHouseUrl}`)
      },
      goPrev(){
        this.$router.go(-1)
      }
    }
  }
</script>

<style lang='stylus' scoped>
  .section
    max-width 770px
  .tab
    margin-top: 2em

  .social-btn
    padding 1em
    margin 2em .7em
    min-width 50px
    max-width 100px
    filter: invert(100%)
    @media screen and (min-width: 800px)
      margin 2em 1.2em

  .back
    margin 1em
    margin-top 5em
    width: calc(100px + 7vmin)

</style>
