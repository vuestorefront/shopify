<template>
  <section>
    <SfHeading
        title="Product Of The Day"
        class="sf-heading--no-underline sf-heading--center"
      />
    <div id="product">
      <div class="product">
        <SfGallery
          v-if="productGallery.length > 0"
          :images="productGallery"
          class="product__gallery"
        />
        <div class="product__info">
          <div class="product__header">
            <SfHeading
              :title="productGetters.getName(product)"
              :level="3"
              class="sf-heading--no-underline sf-heading--left"
            />
            <SfBadge
              class="sf-badge--number"
              :class="
                productGetters.getStatus(product)
                  ? 'color-success'
                  : 'color-danger'
              "
            >
              {{
                productGetters.getStatus(product) ? "In stock" : "Out of Stock"
              }}
            </SfBadge>
            <SfIcon
              icon="drag"
              size="xxl"
              color="var(--c-text-disabled)"
              class="product__drag-icon smartphone-only"
            />
          </div>
          <div class="product__price-and-rating">
            <SfPrice
              :regular="
                productGetters.getFormattedPrice(
                  productGetters.getPrice(product).regular
                )
              "
              :special="
                productGetters.getFormattedPrice(
                  productGetters.getPrice(product).special
                )
              "
            />
            <div>
              <div class="product__rating">
                <SfRating :score="averageRating" :max="5" />
                <a v-if="!!totalReviews" href="#" class="product__count">
                  ({{ totalReviews }})
                </a>
              </div>
            </div>
          </div>
          <div>
            <p
              v-if="productDescription"
              class="product__description desktop-only"
            >
              {{ productDescription }}
            </p>
            <SfSelect
              v-if="options.Size"
              data-cy="product-select_size"
              :value="configuration.size"
              label="Size"
              class="sf-select--underlined product__select-size"
              :required="true"
            >
              <SfSelectOption
                v-for="size in options.Size"
                :key="size.value"
                :value="size.value"
              >
                {{ size.value }}
              </SfSelectOption>
            </SfSelect>
            <div
              v-if="options.Color && options.Color.length > 1"
              class="product__colors desktop-only"
            >
              <p class="product__color-label">{{ $t("Color") }}:</p>
              <SfColor
                v-for="(color, i) in options.Color"
                :key="i"
                data-cy="product-color_update"
                :color="color.value"
                class="product__color"
              />
            </div>
            <SfAddToCart
              v-model="qty"
              data-cy="product-cart_add"
              :stock="stock"
              :disabled="loading"
              :can-add-to-cart="stock > 0"
              class="product__add-to-cart"
              @click="addItem({ product, quantity: parseInt(qty) })"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script type="module">
import {
  SfHeading,
  SfPrice,
  SfRating,
  SfSelect,
  SfAddToCart,
  SfGallery,
  SfIcon,
  SfBadge,
  SfColor
} from '@storefront-ui/vue';

import { ref, computed, useRoute } from '@nuxtjs/composition-api';
import {
  useCart,
  productGetters,
  useReview,
  reviewGetters
} from '@vue-storefront/shopify';

export default {
  name: 'Product',
  components: {
    SfColor,
    SfHeading,
    SfPrice,
    SfRating,
    SfSelect,
    SfAddToCart,
    SfGallery,
    SfIcon,
    SfBadge
  },
  transition: 'fade',
  props: {
    productModel: {
      default: [] || {},
      type: Array || Object
    }
  },
  
  setup(props) {
    const route = useRoute();
    const qty = ref(1);
    const { addItem, loading } = useCart();
    const { reviews: productReviews } = useReview(
      'productReviews'
    );
    const product = computed(
      () =>
        productGetters.getFiltered(props.productModel, {
          master: true,
          attributes: route?.value?.query
        })[0]
    );
    const productDescription = computed(() =>
      productGetters.getDescription(product.value)
    );
    const productDescriptionHtml = computed(() =>
      productGetters.getDescription(product.value, true)
    );
    const options = computed(() => productGetters.getAttributes(product.value));
    const configuration = computed(() =>
      productGetters.getAttributes(product.value, ['color', 'size'])
    );
    const reviews = computed(() =>
      reviewGetters.getItems(productReviews.value)
    );

    // TODO: Breadcrumbs are temporary disabled because productGetters return undefined. We have a mocks in data
    const breadcrumbs = computed(() =>
      productGetters.getBreadcrumbs
        ? productGetters.getBreadcrumbs(product.value)
        : props.fallbackBreadcrumbs
    );
    const productGallery = computed(() =>
      productGetters.getGallery(product.value).map((img) => ({
        mobile: { url: img.small },
        desktop: { url: img.normal },
        big: { url: img.big }
      }))
    );

    return {
      configuration,
      product,
      productDescription,
      productDescriptionHtml,
      reviews,
      reviewGetters,
      averageRating: computed(() =>
        productGetters.getAverageRating(product.value)
      ),
      totalReviews: computed(() =>
        productGetters.getTotalReviews(product.value)
      ),
      options,
      breadcrumbs,
      qty,
      addItem,
      loading,
      productGetters,
      productGallery
    };
  },
  data() {
    return {
      stock: 5
    };
  }
};
</script>

