import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.footerText}>Drag and drop to reorder list</p>
    </footer>
  );
}
