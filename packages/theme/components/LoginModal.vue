<template>
  <SfModal
    :visible="isLoginModalOpen"
    class="modal user-modal"
    @close="toggleLoginModal"
    :persistent="true"
  >
    <template #modal-bar>
      <SfBar
        class="sf-modal__bar"
        :close="false"
        :title="isLogin ? 'Login' : isForgotPassword ? 'Reset password' : 'Create an Account'"
      />
    </template>
    <template #close>
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 1L17 17" stroke="#171717" stroke-width="2"/>
        <path d="M17 1L1 17" stroke="#171717" stroke-width="2"/>
      </svg>
    </template>
    <transition name="sf-fade" mode="out-in">
      <!-- USER LOGIN FORM -->
      <div v-if="isLogin">
        <ValidationObserver tag="div" v-slot="{ handleSubmit }" key="log-in">
          <form class="form" @submit.prevent="handleSubmit(handleLogin)">
            <ValidationProvider tag="div" class="relative" rules="required|email" v-slot="{ errors }">
              <SfInput
                data-cy="login-input_email"
                v-model="form.username"
                :valid="!errors[0]"
                :errorMessage="errors[0]"
                name="email"
                label="Email Address"
                class="form__element"
              />
              <span class="input-icon">
                <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.3333 2.00004C17.3333 1.08337 16.5833 0.333374 15.6666 0.333374H2.33329C1.41663 0.333374 0.666626 1.08337 0.666626 2.00004V12C0.666626 12.9167 1.41663 13.6667 2.33329 13.6667H15.6666C16.5833 13.6667 17.3333 12.9167 17.3333 12V2.00004ZM15.6666 2.00004L8.99996 6.16671L2.33329 2.00004H15.6666ZM15.6666 12H2.33329V3.66671L8.99996 7.83337L15.6666 3.66671V12Z" fill="#888888"/>
                </svg>
              </span>
            </ValidationProvider>
            <ValidationProvider tag="div" rules="required|min:5" v-slot="{ errors }">
              <SfInput
                data-cy="login-input_password"
                v-model="form.password"
                :valid="!errors[0]"
                :errorMessage="errors[0]"
                name="password"
                label="Password"
                :type="inputType"
                class="form__element"
                hasShowPassword
              >
                <template #show-password={isPasswordVisible,switchVisibilityPassword}>
                  <SfButton
                    class="sf-input__password-button"
                    type="button"
                    aria-label="switch-visibility-password"
                    :aria-pressed="isPasswordVisible.toString()"
                    @click="switchVisibilityPassword"
                  >
                    <SfIcon
                      class="sf-input__password-icon"
                      :class="{
                        hidden: !isPasswordVisible,
                      }"
                      icon=""
                      size="22px"
                    >
                      <template #default>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#888888">
                          <path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 6c3.79 0 7.17 2.13 8.82 5.5C19.17 14.87 15.79 17 12 17s-7.17-2.13-8.82-5.5C4.83 8.13 8.21 6 12 6m0-2C7 4 2.73 7.11 1 11.5 2.73 15.89 7 19 12 19s9.27-3.11 11-7.5C21.27 7.11 17 4 12 4zm0 5c1.38 0 2.5 1.12 2.5 2.5S13.38 14 12 14s-2.5-1.12-2.5-2.5S10.62 9 12 9m0-2c-2.48 0-4.5 2.02-4.5 4.5S9.52 16 12 16s4.5-2.02 4.5-4.5S14.48 7 12 7z"/>
                        </svg>
                      </template>
                    </SfIcon>
                  </SfButton>
                </template>
              </SfInput>
            </ValidationProvider>
            <div class="action-wrap">
              <div class="action">
                <SfButton data-cy="login-btn_forgot-password" type='button' class="sf-button--text" @click="isLogin = false;isForgotPassword = true">
                  Forgot password?
                </SfButton>
              </div>
            </div>
            <SfButton data-cy="login-btn_submit"
              type="submit"
              class="sf-button--full-width form__button"
              :disabled="loading"
            >
              <SfLoader :class="{ loader: loading }" :loading="loading">
                <div>Login</div>
              </SfLoader>
            </SfButton>
          </form>
        </ValidationObserver>
        <div class="modal-bottom">
          <span class="bottom__paragraph">Don’t have account yet?</span>
          <SfButton data-cy="login-btn_sign-up" class="sf-button--text" @click="isLogin = false">
            Create an Account
          </SfButton>
        </div>
      </div>
      <!-- FORGOT PASSWORD FORM -->
      <div v-else-if="isForgotPassword">
        <ValidationObserver tag="div" v-slot="{ handleSubmit }" key="forgot-password">
          <form class="form" @submit.prevent="handleSubmit(handleForgotPassword)">
            <ValidationProvider tag="div" class="relative" rules="required|email" v-slot="{ errors }">
              <SfInput
                data-cy="forgot-password-input_email"
                v-model="form.username"
                :valid="!errors[0]"
                :errorMessage="errors[0]"
                name="email"
                label="Email Address"
                class="form__element"
              />
              <span class="input-icon">
                <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.3333 2.00004C17.3333 1.08337 16.5833 0.333374 15.6666 0.333374H2.33329C1.41663 0.333374 0.666626 1.08337 0.666626 2.00004V12C0.666626 12.9167 1.41663 13.6667 2.33329 13.6667H15.6666C16.5833 13.6667 17.3333 12.9167 17.3333 12V2.00004ZM15.6666 2.00004L8.99996 6.16671L2.33329 2.00004H15.6666ZM15.6666 12H2.33329V3.66671L8.99996 7.83337L15.6666 3.66671V12Z" fill="#888888"/>
                </svg>
              </span>
            </ValidationProvider>
            <SfButton data-cy="login-btn_submit"
              type="submit"
              class="sf-button--full-width form__button"
              :disabled="loading"
            >
              <SfLoader :class="{ loader: loading }" :loading="loading">
                <div>Reset Password</div>
              </SfLoader>
            </SfButton>
          </form>
        </ValidationObserver>
        <div class="modal-bottom">
          <SfButton data-cy="login-btn_sign-up" class="sf-button--text" @click="isForgotPassword=false; isLogin = true;">
            Back to Login
          </SfButton>
        </div>
      </div>
      <!-- USER SIGNUP FORM -->
      <div v-else class="form">
        <ValidationObserver v-slot="{ handleSubmit }" key="sign-up">
          <form class="form" @submit.prevent="handleSubmit(handleRegister)" autocomplete="off">
            <ValidationProvider tag="div" class="relative" rules="required|email" v-slot="{ errors }">
              <SfInput
                data-cy="login-input_email"
                v-model="form.email"
                :valid="!errors[0]"
                :errorMessage="errors[0]"
                name="email"
                label="Email Address"
                class="form__element"
              />
              <span class="input-icon">
                <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.3333 2.00004C17.3333 1.08337 16.5833 0.333374 15.6666 0.333374H2.33329C1.41663 0.333374 0.666626 1.08337 0.666626 2.00004V12C0.666626 12.9167 1.41663 13.6667 2.33329 13.6667H15.6666C16.5833 13.6667 17.3333 12.9167 17.3333 12V2.00004ZM15.6666 2.00004L8.99996 6.16671L2.33329 2.00004H15.6666ZM15.6666 12H2.33329V3.66671L8.99996 7.83337L15.6666 3.66671V12Z" fill="#888888"/>
                </svg>
              </span>
            </ValidationProvider>
            <div class="row">
              <ValidationProvider tag="div" class="col-6" rules="required" v-slot="{ errors }">
                <SfInput
                  data-cy="login-input_firstName"
                  v-model="form.firstName"
                  :valid="!errors[0]"
                  :errorMessage="errors[0]"
                  name="first-name"
                  label="First Name"
                  class="form__element"
                />
              </ValidationProvider>
              <ValidationProvider tag="div" class="col-6" rules="required" v-slot="{ errors }">
                <SfInput
                  data-cy="login-input_lastName"
                  v-model="form.lastName"
                  :valid="!errors[0]"
                  :errorMessage="errors[0]"
                  name="last-name"
                  label="Last Name"
                  class="form__element"
                />
              </ValidationProvider>
            </div>
            <ValidationProvider tag="div" rules="required|min:5" v-slot="{ errors }">
              <SfInput
                data-cy="login-input_password"
                v-model="form.userPassword"
                :valid="!errors[0]"
                :errorMessage="errors[0]"
                name="userPassword"
                label="Password"
                type="password"
                class="form__element"
                hasShowPassword
              >
                <template #show-password={isPasswordVisible,switchVisibilityPassword}>
                  <SfButton
                    class="sf-input__password-button"
                    type="button"
                    aria-label="switch-visibility-password"
                    :aria-pressed="isPasswordVisible.toString()"
                    @click="switchVisibilityPassword"
                  >
                    <SfIcon
                      class="sf-input__password-icon"
                      :class="{
                        hidden: !isPasswordVisible,
                      }"
                      icon=""
                      size="22px"
                    >
                      <template #default>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#888888">
                          <path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 6c3.79 0 7.17 2.13 8.82 5.5C19.17 14.87 15.79 17 12 17s-7.17-2.13-8.82-5.5C4.83 8.13 8.21 6 12 6m0-2C7 4 2.73 7.11 1 11.5 2.73 15.89 7 19 12 19s9.27-3.11 11-7.5C21.27 7.11 17 4 12 4zm0 5c1.38 0 2.5 1.12 2.5 2.5S13.38 14 12 14s-2.5-1.12-2.5-2.5S10.62 9 12 9m0-2c-2.48 0-4.5 2.02-4.5 4.5S9.52 16 12 16s4.5-2.02 4.5-4.5S14.48 7 12 7z"/>
                        </svg>
                      </template>
                    </SfIcon>
                  </SfButton>
                </template>
              </SfInput>
            </ValidationProvider>
            <div class="action-wrap">
              <ValidationProvider :rules="{ required: { allowFalse: false } }" v-slot="{ errors }">
                <SfCheckbox
                  v-model="createAccount"
                  :valid="!errors[0]"
                  :errorMessage="errors[0]"
                  name="create-account"
                  class="form__element"
                >
                <template #label>
                  <SfButton
                  class='sf-button--pure'
                  @click="handleTermsLink"
                  type = 'button'
                >
                    &nbsp;&nbsp;Accept Terms &amp; Conditions
                  </SfButton></template>
                </SfCheckbox>
              </ValidationProvider>
            </div>
            <SfButton
              data-cy="login-btn_submit"
              type="submit"
              class="sf-button--full-width form__button"
              :disabled="loading"
            >
              <SfLoader :class="{ loader: loading }" :loading="loading">
                <div>Create an Account</div>
              </SfLoader>
            </SfButton>
          </form>
        </ValidationObserver>
        <div class="modal-bottom">
          <span class="bottom__paragraph">Already have an account?</span>
          <SfButton data-cy="login-btn_login-into-account" class="sf-button--text" @click="isLogin = true">
            Login
          </SfButton>
        </div>
      </div>
    </transition>
  </SfModal>
