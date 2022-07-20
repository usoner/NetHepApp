import ApiService from "@/core/services/api.service";
import JwtService from "@/core/services/jwt.service";

// action types
export const GET_BANK = "getBank";

// mutation types
export const SET_BANK = "setBank";
export const SET_ERROR = "serError";

const state = {
  errors: null,
  banks: {}
};

const getters = {
  banks(state) {
    return state.banks;
  }
};

const actions = {
  [GET_BANK](context) {
    if (JwtService.getToken()) {
      // ApiService.setHeader();
      ApiService.get("HesapOzet/getbankalar")
        .then(({ data }) => {
          context.commit(SET_BANK, data);
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, response.data.errors);
        });
    }
  }
};

const mutations = {
  [SET_ERROR](state, error) {
    state.errors = error;
  },
  [SET_BANK](state, banks) {
    state.banks = banks;
    state.errors = {};
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
