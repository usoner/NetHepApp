<template>
  <!--begin::List Widget 4-->
  <div class="card card-custom card-stretch gutter-b">
    <!--begin::Header-->
    <div class="card-header border-0">
      <div class="d-flex align-items-center justify-content-between">
        <div class="d-flex flex-column">
          <span class="font-weight-bolder text-dark">
            Hesaptan Çıkış Hareketleri
          </span>
        </div>
      </div>
    </div>
    <!--end::Header-->
    <!--begin::Body-->
    <div class="card-body pt-2">
      <template v-for="(item, i) in list">
        <!--begin::Item-->
        <div class="d-flex align-items-center mb-10" v-bind:key="i">
          <!--begin::Bullet-->
          <span
            class="bullet bullet-bar align-self-stretch"
            v-bind:class="`bg-${item.style}`"
          ></span>
          <!--end::Bullet-->
          <!--begin::Checkbox-->
          <label class="mr-5">
            <span></span>
          </label>
          <!--end::Checkbox-->
          <!--begin::Text-->
          <div class="d-flex flex-column flex-grow-1">
            <a
              href="#"
              class="text-dark-75 text-hover-primary font-weight-bold font-size-lg mb-1"
            >
              {{ item.title }}
            </a>
            <span class="text-muted font-weight-bold">
              {{ item.desc | formatPrice }}
            </span>
          </div>
          <!--end::Text-->
        </div>
        <!--end:Item-->
      </template>
    </div>
    <!--end::Body-->
  </div>
  <!--end: List Widget 4-->
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "hesap-cikis-line-list",
  props: {
    bankAccountPieOutData: {
      type: [Array, Object],
      required: true,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {
      list: []
    };
  },
  watch: {
    bankAccountPieOutData: function() {
      this.setChartData();
    }
  },
  methods: {
    setChartData: function() {
      this.list = [];
      if (this.bankAccountPieOutData && this.bankAccountPieOutData.length > 0) {
        for (let key in this.bankAccountPieOutData) {
          if (key < 5) {
            this.list.push({
              title: this.bankAccountPieOutData[key].BANKAADI,
              desc: this.bankAccountPieOutData[key].TUTARTOPLAM,
              style: "primary"
            });
          }
        }
      }
    }
  },
  computed: {
    ...mapGetters(["layoutConfig"])
  },
  mounted() {
    this.setChartData();
  }
};
</script>
