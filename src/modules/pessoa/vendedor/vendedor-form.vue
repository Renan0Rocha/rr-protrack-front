<script setup lang="ts">
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { VendedorService } from '~/services/pessoa/vendedor-service';
import VendedorFormDadosGerais from './vendedor-form-dados-gerais.vue';

const showSnackbar = ref(false);
const snackbarMessage = ref('');
const snackbarColor = ref<'success' | 'error'>('success');
const router = useRouter();

function notify(message: string, color: 'success' | 'error' = 'success') {
  snackbarMessage.value = message;
  snackbarColor.value = color;
  showSnackbar.value = true;
}

async function handleSubmit(values: Record<string, any>) {
  try {
    await VendedorService.create(values);
    notify('Vendedor cadastrado com sucesso!', 'success');
    setTimeout(() => router.push('/pessoa/vendedor'), 1500);
  } catch (err) {
    console.error(err);
    notify('Erro ao cadastrar vendedor', 'error');
  }
}
</script>

<template>
  <v-row>
    <v-col cols="12">
      <UiParentCard title="Cadastro de Vendedor">

        <VendedorFormDadosGerais
          :initial-data="{}"
          @submit="handleSubmit"
        />
      </UiParentCard>
    </v-col>
  </v-row>

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
