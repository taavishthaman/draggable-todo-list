import { useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import TodoList from "./components/TodoList";
import { TodoProvider } from "./context/TodoContext";
import styles from "./App.module.css";

function App() {
  const [isDark, setIsDark] = useState(false);
  return (
    <TodoProvider>
      <div className={`${isDark ? styles.darkMode : ""}`}>
        <Header isDark={isDark} setIsDark={setIsDark} />
        <TodoList isDark={isDark} />
        <Footer isDark={isDark} />
      </div>
    </TodoProvider>
  );
}

export default App;
