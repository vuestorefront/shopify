<template>
  <SfLoader :loading="loading">
    <article>
      <header>
        <h2>{{ article.title }}</h2>
        <p>
          {{ $t('Published by') }} {{ article.fullAuthorName }} {{ $t('on') }} 
          <time :datetime="article.publishedAt">{{ formatDate(article.publishedAt) }}</time>
        </p>
      </header>

      <div>
        {{ article.content }}
      </div>
    </article>
  </SfLoader>
</template>

<script lang="ts">
import {
  defineComponent,
  useRoute
} from '@nuxtjs/composition-api';
import { SfLoader } from '@storefront-ui/vue';
import { useContent } from '@vue-storefront/shopify';
import { onSSR } from '@vue-storefront/core';
import { ContentType } from '@vue-storefront/shopify/src/types/ContentType';
import useUiHelpers from '~/composables/useUiHelpers';

export default defineComponent({
  components: {
    SfLoader
  },
  setup() {
    const { search, loading, content: article } = useContent('article');
    const { formatDate } = useUiHelpers()
    const route = useRoute();

    onSSR(async () => {
      await search({
        contentType: ContentType.Article,
        id: route.value.query.id as string
      }).then(()=>
        console.log('contents::', article.value)
      );
    });

    return {
      formatDate,
      article,
      loading
    };
  }
});
</script>