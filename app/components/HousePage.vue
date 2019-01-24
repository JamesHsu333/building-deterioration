<template lang="pug">
#house-page

  #disabled(v-show="disabled"): h1.ui.header {{ disabled }}

  #house.ui.form(v-if="!disabled && -1 != iItem")
    photo-input(label="建築物外觀")
    .-two-column
      .field
        label 名稱
        input(v-model="item.name",placeholder="請輸入")
      base-select(:items="selects.cities",label="縣市",v-model="item.city")
      base-select(:items="selects.areas[item.city]",label="鄉鎮市區",v-model="item.area")
      .field
        label 路巷弄號
        input(v-model="item.road",placeholder="請輸入")
      base-select(:items="selects.buildingTypes",label="建築類型",v-model="item.buildingType")
      base-select(:items="selects.buildingStructures",label="建築構造",v-model="item.buildingStructure")
      .field
        label 建築物樓層數
        input(v-model.number="item.nFloors",placeholder="請輸入")
    .ui.fixed.icon.item.menu
      .item: button.ui.primary.button(@click="saveItem") 確認

  #house-list.-two-column(v-show="!disabled && -1 === iItem")
    .-item(@click="newItem")
      i.huge.icons
        i.circular.home.icon
        i.corner.add.icon
      p 新增建築物
    .-item(v-for="(v, i) in items",@click="selectItem(i)")
      i.circular.huge.home.icon
      p {{ v.name }}
</template>

<script>
export default {

  components: {
    'base-select': require('./BaseSelect').default,
    'photo-input': require('./PhotoInput').default,
  },

  computed: {

    disabled() {
      if (!this.loggedIn)
        return '請先登入'
      return false
    },

  },

  data() { return {
    item: {
      area: '',
      buildingStructure: '',
      buildingType: '',
      city: '',
      name: '未命名',
      nFloors: 1,
    },
    iItem: -1,
    items: [],
    selects: {
      areas: {
        台北市: [],
        新北市: ['中和區', '永和區'],
      },
      buildingStructures: ['鋼筋混凝土', '鋼骨鋼筋混凝土', '鋼構造', '木構造', '磚造'],
      buildingTypes: ['商辦建築', '集合住宅', '透天住宅'],
      cities: ['台北市', '新北市'],
    },
  }},

  methods: {

    newItem() {
      this.iItem = this.items.length
      this.items.push({
        area: '',
        buildingStructure: '',
        buildingType: '',
        city: '',
        name: `未命名${this.iItem+1}`,
        nFloors: 1,
      })
      Object.assign(this.item, this.items[this.iItem])
      this.$emit('item-change', this.iItem)
    },

    saveItem() {
      Object.assign(this.items[this.iItem], this.item)
      this.$emit('save')
    },

    selectItem(iItem) {
      this.iItem = iItem
      Object.assign(this.item, this.items[this.iItem])
      this.$emit('item-change', this.iItem)
    },

  },

  mounted() {
    this.newItem()
  },

  props: ['logged-in'],

}
</script>

<style lang="sass" scoped>
.ui.fixed.menu
  bottom: 0
  top: auto

#house .field
  position: relative


#house-list
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
