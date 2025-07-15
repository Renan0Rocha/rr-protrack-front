<script setup lang="ts">
import UiParentCard from '@/components/shared/UiParentCard.vue';
</script>

<template>
  <v-row>
    <v-col cols="12" md="12">
      <UiParentCard >
        <div class="d-flex justify-center mt-4">
            <v-img
                src="/images/backgrounds/PaginaInicial.svg"
                alt="Imagem Página Inicial"
                contain
                max-width="100%"
                height="auto"
                class="mx-auto"
            />
        </div>
      </UiParentCard>
    </v-col>
  </v-row>
</template>
