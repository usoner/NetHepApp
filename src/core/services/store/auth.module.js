import axios from "axios";

import ApiService from "@/core/services/api.service";
import JwtService from "@/core/services/jwt.service";

// action types
export const VERIFY_AUTH = "verifyAuth";
export const LOGIN = "login";
export const LOGOUT = "logout";
export const REGISTER = "register";
export const SET_USER = "setUser";
export const UPDATE_USER = "updateUser";

// mutation types
export const PURGE_AUTH = "logOut";
export const SET_AUTH = "setAuth";
export const SET_CURRENT_USER = "setCurrentUser";
export const SET_ERROR = "setError";

export const querystring = require("querystring");

// export const tokenURL = "https://nethesapp.com" + process.env.BASE_URL +"token";
export const tokenURL = "https://nethesapp.com/limakturizm/token";

const state = {
  errors: null,
  user: {},
  userCompanies: {},
  token: "",
  isAuthenticated: !!JwtService.getToken()
};

const getters = {
  currentUser(state) {
    return state.user;
  },
  userCompanies(state) {
    return state.userCompanies;
  },
  isAuthenticated(state) {
    return state.isAuthenticated;
  },
  getToken(state) {
    return state.token;
  }
};

const actions = {
  [LOGIN](context, credentials) {
    return new Promise(resolve => {
      axios
        .post(
          tokenURL,
          querystring.stringify({
            grant_type: "password",
            username: credentials.username,
            password: credentials.password
          }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Accept: "*/*"
            }
          }
        )
        .then(({ data }) => {
          context.commit(SET_AUTH, data);
          resolve(data);
        })
        .catch(response => {
          context.commit(SET_ERROR, response);
        });
    });
  },
  [SET_USER](context, credentials) {
    return new Promise(resolve => {
      ApiService.query("HesapOzet/KullaniciDogrula", credentials)
        .then(({ data }) => {
          context.commit(SET_CURRENT_USER, data);
          resolve(data);
        })
        .catch(response => {
          context.commit(SET_ERROR, response);
        });
    });
  },
  [LOGOUT](context) {
    context.commit(PURGE_AUTH);
  },
  [REGISTER](context, credentials) {
    return new Promise((resolve, reject) => {
      ApiService.post("users", { user: credentials })
        .then(({ data }) => {
          context.commit(SET_AUTH, data);
          resolve(data);
        })
        .catch(response => {
          context.commit(SET_ERROR, response);
          reject(response);
        });
    });
  },
  [VERIFY_AUTH](context) {
    if (context.getters.getToken !== "") {
      ApiService.setHeader();
      // ApiService.get("verify")
      //   .then(({ data }) => {
      //     context.commit(SET_AUTH, data);
      //  })
      //   .catch(response => {
      //     console.log(response);
      //    // context.commit(SET_ERROR, response.data.errors);
      //   });
    } else {
      context.commit(PURGE_AUTH);
    }
  },
  [UPDATE_USER](context, payload) {
    const { email, username, password, image, bio } = payload;
    const user = { email, username, bio, image };
    if (password) {
      user.password = password;
    }

    return ApiService.put("user", user).then(({ data }) => {
      context.commit(SET_AUTH, data);
      return data;
    });
  }
};

const mutations = {
  [SET_ERROR](state, error) {
    state.errors = error;
  },
  [SET_AUTH](state, token) {
    state.isAuthenticated = true;
    state.errors = null;
    state.token = token.access_token;
    JwtService.saveToken(token.access_token);
  },
  [SET_CURRENT_USER](state, user) {
    state.user = user.find(p => p.USTSIRKETID === null);
    state.userCompanies = user;
    state.errors = null;
  },
  [PURGE_AUTH](state) {
    state.isAuthenticated = false;
    state.user = {};
    state.errors = null;
    JwtService.destroyToken();
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
