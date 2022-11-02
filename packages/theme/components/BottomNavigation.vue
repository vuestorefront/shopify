<template>
  <div class="smartphone-only">
    <SfBottomNavigation class="navigation-bottom">
      <nuxt-link data-cy="bottom-navigation-url_home" to="/">
        <SfBottomNavigationItem
          :class="
            $route.path == '/' ? 'sf-bottom-navigation__item--active' : ''
          "
          icon="home"
          size="20px"
          label="Home"
        />
      </nuxt-link>
      <SfBottomNavigationItem
        data-cy="bottom-navigation-url_menu"
        icon="menu"
        size="20px"
        label="Menu"
        @click="toggleMobileMenu"
      />
      <SfBottomNavigationItem
        data-cy="bottom-navigation-url_account"
        icon="profile"
        size="20px"
        label="Account"
        @click="handleAccountClick"
      />

      <SfBottomNavigationItem
        data-cy="bottom-navigation-url_add-to-cart"
        label="Basket"
        icon="add_to_cart"
        @click="toggleCartSidebar"
      >
        <template #icon>
          <SfCircleIcon aria-label="Add to cart">
            <SfIcon
              icon="add_to_cart"
              color="white"
              size="25px"
              :style="{ margin: '0 0 0 -2px' }"
            />
          </SfCircleIcon>
        </template>
      </SfBottomNavigationItem>
    </SfBottomNavigation>
    <MobileMenuSidebar />
  </div>
</template>

<script type="module">
import { SfBottomNavigation, SfIcon, SfCircleIcon } from '@storefront-ui/vue';
import useUiState from '~/composables/useUiState';
import { useRouter } from '@nuxtjs/composition-api';
import MobileMenuSidebar from '~/components/MobileMenuSidebar.vue';
import { useUser } from '@vue-storefront/shopify';

export default {
  components: {
    SfBottomNavigation,
    SfIcon,
    SfCircleIcon,
    MobileMenuSidebar
  },
  setup() {
    const router = useRouter();
    const {
      toggleCartSidebar,
      toggleWishlistSidebar,
      toggleLoginModal,
      toggleMobileMenu
    } = useUiState();
    const { isAuthenticated } = useUser();

    const handleAccountClick = () => {
      if (isAuthenticated.value) {
        return router.push('/my-account');
      }
      toggleLoginModal();
    };

    return {
      toggleWishlistSidebar,
      toggleCartSidebar,
      toggleMobileMenu,
      handleAccountClick
    };
  }
};
</script>

<style lang="scss" scoped>
.navigation-bottom {
  &:first-child {
    padding-left: var(--spacer-sm);
  }
}
</style>