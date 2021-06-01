<!-- ALGOLIA SEARCH COMPONENT -->
<template>
  <!-- Server-side implementation -->
  <ais-instant-search-ssr>
    <!-- Algolia Global Search Box -->
    <ais-search-box />
    <!-- Search Parameters -->
    <ais-configure :hits-per-page.camel="5" />
    <!-- Search results statistics -->
      <!-- <ais-stats /> -->
      <!-- <ais-hits :escape-HTML="true">
        <div slot="item" slot-scope="{ item }">
          <h2>
            <ais-highlight
                attribute="name"
                :hit="item"
                highlightedTagName="mark"
            />
          </h2>
          <p>
            <ais-snippet
                attribute="description"
                :hit="item"
                highlightedTagName="mark"
            />
          </p>
        </div>
      </ais-hits> -->
    <ais-configure
        :attributesToSnippet="['description']"
        snippetEllipsisText="[…]"
    />
    <!-- <ais-state-results>
      <template slot-scope="{ state: { query }, results: { hits, nbPages } }">
        <div v-if="query && hits.length == 0">No results</div>
        <div v-else></div>

        <ais-pagination v-if="nbPages > 0"/>
      </template>
    </ais-state-results> -->
  </ais-instant-search-ssr>
</template>

<script>
// TODO lessen the overlap between the storefront and search - JW 6/1/2021
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

// Libraries
import {useUiState} from '~/composables';
import algoliasearch from 'algoliasearch/lite';
import 'instantsearch.css/themes/algolia-min.css';

// Sets Algolia Search Index
const indexName = 'shopify_products';

const searchClient = algoliasearch(
  'OA7PBOUT59',
  '9c40c9dae3bc853c472a8060b636f708'
);

// to disable listing on load
const algoliaSearchClient = {
  search(requests) {
    if (requests.every(({ params }) => !params.query)) {
      return Promise.resolve({
        results: requests.map(() => ({
          hits: [],
          nbHits: 0,
          nbPages: 0,
          processingTimeMS: 0
        }))
      });
    }
    return searchClient.search(requests);
  }
};

function nuxtRouter(vueRouter) {
  return {
    read() {
      return vueRouter.currentRoute.query;
    },
    write(routeState) {
      // Only push a new entry if the URL changed (avoid duplicated entries in the history)
      if (this.createURL(routeState) === this.createURL(this.read())) {
        return;
      }
      vueRouter.push({
        query: routeState
      });
    },
    createURL(routeState) {
      return vueRouter.resolve({
        query: routeState
      }).href;
    },
    onUpdate(cb) {
      if (typeof window === 'undefined') return;

      this._onPopState = event => {
        const routeState = event.state;
        // On initial load, the state is read from the URL without
        // update. Therefore, the state object isn't present. In this
        // case, we fallback and read the URL.
        if (!routeState) {
          cb(this.read());
        } else {
          cb(routeState);
        }
      };
      window.addEventListener('popstate', this._onPopState);
    },
    dispose() {
      if (typeof window === 'undefined') return;

      window.removeEventListener('popstate', this._onPopState);
    }
  };
}

