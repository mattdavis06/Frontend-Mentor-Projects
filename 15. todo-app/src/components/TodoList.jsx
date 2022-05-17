import { useContext } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import TodoItem from './TodoItem'
import TodoInputContext from '../context/TodoInputContext'
import TodoListActionsDesktop from './TodoListActionsDesktop'
import TodoListActionsMobile from './TodoListActionsMobile'

function TodoList() {
  const { todoItems, setTodoItems, filter, FILTER_MAP } =
    useContext(TodoInputContext)

  const toggleCompleted = (id) => {
    const updateTodos = todoItems.map((item) => {
      if (id.todoId === item.todoId) {
        return { ...item, completed: !item.completed }
      }
      return item
    })
    setTodoItems(updateTodos)
  }

  function onDragEnd(result) {
    if (!result.destination) {
      return
    }

    const newItems = [...todoItems]
    const [removed] = newItems.splice(result.source.index, 1)
    newItems.splice(result.destination.index, 0, removed)
    setTodoItems(newItems)
  }

  return (
    <section>
      <div className="container">
        <div className="todo-list">
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="todo_droppable_list">
              {(provided) => {
                return (
                  <ul {...provided.droppableProps} ref={provided.innerRef}>
                    {todoItems.filter(FILTER_MAP[filter]).map((item, idx) => {
                      return (
                        <Draggable
                          draggableId={`todo-${item.todoId}`}
                          index={idx}
                          key={item.todoId}
                        >
                          {(provided) => {
                            return (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <TodoItem
                                  key={item.todoId}
                                  item={item}
                                  completed={item.completed}
                                  toggleCompleted={toggleCompleted}
                                />
                              </div>
                            )
                          }}
                        </Draggable>
                      )
                    })}
                    {provided.placeholder}
                  </ul>
                )
              }}
            </Droppable>
          </DragDropContext>
          <TodoListActionsDesktop />
        </div>
        <TodoListActionsMobile />
      </div>
    </section>
  )
}

export default TodoList