</template>
<script type="module">
import { ref, watch } from '@vue/composition-api';
import { SfModal, SfInput, SfButton, SfCheckbox, SfLoader, SfAlert, SfBar, SfIcon, SfLink } from '@storefront-ui/vue';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { required, email, min } from 'vee-validate/dist/rules';
import { useUser } from '@vue-storefront/shopify';
import { useUiState, useUiNotification} from '~/composables';

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

export default {
  name: 'LoginModal',
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  data () {
    return {
      isPasswordVisible: false,
      inputType: 'password'
    };
  },
  components: {
    SfModal,
    SfInput,
    SfButton,
    SfCheckbox,
    SfLoader,
    SfAlert,
    ValidationProvider,
    ValidationObserver,
    SfBar,
    SfIcon,
    SfLink
  },
  methods: {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    switchVisibilityPassword () {
      this.isPasswordVisible = !this.isPasswordVisible;
      this.inputType = this.isPasswordVisible ? 'text' : 'password';
    }
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup(props, context) {
    const { $router } = context.root;
    const { isLoginModalOpen, toggleLoginModal } = useUiState();
    const isLogin = ref(true);
    const isForgotPassword = ref(false);
    const form = ref({});
    const createAccount = ref(false);
    const rememberMe = ref(false);
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    const handleTermsLink = () => {
      toggleLoginModal();
      $router.push('/terms-and-conditions');
    };
    const { register, login, loading, user } = useUser();
    const { send: sendNotification} = useUiNotification();
    watch(isLoginModalOpen, () => {
      if (isLoginModalOpen) {
        form.value = {};
      }
    });
    const handleForm = (fn) => async () => {
      await fn({ user: form.value });
      if (user.value.error && user.value.error !== '') {
        if (user.value.error === 'Unidentified customer') {
          user.value.error = 'Sorry! Please try that again';
        } else if (user.value.error === 'Email has already been taken') {
          user.value.error = 'This email address is already associated with an account. If this account is yours, you can reset your password';
        }
        sendNotification({
          key: 'login_failed',
          message: user.value.error,
          type: 'danger',
          title: 'Failed!'
        });
      } else if (user.value.token && user.value.token === 'forgotPassword') {
        sendNotification({
          key: 'link_sent',
          message: 'Reset password link has been successfully sent to ' + form.value.username,
          type: 'success',
          icon: 'check',
          title: 'linkSent!'
        });
        isForgotPassword.value = false;
        isLogin.value = true;
      } else if (user.value.token && user.value.token === 'SignUpSuccess') {
        sendNotification({
          key: 'signup_success',
          message: 'Your registration is successfully done',
          type: 'success',
          icon: 'check',
          title: 'Sign Up Success!'
        });
        form.value = {};
        if (process.client) {
          document.querySelector('button[data-cy="login-btn_login-into-account"]').click();
        }
      } else {
        toggleLoginModal();
        sendNotification({
          key: 'login_success',
          message: 'You are successfully logged in',
          type: 'success',
          title: 'Success!',
          icon: 'check'
        });
        $router.push('/my-account');
      }
    };

    const handleRegister = async () => handleForm(register)();

    const handleLogin = async () => handleForm(login)();

    const handleForgotPassword = async () => handleForm(login)();

    return {
      form,
      loading,
      isLogin,
      createAccount,
      rememberMe,
      isLoginModalOpen,
      toggleLoginModal,
      handleLogin,
      handleRegister,
      handleTermsLink,
      sendNotification,
      isForgotPassword,
      handleForgotPassword
    };
  }
};
</script>

<style lang="scss">
.action-wrap {
    display: flex;
    justify-content: space-between;
    margin-bottom: 26px;
    @include for-mobile {
      margin-bottom: 16px;
    }
}
.action {
  .sf-button {
    font-family: var(--font-family--primary);
    font-weight: 400;
    font-size: 14px;
    color: var(--_c-black-171717);
    transition: all 0.3s ease 0s;
    @include for-mobile {
      font-size: 12px;
    }
    &:hover {
      color: var(--c-primary);
    }
  }
}
.sf-button[data-cy="login-btn_submit"] {
  font-family: var(--font-family--primary);
  font-weight: 400;
  font-size: 20px;
  text-transform: none;
  padding: 16px;
  border-radius: 30px;
  min-height: 56px;
  transition: all 0.3s ease 0s;
  @include for-mobile {
    font-size: 16px;
    min-height: 51px;
  }
  &:hover {
    background-color: var(--_c-black-171717);
  }
}
.user-modal {
  .modal-bottom {
    margin-top: 30px;
    display: flex;
    justify-content: center;
    font-size: 16px;
    color: var(--_c-gray-ACACAC);
    @include for-mobile {
      margin-top: 20px;
      font-size: 12px;
    }
    @media (max-width: 420px) {
      flex-direction: column;
      align-items: center;
    }
    .bottom__paragraph {
      margin-right: 10px;
      @media (max-width: 420px) {
        margin: 0 0 5px;
      }
    }
    .sf-button {
      font-family: var(--font-family--primary);
      font-weight: 600;
      font-size: 16px;
      color: var(--c-primary);
      transition: all 0.3s ease 0s;
      @include for-mobile {
        font-size: 12px;
      }
      &:hover {
        color: var(--_c-black-171717);
      }
    }
  }
  .sf-modal__container {
    width: 100%;
    height: auto;
    max-width: 500px;
    max-height: 90%;
    margin: auto;
    border-radius: 8px;
    overflow: hidden;
    @include for-mobile {
      max-width: 374px;
    }
    @media (max-width: 420px) {
      max-width: 280px;
    }
  }
}
</style>
