<template>
  <v-app>
    <transition name="fade-in-up">
      <div>
        <b-alert
          show
          variant="light"
          class="alert alert-custom alert-white alert-shadow fade show gutter-b"
        >
          <div class="alert-icon">
            <span class="svg-icon svg-icon-lg">
              <inline-svg src="media/svg/icons/Tools/Compass.svg" />
            </span>
          </div>
          <div class="alert-text">
            Lütfen bildirim ayarlarınızı giriniz
          </div>
        </b-alert>

        <v-snackbar v-model="snackbar" absolute bottom right color="success">
          <span>Kayıt işlemi başarılı şekilde gerçekleşti!</span>
          <v-icon dark>mdi-checkbox-marked-circle</v-icon>
        </v-snackbar>

        <KTCard ref="backNotification">
          <template v-slot:body>
            <div>
              <v-form ref="form" v-model="code1.valid" lazy-validation>
                <div class="row">
                  <div class="col-md-12">
                    <v-select
                      v-model="code1.bankId"
                      :items="code1.items"
                      :rules="[
                        v => !!v || 'Banka bilgisini seçmeniz gerekmektedir'
                      ]"
                      label="Banka Seçiniz.."
                      required
                    ></v-select>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6">
                    <v-text-field
                      v-model="code1.name"
                      label="Karşı Ünvan & Ad Soyad"
                    ></v-text-field>
                  </div>
                  <div class="col-md-6">
                    <v-text-field
                      v-model="code1.amount"
                      :rules="code1.amountRules"
                      label="Tutar"
                      type="number"
                      required
                    ></v-text-field>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-12">
                    <v-radio-group row v-model="code1.accountIn">
                      <v-radio label="Hesaba Giriş" value="1"> </v-radio>
                      <v-radio label="Hesaptan Çıkış" value="0"> </v-radio>
                    </v-radio-group>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-3">
                    <v-switch
                      v-model="code1.sendSms"
                      label="Sms Gönderilsin"
                    ></v-switch>
                  </div>
                  <div class="col-md-4">
                    <v-text-field
                      v-model="code1.phoneNumber"
                      :rules="code1.phoneNumberRules"
                      label="Telefon Numarası"
                      v-if="code1.sendSms"
                    ></v-text-field>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-3">
                    <v-switch
                      v-model="code1.sendMail"
                      label="E-mail Gönderilsin"
                    ></v-switch>
                  </div>
                  <div class="col-md-4">
                    <v-text-field
                      v-model="code1.email"
                      :rules="code1.emailRules"
                      label="E-mail"
                      v-if="code1.sendMail"
                    ></v-text-field>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-4 col-sm-12">
                    <span>Bildirim Geçerlilik Tarihi</span>
                    <v-date-picker
                      v-model="code1.expDate"
                      :rules="code1.expDateRules"
                      locale="tr"
                      full-width
                    ></v-date-picker>
                  </div>
                </div>

                <v-btn
                  :disabled="!code1.valid"
                  color="success"
                  class="mr-4"
                  @click="validate"
                >
                  Kaydet
                </v-btn>

                <v-btn color="error" class="mr-4" @click="reset">
                  Temizle
                </v-btn>
              </v-form>
            </div>
          </template>
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
import { GET_BANK_TOTAL_AMOUNT } from "@/core/services/store/bankaccount.module";
import { ADD_BANK_NOTIFICATION } from "@/core/services/store/banknotification.module";

export default {
  name: "BildirimAyarlari",
  data() {
    return {
      code1: {
        valid: true,
        name: "",
        email: "",
        emailRules: [
          v =>
            (!!v && this.code1.sendMail) ||
            "E-mail bilgisini girmeniz gerekmektedir",
          v => /.+@.+\..+/.test(v) || "Geçersiz E-mail bilgisi girdiniz"
        ],
        amount: "",
        amountRules: [v => !!v || "Tutar bilgisini girmeniz gerekmektedir"],
        phoneNumber: "",
        phoneNumberRules: [
          v =>
            (!!v && this.code1.sendSms) ||
            "Telefon bilgisini girmeniz gerekmektedir",
          v =>
            /^[2-9]\d{2}\d{3}\d{4}$/.test(v) ||
            "Geçersiz telefon bilgisi girdiniz"
        ],
        bankId: null,
        items: [],
        accountIn: "1",
        sendSms: false,
        sendMail: false,
        expDate: this.formatDate(new Date()),
        expDateRules: [v => !!v || "Tarih bilgisini girmeniz gerekmektedir"]
      },
      title: "Bize Ulaşın",
      hasTitleSlot: false,
      optBank: [{ value: null, text: "Banka Seçiniz" }],
      snackbar: false
    };
  },
  components: {
    KTCard
  },
  methods: {
    validate() {
      if (this.code1.sendMail && this.code1.email.trim() === "") {
        return;
      }

      if (this.$refs.form.validate()) {
        this.snackbar = true;
        const selectedBank = this.bankTotalAmount.find(
          p =>
            p.SIRKETADI + "-" + p.BANKAADI + "-" + p.HESAPNO ===
            this.code1.bankId
        );

        const data = {
          DURUM: 1,
          KULLANICIID: this.currentUser.KULLANICIID,
          SIRKETHESAPID: selectedBank.SIRKETHESAPID,
          ISLEMSECIMTIPI: this.code1.accountIn,
          KARSIADSOYAD: this.code1.name,
          TUTAR: +this.code1.amount,
          EMAIL: this.code1.sendMail ? this.code1.email : "",
          CEPTELEFONU: this.code1.sendSms ? this.code1.phoneNumber : "",
          EXPIRESON: this.code1.expDate,
          OPTIME: this.formatDate(new Date())
        };

        this.$store.dispatch(ADD_BANK_NOTIFICATION, data);
        this.reset();
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    setBankData: function() {
      if (this.bankTotalAmount && this.bankTotalAmount.length > 0) {
        for (let key in this.bankTotalAmount) {
          const item = this.bankTotalAmount[key];

          this.code1.items.push(
            item.SIRKETADI + "-" + item.BANKAADI + "-" + item.HESAPNO
          );
        }
      }
    },
    getBankTotalAmounts() {
      this.$store.dispatch(GET_BANK_TOTAL_AMOUNT, this.bankParams);
    }
  },
  mounted() {
    this.getBankTotalAmounts();
    this.setBankData();
    this.$store.dispatch(SET_BREADCRUMB, [{ title: "Bildirim Ayarları" }]);
  },
  computed: {
    ...mapGetters(["currentUser", "bankTotalAmount"]),
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
