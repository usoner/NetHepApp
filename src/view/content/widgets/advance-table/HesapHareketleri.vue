<template>
  <div class="card card-custom card-stretch gutter-b" v-if="bankAccounts">
    <!--begin::Header-->
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label font-weight-bolder text-dark">
          Hesap Hareketleri
        </span>
        <span class="text-muted mt-3 font-weight-bold font-size-sm">
          {{ bankAccounts.length }}+ hesap hareketi
        </span>
      </h3>
      <div class="card-toolbar" style="width: 40%">
        <v-text-field v-model="filterText" label="Açıklama"></v-text-field>
      </div>
    </div>
    <!--end::Header-->
    <!--begin::Body-->
    <div class="card-body pt-3 pb-0" style="padding: 0.75em">
      <!--begin::Table-->
      <div class="row">
        <div class="col-xxl-12">
          <div class="table-responsive">
            <table class="table table-borderless table-vertical-center">
              <thead>
                <tr>
                  <th></th>
                  <th style="width: 5%;"></th>
                  <th style="width: 20%;"></th>
                  <th style="width: 23%;"></th>
                  <th style="width: 15%;"></th>
                  <th style="width: 12%;"></th>
                  <th style="width: 20%;"></th>
                </tr>
              </thead>
              <tbody>
                <template v-for="(item, i) in filteredData">
                  <tr v-bind:key="i">
                    <td>
                      {{ item.HESAPNO }}
                    </td>
                    <td>
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
                    <td>
                      <a
                        href="#"
                        class="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg"
                      >
                        {{ item.SIRKETADI }}
                      </a>
                      <div>
                        <span class="font-weight-bolder">Banka:</span>
                        <a
                          class="text-muted font-weight-bold text-hover-primary"
                          href="#"
                        >
                          {{ item.BANKAADI }}
                        </a>
                      </div>
                    </td>
                    <td>
                      {{ item.KARSIADSOYAD + " - " + item.ACIKLAMA }}
                    </td>
                    <td class="text-right">
                      <span
                        class="font-weight-bolder d-block font-size-lg"
                        :style="{
                          color: item.BORCALACAK === 1 ? 'green' : 'red'
                        }"
                      >
                        {{ item.TUTAR | formatPrice }}
                        <span v-if="item.BORCALACAK === 1">
                          <i class="fas fa-arrow-up" style="color: green"></i>
                        </span>
                        <span v-else>
                          <i class="fas fa-arrow-down" style="color: red"></i>
                        </span>
                      </span>
                    </td>
                    <td class="text-right">
                      <span class="label-lg label-light-primary label-inline">
                        {{ item.BANKAOPTIME | formatLongDate }}
                      </span>
                    </td>
                    <td class="text-right">
                      <span
                        class="label-lg label-light-primary label-inline font-size-xs"
                        :class="{ label: item.HESAPADI != '' }"
                      >
                        {{ item.HESAPADI }}
                      </span>
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <!--end::Table-->

      <div class="row">
        <div class="col-xxl-6">
          <JsonExcel
            class="btn btn-default"
            :data="list"
            :fields="fields"
            :meta="json_meta"
            name="hesaphareketleri.xls"
          >
            Excele Aktar
          </JsonExcel>
        </div>
        <div class="col-xxl-6">
          <nav aria-label="Page navigation example">
            <ul class="pagination float-right">
              <li class="page-item">
                <button
                  type="button"
                  class="page-link"
                  v-if="page !== 1"
                  @click="page--"
                >
                  <i class="flaticon2-fast-back"></i>
                </button>
              </li>
              <li class="page-item" v-if="pages.length > 1">
                <button
                  type="button"
                  class="page-link"
                  v-for="pageNumber in pages.slice(page - 1, page + 3)"
                  v-bind:key="pageNumber"
                  @click="page = pageNumber"
                >
                  {{ pageNumber }}
                </button>
              </li>
              <li class="page-item">
                <button
                  type="button"
                  @click="page++"
                  v-if="page < pages.length"
                  class="page-link"
                >
                  <i class="flaticon2-fast-next"></i>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <br />
    </div>
    <!--end::Body-->
    <!--end::Advance Table Widget 2-->
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import JsonExcel from "vue-json-excel";

export default {
  name: "widget-2",
  data() {
    return {
      list: [],
      tmpList: [],
      fields: {
        "Şirket Adı": "SIRKETADI",
        "Banka Adı": "BANKAADI",
        "Karşı Ünvan & Ad Soyad": "KARSIADSOYAD",
        Açıklama: "ACIKLAMA",
        Tutar: "TUTAR",
        Tarih: "BANKAOPTIME",
        "Hesap Adı": "HESAPADI",
        "İşlem Kodu": "MT940KODU",
        "İşlem Açıklama": "MT940ACIKLAMA"
      },
      json_meta: [
        [
          {
            key: "charset",
            value: "utf-8"
          }
        ]
      ],
      page: 1,
      perPage: 9,
      pages: [],
      filterText: ""
    };
  },
  components: {
    JsonExcel
  },
  methods: {
    setPages() {
      this.pages = [];
      this.page = 1;
      let numberOfPages = Math.ceil(this.list.length / this.perPage);
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index);
      }
    },
    paginate(posts) {
      let page = this.page;
      let perPage = this.perPage;
      let from = page * perPage - perPage;
      let to = page * perPage;

      this.list = posts;

      this.list.forEach(data => {
        if(!(data.TUTAR.toString().indexOf('-') > -1 || data.TUTAR.toString().indexOf('+') > -1)) {
          data.TUTAR = data.BORCALACAK === 1 ?  "+" + this.format(data.TUTAR)  :  "-" + this.format(data.TUTAR);
        }
      });

      return posts.slice(from, to);
    },
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
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "";
      } else {
        return 0;
      }
    }
  },
  watch: {
    list() {
      if (
        this.list !== this.tmpList &&
        this.list.length !== this.tmpList.length
      ) {
        this.tmpList = this.list;
        this.setPages();
      }
    }
  },
  mounted() {
    this.setPages();
  },
  computed: {
    filteredData() {
      const data = this.bankAccounts.filter(element => {
        const text = (element.KARSIADSOYAD + " - " + element.ACIKLAMA).replace(
          " ",
          ""
        );

        return text
          .toUpperCase()
          .match(this.filterText.replace(" ", "").toUpperCase());
      });

      return this.paginate(data);
    },
    ...mapGetters(["layoutConfig", "bankAccounts"]),
    ...mapState({
      errors: state => state.bankAccount.errors
    })
  }
};
</script>

<style scoped>
button.page-link {
  display: inline-block;
}

button.page-link {
  font-size: 14px;
  color: #29b3ed;
  font-weight: 500;
}

button.page-link i {
  font-size: 14px;
}
</style>
