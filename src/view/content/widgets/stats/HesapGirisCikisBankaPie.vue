<template>
  <!--begin::Stats Widget 12-->
  <div class="card card-custom card-stretch card-stretch-half gutter-b">
    <!--begin::Body-->
    <div class="card-body d-flex flex-column p-0">
      <div
        class="d-flex align-items-center justify-content-between card-spacer"
      >
        <div class="d-flex flex-column text-right">
          <span class="font-weight-bolder text-dark">
            {{ type === "1" ? "Hesaptan Çıkan" : "Hesaba Giren" }}
          </span>
        </div>
      </div>
      <!--begin::Chart-->
      <apexchart
        ref="donut"
        :width="chartWidth - 20"
        height="250"
        type="donut"
        :options="chartOptions"
        :series="series"
      ></apexchart>

      <!--end::Chart-->
    </div>
    <!--end::Body-->
  </div>
  <!--end::Stats Widget 12-->
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "hesap-giris-cikis-banka-pie",
  props: {
    type: [Number, String],
    chartData: {
      type: [Array, Object],
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {
      startDate: "2020-01-01",
      endDate: "2020-07-01",
      companyId: 0,
      companyId2: 9801,
      chartOptions: {
        labels: []
      },
      series: [],
      data: {},
      chartWidth: 400
    };
  },
  watch: {
    chartData: function() {
      if (!this.data || this.data.length !== this.chartData.length) {
        this.data = this.chartData;
        this.setChartData();
      }
    }
  },
  methods: {
    setChartData: function() {
      this.series = [];
      this.chartOptions = {
        labels: []
      };

      if (this.chartData && this.chartData.length > 0) {
        for (let key in this.chartData) {
          const item = this.chartData[key];

          if (key < 5) {
            this.chartOptions.labels.push(item.BANKAADI.substring(0, 10));
            this.series.push(item.TUTARTOPLAM);
          }
        }
      }
    },
    isMobile() {
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        this.chartWidth = 360;
      } else {
        this.chartWidth = 400;
      }
    }
  },
  computed: {
    ...mapGetters(["layoutConfig"]),
    accountInParams() {
      const sDate = this.startDate;
      const eDate = this.endDate;
      const compId = this.companyId;
      const compId2 = this.companyId2;

      return {
        params: {
          p_dtBasTarih: this.formatDate(sDate),
          p_dtSonTarih: this.formatDate(eDate),
          p_nSirketID: compId,
          p_nUstSirketID: compId2,
          p_bBorcAlacak: 1
        }
      };
    },
    accountOutParams() {
      const sDate = this.startDate;
      const eDate = this.endDate;
      const compId = this.companyId;
      const compId2 = this.companyId2;

      return {
        params: {
          p_dtBasTarih: this.formatDate(sDate),
          p_dtSonTarih: this.formatDate(eDate),
          p_nSirketID: compId,
          p_nUstSirketID: compId2,
          p_bBorcAlacak: 0
        }
      };
    }
  },
  mounted() {
    this.setChartData();
    this.isMobile();
  },
  beforeDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
};
</script>
