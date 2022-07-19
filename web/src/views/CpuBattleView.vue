<template>
  <main>
    <h2>コンピューター対戦</h2>
    <div class="cpu-battle-view">
      <BoardView
        :initial-board="board"
        :onSelectDisk="onSelectDisk"
        class="board-view"
      />
      <div class="current-turn-view">
        <p :class="game.currentTurn" v-if="game.currentTurn == 'me'">
          あなたのターンです
        </p>
        <p :class="game.currentTurn" v-else-if="game.currentTurn == 'opponent'">
          相手のターンです
        </p>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { addMyColor, createNewGame, decideCpuAction } from "../models/Game";
import BoardView from "../components/BoardView.vue";
import { computed } from "@vue/reactivity";
import type { Position } from "@/models/Position";

const game = ref(createNewGame());
const board = computed(() => game.value.board);

onMounted(() => {});

const onSelectDisk = (position: Position) => {
  const { x, y } = position;
  game.value = addMyColor(game.value, position);
  game.value.currentTurn = "opponent";
  game.value = decideCpuAction(game.value);
  game.value.currentTurn = "me";
};
</script>

<style scoped>
.cpu-battle-view {
  display: flex;
  flex-direction: row;
}

.current-turn-view {
  padding: 1rem;
  background-color: antiquewhite;
  border-radius: 12px;
  height: fit-content;
}

.current-turn-view .me {
  font-weight: bold;
  font-size: large;
}

.current-turn-view .opponent {
  font-weight: 400;
  font-size: medium;
}
</style>
