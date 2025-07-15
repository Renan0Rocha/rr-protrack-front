<script setup lang="ts">
import PageHeader from '@/components/shared/PageHeader.vue';
import { paths } from '@/routes/paths';
import ProgramaForm from '../programa-form.vue';
</script>

<template>
  <div>
    <PageHeader
      title="Cadastrar Programa"
      :breadcrumbs="[
        { title: 'Início', href: '/', disabled: false },
        { title: 'Programas', href: '/programacao/programa', disabled: false },
        { title: 'Novo Programa', disabled: true }
      ]"
      :button-to="paths.programacao.programa.list"
      button-label="Lista Programas"
    />
    <ProgramaForm />
  </div>
</template>
