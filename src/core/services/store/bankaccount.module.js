import ApiService from "@/core/services/api.service";
import JwtService from "@/core/services/jwt.service";

// action types
export const GET_BANK_ACCOUNT = "getBankAccount";
export const GET_BANK_ACCOUNT_FILTER = "getBankAccountFilter";
export const GET_BANK_ACCOUNT_PIE = "getBankAccountPie";
export const GET_BANK_ACCOUNT_OUT_PIE = "getBankAccountOutPie";
export const GET_BANK_TOTAL_AMOUNT = "getBankTotalAmount";
export const GET_BANK_ACCOUNT_NUMBER = "getBankAccountNumber";
export const GET_COMPANY_BANK = "getCompanyBank";
export const UPDATE_COMPANY_BANK = "updateCompanyBank";

// mutation types
export const SET_BANK_ACCOUNT = "setBankAccount";
export const SET_BANK_ACCOUNT_PIE = "setBankAccountPie";
export const SET_BANK_ACCOUNT_OUT_PIE = "setBankAccountOutPie";
export const SET_BANK_TOTAL_AMOUNT = "setBankTotalAmount";
export const SET_BANK_ACCOUNT_NUMBER = "setBankAccountNumber";
export const SET_COMPANY_BANK = "setCompanyBank";
export const SET_ERROR = "serError";

const state = {
  errors: null,
  bankAccounts: {},
  bankAccountPieData: {},
  bankAccountPieOutData: {},
  bankTotalAmount: {},
  bankAccountNumbers: {},
  companyBanks: {}
};

const getters = {
  bankAccounts(state) {
    return state.bankAccounts;
  },
  bankAccountPieData(state) {
    return state.bankAccountPieData;
  },
  bankAccountPieOutData(state) {
    return state.bankAccountPieOutData;
  },
  bankTotalAmount(state) {
    return state.bankTotalAmount;
  },
  bankAccountNumbers(state) {
    return state.bankAccountNumbers;
  },
  companyBanks(state) {
    return state.companyBanks;
  }
};

const actions = {
  [GET_BANK_ACCOUNT](context) {
    if (JwtService.getToken()) {
      // ApiService.setHeader();
      ApiService.get("HesapOzet/GetHareketler")
        .then(({ data }) => {
          context.commit(SET_BANK_ACCOUNT, data);
        })
        .catch(err => {
          context.commit(SET_ERROR, err);
        });
    }
  },
  [GET_BANK_ACCOUNT_FILTER](context, params) {
    if (JwtService.getToken()) {
      // ApiService.setHeader();

      ApiService.query("HesapOzet/GetHareketlerwithParams", params)
        .then(({ data }) => {
          context.commit(SET_BANK_ACCOUNT, data);
        })
        .catch(err => {
          context.commit(SET_ERROR, err);
        });
    }
  },
  [GET_BANK_ACCOUNT_PIE](context, params) {
    if (JwtService.getToken()) {
      // ApiService.setHeader();
      ApiService.query("HesapOzet/BankaBazliDagilimOzetGetir", params)
        .then(({ data }) => {
          context.commit(SET_BANK_ACCOUNT_PIE, data);
        })
        .catch(err => {
          context.commit(SET_ERROR, err);
        });
    }
  },
  [GET_BANK_ACCOUNT_OUT_PIE](context, params) {
    if (JwtService.getToken()) {
      // ApiService.setHeader();
      ApiService.query("HesapOzet/BankaBazliDagilimOzetGetir", params)
        .then(({ data }) => {
          context.commit(SET_BANK_ACCOUNT_OUT_PIE, data);
        })
        .catch(err => {
          context.commit(SET_ERROR, err);
        });
    }
  },
  [GET_BANK_TOTAL_AMOUNT](context, params) {
    if (JwtService.getToken()) {
      // ApiService.setHeader();
      ApiService.query("HesapOzet/KullaniciHesapBakiyeleri", params)
        .then(({ data }) => {
          context.commit(SET_BANK_TOTAL_AMOUNT, data);
        })
        .catch(err => {
          context.commit(SET_ERROR, err);
        });
    }
  },
  [GET_BANK_ACCOUNT_NUMBER](context, params) {
    if (JwtService.getToken()) {
      // ApiService.setHeader();
      ApiService.query("HesapOzet/SirketHesapGetir", params)
        .then(({ data }) => {
          context.commit(SET_BANK_ACCOUNT_NUMBER, data);
        })
        .catch(err => {
          context.commit(SET_ERROR, err);
        });
    }
  },
  [GET_COMPANY_BANK](context, params) {
    if (JwtService.getToken()) {
      // ApiService.setHeader();
      ApiService.query("HesapOzet/GetSirketHesap", params)
        .then(({ data }) => {
          context.commit(SET_COMPANY_BANK, data);
        })
        .catch(err => {
          context.commit(SET_ERROR, err);
        });
    }
  },
  [UPDATE_COMPANY_BANK](context, params) {
    if (JwtService.getToken()) {
      // ApiService.setHeader();

      ApiService.put(
        "HesapOzet/PutSirketHesap?p_nSirketHesapID=" + params.SIRKETHESAPID,
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
  [SET_BANK_ACCOUNT](state, accounts) {
    state.bankAccounts = accounts;
    state.errors = {};
  },
  [SET_BANK_ACCOUNT_PIE](state, accounts) {
    state.bankAccountPieData = accounts;
    state.errors = {};
  },
  [SET_BANK_ACCOUNT_OUT_PIE](state, accounts) {
    state.bankAccountPieOutData = accounts;
    state.errors = {};
  },
  [SET_BANK_TOTAL_AMOUNT](state, totalAmounts) {
    state.bankTotalAmount = totalAmounts;
    state.errors = {};
  },
  [SET_BANK_ACCOUNT_NUMBER](state, bankNumbers) {
    state.bankAccountNumbers = bankNumbers;
    state.errors = {};
  },
  [SET_COMPANY_BANK](state, companyBanks) {
    state.companyBanks = companyBanks;
    state.errors = {};
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
