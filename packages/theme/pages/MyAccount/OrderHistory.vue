<template>
  <div class="my_account_content_wrap">
    <div data-cy="order-history-tab_my-orders no-title" :class="currentOrder == null ? '' : 'no-title'">
      <div v-if="currentOrder">
          <div class='order-head-wrapper'>
            <div class="order-number">
              <SfButton data-cy="order-history-btn_orders" class="sf-button--text all-orders" @click="currentOrder = null, scrollToTop()">
                <SfIcon icon='arrow_left'/>
              </SfButton>Order #{{orderGetters.getId(currentOrder)}}
            </div>
            <SfBadge class='current-order-status'>{{ orderGetters.getStatus(currentOrder).toLowerCase() }}</SfBadge>
          </div>
          <div class="order-date-wrap">
            <p>Date &amp; Time:&nbsp;<strong>{{ orderGetters.getDate(currentOrder) }}</strong></p>
            <p v-if="orderGetters.getStatus(currentOrder) === 'FULFILLED'">
              Order Tracking:&nbsp;<strong>{{ orderGetters.getTracking(currentOrder) }}</strong>
              <span v-if="orderGetters.getTracking(currentOrder) != ' - '" class="redirect-icon">
                <SfLink target="_blank" :link="orderGetters.getTrackingUrl(currentOrder)">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.8333 13.8333H2.16667V2.16667H8V0.5H2.16667C1.24167 0.5 0.5 1.25 0.5 2.16667V13.8333C0.5 14.75 1.24167 15.5 2.16667 15.5H13.8333C14.75 15.5 15.5 14.75 15.5 13.8333V8H13.8333V13.8333ZM9.66667 0.5V2.16667H12.6583L4.46667 10.3583L5.64167 11.5333L13.8333 3.34167V6.33333H15.5V0.5H9.66667Z" fill="#000000"/>
                  </svg>
                </SfLink>
              </span>
            </p>
          </div>
      <div class="table-responsive">
        <SfTable class="ordered-products-table">
          <SfTableHeading>
            <SfTableHeader class="products__name text-left">{{ ('Product name') }}</SfTableHeader>
            <SfTableHeader class="products__name">{{ ('SKU') }}</SfTableHeader>
            <SfTableHeader class="products__name">{{ ('Price') }}</SfTableHeader>
            <SfTableHeader>{{ ('Qty') }}</SfTableHeader>
            <SfTableHeader>{{ ('Subtotal') }}</SfTableHeader>
          </SfTableHeading>
          <SfTableRow v-for="(item, i) in orderGetters.getItems(currentOrder)" :key="i">
            <SfTableData class="products__name">
              <nuxt-link class="product-img" :to="'/products/'+orderGetters.getItemSlug(item)">
                <SfImage
                :src="`${orderGetters.getItemImage(item)}?fm=webp`"
                :height="100"
                :width="100"
                :lazy="false"
                loading="lazy"
                :alt="orderGetters.getItemName(item)"
                />
              </nuxt-link>
              <nuxt-link :to="'/products/'+orderGetters.getItemSlug(item)">
                {{orderGetters.getItemName(item)}}
              </nuxt-link>
            </SfTableData>
            <SfTableData class="data-ordered-sku">
              <strong class="mobile-lable">SKU:</strong>
              {{orderGetters.getItemSku(item)}}
            </SfTableData>
            <SfTableData class="data-ordered-price">
              <strong class="mobile-lable">Price:</strong>
              {{$n(orderGetters.getItemPrice(item), 'currency')}}
            </SfTableData>
            <SfTableData class="data-ordered-quantity">
              <strong class="mobile-lable">Qty:</strong>
              {{orderGetters.getItemQty(item)}}
            </SfTableData>
            <SfTableData class="data-ordered-subtotal">
              <strong class="mobile-lable">Subtotal:</strong>
              {{$n(orderGetters.getSubtotalPrice(currentOrder), 'currency')}}
            </SfTableData>
          </SfTableRow>
        </SfTable>
      </div>
      <div class="highlighted highlighted--total">
          <SfProperty
            name="Subtotal"
            :value="$n(orderGetters.getSubtotalPrice(currentOrder), 'currency')"
            class="sf-property--full-width property"
          />
          <SfProperty
            name="Shipping"
            :value="$n(orderGetters.getShippingPrice(currentOrder), 'currency')"
            class="sf-property--full-width property"
          />
          <SfProperty
            name="Tax"
            :value="$n(orderGetters.getTaxPrice(currentOrder), 'currency')"
            class="sf-property--full-width property"
          />
          <SfProperty
            name="Grand total"
            :value="$n(orderGetters.getPrice(currentOrder), 'currency')"
            class="sf-property--full-width property order-grand-total"
          />
          <SfProperty
            name="Payment status"
            :value="orderGetters.getPaymentStatus(currentOrder)"
            class="sf-property--full-width property"
          />
        </div>
        <div class='order-info-wrapper'>
          <SfHeading title="Order Information" :level="4"/>
          <div class='order-info-cols'>
            <div class='order-info-col order-info-col-1'>
              <SfHeading title="Shipping Address" :level="5"/>
              <template v-if="orderGetters.getShippingAddress(currentOrder) != 'No shipping address available'">
                <p>{{ orderGetters.getCustomerName(currentOrder) }}</p>
                <div v-for='(addressLine, ai) in orderGetters.getShippingAddress(currentOrder)' :key="ai">{{ addressLine.value }}</div>
                <strong v-if="orderGetters.getCustomerPhone(currentOrder) != ''">{{ orderGetters.getCustomerPhone(currentOrder) }}</strong>
              </template>
              <template v-else>
                <p>No shipping information provided yet!</p>
              </template>
            </div>
            <!-- <div class='order-info-col order-info-col-2'>
              <SfHeading title="Shipping Method" :level="5"/>
              <SfAlert message="Need to check from where to retrive info using storefront API" type="secondary"/>
            </div> -->
            <div class='order-info-col order-info-col-3'>
              <SfHeading title="Billing Address" :level="5"/>
              <template v-if="orderGetters.getShippingAddress(currentOrder) != 'No shipping address available'">
                <p>{{ orderGetters.getCustomerName(currentOrder) }}</p>
                <div v-for='(addressLine, ai) in orderGetters.getShippingAddress(currentOrder)' :key="ai">{{ addressLine.value }}</div>
                <strong v-if="orderGetters.getCustomerPhone(currentOrder) != ''">{{ orderGetters.getCustomerPhone(currentOrder) }}</strong>
              </template>
              <template v-else>
                <p>No billing information provided yet!</p>
              </template>
            </div>
            <!-- <div class='order-info-col order-info-col-4'>
              <SfHeading title="Payment Method" :level="5"/>
              <SfAlert message="Need to check from where to retrive info using storefront API" type="secondary"/>
            </div> -->
          </div>
        </div>
      </div>
      <div v-else>
        <div class="my_accoutn_title_wrap">
          <SfHeading
            class="my_accoutn_title"
            :level="1"
            :title="title"
          />
        </div>
        <SfLoader v-if="loading" class="order-loader" :class="{ loading }" :loading="loading">
          <div />
        </SfLoader>
        <div v-if="!loading && orders && orders.data && orders.data.length === 0" class="no-orders my_account_content container-small">
          <p class="no-orders__title">{{ ('Currently you don\'t have any orders.') }}</p>
          <div class="my-account-bottom-action-wrap">
            <div class="form__button_wrap">
                <SfButton data-cy="order-history-btn_start" :link="localePath('/c/accessories')" class="no-orders__button form__button">Start shopping</SfButton>
            </div>
          </div>
        </div>
        <div v-else-if="!loading" class="table-responsive">
          <SfTable class="orders-list-table">
            <SfTableHeading>
              <SfTableHeader
                v-for="tableHeader in tableHeaders"
                :key="tableHeader"
                >{{ tableHeader }}</SfTableHeader>
            </SfTableHeading>
            <SfTableRow v-for="order in orders.data" :key="orderGetters.getId(order)">
              <SfTableData class="data-order-no">
                <strong class="mobile-lable">Order no</strong>
                <SfButton data-cy="order-history-btn_view" class="sf-button--text" @click="currentOrder = order">
                  #{{ orderGetters.getId(order) }}
                </SfButton>
              </SfTableData>
              <SfTableData class="data-order-date">
                <strong class="mobile-lable">Date and Time</strong>
                {{ orderGetters.getDate(order) }}
              </SfTableData>
              <SfTableData v-if="orderGetters.getStatus(order) === 'FULFILLED'" class="data-order-tracking">
                <strong class="mobile-lable">Tracking Number</strong>
                <span class="order-track-wrap">
                  {{ orderGetters.getTracking(order) }}
                  <span v-if="orderGetters.getTracking(order) != ' - '">
                    <SfLink target="_blank" :link="orderGetters.getTrackingUrl(order)">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.8333 13.8333H2.16667V2.16667H8V0.5H2.16667C1.24167 0.5 0.5 1.25 0.5 2.16667V13.8333C0.5 14.75 1.24167 15.5 2.16667 15.5H13.8333C14.75 15.5 15.5 14.75 15.5 13.8333V8H13.8333V13.8333ZM9.66667 0.5V2.16667H12.6583L4.46667 10.3583L5.64167 11.5333L13.8333 3.34167V6.33333H15.5V0.5H9.66667Z" fill="#666666"/>
                      </svg>
                    </SfLink>
                  </span>
                </span>
              </SfTableData>
              <SfTableData v-else class="data-order-tracking"><strong class="mobile-lable">Tracking Number</strong> - </SfTableData>
              <SfTableData class="data-order-name">
                <strong class="mobile-lable">Name</strong>
                {{ orderGetters.getCustomerName(order) }}
              </SfTableData>
              <SfTableData class="data-order-price">
                <strong class="mobile-lable">Price</strong>
                {{ $n(orderGetters.getPrice(order), 'currency') }}
              </SfTableData>
              <SfTableData class="data-order-status">
                <strong class="mobile-lable">Status</strong>
                <span :class="getStatusTextClass(order)">{{ orderGetters.getStatus(order).toLowerCase() }}</span>
              </SfTableData>
              <!-- <SfTableData>
                <SfIcon
                icon="more"
                />
              </SfTableData> -->
              <SfTableData class="orders__view orders__element--right">
                <!-- <SfButton data-cy="order-history-btn_download" class="sf-button--text smartphone-only" @click="downloadOrder(order)">
                  Download
                </SfButton> -->
                <SfButton data-cy="order-history-btn_view" class="sf-button--text" @click="currentOrder = order, scrollToTop()">
                  <SfIcon>
                    <template v-bind="{ viewBox, iconPaths, icon }">
                      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#666666">
                        <path d="M0 0h24v24H0V0z" fill="none"/>
                        <path d="M12 6c3.79 0 7.17 2.13 8.82 5.5C19.17 14.87 15.79 17 12 17s-7.17-2.13-8.82-5.5C4.83 8.13 8.21 6 12 6m0-2C7 4 2.73 7.11 1 11.5 2.73 15.89 7 19 12 19s9.27-3.11 11-7.5C21.27 7.11 17 4 12 4zm0 5c1.38 0 2.5 1.12 2.5 2.5S13.38 14 12 14s-2.5-1.12-2.5-2.5S10.62 9 12 9m0-2c-2.48 0-4.5 2.02-4.5 4.5S9.52 16 12 16s4.5-2.02 4.5-4.5S14.48 7 12 7z"/>
                      </svg>
                    </template>
                  </SfIcon>
                  <strong class="mobile-lable">View Order</strong>
                </SfButton>
              </SfTableData>
            </SfTableRow>
          </SfTable>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="module">
