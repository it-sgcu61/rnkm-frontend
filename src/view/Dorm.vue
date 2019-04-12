<template lang='pug'>
div(style='padding-top: 50px')
  // absolute-background(top)
  div.container.dorm
    h1.is-size-2(style='font-weight: bold') รายละเอียดการนอนหอพักจุฬา
    br
    ol
      li(style='margin-top:20px;') หอพักเป็นห้องนอนรวม โดยจะแยกเป็นหอพักชายและหอพักหญิง
      li(style='margin-top:20px;') สำหรับห้องอาบน้ำหอพักหญิง หากจะใช้จะต้องเดินข้ามไปอีกตึกหนึ่ง
      li(style='margin-top:20px;') ห้องอาบน้ำไม่มีเครื่องทำน้ำอุ่นบริการ
      li(style='margin-top:20px;') หอพักไม่มีเครื่องปรับอากาศ
      li(style='margin-top:20px;') นิสิตใหม่ที่ได้ทำการยืนยันเป็นนิสิตหอพักจุฬาลงกรณ์มหาวิทยาลัยเรียบร้อยแล้ว ห้ามยืนยันยันสิทธิ์การนอนหอพักในงานรับน้องก้าวใหม่ โดยการยืนยันสิทธิ์ในการนอนหอพักในงานรับน้องก้าวใหม่ พี่บ้านจะติดต่อกลับไปในภายหลัง
  br
  div.container.is-size-3(align='center') หอพักหญิง
   div.is-size-5 โถงอเนกประสงค์ & ห้องประชุม 1 <br>
      img.dorm(src='../theme/dorm/โถงอเนก/1.jpg')
      img.dorm(src='../theme/dorm/ห้องประชุม1/1.jpg')
      img.dorm(src='../theme/dorm/ห้องประชุม1/2.jpg')

  div.container.is-size-3(align='center') ห้องอาบน้ำหอพักหญิง
    div.is-size-5 (หากจะใช้ต้องเดินข้ามไปอีกตึก) <br>
      img.dorm(src='../theme/dorm/ห้องน้ำพุดซ้อน/1.jpg')
      img.dorm(src='../theme/dorm/ห้องน้ำพุดซ้อน/2.jpg')
      img.dorm(src='../theme/dorm/ห้องน้ำพุดซ้อน/3.jpg')
      img.dorm(src='../theme/dorm/ห้องน้ำพุดซ้อน/4.jpg')
      img.dorm(src='../theme/dorm/ห้องน้ำพุดซ้อน/5.jpg')

  div.container.is-size-3(align='center') หอพักชาย
    div.is-size-5 (ตึกพุดตาน) <br>
    img.dorm(src='../theme/dorm/พุดตาน/1.jpg')
    img.dorm(src='../theme/dorm/พุดตาน/2.jpg')
    img.dorm(src='../theme/dorm/พุดตาน/3.jpg')

  div(align='center' style='margin-top: 5em')
    span(@click='$router.push("/announce")'): img.back(src='../theme/material/back_btn.png')

  absolute-background(bot)
</template>

<script>
import AbsoluteBackground from "@/components/AbsoluteBackground.vue";
export default {
  components: { AbsoluteBackground }
};
</script>

<style lang='stylus' scoped>
.container.dorm {
  max-width: 650px;
  font-size: 1.5em;
}

img.dorm {
  width: 40%;
  max-width: 200px;
  margin: 5px;
  border-radius: 6px;
}
</style>
