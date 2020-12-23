<template>
  <SfHeader
    data-cy="app-header"
    @click:cart="toggleCartSidebar"
    @click:wishlist="toggleWishlistSidebar"
    @click:account="handleAccountClick"
    @enter:search="changeSearchTerm"
    @change:search="(p) => (term = p)"
    :searchValue="term"
    :cartItemsQty="cartTotalItems"
    :accountIcon="accountIcon"
    class="sf-header--has-mobile-search"
  >
    <!-- TODO: add mobile view buttons after SFUI team PR -->
    <template #logo>
      <nuxt-link
        data-cy="app-header-url_logo"
        :to="localePath('/')"
        class="sf-header__logo"
      >
        <SfImage
          src="/icons/logo.svg"
          alt="Vue Storefront Next"
          class="sf-header__logo-image"
        />
      </nuxt-link>
    </template>
    <template #navigation>
      <SfHeaderNavigationItem
        :data-cy="'app-header-url_' + category.handle"
        v-for="category in categories"
        :key="category.id"
        class="nav-item"
        :label="category.title"
        :link="localePath('/c/' + category.handle)"
      />
    </template>
    <template #aside>
      <LocaleSelector class="smartphone-only" />
    </template>
  </SfHeader>
</template>

<script>
import { SfHeader, SfImage } from '@storefront-ui/vue';
import { useUiState } from '~/composables';
import {
  useCart,
  useWishlist,
  useUser,
  cartGetters,
  useCategory,
} from '@vue-storefront/shopify';
import { computed, ref } from '@vue/composition-api';
import { onSSR } from '@vue-storefront/core';
import { useUiHelpers } from '~/composables';
import LocaleSelector from './LocaleSelector';

export default {
  components: {
    SfHeader,
    SfImage,
    LocaleSelector,
  },
  setup(props, { root }) {
    const {
      toggleCartSidebar,
      toggleWishlistSidebar,
      toggleLoginModal,
    } = useUiState();
    const { changeSearchTerm, getFacetsFromURL } = useUiHelpers();
    const { isAuthenticated, load } = useUser();
    const { cart, loadCart } = useCart();
    const { search, categories } = useCategory('menuCategories');
    const { loadWishlist } = useWishlist();
    const term = ref(getFacetsFromURL().term);

    const cartTotalItems = computed(() => {
      const count = cartGetters.getTotalItems(cart.value);
      return count ? count.toString() : null;
    });

    const accountIcon = computed(() =>
      isAuthenticated.value ? 'profile_fill' : 'profile'
    );

    // TODO: https://github.com/DivanteLtd/vue-storefront/issues/4927
    const handleAccountClick = async () => {
      if (isAuthenticated.value) {
        return root.$router.push('/my-account');
      }
      toggleLoginModal();
    };

    onSSR(async () => {
      await load();
      await loadCart();
      await loadWishlist();
      await search({ slug: '' });
    });

    return {
      accountIcon,
      cartTotalItems,
      handleAccountClick,
      toggleCartSidebar,
      toggleWishlistSidebar,
      changeSearchTerm,
      term,
      categories,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '~@storefront-ui/vue/styles';

.sf-header {
  --header-padding: var(--spacer-sm);
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
