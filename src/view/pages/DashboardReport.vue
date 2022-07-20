<template>
  <div>
    <!--begin::Dashboard-->
    <DashboardTop
      :accountInCount="accountInCount"
      :accountOutCount="accountOutCount"
      :accountInAmountSum="accountInAmountSum"
      :accountOutAmountSum="accountOutAmountSum"
      :accountTotalAmountSum="accountTotalAmountSum"
      :sumTransferAmount="sumTransferAmount"
      :sumAmount="sumAmount"
    />

    <br />

    <div class="row">
      <div class="col-xl-4 order-1 order-xxl-1">
        <HesapGirisCikisBar
          title="Giriş Hareketleri"
          type="1"
          :dataAccounts="bankAccounts"
        ></HesapGirisCikisBar>
        <HesapGirisCikisBankaPie
          :chartData="bankAccountPieData"
          type="0"
        ></HesapGirisCikisBankaPie>
      </div>
      <div class="col-xl-4 order-1 order-xxl-1">
        <HesapGirisCikisBar
          title="Çıkış Hareketleri"
          type="0"
          :dataAccounts="bankAccounts"
        ></HesapGirisCikisBar>
        <HesapGirisCikisBankaPie
          :chartData="bankAccountPieOutData"
          type="1"
        ></HesapGirisCikisBankaPie>
      </div>
      <div class="col-xl-4 order-1 order-xxl-1">
        <HesapHareketLineList
          :bankAccounts="bankAccounts"
        ></HesapHareketLineList>
      </div>

      <div class="col-xxl-8 order-1 order-xxl-1">
        <BankaBakiyePie :bankTotalAmountData="bankTotalAmount"></BankaBakiyePie>
      </div>
      <div class="col-xl-4 order-1 order-xxl-1">
        <HesapCikisLineList
          :bankAccountPieOutData="bankAccountPieOutData"
        ></HesapCikisLineList>
      </div>
    </div>

    <!--end::Dashboard-->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";

import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";
import BankaBakiyePie from "@/view/content/widgets/list/BankaBakiyePie.vue";
import HesapCikisLineList from "@/view/content/widgets/list/HesapCikisLineList.vue";
import HesapHareketLineList from "@/view/content/widgets/list/HesapHareketLineList.vue";
import HesapGirisCikisBar from "@/view/content/widgets/stats/HesapGirisCikisBar.vue";
import HesapGirisCikisBankaPie from "@/view/content/widgets/stats/HesapGirisCikisBankaPie.vue";
import DashboardTop from "@/view/content/widgets/advance-table/DashboardTop";

import {
  GET_BANK_ACCOUNT_FILTER,
  GET_BANK_ACCOUNT_PIE,
  GET_BANK_ACCOUNT_OUT_PIE,
  GET_BANK_TOTAL_AMOUNT
} from "@/core/services/store/bankaccount.module";

