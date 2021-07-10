<template lang="html">
  <div class="tabs">
    <ul class='tabs__header'>
      <li v-for='(tab, index) in tabs'
        :key='tab.title'
        @click='selectTab(index)'
        :class='{"tab__selected": (index == selectedIndex)}'>
        {{ tab.title }}
      </li>
    </ul>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      default: 'light'
    }
  },
  data () {
    return {
      selectedIndex: 0,
      tabs: []
    };
  },
  created () {
    this.tabs = this.$children;
  },
  mounted () {
    this.selectTab(0);
  },
  methods: {
    selectTab (i) {
      this.selectedIndex = i;
      // loop over all the tabs
      this.tabs.forEach((tab, index) => {
        tab.isActive = (index === i);
      });
    }
  }
};
</script>

<style lang="scss">

  ul.tabs__header {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
  }

  ul.tabs__header {
    & > li {
      border-bottom: 1px solid var(--_c-gray-DDDDDD);
      position: relative;
      cursor: pointer;
      font-size: 16px;
      line-height: 1.5;
      font-weight: 400;
      color: var(--_c-gray-888888);
      padding: 0 20px 10px;
      transition: all 0.3s ease 0s;
      @include for-mobile {
        font-size: 12px;
        padding: 0 10px 10px;
      }
      &::after {
        content: "";
        position: absolute;
        bottom: -1px;
        left: 0;
        height: 1px;
        width: 0;
        background-color: transparent;
        transition: all 0.3s ease 0s;
      }
      &:hover,
      &.tab__selected {
        color: var(--c-black);
        &::after {
          background-color: var(--c-black);
          width: 100%;
        }
      }
    }
  }

  .tab {
    display: block;
    padding: 30px 0 0;
  }

</style>
