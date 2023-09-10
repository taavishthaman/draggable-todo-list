import { useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import TodoList from "./components/TodoList";
import styles from "./App.module.css";

function App() {
  const [isDark, setIsDark] = useState(false);
  return (
    <div className={`${isDark ? styles.darkMode : ""}`}>
      <Header isDark={isDark} setIsDark={setIsDark} />
      <TodoList isDark={isDark} />
      <Footer isDark={isDark} />
    </div>
  );
}

export default App;
