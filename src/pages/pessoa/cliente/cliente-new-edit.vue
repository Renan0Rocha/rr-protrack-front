<script setup lang="ts">
import { useRouter } from 'vue-router'

import PageHeader from '@/components/shared/PageHeader.vue'
import UiParentCard from '@/components/shared/UiParentCard.vue'
import { paths } from '@/routes/paths'
import { ClienteService } from '~/services'
import { CLIENTE_BREADCRUMBS_NEW_EDIT } from './enums/cliente-enums'
import { useClienteForm } from './resolvers/cliente-resolver'

// router e breadcrumbs
const router = useRouter()
const breadcrumbs = CLIENTE_BREADCRUMBS_NEW_EDIT

// form
const {
  handleSubmit,
  nome, nomeErro,
  cpf, cpfErro,
  email, emailErro,
  telefone, telefoneErro,
  tipo, tipoErro,
  data_nasc, dataNascErro,
  vendedor_id, vendedorIdErro,
  endereco_id, enderecoIdErro,
} = useClienteForm()

const onSubmit = handleSubmit(async (values) => {
  try {
    await ClienteService.create(values)
    alert('Cliente cadastrado com sucesso!')
    router.push(paths.pessoa.cliente.list)
  } catch (error) {
    alert('Erro ao cadastrar cliente.')
    console.error(error)
  }
})
</script>

<template>
  <v-row>
    <v-col cols="12">
      <PageHeader
        title="Cadastrar Cliente"
        :breadcrumbs="breadcrumbs"
        button-label="Listar Clientes"
        :button-to="paths.pessoa.cliente.list"
      />

      <UiParentCard>
        <v-form @submit.prevent="onSubmit">
          <v-row dense>
            <v-col cols="12">
              <v-text-field v-model="nome" :error-messages="nomeErro" label="Nome" outlined />
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field v-model="cpf" :error-messages="cpfErro" label="CPF / CNPJ" outlined />
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field v-model="email" :error-messages="emailErro" label="Email" outlined />
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field v-model="telefone" :error-messages="telefoneErro" label="Telefone" outlined />
            </v-col>

            <v-col cols="12" md="6">
              <v-select
                v-model="tipo"
                :items="['física', 'jurídica']"
                :error-messages="tipoErro"
                label="Tipo de Pessoa"
                outlined
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="data_nasc"
                :error-messages="dataNascErro"
                label="Data de Nascimento"
                outlined
                type="date"
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="vendedor_id"
                :error-messages="vendedorIdErro"
                label="ID do Vendedor"
                outlined
                type="number"
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="endereco_id"
                :error-messages="enderecoIdErro"
                label="ID do Endereço"
                outlined
                type="number"
              />
            </v-col>

            <v-col cols="12" class="text-right">
              <v-btn type="submit" color="primary" class="mt-4">Cadastrar Cliente</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </UiParentCard>
    </v-col>
  </v-row>
</template>
