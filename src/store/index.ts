import Vue from 'vue';
import Vuex, { ActionContext } from 'vuex';
import { Namespace } from '@/types/backend';
import NamespaceHandler from '@/handler/namespaceHandler';

Vue.use(Vuex);

interface RootState {
  namespaceList: Namespace[];
}

const state: RootState = {
  namespaceList: []
};

const getters = {};

const mutations = {
  updateNamespaceList: (s: RootState, n: Namespace[]) => {
    s.namespaceList = n;
  }
};

const actions = {
  async getNamespaceList(context: ActionContext<RootState, RootState>) {
    try {
      const namespaceList = await NamespaceHandler.getNamespaceList();
      context.commit('updateNamespaceList', namespaceList);
    } catch (err) {
      console.log(err);
    }
  }
};

export default new Vuex.Store<RootState>({
  state,
  getters,
  mutations,
  actions
});
