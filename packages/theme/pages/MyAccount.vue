<template>
  <div id="account">
    <SfBreadcrumbs class="breadcrumbs" :breadcrumbs="breadcrumbs">
      <template #link="{breadcrumb}">
        <nuxt-link
          :data-testid="breadcrumb.text"
          :to="breadcrumb.route.link"
          class="sf-link disable-active-link sf-breadcrumbs__breadcrumb"
        >
          {{ breadcrumb.text }}
        </nuxt-link>
      </template>
    </SfBreadcrumbs>
    <SfContentPages
      data-cy="account_content-pages"
      :active="currentPage"
      class="my-account"
      title="Menu"
      @click:change="currentPage = $event;"
    >
      <template #menu-item="{ page }">
        <SfMenuItem
          :class="{ 'is-active': page.title === activePage }"
          :label="page.title === 'Billing details' ? 'Address Book' :  page.title === 'Order history' ? 'My Orders' : page.title"
          class="sf-content-pages__menu"
          @click="changeActivePage(page.title)"
          icon=""
        />
      </template>

      <SfContentPage data-cy="Account-my-profile" title="My profile">
        <MyProfile />
      </SfContentPage>

      <SfContentPage data-cy="Account-address-book" title="Billing details">
        <AdressBook />
      </SfContentPage>

      <SfContentPage data-cy="Account-my-orders" title="Order history">
        <OrderHistory />
      </SfContentPage>

      <SfContentPage data-cy="account-page_log-out" title="Log out" />
    </SfContentPages>
  </div>
