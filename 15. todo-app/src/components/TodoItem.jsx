import { useContext } from 'react'
import TodoInputContext from '../context/TodoInputContext'

function TodoItem({ item, completed, toggleCompleted }) {
  const { handleDeleteClick } = useContext(TodoInputContext)

  return (
    <li className="todo-item">
      <div
        className={`check-outer-circle ${completed ? 'completed' : ''}`}
        onClick={() => toggleCompleted(item)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9">
          <path
            fill="none"
            visibility={completed ? 'visible' : 'hidden'}
            stroke="#fff"
            strokeWidth="2"
            d="M1 4.304L3.696 7l6-6"
          />
        </svg>
      </div>
      <p
        className={completed ? 'completed' : ''}
        onClick={() => toggleCompleted(item)}
      >
        {item.todoText}
      </p>
      <div className="close-btn" onClick={() => handleDeleteClick(item.todoId)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18">
          <path
            fill="#494C6B"
            fillRule="evenodd"
            d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"
          />
        </svg>
      </div>
    </li>
  )
}

export default TodoItem
