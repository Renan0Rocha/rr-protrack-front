<script setup lang="ts">
import { defineEmits, defineProps } from 'vue';
import { DIAS_SEMANA_OPTIONS } from './enums/programa-enums';
import { useProgramaResolverDadosGerais } from './resolvers';

const emit = defineEmits<{
  (e: 'submit', values: Record<string, any>): void;
}>();

const props = defineProps<{
  initialData?: Record<string, any>;
}>();

const {
  handleSubmit,
  nome, nomeErro,
  sigla, siglaErro,
  duracao, duracaoErro,
  dias_semana, diasSemanaErro,
  data_inicial, dataInicialErro,
  data_final, dataFinalErro,
  horario_inicial, horarioInicialErro,
  horario_final, horarioFinalErro,
} = useProgramaResolverDadosGerais(props.initialData ?? {});

const onSubmit = handleSubmit((values) => {
  console.log('SUBMIT PROGRAM FORM', values);
  emit('submit', values);
});
</script>

<template>
  <v-form @submit.prevent="onSubmit">
    <v-row dense>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="nome"
          label="Nome"
          outlined
          :error-messages="nomeErro ? [nomeErro] : []"
        />
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field
          v-model="sigla"
          label="Sigla"
          outlined
          :error-messages="siglaErro ? [siglaErro] : []"
        />
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field
          v-model="duracao"
          label="Duração"
          type="time"
          outlined
          :error-messages="duracaoErro ? [duracaoErro] : []"
        />
      </v-col>

      <v-col cols="12" md="6">
        <v-combobox
          v-model="dias_semana"
          multiple
          chips
          clearable
          label="Dias da Semana"
          :items="DIAS_SEMANA_OPTIONS"
          item-title="label"
          item-value="value"
          outlined
          :error-messages="diasSemanaErro ? [diasSemanaErro] : []"
        />
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field
          v-model="data_inicial"
          label="Data Inicial"
          type="date"
          outlined
          :error-messages="dataInicialErro ? [dataInicialErro] : []"
        />
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field
          v-model="data_final"
          label="Data Final"
          type="date"
          outlined
          :error-messages="dataFinalErro ? [dataFinalErro] : []"
        />
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field
          v-model="horario_inicial"
          label="Horário Inicial"
          type="time"
          outlined
          :error-messages="horarioInicialErro ? [horarioInicialErro] : []"
        />
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field
          v-model="horario_final"
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
