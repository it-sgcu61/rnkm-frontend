<template lang='pug'>
  div
    // STAUS
    formstatus(loading        v-if='!formState')
    formstatus(success   v-else-if='registration_state == "ok" && submissionState == "fullfilled"')
    formstatus(expired   v-else-if='registration_state == "expired"')
    formstatus(countdown v-else-if='registration_state == "beforeTime"' :timeLeft='timeLeft' :formState='formState' @ready="ready")

    // FORM
    div(v-else)

      // HOUSE
      div.container
        FormTemplate(v-model='head_result' ref='head_refs' :fieldList='fieldList.head' :initialValue="head_result")
          template(slot='info')
            transition(name='_slide-fade' mode='out-in' duration='85')
              div
                h1(v-html='lang == "TH" ? "กรอกข้อมูลสำหรับ รับน้องก้าวใหม่" : "registration for rub nong kaow mai"')
                h2(v-html='lang == "TH" ? "สามารถลงทะเบียนได้ไม่เกิน 3 คน" : "maximum team member is 3"')

      // PERSONAL
      transition-group(name='fade', duration='300')
        div.container(v-for='(vl, x) in dynm_result' :key='x' v-show='dynm_result[x]')
          FormTemplate(v-model='dynm_result[x]' ref='dynamic_refs' :fieldList='fieldList.dynamic' @delete='del_user(x)', :deletable='dynm_result.length > 1')
            // IMAGE
            div.croppa-wrap.has-text-centered(slot-scope="o")
              croppa-img(ref='croppa_refs')

      // NAVIAGTE
      img.btn(@click='add_dynm_result' v-if='dynm_result.length < 3' src='../theme/material/add_member.png')
      div.section.mcenter
        formstatus(loading v-if='submissionState=="pending"')
        div(v-else-if='submissionState == "none"')
          div.is-inline(v-if='dynm_result.length != 0')
            img.btn(@click='submit' src='../theme/material/submit_btn.png')


</template>

<script>
  import _ from 'lodash'
  import FormTemplate from '../components/FormTemplate'
  import CroppaImg from '../components/Croppa.vue'
  import Formstatus from '../components/Formstatus.vue'
  import {get_regist_form, post_regist_form} from '../dtnl_api.js'

  export default {
    props: ['lang'],
    components: {
      FormTemplate,
      CroppaImg,
      Formstatus
    },
    data: function () {
      let fav = _.map(JSON.parse(localStorage.getItem('fav_house')) || [], "nme")
      return {
        dynm_result: [],
        head_result: {
          "head/house1": fav[0] || '',
          "head/house2": fav[1] || '',
          "head/house3": fav[2] || '',
        },
        hidd_result: {},
        fieldList: {
          'head': [],
          'hidden': [],
          'dynamic': []
        },
        formState: null,
        timeLeft: 0,
        submissionState: "none"
      }
    },
    async created() {
      const {fieldList, ...formState} = await get_regist_form(this.lang)
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
      this.formState = formState
    },
    methods: {
      random_str(){
        return new Date().getTime().toString(36).concat(parseInt(Math.random()
          .toString().substring(2), 10).toString(36)).toUpperCase()
      },
      add_dynm_result() {
        if (this.dynm_result.length < 3) {
          this.dynm_result.push({})
        }
      },
      del_user(x) {
        this.$set(this.$refs.dynamic_refs[x], 'show', false)
        setTimeout(() => {
          this.dynm_result = this.dynm_result.filter((_, idx) => idx != x)
        }, 700)
      },
      async submit() {
        this.submissionState = "pending"
        if (await this.submitable()){
          let ar = []
          for (let [dym_form, img_crp] of _.zip(this.$refs.dynamic_refs, this.$refs.croppa_refs)) {
            let o = _.assign(
              {'hidden/imageURL': await img_crp.getURL()},
              this.head_result,
              this.hidd_result,
              dym_form.form,
            )
            ar.push(o)
          }
          console.log('[success] image have been uploaded')
          try{
            await post_regist_form(ar, this.lang)
          }catch (error){
            this.submissionState = 'none'
            alert(error)
            return
          }
          console.log('[success] form have been uploaded to DTNL')
          this.submissionState = "fullfilled"
        }else{
          this.submissionState = "none"
        }
      },
      async submitable(){
        if (!this.$refs) return false; // before mount
        for (let o of this.$refs.croppa_refs){
          if (! await o.hasImage()){
            alert('[fail] please upload image')
            return false
        }}
        if(!Object.values(this.head_result).reduce((acc, baan)=>(acc && baan != ''), true)){
          alert('กรุณาเลือกบ้านทั้งสามลำดับ')
          return false
        }
        for (let o of this.$refs.dynamic_refs.concat([this.$refs.head_refs])) {
          if (! await o.validateAll()){
            return false;
        }}
        return true
      },
      ready(){
        this.formState = JSON.parse(JSON.stringify(this.formState))
      }
    },
    computed: {
      registration_state(formState){
        if(this.formState.disabled){
          return "disabled"
        }else if(this.formState.closeOn.datetime != undefined) {
          let curr = new Date()
          let close = this.formState.closeOn.datetime;
          if(curr <= new Date(close[0])){
            this.timeLeft = new Date(close[0]) - curr
            return "beforeTime"
          }
          if(curr >= new Date(close[1])){
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
    background-color transparentify
    padding 2em 1em
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
    padding: 10px auto;
    border-radius: 0;
    margin-bottom 2em


  img.btn
    display block
    margin 0 auto
    max-width 250px

  .croppa-wrap
    margin-bottom: 50px

</style>
