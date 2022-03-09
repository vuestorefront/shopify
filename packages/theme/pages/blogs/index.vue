<template>
  <div>...</div>
</template>
<script lang="ts">
import { defineComponent, useRouter, onBeforeMount } from '@nuxtjs/composition-api';
import { useContent } from '@vue-storefront/shopify';
import { ContentType } from '@vue-storefront/shopify/src/types/ContentType';

export default defineComponent({
  setup() {
    const router = useRouter()
    const { search, content } = useContent('blogs');

    onBeforeMount(async () => {
      await search({ contentType: ContentType.Blog });

      if (content.value) {
        router.push(`/blogs/${content?.value?.[0]?.handle}`)
      }
    });
  }
});
</script>
