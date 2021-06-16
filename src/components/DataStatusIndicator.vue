<template>
  <div class="DataStatusIndicator">
    <div
      v-if="errorMessage !== null"
      class="alert alert-danger"
    >
      <i class="bi bi-exclamation-circle me-1" />
      <span>
        取得資料時發生了錯誤，請回報管理員。 (錯誤訊息：{{ errorMessage }})
      </span>
    </div>
    <div
      v-else-if="lastUpdateTime === null"
      class="alert alert-info"
    >
      <i class="bi bi-clock me-1" />
      <span>
        取得資料中 ... 請稍候 ...
      </span>
    </div>
    <div
      v-else
      class="alert alert-secondary alert-dismissible fade show"
    >
      <i class="bi bi-info-circle me-1" />
      <span>
        更新<span class="d-none d-sm-inline">時間</span>：{{ formatDateTime(lastUpdateTime) }}
        ({{ formatRelativeTime(lastUpdateTime) }})
      </span>
      <button
        class="btn-close"
        data-bs-dismiss="alert"
      />
    </div>
  </div>
</template>

<script>
import { formatDateTime, formatRelativeTime } from '@/helpers';

export default {
  props: {
    lastUpdateTime: {
      type: Date,
      default: null,
    },
    errorMessage: {
      type: String,
      default: null,
    },
  },
  setup() {
    return {
      formatDateTime,
      formatRelativeTime,
    };
  },
};
</script>
