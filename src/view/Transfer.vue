<template lang='pug'>
div(v-if='state==2')
  <div v-sticky="stickyConfig">
    <div>
      div.flex.container()
        div
          h2 {{this.person.fullname}}
          h3 Old : {{this.person.house}}
          h3 Current : {{this.person.currHouse}}
        vue-countdown(:time="(new Date(person.expireTime) - new Date())" @countdownend="timeup")
          template(slot-scope="props")
            h2 {{ props.hours }}:{{ props.minutes }}:{{ props.seconds }}
        button.button.is-warning(@click='submit') Confirm
    </div>
  </div>
  TransferHousePreview(style="margin-top:0px;" :forTransfer='"true"')
    template(slot='before' slot-scope='baan')
      <div class="baan-overlay" @click="moveMan" :id="baan.nameURL">
        div.overlay(:stat='stat(baan)')
        div.banner( :stat='stat(baan)')
        div.inform
            div.houseCard(:class="{currentHouse:person.currHouse==baan.nameURL}")
              p {{baan.nameTH}}
            div(style='padding: 5px')
              b-progress.mb-3(v-if='houses[baan.nameURL] && houses[baan.nameURL].avail > 0' :max="houses[baan.nameURL]?houses[baan.nameURL].avail:100" animated style="max-width: 100%")
                b-progress-bar(:value="baanStatus(baan)" variant="warning")
                  // p {{baan}}
                  p.numDispBlack(align='center' style='margin-left: 5px')
                    | {{houses[baan.nameURL].used}}/{{houses[baan.nameURL].avail}}
                  //  {{ baanStatus(baan) }} / {{ houses }}
              b-progress.mb-3(v-if='houses[baan.nameURL] && houses[baan.nameURL].avail == 0' :max="1" animated style="max-width:100%")
                b-progress-bar(:value="1" variant="danger")
                  p.numDisp FULL
        div(v-if='person.currHouse==baan.nameURL')
          h2 &#9989;
      </div>
  div.page-footer
    label ฝ่าย IT องค์การบริหารสโมสรนิสิตจุฬาลงกรณ์มหาวิทยาลัย
    br
    label Powered by 44<sup>th</sup> Computer Engineering Student, Chulalongkorn University
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
          p NATIONAL ID
          input.input(v-model='form.usr')
        div.field
          p REGISTERED PHONE NUMBER
          input.input(v-model='form.pwd' type="password" v-mask="'###-###-####'" :masked="false" pattern='[0-9]{10}' title="10 digit tel number")
      div.btn-wrapper.field
        div(v-if='!isLoggingIn')
          img.login-btn(@click='try_login' src='../theme/material/submit_btn.png')
        div(v-else)
          br
          formstatus(loading)
  div(v-else-if='state==3')
    div.header ระบบย้ายบ้าน
    div#wrapper
      // HEADER
      div#head
        div.is-block
          h1.is-size-3.bold การย้ายบ้านสำเร็จ!
          h1.is-size-4.bold.orange <br />{{this.person.fullname}}
          h1.is-size-4.bold.grey <br />"{{this.person.house}}"
          h1.is-size-5 <br />ไปยัง
          h2.is-size-4.bold.green <br />"{{this.person.currHouse}}"<br />
          p <br /><br />โปรด Save รูปหน้าจอขณะนี้ไว้เพื่อเป็นหลักฐานในการย้ายบ้าน<br /><br />
  div.page-footer
    label ฝ่าย IT องค์การบริหารสโมสรนิสิตจุฬาลงกรณ์มหาวิทยาลัย
    br
    label Powered by 44<sup>th</sup> Computer Engineering Student, Chulalongkorn University
</template>

<script>
import Vue from 'vue'
import VueSticky from 'vue-sticky'
import {mask} from 'vue-the-mask'
import bProgress from 'bootstrap-vue/es/components/progress/progress';
import bProgressBar from 'bootstrap-vue/es/components/progress/progress-bar';
import VueCountdown from '@xkeshi/vue-countdown';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import {login, getPersonInfo, movePerson, confirmHouse} from '../firebase_api.js'
import {firebaseDB} from '../main.js'
import Formstatus from '../components/Formstatus'
import TransferHousePreview from '../components/TransferHousePreview.vue'
import TransferCondition from '../components/TransferCondition.vue'

