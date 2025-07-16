<script setup lang="ts">
import PageHeader from '@/components/shared/PageHeader.vue';
import { paths } from '@/routes/paths';
import { ClienteService } from '@/services/pessoa/cliente-service';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import ClienteForm from '../cliente-form.vue';

const route = useRoute();
const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id ?? '';
const isEdit = !!id;

const currentData = ref<any>(null);

onMounted(async () => {
  if (isEdit && id) {
    try {
      currentData.value = await ClienteService.findOneById(id);
    } catch (error) {
      console.error('Erro ao buscar cliente:', error);
    }
  }
});
</script>

<template>
  <PageHeader
    title="Editar Cliente"
    :breadcrumbs="[
      { title: 'Início', href: '/', disabled: false },
      { title: 'Clientes', href: paths.pessoa.cliente.list, disabled: false },
      { title: 'Editar', disabled: true }
    ]"
  />

  <ClienteForm
    :current-id="id"
    :current-data="currentData"
    :is-edit="isEdit"
  />
</template>
