import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  base: process.env.PUBLIC_URL,
  routes: [
    {
      path: "/",
      redirect: "/dashboard",
      component: () => import("@/view/layout/Layout"),
      children: [
        {
          path: "/dashboard",
          name: "dashboard",
          component: () => import("@/view/pages/Dashboard.vue")
        },
        {
          path: "/dashboard-report/:id/:bankId",
          name: "dashboard-report",
          component: () => import("@/view/pages/DashboardReport.vue")
        },
        {
          path: "/hesap-hareketleri/:bankId/:compId",
          name: "hesap-hareketleri",
          component: () =>
            import("@/view/pages/banka-hesap/HesapHareketleri.vue")
        },
        {
          path: "/hesap-bakiye-bilgileri",
          name: "hesap-bakiye-bilgileri",
          component: () =>
            import("@/view/pages/banka-hesap/HesapBakiyeBilgileri.vue")
        },
        {
          path: "/bize-ulasin",
          name: "bize-ulasin",
          component: () => import("@/view/pages/GeriBildirim.vue")
        },
        {
          path: "/bildirim-ayarlari",
          name: "bildirim-ayarlari",
          component: () =>
            import("@/view/pages/banka-bildirim/BildirimAyarlari.vue")
        },
        {
          path: "/banka-bildirim-liste",
          name: "banka-bildirim-liste",
          component: () =>
            import("@/view/pages/banka-bildirim/BankaBildirimListe.vue")
        },
        {
          path: "/banka-bildirim-guncelleme/:id",
          name: "banka-bildirim-guncelleme",
          component: () =>
            import("@/view/pages/banka-bildirim/BankaBildirimGuncelleme.vue")
        },
        {
          path: "/edit-user-info",
          name: "edit-user-info",
          component: () =>
            import("@/view/pages/edit-user-info/EditUserInfo.vue")
        },
        {
          path: "/sirket-hesap-ayarlari",
          name: "sirket-hesap-ayarlari",
          component: () =>
              import("@/view/pages/banka-hesap/SirketHesapBilgileri.vue")
        },
        {
          path: "/sirket-hesap-guncelle/:compAccountId",
          name: "sirket-hesap-guncelle",
          component: () =>
              import("@/view/pages/banka-hesap/SirketHesapGuncelle.vue")
        },
      ]
    },
    {
      path: "/error",
      name: "error",
      component: () => import("@/view/pages/error/Error.vue"),
      children: [
        {
          path: "error-1",
          name: "error-1",
          component: () => import("@/view/pages/error/Error-1.vue")
        }
      ]
    },
    {
      path: "/",
      component: () => import("@/view/pages/auth/Auth"),
      children: [
        {
          name: "login",
          path: "/login",
          component: () => import("@/view/pages/auth/Login")
        },
        {
          name: "register",
          path: "/register",
          component: () => import("@/view/pages/auth/Register")
        }
      ]
    },
    {
      path: "*",
      redirect: "/404"
    },
    {
      // the 404 route, when none of the above matches
      path: "/404",
      name: "404",
      component: () => import("@/view/pages/error/Error-1.vue")
    }
  ]
});
