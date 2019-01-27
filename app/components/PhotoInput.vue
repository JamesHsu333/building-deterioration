<template lang="pug">
.field
  label {{ label }}
  vue-picture-input(
    :changeOnClick="false"
    @click="expand"
    height="160"
    :hideChangeButton="true"
    :plain="true"
    :prefill="defaultPhoto"
    ref="photo"
    :width="containerWidth"
    :zIndex="200"
  )
  .ui.bottom.attached.menu
    .item(@click="$refs.photo.selectImage()") #[i.camera.icon]拍照
    .item #[i.images.outline.icon]新增
    .right.menu
      .icon.item: i.chevron.left.icon
      .icon.item: i.chevron.right.icon
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

  },

  data() { return {
    containerWidth: window.innerWidth,
    defaultPhoto: require('../lance-anderson-213491-unsplash.jpg'),
    full: false,
  }},

  methods: {

    expand() {
      this.full = true
      const canvas = this.$refs.canvas
      const image = this.$refs.photo.imageObject

      const [ A1, A2 ] = [ image.width, canvas.width ]
      const dA = A2 - A1
      const [ B1, B2 ] = [ image.height, canvas.height ]
      const dB = B2 - B1
      const [ A3, B3 ] = dA < dB
        ? [ A1 + A1 * dB / B1, B2 ]
        : [ A2, B1 + B1 * dA / A1 ]
      this.$refs.canvas.getContext('2d').drawImage(image, (A2 - A3) / 2, (B2 - B3) / 2, A3, B3)
    },

  },

  mounted() {
    this.$refs.canvas.height = window.innerHeight
    this.$refs.canvas.width = window.innerWidth
  },

  props: ['label'],

}
</script>

<style lang="sass" scoped>
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
