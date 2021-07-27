<template>
  <div id="cart">
    <SfSidebar
      :visible="isCartSidebarOpen"
      title="Shopping Bag"
      :subtitle="`${totalItems} items`"
      class="sf-sidebar--right"
      @close="toggleCartSidebar"
      :persistent="true"
    >
      <template #bar>
        <div></div>
      </template>
      <template #circle-icon="{ close }">
        <div class="close-icon" @click="close">
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1 1L17 17" stroke="#171717" stroke-width="2" />
            <path d="M17 1L1 17" stroke="#171717" stroke-width="2" />
          </svg>
        </div>
      </template>
      <transition name="sf-collapse-top" mode="out-in">
        <div class="notifications">
          <SfNotification
            :visible="visible"
            title="Are you sure?"
            message="Are you sure you would like to remove this item from the shopping cart?"
            type="secondary"
            v-if="!isLoadervisible"
          >
            <template #action>
              <div class="button-wrap">
                <SfButton
                  class="sf-button_remove_item"
                  @click="handleRemove(productToRemove)"
                  >Yes</SfButton
                >
                <SfButton @click="visible = false">Cancel</SfButton>
              </div>
            </template>
            <template #close>
              <div />
            </template>
          </SfNotification>
        </div>
      </transition>
      <SfLoader v-if="isLoadervisible" :loading="isLoadervisible">
        <div />
      </SfLoader>
      <transition name="sf-fade" mode="out-in">
        <div v-if="totalItems" key="my-cart" class="my-cart">
          <div class="collected-product-list">
            <transition-group name="sf-fade" tag="div">
              <template v-for="product in products">
                <SfCollectedProduct
                  data-cy="collected-product-cart-sidebar"
                  :key="cartGetters.getItemSku(product)"
                  :image="cartGetters.getItemImage(product)"
                  :stock="99999"
                  :qty="
                    cartGetters.getItemQty(product) > 0
                      ? cartGetters.getItemQty(product)
                      : 1
                  "
                  @input="updateItemQty({ product, quantity: $event })"
                  @click:remove="ConfirmRemove({ product })"
                  class="collected-product"
                >
                  <template #title>
                    <div class="sf-collected-product__title">
                      {{ cartGetters.getItemName(product) }}
                    </div>
                  </template>
                  <template #configuration>
                    <div class="collected-product__properties">
                      <SfProperty
                        v-for="(
                          attribute, key
                        ) in cartGetters.getItemAttributes(product, [
                          'color',
                          'size',
                        ])"
                        :key="key"
                        :name="key"
                        :value="attribute"
                      />
                    </div>
                  </template>
                  <template #price>
                    <SfPrice class="sf-product-card__price">
                      <template
                        #special
                        v-if="cartGetters.getItemPrice(product).special"
                      >
                        <ins class="sf-price__special">{{
                          $n(
                            cartGetters.getItemPrice(product).special,
                            "currency"
                          )
                        }}</ins>
                      </template>
                      <template #old><span /></template>
                      <template
                        #regular
                        v-if="cartGetters.getItemPrice(product).regular > 0"
                      >
                        <del class="sf-price__old">{{
                          $n(
                            cartGetters.getItemPrice(product).regular,
                            "currency"
                          )
                        }}</del>
                      </template>
                    </SfPrice>
                  </template>
                </SfCollectedProduct>
              </template>
            </transition-group>
          </div>
        </div>
        <div v-else key="empty-cart" class="empty-cart">
          <div class="empty-cart__banner">
            <SfImage
              alt="Empty bag"
              class="empty-cart__image"
              src="/icons/empty-cart.svg"
            />
            <SfHeading
              title="Woops! your cart is empty"
              :level="2"
              class="empty-cart__heading"
              description="Looks like you haven’t added any items to the bag yet. Start
              shopping to fill it in."
            />
          </div>
        </div>
      </transition>
      <template #content-bottom>
        <transition name="sf-fade">
          <div v-if="totalItems">
            <SfProperty
              name="Estimated Total"
              class="
                sf-property--full-width sf-property--large
                my-cart__total-price
              "
            >
              <template #value>
                <SfPrice :regular="$n(totals.subtotal, 'currency')" />
              </template>
            </SfProperty>
            <SfHeading
              title=""
              description="Free Shipping On Orders with Subtotals over $100"
              customClass="sf-heading--left"
            >
              <template #description="{ description }">
                <div class="cart-free-shipping-text">
                  {{ description }}
                </div>
              </template>
            </SfHeading>
            <SfLink
              @click="handleCheckout(checkoutURL, parseFloat(totals.subtotal))"
              link="javascript:void(0);"
            >
              <SfButton
                class="
                  sf-button--full-width
                  color-secondary
                  sf-proceed_to_checkout
                "
                @click="toggleCartSidebar"
              >
                Go To Checkout
              </SfButton>
            </SfLink>
          </div>
          <div v-else>
            <SfButton
              class="sf-button--full-width color-primary"
              @click="toggleCartSidebar"
              >Continue Shopping</SfButton
            >
          </div>
        </transition>
      </template>
    </SfSidebar>
  </div>
