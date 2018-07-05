/* eslint-plugin-disable angular */
<template lang='pug'>
  div.bg
    // head form
    div.container
      FormTemplate(v-model='head_result', :fieldList='fieldList.head')
        template(slot='info', slot-scope="o")
          transition(name='_slide-fade', mode='out-in', duration='85')
            div(:key='o.lang')
              h1(v-html='o.lang == "TH" ? "กรอกข้อมูลสำหรับ รับน้องก้าวใหม่" : "registration for rub nong kaow mai"')
              h2(v-html='o.lang == "TH" ? "สามารถลงทะเบียนได้ไม่เกิน 3 คน" : "maximum team member is 3"')

    // individual dynamic form
    transition-group(name='fade', duration='300')
      div.container(v-for='(vl, x) in dynm_result' :key='x' v-show='dynm_result[x]')
        FormTemplate(v-model='dynm_result[x]' ref='dynamic_refs' :fieldList='fieldList.dynamic' @delete='del_user(x)', :deletable='true')
          div.has-text-centered(slot-scope="o", style='margin-bottom: 50px')
            croppa-img(ref='rfimg', :desc='o.lang == "TH" ? "คลิกเพื่อเพิ่มรูปภาพ" : "click to add picture"')

    // submit button
    div(v-if='valid_user_len != 3')
      div.button(@click='add_dynm_result') เพิ่มสมาชิก
    div(v-if='valid_user_len != 0')
      div.button(@click='submit') ส่ง

  </div>
</template>

<script>
  import _ from 'lodash'
  import FormTemplate from '../components/FormTemplate'
  import CroppaImg from '../components/Croppa.vue'
  import {get_regist_form, post_regist_form} from '../dtnl_api.js'
  export default {
    components: {
      FormTemplate,
      CroppaImg
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
        }
      }
    },
    async created() {
      let fieldList = await get_regist_form()
      for (let [i, j] of _.zip(fieldList['TH'], fieldList['EN'])) {
        console.assert(i.name === j.name)
        let f = i.name.split('/')[0]
        this.fieldList[f].push({
          'TH': i,
          'EN': j
        })
      }
      for (let h of this.fieldList['hidden']) {
        if (h['TH'].name == 'hidden/groupID') {
          console.log('construct grou0p ID')
          this.hidd_result[h['TH'].name] = this.random_str()
        } else if (h['TH'].name != "hidden/imageURL") {
          console.assert('wtf is ' + h['TH'].name + ' attribute')
        }
      }
    },
    methods: {
      random_str(){
        return new Date().getTime().toString(36).concat(parseInt(Math.random()
          .toString().substring(2), 10).toString(36)).toUpperCase()
      },
      add_dynm_result() {
        if (this.valid_user_len < 3) {
          this.dynm_result.push(this.fieldList['dynamic'].reduce((a, b) => {
            a[b['TH'].name] = ''
            return a
          }, {}))
        }
      },
      del_user(x) {
        console.assert(this.dynm_result[x])
        this.$set(this.$refs.dynamic_refs[x], 'show', false)
        setTimeout(() =>
          this.$set(this.dynm_result, x, null), 700)
      },
      submit() {
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
            console.log('create form')
            console.log(a)
            console.log(b)
            console.log(c.form)
          }
          console.log('[success] image have been uploaded')
          console.log(await post_regist_form(ar))
          console.log('[success] form have been uploaded to DTNL')
          resolve(ar)
        })
      }
    },
    computed: {
      valid_user_len() {
        return this.dynm_result.filter(Boolean).length
      }
    }
  }

</script>

<style lang='stylus' scoped>
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

  .bg
    background-color: #000

  .container
    z-index: 10;
    position: relative;
    width: 100%;
    max-width: 600px;
    padding: 10px auto 10px auto;
    border-radius: 0;
    margin-bottom 2em


  .button
    display: block;
    width: 100%;
    height: 44px;
    line-height: 42px;
    border: 1px solid #be5877;
    border-radius: 0;
    background-color: #be5877;
    font-size: 16px;
    color: #fff;
    text-transform: uppercase;
    cursor: pointer;
    -webkit-transition: all 0.25s;
    transition: all 0.25s;

</style>
