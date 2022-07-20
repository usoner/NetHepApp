<template>
  <div>
    <!--begin::Dashboard-->

    <DashboardTop
      :accountInCount="accountInCount"
      :accountOutCount="accountOutCount"
      :accountInAmountSum="accountInAmountSum"
      :accountOutAmountSum="accountOutAmountSum"
      :accountTotalAmountSum="accountTotalAmountSum"
      :sumTransferAmount="sumTransferAmount()"
      :sumAmount="sumAmount()"
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

    <div class="update-dialog" v-if="prompt">
      <div class="update-dialog__content">
        Yeni bir versiyon bulundu. Yüklemek ister misiniz?
      </div>
      <div class="update-dialog__actions">
        <button
          class="update-dialog__button update-dialog__button--confirm"
          @click="update"
        >
          Güncelle
        </button>
        <button
          class="update-dialog__button update-dialog__button--cancel"
          @click="prompt = false"
        >
          Vazgeç
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
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
  name: "dashboard",
  data() {
    return {
      accountInCount: 0,
      accountOutCount: 0,
      accountInAmountSum: 0,
      accountOutAmountSum: 0,
      accountTotalAmountSum: 0,

      startDate: new Date(),
      endDate: new Date(),

      prompt: false
    };
  },
  methods: {
    async update() {
      this.prompt = false;
      await this.$workbox.messageSW({ type: "SKIP_WAITING" });
    },
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
      }
    },
    getBankAccountData: function() {
      this.$store.dispatch(GET_BANK_ACCOUNT_FILTER, this.accountParams);
      this.$store.dispatch(GET_BANK_ACCOUNT_PIE, this.accountInParams);
      this.$store.dispatch(GET_BANK_ACCOUNT_OUT_PIE, this.accountOutParams);
      this.$store.dispatch(GET_BANK_TOTAL_AMOUNT, this.bankTotalParams);

      this.setBarChartData();
    },
    getBankAccountDataInt: function() {
      this.interval = setInterval(() => {
        this.getBankAccountData();
      }, 10000);
    },
    clearData() {
      this.accountInCount = 0;
      this.accountOutCount = 0;
      this.accountInAmountSum = 0;
      this.accountOutAmountSum = 0;
      this.accountTotalAmountSum = 0;
    },
    sumAmount() {
      return this.getTotal(this.bankTotalAmount, "BAKIYE");
    },
    sumTransferAmount() {
      return this.getTotal(this.bankTotalAmount, "DUNDENDEVIRBAKIYE");
    },
    setDateParams: function() {
      let sDate = new Date();
      const filterText =
        "Baş. Tarihi: " +
        this.formatDate(sDate) +
        " Son Tarihi:  " +
        this.formatDate(sDate);

      this.$store.dispatch(SET_BREADCRUMB, [
        { title: "Dashboard", desc: filterText }
      ]);
    }
  },
  created() {
    if (this.$workbox) {
      this.$workbox.addEventListener("waiting", () => {
        this.prompt = true;
      });
    }
  },
  watch: {
    bankAccountPieData: function() {
      this.setBarChartData();
    },
    bankAccountPieOutData: function() {
      this.setBarChartData();
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
      "currentUser",
      "bankAccounts",
      "bankAccountPieData",
      "bankAccountPieOutData",
      "bankTotalAmount"
    ]),
    accountInParams() {
      return {
        params: {
          p_dtBasTarih: this.formatDate(this.startDate),
          p_dtSonTarih: this.formatDate(this.endDate),
          p_nSirketID: 0,
          p_nUstSirketID: this.currentUser.SIRKETID,
          p_bBorcAlacak: 1,
          p_nBankaID: -1
        }
      };
    },
    accountOutParams() {
      return {
        params: {
          p_dtBasTarih: this.formatDate(this.startDate),
          p_dtSonTarih: this.formatDate(this.endDate),
          p_nSirketID: -1,
          p_nUstSirketID: this.currentUser.SIRKETID,
          p_bBorcAlacak: 0,
          p_nBankaID: -1
        }
      };
    },
    accountParams() {
      return {
        params: {
          p_dtBasTarih: this.formatDate(this.startDate),
          p_dtSonTarih: this.formatDate(this.endDate),
          p_nSirketID: -1,
          p_nUstSirketID: this.currentUser.SIRKETID,
          p_nBankaID: -1,
          p_nBorcAlacak: -1
        }
      };
    },
    bankTotalParams() {
      return {
        params: {
          p_nKullaniciID: this.currentUser.KULLANICIID,
          p_nSirketID: -1,
          p_dtBakiyeTarihi: this.formatDate(this.endDate)
        }
      };
    }
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [{ title: "Dashboard" }]);
    this.setDateParams();
    this.getBankAccountData();
    this.getBankAccountDataInt();
  },
  destroyed() {
    if (this.interval) {
      clearInterval(this.interval);
    }

    if (this.chart) {
      this.chart.dispose();
    }
  }
};
</script>

<style lang="scss">
.update-dialog {
  position: fixed;
  left: 50%;
  bottom: 64px;
  transform: translateX(-50%);
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  padding: 12px;
  max-width: 576px;
  color: white;
  background-color: #2c3e50;
  text-align: left;

  &__actions {
    display: flex;
    margin-top: 8px;
  }

  &__button {
    margin-right: 8px;

    &--confirm {
      margin-left: auto;
    }
  }
}
</style>
