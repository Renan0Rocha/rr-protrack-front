<script setup lang="ts">
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { VendedorService } from '~/services/pessoa/vendedor-service';
import VendedorFormDadosGerais from './vendedor-form-dados-gerais.vue';

const props = defineProps<{
  currentId?: string | number;
  currentData?: Record<string, any> | null;
  isEdit?: boolean;
}>();

const router = useRouter();
const isEdit = props.isEdit ?? false;
const loading = ref(false);
const showSnackbar = ref(false);
const snackbarMessage = ref('');
const snackbarColor = ref<'success' | 'error'>('success');

const current = ref<Record<string, any> | null>(null);

// quando props.currentData chegar (API), atualiza o ref
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
      await VendedorService.update(props.currentId, values);
      notify('Vendedor atualizado com sucesso!', 'success');
    } else {
      await VendedorService.create(values);
      notify('Vendedor cadastrado com sucesso!', 'success');
    }

    setTimeout(() => router.push('/pessoa/vendedor'), 1500);
  } catch (err) {
    console.error(err);
    notify('Erro ao salvar vendedor', 'error');
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <UiParentCard :title="isEdit ? 'Editar Vendedor' : 'Cadastro de Vendedor'">
    <!-- Só renderiza o form depois de ter 'current' (no edit) -->
    <VendedorFormDadosGerais
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
