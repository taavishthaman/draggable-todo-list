import { useTodo } from "../context/TodoContext";
import styles from "./StatusFilters.module.css";

export default function StatusFilters() {
  const { filter, fetchAllTodos, setActive, setCompleted } = useTodo();
  return (
    <div className={styles.filterButtons}>
      <p
        className={`${styles.filterButton} ${
          filter === "All" ? styles.filterSelected : ""
        }`}
        onClick={async () => {
          await fetchAllTodos();
        }}
      >
        All
      </p>
      <p
        className={`${styles.filterButton} ${
          filter === "Active" ? styles.filterSelected : ""
        }`}
        onClick={() => {
          setActive();
        }}
      >
        Active
      </p>
      <p
        className={`${styles.filterButton} ${
          filter === "Completed" ? styles.filterSelected : ""
        }`}
        onClick={() => {
          setCompleted();
        }}
      >
        Completed
      </p>
    </div>
  );
}
