<template>
  <div>
    <!--begin::Header -->
    <div
      class="d-flex flex-column flex-center py-10 bgi-size-cover bgi-no-repeat rounded-top"
      :style="{ backgroundImage: `url(${backgroundImage})` }"
    >
      <h4 class="text-white font-weight-bold">
        Kısayollar
      </h4>
    </div>
    <!--end::Header -->

    <!--begin::Nav -->
    <div class="row row-paddingless">
      <!--begin:Item-->
      <template v-for="(item, i) in list">
        <div class="col-6" v-bind:key="i">
          <router-link
            to="builder"
            class="d-block py-10 px-5 text-center bg-hover-light border-right border-bottom"
          >
            <span class="svg-icon svg-icon-3x svg-icon-success">
              <!--begin::Svg Icon-->
              <inline-svg :src="item.svg" />
              <!--end::Svg Icon-->
            </span>
            <span
              class="d-block text-dark-75 font-weight-bold font-size-h6 mt-2 mb-1"
            >
              {{ item.title }}
            </span>
            <span class="d-block text-dark-50 font-size-lg">
              {{ item.desc }}
            </span>
          </router-link>
        </div>
      </template>
      <!--end:Item-->
    </div>
    <!--end::Nav -->
  </div>
</template>

<script>
export default {
  name: "KTDropdownQuickAction",
  data() {
    return {
      list: [
        {
          title: "Hesap Hareketleri",
          svg: process.env.BASE_URL + "media/svg/icons/Shopping/Euro.svg"
        },
        {
          title: "Hesap Bakiyeleri",
          svg:
            process.env.BASE_URL +
            "media/svg/icons/Communication/Mail-attachment.svg"
        },
        {
          title: "Bankalar",
          svg: process.env.BASE_URL + "media/svg/icons/Shopping/Box2.svg"
        },
        {
          title: "Kullanıcılar",
          svg: process.env.BASE_URL + "media/svg/icons/Communication/Group.svg"
        }
      ]
    };
  },
  computed: {
    backgroundImage() {
      return process.env.BASE_URL + "media/misc/bg-1.jpg";
    }
  }
};
</script>
