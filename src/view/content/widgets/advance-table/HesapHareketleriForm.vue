<template>
  <div>
    <div class="row">
      <div class="col-xxl-4 col-md-6">
        <input type="date" class="form-control my-3" v-model="startDate" />
      </div>
      <div class="col-xxl-4 col-md-6">
        <input type="date" class="form-control my-3" v-model="endDate" />
      </div>
      <div class="col-xxl-4 col-md-6">
        <div>
          <b-form-select
            v-model="companyId"
            :options="optComp"
            class="my-3"
            @change="getBankAccountNumbers"
          >
          </b-form-select>
        </div>
      </div>
      <div class="col-xxl-4 col-md-6">
        <div>
          <b-form-select
            v-model="bankId"
            :options="optBank"
            class="my-3"
            @change="getBankAccountNumbers"
          >
          </b-form-select>
        </div>
      </div>
      <div
        class="col-xxl-4 col-md-6"
        v-if="optBankNumbers && optBankNumbers.length > 1"
      >
        <div>
          <b-form-select
            v-model="accountNumber"
            :options="optBankNumbers"
            class="my-3"
          >
          </b-form-select>
        </div>
      </div>
      <div class="col-xxl-4 col-md-6">
        <div>
          <b-form-select
            v-model="statusId"
            :options="optAccountStatus"
            class="my-3"
          >
          </b-form-select>
        </div>
      </div>
      <div
        class="text-right"
        v-bind:class="{
          'col-xxl-12 col-md-12': optBankNumbers && optBankNumbers.length > 1,
          'col-xxl-4 col-md-6': !optBankNumbers || optBankNumbers.length <= 1
        }"
      >
        <button
          class="btn btn-primary font-weight-bold my-3 font-size-3"
          @click="getBankAccountByFilter"
        >
          Ara
        </button>
        &nbsp;
        <button
          class="btn btn-danger font-weight-bold my-3 font-size-3"
          @click="clearFilter"
        >
          Temizle
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";

export default {
  name: "HesapHareketleriForm",
  props: {
    bankAccountNumbers: {}
  },
  data() {
    return {
      startDate: this.formatDate(new Date()),
      endDate: this.formatDate(new Date()),
      statusId: null,
      bankId: -1,
      companyId: -1,
      accountNumber: -1,
      userCompanyId: -1,
      optAccountStatus: [
        { value: null, text: "Tüm Hareketler" },
        { value: 0, text: "Hesaptan Çıkan" },
        { value: 1, text: "Hesaba Giren" }
      ],
      optBank: [{ value: -1, text: "Tüm Bankalar" }],
      optComp: [],
      optBankNumbers: [],
      clear: false
    };
  },
  methods: {
    getBankAccountNumbers() {
      if (this.bankId && this.bankId > 0 && this.companyId) {
        this.optBankNumbers = [];
        this.accountNumber = -1;
        this.$emit("getBankAccountNumbers", this.bankAccountNumberParams);
      }
    },
    getBankAccountByFilter() {
      this.$emit("getBankAccount", this.axiosParams);
    },
    clearFilter: function() {
      this.startDate = this.formatDate(new Date());
      this.endDate = this.formatDate(new Date());
      this.clear = true;
      this.statusId = null;
      this.bankId = -1;
      this.companyId = this.userCompanyId;
      this.accountNumber = -1;
      this.optBankNumbers = [];

      this.$emit("clearBankAccount", this.axiosParams);
    },
    setCompanyData: function() {
      if (this.userCompanies && this.userCompanies.length > 0) {
        for (let key in this.userCompanies) {
          const item = this.userCompanies[key];

          if (item.USTSIRKETID === null) {
            this.companyId = item.SIRKETID;
            this.userCompanyId = item.SIRKETID;
          }

          this.optComp.push({
            value: item.SIRKETID,
            text: item.SIRKETADI
          });
        }
      }
    },
    setBankData: function() {
      if (this.banks && this.banks.length > 0) {
        for (let key in this.banks) {
          const item = this.banks[key];

          this.optBank.push({
            value: item.BANKAID,
            text: item.BANKAADI
          });
        }
      }
    },
    getParams: function() {
      if (!this.clear) {
        if (
          this.$route.params &&
          this.$route.params.bankId &&
          +this.$route.params.bankId !== -1
        ) {
          this.bankId = +this.$route.params.bankId;
        }

        if (
          this.$route.params &&
          this.$route.params.compId &&
          +this.$route.params.compId !== -1
        ) {
          this.companyId = +this.$route.params.compId;
        }
      }
    }
  },
  watch: {
    $route: function() {
      this.clearFilter();
    },
    bankAccountNumbers: function() {
      this.optBankNumbers = [];
      this.optBankNumbers.push({ value: -1, text: "Hesap Numarası Seçiniz" });

      if (this.bankAccountNumbers && this.bankAccountNumbers.length > 0) {
        for (let key in this.bankAccountNumbers) {
          const item = this.bankAccountNumbers[key];

          this.optBankNumbers.push({
            value: item.HESAPNO,
            text: item.HESAPNO
          });
        }
      }
    }
  },
  mounted() {
    this.getParams();

    this.setCompanyData();
    this.setBankData();

    this.$emit("getBankAccount", this.axiosParams);

    this.$store.dispatch(SET_BREADCRUMB, [{ title: "Hesap Hareketleri" }]);
  },
  computed: {
    ...mapGetters(["userCompanies", "banks"]),
    axiosParams() {
      this.getParams();

      const sDate = this.startDate;
      const eDate = this.endDate;
      const compId = this.companyId;
      const bId = this.bankId;
      const bStatus = this.statusId !== null ? this.statusId : -1;

      return {
        params: {
          p_dtBasTarih: this.formatDate(sDate),
          p_dtSonTarih: this.formatDate(eDate),
          p_nSirketID: compId === this.userCompanyId ? -1 : compId,
          p_nUstSirketID: this.userCompanyId,
          p_nBankaID: bId,
          p_nBorcAlacak: bStatus,
          p_sHesapNo: this.accountNumber
        }
      };
    },
    bankAccountNumberParams() {
      return {
        params: {
          bankaid: this.bankId,
          sirketid: this.companyId
        }
      };
    }
  },
  destroyed() {
    this.clearFilter();
  }
};
</script>
