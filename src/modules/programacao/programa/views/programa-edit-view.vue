<script setup lang="ts">
import PageHeader from '@/components/shared/PageHeader.vue';
import { paths } from '@/routes/paths';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { ProgramaService } from '~/services/programacao/programa-service';

interface Programa {
  id: number;
  nome: string;
}

const route = useRoute();
const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id ?? '';

const currentData = ref<Programa | null>(null);

onMounted(async () => {
  if (!id) return;

  try {
    currentData.value = await ProgramaService.findOneById(id);
  } catch (error) {
    console.error('Erro ao buscar programa:', error);
  }
});
</script>

<template>
  <PageHeader
    title="Editar Programa"
    :breadcrumbs="[
      { title: 'Início', href: '/', disabled: false },
      { title: 'Programas', href: paths.programacao.programa.list, disabled: false },
      { title: currentData?.nome || '...', disabled: true }
    ]"
  />
</template>
