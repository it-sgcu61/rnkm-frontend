/* eslint-plugin-disable angular */
<template lang='pug'>
  div
    div.overlay

    // <!-- head form -->
    div.container
      FormTemplate(v-model='head_result', :fieldList='fieldList.head')
        template(slot='info', slot-scope="o")
          transition(name='_slide-fade', mode='out-in', duration='85')
            div(:key='o.lang')
              h1(v-html='o.lang == "TH" ? "กรอกข้อมูลสำหรับ <strong>รับน้องก้าวใหม่</strong>" : "registration for <strong>rub nong kaow mai</strong>"')
              h2(v-html='o.lang == "TH" ? "สามารถลงทะเบียนได้ไม่เกิน 3 คน" : "maximum team member is 3"')

    // <!-- individual dynamic form -->
    transition-group(name='fade', duration='300')
      div.container(v-for='(vl, x) in dynm_result', :key='vl', v-show='dynm_result[x] !== null')
        FormTemplate(v-model='dynm_result', ref='dynamic_refs', :fieldList='fieldList.dynamic', @delete='del_user(x)', :deletable='true')
          div.has-text-centered(slot-scope="o", style='margin-bottom: 50px')
            croppa-img(ref='rfimg', :desc='o.lang == "TH" ? "คลิกเพื่อเพิ่มรูปภาพ" : "click to add picture"')

    // <!-- submit button -->
    div.__form-template-wrapper.container.__form-template-header(v-if='validIdx.length != 3')
      input.button(value='เพิ่มสมาชิก', @click='add_dynm_result')
    div.__form-template-wrapper.container.__form-template-header(v-if='validIdx.length != 0')
      input.button(value='ส่ง', class="button", @click='submit')
  </div>
</template>

<script>
  import _ from 'lodash'
  import FormTemplate from '../components/FormTemplate'
  import CroppaImg from '../components/Croppa.vue'

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
    created() {
      this.add_dynm_result()
      let form_url = this.$http.get(
        'http://datanaliez.com/api/v1/form/info/2885733c6f875f300e563a193883ea49623828a9d18ade8a956507dfc57a4bc1')
      let fieldList = {
        'TH': require('../others/rnkm_regist_form_TH_lang.json').result.fieldList,
        'EN': require('../others/rnkm_regist_form_EN_lang.json').result.fieldList
      }
      for (let [i, j] of _.zip(fieldList['TH'], fieldList['EN'])) {
        console.assert(i.name === j.name)
        let f = i.name.split('/')[0]
        this.fieldList[f].push({
          'TH': i,
          'EN': j
        })
      }
      for (let h of this.fieldList['hidden']) {
        this.hidd_result[h.name] = h.name == 'hidden/groupID' ? this.random_str() : ''
      }
      console.log(this.dynm_result)
    },
    methods: {
      random_str(){
        return new Date().getTime().toString(36).concat(parseInt(Math.random()
          .toString().substring(2), 10).toString(36)).toUpperCase()
      },
      add_dynm_result() {
        if (this.validIdx < 3) {
          this.dynm_result.push({})
        }
      },
      del_user(x) {
        this.$refs.dynamic_refs[x].show = false
        setTimeout(() =>
          this.$set(this.dynm_result, x, null), 700)
      },
      submit() {
        return new Promise(async (resolve, reject) => {
          let ar = []
          for (let x in this.validIdx) {
            let a = this.$refs.head_result
            let b = this.$refs.hidd_result
            let c = this.$refs.dynamic_form[x]
            if (c.$children.length != 1)
              reject('invalid number of children component')
            ar.push(_.assign({
              'imageURL': await c.$children[0].uploadImg()
            }, a, b, c.form))
          }
          console.log('[success] image have been uploaded')
          ar.forEach(o => this.$http.post(
            'http://datanaliez.com/api/v1/form/info/2885733c6f875f300e563a193883ea49623828a9d18ade8a956507dfc57a4bc1',
            o))
          console.log('[success] form have been uploaded to DTNL')
          resolve(ar)
        })
      }
    },
    computed: {
      validIdx() {
        let ar = []
        for (let [o, x] in this.dynm_result) {
          if (o != null) {
            ar.push(x)
          }
        }
        return ar
      }
    }
  }

</script>

<style scoped>
  h1 {
    font-weight: 300;
    font-size: 1.25em;
    color: #6f2e44;
    margin: 0;
    text-align: center;
    text-transform: uppercase;
  }

  h2 {
    font-size: 1.0em;
    color: #443138;
    margin: 0 0 40px 0;
    text-align: center;
  }

  .overlay {
    z-index: 1;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    padding: 0;
    margin: 0;
    overflow: hidden;
    opacity: 0.8;
    background-color: #000;
  }

  .bg {
    width: 100vw;
    min-height: 100vh;
    margin: 0;
    padding: 10px;
    background: #f5f5f5 url(http://wirelesssoul.net/amazing-wallpapers/neon-lights-wallpaper-hd-resolution-On-HD-Wallpaper.jpg) 50% 50% no-repeat;
    /* background-color: #f5f5f5; */
    background-size: cover;
    background-attachment: fixed;
    font-family: 'Lato', 'Kanit', sans-serif;
    font-size: 16px;
    font-size: 1em;
  }

  .container {
    z-index: 10;
    position: relative;
    width: 100%;
    max-width: 480px;
    margin: 0 auto 10px auto;
    padding: 0;
    border-radius: 0;
  }


  input.button {
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
  }

  .__form-template-wrapper {
    border-bottom: 5px solid #6f2e44;
    border-radius: 0;
    background-color: transparent;
    box-shadow: 0 0 1em 0 rgba(51, 51, 51, 0.25);
  }

  .__form-template-header {
    position: relative;
    background: #be5877;
    background-size: contain;
    text-align: center;
    padding: 5px;
    border-radius: 10px 10px 0 0;
    min-height: 20px;
  }

</style>
