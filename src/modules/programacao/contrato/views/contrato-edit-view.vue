<script setup lang="ts">
import PageHeader from '@/components/shared/PageHeader.vue';
import { paths } from '@/routes/paths';
import { ContratoService } from '@/services/programacao/contrato-service';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import ContratoForm from '../contrato-form.vue';

const route = useRoute();
const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id ?? '';
const isEdit = !!id;

const currentData = ref<any>(null);

onMounted(async () => {
  if (isEdit && id) {
    try {
      currentData.value = await ContratoService.findOneById(id);
    } catch (err) {
      console.error('Erro ao buscar contrato:', err);
    }
  }
});
</script>

<template>
  <PageHeader
    title="Editar Contrato"
    :breadcrumbs="[
      { title: 'Início', href: '/', disabled: false },
      { title: 'Contratos', href: paths.programacao.contrato.list, disabled: false },
      { title: 'Editar', disabled: true }
    ]"
  />

  <ContratoForm
    :current-id="id"
    :current-data="currentData"
    :is-edit="isEdit"
  />
</template>
