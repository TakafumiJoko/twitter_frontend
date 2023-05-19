<template>
  <Modal>
    <template v-slot:header>
      <div class="header">
        <button @click="$emit('close-modal')" class="prev-btn">
          <svg width="24" height="24" view-box="0, 0, 24, 24">
            <path d="M 12 3, l -9, 9, l 9, 9, M 3 12 h 18" stroke="black" fill="transparent" stroke-width="2"></path>
          </svg>
        </button>
        <h2 class="headline">メディアをトリミング</h2>
        <button @click="edit" class="edit-btn">保存</button>
        <nav>
    
        </nav>
      </div>
    </template>
    <template v-slot>
      <div ref="croppie" class="main"></div>
    </template>
    <template v-slot:footer>
      <div class="footer">
        <v-btn @click="toOriginal" :flat=true rounded="circle" size="x-small" width="50" height="50" class="resize-btn">
          <svg width="20" height="20" :class="mode === 'original' ? 'on' : 'off'">
            <path d="M 1 5, c 0 -1, 1 -2 , 2 -2, h 14, c 1 0, 2 1, 2 2, v 10, c 0 1, -1 2, -2 2, h -14, c -1 0, -2 -1, -2 -2 z" stroke-width="2" fill="transparent"></path>
          </svg>
          <v-tooltip
            activator="parent"
            location="bottom"
            content-class="custom-tooltip"
          >
            オリジナル
          </v-tooltip>
        </v-btn>
        <v-btn @click="toWide" :flat=true rounded="circle" size="x-small" width="50" height="50" class="resize-btn">
          <svg width="20" height="20" :class="mode === 'wide' ? 'on' : 'off'">
            <path d="M 1 6, c 0 -1, 1 -2 , 2 -2, h 14, c 1 0, 2 1, 2 2, v 8, c 0 1, -1 2, -2 2, h -14, c -1 0, -2 -1, -2 -2 z" stroke-width="2" fill="transparent"></path>
          </svg>
          <v-tooltip
            activator="parent"
            location="bottom"
            content-class="custom-tooltip"
          >
            ワイド
          </v-tooltip>
        </v-btn>
        <v-btn @click="toSquare" :flat=true rounded="circle" size="x-small" width="50" height="50" class="resize-btn">
          <svg width="20" height="20" :class="mode === 'square' ? 'on' : 'off'">
            <path d="M 1 3, c 0 -1, 1 -2 , 2 -2, h 14, c 1 0, 2 1, 2 2, v 14, c 0 1, -1 2, -2 2, h -14, c -1 0, -2 -1, -2 -2 z" stroke-width="2" fill="transparent"></path>
          </svg>
          <v-tooltip
            activator="parent"
            location="bottom"
            content-class="custom-tooltip"
          >
            スクエア
          </v-tooltip>
        </v-btn>
      </div>
    </template>
  </Modal>
</template>

<script>
import Croppie from 'croppie'
import '../../src/assets/croppie.css'
import Modal from './Modal.vue'

