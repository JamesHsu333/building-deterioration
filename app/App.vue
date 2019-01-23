<template lang="pug">
div

  .ui.fixed.icon.item.labeled.three.menu
    .item(:class="{active: page == 'user'}",@click="page = 'user'") #[i.user.icon]登入
    .item(:class="{active: page == 'house'}",@click="page = 'house'") #[i.home.icon]我的房屋
    .item(:class="{active: page == 'deterioration'}",@click="page = 'deterioration'") #[i.bolt.icon]劣化部位

  .ui.container
    deterioration-page(
      v-show="'deterioration' === page"
      :i-house="iHouse"
      :logged-in="true"
      text="page"
    )
    house-page(
      v-show="'house' === page"
      @item-change="onHouseChange"
      :logged-in="true"
      @save="page = 'deterioration'"
      text="page"
    )
    user-page(v-show="'user' === page",text="page")

</template>

<script>
import 'semantic-ui-offline/semantic.min.css'

export default {

  components: {
    'deterioration-page': require('./components/DeteriorationPage.vue').default,
    'house-page': require('./components/HousePage.vue').default,
    'user-page': require('./components/UserPage.vue').default,
  },

  data() { return {
    iHouse: -1,
    // page: 'deterioration',
    page: 'house',
  }},

  methods: {
    onHouseChange(i) {
      this.iHouse = i
    },
  },

}
</script>

<style lang="sass">
body, button, h1, h2, h3, h4, h5
  font-family: "Microsoft JhengHei" !important

.-photo-label
  background-color: rgba(0,0,0,.25)
  border-top-left-radius: 4px
  bottom: 0
  color: white
  padding: .2em .5em
  position: absolute
  right: 0
  z-index: 10002

.-two-column
  align-items: stretch
  display: flex
  flex-wrap: wrap
  justify-content: space-between

  > *
    flex: 0 0 49%

  .ui.form & .field:last-child
    margin-bottom: 1em

.ui.menu
  border-radius: 0

.ui.container
  padding-top: 7em
</style>

<!--
  vi:et:sw=2:ts=2
-->
