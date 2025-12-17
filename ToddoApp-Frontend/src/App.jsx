import "./App.css";
import { LoginPage } from "./pages/login/LoginPage";
import { TodoApp } from "./pages/HomePage/TodoApp";
import { RequireAuth } from "./components/RequireAuth";
import { Route, Routes } from "react-router-dom";
import { RegisterPage } from "./pages/login/RegisterPage";

function App() {

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route
        path="/"
        element={
          <RequireAuth>
            <TodoApp />
          </RequireAuth>
        }
      />
    </Routes>
  );
}

export default App;
