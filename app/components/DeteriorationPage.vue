<template lang="pug">
#deterioration-page

  #deterioration.ui.inverted.form(v-show="itemId")
    .-two-column
      .field
        label 劣化位置所在樓層
        input(v-model.number="item.floor",placeholder="請輸入")
      base-select(:items="selects.spaces",label="劣化位置空間名稱",v-model="item.space")
      base-select(:items="selects.parts",label="劣化部位",v-model="item.part")
      base-select(:items="selects.types",label="劣化種類",v-model="item.type")
      base-select(:items="selects.degrees",label="劣化程度(選填)",v-model="item.degree")
    button.ui.inverted.button(@click="itemId = null") 確認

  #deterioration-list.-two-column(v-show="!itemId")
    .-item(@click="itemId = 1")
      i.huge.icons
        i.circular.home.icon
        i.corner.add.icon
      p 新增劣化部位
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
      degree: '',
      floors: 1,
      part: '',
      space: '',
      type: '',
    },

    itemId: 1,

    itemIds: ['dummy', 'dummy', 'dummy', 'dummy', 'dummy'],

    items: {
      dummy: { name: '' },
    },

    selects: {
      degrees: ['程度'],
      spaces: ['空間'],
      parts: ['部位'],
      types: ['種類'],
    },

  }},

}
</script>

<style lang="sass" scoped>
#deterioration-list
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
