<template>
  <!--begin::Advance Table Widget 2-->
  <div class="card card-custom card-stretch gutter-b">
    <!--begin::Header-->
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label font-weight-bolder text-dark">
          Bildirim Bilgileri
        </span>
        <span class="text-muted mt-3 font-weight-bold font-size-sm">
          {{ bankNotifications.length }} bildirim bilgisi
        </span>
      </h3>
      <div class="float-right">
        <router-link
          to="/bildirim-ayarlari"
          v-slot="{ href, navigate, isActive, isExactActive }"
        >
          <a :href="href" class="btn btn-primary" @click="navigate">
            <i class="menu-icon flaticon2-plus"></i>
            <span class="menu-text">Yeni Bildirim Ekle</span>
          </a>
        </router-link>
      </div>
    </div>

    <!--end::Header-->
    <!--begin::Body-->
    <div class="card-body pt-3 pb-0">
      <!--begin::Table-->
      <div class="table-responsive">
        <table class="table table-borderless table-vertical-center">
          <thead>
            <tr style="border-bottom: 1px solid #f8f8f8;">
              <th class="p-0" style="min-width: 200px">
                Karşı Ünvan & Ad Soyad
              </th>
              <th class="p-0" style="min-width: 200px">E-mail Adresi</th>
              <th class="p-0" style="min-width: 100px">Telefon Numarası</th>
              <th class="p-0 text-right" style="min-width: 150px">
                Hesap Hareket
              </th>
              <th class="text-right" style="min-width: 200px">Tutar</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(item, i) in bankNotifications">
              <tr v-bind:key="i">
                <td class="pl-0">
                  <a
                    href="#"
                    class="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg"
                  >
                    {{ item.KARSIADSOYAD }}
                  </a>
                </td>
                <td class="pl-0">
                  <span
                    v-if="item.EMAIL && item.EMAIL !== ''"
                    class="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg"
                  >
                    {{ item.EMAIL }}
                  </span>
                  <span v-else>-</span>
                </td>
                <td class="pl-0">
                  <span
                    v-if="item.CEPTELEFONU && item.CEPTELEFONU !== ''"
                    class="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg"
                  >
                    {{ item.CEPTELEFONU }}
                  </span>
                  <span v-else>-</span>
                </td>
                <td class="text-right">
                  <span
                    v-if="item.ISLEMSECIMTIPI === 1"
                    class="label label-lg label-light-success label-inline font-size-xs"
                  >
                    Hesaba Giren
                  </span>
                  <span
                    v-else
                    class="label label-lg label-light-danger label-inline font-size-xs"
                  >
                    Hesaptan Çıkan
                  </span>
                </td>
                <td class="pl-0 text-right">
                  <span class="label-xl label-light-primary label-inline label">
                    {{ item.TUTAR | formatPrice }}
                  </span>
                </td>
                <td class="text-right pr-0">
                  <router-link
                    :to="{
                      name: 'banka-bildirim-guncelleme',
                      params: { id: item.KULLANICIBILDIRIMID }
                    }"
                    v-slot="{ href, navigate, isActive, isExactActive }"
                  >
                    <a :href="href" class="btn btn-icon btn-light btn-sm mx-3">
                      <span class="svg-icon svg-icon-md svg-icon-primary">
                        <!--begin::Svg Icon-->
                        <inline-svg
                          src="media/svg/icons/Communication/Write.svg"
                        ></inline-svg>
                        <!--end::Svg Icon-->
                      </span>
                    </a>
                  </router-link>

                  <span
                    class="btn btn-icon btn-light btn-sm mx-3"
                    v-on:click="remove(item.KULLANICIBILDIRIMID)"
                  >
                    <span class="svg-icon svg-icon-md svg-icon-danger">
                      <!--begin::Svg Icon-->
                      <inline-svg
                        src="media/svg/icons/General/Trash.svg"
                      ></inline-svg>
                      <!--end::Svg Icon-->
                    </span>
                  </span>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
      <!--end::Table-->
    </div>
    <!--end::Body-->
    <!--end::Advance Table Widget 2-->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { UPDATE_BANK_NOTIFICATION } from "@/core/services/store/banknotification.module";

export default {
  name: "BankaBiildirimBilgileri",
  props: {
    bankNotifications: Array
  },
  methods: {
    remove(id) {
      const noti = this.bankNotifications.find(
        p => p.KULLANICIBILDIRIMID === id
      );
      noti.DURUM = 0;
      this.$store.dispatch(UPDATE_BANK_NOTIFICATION, noti);
      this.$emit("removeBankNotification", id);
    }
  },
  computed: {
    ...mapGetters(["layoutConfig"])
  }
};
</script>
