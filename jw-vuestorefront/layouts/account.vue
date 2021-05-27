<template>
  <div>
    <TopBar class="desktop-only" />
    <div id="layout" >
      <AppHeader />
      <nuxt />
      <BottomNavigation />
      <CartSidebar />
      <LoginModal />
    </div>
  </div>
</template>

<script>
import AppHeader from '~/components/AppHeader.vue';
import BottomNavigation from '~/components/BottomNavigation.vue';
import TopBar from '~/components/TopBar.vue';
import CartSidebar from '~/components/CartSidebar.vue';
import LoginModal from '~/components/LoginModal.vue';

export default {
  components: {
    TopBar,
    AppHeader,
    BottomNavigation,
    CartSidebar,
    LoginModal
  }
};
</script>

<style lang="scss">
@import "~@storefront-ui/vue/styles";
/* Using SCSS variables to store breakpoints */
$breakpoint-desktop: 1024px;
$breakpoint-tablet: 768px;
$breakpoint-mobile: 480px;

body {
  padding: 0;
  margin: 0;
}

#layout {
  box-sizing: border-box;
  @media (min-width: $breakpoint-desktop) {
    max-width: 1240px;
    margin: auto;
  }
}
</style>
