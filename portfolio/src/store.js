import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);

export default new Vuex.Store({
	plugins: [createPersistedState({
		key: 'vuexapp',
		paths: [
			'currentUser',
			'currentProject'
		],
		storage: window.sessionStorage
	})],

	state: {
		projectList: [],
		currentUser: {
			id: '',
			name: '',
			address: '',
			password: '',
			iconPath: ''
			},
		currentProject: {
			projectName: '',
			startDate: '',
			finishDate: '',
			projectMembers: [],
			id: '',
			showDeletingProjectModal: false,
			showEditingProjectModal: false,
			}
	},
	getters: {
		projectList: state => state.projectList,
		currentUser: state => state.currentUser,
		currentProject: state => state.currentProject,
	},
	mutations: {
		updateProjectList(state, projectList) {
			state.projectList = projectList
		},
		updateCurrentUser(state, currentUser) {
			state.currentUser = currentUser
		},
		updateCurrentProject(state, currentProject) {
			state.currentProject = currentProject
		},
	}
});