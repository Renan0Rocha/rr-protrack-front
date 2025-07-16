<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import PageHeader from '@/components/shared/PageHeader.vue';
import TableActions from '@/components/shared/TableActions.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';

import { paths } from '@/routes/paths';
import { InsercaoService } from '~/services/programacao/insercao-service';
import { INSERCAO_TABLE_HEADERS } from "../enums/insercao-enums";

const router = useRouter();
const insercoes = ref<any[]>([]);
const loading = ref(true);

const headers = INSERCAO_TABLE_HEADERS;

const carregarInsercoes = async () => {
  try {
    loading.value = true;
    insercoes.value = await InsercaoService.findAll();
  } catch (error) {
    console.error('Erro ao carregar inserções:', error);
  } finally {
    loading.value = false;
  }
};

function handleDelete(id: string | number): void {
  if (!confirm('Deseja realmente excluir esta inserção?')) {
    return;
  }
  InsercaoService.delete(id)
    .then(() => {
      alert('Inserção excluída com sucesso!');
      carregarInsercoes();
    })
    .catch(err => {
      console.error('Erro ao excluir inserção:', err);
      alert('Erro ao excluir inserção.');
    });
}

function handleView(id: string | number): void {
  router.push(paths.programacao.insercao.view(String(id)));
}

function handleEdit(id: string | number): void {
  router.push(paths.programacao.insercao.edit(String(id)));
}

onMounted(() => {
  carregarInsercoes();
});
</script>

<template>
  <div>
    <PageHeader
      title="Listagem de Inserções"
      :breadcrumbs="[
        { title: 'Início', href: '/', disabled: false },
        { title: 'Inserções', disabled: true }
      ]"
      :button-to="paths.programacao.insercao.new"
      button-label="Nova Inserção"
    />

    <UiParentCard >
      <v-data-table
        :headers="headers"
        :items="insercoes"
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
