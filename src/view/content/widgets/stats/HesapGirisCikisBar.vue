<template>
  <!--begin::Stats Widget 7-->
  <div class="card card-custom card-stretch card-stretch-half gutter-b">
    <!--begin::Body-->
    <div class="card-body d-flex flex-column p-0">
      <div
        class="d-flex align-items-center justify-content-between card-spacer"
      >
        <div class="d-flex flex-column text-right">
          <span class="font-weight-bolder text-dark">
            {{ title }}
          </span>
        </div>
      </div>
      <!--begin::Chart-->
      <apexchart
        class="card-rounded-bottom"
        :options="chartOptions"
        :series="series"
        type="bar"
        height="240"
      ></apexchart>
      <!--end::Chart-->
    </div>
    <!--end::Body-->
  </div>
  <!--end::Stats Widget 7-->
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";

export default {
  name: "giris-cikis-bar",
  props: {
    type: [Number, String],
    title: String,
    dataAccounts: {},
    fnChangeData: [Function]
  },
  data() {
    return {
      chartOptions: {},
      categories: [],
      series: [
        {
          name: "Tutar: ",
          data: []
        }
      ],
      chartData: {}
    };
  },
  watch: {
    dataAccounts: function() {
      this.chartData = this.dataAccounts;
      this.setChartData();
    }
  },
  methods: {
    formatDate: function(dt) {
      return moment(String(dt)).format("HH:mm");
    },
    setChartData: function() {
      this.series[0].data = [];
      this.categories = [];

      if (this.chartData && this.chartData.length) {
        for (let key in this.chartData) {
          const item = this.chartData[key];

          if (this.type === "1") {
            if (this.series[0].data.length < 10 && item.BORCALACAK === 1) {
              this.series[0].data.push(item.TUTAR);
              this.categories.push(this.formatDate(item.BANKAOPTIME));
            }
          } else {
            if (this.series[0].data.length < 10 && item.BORCALACAK === 0) {
              this.series[0].data.push(item.TUTAR);
              this.categories.push(this.formatDate(item.BANKAOPTIME));
            }
          }
        }
      }

      this.chartOptions = {
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: "smooth"
        },
        xaxis: {
          categories: this.categories
        },
        tooltip: {
          fixed: {
            enabled: false,
            position: "topRight"
          }
        }
      };
    }
  },
  computed: {
    ...mapGetters(["layoutConfig", "bankAccounts"])
  },
  mounted() {
    this.setChartData();
  }
};
</script>
