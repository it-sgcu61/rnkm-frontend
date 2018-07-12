<template lang='pug'>
  div
    absolute-background(top)
      div
        img.big-logo(src='@/theme/material/Introduction.png')
    div.section.info
      h2 บ้านรับน้องคืออะไร
      <p> บ้านรับน้อง คือ กลุ่มนิสิตจากหลากหลายคณะและชั้นปี
      | ที่ต้องการจะถ่ายทอดความรู้สึกดีๆ และสร้างสรรค์กิจกรรมในการรับน้อง
      </p>
    house-preview
    div.has-text-centered
      img.spon(src='../theme/material/cunex.jpg')
      img.spon(src='../theme/material/zero_waste.png')
    absolute-background(bot)
</template>

<script>
import HousePreview from "@/components/HousePreview.vue";
import AbsoluteBackground from "@/components/AbsoluteBackground.vue";
export default {
  components: { HousePreview, AbsoluteBackground }
};
</script>

<style lang='stylus' scoped>
.section
  margin: 0 auto;
  font-family: Superspace;
  background-color: #020202;

  &.info
    h2
      font-size: calc(2em)
      margin-bottom .7em
    p
      font-size: 1.5em;

    max-width: 900px;

    @media screen and (min-width: 600px)
      padding: 80px 100px;

    @media screen and (min-width: 1000px)
      padding: 130px 70px;



.big-logo
  position: relative;
  padding: 10px;
  min-width: 280px;
  max-width: 90vw;
  max-height: 70vh;
  filter: drop-shadow(20px 10px 12px #222f);

  @media screen and (orientation: landscape)
    margin-top: calc(-70px + 20vh - 1vw);

  @media screen and (orientation: portrait)
    margin-top: calc(-120px + 37vh - 5vw);

.spon
  max-width 30vw
  margin 0 auto
</style>
