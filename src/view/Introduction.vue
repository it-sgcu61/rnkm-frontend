<template lang='pug'>
  div
    absolute-background(top)
      div
        img.big-logo(src='@/theme/material/Introduction.png')
    div.section.info
      h1 บ้านรับน้องคืออะไร
      p บ้านรับน้อง คือ การรวมตัวของพี่ ๆ จากหลายคณะเพื่อจัดกิจกรรมให้เฟรชชี่ได้มารวมตัวกัน โดยน้องๆ สามารถเลือกบ้านรับน้องได้ 3 อันดับเรียงตามความชอบ แล้วระบบจะสุ่มบ้านให้ตามลำดับที่น้อง ๆ เลือก ใครมาเป็นกลุ่มก็ไม่ต้องกลัว เพราะระบบจะสุ่มน้องไปเป็นกลุ่ม หรือถ้าใครที่มาคนเดียวก็ไม่ต้องเหงา น้องจะมีเจอเพื่อนใหม่ได้อย่างแน่นอน
    house-preview
    absolute-background(bot)
</template>

<script>
  import HousePreview from '@/components/HousePreview.vue'
  import AbsoluteBackground from '@/components/AbsoluteBackground.vue'
  export default {
    components: {HousePreview, AbsoluteBackground},
  }

</script>

<style lang='stylus' scoped>
  .section
    margin 0 auto
    font-family Superspace
    background-color #020202
    &.info
      font-size 24px
      max-width 900px
      @media screen and (min-width: 600px)
        font-size 27px
        padding 100px 100px
        // color red
      @media screen and (min-width: 1000px)
        font-size 30px
        padding 150px 70px
        // color blue


  .big-logo
    position: relative;
    padding: 10px;
    min-width: 280px;
    max-width: 90vw;
    max-height: 70vh;
    filter: drop-shadow(20px 10px 12px #222f)
    @media screen and (orientation: landscape)
      margin-top: calc(-70px + 20vh - 1vw)
    @media screen and (orientation: portrait)
      margin-top: calc(-120px + 37vh - 5vw)
</style>
