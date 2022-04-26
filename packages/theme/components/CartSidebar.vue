<template>
  <div id="cart">
    <SfSidebar
      v-e2e="'sidebar-cart'"
      :visible="isCartSidebarOpen"
      title="My Cart"
      class="sf-sidebar--right"
      @close="toggleCartSidebar"
    >
      <template #content-top>
        <SfProperty
          v-if="totalItems"
          class="sf-property--large cart-summary desktop-only"
          name="Total items"
          :value="totalItems"
        />
      </template>
      <transition name="sf-fade" mode="out-in">
        <div v-if="totalItems" key="my-cart" class="my-cart">
          <div class="collected-product-list">
            <transition-group name="sf-fade" tag="div">
              <SfCollectedProduct
                v-for="product in products"
                :key="cartGetters.getItemSku(product)"
                v-e2e="'collected-product'"
                :image="cartGetters.getItemImage(product)"
                :title="cartGetters.getItemName(product)"
                :regular-price="$n(cartGetters.getItemPrice(product).regular, 'currency')"
                :special-price="cartGetters.getItemPrice(product).special && $n(cartGetters.getItemPrice(product).special, 'currency')"
                :stock="99999"
                class="collected-product"
                @click:remove="removeItem({ product })"
              >
                <template #configuration>
                  <div class="collected-product__properties">
                    <SfProperty
                      v-for="(attribute, key) in cartGetters.getItemAttributes(product, ['color', 'size'])"
                      :key="key"
                      :name="key"
                      :value="attribute"
                    />
                  </div>
                </template>
                <template #input>
                  <div class="sf-collected-product__quantity-wrapper">
                    <SfQuantitySelector
                      :disabled="loading"
                      :qty="cartGetters.getItemQty(product)"
                      class="sf-collected-product__quantity-selector"
                      @input="updateQuantity({ product, quantity: Number($event) })"
                    />
                  </div>
                </template>
                <template #actions>
                  <div />
                </template>
                <template #more-actions>
                  <div />
                </template>
              </SfCollectedProduct>
            </transition-group>
          </div>
        </div>
        <div v-else key="empty-cart" class="empty-cart">
          <div class="empty-cart__banner">
            <SfImage
              alt="Empty bag"
              class="empty-cart__image"
              src="/icons/empty-cart.webp"
              :width="256"
              :height="173"
            />
            <SfHeading
              title="Your cart is empty"
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
            <div v-if="!appliedCoupon" class="coupon-form-wrapper">
              <SfInput
                v-model="couponcode"
                :value="couponcode"
                label="Apply coupon"
                type="text"
                :icon='{"icon":"","color":"","size":""}'
                :valid="isValidCoupon"
                :error-message="errorMsg"
                :required="true"
                :disabled="false"
                :has-show-password="false"
                class="coupon-code-input"
              />
              <SfButton
                  class="sf-button--full-width color-secondary sf-apply-coupon"
                  @click="handleApplyCoupon(couponcode)"
                >
                  {{ $t('Apply') }}
              </SfButton>
            </div>
            <SfProperty
            v-if="totalDiscount"
              class="sf-property--full-width sf-property--large my-cart__discount"
            >
            <template #name>
              <span class="sf-property__name applied-discount">{{displayDiscountStr}}<SfIcon v-if="appliedCoupon" class="remove-coupon" icon="cross" size="xxs" color="green-primary" @click="handleRemoveCoupon(couponcode)"/></span>
            </template>
              <template #value>
                <SfPrice
                  v-if="!totalDiscount.percentage"
                  :regular="$n(totalDiscount.amount, 'currency')"
                />
                <SfPrice
                v-else
                :regular="$n(totals.subtotal * totalDiscount.percentage/ (100 - totalDiscount.percentage), 'currency')"/>
              </template>
            </SfProperty>
            <SfProperty
              name="Estimated Total"
              class="sf-property--full-width sf-property--large my-cart__total-price"
            >
              <template #value>
                <SfPrice
                  :regular="$n(totals.subtotal, 'currency')"
                />
              </template>
            </SfProperty>
            <SfProperty
            v-if="totalSavings"
              name="Total Savings"
              class="sf-property--full-width sf-property--large my-cart__total-price"
            >
              <template #value>
                <SfPrice
                  :regular="$n(totalSavings, 'currency')"
                />
              </template>
            </SfProperty>
            <SfLink link="javascript:void(0);" @click="handleCheckout(checkoutURL, parseFloat(totals.subtotal))">
              <SfButton
                class="sf-button--full-width color-secondary sf-proceed_to_checkout"
                @click="toggleCartSidebar"
              >
                {{ $t('Go to checkout') }}
              </SfButton>
            </SfLink>
            </div>
          <div v-else>
            <SfButton
              class="sf-button--full-width color-primary"
              @click="toggleCartSidebar"
            >{{ $t('Go back shopping') }}</SfButton
            >
          </div>
        </transition>
      </template>
    </SfSidebar>
  </div>
