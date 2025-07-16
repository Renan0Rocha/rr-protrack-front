<script setup lang="ts">
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { InsercaoService } from '@/services/programacao/insercao-service';
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import InsercaoFormDadosGerais from './insercao-form-dados-gerais.vue';

const props = defineProps<{
  currentId?: string | number;
  currentData?: Record<string, any> | null;
  isEdit?: boolean;
}>();

const router = useRouter();

const currentData = ref(props.currentData ?? null);
const isEdit = props.isEdit ?? false;

const showSnackbar = ref(false);
const snackbarMessage = ref('');
const snackbarColor = ref<'success' | 'error'>('success');
const loading = ref(false);

watch(
  () => props.currentData,
  (newVal) => {
    currentData.value = newVal;
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
      await InsercaoService.update(props.currentId, values);
      notify('Inserção atualizada com sucesso!', 'success');
    } else {
      await InsercaoService.create(values);
      notify('Inserção criada com sucesso!', 'success');
    }

    setTimeout(() => {
      router.push('/programacao/insercao');
    }, 1500);
  } catch (err) {
    notify('Erro ao salvar inserção', 'error');
    console.error(err);
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <UiParentCard :title="isEdit ? 'Editar Inserção' : 'Cadastro de Inserção'">
    <InsercaoFormDadosGerais
      v-if="!isEdit || (isEdit && currentData)"
      :initial-data="currentData ?? {}"
      :is-edit="isEdit"
      @submit="handleSubmit"
      :loading="loading"
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
