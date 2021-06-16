/* eslint-disable no-param-reassign */
import * as Vuex from 'vuex';
import { fetchCourseData } from '@/services/api';

const store = Vuex.createStore({
  state() {
    return {
      colleges: [],
      departments: [],
      courses: [],
      lastUpdateTime: null,
      errorMessage: null,
    };
  },
  mutations: {
    SET_COLLEGES(state, payload) {
      state.colleges = payload.colleges;
    },
    SET_DEPARTMENTS(state, payload) {
      state.departments = payload.departments;
    },
    SET_COURSES(state, payload) {
      state.courses = payload.courses;
    },
    SET_LAST_UPDATE_TIME(state, payload) {
      state.lastUpdateTime = payload.lastUpdateTime;
    },
    SET_ERROR_MESSAGE(state, payload) {
      state.errorMessage = payload.errorMessage;
    },
  },
  actions: {
    async loadCourseData(context) {
      try {
        let {
          colleges,
          departments,
          courses,
          lastUpdateTime,
        } = await fetchCourseData();

        context.commit('SET_COLLEGES', { colleges });
        context.commit('SET_DEPARTMENTS', { departments });
        context.commit('SET_COURSES', { courses });
        context.commit('SET_LAST_UPDATE_TIME', { lastUpdateTime });
      } catch (err) {
        context.commit('SET_ERROR_MESSAGE', { errorMessage: err.message });
      }
    },
  },
  getters: {
  },
  plugins: import.meta.env.DEV ? [Vuex.createLogger()] : [],
});

export default store;
