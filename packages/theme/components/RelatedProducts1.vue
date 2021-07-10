<template>
  <SfSection :title-heading="title" class="section pdc-sec-title pdp-upsell-section">
    <SfLoader :class="{ loading }" :loading="loading">
      <SfCarousel
        data-cy="related-products-carousel"
        :settings="pdpUpsellSettings"
        class="carousel"
        ref="bscarousel"
      >
        <SfCarouselItem class="carousel__item" v-for="(product, i) in products" :key="i">
          <SfProductCard
            v-if="(productGetters.getPrice(product).special) && productGetters.getPrice(product).special < productGetters.getPrice(product).regular"
            :title="productGetters.getName(product)"
            :image="productGetters.getPDPCoverImage(product, 'medium')"
            :regular-price="
              $n(productGetters.getPrice(product).regular, 'currency')
            "
            :special-price="
              productGetters.getPrice(product).special &&
              $n(productGetters.getPrice(product).special, 'currency')
            "
            :link="localePath(`/p/${productGetters.getId(product)}/${productGetters.getSlug(product)}`)"
            :wishlistIcon="false"
            :imageWidth="295"
            :imageHeight="295"
            class="pdp-product-card"
          >
            <template #title>
              <!-- RYVIU APP :: COLLECTION-WIDGET-TOTAL -->
              <SfLink
                class="sf-product-card__link"
                :link="localePath(`/p/${productGetters.getId(product)}/${productGetters.getSlug(product)}`)"
              >
                  <h3 class="sf-product-card__title">
                  {{ productGetters.getName(product) }}
                </h3>
              </SfLink>
            </template>
          </SfProductCard>
          <SfProductCard
            v-else-if="(productGetters.getPrice(product).special) && productGetters.getPrice(product).special > productGetters.getPrice(product).regular"
            :title="productGetters.getName(product)"
            :image="productGetters.getPDPCoverImage(product, 'medium')"
            :regular-price="
              $n(productGetters.getPrice(product).special, 'currency')
            "
            :link="localePath(`/p/${productGetters.getId(product)}/${productGetters.getSlug(product)}`)"
            :wishlistIcon="false"
            :imageWidth="295"
            :imageHeight="295"
            class="pdp-product-card"
          >
            <template #title>
              <SfLink
                class="sf-product-card__link"
                :link="localePath(`/p/${productGetters.getId(product)}/${productGetters.getSlug(product)}`)"
              >
                  <h3 class="sf-product-card__title">
                  {{ productGetters.getName(product) }}
                </h3>
              </SfLink>
            </template>
          </SfProductCard>
          <SfProductCard
            v-else
            :title="productGetters.getName(product)"
            :image="productGetters.getPDPCoverImage(product, 'medium')"
            :regular-price="
              $n(productGetters.getPrice(product).regular, 'currency')
            "
            :link="localePath(`/p/${productGetters.getId(product)}/${productGetters.getSlug(product)}`)"
            :wishlistIcon="false"
            :imageWidth="295"
            :imageHeight="295"
            class="pdp-product-card"
          >
            <template #title>
              <SfLink
                class="sf-product-card__link"
                :link="localePath(`/p/${productGetters.getId(product)}/${productGetters.getSlug(product)}`)"
              >
                  <h3 class="sf-product-card__title">
                  {{ productGetters.getName(product) }}
                </h3>
              </SfLink>
            </template>
          </SfProductCard>
        </SfCarouselItem>
      </SfCarousel>
    </SfLoader>
  </SfSection>
</template>

<script lang="ts">

import {
  SfCarousel,
  SfProductCard,
  SfSection,
  SfLoader,
  SfLink
} from '@storefront-ui/vue';
import { productGetters } from '@vue-storefront/shopify';

export default {
  name: 'RelatedProducts',
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup() {
    return { productGetters };
  },
  components: {
    SfCarousel,
    SfProductCard,
    SfSection,
    SfLoader,
    SfLink
  },
  props: {
    title: String,
    products: Array,
    loading: Boolean
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  data () {
    return {
      pdpUpsellSettings: {
        type: 'slider',
        perView: 4,
        peek: 0,
        autoplay: false,
        animationDuration: 600,
        gap: 20,
        breakpoints: {
          1023: {
            perView: 3,
            peek: {
              before: 0,
              after: 72
            }
          },
          767: {
            perView: 2,
            peek: {
              before: 0,
              after: 72
            }
          },
          510: {
            perView: 1,
            peek: {
              before: 0,
              after: 72
            }
          }
        }
      }
    };
  }
};
</script>

<style lang="scss">
.pdp-upsell-section {
  margin: 0;
  padding-bottom: 164px;
  @include for-mobile {
    padding-bottom: 40px;
  }
  .sf-section__content {
    margin: 0;
  }
  .sf-carousel {
    @include for-desktop {
      margin: 0 -10px;
    }
  }
  .sf-carousel__controls {
    display: none;
  }
  .sf-carousel__wrapper {
    max-width: 100%;
    margin: 0;
    @include for-desktop {
      padding: 10px;
    }
  }
  .glide__slide {
    height: auto;
  }
}
</style>
