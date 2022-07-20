import Vue from "vue";
import Vuex from "vuex";

import auth from "./auth.module";
import bankAccount from "./bankaccount.module";
import bankNotification from "./banknotification.module";
import bank from "./bank.module";
import htmlClass from "./htmlclass.module";
import config from "./config.module";
import breadcrumbs from "./breadcrumbs.module";
import userInfo from "./userinfo.module";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    bankAccount,
    bankNotification,
    bank,
    htmlClass,
    config,
    breadcrumbs,
    userInfo
  }
});
