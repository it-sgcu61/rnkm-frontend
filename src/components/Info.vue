<template lang='pug'>
div#body-wrapper
  div.section.has-text-centered
    img(style='max-width: 80vmin' src='../theme/material/logo_1.png')
  div.section.has-text-centered
    h2 ก้าวออกมาจากขีดจำกัดแบบเดิมๆ แล้วมา beyond
    h2 ในแบบที่ตัวเองเป็นพร้อมกันในงานรับน้องก้าวใหม่
    h1.is-size-1 102 TO BE YOU TO BEYOND
  div.section
    h1 การรับน้องก้าวใหม่คืออะไร?
    p   การรับน้องก้าวใหม่ คือ กิจกรรมที่จุฬาลงกรมหาวิทยาลัย จัดขึ้นเพื่อต้อนรับ
      | และเสริมสร้างความสัมพันธ์ของนิสิตจากหลากหลายคณะและชั้นปีให้ลึกซึ่งมากยิ่งขึ้น
      | โดยแต่ละบ้านจะมีรูปแบบกิจกรรมซึ่งแตกต่างกันออกไปซึ้งเป็นเอกลักษณ์ของแต่ละบ้าน
  div.section.columns.is-multiline
    div.column.is-half(v-for='o in itmlist')
      template(v-if='"img" in o')
        img(:src='o.img')
      template(v-else)
        h2 {{o.h}}
        p  {{o.p}}

  div.section
    div.container
      h1 ปฏิทินกิจกรรม CU102
      ul
        li
          div.level
            div.level-left  ถวายสัต
            div.level-right 2 สิงหาคม
        li
          div.level
            div.level-left  รับน้องก้าวใหม่
            div.level-right  3-5 สิงหาคม
        li
          div.level
            div.level-left  เปิดภาคการศึกษา
            div.level-right  14 สิงหาคม
        li
          div.level
            div.level-left  รอ PR มาช่วยคิด
            div.level-right  วันนี้
  div.section.has-text-centered
      img.next(src='../theme/material/Next.png' @click='$router.push("/house")')

</template>

<script>
export default {
  data() {
    return {
      content: [
        {h: "To be KNOWN\n(กิจกรรมหอประชุม)",  p: "รู้จักจุฬาให้มากยิ่งขึ้น ผ่านบทละครที่เรียบเรียงอยางปราณีต และการแสดงที่ตราตรึงใจ"},
        {h: "To be JOYFUL\n(freshy night)", p: "พบโชว์สุดพิเศษจากศิลปินชื่อดัง ที่จะมาทำให้น้องได้ปลดปล่อยความมันสุดขั้ว"},
        {h: "To be KIND\n(กิจกรรมบำเพ็ญประโยชน์)",   p: "กิจกรรมเบาๆ ที่จะทำให้น้องๆได้ใช้เวลาอยู่กับเพื่อนใหม่ และสร้างความทรงจำที่มีคุณค่าร่วมกัน"},
        {h: "To be PROUND\n(กิจกรรมรับขวัญน้องใหม่)", p: "ต้อนรับนิสิตใหม่ ภายใต้รั้วจามจุรี พร้อมแขกรับเชิญสุด exclusive ที่จะมาแชร์ประสบการแบบที่หาฟังที่ไหนไม่ได้"},
        {img: 'http://static.trueplookpanya.com/tppy/member/m_525000_527500/525016/cms/images/%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%99%E0%B9%89%E0%B8%AD%E0%B8%87%E0%B8%81%E0%B9%89%E0%B8%B2%E0%B8%A7%E0%B9%83%E0%B8%AB%E0%B8%A1%E0%B9%88%20(8).png'},
        {img: 'http://static.trueplookpanya.com/tppy/member/m_525000_527500/525016/cms/images/%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%99%E0%B9%89%E0%B8%AD%E0%B8%87%E0%B8%81%E0%B9%89%E0%B8%B2%E0%B8%A7%E0%B9%83%E0%B8%AB%E0%B8%A1%E0%B9%88%20(5).png'},
        {img: 'http://p3.isanook.com/ca/0/rp/rc/w620h0/ya0xa0m1/aHR0cDovL3AzLmlzYW5vb2suY29tL2NhLzAvdWkvMjczLzEzNjg2NzEvNDZhNmJhMWNlYTg4ZTdkYmJhMDA3ZDYwMTM4NDVjMGJfMTM2OTAzODEwMi5qcGc=.jpg'},
        {img: 'https://blog.eduzones.com/images/blog/rubnongkaomai2559/20160627-1467040587.7249-0.jpg'},
      ]
    }
  },
  computed: {
    itmlist() {
      let ordlist =
        screen.width > 800
          ? [0, 4, 5, 1, 2, 6, 7, 3]
          : [0, 4, 1, 5, 2, 6, 3, 7];
      return ordlist.map(x => this.content[x]);
    }
  }
}
</script>

<style lang='stylus' scoped>
  #body-wrapper
    padding 3rem 1rem
    max-width 800px
    margin 0 auto auto
  .section
    background-color #020202
    font-family Superspace
    padding 3rem 1rem
  a
    color white
  h1, h2, p, strong, .title, .subtitle
    color white
    white-space pre-wrap
  h1
    font-size 2.5rem
    font-weight bold
  h2
    font-size 2rem
    font-weight bold
  h3
    font-size 1.5rem
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
</style>
