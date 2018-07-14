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

    img.back(@click='$router.push("/house")' src='../theme/material/back_btn.png')

    // div(v-if='data.instagramURL')
    //   vue-instagram(:token="ig_token" :count="5" mediaType="image")
    //     template(slot="feeds" slot-scope="props")
    //       li.fancy-list {{ props.feed.link }}
    //     template(slot="error" slot-scope="props")
    //       div.fancy-alert {{ props.error.error_message }}

  absolute-background(bot)
</template>

<script>
  import AbsoluteBackground from '@/components/AbsoluteBackground.vue'
  import HousePinterest from '@/components/PinterestOnHouse.vue'
  import VueInstagram from 'vue-instagram'
  import VueSticky from 'vue-sticky'
  import lodash from 'lodash'
  import axios from 'axios'
  export default {
    components: {AbsoluteBackground, HousePinterest, VueInstagram},
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
        ig_img: []
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

      // let cook = document.cookie
      // console.log(cook)
      // let url = this.data.instagramURL + "?__a=1"
      axios.get("https://www.instagram.com/baan_sod/")
        .then(res => {console.log(res)})
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
