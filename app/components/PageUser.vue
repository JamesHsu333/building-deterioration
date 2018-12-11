<template lang="pug">
div

  #welcome
    h1.ui.header {{text}}
    i.massive.home.icon
    p 行動建築劣化自主檢查

  .ui.form
    .inline.field #[i.inverted.user.icon]#[label 屋主] #[input]
    .inline.field #[i.inverted.user.icon]#[label 志工] #[input]
    button.ui.inverted.button Sign In
</template>

<script>
export default {

  data() { return {
  }},

  props: [
    'text',
  ],

}
</script>

<style lang="sass" scoped>
#welcome, .ui.form
  color: white
  margin: 2em 0
  text-align: center
</style>

<!--
  vi:et:sw=2:ts=2
-->
