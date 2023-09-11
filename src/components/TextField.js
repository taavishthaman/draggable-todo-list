import { useRef } from "react";
import { useTodo } from "../context/TodoContext";
import styles from "./TextField.module.css";

export default function TextField({ isDark }) {
  const { createTodo } = useTodo();
  const inputRef = useRef();
  async function createNewTodo(e) {
    if (e.code === "Enter") {
      const name = inputRef.current.value;
      await createTodo({
        name,
      });
      inputRef.current.value = "";
    }
  }
  return (
    <div className={styles.textFieldContainer}>
      <div className={styles.textFieldDiv}>
        <div className={styles.textCircle}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
          >
            <circle cx="12" cy="12" r="12" fill="white" stroke="#E3E4F1" />
          </svg>
        </div>
        <input
          type="text"
          className={`${styles.textField} ${
            isDark ? styles.textFieldDark : ""
          }`}
          placeholder="Create a new todo..."
          onKeyDown={(e) => createNewTodo(e)}
          ref={inputRef}
        ></input>
      </div>
    </div>
  );
}
