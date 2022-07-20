<template>
  <!--begin::Advance Table Widget 2-->
  <div class="card card-custom card-stretch gutter-b">
    <!--begin::Header-->
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label font-weight-bolder text-dark">
          Şirket Hesap Bilgileri
        </span>
        <span class="text-muted mt-3 font-weight-bold font-size-sm">
          {{ companyBanks.length }} hesap bilgisi
        </span>
      </h3>
    </div>
    <!--end::Header-->
    <!--begin::Body-->
    <div class="card-body pt-3 pb-0">
      <!--begin::Table-->
      <div class="table-responsive">
        <table class="table table-borderless table-vertical-center">
          <thead>
            <tr style="border-bottom: 1px solid #f8f8f8;">
              <th style="width: 15%">Banka Adı</th>
              <th style="width: 20%">IBAN</th>
              <th style="width: 15%">Müşteri No</th>
              <th style="width: 20%">Hesap No</th>
              <th style="width: 15%">Ek Hesap No</th>
              <th style="width: 10%">Tahsilat Hesabı Mı</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(item, i) in companyBanks">
              <tr v-bind:key="i">
                <td class="pl-0">
                  <span class="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg">
                    {{ getBankName(item.BANKAID) }}
                  </span>
                </td>
                <td class="pl-0">
                  <a
                    href="#"
                    class="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg"
                  >
                    {{ item.IBAN }}
                  </a>
                </td>
                <td class="pl-0">
                  <a
                    href="#"
                    class="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg"
                  >
                    {{ item.MUSTERINO }}
                  </a>
                </td>
                <td class="pl-0">
                  <a
                    href="#"
                    class="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg"
                  >
                    {{ item.HESAPEKNO }}
                  </a>
                </td>
                <td class="pl-0">
                  <a
                    href="#"
                    class="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg"
                  >
                    {{ item.HESAPNO }}
                  </a>
                </td>
                <td class="pl-0 text-center">
                  <span
                    class="label-xl label-light-success label-inline"
                    :class="{ label: item.TAHSILATHESABIMI !== '' }"
                  >
                    {{ item.TAHSILATHESABIMI && item.TAHSILATHESABIMI === 1 ? 'Evet' : 'Hayır' }}
                  </span>
                </td>
                <td class="text-right">
                  <router-link
                    :to="{
                      name: 'sirket-hesap-guncelle',
                      params: { compAccountId: item.SIRKETHESAPID }
                    }"
                    v-slot="{ href, navigate, isActive, isExactActive }"
                  >
                    <a :href="href" class="menu-link" @click="navigate">
                      <span class="svg-icon svg-icon-md svg-icon-success">
                        <inline-svg src="media/svg/icons/Communication/Write.svg" />
                      </span>
                    </a>
                  </router-link>
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
import { mapState } from "vuex";

export default {
  name: "sirket-hesap-bilgileri",
  data() {
    return {
      list: []
    };
  },
  methods: {
    getBankName(bankId) {
      if(this.banks && this.banks.length > 0) {
        return this.banks.find(p => p.BANKAID === bankId).BANKAADI;
      }

      return '';
    }
  },
  computed: {
    ...mapGetters(["layoutConfig", "companyBanks", "banks"]),
    ...mapState({
      errors: state => state.companyBanks.errors
    })
  }
};
</script>
