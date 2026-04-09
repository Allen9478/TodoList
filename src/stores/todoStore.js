import { getTodos } from '@/api/todo'

import { defineStore } from 'pinia'
import { ref, watch , computed  } from 'vue'

export const useTodoStore = defineStore('todo', () => {
  // 資料
  const normalizeTodos = (todos) => {
    return todos.map(todo => ({
      id: todo.id,
      text: todo.text ?? todo.title ?? '',
      completed: todo.completed ?? false
    }))
  }

  const loadTodos = () => {
    const saved = localStorage.getItem('todos')
    return saved ? JSON.parse(saved) : []
  }

  const todos = ref(loadTodos())

  //onMount不能在pinia store用

  // onMounted(async () => {
  //   try {
  //     if (todos.value.length === 0) {
  //     todos.value = await getTodos()
  //   }
  //   } catch (err) {
  //   console.error('fetch todos failed', err)
  //   }
  // })
  
  // ✅ 改成普通的 async 函式
  const fetchTodos = async () => {
    try {
      if (todos.value.length === 0) {
        todos.value = await getTodos()
      }
    } catch (err) {
      console.error('fetch todos failed', err)
    }
  } 

  const filter = ref('all')

  watch(todos, (newVal) => {
    localStorage.setItem('todos', JSON.stringify(newVal))
  }, { deep : true})




  // computed
  const filterMap = {
    all: () => true,
    completed: (todo) => todo.completed,
    uncompleted: (todo) => !todo.completed
  }

  const filteredTodos = computed(() =>
    todos.value.filter(filterMap[filter.value])
    
  )

  const unfinishedCount = computed(() =>
    todos.value.filter(todo => !todo.completed).length
  )

  // 方法
  const setFilter = (newFilter) => {
    filter.value = newFilter
  }

  const addTodo = (text) => {
    todos.value.push({
      id: Date.now(),
      text,
      completed: false
    })
  }

  const deleteTodo = (id) => {
    todos.value = todos.value.filter(todo => todo.id !== id)
  }

  const toggleTodo = (id) => {
    const target = todos.value.find(todo => todo.id === id)
    if (!target) return
    target.completed = !target.completed
  }

  

  return {
    filteredTodos,
    filter,
    unfinishedCount,
    setFilter,
    addTodo,
    deleteTodo,
    toggleTodo,
    fetchTodos
  }
})