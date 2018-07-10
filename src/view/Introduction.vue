<template lang='pug'>
  div
    absolute-background(top)
      div
        img.big-logo(src='@/theme/material/Introduction.png')
    div
      div.section.info
        h1 บ้านรับน้องคืออะไร
        p บ้านรับน้อง คือ การรวมตัวของพี่ ๆ จากหลายคณะเพื่อจัดกิจกรรมให้เฟรชชี่ได้มารวมตัวกัน โดยน้องๆ สามารถเลือกบ้านรับน้องได้ 3 อันดับเรียงตามความชอบ แล้วระบบจะสุ่มบ้านให้ตามลำดับที่น้อง ๆ เลือก ใครมาเป็นกลุ่มก็ไม่ต้องกลัว เพราะระบบจะสุ่มน้องไปเป็นกลุ่ม หรือถ้าใครที่มาคนเดียวก็ไม่ต้องเหงา น้องจะมีเจอเพื่อนใหม่ได้อย่างแน่นอน
        // p การเลือกบ้านก็เลือกตามความสนใจ อาจจะชอบสไตล์ของบ้านนี้จากการดูในเพจของบ้านหรือจากภายในเว็ปไซต์นี้ได้ ที่มีมากมาย หาไม่ยากเลย รายละเอียดกิจกรรม และการรับน้องก้าวใหม่จัดทั้งหมด 3 วัน โดยในแต่ละวันจะแยกตามบ้าน มีกิจกรรมสนุก ๆ จัดเต็มให้น้อง ๆ แล้วก็มีกิจกรรมที่ทำร่วมกันเป็นเมือง น้องๆ ก็ได้เจอเพื่อนเพิ่มไปอีก
    div
      div.section
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
    &.info
      font-size 28px
      max-width 800px

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
