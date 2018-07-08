<template lang='pug'>
div.wrap_

  div.wrap_head
    div.is-pulled-right.group_btn
      button(@click='lang = lang == "TH" ? "EN" : "TH"') {{lang}}
      button(@click='toggle_show') h
      button(@click='delete_elem' v-if='deletable') x

  collapse-transition
    div.wrap_body(ref='inner' class="" v-show='show')

      slot(name='info' v-bind='$data')
      form
        slot(v-bind='$data')

        div.group.animated.fadeIn(v-for='f in fieldListLang')
          transition(name='_slide-fade' mode='out-in' duration='100')
            div.label-text(:key='f.label') {{f.label}}

          input(v-if='f.type == "string"' v-model='form[f.name]' :placeholder='f.desc')
          select(v-if='f.type == "choice"' v-model='form[f.name]' :class='{"placeholder": !form[f.name]}')
            // option(v-if='f.desc' value="" disabled hidden) {{f.desc}}
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


.wrap_
  overflow: hidden
  background-color #111a
  border: 0 solid white;
  border-width 4px 0 0 4px
  border-top-left-radius 30px
  &head
    padding: 0 0 35px 30px;
    background: transparent;
    // border: 0 solid white;
    // border-top-left-radius 30px
    // border-width 4px 0 0 4px
    .group_btn
      background-color white
      border-radius 0 0 5px 5px
      margin-top -1px
      button
        color blue
        border none
        background-color transparent
  &body
    padding: 35px 30px 35px 30px;
    background: transparent;
    // border: 0 solid white;
    // border-width 0 0 0 4px

.group
  display: block;
  float: none;
  position: relative;
  width: 100%;
  margin: 0;
  -webkit-transition: all 0.25s;
  transition: all 0.25s;
  font-weight bold
  font-family: Superspace;

  input, textarea, select
    font-family: Superspace;
    width: 100%;
    line-height: 20px;
    margin-left 5px;
    padding: 15px 15px 5px 15px;
    border: 0 solid white;
    border-width 0 2px 2px 0
    border-width 0 0 0 0
    border-radius: 0;
    background: #222e
    font-size: calc(15px + .7vw);
    font-weight bold
    outline: none;
    outline-style: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    -webkit-box-shadow: none;
    box-shadow: none;
    color #ff7999
    &:hover
      outline: none;
      border-color: #ef4a6b;

  textarea
    height: calc(85px + 1vh);
  input
    height: calc(47px + 1vh);
  select
    height: calc(47px + 1vh);
    padding: 10px 15px 0 12px;

  .error
    margin: 0 0 20px 0;
    padding: 0 0 15px 0;
    color: yellow;
    font-size: 13px;
    line-height: 20px;


  .label-text
    display: inline-block;
    position: absolute;
    top: -8px;
    line-height: 16px;
    margin: 0 0 0 10px;
    padding: 0 6px;
    padding-left: 4px
    color: white;
    font-size: calc(16px + .6vw);
    font-weight normal
    text-transform: uppercase;
    -webkit-transition: all 0.25s;
    transition: all 0.25s;

  .placeholder
  ::placeholder
  :-ms-input-placeholder
  ::-ms-input-placeholder
    color: blue
</style>
