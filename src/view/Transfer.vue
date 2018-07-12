<template lang='pug'>
div.section

  div.header ระบบย้ายบ้าน

  // LOGIN
  div(v-if='!isLogin') 101 - 205
    form.container.has-text-centered
      div.input-wrapper
        div.field
          input.input(v-model='form.usr' type="tel" v-mask="'###-###-####'" :masked="false" placeholder='phone number' pattern='[0-9]{10}' title="10 digit tel number")
        div.field
          input.input(v-model='form.pwd' type='password' placeholder='personal ID')
      div.btn-wrapper.field
        div(v-if='!isProcess')
          img.login-btn(@click='try_login' src='../theme/material/submit_btn.png')
        div(v-else)
          br
          formstatus(loading)

  // TRANSAFER
  div(v-else)
    div.has-text-centered
      h2 user : {{person.username}}
      h2 baan : {{person.house}}
      button.button.is-warning(@click='submit') submit
    div(v-for='grp in ["S", "M", "L", "XL"]' :key='grp.id')
      div.container._flex._flex-center
        img.size_btn(:src='require(`@/theme/material/size_${grp}.png`)')
        h2 {{siz_desc[grp]}}
      div._flex(:n-item='siz_list[grp].length')
        div._flex-item(v-for='obj in siz_list[grp]' :key='obj.id')
          div.img_square(@click='move_to(obj)')
            div.layer(:stat='stat(obj)')
            img.baan_btn(:src="require(`@/theme/house/${obj.nameURL}.jpg`)" :alt='obj.nameTH')
            div.layer-band(:stat='stat(obj)')
            div(v-show='isProcess')
              formstatus(loading)
</template>

<script>
import {mask} from 'vue-the-mask'
import {login, getPersonInfo, movePerson, confirmHouse} from '../firebase_api.js'
import {firebaseDB} from '../main.js'
import Formstatus from '../components/Formstatus'
export default {
  directives: {mask},
  components: {Formstatus},
  props: {
    shuffle: {
      default: false
  }},
  data() {
    return {
      form: {
        usr: '089-123-4',
        pwd: '1200100123'
      },
      person: {
        house: '',
        username: '',
        token: ''
      },
      isLogin: false,
      isProcess: false,
      rnd_list: [],
      siz_list: {},
      url_desc: {},
      siz_desc: {
        "S": "บ้านขนาดเล็ก\nมีจำนวนคนประมาณ 160 คน",
        "M": "บ้านขนาดกลาง\nมีจำนวนคนประมาณ 220 คน",
        "L": "บ้านขนาดใหญ่\nมีจำนวนคนประมาณ 350 คน",
        "XL": "บ้านขนาดใหญ่มาก\nมีจำนวนคนประมาณ 400 คน"
      },
      houses: {}
    }
  },
  created(){
    let raw_data = require('@/others/house_data.json').data
    if (this.shuffle) {
      raw_data = _.shuffle(raw_data)
    }
    this.url_desc = _.keyBy(raw_data, o => `${o.nameTH} - ${o.nameEN}`)
    this.siz_list = _.groupBy(raw_data, "size")
  },
  methods: {
    async move_to(next) {
      if (this.stat(next) != "avail") return
      this.isProcess = true
      let {nameTH, nameEN,} = next
      let {username, token,} = this.person
      console.log('[exec] move to ' + next.nameTH)
      let res = await movePerson(username, token, `${nameTH} - ${nameEN}`)
      if (res.data.success) {
        console.log('[success] move to ' + next.nameTH)
        this.person.house = next.nameTH
      }else{
        console.log('[fail] move to ' + next.nameTH)
      }
      this.isProcess = false
    },
    async try_login(){
      this.isProcess = true
      this.deleteAllCookies()
      // get permission token
      let token = await login(this.form.usr, this.form.pwd)
      if (!token) {
        console.log("[fail] unable get token")
        this.isProcess = false
        return
      }
      let info  = await getPersonInfo(this.form.usr, token)
      if (!info) {
        console.log("[fail] unable to fetch data")
        document.cookie = 'token=;username=;path=/;'
        this.isLogin = true
        return
      }
      this.person = {
        "token": token,
        "house": info.house.split(' ')[0], // name TH
        "username": this.form.usr
      }
      console.log('[success] login')

      // read firebase data
      let rf = firebaseDB.database().ref('/houses')
      this.house = (await rf.once('value')).val()
      for (let nameTH in this.house) {
        rf.child(nameTH).on('value', (snapshot) => {
          this.$set(this.houses, nameTH, snapshot.val())
          console.log(`[update] ${nameTH} ${snapshot.val().count}/${snapshot.val().cap}`)
        })
      }
      this.isLogin = true
      this.isProcess = false
    },
    stat(h) {
      if (!h || !h.nameTH || !this.houses[h.nameTH]) return ""
      if (h.nameTH == this.person.house) return "curr"
      let {cap, count} = this.houses[h.nameTH]
      if (cap >  count) return "avail"
      if (cap == count) return "full"
    },
    deleteAllCookies() {
      console.log('[exec] remove old cookie')
      var cookies = document.cookie.split(";");
      for (var i = 0; i < cookies.length; i++) {
          var cookie = cookies[i];
          var eqPos = cookie.indexOf("=");
          var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
          document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
      }
    },
    async submit(){
      this.isProcess = true
      await confirmHouse(this.person.username, this.person.token)
      alert('submit is successfull')
      this.isLogin = false
      this.isProcess = false
    }
  }
}
</script>

