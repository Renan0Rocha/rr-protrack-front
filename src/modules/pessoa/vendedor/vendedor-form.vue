<script setup lang="ts">
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { VendedorService } from '~/services/pessoa/vendedor-service';
import VendedorFormDadosGerais from './vendedor-form-dados-gerais.vue';

const props = defineProps<{
  currentId?: string | number;
  currentData?: Record<string, any> | null;
  isEdit?: boolean;
}>();

const router = useRouter();

const showSnackbar = ref(false);
const snackbarMessage = ref('');
const snackbarColor = ref<'success' | 'error'>('success');
const loading = ref(false);

function notify(message: string, color: 'success' | 'error' = 'success') {
  snackbarMessage.value = message;
  snackbarColor.value = color;
  showSnackbar.value = true;
}

async function handleSubmit(values: Record<string, any>) {
  try {
    loading.value = true;

    if (props.isEdit && props.currentId) {
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
    <VendedorFormDadosGerais
      :initial-data="props.currentData ?? {}"
      :is-edit="props.isEdit"
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
