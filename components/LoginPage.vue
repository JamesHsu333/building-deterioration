<template lang="pug">
#user-page

  div
    h1.ui.header Welcome
    i.massive.home.icon
    h3.ui.header 行動建築劣化自主檢查

  .ui.form
    .inline.field #[label #[i.user.icon]屋主]#[input]
    .inline.field #[label #[i.user.icon]志工]#[input]
    button.ui.button(@click="$emit('guest-login')") 訪客登入
    button.ui.primary.button 一般登入
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
</style>

<!--
  vi:et:sw=2:ts=2
-->
