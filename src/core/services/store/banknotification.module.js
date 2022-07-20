import ApiService from "@/core/services/api.service";
import JwtService from "@/core/services/jwt.service";

// action types
export const GET_BANK_NOTIFICATION = "getBankNotification";
export const ADD_BANK_NOTIFICATION = "addBankNotification";
export const UPDATE_BANK_NOTIFICATION = "updateBankNotification";

// mutation types
export const SET_BANK_NOTIFICATION = "setBankNotification";
export const SET_ERROR = "serError";

const state = {
  errors: null,
  bankNotifications: {}
};

const getters = {
  bankNotifications(state) {
    return state.bankNotifications;
  }
};

const actions = {
  [GET_BANK_NOTIFICATION](context, params) {
    if (JwtService.getToken()) {
      // ApiService.setHeader();
      ApiService.query("HesapOzet/GetKullaniciBildirim", params)
        .then(({ data }) => {
          context.commit(SET_BANK_NOTIFICATION, data);
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, response.data.errors);
        });
    }
  },
  [ADD_BANK_NOTIFICATION](context, params) {
    if (JwtService.getToken()) {
      // ApiService.setHeader();

      ApiService.post("HesapOzet/PostKullaniciBildirim", params).catch(
        ({ response }) => {
          context.commit(SET_ERROR, response.data.errors);
        }
      );
    }
  },
  [UPDATE_BANK_NOTIFICATION](context, params) {
    if (JwtService.getToken()) {
      // ApiService.setHeader();

      ApiService.put(
        "HesapOzet/PutKullaniciBildirim?id=" + params.KULLANICIBILDIRIMID,
        params
      ).catch(({ response }) => {
        context.commit(SET_ERROR, response.data.errors);
      });
    }
  }
};

const mutations = {
  [SET_ERROR](state, error) {
    state.errors = error;
  },
  [SET_BANK_NOTIFICATION](state, bankNotifications) {
    state.bankNotifications = bankNotifications;
    state.errors = {};
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