export default {
  name: "dashboard-report",
  data() {
    return {
      accountInCount: 0,
      accountOutCount: 0,
      accountInAmountSum: 0,
      accountOutAmountSum: 0,
      accountTotalAmountSum: 0,

      sumAmount: 0,
      sumTransferAmount: 0,

      filterText: "",

      startDate: new Date(),
      endDate: new Date(),
      companyId: -1,
      userCompanyId: -1,
      bankId: -1
    };
  },
  methods: {
    getRandom(min = 10, max = 100) {
      return Math.random() * (max - min) + min;
    },
    setBarChartData: function() {
      this.clearData();

      if (this.bankAccountPieData && this.bankAccountPieData.length > 0) {
        for (let key in this.bankAccountPieData) {
          this.accountInCount += this.bankAccountPieData[key].HAREKETSAYI;
          this.accountInAmountSum += this.bankAccountPieData[key].TUTARTOPLAM;
        }
      }

      if (this.bankAccountPieOutData && this.bankAccountPieOutData.length > 0) {
        for (let key in this.bankAccountPieOutData) {
          this.accountOutCount += this.bankAccountPieOutData[key].HAREKETSAYI;
          this.accountOutAmountSum += this.bankAccountPieOutData[
            key
          ].TUTARTOPLAM;
        }
      }

      this.accountInAmountSum =
        Math.round((this.accountInAmountSum + Number.EPSILON) * 100) / 100;
      this.accountOutAmountSum =
        Math.round((this.accountOutAmountSum + Number.EPSILON) * 100) / 100;
      this.accountTotalAmountSum =
        Math.round(
          (this.accountInAmountSum -
            this.accountOutAmountSum +
            Number.EPSILON) *
            100
        ) / 100;
    },
    getBankAccountData: function() {
      this.setDateParams();

      this.$store.dispatch(GET_BANK_ACCOUNT_FILTER, this.accountParams);
      this.$store.dispatch(GET_BANK_ACCOUNT_PIE, this.accountInParams);
      this.$store.dispatch(GET_BANK_ACCOUNT_OUT_PIE, this.accountOutParams);

      this.setBarChartData();
    },
    getBankAccountTotalSumData: function() {
      this.$store.dispatch(GET_BANK_TOTAL_AMOUNT, this.bankTotalParams);

      this.sumAmount = this.getTotal(this.bankTotalAmount, "BAKIYE");
      this.sumTransferAmount = this.getTotal(
        this.bankTotalAmount,
        "DUNDENDEVIRBAKIYE"
      );
    },
    getBankAccountDataInt: function() {
      this.interval = setInterval(() => {
        this.getBankAccountData();
      }, 10000);
    },
    setDateParams: function() {
      let sDate = new Date();
      this.companyId = -1;
      this.userCompanyId = this.currentUser.SIRKETID;

      if (
        this.$route.params &&
        this.$route.params.id &&
        +this.$route.params.id !== -1
      ) {
        const paramId = +this.$route.params.id;

        if (paramId === 121) {
          this.startDate = sDate;
        } else if (paramId === 122) {
          const firstDay = moment()
            .startOf("week")
            .toDate();
          this.startDate = new Date(
            firstDay.getFullYear(),
            firstDay.getMonth(),
            firstDay.getDate() + 1
          );
        } else if (paramId === 123) {
          this.startDate = new Date(sDate.getFullYear(), sDate.getMonth(), 1);
        } else if (paramId === 124) {
          this.startDate = new Date(sDate.getFullYear(), 0, 1);
        } else if (paramId === 125) {
          this.startDate = new Date(2010, 0, 1);
          localStorage.selectedCompId = -1;
          localStorage.selectedBankId = -1;
        }

        if (paramId <= 125) {
          localStorage.selectedStartDate = this.startDate;
        }

        if (paramId > 125) {
          this.companyId = paramId;
          localStorage.selectedCompId = this.companyId;
        }
      }

      if (
        this.$route.params &&
        this.$route.params.bankId &&
        +this.$route.params.bankId !== -1
      ) {
        this.bankId = +this.$route.params.bankId;
        localStorage.selectedBankId = this.bankId;
      } else {
        this.bankId = -1;
      }

      if (!localStorage.selectedStartDate) {
        this.startDate = new Date();
        localStorage.selectedStartDate = this.startDate;
      }

      localStorage.selectedEndDate = this.endDate;

      this.filterText =
        "Baş. Tarihi: " +
        this.formatDate(localStorage.selectedStartDate) +
        " Son Tarihi:  " +
        this.formatDate(localStorage.selectedEndDate);

      if (localStorage.selectedCompId && +localStorage.selectedCompId !== -1) {
        const selectedCompany = this.userCompanies.find(
          p => p.SIRKETID === +localStorage.selectedCompId
        );
        this.filterText += selectedCompany
          ? " - Şirket: " + selectedCompany.SIRKETADI
          : "";
      }

      if (localStorage.selectedBankId && +localStorage.selectedBankId !== -1) {
        const selectedBank = this.banks.find(
          p => p.BANKAID === +localStorage.selectedBankId
        );
        this.filterText += selectedBank
          ? " - Banka: " + selectedBank.BANKAADI
          : "";
      }

      this.$store.dispatch(SET_BREADCRUMB, [
        { title: "Dashboard", desc: this.filterText }
      ]);
    },
    clearData() {
      this.accountInCount = 0;
      this.accountOutCount = 0;
      this.accountInAmountSum = 0;
      this.accountOutAmountSum = 0;
      this.accountTotalAmountSum = 0;

      this.startDate = new Date();
      this.endDate = new Date();
      this.bankId = -1;
      this.companyId = -1;
      this.userCompanyId = -1;
    },
    getCompId() {
      return localStorage.selectedCompId &&
        +localStorage.selectedCompId === this.currentUser.SIRKETID
        ? -1
        : localStorage.selectedCompId
        ? +localStorage.selectedCompId
        : -1;
    }
  },
  watch: {
    bankAccountPieData: function() {
      this.setBarChartData();
    },
    bankAccountPieOutData: function() {
      this.setBarChartData();
    },
    $route: function() {
      this.getBankAccountData();
    }
  },
  components: {
    BankaBakiyePie,
    HesapCikisLineList,
    HesapHareketLineList,
    HesapGirisCikisBar,
    HesapGirisCikisBankaPie,
    DashboardTop
  },
  computed: {
    ...mapGetters([
      "banks",
      "currentUser",
      "bankAccounts",
      "bankAccountPieData",
      "bankAccountPieOutData",
      "userCompanies",
      "bankTotalAmount"
    ]),
    accountInParams() {
      return {
        params: {
          p_dtBasTarih: this.formatDate(localStorage.selectedStartDate),
          p_dtSonTarih: this.formatDate(localStorage.selectedEndDate),
          p_nSirketID: this.getCompId(),
          p_nUstSirketID: this.userCompanyId,
          p_bBorcAlacak: 1,
          p_nBankaID: localStorage.selectedBankId
            ? localStorage.selectedBankId
            : -1
        }
      };
    },
    accountOutParams() {
      return {
        params: {
          p_dtBasTarih: this.formatDate(localStorage.selectedStartDate),
          p_dtSonTarih: this.formatDate(localStorage.selectedEndDate),
          p_nSirketID: this.getCompId(),
          p_nUstSirketID: this.userCompanyId,
          p_bBorcAlacak: 0,
          p_nBankaID: localStorage.selectedBankId
            ? localStorage.selectedBankId
            : -1
        }
      };
    },
    accountParams() {
      return {
        params: {
          p_dtBasTarih: this.formatDate(localStorage.selectedStartDate),
          p_dtSonTarih: this.formatDate(localStorage.selectedEndDate),
          p_nSirketID: this.getCompId(),
          p_nUstSirketID: this.userCompanyId,
          p_nBankaID: localStorage.selectedBankId
            ? localStorage.selectedBankId
            : -1,
          p_nBorcAlacak: -1
        }
      };
    },
    bankTotalParams() {
      this.setDateParams();

      return {
        params: {
          p_nKullaniciID: this.currentUser.KULLANICIID,
          p_nSirketID: this.getCompId(),
          p_dtBakiyeTarihi: this.formatDate(this.endDate)
        }
      };
    }
  },
  mounted() {
    this.userCompanyId = this.currentUser.SIRKETID;
    this.$store.dispatch(SET_BREADCRUMB, [{ title: "Dashboard ", desc: "" }]);
    this.getBankAccountData();
    this.getBankAccountDataInt();
    this.getBankAccountTotalSumData();
  },
  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose();
    }
  },
  destroyed() {
    if (this.interval) {
      clearInterval(this.interval);
    }

    if (localStorage.selectedCompId) {
      localStorage.removeItem("selectedCompId");
    }

    if (localStorage.selectedBankId) {
      localStorage.removeItem("selectedBankId");
    }

    if (localStorage.selectedStartDate) {
      localStorage.removeItem("selectedStartDate");
    }

    if (localStorage.selectedEndDate) {
      localStorage.removeItem("selectedEndDate");
    }
  }
};
</script>
