<script setup lang="ts">
import PageHeader from '@/components/shared/PageHeader.vue';
import { paths } from '@/routes/paths';
import VendedorForm from '../vendedor-form.vue';
</script>

<template>
  <div>
    <PageHeader
      title="Cadastrar Vendedor"
      :breadcrumbs="[
        { title: 'Início', href: '/', disabled: false },
        { title: 'Vendedores', href: '/pessoa/vendedor', disabled: false },
        { title: 'Novo Vendedor', disabled: true }
      ]"
      :button-to="paths.pessoa.vendedor.list"
      button-label="Lista Vendedores"
    />
    <VendedorForm />
  </div>
</template>
