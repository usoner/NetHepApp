<template>
  <!--begin::Advance Table Widget 2-->
  <div class="card card-custom card-stretch gutter-b">
    <!--begin::Header-->
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label font-weight-bolder text-dark">
          Bakiye Bilgileri
        </span>
        <span class="text-muted mt-3 font-weight-bold font-size-sm">
          {{ bankTotalAmount.length }} hesap bilgisi
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
              <th style="width: 5%"></th>
              <th style="width: 20%">Banka Adı</th>
              <th style="width: 20%">Şirket Adı</th>
              <th style="width: 15%">Hesap No</th>
              <th class="text-right" style="width: 15%">Devir Bakiye</th>
              <th class="text-right" style="width: 20%">Bakiye</th>
              <th class="text-right" style="width: 5%"></th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(item, i) in bankTotalAmount">
              <tr v-bind:key="i">
                <td class="pl-0 py-4">
                  <div class="symbol symbol-light mr-1">
                    <span class="symbol-label">
                      <img
                        :src="getBankIcon(item.BANKAADI)"
                        class="h-75 align-self-center"
                        style="border-radius: 10px; opacity: 1; overflow: hidden"
                        alt=""
                      />
                    </span>
                  </div>
                </td>
                <td class="pl-0">
                  <a
                    href="#"
                    class="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg"
                  >
                    {{ item.BANKAADI }}
                  </a>
                </td>
                <td class="pl-0">
                  <a
                    href="#"
                    class="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg"
                  >
                    {{ item.SIRKETADI }}
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
                <td class="pl-0 text-right">
                  <span
                    class="label-xl label-light-primary label-inline"
                    :class="{ label: item.HESAPADI !== '' }"
                  >
                    {{ item.DUNDENDEVIRBAKIYE | formatPrice }}
                  </span>
                </td>
                <td class="pl-0 text-right">
                  <span
                    class="label-xl label-light-success label-inline"
                    :class="{ label: item.HESAPADI !== '' }"
                  >
                    {{ item.BAKIYE | formatPrice }}
                  </span>
                </td>
                <td>
                  <router-link
                    :to="{
                      name: 'hesap-hareketleri',
                      params: { bankId: item.BANKAID, compId: item.SIRKETID }
                    }"
                    v-slot="{ href, navigate, isActive, isExactActive }"
                  >
                    <a :href="href" class="menu-link" @click="navigate">
                      <span class="svg-icon svg-icon-xl svg-icon-success">
                        <inline-svg src="media/svg/icons/General/Search.svg" />
                      </span>
                    </a>
                  </router-link>
                </td>
              </tr>
            </template>
            <tr>
              <td colspan="4">
                <JsonExcel
                  class="btn btn-default"
                  :data="filteredData"
                  :fields="fields"
                  :meta="json_meta"
                  name="bakiyebilgileri.xls"
                >
                  Excele Aktar
                </JsonExcel>
              </td>
              <td style="text-align: right">

              </td>
              <td style="text-align: right">

              </td>
            </tr>
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
import { mapGetters, mapState } from "vuex";
import JsonExcel from "vue-json-excel";

export default {
  name: "bakiye-bilgileri",
  data() {
    return {
      list: [],
      fields: {
        "Banka Adı": "BANKAADI",
        "Şirket Adı": "SIRKETADI",
        "Hesap No": "HESAPNO",
        "Devir Bakiye": "DUNDENDEVIRBAKIYE",
        Tutar: "BAKIYE"
      },
      json_meta: [
        [
          {
            key: "charset",
            value: "utf-8"
          }
        ]
      ]
    };
  },
  methods: {
    getBankIcon(bankName) {
      if (bankName === "ZİRAAT BANKASI") {
        return "media/logos/bank-logos/ziraat.jpeg";
      } else if (bankName === "AKBANK") {
        return "media/logos/bank-logos/akbank.png";
      } else if (bankName === "ANADOLUBANK") {
        return "media/logos/bank-logos/anadolubank.png";
      } else if (bankName === "DENİZBANK") {
        return "media/logos/bank-logos/denizbank.jpeg";
      } else if (bankName === "ŞEKERBANK") {
        return "media/logos/bank-logos/sekerbank.jpeg";
      } else if (bankName === "TÜRK EKONOMİ BANKASI") {
        return "media/logos/bank-logos/teb.jpeg";
      } else if (bankName === "VAKIFBANK") {
        return "media/logos/bank-logos/vakıfbank.png";
      } else if (bankName === "TÜRKİYE FİNANS KATILIM BANK") {
        return "media/logos/bank-logos/tkf.png";
      } else if (bankName === "İŞ BANKASI") {
        return "media/logos/bank-logos/isbank.png";
      } else if (bankName === "HALKBANK") {
        return "media/logos/bank-logos/halkbank.jpeg";
      } else if (bankName === "GARANTİ BANKASI") {
        return "media/logos/bank-logos/garanti.jpeg";
      } else if (bankName === "QNB FİNANSBANK") {
        return "media/logos/bank-logos/qnb.jpeg";
      } else if (bankName === "YAPI KREDİ BANK") {
        return "media/logos/bank-logos/yapıkredi.jpeg";
      }
    },
    format: function(value) {
      if (value !== 0) {
        let val = (value / 1).toFixed(2).replace(".", ",");
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      } else {
        return 0;
      }
    }
  },
  components: {
    JsonExcel
  },
  computed: {
    filteredData() {
      const tmpData = [...this.bankTotalAmount];

      tmpData.forEach(el => {
        if (el.BAKIYE !== "NaN") {
          el.BAKIYE = this.format(el.BAKIYE);
        }
        if (el.BAKIYE !== "NaN") {
          el.DUNDENDEVIRBAKIYE = this.format(el.DUNDENDEVIRBAKIYE);
        }
      });

      return tmpData;
    },
    ...mapGetters(["layoutConfig", "bankTotalAmount"]),
    ...mapState({
      errors: state => state.bankTotalAmount.errors
    })
  }
};
</script>
