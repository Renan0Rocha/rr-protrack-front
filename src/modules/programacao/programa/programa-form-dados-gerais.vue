<script setup lang="ts">
import { defineEmits, defineProps } from 'vue';
import { useProgramaResolverDadosGerais } from './resolvers';

const emit = defineEmits<{
  (e: 'submit', values: Record<string, any>): void;
}>();

const props = defineProps<{
  initialData?: Record<string, any>;
}>();

const {
  handleSubmit,
  Nome, nomeErro,
  Sigla, siglaErro,
  Duracao, duracaoErro,
  DiasSemana, diasSemanaErro,
  DataInicial, dataInicialErro,
  DataFinal, dataFinalErro,
  HorarioInicio, horarioInicialErro,
  HorarioFim, horarioFinalErro,
} = useProgramaResolverDadosGerais(props.initialData ?? {});

const onSubmit = handleSubmit((values) => {
  emit('submit', values);
});
</script>

<template>
  <v-form @submit.prevent="onSubmit">
    <v-row dense>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="Nome"
          label="Nome"
          outlined
          :error-messages="nomeErro ? [nomeErro] : []"
        />
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field
          v-model="Sigla"
          label="Sigla"
          outlined
          :error-messages="siglaErro ? [siglaErro] : []"
        />
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field
          v-model="Duracao"
          label="Duração"
          type="time"
          outlined
          :error-messages="duracaoErro ? [duracaoErro] : []"
        />
      </v-col>

      <v-col cols="12" md="6">
        <v-combobox
          v-model="DiasSemana"
          multiple
          chips
          clearable
          label="Dias da Semana"
          :items="['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado']"
          outlined
          :error-messages="diasSemanaErro ? [diasSemanaErro] : []"
        />
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field
          v-model="DataInicial"
          label="Data Inicial"
          type="date"
          outlined
          :error-messages="dataInicialErro ? [dataInicialErro] : []"
        />
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field
          v-model="DataFinal"
          label="Data Final"
          type="date"
          outlined
          :error-messages="dataFinalErro ? [dataFinalErro] : []"
        />
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field
          v-model="HorarioInicio"
          label="Horário Inicial"
          type="time"
          outlined
          :error-messages="horarioInicialErro ? [horarioInicialErro] : []"
        />
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field
          v-model="HorarioFim"
          label="Horário Final"
          type="time"
          outlined
          :error-messages="horarioFinalErro ? [horarioFinalErro] : []"
        />
      </v-col>
    </v-row>

    <v-row class="mt-4" justify="end">
      <v-col cols="auto">
        <v-btn type="submit" color="primary">
          Salvar
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>
