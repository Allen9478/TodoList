import { getTodos } from '@/api/todo'
import { ref , watch , computed , onMounted } from 'vue'
export function useTodos() {
    const normalizeTodos = (todos) => {
  return todos.map(todo => ({
    id: todo.id,
    text: todo.text ?? todo.title ?? '',
    completed: todo.completed ?? false
  }))
}

    // const loadTodos = () => {
    //     const saved = localStorage.getItem('todos')
    //     return saved ? JSON.parse(saved) : []
    // }
    const loadTodos = () => {
  const saved = localStorage.getItem('todos')
  const data = saved ? JSON.parse(saved) : []
  return normalizeTodos(data)
}

const todos = ref(loadTodos())

onMounted(async () => {
  try {
    if (todos.value.length === 0) {
      todos.value = await getTodos()
    
    }
  } catch (err) {
    console.error('fetch todos failed', err)
  }
    console.log(todos)
})

const filter = ref('all')

watch(todos, (newVal) => {
    localStorage.setItem('todos', JSON.stringify(newVal))
}, { deep : true})

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

const toggleTodo = (id) => {
  const target = todos.value.find(todo => todo.id === id)
  if (!target) return
  target.completed = !target.completed
}

const deleteTodo = (id) => {
  todos.value = todos.value.filter(todo => todo.id !== id)
}

return {unfinishedCount, filteredTodos, filter, setFilter,  addTodo, deleteTodo, toggleTodo}
}