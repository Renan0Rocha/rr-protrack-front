<script setup lang="ts">
import PageHeader from '@/components/shared/PageHeader.vue';
import TableActions from '@/components/shared/TableActions.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { paths } from '@/routes/paths';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { VendedorService } from '~/services/pessoa/vendedor-service';
import { VENDEDOR_BREADCRUMBS_LIST, VENDEDOR_TABLE_HEADERS } from './enums/vendedor-enums';

const router = useRouter();
const vendedores = ref<any[]>([]);
const loading = ref(true);

const breadcrumbs = VENDEDOR_BREADCRUMBS_LIST;
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

const handleView = (id: number | string) => {
  router.push(paths.pessoa.vendedor.view(id.toString()));
};

const handleEdit = (id: number | string) => {
  router.push(paths.pessoa.vendedor.edit(id.toString()));
};

const handleDelete = async (id: string | number) => {
  if (!confirm('Deseja realmente excluir este vendedor?')) return;

  try {
    await VendedorService.delete(Number(id));
    alert('Vendedor excluído com sucesso!');
    carregarVendedores();
  } catch (error) {
    alert('Erro ao excluir vendedor.');
    console.error(error);
  }
};

onMounted(() => {
  carregarVendedores();
});
</script>

<template>
  <v-row>
    <v-col cols="12">
      <PageHeader
        title="Vendedores"
        :breadcrumbs="breadcrumbs"
        button-label="Novo Vendedor"
        :button-to="paths.pessoa.vendedor.new"
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
