<template>
  <div class='_flex has-text-centered'>
    <router-link class='__k_nav' to='/instruction'><div>About</div></router-link>
    <router-link class='__k_nav' to='/introduction'><div>Baan</div></router-link>
    <router-link class='__k_nav' to='/registration'><div>Register</div></router-link>
    <router-link class='__k_nav' to='/announcement'><div>Announce</div></router-link>
  </div>
</template>

<script>
export default {
}
</script>

<style lang='stylus' scoped>
  ._flex
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    background-color: rgba(20, 20, 20, .3);
    padding: .7em 2em
    @media screen and (min-width: 400px)
      padding: .5em 4em
    @media screen and (min-width: 600px)
      padding: .7em 7em
    @media screen and (min-width: 1000px)
      padding: .9em 12em

  .__k_nav div
    position: relative;
    color: white;
    font-family: ZingRust;
    line-height: .5em;
    margin: 1vmin 2vw;
    display: inline-block;
    text-align: center;
    vertical-align: middle;
    text-shadow: 5px 5px 15px #2228;
    font-size: 5vw;
    @media screen and (min-width: 400px)
      font-size: 4vw;
    @media screen and (min-width: 600px)
      font-size: 3vw;
    @media screen and (min-width: 1000px)
      font-size: 2.5vw;


</style>