</template>
<script>
import {
  SfSidebar,
  SfHeading,
  SfButton,
  SfProperty,
  SfPrice,
  SfCollectedProduct,
  SfImage,
  SfLink,
  SfInput,
  SfQuantitySelector,
  SfIcon
} from '@storefront-ui/vue';
import { computed, ref, useRoute } from '@nuxtjs/composition-api';
import { useCart, useUser, cartGetters } from '@vue-storefront/shopify';
import { useUiState, useUiNotification } from '~/composables';
import debounce from 'lodash.debounce';

export default {
  name: 'Cart',
  components: {
    SfSidebar,
    SfButton,
    SfHeading,
    SfLink,
    SfProperty,
    SfPrice,
    SfInput,
    SfCollectedProduct,
    SfImage,
    SfQuantitySelector,
    SfIcon
  },
  setup() {
    const route = useRoute();
    const isValidCoupon = ref(true);
    const errorMsg = ref("Invalid coupon code");
    const { isCartSidebarOpen, toggleCartSidebar } = useUiState();
    const { cart, removeItem, updateItemQty, loading, applyCoupon, removeCoupon } = useCart();
    const { isAuthenticated } = useUser();
    const { send: sendNotification, notifications } = useUiNotification();
    const couponcode= '';
    const products = computed(() => cartGetters.getItems(cart.value));
    const totals = computed(() => cartGetters.getTotals(cart.value));
    const lineItemsSubtotalPrice = computed(() => cartGetters.getSubTotal(cart.value));
    const totalItems = computed(() => cartGetters.getTotalItems(cart.value));
    const totalDiscount = computed(() => cartGetters.getTotalDiscount(cart.value));
    const totalSavings = computed(() => {
      let calculatedTotalSavings = 0;
      products.value.forEach((item) => {
        if (item.variant.compareAtPriceV2 !== null) {
          calculatedTotalSavings +=
            (parseFloat(item.variant.compareAtPriceV2?.amount) -
              parseFloat(item.variant.priceV2.amount)) *
            item.quantity;
        }
      });
      if (totalDiscount.value > 0 || Object.keys(totalDiscount.value).length > 0) {
        calculatedTotalSavings += totalDiscount.value.percentage ? cart.value.lineItemsSubtotalPrice.amount * totalDiscount.value.percentage/100 : parseFloat(totalDiscount.value.amount);
      }
      return calculatedTotalSavings;
    });
    const checkoutURL = computed(() => cartGetters.getcheckoutURL(cart.value));
    const appliedCoupon = computed(() => cartGetters.getCoupon(cart.value));
    const displayDiscountStr = computed(() => appliedCoupon.value ? `Discount [${appliedCoupon.value}${totalDiscount.value.percentage ? ' | ' + route?.value?.$n(totalDiscount.value.percentage/100, 'percent'): ''}]`: 'Discount');
    
    const handleApplyCoupon = async (couponCode) => {
      if(couponCode && couponCode !== ""){
        await applyCoupon({couponCode}).then(() =>{
          if(cart.value.checkoutUserErrors.length > 0){
            errorMsg.value = cart.value.checkoutUserErrors[0];
            isValidCoupon.value = false;
          }else{
            isValidCoupon.value = true;
          }
        });
      }
    }
    const handleRemoveCoupon = async (couponCode) => {
      await removeCoupon({couponCode}).then(() =>{
          errorMsg.value = "Coupon removed";
        });
    }
    const handleCheckout = (checkoutUrl) => {
      setTimeout(() => {
        window.location.href = checkoutUrl;
      }, 300)
    }
    const updateQuantity = debounce(async ({ product, quantity }) => {
      await updateItemQty({ product, quantity });
    }, 300);

    return {
      updateQuantity,
      loading,
      isAuthenticated,
      products,
      removeItem,
      handleCheckout,
      checkoutURL,
      isCartSidebarOpen,
      toggleCartSidebar,
      totals,
      lineItemsSubtotalPrice,
      totalItems,
      totalDiscount,
      totalSavings,
      cartGetters,
      sendNotification,
      notifications,
      handleApplyCoupon,
      couponcode,
      isValidCoupon,
      errorMsg,
      appliedCoupon,
      handleRemoveCoupon,
      displayDiscountStr
    };
  }
};
</script>

