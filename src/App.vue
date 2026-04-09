<script setup>

import { useTodoStore } from '@/stores/todoStore'

const store = useTodoStore()



</script>

<template>
  <div class="app">
    <nav>
      <RouterLink to="/">首頁（{{ store.unfinishedCount }}）</RouterLink>
      <RouterLink to="/about">關於</RouterLink>
      <RouterLink to="/form">表格</RouterLink>
      <RouterLink to="/api">Api測試</RouterLink>
    </nav>
    <RouterView />
  </div>
</template>

<style scoped>
nav {
  display: flex;
  gap: 16px;
  padding: 16px;
  border-bottom: 1px solid #ddd;
}

a {
  text-decoration: none;
  color: #333;
}

a.router-link-active {
  font-weight: bold;
  color: #000;
}
</style>


