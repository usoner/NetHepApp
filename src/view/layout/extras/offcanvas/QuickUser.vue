<template>
  <div class="topbar-item" v-if="currentUser && currentUser.AD">
    <div
      class="btn btn-icon w-auto btn-clean d-flex align-items-center btn-lg px-2"
      id="kt_quick_user_toggle"
    >
      <span
        class="text-muted font-weight-bold font-size-base d-none d-md-inline mr-1"
      >
        Merhaba,
      </span>
      <span
        class="text-dark-50 font-weight-bolder font-size-base d-none d-md-inline mr-3"
      >
        {{ currentUser.AD }}
      </span>
      <span class="symbol symbol-35 symbol-light-success">
        <img v-if="false" alt="Pic" :src="picture" />
        <span v-if="true" class="symbol-label font-size-h5 font-weight-bold">
          {{ currentUser.AD.toString().substring(0, 1)
          }}{{ currentUser.SOYAD.toString().substring(0, 1) }}
        </span>
      </span>
    </div>

    <div
      id="kt_quick_user"
      ref="kt_quick_user"
      class="offcanvas offcanvas-right p-10"
    >
      <!--begin::Header-->
      <div
        class="offcanvas-header d-flex align-items-center justify-content-between pb-5"
      >
        <h3 class="font-weight-bold m-0">
          Kullanıcı Bilgileri
        </h3>
        <a
          href="#"
          class="btn btn-xs btn-icon btn-light btn-hover-primary"
          id="kt_quick_user_close"
        >
          <i class="ki ki-close icon-xs text-muted"></i>
        </a>
      </div>
      <!--end::Header-->

      <!--begin::Content-->
      <perfect-scrollbar
        class="offcanvas-content pr-5 mr-n5 scroll"
        style="max-height: 90vh; position: relative;"
      >
        <!--begin::Header-->
        <div class="d-flex align-items-center mt-5">
          <div class="symbol symbol-100 mr-5">
            <img class="symbol-label" :src="picture" alt="" />
            <i class="symbol-badge bg-success"></i>
          </div>
          <div class="d-flex flex-column">
            <a
              href="#"
              class="font-weight-bold font-size-h5 text-dark-75 text-hover-primary"
            >
              {{ currentUser.AD }} {{ currentUser.SOYAD }}
            </a>
            <div class="text-muted mt-1">{{ currentUser.UNVAN }}</div>
            <div class="navi mt-2">
              <a href="#" class="navi-item">
                <span class="navi-link p-0 pb-2">
                  <span class="navi-icon mr-1">
                    <span class="svg-icon svg-icon-lg svg-icon-primary">
                      <!--begin::Svg Icon-->
                      <inline-svg
                        src="media/svg/icons/Communication/Mail-notification.svg"
                      />
                      <!--end::Svg Icon-->
                    </span>
                  </span>
                  <span class="navi-text text-muted text-hover-primary">
                    {{ currentUser.EMAIL }}
                  </span>
                </span>
              </a>
            </div>
            <button class="btn btn-light-primary btn-bold" @click="onLogout">
              Çıkış Yap
            </button>
          </div>
        </div>
        <!--end::Header-->
        <div class="separator separator-dashed mt-8 mb-5"></div>
        <!--begin::Nav-->
        <div class="navi navi-spacer-x-0 p-0">
          <!--begin::Item-->
          <router-link
            to="/edit-user-info"
            @click.native="closeOffcanvas"
            href="#"
            class="navi-item"
          >
            <div class="navi-link">
              <div class="symbol symbol-40 bg-light mr-3">
                <div class="symbol-label">
                  <span class="svg-icon svg-icon-md svg-icon-success">
                    <!--begin::Svg Icon-->
                    <inline-svg src="media/svg/icons/Communication/Write.svg" />
                    <!--end::Svg Icon-->
                  </span>
                </div>
              </div>
              <div class="navi-text">
                <div class="font-weight-bold">Kullanıcı Ayarları</div>
                <div class="text-muted">
                  Hesap bilgileri ve diğer ayarlar
                </div>
              </div>
            </div>
          </router-link>
          <!--end:Item-->

          <!--begin::Item-->
          <router-link
            to="/sirket-hesap-ayarlari"
            @click.native="closeOffcanvas"
            href="#"
            class="navi-item"
          >
            <div class="navi-link">
              <div class="symbol symbol-40 bg-light mr-3">
                <div class="symbol-label">
                  <span class="svg-icon svg-icon-md svg-icon-info">
                    <!--begin::Svg Icon-->
                    <inline-svg src="media/svg/icons/Communication/Safe-chat.svg" />
                    <!--end::Svg Icon-->
                  </span>
                </div>
              </div>
              <div class="navi-text">
                <div class="font-weight-bold">Şirket Hesap Ayarları</div>
                <div class="text-muted">
                  Şirket hesap bilgileri ve diğer ayarlar
                </div>
              </div>
            </div>
          </router-link>
          <!--end:Item-->

          <!--begin::Item-->
          <router-link
            to="/banka-bildirim-liste"
            @click.native="closeOffcanvas"
            href="#"
            class="navi-item"
          >
            <div class="navi-link">
              <div class="symbol symbol-40 bg-light mr-3">
                <div class="symbol-label">
                  <span class="svg-icon svg-icon-md svg-icon-warning">
                    <!--begin::Svg Icon-->
                    <inline-svg
                      src="media/svg/icons/General/Notification2.svg"
                    />
                    <!--end::Svg Icon-->
                  </span>
                </div>
              </div>
              <div class="navi-text">
                <div class="font-weight-bold">Bildirim Ayarları</div>
                <div class="text-muted">Bildirim ve mesajlar</div>
              </div>
            </div>
          </router-link>
          <!--end:Item-->
          <!--begin::Item-->
          <router-link
            to="/"
            @click.native="closeOffcanvas"
            href="#"
            class="navi-item"
          >
            <div class="navi-link">
              <div class="symbol symbol-40 bg-light mr-3">
                <div class="symbol-label">
                  <span class="svg-icon svg-icon-md svg-icon-danger">
                    <!--begin::Svg Icon-->
                    <inline-svg src="media/svg/icons/Files/Selected-file.svg" />
                    <!--end::Svg Icon-->
                  </span>
                </div>
              </div>
              <div class="navi-text">
                <div class="font-weight-bold">Son İşlemler</div>
                <div class="text-muted">Log kayıtları</div>
              </div>
            </div>
          </router-link>
          <!--end:Item-->
          <!--begin::Item-->
          <div class="navi-item" id="show-btn" @click="showModal">
            <div class="navi-link">
              <div class="symbol symbol-40 bg-light mr-3">
                <div class="symbol-label">
                  <span class="svg-icon svg-icon-md svg-icon-info">
                    <!--begin::Svg Icon-->
                    <inline-svg src="media/svg/icons/Home/Key.svg" />
                    <!--end::Svg Icon-->
                  </span>
                </div>
              </div>
              <div class="navi-text">
                <div class="font-weight-bold">Şifre Değiştir</div>
                <div class="text-muted">Şifre Değiştir</div>
              </div>
            </div>
          </div>
          <!--end:Item-->
        </div>
        <!--end::Nav-->
        <div class="separator separator-dashed my-7"></div>
        <!--begin::Notifications-->
        <div>
          <!--begin:Heading-->
          <h5 class="mb-5">Son Bildirimler</h5>
          <!--end:Heading-->
          <template v-for="(item, i) in list">
            <!--begin::Item -->
            <div
              class="d-flex align-items-center rounded p-5 gutter-b"
              v-bind:class="`bg-light-${item.type}`"
              v-bind:key="i"
            >
              <span
                class="svg-icon mr-5"
                v-bind:class="`svg-icon-${item.type}`"
              >
                <span class="svg-icon svg-icon-lg">
                  <!--begin::Svg Icon-->
                  <inline-svg :src="item.svg" />
                  <!--end::Svg Icon-->
                </span>
              </span>
              <div class="d-flex flex-column flex-grow-1 mr-2">
                <a
                  href="#"
                  class="font-weight-normal text-dark-75 text-hover-primary font-size-lg mb-1"
                >
                  {{ item.title }}
                </a>
                <span class="text-muted font-size-sm">
                  {{ item.desc }}
                </span>
              </div>
              <span
                class="font-weight-bolder py-1 font-size-lg"
                v-bind:class="`text-${item.type}`"
              >
                {{ item.alt | formatPrice }}
              </span>
            </div>
            <!--end::Item -->
          </template>

          <template v-if="bankNotifications.length > 1">
            <router-link
              to="/banka-bildirim-liste"
              @click.native="closeOffcanvas"
              href="#"
              class="navi-item"
            >
              Tüm Bildirimler
            </router-link>
          </template>
        </div>
        <!--end::Notifications-->
      </perfect-scrollbar>
      <!--end::Content-->
    </div>

    <div>
      <b-modal ref="my-modal" hide-footer title="Şifre Güncelleme">
        <div class="d-block text-center">
          <v-form ref="form" v-model="userData.valid" lazy-validation>
            <div class="row">
              <div class="col-md-12">
                <v-text-field
                  v-model="userData.oldPassword"
                  label="Mevcut Şifre"
                  required
                  :rules="rules.oldPasswordRules"
                />
              </div>
              <div class="col-md-12">
                <v-text-field
                  v-model="userData.newPassword"
                  label="Yeni Şifre"
                  required
                  :rules="rules.newPasswordRules"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-md-5 offset-md-1">
                <b-button
                  :disabled="!userData.valid"
                  variant="outline-danger"
                  @click="hideModal"
                  block
                >
                  Vazgeç
                </b-button>
              </div>
              <div class="col-md-5">
                <b-button
                  variant="info"
                  class="mr-4"
                  @click="savePassword"
                  block
                >
                  Kaydet
                </b-button>
              </div>
            </div>
          </v-form>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<style lang="scss">
