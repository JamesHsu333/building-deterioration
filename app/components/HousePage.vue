<template lang="pug">
#house-page

  #house.ui.inverted.form(v-show="itemId")
    .field
      i.huge.icons
        i.circular.camera.icon
        i.corner.add.icon
      h3.ui.header 建築物整體外觀
    .-two-column
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
    button.ui.inverted.button(@click="itemId = null") 確認

  #house-list.-two-column(v-show="!itemId")
    .-item(@click="itemId = 1")
      i.huge.icons
        i.circular.home.icon
        i.corner.add.icon
      p 新增建築物
    .-item(v-for="v in itemIds")
      i.circular.huge.home.icon
      p {{ items[v].name }}
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
      nFloors: 1,
    },

    itemId: 1,

    itemIds: ['dummy', 'dummy', 'dummy', 'dummy', 'dummy'],

    items: {
      dummy: { name: '' },
    },

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

}
</script>

<style lang="sass" scoped>
#house-page *:not(input):not(select)
  color: white !important

#house

  > :first-child
    text-align: center

    .ui.header
      display: inline-block
      margin-left: 1em

#house-list
  text-align: center

  .-item
    margin: 1em 0

    p
      margin: .5em 0
</style>

<!--
  vi:et:sw=2:ts=2
-->
