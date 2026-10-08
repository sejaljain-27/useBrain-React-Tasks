import { useState } from 'react'

type Todo = { id: number; text: string; done: boolean }

export default function TodoList({ initialTodos }: { initialTodos: Todo[] }) {
  const [todos, setTodos] = useState(initialTodos)
  const [text, setText] = useState('')

  const add = () => {
    if (!text.trim()) return

    setTodos([...todos, { id: Date.now(), text, done: false }])
    setText('')
  }

  const toggle = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id
          ? { ...todo, done: !todo.done }
          : todo
      )
    )
  }

  return (
    <div>
      <input
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="New todo"
      />
      <button onClick={add}>Add</button>

      <ul>
        {todos.map(t => (
          <li
            key={t.id}
            className={t.done ? 'done' : ''}
            onClick={() => toggle(t.id)}
          >
            {t.text}
          </li>
        ))}
      </ul>

      <p data-testid="left">
        {todos.filter(t => !t.done).length} left
      </p>
    </div>
  )
}