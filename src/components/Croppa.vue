<template>
  <div class='columns'>
    <div class='column'>
      <img :src='userurl' style='width: 245px'>
      ภาพเดิม
    </div>
    <div class='column'>
      <croppa ref='croppa' v-model='userimg' :width='225' :height='300' :quality='2' :prevent-white-space='true' :placeholder='desc' placeholderColor='#333'
        placeholder-color="#fff" :placeholder-font-size='13' :show-remove-button='true' remove-button-color="#be5877" canvasColor='transparent'
        :show-loading='true' :loading-size='50' :zoom-speed="4" :reverse-scroll-to-zoom='true' initial-size='cover' accept=".jpg,.jpeg,.png"
        @file-choose='userurl = ""'
      >
        <!-- :initial-image="" -->
      </croppa>
      <span>คลิกเพืออัพโหลด ภาพหน้าตรงเห็นใบหน้าชัดเจน<br>ไม่จำเป็นต้องเป็นภาพนิสิต</span>
    </div>
    <!-- <br>
    <span class='error is-block' v-if='first_check && !$refs.croppa.imageSet'>please select image</span>
    <div v-if='tools'>
      <hr/>ch
      <button type='button' @click='userimg.zoomIn()'>+</button>
      <button type='button' @click='userimg.zoomOut()'>-</button>
      <button type='button' @click="userimg.rotate()">rotate</button>
      <button type='button' @click="downloadImg('image/jpeg', 1.0)">download as JPEG</button>
      <button type='button' @click='uploadImg()'>upload</button>
    </div> -->
  </div>
</template>

<script>
  import 'vue-croppa/dist/vue-croppa.css'
  import Vue from 'vue'
  import firebase from 'firebase'
  import axios from 'axios'
  Vue.use(require('vue-croppa'));

  export default {
    props: {
      value: {
        type: String,
        require: false
      },
      desc: {
        type: String,
        default: ""
      },
      tools: {
        type: Boolean,
        default: false
      },
      initImg: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        userimg: null,
        userurl: '',
        first_check: false
      }
    },
    async created(){
      if (this.initImg){
        this.userurl = this.initImg
        // this.userurl = firebase.storage().refFromURL(this.initImg)
        // console.log('<<')
        // firebase.storage().ref('image/n91voawzyb78m.jpeg').getDownloadURL().then(url => {
        //   console.log(url)
        // })
        // console.log('>>')
        // this.userurl = firebase.storage().ref().getDownloadURL()
        // this.userurl = url(JSON.stringify(this.initImg)) //firebase.storage().ref().getDownloadURL()
        // this.userurl = 'https://firebasestorage.googleapis.com/v0/b/rnkm-cu102.appspot.com/o/image%2Fn91voawzyb78m.jpeg?alt=media&token=9bea9caf-5053-441e-ba59-0a12c400b10f'
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
            reject('[fail] no image select')
          }
          this.userimg.generateBlob(blob => {
            var fbref = firebase.storage().ref(`image/${this.generate_random_string()}.jpeg`);
            var tasku = fbref.put(blob);
            var self = this;
            tasku.on('state_changed',
              function progress(snapshot) {
                console.log(`[process] upload img : ${snapshot.bytesTransferred / snapshot.totalBytes * 100}%`)
              },
              function error(err) {
                reject(`[fail] upload img err : ${err.message}`);
              },
              function complete() {
                fbref.getDownloadURL().then(url => {
                  console.log(`[success] upload img complete : ${url}`);
                  self.$emit('input', url);
                  self.userurl = url
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
      async getURL(){
        this.first_check = true
        let val = this.userurl ? this.userurl : await this.uploadImg()
        console.log('getURL', val)
        return val
      },
      async hasImage(){
        this.first_check = true
        return await this.$refs.croppa.hasImage()
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

  .error {
    margin: 0 0 20px 0;
    padding: 0 0 15px 10px;
    color: yellow;
    font-size: 13px;
    line-height: 20px;
  }
</style>
