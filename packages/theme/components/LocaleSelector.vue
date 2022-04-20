<template>
  <div class="container">
    <SfButton
      data-cy="locale-select_change-langauge"
      class="container__lang container__lang--selected"
      @click="isLangModalOpen = !isLangModalOpen"
    >
      <img
        :src="`https://cdn.shopify.com/s/files/1/0407/1902/4288/files/${locale}_20x20.jpg`"
        width="20"
        height="20"
      />
    </SfButton>
    <SfBottomModal
      :is-open="isLangModalOpen"
      title="Choose language"
      @click:close="isLangModalOpen = !isLangModalOpen"
    >
      <SfList>
        <SfListItem v-for="lang in availableLocales" :key="lang.code">
          <nuxt-link :to="switchLocalePath(lang.code)">
            <SfCharacteristic class="language">
              <template #title>
                <span>{{ lang.label }} ({{ lang.currentIso }})</span>
              </template>
              <template #icon>
                <img
                  :src="`https://cdn.shopify.com/s/files/1/0407/1902/4288/files/${lang.code}_20x20.jpg`"
                  width="20"
                  height="20"
                />
              </template>
            </SfCharacteristic>
          </nuxt-link>
        </SfListItem>
      </SfList>
    </SfBottomModal>
  </div>
</template>

<script type="module">
import {
  SfButton,
  SfList,
  SfBottomModal,
  SfCharacteristic
} from '@storefront-ui/vue';
import { useAvailableCountries } from '@vue-storefront/shopify';
import {
  ref,
  computed,
  useRouter,
  onBeforeMount,
  watchEffect
} from '@nuxtjs/composition-api';

export default {
  components: {
    SfButton,
    SfList,
    SfBottomModal,
    SfCharacteristic
  },

  setup() {
    const { load, countries } = useAvailableCountries();
    const router = useRouter();
    const { locales, locale } = router.app.$i18n;
    const isLangModalOpen = ref(false);

    function findCurrency(_countries, _locale) {
      const currency = { currentIso: '' };

      if (!_countries) return currency;

      const singleCountry = _countries?.find(
        (country) => country.isoCode === _locale.alias.toUpperCase()
      )?.currency;

      if (!singleCountry) return currency;

      currency.currentIso = singleCountry.isoCode;

      return currency;
    }

    const availableLocales = computed(() => {
      return locales
        .map((item) => ({
          ...item,
          ...findCurrency(countries.value, item)
        }))
        .filter((i) => i.code !== locale);
    });

    onBeforeMount(() => {
      load();
    });

    return {
      availableLocales,
      locale,
      isLangModalOpen,
      countries
    };
  }
};
</script>

<style lang="scss" scoped>
.container {
  margin: 0 -5px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  position: relative;

  .sf-bottom-modal {
    z-index: 2;
    left: 0;
    @include for-desktop {
      --bottom-modal-height: 100vh;
    }
  }

  .sf-list {
    .language {
      padding: var(--spacer-sm) 0;
    }

    @include for-desktop {
      display: flex;
    }

    .sf-image {
      --image-width: 20px;
      margin-right: 1rem;
      border: 1px solid var(--c-light);
      border-radius: 50%;
    }
  }

  &__lang {
    --image-width: 20px;
    --button-box-shadow: none;
    background: none;
    padding: 0 5px;
    display: flex;
    align-items: center;
    opacity: 0.5;
    border: none;
    &:hover,
    &--selected {
      opacity: 1;
    }
  }
}
</style>
