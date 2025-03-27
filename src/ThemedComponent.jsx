import { useTheme } from "./ThemeContext";

function ThemedComponent() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      style={{
        background: theme === "light" ? "#fff" : "#333",
        color: theme === "light" ? "#000" : "#fff",
        padding: "20px",
        textAlign: "center",
        transition: "0.3s",
      }}
    >
      <h2>Current Theme: {theme}</h2>
      <button
        onClick={toggleTheme}
        style={{
          padding: "10px 20px",
          background: theme === "light" ? "#333" : "#fff",
          color: theme === "light" ? "#fff" : "#000",
          border: "none",
          cursor: "pointer",
        }}
      >
        Toggle Theme
      </button>
    </div>
  );
}

export default ThemedComponent;
