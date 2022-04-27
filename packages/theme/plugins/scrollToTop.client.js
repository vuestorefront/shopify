import Vue from 'vue';

Vue.mixin({
  methods: {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    scrollToTop() {
      if (process.client) {
        window.scrollTo(0, 0);
      }
    }
  }
});
