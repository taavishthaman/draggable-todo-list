import { useEffect, useState } from "react";
import ListItem from "./ListItem";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styles from "./TodoList.module.css";
import TodoFilters from "./TodoFilters";
import { useTodo } from "../context/TodoContext";

export default function TodoList({ isDark }) {
  const { todoData } = useTodo();

  const [columns, setColumns] = useState(null);

  useEffect(() => {
    setColumns({
      "column-1": {
        name: "Needs to be Done",
        items: todoData,
      },
    });
  }, [todoData]);

  if (todoData.length === 0) {
    return (
      <div className={styles.listContainer}>
        <div
          className={`${styles.todoList} ${isDark ? styles.todoListDark : ""}`}
        >
          <TodoFilters isDark={isDark} />;
        </div>
      </div>
    );
  }

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
        <Draggable
          draggableId={draggable._id}
          key={draggable._id}
          index={index}
        >
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
