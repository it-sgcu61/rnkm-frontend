<template lang='pug'>
  div
    div#wrapper

      div#head
        div.is-block
          h1.title.is-inline {{ lang == "TH" ? "ข้อตกลงและเงื่อนไข" : "Term and Condition"}}
          div.flag-grp
            div.flag.th(@click='set_lang("TH")')
              img.chk(v-show='lang == "TH"' src="../theme/material/checked.png" alt='TH language')
            div.flag.en(@click='set_lang("EN")')
              img.chk(v-show='lang == "EN"' src="../theme/material/checked.png" alt='EN language')
        span.warning.is-block ** For international student please select EN **

      div#body
        ol(v-show='lang == "TH"')
          li.subtitle ระบบจะทำการ "สุ่ม" บ้านที่น้องๆ เลือกมา และลำดับในการเลือกจะมีผลต่อการสุ่ม
          // li.subtitle อาหารในกิจกรรมทั้งหมดจะเป็นฮาลาล
          li.subtitle อาหารทั้งหมดถูกจัดเตรียมให้นิสิตทุกศาสนาสามารถรับประทานได้
          li.subtitle กิจกรรมรับน้องก้าวใหม่ ไม่มีนโยบายให้ค้างคืนระหว่างทำกิจกรรม
          li.subtitle ข้อมูลของน้องๆ ทุกคนที่เข้าร่วมกิจกรรมจะถูกเก็บเป็นความลับ
        ol(v-show='lang == "EN"')
          li.subtitle The system will " randomly " select Baan Rub Nong of your chioce for you and the orders of your choices will affect the random selection of the system.
          li.subtitle All the meals in this activity will be Halal Food.
          li.subtitle All your information will be kept confidential.

      div#foot
        button.button.accept.is-warning(@click='acceptedCondition')
          strong accept

</template>

<script>
export default {
  data() {
    return {
      lang: "TH",
      buttonClass:"is-warning",
      buttonVal:"please choose your language.",
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
        this.buttonVal="please choose your language."
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
    margin-bottom 9em
    padding 1em 2em
    background-color #222
    border-radius 25px 0 25px 0
    border-color #f00
    border-top-width 50px
    &.clear
      padding 0

  ol
    counter-reset: myCounter;

  li
    display: flex;
    list-style: none;
    counter-increment: step-counter;


  ol li:before
    content: counter(step-counter);
    color: white;
    background: #ff5100;
    display: inline-block;
    text-align: center;
    margin: 5px 10px 5px 0;
    line-height: 30px;
    min-width: 30px;
    height: 30px;
    border-radius: 50%;

  li
    display: flex;
    div
      margin-top: 0px;


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
    margin 3em 0em
  li
    font-size 13px
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
