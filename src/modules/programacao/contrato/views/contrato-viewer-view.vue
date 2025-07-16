<template>
  <div>
    <PageHeader
      title="Visualizar Contrato"
      :breadcrumbs="[
        { title: 'Início', href: paths.dashboard, disabled: false },
        { title: 'Contratos', href: paths.programacao.contrato.list, disabled: false },
      ]"
      button-label="Listar Contratos"
      :button-to="paths.programacao.contrato.list"
    />

    <UiParentCard title="Detalhes do Contrato">
      <v-row dense>
        <!-- Informações principais -->
        <v-col cols="12" md="6"><strong>Número Documento:</strong> {{ contrato?.numeroDocumento }}</v-col>
        <v-col cols="12" md="6"><strong>Situação:</strong> {{ contrato?.situacao }}</v-col>
        <v-col cols="12" md="6"><strong>Plano:</strong> {{ contrato?.plano }}</v-col>
        <v-col cols="12" md="6"><strong>Descrição:</strong> {{ contrato?.descricao }}</v-col>

        <!-- Cliente -->
        <v-col cols="12" class="mt-4"><strong class="text-subtitle-1">Cliente</strong></v-col>
        <v-col cols="12" md="6"><strong>Nome:</strong> {{ contrato?.cliente?.nome }}</v-col>

        <!-- Vendedor -->
        <v-col cols="12" class="mt-4"><strong class="text-subtitle-1">Vendedor</strong></v-col>
        <v-col cols="12" md="6"><strong>Nome:</strong> {{ contrato?.vendedor?.nome }}</v-col>

        <!-- Datas -->
        <v-col cols="12" class="mt-4"><strong class="text-subtitle-1">Datas</strong></v-col>
        <v-col cols="12" md="4"><strong>Data de Emissão:</strong> {{ formatDate(contrato?.dataEmissao) }}</v-col>
        <v-col cols="12" md="4"><strong>Data de Início:</strong> {{ formatDate(contrato?.dataInicio) }}</v-col>
        <v-col cols="12" md="4"><strong>Data de Fim:</strong> {{ formatDate(contrato?.dataFim) }}</v-col>

        <!-- Inserção -->
        <v-col cols="12" class="mt-4"><strong class="text-subtitle-1">Inserção</strong></v-col>
        <v-col cols="12" md="6"><strong>Tempo:</strong> {{ contrato?.insercao?.tempo }}</v-col>
        <v-col cols="12" md="6"><strong>Valor:</strong> R$ {{ contrato?.insercao?.valor?.toFixed(2) }}</v-col>

        <!-- Valores -->
        <v-col cols="12" class="mt-4"><strong class="text-subtitle-1">Valores</strong></v-col>
        <v-col cols="12" md="4"><strong>Total de Inserções:</strong> {{ contrato?.totalInsersoes }}</v-col>
        <v-col cols="12" md="4"><strong>Valor Bruto:</strong> R$ {{ contrato?.valorBruto?.toFixed(2) }}</v-col>
        <v-col cols="12" md="4"><strong>Desconto:</strong> R$ {{ contrato?.valorDesconto?.toFixed(2) }}</v-col>
        <v-col cols="12" md="4"><strong>Valor Total:</strong> R$ {{ contrato?.valorTotal?.toFixed(2) }}</v-col>
        <v-col cols="12" md="4"><strong>Comissão:</strong> R$ {{ contrato?.valorComissao?.toFixed(2) }}</v-col>

        <!-- Horários -->
        <v-col cols="12" class="mt-4"><strong class="text-subtitle-1">Horários</strong></v-col>
        <v-col cols="12">
          <v-chip-group column>
            <v-chip
              v-for="(horario, index) in formatHorarios(contrato?.horarios)"
              :key="index"
              class="ma-1"
              color="primary"
              text-color="white"
            >
              {{ horario }}
            </v-chip>
          </v-chip-group>
        </v-col>
      </v-row>
    </UiParentCard>
  </div>
</template>

<script setup lang="ts">
import PageHeader from '@/components/shared/PageHeader.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { paths } from '@/routes/paths';
import { ContratoService } from '@/services/programacao/contrato-service';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const rawId = route.params.id;
const id = Array.isArray(rawId) ? rawId[0] : rawId ?? '';

const contrato = ref<Record<string, any> | null>(null);

onMounted(async () => {
  if (!id) {
    router.push(paths.programacao.contrato.list);
    return;
  }
  try {
    contrato.value = await ContratoService.findOneById(id);
  } catch (error) {
    console.error('Erro ao buscar contrato:', error);
  }
});

function formatHorarios(horarios: any): string[] {
  if (!horarios) return [];
  if (typeof horarios === 'string') {
    try {
      const parsed = JSON.parse(horarios);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  return Array.isArray(horarios) ? horarios : [];
}

function formatDate(dateStr: string | undefined): string {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('pt-BR').format(date);
}

</script>
