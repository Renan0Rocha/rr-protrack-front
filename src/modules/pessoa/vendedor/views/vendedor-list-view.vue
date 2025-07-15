<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import PageHeader from '@/components/shared/PageHeader.vue';
import TableActions from '@/components/shared/TableActions.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';

import { paths } from '@/routes/paths';
import { VendedorService } from '~/services/pessoa/vendedor-service';
import { VENDEDOR_TABLE_HEADERS } from "../enums/vendedor-enums";

const router = useRouter();
const vendedores = ref<any[]>([]);
const loading = ref(true);

const headers = VENDEDOR_TABLE_HEADERS;

const carregarVendedores = async () => {
  try {
    loading.value = true;
    vendedores.value = await VendedorService.findAll();
  } catch (error) {
    console.error('Erro ao carregar vendedores:', error);
  } finally {
    loading.value = false;
  }
};

function handleDelete(id: string | number): void {
  if (!confirm('Deseja realmente excluir este vendedor?')) {
    return;
  }
  VendedorService.delete(id)
    .then(() => {
      alert('Vendedor excluído com sucesso!');
      carregarVendedores();
    })
    .catch(err => {
      console.error('Erro ao excluir vendedor:', err);
      alert('Erro ao excluir vendedor.');
    });
}

function handleView(id: string | number): void {
  router.push(paths.pessoa.vendedor.view(String(id)));
}

function handleEdit(id: string | number): void {
  router.push(paths.pessoa.vendedor.edit(String(id)));
}

onMounted(() => {
  carregarVendedores();
});
</script>

<template>
  <div>
    <PageHeader
      title="Vendedores"
      :breadcrumbs="[
        { title: 'Início', href: '/', disabled: false },
        { title: 'Vendedores', disabled: true }
      ]"
      :button-to="paths.pessoa.vendedor.new"
      button-label="Novo Vendedor"
    />

    <UiParentCard title="Listagem de Vendedores">
      <v-data-table
        :headers="headers"
        :items="vendedores"
        :loading="loading"
        loading-text="Carregando..."
        class="elevation-1"
        item-value="id"
      >
      <template #item.actions="{ item }">
        <TableActions
          :id="item.id"
          :onView="() => handleView(item.id)"
          :onEdit="() => handleEdit(item.id)"
          :onDelete="() => handleDelete(item.id)" 
        />
      </template>
      </v-data-table>
    </UiParentCard>
  </div>
</template>
