<script setup lang="ts">
import PageHeader from '@/components/shared/PageHeader.vue';
import TableActions from '@/components/shared/TableActions.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { paths } from '@/routes/paths';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { FornecedorService } from '~/services/fornecedor-service';
import { FORNECEDOR_BREADCRUMBS_LIST, FORNECEDOR_TABLE_HEADERS } from './enums/fornecedor-enums';

const router = useRouter();
const fornecedores = ref<any[]>([]);
const loading = ref(true);

const breadcrumbs = FORNECEDOR_BREADCRUMBS_LIST;
const headers = FORNECEDOR_TABLE_HEADERS;

const carregarFornecedores = async () => {
  try {
    loading.value = true;
    fornecedores.value = await FornecedorService.findAll();
  } catch (error) {
    console.error('Erro ao carregar fornecedores:', error);
  } finally {
    loading.value = false;
  }
};

const handleView = (id: number | string) => {
  router.push(paths.fornecedor.view(id.toString()));
};

const handleEdit = (id: number | string) => {
  router.push(paths.fornecedor.edit(id.toString()));
};

const handleDelete = async (id: string | number) => {
  if (!confirm('Deseja realmente excluir este fornecedor?')) return;

  try {
    await FornecedorService.delete(Number(id));
    alert('Fornecedor excluído com sucesso!');
    carregarFornecedores();
  } catch (error) {
    alert('Erro ao excluir fornecedor.');
    console.error(error);
  }
};

onMounted(() => {
  carregarFornecedores();
});
</script>

<template>
  <v-row>
    <v-col cols="12">
      <PageHeader
        title="Fornecedores"
        :breadcrumbs="breadcrumbs"
        button-label="Novo Fornecedor"
        :button-to="paths.fornecedor.new"
      />

      <UiParentCard title="Listagem de Fornecedores">
        <v-data-table
          :headers="headers"
          :items="fornecedores"
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
