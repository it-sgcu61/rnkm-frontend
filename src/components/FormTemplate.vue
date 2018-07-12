<template lang='pug'>
div.wrap_

  div.wrap_head
    div.is-pulled-right.group_btn
      button(@click='toggle_show')
        i.fa.fa-minus.blue
      button(@click='delete_elem' v-if='deletable')
        i.fa.fa-times.blue

  collapse-transition
    div.wrap_body(ref='inner' class="" v-show='show')
      slot(name='info' v-bind='$data')
      form
        slot(v-bind='$data')

        div.group.animated.fadeIn(v-for='f in fieldList')
          transition(name='_slide-fade' mode='out-in' duration='100')
            div.label-text(:key='f.label') {{f.label}}

          input(  v-if = 'f.name.endsWith("tel")'   v-model.trim='form[f.name]' :name='f.name' v-validate="{required: f.required, regex: f.validate}" :placeholder='f.desc' v-mask="'###-###-####'")
          input(  v-else-if='f.type == "string"'    v-model.trim='form[f.name]' :name='f.name' v-validate="{required: f.required, regex: f.validate}" :placeholder='f.desc')
          txtarea(v-else-if='f.type == "lg_string"' v-model.trim='form[f.name]' :name='f.name' v-validate="{required: f.required, regex: f.validate}" :placeholder='f.desc')
          select( v-else-if='f.type == "choice" && /^head/.test(f.name)'    v-model.trim='form[f.name]' :name='f.name' v-validate="{required: f.required}")
            option(v-for='o in f.option.filter((opt)=>!Object.values(form).slice(0,parseInt(f.name.match(/\\d+/g)[0])-1).includes(opt.value))' :value='o.value' style='color: #353535') {{o.label}}
          select( v-else-if='f.type == "choice"'    v-model.trim='form[f.name]' :name='f.name' v-validate="{required: f.required}")
            option(v-for='o in f.option' :value='o.value' style='color: #353535') {{o.label}}

          div.error {{ errors.has(f.name) ? errors.first(f.name) : '' }}

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
      require: true,
      default: () => []
    },
    deletable: {
      type: Boolean,
      require: false,
      default: false
    },
    initialValue:{
      type:Object,
      required:false
    }
  },
  watch: {
    form: {
      deep: true,
      handler() {
        // if(/^head\//.test(this.$props.fieldList[0].name)){
        //   // this.selectedBaan = Object.values(this.form)
        //   console.log(this.selectedBaan)
        // }
        this.$emit("input", this.form);
      }
    }
  },
  data: function() {
    return {
      show: true,
      form: {},
      selectedBaan:[]
    };
  },
  created() {
    const initialValue = this.$props.initialValue
    this.form = this.fieldList.reduce((a, b) => {
      this.$set(a, b.name, initialValue?initialValue[b.name]:"");
      return a;
    }, {});
  },
  methods: {
    delete_elem() {
      if (confirm("confirm delete")) {
        this.$emit("delete");
        // From intaniger
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

.dark
  color: #111
.blue
  color: #334444

.fa {
  transform scale(1.5)
  margin 5px 10px
  margin-top -2px;
}
.wrap_ {
  overflow: hidden;
  background-color: #111a;
  border: 0 solid $edge;
  border-width: 4px 0 0 4px;
  border-top-left-radius: 30px;
  border-bottom-right-radius: 30px;

  &head {
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

  &body {
    padding: 35px 30px 35px 30px;
    background: transparent;
  }
}

.group {
  display: block;
  float: none;
  position: relative;
  width: 100%;
  margin: 0;
  -webkit-transition: all 0.25s;
  transition: all 0.25s;
  font-weight: bold;
  font-family: Superspace;

  input, textarea, select {
    font-family: Superspace;
    width: 100%;
    line-height: 20px;
    margin-left: 5px;
    padding: 15px 15px 5px 15px;
    border: 0 solid white;
    border-width: 0 0 0 0;
    border-radius: 0 10px 0 0;
    background: #333e;
    font-size: calc(14px + 0.5vw);
    font-weight: bold;
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

  textarea {
    height: calc(85px + 1vh);
  }

  input {
    height: calc(47px + 1vh);
  }

  select {
    height: calc(47px + 1vh);
    padding: 10px 15px 0 12px;
  }

  option {
    background-color #eee
  }

  .error {
    margin: 0 0 20px 0;
    padding: 0 0 15px 10px;
    color: yellow;
    font-size: 13px;
    line-height: 20px;
  }

  .label-text {
    display: inline-block;
    position: absolute;
    top: -8px;
    line-height: 16px;
    margin: 0 0 0 10px;
    padding: 0 6px;
    padding-left: 4px;
    color: white;
    font-size: calc(15px + 0.5vw);
    font-weight: normal;
    text-transform: uppercase;
    -webkit-transition: all 0.25s;
    transition: all 0.25s;
  }

  .placeholder, ::placeholder, :-ms-input-placeholder, ::-ms-input-placeholder {
    color: blue;
  }
}
</style>