<style lang='stylus' scoped>

  $red    = rgb(182, 0, 61)
  $green  = rgb(0, 161, 40)
  $yellow = rgb(215, 218, 49)

  .input
    text-align center
    max-width 300px
  .section
    background-color: #020202;
    padding: 7rem 1rem;
    @media screen and (min-width: 1000px)
      padding: 11rem 3rem;

  .btn-wrapper
  .input-wrapper
    margin 7vmin auto

  .login-btn
    max-width 200px

  .login-btn,
  .baan-btn
    cursor pointer

  .header
    font-size 3rem
    color white
    text-align center
    &.en
      font-family ZingRust

  h1, h2, h3, p, span, div
    font-family Superspace
    white-space: pre-line

  h2
    font-size calc(13px + 2vw)

  ._flex
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    margin calc(5vmin + 40px) auto 3vmin auto

    @media screen and (min-width: 600px)
      &[n-item="5"]
        padding-left: 12vw;
        padding-right: 12vw;

    &._flex-center
      align-items: center
      justify-content: center;
      padding 190px auto 20px auto
      margin-top 15vmin

    ._flax-item
      flex-basis: 26%;



  .size_btn
    display block
    width calc(12vw + 70px)
    height calc(12vw + 70px)
    @media screen and (min-width: 1000px)
      width 180px
      height 180px
      display block

  .img_square
    width: 29vw;
    height: 29vw;
    overflow: hidden;
    background-color white
    position: relative;
    margin 2px
    border-radius 7px
    filter: brightness(70%);
    @media screen and (min-width: 600px)
      width: 22vw;
      height: 22vw;
    &:hover
      transition-duration 700ms
      filter: brightness(90%)

    .layer
    .layer-band
    .baan-btn
      opacity .7
      position: absolute;
      top: 0;
      left: 0;
      width: 120%;
      height: 120%;
      background-color blue
      &[stat="full"]
        background-color $red
        cursor not-allowed
      &[stat="curr"]
        background-color $yellow
        cursor not-allowed
      &[stat="avail"]
        background-color $green
        cursor pointer

    .layer-band
      opacity .9
      transform rotate(45deg) translate(-97%, 0%)

    img
      object-fit: fill
      position: relative;
      transition-duration: .2s;
      opacity: .8;

    &:hover img
      content: "";
      opacity: 1;
      transform-origin: center center 0
      transform: rotate(2deg) scale(1.2, 1.2);
      transition-duration: .6s;
</style>
