<template lang='pug'>
div.section
  div.header List Baan
  div(v-for='grp in ["S", "M", "L", "XL"]' :key='grp.id')
    div.container._flex._flex-center
      img.size_btn(:src='require(`@/theme/material/${grp}_btn.png`)')
    div._flex(:n-item='siz_list[grp].length')
      div._flex-item(v-for='obj in siz_list[grp]' :key='obj.id')
        div._img_square(@click='$router.push(`/house/${obj.nameURL}`)')
          img(:src="require(`@/theme/house/${obj.nameURL}.png`)" :alt='obj.nameTH')
</template>

<script>
export default {
  data() {
    return {
      rnd_list: [],
      siz_list: {}
    }
  },
  created(){
    let raw_data = _.shuffle(require('@/others/house_data.json').data)
    this.siz_list = _.groupBy(raw_data, "size")
  }
}
</script>

<style lang='stylus' scoped>
  .section
    background-color: #020202;
    padding: 7rem 1rem;
    @media screen and (min-width: 1000px)
      padding: 11rem 3rem;

  .header
    font-size 4rem
    font-family ZingRust
    color white
    text-align center

  ._flex
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    margin calc(5vmin + 40px) auto 3vmin auto

    // @media screen and (min-width: 600px)
    //   ._flex[n-item="5"]
    //     padding-left: 12vw;
    //     padding-right: 12vw;

    &._flex-center
      align-items: center
      justify-content: center;
      padding 190px auto 20px auto
      margin-top 15vmin

    ._flax-item
      flex-basis: 26%;
      // margin: calc(1px + 2%) auto;
      // @media screen and (min-width: 400px)
      //   flex-basis: 25%;
      //   margin: 5px auto;
      // @media screen and (min-width: 1000px)
      //   flex-basis: 25%;
      //   margin: 10px auto;



  .size_btn
    display block
    width calc(12vw + 70px)
    height calc(12vw + 70px)
    @media screen and (min-width: 1000px)
      width 200px
      height 200px
      display block

  ._img_square
    width: 29vw;
    height: 29vw;
    overflow: hidden;
    background-color white
    margin 2px
    border-radius 7px
    filter: brightness(50%);
    @media screen and (min-width: 600px)
      width: 22vw;
      height: 22vw;
    &:hover
      transition-duration 700ms
      filter: brightness(100%)

    img
      object-fit: fill
      position: relative;
      transition-duration: .2s;
      opacity: .8;

    &:hover img
      content: "";
      opacity: 1;
      transform-origin: center center 0
      transform: rotate(2deg) scale(1.2, 1.2);
      transition-duration: .6s;
</style>
