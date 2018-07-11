<template lang='pug'>
  div
    div.wrapper
      // <p align="middle"> Choose your language:
      img(@click='set_lang("TH")' :src="lang=='TH'?require('@/theme/material/checked.png'):require('@/theme/material/TH-LANG.png')" alt='TH language' :style='`height:40px; width:80px;background-size: contain;background-image:${lang=="TH"?`url(${require("@/theme/material/TH-LANG.png")})`:"none"}; margin-left:5px`')
      img(@click='set_lang("EN")' :src="lang=='EN'?require('@/theme/material/checked.png'):require('@/theme/material/EN-LANG.png')" alt='EN language' :style='`height:40px; width:80px;background-size: contain;background-image:${lang=="EN"?`url(${require("@/theme/material/EN-LANG.png")})`:"none"}; margin-left:5px`')
      // </p>
      div.warning.has-text-centered(style="margin-top:10px")
        span ** ระบบภาษาอังกฤษ สำหรับนิสิตต่างชาติเท่านั้น **
      h1.title Term and Condition | ข้อตกลงและเงื่อนไข
      ol
        li.subtitle ระบบจะทำการ "สุ่ม" บ้านที่น้องๆ เลือกมา และลำดับในการเลือกจะมีผลต่อการสุ่ม
        li.subtitle อาหารในกิจกรรมทั้งหมดจะเป็นฮาลาล
        li.subtitle ข้อมูลของน้องๆ ทุกคนที่เข้าร่วมกิจกรรมจะถูกเก็บเป็นความลับ
      ol
        li.subtitle The system will " randomly " select  Baan Rub Nong of your chioce for you and the orders of your choices will affect the random selection of the system.
        li.subtitle All the meals in this activity will be Halal Food.
        li.subtitle All your information will be kept confidential.
      button.button.accept(@click='acceptedCondition' :class="buttonClass")
        strong {{buttonVal}}

</template>

<script>
export default {
  data() {
    return {
      lang: "TH",
      buttonClass:"is-warning",
      buttonVal:"choose your language first.",
    }
  },
  methods: {
    set_lang(lang){
      this.lang=lang
      // this.buttonClass="is-success"
      this.buttonVal="accept"
    },
    acceptedCondition(){
      if(this.lang == ""){
        this.buttonClass="is-warning"
        this.buttonVal="choose your language first."
      }else{
        this.$emit("accept-condition",this.lang)
      }
    }
  }
}
</script>

<style lang='stylus' scoped>

  $yellow = rgb(253, 211, 72)
  $green  = rgb( 72, 211, 72)
  $red    = rgb(211,  72, 72)

  #wrapper
    overflow hidden
    max-width 500px
    margin 2em auto
    padding 1em 2em
    background-color #222
    border-radius 25px 0 25px 0
    border-color #f00
    border-top-width 50px
    &.clear
      padding 0

  #head
    text-align center
    margin-top 10px

    .title
      font-size: calc(1.3rem + 50%);
    .flag-grp
      display inline-block
      margin 5px
      .flag
        height 30px
        width  55px
        margin 0 0 0 4px
        background-size 100% 100%
        background-repeat no-repeat;
        border-radius 5px
        text-align center
        display inline-block
        &.th
          background-image: url("../theme/material/TH-LANG.png")
        &.en
          background-image: url("../theme/material/EN-LANG.png")

        img.chk
          height 30px
          width  30px
          margin 0
          padding 0


  .wrap-radio
    padding-top .5em
    float right

  h1, li
    color white
  ol
    margin 3em 2em
  li
    font-size 15px
    margin-bottom: 1rem

  .button
    &.accept
      width 100%
      border-radius 15px 0 15px 0
      &.is-warning:hover
        background-color $yellow

  .lang
    padding 20px
    font-size 20px
    font-weight bold

  .is-success,
  .lang:hover
    cursor: pointer
    background-color $green

  .warning
    color: $red
</style>
