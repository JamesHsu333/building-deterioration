<template lang="pug">
#house-page

  #house.ui.form(v-show="itemId")
    .field
      i.huge.icons
        i.circular.camera.icon
        i.corner.add.icon
      h3.ui.header 建築物整體外觀
    .field
      label 地址
      // {{{
      .inline.field
        label 縣市
        select
          option 請選擇
          option(value="1") 台北市
          option(value="2") 新北市
        label 鄉鎮市區
        select
          option 請選擇
        label 路
        select
          option 請選擇
        label 段
        select
          option 請選擇
        label 號
        select
          option 請選擇
        label 樓
        select
          option 請選擇
      // }}}
    .field
      label 建築類型
      select
        option 請選擇
        option 商辦建築
        option 集合住宅
        option 透天住宅
    .field
      label 建築構造
      select
        option 請選擇
        option 鋼筋混凝土
        option 鋼骨鋼筋混凝土
        option 鋼構造
        option 木構造
        option 磚造
    .field
      label 建築物樓層數
      select
        option 請選擇
    button.ui.inverted.button(@click="itemId = null") 確認

  #house-list(v-show="!itemId")
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
#house-page *:not(input):not(select)
  color: white !important

#house

  > :first-child
    text-align: center

    .ui.header
      display: inline-block
      margin-left: 1em

  .inline

    label
      margin-right: 0

    select
      margin: 0 1em 0 .5em
      padding: 0

#house-list
  display: flex
  flex-wrap: wrap
  justify-content: space-evenly
  text-align: center

  .-item
    flex: 0 0 34vw
    margin: 1em 0

    p
      margin: .5em 0
</style>

<!--
  vi:et:sw=2:ts=2
-->
