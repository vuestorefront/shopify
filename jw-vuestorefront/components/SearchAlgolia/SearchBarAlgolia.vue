// Algolia Search component
<template>
  <!-- Server-side implementation -->
  <ais-instant-search-ssr>
    <ais-search-box />
    <ais-stats />
    <!-- <ais-hits>
      <template slot="item" slot-scope="{ item }">
        <p>
          <ais-highlight attribute="name" :hit="item" />
        </p>
        <p>
          <ais-highlight attribute="brand" :hit="item" />
        </p>
      </template>
    </ais-hits> -->
  <!-- <ais-pagination /> -->
  </ais-instant-search-ssr>
</template>

<script>
import {
  SfAccordion,
  SfBreadcrumbs,
  SfButton,
  SfHeading,
  SfIcon,
  SfList,
  SfLoader,
  SfMenuItem,
  SfNotification,
  SfPagination,
  SfProductCard,
  SfProductCardHorizontal,
  SfSelect,
  SfSidebar
} from '@storefront-ui/vue';
import {
  AisConfigure,
  AisHighlight,
  AisHits,
  AisIndex,
  AisInstantSearchSsr,
  AisPagination,
  AisPoweredBy,
  AisRefinementList,
  AisSearchBox,
  AisSnippet,
  AisSortBy,
  AisStateResults,
  AisStats,
  createServerRootMixin
} from 'vue-instantsearch';
import algoliasearch from 'algoliasearch/lite';
import 'instantsearch.css/themes/algolia-min.css';

const indexName = 'shopify_products';

const searchClient = algoliasearch(
  'OA7PBOUT59',
  '9c40c9dae3bc853c472a8060b636f708'
);

export default {
  mixins: [
    createServerRootMixin({
      searchClient,
      indexName
    })
  ],
  serverPrefetch() {
    return this.instantsearch.findResultsState(this).then(algoliaState => {
      this.$ssrContext.nuxt.algoliaState = algoliaState;
    });
  },
  beforeMount() {
    const results =
        (this.$nuxt.context && this.$nuxt.context.nuxtState.algoliaState) ||
        window.__NUXT__.algoliaState;

    this.instantsearch.hydrate(results);

    // Remove the SSR state so it can't be applied again by mistake
    delete this.$nuxt.context.nuxtState.algoliaState;
    delete window.__NUXT__.algoliaState;
  },
  components: {
    AisInstantSearchSsr,
    AisSearchBox,
    AisStateResults,
    AisIndex,
    AisConfigure,
    AisRefinementList,
    AisHits,
    AisHighlight,
    AisSnippet,
    AisStats,
    AisPagination,
    AisSortBy,
    AisPoweredBy,
    // Add your other components here
    SfSidebar,
    SfButton,
    SfList,
    SfIcon,
    SfHeading,
    SfMenuItem,
    SfProductCard,
    SfProductCardHorizontal,
    SfPagination,
    SfAccordion,
    SfSelect,
    SfBreadcrumbs,
    SfLoader,
    SfNotification
  },
  head() {
    return {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/npm/instantsearch.css@7.4.5/themes/satellite-min.css'
        }
      ]
    };
  }
};
</script>
