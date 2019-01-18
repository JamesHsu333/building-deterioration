<template lang="pug">
.field
  label {{ label }}
  select(@change="$emit('input',$event.target.value)",:value="value")
    option(disabled,value="") 請選擇
    option(v-for="v in items",:value="v") {{ v }}
</template>

<script>
export default {
  props: ['items', 'label', 'value']
}
</script>

<style lang="sass" scoped>
.ui.form .field:last-child
  margin-bottom: 1em

.ui.form select
  padding: .5em 1em
</style>
