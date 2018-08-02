<template lang='pug'>
  div#wrapper

    // HEADER
    div#head
      div.is-block
        h1.is-size-3.bold.is-inline กฎกติกาการย้ายบ้าน

    // BODY
    div.section
      ol
        li นิสิตต้องทำการเข้าสู่ระบบด้วยหมายเลขบัตรประชาชน และ หมายเลขโทรศัพท์ ที่ได้ลงทะเบียนไว้
        li(style='color:red;') *** ในกรณีที่ข้อมูลเข้าสู่ระบบ (เลขบัตรประชาชน และ หมายเลขโทรศัพท์) ที่นิสิตได้ลงไว้กับระบบผิดพลาด ขอสงวนสิทธิ์ไม่อนุญาตให้แก้ไขข้อมูล ไม่ว่ากรณีใดๆ
        li เมื่อนิสิตเข้าระบบแล้ว นิสิตสามารถทำการย้ายบ้านได้ ภายในช่วงเวลา 10:00 - 11:00 น. หรือ 11:30 - 12:30 น. เท่านั้น <br/>หมายเหตุ: นิสิต 1 คนสามารถยืนยันการย้ายบ้านได้เพียง 1 ครั้งเท่านั้น
        li ในช่วงเวลาดังกล่าวที่อนุญาตให้ย้ายบ้านได้นั้น นิสิตสามารถย้ายไปยังบ้านอื่นๆได้เรื่อยๆ ด้วยการคลิกรูปบ้านที่ประสงค์จะเข้า จนกว่าจะกดยืนยัน หรือหมดเวลาการย้ายบ้าน
        li ในกรณีมิได้ยืนยันการย้าย ก่อนหมดเขตย้ายบ้าน ระบบจะจัดให้บ้านของคุณคือบ้านสุดท้ายที่คุณได้เลือกไว้ (ยึดข้อมูลในระบบเซิร์ฟเวอร์เป็นสำคัญ)

    // NAVIGATE
    div#foot
      button.button.accept.is-warning(@click='acceptedCondition')
        strong Accept

</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    acceptedCondition(){
      this.$emit("accept-condition", this.lang)
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
    margin-bottom 5em
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
