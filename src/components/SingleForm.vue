<template>
<div>

  <div class='header'>
    <div class='is-pulled-left' style="color: white"><slot></slot></div>
    <div class='is-pulled-right'>
      <button @click='lang = lang == "TH" ? "EN" : "TH"'>{{lang}}</button>
      <button @click='show = !show'>h</button>
      <button @click='delete_elem'>x</button>
    </div>
  </div>

  <div class="container-inner" v-show='show'>
    <form>

      <div class='group has-text-centered'>
        <croppa-img ref='rfimg' :desc='lang == "TH" ? "คลิกเพื่อเพิ่มรูปภาพ" : "click to add picture"'/>
        <div class='error'></div>
        <div class='error'></div>
      </div>

      <div v-for='f in fieldListLang' class="group">
        <span class="label-text">{{f.label}}</span>

        <input  v-if='f.type == "string"' v-model='form[f.name]' :placeholder='f.desc'>
        <select v-if='f.type == "choice"' v-model='form[f.name]' :class='{"placeholder": !form[f.name]}'>
          <option v-if='f.desc' value="" disabled hidden>{{f.desc}}</option>
          <option v-for='o in f.option' :value='o.value' style='color: #353535'>{{o.label}}</option>
        </select>
        <textarea-auto v-if='f.type == "lg_string"' v-model='form[f.name]' :placeholder='f.desc'></textarea-auto>

        <div class="error"></div>
      </div>

    </form>

    <div>
      debug : {{form}}
    </div>

  </div>

</div>
</template>

<script>
import _ from 'lodash'
import CroppaImg from './Croppa.vue'
import TextareaAuto from './TextareaAuto.vue'

export default {
  components: {
    CroppaImg,
    TextareaAuto
  },
  props: {
    value: {
      type: Object,
      require: false
    },
    fieldList: {
      type: Array,
      require: true,
      default: () => []
    }
  },
  watch: {
    form: {
      deep: true,
      handler() {
        this.$emit('input', this.form)
  }}},
  data: function () {
    return {
      show: true,
      lang: 'TH',
      form: {}
  }},
  created(){
    this.form = this.fieldList.reduce((a, b) => {
      this.$set(a, _.get(b, [this.lang, 'name']), '')
      return a
    }, {})
  },
  computed: {
    fieldListLang() {
      return _.map(this.fieldList, this.lang)
  }},
  methods: {
    delete_elem() {
      if (confirm('confirm delete')){
        this.$emit('delete')
    }},
    get_form(_callback) {
      let self = this
      this.$refs.rfimg.uploadImg(url => {
        self.$set(self.form, 'imageURL', url)
        _callback(self.form)
      })
    }
  }
}
</script>

<style scoped>
.container-inner {
  padding: 35px 30px 35px 30px;
}

.header {
  position: relative;
  height: 60px;
  background: #be5877;
  background-size: contain;
  text-align: center;
  padding: 15px;
}

.group {
  display: block;
  float: none;
  position: relative;
  width: 100%;
  margin: 0;
  -webkit-transition: all 0.25s;
      transition: all 0.25s;
}

.label-text {
  display: inline-block;
  position: absolute;
  top: -8px;
  line-height: 16px;
  margin: 0 0 0 10px;
  padding: 0 6px;
  background-color: #fff;
  color: #be5877;
  font-size: 13px;
  text-transform: uppercase;
  -webkit-transition: all 0.25s;
      transition: all 0.25s;
}

.group input,
.group textarea,
.group select {
  width: 100%;
  line-height: 20px;
  padding: 15px 15px;
  border: 1px solid #959595;
  border-radius: 0;
  background: none;
  font-size: 13px;
  outline: none;
  outline-style: none;
  -webkit-appearance: none;
     -moz-appearance: none;
  -webkit-box-shadow: none;
          box-shadow: none;
}

.group textarea {height: 80px;}
.group input    {height: 42px;}
.group select   {height: 42px; padding: 0px 15px;}

.group input:focus,
.group select:focus,
.group textarea:focus {
  outline: none;
  border-color: #ef4a6b;
}


form input:-webkit-autofill {
  background-color: transparent !important;
}

.group .error {
  margin: 0 0 20px 0;
  padding: 0 0 15px 0;
  color: #ef4a6b;
  font-size: 13px;
  line-height: 20px;
}


 .placeholder {color: red; }
::placeholder {color: red; }
 :-ms-input-placeholder {color: red; }
::-ms-input-placeholder {color: red; opacity: 1;}

button {
  color: blue;
  background-color: white;
  border: none;
}
</style>
