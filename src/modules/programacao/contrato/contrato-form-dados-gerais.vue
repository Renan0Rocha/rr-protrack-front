<script setup lang="ts">
import { formatMoney } from '@/utils/format-data/format-money';
import { onMounted, ref, watch } from 'vue';
import { ClienteService } from '~/services/pessoa/cliente-service';
import { VendedorService } from '~/services/pessoa/vendedor-service';
import { InsercaoService } from '~/services/programacao/insercao-service';
import { useContratoResolverDadosGerais } from './resolvers';

const props = defineProps<{
  initialData: any;
  isEdit: boolean;
  loading?: boolean;
}>();

const emit = defineEmits<{
  (e: 'next', values: Record<string, any>): void
}>();

const clientes = ref<any[]>([]);
const vendedores = ref<any[]>([]);
const insercoes = ref<any[]>([]);

onMounted(async () => {
  clientes.value = await ClienteService.findAll();
  vendedores.value = await VendedorService.findAll();
  insercoes.value = await InsercaoService.findAll();
});

const {
  handleSubmit,
  setValues,
  numeroDocumento, numeroDocumentoErro,
  situacao, situacaoErro,
  plano, planoErro,
  cliente, clienteErro,
  vendedor, vendedorErro,
  dataEmissao, dataEmissaoErro,
  dataInicio, dataInicioErro,
  dataFim, dataFimErro,
  totalInsercoes, totalInsercoesErro,
  valorBruto, valorBrutoErro,
  valorDesconto, valorDescontoErro,
  valorTotal, valorTotalErro,
  valorComissao, valorComissaoErro,
  insercao, insercaoErro,
  descricao, descricaoErro
} = useContratoResolverDadosGerais(props.initialData ?? {});

watch([() => insercao.value?.valor, () => totalInsercoes.value], ([valor, total]) => {
  valorBruto.value = (valor || 0) * (total || 0);
});

watch([() => valorBruto.value, () => valorDesconto.value], ([bruto, desconto]) => {
  valorTotal.value = (bruto || 0) - (desconto || 0);
});

watch(
  () => props.initialData,
  (val) => {
    if (props.isEdit && val) {
      setValues(val);
    }
  },
  { immediate: true, deep: true }
);

const onSubmit = handleSubmit(values => {
  emit('next', values);
});
</script>

<template>
  <v-form @submit.prevent="onSubmit">
    <v-row dense>
      <v-col cols="12" md="4">
        <v-text-field v-model="numeroDocumento" label="Número do Documento" :error-messages="numeroDocumentoErro ? [numeroDocumentoErro] : []" />
      </v-col>
      <v-col cols="12" md="4">
        <v-select
          v-model="situacao"
          :items="['Ativo', 'Encerrado', 'Cancelado']"
          label="Situação"
          :error-messages="situacaoErro ? [situacaoErro] : []"
        />
      </v-col>
      <v-col cols="12" md="4">
        <v-select
          v-model="plano"
          :items="['A vista', 'A prazo']"
          label="Plano"
          :error-messages="planoErro ? [planoErro] : []"
        />
      </v-col>
      <v-col cols="12" md="6">
        <v-autocomplete
          v-model="cliente"
          :items="clientes"
          item-title="nome"
          item-value="id"
          return-object
          label="Cliente"
          :error-messages="clienteErro ? [clienteErro] : []"
        />

      </v-col>
      <v-col cols="12" md="6">
        <v-autocomplete
          v-model="vendedor"
          :items="vendedores"
          item-title="nome"
          item-value="id"
          return-object
          label="Vendedor"
          :error-messages="vendedorErro ? [vendedorErro] : []"
        />

      </v-col>
      <v-col cols="12" md="4">
        <v-text-field v-model="dataEmissao" type="date" label="Data de Emissão" :error-messages="dataEmissaoErro ? [dataEmissaoErro] : []" />
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field v-model="dataInicio" type="date" label="Data de Início" :error-messages="dataInicioErro ? [dataInicioErro] : []" />
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field v-model="dataFim" type="date" label="Data de Fim" :error-messages="dataFimErro ? [dataFimErro] : []" />
      </v-col>
      <v-col cols="12" md="3">
        <v-text-field v-model.number="totalInsercoes" label="Total de Inserções" type="number" :error-messages="totalInsercoesErro ? [totalInsercoesErro] : []" />
      </v-col>
      <v-col cols="12" md="3">
        <v-autocomplete
          v-model="insercao"
          :items="insercoes"
          item-title="tempo"
          return-object
          label="Inserção"
          :error-messages="insercaoErro ? [insercaoErro] : []"
        />
      </v-col>
      <v-col cols="12" md="2">
        <v-text-field :model-value="formatMoney(valorBruto || 0)" label="Valor Bruto" disabled />
      </v-col>
      <v-col cols="12" md="2">
        <v-text-field v-model.number="valorDesconto" label="Valor Desconto" :error-messages="valorDescontoErro ? [valorDescontoErro] : []" />
      </v-col>
      <v-col cols="12" md="2">
        <v-text-field :model-value="formatMoney(valorTotal || 0)" label="Valor Total" disabled />
      </v-col>
      <v-col cols="12" md="3">
        <v-text-field v-model.number="valorComissao" label="Valor Comissão" :error-messages="valorComissaoErro ? [valorComissaoErro] : []" />
      </v-col>
      <v-col cols="12">
        <v-textarea v-model="descricao" label="Descrição" :error-messages="descricaoErro ? [descricaoErro] : []" />
      </v-col>
    </v-row>

     <v-row class="mt-4" justify="end">
      <v-col cols="auto">
        <v-btn type="submit" color="primary">
          Próximo
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>
