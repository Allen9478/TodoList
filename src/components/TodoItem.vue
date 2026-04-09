
<script setup>
const props = defineProps ({
    todo: {
        type: Object,
        required: true
    }
})

const emit = defineEmits(['toggle', 'delete'])

const handleToggle = () => {
    emit('toggle', props.todo.id)
}

const handleDelete = () => {
    emit('delete', props.todo.id)
}

</script>
<template>
  <li :class="{ 'is-completed': todo.completed } ">
    <span>{{ todo.text }}</span>
    <button @click="handleToggle">
        {{ todo.completed ? '完成' : '未完成'}}
    </button>
    <button @click="handleDelete">刪除</button>
  </li>
</template>

<style scoped>
.is-completed {
  text-decoration: line-through;
  color: gray;
}
</style>