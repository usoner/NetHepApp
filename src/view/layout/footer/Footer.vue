<template>
  <!-- begin:: Footer -->
  <div class="footer bg-white py-4 d-flex flex-lg-column" id="kt_footer">
    <div
      class="d-flex align-items-center justify-content-between"
      v-bind:class="{ 'container-fluid': widthFluid, container: !widthFluid }"
    >
      <div class="text-dark">
        <span class="text-muted font-weight-bold mr-2">
          2020 &nbsp;&copy;&nbsp;
        </span>
     
       <!-- NetHesApp web site -->
        <a        
          href="http://localhost:62893/"
          target="_blank"
          class="text-dark-75 text-hover-primary"
        >
          NetHesApp
        </a>
      </div>
      <div class="nav nav-dark">
        <a target="_blank" class="nav-link pr-3 pl-0">
          Hakkımızda
        </a>

        <router-link
          to="/bize-ulasin"
          v-slot="{ href, navigate, isActive, isExactActive }"
        >
          <a :href="href" class="nav-link pr-3 pl-0" @click="navigate">
            <span class="menu-text">Bize Ulaşın</span>
          </a>
        </router-link>
      </div>
    </div>
  </div>
  <!-- end:: Footer -->
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "KTFooter",
  computed: {
    ...mapGetters(["layoutConfig"]),

    /**
     * Check if footer container is fluid
     */
    widthFluid() {
      return this.layoutConfig("footer.width") === "fluid";
    }
  }
};
</script>
