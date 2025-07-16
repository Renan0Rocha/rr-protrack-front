<script setup lang="ts">
import { useRoute } from 'vue-router';
import { InsercaoViewerView } from '~/modules/programacao/insercao/views';

const route = useRoute();
const id = Array.isArray(route.params.id)
  ? route.params.id[0]
  : route.params.id ?? '';
</script>

<template>
  <InsercaoViewerView :id="id" />
</template>
