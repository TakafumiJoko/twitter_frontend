<template>
  <img :src="croppedImage" alt="">
  <div contenteditable="true" ref="form" class="form" @input="onInput" @keyup="onKeyUp" @keydown="onKeyDown">
    <div v-if="tweet.images" class="image-box">
      <div v-for="(image, index) in tweet.images" :key="index" :class="imageClasses(tweet.images.length, index)">
        <img :src="getImageUrl(image)" ref="image" class="image">
        <button class="delete-image-btn" @click="deleteImage(index)">
          <svg width="18" height="18">
            <path d="M 3 3, L 15 15, M 15 3, L 3 15" stroke="white" fill="transparent" stroke-width="2"></path>
          </svg>
        </button>
        <button
          class="edit-image-btn"
          @click="showModal"
        >
          <svg width="18" height="18">
            <path d="M 3 15, v -3, c 2 -6, 9 1, 3 3 z M 6 9, l 5 -5, c 2 -2, 4 0, 2 2 L 9 11" stroke="white" fill="transparent" stroke-width="2"></path>
          </svg>
        </button>
        <Cropper v-if="isVisible" :image="image" :index="index" @edit-image="editImage" @close-modal="closeModal"></Cropper>
      </div>
    </div>
  </div>
  <v-btn @click="postTweet" class="post-btn" color="rgb(29, 155, 240)" density="comfortable" rounded="xl" size="large">ツイートする</v-btn>
  <div class="support-functions">
    <div tabindex="0" class="function">
      <svg width="24" height="24">
        <path d="M 3 5.5, C 3 4.119, 4.119 3, 5.5 3 h 13, C 19.881 3, 21 4.119, 21 5.5 v 13 c 0 1.381, -1.119 2.5, -2.5 2.5 h -13 c -1.381 0, -2.5 -1.119, -2.5 -2.5 v -13 z
          M 10 7, c -2 0, -2 2, 0 2, M 9 7, c 2 0, 2 2, 0 2 M 21 16 l -5 -5, -5 5, -3 -3, -5 5" :class="{ 'stop-upload': stopUpload }" stroke="rgb(29, 155, 240)" fill="transparent" stroke-width="2"></path>
      </svg>
      <input @change="addImage" :disabled="stopUpload" type="file" accept="image/jpeg, image/png, image/webp, image/gif, video/mp4, video/quicktime" multiple tabindex="-1" class="hidden">
    </div>
  </div>
  <div v-if="showWarning" class="warning">
    GIF画像１点か画像を４点まで選択してください。
  </div>
</template>

<script>
import { MESSAGE_MAX_COUNT, IMAGE_MAX_COUNT } from '../const'
import { postTweet } from '../api'
import Cropper from './Cropper.vue'

