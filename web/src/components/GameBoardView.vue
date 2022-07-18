<script setup lang="ts">
import type { Board } from "@/models/Board";
import { ref } from "vue";

const props = defineProps<{ initialBoard: Board }>();
const board = ref(props.initialBoard);
</script>

<template>
  <div class="game-board-view">
    <table>
      <tr v-for="row in board.disks">
        <td v-for="disk in row">
          <div v-if="disk == 'dark'" class="disk-container disk">
            <div class="dark"></div>
          </div>
          <div v-else-if="disk == 'light'" class="disk-container disk">
            <div class="light"></div>
          </div>
          <div v-else class="disk-container disk">
            <div class="none"></div>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<style scoped>
table .disk span {
  font-size: large;
  font-weight: 600;
  font-size: 32px;
}

table .disk,
.disk-container {
  width: 48px;
  height: 48px;
  background-color: green;
  text-align: center;
}

table {
  display: grid;
}

table .disk .light {
  color: white;
  width: 32px;
  height: 32px;
  border-radius: 50%;
}
table .disk .dark {
  color: black;
  width: 32px;
  height: 32px;
  border-radius: 50%;
}
table .disk .none {
  color: transparent;
}
</style>
