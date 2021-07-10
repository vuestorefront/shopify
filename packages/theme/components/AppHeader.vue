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
        <img src="/icon.png" alt="Vue Storefront Next" width="34" height="35" class="sf-header__logo-image"/>
      </nuxt-link>
    </template>

    <template #navigation v-if="categories.length > 0">
      <SfHeaderNavigationItem v-for='cat in categories' :key="cat.id" class="nav-item" :data-cy="'app-header-url_' + cat.handle"  :label="cat.title" :link="localePath('/c/' + cat.handle )" />
    </template>
    <template #aside>
      <LocaleSelector class="smartphone-only" />
    </template>
    <template #header-icons>
        <div class="sf-header__icons">
          <SfButton
            class="sf-button--pure sf-header__action user-action"
            @click="handleAccountClick"
            aria-label="User"
          >
            <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 14.006L0 14V11.381C0 10.664 0.455024 9.627 2.62402 8.758C4.01022 8.17871 5.49762 7.88041 7 7.88041C8.50238 7.88041 9.98978 8.17871 11.376 8.758C13.545 9.627 14 10.664 14 11.381V14V14.006ZM7 9.543C4.4 9.543 1.66296 10.818 1.66296 11.381V12.343H12.338V11.381C12.338 10.818 9.6 9.543 7 9.543ZM7 7C6.30777 7 5.63111 6.79473 5.05554 6.41014C4.47997 6.02556 4.03139 5.47894 3.76648 4.83939C3.50157 4.19985 3.43221 3.49612 3.56726 2.81718C3.70231 2.13825 4.03566 1.51461 4.52515 1.02512C5.01463 0.53564 5.63821 0.202302 6.31714 0.0672533C6.99607 -0.0677949 7.69981 0.00151581 8.33936 0.266423C8.9789 0.531329 9.52557 0.979932 9.91016 1.5555C10.2947 2.13108 10.5 2.80777 10.5 3.5C10.5 4.42826 10.1312 5.3185 9.47485 5.97488C8.81848 6.63125 7.92826 7 7 7ZM7 1.667C6.63652 1.667 6.28124 1.77477 5.979 1.97669C5.67677 2.17861 5.44114 2.46561 5.302 2.8014C5.16286 3.13719 5.12643 3.5067 5.19727 3.86321C5.2681 4.21972 5.443 4.54722 5.69995 4.80431C5.9569 5.06139 6.2844 5.23653 6.64087 5.30756C6.99734 5.3786 7.36677 5.34234 7.70264 5.20338C8.0385 5.06442 8.32563 4.82899 8.52771 4.52686C8.72979 4.22474 8.83782 3.86948 8.83801 3.506C8.83775 3.01852 8.64404 2.55107 8.29944 2.20628C7.95483 1.86148 7.48748 1.66753 7 1.667Z" fill="black"/>
            </svg>
          </SfButton>
          <SfButton
            class="sf-button--pure sf-header__action cart-action"
            @click="toggleCartSidebar"
            aria-label="Cart"
          >
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.8 16.01C12.4836 16.01 12.1743 15.9162 11.9111 15.7403C11.648 15.5645 11.4429 15.3147 11.3218 15.0223C11.2007 14.7299 11.169 14.4082 11.2307 14.0979C11.2924 13.7875 11.4448 13.5024 11.6686 13.2786C11.8923 13.0549 12.1775 12.9025 12.4879 12.8407C12.7983 12.779 13.12 12.8107 13.4124 12.9318C13.7047 13.0529 13.9546 13.258 14.1304 13.5211C14.3062 13.7842 14.4 14.0936 14.4 14.41C14.4 14.8343 14.2315 15.2413 13.9314 15.5414C13.6313 15.8414 13.2244 16.01 12.8 16.01ZM4.80005 16.01C4.4836 16.01 4.17425 15.9162 3.91113 15.7403C3.64801 15.5645 3.44288 15.3147 3.32178 15.0223C3.20068 14.7299 3.16898 14.4082 3.23071 14.0979C3.29245 13.7875 3.44482 13.5024 3.66858 13.2786C3.89234 13.0549 4.17755 12.9025 4.48792 12.8407C4.79828 12.779 5.11999 12.8107 5.41235 12.9318C5.70472 13.0529 5.95456 13.258 6.13037 13.5211C6.30618 13.7842 6.40002 14.0936 6.40002 14.41C6.40002 14.8343 6.23145 15.2413 5.9314 15.5414C5.63134 15.8414 5.2244 16.01 4.80005 16.01ZM14.4 12.01H4.80005C4.52315 12.0113 4.25074 11.9398 4.01013 11.8028C3.76953 11.6657 3.56907 11.4678 3.42896 11.229C3.28425 10.9882 3.20548 10.7136 3.20056 10.4328C3.19565 10.1519 3.2648 9.87468 3.401 9.629L4.48096 7.678L1.59998 1.6H0V0H2.61597L3.36804 1.6H15.208C15.3469 1.60022 15.4833 1.63658 15.6039 1.70551C15.7244 1.77444 15.8249 1.87355 15.8955 1.99311C15.9661 2.11268 16.0044 2.24856 16.0066 2.38741C16.0088 2.52625 15.9748 2.66328 15.908 2.785L13.0439 7.976C12.906 8.22631 12.7032 8.43489 12.4569 8.57986C12.2106 8.72484 11.9299 8.80088 11.644 8.8H5.68396L4.80396 10.4H14.4041V12L14.4 12.01ZM4.12805 3.21L6.02795 7.21H11.644L13.8521 3.21H4.13306H4.12805Z" fill="black"/>
            </svg>
            <SfBadge v-if="cartTotalItems" class="sf-badge--number cart-badge">{{cartTotalItems}}</SfBadge>
          </SfButton>
        </div>
      </template>
  </SfHeader>
</template>

<script type="module">
import { SfHeader, SfImage, SfButton, SfBadge } from '@storefront-ui/vue';
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
    LocaleSelector,
    SfButton,
    SfBadge
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
