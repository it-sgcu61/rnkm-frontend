<template lang='pug'>
div.tcenter
  div(v-sticky="stickyConfig")
    house-pinterest.abs(@click="setFavoriteHouse" :houses="houses")

  absolute-background(top :src='require(`@/theme/house/${data.nameURL}.png`)' :alt='data.nameTH')

  div.section.tcenter.mcenter
    h1.is-size-1.bold {{data.nameTH}} - {{data.nameEN}}
    br
    h1.is-size-3.italic "{{data.slogan}}"
    br
    br
    p.is-size-4 {{data.description}}

    div
      template(v-for='atr in ["lineURL", "facebookURL", "instagramURL", "twitterURL"]')
        a(v-if='data[atr]' :href='data[atr]' :alt='atr' target="_blank" rel="noopener noreferrer")
          img.social-btn(:src="require(`../theme/material/${atr}.svg`)")

    img.back(@click='$router.push("/baan")' src='../theme/material/back_btn.png')

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
      }
    },
    directives: {
      'sticky': VueSticky,
    },
    created(){
      this.name = this.$route.params.name
      let raw_data = _.keyBy(require('@/others/house_data.json').data, "nameURL")[this.name]
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
        console.log('click')
        let favHouseList = this.get_fav()
        let indexOfcurrentBaan = _.map(favHouseList, "url").indexOf(this.name)
        if (indexOfcurrentBaan != -1){ // remove exist
          const oldHouseAtoldIndex = favHouseList[idx-1]
          favHouseList[indexOfcurrentBaan] = oldHouseAtoldIndex
        }
        let {nameTH, nameEN} = this.data
        favHouseList[idx-1] = {"url": this.name, "nme": `${nameTH} - ${nameEN}`}
        this.set_fav(favHouseList)
      }
    },
    computed: {

    }
  }
</script>

<style lang='stylus' scoped>
  .section
    max-width 800px

  .social-btn
    padding 1em
    margin 4em 1em
    min-width 50px
    max-width 100px
    filter: invert(100%)

  .back
    margin-top 5em
    width: calc(100px + 7vmin)

</style>
