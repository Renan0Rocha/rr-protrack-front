<script setup lang="ts">
import { defineEmits, defineProps } from 'vue';
import { useVendedorResolverDadosGerais } from './resolvers';

const emit = defineEmits<{
  (e: 'submit',values: Record<string, any>): void;
}>();

const props = defineProps<{ initialData?: Record<string, any> }>();

const {
  handleSubmit,
  nome,            nomeErro,
  cpf,             cpfErro,
  vinculo,         vinculoErro,
  dataNascimento,  dataNascimentoErro
} = useVendedorResolverDadosGerais(props.initialData ?? {});

const onSubmit = handleSubmit(values => {
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
          v-model="cpf"
          label="CPF"
          outlined
          :error-messages="cpfErro ? [cpfErro] : []"
        />
      </v-col>

      <v-col cols="12" md="6">
        <v-combobox
          v-model="vinculo"
          :items="['Interno', 'Externo']"
          label="Vínculo"
          outlined
          :error-messages="vinculoErro ? [vinculoErro] : []"
        />
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field
          v-model="dataNascimento"
          label="Data de Nascimento"
          type="date"
          outlined
          :error-messages="dataNascimentoErro ? [dataNascimentoErro] : []"
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
