<template lang='pug'>
div.section._flex
  div._flax-item(v-for='url in img_list' :key='url.id')
    div._img_square
      img(style='object-fit: fill;' :src='require(`@/theme/house/${url}`)')
</template>

<script>
export default {
  data() {
    return {
      img_list: []
    }
  },
  created(){
    this.img_list = _.shuffle([
      "บ้านสด.png",
      "บ้านผี.png",
      "บ้านไหน.png",
      "บ้านดัง.png",
      "บ้านแรง.png",
      "บ้านพ่อ.png",
      "บ้านดอก.png",
      "บ้านโจ๋.png",
      "บ้านโคะ.png",
      "บ้านแอ๊บ.png",
      "บ้านยิ้ม.png",
      "บ้านเต็ม.png",
      "บ้านหรอย.png",
      "บ้านคุ้ม.png",
      "บ้านบึ้ม.png",
      "บ้านหวัง.png",
      "บ้านคิดส์.png",
      "บ้านเสี่ยว.png",
      "บ้านเฟี้ยว.png",
      "บ้านอะอึ๋ม.png",
      "บ้านเอช้วน.png",
      "บ้านเวิร์ค.png",
      "บ้านอินดี้.png",
      "บ้านจัดสัน.png",
      "บ้านคุณหนู.png",
      "บ้านหลายใจ.png",
      "บ้านว้อนท์.png",
      "บ้านเปรี้ยว.png",
      "บ้านหมีน้อย.png",
      "บ้านบูชายัญ.png",
      "บ้านอากาเป้.png",
      "บ้านดุ๊ยดุ่ย.png",
      "บ้านโจ๊ะเด๊ะ.png",
      "บ้านอินเดียน่า.png",
      "บ้านพักตากอากาศ.png",
      "บ้านโซ้ยตี๋หลีหมวย.png"
    ]);
  }
}
</script>

<style lang='stylus' scoped>
 .section
    background-color: transparent;
    &._flex
      padding: 3rem 1rem;
      @media screen and (min-width: 1000px)
        padding: 3rem 3rem;

  ._flex
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;

    ._flax-item
      flex-basis: 30%;
      margin: calc(1px + 2%) auto;
      @media screen and (min-width: 400px)
        flex-basis: 25%;
        margin: 5px auto;
      @media screen and (min-width: 1000px)
        flex-basis: 25%;
        margin: 10px auto;

  ._img_square
    width: 29vw;
    height: 29vw;
    overflow: hidden;
    position: relative;
    background-color black
    margin: auto auto;
    border: 1px white solid;
    @media screen and (min-width: 600px)
      width: 22vw;
      height: 22vw;

    img
      position: relative;
      transition-duration: .2s;
      opacity: .7;

    &:hover img
      content: "555";
      opacity: 1;
      transform-origin: center center 0
      transform: rotate(2deg) scale(1.2, 1.2);
      transition-duration: .6s;
</style>
