<script setup lang="ts">
import PageHeader from '@/components/shared/PageHeader.vue';
import { paths } from '@/routes/paths';
import { InsercaoService } from '@/services/programacao/insercao-service';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import InsercaoForm from '../insercao-form.vue';

const route = useRoute();
const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id ?? '';
const isEdit = !!id;

const currentData = ref<any>(null);

onMounted(async () => {
  if (isEdit && id) {
    try {
      currentData.value = await InsercaoService.findOneById(id);
    } catch (err) {
      console.error('Erro ao buscar inserção:', err);
    }
  }
});
</script>

<template>
  <PageHeader
    title="Editar Inserção"
    :breadcrumbs="[
      { title: 'Início', href: '/', disabled: false },
      { title: 'Inserções', href: paths.programacao.insercao.list, disabled: false },
      { title: 'Editar', disabled: true }
    ]"
  />

  <InsercaoForm
    :current-id="id"
    :current-data="currentData"
    :is-edit="isEdit"
  />
</template>