<style lang="scss" scoped>
#cart {
  --sidebar-z-index: 3;
  --overlay-z-index: 3;
  @include for-desktop {
    & > * {
      --sidebar-bottom-padding: var(--spacer-base);
      --sidebar-content-padding: var(--spacer-base);
    }
  }
}
.cart-summary {
  margin-top: var(--spacer-xl);
}
.my-cart {
  flex: 1;
  display: flex;
  flex-direction: column;
  &__total-items {
    margin: 0;
  }
  &__total-price {
    --price-font-size: var(--font-size--xl);
    --price-font-weight: var(--font-weight--medium);
    margin: 0 0 var(--spacer-base) 0;
  }
  &__discount {margin-bottom: 30px;}
}
.applied-discount {
  display: flex;
  align-items: center;
}
.remove-coupon {
  margin: 0 5px;
  cursor: pointer;
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
    --image-width: 16rem;
    margin: 0 0 var(--spacer-2xl) 7.5rem;
  }
  @include for-desktop {
    --heading-title-font-size: var(--font-size--xl);
    --heading-title-margin: 0 0 var(--spacer-sm) 0;
  }
}
.collected-product-list {
  flex: 1;
}
.collected-product {
  margin: 0 0 var(--spacer-sm) 0;
  &__properties {
    margin: var(--spacer-xs) 0 0 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
    flex: 2;
    &:first-child {
      margin-bottom: 8px;
    }
  }
  &__actions {
    transition: opacity 150ms ease-in-out;
  }
  &__save,
  &__compare {
    --button-padding: 0;
    &:focus {
      --cp-save-opacity: 1;
      --cp-compare-opacity: 1;
    }
  }
  &__save {
    opacity: var(--cp-save-opacity, 0);
  }
  &__compare {
    opacity: var(--cp-compare-opacity, 0);
  }
  &:hover {
    --cp-save-opacity: 1;
    --cp-compare-opacity: 1;
    @include for-desktop {
      .collected-product__properties {
        display: block;
      }
    }
  }
}
::v-deep .sf-collected-product__configuration {
  display: block;
}
.coupon-form-wrapper{
  display: flex;
  margin-bottom: 40px;
  max-height:50px; 
}
.coupon-code-input{
  flex: 0 0 60%;
  max-width: 60%;
}
.sf-apply-coupon{
  flex-grow: 1;
}
</style>