</template>
<script type="module">
import { SfBreadcrumbs, SfContentPages, SfMenuItem, SfLink } from '@storefront-ui/vue';
import { ref, computed } from '@vue/composition-api';
import { useUser, userGetters, useContent } from '@vue-storefront/shopify';
import MyProfile from './MyAccount/MyProfile';
import AdressBook from './MyAccount/AdressBook';
import LoyaltyCard from './MyAccount/LoyaltyCard';
import OrderHistory from './MyAccount/OrderHistory';
import { onSSR } from '@vue-storefront/core';
import useUiNotification from '~/composables/useUiNotification';
export default {
  name: 'MyAccount',
  middleware: 'authenticated',
  components: {
    SfBreadcrumbs,
    SfContentPages,
    SfMenuItem,
    MyProfile,
    AdressBook,
    LoyaltyCard,
    OrderHistory,
    SfLink
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup(props, context) {
    const { $router, $route } = context.root;
    const { logout, load: loadUser, user: userInfo} = useUser();
    const { loading: newsLetterLoading, content: NewsletterStatus, search: UpdateNewsletterPreference } = useContent('UpdateNewsletterPreference');
    const { send: sendNotification} = useUiNotification();
    let userToken = ref('');

    userToken = computed(() => userGetters.getToken(userInfo.value));
    const acceptsMarketing = computed(() => userGetters.AcceptsMarketingStatus(userInfo.value));
    const email = computed(() => userGetters.getEmailAddress(userInfo.value));
    const id = computed(() => userGetters.getCleanID(userInfo.value));

    if (userToken.value === '') {
      $router.push('/');
      return;
    }
    const activePage = computed(() => {
      const { pageName } = $route.params;

      if (pageName) {
        return (pageName.charAt(0).toUpperCase() + pageName.slice(1)).replace('-', ' ');
      }

      return 'My profile';
    });

    const changeActivePage = async (title) => {
      if (title === 'Log out') {
        await logout();
        sendNotification({
          key: 'logout_success',
          message: 'You are successfully logged out',
          type: 'success',
          icon: 'check',
          title: 'Loguut success'
        });
        $router.push('/');
        return;
      }

      $router.push(`/my-account/${(title || '').toLowerCase().replace(' ', '-')}`);
    };
    onSSR(async () => {
      await loadUser();
    });
    return { loadUser, changeActivePage, activePage, acceptsMarketing, UpdateNewsletterPreference, email, id, NewsletterStatus, sendNotification, newsLetterLoading };
  },
  methods: {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    async updateNewsletterPreference(status) {
      await this.UpdateNewsletterPreference({ContentType: 'updatePreferences', Email: this.email, isSubscribed: status, customerId: this.id}).then(() => {
        this.sendNotification({
          key: 'preferences_updated',
          message: this.NewsletterStatus,
          type: 'success',
          icon: 'check',
          title: 'Subscribed status'
        });
      });
      await this.loadUser();
    }
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  data() {
    return {
      breadcrumbs: [
        {
          text: 'Home',
          route: { link: '/' }
        },
        {
          text: 'My Account',
          route: { link: '/my-account' }
        },
        {
          text: this.activePage,
          route: { link: '#' }
        }
      ],
      currentPage: this.activePage
    };
  }
};
</script>

<style lang='scss'>
#account {
  .sf-content-pages {
    height: auto;
    overflow: unset;
  }
  & > .sf-content-pages {
    & > .sf-bar {
      margin-bottom: 30px;
      box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.08);
      background-color: var(--c-white);
      margin-left: -15px;
      margin-right: -15px;
      position: relative;
      height: auto;
      flex: 0 0 auto;
      justify-content: flex-start;
      padding: 15px 40px 15px 20px;
      .sf-bar__title {
        font-size: 14px;
        font-weight: 500;
        color: var(--c-black);
        line-height: 1.5;
        text-transform: capitalize;
      }
      .sf-button {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding-right: 20px;
        .sf-icon {
          transform: rotate(180deg);
        }
      }
    }
  }
  .sf-content-pages__section {
    align-items: flex-start;
    padding-bottom: 80px;
    position: relative;
    @include for-mobile {
      padding-bottom: 50px;
      margin: 0;
    }
    &.is-active {
      transform: none;
      .sf-content-pages__sidebar {
        left: calc(-100% - 15px);
      }
    }
  }
  .sf-content-pages__content, .sf-content-pages__sidebar {
    height: auto;
    overflow: unset;
  }
  .sf-content-pages__sidebar {
    padding: 17px 0;
    background-color: transparent;
    flex: 0 0 23.4%;
    max-width: 23.4%;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
    border-radius: 8px;
    @include for-mobile {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      min-height: 200px;
      background-color: var(--c-white);
      z-index: 1;
      flex: 0 0 100%;
      max-width: 100%;
      box-shadow: none;
      border-radius: 0;
      padding: 0;
      transition: all 0.3s ease-in-out 0s;
    }
    & > .sf-content-pages__title {
      display: none;
    }
    .sf-content-pages__list {
      .sf-content-pages__list-item {
        margin: 0;
        padding: 0;
        border: 0 none;
      }
      .sf-menu-item {
        font-size: 16px;
        font-weight: 400;
        color: var(--_c-gray-666666);
        padding: 18px 30px;
        position: relative;
        @include for-mobile {
          font-size: 14px;
          padding: 15px 20px;
        }
        &::after {
          content: "";
          position: absolute;
          left: 0;
          height: 0;
          width: 2px;
          background-color: var(--_c-blue-148ED0);
          transition: all 0.3s ease 0s;
        }
        &.is-active,
        &:hover {
          background-color: rgba(20, 142, 208, 0.05);
          &::after {
            height: 100%;
          }
          .sf-menu-item__label {
            color: var(--c-black);
            font-weight: 500;
          }
        }
        .sf-menu-item__label {
          color: var(--_c-gray-666666);
          text-transform: capitalize;
        }
      }
    }
  }
  .sf-content-pages__content {
    flex: 0 0 76.6%;
    max-width: 76.6%;
    padding: 0 0 0 60px;
    @include for-mobile {
      padding: 0;
      flex: 0 0 100%;
      max-width: 100%;
      min-height: 400px;
    }
  }
  .my_accoutn_title_wrap {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--_c-gray-DDDDDD);
    padding-bottom: 20px;
    margin-bottom: 30px;
    @include for-mobile {
      padding-bottom: 10px;
      margin-bottom: 20px;
    }
    .sf-heading {
      @include for-mobile {
        padding: 0;
      }
    }
    .sf-heading__title {
      font-size: 18px;
      font-weight: 600;
      color: var(--c-black);
      line-height: 1.5;
      @include for-mobile {
        font-size: 16px;
      }
    }
    .sf-button {
      background: transparent;
      padding: 0;
      text-transform: none;
      color: var(--c-black);
      font-size: 14px;
      font-weight: 400;
      line-height: 1.5;
      display: flex;
      align-items: center;
      transition: all 0.3s ease 0s;
      @include for-mobile {
        font-size: 12px;
      }
      svg {
        margin-right: 10px;
        path {
          transition: all 0.3s ease 0s;
        }
      }
      &:focus-visible {
        outline: 0 none;
      }
      &:hover {
        color: var(--c-primary);
        svg {
          path {
            fill: var(--c-primary);
          }
        }
      }
      &:active {
        --button-background: transparent;
      }
    }
  }
  .my_account_content {
    &.container-small {
      @include for-desktop {
        max-width: 620px;
      }
    }
    .my-account-bottom-action-wrap {
      display: flex;
      flex-wrap: wrap;
      margin-left: -10px;
      margin-right: -10px;
      @media (max-width: 479px) {
        margin-left: 0;
        margin-right: 0;
      }
      .form__button_wrap {
        flex: 0 0 46%;
        max-width: 46%;
        padding-left: 10px;
        padding-right: 10px;
        @media (max-width: 479px) {
          flex: 0 0 100%;
          max-width: 100%;
          padding-left: 0;
          padding-right: 0;
        }
        & + .form__button_wrap {
          @media (max-width: 479px) {
            margin-top: 10px;
          }
        }
        .form__button {
          width: 100%;
        }
      }
    }
    .form__button {
      text-transform: capitalize;
      border-radius: 4px;
      padding: 18px 20px;
      font-size: 16px;
      min-height: 55px;
      @include for-mobile {
        font-size: 14px;
        padding: 15px 20px;
        min-height: 46px;
      }
      &:not(.btn-full) + .form__button:not(.btn-full) {
        margin-right: 10px;
      }
      &.sf-link {
        &:hover {
          color: var(--c-white);
        }
      }
      &:hover {
        background-color: var(--_c-black-171717);
      }
      &.is-disabled--button,
      &.is-disabled--button:hover {
        background-color: var(--c-light);
      }
      &.btn-full {
        width: 100%;
        & + .btn-full {
          margin-top: 10px;
        }
      }
      &.sf-btn-secondary {
        background-color: var(--_c-black-171717);
        &:hover {
          background-color: var(--c-primary);
        }
      }
    }
  }
}
</style>