export default {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  data() {
    const mixin = createServerRootMixin({
      searchClient,
      indexName,
      algoliaSearchClient,
      routing: {
        router: nuxtRouter(this.$router)
      }
    });
    return {
      ...mixin.data()
    };
  },

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  provide() {
    return {
      // Provide the InstantSearch instance for SSR
      // eslint-disable-next-line camelcase
      $_ais_ssrInstantSearchInstance: this.instantsearch
    };
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  serverPrefetch() {
    return this.instantsearch.findResultsState(this).then(algoliaState => {
      this.$ssrContext.nuxt.algoliaState = algoliaState;
    });
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  beforeMount() {
    const results =
        (this.$nuxt.context && this.$nuxt.context.nuxtState.algoliaState) ||
        window.__NUXT__.algoliaState;

    this.instantsearch.hydrate(results);

    // Remove the SSR state so it can't be applied again by mistake
    delete this.$nuxt.context.nuxtState.algoliaState;
    delete window.__NUXT__.algoliaState;
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup() {
    const uiState = useUiState();
    return {
      ...uiState
    };
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
  }
};
</script>

<style lang="scss">
@import '~@storefront-ui/vue/styles';

/* Vue Storefront styles */
$breakpoint-desktop: 1024px;
$breakpoint-tablet: 768px;
$breakpoint-mobile: 480px;
#search {
  box-sizing: border-box;
  @media (min-width: $breakpoint-desktop) {
    max-width: 1240px;
    margin: 0 auto;
  }
}
.main {
  &.section {
    padding: var(--spacer-xs);
    @media (min-width: $breakpoint-desktop) {
      padding: 0;
    }
  }
}
.breadcrumbs {
  padding: var(--spacer-base) 0;
}
.navbar {
  position: relative;
  display: flex;
  border: 1px solid var(--c-light);
  border-width: 0 0 1px 0;
  @media (min-width: $breakpoint-desktop) {
    border-width: 1px 0 1px 0;
  }
  &.section {
    padding: var(--spacer-sm);
    @media (min-width: $breakpoint-desktop) {
      padding: 0;
    }
  }
  &__aside,
  &__main {
    display: flex;
    align-items: center;
    padding: var(--spacer-sm) 0;
    flex: 1;
    padding: 0;
    @media (min-width: $breakpoint-desktop) {
      padding: var(--spacer-xs) var(--spacer-xl);
    }
  }
  &__aside {
    flex: 0 0 20%;
    padding: var(--spacer-sm) var(--spacer-sm);
    border: 1px solid var(--c-light);
    border-width: 0 1px 0 0;
  }
  &__title {
    --heading-title-font-weight: var(--font-weight--light);
    --heading-title-font-size: var(--font-size--xl);
  }
  &__filters-icon {
    margin: 0 var(--spacer-sm) 0 0;
  }
  &__filters-button {
    --button-color: var(--c-link);
    --button-font-size: var(--font-size--base);
    --button-font-weight: var(--font-weight--normal);
    --button-text-decoration: none;
    display: flex;
    align-items: center;
    @media (min-width: $breakpoint-mobile)  {
      order: 1;
    }
    svg {
      fill: var(--c-text-muted);
      transition: fill 150ms ease;
    }
    &:hover {
      svg {
        fill: var(--c-primary);
      }
    }
  }
  &__label {
    font-family: var(--font-family--secondary);
    font-weight: var(--font-weight--normal);
    color: var(--c-link);
    margin: 0 var(--spacer-xs) 0 0;
  }
  &__select {
    --select-option-font-size: var(--font-size--base);
    --select-padding: var(--spacer-sm) 0;
    ::v-deep .sf-select__dropdown {
      font-size: var(--font-size--base);
      margin: var(--spacer-2xs) 0 0 0;
    }
  }
  &__sort {
    display: flex;
    align-items: center;
    margin: 0 auto 0 var(--spacer-2xl);
  }
  &__counter {
    font-family: var(--font-family--secondary);
    margin: auto;
    @media (min-width: $breakpoint-desktop)  {
      margin: auto 0 auto auto;
    }
  }
  &__view {
    display: flex;
    align-items: center;
    @media (min-width: $breakpoint-desktop)  {
      margin: 0 0 0 var(--spacer-2xl);
    }
    @media (min-width: $breakpoint-desktop)  {
      order: -1;
    }
    &-icon {
      cursor: pointer;
      margin: 0 var(--spacer-base) 0 0;
      &:last-child {
        margin: 0;
      }
    }
    &-label {
      margin: 0 var(--spacer-sm) 0 0;
      font: var(--font-weight--normal) var(--font-size--base) / 1.6
      var(--font-family--secondary);
      color: var(--c-link);
    }
  }
}
.sort-by {
  --select-dropdown-z-index: 1;
  flex: unset;
  width: 11.875rem;
}
.main {
  display: flex;
}
.sidebar {
  flex: 0 0 20%;
  padding: var(--spacer-sm);
  border: 1px solid var(--c-light);
  border-width: 0 1px 0 0;
}
.sidebar-filters {
  --sidebar-title-display: none;
  --sidebar-top-padding: 0;
  @media (min-width: $breakpoint-desktop)  {
    --sidebar-content-padding: 0 var(--spacer-xl);
    --sidebar-bottom-padding: 0 var(--spacer-xl);
  }
}
.list {
  --menu-item-font-size: var(--font-sm);
  &__item {
    &:not(:last-of-type) {
      --list-item-margin: 0 0 var(--spacer-sm) 0;
    }
  }
}
.products {
  box-sizing: border-box;
  flex: 1;
  margin: 0;
  &__grid,
  &__list {
    display: flex;
    flex-wrap: wrap;
  }
  &__grid {
    justify-content: space-between;
  }
  &__grid,
  &__list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    @media (min-width: $breakpoint-desktop) {
      justify-content: flex-start;
    }
  }
  &__product-card {
    --product-card-add-button-transform: translate3d(0, 30%, 0);
    flex: 1 1 50%;
    @media (min-width: $breakpoint-desktop) {
      --product-card-padding: var(--spacer-sm);
      flex: 1 1 25%;
    }
  }
  &__product-card-horizontal {
    flex: 0 0 100%;
  }
  &__slide-enter {
    opacity: 0;
    transform: scale(0.5);
  }
  &__slide-enter-active {
    transition: all 0.2s ease;
    transition-delay: calc(0.1s * var(--index));
  }
  &__pagination {
    display: flex;
    justify-content: center;
    margin: var(--spacer-xl) 0 0 0;
  }
  @media (min-width: $breakpoint-desktop) {
    margin: var(--spacer-sm) 0 0 var(--spacer-sm);
    &__pagination {
      &__options {
        display: flex;
        align-items: baseline;
        justify-content: flex-end;
      }
      &__label {
        font-family: var(--font-family--secondary);
        font-size: var(--font-size--sm);
        font-weight: var(--font-weight--normal);
        color: var(--c-link);
        margin-right: var(--spacer-2xs);
      }
    }
    &__product-card-horizontal {
      margin: var(--spacer-lg) 0;
    }
    &__product-card {
      flex: 1 1 25%;
    }
    &__list {
      margin: 0 0 0 var(--spacer-sm);
    }
  }
}
.filters {
  &__accordion-item {
    --accordion-item-content-padding: 0;
    position: relative;
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
    width: 100vw;
  }
}
</style>