export default {
  components: {
    Modal,
  },
  data(){
    return {
      croppie: undefined,
      naturalWidth: 0,
      naturalHeight: 0,
      boundary: {
        width: 0,
        height: 0,
      },
      viewport: {
        width: 0,
        height: 0,
      },
      limitSize: 500,
      mode: 'original',
    }
  },
  props: ['image', 'index'],
  emits: ['edit-image', 'close-modal'],
  methods: {
    async init(){
      await this.setImageSize()
      if(window.innerWidth < 550){
        this.limitSize = 350
      }else if(window.innerWidth < 700){
        this.limitSize = 200
      }
      this.setBoundarySize()
      this.setOriginalViewportSize()
      this.setUpCroppie()
    },
    getImageUrl(image){
      return URL.createObjectURL(image)
    },
    loadImage(url, elem){
      return new Promise((resolve, reject)=>{
        elem.onload = () => resolve(elem)
        elem.onerror = reject
        elem.src = url
      })
    },
    async setImageSize(){
      let url = this.getImageUrl(this.image)
      let img = new Image()
      await this.loadImage(url, img)
      return new Promise(resolve=>{
        this.naturalWidth = img.naturalWidth
        this.naturalHeight = img.naturalHeight
        resolve()
      })
    },
    setBoundarySize(){
      if(this.naturalWidth > this.limitSize || this.naturalHeight > this.limitSize){
        if(this.naturalWidth >= this.naturalHeight){
          let ratio = this.naturalHeight / this.naturalWidth
          if(this.naturalWidth > this.limitSize){
            this.boundary.width = this.limitSize
            this.boundary.height = this.limitSize * ratio
          }
        }else{
          if(this.naturalHeight > this.limitSize){
            let ratio = this.naturalWidth / this.naturalHeight
            this.boundary.height = this.limitSize
            this.boundary.width = this.limitSize * ratio
          }
        } 
      }else{ 
        this.boundary.width = this.naturalWidth
        this.boundary.height = this.naturalHeight
      }
    },
    setOriginalViewportSize(){
      this.viewport.width = this.boundary.width
      this.viewport.height = this.boundary.height
    },
    setWideViewportSize(){
      this.viewport.width = this.boundary.width
      if(this.boundary.width / this.boundary.height >= 3 / 2){
        this.viewport.height = this.boundary.height
      }else{
        this.viewport.height = this.boundary.width * 2 / 3
      }
    },
    setSquareViewportSize(){
      if(this.boundary.width >= this.boundary.height){
        this.viewport.width = this.boundary.height
        this.viewport.height = this.boundary.height
      }else{
        this.viewport.width = this.boundary.width
        this.viewport.height = this.boundary.width
      }
    },
    setUpCroppie(){
      if(this.croppie){
        this.croppie.destroy()
      }
      let el = this.$refs.croppie
      this.croppie = new Croppie(el, {
        viewport: { 
          width: this.viewport.width,
          height: this.viewport.height,
        },
        boundary: { 
          width: this.boundary.width, 
          height: this.boundary.height,
        },
        showZoomer:true,
        enableOrientation: true
      })
      this.croppie.bind({
        url: this.getImageUrl(this.image)
      })
    },
    toOriginal(){
      this.mode = 'original'
      this.setOriginalViewportSize()
      this.setUpCroppie()
    },
    toWide(){
      this.mode = 'wide'
      this.setWideViewportSize()
      this.setUpCroppie()
    },
    toSquare(){
      this.mode = 'square'
      this.setSquareViewportSize()
      this.setUpCroppie()
    },
    onResize(){
      if(window.innerWidth < 550){
        this.limitSize = 200
      }else if(window.innerWidth < 700){
        this.limitSize = 350
      }else{
        this.limitSize = 500
      }
      this.setBoundarySize()
      switch(this.mode){
        case 'original': 
          this.setOriginalViewportSize()
          break
        case 'wide':
          this.setWideViewportSize()
          break
        case 'square':
          this.setSquareViewportSize()
          break
      }
      this.setUpCroppie()
    },
    async edit(){
      let blob = await this.croppie.result('blob')
      let file = new File([blob], this.image.name, { type: this.image.type })
      this.$emit('edit-image', file, this.index)
      this.$emit('close-modal')
    },
  },
  async mounted(){
    this.init()
    window.addEventListener('resize', this.onResize)
  },
}
</script>

<style scoped lang='scss'>
.header {
  padding: 10px 20px;
  display: flex;
  justify-content: center;
  height: 48px;
  align-items: center;
}
.prev-btn {
  display: flex;
  align-items: center;
  width: 50px;
}
.headline {
  flex-grow: 1;
  font-size: 20px;
}
.edit-btn {
  display: flex;
  align-items: center;
  width: 60px;
  background-color: black;
  border-radius: 20px;
  color: white;
  justify-content: center;
  font-weight: bold;
  padding: 5px;
}
.main {
  width: 100%;
  height: 580px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  background-color: #eff;
}
.footer {
  width: 100%;
  display: flex;
  justify-content: space-around;
  padding: 10px 0 60px;
}
.resize-btn {
  display: flex;
  align-items: center;
}
.resize-btn:hover {
  background-color: $main-bg-color;
}
.on {
  stroke: $main-color;
}
.off {
  stroke: black;
}
.custom-tooltip {
  padding: 2px 4px!important;
  font-size: 12px!important;
}
</style>