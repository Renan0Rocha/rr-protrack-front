<script setup lang="ts">
import { useRoute } from 'vue-router';
import { ClienteViewerView } from '~/modules/pessoa/cliente/views';

const route = useRoute();
const id = Array.isArray(route.params.id)
  ? route.params.id[0]
  : route.params.id ?? '';
</script>

<template>
  <ClienteViewerView :id="id" />
</template>
