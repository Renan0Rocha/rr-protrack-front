<script setup lang="ts">
import PageHeader from '@/components/shared/PageHeader.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { paths } from '@/routes/paths';
import { useRouter } from 'vue-router';
import { ProgramaService } from '~/services/programacao/programa-service';
import { PROGRAMA_BREADCRUMBS_NEW_EDIT } from './enums/programa-enums';
import { useProgramaForm } from './resolvers/programa-resolver';

const router = useRouter();
const tipos = ['Música', 'Notícias', 'Entretenimento'];

const breadcrumbs = PROGRAMA_BREADCRUMBS_NEW_EDIT;

const {
  handleSubmit,
  nome, nomeErro,
  sigla, siglaErro,
  descricao, descricaoErro,
  tipo, tipoErro,
  horarioInicio, horarioInicioErro,
  horarioFim, horarioFimErro,
  dataInicio, dataInicioErro,
  dataFim, dataFimErro,
  status, statusErro
} = useProgramaForm();

const onSubmit = handleSubmit(async (values) => {
  try {
    await ProgramaService.create(values);
    alert('Programa cadastrado com sucesso!');
    router.push(paths.programacao.programa.list);
  } catch (error) {
    alert('Erro ao cadastrar programa.');
    console.error(error);
  }
});
</script>

<template>
  <v-row>
    <v-col cols="12">
      <PageHeader
        title="Programas"
        :breadcrumbs="breadcrumbs"
        button-label="Lista de Programas"
        :button-to="paths.programacao.programa.list"
      />

      <UiParentCard title="Cadastro de Programa">
        <v-form @submit.prevent="onSubmit">
          <v-row dense>
            <v-col cols="12" md="6">
              <v-text-field v-model="nome" :error-messages="nomeErro" label="Nome" outlined />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="sigla" :error-messages="siglaErro" label="Sigla" outlined />
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="descricao" :error-messages="descricaoErro" label="Descrição" outlined />
            </v-col>
            <v-col cols="12" md="6">
              <v-select v-model="tipo" :items="tipos" :error-messages="tipoErro" label="Tipo" outlined />
            </v-col>
            <v-col cols="12" md="6">
              <v-select v-model="status" :items="['Ativo', 'Inativo']" :error-messages="statusErro" label="Status" outlined />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="horarioInicio" :error-messages="horarioInicioErro" label="Horário de Início" type="time" outlined />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="horarioFim" :error-messages="horarioFimErro" label="Horário de Fim" type="time" outlined />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="dataInicio" :error-messages="dataInicioErro" label="Data de Início" type="date" outlined />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="dataFim" :error-messages="dataFimErro" label="Data de Fim" type="date" outlined />
            </v-col>
            <v-col cols="12" class="text-right">
              <v-btn type="submit" color="primary" class="mt-4">Cadastrar Programa</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </UiParentCard>
    </v-col>
  </v-row>
</template>
