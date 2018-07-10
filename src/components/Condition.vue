<template lang='pug'>
div
  div.wrapper
    h1.title term and condition
    ol
      li.subtitle การตัดสินของกรรมการ ถือเป็นที่สิ้นสุด
      li.subtitle อาหารที่จัดเตรียม จะถูกจัดเตรียมโดยอิสลาม
      li.subtitle ข้อมูลของนิสิตจะถูกเก็บเป็นความลับ
    ol
      li.subtitle judge .... . ... . .
      li.subtitle food is provide by ....
      li.subtitle this information will be secret
    button.button.accept(@click='accept = !accept' :class='accept_class')
      strong {{accept_text}}
  div(v-if='accept')
    div.wrapper.clear.columns.is-mobile
      div.column.has-text-centered.lang(@click='$emit("accept", "TH")') TH
      div.column.has-text-centered.lang(@click='$emit("accept", "EN")') EN
    div.warning.has-text-centered
      span **ฟอร์มภาษาอังกฤษ สำหรับนิสิตต่างชาติเท่านั้น

</template>

<script>
export default {
  data() {
    return {
      accept: false
    }
  },
  computed: {
    accept_text() {
      return this.accept ? "cancel" : "accept"
    },
    accept_class() {
      return {'is-warning': !this.accept, 'is-success': this.accept}
    }
  }
}
</script>

<style lang='stylus' scoped>

  $yellow = rgb(253, 211, 72)
  $green  = rgb( 72, 211, 72)
  $red    = rgb(211,  72, 72)

  .wrapper
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
