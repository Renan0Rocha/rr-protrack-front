<script setup lang="ts">
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { ProgramaService } from '~/services/programacao/programa-service';
import ProgramaFormDadosGerais from './programa-form-dados-gerais.vue';

const props = defineProps<{
  currentId?: string | number;
  currentData?: Record<string, any> | null;
  isEdit?: boolean;
}>();

const current = ref<Record<string, any> | null>(props.currentData ?? null);
const isEdit = props.isEdit ?? false;
const loading = ref(false);
const showSnackbar = ref(false);
const snackbarMessage = ref('');
const snackbarColor = ref<'success' | 'error'>('success');
const router = useRouter();


watch(
  () => props.currentData,
  (newVal) => {
    current.value = newVal;
  },
  { immediate: true }
);

function notify(message: string, color: 'success' | 'error' = 'success') {
  snackbarMessage.value = message;
  snackbarColor.value = color;
  showSnackbar.value = true;
}

async function handleSubmit(values: Record<string, any>) {
  try {
    loading.value = true;

    if (isEdit && props.currentId) {
      await ProgramaService.update(props.currentId, values);
      notify('Programa atualizado com sucesso!', 'success');
    } else {
      await ProgramaService.create(values);
      notify('Programa cadastrado com sucesso!', 'success');
    }

    setTimeout(() => router.push('/programacao/programa'), 1500);
  } catch (err) {
    console.error(err);
    notify('Erro ao salvar programa', 'error');
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <UiParentCard>
    <ProgramaFormDadosGerais
      v-if="!isEdit || (isEdit && current)"
      :initial-data="current ?? {}"
      :is-edit="isEdit"
      :loading="loading"
      @submit="handleSubmit"
    />
  </UiParentCard>

  <v-snackbar
    v-model="showSnackbar"
    :color="snackbarColor"
    location="top right"
    timeout="3000"
    rounded="xl"
  >
    {{ snackbarMessage }}
  </v-snackbar>
</template>
