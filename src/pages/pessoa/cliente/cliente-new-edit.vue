<script setup lang="ts">
import { useRouter } from 'vue-router'

import PageHeader from '@/components/shared/PageHeader.vue'
import UiParentCard from '@/components/shared/UiParentCard.vue'
import { paths } from '@/routes/paths'
import { ClienteService } from '~/services'
import { CLIENTE_BREADCRUMBS_LIST } from './enums/cliente-enums'
import { useClienteForm } from './resolvers/cliente-resolver'

// router e breadcrumbs
const router = useRouter()
const breadcrumbs = CLIENTE_BREADCRUMBS_LIST

// form
const {
  handleSubmit,
  nome, nomeErro,
  cpf, cpfErro,
  email, emailErro,
} = useClienteForm();

const onSubmit = handleSubmit(async (values) => {
  const payload = { idServidor: 0, ...values };
  try {
    await ClienteService.create(payload);
    alert('Cliente cadastrado com sucesso!');
    router.push(paths.pessoa.cliente.list);
  } catch (error) {
    alert('Erro ao cadastrar cliente.');
    console.error(error);
  }
});

</script>

<template>
  <v-row>
    <v-col cols="12">
      <PageHeader
        title="Cadastrar Cliente"
        :breadcrumbs="breadcrumbs"
        button-label="Listar Servidores"
        :button-to="paths.pessoa.cliente.list"
      />

      <UiParentCard>
        <v-form @submit.prevent="onSubmit">
          <v-row dense>
            <v-col cols="12">
              <v-text-field v-model="nome" :error-messages="nomeErro" label="Nome" outlined />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="cpf" :error-messages="cpfErro" label="CPF" outlined />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="email" :error-messages="emailErro" label="Email" outlined type="email" />
            </v-col>

            <v-col cols="12" class="text-right">
              <v-btn type="submit" color="primary" class="mt-4">Cadastrar Servidor</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </UiParentCard>
    </v-col>
  </v-row>
</template>