<template lang='pug'>
  div.flex.has-text-centered
    div.k_nav(@click="$router.push('/about')") About
    div.k_nav(@click="$router.push('/baan')") Baan
    // div.k_nav(@click="" disable) Register
    div.k_nav(@click="$router.push('/register')") Register
    div.k_nav(@click="$router.push('/announce')") Announce
    // div.k_nav(@click="") Register
    // div.k_nav(@click="" disable) Announce
    div.k_nav(@click="$router.push('/creater')") Creator
</template>

<script>
export default {};
</script>

<style lang='stylus' scoped>
.flex {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  background-color: rgba(20, 20, 20, 0.3);
  padding: 0.7em 4em;
}

div.k_nav {
  position: relative;
  cursor: pointer;
  color: white;
  font-family: ZingRust;
  line-height: 0.5em;
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  text-shadow: 5px 5px 15px #2228;

  &[disable] {
    color: gray;
    cursor: not-allowed;
  }

  @media screen and (min-width: 0px) {
    font-size: 1em;
    margin: 0em 1em;
  }

  @media screen and (min-width: 600px) {
    font-size: 1.25em;
    margin: 0.2em 1.5em;
  }

  @media screen and (min-width: 1000px) {
    font-size: 1.5em;
    margin: 0.5em 2em;
  }
}
</style>
