<script setup lang="ts">
import { onMounted, ref } from 'vue';

const props = defineProps<{
  initialData: any;
  isEdit: boolean;
  loading?: boolean;
}>();

const emit = defineEmits<{
  (e: 'back', values: Record<string, any>): void;
  (e: 'submit', values: Record<string, any>): void;
}>();

const horarios = ref<string[]>([]);
const allHorarios = ref<string[]>([]);

function gerarHorarios() {
  const horariosGerados: string[] = [];
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 15) {
      const hora = String(h).padStart(2, '0');
      const minuto = String(m).padStart(2, '0');
      horariosGerados.push(`${hora}:${minuto}`);
    }
  }
  allHorarios.value = horariosGerados;
}

onMounted(() => {
  gerarHorarios();
  if (props.initialData?.horarios) {
    horarios.value = props.initialData.horarios;
  }
});

function toggleHorario(horario: string) {
  if (horarios.value.includes(horario)) {
    horarios.value = horarios.value.filter(h => h !== horario);
  } else {
    horarios.value.push(horario);
  }
}

function handleBack() {
  emit('back', { horarios: horarios.value });
}

function handleSubmit() {
  emit('submit', { horarios: horarios.value });
}
</script>

<template>
  <div>
    <h3 class="text-center mb-4">Selecione os horarios das inserções</h3>
    <v-row>
      <v-col cols="12">
        <v-row>
          <v-col
            v-for="horario in allHorarios"
            :key="horario"
            cols="3"
            sm="2"
            md="1"
            class="d-flex align-center"
          >
            <v-checkbox
              v-model="horarios"
              :value="horario"
              :label="horario"
              hide-details
              density="compact"
            />
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-row class="mt-4" justify="space-between">
      <v-col cols="auto">
        <v-btn color="secondary" @click="handleBack">Voltar</v-btn>
      </v-col>
      <v-col cols="auto">
        <v-btn color="primary" @click="handleSubmit">Finalizar</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
.text-center {
  text-align: center;
}
</style>
