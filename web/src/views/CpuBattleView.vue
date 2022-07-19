<template>
  <main>
    <h2>コンピューター対戦</h2>
    <div class="cpu-battle-view">
      <BoardView
        :initial-board="board"
        :onSelectDisk="onSelectDisk"
        class="board-view"
      />
      <div class="game-result">
        <p v-if="game.state === 'win'">あなたの勝ちです</p>
        <p v-else-if="game.state === 'lose'">あなたの負けです</p>
        <p v-else-if="game.state === 'draw'">引き分けです</p>
      </div>
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
import { computed, ref } from "vue";
import { addMyColor, createNewGame, decideCpuAction } from "@/models/Game";
import BoardView from "../components/BoardView.vue";
import type { Position } from "@/models/Position";
import { flipDisk } from "@/models/Board";
import { calcGameResult, isGameFinished } from "@/models/Game";

const game = ref(createNewGame());
const board = computed(() => game.value.board);
const isLoading = ref(false);

const onSelectDisk = (position: Position) => {
  if (isLoading.value) {
    return;
  }
  isLoading.value = true;
  const isOver = [false, false];
  try {
    game.value = addMyColor(game.value, position);
  } catch (e) {
    if (confirm(`${e}` + "パスを選択しますか？")) {
      isOver[0] = true;
    } else {
      isLoading.value = false;
      return;
    }
  }
  game.value.board = flipDisk(game.value.board, position, game.value.myColor);
  game.value.currentTurn = "opponent";
  setTimeout(() => {
    const decidePosition = decideCpuAction(game.value);
    if (decidePosition == null) {
      isOver[1] = true;
    } else {
      game.value.board = flipDisk(
        game.value.board,
        decidePosition,
        game.value.myColor == "light" ? "dark" : "light"
      );
    }
    let _isOver = isOver[0] && isOver[1];
    if (isGameFinished(game.value)) {
      _isOver = true;
    }
    console.log("isOver", isOver);
    console.log("_isOver", _isOver);
    if (_isOver) {
      game.value.state = calcGameResult(game.value);
    } else {
      game.value.currentTurn = "me";
    }
    isLoading.value = false;
  }, 1000);
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
