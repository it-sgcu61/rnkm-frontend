<template lang='pug'>
  div.tcenter
    absolute-background(top :src='require("../theme/heading/Baan_text.png")' :src2='require("../theme/heading/Baan_Frame.png")')
    div.section.content
      p.is-size-3.bold บ้านรับน้องคืออะไร
      p.is-size-5
        | บ้านรับน้อง คือ กลุ่มนิสิตจากหลากหลายคณะและชั้นปีที่ต้องการจะ
        | ถ่ายทอดความรู้สึกดีๆ และสร้างสรรค์กิจกรรมในการรับน้อง
    house-preview(@click='house => $router.push(`/baan/${house.nameURL}`)')
      template(slot='head')
        p.is-size-3.bold รายชื่อบ้านรับน้อง
    rnkm-sponsor
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
</style>
