<template lang="pug">
#building-page

  #disabled(v-show="disabled"): h1.ui.header {{ disabled }}

  #building.ui.form(v-if="!disabled && -1 != iItem")
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
      button.ui.button(@click="list") #[i.angle.left.icon]房屋列表
      button.ui.button(@click="deterioration") 劣化記錄#[i.angle.right.icon]

  #building-list.-two-column(v-show="!disabled && -1 === iItem")
    .-item(@click="newItem")
      i.huge.icons
        i.circular.home.icon
        i.corner.add.icon
      p 新增建築物
    .-item(v-for="(v, i) in items",@click="changeItem(i)")
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

  data() { return { // {{{
    item: {
      district: '',
      city: '',
      construction: '',
      name: '未命名',
      nFloors: 1,
      usage: '',
    },
    iItem: -1,
    items: [],
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

    changeItem(iItem) {
      this.iItem = iItem
      if (-1 != iItem)
        Object.assign(this.item, this.items[iItem])
      this.$emit('item-change', iItem)
    },

    deterioration() {
      this.saveItem()
      this.$emit('page-change', 'deterioration')
    },

    list() {
      this.saveItem()
      this.changeItem(-1)
    },

    newItem() {
      this.iItem = this.items.length
      this.items.push({
        district: '',
        city: '台南市',
        construction: '',
        name: `未命名${this.iItem+1}`,
        nFloors: 1,
        usage: '',
      })
      this.changeItem(this.iItem)
    },

    saveItem() {
      Object.assign(this.items[this.iItem], this.item)
    },

  },

  props: ['logged-in'],

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
