<script setup lang="ts">
import type { Board } from "@/models/Board";
import type { Position } from "@/models/Position";
import { ref } from "vue";

const props = defineProps<{
  initialBoard: Board;
  onSelectDisk: (position: Position) => void;
}>();
const board = ref(props.initialBoard);

const hoverDisk = ref<number[] | null>(null);
const onHoverDisk = (position: Position) => {
  hoverDisk.value = [position.x, position.y];
};
const onLeaveHoverDisk = () => {
  hoverDisk.value = null;
};
</script>

<template>
  <div class="game-board-view">
    <table>
      <tr v-for="[x, row] in board.disks.entries()">
        <td v-for="[y, disk] in row.entries()">
          <div v-if="disk == 'dark'" class="disk">
            <div class="dark"></div>
          </div>
          <div v-else-if="disk == 'light'" class="disk">
            <div class="light"></div>
          </div>
          <div
            v-else
            class="disk"
            @click="props.onSelectDisk({ x: x, y: y })"
            @mouseover="onHoverDisk({ x: x, y: y })"
            @mouseleave="onLeaveHoverDisk()"
          >
            <div
              class="empty"
              v-bind:class="{
                'empty-hover':
                  hoverDisk != null && hoverDisk[0] === x && hoverDisk[1] === y,
              }"
            ></div>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<style scoped>
table .disk {
  width: 48px;
  height: 48px;
  background-color: green;
  display: flex;
  align-items: center;
  justify-content: center;
}

table {
  display: grid;
}
table .disk .light {
  background-color: white;
  width: 32px;
  height: 32px;
  border-radius: 50%;
}
table .disk .dark {
  background-color: black;
  width: 32px;
  height: 32px;
  border-radius: 50%;
}
table .disk .empty {
  color: transparent;
  pointer-events: auto;
}
.empty-hover {
  opacity: 0.5;
  background-color: black;
  width: 32px;
  height: 32px;
  border-radius: 50%;
}
</style>
