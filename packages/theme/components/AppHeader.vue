<template>
  <SfHeader
    data-cy="app-header"
    @click:cart="toggleCartSidebar"
    @click:wishlist="toggleWishlistSidebar"
    @click:account="handleAccountClick"
    @enter:search="changeSearchTerm"
    @change:search="p => term = p"
    :searchValue="term"
    :cartItemsQty="cartTotalItems"
    :accountIcon="accountIcon"
    class="sf-header--has-mobile-search"
  >
    <!-- TODO: add mobile view buttons after SFUI team PR -->
    <template #logo>
      <nuxt-link data-cy="app-header-url_logo" :to="localePath('/')" class="sf-header__logo">
        <img src="https://cdn.shopify.com/s/files/1/0407/1902/4288/files/logo.svg?v=1616475953" alt="Vue Storefront Next" width="34" height="35" class="sf-header__logo-image"/>
      </nuxt-link>
    </template>

    <template #navigation v-if="categories.length > 0">
      <SfHeaderNavigationItem v-for='cat in categories' :key="cat.id" class="nav-item" :data-cy="'app-header-url_' + cat.handle"  :label="cat.title" :link="localePath('/c/' + cat.handle )" />
    </template>
    <template #aside>
      <LocaleSelector class="smartphone-only" />
    </template>
  </SfHeader>
</template>

<script type="module">
import { SfHeader, SfImage } from '@storefront-ui/vue';
import useUiState from '~/composables/useUiState';
import { useCart, useWishlist, useUser, cartGetters, useCategory } from '@vue-storefront/shopify';
import { computed, ref } from '@vue/composition-api';
import { onSSR } from '@vue-storefront/core';
import useUiHelpers from '~/composables/useUiHelpers';
import LocaleSelector from './LocaleSelector';

export default {
  components: {
    SfHeader,
    SfImage,
    LocaleSelector
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup(props, { root }) {
    const { toggleCartSidebar, toggleWishlistSidebar, toggleLoginModal } = useUiState();
    const { changeSearchTerm, getFacetsFromURL } = useUiHelpers();
    const { isAuthenticated, load: loadUser } = useUser();
    const { cart, load: loadCart } = useCart();
    const { search, categories } = useCategory('menuCategories');
    const { load: loadWishlist } = useWishlist();
    const term = ref(getFacetsFromURL().term);
    const curCatSlug = ref(getFacetsFromURL().categorySlug);
    const cartTotalItems = computed(() => {
      const count = cartGetters.getTotalItems(cart.value);
      return count ? count.toString() : null;
    });

    const accountIcon = computed(() => isAuthenticated.value ? 'profile_fill' : 'profile');

    // TODO: https://github.com/DivanteLtd/vue-storefront/issues/4927
    const handleAccountClick = async () => {
      if (isAuthenticated.value) {
        return root.$router.push('/my-account');
      }

      toggleLoginModal();
    };

    onSSR(async () => {
      await loadUser();
      await loadCart();
      await loadWishlist();
      await search({slug: ''});
    });

    return {
      accountIcon,
      cartTotalItems,
      handleAccountClick,
      toggleCartSidebar,
      toggleWishlistSidebar,
      changeSearchTerm,
      term,
      curCatSlug,
      categories
    };
  }
};
</script>

<style lang="scss" scoped>
.sf-header {
  --header-padding:  var(--spacer-sm);
  @include for-desktop {
    --header-padding: 0;
  }
  &__logo-image {
      height: 100%;
  }
}

.nav-item {
  --header-navigation-item-margin: 0 var(--spacer-base);
}
</style>
