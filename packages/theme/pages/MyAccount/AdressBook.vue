<template>
  <div class="my_account_content_wrap">
    <div class="my_accoutn_title_wrap">
      <SfHeading
        class="my_accoutn_title"
        :level="1"
        :title="title"
      />
    </div>
    <div
      v-if="edittingAddress"
      class="tab-orphan"
    >
      <div
        data-cy="billing-details-tab_change">
        <BillingAddressForm
          :address="activeAddress"
          :is-new="isNewAddress"
          @submit="saveAddress" />
      </div>
    </div>
    <div
      v-else
      class="tab-orphan">
      <transition name="sf-collapse-top" mode="out-in">
        <div class="notifications">
          <SfNotification
            v-if="!loading"
            :visible="visible"
            title="Are you sure?"
            message="Are you sure you would like to remove this address from your account?"
            type="secondary"
          >
          <template #action>
            <div class="button-wrap">
              <SfButton @click="handleRemove(addressToRemove)">Yes</SfButton>
              <SfButton @click="visible = false">Cancel</SfButton>
            </div>
          </template>
          <template #close>
            <div />
          </template>
        </SfNotification>
        </div>
      </transition>
      <SfLoader v-if="loading" class="address-loader" :class="{ loading }" :loading="loading">
        <div />
      </SfLoader>
      <div v-if="!loading" data-cy="billing-details-tab_details">
        <div class="billing-list">
          <div
            v-for="address in addresses"
            :key="userBillingGetters.getId(address)"
            class="billing">
            <div class="billing__wrap">
              <div class="billing__content">
                <div class="billing__address">
                  <UserBillingAddress :address="address" />
                </div>
              </div>
              <div class="billing__actions">
                <SfButton
                  data-cy="billing-details-btn_change"
                  class=" sf-button--text"
                  @click="changeAddress(address), scrollToTop()">
                  Edit
                </SfButton>
                <SfButton
                  data-cy="billing-details-btn_delete"
                  class="billing__button-delete sf-button--text"
                  @click="ConfirmRemove(address)">
                  Delete
                </SfButton>
              </div>
            </div>
          </div>
          <div class="billing add-address-btn">
            <div class="billing__wrap" @click="changeAddress(), scrollToTop()">
              <SfButton
                data-cy="billing-details-btn_add"
                class="action-button sf-button--text">
                <SfIcon icon="plus" />
                Add Address
              </SfButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  SfButton,
  SfIcon,
  SfHeading,
  SfLoader,
  SfNotification
} from '@storefront-ui/vue';
import BillingAddressForm from '~/components/MyAccount/BillingAddressForm';
import UserBillingAddress from '~/components/UserBillingAddress';
import { useUserBilling, userBillingGetters } from '@vue-storefront/shopify';
import { ref, computed } from '@nuxtjs/composition-api';
import { onSSR } from '@vue-storefront/core';
import useUiNotification from '~/composables/useUiNotification';

