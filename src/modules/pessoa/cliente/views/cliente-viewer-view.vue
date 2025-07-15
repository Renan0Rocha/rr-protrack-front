<template>
  <div>
    <PageHeader
      title="Visualizar Cliente"
      :breadcrumbs="[
        { title: 'Início', href: paths.dashboard, disabled: false },
        { title: 'Clientes', href: paths.pessoa.cliente.list, disabled: false },
        { title: cliente?.nome || '', disabled: true }
      ]"
      button-label="Listar Clientes"
      :button-to="paths.pessoa.cliente.list"
    />

    <UiParentCard title="Dados do Cliente">
      <v-row dense>
        <v-col cols="12" md="6">
          <strong>Nome:</strong> {{ cliente?.nome }}
        </v-col>
        <v-col cols="12" md="6">
          <strong>CPF/CNPJ:</strong> {{ cliente?.cpfCnpj }}
        </v-col>
        <v-col cols="12" md="6">
          <strong>Telefone:</strong> {{ cliente?.telefone }}
        </v-col>
        <v-col cols="12" md="6">
          <strong>Vendedor vínculado:</strong> {{ cliente?.vendedor?.nome || 'Nenhum' }}
        </v-col>
        <v-col cols="12" md="4">
          <strong>CEP:</strong> {{ cliente?.endereco?.cep }}
        </v-col>
        <v-col cols="12" md="4">
          <strong>Bairro:</strong> {{ cliente?.endereco?.bairro }}
        </v-col>
        <v-col cols="12" md="4">
          <strong>Logradouro:</strong> {{ cliente?.endereco?.logradouro }}
        </v-col>
        <v-col cols="12" md="3">
          <strong>Número:</strong> {{ cliente?.endereco?.numero }}
        </v-col>
        <v-col cols="12" md="4">
          <strong>Cidade:</strong> {{ cliente?.endereco?.cidade }}
        </v-col>
        <v-col cols="12" md="5">
          <strong>Estado:</strong> {{ cliente?.endereco?.estado }}
        </v-col>
      </v-row>
    </UiParentCard>
  </div>
</template>

<script setup lang="ts">
import PageHeader from '@/components/shared/PageHeader.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { paths } from '@/routes/paths';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ClienteService } from '~/services/pessoa/cliente-service';

interface Cliente {
  id: string;
  nome: string;
  cpfCnpj: string;
  telefone: string;
    vendedor?: {
        id: string;
        nome: string;
    };
  endereco?: {
    cep: string;
    bairro: string;
    logradouro: string;
    numero: string;
    cidade: string;
    estado: string;
  };
}

const route = useRoute();
const router = useRouter();

const rawId = route.params.id;
const id = Array.isArray(rawId) ? rawId[0] : rawId ?? '';

const cliente = ref<Cliente | null>(null);

onMounted(async () => {
  if (!id) {
    router.push(paths.pessoa.cliente.list);
    return;
  }
  try {
    cliente.value = await ClienteService.findOneById(id);
  } catch (error) {
    console.error('Erro ao buscar cliente:', error);
    router.push(paths.pessoa.cliente.list);
  }
});
</script>

<style scoped>

</style>
