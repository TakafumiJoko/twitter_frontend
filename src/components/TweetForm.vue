<script>
import { TWEET_MAX_LENGTH } from '../const'
import { postTweet } from '../api'

export default {
  name: "TweetForm",
  data() {
    return {
      tweet: {
        message: '',
      },
      textContent: '',
      previousRevisions: [''],
      index: 0,
      afterInput: false,
    }
  },
  computed: {
    previousRevision(){
      return this.previousRevisions[this.index]
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
      if(e.target.textContent.length > 0 && e.target.textContent.length <= TWEET_MAX_LENGTH){
        this.$refs.form.innerHTML = `<span id="under-message">${e.target.textContent}</span>`
        this.setCaretPosition(document.getElementById('under-message'), e.target.textContent.length)
      }else if(e.target.textContent.length > TWEET_MAX_LENGTH){
        this.$refs.form.innerHTML = `<span id="under-message">${e.target.textContent.substring(0, TWEET_MAX_LENGTH)}</span>` + `<span id="over-message" style="background-color: pink;">${e.target.textContent.substring(TWEET_MAX_LENGTH)}</span>`
        this.setCaretPosition(document.getElementById('over-message'), e.target.textContent.length - TWEET_MAX_LENGTH)
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
      sel.removeAllRanges();
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
      }else if(this.previousRevisions.length > 1 && this.previousRevision.length <= TWEET_MAX_LENGTH){
        this.$refs.form.innerHTML = `<span id="under-message">${this.previousRevision}</span>`
      }else if(this.previousRevisions.length > 1 && this.previousRevision.length > TWEET_MAX_LENGTH){
        this.$refs.form.innerHTML = `<span id="under-message">${this.previousRevision.substring(0, TWEET_MAX_LENGTH)}</span>` + `<span id="over-message" style="background-color: pink;">${this.previousRevision.substring(TWEET_MAX_LENGTH)}</span>`
      }
    },
  },
}
</script>

<template>
  <div contenteditable="true" ref="form" class="form" @input="onInput" @keyup="onKeyUp" @keydown="onKeyDown"></div>
  <v-btn @click="onClick" class="post-btn" color="rgb(29, 155, 240)" density="comfortable" rounded="xl" size="large">ツイートする</v-btn>
</template>

<style scoped>

.form {
  height: 300px;
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
</style>