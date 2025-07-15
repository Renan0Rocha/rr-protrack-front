<script setup lang="ts">
import PageHeader from '@/components/shared/PageHeader.vue';
import { paths } from '@/routes/paths';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { ClienteService } from '~/services/pessoa/cliente-service';

interface Cliente {
  id: number;
  nome: string;
}

const route = useRoute();
const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id ?? '';

const currentData = ref<Cliente | null>(null);

onMounted(async () => {
  if (!id) return;

  try {
    currentData.value = await ClienteService.findOneById(id);
  } catch (error) {
    console.error('Erro ao buscar cliente:', error);
  }
});
</script>

<template>
  <PageHeader
    title="Editar Cliente"
    :breadcrumbs="[
      { title: 'Início', href: '/', disabled: false },
      { title: 'Clientes', href: paths.pessoa.cliente.list, disabled: false },
      { title: currentData?.nome || '...', disabled: true }
    ]"
  />
</template>
