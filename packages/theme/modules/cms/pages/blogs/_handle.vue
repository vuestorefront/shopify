<template>
  <div id="blogs">
    <SfBreadcrumbs
      class="breadcrumbs desktop-only"
      :breadcrumbs="breadcrumbs"
    />
    <div class="navbar section">
      <div class="navbar__aside desktop-only">
        <LazyHydrate never>
          <SfHeading :level="1" title="Blogs" class="navbar__title" />
        </LazyHydrate>
      </div>
      <div class="navbar__main">
        <div class="navbar__sort desktop-only">
          <span class="navbar__label">Sort by:</span>
          <SfComponentSelect v-model="selectedSortBy" class="navbar__select">
            <SfComponentSelectOption
              v-for="option in sortByOptions"
              :key="option.value"
              :value="option.value"
              class="sort-by__option"
              >{{ option.label }}</SfComponentSelectOption
            >
          </SfComponentSelect>
        </div>
        <div class="navbar__counter">
          <span class="navbar__label desktop-only">Showing: </span>
          <span class="desktop-only">{{ articles.length }}</span>
          <span class="navbar__label smartphone-only"
            >{{ articles.length }} Items</span
          >
        </div>
        <div class="navbar__view">
          <span class="navbar__view-label desktop-only">View</span>
          <SfButton
            class="sf-button--pure navbar__view-button"
            aria-label="Change to grid view"
            :aria-pressed="isGridView"
            @click="isGridView = true"
          >
            <SfIcon
              class="navbar__view-icon"
              :color="isGridView ? 'var(--c-primary)' : 'black'"
              icon="tiles"
              size="12px"
            />
          </SfButton>
          <SfButton
            class="sf-button--pure navbar__view-button"
            aria-label="Change to list view"
            :aria-pressed="!isGridView"
            @click="isGridView = false"
          >
            <SfIcon
              class="navbar__view-icon"
               :color="!isGridView ? 'var(--c-primary)' : 'black'"
              icon="list"
              size="12px"
            />
          </SfButton>
        </div>
      </div>
    </div>
    <div class="main section">
      <div class="sidebar desktop-only">
        <LazyHydrate when-idle>
          <SfLoader
            :loading="isPageLoading"
            :class="{ 'loading--categories': isPageLoading }"
          >
            <SfAccordion
              :open="sidebarAccordion[0].header"
              :show-chevron="true"
            >
              <SfAccordionItem header="Categories">
                <template #default>
                  <SfList class="list">
                    <SfListItem
                      v-for="(item, j) in blogs"
                      :key="j"
                      class="list__item"
                    >
                      <SfMenuItem
                        :label="item.title"
                        :link="localePath(item.link)"
                      />
                    </SfListItem>
                  </SfList>
                </template>
              </SfAccordionItem>
            </SfAccordion>
          </SfLoader>
        </LazyHydrate>
      </div>
      <SfLoader :loading="isPageLoading" :class="{ loading: isPageLoading }">
        <div v-if="!isPageLoading" class="blogs">
          <div v-if="articles.length === 0">
            {{ $t('No Article Available') }}
          </div>
          <transition-group
            v-if="isGridView"
            appear
            name="blogs__slide"
            tag="div"
            class="blogs__grid"
          >
            <SfProductCard
              v-for="(article, i) in articles"
              :key="article.id"
              :style="{ '--index': i }"
              :title="article.title"
              :image="getArticleImage(article)"
              :image-width="$device.isDesktopOrTablet ? 212 : 154"
              :image-height="$device.isDesktopOrTablet ? 320 : 232"
              :wishlist-icon="false"
              :show-add-to-cart-button="false"
              class="blogs__blog-card"
              :link="localePath(getArticleLink(article))"
            >
              <template v-if="getArticleImage(article)" #image="imageSlotProps">
                <SfButton
                  :link="imageSlotProps.link"
                  aria-label="Go To Product"
                  class="sf-button--pure sf-product-card__link"
                  data-testid="product-link"
                  v-on="$listeners"
                >
                  <template v-if="Array.isArray(imageSlotProps.image)">
                    <nuxt-img
                      v-for="(picture, key) in imageSlotProps.image.slice(0, 2)"
                      :key="key"
                      :alt="imageSlotProps.title"
                      :height="imageSlotProps.imageHeight"
                      :src="picture"
                      :width="imageSlotProps.imageWidth"
                      class="sf-product-card__picture"
                    />
                  </template>
                  <nuxt-img
                    v-else
                    :alt="imageSlotProps.title"
                    :height="imageSlotProps.imageHeight"
                    :src="imageSlotProps.image"
                    :width="imageSlotProps.imageWidth"
                    class="sf-product-card__image lol"
                  />
                </SfButton>
              </template>
              <template #add-to-cart>
                <div></div>
              </template>

              <template #title="{ title }">
                <span class="sf-blog-card__title">
                  {{ title }}
                </span>

                <small class="sf-blog-card__publishedAt">{{
                  getArticlePublishedAt(article)
                }}</small>
              </template>
            </SfProductCard>
          </transition-group>
          <transition-group
            v-else
            appear
            name="blogs__slide"
            tag="div"
            class="blogs__list"
          >
            <SfProductCardHorizontal
              v-for="(article, i) in articles"
              :key="article.id"
              :style="{ '--index': i }"
              :title="article.title"
              :description="article.content"
              :wishlist-icon="false"
              :image="getArticleImage(article)"
              :image-width="$device.isDesktopOrTablet ? 212 : 154"
              :image-height="$device.isDesktopOrTablet ? 320 : 232"
              :link="localePath(getArticleLink(article))"
              class="blogs__blog-card-horizontal"
            >
              <template v-if="getArticleImage(article)" #image="imageSlotProps">
                <SfButton
                  :link="imageSlotProps.link"
                  aria-label="Go To Product"
                  class="sf-button--pure sf-product-card__link"
                  data-testid="product-link"
                  v-on="$listeners"
                >
                  <template v-if="Array.isArray(imageSlotProps.image)">
                    <nuxt-img
                      v-for="(picture, key) in imageSlotProps.image.slice(0, 2)"
                      :key="key"
                      :alt="imageSlotProps.title"
                      :height="imageSlotProps.imageHeight"
                      :src="picture"
                      :width="imageSlotProps.imageWidth"
                      class="sf-product-card__picture"
                    />
                  </template>
                  <nuxt-img
                    v-else
                    :alt="imageSlotProps.title"
                    :height="imageSlotProps.imageHeight"
                    :src="imageSlotProps.image"
                    :width="imageSlotProps.imageWidth"
                    class="sf-product-card__image lol"
                  />
                </SfButton>
              </template>
              <template #add-to-cart>
                <div></div>
              </template>
            </SfProductCardHorizontal>
          </transition-group>
          <SfPagination
            v-if="articles.length !== 0"
            class="blogs__pagination"
            :total="0"
            :visible="0"
          >
            <template #next>
              <SfButton
                class="sf-button--pure sf-button"
                :disabled="!hasNextPage"
                @click="goNextPage"
              >
                <SfIcon
                  icon="arrow_right"
                  size="xs"
                  viewBox="0 0 24 24"
                  :coverage="1"
                />
              </SfButton>
            </template>
            <template #prev>
              <SfButton
                class="sf-button--pure sf-button"
                :disabled="!hasPrevPage"
                @click="goPrevPage"
              >
                <SfIcon
                  icon="arrow_left"
                  size="xs"
                  viewBox="0 0 24 24"
                  :coverage="1"
                />
              </SfButton>
            </template>
          </SfPagination>
          <div
            v-if="articles.length !== 0"
            class="blogs__show-on-page desktop-only"
          >
            <span class="blogs__show-on-page__label">Show on page:</span>
            <SfSelect
              :value="articlesPerPage"
              class="blogs__items-per-page"
              @input="(perPage) => selectShowOnPage(perPage)"
            >
              <SfSelectOption
                v-for="option in showOnPage"
                :key="option"
                :value="option"
                class="blogs__items-per-page__option"
              >
                {{ option }}
              </SfSelectOption>
            </SfSelect>
          </div>
        </div>
      </SfLoader>
    </div>
  </div>
