<template>
  <div class="sidebar desktop-only" v-if="visible" :sidebarData="sidebarData">
    <SfLoader :class="{ loading }" :loading="loading">
      <SfAccordion :open="activeCategory" :show-chevron="true">
        <SfAccordionItem
          v-for="(cat, i) in sidebarData && sidebarData"
          :key="i"
          :header="cat.label"
        >
          <template>
            <SfList class="list">
              <SfListItem class="list__item">
                <SfMenuItem
                  :count="cat.count || ''"
                  :data-cy="`category-link_subcategory_${cat.slug}`"
                  :label="cat.label"
                >
                  <template #label>
                    <nuxt-link
                      :to="localePath(th.getCatLink(cat))"
                      :class="cat.isCurrent ? 'sidebar--cat-selected' : ''"
                    >
                      View all
                    </nuxt-link>
                  </template>
                </SfMenuItem>
              </SfListItem>
              <SfListItem
                class="list__item"
                v-for="(subCat, j) in cat.items"
                :key="j"
              >
                <SfMenuItem
                  :count="subCat.count || ''"
                  :data-cy="`category-link_subcategory_${subCat.slug}`"
                  :label="subCat.label"
                >
                  <template #label="{ label }">
                    <nuxt-link
                      :to="localePath(th.getCatLink(subCat))"
                      :class="subCat.isCurrent ? 'sidebar--cat-selected' : ''"
                    >
                      {{ label }}
                    </nuxt-link>
                  </template>
                </SfMenuItem>
              </SfListItem>
            </SfList>
          </template>
        </SfAccordionItem>
      </SfAccordion>
    </SfLoader>
  </div>
</template>
<script type="module">
import {
  SfLoader,
  SfAccordion,
  SfList,
  SfMenuItem
} from '@storefront-ui/vue';
import { computed } from '@vue/composition-api';
import { useUiHelpers } from '~/composables';

export default {
  components: {
    SfLoader,
    SfAccordion,
    SfList,
    SfMenuItem
  },
  props: {
    visible: {
      default: true,
      type: Boolean
    },
    sidebarData: {
      default: [] | {},
      type: Array | Object
    },
    loading: {
      default: true,
      type: Boolean
    }
  },
  setup(props, context) {
    const th = useUiHelpers();
    const slug = context.root.$route.params.slug_1;
    const activeCategory = computed(() => {
      const items = props.sidebarData;
      if (items === null || items.length === undefined) {
        return '';
      }
      const category = items.find((curCat) => curCat.slug === slug);
      return category?.label || items[0].label;
    });
    return {
      th,
      slug,
      activeCategory
    };
  }
};
</script>
