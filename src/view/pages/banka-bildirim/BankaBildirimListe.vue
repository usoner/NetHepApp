<template>
  <v-app>
    <transition name="fade-in-up">
      <div>
        <div class="row">
          <div class="col-xxl-12">
            <BankaBildirimBilgileri
              :bankNotifications="getData"
              @removeBankNotification="id = $event"
            ></BankaBildirimBilgileri>

            <v-snackbar v-model="snackbar" absolute top right color="success">
              <span>Silme işlemi başarılı şekilde gerçekleşti!</span>
              <v-icon dark>mdi-checkbox-marked-circle</v-icon>
            </v-snackbar>
          </div>
        </div>
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
</style>

<script>
import { mapGetters } from "vuex";
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";
import BankaBildirimBilgileri from "@/view/content/widgets/advance-table/BankaBildirimBilgileri.vue";
import { GET_BANK_NOTIFICATION } from "@/core/services/store/banknotification.module";

export default {
  name: "BankaBildirimListe",
  data() {
    return {
      id: 0,
      snackbar: false
    };
  },
  components: {
    BankaBildirimBilgileri
  },
  watch: {
    id: function() {
      this.snackbar = true;
    }
  },
  methods: {
    getBankNotifications() {
      this.$store.dispatch(GET_BANK_NOTIFICATION, this.bankParams);
    }
  },
  mounted() {
    this.getBankNotifications();
    this.$store.dispatch(SET_BREADCRUMB, [{ title: "Bildirim Liste" }]);
  },
  computed: {
    ...mapGetters(["currentUser", "bankNotifications"]),
    bankParams() {
      return {
        params: {
          p_nKullaniciID: this.currentUser.KULLANICIID
        }
      };
    },
    getData() {
      return this.bankNotifications.filter(
        p => p.KULLANICIBILDIRIMID !== this.id
      );
    }
  }
};
</script>
