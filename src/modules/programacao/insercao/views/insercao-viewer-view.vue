<template>
  <div>
    <PageHeader
      title="Visualizar Inserção"
      :breadcrumbs="[
        { title: 'Início', href: paths.dashboard, disabled: false },
        { title: 'Inserções', href: paths.programacao.insercao.list, disabled: false },
        //{ title: currentData?.nome || '', disabled: true }
      ]"
      button-label="Listar Inserções"
      :button-to="paths.programacao.insercao.list"
    />

    <UiParentCard title="Dados da Inserção">
      <v-row dense>
        <v-col cols="12" md="6">
          <strong>Nome:</strong> {{ insercao?.tempo}}
        </v-col>
        <v-col cols="12" md="6">
          <strong>CPF:</strong> {{ insercao?.valor }}
        </v-col>
      </v-row>
    </UiParentCard>
  </div>
</template>

<script setup lang="ts">
import PageHeader from '@/components/shared/PageHeader.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { paths } from '@/routes/paths';
import { InsercaoService } from '@/services/programacao/insercao-service';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';


interface Insercao {
  id: string;
    tempo: string;
    valor: number;
}

const route = useRoute();
const router = useRouter();

const rawId = route.params.id;
const id = Array.isArray(rawId) ? rawId[0] : rawId ?? '';

const insercao = ref<Insercao | null>(null);

onMounted(async () => {
  if (!id) {
    router.push(paths.programacao.insercao.list);
    return;
  }
  try {
    insercao.value = await InsercaoService.findOneById(id);
  } catch (error) {
    console.error('Erro ao buscar inserção:', error);
  }
});
</script>

<style scoped>

</style>
