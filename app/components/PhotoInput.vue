<template lang="pug">
.field
  label {{ label }}
  vue-picture-input(
    height="160"
    :hideChangeButton="true"
    :plain="true"
    :prefill="defaultPhoto"
    ref="photo"
    :width="containerWidth"
    :zIndex="200"
  )
  .ui.bottom.attached.icon.menu
    .item #[i.plus.icon]&nbsp;新增
    .item(@click="full = true"): i.expand.icon
    .right.menu
      .item: i.angle.left.icon
      .item: i.angle.right.icon
  canvas(ref="canvas",:style="canvasStyle")
</template>

<script>
export default {

  components: {
    'vue-picture-input': require('vue-picture-input').default,
  },

  computed: {
  },

  data() { return {
    containerWidth: window.innerWidth,
    defaultPhoto: require('../lance-anderson-213491-unsplash.jpg'),
    full: false,
  }},

  methods: {
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
  background-color: red
  left: 0
  opacity: 0
  position: fixed
  top: 0
  z-index: -1
</style>

<!--
  vi:et:sw=2:ts=2
-->
