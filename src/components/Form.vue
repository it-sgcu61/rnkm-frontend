<template lang='pug'>
  div
    formstatus(loading v-if='isLoading')

    // STAUS
    div(v-else-if='submissionState == "fullfilled"')
      formstatus(success)

    // FORM
    div(v-else)
      div.container
        vue-countdown(:time="100" @countdownend="ready")
          template(slot-scope="props")
            div.flex
              div.mcenter(style="margin-bottom:10px")
                h1.zingR(style='font-size:3em;') Registration will be ended in:
                h1.zingR(style='font-size:3em;') {{ props.days }}:{{ props.hours }}:{{ props.minutes }}:{{ props.seconds }}
                h1.zingR(style='font-size:1.5em; color: #e0e0e0') ({{ (new Date(formState.closeOn.datetime[1])).toString() }})
      // HOUSE
      div.container
        //{{fieldListHouses}}
        FormTemplate(v-model='head_result' ref='head_refs' :fieldList='fieldListHouses' :initialValue="head_result" :lock='false')
          template(slot='info')
            transition(name='_slide-fade' mode='out-in' duration='85')
              div
                h1(v-html='lang == "TH" ? "กรอกข้อมูลสำหรับ รับน้องก้าวใหม่" : "registration for rub nong kaow mai"')
                h2(v-html='lang == "TH" ? "สามารถลงทะเบียนได้เพียง 1 คน" : "maximum team member is 3"')

      // PERSONAL
      div.container(v-for='(vl, x) in dynm_result' :key='x' v-show='dynm_result[x]')
        FormTemplate(v-model='dynm_result[x]' ref='dynamic_refs' :fieldList='fieldList.dynamic' @delete='del_user(x)', :deletable='dynm_result.length > 1')
            // // IMAGE
            div.croppa-wrap.has-text-centered(slot-scope="o")
              croppa-img(ref='croppa_refs')

      // NAVIAGTE
      div.section.mcenter
        formstatus(loading v-if='submissionState=="pending"')
        div(v-else-if='submissionState == "none"')
          div.is-inline(v-if='dynm_result.length != 0')
            img.btn(@click='submit' src='../theme/material/submit_btn.png')


</template>

<script>
import _ from "lodash";
import FormTemplate from "../components/FormTemplate";
import CroppaImg from "../components/Croppa.vue";
import Formstatus from "../components/Formstatus.vue";
import VueCountdown from "@xkeshi/vue-countdown";

export default {
  props: ["lang"],
  components: {
    FormTemplate,
    CroppaImg,
    Formstatus,
    VueCountdown
  },
  data: function() {
    // let fav = _.map(JSON.parse(localStorage.getItem('fav_house')) || [], "nme")
    return {
      dynm_result: [],
      head_result: {
        // "head/house1": fav[0] || '',
        // "head/house2": fav[1] || '',
        // "head/house3": fav[2] || '',
      },
      hidd_result: {},
      fieldList: {
        head: [],
        hidden: [],
        dynamic: []
      },
      fieldListHouses: [],
      houseSnapshot: {},
      formState: {},
      timeLeft: 0,
      submissionState: "none",
      toURL: require("../others/convertHouseNameToURL.json"),
      isLoading: true,
      submitForm: {}
    };
  },
  async created() {
    // const fieldList = require("../others/static_TH_form.json").result.fieldList; // (await get_regist_form()).result.fieldList
    const fieldList = require("../others/static_TH_form.wan-jeeng.json").result.fieldList; // (await get_regist_form()).result.fieldList
    for (let i of fieldList) {
      let f = i.name.split("/")[0];
      this.fieldList[f].push(i);
    }
    for (let h of this.fieldList.hidden) {
      if (h.name == "hidden/groupID") {
        this.hidd_result[h.name] = this.random_str();
      } else if (h.name != "hidden/imageURL") {
        console.assert("some thing is wrong on " + h.name + " attribute");
      }
    }
    this.add_dynm_result();
    this.fieldListHouses = _.clone(this.fieldList.head, true);
    this.fieldListHouses.option = [{ label: "loading..", value: "loading.." }];
    this.isLoading = false;
  },
  methods: {
    random_str() {
      return new Date()
        .getTime()
        .toString(36)
        .concat(
          parseInt(
            Math.random()
              .toString()
              .substring(2),
            10
          ).toString(36)
        )
        .toUpperCase();
    },
    add_dynm_result() {
      if (this.dynm_result.length < 3) {
        this.dynm_result.push({});
      }
    },
    del_user(x) {
      this.$set(this.$refs.dynamic_refs[x], "show", false);
      setTimeout(() => {
        this.dynm_result = this.dynm_result.filter((_, idx) => idx != x);
      }, 700);
    },
    async submit() {
      this.submissionState = "pending";
      if (await this.submitable()) {
        let ar = [];
        // for (let [dym_form, img_crp] of _.zip(this.$refs.dynamic_refs, this.$refs.croppa_refs)) {
        for (let [dym_form] of _.zip(this.$refs.dynamic_refs)) {
          let o = _.assign(
            {},
            // {'hidden/imageURL': await img_crp.getURL()},
            this.head_result,
            this.hidd_result,
            dym_form.form
          );
          ar.push(o);
        }
        this.submitForm = ar[0];
        try {
          let oneform = _.clone(ar[0], true);
          let result = await post_regist_form(oneform); // TODO: write API
          if (result.data.success) {
            alert("regist success", JSON.stringify(ar[0]));
            this.submissionState = "fullfilled";
          } else {
            alert("submission fail");
            this.submissionState = "none";
          }
        } catch (error) {
          this.submissionState = "none";
          alert(error);
          return;
        }
      } else {
        this.submissionState = "none";
      }
    },
    async submitable() {
      if (!this.$refs) return false; // before mount
      // for (let o of this.$refs.croppa_refs){
      //   if (! await o.hasImage()){
      //     alert('[fail] please upload image')
      //     return false
      // }}
      if (!Object.values(this.head_result).reduce((acc, baan) => acc && baan != "", true)) {
        alert("กรุณาเลือกบ้าน");
        return false;
      }
      for (let o of this.$refs.dynamic_refs.concat([this.$refs.head_refs])) {
        if (!(await o.validateAll())) {
          return false;
        }
      }
      return true;
    },
    ready() {
      this.formState = JSON.parse(JSON.stringify(this.formState));
    }
  }
};
</script>

<style lang='stylus' scoped>
.bg, .section {
  background-color: transparentify;
  padding: 2em 1em;
}

h1 {
  font-weight: 300;
  font-size: 1.5em;
  color: #fc76a2;
  margin: 0;
  text-align: center;
  text-transform: uppercase;
}

h2 {
  font-size: 1.3em;
  color: white;
  margin: 0 0 40px 0;
  text-align: center;
}

.container {
  z-index: 10;
  position: relative;
  width: 100%;
  max-width: 600px;
  padding: 10px auto;
  border-radius: 0;
  margin-bottom: 2em;
}

img.btn {
  display: block;
  margin: 0 auto;
  max-width: 250px;
}

.croppa-wrap {
  margin-bottom: 50px;
}

.zingR {
  font-family: ZingRust;
}
</style>
