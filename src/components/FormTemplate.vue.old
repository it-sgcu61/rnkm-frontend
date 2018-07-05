<template lang='pug'>
div.__form-template-wrapper(style='overflow: hidden')

  div.__form-template-header
    div.is-pulled-left(style="color: white")
      slot(name='head')
    div.is-pulled-right
      button(@click='lang = lang == "TH" ? "EN" : "TH"') {{lang}}
      button(@click='toggle_show') h
      button(@click='delete_elem' v-if='deletable') x


  collapse-transition
    div.container-inner._borderbutt(ref='inner' class="" v-show='show')

      slot(name='info' v-bind='$data')
      form
        slot(v-bind='$data')

        div.group.animated.fadeIn(v-for='f in fieldListLang')
          transition(name='_slide-fade' mode='out-in' duration='100')
            div.label-text(:key='f.label') {{f.label}}

          input(v-if='f.type == "string"' v-model='form[f.name]' :placeholder='f.desc')
          select(v-if='f.type == "choice"' v-model='form[f.name]' :class='{"placeholder": !form[f.name]}')
            option(v-if='f.desc' value="" disabled hidden) {{f.desc}}
            option(v-for='o in f.option' :value='o.value' style='color: #353535') {{o.label}}
          textarea-auto(v-if='f.type == "lg_string"' v-model='form[f.name]' :placeholder='f.desc')
          div.error

</template>

<script>
import _ from "lodash";
import TextareaAuto from "./TextareaAuto.vue";

export default {
  components: {
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
    },
    deletable: {
      type: Boolean,
      require: false,
      default: false
    }
  },
  watch: {
    form: {
      deep: true,
      handler() {
        this.$emit("input", this.form);
      }
    }
  },
  data: function() {
    return {
      show: true,
      lang: "TH",
      form: {}
    };
  },
  created() {
    this.form = this.fieldList.reduce((a, b) => {
      this.$set(a, _.get(b, [this.lang, "name"]), "");
      return a;
    }, {});
  },
  computed: {
    fieldListLang() {
      return _.map(this.fieldList, this.lang);
    }
  },
  methods: {
    delete_elem() {
      if (confirm("confirm delete")) {
        this.$emit("delete");
      }
    },
    toggle_show() {
      this.show = !this.show;
    }
  }
};
</script>

<style lang='stylus' scoped>
.__form
  &-template-wrapper
    border-bottom: 5px solid #6f2e44;
    border-radius: 0;
    background-color: transparent;
    box-shadow: 0 0 1em 0 rgba(51, 51, 51, 0.25);

  &-template-header
    position: relative;
    min-height: 60px;
    background: #be5877;
    background-size: contain;
    text-align: center;
    padding: 15px;
    border-radius: 10px 10px 0 0;


.container-inner
  padding: 35px 30px 35px 30px;
  background-color: #fff;

.group
  display: block;
  float: none;
  position: relative;
  width: 100%;
  margin: 0;
  -webkit-transition: all 0.25s;
  transition: all 0.25s;

  input, textarea, select
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
    &:focus
      outline: none;
      border-color: #ef4a6b;

  textarea
    height: 80px;
  input
    height: 42px;
  select
    height: 42px;
    padding: 0px 15px;

  .error
    margin: 0 0 20px 0;
    padding: 0 0 15px 0;
    color: #ef4a6b;
    font-size: 13px;
    line-height: 20px;


  .label-text
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

.placeholder
::placeholder
:-ms-input-placeholder
::-ms-input-placeholder
  color: red

button
  color: blue;
  background-color: white;
  border: none;
</style>
