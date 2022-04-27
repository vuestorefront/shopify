<template>
  <div class='billing-addr' :address="address">
    <section>
      <p v-if="address.name">{{ address.name }}</p>
      <p v-if="address.address2 || address.company">{{ address.address2 }}<span v-if="address.address2">,</span> {{ address.company }}</p>
      <p v-if="address.formattedArea">{{ address.formattedArea }}</p>
      <p v-if="address.zip">{{ address.zip }}</p>
      <p v-if="address.phone" class="billing-phone"><a :href="`tel:${address.phone}`"><SfIcon size="18px" viewBox="0 0 18 18" icon='phone'/> {{ address.phone }}</a></p>
    </section>
  </div>
</template>

<script type="module">
import {SfIcon} from '@storefront-ui/vue';
export default {
  name: 'UserBillingAddress',
  components: {
    SfIcon
  },
  props: {
    address: {
      default: () => {},
      type: Object
    }
  }
};
</script>

<style lang="scss" scoped>
.billing-addr {
  color: var(--c-black);
  p {
    margin: 0;
    line-height: 1.43;
    &.billing-phone {
      margin-top: 20px;
      @include for-mobile {
        margin-top: 15px;
      }
      & > a {
        display: inline-flex;
        align-items: center;
        color: var(--c-black);
        .sf-icon {
          margin-right: 5px;
        }
        svg {
          path {
            transition: all 0.3s ease 0s;
          }
        }
        &:hover {
          color: var(--c-primary);
          --icon-color: var(--c-primary);
        }
      }
    }
  }
}
</style>
