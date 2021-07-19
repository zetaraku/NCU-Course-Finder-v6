/* eslint-disable no-param-reassign */
import * as Vuex from 'vuex';
import { fetchCourseData } from '@/services/api';

const LOADING_STATES = {
  PENDING: 'pending',
  FETCHING: 'fetching',
  LOADING: 'loading',
  LOADED: 'loaded',
  ERROR: 'error',
};

const store = Vuex.createStore({
  state() {
    return {
      colleges: [],
      departments: [],
      courses: [],
      lastUpdateTime: new Date(0),
      errorMessage: '',
      loadingState: LOADING_STATES.PENDING,
    };
  },
  mutations: {
    SET_DATA(state, payload) {
      state.colleges = payload.colleges;
      state.departments = payload.departments;
      state.courses = payload.courses;
      state.lastUpdateTime = payload.lastUpdateTime;
    },
    SET_ERROR_MESSAGE(state, payload) {
      state.errorMessage = payload;
    },
    SET_LOADING_STATE(state, payload) {
      state.loadingState = payload;
    },
  },
  actions: {
    async loadCourseData(context) {
      try {
        context.commit('SET_LOADING_STATE', LOADING_STATES.FETCHING);
        let data = await fetchCourseData();

        context.commit('SET_LOADING_STATE', LOADING_STATES.LOADING);
        // allow UI to be re-rendered here
        await new Promise(resolve => setTimeout(resolve, 0));

        context.commit('SET_DATA', data);
        await context.dispatch('loadSelectedCourses');
        context.commit('SET_LOADING_STATE', LOADING_STATES.LOADED);
      } catch (err) {
        context.commit('SET_ERROR_MESSAGE', err.message);
        context.commit('SET_LOADING_STATE', LOADING_STATES.ERROR);
        throw err;
      }
    },
    saveSelectedCourses(context) {
      localStorage.setItem(
        'selectedCourses',
        context.getters.selectedCourses.map(e => e.serialNo).join(','),
      );
    },
    loadSelectedCourses(context) {
      let importText = localStorage.getItem('selectedCourses');

      if (importText === null) return;

      let serialNoSet = new Set(importText.split(',').map(Number));
      for (let course of context.state.courses) {
        if (serialNoSet.has(course.serialNo)) {
          course.selected = true;
        }
      }
    },
  },
  getters: {
    selectedCourses(state) {
      return state.courses.filter(
        course => course.selected,
      );
    },
    selectedClassTimes(state, getters) {
      return new Set(
        getters.selectedCourses.flatMap(course => course.classTimes),
      );
    },
    placeholderCourses(state) {
      return state.courses.filter(
        course => course.isPlaceholder,
      );
    },
  },
  plugins: import.meta.env.DEV ? [Vuex.createLogger()] : [],
});

export default store;
