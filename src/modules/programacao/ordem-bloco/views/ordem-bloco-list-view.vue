<script setup lang="ts">
import PageHeader from '@/components/shared/PageHeader.vue';
import OrdemBlocoControl from '../ordem-bloco-control.vue';
</script>

<template>
  <div>
    <PageHeader
      title="Ordens de bloco"
      :breadcrumbs="[
        { title: 'Início', href: '/', disabled: false },
        { title: 'Ordens de bloco', href: '/programacao/ordem-bloco', disabled: true },
      ]"
    />
    <OrdemBlocoControl />
  </div>
</template>
