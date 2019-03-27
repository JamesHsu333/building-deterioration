<template lang="pug">
.field
  label {{ label }}
  select(@change="$emit('input',$event.target.value)",:value="value")
    option(disabled,value="") 請選擇
    option(v-for="v in items",:key="v",:value="v") {{ v }}
</template>

<script>
export default {

  props: ['items', 'label', 'value'],

  watch: {
    items(newVal, oldVal) {
      if (newVal.includes(this.value)) {
        this.$emit('input', this.value)
      } else
        this.$emit('input', newVal[0])
    },
  },

}
</script>

<style lang="sass" scoped>
.ui.form select
  padding: .5em 1em
</style>

<!--
  vi:et:sw=2:ts=2
-->
