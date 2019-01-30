<template lang="pug">
#deterioration-page

  #deterioration.ui.form(v-if="!disabled && iItem < items.length")
    photo-input(label="劣化部位外觀")
    .-two-column
      .field
        label 名稱
        input(v-model="item.name",placeholder="請輸入")
      .field
        label 座落樓層
        input(v-model.number="item.floor",placeholder="請輸入")
      base-select(:items="selects.types",label="劣化種類",v-model="item.type")
      base-select(:items="selects.elements",label="部位",v-model="item.element")
      base-select(:items="selects.spaces",label="空間名稱",v-model="item.space")
      base-select(:items="selects.degrees",label="劣化程度(選填)",v-model="item.degree")
    .ui.fixed.icon.item.menu
      .item: button.ui.primary.button(@click="iItem = items.length") #[i.check.icon]確認

  #deterioration-list.-two-column(v-show="!disabled && iItem >= items.length")
    .-item(@click="newItem")
      i.huge.icons
        i.circular.bolt.icon
        i.corner.add.icon
      p 新增劣化記錄
    .-item(v-for="(v, i) in items",@click="setIItem(i)")
      i.circular.huge.bolt.icon
      p {{ v.name }}
    .ui.fixed.icon.item.labeled.menu: .item
      button.ui.primary.button(
        :class="{disabled: 0 === items.length}"
        @click="$emit('submit')"
        ) #[i.upload.icon]送出

  #disabled(v-show="disabled"): h1.ui.header {{ disabled }}
</template>

<script>
const defaultDeterioration = {
  degree: '',
  element: '',
  floor: 1,
  name: '未命名',
  space: '',
  type: '',
}

export default {

  components: {
    'base-select': require('./BaseSelect').default,
    'photo-input': require('./PhotoInput').default,
  },

  computed: {

    disabled() {
      if (!this.loggedIn)
        return '請先登入'
      if (!this.building)
        return '請先選擇房屋'
      return false
    },

    items() {
      return this.building ? this.building.deteriorations : []
    },

  },

  data() { return {
    building: null,
    iItem: 0,
    item: { ...defaultDeterioration },
    selects: {
      degrees: ['程度'],
      spaces: ['空間'],
      parts: ['部位'],
      types: ['種類'],
    },
  }},

  methods: {

    newItem() {
      this.iItem = this.items.length
      this.item = { ...defaultDeterioration }
      this.item.name += this.iItem + 1
      this.building.deteriorations.push(this.item)
    },

    setIItem(i) {
      this.iItem = i
      this.item = this.items[i]
    },

  },

  props: ['loggedIn'],

}
</script>

<style lang="sass" scoped>
.ui.fixed.menu
  bottom: 0
  top: auto

#deterioration .field
  position: relative

#deterioration-list
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
