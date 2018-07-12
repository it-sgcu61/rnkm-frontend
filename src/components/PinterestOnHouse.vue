<template lang="pug">
  div.picker
    label.container
      div Your most interested house.
    div.lineContainer
      div.PINcontainer(@click="$emit('click', i)" v-for='i in 3')
        img.icon(:src="require(`../theme/house/${houses[i-1] || 'unknown'}.png`)")
        div.text
          h1.is-size-1 {{i}}
    div.btn-wrap
      img.btn(@click='$router.push("/registration")' src='../theme/material/Next.png' v-if="houses.filter((item)=>(item!=null)).length == 3")
</template>

<style lang="stylus" scoped>
  h1.is-size-1 {
    font-style bold
    font-family ZingRust
    font-size calc(10px + 3vw)
    filter: drop-shadow(0 0 20px black)
    text-align center
    margin-left -15px
  }
  .container {
    text-align center
    font-family: Superspace;
    font-size: calc(.5em + .5vw)
    line-height 3em
  }
  .icon {
    width 100%
    height 93%
    border-radius 50%
    opacity .7
  }
  .PINcontainer {
      position: relative;
      width: 70px;
      margin-left: 8px;
      cursor:pointer
  }
  .text {
    left: 0;
    position:absolute;
    text-align:center;
    top: 0;
    width: 100%
  }
  .lineContainer{
    margin: 0 auto;
    width: 250px;
    max-width 30vw
  }
  .lineContainer
    display: flex;
    justify-content space-between

  .picker
    max-width 300px
    padding 0 .4em
    background: linear-gradient(#8e1b568a, #6e368077);
    border-radius 0 25px 25px 0

  .btn-wrap
    text-align center
    .btn
      max-height 50px
      max-width 23vw

</style>
<script>
export default {
  props:{
    houses: Array,
    require: true
  }
}
</script>


