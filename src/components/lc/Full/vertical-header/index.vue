<script setup lang="ts">
import { useCustomizerStore } from "@/stores/customizer";
import { onBeforeMount, ref, watch } from "vue";

// Icon Imports
import { Icon } from "@iconify/vue";
const customizer = useCustomizerStore();
const showSearch = ref(false);
const drawer = ref(false);
const appsdrawer = ref(false);
const priority = ref(customizer.setHorizontalLayout ? 0 : 0);
function searchbox() {
  showSearch.value = !showSearch.value;
}
watch(priority, (newPriority) => {
  // yes, console.log() is a side effect
  priority.value = newPriority;
});

//For on Scroll Effect on Header
onBeforeMount(() => {
  window.addEventListener("scroll", handleScroll);
});
const stickyHeader = ref(false);
function handleScroll() {
  if (window.pageYOffset) {
    stickyHeader.value = true;
  } else {
    stickyHeader.value = false;
  }
}
</script>

<template>
  <v-app-bar
    elevation="0"
    :priority="priority"
    height="75"
    color="containerBg"
    id="top"
    :class="stickyHeader ? 'sticky' : ''"
  >
    <v-btn
      class="hidden-md-and-down custom-hover-primary"
      icon
      variant="text"
      size="small"
      @click.stop="customizer.SET_MINI_SIDEBAR(!customizer.mini_sidebar)"
    >
      <Icon icon="solar:list-bold-duotone" height="24" width="24" />
    </v-btn>
    <v-btn
      class="hidden-lg-and-up custom-hover-primary"
      icon
      variant="text"
      @click.stop="customizer.SET_SIDEBAR_DRAWER"
      size="small"
    >
      <Icon icon="solar:list-bold-duotone" height="24" width="24" />
    </v-btn>

    <!-- ---------------------------------------------- -->
    <!-- Search part -->
    <!-- ---------------------------------------------- -->


    <!---/Search part -->
    <v-spacer class="hidden-sm-and-down" />

    <div class="hidden-md-and-up w-40">
      <LcFullLogo />
    </div>


    <div class="me-sm-4 me-0">
      <LcFullVerticalHeaderThemeToggler />
    </div>

    <!-- ---------------------------------------------- -->
    <!-- translate -->
    <!-- ---------------------------------------------- -->
 

    <!-- ---------------------------------------------- -->
    <!-- Notification -->
    <!-- ---------------------------------------------- -->
    <!--
    <div class="hidden-sm-and-down me-sm-6 me-4">
      <LcFullVerticalHeaderNotificationDD />
    </div>
    -->
    <!-- ---------------------------------------------- -->
    <!-- User Profile -->
    <!-- ---------------------------------------------- -->
    <div class="hidden-sm-and-down">
      <LcFullVerticalHeaderProfileDD />
    </div>

    <!-----Mobile header------>
    <v-menu :close-on-content-click="false" class="mobile_popup">
      <template v-slot:activator="{ props }">
        <v-btn
          icon
          class="bg-lightprimary hidden-md-and-up custom-hover-primary"
          flat
          v-bind="props"
          size="small"
        >
          <DotsIcon stroke-width="2" size="24" class="text-primary" />
        </v-btn>
      </template>
      <v-sheet rounded="lg" elevation="10" class="mt-5 dropdown-box px-4 py-6">
        <div class="d-flex justify-space-between align-center">
          
          <v-btn icon variant="text" to="" size="small" class="custom-hover-primary">
            <v-badge color="primary" content="0" offset-x="-4" offset-y="-6">
              <Icon icon="solar:cart-3-line-duotone" height="24" width="24" />
            </v-badge>
          </v-btn>
          <LcFullVerticalHeaderNotificationDD />
          <LcFullVerticalHeaderProfileDD />
        </div>
      </v-sheet>
    </v-menu>
  </v-app-bar>
</template>
