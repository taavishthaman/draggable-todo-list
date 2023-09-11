import { useTodo } from "../context/TodoContext";
import StatusFilters from "./StatusFilters";
import styles from "./TodoFilters.module.css";

export default function TodoFilters({ isDark }) {
  const { clearCompleted, todoData } = useTodo();
  return (
    <>
      <div
        className={`${styles.filtersContainer} ${
          isDark ? styles.filtersContainerDark : ""
        }`}
      >
        <p className={styles.itemsLeft}>{todoData.length} Items left</p>
        <span className={styles.desktopFilters}>
          <StatusFilters />
        </span>
        <p
          className={styles.clearBtn}
          onClick={async () => {
            await clearCompleted();
          }}
        >
          Clear Completed
        </p>
      </div>
      <div className={styles.mobileFilters}>
        <StatusFilters />
      </div>
    </>
  );
}
