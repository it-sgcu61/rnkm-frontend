<template lang='pug'>
div.wrapper

  // NAVIGATE
  div.head
    div.is-pulled-right.group_btn
      button(@click='toggle_show')
        i.fa.fa-minus.blue
      button(@click='delete_elem' v-if='deletable')
        i.fa.fa-times.blue

  // FORM
  div
    //form {{lock}} {{fieldList}}
    // div(v-for='f in fieldList') {{f}}
  collapse-transition
    div.body(ref='inner' v-show='show')
      slot(name='info' v-bind='$data')
      form
        slot(v-bind='$data')
        div.field-group.animated.fadeIn(v-for='f in fieldList' v-if='f.name.indexOf("hidden") == -1')
          // | {{f}}

          // LABEL
          transition(name='_slide-fade' mode='out-in' duration='100')
            div.label-text(:key='f.label') {{f.label}}

          // INPUT
          input(  :disabled='lock && f.lock' v-if = 'f.name.endsWith("tel")'   v-model.trim='form[f.name]' :name='f.name' v-validate="{required: f.required, regex: f.validate}" :placeholder='lock && f.lock?"":f.desc' v-mask="'###-###-####'")
          input(  :disabled='lock && f.lock' v-else-if='f.type == "string"'    v-model.trim='form[f.name]' :name='f.name' v-validate="{required: f.required, regex: f.validate}" :placeholder='lock && f.lock?"":f.desc')
          txtarea(:disabled='lock && f.lock' v-else-if='f.type == "lg_string"' v-model.trim='form[f.name]' :name='f.name' v-validate="{required: f.required, regex: f.validate}" :placeholder='lock && f.lock?"":f.desc')
          // select( :disabled='lock && f.lock' v-else-if='f.type == "choice" && /^head/.test(f.name)' v-model.trim='form[f.name]' :name='f.name')
          //   option(v-for='o in f.option.filter((opt)=>!Object.values(form).slice(0,parseInt(f.name.match(/\\d+/g)[0])-1).includes(opt.value))' :value='o.value' style='color: #353535') {{o.label}}
          select( :disabled='lock && f.lock' v-else-if='f.type == "choice"' v-model.trim='form[f.name]' :name='f.name')
            option(v-for='o in f.option' :value='o.value' style='color: #353535' ) {{o.label}}
            // option(v-for='o in f.option' :value='o' style='color: #353535' ) {{o}}

          // ERROR
          div.error(v-if='errors.has(f.name)')
            | information {{ f.required && !form[f.name] ? "require" : "incorrect"}}

</template>

<script>
import _ from "lodash";
import Txtarea from "./TextareaAuto.vue";
import { mask } from "vue-the-mask";

export default {
  components: { Txtarea },
  directives: { mask },
  props: {
    value: {
      type: Object,
      require: false
    },
    fieldList: {
      type: Array,
      require: true
      // default: () => ['error not pass']
    },
    deletable: {
      type: Boolean,
      require: false,
      default: false
    },
    initialValue:{
      type:Object,
      required:false
    },
    lock: {
      type: Boolean,
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
      form: {},
      selectedBaan:[],
    };
  },
  created() {
    // const initialValue = this.initialValue
    // console.log(initialValue)
    // console.log('>>> create FormTemplate')
    // console.log(this.fieldList)
    // if (!this.fieldList) {
    //   consol.log('NULL')
    //   return
    // }
    // debugger
    // this.form = this.fieldList.reduce((a, b) => {
    //   // console.log((b.type=="choice" ? b.option : ""))
    //   a[b.name] = b.type == "choice" ? b.option[0].value : ""
    //   return a;
    // }, {});
    // console.log('tempalte form', this.form)
    // console.log('uncreate')
  },
  methods: {
    delete_elem() {
      if (confirm("confirm delete")) {
        this.$emit("delete");
        // From intaniger
        // krist
      }
    },
    toggle_show() {
      this.show = !this.show;
    },
    async validateAll() {
       return await this.$validator.validateAll()
    }
  }
};
</script>

<style lang='stylus' scoped>

$edge = #eeef

.fa {
  transform scale(1.5)
  margin 5px 10px
  margin-top -2px;
  color: #334444
}
.wrapper {
  overflow: hidden;
  background-color: #111a;
  border: 0 solid $edge;
  border-width: 4px 0 0 4px;
  border-top-left-radius: 30px;
  border-bottom-right-radius: 30px;

  .head {
    padding: 0 0 60px 30px;
    background: transparent;

    .group_btn {
      background-color: $edge;
      border-radius: 0 0 5px 5px;
      margin-top: -1px;

      button {
        color: #334444;
        border: none;
        background-color: transparent;
      }
    }
  }
  .body {
    padding: 35px 30px 35px 30px;
    background: transparent;
  }
}

.field-group
  display: block;
  float: none;
  position: relative;
  width: 100%;
  margin: 3em 0;
  transition: all 0.25s;
  font-family: Superspace;

  .label-text {
    display: inline-block;
    top: -8px;
    line-height: 16px;
    margin: 0 0 0 10px;
    padding: 0 6px;
    padding-left: 4px;
    font-size: 1.2em
    font-weight: normal;
    -webkit-transition: all 0.25s;
    transition: all 0.25s;
  }
  input, textarea, select {
    width: 100%;
    line-height: 20px;
    margin-left: 5px;
    padding: 15px 15px 5px 15px;
    border: 0 solid white;
    border-width: 0 0 0 0;
    border-radius: 0 10px 0 0;
    background: #333e;
    font-size: 1em
    font-weight: bold
    font-family SuperSpace
    outline: none;
    outline-style: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    -webkit-box-shadow: none;
    box-shadow: none;
    color: #ff7999;
    &:hover {
      outline: none;
      border-color: #ef4a6b;
    }
  }

  textarea,
  txtarea
    height: calc(85px + 1vh);
  input
    height: calc(47px + 1vh);
  select
    height: calc(47px + 1vh);
    padding: 10px 15px 0 12px;
  option
    background-color #eee

  input, select, option, textarea, txtarea
    &[disabled]
      background-color transparent


  .error
    margin: 0 0 20px 0;
    padding: 0 0 15px 10px;
    color: yellow;
    font-size: 1em;
    line-height: 20px;


  ::placeholder {
    -webkit-text-security: none;
    color: darkGray;
    pointer-events: none !important;
  }
  input::placeholder,
  txtarea::placeholder,
  textarea::placeholder {
    white-space: pre;
    word-wrap: normal;
    overflow: hidden;
  }


</style>
