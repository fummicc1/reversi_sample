<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <h3 class="header-title">リバーシ</h3>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/battle/cpu">CPU</RouterLink>
      <RouterLink to="/battle/online">Online</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped>
nav a {
  border-left: 1px solid var(--color-border);
  font-weight: bold;
  padding: 8px;
  font-size: large;
}

header .header-title {
  color: var(--vt-c-white);
  margin: 0 auto 0 1rem;
  font-weight: bold;
}

header {
  width: 100vw;
  background-color: var(--vt-c-black);
  display: flex;
  padding: 4px;
  justify-content: flex-end;
}
</style>
