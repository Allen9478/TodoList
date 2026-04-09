<script setup>
import  TodoItem  from "../components/TodoItem.vue";
import  TodoInput from "../components/TodoInput.vue";
import  TodoFilter from "../components/TodoFilter.vue";
import { useTodoStore } from '../stores/todoStore';
import { storeToRefs } from 'pinia'
import { onMounted } from "vue";


const store = useTodoStore()
const { filteredTodos, filter } = storeToRefs(store)
const { setFilter, addTodo, deleteTodo, toggleTodo, fetchTodos } = store
onMounted(() => {
  fetchTodos()
})
</script>

<template>
  <div class="app">
     <TodoInput
      @add="addTodo"
    />
    <TodoFilter
      :currentFilter="filter"
      @change="setFilter"
    />
    <!-- <ul class="todo-list">
       <TodoItem
        v-for="todo in filteredTodos"
        :key="todo.id"
        :todo="todo"
        @toggle="toggleTodo"
        @delete="deleteTodo"
      />
     
    </ul>
    -->


    <ul class="todo-list">
  <li v-for="todo in filteredTodos" :key="todo.id">

    <TodoItem
      :todo="todo"
      @toggle="toggleTodo"
      @delete="deleteTodo"
    />

    <!-- 建議用 name（工程師寫法） -->
    <RouterLink
      :to="{ name: 'todo-detail', params: { id: todo.id } }"
    >
      查看詳細
    </RouterLink>

  </li>
</ul>
  </div>
</template>