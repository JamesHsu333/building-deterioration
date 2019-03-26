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
      base-select(:items="selects.spaces[building.usage]",label="空間名稱",v-model="item.space")
      base-select(:items="selects.degrees[item.type]",label="劣化程度(選填)",v-model="item.degree")
    .field(v-if="details.includes(item.type) && item.degree != ''")
      label 劣化程度(長x寬)
      .-two-column
        .field
          input(placeholder="長(公分)",v-model="item.details.length")
        .field
          input(placeholder="寬(公分)",v-model="item.details.width")
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
  details: {
    length: '',
    width: '',
  },
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
      degrees: {
        變形: ['輕微', '嚴重'],
        漏水: ['少部分小面積漏水', '少部分大面積漏水', '多處小面積漏水', '多處大面積漏水', '其他'],
        鼓脹: ['自行打字輸入'],
        剝落: ['少部分小塊掉落', '少部分大塊掉落', '多處小塊掉落', '多處大塊掉落', '其他'],
        裂縫: ['寬度', '深度', '長度', '其他'],
        鋼筋外露: ['少部分看的到鋼筋但未有鏽水', '多處看的到鋼筋但未有鏽水', '少部分看的到鋼筋已有鏽水', '多處看的到鋼筋已有鏽水', '其他'],
        白華: ['輕微小面積', '嚴重大面積', '其他'],
      },
      elements: ['柱', '梁', '樓版', '牆', '門窗', '樓梯'],
      spaces: {
        '': [],
        商辦建築: ['迎賓大廳', '地下室', '騎樓', '樓梯間', '其他共用區域', '會議室', '辦公區域', '影印室', '茶水間', '接待室', '開放討論區', '浴廁', '其他'],
        集合住宅: ['迎賓大廳', '地下室', '騎樓', '樓梯間', '其他共用區域', '客廳', '廚房', '臥房', '書房', '餐廳', '儲藏室', '浴廁', '其他'],
        透天住宅: ['騎樓', '客廳', '廚房', '臥房', '書房', '餐廳', '儲藏室', '浴室', '樓梯間', '其他'],
      },
      types: ['變形', '漏水', '鼓脹', '剝落', '裂縫', '鋼筋外露', '白華', '其他'],
    },
    details: ['鼓脹', '剝落', '裂縫', '白華'],
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

.details
  margin-top: 10px

</style>

<!--
  vi:et:sw=2:ts=2
-->
