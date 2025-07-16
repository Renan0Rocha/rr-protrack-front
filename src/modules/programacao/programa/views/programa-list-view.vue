<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import PageHeader from '@/components/shared/PageHeader.vue';
import TableActions from '@/components/shared/TableActions.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { paths } from '@/routes/paths';
import { ProgramaService } from '@/services/programacao/programa-service';
import { PROGRAMA_TABLE_HEADERS } from "../enums/programa-enums";

const router = useRouter();
const programas = ref<any[]>([]);
const loading = ref(true);

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

function handleDelete(id: string | number): void {
  if (!confirm('Deseja realmente excluir este programa?')) {
    return;
  }
  ProgramaService.delete(id)
    .then(() => {
      alert('Programa excluído com sucesso!');
      carregarProgramas();
    })
    .catch(err => {
      console.error('Erro ao excluir programa:', err);
      alert('Erro ao excluir programa.');
    });
}

function handleView(id: string | number): void {
  router.push(paths.programacao.programa.view(String(id)));
}

function handleEdit(id: string | number): void {
  router.push(paths.programacao.programa.edit(String(id)));
}

function formatarDiasSemana(dias: string[] = []): string {
  const traducao: Record<string, string> = {
    SEGUNDA: 'Segunda',
    TERCA: 'Terça',
    QUARTA: 'Quarta',
    QUINTA: 'Quinta',
    SEXTA: 'Sexta',
    SABADO: 'Sábado',
    DOMINGO: 'Domingo',
  };

  return dias.map((dia) => traducao[dia] || dia).join(', ');
}

function formatarHorario(horario: string): string {
  if (!horario) return '-';
  const [hora, minuto] = horario.split(':');
  return `${hora}h:${minuto}m`;
}

onMounted(() => {
  carregarProgramas();
});
</script>

<template>
  <div>
    <PageHeader
      title="Listagem Programas"
      :breadcrumbs="[
        { title: 'Início', href: '/', disabled: false },
        { title: 'Programas', disabled: true }
      ]"
      :button-to="paths.programacao.programa.new"
      button-label="Novo Programa"
    />

    <UiParentCard >
    <v-data-table
      v-if="Array.isArray(programas)"
      :headers="headers"
      :items="programas"
      :loading="loading"
      loading-text="Carregando..."
      class="elevation-1"
      item-value="id"
    >

  <template #item.diasSemana="{ item }">
    {{ formatarDiasSemana(item.diasSemana) }}
  </template>

<template #item.horarioInicio="{ item }">
  {{ formatarHorario(item.horarioInicio) }}
</template>

<template #item.horarioFim="{ item }">
  {{ formatarHorario(item.horarioFim) }}
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
