<script setup lang="ts">
import { useRoute } from 'vue-router';
import { VendedorEditView } from '~/modules/pessoa/vendedor/views';

const route = useRoute();
const id = Array.isArray(route.params.id)
  ? route.params.id[0]
  : route.params.id ?? '';
</script>

<template>
  <VendedorEditView :id="id" />
</template>
