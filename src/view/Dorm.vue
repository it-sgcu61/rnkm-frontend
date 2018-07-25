<template lang='pug'>
div.cu
  // absolute-background(top)
  div.container
    h1.is-size-2 รายละเอียดการนอนหอพักจุฬา
    ol
      li หอพักเป็นห้องนอนรวม โดยจะแยกเป็นหอพักชายและหอพักหญิง
      li สำหรับห้องอาบน้ำหอพักหญิง หากจะใช้จะต้องเดินข้ามไปอีกตึกหนึ่ง
      li ห้องอาบน้ำไม่มีเครื่องทำน้ำอุ่นบริการ
      li หอพักไม่มีเครื่องปรับอากาศ
      li นิสิตใหม่ที่ได้ทำการยืนยันเป็นนิสิตหอพักจุฬาลงกรณ์มหาวิทยาลัยเรียบร้อยแล้ว ห้ามยืนยันยันสิทธิ์การนอนหอพักในงานรับน้องก้าวใหม่ โดยการยืนยันสิทธิ์ในการนอนหอพักในงานรับน้องก้าวใหม่ พี่บ้านจะติดต่อกลับไปในภายหลัง
  br
  div.container.is-size-3(align='center') หอพักหญิง
   div.is-size-6 โถงอเนกประสงค์ & ห้องประชุม 1 <br>
      img(src='../theme/dorm/โถงอเนก/1.jpg')
      img(src='../theme/dorm/ห้องประชุม1/1.jpg')
      img(src='../theme/dorm/ห้องประชุม1/2.jpg')

  div.container.is-size-3(align='center') ห้องอาบน้ำหอพักหญิง
    div.is-size-6 (หากจะใช้ต้องเดินข้ามไปอีกตึก) <br>
      img(src='../theme/dorm/ห้องน้ำพุดซ้อน/1.jpg')
      img(src='../theme/dorm/ห้องน้ำพุดซ้อน/2.jpg')
      img(src='../theme/dorm/ห้องน้ำพุดซ้อน/3.jpg')
      img(src='../theme/dorm/ห้องน้ำพุดซ้อน/4.jpg')
      img(src='../theme/dorm/ห้องน้ำพุดซ้อน/5.jpg')

  div.container.is-size-3(align='center') หอพักชาย & ห้องอาบ
    div.is-size-6 (ตึกพุดตาน) <br>
    img(src='../theme/dorm/พุดตาน/1.jpg')
    img(src='../theme/dorm/พุดตาน/2.jpg')
    img(src='../theme/dorm/พุดตาน/3.jpg')

  div(align='center')
    br
    span(@click='$router.push("/announce")'): img.back(src='../theme/material/back_btn.png')

  absolute-background(bot)
</template>

<script>
import AbsoluteBackground from '@/components/AbsoluteBackground.vue'
export default {
  components: {AbsoluteBackground},
}
</script>

<style lang='stylus'>
.container {
  max-width: 500px;
  font-size: 1.5em;
  margin-top: 30px;
}
img
  width: 40%
  max-width 200px
  margin 5px
  border-radius 6px
</style>
