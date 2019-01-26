<template lang="pug">
.field
  label {{ label }}
  vue-picture-input(
    height="160"
    :hideChangeButton="true"
    :plain="true"
    :prefill="defaultPhoto"
    ref="photo"
    :width="containerWidth")
  .ui.bottom.attached.icon.menu
    .item #[i.plus.icon]&nbsp;新增
    .item: i.expand.icon
    .right.menu
      .item: i.angle.left.icon
      .item: i.angle.right.icon
</template>

<script>
export default {

  components: {
    'vue-picture-input': require('vue-picture-input').default,
  },

  data() { return {
    containerWidth: window.innerWidth,
    defaultPhoto: require('../lance-anderson-213491-unsplash.jpg'),
  }},

  methods: {
  },

  props: ['label'],

}
</script>

<style lang="sass" scoped>
</style>

<!--
  vi:et:sw=2:ts=2
-->