@import "../../../../../node_modules/vuetify/dist/vuetify.css";
</style>

<style lang="scss" scoped>
#kt_quick_user {
  overflow: hidden;
}
</style>

<script>
import { LOGOUT } from "@/core/services/store/auth.module";
import { mapGetters } from "vuex";

import KTLayoutQuickUser from "@/assets/js/layout/extended/quick-user.js";
import KTOffcanvas from "@/assets/js/components/offcanvas.js";
import { GET_BANK_NOTIFICATION } from "@/core/services/store/banknotification.module";

export default {
  name: "KTQuickUser",
  data() {
    return {
      list: [],
      userData: {
        valid: true,
        oldPassword: "",
        newPassword: ""
      },
      rules: {
        oldPasswordRules: [
          v => !!v || "Mevcut şifre bilgisini boş bırakamazsınız"
        ],
        newPasswordRules: [
          v => !!v || "Yeni şifre bilgisini boş bırakamazsınız"
        ]
      }
    };
  },
  mounted() {
    // Init Quick User Panel
    KTLayoutQuickUser.init(this.$refs["kt_quick_user"]);
    this.getBankNotifications();
  },
  watch: {
    bankNotifications: function() {
      this.setBankNotification();
    }
  },
  methods: {
    onLogout() {
      this.$store
        .dispatch(LOGOUT)
        .then(() => this.$router.push({ name: "login" }));
    },
    closeOffcanvas() {
      new KTOffcanvas(KTLayoutQuickUser.getElement()).hide();
    },
    getBankNotifications() {
      this.$store.dispatch(GET_BANK_NOTIFICATION, this.bankParams);
    },
    setBankNotification() {
      this.list = [];

      if (this.bankNotifications && this.bankNotifications.length > 0) {
        for (let key in this.bankNotifications) {
          if (key < 3) {
            this.list.push({
              title: this.bankNotifications[key].KARSIADSOYAD,
              desc:
                this.bankNotifications[key].ISLEMSECIMTIPI === 1
                  ? "Hesaba Giren"
                  : "Hesaptan Çıkan",
              alt: this.bankNotifications[key].TUTAR,
              svg:
                this.bankNotifications[key].ISLEMSECIMTIPI === 1
                  ? "media/svg/icons/Home/Library.svg"
                  : "media/svg/icons/General/Attachment2.svg",
              type:
                this.bankNotifications[key].ISLEMSECIMTIPI === 1
                  ? "success"
                  : "danger"
            });
          } else {
            break;
          }
        }
      }
    },
    showModal() {
      this.$refs["my-modal"].show();
    },
    hideModal() {
      this.$refs["my-modal"].hide();
    },
    savePassword() {
      this.$refs["my-modal"].hide();
    }
  },
  computed: {
    ...mapGetters(["currentUser", "bankNotifications"]),
    picture() {
      return process.env.BASE_URL + "media/users/default.jpg";
    },
    bankParams() {
      return {
        params: {
          p_nKullaniciID: this.currentUser.KULLANICIID
        }
      };
    }
  }
};
</script>
