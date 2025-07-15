<script setup lang="ts">
import { useRoute } from 'vue-router';
import { ProgramaViewerView } from '~/modules/programacao/programa/views';

const route = useRoute();
const id = Array.isArray(route.params.id)
  ? route.params.id[0]
  : route.params.id ?? '';
</script>

<template>
  <ProgramaViewerView :id="id" />
</template>
