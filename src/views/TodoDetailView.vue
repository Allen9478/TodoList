<script setup>
import { ref, onMounted } from 'vue'
import { useRoute , useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const todo = ref(null)
const isLoading = ref(false)
const error = ref(null)

onMounted(async () => {
  isLoading.value = true
  try {
    // route.params.id 就是 URL 裡的 :id
    const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${route.params.id}`)
    if (!res.ok) throw new Error('找不到這筆資料')
    todo.value = await res.json()
  } catch (err) {
    error.value = err.message
  } finally {
    isLoading.value = false
  }
})

</script>

<template>
  <div>
    <p v-if="isLoading">載入中...</p>
    <p v-else-if="error">{{ error }}</p>
    <div v-else-if="todo">
      <h1>Todo 詳細頁</h1>
      <p>ID：{{ todo.id }}</p>
      <p>標題：{{ todo.title }}</p>
      <p>狀態：{{ todo.completed ? '已完成' : '未完成' }}</p>
    </div>
  </div>
</template>