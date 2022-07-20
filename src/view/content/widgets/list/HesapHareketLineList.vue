<template>
  <!--begin::List Widget 9-->
  <div class="card card-custom card-stretch gutter-b">
    <!--begin::Header-->
    <div class="card-header align-items-center border-0 mt-4">
      <div class="d-flex align-items-center justify-content-between">
        <div class="d-flex flex-column">
          <span class="font-weight-bolder text-dark">
            Son Hareketler
          </span>
        </div>
      </div>
      <div class="card-toolbar"></div>
    </div>
    <!--end::Header-->

    <!--begin::Body-->
    <div
      class="card-body pt-4"
      v-if="this.bankAccounts && this.bankAccounts.length > 0"
    >
      <div class="timeline timeline-5 mt-3">
        <template v-for="(item, i) in this.bankAccounts.slice(0, 10)">
          <!--begin::Item-->
          <div class="timeline-item align-items-start" v-bind:key="i">
            <!--begin::Label-->
            <div
              class="timeline-label font-weight-bolder text-dark-75 font-size-lg"
            >
              {{ item.BANKAOPTIME | dateToHour }}
            </div>
            <!--end::Label-->

            <!--begin::Badge-->
            <div class="timeline-badge">
              <i
                class="icon-xxl"
                v-bind:class="{
                  'fa fa-genderless text-success': item.BORCALACAK === 1,
                  'fa fa-genderless text-danger': item.BORCALACAK === 0
                }"
              ></i>
            </div>
            <!--end::Badge-->

            <!--begin::Text-->
            <div
              class="font-weight-mormal font-size-sm timeline-content text-muted pl-3"
            >
              <span
                v-bind:class="{
                  'font-weight-bolder text-dark-75': item.bold,
                  'mr-4': item.images
                }"
              >
                {{ item.SIRKETADI }} {{ item.TUTAR | formatPrice }}
                <br />
                {{ item.BANKAADI + ", " + item.SUBEADI }}
              </span>

              <!--end::Section-->
            </div>
            <!--end::Text-->
          </div>
          <!--end::Item-->
        </template>
      </div>
      <!--end: Items-->
    </div>
    <!--end: Card Body-->
  </div>
  <!--end: Card-->
  <!--end: List Widget 9-->
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "hesap-hareket-line-list",
  props: {
    bankAccounts: {
      type: [Array, Object],
      required: true,
      default: function() {
        return [];
      }
    }
  },
  computed: {
    ...mapGetters(["layoutConfig"])
  }
};
</script>
