<template>
  <div>
    <croppa v-model='userimg' :width='225' :height='300' :quality='2' :prevent-white-space='true' initial-image='' :placeholder='desc'
      placeholder-color="#fff" :placeholder-font-size='13' canvas-color="transparent" :show-remove-button='true' remove-button-color="#be5877"
      :show-loading='true' :loading-size='50' :zoom-speed="4" :reverse-scroll-to-zoom='true' initial-size='cover' accept=".jpg,.jpeg,.png">
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
      },
    }
  }

</script>


<style>
  .croppa-container {
    padding: 10px 10px;
    border: 0 white solid;
    border-width: 0 0px 2px 2px;
    border-width: 0 0 0 0;
    border-radius: 0;
    background-color: #222;
    outline: none;
    outline-style: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    -webkit-box-shadow: none;
    box-shadow: none;
    opacity: 1;
    transition-duration: 0
  }

  .croppa-container:hover {
    opacity: 1;
    border-color: #be5877;
    transition-duration: 0
    /* background-color: #f7cdea; */
  }

</style>
