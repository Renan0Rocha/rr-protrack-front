<script setup lang="ts">
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { paths } from '@/routes/paths';
import { ClienteService } from '@/services/pessoa/cliente-service';
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ClienteFormDadosGerais from './cliente-form-dados-gerais.vue';
import ClienteFormEndereco from './cliente-form-endereco.vue';

const props = defineProps<{
  currentId?: string | number;
  currentData?: Record<string, any> | null;
  isEdit?: boolean;
}>();

const router = useRouter();
const route = useRoute();
const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id ?? '';
const isEdit = props.isEdit ?? false;
const loading = ref(false);

const showSnackbar    = ref(false);
const snackbarMessage = ref('');
const snackbarColor   = ref<'success' | 'error'>('success');

watch(
  () => props.currentData,
  (newVal) => {
    // sempre manter current as props.currentData
  },
  { immediate: true }
);

function notify(message: string, color: 'success'|'error' = 'success') {
  snackbarMessage.value = message;
  snackbarColor.value   = color;
  showSnackbar.value    = true;
}

const currentTab = ref<'dadosGerais'|'endereco'>('dadosGerais');

const sessionKey = 'clienteForm';
function session(key: string, value?: any) {
  const all = JSON.parse(sessionStorage.getItem(sessionKey) || '{}');
  if (value !== undefined) {
    all[key] = value;
    sessionStorage.setItem(sessionKey, JSON.stringify(all));
  } else {
    return all[key] || {};
  }
}
function clearSession() {
  sessionStorage.removeItem(sessionKey);
}

onMounted(async () => {
  // ao entrar na tela de cadastro
  if (!id) {
    clearSession();
  }
  if (id) {
    try {
      const data = await ClienteService.findOneById(id);
      // popular session para edição
      session('dadosGerais', {
        nome: data.nome,
        cpf:  data.cpf,
        dataNasc: data.dataNascimento,
        telefone: data.telefone,
        vendedor: { id: data.vendedor.id, nome: data.vendedor.nome }
      });
      session('endereco', data.endereco);
    } catch (error) {
      console.error('Erro ao buscar cliente:', error);
    }
  }
});

const finalizeForm = async () => {
  try {
    loading.value = true;
    const sess = JSON.parse(sessionStorage.getItem(sessionKey) || '{}');
    const payload = {
      nome:       sess.dadosGerais.nome,
      cpf:        sess.dadosGerais.cpf,
      dataNasc:   sess.dadosGerais.dataNasc,
      telefone:   sess.dadosGerais.telefone,
      vendedorId: Number(sess.dadosGerais.vendedor.id),
      ...sess.endereco
    };
    if (id) {
      await ClienteService.update(id, payload);
      notify('Cliente atualizado com sucesso!', 'success');
    } else {
      await ClienteService.create(payload);
      notify('Cliente cadastrado com sucesso!', 'success');
    }
    clearSession();
    setTimeout(() => router.push(paths.pessoa.cliente.list), 1500);
  } catch (err) {
    console.error(err);
    notify('Erro ao salvar cliente','error');
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
            @next="data => { session('dadosGerais', data); currentTab = 'endereco'; }"
          />
        </div>

        <div v-else>
          <ClienteFormEndereco
            :initial-data="session('endereco')"
            @back="data => { session('endereco', data); currentTab = 'dadosGerais'; }"
            @submit="data => { session('endereco', data); finalizeForm(); }"
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
