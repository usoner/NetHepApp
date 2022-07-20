<template>
  <v-app>
    <transition name="fade-in-up">
      <div>
        <KTCard title="Kullanıcı Bilgileri">
          <!--begin::Body-->
          <template v-slot:body>
            <div>
              <v-form ref="form" v-model="userData.valid" lazy-validation>
                <div class="row">
                  <div class="col-md-6">
                    <v-text-field
                      v-model="userData.firstName"
                      label="Ad"
                      required
                      :rules="rules.firstNameRules"
                    />
                  </div>
                  <div class="col-md-6">
                    <v-text-field
                      v-model="userData.lastName"
                      label="Soyad"
                      required
                      :rules="rules.lastNameRules"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <v-text-field
                      v-model="userData.title"
                      label="Ünvan"
                      required
                      :rules="rules.titleRules"
                    />
                  </div>
                  <div class="col-md-6">
                    <v-text-field
                      v-model="userData.email"
                      label="E-mail"
                      required
                      :rules="rules.emailRules"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <v-text-field
                      v-model="userData.landlineNumber"
                      label="Sabit Telefon Numarası"
                      required
                      :rules="rules.landlineNumberRules"
                    />
                  </div>
                  <div class="col-md-6">
                    <v-text-field
                      v-model="userData.cellNumber"
                      :rules="rules.cellNumberRules"
                      label="Cep Telefonu Numarası"
                      required
                    />
                  </div>
                </div>

                <v-btn
                  :disabled="!userData.valid"
                  color="success"
                  class="mr-4"
                  @click="submit"
                >
                  Kaydet
                </v-btn>
                <v-btn color="error" class="mr-4" @click="reset">
                  Sıfırla
                </v-btn>
              </v-form>
            </div>
          </template>
          <!--end::Body-->
        </KTCard>
      </div>
    </transition>
  </v-app>
</template>

<style lang="scss">
@import "../../../../node_modules/vuetify/dist/vuetify.css";

.theme--light.v-application {
  background: transparent !important;
}
.v-application code {
  box-shadow: none !important;
}
.v-label {
  top: 5px;
}
.v-list-item .v-input:last-child {
  margin-left: 10px;
}
</style>

<script>
import KTCard from "@/view/content/Card.vue";
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";
import { mapGetters } from "vuex";
import { UPDATE_USER_INFO } from "@/core/services/store/userinfo.module";
import { LOGOUT } from "@/core/services/store/auth.module";

export default {
  name: "EditUser",
  data() {
    return {
      userData: {
        valid: true,
        firstName: "",
        lastName: "",
        title: "",
        email: "",
        cellNumber: "",
        landlineNumber: ""
      },
      rules: {
        firstNameRules: [
          v => !!v || "Ad bilgisini boş bırakamazsınız",
          v =>
            /^[a-zA-Z ıİğĞüÜşŞöÖçÇ]+$/.test(v) || "Geçersiz ad bilgisi girdiniz"
        ],
        lastNameRules: [
          v => !!v || "Soyad bilgisini boş bırakamazsınız",
          v =>
            /^[a-zA-Z ıİğĞüÜşŞöÖçÇ]+$/.test(v) ||
            "Geçersiz soyad bilgisi girdiniz"
        ],
        titleRules: [
          v => !!v || "Ünvan bilgisini boş bırakamazsınız",
          v =>
            /^[a-zA-Z ıİğĞüÜşŞöÖçÇ]+$/.test(v) ||
            "Geçersiz ünvan bilgisi girdiniz"
        ],
        emailRules: [
          v => !!v || "E-mail bilgisini girmeniz gerekmektedir",
          v => /.+@.+\..+/.test(v) || "Geçersiz E-mail bilgisi girdiniz"
        ],
        cellNumberRules: [
          v => !!v || "Telefon bilgisini girmeniz gerekmektedir",
          v =>
            /^[2-9]\d{2}\d{3}\d{4}$/.test(v) ||
            "Geçersiz cep telefon bilgisi girdiniz"
        ],
        landlineNumberRules: [
          v => !!v || "Sabit hat bilgisini girmeniz gerekmektedir",
          v =>
            /^[2-9]\d{2}\d{3}\d{4}$/.test(v) ||
            "Geçersiz sabit telefon bilgisi girdiniz"
        ]
      }
    };
  },
  methods: {
    submit() {
      const data = {
        AD: this.userData.firstName,
        SOYAD: this.userData.lastName,
        UNVAN: this.userData.title,
        EMAIL: this.userData.email,
        CEPTELEFONU: this.userData.cellNumber,
        SABITTELEFON: this.userData.landlineNumber,
        // You need to initialize values that does not require an update as well. Otherwise, put function also updates them to NULL
        ACCOUNTDURUM: this.currentUser.ACCOUNTDURUM,
        AKTIFMI: this.currentUser.AKTIFMI,
        EXPIRESON: this.currentUser.EXPIRESON,
        KULLANICIID: this.currentUser.KULLANICIID,
        LOGINNAME: this.currentUser.LOGINNAME,
        OLDPASSWORD: this.currentUser.OLDPASSWORD,
        OPTIME: this.currentUser.OPTIME,
        PASSWORD: this.currentUser.PASSWORD,
        SECURITYTOKEN: this.currentUser.SECURITYTOKEN
      };

      this.$store.dispatch(UPDATE_USER_INFO, data).then(() => {
        this.$store.dispatch(LOGOUT).then(() => {
          this.$router.push({ name: "login" });
        });
      });
    },
    setUserData() {
      this.userData.firstName = this.currentUser.AD;
      this.userData.lastName = this.currentUser.SOYAD;
      this.userData.title = this.currentUser.UNVAN;
      this.userData.email = this.currentUser.EMAIL;
      this.userData.cellNumber = this.currentUser.CEPTELEFONU;
      this.userData.landlineNumber = this.currentUser.SABITTELEFON;
    },
    reset() {
      this.setUserData();
    }
  },
  components: {
    KTCard
  },
  mounted() {
    this.setUserData();
    this.$store.dispatch(SET_BREADCRUMB, [{ title: "Kullanıcı Ayarları" }]);
  },
  computed: {
    ...mapGetters(["currentUser"])
  }
};
</script>
