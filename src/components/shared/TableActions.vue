<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
  id: string | number;
  onView?: (id: string | number) => void;
  onEdit?: (id: string | number) => void;
  onDelete?: (id: string | number) => void;
}>();
</script>

<template>
  <div class="d-flex align-center" style="gap: 6px;">
    <!-- Visualizar -->
    <v-tooltip text="Visualizar" location="bottom" v-if="props.onView">
      <template #activator="{ props: tooltip }">
        <v-btn
          v-bind="tooltip"
          icon
          size="small"
          variant="tonal"
          color="info"
          @click="() => props.onView?.(props.id)"
        >
           <v-icon>mdi-eye-outline</v-icon>
        </v-btn>
      </template>
    </v-tooltip>

    <!-- Editar -->
    <v-tooltip text="Editar" location="bottom" v-if="props.onEdit">
      <template #activator="{ props: tooltip }">
        <v-btn
          v-bind="tooltip"
          icon
          size="small"
          variant="tonal"
          color="warning"
          @click="() => props.onEdit?.(props.id)"
        >
          <v-icon>mdi-pencil-outline</v-icon>
        </v-btn>
      </template>
    </v-tooltip>

    <!-- Excluir -->
    <v-tooltip text="Excluir" location="bottom" v-if="props.onDelete">
      <template #activator="{ props: tooltip }">
        <v-btn
          v-bind="tooltip"
          icon
          size="small"
          variant="tonal"
          color="error"
          @click="() => props.onDelete?.(props.id)"
        >
          <v-icon>mdi-trash-can-outline</v-icon>
        </v-btn>
      </template>
    </v-tooltip>
  </div>
</template>