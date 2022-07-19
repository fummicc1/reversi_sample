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
import { createNewGame } from "../models/Game";
import BoardView from "../components/BoardView.vue";
import { computed } from "@vue/reactivity";

const game = ref(createNewGame());
const board = computed(() => game.value.board);

onMounted(() => {});

const onSelectDisk = (x: number, y: number) => {
  alert(`${x}行${y}列の駒が選択されました`);
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
