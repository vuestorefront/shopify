<template>
  <div>
    <SfAddressPicker
      :selected="String(currentAddressId)"
      class="shipping-addresses"
      @input="setCurrentAddress($event)"
    >
      <SfAddress
        v-for="shippingAddress in shippingAddresses"
        :key="userShippingGetters.getId(shippingAddress)"
        class="shipping-addresses__address"
        :name="String(userShippingGetters.getId(shippingAddress))"
      >
        <span
          >{{ userShippingGetters.getFirstName(shippingAddress) }} {{ userShippingGetters.getLastName(shippingAddress) }}</span
        >
        <span
          >{{ userShippingGetters.getStreetName(shippingAddress) }}
          {{ userShippingGetters.getApartmentNumber(shippingAddress) }}</span
        >
        <span>{{ userShippingGetters.getPostCode(shippingAddress) }}</span>
        <span
          >{{ userShippingGetters.getCity(shippingAddress)
          }}{{ userShippingGetters.getProvince(shippingAddress) ? `, ${userShippingGetters.getProvince(shippingAddress)}` : '' }}</span
        >
        <span>{{ userShippingGetters.getCountry(shippingAddress)}}</span>
        <span>{{ userShippingGetters.getPhone(shippingAddress) }}</span>
      </SfAddress>
    </SfAddressPicker>
    <SfCheckbox
      data-cy="shipping-details-checkbox_isDefault"
      :selected="setAsDefault"
      name="setAsDefault"
      label="Use this address as my default one."
      class="shipping-address-setAsDefault"
      @change="$emit('changeSetAsDefault', $event)"
    />
  </div>
</template>

<script type="module">
import {
  SfCheckbox,
  SfAddressPicker
} from '@storefront-ui/vue';
import { userShippingGetters } from '@vue-storefront/shopify';

export default {
  name: 'UserShippingAddresses',
  components: {
    SfCheckbox,
    SfAddressPicker
  },
  props: {
    currentAddressId: {
      type: Number,
      required: true
    },
    setAsDefault: {
      type: Boolean,
      required: true
    },
    shippingAddresses: {
      type: Array,
      required: true
    }
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup (_, { emit }) {
    const setCurrentAddress = $event => emit('setCurrentAddress', $event);

    return {
      setCurrentAddress,
      userShippingGetters
    };
  }
};
</script>

<style lang="scss">
.shipping-addresses {
  @include for-desktop {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 10px;
  }
  margin-bottom: var(--spacer-xl);
  &__address {
    margin-bottom: var(--spacer-sm);
  }
}

.shipping-address-setAsDefault, .form__action-button--margin-bottom {
  margin-bottom: var(--spacer-xl);
}
</style>
