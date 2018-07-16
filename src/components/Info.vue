<template lang='pug'>
div#body-wrapper

  // PROLOGUE
  div.section.has-text-centered
    h2 ก้าวออกมาจากขีดจำกัดแบบเดิมๆ แล้วมา beyond
    h2 ในแบบที่ตัวเองเป็นพร้อมกันในงานรับน้องก้าวใหม่
    br
    h1.is-size-1 102 TO BE YOU TO BEYOND
  div.section.has-text-centered
    h1.is-size-1 พบกัน 4-6 สิงหาคม 2018
    h3 ณ ประตูใหญ่ สระน้ำ จุฬาลงกรณ์มหาวิทยาลัย
  div.tab

  // INTRO
  div.section
    h2 การรับน้องก้าวใหม่คืออะไร?
    br
    p การรับน้องก้าวใหม่ คือ กิจกรรมที่จุฬาลงกรณ์มหาวิทยาลัย จัดขึ้นเพื่อต้อนรับ และเสริมสร้างความสัมพันธ์ของนิสิตจากหลากหลายคณะและชั้นปีให้ลึกซึ้งมากยิ่งขึ้น โดยแต่ละบ้านจะมีรูปแบบกิจกรรมซึ่งแตกต่างกันออกไปซึ่งเป็นเอกลักษณ์ของแต่ละบ้าน
  div.tab

  // EVENT
  div.section.columns.is-multiline.is-tablet(:class='force_mobile')
    div.column.is-half(v-for='o in itmlist')
      div.tcenter(v-if='o.img')
        img(style='min-width: 60%' :src='require(`@/theme/photography/${o.img}.jpg`)')
      div(v-else)
        h3 {{o.h}}
        h4.regular {{o.s}}
        br
        p {{o.p}}
  div.tab

  // SCHEDUAL
  div.section.tcenter
      div
        h1 ปฏิทินกิจกรรม CU102
        br
      div.columns.is-mobile(v-for='o in schedule')
        div.column.is-half
          h3.is-pulled-right {{o.l}}
        div.column.is-half
          p.is-pulled-left {{o.r}}
  div.tab

  // NAVIGATE
  div.section.tcenter
    router-link(to='baan')
      img.next(src='@/theme/material/next_btn.png')

</template>

<script>
export default {
  data() {
    return {
      content: [
        {h: "To be KNOWN", s: "กิจกรรมหอประชุม", p: "รู้จักจุฬาฯให้มากยิ่งขึ้น ผ่านบทละครที่เรียบเรียงอย่างปราณีต และการแสดงที่ตราตรึงใจ"},
        {h: "To be JOYFUL", s: "Freshy Night", p: "พบโชว์สุดพิเศษจากศิลปินชื่อดัง ที่จะมาทำให้น้องได้ปลดปล่อยความมันสุดขั้ว"},
        {h: "To be KIND", s: "กิจกรรมบำเพ็ญประโยชน์", p: "กิจกรรมที่เปิดโอกาสให้น้องๆ ได้ทำประโยชน์เพื่อส่วนรวมร่วมกัน"},
        {h: "To be PROUD", s: "กิจกรรมรับขวัญน้องใหม่", p: "ต้อนรับนิสิตใหม่ ภายใต้รั้วจามจุรี พร้อมแขกรับเชิญสุด exclusive ที่จะมาแชร์ประสบการณ์แบบที่หาฟังที่ไหนไม่ได้"},
        {img: 'DSC0293'},
        {img: 'NIN9738'},
        {img: 'Rubnong6005'},
        {img: 'MEM5846'},
      ],
      schedule: [
        {l: "ลงทะเบียนบ้าน", r: "15-20 กรกฎาคม"},
        {l: "ประกาศผลบ้าน", r: "25 กรกฎาคม"},
        {l: "ถวายสัตย์", r: "3 สิงหาคม"},
        {l: "รับน้องก้าวใหม่", r: "4-6 สิงหาคม"},
        {l: "เปิดภาคการศึกษา", r: "14 สิงหาคม"}
      ],
      itmlist: [],
      force_mobile: {}
    }
  },
  mounted() {
    let ordlist =
      screen.width > 550
        ? [0, 4, 5, 1, 2, 6, 7, 3]
        : [0, 4, 1, 5, 2, 6, 3, 7];
    this.itmlist = ordlist.map(x => this.content[x]);
    this.force_mobile = {"is-mobile": screen.width > 550}
  }
}
</script>

<style lang='stylus' scoped>

  .regular {
    font-weight: normal;
  }
  .is-size-0
    font-size 3.5rem
  .container
    width 100%
  #body-wrapper
    padding 3rem 1rem
    max-width 800px
    margin 0 auto auto
  .section
    background-color transparentify
    font-family Superspace
    padding 3rem 1rem
  a
    color white
  h1, h2, p, strong, .title, .subtitle
    color white
    white-space pre-wrap
  h1
    font-size 2.5em
    font-weight bold
    margin-bottom 1rem
  h2
    font-size 2em
    font-weight bold
  h3
    font-size 1.5em
    font-weight bold

  p
    font-size 1.4rem
    font-weight regular

  .next
    max-width 180px
    cursor pointer
  img
    border-radius 15px
  .level
    font-size 1.7rem

  .tab
    height 3rem
</style>
