<template>
  <div class="my_account_content container-small">
    <ValidationObserver v-slot="{ handleSubmit }">
      <form
        id="billing-details-form"
        class="form"
        @submit.prevent="handleSubmit(submitForm)"
      >
        <div class="row">
          <ValidationProvider
            v-slot="{ errors }"
            rules="required|min:2"
            tag="div"
            class="col-6"
          >
            <SfInput
              v-model="form.firstName"
              data-cy="billing-details-input_firstName"
              name="firstName"
              label="First Name"
              :valid="!errors[0]"
              :error-message="errors[0]"
              class="form__element"
            />
          </ValidationProvider>
          <ValidationProvider
            v-slot="{ errors }"
            rules="required|min:2"
            tag="div"
            class="col-6"
          >
            <SfInput
              v-model="form.lastName"
              data-cy="billing-details-input_lastName"
              name="lastName"
              label="Last Name"
              :valid="!errors[0]"
              :error-message="errors[0]"
              class="form__element"
            />
          </ValidationProvider>
        </div>
        <div class="row">
          <ValidationProvider
            v-slot="{ errors }"
            rules="required|min:5"
            tag="div"
            class="col-6"
          >
            <SfInput
              v-model="form.streetName"
              data-cy="billing-details-input_streetName"
              name="streetName"
              label="Street Name"
              :valid="!errors[0]"
              :error-message="errors[0]"
              class="form__element"
            />
          </ValidationProvider>
          <ValidationProvider
            v-slot="{ errors }"
            rules="required|min:1"
            tag="div"
            class="col-6"
          >
            <SfInput
              v-model="form.apartment"
              data-cy="billing-details-input_apartment"
              name="apartment"
              label="House/Apartment number"
              :valid="!errors[0]"
              :error-message="errors[0]"
              class="form__element"
            />
          </ValidationProvider>
        </div>
        <div class="row">
          <ValidationProvider
            v-slot="{ errors }"
            rules="required|min:2"
            tag="div"
            class="col-6"
          >
            <SfInput
              v-model="form.city"
              data-cy="billing-details-input_city"
              name="city"
              label="City"
              :valid="!errors[0]"
              :error-message="errors[0]"
              class="form__element"
            />
          </ValidationProvider>
          <ValidationProvider
            v-slot="{ errors }"
            :rules="`required|oneOf:${allContries.map(c => c.name).join(',')}`"
            class="col-6"
          >
            <SfSelect
              v-model="form.country"
              data-cy="billing-details-country_state"
              class="form__select sf-select--underlined form__element"
              name="country"
              label="Country"
              :valid="!errors[0]"
              :error-message="errors[0]"
              @input="getStateFromCountry(form.country)"
            >
              <SfSelectOption
                v-for="{ name, index } in allContries"
                :key="index"
                :value="name"
              >
                {{ name }}
              </SfSelectOption>
            </SfSelect>
          </ValidationProvider>
          <ValidationProvider
            v-if="states.length > 0"
            v-slot="{ errors }"
            class="col-12"
          >
            <SfSelect
              v-model="form.state"
              data-cy="billing-details-input_state"
              class="form__select sf-select--underlined form__element"
              name="state"
              label="State/Province"
              :valid="!errors[0]"
              :error-message="errors[0]"
              :selected="form.state"
            >
              <SfSelectOption
                v-for="(name, index) in states"
                :key="index"
                :value="name"
              >
                {{ name }}
              </SfSelectOption>
            </SfSelect>
          </ValidationProvider>
        </div>
        <div class="row">
          <ValidationProvider
            v-slot="{ errors }"
            rules="required|min:4"
            tag="div"
            class="col-6"
          >
            <SfInput
              v-model="form.postalCode"
              data-cy="billing-details-input_zipCode"
              name="zipCode"
              label="Zipcode"
              :valid="!errors[0]"
              :error-message="errors[0]"
              class="form__element"
            />
          </ValidationProvider>
          <ValidationProvider
            tag="div"
            class="col-6"
          >
          <SfInput
              v-model="form.company"
              data-cy="billing-details-input_company"
              name="company"
              label="Company"
              tag="div"
              class="form__element"
            />
          </ValidationProvider>
          <ValidationProvider
            v-slot="{ errors }"
            rules="required|min:8|max:15|regex:^(\+?\d[0-9]+)$"
            tag="div"
            class="col-12"
          >
            <SfInput
              v-model="form.phone"
              data-cy="billing-details-input_phoneNumber"
              name="phone"
              label="Phone number"
              :valid="!errors[0]"
              :error-message="errors[0]"
              class="form__element"
            />
          </ValidationProvider>
        </div>
        <!-- <div class="action-wrap">
          <SfCheckbox
            data-cy="billing-details-checkbox_isDefault"
            v-model="form.isDefault"
            name="isDefault"
            label="Set as default"
            class="form__checkbox-isDefault"
          />
        </div> -->
        <div class="my-account-bottom-action-wrap">
          <div class="form__button_wrap">
            <SfButton data-cy="billing-details-btn_update" type="submit" class="form__button" @click.native="scrollToTop()">
              {{ isNew ? "Add To My Address Book" : "Update My Address Book" }}
            </SfButton>
          </div>
          <div class="form__button_wrap">
            <SfButton data-cy="billing-details-btn_cancel" class="form__button" @click="$parent.edittingAddress = false, scrollToTop()">Cancel</SfButton>
          </div>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script type="module">
