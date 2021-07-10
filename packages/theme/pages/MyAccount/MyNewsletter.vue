<template>
  <div class="my_account_content_wrap">
    <div class="my_accoutn_title_wrap">
      <SfHeading
        class="my_accoutn_title"
        :level="1"
        :title="title"
      />
    </div>
    <div class="my_account_content newsletter-content container-small">
      <div class="form">
        <div class="form__checkbox-group">
          <SfCheckbox
            v-model="subscriptionState"
            label="Join Our Newsletters. Be The First To Know!"
            value="Join Our Newsletters. Be The First To Know!"
            class="form__element"
            @change="handleButtonBehaviour(subscriptionState)"
          />
        </div>
        <div class="my-account-bottom-action-wrap">
          <div class="form__button_wrap">
              <SfButton data-cy="newsletter-btn_join" :disable="isBtnDisabled" class="form__button" @click="updatePreferences" :class="{'is-disabled--button': isBtnDisabled}"><SfLoader :class="{ loader: loading }" :loading="loading"><div>Update My Preferences</div></SfLoader></SfButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { SfCheckbox, SfButton, SfHeading, SfLoader } from '@storefront-ui/vue';
export default {
  name: 'MyNewsletter',
  components: {
    SfCheckbox,
    SfButton,
    SfHeading,
    SfLoader
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  data() {
    return {
      subscriptionState: this.$props.isSubscribed,
      isBtnDisabled: true
    };
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  mounted () {
    this.handleButtonBehaviour(this.$props.isSubscribed);
  },
  watch: {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    isSubscribed(val) {
      this.handleButtonBehaviour(val);
    }
  },
  methods: {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    updatePreferences() {
      this.$emit('updatePreferences', this.subscriptionState);
    },
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    handleButtonBehaviour(checkboxState) {
      if (this.$props.isSubscribed !== checkboxState) {
        this.isBtnDisabled = false;
      } else {
        this.isBtnDisabled = true;
      }
    }
  },
  props: {
    title: {
      type: String,
      default: 'Newsletter'
    },
    isSubscribed: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  head() {
    return {
      title: 'Newsletter - Pure Daily Care',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'Newsletter - Pure Daily Care',
          name: 'Newsletter - Pure Daily Care',
          content: 'Pure Daily Care promotes natural beauty by combining the most modern technologies into easy-to-use, at-home products. Pure Daily Care technologies harness the healing power of naturally occurring phenomenon like steam, electricity and light to drastically improve your skin profile without the use of cosmetics.'
        }
      ]
    };
  }
};
</script>

<style lang='scss' scoped>
.newsletter-content {
  .my-account-bottom-action-wrap {
    margin-top: 30px;
  }
}
</style>
