<template>
  <SfSection :title-heading="title" class="section pdc-sec-title pdp-upsell-section">
    <SfLoader :class="{ loading }" :loading="loading">
      <SfCarousel
        ref="bscarousel"
        data-cy="related-products-carousel"
        :settings="pdpUpsellSettings"
        class="carousel"
      >
        <SfCarouselItem v-for="(product, i) in products" :key="i" class="carousel__item">
          <SfProductCard
            :title="productGetters.getName(product)"
            :image="productGetters.getPDPCoverImage(product)"
            :is-added-to-cart="isInCart({ product, currentCart })"
            :show-add-to-cart-button="true"
            :add-to-cart-disabled="!productGetters.getStockStatus(product)"
            :link="localePath(`/p/${productGetters.getId(product)}/${productGetters.getSlug(product)}`)"
            :wishlist-icon="false"
            :image-width="$device.isDesktopOrTablet ? 212 : 154"
            :image-height="$device.isDesktopOrTablet ? 320 : 232"
            class="pdp-product-card"
            @click:add-to-cart="
              handleAddToCart({ product, quantity: 1, currentCart })
            "
          > <template #image="imageSlotProps">
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
            <template #price>
              <SfPrice
                class="sf-product-card__price"
              >
                <template v-if="productGetters.getPrice(product).special" #special>
                  <ins class="sf-price__special">{{ $n(productGetters.getPrice(product).special, 'currency') }}</ins>
                </template>
                <template #old><span/></template>
                <template v-if="productGetters.getPrice(product).regular > 0" #regular>
                  <del class="sf-price__old">{{ $n(productGetters.getPrice(product).regular, 'currency') }}</del>
                </template>
              </SfPrice>
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
  SfLink,
  SfPrice,
  SfButton
} from '@storefront-ui/vue';
import useUiNotification from '../composables/useUiNotification';
import { productGetters, useCart } from '@vue-storefront/shopify';

export default {
  name: 'RelatedProducts',
  components: {
    SfCarousel,
    SfProductCard,
    SfSection,
    SfLoader,
    SfLink,
    SfPrice,
    SfButton
  },
  props: {
    title: String,
    products: Array,
    loading: Boolean
  },
  setup() {
    const { addItem: addItemToCart, isInCart, cart: currentCart } = useCart();
    const { send: sendNotification } = useUiNotification();

    const getStockCount = (product) => product?.totalInventory ?? 0

    return { 
      currentCart,
      productGetters,
      sendNotification,
      addItemToCart,
      isInCart,
      getStockCount
    };
  },
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
  },
  methods: {
    handleAddToCart(productObj) {
      this.addItemToCart(productObj).then(() => {
        this.sendNotification({
          key: 'added_to_cart',
          message: 'Product has been successfully added to cart !',
          type: 'success',
          title: 'Product added!',
          icon: 'check'
        });
      });
    },
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
  .sf-product-card__link {
    overflow: hidden;
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
