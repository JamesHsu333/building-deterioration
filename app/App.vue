<template lang="pug">
#v-app

  .ui.icon.inverted.item.labeled.three.menu
    a.item(:class="{active: page == 'user'}",@click="page = 'user'") #[i.user.icon]登入
    a.item(:class="{active: page == 'house'}",@click="page = 'house'") #[i.home.icon]我的房屋
    a.item(:class="{active: page == 'deterioration'}",@click="page = 'deterioration'") #[i.bolt.icon]劣化部位

  .ui.container
    deterioration-page(v-show="'deterioration' === page",text="page")
    house-page(v-show="'house' === page",text="page")
    user-page(v-show="'user' === page",text="page")

</template>

<script>
//import '!file-loader?name=index.html!extract-loader!html-loader!pug-html-loader!./index.pug'
import 'semantic-ui-offline/semantic.min.css'
export default {

  components: {
    'deterioration-page': require('./components/DeteriorationPage.vue').default,
    'house-page': require('./components/HousePage.vue').default,
    'user-page': require('./components/UserPage.vue').default,
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

<!--
  vi:et:sw=2:ts=2
-->
