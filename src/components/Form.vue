<template lang='pug'>
  div.bg
    // head form
    div.container
      FormTemplate(v-model='head_result' :fieldList='fieldList.head')
        template(slot='info')
          transition(name='_slide-fade' mode='out-in' duration='85')
            div
              h1(v-html='lang == "TH" ? "กรอกข้อมูลสำหรับ รับน้องก้าวใหม่" : "registration for rub nong kaow mai"')
              h2(v-html='lang == "TH" ? "สามารถลงทะเบียนได้ไม่เกิน 3 คน" : "maximum team member is 3"')

    // individual dynamic form
    transition-group(name='fade', duration='300')
      div.container(v-for='(vl, x) in dynm_result' :key='x' v-show='dynm_result[x]')
        FormTemplate(v-model='dynm_result[x]' ref='dynamic_refs' :fieldList='fieldList.dynamic' @delete='del_user(x)', :deletable='true')
          div.has-text-centered(slot-scope="o", style='margin-bottom: 50px')
            croppa-img(ref='rfimg', :desc='o.lang == "TH" ? "เพิ่มรูปภาพ หน้าตรงเห็นชัด" : "add clear face picture"')


    // submit button
    img.btn(@click='add_dynm_result' src='../theme/material/add_member.png')
    div.section.has-text-centered
      div.is-inline(v-if='valid_user_len != 3')
      div.is-inline(v-if='valid_user_len != 0')
        img.btn(@click='submit' src='../theme/material/submit_btn.png' :disable='!submitable')

  </div>
</template>

<script>
  import _ from 'lodash'
  import FormTemplate from '../components/FormTemplate'
  import CroppaImg from '../components/Croppa.vue'
  import {get_regist_form, post_regist_form} from '../dtnl_api.js'
  export default {
    props: ['lang'],
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
      let fieldList = await get_regist_form(this.lang)
      for (let i of fieldList) {
        let f = i.name.split('/')[0]
        this.fieldList[f].push(i)
      }
      for (let h of this.fieldList['hidden']) {
        if (h.name == 'hidden/groupID') {
          console.log('construct group ID')
          this.hidd_result[h.name] = this.random_str()
        } else if (h.name != "hidden/imageURL") {
          console.assert('some thing is wrong on ' + h.name + ' attribute')
        }
      }
      this.add_dynm_result()
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
      },
      submitable(){
        if (!this.$refs) return false;
        for (let x in this.$refs.dynamic_refs) {
          let node = this.$refs.dynamic_refs[x];
          console.log(node)
          if (!node) continue;
          if (!node.check_valid_all()){
            return false;
          }
        }
        return true
      }
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
