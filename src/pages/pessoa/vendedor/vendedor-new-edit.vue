<script setup lang="ts">
import PageHeader from '@/components/shared/PageHeader.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { paths } from '@/routes/paths';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { FornecedorService } from '~/services/pessoa/fornecedor-service';
import { VENDEDOR_BREADCRUMBS_NEW_EDIT } from './enums/vendedor-enums';
import { useVendedorForm } from './resolvers/vendedor-resolver';

const router = useRouter();
const breadcrumbs = VENDEDOR_BREADCRUMBS_NEW_EDIT;
const abaAtual = ref(0);

const {
  handleSubmit,
  nome, nomeErro,
  cnpj, cnpjErro,
  contato, contatoErro,
  email, emailErro,
  cep, cepErro,
  bairro, bairroErro,
  logradouro, logradouroErro,
  numero, numeroErro,
  cidade, cidadeErro,
  estado, estadoErro
} = useVendedorForm();

const onSubmit = handleSubmit(async (values) => {
  try {
    await FornecedorService.create(values);
    alert('Vendedor cadastrado com sucesso!');
    router.push(paths.pessoa.vendedor.list);
  } catch (error) {
    alert('Erro ao cadastrar vendedor.');
    console.error(error);
  }
});
</script>

<template>
  <v-row>
    <v-col cols="12">
      <PageHeader
        title="Vendedores"
        :breadcrumbs="breadcrumbs"
        button-label="Lista de Vendedores"
        :button-to="paths.pessoa.vendedor.list"
      />

      <UiParentCard title="Cadastro de Vendedor">
        <v-form @submit.prevent="onSubmit">
          <v-tabs v-model="abaAtual" class="mb-4">
            <v-tab>Dados Gerais</v-tab>
            <v-tab>Endereço</v-tab>
          </v-tabs>

          <v-tabs-items v-model="abaAtual">
            <v-tab-item>
              <v-row dense>
                <v-col cols="12" md="6">
                  <v-text-field v-model="nome" :error-messages="nomeErro" label="Nome" outlined />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field v-model="cnpj" :error-messages="cnpjErro" label="CPF/CNPJ" outlined />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field v-model="contato" :error-messages="contatoErro" label="Contato" outlined />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field v-model="email" :error-messages="emailErro" label="E-mail" outlined />
                </v-col>
              </v-row>
            </v-tab-item>

            <v-tab-item>
              <v-row dense>
                <v-col cols="12" md="4">
                  <v-text-field v-model="cep" :error-messages="cepErro" label="CEP" outlined />
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field v-model="bairro" :error-messages="bairroErro" label="Bairro" outlined />
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field v-model="logradouro" :error-messages="logradouroErro" label="Logradouro" outlined />
                </v-col>
                <v-col cols="12" md="3">
                  <v-text-field v-model="numero" :error-messages="numeroErro" label="Número" outlined />
                </v-col>
                <v-col cols="12" md="5">
                  <v-select
                    v-model="cidade"
                    :error-messages="cidadeErro"
                    :items="['Ji-Paraná', 'Porto Velho']"
                    label="Cidade"
                    outlined
                  />
                </v-col>
                <v-col cols="12" md="4">
                  <v-select
                    v-model="estado"
                    :error-messages="estadoErro"
                    :items="['RO', 'AC', 'PA', 'AM']"
                    label="Estado"
                    outlined
                  />
                </v-col>
              </v-row>
            </v-tab-item>
          </v-tabs-items>

          <v-col cols="12" class="text-right">
            <v-btn type="submit" color="primary" class="mt-4">Salvar</v-btn>
          </v-col>
        </v-form>
      </UiParentCard>
    </v-col>
  </v-row>
</template>
