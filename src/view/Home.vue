<template>
<div id='_home_wrapper'>
    <img src='../theme/wall_top_2.jpg' @click='$router.push("\introduction")'>
</div>
</template>

<script>
export default {
}
</script>

<style scoped>

img {
    position: absolute;
    display: block;
    width: 100vw;
    height: 100vh;
    object-fit: cover;
}
</style>
