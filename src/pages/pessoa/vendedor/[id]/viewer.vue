<script setup lang="ts">
import { useRoute } from 'vue-router';
import { VendedorViewerView } from '~/modules/pessoa/vendedor/views';

const route = useRoute();
const id = Array.isArray(route.params.id)
  ? route.params.id[0]
  : route.params.id ?? '';
</script>

<template>
  <VendedorViewerView :id="id" />
</template>
