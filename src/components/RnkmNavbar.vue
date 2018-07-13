<template lang='pug'>
  div.flex.has-text-centered
    router-link.k_nav(to='/instruction')
      div About
    router-link.k_nav(to='/introduction')
      div Baan
    router-link.k_nav(to='/registration')
      div Register
    router-link.k_nav(to='/announcement')
      div Announce
</template>

<script>
export default {
}
</script>

<style lang='stylus' scoped>
  .flex
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    background-color: rgba(20, 20, 20, .3);
    padding: .7em 4em
    // @media screen and (min-width: 400px)
    //   padding: .0em 4em
    // @media screen and (min-width: 600px)
    //   padding: .7em 7em
    // @media scre.5n and (min-width: 1000px)
    //   padding: .9em 12em

  .k_nav div
    position: relative;
    color: white;
    font-family: ZingRust;
    line-height: .5em;
    display: inline-block;
    text-align: center;
    vertical-align: middle;
    text-shadow: 5px 5px 15px #2228;

    @media screen and (min-width: 0px)
      font-size: 1em;
      margin: .0em 1em;
    @media screen and (min-width: 600px)
      font-size: 1.25em;
      margin: .2em 1.5em;
    @media screen and (min-width: 1000px)
      font-size: 1.5em;
      margin: .5em 2em;


</style>
