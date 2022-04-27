<template>
  <div id="my-account">
    <SfBreadcrumbs class="breadcrumbs" :breadcrumbs="breadcrumbs">
      <template #link="{breadcrumb}">
        <nuxt-link
          :data-testid="breadcrumb.text"
          :to="breadcrumb.link ? localePath(breadcrumb.link) : ''"
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
          icon=""
          @click="changeActivePage(page.title)"
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
import { SfBreadcrumbs, SfContentPages, SfMenuItem} from '@storefront-ui/vue';
import { ref, computed, onBeforeMount } from '@nuxtjs/composition-api';
import { useUser, userGetters, useContent } from '@vue-storefront/shopify';

import MyProfile from './MyAccount/MyProfile';
import AdressBook from './MyAccount/AdressBook';
import OrderHistory from './MyAccount/OrderHistory';
import { onSSR } from '@vue-storefront/core';
import useUiNotification from '~/composables/useUiNotification';

export default {
  name: 'MyAccount',
  components: {
    SfBreadcrumbs,
    SfContentPages,
    SfMenuItem,
    MyProfile,
    AdressBook,
    OrderHistory
  },
  middleware: 'authenticated',
  setup(__, context) {
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
      return 'my-profile';
    });

    const changeActivePage = async (title) => {
      if (title === 'Log out') {
        await logout();
        $router.push('/');
        sendNotification({
          key: 'logout_success',
          message: 'You are successfully logged out',
          type: 'success',
          icon: 'check',
          title: 'Loguut success'
        });
        return false;
      }

      $router.push(`/my-account/${(title || '').toLowerCase().replace(' ', '-')}`);
    };
    onSSR(async () => {
      await loadUser();
    });
    onBeforeMount(()=>{
      changeActivePage(activePage.value);
    })
    return { loadUser, changeActivePage, activePage, acceptsMarketing, UpdateNewsletterPreference, email, id, NewsletterStatus, sendNotification, newsLetterLoading };
  },
  data() {
    return {
      breadcrumbs: [
        {
          text: 'Home',
          link: '/'
        },
        {
          text: 'My Account',
          link: '/my-account'
        },
        {
          text: this.activePage,
          link: '#'
        }
      ],
      currentPage: this.activePage
    };
  },
  methods: {
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
  }
};
</script>

<style lang="scss" scoped>
#my-account {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1240px;
    margin: 0 auto;
  }
}
.my-account {
  @include for-mobile {
    --content-pages-sidebar-category-title-font-weight: var(
      --font-weight--normal
    );
    --content-pages-sidebar-category-title-margin: var(--spacer-sm)
      var(--spacer-sm) var(--spacer-sm) var(--spacer-base);
  }
  @include for-desktop {
    --content-pages-sidebar-category-title-margin: var(--spacer-xl) 0 0 0;
  }
}
.breadcrumbs {
  margin: var(--spacer-base) 0 var(--spacer-lg);
}
</style>
