<template>
  <SfSidebar
    :visible="isMobileMenuOpen"
    :title="$t('Menu')"
    class="mobile-menu-sidebar sf-sidebar--left"
    @close="toggleMobileMenu"
  >
    <SfList class="mobile-menu-sidebar__list">
      <SfMenuItem
        v-for="category in categories"
        :key="category.id"
        :label="category.title"
        :data-cy="'app-header-url_' + category.handle"
        :link="localePath('/c/' + category.handle)"
        class="mobile-menu-sidebar__item"
        @click.native="toggleMobileMenu"
      />
    </SfList>
  </SfSidebar>
</template>
<script lang="ts">
import { SfSidebar, SfList, SfMenuItem } from '@storefront-ui/vue';
import { defineComponent } from '@nuxtjs/composition-api';
import { onSSR } from '@vue-storefront/core';
import { useCategory } from '@vue-storefront/shopify';
import { useUiState } from '~/composables';

export default defineComponent({
  name: 'MobileMenuSidebar',
  components: {
    SfSidebar,
    SfList,
    SfMenuItem
  },
  setup() {
    const { search, categories } = useCategory('menuCategories');
    const { isMobileMenuOpen, toggleMobileMenu } = useUiState();

    onSSR(async () => {
      await search({ slug: '' });
    });

    return {
      categories,
      isMobileMenuOpen,
      toggleMobileMenu
    };
  }
});
</script>
<style lang="scss" scoped>
.mobile-menu-sidebar {
  --sidebar-z-index: 3;
  --overlay-z-index: 3;
  &__list {
    .mobile-menu-sidebar__item {
      padding: var(--spacer-base) 0;
      --menu-item-font-size: 1.75rem;
      &:not(:first-of-type) {
        border-top: 1px solid var(--c-light);
      }
      &:not(:last-of-type) {
        border-bottom: 1px solid var(--c-light);
      }
    }
  }
  ::v-deep {
    .nuxt-link-active {
      --menu-item-label-color: var(--c-primary);
    }
  }
}
</style>