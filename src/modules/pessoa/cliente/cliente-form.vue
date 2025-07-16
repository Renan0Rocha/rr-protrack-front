<script setup lang="ts">
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { paths } from '@/routes/paths';
import { ClienteService } from '@/services/pessoa/cliente-service';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ClienteFormDadosGerais from './cliente-form-dados-gerais.vue';
import ClienteFormEndereco from './cliente-form-endereco.vue';

const props = defineProps<{
  currentId?: string | number;
  currentData?: Record<string, any> | null;
  isEdit?: boolean;
}>();

const current = ref<Record<string, any> | null>(props.currentData ?? null);
const isEdit = props.isEdit ?? false;
const loading = ref(false);
const showSnackbar    = ref(false);
const snackbarMessage = ref('');
const snackbarColor = ref<'success' | 'error'>('success');

watch(
  () => props.currentData,
  (newVal) => {
    current.value = newVal;
  },
  { immediate: true }
);


function notify(message: string, color: 'success'|'error' = 'success') {
  snackbarMessage.value = message;
  snackbarColor.value   = color;
  showSnackbar.value    = true;
}

const currentTab = ref<'dadosGerais'|'endereco'>('dadosGerais');
const router     = useRouter();
const route      = useRoute();

const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id ?? '';
const currentData = ref<any>(null);

const sessionKey = 'clienteForm';
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

onMounted(async () => {
  if (id) {
    try {
      currentData.value = await ClienteService.findOneById(id);
      session('dadosGerais', currentData.value);
      session('endereco', currentData.value);
    } catch (error) {
      console.error('Erro ao buscar cliente:', error);
    }
  }
});

const finalizeForm = async () => {
  try {
    loading.value = true;

    
    const sessionData = JSON.parse(sessionStorage.getItem(sessionKey) || '{}');

    const payload = {
      nome:     sessionData.dadosGerais.nome,
      cpf:      sessionData.dadosGerais.cpf,
      dataNasc: sessionData.dadosGerais.dataNasc,
      telefone: sessionData.dadosGerais.telefone,        
      vendedor: {
        id:   Number(sessionData.dadosGerais.vendedor.id),
        nome: sessionData.dadosGerais.vendedor.nome
      },
      ...sessionData.endereco 
    };

    if (id) {
      // UPDATE recebe o objeto DTO diretamente
      await ClienteService.update(id, payload);
      notify('Cliente atualizado com sucesso!', 'success');
    } else {
      // CREATE idem
      await ClienteService.create(payload);
      notify('Cliente cadastrado com sucesso!', 'success');
    }

    clearSession();
    setTimeout(() => router.push(paths.pessoa.cliente.list), 1500);
  } catch (err) {
    console.error(err);
    notify('Erro ao salvar cliente', 'error');
  } finally {
    loading.value = false;
  }
};


</script>

<template>
  

  <v-row>
    <v-col cols="12">
      <UiParentCard :title="id ? 'Editar Cliente' : 'Cadastro de Cliente'">
        <v-tabs v-model="currentTab" class="mb-4">
          <v-tab value="dadosGerais">Dados Gerais</v-tab>
          <v-tab value="endereco">Endereço</v-tab>
        </v-tabs>

        <div v-if="currentTab === 'dadosGerais'">
          <ClienteFormDadosGerais
            :initial-data="session('dadosGerais')"
            @next="data => {
              session('dadosGerais', data);
              currentTab = 'endereco';
            }"
          />
        </div>
        <div v-else>
          <ClienteFormEndereco
            :initial-data="session('endereco')"
            @back="data => {
              session('endereco', data);
              currentTab = 'dadosGerais';
            }"
            @submit="data => {
              session('endereco', data);
              finalizeForm();
            }"
          />
        </div>
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
