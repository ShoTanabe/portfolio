import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);

export default new Vuex.Store({
	plugins: [createPersistedState({
		key: 'vuexapp',
		paths: [
			'currentUserEmail'
		],
		storage: window.sessionStorage
	})],

	state: {
		projectList: [],
		currentUserEmail: ''
	},
	getters: {
		projectList: state => state.projectList,
		currentUserEmail: state => state.currentUserEmail,
	},
	mutations: {
		updateProjectList(state, projectList) {
			state.projectList = projectList
		},
		updateCurrentUserEmail(state, currentUserEmail) {
			state.currentUserEmail = currentUserEmail
		},
	}
});