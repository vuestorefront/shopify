<template>
  <div>
    <SfMegaMenu
      :visible="isSearchOpen"
      :title="$t('Search results')"
      class="search"
    >
      <transition name="sf-fade" mode="out-in">
        <div
          v-if="isSearchResultAvailable"
          key="results"
          class="search__wrapper-results"
        >
          <SfMegaMenuColumn
            v-if="products && products.length > 0"
            :title="$t('Products')"
            class="sf-mega-menu-column--pined-content-on-mobile search__results"
          >
            <template #title="{ title }">
              <SfMenuItem
                :label="title"
                class="sf-mega-menu-column__header search__header"
              >
                <template #mobile-nav-icon> &#8203; </template>
              </SfMenuItem>
            </template>
            <SfScrollable
              class="results--desktop desktop-only"
              show-text=""
              hide-text=""
            >
              <div class="results-listing">
                <SfProductCard
                  v-for="(product, index) in products"
                  :key="index"
                  class="result-card"
                  :regular-price="
                    $n(productGetters.getPrice(product).regular, 'currency')
                  "
                  :special-price="
                    productGetters.getPrice(product).special &&
                    $n(productGetters.getPrice(product).special, 'currency')
                  "
                  :score-rating="productGetters.getAverageRating(product)"
                  :image="productGetters.getCoverImage(product)"
                  :image-width="$device.isDesktopOrTablet ? 212 : 154"
                  :image-height="$device.isDesktopOrTablet ? 320 : 232"
                  :alt="productGetters.getName(product)"
                  :title="productGetters.getName(product)"
                  :add-to-cart-disabled="getStockCount(product) <= 0"
                  :link="localePath(getProductLink(product))"
                  :wishlist-icon="false"
                  @click:add-to-cart="
                    handleAddToCart({ product, quantity: 1, currentCart })
                  "
                >
                  <template #image="imageSlotProps">
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
                  <template slot="title">
                    <SfButton
                      :link="localePath(getProductLink(product))"
                      class="sf-button--pure sf-product-card__link"
                      data-testid="product-link"
                    >
                      <h3
                        class="sf-product-card__title"
                      >{{productGetters.getName(product)}}</h3>
                    </SfButton>
                  </template>
                </SfProductCard>
              </div>
            </SfScrollable>
            <div class="results--mobile smartphone-only">
              <SfProductCard
                v-for="(product, index) in products"
                :key="index"
                class="result-card"
                :regular-price="
                  $n(productGetters.getPrice(product).regular, 'currency')
                "
                :special-price="
                  productGetters.getPrice(product).special &&
                  $n(productGetters.getPrice(product).special, 'currency')
                "
                :score-rating="productGetters.getAverageRating(product)"
                :image="productGetters.getCoverImage(product)"
                :image-width="$device.isDesktopOrTablet ? 212 : 154"
                :image-height="$device.isDesktopOrTablet ? 320 : 232"
                :alt="productGetters.getName(product)"
                :title="productGetters.getName(product)"
                :add-to-cart-disabled="getStockCount(product) <= 0"
                :link="localePath(getProductLink(product))"
                :wishlist-icon="false"
                @click:add-to-cart="
                  handleAddToCart({ product, quantity: 1, currentCart })
                "
              >
                <template #image="imageSlotProps">
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
                <template slot="title">
                  <SfButton
                    :link="localePath(getProductLink(product))"
                    class="sf-button--pure sf-product-card__link"
                    data-testid="product-link"
                  >
                    <h3
                      class="sf-product-card__title"
                    >
                      {{productGetters.getName(product)}}
                    </h3>
                  </SfButton>
                </template>
              </SfProductCard>
            </div>
          </SfMegaMenuColumn>
          <SfMegaMenuColumn
            v-if="articles && articles.length > 0"
            :title="$t('Articles')"
            class="sf-mega-menu-column--pined-content-on-mobile search__results"
          >
            <template #title="{ title }">
              <SfMenuItem
                :label="title"
                class="sf-mega-menu-column__header search__header"
              >
                <template #mobile-nav-icon> &#8203; </template>
              </SfMenuItem>
            </template>
            <SfScrollable
              class="results--desktop desktop-only"
              show-text=""
              hide-text=""
            >
              <div class="results-listing">
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
              </div>
            </SfScrollable>
            <div class="results--mobile smartphone-only">
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
                <template #add-to-cart>
                  <div></div>
                </template>
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
                <template #title="{ title }">
                  <span class="sf-blog-card__title">
                    {{ title }}
                  </span>

                  <small class="sf-blog-card__publishedAt">{{
                    getArticlePublishedAt(article)
                  }}</small>
                </template>
              </SfProductCard>
            </div>
          </SfMegaMenuColumn>
          <div class="action-buttons smartphone-only">
            <SfButton
              class="action-buttons__button color-light"
              @click="$emit('close')"
              >{{ $t('Cancel') }}</SfButton
            >
          </div>
        </div>
        <div v-else key="no-results" class="before-results">
          <SfImage
            src="/error/error.webp"
            class="before-results__picture"
            alt="error"
            loading="lazy"
            :width="300"
            :height="300"
          />
          <p class="before-results__paragraph">
            {{ $t("You haven't searched for items yet") }}
          </p>
          <p class="before-results__paragraph">
            {{ $t("Let's start now - we'll help you") }}
          </p>
          <SfButton
            class="before-results__button color-secondary smartphone-only"
            @click="$emit('close')"
            >{{ $t('Go back') }}</SfButton
          >
        </div>
      </transition>
    </SfMegaMenu>
  </div>
