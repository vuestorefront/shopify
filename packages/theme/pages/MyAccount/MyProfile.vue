<template>
  <div class="my_account_content_wrap">
    <div class="my_accoutn_title_wrap">
      <SfHeading
        class="my_accoutn_title"
        :level="1"
        :title="title"
      />
      <div class="my_accoutn_title_actions" v-if="!isEdited">
        <SfButton
          class="edit_action"
          @click="isEdited = true; scrollToTop()"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.7167 7.51667L12.4833 8.28333L4.93333 15.8333H4.16667V15.0667L11.7167 7.51667ZM14.7167 2.5C14.5083 2.5 14.2917 2.58333 14.1333 2.74167L12.6083 4.26667L15.7333 7.39167L17.2583 5.86667C17.5833 5.54167 17.5833 5.01667 17.2583 4.69167L15.3083 2.74167C15.1417 2.575 14.9333 2.5 14.7167 2.5ZM11.7167 5.15833L2.5 14.375V17.5H5.625L14.8417 8.28333L11.7167 5.15833Z" fill="black"/>
          </svg>
          Edit Your Profile
        </SfButton>
      </div>
    </div>
    <div class="my_account_content container-small" v-if="isEdited">
      <tabs>
        <tab title="Personal Data">
          <ValidationObserver tag="div" v-slot="{ handleSubmit }">
            <form class="form" @submit.prevent="handleSubmit(updateProfile)">
              <div class="row">
                <ValidationProvider tag="div" rules="required|min:2" v-slot="{ errors }" class="col-6">
                  <SfInput
                    data-cy="my-profile-input_firstName"
                    v-model= "form.firstName"
                    name="firstName"
                    label="First Name"
                    :valid="!errors[0]"
                    class="form__element"
                    :errorMessage="errors[0]"
                  />
                </ValidationProvider>
                <ValidationProvider tag="div" rules="required|min:2" v-slot="{ errors }" class="col-6">
                  <SfInput
                    data-cy="my-profile-input_lastName"
                    v-model= "form.lastName"
                    name="lastName"
                    label="Last Name"
                    :valid="!errors[0]"
                    class="form__element"
                    :errorMessage="errors[0]"
                  />
                </ValidationProvider>
              </div>
              <ValidationProvider tag="div" rules="required|email" v-slot="{ errors }">
                <SfInput
                  data-cy="my-profile-input_email"
                  v-model= "form.email"
                  type="email"
                  name="email"
                  label="Your e-mail"
                  class="form__element"
                  :valid="!errors[0]"
                  :errorMessage="errors[0]"
                  :disabled="true"
                />
              </ValidationProvider>
              <div class="my-account-bottom-action-wrap">
                <div class="form__button_wrap">
                  <SfButton data-cy="my-profile-btn_update" class="form__button" @click.native="scrollToTop()">Update Profile</SfButton>
                </div>
                <div class="form__button_wrap">
                  <SfButton data-cy="my-profile-btn_cancel" class="form__button" @click="isEdited = false, scrollToTop()">Cancel</SfButton>
                </div>
              </div>
            </form>
          </ValidationObserver>
        </tab>
        <tab title="Password Change">
          <ValidationObserver tag="div" v-slot="{ handleSubmit }">
            <form class="form" @submit.prevent="handleSubmit(updatePassword)">
              <div class="form__horizontal">
                <ValidationProvider tag="div" rules="required|min:5" v-slot="{ errors }" vid="password">
                  <SfInput
                    data-cy="my-profile-input_newPassword"
                    v-model="form.newPassword"
                    type="password"
                    name="newPassword"
                    label="New Password"
                    class="form__element"
                    :valid="!errors[0]"
                    :errorMessage="errors[0]"
                  />
                </ValidationProvider>
                <ValidationProvider tag="div" rules="required|confirmed:password" v-slot="{ errors }">
                  <SfInput
                    data-cy="my-profile-input_repeatPassword"
                    v-model="form.repeatPassword"
                    type="password"
                    name="repeatPassword"
                    label="Repeat Password"
                    class="form__element"
                    :valid="!errors[0]"
                    :errorMessage="errors[0]"
                  />
                </ValidationProvider>
              </div>
              <div class="my-account-bottom-action-wrap">
                <div class="form__button_wrap">
                  <SfButton data-cy="my-profile-btn_update-password" class="form__button" @click.native="scrollToTop()">Change password</SfButton>
                </div>
                <div class="form__button_wrap">
                  <SfButton data-cy="my-profile-btn_cancel" class="form__button" @click.native="isEdited = false, scrollToTop()">Cancel</SfButton>
                </div>
              </div>
            </form>
          </ValidationObserver>
        </tab>
      </tabs>
    </div>
    <div class="user_profile_detail" v-else>
      <SfProperty
      class="my-profile-cname"
      name="Name"
      v-if="displayName"
      :value="displayName" />
      <SfProperty
      class="my-profile-cemail"
      name="Email"
      v-if="email"
      :value="email" />
      <SfProperty
      class="my-profile-cmobile"
      name="Mobile"
      v-if="phone"
      :value="phone" />
    </div>
  </div>
