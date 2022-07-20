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
            Lütfen geri bildirim bilgilerini giriniz
          </div>
        </b-alert>

        <KTCard ref="backNotification">
          <template v-slot:body>
            <div>
              <v-form ref="form" v-model="code1.valid" lazy-validation>
                <v-select
                  v-model="code1.select"
                  :items="code1.items"
                  :rules="[
                    v => !!v || 'Bildirim türünü girmeniz gerekmektedir'
                  ]"
                  label="Seçiniz.."
                  required
                ></v-select>

                <v-textarea
                  v-model="code1.description"
                  :rules="code1.descriptionRules"
                  :counter="250"
                  label="Açıklama"
                ></v-textarea>

                <v-btn
                  :disabled="!code1.valid"
                  color="success"
                  class="mr-4"
                  @click="validate"
                >
                  Gönder
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
@import "~vuetify/dist/vuetify.css";

.theme--light.v-application {
  background: transparent !important;
}
.v-application code {
  box-shadow: none !important;
}
</style>

<script>
import KTCard from "@/view/content/Card.vue";
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";

export default {
  name: "GeriBildirim",
  data() {
    return {
      code1: {
        valid: true,
        description: "",
        descriptionRules: [
          v => !!v || "Açıklama bilgisini girmeniz gerekmektedir",
          v =>
            (v && v.length <= 250) ||
            "Açıklama bilgisi en fazla 250 karakter olabilir"
        ],
        email: "",
        emailRules: [
          v => !!v || "E-mail bilgisini girmeniz gerekmektedir",
          v => /.+@.+\..+/.test(v) || "Geçersiz E-mail bilgisi girdiniz"
        ],
        select: null,
        items: ["Hata", "Talep"],
        checkbox: false
      },
      title: "Bize Ulaşın",
      hasTitleSlot: false
    };
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [{ title: "Bize Ulaşın" }]);
  },
  components: {
    KTCard
  },
  methods: {
    // code 1
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
    },
    reset() {
      this.$refs.form.reset();
    }
  }
};
</script>
