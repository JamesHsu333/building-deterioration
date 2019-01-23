<template lang="pug">
#user-page

  div
    h1.ui.header Welcome
    i.massive.home.icon
    h3.ui.header 行動建築劣化自主檢查

  .ui.form
    .inline.field #[i.inverted.user.icon]#[label 屋主]#[input]
    .inline.field #[i.inverted.user.icon]#[label 志工]#[input]
    button.ui.primary.button 登入
</template>

<script>
export default {

  data() { return {
  }},

}
</script>

<style lang="sass" scoped>
#user-page
  text-align: center

  >:first-child
    margin: 2em 0

  label
    margin-right: 1em
</style>

<!--
  vi:et:sw=2:ts=2
-->