<style lang="scss" scoped>
#product {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1272px;
    margin: var(--spacer-2xl) 0;
  }
}
.product {
  @include for-desktop {
    display: flex;
  }
  &__info {
    margin: var(--spacer-sm) auto;
    @include for-desktop {
      max-width: 40%;
      flex: 0 0 40%;
      margin: 0 0 0 3rem;
    }
  }
  &__header {
    --heading-title-color: var(--c-link);
    --heading-title-font-weight: var(--font-weight--bold);
    --heading-padding: 0;
    margin: 0 var(--spacer-sm);
    display: flex;
    justify-content: space-between;
    @include for-desktop {
      --heading-title-font-weight: var(--font-weight--semibold);
      margin: 0 auto;
    }
  }
  &__drag-icon {
    animation: moveicon 1s ease-in-out infinite;
  }
  &__price-and-rating {
    margin: 0 var(--spacer-sm) var(--spacer-base);
    align-items: center;
    @include for-desktop {
      display: flex;
      justify-content: space-between;
      margin: var(--spacer-sm) 0 var(--spacer-lg) 0;
    }
  }
  &__rating {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin: var(--spacer-xs) 0 var(--spacer-xs);
  }
  &__count {
    @include font(
      --count-font,
      var(--font-weight--normal),
      var(--font-size--sm),
      1.4,
      var(--font-family--secondary)
    );
    color: var(--c-text);
    text-decoration: none;
    margin: 0 0 0 var(--spacer-xs);
  }
  &__description {
    @include font(
      --product-description-font,
      var(--font-weight--light),
      var(--font-size--base),
      1.6,
      var(--font-family--primary)
    );
  }
  &__select-size {
    margin: 0 var(--spacer-sm);
    @include for-desktop {
      margin: 0;
    }
  }
  &__colors {
    @include font(
      --product-color-font,
      var(--font-weight--normal),
      var(--font-size--lg),
      1.6,
      var(--font-family--secondary)
    );
    display: flex;
    align-items: center;
    margin-top: var(--spacer-xl);
  }
  &__color-label {
    margin: 0 var(--spacer-lg) 0 0;
  }
  &__color {
    margin: 0 var(--spacer-2xs);
  }
  &__add-to-cart {
    margin: var(--spacer-base) var(--spacer-sm) 0;
    @include for-desktop {
      margin-top: var(--spacer-2xl);
    }
  }
  &__guide,
  &__compare,
  &__save {
    display: block;
    margin: var(--spacer-xl) 0 var(--spacer-base) auto;
  }
  &__compare {
    margin-top: 0;
  }
  &__tabs {
    margin: var(--spacer-lg) auto var(--spacer-2xl);
    --tabs-title-font-size: var(--font-size--lg);
    @include for-desktop {
      margin-top: var(--spacer-2xl);
    }
  }
  &__property {
    margin: var(--spacer-base) 0;
    &__button {
      --button-font-size: var(--font-size--base);
    }
  }
  &__review {
    padding-bottom: 24px;
    border-bottom: var(--c-light) solid 1px;
    margin-bottom: var(--spacer-base);
  }
  &__additional-info {
    color: var(--c-link);
    @include font(
      --additional-info-font,
      var(--font-weight--light),
      var(--font-size--sm),
      1.6,
      var(--font-family--primary)
    );
    &__title {
      font-weight: var(--font-weight--normal);
      font-size: var(--font-size--base);
      margin: 0 0 var(--spacer-sm);
      &:not(:first-child) {
        margin-top: 3.5rem;
      }
    }
    &__paragraph {
      margin: 0;
    }
  }
  &__gallery {
    flex: 0 0 60%;
    max-width: 60%;
    @media (max-width:767px) {
      max-width: 100%;
    }
  }
}
.breadcrumbs {
  margin: var(--spacer-base) auto var(--spacer-lg);
}
.banner-app {
  --banner-container-width: 100%;
  --banner-title-margin: var(--spacer-base) 0 var(--spacer-xl) 0;
  --banner-padding: 0 var(--spacer-2xl);
  --banner-title-font-size: var(--h1-font-size);
  --banner-subtitle-font-size: var(--font-size--xl);
  --banner-title-font-weight: var(--font-weight--semibold);
  --banner-subtitle-font-weight: var(--font-weight--medium);
  --banner-title-text-transform: capitalize;
  --banner-subtitle-text-transform: capitalize;
  display: block;
  min-height: 26.25rem;
  max-width: 65rem;
  margin: 0 auto;
  padding: 0 calc(25% + var(--spacer-2xl)) 0 var(--spacer-xl);
  &__call-to-action {
    --button-background: transparent;
    display: flex;
  }
  &__button {
    --image-width: 8.375rem;
    --image-height: 2.75rem;
    --button-padding: 0;
    & + & {
      margin: 0 0 0 calc(var(--spacer-xl) / 2);
    }
  }
}
@keyframes moveicon {
  0% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(0, 30%, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}
</style>
