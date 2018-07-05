<template lang='pug'>
div.section
  div(v-for='grp in ["S", "M", "L", "XL"]' :key='grp.id')
    div.container._flex._flex-center
      img.size_btn(:src='require(`@/theme/material/${grp}_btn.png`)')
    div._flex(:n-item='siz_list[grp].length')
      div._flex-item(v-for='obj in siz_list[grp]' :key='obj.id')
        div._img_square
          img(:src="require(`@/theme/house/${obj.nameTH}.png`)")
    // random all
    // div._flex
    //   div._flex-item(v-for='obj in obj_list' :key='obj.id')
    //     div._img_square
    //       img(style='object-fit: fill;' :src='require(`@/theme/house/${obj.nameTH}.png`)')
</template>

<script>
export default {
  data() {
    return {
      rnd_list: [],
      obj_list: {},
      siz_list: {}
    }
  },
  created(){
    let raw_data = _.shuffle(require('@/others/house_data.json').data)
    this.obj_list = _.keyBy(raw_data, "nameTH")
    this.siz_list = _.groupBy(raw_data, "size")
  }
}
</script>

<style lang='stylus' scoped>
  .section
    background-color: transparent;
    padding: 3rem 1rem;
    @media screen and (min-width: 1000px)
      padding: 3rem 3rem;

  ._flex
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    margin calc(5vmin + 40px) auto 3vmin auto

    &._flex-center
      align-items: center
      justify-content: center;
      padding 190px auto 20px auto
      margin-top 15vmin
    ._flax-item
      flex-basis: 30%;
      margin: calc(1px + 2%) auto;
      @media screen and (min-width: 400px)
        flex-basis: 25%;
        margin: 5px auto;
      @media screen and (min-width: 1000px)
        flex-basis: 25%;
        margin: 10px auto;

    &[n-item="5"]
      padding-left: 10vw;
      padding-right: 10vw;
      // background-color: red;


  .size_btn
    display block
    width calc(10vw + 120px)
    height calc(10vw + 120px)
    @media screen and (min-width: 1000px)
      width 250px
      height 250px
      display block

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
      object-fit: fill
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
