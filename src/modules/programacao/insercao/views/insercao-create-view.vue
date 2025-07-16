<script setup lang="ts">
import PageHeader from '@/components/shared/PageHeader.vue';
import { paths } from '@/routes/paths';
import InsercaoForm from '../insercao-form.vue';
</script>

<template>
  <div>
    <PageHeader
      title="Cadastrar Inserção"
      :breadcrumbs="[
        { title: 'Início', href: '/', disabled: false },
        { title: 'Inserções', href: '/programacao/insercao', disabled: false },
        { title: 'Nova Inserção', disabled: true }
      ]"
      :button-to="paths.programacao.insercao.list"
      button-label="Lista Inserções"
    />
    <InsercaoForm />
  </div>
</template>
