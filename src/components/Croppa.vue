<template>
  <div id=''>
    <croppa ref='croppa' v-model='userimg' :width='225' :height='300' :quality='2' :prevent-white-space='true' :placeholder='desc' placeholderColor='#222'
      placeholder-color="#fff" :placeholder-font-size='13' :show-remove-button='true' remove-button-color="#be5877" canvasColor='transparent'
      :show-loading='true' :loading-size='50' :zoom-speed="4" :reverse-scroll-to-zoom='true' initial-size='cover' accept=".jpg,.jpeg,.png"
    >
      <!-- <img slot='initial' :src='require("../theme/material/blank_user.png")' /> -->
    </croppa>
    <div v-if='tools'>
      <hr/>ch
      <button type='button' @click='userimg.zoomIn()'>+</button>
      <button type='button' @click='userimg.zoomOut()'>-</button>
      <button type='button' @click="userimg.rotate()">rotate</button>
      <button type='button' @click="downloadImg('image/jpeg', 1.0)">download as JPEG</button>
      <button type='button' @click='uploadImg()'>upload</button>
    </div>
  </div>
</template>

<script>
  import 'vue-croppa/dist/vue-croppa.css'
  import Vue from 'vue'
  import firebase from 'firebase'
  Vue.use(require('vue-croppa'));

  export default {
    props: {
      value: {
        type: String,
        require: false
      },
      desc: {
        type: String,
        default: "คลิกเพืออัพโหลด ภาพหน้าตรงเห็นชัด"
      },
      tools: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        userimg: null
      }
    },
    methods: {
      generate_random_string() {
        return Date.now().toString(36).substr(4).split("").reverse().join("") +
          Math.random().toString(36).substr(2, 9)
      },
      downloadImg(type, compressionRate) {
        this.userimg.generateBlob((blob) => {
          var url = URL.createObjectURL(blob)
          console.log(url)
          var a = document.createElement('a');
          a.download = 'filename';
          a.href = url;
          a.click();
          URL.revokeObjectURL(url);
        }, type, compressionRate)
      },
      uploadImg() {
        let upload_p = new Promise((resolve, reject) => {
          if (!this.userimg.hasImage()) {
            reject('no image select')
          }
          this.userimg.generateBlob(blob => {
            var fbref = firebase.storage().ref(`image/${this.generate_random_string()}.jpeg`);
            var tasku = fbref.put(blob);
            var self = this;
            tasku.on('state_changed',
              function progress(snapshot) {
                console.log(`upload img : ${snapshot.bytesTransferred / snapshot.totalBytes * 100}%`)
              },
              function error(err) {
                reject(`upload img err : ${err.message}`);
              },
              function complete() {
                fbref.getDownloadURL().then(url => {
                  console.log(`upload img complete : ${url}`);
                  self.$emit('input', url);
                  resolve(url);
                });
              }
            )
          }, 'image/jpeg')
        })
        return Promise.race([upload_p, new Promise((_, reject) => {
          setTimeout(() => reject('upload img : timed out in 10 sec'), 10000)
        })])
      }
    }
  }

</script>


<style>
  #wrapper{
    white-space: nowrap;
    background-color: red;
  }
  .croppa-container {
    padding: 10px;
    border: 0 rgb(0, 0, 0) solid;
    border-radius: 0;
    background-color: #222;
    background-image: url('../theme/material/blank_user.png');
    background-size: cover;
    background-position: 50% 50%;
    /* background-origin: content-box; */
    outline: none;
    outline-style: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    -webkit-box-shadow: none;
    box-shadow: none;
    opacity: .95;
  }

  .croppa-container.croppa--has-target {
    opacity: 1;
    transition: all 1000ms ease;
    transition-duration: 1000ms;
    background-image: none;
  }

</style>