import {
  SfTable,
  SfButton,
  SfProperty,
  SfLink,
  SfIcon,
  SfImage,
  SfHeading,
  SfBadge,
  SfLoader
} from '@storefront-ui/vue';
import { computed, ref } from '@nuxtjs/composition-api';
import { useUserOrders, orderGetters } from '@vue-storefront/shopify';
import { AgnosticOrderStatus , onSSR } from '@vue-storefront/core';

export default {
  name: 'PersonalDetails',
  components: {
    SfTable,
    SfButton,
    SfProperty,
    SfLink,
    SfIcon,
    SfImage,
    SfHeading,
    SfBadge,
    SfLoader
  },
  props: {
    title: {
      type: String,
      default: 'My Orders'
    }
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup() {
    const { orders, search, loading } = useUserOrders();
    const currentOrder = ref(null);
    onSSR(async () => {
      await search();
    });

    const tableHeaders = [
      'Order ID',
      'Date and Time',
      'Tracking Number',
      'Name',
      'Price',
      'Status',
      ''
    ];

    const getStatusTextClass = (order) => {
      const status = orderGetters.getStatus(order);
      switch (status) {
        case AgnosticOrderStatus.Open:
          return 'text-warning';
        case AgnosticOrderStatus.Complete:
          return 'text-success';
        default:
          return '';
      }
    };

    const downloadFile = (file, name) => {
      const a = document.createElement('a');
      document.body.appendChild(a);
      a.style = 'display: none';

      const url = window.URL.createObjectURL(file);
      a.href = url;
      a.download = name;
      a.click();
      window.URL.revokeObjectURL(url);
    };

    const downloadOrders = async () => {
      await downloadFile(new Blob([JSON.stringify(orders.value)], {type: 'application/json'}), 'orders.json');
    };

    const downloadOrder = async (order) => {
      await downloadFile(new Blob([JSON.stringify(order)], {type: 'application/json'}), 'order ' + orderGetters.getId(order) + '.json');
    };

    return {
      tableHeaders,
      orders: computed(() => orders ? orders.value : []),
      getStatusTextClass,
      orderGetters,
      downloadOrder,
      downloadOrders,
      currentOrder,
      loading
    };
  }
};
</script>

<style lang='scss'>
.orders-list-table {
  .mobile-lable {
    display: none;
  }
  @media (max-width: 767px) {
    thead {
      display: none;
    }
    .sf-table__data {
      background-color: transparent;
      display: none;
      padding: 20px 0 0;
      &.data-order-name,
      &.data-order-tracking,
      &.data-order-no,
      &.data-order-date,
      &.data-order-price,
      &.data-order-status,
      &.orders__element--right {
        display: block;
        text-align: left;
        .mobile-lable {
          min-width: 125px;
          display: inline-block;
          font-weight: 500;
          color: var(--c-black);
        }
      }
      &.orders__element--right {
        padding-bottom: 20px;
        .sf-button {
          border: 1px solid var(--_c-gray-666666);
          border-radius: 4px;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          padding: 11px 10px;
          svg {
            height: 24px;
          }
          &:hover {
            border-color: var(--c-primary);
            .mobile-lable {
              color: var(--c-primary);
            }
          }
          .mobile-lable {
            color: var(--_c-gray-666666);
            min-width: auto;
            transition: all 0.3s ease 0s;
          }
        }
        .sf-icon {
          margin-right: 10px;
        }
      }
    }
    tbody {
      .data-order-no {
        border-top: 1px solid var(--_c-gray-DDDDDD);
      }
      &:nth-child(2) {
        .data-order-no {
          border-top: 0 none;
          padding-top: 0;
        }
      }
      &:nth-child(2n+1) {
        .sf-table__data {
          background-color: transparent;
        }
      }
      &:last-child {
        .orders__element--right {
          padding-bottom: 0;
        }
      }
    }
  }
}
.sf-table__heading, .sf-table__row {
  display: table-row;
  padding: 0;
  border: 0 none;
}
.sf-table__data, .sf-table__header {
  text-align: center;
  font-size: 14px;
  line-height: 1.5;
  font-weight: 400;
  color: var(--c-black);
  flex: 0 0 auto;
  display: table-cell;
  padding: 20px 20px;
  @include for-mobile {
    font-size: 13px;
  }
  .sf-button {
    font-size: 14px;
    color: var(--_c-gray-666666);
    text-decoration: none;
    font-weight: 400;
    transition: all 0.3s ease 0s;
    @include for-mobile {
      font-size: 13px;
    }
    &:hover {
      color: var(--c-primary);
    }
  }
}
.sf-table__header {
  font-weight: 500;
  color: var(--c-black);
  padding-top: 0;
}
.sf-table__data {
  background-color: var(--_c-gray-FBFBFB);
  &.data-order-status {
    text-transform: capitalize;
  }
}
tbody {
  &:nth-child(2n+1) {
    .sf-table__data {
      background-color: var(--_c-gray-EEEEEE);
    }
  }
}
.sf-table__row:hover {
  --table-row-box-shadow: none;
}
.order-track-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 767px) {
    display: inline-flex;
  }
  span {
    margin-left: 10px;
    font-size: 0;
    a {
      line-height: 1;
      svg {
        path {
          transition: all 0.3s ease 0s;
        }
      }
      &:hover {
        svg {
          path {
            fill: var(--c-primary);
          }
        }
      }
    }
  }
}
.orders__element--right {
  .sf-button {
    color: var(--_c-gray-666666);
    transition: all 0.3s ease 0s;
    &:hover {
      color: var(--c-primary);
      svg {
        fill: var(--c-primary);
      }
    }
    svg {
      transition: all 0.3s ease 0s;
    }
  }
}
.order-head-wrapper {
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  @include for-mobile {
    margin-bottom: 10px;
  }
  @media (max-width: 767px) {
    justify-content: space-between;
  }
  .order-number {
    font-weight: 600;
    font-size: 18px;
    line-height: 1.5;
    color: var(--c-black);
    margin-right: 20px;
    display: flex;
    align-items: center;
    @include for-mobile {
      font-size: 14px;
      margin-right: 10px;
    }
    .sf-button {
      margin-right: 20px;
      @include for-mobile {
        margin-right: 10px;
      }
      .sf-icon {
        @include for-mobile {
          width: 20px;
          height: auto;
        }
      }
    }
  }
  .current-order-status {
    font-size: 12px;
    line-height: 1.5;
    color: var(--c-black);
    font-weight: 400;
    border: 1px solid var(--c-black);
    border-radius: 30px;
    background: transparent;
    padding: 6px 15px 5px 15px;
    text-align: center;
    text-transform: capitalize;
  }
}
.order-date-wrap {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0;
  padding-bottom: 20px;
  padding-left: 46px;
  border-bottom: 1px solid var(--_c-gray-DDDDDD);
  @include for-mobile {
    padding-left: 30px;
  }
  @media (max-width: 767px) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
  p {
    margin: 0;
    font-size: 16px;
    font-weight: 400;
    color: var(--_c-gray-666666);
    line-height: 1.1875;
    display: flex;
    align-items: center;
    @include for-mobile {
      font-size: 12px;
    }
    @media (max-width: 767px) {
      &:first-child {
        margin-bottom: 5px;
      }
    }
    strong {
      font-weight: 400;
      color: var(--c-black);
    }
  }
}
.redirect-icon {
  font-size: 0;
  margin-left: 10px;
  a {
    line-height: 1;
    svg {
      path {
        transition: all 0.3s ease 0s;
      }
    }
    &:hover {
      svg {
        path {
          fill: var(--c-primary);
        }
      }
    }
  }
}
.ordered-products-table {
  .mobile-lable {
    display: none;
  }
  @media (max-width: 767px) {
    thead {
      display: none;
    }
    .mobile-lable {
      display: inline-block;
      min-width: 100px;
      color: var(--c-black);
    }
    .sf-table__data {
      display: block;
      &.data-ordered-sku,
      &.data-ordered-price,
      &.data-ordered-quantity,
      &.data-ordered-subtotal {
        padding-left: 105px;
        text-align: left !important;
      }
    }
  }
  .sf-table__heading {
    .sf-table__header {
      border-bottom: 1px solid var(--_c-gray-DDDDDD);
      &.text-left {
        text-align: left;
      }
    }
  }
  .sf-table__data {
    background-color: transparent;
  }
  tbody {
    &:nth-child(2n+1) {
      .sf-table__data {
        background-color: transparent;
      }
    }
    & + tbody {
      .sf-table__data {
        border-top: 1px solid var(--_c-gray-DDDDDD);
        @media (max-width: 767px) {
          border-top: 0 none;
          &.products__name {
            border-top: 1px solid var(--_c-gray-DDDDDD);
          }
        }
      }
    }
  }
  .sf-table__data, .sf-table__header {
    padding: 20px 5px;
    @media (max-width: 767px) {
      padding: 5px 5px;
    }
    &:last-child {
      text-align: right;
    }
  }
  .sf-table__data {
    &.products__name {
      display: flex;
      align-items: center;
      @media (max-width: 767px) {
        padding-bottom: 5px;
        padding-top: 20px;
      }
      a {
        &.product-img {
          flex: 0 0 120px;
          max-width: 120px;
          height: 100px;
          @media (max-width: 767px) {
            flex: 0 0 100px;
            max-width: 100px;
            height: 80px;
          }
        }
        color: var(--c-black);
        text-align: left;
        @media (max-width: 767px) {
          align-items: flex-start;
        }
        &:hover {
          color: var(--c-primary);
        }
        .sf-image {
          border: 1px solid var(--_c-gray-E5E5E5);
          border-radius: 4px;
          margin-right: 20px;
          @media (max-width: 767px) {
            width: 80px;
          }
          img {
            left: 50%;
            transform: translate3d(-50%, -50%, 0);
          }
        }
      }
    }
    &.data-ordered-subtotal {
      @media (max-width: 767px) {
        padding-bottom: 20px;
      }
    }
    &:last-child {
      font-weight: 600;
    }
  }
  tbody {
    &:last-child {
      .sf-table__data {
        border-bottom: 1px solid var(--_c-gray-DDDDDD);
        @media (max-width: 767px) {
          border-bottom: 0 none;
        }
      }
    }
  }
}
.highlighted--total {
  max-width: 180px;
  margin-left: auto;
  margin-top: 30px;
  @media (max-width: 767px) {
    margin-left: 0;
    margin-top: 0;
    max-width: 100%;
    padding: 10px 20px;
    background-color: var(--_c-gray-F5F5F5);
    border-top: 1px solid var(--_c-gray-DDDDDD);
    border-bottom: 1px solid var(--_c-gray-DDDDDD);
  }
  .sf-property {
    @media (max-width: 767px) {
      justify-content: flex-start;
    }
    & + .sf-property {
      margin-top: 20px;
      @media (max-width: 767px) {
        margin-top: 10px;
      }
    }
    &.order-grand-total {
      .sf-property__name,
      .sf-property__value {
        @media (max-width: 767px) {
          font-weight: 600;
        }
      }
    }
  }
  .sf-property__name,
  .sf-property__value {
    font-size: 14px;
    font-weight: 400;
    line-height: 1.5;
    color: var(--_c-gray-666666);
    @include for-mobile {
      font-size: 13px;
    }
    @media (max-width: 767px) {
      color: var(--c-black);
    }
  }
  .sf-property__name {
    @media (max-width: 767px) {
      flex: 0 0 120px;
      max-width: 120px;
    }
  }
  .sf-property__value {
    font-weight: 600;
    color: var(--c-black);
    @media (max-width: 767px) {
      font-weight: 400;
    }
  }
}
.order-info-wrapper {
  padding-top: 80px;
  @include for-mobile {
    padding-top: 40px;
  }
  .sf-heading {
    @include for-mobile {
      padding: 0;
    }
  }
  .sf-heading__title {
    color: var(--c-black);
    line-height: 1;
    text-align: left;
    font-weight: 600;
    &.h4 {
      font-size: 20px;
      margin-bottom: 30px;
      padding-bottom: 20px;
      border-bottom: 1px solid var(--_c-gray-DDDDDD);
      @include for-mobile {
        font-size: 16px;
        margin-bottom: 20px;
        padding-bottom: 10px;
      }
    }
  }
  .order-info-cols {
    display: flex;
    flex-wrap: wrap;
    .order-info-col {
      flex: 0 0 46%;
      max-width: 46%;
      font-size: 14px;
      font-weight: 400;
      line-height: 1.5;
      color: var(--_c-gray-444444);
      text-align: left;
      @include for-mobile {
        font-size: 13px;
      }
      @media (max-width: 767px) {
        flex: 0 0 100%;
        max-width: 100%;
      }
      & + .order-info-col {
        margin-left: 8%;
        @media (max-width: 767px) {
          margin-left: 0;
          margin-top: 30px;
        }
      }
      .sf-heading__title {
        &.h5 {
          margin-bottom: 12px;
          font-size: 16px;
          @include for-mobile {
            font-size: 14px;
          }
        }
      }
      .sf-alert {
        @include for-mobile {
          font-size: 13px;
        }
      }
    }
  }
}
.no-orders {
  .my-account-bottom-action-wrap {
    margin-top: 30px;
  }
}
.order-loader {
  margin: 100px 0;
}

</style>
