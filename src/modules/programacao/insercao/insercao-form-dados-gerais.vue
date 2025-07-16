<script setup lang="ts">
import { formatMMSS } from '@/utils/format-data/format-date';
import { defineEmits, defineProps } from 'vue';
import { useInsercaoResolverDadosGerais } from './resolvers';

const props = defineProps<{
  initialData: { tempo?: string; valor?: number };
  isEdit: boolean;
  loading?: boolean;
}>();

const emit = defineEmits<{
  (e: 'submit', values: Record<string, any>): void;
}>();

const {
  handleSubmit,
  setValues,
  tempo, tempoErro,
  valor, valorErro,
} = useInsercaoResolverDadosGerais(props.initialData ?? {});

watch(
  () => props.initialData,
  (val) => {
    if (props.isEdit && val) {
      setValues(val);
    }
  },
  { immediate: true, deep: true }
);



const onSubmit = handleSubmit(values => {
  emit('submit', values);
});
</script>

<template>
  <v-form @submit.prevent="onSubmit">
    <v-row dense>
      <v-col cols="12" md="6">
        <v-text-field
          :model-value="tempo"
          @input="e => tempo = formatMMSS(e.target.value)"
          label="Tempo (mm:ss)"
          placeholder="00:00"
          maxlength="5"
          outlined
          :error-messages="tempoErro ? [tempoErro] : []"
        />
      </v-col>

      <v-col cols="12" md="6">
       <v-text-field
        v-model.number="valor"
        type="number"
        label="Valor"
        outlined
        step="0.01"
        min="0"
        :error-messages="valorErro ? [valorErro] : []"
      />

      </v-col>
    </v-row>

    <v-row class="mt-4" justify="end">
      <v-col cols="auto">
        <v-btn :loading="props.loading" type="submit" color="primary">
          {{ props.isEdit ? 'Atualizar' : 'Salvar' }}
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>
