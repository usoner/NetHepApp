<template>
  <div>
    <HesapHareketleriForm
      @getBankAccount="getBankAccountByFilter"
      @getBankAccountNumbers="getBankAccountNumbers"
      @clearBankAccount="clearFilter"
      :bankAccountNumbers="bankAccountNumbers"
    />
    <div class="row">
      <div class="col-xxl-12 order-2 order-xxl-1">
        <HesapHareketleri></HesapHareketleri>
      </div>
    </div>
  </div>
</template>

<script>
import { GET_BANK_ACCOUNT_FILTER } from "@/core/services/store/bankaccount.module";
import { GET_BANK_ACCOUNT_NUMBER } from "@/core/services/store/bankaccount.module";
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";
import HesapHareketleri from "@/view/content/widgets/advance-table/HesapHareketleri.vue";
import HesapHareketleriForm from "@/view/content/widgets/advance-table/HesapHareketleriForm.vue";
import { mapGetters } from "vuex";

export default {
  name: "hesapHareketleri",
  components: {
    HesapHareketleri,
    HesapHareketleriForm
  },
  methods: {
    getBankAccountByFilter(params) {
      this.$store.dispatch(GET_BANK_ACCOUNT_FILTER, params);
    },
    getBankAccountNumbers(params) {
      this.$store.dispatch(GET_BANK_ACCOUNT_NUMBER, params);
    },
    clearFilter: function(params) {
      this.getBankAccountByFilter(params);
    }
  },
  computed: {
    ...mapGetters(["bankAccountNumbers"])
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [{ title: "Hesap Hareketleri" }]);
  }
};
</script>
