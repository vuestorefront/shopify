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
            rules="required|min:2"
            v-slot="{ errors }"
            tag="div"
            class="col-6"
          >
            <SfInput
              data-cy="billing-details-input_firstName"
              v-model="form.firstName"
              name="firstName"
              label="First Name"
              :valid="!errors[0]"
              :errorMessage="errors[0]"
              class="form__element"
            />
          </ValidationProvider>
          <ValidationProvider
            rules="required|min:2"
            v-slot="{ errors }"
            tag="div"
            class="col-6"
          >
            <SfInput
              data-cy="billing-details-input_lastName"
              v-model="form.lastName"
              name="lastName"
              label="Last Name"
              :valid="!errors[0]"
              :errorMessage="errors[0]"
              class="form__element"
            />
          </ValidationProvider>
        </div>
        <div class="row">
          <ValidationProvider
            rules="required|min:5"
            v-slot="{ errors }"
            tag="div"
            class="col-6"
          >
            <SfInput
              data-cy="billing-details-input_streetName"
              v-model="form.streetName"
              name="streetName"
              label="Street Name"
              :valid="!errors[0]"
              :errorMessage="errors[0]"
              class="form__element"
            />
          </ValidationProvider>
          <ValidationProvider
            rules="required|min:1"
            v-slot="{ errors }"
            tag="div"
            class="col-6"
          >
            <SfInput
              data-cy="billing-details-input_apartment"
              v-model="form.apartment"
              name="apartment"
              label="House/Apartment number"
              :valid="!errors[0]"
              :errorMessage="errors[0]"
              class="form__element"
            />
          </ValidationProvider>
        </div>
        <div class="row">
          <ValidationProvider
            rules="required|min:2"
            v-slot="{ errors }"
            tag="div"
            class="col-6"
          >
            <SfInput
              data-cy="billing-details-input_city"
              v-model="form.city"
              name="city"
              label="City"
              :valid="!errors[0]"
              :errorMessage="errors[0]"
              class="form__element"
            />
          </ValidationProvider>
          <ValidationProvider
            :rules="`required|oneOf:${provience.map(c => c.name).join(',')}`"
            v-slot="{ errors }"
            class="col-6"
          >
            <SfSelect
              data-cy="billing-details-input_state"
              class="form__select sf-select--underlined form__element"
              v-model="form.state"
              name="state"
              label="State/Province"
              :valid="!errors[0]"
              :errorMessage="errors[0]"
            >
              <SfSelectOption
                v-for="{ name, label } in provience"
                :key="name"
                :value="name"
              >
                {{ label }}
              </SfSelectOption>
            </SfSelect>
          </ValidationProvider>
        </div>
        <div class="row">
          <ValidationProvider
            rules="required|min:4"
            v-slot="{ errors }"
            tag="div"
            class="col-6"
          >
            <SfInput
              data-cy="billing-details-input_zipCode"
              v-model="form.postalCode"
              name="zipCode"
              label="Zipcode"
              :valid="!errors[0]"
              :errorMessage="errors[0]"
              class="form__element"
            />
          </ValidationProvider>
          <ValidationProvider
            tag="div"
            class="col-6"
          >
          <SfInput
              data-cy="billing-details-input_company"
              v-model="form.company"
              name="company"
              label="Company"
              tag="div"
              class="form__element"
            />
          </ValidationProvider>
          <ValidationProvider
            rules="required|min:8|max:15|regex:^(\+?\d[0-9]+)$"
            v-slot="{ errors }"
            tag="div"
            class="col-12"
          >
            <SfInput
              data-cy="billing-details-input_phoneNumber"
              v-model="form.phone"
              name="phone"
              label="Phone number"
              :valid="!errors[0]"
              :errorMessage="errors[0]"
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
            <SfButton data-cy="billing-details-btn_update" class="form__button" @click.native="scrollToTop()">
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
import { ref } from '@vue/composition-api';

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
        country: '',
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
    const provience = [
      {name: 'Alabama', label: 'Alabama'},
      {name: 'American Samoa', label: 'American Samoa'},
      {name: 'Arizona', label: 'Arizona'},
      {name: 'Arkansas', label: 'Arkansas'},
      {name: 'Armed Forces Americas', label: 'Armed Forces Americas'},
      {name: 'Armed Forces Europe', label: 'Armed Forces Europe'},
      {name: 'Armed Forces Pacific', label: 'Armed Forces Pacific'},
      {name: 'California', label: 'California'},
      {name: 'Colorado', label: 'Colorado'},
      {name: 'Connecticut', label: 'Connecticut'},
      {name: 'Delaware', label: 'Delaware'},
      {name: 'District of Columbia', label: 'District of Columbia'},
      {name: 'Federated States of Micronesia', label: 'Federated States of Micronesia'},
      {name: 'Florida', label: 'Florida'},
      {name: 'Georgia', label: 'Georgia'},
      {name: 'Guam', label: 'Guam'},
      {name: 'Hawaii', label: 'Hawaii'},
      {name: 'Idaho', label: 'Idaho'},
      {name: 'Illinois', label: 'Illinois'},
      {name: 'Indiana', label: 'Indiana'},
      {name: 'Iowa', label: 'Iowa'},
      {name: 'Kansas', label: 'Kansas'},
      {name: 'Kentucky', label: 'Kentucky'},
      {name: 'Louisiana', label: 'Louisiana'},
      {name: 'Maine', label: 'Maine'},
      {name: 'Marshall Islands', label: 'Marshall Islands'},
      {name: 'Maryland', label: 'Maryland'},
      {name: 'Massachusetts', label: 'Massachusetts'},
      {name: 'Michigan', label: 'Michigan'},
      {name: 'Minnesota', label: 'Minnesota'},
      {name: 'Mississippi', label: 'Mississippi'},
      {name: 'Missouri', label: 'Missouri'},
      {name: 'Montana', label: 'Montana'},
      {name: 'Nebraska', label: 'Nebraska'},
      {name: 'Nevada', label: 'Nevada'},
      {name: 'New Hampshire', label: 'New Hampshire'},
      {name: 'New Jersey', label: 'New Jersey'},
      {name: 'New Mexico', label: 'New Mexico'},
      {name: 'New York', label: 'New York'},
      {name: 'North Carolina', label: 'North Carolina'},
      {name: 'North Dakota', label: 'North Dakota'},
      {name: 'Northern Mariana Islands', label: 'Northern Mariana Islands'},
      {name: 'Ohio', label: 'Ohio'},
      {name: 'Oklahoma', label: 'Oklahoma'},
      {name: 'Oregon', label: 'Oregon'},
      {name: 'Palau', label: 'Palau'},
      {name: 'Pennsylvania', label: 'Pennsylvania'},
      {name: 'Puerto Rico', label: 'Puerto Rico'},
      {name: 'Rhode Island', label: 'Rhode Island'},
      {name: 'South Carolina', label: 'South Carolina'},
      {name: 'South Dakota', label: 'South Dakota'},
      {name: 'Tennessee', label: 'Tennessee'},
      {name: 'Texas', label: 'Texas'},
      {name: 'Utah', label: 'Utah'},
      {name: 'Vermont', label: 'Vermont'},
      {name: 'Virgin Islands', label: 'U.S. Virgin Islands'},
      {name: 'Virginia', label: 'Virginia'},
      {name: 'Washington', label: 'Washington'},
      {name: 'West Virginia', label: 'West Virginia'},
      {name: 'Wisconsin', label: 'Wisconsin'},
      {name: 'Wyoming', label: 'Wyoming'}
    ];

    const form = ref({
      id: props.address.id,
      firstName: props.address.firstName,
      lastName: props.address.lastName,
      streetName: props.address.address1,
      apartment: props.address.address2,
      city: props.address.city,
      state: props.address.province,
      postalCode: props.address.zip,
      country: 'United States',
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
      provience
    };
  }
};
</script>
