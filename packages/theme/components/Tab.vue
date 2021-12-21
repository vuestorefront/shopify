<template lang="html">
  <div v-show='isActive' class='tab'>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Tab'
    }
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  data () {
    return {
      isActive: true
    };
  }
};
</script>
