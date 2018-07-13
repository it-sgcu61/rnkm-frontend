<template lang='pug'>
  div#wrapper

    div#head
      div.is-block
        h1.is-size-3.bold.is-inline {{ lang == "TH" ? "ข้อตกลงและเงื่อนไข" : "Term and Condition"}}
        div.flag-grp
          div.flag.th(@click='set_lang("TH")')
            img.chk(v-show='lang == "TH"' src="../theme/material/checked.png" alt='TH language')
          div.flag.en(@click='set_lang("EN")')
            img.chk(v-show='lang == "EN"' src="../theme/material/checked.png" alt='EN language')
      span.warning.is-block ** For international student please select EN **

    div.section
      ol(v-show='lang == "TH"')
        li ระบบจะทำการ "สุ่ม" บ้านที่น้องๆ เลือกมา และลำดับในการเลือกจะมีผลต่อการสุ่ม
        li อาหารทั้งหมดถูกจัดเตรียมให้นิสิตทุกศาสนาสามารถรับประทานได้
        li กิจกรรมรับน้องก้าวใหม่ ไม่มีนโยบายให้ค้างคืนระหว่างทำกิจกรรม
        li ข้อมูลของน้องๆ ทุกคนที่เข้าร่วมกิจกรรมจะถูกเก็บเป็นความลับ
      // ol(v-show='lang == "TH"')
      //   li ท่านต้องลงทะเบียนโดยให้ข้อมูลที่ถูกต้องครบถ้วนสมบูรณ์และเป็นความจริงในปัจจุบัน หากข้อมูลที่ให้ไว้ ไม่เป็นความจริง ทางคณะกรรมการมีสิทธิ์ในการระงับการให้บริการกับท่านทันที
      //   li ห้ามผู้ใช้บริการกระทำการไม่เหมาะสม ไม่ถูกต้องตามกฎหมาย หรือขัดต่อศีลธรรมอันดีของประชาชน หรือมีเหตุอันควรเชื่อได้ว่า ผู้ใช้บริการอาจเข้าใช้เว็บไซต์โดยมีเจตนาทุจริต
      //   li ผู้ใช้บริการเข้าใจและยอมรับว่าการใช้บริการทางอินเตอร์เน็ตนี้ อาจก่อให้เกิดความเสียหายขึ้นได้โดยตรงหรืออ้อม จากความชำรุดบกพร่อง หรือขัดข้องของอุปกรณ์ใดๆ ระบบข้อมูลหรือการเชื่อมโยงเครือข่าย การสูญหายของข้อมูลระหว่างการรับส่งหรือสิ่งอื่นใด ที่อยู่เหนือการควบคุมของผู้ให้บริการ และผู้ใช้บริการตกลงที่จะไม่เรียกร้องค่าเสียหายใดๆกับผู้ให้บริการ
      //   li หากผู้ใช้บริการไม่ปฏิบัติตามข้อกำหนดและเงื่อนไขตามคำขอใช้บริการฉบับนี้ข้อใดข้อหนึ่งผู้ให้บริการสามารถยกเลิกการให้บริการกับท่านได้ทันที โดยไม่ต้องแจ้งล่วงหน้า
      //   li คณะกรรมการขอสงวนสิทธิ์ที่จะเปลี่ยนแปลงแก้ไขข้อตกลงและเงื่อนไขดังกล่าวข้างต้นตามแต่จะเห็นสมควรโดยมิต้องแจ้งให้ทราบล่วงหน้า
      ol(v-show='lang == "EN"')
        li The system will " randomly " select Baan Rub Nong of your chioce for you and the orders of your choices will affect the random selection of the system.
        li All the meals in this activity will be Halal Food.
        li All your information will be kept confidential.

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

  * {
    font-sizr = '16px'
  }

  #wrapper
    color: white
    overflow wrap
    max-width 500px
    margin 2em auto
    margin-bottom 9em
    padding 1em 2em
    background-color #101020
    border-radius 25px 0 25px 0
    border-color #f00
    border-top-width 50px


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

  li
    font-size 16px

  .button
    &.accept
      width 100%
      border-radius 15px 0 15px 0
      margin 10px auto
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
