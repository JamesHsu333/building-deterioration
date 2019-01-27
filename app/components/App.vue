<template lang="pug">
div

  .ui.fixed.icon.item.labeled.three.menu
    .item(:class="{active: page == 'user'}",@click="onUser")
      i.user.icon
      | {{ $store.state.user ? '登出' : '登入' }}
    .item(:class="{active: page == 'building'}",@click="page = 'building'") #[i.home.icon]我的房屋
    .item(:class="{active: page == 'deterioration'}",@click="page = 'deterioration'") #[i.bolt.icon]劣化記錄
  vue-js-modal(name="logout",height="auto",width="90%"): .ui.active.modal
    .content: h3.ui.header 確定要登出嗎？
    .actions
      button.ui.cancel.button(@click="$modal.hide('logout')") 取消
      button.ui.primary.approve.button(@click="logout") 確認

  .ui.container
    login-page(
      v-show="'user' === page"
      @guest-login="guestLogin"
      text="page"
    )
    building-page(
      v-show="'building' === page"
      @item-change="changeBuilding"
      ref="building"
      @page-change="changePage"
      text="page"
    )
    deterioration-page(
      v-show="'deterioration' === page"
      text="page"
    )

</template>

<script>
import 'semantic-ui-offline/semantic.min.css'

export default {

  components: {
    'building-page': require('./BuildingPage.vue').default,
    'deterioration-page': require('./DeteriorationPage.vue').default,
    'login-page': require('./LoginPage.vue').default,
  },

  data() { return {
    user: null,
    iBuilding: -1,
    // page: 'deterioration',
    page: 'user',
  }},

  methods: {

    changeBuilding(i) {
      this.iBuilding = i
    },

    changePage(page) {
      this.page = page
    },

    guestLogin() {
      this.$store.commit('setUser', 'guest')
      this.page = 'building'
    },

    logout() {
      this.$store.commit('setUser')
      this.page = 'user'
      this.$modal.hide('logout')
    },

    onUser() {
      if (this.$store.state.user)
        this.$modal.show('logout')
      else
        this.page = 'user'
    }

  },

  mounted() {
    this.$store.commit('setUser', 'guest')
    this.$refs.building.newItem()
    this.page = 'deterioration'
  },

}
</script>

<style lang="sass">
body, button, h1, h2, h3, h4, h5
  font-family: "Microsoft JhengHei" !important

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

.v--modal
  margin: 0

  .ui.modal
    width: 100%

.ui.container
  padding-bottom: 3.5em
  padding-top: 6.2em
</style>

<!--
  vi:et:sw=2:ts=2
-->
