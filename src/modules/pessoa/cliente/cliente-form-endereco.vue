<script setup lang="ts">
import { useClienteResolverEndereco } from '@/modules/pessoa/cliente/resolvers';
import { defineEmits, defineProps } from 'vue';

const emit = defineEmits<{
  (e: 'back',   values: Record<string, any>): void;
  (e: 'submit',values: Record<string, any>): void;
}>();

const props = defineProps<{ initialData?: Record<string, any> }>();

const {
  handleSubmit,
  cep,        cepErro,
  bairro,     bairroErro,
  logradouro, logradouroErro,
  numero,     numeroErro,
  cidade,     cidadeErro,
  estado,     estadoErro,
} = useClienteResolverEndereco(props.initialData ?? {});

const onSubmit = handleSubmit(values => {
  emit('submit', values);
});

// agora aninha em `endereco` também no back
const onBack = () =>
  emit('back', {
    endereco: { cep, bairro, logradouro, numero, cidade, estado }
  });
</script>

<template>
  <v-form @submit.prevent="onSubmit">
    <v-row dense>
      <!-- CEP -->
      <v-col cols="12" md="4">
        <v-text-field
          v-model="cep"
          label="CEP"
          outlined
          :error-messages="cepErro ? [cepErro] : []"
        />
      </v-col>

      <!-- Bairro -->
      <v-col cols="12" md="4">
        <v-text-field
          v-model="bairro"
          label="Bairro"
          outlined
          :error-messages="bairroErro ? [bairroErro] : []"
        />
      </v-col>

      <!-- Logradouro -->
      <v-col cols="12" md="4">
        <v-text-field
          v-model="logradouro"
          label="Logradouro"
          outlined
          :error-messages="logradouroErro ? [logradouroErro] : []"
        />
      </v-col>

      <!-- Número -->
      <v-col cols="12" md="3">
        <v-text-field
          v-model="numero"
          label="Número"
          outlined
          :error-messages="numeroErro ? [numeroErro] : []"
        />
      </v-col>

      <!-- Cidade -->
      <v-col cols="12" md="5">
        <v-text-field
          v-model="cidade"
          label="Cidade"
          outlined
          :error-messages="cidadeErro ? [cidadeErro] : []"
        />
      </v-col>

      <!-- Estado -->
      <v-col cols="12" md="4">
        <v-text-field
          v-model="estado"
          label="Estado"
          outlined
          :error-messages="estadoErro ? [estadoErro] : []"
        />
      </v-col>
    </v-row>

    <v-row class="mt-4" justify="space-between">
      <v-col cols="auto">
        <v-btn outlined @click="onBack">Voltar</v-btn>
      </v-col>
      <v-col cols="auto">
        <v-btn type="submit" color="primary">Salvar</v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>
