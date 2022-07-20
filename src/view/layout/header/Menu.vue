<template>
  <ul class="menu-nav">
    <router-link
      to="/dashboard"
      v-slot="{ href, navigate, isActive, isExactActive }"
    >
      <li
        aria-haspopup="true"
        data-menu-toggle="hover"
        class="menu-item"
        :class="[
          isActive && 'menu-item-active',
          isExactActive && 'menu-item-active'
        ]"
      >
        <a :href="href" class="menu-link" @click="navigate">
          <span class="menu-text"> Dashboard </span>
        </a>
      </li>
    </router-link>

    <li
      aria-haspopup="true"
      data-menu-toggle="click"
      class="menu-item menu-item-submenu menu-item-open-dropdown"
      v-if="menuVisible"
    >
      <a href="#" class="menu-link menu-toggle">
        <span class="menu-text"> Dönem </span>
      </a>
      <div class="menu-submenu menu-submenu-classic">
        <ul class="menu-subnav">
          <router-link
            :to="{
              name: 'dashboard-report',
              params: { id: 121, bankId: -1 }
            }"
            v-slot="{ href, navigate, isActive, isExactActive }"
          >
            <li
              aria-haspopup="true"
              class="menu-item"
              :class="[
                isActive && 'menu-item-active',
                isExactActive && 'menu-item-active'
              ]"
            >
              <a :href="href" class="menu-link" @click="navigate">
                <i class="menu-bullet menu-bullet-dot"><span></span></i>
                <span class="menu-text"> Bugün </span>
              </a>
            </li>
          </router-link>

          <router-link
            :to="{
              name: 'dashboard-report',
              params: { id: 122, bankId: -1 }
            }"
            v-slot="{ href, navigate, isActive, isExactActive }"
          >
            <li
              aria-haspopup="true"
              class="menu-item"
              :class="[
                isActive && 'menu-item-active',
                isExactActive && 'menu-item-active'
              ]"
            >
              <a :href="href" class="menu-link" @click="navigate">
                <i class="menu-bullet menu-bullet-dot"><span></span></i>
                <span class="menu-text"> Bu Hafta </span>
              </a>
            </li>
          </router-link>

          <router-link
            :to="{
              name: 'dashboard-report',
              params: { id: 123, bankId: -1 }
            }"
            v-slot="{ href, navigate, isActive, isExactActive }"
          >
            <li
              aria-haspopup="true"
              class="menu-item"
              :class="[
                isActive && 'menu-item-active',
                isExactActive && 'menu-item-active'
              ]"
            >
              <a :href="href" class="menu-link" @click="navigate">
                <i class="menu-bullet menu-bullet-dot"><span></span></i>
                <span class="menu-text"> Bu Ay </span>
              </a>
            </li>
          </router-link>

          <router-link
            :to="{
              name: 'dashboard-report',
              params: { id: 124, bankId: -1 }
            }"
            v-slot="{ href, navigate, isActive, isExactActive }"
          >
            <li
              aria-haspopup="true"
              class="menu-item"
              :class="[
                isActive && 'menu-item-active',
                isExactActive && 'menu-item-active'
              ]"
            >
              <a :href="href" class="menu-link" @click="navigate">
                <i class="menu-bullet menu-bullet-dot"><span></span></i>
                <span class="menu-text"> Bu Yıl </span>
              </a>
            </li>
          </router-link>

          <router-link
            :to="{
              name: 'dashboard-report',
              params: { id: 125, bankId: -1 }
            }"
            v-slot="{ href, navigate, isActive, isExactActive }"
          >
            <li
              aria-haspopup="true"
              class="menu-item"
              :class="[
                isActive && 'menu-item-active',
                isExactActive && 'menu-item-active'
              ]"
            >
              <a :href="href" class="menu-link" @click="navigate">
                <i class="menu-bullet menu-bullet-dot"><span></span></i>
                <span class="menu-text"> Tüm Hareketler </span>
              </a>
            </li>
          </router-link>
        </ul>
      </div>
    </li>

    <li
      aria-haspopup="true"
      data-menu-toggle="click"
      class="menu-item menu-item-submenu menu-item-open-dropdown"
      v-if="userCompanies && userCompanies.length > 0 && menuVisible"
    >
      <a href="#" class="menu-link menu-toggle">
        <span class="menu-text"> Şirketler </span>
      </a>
      <div class="menu-submenu menu-submenu-classic">
        <ul class="menu-subnav">
          <router-link
            v-for="(item, i) in userCompanies.slice(0, 7)"
            :key="i"
            :to="{
              name: 'dashboard-report',
              params: { id: item.SIRKETID, bankId: -1 }
            }"
            v-slot="{ href, navigate, isActive, isExactActive }"
          >
            <li
              aria-haspopup="true"
              class="menu-item"
              :class="[
                isActive && 'menu-item-active',
                isExactActive && 'menu-item-active'
              ]"
            >
              <a :href="href" class="menu-link" @click="navigate">
                <i class="menu-bullet menu-bullet-dot"><span></span></i>
                <span class="menu-text"> {{ item.SIRKETADI }} </span>
              </a>
            </li>
          </router-link>
        </ul>
      </div>
    </li>

    <li
      aria-haspopup="true"
      data-menu-toggle="click"
      class="menu-item menu-item-submenu menu-item-open-dropdown"
      v-if="banks && banks.length > 0 && menuVisible"
    >
      <a href="#" class="menu-link menu-toggle">
        <span class="menu-text"> Bankalar </span>
      </a>
      <div class="menu-submenu menu-submenu-fixed">
        <div class="menu-subnav megamenu" style="max-width: 1000px;">
          <ul class="menu-content">
            <li class="menu-item">
              <h3 class="menu-heading menu-toggle">
                <i class="menu-bullet menu-bullet-dot"><span></span></i>
                <span class="menu-text"> A-F </span>
                <i class="menu-arrow"></i>
              </h3>
              <ul class="menu-inner">
                <router-link
                  v-for="item in banks.slice(0, 8)"
                  :to="{
                    name: 'dashboard-report',
                    params: { id: -1, bankId: item.BANKAID }
                  }"
                  v-slot="{ href, navigate, isActive, isExactActive }"
                  :key="item.BANKAID"
                >
                  <li
                    aria-haspopup="true"
                    class="menu-item"
                    :class="[
                      isActive && 'menu-item-active',
                      isExactActive && 'menu-item-active'
                    ]"
                  >
                    <a :href="href" class="menu-link" @click="navigate">
                      <i class="menu-bullet menu-bullet-dot"><span></span></i>
                      <span class="menu-text"> {{ item.BANKAADI }} </span>
                    </a>
                  </li>
                </router-link>
              </ul>
            </li>
            <li class="menu-item">
              <h3 class="menu-heading menu-toggle">
                <i class="menu-bullet menu-bullet-dot"><span></span></i>
                <span class="menu-text"> G-Ş </span>
                <i class="menu-arrow"></i>
              </h3>
              <ul class="menu-inner">
                <router-link
                  v-for="item in banks.slice(8, 17)"
                  :to="{
                    name: 'dashboard-report',
                    params: { id: -1, bankId: item.BANKAID }
                  }"
                  v-slot="{ href, navigate, isActive, isExactActive }"
                  :key="item.BANKAID"
                >
                  <li
                    aria-haspopup="true"
                    class="menu-item"
                    :class="[
                      isActive && 'menu-item-active',
                      isExactActive && 'menu-item-active'
                    ]"
                  >
                    <a :href="href" class="menu-link" @click="navigate">
                      <i class="menu-bullet menu-bullet-dot"><span></span></i>
                      <span class="menu-text"> {{ item.BANKAADI }} </span>
                    </a>
                  </li>
                </router-link>
              </ul>
            </li>
            <li class="menu-item">
              <h3 class="menu-heading menu-toggle">
                <i class="menu-bullet menu-bullet-dot"><span></span></i>
                <span class="menu-text"> T-Z </span>
                <i class="menu-arrow"></i>
              </h3>
              <ul class="menu-inner">
                <router-link
                  v-for="item in banks.slice(17, 30)"
                  :to="{
                    name: 'dashboard-report',
                    params: { id: -1, bankId: item.BANKAID }
                  }"
                  v-slot="{ href, navigate, isActive, isExactActive }"
                  :key="item.BANKAID"
                >
                  <li
                    aria-haspopup="true"
                    class="menu-item"
                    :class="[
                      isActive && 'menu-item-active',
                      isExactActive && 'menu-item-active'
                    ]"
                  >
                    <a :href="href" class="menu-link" @click="navigate">
                      <i class="menu-bullet menu-bullet-dot"><span></span></i>
                      <span class="menu-text"> {{ item.BANKAADI }} </span>
                    </a>
                  </li>
                </router-link>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </li>

    <li
      aria-haspopup="true"
      data-menu-toggle="click"
      class="menu-item menu-item-submenu menu-item-open-dropdown"
      v-if="menuVisible"
    >
      <a href="#" class="menu-link menu-toggle">
        <span class="menu-text"> Detay Raporlar </span>
      </a>
      <div class="menu-submenu menu-submenu-classic">
        <ul class="menu-subnav">
          <router-link
            :to="{
              name: 'hesap-hareketleri',
              params: { bankId: -1, compId: -1 }
            }"
            v-slot="{ href, navigate, isActive, isExactActive }"
          >
            <li
              aria-haspopup="true"
              class="menu-item"
              :class="[
                isActive && 'menu-item-active',
                isExactActive && 'menu-item-active'
              ]"
            >
              <a :href="href" class="menu-link" @click="navigate">
                <i class="menu-bullet menu-bullet-dot"><span></span></i>
                <span class="menu-text"> Hareket Raporu </span>
              </a>
            </li>
          </router-link>

          <router-link
            to="/"
            exact
            v-slot="{ href, navigate, isActive, isExactActive }"
          >
            <li
              aria-haspopup="true"
              class="menu-item"
              :class="[
                isActive && 'menu-item-active',
                isExactActive && 'menu-item-active'
              ]"
            >
              <a :href="href" class="menu-link" @click="navigate">
                <i class="menu-bullet menu-bullet-dot"><span></span></i>
                <span class="menu-text"> Mutabakat Raporu </span>
              </a>
            </li>
          </router-link>

          <router-link
            to="/hesap-bakiye-bilgileri"
            v-slot="{ href, navigate, isActive, isExactActive }"
          >
            <li
              aria-haspopup="true"
              class="menu-item"
              :class="[
                isActive && 'menu-item-active',
                isExactActive && 'menu-item-active'
              ]"
            >
              <a :href="href" class="menu-link" @click="navigate">
                <i class="menu-bullet menu-bullet-dot"><span></span></i>
                <span class="menu-text"> Genel Durum Raporu </span>
              </a>
            </li>
          </router-link>

          <router-link
            to="/"
            exact
            v-slot="{ href, navigate, isActive, isExactActive }"
          >
            <li
              aria-haspopup="true"
              class="menu-item"
              :class="[
                isActive && 'menu-item-active',
                isExactActive && 'menu-item-active'
              ]"
            >
              <a :href="href" class="menu-link" @click="navigate">
                <i class="menu-bullet menu-bullet-dot"><span></span></i>
                <span class="menu-text"> Entegrasyon Raporu </span>
              </a>
            </li>
          </router-link>

          <router-link
            to="/banka-bildirim-liste"
            v-slot="{ href, navigate, isActive, isExactActive }"
          >
            <li
              aria-haspopup="true"
              class="menu-item"
              :class="[
                isActive && 'menu-item-active',
                isExactActive && 'menu-item-active'
              ]"
            >
              <a :href="href" class="menu-link" @click="navigate">
                <i class="menu-bullet menu-bullet-dot"><span></span></i>
                <span class="menu-text"> Bildirim Raporu </span>
              </a>
            </li>
          </router-link>

          <router-link
            to="/"
            exact
            v-slot="{ href, navigate, isActive, isExactActive }"
          >
            <li
              aria-haspopup="true"
              class="menu-item"
              :class="[
                isActive && 'menu-item-active',
                isExactActive && 'menu-item-active'
              ]"
            >
              <a :href="href" class="menu-link" @click="navigate">
                <i class="menu-bullet menu-bullet-dot"><span></span></i>
                <span class="menu-text"> İstatistikler </span>
              </a>
            </li>
          </router-link>
        </ul>
      </div>
    </li>
  </ul>
</template>

<script>
import { mapGetters } from "vuex";
import { GET_BANK } from "@/core/services/store/bank.module";

export default {
  name: "KTMenu",
  data() {
    return {
      menuVisible: true
    };
  },
  watch: {
    $route() {
      this.menuVisible =
        this.$route.name === "dashboard" ||
        this.$route.name === "dashboard-report";
    }
  },
  methods: {
    hasActiveChildren(match) {
      return this.$route["path"].indexOf(match) !== -1;
    },
    getBankList: function() {
      this.$store.dispatch(GET_BANK);
    },
    isMobile() {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    }
  },
  computed: {
    ...mapGetters(["banks", "userCompanies"])
  },
  mounted() {
    this.getBankList();
  }
};
</script>
