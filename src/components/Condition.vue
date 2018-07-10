<template lang='pug'>
div#wrapper
  h1.title condition
  ol
    li.subtitle การตัดสินของกรรมการ ถือเป็นที่สิ้นสุด
    li.subtitle อาหารที่จัดเตรียม จะถูกจัดเตรียมโดยอิสลาม
    li.subtitle ข้อมูลของนิสิตจะถูกเก็บเป็นความลับ
  button#accept.button.is-warning(@click='$emit("accept-condition")')
    strong accept
</template>

<script>
export default {
  data() {
    return {
    }
  }
}
</script>

<style lang='stylus' scoped>
  #wrapper
    max-width 500px
    margin 2em auto
    padding 1em 2em
    background-color #222
    border-radius 25px 0 25px 0
    border-color #f00
    border-top-width 50px
  h1, li
    color white
  ol
    margin-left 2em
  li
    font-size 15px
    margin-bottom: 1rem

  #accept
    width 100%
    border-radius 15px 0 15px 0
</style>
