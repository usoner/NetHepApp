<template>
  <div>
    <!--begin::Dashboard-->
    <div class="row">
      <div class="col-xxl-12">
        <SirketHesapBilgileriList></SirketHesapBilgileriList>
      </div>
    </div>
    <!--end::Dashboard-->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { GET_COMPANY_BANK } from "@/core/services/store/bankaccount.module";
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";
import SirketHesapBilgileriList from "@/view/content/widgets/advance-table/SirketHesapBilgileriList.vue";
import {GET_BANK} from "@/core/services/store/bank.module";

export default {
  name: "sirketHesapBilgileri",
  components: {
    SirketHesapBilgileriList
  },
  methods: {
    getBankTotalAmounts() {
      this.$store.dispatch(GET_BANK);
      this.$store.dispatch(GET_COMPANY_BANK, this.bankParams);
    }
  },
  computed: {
    ...mapGetters(["currentUser", "companyBanks", "banks"]),
    bankParams() {
      return {
        params: {
          p_nKullaniciID: this.currentUser.KULLANICIID
        }
      };
    }
  },
  mounted() {
    this.getBankTotalAmounts();
    this.$store.dispatch(SET_BREADCRUMB, [{ title: "Şirket Hesap Bilgileri" }]);
  }
};
</script>
