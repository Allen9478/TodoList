<script setup>
import { ref, onMounted } from 'vue'

const todos = ref([])
const isLoading = ref(false)
const error = ref(null)

const addTodo = ref('')
// POST 請求的寫法
const addTodoItem = async () => {
    if (addTodo.value.trim() === '') return
    try {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    title: addTodo.value.trim(),
    completed: false,
    userId: 1
  })
})
if(!res.ok) throw new Error ('add fail')
    const data = await res.json()
    todos.value.push(data)
    addTodo.value=""
}catch (err) {
        error.value = err.message
    }
// JSONPlaceholder 會回傳新增的物件，包含一個假的 id
}


// DELETE 請求的寫法

const removeTodo = async (id) => {
    try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'DELETE'
    })
    if (!res.ok) throw new Error ('delete fail')
    todos.value = todos.value.filter((todo => todo.id !== id))
    }catch(err){
        error.value = err.message
    }
}

// JSONPlaceholder 的 DELETE 回傳空物件 {}，代表成功

onMounted(async () => {
  isLoading.value = true
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
    if (!res.ok) throw new Error('API 回傳錯誤')
    const data = await res.json()
    todos.value = data
  } catch (err) {
    error.value = err.message
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="api-view">
    <h1>API 串接練習</h1>

    <p v-if="isLoading">載入中...</p>
    <p v-else-if="error">{{ error }}</p>
    
    <ul v-else>
      <li
        v-for="todo in todos"
        :key="todo.id"
        :class="{ completed: todo.completed }"
      >
        {{ todo.title }}
         <button
        @click="removeTodo(todo.id)"
      >
        刪除
      </button>
      </li>
     
    </ul>
     <input type="text" v-model="addTodo">
    <button @click="addTodoItem">送出</button>
  </div>
 
</template>

<style scoped>
.completed {
  text-decoration: line-through;
  color: #aaa;
}
</style>