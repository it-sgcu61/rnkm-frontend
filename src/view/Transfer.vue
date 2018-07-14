<template lang='pug'>
div.section
  div.header ระบบย้ายบ้าน

  // LOGIN
  div(v-if='!isLogin')
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
    HousePreview
      template(slot='before' slot-scope='baan')
        div.baan-overlay
          div.overlay(:stat='stat(baan)')
          div.banner( :stat='stat(baan)')
          div.inform
            a(:href='`/#/house/${baan.nameURL}`' target="_blank")
              i.fas.fa-info-circle
</template>

<script>
import {mask} from 'vue-the-mask'
import {login, getPersonInfo, movePerson, confirmHouse} from '../firebase_api.js'
import {firebaseDB} from '../main.js'
import Formstatus from '../components/Formstatus'
import HousePreview from '../components/HousePreview.vue'
export default {
  directives: {mask},
  components: {Formstatus, HousePreview},
  data() {
    return {
      form: {
        usr: '',
        pwd: ''
      },
      person: {
        house: '',
        username: '',
        token: ''
      },
      isLogin: false,
      isProcess: false,
      houses: {}
    }
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
      // testing without connection
      //
      // this.deleteAllCookies()
      // // get permission token
      // let token = await login(this.form.usr, this.form.pwd)
      // if (!token) {
      //   console.log("[fail] unable get token")
      //   this.isProcess = false
      //   return
      // }
      // let info  = await getPersonInfo(this.form.usr, token)
      // if (!info) {
      //   console.log("[fail] unable to fetch data")
      //   document.cookie = 'token=;username=;path=/;'
      //   this.isLogin = true
      //   return
      // }
      // this.person = {
      //   "token": token,
      //   "house": info.house.split(' ')[0], // name TH
      //   "username": this.form.usr
      // }
      // console.log('[success] login')

      // firebase listener
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


  .baan-overlay
    position absolute;
    overflow hidden
    width:  300px;
    height: 300px;
    z-index: 30
    .overlay
    .banner
      top: 0;
      left: 0;
      position: absolute;
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
    .overlay
      opacity .6
      width: 30vw;
      height: 30vw;
    .banner
      opacity .9
      width: calc(80px + 3vw);
      height: calc(80px + 3vw);
      transform-origin center center
      transform translate(calc(-40px - 1.5vw), calc(-40px - 1.5vw)) rotate(45deg)
    .inform
      opacity .5
      max-width 100px
      margin 7px 10px
      font-size calc(.7em + 1vmax)
      color white
      text-align left
      position relative
</style>
