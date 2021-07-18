<template>
  <div class="DataStatusIndicator">
    <div
      v-if="loadingState === 'loading'"
      class="alert alert-info"
    >
      <i class="bi bi-clock me-1" />
      <span>
        載入資料中 ... 請稍候 ...
      </span>
    </div>
    <div
      v-if="loadingState === 'loaded'"
      class="alert alert-secondary"
    >
      <i class="bi bi-info-circle me-1" />
      <span>
        更新<span class="d-none d-sm-inline">時間</span>：{{ formatDateTime(lastUpdateTime) }}
        ({{ formatRelativeTime(lastUpdateTime) }})
      </span>
    </div>
    <div
      v-if="loadingState === 'error'"
      class="alert alert-danger"
    >
      <i class="bi bi-exclamation-circle me-1" />
      <span>
        取得資料時發生了錯誤，請回報管理員。 (錯誤訊息：{{ errorMessage }})
      </span>
    </div>
  </div>
</template>

<script>
import * as Vue from 'vue';
import * as Vuex from 'vuex';
import { formatDateTime, formatRelativeTime } from '@/helpers';

export default {
  setup() {
    const store = Vuex.useStore();

    const lastUpdateTime = Vue.computed(() => store.state.lastUpdateTime);
    const errorMessage = Vue.computed(() => store.state.errorMessage);
    const loadingState = Vue.computed(() => store.state.loadingState);

    return {
      lastUpdateTime,
      errorMessage,
      loadingState,

      formatDateTime,
      formatRelativeTime,
    };
  },
};
</script>
