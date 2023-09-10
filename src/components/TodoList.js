import { useState } from "react";
import ListItem from "./ListItem";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styles from "./TodoList.module.css";
import TodoFilters from "./TodoFilters";

export default function TodoList({ isDark }) {
  const draggableSamples = [
    { id: "1", name: "Complete online JavaScript course", completed: true },
    { id: "2", name: "Jog around the park 3x", completed: false },
    { id: "3", name: "10 minutes meditation", completed: false },
    { id: "4", name: "Read for 1 hour", completed: false },
    { id: "5", name: "Pick up groceries", completed: true },
    { id: "6", name: "Complete Todo App on Frontend Mentor", completed: true },
    {
      id: "7",
      name: "Complete Todo App on Frontend Mentor,....",
      completed: true,
    },
  ];

  const startColumns = {
    "column-1": {
      name: "Needs to be Done",
      items: draggableSamples,
    },
  };

  const [columns, setColumns] = useState(startColumns);

  function onDragEnd(result) {
    if (!result.destination) return;

    const { source, destination } = result;
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      [destination.droppableId]: {
        items: copiedItems,
      },
    });
  }

  function SampleMapper() {
    const draggables = columns["column-1"].items.map((draggable, index) => {
      return (
        <Draggable draggableId={draggable.id} key={draggable.id} index={index}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <ListItem data={draggable} isDark={isDark} />
            </div>
          )}
        </Draggable>
      );
    });

    return draggables;
  }
  return (
    <div className={styles.listContainer}>
      <div
        className={`${styles.todoList} ${isDark ? styles.todoListDark : ""}`}
      >
        <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
          <Droppable droppableId="column-1">
            {(provided, snapshot) => (
              <div ref={provided.innerRef} className={styles.scrollable}>
                <SampleMapper />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <TodoFilters isDark={isDark} />
      </div>
    </div>
  );
}
