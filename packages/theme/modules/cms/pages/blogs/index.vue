<template>
  <div>...</div>
</template>
<script lang="ts">
import { defineComponent, useRouter, onBeforeMount, useContext } from '@nuxtjs/composition-api';
import { useContent, ContentType } from '@vue-storefront/shopify';

export default defineComponent({
  setup() {
    const context = useContext()
    const router = useRouter()
    const { search, content } = useContent('blogs');

    onBeforeMount(async () => {
      await search({ contentType: ContentType.Blog });

      if (content.value) {
        router.push(context.app.localePath({
          name: 'blogs-handle',
          params: { handle: content?.value?.[0]?.handle }
        }))
      }
    });
  }
});
</script>
