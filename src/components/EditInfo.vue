<template lang='pug'>
  div
    // individual dynamic form
    div.container
      FormTemplate(v-model='value' ref='form_refs' :fieldList='fieldList' :initialValue='userData' :lock='true')
        div.croppa-wrap.has-text-centered(slot-scope="o")
          croppa-img(ref='croppa_refs' :initImg='userData["hidden/imageURL"]')

    // submit button
    div.section.has-text-centered {{value}}
      // div(v-if='submissionState == "none"')
      div
        div.is-inline: img.btn(@click='submit' src='../theme/material/submit_btn.png')
      // formstatus(loading v-else-if='submissionState=="pending"')


</template>

<script>
  import _ from 'lodash'
  import FormTemplate from '../components/FormTemplate'
  import CroppaImg from '../components/Croppa.vue'
  import Formstatus from '../components/Formstatus.vue'
  import {get_regist_form, post_regist_form} from '../dtnl_api.js'

  export default {
    props: ['userData'],
    components: {
      FormTemplate,
      CroppaImg,
      Formstatus
    },
    data () {
      return {
        submissionState: false,
        oldData: [],
        currData: [],
        fieldList: [],
        value: {}
      }
    },
    async created(){
      this.fieldList = require('@/others/static_TH_form.json').result.fieldList
      this.oldData  = this.userData
      this.currData = this.userData
    },
    methods: {
      async submit() {
        this.submissionState = "pending"
        if (await this.submitable()){
          console.log('submitable')
          let form = this.$refs.form_refs
          let crpp = this.$refs.croppa_refs
          // re-upload image
          let newform = _.assign({'hidden/imageURL': await img_crp.getURL()},  form.form)
          try{
            await postEditForm(newform)
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
        return (! (await this.$refs.croppa_refs.hasImage()) && ! (await this.$refs.form_refs.validateAll()))
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
