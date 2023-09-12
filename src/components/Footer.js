import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div>
        <p className={styles.footerText}>Drag and drop to reorder list</p>
        <p className={styles.footerText}>
          Please wait for 1-2 minutes for server to boot up.
        </p>
      </div>
    </footer>
  );
}
