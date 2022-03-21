<template>
  <div>...</div>
</template>
<script lang="ts">
import { defineComponent, useRouter, onBeforeMount } from '@nuxtjs/composition-api';
import { useContent, ContentType } from '@vue-storefront/shopify';

export default defineComponent({
  setup() {
    const router = useRouter()
    const { search, content } = useContent('blogs');

    onBeforeMount(async () => {
      await search({ contentType: ContentType.Blog });

      if (content.value) {
        router.push({
          name: 'blogs-handle',
          params: { handle: content?.value?.[0]?.handle }
        })
      }
    });
  }
});
</script>
