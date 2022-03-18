<template>
  <div>...</div>
</template>
<script lang="ts">
import { defineComponent, useRouter, useContext, onBeforeMount } from '@nuxtjs/composition-api';
import { useContent } from '@vue-storefront/shopify';
import { ContentType } from '@vue-storefront/shopify/src/types/ContentType';

export default defineComponent({
  setup() {
    const context = useContext()
    const router = useRouter()
    const { search, content } = useContent('blogs');

    onBeforeMount(async () => {
      await search({ contentType: ContentType.Blog });

      if (content.value) {
        const blogsRoute = context.$config?.blogsRoute ?? '/blogs'
        router.push(`${blogsRoute}/${content?.value?.[0]?.handle}`)
      }
    });
  }
});
</script>
