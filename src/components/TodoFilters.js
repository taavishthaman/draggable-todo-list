import StatusFilters from "./StatusFilters";
import styles from "./TodoFilters.module.css";

export default function TodoFilters({ isDark }) {
  return (
    <>
      <div
        className={`${styles.filtersContainer} ${
          isDark ? styles.filtersContainerDark : ""
        }`}
      >
        <p className={styles.itemsLeft}>5 Items left</p>
        <span className={styles.desktopFilters}>
          <StatusFilters />
        </span>
        <p className={styles.clearBtn}>Clear Completed</p>
      </div>
      <div className={styles.mobileFilters}>
        <StatusFilters />
      </div>
    </>
  );
}
