<template>
  <div>
    <SfHeader
      data-cy="app-header"
      :search-value="term"
      :cartItemsQty="cartTotalItems"
      :accountIcon="accountIcon"
      class="sf-header--has-mobile-search"
      :class="{ 'header-on-top': isSearchOpen }"
      @click:cart="toggleCartSidebar"
      @click:wishlist="toggleWishlistSidebar"
      @click:account="handleAccountClick"
      @enter:search="changeSearchTerm"
      @change:search="(p) => (term = p)"
    >
      <!-- TODO: add mobile view buttons after SFUI team PR -->
      <template #logo>
        <nuxt-link :to="localePath('/')" class="sf-header__logo">
          <SfImage
            src="/icons/logo.svg"
            alt="Vue Storefront Next"
            class="sf-header__logo-image"
          />
        </nuxt-link>
      </template>

      <template v-if="categories.length > 0" #navigation>
        <div class="navigation-wrapper">
          <SfHeaderNavigationItem
            v-for="cat in categories"
            :key="cat.id"
            class="nav-item"
            :data-cy="'app-header-url_' + cat.handle"
            :label="cat.title"
            :link="localePath('/c/' + cat.handle)"
          />
        </div>
      </template>
      <template #aside>
        <LocaleSelector class="smartphone-only" />
      </template>
      <template #header-icons>
        <div class="sf-header__icons">
          <SfButton
            class="sf-button--pure sf-header__action"
            @click="handleAccountClick"
          >
            <SfIcon :icon="accountIcon" size="1.25rem" />
          </SfButton>

          <SfButton
            class="sf-button--pure sf-header__action"
            @click="toggleWishlistSidebar"
          >
            <SfIcon class="sf-header__icon" icon="heart" size="1.25rem" />
          </SfButton>

          <SfButton
            v-e2e="'app-header-cart'"
            class="sf-button--pure sf-header__action"
            @click="toggleCartSidebar"
          >
            <SfIcon class="sf-header__icon" icon="empty_cart" size="1.25rem" />
            <SfBadge
              v-if="cartTotalItems"
              class="sf-badge--number cart-badge"
              >{{ cartTotalItems }}</SfBadge
            >
          </SfButton>
        </div>
      </template>

      <template #search>
        <SfSearchBar
          placeholder="Search for items"
          :value="term"
          :icon="{ size: '1.25rem', color: '#43464E' }"
          aria-label="Search"
          @input="handleSearch"
          @focus="isSearchOpen = true"
        ></SfSearchBar>
      </template>
    </SfHeader>
    <SearchResults
      :visible="isSearchOpen"
      :result="searchResults"
      @close="closeSearch"
    />
    <SfOverlay :visible="isSearchOpen" @click="isSearchOpen = false" />
  </div>
</template>

<script type="module">
import {
  SfHeader,
  SfImage,
  SfButton,
  SfBadge,
  SfSearchBar,
  SfIcon,
  SfOverlay,
} from '@storefront-ui/vue';
import SearchResults from './SearchResults.vue';
import debounce from 'lodash/debounce';
import useUiState from '~/composables/useUiState';
import { onSSR } from '@vue-storefront/core';
import { computed, ref, useRouter } from '@nuxtjs/composition-api';
import useUiHelpers from '~/composables/useUiHelpers';
import LocaleSelector from './LocaleSelector';

import {
  searchGetters,
  useCategory,
  useSearch,
} from '@vue-storefront/shopify';

export default {
  components: {
    SearchResults,
    SfHeader,
    SfImage,
    SfIcon,
    LocaleSelector,
    SfButton,
    SfOverlay,
    SfBadge,
    SfSearchBar,
  },
  props: {
    cartTotalItems: Number,
    isUserAuthenticated: Boolean,
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup(props) {
    const { toggleCartSidebar, toggleWishlistSidebar, toggleLoginModal } =
      useUiState();
    const { changeSearchTerm, getFacetsFromURL } = useUiHelpers();
    const { search: headerSearch, result } = useSearch('header-search');
    const { search, categories } = useCategory('menuCategories');
    const router = useRouter()

    const curCatSlug = ref(getFacetsFromURL().categorySlug);
    const accountIcon = computed(() => props.isUserAuthenticated ? 'profile_fill' : 'profile');


     // TODO: https://github.com/DivanteLtd/vue-storefront/issues/4927
    const handleAccountClick = () => {
      if (isAuthenticated.value) {
        return router.push('/my-account');
      }
      toggleLoginModal();
    };

    // #region Search Section
    const isSearchOpen = ref(false);
    const searchResults = ref(null);
    const term = ref(getFacetsFromURL().term);
    const handleSearch = debounce(async (searchTerm) => {
      if (!searchTerm.target) {
        term.value = searchTerm;
      } else {
        term.value = searchTerm.target.value;
      }

      await headerSearch({
        term: term.value,
      });
    }, 1000);
    const closeSearch = () => {
      if (!isSearchOpen.value) return;
      term.value = '';
      isSearchOpen.value = false;
    };

    searchResults.value = {
      products: computed(() => searchGetters.getItems(result.value)),
    };
    // #endregion Search Section
    onSSR(async () => {
      await search({ slug: '' });
    });
    // onBeforeMount(async () => {
    //   if(root.$i18n && !root.$cookies.get('CurLocaleLang')){
    //     root.$cookies.set('CurLocaleLang', (root.$i18n.localeProperties.alias).toUpperCase(), {maxAge: 60 * 60 * 24 * 24000, path: '/'});
    //   }
    //   else if (root.$i18n && root.$cookies.get('CurLocaleLang') !== (root.$i18n.localeProperties.alias).toUpperCase()){
    //     root.$cookies.set('CurLocaleLang', (root.$i18n.localeProperties.alias).toUpperCase(), {maxAge: 60 * 60 * 24 * 24000, path: '/'});
    //   }
    // })

    return {
      accountIcon,
      closeSearch,
      handleAccountClick,
      toggleCartSidebar,
      toggleWishlistSidebar,
      changeSearchTerm,
      term,
      handleSearch,
      curCatSlug,
      searchResults,
      categories,
      isSearchOpen,
    };
  },
};
</script>

<style lang="scss" scoped>
.sf-header {
  --header-padding: var(--spacer-sm);
  @include for-desktop {
    --header-padding: 0;
  }
  &__logo-image {
    height: 100%;
  }
}
.header-on-top {
  z-index: 2;
}
.navigation-wrapper {
  display: flex;
  white-space: nowrap;
}
.nav-item {
  .sf-header-navigation-item__item--mobile {
    display: none;
  }
  &--mobile {
    padding: var(--spacer-xs) 0;
  }
}
.cart-badge {
  position: absolute;
  bottom: 40%;
  left: 40%;
}
.sf-header-navigation-item {
  ::v-deep &__item--mobile {
    display: block;
  }
}
</style>
