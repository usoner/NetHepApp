<template>
  <!--begin::List Widget 4-->
  <div class="card mt-2">
    <!--begin::Header-->
    <div class="card-header border-0">
      <div class="d-flex align-items-center justify-content-between">
        <div class="d-flex flex-column">
          <span class="font-weight-bolder text-dark">
            Genel Durum(Bakiye)
          </span>
        </div>
      </div>
    </div>
    <!--end::Header-->
    <!--begin::Body-->
    <div class="card-body p-2">
      <div id="chartdiv" :style="{ height: '500px', width: '100%' }"></div>
    </div>
    <!--end::Body-->
  </div>
  <!--end: List Widget 4-->
</template>

<script>
import {mapGetters} from "vuex";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

export default {
  name: "banka-bakiye-pie",
  props: {
    bankTotalAmountData: {
      type: [Array, Object],
      required: true,
      default: function () {
        return [];
      }
    }
  },
  data() {
    return {
      chartData: {},
      chartHeight: 400,
      chartWidth: 100
    };
  },
  watch: {
    bankTotalAmountData: function () {
      if (
          !this.chartData ||
          this.chartData.length !== this.bankTotalAmountData.length
      ) {
        this.chartData = this.bankTotalAmountData;
        this.isMobile();
      }
    }
  },
  methods: {
    setChartData: function () {
      const chart = am4core.create("chartdiv", am4charts.PieChart3D);

      chart.data = [];

      if (this.bankTotalAmountData && this.bankTotalAmountData.length > 0) {
        const summaryValues = this.groupBy(
            this.bankTotalAmountData,
            "BANKAADI"
        );

        Object.keys(summaryValues).map(field => {
          chart.data.push({
            Banka: field,
            Bakiye: summaryValues[field].reduce(
                (sum, item) => sum + item.BAKIYE,
                0
            )
          });
        });
      }

      const pieSeries = chart.series.push(new am4charts.PieSeries3D());
      pieSeries.dataFields.value = "Bakiye";
      pieSeries.dataFields.category = "Banka";

      chart.legend = new am4charts.Legend();
    },
    groupBy: function (array, key) {
      const result = {};
      array.forEach(item => {
        if (!result[item[key]]) {
          result[item[key]] = [];
        }
        result[item[key]].push(item);
      });
      return result;
    },
    setChartData2: function () {
      const chart = am4core.create("chartdiv", am4charts.PieChart3D);

      chart.data = [];

      if (this.bankTotalAmountData && this.bankTotalAmountData.length > 0) {
        const summaryValues = this.groupBy(
            this.bankTotalAmountData,
            "BANKAADI"
        );

        Object.keys(summaryValues).map(field => {
          chart.data.push({
            Banka: field,
            Bakiye: summaryValues[field].reduce(
                (sum, item) => sum + item.BAKIYE,
                0
            )
          });
        });
      }

      const pieSeries = chart.series.push(new am4charts.PieSeries3D());
      pieSeries.dataFields.value = "Bakiye";
      pieSeries.dataFields.category = "Banka";

      pieSeries.ticks.template.disabled = true;
      pieSeries.alignLabels = false;
      pieSeries.labels.template.text = "{value.percent.formatNumber('#.0')}%";
      pieSeries.labels.template.radius = am4core.percent(-40);
      pieSeries.labels.template.fill = am4core.color("white");

      pieSeries.labels.template.adapter.add("radius", function (radius, target) {
        if (target.dataItem && target.dataItem.values.value.percent < 5) {
          return 0;
        }
        return radius;
      });

      pieSeries.labels.template.adapter.add("fill", function (color, target) {
        if (target.dataItem && target.dataItem.values.value.percent < 5) {
          return am4core.color("#fff");
        }
        return color;
      });

      chart.legend = new am4charts.Legend();
    },
    isMobile() {
      if (
          /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
              navigator.userAgent
          )
      ) {
        this.chartHeight = 600;
        this.chartWidth = 100;
        this.setChartData2();
      } else if (
          this.chartData.length !== undefined &&
          this.chartData.length < 30
      ) {
        this.chartHeight = 800;
        this.chartWidth = 100;
        this.setChartData();
      } else {
        this.chartHeight = 1100;
        this.chartWidth = 100;
        this.setChartData();
      }
    }
  },
  computed: {
    ...mapGetters(["layoutConfig"])
  },
  mounted() {
    // Create chart
    this.setChartData();
    this.isMobile();
  },
  destroyed() {
    if (this.chart) {
      this.chart.dispose();
    }
  }
};
</script>