</template>
<script type="module">
import {
  SfSidebar,
  SfHeading,
  SfButton,
  SfIcon,
  SfProperty,
  SfPrice,
  SfCollectedProduct,
  SfImage,
  SfLink,
  SfNotification,
  SfLoader
} from '@storefront-ui/vue';
import { computed } from '@vue/composition-api';
import { useCart, useUser, cartGetters } from '@vue-storefront/shopify';
import { useUiState, useUiNotification } from '~/composables';
import { onSSR } from '@vue-storefront/core';

export default {
  name: 'Cart',
  components: {
    SfSidebar,
    SfButton,
    SfHeading,
    SfIcon,
    SfProperty,
    SfPrice,
    SfCollectedProduct,
    SfImage,
    SfLink,
    SfNotification,
    SfLoader
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  data() {
    return {
      visible: false,
      isLoadervisible: false,
      productToRemove: ''
    };
  },
  watch: {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    dataAmount: {
      // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
      handler(n) {
        this.dataAmount = n;
      },
      deep: true
    },
    totals: {
      // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
      handler(n) {
        this.dataAmount = n.subtotal;
      },
      deep: true
    }
  },
  methods: {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    ConfirmRemove(product) {
      if (this.notifications.length > 0) {
        this.notifications[0].dismiss();
      }
      this.visible = true;
      this.productToRemove = product;
    },
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    async handleRemove(productObj) {
      this.isLoadervisible = true;
      await this.removeItem(productObj).then(() => {
        this.isLoadervisible = false;
        this.visible = false;
        this.sendNotification({
          key: 'product_removed',
          message: `${productObj.product.title} has been successfully removed from your cart.`,
          type: 'success',
          title: 'Product removed!',
          icon: 'check'
        });
      });
    },
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    handleCheckout(checkoutUrl) {
      setTimeout(() => {
        window.location.replace(checkoutUrl);
      }, 400);
    }
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup() {
    const { isCartSidebarOpen, toggleCartSidebar } = useUiState();
    const { cart, removeItem, updateItemQty, load: loadCart } = useCart();
    const { isAuthenticated } = useUser();
    const { send: sendNotification, notifications } = useUiNotification();
    const products = computed(() => cartGetters.getItems(cart.value));
    const totals = computed(() => cartGetters.getTotals(cart.value));
    const totalItems = computed(() => cartGetters.getTotalItems(cart.value));
    const checkoutURL = computed(() => cartGetters.getcheckoutURL(cart.value));

    onSSR(async () => {
      await loadCart();
    });

    return {
      isAuthenticated,
      products,
      removeItem,
      updateItemQty,
      isCartSidebarOpen,
      toggleCartSidebar,
      totals,
      totalItems,
      cartGetters,
      checkoutURL,
      sendNotification,
      notifications
    };
  }
};
</script>

<style lang="scss">
#cart {
  @include for-desktop {
    & > * {
      --sidebar-bottom-padding: var(--spacer-base);
      --sidebar-content-padding: var(--spacer-base);
    }
  }
  .sf-sidebar__aside {
    @include for-desktop {
      width: 600px;
      box-shadow: 4px 0 30px rgba(0, 0, 0, 0.1);
    }
    @include for-mobile {
      max-width: 354px;
      left: 0;
      right: 0;
      margin-left: auto;
    }
    .close-icon {
      position: absolute;
      top: 37px;
      right: 30px;
      line-height: 1;
      cursor: pointer;
      @include for-mobile {
        top: 21px;
        right: 20px;
      }
      svg {
        path {
          transition: all 0.3s ease 0s;
        }
      }
      &:hover {
        svg {
          path {
            stroke: var(--c-primary);
          }
        }
      }
    }
  }
  .sf-sidebar__top {
    padding: 30px;
    background-color: var(--_c-gray-FAFAFA);
    border-bottom: 1px solid var(--_c-gray-DDDDDD);
    @include for-mobile {
      padding: 18px 20px;
    }
    .sf-sidebar__title {
      display: flex !important;
      align-items: center;
      margin: 0;
      @include for-mobile {
        padding: 0;
      }
    }
    .sf-heading__title {
      color: var(--_c-black-171717);
      font-size: 20px;
      font-weight: 600;
      font-family: var(--font-family--primary);
      line-height: 1.5;
      @include for-mobile {
        font-size: 16px;
      }
    }
    .sf-heading__description {
      margin: 0 0 0 20px;
      color: var(--c-secondary);
      font-size: 14px;
      font-weight: 400;
      font-family: var(--font-family--primary);
      @include for-mobile {
        font-size: 12px;
      }
    }
  }
  .sf-sidebar__content {
    padding: 30px;
    --collected-product-remove-opacity: 1;
    position: relative;
    @include for-mobile {
      padding: 20px;
    }
    .sf-loader {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      .sf-loader__overlay {
        background: rgba(255, 255, 255, 0.9);
      }
    }
    .sf-collected-product {
      max-width: 100%;
      margin: 0;
      padding: 15px 30px 15px 15px;
      box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
      border-radius: 6px;
      --collected-product-remove-text-display: block;
      --collected-product-remove-opacity: 1;
      @include for-mobile {
        padding: 10px 16px 10px 10px;
      }
      & + .sf-collected-product {
        margin-top: 20px;
      }
      &:hover::after {
        display: none;
      }
      &:hover {
        --collected-product-configuration-display: flex;
      }
    }
    .sf-collected-product__aside {
      @include for-desktop {
        flex: 0 0 120px;
      }
      @include for-mobile {
        flex: 0 0 80px;
      }
      .sf-collected-product__image {
        background-color: var(--_c-gray-FAFAFA);
      }
      .sf-image img {
        height: 100%;
        width: 100%;
        aspect-ratio: auto 120 / 120;
        @include for-mobile {
          aspect-ratio: auto 80 / 80;
        }
      }
      .sf-image.has-size {
        max-width: 100%;
      }
      .sf-image.has-size::after {
        padding-bottom: 100%;
      }
      .sf-collected-product__quantity-wrapper {
        position: static;
        padding: 0;
        margin-top: 10px;
      }
    }
    .sf-collected-product__main {
      margin: 0 0 0 25px;
      @include for-mobile {
        margin: 0 0 0 20px;
      }
    }
    .sf-collected-product__quantity-selector {
      background-color: var(--_c-gray-F2F2F2);
    }
    .sf-quantity-selector {
      width: 90px;
      height: 35px;
      margin: 0 auto;
      @include for-mobile {
        width: 80px;
        height: 30px;
      }
    }
    .sf-quantity-selector__input {
      --input-height: 35px;
      padding: 0;
      @include for-mobile {
        --input-height: 30px;
      }
    }
    .sf-input input {
      font-size: 14px;
      padding: 12px 2px;
      line-height: 1;
      border: 0 none;
      color: var(--_c-black-171717);
      @include for-mobile {
        font-size: 16px;
        padding: 11px 2px 9px;
      }
    }
    .sf-quantity-selector__button {
      padding: 10px;
      @include for-mobile {
        padding: 5px;
      }
    }
    .sf-collected-product__title {
      font-size: 16px;
      color: var(--_c-black-171717);
      font-weight: 400;
      line-height: 22px;
      font-family: var(--font-family--primary);
      margin: 0 0 20px;
      max-width: 248px;
      @include for-mobile {
        font-size: 12px;
        margin: 0 0 10px;
        line-height: 18px;
      }
      // &:hover {
      //   color: var(--c-primary);
      // }
    }
    .sf-price {
      @include for-mobile {
        margin-bottom: 5px;
      }
      .sf-price__old,
      .sf-price__special {
        font-size: 16px;
        color: var(--_c-gray-222222);
        font-weight: 600;
        line-height: 1;
        font-family: var(--font-family--primary);
        @include for-mobile {
          font-size: 12px;
        }
      }
      .sf-price__old {
        color: var(--_c-gray-999999);
      }
    }
    .sf-collected-product__configuration {
      justify-content: flex-start;
    }
    .collected-product__properties,
    .sf-collected-product__actions {
      display: flex;
    }
    .sf-collected-product__actions {
      display: none;
      justify-content: var(
        --collected-product-actions-justify-content,
        flex-end
      );
      align-items: var(--collected-product-actions-align-items, flex-start);
      flex: 2;
      margin-bottom: 11px;
      @include for-mobile {
        margin-bottom: 9px;
      }
      .sf-button {
        display: block !important;
        font-size: 14px;
        color: var(--_c-black-171717);
        font-weight: 300;
        line-height: 1;
        font-family: var(--font-family--primary);
        transition: all 0.3s ease 0s;
        @include for-mobile {
          font-size: 10px;
        }
        &:hover {
          color: var(--c-primary);
        }
      }
    }
    .sf-collected-product__remove--text {
      display: none;
      right: 30px;
      bottom: 26px;
      font-size: 14px;
      color: var(--_c-black-171717);
      font-weight: 300;
      line-height: 1;
      font-family: var(--font-family--primary);
      transition: all 0.3s ease 0s;
      @include for-mobile {
        font-size: 10px;
        right: 16px;
        bottom: 19px;
      }
      &:hover {
        color: var(--c-primary);
      }
    }
    .sf-collected-product__more-actions {
      display: none;
    }
    .sf-collected-product__remove--circle-icon {
      display: var(--collected-product-remove-circle-icon-display, block);
      transition: all 0.3s ease 0s;
      @include for-mobile {
        right: -10px;
        text-align: center;
        --button-size: 20px;
      }
      .sf-icon {
        @include for-mobile {
          width: 10px;
          height: 10px;
          margin: auto;
        }
      }
      &:hover {
        background-color: var(--_c-black-171717);
      }
    }
    .sf-property__value,
    .sf-property__name {
      font-size: 13px;
      color: var(--_c-black-171717);
      font-weight: 500;
      line-height: 1;
      font-family: var(--font-family--primary);
      text-transform: capitalize;
      @include for-mobile {
        font-size: 12px;
      }
    }
    .sf-property__value {
      font-weight: 400;
    }
    .empty-cart__banner {
      .empty-cart__image {
        margin: 0 0 20px;
      }
      .empty-cart__heading {
        padding: 0;
      }
      .sf-heading__title {
        font-family: var(--font-family--primary);
        font-weight: 500;
        font-size: 24px;
        margin-bottom: 20px;
        @include for-mobile {
          font-size: 20px;
        }
      }
      .sf-heading__description {
        font-family: var(--font-family--primary);
        font-weight: 400;
        font-size: 16px;
        @include for-mobile {
          font-size: 14px;
        }
      }
    }
  }
  .sf-sidebar__bottom {
    box-shadow: 0 -4px 15px rgba(0, 0, 0, 0.1);
    padding: 30px;
    @include for-mobile {
      padding: 20px;
    }
    .sf-property--full-width {
      margin-bottom: 10px;
      @include for-mobile {
        margin-bottom: 5px;
      }
    }
    .sf-price__regular,
    .sf-property__name {
      font-size: 18px;
      color: var(--_c-black-171717);
      font-weight: 600;
      line-height: 1;
      font-family: var(--font-family--primary);
      @include for-mobile {
        font-size: 14px;
      }
    }
    .sf-heading {
      color: var(--_c-gray-888888);
      margin-bottom: 20px;
      --heading-text-align: left;
      @include for-mobile {
        font-size: 10px;
        padding: 0;
        margin-bottom: 16px;
      }
    }
    .sf-link {
      text-decoration: none;
    }
    .sf-button {
      font-size: 20px;
      color: var(--c-white);
      font-weight: 400;
      line-height: 1;
      font-family: var(--font-family--primary);
      background-color: var(--c-primary);
      border-radius: 60px;
      text-transform: none;
      border: 0 none;
      padding: 20px;
      @include for-mobile {
        font-size: 12px;
        padding: 14px;
      }
      &:hover {
        background-color: var(--_c-black-171717);
      }
    }
  }
}
.empty-cart {
  --heading-description-margin: 0 0 var(--spacer-xl) 0;
  --heading-title-margin: 0 0 var(--spacer-xl) 0;
  --heading-title-color: var(--c-primary);
  --heading-title-font-weight: var(--font-weight--semibold);
  display: flex;
  flex: 1;
  align-items: center;
  flex-direction: column;
  &__banner {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    flex: 1;
  }
  &__heading {
    padding: 0 var(--spacer-base);
  }
  &__image {
    --image-width: 13.1875rem;
    margin: 0 0 var(--spacer-xl) 7.5rem;
    @include for-desktop {
      --image-width: 23.3125rem;
      margin: 0 0 var(--spacer-2xl) 7.5rem;
    }
  }
  @include for-desktop {
    --heading-title-font-size: var(--font-size--xl);
    --heading-title-margin: 0 0 var(--spacer-sm) 0;
  }
}
.collected-product-list {
  flex: 1;
}
</style>
