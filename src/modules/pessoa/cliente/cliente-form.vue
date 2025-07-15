<script setup lang="ts">
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { ClienteService } from '~/services/pessoa/cliente-service';
import ClienteFormDadosGerais from './cliente-form-dados-gerais.vue';
import ClienteFormEndereco from './cliente-form-endereco.vue';

const showSnackbar    = ref(false);
const snackbarMessage = ref('');
const snackbarColor   = ref<'success'|'error'>('success');

function notify(message: string, color: 'success'|'error' = 'success') {
  snackbarMessage.value = message;
  snackbarColor.value   = color;
  showSnackbar.value    = true;
}

const currentTab = ref<'dadosGerais'|'endereco'>('dadosGerais');
const router     = useRouter();

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

const finalizeForm = async () => {
  try {
    const sessionData = JSON.parse(sessionStorage.getItem(sessionKey) || '{}');
    const payload = {
      ...sessionData.dadosGerais,
      ...sessionData.endereco
    };

    

    await ClienteService.create(payload);
    notify('Cliente cadastrado com sucesso!', 'success');
    clearSession();
    setTimeout(() => router.push('/pessoa/cliente'), 1500);
  } catch (err) {
    console.error(err);
    notify('Erro ao cadastrar cliente', 'error');
  }
};

</script>

<template>
  <v-row>
    <v-col cols="12">
      <UiParentCard title="Cadastro de Cliente">

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
