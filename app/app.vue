<template lang="pug">
#v-app.ui.container

  .ui.three.labeled.icon.item.inverted.menu
    a.item(:class="{active: page == 'user'}",@click="page = 'user'") #[i.user.icon]登入
    a.item(:class="{active: page == 'home'}",@click="page = 'home'") #[i.home.icon]我的房屋
    a.item(:class="{active: page == 'report'}",@click="page = 'report'") #[i.bullhorn.icon]我要回報

  page-user(v-show="page == 'user'",text="page")

  #home.-page(v-show="page == 'home'")

    .ui.list
      .item A
      .item B
      .item C
      .item D
      .item E
      .item F
</template>

<script>
import '!file-loader?name=index.html!extract-loader!html-loader!pug-html-loader!./index.pug'

import 'semantic-ui-offline/semantic.min.css'
// window.$ = window.jQuery = require('jquery')
// require('semantic-ui-offline/semantic.min')
export default {

  components: {
    'page-user': require('./components/PageUser.vue').default,
  },

  created() {
  },

  data() { return {
    page: 'user',
  }},

  methods: {
  },

  mounted() {
  },

}
</script>

<style lang="sass">
body, button, h1, h2, h3, h4, h5
  font-family: "Microsoft JhengHei" !important

body
  background-color: rgba(0,0,0,.5)
</style>

<style lang="sass" scoped>
#home .ui.list
  display: flex
  flex-wrap: wrap

  > .item
    background-color: red
    flex: 0 0 34vw
    margin: 1em

    &:nth-child(2n)
      flex: 1 0 35vw
</style>

<!--
  vi:et:sw=2:ts=2
-->
