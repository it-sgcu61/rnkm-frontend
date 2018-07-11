<template lang='pug'>
  div(v-if='!formReady' style="margin:0px 50%;")
    rotate-square5
  div.bg(v-else-if='registration_state == "ok"')
    div(v-if='submissionState == "fullfilled"')
      div.container
        h1(style='font-family: ZingRust; font-size:3em;') Registration success.
        h2(style='font-family: Superspace;') Announce the result on Sat Jul 21 2018
        <p style='font-family: Superspace;font-size:1.2em'> please like our facebook page to receive news and information.
          a(href='https://www.facebook.com/chulafreshmen/')
            img(src='@/theme/material/FB.png' style='width:40px; margin-left:20px;' align='middle')
        </p>
    div(v-else)
      // head form
      div.container
        FormTemplate(v-model='head_result' ref='head_refs' :fieldList='fieldList.head')
          template(slot='info')
            transition(name='_slide-fade' mode='out-in' duration='85')
              div
                h1(v-html='lang == "TH" ? "กรอกข้อมูลสำหรับ รับน้องก้าวใหม่" : "registration for rub nong kaow mai"')
                h2(v-html='lang == "TH" ? "สามารถลงทะเบียนได้ไม่เกิน 3 คน" : "maximum team member is 3"')

      // individual dynamic form
      transition-group(name='fade', duration='300')
        div.container(v-for='(vl, x) in dynm_result' :key='x' v-show='dynm_result[x]')
          FormTemplate(v-model='dynm_result[x]' ref='dynamic_refs' :fieldList='fieldList.dynamic' @delete='del_user(x)', :deletable='dynm_result.length > 1')
            div.has-text-centered(slot-scope="o", style='margin-bottom: 50px')
              croppa-img(ref='rfimg', :desc='o.lang == "TH" ? "เพิ่มรูปภาพ หน้าตรงเห็นชัด" : "add clear face picture"')


      // submit button
      img.btn(@click='add_dynm_result' src='../theme/material/add_member.png')
      div.section.has-text-centered
        div.is-inline(v-if='valid_user_len != 3')
        div(v-if='submissionState=="none"')
          div.is-inline(v-if='valid_user_len != 0')
            img.btn(@click='submit' src='../theme/material/submit_btn.png')
        div(v-else-if='submissionState=="pending"' style="margin:0px 50%;")
          rotate-square5
  div(v-else-if='registration_state == "beforeTime"')
    div.container
      <vue-countdown :time="timeLeft" @countdownend="ready">
        template(slot-scope="props")
          h1(style='font-family: ZingRust; font-size:3em;') Registration will start in:
          h1(style='font-family: ZingRust; font-size:5em;') {{ props.days }}:{{ props.hours }}:{{ props.minutes }}:{{ props.seconds }}
          h1(style='font-family: ZingRust; font-size:1.5em; color: #3a225c') ({{ (new Date(formState.closeOn.datetime[0])).toString() }})
      </vue-countdown>
  div(v-else-if='registration_state == "expired"')
    div.container
      h1(style='font-family: ZingRust; font-size:3em; color:#f53131a6') Registration expired.
  </div>
</template>

