<script setup lang="ts">
import PageHeader from '@/components/shared/PageHeader.vue';
import { paths } from '@/routes/paths';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { VendedorService } from '~/services/pessoa/vendedor-service';
import VendedorForm from '../vendedor-form.vue';

const route = useRoute();
const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id ?? '';
const isEdit = !!id;
const currentData = ref<any>(null);

onMounted(async () => {
  if (isEdit && id) {
    try {
      currentData.value = await VendedorService.findOneById(id);
    } catch (error) {
      console.error('Erro ao buscar vendedor:', error);
    }
  }
});
</script>

<template>
  <PageHeader
    title="Editar Vendedor"
    :breadcrumbs="[
      { title: 'Início', href: '/', disabled: false },
      { title: 'Vendedores', href: paths.pessoa.vendedor.list, disabled: false },
      { title: currentData?.nome || '...', disabled: true }
    ]"
  />

  <VendedorForm
    :current-id="id"
    :current-data="currentData"
    :is-edit="isEdit"
  />
</template>