</template>
<script>
import {
  SfHeading,
  SfButton,
  SfList,
  SfIcon,
  SfMenuItem,
  SfProductCard,
  SfPagination,
  SfAccordion,
  SfComponentSelect,
  SfBreadcrumbs,
  SfProductCardHorizontal,
  SfSelect,
  SfLoader
} from '@storefront-ui/vue';
import { SortBy } from '~/modules/cms/enums/SortBy';
import LazyHydrate from 'vue-lazy-hydration';
import { useUiState } from '~/composables';
import {
  useRoute,
  computed,
  ref,
  watchEffect,
  useContext
} from '@nuxtjs/composition-api';
import { onSSR } from '@vue-storefront/core';
import { useContent, ContentType } from '@vue-storefront/shopify';
import {
  getArticleImage,
  getArticleLink,
  getArticlePublishedAt
} from '~/helpers/article';

export default {
  name: 'Category',
  components: {
    SfHeading,
    SfButton,
    SfIcon,
    SfList,
    SfProductCard,
    SfPagination,
    SfMenuItem,
    SfAccordion,
    SfComponentSelect,
    SfBreadcrumbs,
    SfSelect,
    SfProductCardHorizontal,
    LazyHydrate,
    SfLoader
  },
  setup() {
    const route = useRoute();
    const context = useContext();
    const { articlesPerPage, setArticlesPerPage } = useUiState();
    const {
      search: getBlogs,
      content: blogs,
      loading: isBlogsLoading
    } = useContent('blogs');
    const { search: getBlog } = useContent('blog');
    const {
      search: getArticles,
      content: articlesContent,
      loading: isArticlesLoading
    } = useContent('articles');

    const currentHandle = ref(route?.value?.params?.handle);
    const cursors = ref(['']);

    const showOnPage = ['5', '10', '20', '40', '60'];
    const sortByOptions = [
      {
        value: 'latest',
        label: 'Latest First'
      },
      {
        value: 'oldest',
        label: 'Oldest First'
      }
    ];
    const selectedSortBy = ref(SortBy.Latest);

    onSSR(async () => {
      await getBlogs({ contentType: ContentType.Blog });
      currentHandle.value =
        route?.value?.params?.handle ?? blogs?.value?.[0]?.handle;

      getBlog({
        contentType: ContentType.Blog,
        handle: currentHandle.value
      });

      await getArticles({
        contentType: ContentType.Article,
        query: `blog_title:${currentHandle.value}`,
        first: parseInt(articlesPerPage.value),
        reverse: true,
        sortKey: 'PUBLISHED_AT'
      });
    });

    const articles = computed(() => articlesContent?.value?.data ?? []);

    const hasNextPage = computed(
      () => articlesContent.value.pageInfo?.hasNextPage
    );
    const hasPrevPage = computed(
      () => articlesContent.value.pageInfo?.hasPreviousPage
    );

    const goNextPage = () => {
      const last = articles?.value?.slice(-1)[0];

      if (!last.cursor) return;

      cursors.value.push(last.cursor);
    };

    const goPrevPage = () => {
      cursors.value.pop();
    };

    const isPageLoading = computed(
      () => isBlogsLoading.value || isArticlesLoading.value
    );

    const selectShowOnPage = (perPage) => {
      setArticlesPerPage(perPage);
    };

    watchEffect(() => {
      const options = {
        contentType: ContentType.Article,
        query: `blog_title:${currentHandle.value}`,
        first: parseInt(articlesPerPage.value),
        sortKey: 'PUBLISHED_AT'
      };

      if (selectedSortBy.value === SortBy.Latest) {
        options.reverse = true;
      }

      if (cursors.value.length > 1) {
        options.after = [...cursors.value].splice(-1)[0];
      }

      getArticles(options);
    });

    return {
      selectShowOnPage,
      articlesPerPage,
      showOnPage,

      sortByOptions,
      selectedSortBy,

      getArticleImage,
      getArticlePublishedAt,
      getArticleLink,
      hasNextPage,
      hasPrevPage,

      blogs,
      articles,

      goNextPage,
      goPrevPage,

      totalPosts: 0,
      currentPage: 1,
      isGridView: true,
      category: 'Blogs',
      isPageLoading,
      sidebarAccordion: [
        {
          header: 'Categories'
        }
      ],
      breadcrumbs: [
        {
          text: 'Home',
          link: '/'
        },
        {
          text: 'Blogs',
          link: context.app.localePath({
            name: 'blogs'
          })
        }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
#category {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1240px;
    margin: 0 auto;
  }
}
.main {
  &.section {
    padding: var(--spacer-xs);
    @include for-desktop {
      padding: 0;
    }
  }
}
.breadcrumbs {
  padding: var(--spacer-base) var(--spacer-base) var(--spacer-base)
    var(--spacer-sm);
}
.navbar {
  position: relative;
  display: flex;
  border: 1px solid var(--c-light);
  border-width: 0 0 1px 0;
  @include for-desktop {
    border-width: 1px 0 1px 0;
  }
  &.section {
    padding: var(--spacer-sm);
    @include for-desktop {
      padding: 0;
    }
  }
  &__aside,
  &__main {
    display: flex;
    align-items: center;
    padding: var(--spacer-sm) 0;
  }
  &__aside {
    flex: 0 0 15%;
    padding: var(--spacer-sm) var(--spacer-sm);
    border: 1px solid var(--c-light);
    border-width: 0 1px 0 0;
  }
  &__main {
    flex: 1;
    display: flex;
    padding: 0;
    @include for-desktop {
      padding: var(--spacer-xs) var(--spacer-xl);
    }
  }
  &__title {
    --heading-title-font-weight: var(--font-weight--semibold);
    --heading-title-font-size: var(--h3-font-size);
  }
  &__filters-icon {
    margin: 0 0 0 var(--spacer-2xs);
    order: 1;
    @include for-desktop {
      margin: 0 var(--spacer-xs) 0 0;
      order: 0;
    }
  }
  &__filters-button {
    display: flex;
    align-items: center;
    --button-font-size: var(--font-size--base);
    --button-text-decoration: none;
    --button-color: var(--c-link);
    --button-font-weight: var(--font-weight--normal);
    @include for-mobile {
      --button-font-weight: var(--font-weight--medium);
      margin-right: var(--spacer-sm);
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
    color: var(--c-text-muted);
    @include for-desktop {
      margin: 0 var(--spacer-2xs) 0 0;
    }
  }
  &__select {
    --component-select-width: 220px;
    --component-select-padding: 0;
    --component-select-selected-padding: 0 var(--spacer-lg) 0 var(--spacer-2xs);
    --component-select-margin: 0;
    --component-select-error-message-height: 0;
  }
  &__sort {
    display: flex;
    align-items: center;
    margin: 0 auto 0 var(--spacer-2xl);
  }
  &__counter {
    font-family: var(--font-family--secondary);
    margin: auto;
    @include for-desktop {
      margin: auto 0 auto auto;
    }
  }
  &__view {
    display: flex;
    order: -1;
    align-items: center;
    margin: 0;
    @include for-desktop {
      margin: 0 0 0 var(--spacer-2xl);
      order: 0;
    }
    &-icon {
      cursor: pointer;
      margin: 0 var(--spacer-base) 0 var(--spacer-sm);
      @include for-desktop {
        margin: 0 var(--spacer-base) 0 0;
      }
      &:last-child {
        margin: 0;
      }
    }
    &-button {
      cursor: pointer;
      margin: 0 var(--spacer-base) 0 var(--spacer-sm);
      @include for-desktop {
        margin: 0 var(--spacer-base) 0 0;
      }
      &:last-child {
        margin: 0;
      }
    }
    &-label {
      margin: 0 var(--spacer-sm) 0 0;
      font: var(--font-weight--normal) var(--font-size--base) / 1.6
        var(--font-family--secondary);
      text-decoration: none;
      color: var(--c-link);
    }
  }
}
.sort-by {
  --component-select-dropdown-z-index: 1;
  flex: unset;
  width: 11.875rem;
}
.main {
  display: flex;
}
.sidebar {
  flex: 0 0 15%;
  padding: var(--spacer-sm);
  border: 1px solid var(--c-light);
  border-width: 0 1px 0 0;
}
.sidebar-filters {
  --sidebar-title-display: none;
  --sidebar-top-padding: 0;
  @include for-desktop {
    --sidebar-content-padding: 0 var(--spacer-xl);
    --sidebar-bottom-padding: 0 var(--spacer-xl);
  }
}
.list {
  --menu-item-font-size: var(--font-size--sm);
  &__item {
    &:not(:last-of-type) {
      --list-item-margin: 0 0 var(--spacer-sm) 0;
    }
  }
}
.blogs {
  box-sizing: border-box;
  flex: 1;
  margin: 0;
  &__grid,
  &__list {
    display: flex;
    flex-wrap: wrap;
  }
  &__grid {
    justify-content: center;
    @include for-desktop {
      justify-content: space-between;
    }
  }
  &__blog-card {
    --blog-card-max-width: 11rem;
    --blog-card-title-margin: var(--spacer-2xs) 0 0 0;
    --price-regular-font-line-height: 1;
    margin-bottom: var(--spacer-sm);
    ::v-deep .sf-blog-card__publishedAt {
      display: block;
    }
    flex: 1 1 50%;
    @include for-desktop {
      margin-bottom: 0;
      --blog-card-max-width: 50%;
      --blog-card-title-margin: var(--spacer-base) 0 0 0;
    }
  }
  &__blog-card-horizontal {
    margin-bottom: var(--spacer-sm);
    flex: 0 0 100%;
    ::v-deep .sf-product-card-horizontal__wishlist-icon {
      .sf-icon {
        width: 1.5rem;
        height: 1.5rem;
      }
    }
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
    margin: var(--spacer-base) 0;
  }
  @include for-desktop {
    margin: var(--spacer-sm) 0 0 var(--spacer-sm);
    &__pagination {
      justify-content: flex-start;
      margin: var(--spacer-xl) 0 0 0;
    }
    &__blog-card-horizontal {
      margin: var(--spacer-lg) 0;
    }
    &__blog-card {
      flex: 1 1 25%;
    }
    &__list {
      margin: 0 0 0 var(--spacer-sm);
    }
  }
  &__show-on-page {
    display: flex;
    justify-content: flex-end;
    align-items: baseline;
    &__label {
      font-family: var(--font-family--secondary);
      font-size: var(--font-size--sm);
    }
  }
}
.filters {
  &__title {
    --heading-title-font-size: var(--font-size--xl);
    margin: var(--spacer-xl) 0 var(--spacer-base) 0;
    &:first-child {
      margin: calc(var(--spacer-xl) + var(--spacer-base)) 0 var(--spacer-xs) 0;
    }
  }
  &__colors {
    display: flex;
  }
  &__color {
    margin: var(--spacer-xs) var(--spacer-xs) var(--spacer-xs) 0;
  }
  &__chosen {
    color: var(--c-text-muted);
    font-weight: var(--font-weight--normal);
    font-family: var(--font-family--secondary);
    position: absolute;
    right: var(--spacer-xl);
  }
  &__item {
    --radio-container-padding: 0 var(--spacer-sm) 0 var(--spacer-xl);
    --radio-background: transparent;
    --filter-label-color: var(--c-secondary-variant);
    --filter-count-color: var(--c-secondary-variant);
    --checkbox-padding: 0 var(--spacer-sm) 0 var(--spacer-xl);
    padding: var(--spacer-sm) 0;
    border-bottom: 1px solid var(--c-light);
    &:last-child {
      border-bottom: 0;
    }
    @include for-desktop {
      --checkbox-padding: 0;
      margin: var(--spacer-sm) 0;
      border: 0;
      padding: 0;
    }
  }
  &__accordion-item {
    --accordion-item-content-padding: 0;
    position: relative;
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
    width: 100vw;
  }
  &__buttons {
    margin: var(--spacer-sm) 0;
  }
  &__button-clear {
    --button-background: var(--c-light);
    --button-color: var(--c-dark-variant);
    margin: var(--spacer-xs) 0 0 0;
  }
}
.loading {
  margin: var(--spacer-3xl) auto;
  @include for-desktop {
    margin-top: 6.25rem;
  }
  &--categories {
    @include for-desktop {
      margin-top: 3.75rem;
    }
  }
}
</style>