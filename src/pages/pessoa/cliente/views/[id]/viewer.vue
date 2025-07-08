<script setup lang="ts">
import PageHeader from '@/components/shared/PageHeader.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { paths } from '@/routes/paths';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { ClienteService } from '~/services';

const route = useRoute();
const id = Number(route.params.id);

const cliente = ref<any | null>(null);
const loading = ref(true);

const breadcrumbs = [
  { title: 'Dashboard', disabled: false, href: paths.dashboard },
  { title: 'Cliente', disabled: false, href: paths.pessoa.cliente.list },
  { title: 'Visualizar', disabled: true },
];

onMounted(async () => {
  try {
    loading.value = true;
    cliente.value = await ClienteService.findOneById(id);
  } catch (error) {
    console.error('Erro ao carregar cliente:', error);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <v-row>
    <v-col cols="12">
      <PageHeader
        title="Visualização cliente"
        :breadcrumbs="breadcrumbs"
        button-label="Listar Cliente"
        :button-to="paths.pessoa.cliente.list"
      />

      <UiParentCard title="Detalhes do Cliente">
        <v-skeleton-loader v-if="loading" type="paragraph, table" />

        <v-row v-else dense>
          <v-col cols="12" md="6">
            <strong>Nome do Servidor:</strong> {{ cliente.servidor.nome }}
          </v-col>
          <v-col cols="12" md="6">
            <strong>CPF do Servidor:</strong> {{ cliente.servidor.cpf }}
          </v-col>
          <v-col cols="12" md="6">
            <strong>Email do Servidor:</strong> {{ cliente.servidor.email }}
          </v-col>
          <v-col cols="12" md="6">
            <strong>Disciplina:</strong> {{ cliente.disciplina }}
          </v-col>
        </v-row>
      </UiParentCard>
    </v-col>
  </v-row>
</template>