import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'

import useUiHelpers from './useUiHelpers';
import useUiState from './useUiState';
import useUiNotification from './useUiNotification';

// We need to register it again because of Vue instance instantiation issues
Vue.use(VueCompositionAPI);

export {
  useUiHelpers,
  useUiState,
  useUiNotification
};
