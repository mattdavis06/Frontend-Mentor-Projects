import { useState, useContext } from 'react'
import TodoInputContext from '../context/TodoInputContext'
import useWindowDimensions from '../shared/ScreenWidth'

function TodoListActions() {
  const { todoItems, setFilter, clearCompleteTodos } =
    useContext(TodoInputContext)
  const { width } = useWindowDimensions()

  // State for setting 'active' on Todo Action filter
  const [active, setActive] = useState(0)

  return (
    <>
      {(() => {
        // Checks width and update Todo Actions UI/Layout for desktop
        if (width > 768 && todoItems.length > 0) {
          return (
            <div className="todo-actions">
              <div className="items-left">
                <small>{todoItems.length} items left</small>
              </div>
              <div className="todo-filters">
                <small
                  className={active === 0 ? 'active' : ''}
                  onClick={() => {
                    setActive(0)
                    setFilter('All')
                  }}
                >
                  All
                </small>
                <small
                  className={active === 1 ? 'active' : ''}
                  onClick={() => {
                    setActive(1)
                    setFilter('Active')
                  }}
                >
                  Active
                </small>
                <small
                  className={active === 2 ? 'active' : ''}
                  onClick={() => {
                    setActive(2)
                    setFilter('Completed')
                  }}
                >
                  Completed
                </small>
              </div>
              <div className="clear-completed-todo">
                <small onClick={clearCompleteTodos}>Clear Completed</small>
              </div>
            </div>
          )
        }
      })()}
    </>
  )
}

export default TodoListActions
