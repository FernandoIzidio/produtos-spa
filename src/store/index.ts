import { createStore } from 'vuex'
import router from "@/router";
import {User, State} from "@/types";
import createPersistedState from "@/plugins/vuexPersist";

const state: State = {
  token: '',
  user: null
};

export default createStore<State>({
  state,
  getters: {
  },
  mutations: {
    setToken: (state, token: string) => {
      state.token = token;
    },
    setUser: (state, user: User) => {
      state.user = user;
    }
  },
  actions: {
    async login({ commit , state}, payload) {

      commit('setToken', payload.token);
      commit('setUser', payload.user);


      if (state.user === null){
        throw new Error();
      }

      await router.push("/dashboard");

    },
    async logout({commit}){
        commit('setToken', '');
        commit('setUser', null);
        localStorage.removeItem('vuex');
    },
  },
  plugins: [createPersistedState()]
})
