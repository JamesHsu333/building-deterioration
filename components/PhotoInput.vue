<template lang="pug">
.field
  label {{ label }}
  #photos(:style="{ height: photoHeight + 'px' }")
    vue-picture-input.-photo(
      v-for="(v, i) in photos"
      @change="photoChange"
      :changeOnClick="false"
      :class="{ active: i == iPhoto }"
      @click="expand"
      :height="160"
      :hideChangeButton="true"
      :plain="true"
      :prefill="defaultPhoto"
      ref="photos"
      :width="containerWidth"
      :zIndex="200"
      )
  .ui.bottom.attached.menu
    .item(@click="photo.selectImage()") #[i.camera.icon]拍照
    .item(v-show="photos[photos.length - 1]",@click="newPhoto") #[i.plus.icon]新增
    .right.menu
      .icon.item(:class="{ disabled: firstPhoto }",@click="firstPhoto || --iPhoto"): i.chevron.left.icon
      .item {{ iPhoto + 1 }} / {{ photos.length }}
      .icon.item(
        :class="{ disabled: lastPhoto }"
        @click="lastPhoto || ++iPhoto"
        ): i.chevron.right.icon
  canvas(@click="full = false",ref="canvas",:style="canvasStyle")
</template>

<script>
export default {

  components: {
    'vue-picture-input': require('vue-picture-input').default,
  },

  computed: {

    canvasStyle() {
      if (!this.full)
        return {}
      return {
        opacity: 1,
        zIndex: 201,
      }
    },

    firstPhoto() {
      return 0 == this.iPhoto
    },

    lastPhoto() {
      return this.iPhoto === this.photos.length - 1
    },

    photo() {
      return this.$refs.photos[this.iPhoto]
    },

  },

  data() { return {
    containerWidth: window.innerWidth,
    defaultPhoto: require('../res/lance-anderson-213491-unsplash.jpg'),
    full: false,
    iPhoto: 0,
    photoHeight: 0,
    photos: [false],
  }},

  methods: {

    expand() {
      this.full = true
      const canvas = this.$refs.canvas
      const image = this.photo.imageObject

      const [ A1, A2 ] = [ image.width, canvas.width ]
      const dA = A2 - A1
      const [ B1, B2 ] = [ image.height, canvas.height ]
      const dB = B2 - B1
      const [ A3, B3 ] = dA < dB
        ? [ A1 + A1 * dB / B1, B2 ]
        : [ A2, B1 + B1 * dA / A1 ]
      canvas.getContext('2d').drawImage(image, (A2 - A3) / 2, (B2 - B3) / 2, A3, B3)
    },

    newPhoto() {
      this.photos.push(false)
      this.iPhoto = this.photos.length - 1
    },

    photoChange() {
      this.$set(this.photos, this.iPhoto, this.photo.imageSelected)
    },

  },

  mounted() {
    const { canvas, photos } = this.$refs
    canvas.height = window.innerHeight
    canvas.width = window.innerWidth
    const me = this
    setTimeout(() => me.photoHeight = photos[0].previewHeight, 0) // let canvas resize
  },

  props: ['label'],

}
</script>

<style lang="sass" scoped>
#photos
  position: relative

.-photo
  left: -10000px
  position: absolute
  top: 0

  &.active
    left: 0

canvas
  left: 0
  opacity: 0
  position: fixed
  top: 0
  z-index: -1
</style>

<!--
  vi:et:sw=2:ts=2
-->
