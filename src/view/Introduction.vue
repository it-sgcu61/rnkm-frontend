<template>
  <div class='bg'>

    <div class='bg bg-top'>
      <rnkm-nav></rnkm-nav>
      <img class='big-logo' src='@/theme/material/Introduction.png'>
      <div style='min-height: 15vmin'></div>
    </div>

    <div class="section _flex">
      <div v-for='url in img_list' class="_flax-item" :key='url.id'>
        <div class='_img_square'>
          <img style='object-fit: fill;' :src='require(`@/theme/house/${url}`)'>
        </div>
      </div>

    </div>

    <div class='bg bg-bot' style='margin-top: -50vmin'>
      <div style='min-height: 70vmin'></div>
      <rnkm-nav></rnkm-nav>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash'
  export default {
    data() {
      return {
        img_list: [
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
        ]
      }
    },
    created() {
      this.img_list = _.shuffle(this.img_list)
    },
    methods: {
      get_img(s) {
        var k = './' + this.img_path + s
        console.log(k)
        return k
      },
      imageLoadError(e) {
        console.log(e);
      }
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

  .bg
    color: red;
    width: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    background-color: black;
    text-align: center;
    &.bg-top
      background-image: url('../theme/wallpaper/header.jpg');
      background-position: bottom right;
    &.bg-bot
      background-image: url('../theme/wallpaper/footer.jpg');
      background-position: top right;

  img.big-logo
    margin-top: -60px;
    padding: 10px;
    min-width: 280px;
    max-width: 70vw;

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
    background: rgba(75, 45, 93, 0.512);
    margin: auto auto;
    border: 1px white solid;
    @media screen and (min-width: 600px)
      width: 22vw;
      height: 22vw;

    img
      transition-duration: .2s;
      opacity: .7;

    &:hover img
      content: "555";
      opacity: 1;
      transform-origin: center center 0
      transform: rotate(2deg) scale(1.2, 1.2);
      transition-duration: .6s;


</style>
