import styles from "./StatusFilters.module.css";

export default function StatusFilters() {
  return (
    <div className={styles.filterButtons}>
      <p className={styles.filterButton}>All</p>
      <p className={styles.filterButton}>Active</p>
      <p className={styles.filterButton}>Completed</p>
    </div>
  );
}
