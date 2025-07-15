<template>
  <div>
    <PageHeader
      title="Visualizar Programa"
      :breadcrumbs="[
        { title: 'Início', href: paths.dashboard, disabled: false },
        { title: 'Programas', href: paths.programacao.programa.list, disabled: false },
        { title: programa?.nome || '', disabled: true }
      ]"
      button-label="Listar Programas"
      :button-to="paths.programacao.programa.list"
    />

    <UiParentCard title="Dados do Programa">
      <v-row dense>
        <v-col cols="12" md="6">
          <strong>Nome:</strong> {{ programa?.nome }}
        </v-col>
        <v-col cols="12" md="6">
          <strong>Vínculo:</strong> {{ programa?.vinculo }}
        </v-col>
        <v-col cols="12" md="6">
          <strong>Data de Nascimento:</strong> {{ programa?.dataNascimento }}
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
import { ProgramaService } from '~/services/programacao/programa-service';

interface Programa {
  id: string;
  nome: string;
  descricao: string;
  vinculo: string;
  dataNascimento: string;
}

const route = useRoute();
const router = useRouter();

const rawId = route.params.id;
const id = Array.isArray(rawId) ? rawId[0] : rawId ?? '';

const programa = ref<Programa | null>(null);

onMounted(async () => {
  if (!id) {
    router.push(paths.programacao.programa.list);
    return;
  }
  try {
    programa.value = await ProgramaService.findOneById(id);
  } catch (error) {
    console.error('Erro ao buscar programa:', error);
  }
});
</script>

<style scoped>

</style>
