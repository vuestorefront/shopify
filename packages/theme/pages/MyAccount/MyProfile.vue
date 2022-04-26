<template>
  <div class="my-profile">
    <div class="my-profile__title">
      <SfHeading :level="1" :title="title" />
      <template v-if="!isEdited">
        <SfButton class="edit_action" @click="isEdited = true">
          Edit Your Profile
        </SfButton>
      </template>
    </div>
    <div v-if="isEdited" class="my-profile__content container-small">
      <tabs>
        <tab title="Personal Data">
          <ValidationObserver v-slot="{ handleSubmit }" tag="div">
            <form class="form" @submit.prevent="handleSubmit(updateProfile)">
              <div class="row">
                <ValidationProvider
                  v-slot="{ errors }"
                  tag="div"
                  rules="required|min:2"
                  class="col-6"
                >
                  <SfInput
                    v-model="form.firstName"
                    data-cy="my-profile-input_firstName"
                    name="firstName"
                    label="First Name"
                    :valid="!errors[0]"
                    class="form__element"
                    :error-message="errors[0]"
                  />
                </ValidationProvider>
                <ValidationProvider
                  v-slot="{ errors }"
                  tag="div"
                  rules="required|min:2"
                  class="col-6"
                >
                  <SfInput
                    v-model="form.lastName"
                    data-cy="my-profile-input_lastName"
                    name="lastName"
                    label="Last Name"
                    :valid="!errors[0]"
                    class="form__element"
                    :error-message="errors[0]"
                  />
                </ValidationProvider>
              </div>
              <ValidationProvider
                v-slot="{ errors }"
                tag="div"
                rules="required|email"
              >
                <SfInput
                  v-model="form.email"
                  data-cy="my-profile-input_email"
                  type="email"
                  name="email"
                  label="Your e-mail"
                  class="form__element"
                  :valid="!errors[0]"
                  :error-message="errors[0]"
                  :disabled="true"
                />
              </ValidationProvider>
              <div class="my-account-bottom-action-wrap">
                <div class="form__button_wrap">
                  <SfButton data-cy="my-profile-btn_update" class="form__button" type="submit"
                    >Update Profile</SfButton
                  >
                </div>
                <div class="form__button_wrap">
                  <SfButton
                    data-cy="my-profile-btn_cancel"
                    class="form__button"
                    @click="isEdited = false"
                    >Cancel</SfButton
                  >
                </div>
              </div>
            </form>
          </ValidationObserver>
        </tab>
        <tab title="Password Change">
          <ValidationObserver v-slot="{ handleSubmit }" tag="div">
            <form class="form" @submit.prevent="handleSubmit(updatePassword)">
              <div class="form__horizontal">
                <ValidationProvider
                  v-slot="{ errors }"
                  tag="div"
                  rules="required|min:5"
                  vid="password"
                >
                  <SfInput
                    v-model="form.newPassword"
                    data-cy="my-profile-input_newPassword"
                    type="password"
                    name="newPassword"
                    label="New Password"
                    class="form__element"
                    :valid="!errors[0]"
                    :error-message="errors[0]"
                  />
                </ValidationProvider>
                <ValidationProvider
                  v-slot="{ errors }"
                  tag="div"
                  rules="required|confirmed:password"
                >
                  <SfInput
                    v-model="form.repeatPassword"
                    data-cy="my-profile-input_repeatPassword"
                    type="password"
                    name="repeatPassword"
                    label="Repeat Password"
                    class="form__element"
                    :valid="!errors[0]"
                    :error-message="errors[0]"
                  />
                </ValidationProvider>
              </div>
              <div class="my-account-bottom-action-wrap">
                <div class="form__button_wrap">
                  <SfButton
                    data-cy="my-profile-btn_update-password"
                    class="form__button"
                    type="submit"
                    >Change password</SfButton
                  >
                </div>
                <div class="form__button_wrap">
                  <SfButton
                    data-cy="my-profile-btn_cancel"
                    class="form__button"
                    @click.native="isEdited = false"
                    >Cancel</SfButton
                  >
                </div>
              </div>
            </form>
          </ValidationObserver>
        </tab>
      </tabs>
    </div>
    <div v-else class="user_profile_detail my-profile__content">
      <SfProperty
        v-if="displayName"
        class="my-profile-cname"
        name="Name"
        :value="displayName"
      />
      <SfProperty
        v-if="email"
        class="my-profile-cemail"
        name="Email"
        :value="email"
      />
      <SfProperty
        v-if="phone"
        class="my-profile-cmobile"
        name="Mobile"
        :value="phone"
      />
    </div>
  </div>
</template>
<script type="module">
import { ref, computed } from '@nuxtjs/composition-api';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { email, required, min, confirmed } from 'vee-validate/dist/rules';
import { SfInput, SfButton, SfProperty, SfHeading } from '@storefront-ui/vue';
import { useUser, userGetters } from '@vue-storefront/shopify';
import { onSSR } from '@vue-storefront/core';
import { useUiNotification } from '~/composables';
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
  validate: (value) =>
    String(value).length >= 8 &&
    String(value).match(/[A-Za-z]/gi) &&
    String(value).match(/[0-9]/gi),
  message:
    'Password must have at least 8 characters including one letter and a number'
});

extend('confirmed', {
  ...confirmed,
  message: "Passwords don't match"
});

export default {
  name: 'PersonalDetails',
  components: {
    SfInput,
    SfButton,
    SfProperty,
    SfHeading,
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
    const firstName = computed(() => userGetters.getFirstName(user.value));
    const lastName = computed(() => userGetters.getLastName(user.value));
    const email = computed(() => userGetters.getEmailAddress(user.value));
    const phone = computed(() => userGetters.getPhone(user.value));
    const displayName = computed(() => userGetters.getdisplayName(user.value));
    const resetForm = () => ({
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      phone: phone.value,
      displayName: displayName.value,
      newPassword: ''
    });
    const { send: sendNotification } = useUiNotification();
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

    const updatePassword = async () => await handleForm(changePassword, true)();
    const updateProfile = async () => await handleForm(updateUser, false)();
    onSSR(async () => {
      if (user.value === null){
        await loadUser();
        form.value.email = user.value.email;
        form.value.firstName = user.value.firstName;
        form.value.lastName = user.value.lastName;
      }
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
      title: 'My Profile',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'My Profile',
          name: 'My Profile',
          content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur convallis nisi nec sem dapibus vestibulum. Aliquam consectetur venenatis sem. In hac habitasse platea dictumst. Nam semper, quam vitae scelerisque iaculis, quam est ullamcorper ante, eget egestas nunc massa a odio. Fusce eget ligula tempus, luctus ex sit amet, ullamcorper ipsum. Ut id nunc malesuada, ultrices ipsum vel, eleifend metus. Donec vel luctus odio.'
        }
      ]
    };
  }
};
</script>
<style lang="scss">
.my-profile {
  .edit_action {
    margin-left: auto;
    font-size: 0.9rem;
  }

  &__content {
    margin-top: 1rem;
  }
}
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
