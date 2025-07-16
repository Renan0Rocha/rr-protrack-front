<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import PageHeader from '@/components/shared/PageHeader.vue';
import TableActions from '@/components/shared/TableActions.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';

import { paths } from '@/routes/paths';
import { ClienteService } from '~/services/pessoa/cliente-service';
import { CLIENTE_TABLE_HEADERS } from "../enums/cliente-enums";

const router = useRouter();
const clientes = ref<any[]>([]);
const loading = ref(true);

const headers = CLIENTE_TABLE_HEADERS;

const carregarClientes = async () => {
  try {
    loading.value = true;
    clientes.value = await ClienteService.findAll();
  } catch (error) {
    console.error('Erro ao carregar clientes:', error);
  } finally {
    loading.value = false;
  }
};

function handleDelete(id: string | number): void {
  if (!confirm('Deseja realmente excluir este cliente?')) {
    return;
  }
  ClienteService.delete(id)
    .then(() => {
      alert('Cliente excluído com sucesso!');
      carregarClientes();
    })
    .catch(err => {
      console.error('Erro ao excluir cliente:', err);
      alert('Erro ao excluir cliente.');
    });
}

function handleView(id: string | number): void {
  router.push(paths.pessoa.cliente.view(String(id)));
}

function handleEdit(id: string | number): void {
  router.push(paths.pessoa.cliente.edit(String(id)));
}

onMounted(() => {
  carregarClientes();
});
</script>

<template>
  <div>
    <PageHeader
      title="Listagem de Clientes"
      :breadcrumbs="[
        { title: 'Início', href: '/', disabled: false },
        { title: 'Clientes', disabled: true }
      ]"
      :button-to="paths.pessoa.cliente.new"
      button-label="Novo Cliente"
    />

    <UiParentCard>
      <v-data-table
        :headers="headers"
        :items="clientes"
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
