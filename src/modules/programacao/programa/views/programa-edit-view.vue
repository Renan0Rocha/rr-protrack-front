<script setup lang="ts">
import PageHeader from '@/components/shared/PageHeader.vue';
import { paths } from '@/routes/paths';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { ProgramaService } from '~/services/programacao/programa-service';
import ProgramaForm from '../programa-form.vue';

const route = useRoute();
const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id ?? '';
const isEdit = !!id;
const currentData = ref<any>(null);

onMounted(async () => {
  if (isEdit && id) {
    try {
      currentData.value = await ProgramaService.findOneById(id);
    } catch (error) {
      console.error('Erro ao buscar programa:', error);
    }
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

  <ProgramaForm
    :current-id="id"
    :current-data="currentData"
    :is-edit="isEdit"
  />
</template>
