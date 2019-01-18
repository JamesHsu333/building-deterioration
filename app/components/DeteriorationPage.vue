<template lang="pug">
#deterioration-page

  #deterioration.ui.form(v-show="itemId")
    .field
      label 劣化位置所在樓層
      select
        option 請選擇
    .field
      label 劣化位置空間名稱
      select
        option 請選擇
    .field
      label 劣化部位
      select
        option 請選擇
    .field
      label 劣化種類
      select
        option 請選擇
    .field
      label 劣化程度(選填)
      select
        option 請選擇
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

  data() { return {

    itemId: null,

    itemIds: ['dummy', 'dummy', 'dummy', 'dummy', 'dummy'],

    items: {
      dummy: { name: '' },
    },

  }},

}
</script>

<style lang="sass" scoped>
#deterioration-page *:not(input):not(select)
  color: white !important

#deterioration-list
  text-align: center

  .-item
    margin: 1em 0

    p
      margin: .5em 0
</style>

<!--
  vi:et:sw=2:ts=2
-->
