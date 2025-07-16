<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import PageHeader from '@/components/shared/PageHeader.vue';
import TableActions from '@/components/shared/TableActions.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';

import { paths } from '@/routes/paths';
import { ContratoService } from '~/services/programacao/contrato-service';
import { CONTRATO_TABLE_HEADERS } from "../enums/contrato-enums";

const router = useRouter();
const contratos = ref<any[]>([]);
const loading = ref(true);

const headers = CONTRATO_TABLE_HEADERS;

const carregarContratos = async () => {
  try {
    loading.value = true;
    contratos.value = await ContratoService.findAll();
  } catch (error) {
    console.error('Erro ao carregar contratos:', error);
  } finally {
    loading.value = false;
  }
};

function handleDelete(id: string | number): void {
  if (!confirm('Deseja realmente excluir este contrato?')) {
    return;
  }
  ContratoService.delete(id)
    .then(() => {
      alert('Contrato excluído com sucesso!');
      carregarContratos();
    })
    .catch(err => {
      console.error('Erro ao excluir contrato:', err);
      alert('Erro ao excluir contrato.');
    });
}

function handleView(id: string | number): void {
  router.push(paths.programacao.contrato.view(String(id)));
}

function handleEdit(id: string | number): void {
  router.push(paths.programacao.contrato.edit(String(id)));
}

function formatDateBR(date: string | null): string {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('pt-BR');
}

onMounted(() => {
  carregarContratos();
});
</script>

<template>
  <div>
    <PageHeader
      title="Listagem de Contratos"
      :breadcrumbs="[
        { title: 'Início', href: '/', disabled: false },
        { title: 'Contratos', disabled: true }
      ]"
      :button-to="paths.programacao.contrato.new"
      button-label="Novo Contrato"
    />

    <UiParentCard>
      <v-data-table
        :headers="headers"
        :items="contratos"
        :loading="loading"
        loading-text="Carregando..."
        class="elevation-1"
        item-value="id"
      >
      <template #item.dataInicio="{ item }">
  {{ formatDateBR(item.dataInicio) }}
</template>
      <template #item.dataFim="{ item }">
  {{ formatDateBR(item.dataFim) }}
</template>
      <template #item.valorTotal="{ item }">
  {{ item.valorTotal ? `R$ ${item.valorTotal.toFixed(2).replace('.', ',')}` : '-' }}
</template>
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
