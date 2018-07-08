<template>
  <div class='_flex has-text-centered' style='padding: 2em 3em'>
    <router-link class='__k_nav' to='/home'><div>Home</div></router-link>
    <router-link class='__k_nav' to='/instruction'><div>Instruction</div></router-link>
    <router-link class='__k_nav' to='/introduction'><div>Introduction</div></router-link>
    <router-link class='__k_nav' to='/registration'><div>Registration</div></router-link>
    <router-link class='__k_nav' to='/announcement'><div>Final<br/>Announcement</div></router-link>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>
._flex {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
}
.__k_nav div {
  position: relative;
  color: white;
  font-size: 2.2vw;
  font-family: ZingRust;
  line-height: 1em;
  margin: 10px 2vw;
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  text-shadow: 5px 5px 15px #2228;
}
</style>
