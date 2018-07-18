<template lang='pug'>
  div
    // FORM
    div.container
      FormTemplate(v-model='form' ref='form_refs' :fieldList='fieldList' :initialValue='userData' :lock='true')
        div.croppa-wrap.has-text-centered(slot-scope="o")
          croppa-img(ref='croppa_refs' :initImg='userData["hidden/imageURL"]')

    // NAVIGATE
    div.section.mcentere
      div.is-inline: img.btn(@click='$router.push("/")' src='../theme/material/back_btn.png')
      div.is-inline(v-if='submissionState != "pending"'): img.btn(@click='submit' src='../theme/material/submit_btn.png')
      div.scale-x2(v-else align="middle")
        rotate-square5
      div.tab
      div.flex.jcenter(style='color: yellow') ** submit may lost previous

</template>

<script>
  import _ from 'lodash'
  import FormTemplate from '../components/FormTemplate'
  import CroppaImg from '../components/Croppa.vue'
  import Formstatus from '../components/Formstatus.vue'
  import {RotateSquare5} from 'vue-loading-spinner'
  import {get_regist_form, post_regist_form} from '../dtnl_api.js'
  import {getAllowEditPersonalForm, postEditForm} from '../announce_api.js'
  export default {
    props: ['userData'],
    components: {
      FormTemplate,
      CroppaImg,
      Formstatus,
      RotateSquare5
    },
    data () {
      return {
        submissionState: false,
        oldData: [],
        currData: [],
        fieldList: [],
        form: {}
      }
    },
    async created(){
      this.fieldList = require('@/others/static_TH_form.json').result.fieldList
    },
    methods: {
      async submit() {
        this.submissionState = "pending"
        console.log('submi')
        if (await this.submitable()){
          console.log('submitable')
          let form = this.$refs.form_refs
          let crpp = this.$refs.croppa_refs
          // re-upload image

          let oldForm = this.userData
          let newform = _.assign({},  form.form, {'hidden/imageURL': await crpp.getURL()})

          try{
            var result = await postEditForm(oldForm["dynamic/nationalID"], oldForm["dynamic/tel"], newform)
            if(result.result == "OK"){
              alert("Update success!")
              window.location.reload()

            }else{
              alert("Update failed, please reload this page and try again.")
            }
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
        console.log(await this.$refs.croppa_refs.hasImage())
        console.log(await this.$refs.form_refs.validateAll())
        return (await this.$refs.croppa_refs.hasImage() && (await this.$refs.form_refs.validateAll()))
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
  .scale-x2
    transform: scale(2)
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

  .tab
    height 2em

</style>
