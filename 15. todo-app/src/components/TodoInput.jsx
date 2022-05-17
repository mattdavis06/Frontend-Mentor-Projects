import { useContext } from 'react'
import TodoInputContext from '../context/TodoInputContext'

function TodoInput() {
  const { todoId, todoText, todoItems, setTodoId, setTodoText, setTodoItems } =
    useContext(TodoInputContext)

  const placeholder = 'Create a new todo...'

  const handleInput = ({ target: { value } }) => {
    setTodoText(value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!todoText.length > 0) {
      window.alert('Please enter a Todo')
    } else {
      const newTodo = {
        todoId,
        todoText,
        completed: false,
      }
      setTodoId(todoId + 1)
      setTodoItems([newTodo, ...todoItems])
    }
    setTodoText('')
  }

  return (
    <form className="form-control" onSubmit={handleSubmit}>
      <div className="check-outer-circle"></div>
      <label htmlFor="todo"></label>
      <input
        enterkeyhint="done"
        type="text"
        name="todo"
        value={todoText}
        placeholder={placeholder}
        onInput={handleInput}
        onFocus={(e) => (e.target.placeholder = '')}
        onBlur={(e) => (e.target.placeholder = placeholder)}
      />
    </form>
  )
}

export default TodoInput
