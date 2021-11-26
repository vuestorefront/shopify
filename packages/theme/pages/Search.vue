<template>
  <div>
    {{ products }}
  </div>
</template>


<script lang="ts">
import {
  defineComponent,
  watchEffect,
  computed,
} from '@nuxtjs/composition-api';

import { onSSR } from '@vue-storefront/core';
import { useSearch } from '@vue-storefront/shopify';

export default defineComponent({
  setup() {
    const { search, result } = useSearch('products');
    const products = computed(() => result.value);

    watchEffect(() => {
      console.log(result.value);
    });

    onSSR(async () => {
      await search({
        term: 'b',
        perPage: 10
      });
    });

    return {
      products,
    };
  },
});
</script>
