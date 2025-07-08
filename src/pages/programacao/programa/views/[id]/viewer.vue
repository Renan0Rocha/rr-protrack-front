<script setup lang="ts">
import PageHeader from '@/components/shared/PageHeader.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { paths } from '@/routes/paths';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { ProgramaService } from '~/services/programacao/programa-service';

const route = useRoute();
const id = Number(route.params.id);

const programa = ref<any | null>(null);
const loading = ref(true);

const breadcrumbs = [
  { title: 'Dashboard', disabled: false, href: paths.dashboard },
  { title: 'Programas', disabled: false, href: paths.programacao.programa.list },
  { title: 'Visualizar', disabled: true },
];

onMounted(async () => {
  try {
    loading.value = true;
    programa.value = await ProgramaService.findOneById(id);
  } catch (error) {
    console.error('Erro ao carregar programa:', error);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <v-row>
    <v-col cols="12">
      <PageHeader
        title="Visualização do Programa"
        :breadcrumbs="breadcrumbs"
        button-label="Voltar"
        :button-to="paths.programacao.programa.list"
      />

      <UiParentCard title="Detalhes do Programa">
        <v-skeleton-loader v-if="loading" type="paragraph, table" />

        <v-row v-else dense>
          <v-col cols="12" md="6"><strong>Nome:</strong> {{ programa.nome }}</v-col>
          <v-col cols="12" md="6"><strong>Sigla:</strong> {{ programa.sigla }}</v-col>
          <v-col cols="12" md="6"><strong>Tipo:</strong> {{ programa.tipo }}</v-col>
          <v-col cols="12" md="6"><strong>Status:</strong> {{ programa.status }}</v-col>
          <v-col cols="12" md="6"><strong>Horário Início:</strong> {{ programa.horarioInicio }}</v-col>
          <v-col cols="12" md="6"><strong>Horário Fim:</strong> {{ programa.horarioFim }}</v-col>
          <v-col cols="12" md="6"><strong>Data Início:</strong> {{ programa.dataInicio }}</v-col>
          <v-col cols="12" md="6"><strong>Data Fim:</strong> {{ programa.dataFim }}</v-col>
          <v-col cols="12"><strong>Descrição:</strong> {{ programa.descricao }}</v-col>
        </v-row>
      </UiParentCard>
    </v-col>
  </v-row>
</template>
