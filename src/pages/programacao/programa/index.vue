<script setup lang="ts">
import PageHeader from '@/components/shared/PageHeader.vue';
import TableActions from '@/components/shared/TableActions.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { paths } from '@/routes/paths';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { ProgramaService } from '~/services/programacao/programa-service';
import { PROGRAMA_BREADCRUMBS_LIST, PROGRAMA_TABLE_HEADERS } from "./enums/programa-enums";

const router = useRouter();
const programas = ref<any[]>([]);
const loading = ref(true);

const breadcrumbs = PROGRAMA_BREADCRUMBS_LIST;
const headers = PROGRAMA_TABLE_HEADERS;

const carregarProgramas = async () => {
  try {
    loading.value = true;
    programas.value = await ProgramaService.findAll();
  } catch (error) {
    console.error('Erro ao carregar programas:', error);
  } finally {
    loading.value = false;
  }
};

const handleView = (id: number | string) => {
  router.push(paths.programacao.programa.view(id.toString()));
};

const handleEdit = (id: number | string) => {
  router.push(paths.programacao.programa.edit(id.toString()));
};

const handleDelete = async (id: string | number) => {
  if (!confirm('Deseja realmente excluir este programa?')) return;

  try {
    await ProgramaService.delete(Number(id));
    alert('Programa excluído com sucesso!');
    carregarProgramas();
  } catch (error) {
    alert('Erro ao excluir programa.');
    console.error(error);
  }
};

onMounted(() => {
  carregarProgramas();
});
</script>

<template>
  <v-row>
    <v-col cols="12">
      <PageHeader
        title="Programas"
        :breadcrumbs="breadcrumbs"
        button-label="Novo Programa"
        :button-to="paths.programacao.programa.new"
      />

      <UiParentCard title="Listagem de Programas">
        <v-data-table
          :headers="headers"
          :items="programas"
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
