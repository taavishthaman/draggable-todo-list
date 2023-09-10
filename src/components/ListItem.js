import { useState } from "react";
import styles from "./ListItem.module.css";

export default function ListItem({ data, isDark }) {
  const [hovered, setHovered] = useState(false);
  const [completed, setCompleted] = useState(data.completed);

  return (
    <div
      className={`${styles.listItem} ${isDark ? styles.listItemDark : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={styles.listStatus}>
        <div
          className={styles.selectButton}
          onClick={() => setCompleted(!completed)}
        >
          {completed ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle cx="12" cy="12" r="11.5" fill="white" stroke="#E3E4F1" />
              <circle cx="12" cy="12" r="12" fill="url(#paint0_linear_0_595)" />
              <path
                d="M8 12.3041L10.6959 15L16.6959 9"
                stroke="white"
                stroke-width="2"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_0_595"
                  x1="-12"
                  y1="12"
                  x2="12"
                  y2="36"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#55DDFF" />
                  <stop offset="1" stop-color="#C058F3" />
                </linearGradient>
              </defs>
            </svg>
          ) : (
            <div>
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
          )}
        </div>
        <p
          className={`${styles.listTitle} 
          ${completed ? styles.strikethrough : ""} 
          ${completed ? styles.listTitleCompleted : ""}
          ${isDark ? styles.listTitleDark : ""} ${
            isDark && completed ? styles.listTitleCompletedDark : ""
          }`}
        >
          {data.name}
        </p>
      </div>
      {hovered && (
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18">
            <path
              fill="#494C6B"
              fill-rule="evenodd"
              d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"
            />
          </svg>
        </div>
      )}
    </div>
  );
}
