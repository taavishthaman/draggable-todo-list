import { useEffect, useContext, useReducer, createContext } from "react";

const TodoContext = createContext();
const BASE_URL = "http://localhost:8000/api/v1/todos";

const initialState = {
  todoData: [],
  isLoading: false,
  filter: "All",
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };
    case "todos/loaded":
      return {
        ...state,
        isLoading: false,
        todoData: action.payload,
        filter: "All",
      };
    case "todo/created":
      return {
        ...state,
        isLoading: false,
        todoData: [action.payload, ...state.todoData],
      };
    case "todo/deleted":
      return {
        ...state,
        isLoading: false,
        todoData: state.todoData.filter((todo) => todo._id !== action.payload),
      };
    case "todo/setStatus":
      return {
        ...state,
        isLoading: false,
        todoData: state.todoData.map((todo) => {
          if (todo._id === action.payload.id) {
            todo.completed = action.payload.completed;
          }
          return todo;
        }),
      };
    case "todos/deleteCompleted":
      return {
        ...state,
        isLoading: false,
        todoData: action.payload,
        filter: "All",
      };

    case "todos/active":
      return {
        ...state,
        isLoading: false,
        todoData: action.payload.filter((todo) => !todo.completed),
        filter: "Active",
      };
    case "todos/completed":
      return {
        ...state,
        isLoading: false,
        todoData: action.payload.filter((todo) => todo.completed),
        filter: "Completed",
      };
    default:
      throw new Error("Unknown action type");
  }
}

function TodoProvider({ children }) {
  const [{ todoData, isLoading, filter, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  async function fetchAllTodos() {
    try {
      dispatch({ type: "loading" });
      const res = await fetch(`${BASE_URL}`);
      const data = await res.json();
      dispatch({ type: "todos/loaded", payload: data.data.todos });
    } catch (err) {}
  }

  useEffect(() => {
    fetchAllTodos();
  }, []);

  async function createTodo(newTodo) {
    try {
      dispatch({ type: "loading" });
      const res = await fetch(`${BASE_URL}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      });
      const data = await res.json();
      dispatch({ type: "todo/created", payload: data.data.todo });
    } catch (err) {}
  }

  async function deleteTodo(id) {
    try {
      dispatch({ type: "loading" });
      await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "todo/deleted", payload: id });
    } catch (err) {}
  }

  async function setTodoStatus(id, completed) {
    try {
      dispatch({ type: "loading" });
      await fetch(`${BASE_URL}/${id}`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed }),
      });
      dispatch({ type: "todo/setStatus", payload: { id, completed } });
    } catch (err) {}
  }

  async function clearCompleted() {
    try {
      dispatch({ type: "loading" });
      await fetch(`${BASE_URL}`, {
        method: "DELETE",
      });
      const res = await fetch(`${BASE_URL}`);
      const data = await res.json();
      dispatch({ type: "todos/deleteCompleted", payload: data.data.todos });
    } catch (err) {}
  }

  async function setActive() {
    try {
      dispatch({ type: "loading" });
      const res = await fetch(`${BASE_URL}`);
      const data = await res.json();
      dispatch({ type: "todos/active", payload: data.data.todos });
    } catch (err) {}
  }

  async function setCompleted() {
    try {
      dispatch({ type: "loading" });
      const res = await fetch(`${BASE_URL}`);
      const data = await res.json();
      dispatch({ type: "todos/completed", payload: data.data.todos });
    } catch (err) {}
  }

  return (
    <TodoContext.Provider
      value={{
        todoData,
        isLoading,
        error,
        filter,
        fetchAllTodos,
        createTodo,
        deleteTodo,
        setTodoStatus,
        clearCompleted,
        setActive,
        setCompleted,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

function useTodo() {
  const context = useContext(TodoContext);
  if (context === undefined)
    throw new Error("Todo Context was used outside todos provider.");
  return context;
}

export { TodoProvider, useTodo };
