<script setup>
    import { ref } from 'vue'
    
    const inputText = ref('')

    const emit = defineEmits(['add'])

    const handleAdd = () => {
        if (inputText.value.trim() === '')return
        emit('add', inputText.value.trim())
        inputText.value=''
    }
    
</script>


<template>
    <input type="text" v-model="inputText">
    <button @click="handleAdd">新增</button>
</template>


<style>

</style>