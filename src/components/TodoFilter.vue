<script setup>
    const props = defineProps({
  currentFilter: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['change'])

const filters = [
    {value: 'all' , label: '全部事項'},
    {value: 'completed' , label: '已完成'},
    {value: 'uncompleted' , label: '未完成'},
]

</script>

<template>
  <div class="filter-group">
    <button
      v-for="f in filters"
      :key="f.value"
      :class="{ active: props.currentFilter === f.value }"
      @click="emit('change', f.value)"
    >
      {{ f.label }}
    </button>
  </div>
</template>


<style scoped>
    button {
  margin-left: 8px;
  padding: 6px 16px;
  cursor: pointer;
}

.active {
  font-weight: bold;
  border-bottom: 2px solid #333;
}


</style>




