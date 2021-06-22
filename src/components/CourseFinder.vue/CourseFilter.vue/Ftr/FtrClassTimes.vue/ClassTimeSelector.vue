<template>
  <div class="ClassTimeSelector modal fade p-0">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header justify-content-center">
          <label class="modal-title fs-4 fw-bold">
            選擇時段
          </label>
          <button
            class="btn-close me-1 d-block d-sm-none"
            data-bs-dismiss="modal"
          />
        </div>
        <div class="modal-body">
          <div class="container-fluid table-responsive p-0">
            <table class="w-100 fs-5 text-center">
              <thead>
                <tr>
                  <th style="min-width: 50px;">
                    <label v-tooltip="'節次＼星期'">
                      ＼
                    </label>
                  </th>
                  <th
                    v-for="day in DAYS"
                    :key="day.key"
                    scope="col"
                  >
                    <label v-tooltip="`星期${day.name}`">
                      {{ day.name }}
                    </label>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="hour in HOURS"
                  :key="hour.key"
                  :style="{ backgroundColor: hour.bg ?? 'white' }"
                >
                  <th scope="row">
                    <label v-tooltip="`第 ${hour.key} 節 (${hour.period}:00~${hour.period}:50)`">
                      {{ hour.key }}
                    </label>
                  </th>
                  <td
                    v-for="day in DAYS"
                    :key="day.key"
                    class="p-1 px-1"
                  >
                    <template
                      v-for="time in [`${day.key}-${hour.key}`]"
                      :key="time"
                    >
                      <input
                        :id="`classTime_${time}`"
                        v-model="filters.classTimes"
                        :value="time"
                        type="checkbox"
                        class="btn-check"
                      >
                      <label
                        :for="`classTime_${time}`"
                        class="btn badge rounded-pill w-100"
                      >
                        {{ time }}
                      </label>
                    </template>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="modal-footer d-none d-sm-flex">
          <button
            class="btn btn-primary px-3"
            data-bs-dismiss="modal"
          >
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as Vue from 'vue';
import { DAYS, HOURS } from './data';

export default {
  inject: ['filters'],
  setup() {
    const filters = Vue.inject('filters');

    Vue.watch(() => filters.classTimes, () => {
      filters.classTimes.sort();
    });

    return {
      DAYS,
      HOURS,
    };
  },
};
</script>

<style lang="scss" scoped>
.btn-check {
  &:not(:checked) + label {
    color: #6c757d;
    background-color: #f8f9fa;
  }
  &:checked + label {
    color: #ffffff;
    background-color: #0d6efd;
  }
}
</style>
