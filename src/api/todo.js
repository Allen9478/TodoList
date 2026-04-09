
export const getTodos = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
  const data = await res.json()
  // 🔥 資料轉換（重點）
  return data.map(item => ({
    id: item.id,
    text: item.title,
    completed: item.completed
  }))
}