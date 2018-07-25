<template lang='pug'>
div.section.has-text-centered
  div.is-inline: img.spon.cunex(src='@/theme/material/cunex.png')
  div.is-inline: img.spon.zero_waste(src='@/theme/material/zero_waste.png')
  div.is-inline: img.spon.central(src='../theme/material/central_embassy_dicut.png')
</template>

<style lang='stylus' scoped>
  .spon
    margin 20px 20px
    vertical-align center
    &.cunex
      width 200px
      padding-bottom: 25px;
    &.zero_waste
      width 90px
    &.central
      position relative
      width 250px
      top -20px
      border-radius 10px
      @media screen and (max-width: 407px) {
        top 20px
      }
      // filter: invert(100%);

</style>