export default {
  name: "TweetForm",
  components: {
    Cropper,
  },
  data() {
    return {
      debug: 0,
      tweet: {
        message: '',
        images: [],
      },
      textContent: '',
      previousRevisions: [''],
      index: 0,
      afterInput: false,
      showWarning: false,
      croppedImage: undefined,
      isVisible: false
    }
  },
  computed: {
    previousRevision(){
      return this.previousRevisions[this.index]
    },
    stopUpload(){
      return this.tweet.images.length === IMAGE_MAX_COUNT
    },
  },
  methods: {
    async onClick(){
      const res = await postTweet(this.tweet)
      console.log(`POST ${res.data.tweet.message}`)
      this.$store.commit('setTweet', { tweet: res.data.tweet })
      // if(/\s#.+/.test(res.data.tweet.message)) this.dispatch('createHashTags', { tweet: res.data.tweet })
    },
    onInput(e){
      this.tweet.message = e.target.textContent
      if(e.target.textContent.length > 0 && e.target.textContent.length <= MESSAGE_MAX_COUNT){
        this.$refs.form.innerHTML = `<span id="under-message">${e.target.textContent}</span>`
        this.setCaretPosition(document.getElementById('under-message'), e.target.textContent.length)
      }else if(e.target.textContent.length > MESSAGE_MAX_COUNT){
        this.$refs.form.innerHTML = `<span id="under-message">${e.target.textContent.substring(0, MESSAGE_MAX_COUNT)}</span>` + `<span id="over-message" style="background-color: pink;">${e.target.textContent.substring(MESSAGE_MAX_COUNT)}</span>`
        this.setCaretPosition(document.getElementById('over-message'), e.target.textContent.length - MESSAGE_MAX_COUNT)
      }
      switch(e.inputType){
        case 'insertFromPaste':
        case 'deleteByCut':
          this.saveState(e)
          this.afterInput = false
          break
        case 'insertText':
        case 'deleteContentBackward':
          this.afterInput = true
          break
      }
    },
    onKeyDown(e){
      if(this.index < this.previousRevisions.length - 1 && e.metaKey && e.shiftKey && e.key === 'z'){
        this.redo()
        this.afterInput = false
        return
      }
      if(this.index > 0 && e.metaKey && e.key === 'z'){
        this.undo()
        this.afterInput = false
        return
      }
    },
    onKeyUp(e){
      if(this.afterInput){
        this.saveState(e)
        this.afterInput = false
      }
    },
    setCaretPosition(el, pos){
      el.focus();
      var range = document.createRange();
      var sel = window.getSelection();
      range.setStart(el.firstChild, pos);
      range.collapse(true);
      sel.deleteAllRanges();
      sel.addRange(range); 
    },
    setTextContent(e){
      if(e.target.textContent === undefined){
        this.textContent = ''
      }else{
        this.textContent = e.target.textContent
      }
    },
    saveState(e){
      this.setTextContent(e)
      this.index += 1
      this.previousRevisions[this.index] = this.textContent
    },
    undo(){
      this.index -= 1
      this.edit()
    },
    redo(){
      this.index += 1
      this.edit()
    },
    edit(){
      if(this.previousRevisions.length === 1){
        this.$refs.form.innerHTML = ''
      }else if(this.previousRevisions.length > 1 && this.previousRevision.length <= MESSAGE_MAX_COUNT){
        this.$refs.form.innerHTML = `<span id="under-message">${this.previousRevision}</span>`
      }else if(this.previousRevisions.length > 1 && this.previousRevision.length > MESSAGE_MAX_COUNT){
        this.$refs.form.innerHTML = `<span id="under-message">${this.previousRevision.substring(0, MESSAGE_MAX_COUNT)}</span>` + `<span id="over-message" style="background-color: pink;">${this.previousRevision.substring(MESSAGE_MAX_COUNT)}</span>`
      }
    },
    addImage(e){
      var images = Array.from(e.target.files)
      if(this.tweet.images.length + images.length > 4){
        this.setShowWarning()
        return
      }
      var i = 0
      while(i < images.length){
        var image = images[i]
        this.tweet.images.push(image)
        i++
      }
      e.target.value = ''
    },
    async postTweet(){
      const res = await postTweet({ tweet: this.tweet })
      console.log(res.data.tweet.images)
    },
    setShowWarning(){
      this.showWarning = true
      setTimeout(()=>this.showWarning = false, 5000)
    },
    imageClasses(length, index){
      var classes = []
      classes.push('image')
      if(length === 1){
        classes.push('all')
      }else if(length === 2){
        classes.push('half')
      }else if(length === 3){
        if(index === 0){
          classes.push('half')
        }else{
          classes.push('quarter')
        }
      }else{
        classes.push('quarter')
      }
      return classes
    },
    deleteImage(index){
      this.tweet.images.splice(index, 1)
    },
    editImage(image, index){
      console.log(image, index)
      this.tweet.images[index] = image
    },
    getImageUrl(image){
      return URL.createObjectURL(image)
    },
    showModal(){
      this.isVisible = true
    },
    closeModal(){
      this.isVisible = false
    },
  },
}
</script>


<style scoped lang="scss">

.form {
  width: 700px;
  padding: 10px;
}
.length-over{
  background-color: pink;
}
.post-btn {
  color: white; 
  font-weight: bold; 
  letter-spacing: 0px; 
  padding:0 16px;
}
.support-functions{
  display: flex;
}
.function {
  position: relative;
  width: 36px;
  height: 36px;
}
.stop-upload {
  stroke: $main-thin-color;
}
.hidden {
  width: 24px;
  height: 24px;
  opacity: 0;
  position: absolute;
  top: 0px;
  left: 0px;
}
.warning {
  z-index: 100;
  position: absolute;
  bottom: 0px;
  left: 200px;
  background-color: rgb(29, 155, 240);
  color: white;
}
.image-box {
  width: 500px;
  height: 500px;
  display: flex;
}
.image {
  position: relative;
  border-radius: 5%;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.all {
  max-width: 100%;
  max-height: 100%;
}
.half {
  width: 50%;
  height: 100%;
}
.quarter {
  width: 50%;
  height: 50%;
}
.delete-image-btn {
  display: inline-block;
  position: absolute;
  top: 10px;
  left: 10px;
  width: 36px;
  height: 36px;
  text-align: center;
  padding: 9px 0;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.7);
}
.edit-image-btn {
  display: inline-block;
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 24px;
  height: 24px;
  padding: 3px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.7);
}
</style>