<template>
  <main>
    <div class="cpu-battle-view">
      <h2>Battle with Computer</h2>
      <GameBoardView :initial-board="board" />
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from "vue";
import GameBoardView from "../components/GameBoardView.vue";
import { createNewBoard } from "../models/Board";

const board = ref(createNewBoard());
</script>

<style scoped></style>
