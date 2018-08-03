<template lang='pug'>
div
    absolute-background(top :src='require("../theme/heading/Annoucment_text.png")' :src2='require("../theme/heading/Annoucment_frame.png")')
    section.section
      div.container: div.field: h1 Announce

      // NOT FOUND
      div#result-wrapper.section(v-if='result.show == "ready"')
        div.section
          div.logo-wrap(v-if='result.baan != "notFound"'): img.logo(@click='result.url' :src='result.img')
          div.logo-wrap(v-else)
            h1.is-size-1.fzing Not Found User Information
            h2.is-size-2.fzing please contact to facebook page
        div.section: div.logo-wrap
            img.back(@click='result.show = "query"' src='../theme/material/back_btn.png')

      // FOUND
      div.section(v-if='result.show == "found"')
          div.logo-wrap: img.logo(@click='result.url' :src='result.img')

      // LOADING
      div.scale-x2(v-else-if='result.show == "loading"' align="middle")
        rotate-square5

      // EDITING
      div#edit.mcenter(v-if='result.show == "edit"')
        edit-info(:userData='editableData')

      // SHOWING INFO
      div#edit.mcenter(v-if='result.show == "show"')
        div(align='center')
          tr(v-for='(itm, key) in editableData')
            td.is-size-5: div(align='left') {{translate[key] || key}}
            td.is-size-5: div(align='left') {{itm}}
          br
        div(align='center')
          img.back(@click='result.show = "query"' src='../theme/material/back_btn.png')

      // LOGIN
      form.container(v-else)
        div.field.cu
          button.button.is-info.is-size.is-size-4(
            style='margin: 0px auto 30px auto;font-family: Superspace;'
            @click='$router.push("/dorm")'
          ) รายละเอียดหอพักนิสิต ช่วงงานกิจกรรม
        div.field
          div: span(style='color: white') personal ID
          div: input.input(v-model='login.usr' type='tel')
        div.field
          div: span(style='color: white') phone number
          div: input.input(v-model='login.pwd' type="password" v-mask="'###-###-####'" :masked="false" pattern='[0-9]{10}' title="10 digit tel number")
        // div(class="g-recaptcha" v-model='login.captchaToken' data-sitekey="6LdTQ2YUAAAAAEx2IaRDB9TYcR52jry0Zgr52h5O" style="width:300px; margin: 0 auto;")
        div.field: img#submit(@click='submit' src='../theme/material/submit_btn.png')
    absolute-background(bot)
</template>

<script>
  import AbsoluteBackground from '@/components/AbsoluteBackground.vue'
  import EditInfo from '@/components/EditInfo.vue'


  import {mask} from 'vue-the-mask'
  import {RotateSquare5} from 'vue-loading-spinner'
  import {announcement} from '../middle-api'
  import {getInfo} from '../rnkm-wan-jeeng.js'
  // import {getAllowEditPersonalForm} from '../announce_api.js'


  export default {
    components: {AbsoluteBackground, RotateSquare5, EditInfo},
    directives: {mask},
    data() {
      return {
        login: {
          usr: '',
          pwd: '',
          captchaToken: '',
        },
        result: {
          show: "query",
          img: '',
          url: '',
          baan: ''
        },
        editableData: {},
        currentForm: {},
        translate: {
          oldHouse: 'บ้านเดิม',
          newHouse: 'บ้านใหม่',
          fullname: 'ชื่อ-สกุล',
          id: 'เลขปชช',
          tel: 'เบอร์โทร',
          isTransferred: 'ย้ายบ้าน'
        }
      }
    },
    methods: {
      async submit () {
        if (!this.login.usr || !this.login.pwd){
          alert('please fill input')
          return
        }
        // console.log(this.captchaToken)
        this.result.show = "loading"
        // EDIT DATA
        // var userdata = await getAllowEditPersonalForm(this.login.usr, this.login.pwd)
        try {
          var userdata = await getInfo(this.login.usr, this.login.pwd)
        } catch(err) {
          alert('something is wrong')
          this.result.show = "query"
          return
        }
        if(userdata.result == "notFound"){
          alert("ไม่พบข้อมูล กรุณาตรวจสอบข้อมูลที่คุณกรอกอีกครั้ง หากแน่ใจว่าได้ทำการลงทะเบียนไปแล้ว กรุณาติดต่อเพจ CU for Freshmen")
          this.result.show = "query"
        }else if(userdata.result == "IncorrectTel"){
          alert("พบข้อมูลการลงทะเบียน แต่ไม่สามารถเข้าสู่ระบบได้ กรุณาตรวจสอบหมายเลขโทรศัพท์ของคุณ หากมีข้อสงสัยเพิ่มเติม กรุณาติดต่อเพจ CU for Freshmen")
          this.result.show = "query"
        }else{
          this.editableData = userdata
          // this.result.show = "edit"
          this.result.show = "show"
        }
        return

        // NORMAL ANNOUNCE !!! (remove by krist 16 jul 2018)
        // var baanResult = await announcement(this.login.usr, this.login.pwd)
        // this.result.baan = baanResult
        // this.result.img = require(`../theme/house/${baanResult}.png`)
        // this.result.url = () => this.$router.push(`/house/${baanResult}`)
        // this.result.show = "ready"

      }
    },
    watch: {
      login: {
        deep: true,
        handler() {
          this.result.show = "query"
        }
      }
    }
  }
</script>

<style lang='stylus' scoped>
  .scale-x2
    transform: scale(2)
  .section
    background-color: transparentify
    @media screen and (max-width: 500px)
      padding 0

  h1
    font-size: 3em
    font-family: ZingRust
    margin .5em auto

  .big-logo
    position: relative;
    padding: 10px;
    min-width: 280px;
    max-width: 90vw;
    max-height: 70vh;
    filter: drop-shadow(20px 10px 12px #222f)
    @media screen and (orientation: landscape)
      margin-top: calc(-70px + 20vh - 1vw)
    @media screen and (orientation: portrait)
      margin-top: calc(-120px + 37vh - 5vw)

  .field
    text-align center

  .input
    background-color #eee
    color white
    text-align center
    font-size calc(9px + 1vmin + 1vw)
    font-family ZingRust
    font-weight regular
    font-style normal
    letter-spacing: .07em
    padding 0
    width 300px
    background-color #333e
    border none
    @media screen and (min-width: 600px)
      width 500px
    @media screen and (min-width: 1025px)
      width 600px

  ::placeholder
    color: #ffaaff
  ::-webkit-input-placeholder { /* Chrome/Opera/Safari */
    color: #ffaaff
  }
  ::-moz-placeholder { /* Firefox 19+ */
    color: #ffaaff
  }
  :-ms-input-placeholder { /* IE 10+ */
    color: #ffaaff
  }
  :-moz-placeholder { /* Firefox 18- */
    color: #ffaaff
  }

  #submit
    margin-top 10vmin
    max-width 180px
    cursor pointer

  #result-wrapper
    transform all 1s
    .logo-wrap
      text-align center
      transition opacity 1s ease
      .logo
        width calc(300px + 7vmin)
        background-color white
        border-radius 15px
  .back
    margin-top 0
    cursor pointer
  td
    padding 10px
</style>
