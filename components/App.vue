<template lang="pug">
div

  .ui.fixed.icon.item.labeled.three.menu
    .item(:class="{active: page == 'user'}",@click="onUser")
      i.user.icon
      | {{ user ? '登出' : '登入' }}
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
      :loggedIn="user"
      @item-change="buildingChange"
      ref="building"
      @change-page="changePage"
      text="page"
      )
    deterioration-page(
      v-show="'deterioration' === page"
      :logged-in="user"
      ref="deterioration"
      @submit="submit"
      text="page"
      )

</template>

<script>
import 'semantic-ui-offline/semantic.min.css'
import axios from 'axios'
import 'babel-polyfill'

export default {

  components: {
    'building-page': require('./BuildingPage.vue').default,
    'deterioration-page': require('./DeteriorationPage.vue').default,
    'login-page': require('./LoginPage.vue').default,
  },

  created() {
    this.getDatas()
  },

  data() { return {
    page: 'user',
    user: null,
    datas: {},
  }},

  methods: {

    buildingChange(iBuilding) {
      const { building, deterioration } = this.$refs
      if (!deterioration)
        return
      deterioration.building = building.item
      deterioration.iItem = deterioration.items.length
    },

    changePage(page) {
      this.page = page
    },

    async getDatas() {
      let self = this;
      axios.get('/getDatas/')
        .then(function(response) {
          const res = response.data.list
          self.datas = res
          console.log(self.datas)
        })
    },

    guestLogin() {
      this.page = 'building'
      this.user = 'guest'
    },

    logout() {
      this.page = 'user'
      this.user = null
      this.$modal.hide('logout')
    },

    onUser() {
      if (this.user)
        this.$modal.show('logout')
      else
        this.page = 'user'
    },

    submit() {
      console.log(this.$refs.building.item) //! submit to server
    },

  },

  mounted() {
    this.page = 'building'
    this.user = 'guest'
    this.$refs.building.newItem()
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
