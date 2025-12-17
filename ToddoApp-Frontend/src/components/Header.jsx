import { useNavigate } from "react-router-dom";

export function Header({ user }) {
  const navigate = useNavigate();
  return (
    <header className="flex justify-between items-center">
      <h1 className="text-xl font-bold text-slate-800">
        Hi, <span className="text-indigo-600">{user.username}</span> 👋
      </h1>
      <button
        className="px-4 py-2 text-sm font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/login");
        }}
      >
        Salir
      </button>
    </header>
  );
}