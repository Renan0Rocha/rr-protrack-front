<script setup lang="ts">
definePageMeta({
    layout: "blank",
});
</script>
<template>
    <div class="d-flex justify-center align-center text-center h-100">
        <div>
            <img src="/images/backgrounds/errorimg.svg" width="500" alt="404" />
            <h1 class="text-h1 pt-3">Opps!!!</h1>
            <h4 class="text-h4 my-8">Esta página que você procura não foi encontrada.</h4>
            <v-btn rounded="pill" color="primary" class="mb-4" to="/">Voltar para a Home</v-btn>
        </div>
    </div>
</template>
