<script setup lang="ts">
import { useCustomizerStore } from '@/stores/customizer';
import { shallowRef } from 'vue';
import sidebarItems from './sidebarItem';
const customizer = useCustomizerStore();
const sidebarMenu = shallowRef(sidebarItems);
</script>

<template>
<v-navigation-drawer
  v-model="customizer.Sidebar_drawer"
  color="containerBg"
  elevation="10"
  rail-width="70"
  app
  expand-on-hover
  width="270"
  class="leftSidebar ms-lg-5 mt-sm-5"
  :rail="customizer.mini_sidebar"
>
        <div class="pa-5 pl-4 ">
            <LcFullLogo/>
        </div>
        <!-- ---------------------------------------------- -->
        <!---Navigation -->
        <!-- ---------------------------------------------- -->
        <perfect-scrollbar class="scrollnavbar bg-containerBg overflow-y-hidden">
            <v-list class="py-4 px-4 bg-containerBg">
                <!---Menu Loop -->
                <template v-for="(item, i) in sidebarMenu">
                    <!---Item Sub Header -->
                    <LcFullVerticalSidebarNavGroup :item="item" v-if="item.header" :key="item.title" />
                    <!---If Has Child -->
                    <LcFullVerticalSidebarNavCollapse class="leftPadding" :item="item" :level="0" v-else-if="item.children" />
                    <!---Single Item-->
                    <LcFullVerticalSidebarNavItem :item="item" v-else class="leftPadding" />
                    <!---End Single Item-->
                </template>
                <!-- <Moreoption/> -->
            </v-list>
            <div class="pa-6 px-4 userbottom mt-10">
                <LcFullVerticalSidebarExtrabox/>
            </div>
        </perfect-scrollbar>
    </v-navigation-drawer>
</template>
