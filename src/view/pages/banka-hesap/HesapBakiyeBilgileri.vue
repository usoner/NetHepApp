<template>
  <div>
    <!--begin::Dashboard-->
    <div class="row">
      <div class="col-xxl-12">
        <BakiyeBilgileriList></BakiyeBilgileriList>
      </div>
    </div>
    <!--end::Dashboard-->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { GET_BANK_TOTAL_AMOUNT } from "@/core/services/store/bankaccount.module";
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";
import BakiyeBilgileriList from "@/view/content/widgets/advance-table/BakiyeBilgileri.vue";

export default {
  name: "hesapBakiyeBilgileri",
  components: {
    BakiyeBilgileriList
  },
  methods: {
    getBankTotalAmounts() {
      this.$store.dispatch(GET_BANK_TOTAL_AMOUNT, this.bankTotalParams);
    }
  },
  computed: {
    ...mapGetters(["currentUser", "bankTotalAmount"]),
    bankTotalParams() {
      return {
        params: {
          p_nKullaniciID: this.currentUser.KULLANICIID,
          p_nSirketID: -1,
          p_dtBakiyeTarihi: this.formatDate(new Date())
        }
      };
    }
  },
  mounted() {
    this.getBankTotalAmounts();
    this.$store.dispatch(SET_BREADCRUMB, [{ title: "Hesap Bakiye Bilgileri" }]);
  }
};
</script>