var localStorage = require('localStorage')
export default {
  components: {Formstatus, TransferHousePreview, TransferCondition, bProgress, bProgressBar, VueCountdown},
  directives: {mask, 'sticky': VueSticky},
  data() {
    return {
      dummyLimit:{},
      state: 0,
      form: {
        usr: '',
        pwd: ''
      },
      person: {
        house: '',
        username: '',
        token: '',
        currHouse:''
      },
      isLoggingIn: false,
      houses: {},
      stickyConfig: {
        zIndex: 80,
        stickyTop: 10,
        disabled: false
      },
      isTransfer: false
    }
  },
  created(){
    let token = localStorage.getItem("token")
    let user = localStorage.getItem("username")
    if (token && user) {
      this.form.usr = user
      this.try_login()
    }
  },
  methods: {
    timeup(){
      this.deleteAllCookies()
      this.state=3
    },
    increase_state(){
      this.state += 1
    },
    async try_login(){
      this.isLoggingIn = true
      // // get permission token
      let info = await login(this.form.usr, this.form.pwd)
      if (!info.token) {
		    alert("Login failed, try again.")
        console.log("[fail] unable get token")
        this.isLoggingIn = false
		    this.state = 1
        return
      }
      // let info  = await getPersonInfo(this.form.usr, token)
      // if (!info) {
      //   console.log("[fail] unable to fetch data")
      //   this.deleteAllCookies()
      //   this.isLogin = false
		  //   this.isLoggingIn = false
		  //   this.state = 0
      //   return
      // }
      this.person = {
        "token": info.token,
        "house": info["oldHouse"], // name TH,
        "currHouse": info["currentHouse"],
        "fullname": info["fullname"],
        "expireTime": info["expireTime"],
        "username": this.form.usr
      }
      console.log('[success] login')

      // firebase listener
      let rf = firebaseDB.database().ref('/houses')
      this.houses = (await rf.once('value')).val()
      console.log(this.house)
      for (let nameURL in this.houses) {
        rf.child(nameURL).on('value', (snapshot) => {
          this.$set(this.houses, nameURL, snapshot.val())
          console.log(`[update] ${nameURL} ${snapshot.val().count}/${snapshot.val().cap}`)
        })
      }
      this.isLogin = true
      this.isLoggingIn = false
	    this.state = 2
    },
    stat(h) {
      if (!h || !h.nameTH || !this.houses[h.nameTH]) return ""
      if (h.nameTH == this.person.house) return "curr"
      let {cap, count} = this.houses[h.nameTH]
      if (cap >  count) return "avail"
      if (cap == count) return "full"
    },
    deleteAllCookies() {
      localStorage.clear();
    },
    async submit(){
      let res = await confirmHouse(this.person.username, this.person.token)
      if(res.success){
        this.state = 3
        this.deleteAllCookies()
      }else if(/wait until last operation/.test(res.message)){
        alert("อย่ากดรัวสิจ๊ะน้อง ใจเย็นๆนะ เยิฟๆ")
      }else{
        alert("การ Confirm ไม่สำเร็จ กรุณาลองใหม่หลัง Login ใหม่")
        this.deleteAllCookies()
        this.state = 1
        return
      }
    },
    baanStatus(baan){
      return this.houses[baan.nameURL]?this.houses[baan.nameURL].used:100
    },
    async moveMan(event){
      let newHouse = event.currentTarget.id
      localStorage.setItem('currentHouse', newHouse);
      if(newHouse === this.person.currHouse)
        return
      if(this.isTransfer)
        return
      this.isTransfer=true
      let result = await movePerson(this.person.username, this.person.token, newHouse)
      if(result.success)
	    this.person.currHouse=newHouse
      else if(result.message === "Full House")
        alert("บ้านที่เลือกเต็มแล้ว โปรดลองใหม่ภายหลัง")
      else if(/wait until last operation/.test(result.message))
        alert("อย่ากดรัวสิจ๊ะน้อง ใจเย็นๆนะ เยิฟๆ")
      else{
        alert("Session หมดอายุ หรือคุณได้ทำการยืนยันการย้ายบ้านไปแล้ว")
        this.deleteAllCookies()
        this.state = 1
      }
      this.isTransfer=false
    }
  }
}
</script>

<style lang='stylus' scoped>
  .orange
    color: orange
  .grey
    color: grey
  .green
    color: lime
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
    width:  22vw;
    height: 22vw;
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
      width:  20vw;
      height: 20vw;
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
      opacity 1.0
      width calc(100% - 1vw)
      margin 7px 0px
      font-size calc(.7em + 1vmax)
      color white
      text-align left
      position relative
    .numDisp
      font-weight 700
    .numDispBlack
      font-weight 700
      color black
      text-align:center
    .houseCard
      font-weight 700
      font-size 0.7em
      background-color black
      text-align center
      margin-bottom 10px
  #wrapper
    color: white
    overflow wrap
    max-width 500px
    margin 2em auto
    margin-bottom 5em
    padding 1em 2em
    background-color #101020
    border-radius 25px 0 25px 0
    border-color #f00
    border-top-width 50px


  #head
    text-align center
    margin-top 10px

    .title
      font-size: calc(1.3rem + 50%);
    .flag-grp
      display inline-block
      margin 5px
      .flag
        height 30px
        width  55px
        margin 0 0 0 4px
        background-size 100% 100%
        background-repeat no-repeat;
        border-radius 5px
        text-align center
        display inline-block
        &.th
          background-image: url("../theme/material/TH-LANG.png")
        &.en
          background-image: url("../theme/material/EN-LANG.png")

        img.chk
          height 30px
          width  30px
          margin 0
          padding 0
  .currentHouse
    text-shadow: 1px 1px 4px #53f800;
    color: #44c404;
  .page-footer
    position: relative;
    left: 0;
    bottom: 0;
    width: 100%;
    margin-top:50px;
    margin-left:5px;
    text-align: left;
</style>
