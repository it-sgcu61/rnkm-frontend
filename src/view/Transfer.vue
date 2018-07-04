<template>
  <section class='' style="text-align: center; background: white">
    <!-- status -->
    <div class='section hero'>
      <h1 class='is-size-1'>ย้ายบ้าน<span v-if='final_confirm'>สำเร็จ</span></h1>
      <p class='subtitle'>personal ID: {{cid}}, current: {{curr}}</p>
    </div>
    <div v-if='!final_confirm'>
    <button v-for='(detail, baan) in info'
      class='button house-select is-outlined is-success'
      :class="{'is-danger': detail.now == detail.max}"
      :disabled='detail.now == detail.max || baan == curr || !Boolean(cid)'
      @click='transfer(baan)'
      >
        <h1 class='is-size-4'>{{baan}}</h1>
        <p class='is-subitile'>{{detail.now}}/{{detail.max}}</p>
      </button>
      <div class="section">
        <button class="button is-warning" @click="submit">Submit</button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props:{
    'cid': {
      type: String,
      require: true,
      default: 'Invalid'
    }
  },
  data: function () {
    return {
      curr: require('../others/house_transfer.json')["curr"],
      info: require('../others/house_transfer.json')["info"],
      final_confirm: false
    }
  },
  methods: {
    transfer(dest) {
      if (this.curr !== dest && this.info[dest].now < this.info[dest].max) {
        this.info[dest].now += 1
        this.info[this.curr].now -= 1
        this.curr = dest
      }
    },
    submit: function () {
      this.final_confirm = true
      alert('yourcurrent house is ' + this.curr)
    }
  }
}
</script>

<style scoped>
.house-select {
  width: 140px;
  height: 160px;
  margin: .4em .4em;
  padding: auto auto;
  display: inline-block;
  text-align: center;
}
p, h1 {
  margin: 5px auto;
}
</style>
