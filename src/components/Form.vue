<template lang='pug'>
  div
    formstatus(loading        v-if='!formState')
    formstatus(success   v-else-if='registration_state == "ok" && submissionState == "fullfilled"')
    formstatus(expired   v-else-if='registration_state == "expired"')
    formstatus(countdown v-else-if='registration_state == "beforeTime"' :timeLeft='timeLeft')

    div(v-else)
      // head form
      div.container
        FormTemplate(v-model='head_result' ref='head_refs' :fieldList='fieldList.head' :initialValue="head_result")
          template(slot='info')
            transition(name='_slide-fade' mode='out-in' duration='85')
              div
                h1(v-html='lang == "TH" ? "กรอกข้อมูลสำหรับ รับน้องก้าวใหม่" : "registration for rub nong kaow mai"')
                h2(v-html='lang == "TH" ? "สามารถลงทะเบียนได้ไม่เกิน 3 คน" : "maximum team member is 3"')

      // individual dynamic form
      transition-group(name='fade', duration='300')
        div.container(v-for='(vl, x) in dynm_result' :key='x' v-show='dynm_result[x]')
          FormTemplate(v-model='dynm_result[x]' ref='dynamic_refs' :fieldList='fieldList.dynamic' @delete='del_user(x)', :deletable='dynm_result.length > 1')
            div.croppa-wrap.has-text-centered(slot-scope="o")
              croppa-img(ref='croppa_refs' :desc='o.lang == "TH" ? "เพิ่มรูปภาพ หน้าตรงเห็นชัด" : "add clear face picture"')
          // | {{dynm_result[x]}}

      // submit button
      img.btn(@click='add_dynm_result' src='../theme/material/add_member.png')
      div.section.has-text-centered

        div.is-inline(v-if='dynm_result.length != 3')

        div(v-if='submissionState == "none"')
          div.is-inline(v-if='dynm_result.length != 0')
            img.btn(@click='submit' src='../theme/material/submit_btn.png')
        formstatus(loading v-else-if='submissionState=="pending"')


</template>

<script>
  import _ from 'lodash'
  import FormTemplate from '../components/FormTemplate'
  import CroppaImg from '../components/Croppa.vue'
  import Formstatus from '../components/Formstatus.vue'
  import {get_regist_form, post_regist_form} from '../dtnl_api.js'
  import {check_if_user_exist, mark_that_user_already_registered, announcement} from '../middle-api.js'
  window.check_if_user_exist = check_if_user_exist

  export default {
    props: ['lang'],
    components: {
      FormTemplate,
      CroppaImg,
      Formstatus
    },
    data: function () {
      return {
        dynm_result: [],
        head_result: {
          "head/house1":localStorage.getItem('flavoriteHouse1.name'),
          "head/house2":localStorage.getItem('flavoriteHouse2.name'),
          "head/house3":localStorage.getItem('flavoriteHouse3.name'),
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
        if(await this.submitable()){
          this.submissionState="pending"
          let ar = []
          for (let x in this.dynm_result) {
            if (!x) continue;
            let a = this.head_result
            let b = this.hidd_result
            let c = this.$refs.dynamic_refs[x]
            if (c.$children.length != 1 || c.$children[0].$children.length != 1) {
              reject('invalid number of children component')
            }
            try {
              ar.push(_.assign({
                'hidden/imageURL': await c.$children[0].$children[0].uploadImg()
              }, a, b, c.form))
            } catch (error) {
              this.submissionState="none"
              alert("no image selected.")
              return
            }
          }
          console.log('[success] image have been uploaded')
          try {
            var result = await post_regist_form(ar)
            console.log('[success] form have been uploaded to DTNL')
            this.submissionState="fullfilled"
          } catch (error) {
            alert(error.toString())
            this.submissionState="none"
            return
          }
        }
      },
      async submitable(){
        if (!this.$refs) return false; // before mount
        for (let o of this.$refs.croppa_refs){
          if (! await o.hasImage()){
            console.log('[fail] please upload image')
            return false
        }}
        for (let o of this.$refs.dynamic_refs.concat([this.$refs.head_refs])) {
          if (! await o.validateAll()){
            return false;
        }}
        return true
      }
    },
    computed: {
      registration_state(){
        // console.log(this.formState)
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
    background-color #020202
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
