<template>
  <div>
    <div
      class="d-flex flex-column pt-12 bgi-size-cover bgi-no-repeat rounded-top"
      :style="{ backgroundImage: `url(${backgroundImage})` }"
    >
      <h4 class="d-flex flex-center rounded-top">
        <span class="text-white">Bildirimler</span>
        <span
          class="btn btn-text btn-success btn-sm font-weight-bold btn-font-md ml-2"
        >
          23 yeni bildirim
        </span>
      </h4>

      <ul
        class="nav nav-bold nav-tabs nav-tabs-line nav-tabs-line-3x nav-tabs-line-transparent-white nav-tabs-line-active-border-success mt-3 px-8"
        role="tablist"
      >
        <li class="nav-item">
          <a
            v-on:click="setActiveTab"
            data-tab="0"
            class="nav-link active"
            data-toggle="tab"
            href="#"
            role="tab"
          >
            Hesap
          </a>
        </li>
        <li class="nav-item">
          <a
            v-on:click="setActiveTab"
            data-tab="1"
            class="nav-link"
            data-toggle="tab"
            href="#"
            role="tab"
          >
            Sistem
          </a>
        </li>
      </ul>
    </div>

    <b-tabs class="hide-tabs" v-model="tabIndex">
      <b-tab active class="p-8">
        <perfect-scrollbar
          class="scroll pr-7 mr-n7"
          style="max-height: 40vh; position: relative;"
        >
          <template v-for="(item, i) in list1">
            <!--begin::Item-->
            <div class="d-flex align-items-center mb-6" v-bind:key="i">
              <!--begin::Symbol-->
              <div
                class="symbol symbol-40 mr-5"
                v-bind:class="`symbol-light-${item.color}`"
              >
                <span class="symbol-label">
                  <span
                    class="svg-icon svg-icon-lg"
                    v-bind:class="`svg-icon-${item.color}`"
                  >
                    <!--begin::Svg Icon-->
                    <inline-svg :src="item.svg" />
                    <!--end::Svg Icon-->
                  </span>
                </span>
              </div>
              <!--end::Symbol-->
              <!--begin::Text-->
              <div class="d-flex flex-column font-weight-bold">
                <a
                  href="#"
                  class="text-dark text-hover-primary mb-1 font-size-lg"
                >
                  {{ item.title }}
                </a>
                <span class="text-muted">
                  {{ item.desc }}
                  <br />
                  {{ item.time }}
                </span>
              </div>
              <!--end::Text-->
            </div>
            <!--end::Item-->
          </template>
        </perfect-scrollbar>
      </b-tab>

      <b-tab>
        <perfect-scrollbar
          class="navi navi-hover scroll my-4"
          style="max-height: 40vh; position: relative;"
        >
          <template v-for="(item, i) in list2">
            <a href="#" class="navi-item" v-bind:key="i">
              <div class="navi-link">
                <div class="navi-icon mr-2">
                  <i v-bind:class="item.icon"></i>
                </div>
                <div class="navi-text">
                  <div class="font-weight-bold">
                    {{ item.title }}
                  </div>
                  <div class="text-muted">
                    {{ item.desc }}
                  </div>
                </div>
              </div>
            </a>
          </template>
        </perfect-scrollbar>
      </b-tab>
    </b-tabs>
  </div>
</template>

<style lang="scss">
/* hide default vue-bootstrap tab links */
.hide-tabs > div:not(.tab-content) {
  display: none;
}
</style>

<script>
import moment from "moment";

export default {
  name: "KTDropdownNotification",
  data() {
    return {
      tabIndex: 0,
      list1: [
        {
          title: "Hesap Hareketi",
          desc: "Hesap hareketi güncellendi",
          time: this.getTimeMessage(new Date()),
          color: "warning",
          svg: process.env.BASE_URL + "media/svg/icons/Communication/Write.svg"
        },
        {
          title: "Para Girişi",
          desc: "3.000 TL üzerinde giriş oldu",
          time: this.getTimeMessage(
            new Date(
              new Date().getFullYear(),
              new Date().getMonth(),
              new Date().getDate(),
              new Date().getHours(),
              new Date().getMinutes() - 6
            )
          ),
          color: "success",
          svg: process.env.BASE_URL + "media/svg/icons/Home/Library.svg"
        },
        {
          title: "Para Çıkışı",
          desc: "3.000 TL üzerinde çıkış oldu",
          time: this.getTimeMessage(
            new Date(
              new Date().getFullYear(),
              new Date().getMonth(),
              new Date().getDate(),
              new Date().getHours(),
              new Date().getMinutes() - 14
            )
          ),
          color: "danger",
          svg: process.env.BASE_URL + "media/svg/icons/General/Attachment2.svg"
        },
        {
          title: "EFT Talimatı",
          desc: "Beklenen EFT talimatı gerçekleşti",
          time: this.getTimeMessage(
            new Date(
              new Date().getFullYear(),
              new Date().getMonth(),
              new Date().getDate(),
              new Date().getHours() - 1
            )
          ),
          color: "primary",
          svg:
            process.env.BASE_URL +
            "media/svg/icons/Communication/Group-chat.svg"
        },
        {
          title: "Para Çıkışı",
          desc: "3.000 TL üzerinde çıkış oldu",
          time: this.getTimeMessage(
            new Date(
              new Date().getFullYear(),
              new Date().getMonth(),
              new Date().getDate(),
              new Date().getHours() - 2
            )
          ),
          color: "danger",
          svg: process.env.BASE_URL + "media/svg/icons/General/Attachment2.svg"
        }
      ],
      list2: [
        {
          title: "Ömer Alp sisteme giriş yaptı",
          desc: "Az Önce",
          icon: "flaticon2-user flaticon2-line- text-success"
        },
        {
          title: "Abdullah Okan hesap hareketlerini görüntüledi",
          desc: "23:30",
          icon: "flaticon2-line-chart text-success"
        },
        {
          title: "aokan@limak.com.tr mail adresine EFT bildirimi gönderildi",
          desc: "17:55",
          icon: "flaticon2-mail text-danger"
        },
        {
          title: "Ufuk Soner sisteme giriş yaptı",
          desc: "14:43",
          icon: "flaticon2-user flaticon2-line- text-success"
        },
        {
          title: "5535216029 nolu telefona EFT bildirimi gönderildi",
          desc: "14:41",
          icon: "flaticon2-sms text-warning"
        }
      ]
    };
  },
  methods: {
    getTimeMessage(endDate) {
      const startDate = new Date();

      if (startDate.getHours() === endDate.getHours()) {
        if (
          startDate.getMinutes() - endDate.getMinutes() < 5
        ) {
          return "Az önce";
        } else {
          return startDate.getMinutes() - endDate.getMinutes() + " dakika önce";
        }
      } else {
        if (
          startDate.getHours() - endDate.getHours() === 1
        ) {
          return "1 saat önce";
        } else {
          return this.formatDate(endDate);
        }
      }
    },
    setActiveTab(event) {
      const tab = event.target.closest('[role="tablist"]');
      const links = tab.querySelectorAll(".nav-link");
      // remove active tab links
      for (let i = 0; i < links.length; i++) {
        links[i].classList.remove("active");
      }

      // set clicked tab index to bootstrap tab
      this.tabIndex = parseInt(event.target.getAttribute("data-tab"));

      // set current active tab
      event.target.classList.add("active");
    },
    formatDate: function(dt) {
      return moment(String(dt)).format("hh:mm");
    }
  },
  computed: {
    backgroundImage() {
      return process.env.BASE_URL + "media/misc/bg-1.jpg";
    }
  }
};
</script>
