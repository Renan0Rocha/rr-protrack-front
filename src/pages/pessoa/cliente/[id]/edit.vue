<script setup lang="ts">
import { useRoute } from 'vue-router';
import { ClienteEditView } from '~/modules/pessoa/cliente/views';

const route = useRoute();
const id = Array.isArray(route.params.id)
  ? route.params.id[0]
  : route.params.id ?? '';
</script>

<template>
  <ClienteEditView :id="id" />
</template>
