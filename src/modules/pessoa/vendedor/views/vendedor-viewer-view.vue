<template>
  <div>
    <PageHeader
      title="Visualizar Vendedor"
      :breadcrumbs="[
        { title: 'Início', href: paths.dashboard, disabled: false },
        { title: 'Vendedores', href: paths.pessoa.vendedor.list, disabled: false },
        { title: vendedor?.nome || '', disabled: true }
      ]"
      button-label="Listar Vendedores"
      :button-to="paths.pessoa.vendedor.list"
    />

    <UiParentCard title="Dados do Vendedor">
      <v-row dense>
        <v-col cols="12" md="6">
          <strong>Nome:</strong> {{ vendedor?.nome }}
        </v-col>
        <v-col cols="12" md="6">
          <strong>CPF:</strong> {{ vendedor?.cpf }}
        </v-col>
        <v-col cols="12" md="6">
          <strong>Vínculo:</strong> {{ vendedor?.vinculo }}
        </v-col>
        <v-col cols="12" md="6">
          <strong>Data de Nascimento:</strong> {{ vendedor?.dataNascimento }}
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
import { VendedorService } from '~/services/pessoa/vendedor-service';

interface Vendedor {
  id: string;
  nome: string;
  cpf: string;
  vinculo: string;
  dataNascimento: string;
}

const route = useRoute();
const router = useRouter();

const rawId = route.params.id;
const id = Array.isArray(rawId) ? rawId[0] : rawId ?? '';

const vendedor = ref<Vendedor | null>(null);

onMounted(async () => {
  if (!id) {
    router.push(paths.pessoa.vendedor.list);
    return;
  }
  try {
    vendedor.value = await VendedorService.findOneById(id);
  } catch (error) {
    console.error('Erro ao buscar vendedor:', error);
  }
});
</script>

<style scoped>

</style>
