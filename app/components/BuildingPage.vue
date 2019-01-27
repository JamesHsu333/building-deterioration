<template lang="pug">
#building-page

  #disabled(v-show="disabled"): h1.ui.header {{ disabled }}

  #building.ui.form(v-if="!disabled && undefined != iItem")
    photo-input(label="建築物外觀")
    .-two-column
      .field
        label 建物名稱
        input(v-model="item.name",placeholder="請輸入")
      base-select(:items="selects.cities",label="縣市",v-model="item.city")
      base-select(:items="selects.districts[item.city]",label="市區鄉鎮",v-model="item.district")
      .field
        label 路巷弄號
        input(v-model="item.road",placeholder="請輸入")
      base-select(:items="selects.usages",label="建築用途",v-model="item.usage")
      base-select(:items="selects.constructions",label="構造類別",v-model="item.construction")
      .field
        label 樓層
        input(v-model.number="item.nFloors",placeholder="請輸入")
    .ui.fixed.item.menu: .item
      button.ui.primary.button(@click="list") #[i.chevron.left.icon]房屋列表
      button.ui.primary.button(@click="deterioration") 劣化記錄#[i.chevron.right.icon]

  #building-list.-two-column(v-show="!disabled && undefined == iItem")
    .-item(@click="newItem")
      i.huge.icons
        i.circular.home.icon
        i.corner.add.icon
      p 新增建築物
    .-item(v-for="(v, i) in items",@click="setItem(i)")
      i.circular.huge.home.icon
      p {{ v.name }}
</template>

<script>
const defaultBuilding = {
  district: '',
  city: '台南市',
  construction: '',
  name: '未命名',
  nFloors: 1,
  usage: '',
}

export default {

  components: {
    'base-select': require('./BaseSelect').default,
    'photo-input': require('./PhotoInput').default,
  },

  computed: {

    disabled() {
      if (!this.$store.state.user)
        return '請先登入'
      return false
    },

    iItem() {
      return this.$store.state.iBuilding
    },

    items() {
      return this.$store.state.buildings
    },

  },

  data() { return { // {{{
    item: {...defaultBuilding},
    selects: {
      cities: ['台南市'],
      constructions: ['鋼筋混凝土', '鋼骨鋼筋混凝土', '鋼構造', '木構造', '磚造'],
      districts: {
        台南市: ['東區', '南區', '北區', '安南區', '安平區', '中西區'],
      },
      usages: ['商辦建築', '集合住宅', '透天住宅'],
    },
  }}, // }}}

  methods: {

    deterioration() {
      this.$store.commit('setBuilding', this.item)
      this.$emit('page-change', 'deterioration')
    },

    list() {
      this.$store.commit('setBuilding', this.item)
      this.$store.commit('setIBuilding')
    },

    newItem() {
      const building = { ...defaultBuilding }
      building.name += this.$store.state.buildings.length + 1
      this.$store.commit('addBuilding', building)
      this.setItem(-1)
    },

    setItem(i) {
      this.$store.commit('setIBuilding', i)
      this.item = { ...this.$store.getters.item }
    },

  },

}
</script>

<style lang="sass" scoped>
.ui.fixed.menu
  bottom: 0
  top: auto

  .ui.button + .ui.button
    margin-left: .5em

#building .field
  position: relative


#building-list
  text-align: center

  .-item
    margin: 1em 0

    p
      margin: .5em 0

#disabled
  text-align: center
</style>

<!--
  vi:et:sw=2:ts=2
-->
