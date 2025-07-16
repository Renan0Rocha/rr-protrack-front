<script setup lang="ts">
import PageHeader from '@/components/shared/PageHeader.vue';
import { paths } from '@/routes/paths';
import ContratoForm from '../contrato-form.vue';
</script>

<template>
  <div>
    <PageHeader
      title="Cadastrar Contrato"
      :breadcrumbs="[
        { title: 'Início', href: '/', disabled: false },
        { title: 'Contratos', href: '/programacao/contrato', disabled: false },
        { title: 'Novo Contrato', disabled: true }
      ]"
      :button-to="paths.programacao.contrato.list"
      button-label="Lista Contratos"
    />
    <ContratoForm />
  </div>
</template>
