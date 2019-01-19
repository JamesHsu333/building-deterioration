<template lang="pug">
#house-page

  #house.ui.inverted.form(v-show="-1 != iItem")
    .field
      i.inverted.huge.icons
        i.circular.camera.icon
        i.corner.add.icon
      h3.ui.inverted.header 建築物整體外觀
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
    button.ui.inverted.button(@click="saveItem") 確認

  #house-list.-two-column(v-show="-1 === iItem")
    .-item(@click="newItem")
      i.huge.icons
        i.circular.home.icon
        i.corner.add.icon
      p 新增建築物
    .-item(v-for="(v, i) in items",@click="editItem(i)")
      i.circular.huge.home.icon
      p {{ v.name }}
</template>

<script>
export default {

  components: {
    'base-select': require('./BaseSelect.vue').default,
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

    editItem(iItem) {
      this.iItem = iItem
      Object.assign(this.item, this.items[this.iItem])
    },

    newItem() {
      this.iItem = this.items.length
      this.items.push({
        area: '',
        buildingStructure: '',
        buildingType: '',
        city: '',
        name: '未命名',
        nFloors: 2,
      })
      Object.assign(this.item, this.items[this.iItem])
    },

    saveItem() {
      Object.assign(this.items[this.iItem], this.item)
      this.iItem = -1
    },

  },

}
</script>

<style lang="sass" scoped>
#house

  > :first-child
    color: white
    text-align: center

    .ui.header
      display: inline-block
      margin-left: 1em

#house-list
  color: white
  text-align: center

  .-item
    margin: 1em 0

    p
      margin: .5em 0
</style>

<!--
  vi:et:sw=2:ts=2
-->
