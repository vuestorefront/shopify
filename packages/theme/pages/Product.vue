<template>
  <SfLoader
    v-if="productloading"
    class="pdc-pdp-loader"
    :loading="productloading"
  >
    <div />
  </SfLoader>
  <div id="product" v-else>
    <SfBreadcrumbs class="breadcrumbs" :breadcrumbs="breadcrumbs">
      <template #link="{ breadcrumb }">
        <nuxt-link
          :data-testid="breadcrumb.text"
          :to="breadcrumb.route.link"
          class="sf-link disable-active-link sf-breadcrumbs__breadcrumb"
        >
          {{ breadcrumb.text }}
        </nuxt-link>
      </template>
    </SfBreadcrumbs>
    <div class="product">
      <SfGallery
        :images="productGallery"
        :current="ActiveVariantImage + 1"
        class="product__gallery"
        imageWidth="422"
        imageHeight="664"
        thumbWidth="160"
        thumbHeight="160"
      />
      <div class="product__info">
        <div class="product__header">
          <SfHeading
            :title="productGetters.getName(product)"
            :level="1"
            class="sf-heading--no-underline sf-heading--left"
          />
          <div class="product_stock_wrap">
            <SfBadge
              class="sf-badge--number"
              :class="
                productGetters.getStockStatus(product)
                  ? 'color-success'
                  : 'color-danger'
              "
            >
              {{
                productGetters.getStockStatus(product)
                  ? "In stock"
                  : "Out of Stock"
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
            <template
              v-if="
                productGetters.getPrice(product).special &&
                parseFloat(productGetters.getPrice(product).special) <
                  parseFloat(productGetters.getPrice(product).regular)
              "
            >
              <SfPrice
                :regular="
                  $n(productGetters.getPrice(product).regular, 'currency')
                "
                :special="
                  $n(productGetters.getPrice(product).special, 'currency')
                "
              />
              <SfBadge class="sf-badge--number">
                {{ productGetters.getDiscountPercentage(product) }}% off
              </SfBadge>
            </template>
            <SfPrice
              :regular="
                $n(productGetters.getPrice(product).special, 'currency')
              "
              v-else-if="
                productGetters.getPrice(product).special &&
                parseFloat(productGetters.getPrice(product).special) >
                  parseFloat(productGetters.getPrice(product).regular)
              "
            />
            <SfPrice
              :regular="
                $n(productGetters.getPrice(product).regular, 'currency')
              "
              v-else
            />
          </div>
        </div>
        <div>
          <p
            class="product__description desktop-only"
            v-if="productDescription"
          >
            {{ productDescription }}
          </p>
          <div v-if="options && Object.keys(options).length > 0">
            <template v-for="(option, o) in options">
              <SfSelect
                v-if="o.toLowerCase() !== 'color'"
                :key="`attrib-${o}`"
                :data-cy="`product-select_${o.toLowerCase()}`"
                :set="(atttLbl = o)"
                @input="(o) => updateFilter({ [atttLbl]: o })"
                :value="configuration[o] || options[o][0].value"
                :label="$t(`${o}`)"
                :class="`sf-select--underlined product__select-${o.toLowerCase()}`"
                :required="true"
              >
                <SfSelectOption
                  v-for="(attribs, a) in option"
                  :key="`item-${a}`"
                  :value="attribs.value"
                >
                  {{ attribs.value }}
                </SfSelectOption>
              </SfSelect>
              <div
                :key="`attrib-${o.toLowerCase()}`"
                v-else
                :class="`product__${o.toLowerCase()}s`"
              >
                <p class="product__color-label">{{ $t(`${o}`) }}:</p>
                <SfColor
                  data-cy="product-color_update"
                  v-for="(attribs, a) in option"
                  :key="`item-${a}`"
                  :color="attribs.value"
                  :class="`product__color ${attribs.value}`"
                  @click="
                    (atttLbl = o), updateFilter({ [atttLbl]: attribs.value })
                  "
                  :selected="
                    configuration[o]
                      ? configuration[o] === attribs.value
                        ? true
                        : false
                      : a === 0
                      ? true
                      : false
                  "
                />
              </div>
            </template>
          </div>
          <SfAddToCart
            data-cy="product-cart_add"
            :stock="stock"
            v-model="qty"
            :canAddToCart="stock > 0"
            class="product__add-to-cart"
            v-if="productGetters.getStockStatus(product) === true"
          >
            <template #add-to-cart-btn>
              <SfButton
                class="sf-add-to-cart__button"
                :disabled="loading"
                @click="addingToCart({ product, quantity: parseInt(qty) })"
              >
                Add to Bag
              </SfButton>
            </template>
          </SfAddToCart>
          <LazyHydrate when-idle>
            <SfTabs :open-tab="1" class="product__tabs">
              <SfTab data-cy="product-tab_description" title="Description">
                <div class="product__description" v-if="productDescriptionHtml">
                  <div v-html="productDescriptionHtml"></div>
                </div>
                <SfProperty
                  v-for="(property, i) in properties"
                  :key="i"
                  :name="property.name"
                  :value="property.value"
                  class="product__property"
                >
                  <template v-if="property.name === 'Category'" #value>
                    <SfButton class="product__property__button sf-button--text">
                      {{ property.value }}
                    </SfButton>
                  </template>
                </SfProperty>
              </SfTab>
              <SfTab
                title="Additional Information"
                data-cy="product-tab_additional"
                class="product__additional-info"
              >
                <div class="product__additional-info">
                  <p class="product__additional-info__title">
                    {{ $t("Brand") }}
                  </p>
                  <p>{{ brand }}</p>
                  <p class="product__additional-info__title">
                    {{ $t("Instruction1") }}
                  </p>
                  <p class="product__additional-info__paragraph">
                    {{ $t("Instruction2") }}
                  </p>
                  <p class="product__additional-info__paragraph">
                    {{ $t("Instruction3") }}
                  </p>
                  <p>{{ careInstructions }}</p>
                </div>
              </SfTab>
            </SfTabs>
          </LazyHydrate>
        </div>
      </div>
    </div>
    <LazyHydrate when-visible>
      <RelatedProducts
        :products="relatedProducts"
        :loading="relatedLoading"
        title="Match it with"
      />
    </LazyHydrate>
    <LazyHydrate when-visible>
      <InstagramFeed />
    </LazyHydrate>
    <LazyHydrate when-visible>
      <MobileStoreBanner />
    </LazyHydrate>
  </div>
</template>
<script>
import {
  SfProperty,
  SfHeading,
  SfPrice,
  SfRating,
  SfSelect,
  SfAddToCart,
  SfTabs,
  SfGallery,
  SfIcon,
  SfImage,
  SfBadge,
  SfBanner,
  SfAlert,
  SfSticky,
  SfReview,
  SfBreadcrumbs,
  SfLoader,
  SfButton,
  SfColor
} from '@storefront-ui/vue';

import InstagramFeed from '~/components/InstagramFeed.vue';
import RelatedProducts from '~/components/RelatedProducts1.vue';
import { ref, computed, watch } from '@vue/composition-api';
import { useProduct, useCart, productGetters } from '@vue-storefront/shopify';
import MobileStoreBanner from '~/components/MobileStoreBanner.vue';
import LazyHydrate from 'vue-lazy-hydration';
import { onSSR } from '@vue-storefront/core';
import useUiNotification from '~/composables/useUiNotification';

export default {
  name: 'Product',
  transition: 'fade',
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.prevRoute = from;
    });
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  methods: {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    async addingToCart(Productdata) {
      await this.addItem(Productdata).then(() => {
        this.sendNotification({
          key: 'product_added',
          message: `${Productdata.product.name} has been successfully added to your cart.`,
          type: 'success',
          title: 'Product added!',
          icon: 'check'
        });
        this.qty = 1;
      });
    },
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    updatedQuantity(value) {
      this.qty = value;
    },
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    setGalleryWidth() {
      const gallary = document.getElementsByClassName('product__gallery');
      const gallerySlider =
        gallary.length > 0 && gallary[0].querySelectorAll('.glide__slides');
      const galleryAllSlides =
        gallerySlider.length > 0 &&
        gallerySlider[0].querySelectorAll('.glide__slide');
      typeof galleryAllSlides !== Boolean &&
        galleryAllSlides.length > 0 &&
        galleryAllSlides.forEach((gallerySlide) => {
          gallerySlide.style.flexBasis = gallerySlide.style.width;
        });
    }
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  mounted() {
    window.addEventListener('load', () => {
      this.setGalleryWidth();
    });
    this.$nextTick(() => {
      this.setGalleryWidth();
      this.setBreadcrumb();
      window.addEventListener('resize', this.setGalleryWidth);
    });
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  updated() {
    this.setGalleryWidth();
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup(props, context) {
    const breadcrumbs = ref([]);
    const atttLbl = '';
    const qty = ref(1);
    const { slug } = context.root.$route.params;
    const {
      loading: productloading,
      products,
      search
    } = useProduct('products');
    const { send: sendNotification } = useUiNotification();
    const {
      products: relatedProducts,
      search: searchRelatedProducts,
      loading: relatedLoading
    } = useProduct('relatedProducts');
    const { addItem, loading } = useCart();

    const product = computed(
      () =>
        productGetters.getFiltered(products.value, {
          master: true,
          attributes: context.root.$route.query
        })[0]
    );
    const id = computed(() => productGetters.getId(product.value));
    const originalId = computed(() =>
      productGetters.getProductOriginalId(product.value)
    );
    const productTitle = computed(() => productGetters.getName(product.value));
    const productCoverImage = computed(() =>
      productGetters.getPDPCoverImage(product.value)
    );
    const productDescription = computed(() =>
      productGetters.getDescription(product.value)
    );
    const productDescriptionHtml = computed(() =>
      productGetters.getDescription(product.value, true)
    );
    const options = computed(() =>
      productGetters.getAttributes(products.value)
    );
    const configuration = computed(() => {
      return productGetters.getSelectedVariant(
        products.value,
        context.root.$route.query
      );
    });

    const setBreadcrumb = () => {
      breadcrumbs.value = [
        {
          text: 'Home',
          route: { link: '/' }
        },
        {
          text: 'products',
          route: { link: '#' }
        },
        {
          text: productTitle.value,
          route: { link: '#' }
        }
      ];
    };

    watch(
      productTitle,
      (currproductTitle, prevproductTitle) => {
        if (currproductTitle !== prevproductTitle) {
          setBreadcrumb();
        }
      },
      { deep: true }
    );
    const productGallery = computed(() => {
      if (product.value && product.value.images.length === 0) {
        product.value.images.push({
          originalSrc:
            'https://cdn.shopify.com/s/files/1/0407/1902/4288/files/placeholder_600x600.jpg?v=1625742127'
        });
      }
      return productGetters.getGallery(product.value).map((img) => ({
        mobile: { url: img.small },
        desktop: { url: img.normal },
        big: { url: img.big },
        alt: product.value._name || product.value.name
      }));
    });
    const stock = computed(() => {
      return productGetters.getStock(product.value);
    });
    const ActiveVariantImage = computed(() => {
      return productGetters.getVariantImage(product.value) || 0;
    });

    onSSR(async () => {
      await search({ slug, selectedOptions: configuration.value }).then(() => {
        if (productTitle.value === 'Product\'s name') {
          return context.root.error({ statusCode: 404, message: 'This product could not be found' });
        }
      });
      await searchRelatedProducts({ productId: id.value, related: true });
    });

    const updateFilter = (filter) => {
      if (options.value) {
        Object.keys(options.value).forEach((attr) => {
          if (attr in filter) {
            return;
          }
          filter[attr] =
            Object.keys(configuration.value).length > 0
              ? configuration.value[attr]
              : options.value[attr][0].value;
        });
      }
      context.root.$router.push({
        path: context.root.$route.path,
        query: {
          ...configuration.value,
          ...filter
        }
      });
    };

    return {
      updateFilter,
      configuration,
      product,
      productDescription,
      productCoverImage,
      productDescriptionHtml,
      ActiveVariantImage,
      sendNotification,
      originalId,
      relatedProducts: computed(() =>
        productGetters.getFiltered(relatedProducts.value, { master: true })
      ),
      relatedLoading,
      options,
      stock,
      productTitle,
      breadcrumbs,
      qty,
      addItem,
      loading,
      productloading,
      productGallery,
      productGetters,
      setBreadcrumb,
      atttLbl
    };
  },
  components: {
    SfAlert,
    SfColor,
    SfLoader,
    SfProperty,
    SfHeading,
    SfPrice,
    SfRating,
    SfSelect,
    SfAddToCart,
    SfTabs,
    SfGallery,
    SfIcon,
    SfImage,
    SfBanner,
    SfSticky,
    SfReview,
    SfBadge,
    SfBreadcrumbs,
    SfButton,
    InstagramFeed,
    RelatedProducts,
    MobileStoreBanner,
    LazyHydrate
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  data() {
    return {
      stock: 5,
      properties: [
        {
          name: 'Product Code',
          value: '578902-00'
        },
        {
          name: 'Category',
          value: 'Pants'
        },
        {
          name: 'Material',
          value: 'Cotton'
        },
        {
          name: 'Country',
          value: 'Germany'
        }
      ],
      description:
        'Find stunning women cocktail and party dresses. Stand out in lace and metallic cocktail dresses and party dresses from all your favorite brands.',
      detailsIsActive: false,
      brand:
        'Brand name is the perfect pairing of quality and design. This label creates major everyday vibes with its collection of modern brooches, silver and gold jewellery, or clips it back with hair accessories in geo styles.',
      careInstructions: 'Do not wash!'
    };
  }
};
</script>

<style lang="scss" scoped>
.pdc-pdp-loader {
  min-height: 200px;
  padding: 100px 0;
}

#product {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1272px;
    margin: 0 auto;
  }
}
.product {
  @include for-desktop {
    display: flex;
  }
  &__info {
    margin: var(--spacer-sm) auto;
    @include for-desktop {
      max-width: 32.625rem;
      margin: 0 0 0 7.5rem;
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
    flex: 1;
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
