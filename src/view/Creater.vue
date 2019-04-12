<template lang='pug'>
div
    rnkm-nav
    br
    br
    section.section
      .container(align='center')
        .content.has-text-white(style='max-width: 500px' align='left')
          h1 History
          p.indent ตอนแรกก็งงๆอยู่ว่าเรามาอยู่ทำตรงนี้ได้ยังไงกันแน่ เพราะก่อนหน้านี้ก็ไม่เคยเขียนเว็ปอะไรพวกนี้มาก่อนเลย และโปรเจคแรกที่ทำก็เป็น รับน้องก้าวใหม่ CU102 ก็ดูจะเป็นที่คาดหวังของน้องๆทุกคนมาก แต่ก็สบายใจขึ้นเพราะได้เพื่อนๆเก่งๆอีกหลายคนได้มาช่วยกันลงวังวนนี้ ไม่ว่าจะเป็น ไทเกอร์ที่มีประสบการณ์การทำเว็ปมาก่อนแล้วมาช่วยเป็นติวเตอร์ส่วนตัวให้ มีโรจที่ทำฝั่ง backend ที่ดูมีการโยง stack ไปมาเยอะมากๆเลย ภูมิที่มาค่อยเป็น support ช่วยทางเทคนิคหลายๆอย่าง และนะโมที่ค่อยช่วยดูแลในส่วนของสตาร์ฟงานเป็นอย่างดี สุดท้ายนี้แม้จะมีความผิดพลาดบ้าง แต่ว่าเราก็ผ่านมาได้แล้ว ก็อยากจะขอบคุณอีกครั้งที่ทำให้เราได้มีความทรงจำที่น่าจดจำในครั้งนี้ด้วยนะครับ
          p.indent ถ้าปีหน้าอยากลองพัฒนาตัวเองดูหรือปิดเทอมว่างๆ ก็ทักพี่ๆมาได้นะครับใจดีทุกคน
          h1 Team
          br
          .columns.is-mobile(v-for='{fb, nm, dc} in member')
            .column.is-narrow
              a(:href='`https://facebook.com/${fb}`' target='_blank')
                img.profile(:src='`https://graph.facebook.com/${fb}/picture?width=300&height=300`')
            .column
              strong {{nm}}
              p {{dc}}
    absolute-background(bot)
</template>

<script>
import AbsoluteBackground from "@/components/AbsoluteBackground.vue";
import RnkmInfo from "@/components/Info.vue";
export default {
  components: { AbsoluteBackground, RnkmInfo },
  data: () => ({
    member: [
      {
        fb: "100001545890948",
        nm: "Krist Pornpairin",
        dc: "frontend"
      },
      {
        fb: "100012957818725",
        nm: "Tanakorn Pisnupoomi",
        dc: "integrator"
      },
      {
        fb: "100000796711573",
        nm: "Poompatai Puntitpong",
        dc: "utility man"
      },
      {
        fb: "100001291166029",
        nm: "Rodchananat Khunakornophat",
        dc: "backend"
      },
      {
        fb: "100000066164506",
        nm: "Namo Miok",
        dc: "communicator"
      }
    ]
  })
};
</script>

<style lang='stylus' scoped>
.content * {
  color: white;
}

.content .indent {
  text-indent: 2rem;
}

.member-profile {
  display: flex;
  align-content: space-between;
  width: 100%;
  align-items: center;
}

.profile {
  max-width: 70px;
  border-radius: 100px;
  border: solid 4px white;
  transition-duration: 0.2s;
  border-color: #ffffff;

  &:hover {
    border-color: #9cd479;
  }
}
</style>
