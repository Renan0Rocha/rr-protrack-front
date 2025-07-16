<script setup lang="ts">
import { useRoute } from 'vue-router';
import { ContratoEditView } from '~/modules/programacao/contrato/views';

const route = useRoute();
const id = Array.isArray(route.params.id)
  ? route.params.id[0]
  : route.params.id ?? '';
</script>

<template>
  <ContratoEditView :id="id" />
</template>