export default {
  name: 'AdressBook',
  components: {
    SfButton,
    SfIcon,
    SfHeading,
    SfLoader,
    SfNotification,
    UserBillingAddress,
    BillingAddressForm
  },
  props: {
    title: {
      type: String,
      default: 'Address Book'
    }
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup() {
    const { billing, load: loadUserBilling, addAddress, deleteAddress, updateAddress, loading } = useUserBilling();
    const addresses = computed(() => userBillingGetters.getAddresses(billing.value));
    const edittingAddress = ref(false);
    const activeAddress = ref(undefined);
    const isNewAddress = computed(() => !activeAddress.value);
    const { send: sendNotification} = useUiNotification();

    const changeAddress = (address = undefined) => {
      activeAddress.value = address;
      edittingAddress.value = true;
    };

    const removeAddress = async(address) => await deleteAddress({ address }).then(() => {
      if (billing.value) {
        loadUserBilling();
        sendNotification({
          key: 'address_removed',
          message: 'Address has been removed successfully',
          type: 'success',
          title: 'Address removed!',
          icon: 'check'
        });
      } else {
        sendNotification({
          key: 'address_removed',
          message: 'Something went wrong, please retry',
          type: 'danger',
          title: 'Remove address failed!'
        });
      }
    });

    const saveAddress = async ({ form, onComplete, onError }) => {
      try {
        const actionMethod = isNewAddress.value ? addAddress : updateAddress;
        let notificationMsg = 'Addressbook updated successfully';
        if (isNewAddress.value) {
          notificationMsg = 'Address added successfully';
        }
        const data = await actionMethod({ address: form.value }).then(() => {
          if (billing.value) {
            loadUserBilling();
            sendNotification({
              key: 'address_success',
              message: notificationMsg,
              type: 'success',
              title: 'Success!',
              icon: 'check'
            });
          } else {
            sendNotification({
              key: 'address_failed',
              message: 'Somethig went wrong, please retry',
              type: 'danger',
              title: 'Failed!'
            });
          }
        });
        edittingAddress.value = false;
        activeAddress.value = undefined;
        await onComplete(data);
      } catch (error) {
        onError(error);
      }
    };

    onSSR(async () => {
      await loadUserBilling();
    });

    return {
      changeAddress,
      updateAddress,
      removeAddress,
      saveAddress,
      userBillingGetters,
      addresses,
      edittingAddress,
      activeAddress,
      isNewAddress,
      loading
    };
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  data () {
    return {
      visible: false,
      addressToRemove: {}
    };
  },
  methods: {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    ConfirmRemove(address) {
      this.visible = true;
      this.addressToRemove = address;
    },
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    async handleRemove(address) {
      this.isLoadervisible = true;
      await this.removeAddress(address).then(()=>{
        this.visible = false;
      });
    }
  }
};
</script>

<style lang='scss' scoped>
.billing-list {
  display: flex;
  flex-wrap: wrap;
  margin-left: -10px;
  margin-right: -10px;
  .billing {
    padding-left: 10px;
    padding-right: 10px;
    flex: 0 0 50%;
    max-width: 50%;
    min-height: 180px;
    @media (max-width: 767px) {
      flex: 0 0 100%;
      max-width: 100%;
    }
    &:nth-child(n+3) {
      margin-top: 20px;
      @media (max-width: 767px) {
        margin-top: 0;
      }
    }
    & + .billing {
      @media (max-width: 767px) {
        margin-top: 20px;
      }
    }
    .billing__wrap {
      border: 1px solid var(--_c-gray-DDDDDD);
      border-radius: 6px;
      padding: 20px 15px 15px 20px;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    &.add-address-btn {
      .billing__wrap {
        padding: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        &:hover {
          .sf-button {
            color: var(--c-primary);
            --icon-color: var(--c-primary);
          }
        }
      }
      .sf-button {
        color: var(--c-black);
        --icon-color: var(--c-black);
        text-decoration: none;
        display: flex;
        align-items: center;
        font-weight: 400;
        transition: all 0.3s ease 0s;
        &:hover {
          color: var(--c-primary);
          --icon-color: var(--c-primary);
        }
        .sf-icon {
          width: 21px;
          height: 21px;
          margin-right: 10px;
          svg {
            path {
              transition: all 0.3s ease 0s;
            }
          }
        }
      }
    }
  }
}
.billing__actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 28px;
  @include for-mobile {
    margin-top: 10px;
  }
  .sf-button {
    color: var(--c-primary);
    font-size: 12px;
    transition: all 0.3s ease 0s;
    & + .sf-button {
      border-left: 1px solid var(--_c-gray-888888);
      margin-left: 10px;
      padding-left: 10px;
    }
    &:hover {
      color: var(--_c-black-171717);
    }
  }
}
.address-loader {
  margin: 100px 0;
}
</style>
