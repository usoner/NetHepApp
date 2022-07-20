import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "@/core/services/store";
import ApiService from "@/core/services/api.service";
// import MockService from "@/core/mock/mock.service";
import { VERIFY_AUTH } from "@/core/services/store/auth.module";
import { RESET_LAYOUT_CONFIG } from "@/core/services/store/config.module";
// Global 3rd party plugins
import "popper.js";
import "tooltip.js";
import PerfectScrollbar from "perfect-scrollbar";
import ClipboardJS from "clipboard";
// Vue 3rd party plugins
import vuetify from "@/core/plugins/vuetify";
import "@/core/plugins/portal-vue";
import "@/core/plugins/bootstrap-vue";
import "@/core/plugins/perfect-scrollbar";
import "@/core/plugins/highlight-js";
import "@/core/plugins/inline-svg";
import "@/core/plugins/apexcharts";
import "@/core/plugins/metronic";
import "@mdi/font/css/materialdesignicons.css";
import moment from "moment";

import wb from "./registerServiceWorker";

import interceptorsSetup from "./core/services/store/interceptors";

Vue.config.productionTip = false;

window.PerfectScrollbar = PerfectScrollbar;
window.ClipboardJS = ClipboardJS;

Vue.prototype.$workbox = wb;

// API service init
ApiService.init();

router.beforeEach((to, from, next) => {
  // Ensure we checked auth before each page load.
  Promise.all([store.dispatch(VERIFY_AUTH)]).then(next);

  // reset config to initial state
  store.dispatch(RESET_LAYOUT_CONFIG);

  // Scroll page to top on every route change
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 100);
});

Vue.mixin({
  methods: {
    getTotal(data, sumColName) {
      let total = [];

      // eslint-disable-next-line no-unused-vars
      Object.entries(data).forEach(([key, val]) => {
        if (val[sumColName]) {
          total.push(val[sumColName]);
        }
      });

      return total.reduce(function(total, num) {
        return total + num;
      }, 0);
    },
    addDays(theDate, days) {
      if (theDate) {
        return new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000);
      } else {
        return new Date(new Date().getTime() + days * 24 * 60 * 60 * 1000);
      }
    },
    formatDate: function(dt) {
      if (dt) {
        return moment(String(dt)).format("yyyy-MM-DD");
      }
    }
  },
  filters: {
    formatPrice: function(value) {
      if (value.toString().includes(",") === true) {
        return value;
      } else if (value !== 0) {
        let val = (value / 1).toFixed(2).replace(".", ",");
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " TL";
      } else {
        return "0 TL";
      }
    },
    dateToHour: function(value) {
      return moment(String(value)).format("HH:mm");
    },
    formatLongDate: function(value) {
      return (
        moment(String(value)).format("DD.MM.yyyy") +
        " " +
        moment(String(value)).format("HH:mm")
      );
    }
  }
});


interceptorsSetup()

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