</template>
<script type="module">
import { ref, computed } from '@vue/composition-api';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { email, required, min, confirmed } from 'vee-validate/dist/rules';
import { SfTabs, SfInput, SfButton, SfAlert, SfProperty, SfHeading, SfCheckbox } from '@storefront-ui/vue';
import { useUser, userGetters } from '@vue-storefront/shopify';
import { onSSR } from '@vue-storefront/core';
import { useUiNotification} from '~/composables';
import Tab from '~/components/Tab.vue';
import Tabs from '~/components/Tabs.vue';

extend('email', {
  ...email,
  message: 'Invalid email'
});

extend('required', {
  ...required,
  message: 'This field is required'
});

extend('min', {
  ...min,
  message: 'The field should have at least {length} characters'
});

extend('password', {
  validate: value => String(value).length >= 8 && String(value).match(/[A-Za-z]/gi) && String(value).match(/[0-9]/gi),
  message: 'Password must have at least 8 characters including one letter and a number'
});

extend('confirmed', {
  ...confirmed,
  message: 'Passwords don\'t match'
});

export default {
  name: 'PersonalDetails',
  components: {
    SfTabs,
    SfInput,
    SfButton,
    SfAlert,
    SfProperty,
    SfHeading,
    SfCheckbox,
    ValidationProvider,
    ValidationObserver,
    Tab,
    Tabs
  },
  props: {
    account: {
      type: Object,
      // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
      default: () => ({})
    },
    title: {
      type: String,
      default: 'My Profile'
    }
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup() {
    const { user, load: loadUser, changePassword, updateUser } = useUser();
    const success = ref(null);
    const error = ref(null);
    const firstName = computed(() =>
      userGetters.getFirstName(user.value)
    );
    const lastName = computed(() =>
      userGetters.getLastName(user.value)
    );
    const email = computed(() =>
      userGetters.getEmailAddress(user.value)
    );
    const phone = computed(() =>
      userGetters.getPhone(user.value)
    );
    const displayName = computed(() =>
      userGetters.getdisplayName(user.value)
    );
    const resetForm = () => ({
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      phone: phone.value,
      displayName: displayName.value,
      newPassword: ''
    });
    const { send: sendNotification} = useUiNotification();
    const isEdited = ref(false);
    const form = ref(resetForm());
    const handleForm = (fn, reset) => async () => {
      try {
        if (reset) {
          await fn({ current: '', new: form.value.newPassword }).then(() => {
            loadUser();
            sendNotification({
              key: 'password_changed',
              message: 'Password changed successfully.',
              type: 'success',
              title: 'Success!',
              icon: 'check'
            });
          });
          form.value.newPassword = '';
          form.value.repeatPassword = '';
        } else {
          await fn({ user: form.value }).then(() => {
            loadUser();
            sendNotification({
              key: 'profile_success',
              message: 'Profile updated successfully.',
              type: 'success',
              title: 'Success!',
              icon: 'check'
            });
          });
        }
        isEdited.value = false;
      } catch (e) {
        sendNotification({
          key: 'profile_failed',
          message: e.message,
          type: 'danger',
          title: 'Failed!'
        });
        return false;
      }
    };

    const updatePassword = async () => handleForm(changePassword, true)();
    const updateProfile = async () => handleForm(updateUser, false)();
    onSSR(async () => {
      await loadUser().then(()=> {
        form.value.email = user.value.email;
        form.value.firstName = user.value.firstName;
        form.value.lastName = user.value.lastName;
      });
    });
    return {
      user,
      error,
      success,
      form,
      updatePassword,
      updateProfile,
      firstName,
      lastName,
      phone,
      displayName,
      email,
      isEdited
    };
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  head() {
    return {
      title: 'My Profile - Pure Daily Care',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'My Profile - Pure Daily Care',
          name: 'My Profile - Pure Daily Care',
          content: 'Pure Daily Care promotes natural beauty by combining the most modern technologies into easy-to-use, at-home products. Pure Daily Care technologies harness the healing power of naturally occurring phenomenon like steam, electricity and light to drastically improve your skin profile without the use of cosmetics.'
        }
      ]
    };
  }
};
</script>
<style lang='scss'>
.user_profile_detail {
  .sf-property {
    margin-bottom: 25px;
    @include for-mobile {
      margin-bottom: 15px;
    }
  }
  .sf-property__value,
  .sf-property__name {
    font-size: 16px;
    font-weight: 400;
    @include for-mobile {
      font-size: 14px;
    }
  }
  .sf-property__name {
    color: var(--_c-gray-666666);
    padding-right: 20px;
    margin: 0;
    width: 10%;
    min-width: 90px;
    @include for-mobile {
      min-width: 70px;
    }
  }
  .sf-property__value {
    color: var(--c-black);
    font-weight: 500;
  }
}
.message,
.notice {
  font-family: var(--font-family-primary);
  line-height: 1.6;
}
.message {
  margin: 0 0 var(--spacer-2xl) 0;
  font-size: var(--font-base-mobile);
  @include for-desktop {
    font-size: var(--font-base-desktop);
  }
  &__label {
    font-weight: 400;
  }
}
.notice {
  margin: var(--spacer-xl) 0 0 0;
  font-size: var(--font-xs-mobile);
  @include for-desktop {
    max-width: 70%;
    margin: var(--spacer) 0 0 0;
    font-size: var(--font-xs-desktop);
  }
}
</style>
