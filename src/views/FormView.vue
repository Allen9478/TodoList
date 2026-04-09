<script setup>
import { ref, reactive } from 'vue'

const form = reactive({
  name: '',
  age: null,
  gender: '',
  interests: [],
  city: '',
  agree: false
})

const handleSubmit = () => {
  if (!form.agree) {
    alert('請先同意條款')
    return
  }
  console.log(form)
}
</script>

<template>
  <div class="form-container">
    <h1>表單練習</h1>

    <div>
      <label>姓名</label>
      <input type="text" v-model.trim="form.name">
    </div>

    <div>
      <label>年齡</label>
      <input type="number" v-model.number="form.age">
    </div>

    <div>
      <label>性別</label>
      <input type="radio" value="male" v-model="form.gender"> 男
      <input type="radio" value="female" v-model="form.gender"> 女
    </div>

    <div>
      <label>興趣</label>
      <input type="checkbox" value="coding" v-model="form.interests"> 寫程式
      <input type="checkbox" value="reading" v-model="form.interests"> 閱讀
      <input type="checkbox" value="gaming" v-model="form.interests"> 遊戲
    </div>

    <div>
      <label>城市</label>
      <select v-model="form.city">
        <option value="">請選擇</option>
        <option value="taipei">台北</option>
        <option value="taichung">台中</option>
        <option value="kaohsiung">高雄</option>
      </select>
    </div>

    <div>
      <input type="checkbox" v-model="form.agree"> 我同意條款
    </div>

    <button @click="handleSubmit">送出</button>

    <pre>{{ form }}</pre>
  </div>
</template>



<style>

</style>