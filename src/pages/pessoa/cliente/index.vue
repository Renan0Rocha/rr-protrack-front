<script setup lang="ts">
import PageHeader from '@/components/shared/PageHeader.vue';
import TableActions from '@/components/shared/TableActions.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { paths } from '@/routes/paths';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { ClienteService } from '~/services/pessoa/cliente-service';
import { CLIENTE_BREADCRUMBS_LIST, CLIENTE_TABLE_HEADERS } from './enums/cliente-enums';


const router = useRouter();
const clientes = ref<any[]>([]);
const loading = ref(true);

const breadcrumbs = CLIENTE_BREADCRUMBS_LIST;
const headers = CLIENTE_TABLE_HEADERS ;

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

const handleView = (id: number | string) => {
  router.push(paths.pessoa.cliente.view(id.toString()));
};

const handleEdit = (id: number | string) => {
  router.push(paths.pessoa.cliente.edit(id.toString()));
};

const handleDelete = async (id: string | number) => {
  if (!confirm('Deseja realmente excluir este cliente?')) return;

  try {
    await ClienteService.delete(Number(id));
    alert('Cliente excluído com sucesso!');
    carregarClientes();
  } catch (error) {
    alert('Erro ao excluir cliente.');
    console.error(error);
  }
};

onMounted(() => {
  carregarClientes();
});
</script>

<template>
  <v-row>
    <v-col cols="12">
      <PageHeader
        title="Clientes"
        :breadcrumbs="breadcrumbs"
        button-label="Novo Cliente"
        :button-to="paths.pessoa.cliente.new"
      />

      <UiParentCard title="Listagem de Clientes">
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
              :onView="handleView"
              :onEdit="handleEdit"
              :onDelete="handleDelete"
            />
          </template>
        </v-data-table>
      </UiParentCard>
    </v-col>
  </v-row>
</template>
