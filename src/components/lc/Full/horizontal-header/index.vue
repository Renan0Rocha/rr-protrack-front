<script setup lang="ts">
import { useCustomizerStore } from "@/stores/customizer";
import { ref, watch } from "vue";
// Icon Imports
// dropdown imports
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
</script>

<template>
  <v-app-bar
    elevation="0"
    :priority="priority"
    height="75"
    class="horizontal-header"
    color="background"
  >
    <div
      :class="
        customizer.boxed
          ? 'maxWidth v-toolbar__content px-lg-0 px-4'
          : 'v-toolbar__content px-6'
      "
    >
      <div class="hidden-md-and-down mt-2 pr-4">
        <LcFullLogo />
      </div>
      <v-btn
        class="hidden-lg-and-up bg-lightsecondary custom-hover-primary"
        icon
        variant="text"
        @click.stop="customizer.SET_SIDEBAR_DRAWER"
        size="small"
      >
        <Icon icon="solar:list-bold-duotone" height="24" width="24" />
      </v-btn>


      <!---/Search part -->
      <v-spacer class="hidden-sm-and-down" />

      <div class="hidden-md-and-up w-40">
        <LcFullLogo />
      </div>

      <!-- ------------------------------------------------>
      <!-- Search part -->
      <!-- ------------------------------------------------>

      <div class="me-sm-4 me-0">
        <LcFullVerticalHeaderThemeToggler />
      </div>

      <!-- ---------------------------------------------- -->
      <!---right part -->
      <!-- ---------------------------------------------- -->
      <!-- ---------------------------------------------- -->
      <!-- translate -->
      <!-- ---------------------------------------------- -->
  

      <!-- ---------------------------------------------- -->
      <!-- ShoppingCart -->
      <!-- ---------------------------------------------- -->


      <!-- ---------------------------------------------- -->
      <!-- Notification -->
      <!-- ---------------------------------------------- -->
      <!-- <div class="hidden-sm-and-down me-sm-6 me-4">
        <LcFullVerticalHeaderNotificationDD />
      </div> -->
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
        <v-sheet
          rounded="lg"
          elevation="10"
          class="mt-5 dropdown-box px-4 py-6"
        >
          <div class="d-flex justify-space-between align-center">
            <LcFullVerticalHeaderLanguageDD />
            <v-btn icon variant="text" class="mr-sm-3 mr-2 custom-hover-primary" to="" size="small">
              <v-badge color="primary" content="0" offset-x="-4" offset-y="-6">
                <Icon icon="solar:cart-3-line-duotone" height="24" width="24" />
              </v-badge>
            </v-btn>
            <LcFullVerticalHeaderNotificationDD />
            <LcFullVerticalHeaderProfileDD />
          </div>
        </v-sheet>
      </v-menu>
    </div>
  </v-app-bar>
</template>
