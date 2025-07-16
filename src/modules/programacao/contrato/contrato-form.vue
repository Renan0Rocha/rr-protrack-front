<script setup lang="ts">
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { ContratoService } from '@/services/programacao/contrato-service';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import ContratoFormDadosGerais from './contrato-form-dados-gerais.vue';
import ContratoFormHorarios from './contrato-form-horarios.vue';

const props = defineProps<{
  currentId?: string | number;
  currentData?: Record<string, any> | null;
  isEdit?: boolean;
}>();

const router = useRouter();
const currentTab = ref<'dadosGerais'|'horarios'>('dadosGerais');
const isEdit = props.isEdit ?? false;
const currentData = ref<Record<string, any> | null>(null);

const showSnackbar = ref(false);
const snackbarMessage = ref('');
const snackbarColor = ref<'success' | 'error'>('success');
const loading = ref(false);

const sessionKey = 'contratoForm';
const session = (key: string, value?: any) => {
  const all = JSON.parse(sessionStorage.getItem(sessionKey) || '{}');
  if (value !== undefined) {
    all[key] = value;
    sessionStorage.setItem(sessionKey, JSON.stringify(all));
  } else {
    return all[key] || {};
  }
};
const clearSession = () => sessionStorage.removeItem(sessionKey);

onMounted(() => {
  if (isEdit && props.currentData) {
    currentData.value = props.currentData;
    session('dadosGerais', props.currentData);
    session('horarios', props.currentData);
  }
});

function notify(message: string, color: 'success' | 'error' = 'success') {
  snackbarMessage.value = message;
  snackbarColor.value = color;
  showSnackbar.value = true;
}

const finalizeForm = async () => {
  try {
    loading.value = true;
    const sessionData = JSON.parse(sessionStorage.getItem(sessionKey) || '{}');
    const rawPayload = {
      ...sessionData.dadosGerais,
      ...sessionData.horarios,
    };

    const payload = {
      ...rawPayload,
      clienteId: rawPayload.cliente?.id ?? null,
      vendedorId: rawPayload.vendedor?.id ?? null,
      insercaoId: rawPayload.insercao?.id ?? null,
    };

    delete payload.cliente;
    delete payload.vendedor;
    delete payload.insercao;

    if (isEdit && props.currentId) {
      await ContratoService.update(props.currentId, payload);
      notify('Contrato atualizado com sucesso!', 'success');
    } else {
      await ContratoService.create(payload);
      notify('Contrato criado com sucesso!', 'success');
    }

    clearSession();
    setTimeout(() => router.push('/programacao/contrato'), 1500);
  } catch (err) {
    notify('Erro ao salvar contrato', 'error');
    console.error(err);
  } finally {
    loading.value = false;
  }
};

</script>

<template>
  <UiParentCard>
    <v-tabs v-model="currentTab" class="mb-4">
      <v-tab value="dadosGerais">Dados Gerais</v-tab>
      <v-tab value="horarios">Horários</v-tab>
    </v-tabs>

    <div v-if="currentTab === 'dadosGerais'">
      <ContratoFormDadosGerais
        :initial-data="session('dadosGerais')"
        :is-edit="isEdit"
        :loading="loading"
        @next="data => {
          session('dadosGerais', data);
          currentTab = 'horarios';
        }"
      />
    </div>

    <div v-else>
      <ContratoFormHorarios
        :initial-data="session('horarios')"
        :is-edit="isEdit"
        :loading="loading"
        @back="data => {
          session('horarios', data);
          currentTab = 'dadosGerais';
        }"
        @submit="data => {
          session('horarios', data);
          finalizeForm();
        }"
      />
    </div>
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
