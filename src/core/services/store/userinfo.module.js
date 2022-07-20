import ApiService from "@/core/services/api.service";
import JwtService from "@/core/services/jwt.service";

// action types
export const UPDATE_USER_INFO = "updateUserInfo";
export const UPDATE_PASSWORD = "updatePassword";

// mutation types
export const SET_ERROR = "setError";

const state = {
  errors: null,
}

const actions = {
  [UPDATE_USER_INFO](context, params) {
    if(JwtService.getToken()) {
      ApiService.update(
        "HesapOzet", 
        "PutKullanici?p_nKullaniciID=" + params.KULLANICIID,
        params
      ).catch(({res}) => {
        context.commit(SET_ERROR, res.data.errors);
      });
    }
  },
  [UPDATE_PASSWORD](context, params) {
    if(JwtService.getToken()) {
      ApiService.update(
        "HesapOzet", 
        "PutKullanici?p_nKullaniciID=" + params.KULLANICIID,
        params
      ).catch(({res}) => {
        context.commit(SET_ERROR, res.data.errors);
      });
    }
  }
};

const mutations = {
  [SET_ERROR](state, error) {
    state.errors = error;
  }
};

export default {
  state,
  actions,
  mutations
};