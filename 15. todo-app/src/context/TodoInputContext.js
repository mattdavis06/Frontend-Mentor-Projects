import { createContext, useState, useEffect } from 'react'
import useLocalStorage from 'use-local-storage'

const TodoInputContext = createContext()

export const TodoInputProvider = ({ children }) => {
  // ------------------
  // Initial Todo Items
  const [todoItems, setTodoItems] = useState([
    {
      todoId: 1,
      todoText: 'Complete online JavaScript course',
      completed: true,
    },
    {
      todoId: 2,
      todoText: 'Jog around the park 3x',
      completed: false,
    },
    {
      todoId: 3,
      todoText: '10 minutes medication',
      completed: false,
    },
    {
      todoId: 4,
      todoText: 'Read for 1 hour',
      completed: false,
    },
    {
      todoId: 5,
      todoText: 'Pick up groceries',
      completed: false,
    },
    {
      todoId: 6,
      todoText: 'Complete Todo App on Frontend Mentor',
      completed: false,
    },
  ])
  const [todoId, setTodoId] = useState(7)
  const [todoText, setTodoText] = useState('')
  const [completed, setCompleted] = useState(false)

  // Filter Map & State, for 'All', 'Active' & 'Completed' filters
  const [filter, setFilter] = useState('All')
  const FILTER_MAP = {
    All: () => true,
    Active: (item) => !item.completed,
    Completed: (item) => item.completed,
  }

  // State for LS
  const [itemsInLS, setItemsInLS] = useLocalStorage('todos', todoItems)

  // Stores Todo Items in LS
  useEffect(() => {
    setItemsInLS(todoItems)
    setTodoId(todoItems.length + 1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todoItems])

  // Gets Todo in LS & Updates State
  useEffect(() => {
    setTodoItems(itemsInLS)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // -------------------------------
  // To Do Clicks
  // -------------------------------
  // Deletes Todo
  const handleDeleteClick = (id) => {
    window.alert('Are you sure you want to delete this Todo?')

    setTodoItems(todoItems.filter((item) => item.todoId !== id))

    if (todoItems.length === 1) {
      setTodoId(1)
    }
  }

  // Clears Complete Todos
  const clearCompleteTodos = () => {
    let completeTodos = []

    todoItems.forEach((item) => {
      if (item.completed === true) {
        return completeTodos.push(item)
      }
    })

    if (!completeTodos.length > 0) {
      window.alert('No complete Todos to clear!')
    } else if (completeTodos.length === 1) {
      window.alert(
        `Are you sure you want to clear this ${completeTodos.length} completed Todos?`
      )
      setTodoItems(todoItems.filter((item) => item.completed !== true))

      completeTodos = []
    } else {
      window.alert(
        `Are you sure you want to clear these ${completeTodos.length} completed Todos?`
      )
      setTodoItems(todoItems.filter((item) => item.completed !== true))

      completeTodos = []
    }
  }

  return (
    <TodoInputContext.Provider
      value={{
        todoId,
        todoText,
        todoItems,
        completed,
        filter,
        FILTER_MAP,
        setTodoId,
        setTodoText,
        setTodoItems,
        setCompleted,
        setFilter,
        handleDeleteClick,
        clearCompleteTodos,
      }}
    >
      {children}
    </TodoInputContext.Provider>
  )
}

export default TodoInputContext