import {
  SfInput,
  SfButton,
  SfSelect,
  SfCheckbox
} from '@storefront-ui/vue';
import { required, min, oneOf, regex, max } from 'vee-validate/dist/rules';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { ref } from '@nuxtjs/composition-api';
import countryState from '~/static/country-state';

extend('required', {
  ...required,
  message: 'This field is required'
});

extend('min', {
  ...min,
  message: 'The field should have at least {length} characters'
});

extend('max', {
  ...max,
  message: 'The field should have maximum {length} characters'
});

extend('oneOf', {
  ...oneOf,
  message: 'Invalid country'
});

extend('regex', {
  ...regex,
  message: 'Invalid phone number'
});

export default {
  name: 'BillingAddressForm',

  components: {
    SfInput,
    SfButton,
    SfSelect,
    SfCheckbox,
    ValidationProvider,
    ValidationObserver
  },

  props: {
    address: {
      type: Object,
      // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
      default: () => ({
        id: Math.random().toString().substr(2),
        firstName: '',
        lastName: '',
        streetName: '',
        apartment: '',
        city: '',
        state: '',
        postalCode: '',
        country: 'United States',
        phone: '',
        company: '',
        isDefault: false
      })
    },
    isNew: {
      type: Boolean,
      required: true
    }
  },

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup(props, { emit }) {
    const allContries = ref([]);
    (countryState.countries).map(item => {
      allContries.value.push({
        name: item.country
      });
    });

    const form = ref({
      id: props.address.id,
      firstName: props.address.firstName,
      lastName: props.address.lastName,
      streetName: props.address.address1,
      apartment: props.address.address2,
      city: props.address.city,
      state: props.address.state,
      postalCode: props.address.zip,
      country: props.address.country,
      company: props.address.company,
      phone: props.address.phone,
      isDefault: props.address.isDefault
    });

    const submitForm = () => {
      emit('submit', {
        form,
        onComplete: () => {},
        onError: () => {}
      });
    };

    return {
      form,
      submitForm,
      allContries
    };
  },
  data() {
    return {
      states: [],
      defaultCountry: 'United States'
    };
  },
  mounted() {
    this.getStateFromCountry(this.address.country);
  },
  methods: {
    getStateFromCountry(country) {
      const allStates = (countryState.countries).find(item => item.country === country);
      this.states = allStates ? allStates.states : [];
      this.form.state = this.states[0];
    }
  }
};
</script>