</template>

<script>
import {
  SfMegaMenu,
  SfProductCard,
  SfScrollable,
  SfMenuItem,
  SfButton,
  SfImage
} from '@storefront-ui/vue';

import { ref, watch, computed } from '@nuxtjs/composition-api';
import { productGetters, useCart } from '@vue-storefront/shopify';
import { useUiNotification } from '~/composables';
import useUiHelpers from '../composables/useUiHelpers';
import {
  getArticleImage,
  getArticleLink,
  getArticlePublishedAt
} from '~/helpers/article';
export default {
  name: 'SearchResults',
  components: {
    SfMegaMenu,
    SfProductCard,
    SfScrollable,
    SfMenuItem,
    SfButton,
    SfImage
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    result: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props, { emit }) {
    const { getCatLink } = useUiHelpers();
    const isSearchOpen = ref(props.visible);
    const { addItem: addItemToCart, cart: currentCart } = useCart();
    const { send: sendNotification } = useUiNotification();
    const products = computed(() => props.result?.products);
    const articles = computed(() => props.result?.articles);
    const categories = computed(() => props.result?.categories);
    const getStockCount = (product) => product?.totalInventory ?? 0;

    watch(
      () => props.visible,
      (newVal) => {
        isSearchOpen.value = newVal;
        if (isSearchOpen.value) {
          document.body.classList.add('no-scroll');
        } else {
          document.body.classList.remove('no-scroll');
          emit('removeSearchResults');
        }
      }
    );

    const handleAddToCart = (productObj) => {
      addItemToCart(productObj).then(() => {
        sendNotification({
          key: 'added_to_cart',
          message: 'Product has been successfully added to cart !',
          type: 'success',
          title: 'Product added!',
          icon: 'check'
        });
      });
    };

    const getProductLink = (product) => {
      if (!product?.id || !product?._slug) return '';

      return {
        name: 'product',
        params: { id: product.id, slug: product._slug }
      };
    };

    const isSearchResultAvailable = computed(
      () =>
        (products?.value?.length ?? 0) > 0 || (articles?.value?.length ?? 0) > 0
    );

    return {
      isSearchResultAvailable,
      getCatLink,
      getProductLink,
      getArticleLink,
      getArticleImage,
      getArticlePublishedAt,
      articles,
      isSearchOpen,
      getStockCount,
      productGetters,
      products,
      categories,
      currentCart,
      handleAddToCart
    };
  }
};
</script>

<style lang="scss" scoped>
.search {
  position: absolute;
  right: 0;
  left: 0;
  z-index: 3;
  --mega-menu-column-header-margin: var(--spacer-sm) 0 var(--spacer-xl);
  --mega-menu-content-padding: 0;
  --mega-menu-height: auto;
  @include for-desktop {
    --mega-menu-content-padding: var(--spacer-xl) 0;
  }
  &__wrapper-results {
    display: flex;
    flex-direction: column;
    @include for-desktop {
      flex-direction: row;
      flex: 1;
    }
  }
  &__categories {
    flex: 0 0 220px;
  }
  &__results {
    flex: 1;
  }
  &__header {
    margin-left: var(--spacer-sm);
  }
  ::v-deep .sf-bar {
    display: none;
  }
  ::v-deep .sf-mega-menu-column__header {
    display: none;
    @include for-desktop {
      display: flex;
    }
  }
}
.results {
  &--desktop {
    --scrollable-max-height: 35vh;
  }
  &--mobile {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    background: var(--c-white);
    padding: var(--spacer-base) var(--spacer-sm);
    --product-card-max-width: 9rem;

    ::v-deep .sf-product-card__image {
      width: 100%;
      object-fit: cover;
    }
     ::v-deep .sf-image--placeholder {
       width: 100%;
       object-fit: contain;
     }
  }
}
.see-all {
  padding: var(--spacer-xl) 0 0 var(--spacer-sm);
}
.action-buttons {
  padding: var(--spacer-xl) var(--spacer-sm) var(--spacer-3xl);
  background: var(--c-white);
  width: 100%;
  &__button {
    width: calc(100% - 32px);
  }
}
.results-listing {
  display: flex;
  flex-wrap: wrap;
  margin-left: var(--spacer-2xs);
}
.result-card {
  margin: var(--spacer-sm) 0;
  @include for-desktop {
    margin: var(--spacer-2xs) 0;
  }
}
.before-results {
  box-sizing: border-box;
  padding: var(--spacer-base) var(--spacer-sm) var(--spacer-2xl);
  width: 100%;
  text-align: center;
  @include for-desktop {
    padding: 0;
  }
  &__picture {
    --image-width: 230px;
    margin-top: var(--spacer-2xl);
    @include for-desktop {
      --image-width: 18.75rem;
      margin-top: var(--spacer-base);
    }
  }
  &__paragraph {
    font-family: var(--font-family--primary);
    font-weight: var(--font-weight--normal);
    font-size: var(--font-size--base);
    color: var(--c-text-muted);
    margin: 0;
    @include for-desktop {
      font-size: var(--font-size--lg);
    }
    &:first-of-type {
      margin: var(--spacer-xl) auto var(--spacer-xs);
    }
  }
  &__button {
    margin: var(--spacer-xl) auto;
    width: 100%;
  }
}
</style>
