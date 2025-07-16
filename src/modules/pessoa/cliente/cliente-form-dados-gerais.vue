<script setup lang="ts">
import { useClienteResolverDadosGerais } from '@/modules/pessoa/cliente/resolvers';
import { onMounted, ref, watch } from 'vue';
import { VendedorService } from '~/services/pessoa/vendedor-service';

const props = defineProps<{ initialData?: Record<string, any> }>();

const emit = defineEmits<{
  (e: 'next', values: Record<string, any>): void
}>();

const {
  handleSubmit,
  nome, nomeErro,
  cpf, cpfErro,
  dataNasc, dataNascErro,
  vendedorId,   vendedorIdErro,
  vendedorNome, vendedorNomeErro,
} = useClienteResolverDadosGerais(props.initialData ?? {});

interface VendedorDto {
  cpf: string;
  nome: string;
}

interface VendedorOption {
  id: string;
  nome: string;
}

const vendors = ref<VendedorOption[]>([]);

onMounted(async () => {
  const list = (await VendedorService.findAll()) as VendedorDto[];
  vendors.value = list.map((v: VendedorDto) => ({
    id: v.cpf,
    nome: v.nome,
  }));
});

watch(vendedorId, (id: string) => {
  const found = vendors.value.find(v => v.id === id);
  vendedorNome.value = found?.nome ?? '';
});

const onSubmit = handleSubmit(values => {
  emit('next', values);
});
</script>

<template>
  <v-form @submit.prevent="onSubmit">
    <v-row dense>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="nome"
          label="Nome"
          outlined
          :error-messages="nomeErro ? [nomeErro] : []"
        />
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field
          v-model="cpf"
          label="CPF"
          outlined
          :error-messages="cpfErro ? [cpfErro] : []"
        />
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field
          v-model="dataNasc"
          label="Data de Nascimento"
          type="date"
          outlined
          :error-messages="dataNascErro ? [dataNascErro] : []"
        />
      </v-col>

      <v-col cols="12" md="6">
        <v-autocomplete
          v-model="vendedorId"
          :items="vendors"
          item-value="id"
          item-title="nome"
          label="Vendedor"
          outlined
          :error-messages="vendedorIdErro ? [vendedorIdErro] : []"
        />
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
