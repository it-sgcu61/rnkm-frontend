<template lang='pug'>
div(v-if='state==2')
  div(v-sticky="stickyConfig")
    div.flex.container()
      div
        h2 {{"11xxxxxxxxxx"}}
        h3 Old : Baan buchayan
        h3 Current : Baan por meung si
      h2 Time left : {{"20:00:00"}}
      button.button.is-warning(@click='submit') Confirm
  TransferHousePreview(style="margin-top:0px;" :forTransfer='"true"')
    template(slot='before' slot-scope='baan')
      div.baan-overlay
        div.overlay(:stat='stat(baan)')
        div.banner( :stat='stat(baan)')
        div.inform
          <b-progress class="mb-3" :max="100" show-progress animated style="max-width:100%;">
            <b-progress-bar :value="baanStatus(baan)" :variant="dummyLimit[baan] < 50?'success':dummyLimit[baan] < 75?'warning':'danger'"></b-progress-bar>
          </b-progress>
div.section(v-else)
  div(v-if='state==0')
    div.header ระบบย้ายบ้าน
    transfer-condition(@accept-condition='increase_state')
  // LOGIN
  div(v-else-if='state==1')
    div.header ระบบย้ายบ้าน
    form.container.has-text-centered
      div.input-wrapper
        div.field
          input.input(v-model='form.usr' type='tel' placeholder='NATIONAL ID')
        div.field
          input.input(v-model='form.pwd' type="password" v-mask="'###-###-####'" :masked="false" placeholder='PHONE NUMBER' pattern='[0-9]{10}' title="10 digit tel number")
      div.btn-wrapper.field
        div(v-if='!isLoggingIn')
          img.login-btn(@click='try_login' src='../theme/material/submit_btn.png')
        div(v-else)
          br
          formstatus(loading)
</template>

<script>
import {mask} from 'vue-the-mask'
import {login, getPersonInfo, movePerson, confirmHouse} from '../firebase_api.js'
import {firebaseDB} from '../main.js'
import Formstatus from '../components/Formstatus'
import TransferHousePreview from '../components/TransferHousePreview.vue'
import TransferCondition from '../components/TransferCondition.vue'
import VueSticky from 'vue-sticky'
import bProgress from 'bootstrap-vue/es/components/progress/progress';
import bProgressBar from 'bootstrap-vue/es/components/progress/progress-bar';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
export default {
  directives: {mask},
  components: {Formstatus, TransferHousePreview, TransferCondition, bProgress, bProgressBar},
  data() {
    return {
      dummyLimit:{},
      counter: 45,
      max: 100,
      state:2,
      form: {
        usr: '',
        pwd: ''
      },
      person: {
        house: '',
        username: '',
        token: ''
      },
      isLoggingIn: false,
      houses: {},
      stickyConfig: {
        zIndex: 80,
        postition:"absolute",
        disabled: false
      },
    }
  },
  directives: {
    'sticky': VueSticky,
  },
  methods: {
    async move_to(next) {
      console.log('move to')
      console.log(next)
      return
      if (this.stat(next) != "avail") return
      this.isLoggingIn = true
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
      this.isLoggingIn = false
    },
    increase_state(){
      this.state += 1
    },
    async try_login(){
      this.isLoggingIn = true
      // testing without connection
      //
      // this.deleteAllCookies()
      // // get permission token
      // let token = await login(this.form.usr, this.form.pwd)
      // if (!token) {
      //   console.log("[fail] unable get token")
      //   this.isLoggingIn = false
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
      this.isLoggingIn = false
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
      this.isLoggingIn = true
      await confirmHouse(this.person.username, this.person.token)
      alert('submit is successfull')
      this.isLogin = false
      this.isLoggingIn = false
    },
    baanStatus(baan){
      this.dummyLimit[baan] = Math.random()*100
      return this.dummyLimit[baan]
    }
  }
}
</script>

<style lang='stylus' scoped>
  .flex
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-around;
    align-items: center;
    background-color: rgba(20, 20, 20, .3);
    padding: .7em 2em;

  div.k_nav
    position: relative;
    cursor pointer
    color: white;
    font-family: ZingRust;
    line-height: .5em;
    display: inline-block;
    text-align: center;
    vertical-align: middle;
    text-shadow: 5px 5px 15px #2228;
    &[disable]
      color: gray
      cursor not-allowed

    @media screen and (min-width: 0px)
      font-size: 1em;
      margin: .0em 1em;
    @media screen and (min-width: 600px)
      font-size: 1.25em;
      margin: .2em 1.5em;
    @media screen and (min-width: 1000px)
      font-size: 1.5em;
      margin: .5em 2em;

  $red    = rgb(182, 0, 61)
  $green  = rgb(0, 161, 40)
  $yellow = rgb(215, 218, 49)
  ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: white;
    opacity: 1; /* Firefox */
  }
  .input{
    width: 500px;
    line-height: 20px;
    margin-left: 5px;
    padding: 25px 15px 25px 15px;
    border: 0 solid white;
    border-width: 0 0 0 0;
    border-radius: 0 10px 0 0;
    background: #333e;
    text-align: center;
    font-size: 1em
    font-weight: bold
    font-family SuperSpace
    outline: none;
    outline-style: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    -webkit-box-shadow: none;
    box-shadow: none;
    color: #ff7999;
    &:hover {
      outline: none;
      border-color: #ef4a6b;
    }
  }
  .section
    background-color: #020202;
    padding: 7rem 1rem;
    @media screen and (min-width: 1000px)
      padding: 11rem 3rem;

  .btn-wrapper
  .input-wrapper
    margin 7vmin auto

  .login-btn
    max-width 125px

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
    font-size calc(5px + 2vw)
  h3
    font-size calc(5px + 1vw)


  .baan-overlay
    position absolute;
    overflow hidden
    width:  19vw;
    height: 19vw;
    @media screen and (min-width: 600px)
      width:  17vw;
      height: 17vw;
    @media screen and (min-width: 1000px)
      width: 15vw
      height: 15vw
    z-index: 30
    .overlay
    .banner
      top: 0;
      left: 0;
      position: absolute;
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
      width:  19vw;
      height: 19vw;
      @media screen and (min-width: 600px)
        width:  17vw;
        height: 17vw;
      @media screen and (min-width: 1000px)
        width: 15vw
        height: 15vw
    .banner
      opacity .9
      width: calc(80px + 3vw);
      height: calc(80px + 3vw);
      transform-origin center center
      transform translate(calc(-40px - 1.5vw), calc(-40px - 1.5vw)) rotate(45deg)
    .inform
      opacity .5
      max-width 100px
      margin 7px 0px
      font-size calc(.7em + 1vmax)
      color white
      text-align left
      position relative
</style>
