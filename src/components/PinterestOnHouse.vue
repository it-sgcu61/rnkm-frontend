<template lang="pug">
  div.picker
    div.lineContainer
      div.PINcontainer(@click="$emit('click', i)" v-for='i in 3')
        img.icon(:src="require(`../theme/house/${houses[i-1] || 'unknown'}.jpg`)")
        div.text
          h1.is-size-1 {{i}}
    div(v-if="houses.filter((item)=>(item!=null)).length == 3")
      img.next(@click='$router.push("/register")' src='../theme/material/Next.png')
</template>

<style lang="stylus" scoped>
  h1.is-size-1 {
    font-style bold
    font-family ZingRust
    filter: drop-shadow(0 0 20px black)
    text-align center
  }
  .container {
    text-align center
    font-family: Superspace;
    font-size: calc(.5em + .5vw)
    line-height 3em
  }
  .icon {
    width 100%
    height auto
    border-radius 50%
    opacity .7
  }
  .PINcontainer {
      position: relative;
      width: 60px;
      margin-left: 5px;
      cursor: pointer
  }
  .text {
    left: 0;
    position:absolute;
    text-align:center;
    top: 0;
    width: 100%
  }
  .lineContainer{
    padding-top 10px
    display: flex;
    @media screen and (orientation portrait) {
      flex-direction column
      justify-content center
    }
    @media screen and (orientation landscape) {
      max-width 30vw
      flex-direction row
      justify-content space-between
    }
  }


  .picker
    padding .5em .4em
    background: linear-gradient(#8e1b568a, #6e368077);
    border-radius 0 20px 20px 0
    @media screen and (orientation landscape) {
      &::before {
        content: "Your most interested house."
        font-family Superspace;
      }
    }

  .next
    max-height 40px
    max-width 60px
    display block
    margin 0 auto

</style>
<script>
export default {
  props:{
    houses: Array,
    require: true
  }
}
</script>


