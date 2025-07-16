<template>
  <div>
    <UiParentCard>
      <!-- Seletor centralizado -->
      <div class="d-flex justify-center align-center mb-6">
        <v-menu>
          <template #activator="{ props }">
            <v-text-field
              v-model="selectedDate"
              v-bind="props"
              label="Data"
              type="date"
              style="max-width: 150px;"
            />
          </template>
        </v-menu>

        <v-select
          v-model="selectedTime"
          :items="timeOptions"
          label="Horário"
          style="max-width: 105px; margin-left: 16px;"
          dense
          outlined
        />
      </div>

      <!-- Tabela de ordens -->
      <v-data-table
        :items="sorted"
        :headers="tableHeaders"
        class="elevation-1"
        hide-default-footer
      >
        <template #item.actions="{ item }">
          <v-btn icon small @click="moveUp(item)">
            <v-icon>mdi-chevron-up</v-icon>
          </v-btn>
          <v-btn icon small @click="moveDown(item)">
            <v-icon>mdi-chevron-down</v-icon>
          </v-btn>
          <v-btn icon small color="error" @click="removeItem(item)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </UiParentCard>
  </div>
</template>

<script setup lang="ts">
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { computed, ref } from 'vue';

// fake data de contratos
interface ContratoItem {
  id: number;
  empresa: string;
  descricao: string;
  tempo: string;
  numeroOrdem: number;
}

const selectedDate = ref<string>(new Date().toISOString().substr(0, 10));
const selectedTime = ref<string>('12:00');

const timeOptions = Array.from({ length: 96 }, (_, i) => {
  const hours = Math.floor(i * 15 / 60).toString().padStart(2, '0');
  const minutes = (i * 15 % 60).toString().padStart(2, '0');
  return `${hours}:${minutes}`;
});

const contratos = ref<ContratoItem[]>([
  { id: 1, empresa: 'Banco Sicobb', descricao: 'Anúncio semana sicobb evento beneficente', tempo: '00:30', numeroOrdem: 1 },
  { id: 2, empresa: 'Pet Shop Jipa', descricao: 'Semana com 20% de desconto no estabelecimento.', tempo: '00:30', numeroOrdem: 2 },
  { id: 3, empresa: 'Restaurante Bucho Cheio', descricao: 'Rodízio de churrasco adulto e infantil no dia das crianças', tempo: '00:30', numeroOrdem: 3 },
  { id: 4, empresa: 'SESC', descricao: 'Dia de brinca, 12 de outubro, programação para crianças', tempo: '00:30', numeroOrdem: 4 },
  { id: 5, empresa: 'Prefeitura', descricao: 'Semana da exposição divulgação dos shows', tempo: '00:30', numeroOrdem: 5 },
]);

// agora sem a coluna ID
const tableHeaders = [
  { text: 'Ordem',      value: 'numeroOrdem' },
  { text: 'Empresa',    value: 'empresa' },
  { text: 'Descrição',  value: 'descricao' },
  { text: 'Tempo',      value: 'tempo' },
  { text: 'Ações',      value: 'actions', sortable: false }
];

function moveUp(item: ContratoItem) {
  if (item.numeroOrdem <= 1) return;
  const other = contratos.value.find(c => c.numeroOrdem === item.numeroOrdem - 1);
  if (other) {
    other.numeroOrdem++;
    item.numeroOrdem--;
  }
}
function moveDown(item: ContratoItem) {
  if (item.numeroOrdem >= contratos.value.length) return;
  const other = contratos.value.find(c => c.numeroOrdem === item.numeroOrdem + 1);
  if (other) {
    other.numeroOrdem--;
    item.numeroOrdem++;
  }
}
function removeItem(item: ContratoItem) {
  contratos.value = contratos.value
    .filter(c => c.id !== item.id)
    .map((c, i) => ({ ...c, numeroOrdem: i + 1 }));
}

const sorted = computed(() =>
  contratos.value.slice().sort((a, b) => a.numeroOrdem - b.numeroOrdem)
);
</script>

<style scoped>
.v-data-table .v-data-table__wrapper {
  overflow-x: auto;
}
</style>