<script>
  import _ from 'lodash'
  import FormTemplate from '../components/FormTemplate'
  import CroppaImg from '../components/Croppa.vue'
  import VueCountdown from '@xkeshi/vue-countdown';
  import {RotateSquare5} from 'vue-loading-spinner'
  import {get_regist_form, post_regist_form} from '../dtnl_api.js'
  export default {
    props: ['lang'],
    components: {
      FormTemplate,
      CroppaImg,
      VueCountdown,
      RotateSquare5
    },
    data: function () {
      return {
        dynm_result: [],
        head_result: {},
        hidd_result: {},
        fieldList: {
          'head': [],
          'hidden': [],
          'dynamic': []
        },
        formState: {},
        formReady:false,
        timeLeft:0,
        submissionState:"none"
      }
    },
    async created() {
      const {fieldList, ...formState} = await get_regist_form(this.lang)
      this.formState = formState
      for (let i of fieldList) {
        let f = i.name.split('/')[0]
        this.fieldList[f].push(i)
      }
      for (let h of this.fieldList['hidden']) {
        if (h.name == 'hidden/groupID') {
          this.hidd_result[h.name] = this.random_str()
        } else if (h.name != "hidden/imageURL") {
          console.assert('some thing is wrong on ' + h.name + ' attribute')
        }
      }
      this.add_dynm_result()
      this.formReady = true
    },
    methods: {
      random_str(){
        return new Date().getTime().toString(36).concat(parseInt(Math.random()
          .toString().substring(2), 10).toString(36)).toUpperCase()
      },
      add_dynm_result() {
        if (this.valid_user_len < 3) {
          this.dynm_result.push(this.fieldList['dynamic'].reduce((a, b) => {
            a[b.name] = ''
            return a
          }, {}))
        }
      },
      del_user(x) {
        console.assert(this.dynm_result[x])
        this.$set(this.$refs.dynamic_refs[x], 'show', false)
        setTimeout(() =>
          {this.dynm_result = this.dynm_result.filter((value, index)=>index!=x)}, 700)
      },
      async submit() {
        if(await this.submitable()){
          this.submissionState="pending"
          return new Promise(async (resolve, reject) => {
            let ar = []
            for (let x in this.dynm_result) {
              if (!x) continue;
              let a = this.head_result
              let b = this.hidd_result
              let c = this.$refs.dynamic_refs[x]
              if (c.$children.length != 1 || c.$children[0].$children.length != 1) {
                reject('invalid number of children component')
              }
              ar.push(_.assign({
                'hidden/imageURL': await c.$children[0].$children[0].uploadImg()
              }, a, b, c.form))
            }
            console.log(ar)
            console.log('[success] image have been uploaded')
            console.log(await post_regist_form(ar))
            console.log('[success] form have been uploaded to DTNL')
            this.submissionState="fullfilled"
            resolve(ar)
          })
        }
      },
      async submitable(){
        if (!this.$refs) return false;
        let headNode = this.$refs.head_refs;
        if (!(await headNode.check_valid_all())){
          return false;
        }
        for (let x in this.$refs.dynamic_refs) {
          let dynamicNode = this.$refs.dynamic_refs[x];
          if (!dynamicNode) continue;
          if (!(await dynamicNode.check_valid_all())){
            return false;
          }
        }
        return true
      },
      ready(){
        this.formState = JSON.parse(JSON.stringify(this.formState))
      }
    },
    computed: {
      valid_user_len() {
        return this.dynm_result.filter(Boolean).length
      },
      registration_state(){
        if(this.formState.disabled){
          return "disabled"
        }else if(this.formState.closeOn.datetime != undefined) {
          if((new Date()) <= (new Date(this.formState.closeOn.datetime[0]))){
            this.timeLeft = (new Date(this.formState.closeOn.datetime[0])) - (new Date())
            return "beforeTime"
          }
          if((new Date()) >= (new Date(this.formState.closeOn.datetime[1]))){
            return "expired"
          }
        }
        return "ok"
      },
    }
  }

</script>

<style lang='stylus' scoped>
  .bg,
  .section
    background-color #020202
  h1
    font-weight: 300;
    font-size: 1.5em;
    color: #fc76a2;
    margin: 0;
    text-align: center;
    text-transform: uppercase;
  h2
    font-size: 1.3em;
    color: white;
    margin: 0 0 40px 0;
    text-align: center;

  .container
    z-index: 10;
    position: relative;
    width: 100%;
    max-width: 600px;
    padding: 10px auto 10px auto;
    border-radius: 0;
    margin-bottom 2em


  img.btn
    display block
    margin 0 auto
    max-width 250px

</style>
