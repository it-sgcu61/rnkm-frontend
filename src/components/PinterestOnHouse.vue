<template lang="pug">
  div.picker
    label.container(style="font-family:Superspace;font-size:1.2em") Your most interested house.
    div.lineContainer
      div.PINcontainer(@click="$emit('click',1)", style="cursor:pointer;")
        img(:src="require(`../theme/house/${houses[0]}.png`)" style="width:100%;border-radius:50%")
        div.text
          p(style="font-size:3em;") 1
      div.PINcontainer(@click="$emit('click',2)", style="cursor:pointer;" )
        img(:src="require(`../theme/house/${houses[1]}.png`)" style="width:100%;border-radius:50%")
        div.text
          p(style="font-size:3em;") 2
      div.PINcontainer(@click="$emit('click',3)", style="cursor:pointer;")
        img(:src="require(`../theme/house/${houses[2]}.png`)" style="width:100%;border-radius:50%")
        div.text
          p(style="font-size:3em;") 3
    img.btn(@click='$router.push("/registration")' src='../theme/material/Next.png' v-if="houses.filter((houseName)=>(houseName !='unknown')).length == 3")
</template>
<style lang="stylus" scoped>
  .PINcontainer {
      position: relative;
      width: 75px;
      margin-left: 5px;
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
    width: 240px;
  }
  .lineContainer>div {
      display: inline-block;
  }
  .picker{
    max-width 300px
    padding 1em 2em
    background: linear-gradient(#3e1b56, #6e3680);
    border-radius 25px 0 25px 0
  }
</style>
<script>
export default {
  props:{
    houses:Array,
  }
}
</script>


