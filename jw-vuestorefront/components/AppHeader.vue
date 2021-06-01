<template>
  <!-- Vue Storefront inheritance -->
  <SfHeader
    data-cy="app-header"
    @click:cart="toggleCartSidebar"
    @click:wishlist="toggleWishlistSidebar"
    @click:account="handleAccountClick"
    :cartItemsQty="cartTotalItems"
    :accountIcon="accountIcon"
    class="sf-header--has-mobile-search"
  >
    <!-- TODO: add mobile view buttons after SFUI team PR -->
    <!-- LOGO OVERRIDE - overrides vuestorefront.ui -->
    <template #logo>
      <nuxt-link data-cy="app-header-url_logo" :to="localePath('/')" class="sf-header__logo">
        <!--suppress CheckImageSize -->
        <!-- Logo is pulled from path /static -->
        <img src="/BORN_GROUP_Inc_logo.svg" alt="Vue Storefront Next" width="200" class="sf-header__logo-image"/>
      </nuxt-link>
     <!-- NAVIGATION OVERRIDE - overrides vuestorefront.ui -->
    </template>
    <!-- Navigation override of vsf default -->
    <template #navigation v-if="categories.length > 0">
      <SfHeaderNavigationItem v-for='cat in categories' :key="cat.id" class="nav-item" :data-cy="'app-header-url_' + cat.handle"  :label="cat.title" :link="localePath('/c/' + cat.handle )" />
    </template>
    <template #aside>
      <LocaleSelector class="smartphone-only" />
    </template>
    <!-- Override search bar with Algolia component -->
    <template #search>
    <SearchBarAlgolia/>
    </template>
  </SfHeader>
</template>

<script type="module">
import {SfHeader, SfImage} from '@storefront-ui/vue';
import useUiState from '~/composables/useUiState';
import {cartGetters, useCart, useCategory, useUser, useWishlist} from '@vue-storefront/shopify';
import {computed, ref} from '@vue/composition-api';
import {onSSR} from '@vue-storefront/core';
import useUiHelpers from '~/composables/useUiHelpers';
import LocaleSelector from './LocaleSelector';
// Import of Algolia Search Bar component
import SearchBarAlgolia from '~/components/SearchAlgolia/SearchBarAlgolia.vue';

export default {
  components: {
    SfHeader,
    SfImage,
    LocaleSelector,
    SearchBarAlgolia
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup(props, {root}) {
    const {toggleCartSidebar, toggleWishlistSidebar, toggleLoginModal} = useUiState();
    const {getFacetsFromURL} = useUiHelpers();
    const {isAuthenticated, load: loadUser} = useUser();
    const {cart, load: loadCart} = useCart();
    const {categories} = useCategory('menuCategories');
    const {load: loadWishlist} = useWishlist();
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
      // await search({slug: ''});
    });

    return {
      accountIcon,
      cartTotalItems,
      handleAccountClick,
      toggleCartSidebar,
      toggleWishlistSidebar,
      // changeSearchTerm,
      // term,
      curCatSlug,
      categories
    };
  }
};
</script>

<style lang="scss" scoped>
/* Scoped restricts application of css to this component only */

/* Using SCSS variables to store breakpoints */
$breakpoint-desktop: 1024px;
$breakpoint-tablet: 768px;
$breakpoint-mobile: 480px;
.sf-header {
  --header-padding:  var(--spacer-sm);
  @media (min-width: $breakpoint-desktop) {
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
