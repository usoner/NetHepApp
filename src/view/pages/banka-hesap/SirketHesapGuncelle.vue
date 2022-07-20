<template>
  <v-app>
    <transition name="fade-in-up">
      <div>
        <KTCard title="Şirket Hesap Bilgileri">
          <!--begin::Body-->
          <template v-slot:body>
            <div>
              <v-form
                ref="form"
                v-model="bankAccountData.valid"
                lazy-validation
              >
                <div class="row">
                  <div class="col-md-6">
                    <v-text-field
                      v-model="bankAccountData.bankaAdi"
                      label="Banka Adı"
                      disabled
                    />
                  </div>
                  <div class="col-md-6">
                    <v-text-field
                      v-model="bankAccountData.iban"
                      label="IBAN"
                      disabled
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <v-text-field
                      v-model="bankAccountData.musteriNo"
                      label="Müşteri No"
                      disabled
                    />
                  </div>
                  <div class="col-md-6">
                    <v-text-field
                      v-model="bankAccountData.hesapNo"
                      label="Hesap No"
                      disabled
                    />
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6">
                    <br />
                    <v-text-field
                      v-model="bankAccountData.hesapEkNo"
                      label="Ek Hesap No"
                      disabled
                    />
                  </div>
                  <div class="col-md-6">
                    Tahsilat Hesabı Mı?
                    <v-radio-group
                      row
                      v-model="bankAccountData.tahsilatHesabiMi"
                    >
                      <v-radio label="Evet" value="1"> </v-radio>
                      <v-radio label="Hayır" value="0"> </v-radio>
                    </v-radio-group>
                  </div>
                </div>

                <div class="row text-right">
                  <div class="col-md-12">
                    <v-btn color="error" class="mr-4" @click="reset">
                      Geri
                    </v-btn>
                    <v-btn
                      :disabled="!bankAccountData.valid"
                      color="success"
                      class="mr-4"
                      @click="submit"
                    >
                      Kaydet
                    </v-btn>
                  </div>
                </div>
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
import { UPDATE_COMPANY_BANK } from "@/core/services/store/bankaccount.module";

export default {
  name: "CompanyAccountEdit",
  data() {
    return {
      accountData: {},
      bankAccountData: {
        valid: true,
        bankaAdi: "",
        iban: "",
        musteriNo: "",
        hesapEkNo: "",
        hesapNo: "",
        tahsilatHesabiMi: ""
      },
      compAccountId: -1
    };
  },
  methods: {
    submit() {
      const data = this.accountData;
      data.TAHSILATHESABIMI = this.bankAccountData.tahsilatHesabiMi;

      this.$store.dispatch(UPDATE_COMPANY_BANK, data).then(() => {
        this.$router.push({ name: "sirket-hesap-ayarlari" });
      });
    },
    setUserData() {
      if (
        this.$route.params &&
        this.$route.params.compAccountId &&
        +this.$route.params.compAccountId !== -1
      ) {
        this.compAccountId = +this.$route.params.compAccountId;
        this.accountData = this.companyBanks.find(
          p => p.SIRKETHESAPID === this.compAccountId
        );

        this.bankAccountData.tahsilatHesabiMi =
          this.accountData.TAHSILATHESABIMI &&
          this.accountData.TAHSILATHESABIMI === 1
            ? "1"
            : "0";
        this.bankAccountData.iban = this.accountData.IBAN;
        this.bankAccountData.musteriNo = this.accountData.MUSTERINO;
        this.bankAccountData.hesapEkNo = this.accountData.HESAPEKNO;
        this.bankAccountData.hesapNo = this.accountData.HESAPNO;

        this.bankAccountData.bankaAdi = this.banks.find(
            p => p.BANKAID === this.accountData.BANKAID
        ).BANKAADI;
      }
    },
    reset() {
      this.$router.push({ name: "sirket-hesap-ayarlari" });
    }
  },
  components: {
    KTCard
  },
  mounted() {
    this.setUserData();
    this.$store.dispatch(SET_BREADCRUMB, [{ title: "Şirket Hesap Güncelle" }]);
  },
  computed: {
    ...mapGetters(["currentUser", "companyBanks", "banks"])
  }
};
</script>
