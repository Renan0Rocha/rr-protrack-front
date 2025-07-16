<script setup lang="ts">
import PageHeader from '@/components/shared/PageHeader.vue';
import { paths } from '@/routes/paths';
import ClienteForm from '../cliente-form.vue';
</script>

<template>
  <div>
    <PageHeader
      title="Cadastrar Cliente"
      :breadcrumbs="[
        { title: 'Início', href: '/', disabled: false },
        { title: 'Clientes', href: '/pessoa/cliente', disabled: false },
        { title: 'Novo Cliente', disabled: true }
      ]"
      :button-to="paths.pessoa.cliente.list"
      button-label="Lista Clientes"
    />
    <ClienteForm />
  </div>
</template>
