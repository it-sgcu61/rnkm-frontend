<template lang='pug'>
div.section
  slot(name='head')
  div.container(v-for='grp in ["S", "M", "L", "XL"]' :key='grp.id')
    div#head.flex
      img.size(:src='require(`@/theme/material/size_${grp}.png`)')
      span.desc {{siz_desc[grp]}}
    div#body.flex(:n-item='siz_list[grp].length')
      div.flex-item(v-for='baan in siz_list[grp]' :key='baan.id')
        router-link(:to='`/baan/${baan.nameURL}`')
          div.img-square(:style="{ backgroundImage: `url(${baan.img})` }")
            slot(name='before' v-bind='baan')
            // img.img-baan(:src="baan.img" :alt='baan.nameTH')
            slot(name='after' v-bind='baan')
</template>

<script>
export default {
  props: {
    isButton: {
      default: false
    },
    shuffle: {
      default: false
  }},
  data() {
    return {
      rnd_list: [],
      siz_list: {},
      siz_desc: {
        "S": "บ้านขนาดเล็ก\nมีจำนวนคน ~160 คน",
        "M": "บ้านขนาดกลาง\nมีจำนวนคน ~220 คน",
        "L": "บ้านขนาดใหญ่\nมีจำนวนคน ~350 คน",
        "XL": "บ้านขนาดใหญ่มาก\nมีจำนวนคน ~400 คน",
    }}
  },
  created(){
    let raw_data = require('@/others/house_data.json').data
    if (this.shuffle) {
      raw_data = _.shuffle(raw_data)
    }
    raw_data = raw_data.map((baan) => {
      return _.assign({img: require(`@/theme/house/${baan.nameURL}.jpg`)}, baan)
    })
    this.siz_list = _.groupBy(raw_data, "size")
  }
}
</script>

<style lang='stylus' scoped>
  #head
    margin-top 3em
  #body
    margin-top 1em
  .flex
    display flex
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items:center;

    @media screen and (min-width: 600px)
      &[n-item="5"]
        padding-left: 10vw;
        padding-right: 10vw;

  .size
    width  calc(8vw + 70px)
    height calc(8vw + 70px)
    @media screen and (min-width: 1000px)
      width  120px
      height 120px

  .size
  .desc
    font-size 1.5em
    font-family Superspace
    vertical-align: middle;
    margin .3em

  .img-square
    overflow: hidden;
    background-size cover
    // background-color white
    margin 2px
    padding 0
    border-radius 10px
    filter: brightness(70%);
    width:  27vw;
    height: 27vw;
    cursor: pointer;
    @media screen and (min-width: 600px)
      width:  20vw;
      height: 20vw;
    @media screen and (min-width: 1000px)
      width: 230px
      height: 230px
    &:hover
      transition-duration .7s
      filter: brightness(100%)

  .img-baan
    opacity: .85;
    transition-duration: .7s
    transform: rotate(0deg) scale(1.03);
    &:hover
      content: "";
      opacity: 1;
      transform-origin: center center 0
      transform: rotate(2deg) scale(1.2);
      transition-duration: .4s;
</style>
