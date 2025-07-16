<template>
  <div>
    <PageHeader
      title="Visualizar Programa"
      :breadcrumbs="[
        { title: 'Início', href: paths.dashboard, disabled: false },
        { title: 'Programas', href: paths.programacao.programa.list, disabled: false },
        { title: programa?.nome || '', disabled: true }
      ]"
      button-label="Listar Programas"
      :button-to="paths.programacao.programa.list"
    />

    <UiParentCard title="Dados do Programa">
      <v-row dense class="mb-3">
        <v-col cols="12" md="6">
          <strong>Nome:</strong> {{ programa?.nome }}
        </v-col>
        <v-col cols="12" md="6">
          <strong>Sigla:</strong> {{ programa?.sigla }}
        </v-col>
      </v-row>

      <v-row dense class="mb-3">
        <v-col cols="12" md="6">
          <strong>Duração:</strong> {{ programa?.duracao }}
        </v-col>
        <v-col cols="12" md="6">
          <strong>Dias da Semana:</strong> {{ diasSemanaFormatada }}
        </v-col>
      </v-row>

      <v-row dense class="mb-3">
        <v-col cols="12" md="6">
          <strong>Horário Inicial:</strong> {{ programa?.horarioInicio }}
        </v-col>
        <v-col cols="12" md="6">
          <strong>Horário Final:</strong> {{ programa?.horarioFim }}
        </v-col>
      </v-row>

      <v-row dense>
        <v-col cols="12" md="6">
          <strong>Data de Início:</strong> {{ formatarData(programa?.dataInicio) }}
        </v-col>
        <v-col cols="12" md="6">
          <strong>Data de Fim:</strong> {{ formatarData(programa?.dataFim) }}
        </v-col>
      </v-row>
    </UiParentCard>
  </div>
</template>

<script setup lang="ts">
import PageHeader from '@/components/shared/PageHeader.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { paths } from '@/routes/paths';
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ProgramaService } from '~/services/programacao/programa-service';

interface Programa {
  id: number;
  nome: string;
  sigla: string;
  diasSemana: string[];
  horarioInicio: string;
  horarioFim: string;
  duracao: string;
  dataInicio: string;
  dataFim: string;
}

const route = useRoute();
const router = useRouter();

const rawId = route.params.id;
const id = Array.isArray(rawId) ? rawId[0] : rawId ?? '';

const programa = ref<Programa | null>(null);

onMounted(async () => {
  if (!id) {
    router.push(paths.programacao.programa.list);
    return;
  }

  try {
    programa.value = await ProgramaService.findOneById(id);
  } catch (error) {
    console.error('Erro ao buscar programa:', error);
  }
});

const formatarData = (data: string | undefined) => {
  if (!data) return '';
  const [ano, mes, dia] = data.split('-');
  return `${dia}/${mes}/${ano}`;
};

const diasSemanaFormatada = computed(() => {
  if (!programa.value?.diasSemana?.length) return '';

  const mapa: Record<string, string> = {
    SEGUNDA: 'Segunda',
    TERCA: 'Terça',
    QUARTA: 'Quarta',
    QUINTA: 'Quinta',
    SEXTA: 'Sexta',
    SABADO: 'Sábado',
    DOMINGO: 'Domingo',
  };

  return programa.value.diasSemana.map((dia) => mapa[dia] || dia).join(', ');
});
</script>
