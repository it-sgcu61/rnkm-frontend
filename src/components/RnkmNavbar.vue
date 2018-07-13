<template lang='pug'>
  div.flex.has-text-centered
    div.k_nav(@click="$router.push('/instruction')") About
    div.k_nav(@click="$router.push('/introduction')") Baan
    div.k_nav(@click="" disable) Register
    div.k_nav(@click="" disable) Announce
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

  div.k_nav

    position: relative;
    cursor pointer
    color: white;
    font-family: ZingRust;
    line-height: .5em;
    display: inline-block;
    text-align: center;
    vertical-align: middle;
    text-shadow: 5px 5px 15px #2228;
    &[disable]
      color: gray
      cursor not-allowed

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
