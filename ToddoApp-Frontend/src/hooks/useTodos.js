import { useState, useEffect } from "react";
import axios from "axios";
import { getAllTodos, createTodo, updateTodo, deleteTodo } from "../services/todoServices";

export const useTodos = () => {
  const [user, setUser] = useState(null);
  const [todos, setTodos] = useState([]);
  
  const [newTask, setNewTask] = useState("");
  const [priority, setPriority] = useState("Low");
  
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [editPriority, setEditPriority] = useState("Low"); // <--- AGREGADO

  const [filter, setFilter] = useState("pending");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, tasksData] = await Promise.all([
          axios.get("/users/me"),
          getAllTodos(),
        ]);
        setUser(userRes.data);
        const formattedTasks = tasksData.map(t => ({...t, priority: t.priority || 'Low'}));
        setTodos(formattedTasks);
      } catch (err) {
        console.error("Error loading data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const totalTasks = todos.length;
  const completedTasks = todos.filter(t => t.completed).length;
  const progress = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    try {
      const createdData = await createTodo(newTask, priority);
      const newTodoItem = {
        id: createdData.id,
        task: createdData.task,
        priority: createdData.priority || priority,
        completed: false,
      };
      setTodos([newTodoItem, ...todos]);
      setNewTask("");
      setPriority("Low");
    } catch (error) {
      console.error("Error creating task", error);
    }
  };

  const handleToggle = async (todo) => {
    try {
      const newStatus = !todo.completed;
      await updateTodo(todo.id, { completed: newStatus });
      setTodos(todos.map((t) => (t.id === todo.id ? { ...t, completed: newStatus } : t)));
    } catch (error) {
      console.error("Error updating status", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting", error);
    }
  };

  const startEditing = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.task);
    setEditPriority(todo.priority || 'Low'); 
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditText("");
    setEditPriority("Low");
  };

  const saveEdit = async (id) => {
    if(!editText.trim()) return;
    try {
        await updateTodo(id, { task: editText, priority: editPriority });
        
        setTodos(todos.map(t => t.id === id ? { ...t, task: editText, priority: editPriority } : t));
        
        setEditingId(null);
    } catch (error) {
        console.error("Error editing", error);
    }
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed === true;
    if (filter === "pending") return todo.completed === false;
    return true;
  });

  return {
    user, todos, 
    newTask, setNewTask, priority, setPriority,
    editingId, editText, setEditText, editPriority, setEditPriority, 
    startEditing, cancelEditing, saveEdit,
    filter, setFilter, filteredTodos, stats: { totalTasks, completedTasks, progress },
    handleCreate, handleDelete, handleToggle, loading,
  };
};