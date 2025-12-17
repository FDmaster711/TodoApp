import { Header } from "../../components/Header";
import { useTodos } from "../../hooks/useTodos";

const getPriorityColor = (priority) => {
  switch (priority) {
    case 'High': return 'bg-red-100 text-red-700 border-red-200';
    case 'Medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    case 'Low': return 'bg-blue-100 text-blue-700 border-blue-200';
    default: return 'bg-slate-100 text-slate-700 border-slate-200';
  }
};

export function TodoApp() {
  const {
    user,
    newTask, setNewTask,
    priority, setPriority,
    editingId, editText, setEditText, editPriority, setEditPriority, 
    startEditing, cancelEditing, saveEdit,
    filter, setFilter,
    filteredTodos,
    stats,
    handleCreate, handleDelete, handleToggle,
    loading,
  } = useTodos();

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* HEADER Y DASHBOARD (Igual que antes...) */}
        <div className="bg-white shadow-sm rounded-xl p-6 border border-slate-200">
           <Header user={user} />
           <div className="mt-6">
              <div className="flex justify-between items-end mb-2">
                  <div>
                      <h2 className="text-2xl font-bold text-slate-800">Task Dashboard</h2>
                      <p className="text-slate-500 text-sm">Keep it up, {user.username}!</p>
                  </div>
                  <div className="text-right">
                      <span className="text-3xl font-bold text-indigo-600">{stats.progress}%</span>
                      <p className="text-xs text-slate-400 uppercase tracking-wide">Done</p>
                  </div>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                  <div 
                    className="bg-indigo-600 h-3 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${stats.progress}%` }}
                  ></div>
              </div>
           </div>
        </div>

        {/* MAIN CARD */}
        <div className="bg-white shadow-xl rounded-xl overflow-hidden border border-slate-100">
          
          {/* CREATE FORM (Igual que antes...) */}
          <div className="p-6 bg-slate-50 border-b border-slate-200">
            <form onSubmit={handleCreate} className="flex gap-3 flex-col sm:flex-row">
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="What needs to be done?"
                className="flex-1 p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm"
              />
              <select 
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-slate-600 font-medium cursor-pointer"
              >
                <option value="Low">Low Priority</option>
                <option value="Medium">Medium</option>
                <option value="High">High Priority</option>
              </select>
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all hover:shadow-lg flex items-center justify-center gap-2"
              >
                <span>+</span> Add
              </button>
            </form>
          </div>

          {/* FILTERS (Igual que antes...) */}
          <div className="flex border-b border-slate-100 bg-white sticky top-0 z-10">
            {["all", "pending", "completed"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider transition-colors relative
                  ${
                    filter === f
                      ? "text-indigo-600 bg-indigo-50/30"
                      : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
                  }`}
              >
                {f}
                {filter === f && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600" />}
              </button>
            ))}
          </div>

          {/* TASK LIST */}
          <div className="bg-white min-h-[400px]">
            {filteredTodos.length === 0 ? (
               <div className="flex flex-col items-center justify-center h-64 text-slate-400 opacity-60">
                 <p className="text-lg font-medium">No tasks found</p>
               </div>
            ) : (
              <ul className="divide-y divide-slate-100">
                {filteredTodos.map((todo) => (
                  <li
                    key={todo.id}
                    className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 hover:bg-slate-50 transition-colors duration-200 gap-3"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <input
                        type="checkbox"
                        checked={!!todo.completed}
                        onChange={() => handleToggle(todo)}
                        className="w-5 h-5 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500 cursor-pointer flex-shrink-0"
                      />
                      
                      {/* --- AQUÍ ESTÁ EL CAMBIO CLAVE EN LA EDICIÓN --- */}
                      {editingId === todo.id ? (
                          <div className="flex flex-col sm:flex-row flex-1 gap-2 w-full">
                              {/* Input de texto */}
                              <input 
                                type="text" 
                                value={editText} 
                                onChange={(e) => setEditText(e.target.value)}
                                className="flex-1 p-1 border-b-2 border-indigo-500 focus:outline-none bg-transparent"
                                autoFocus
                              />
                              
                              {/* Selector de Prioridad en Edición */}
                              <select 
                                value={editPriority}
                                onChange={(e) => setEditPriority(e.target.value)}
                                className="p-1 border-b-2 border-indigo-500 focus:outline-none bg-transparent text-sm text-slate-600 font-medium cursor-pointer"
                              >
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                              </select>

                              {/* Botones Guardar/Cancelar */}
                              <div className="flex gap-2">
                                <button onClick={() => saveEdit(todo.id)} className="text-green-600 hover:text-green-800 text-sm font-bold px-2">Save</button>
                                <button onClick={cancelEditing} className="text-slate-400 hover:text-slate-600 text-sm px-2">Cancel</button>
                              </div>
                          </div>
                      ) : (
                          // MODO VISTA (View Mode)
                          <div className="flex flex-col">
                            <span className={`text-base font-medium transition-all duration-200 ${
                                todo.completed ? "text-slate-400 line-through decoration-slate-300" : "text-slate-800"
                            }`}>
                                {todo.task}
                            </span>
                            {/* Mobile Badge */}
                            <span className={`sm:hidden text-xs mt-1 w-max px-2 py-0.5 rounded-full border ${getPriorityColor(todo.priority)}`}>
                                {todo.priority || 'Low'}
                            </span>
                          </div>
                      )}
                    </div>

                    {/* MODO VISTA (Lado Derecho - Badges y Acciones) */}
                    {editingId !== todo.id && (
                        <div className="flex items-center justify-end gap-3 pl-9 sm:pl-0">
                           <span className={`hidden sm:inline-block text-xs font-bold px-3 py-1 rounded-full border ${getPriorityColor(todo.priority)}`}>
                              {todo.priority || 'Low'}
                           </span>

                           <div className="flex items-center gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                                <button onClick={() => startEditing(todo)} className="text-slate-400 hover:text-indigo-600 p-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </button>
                                <button onClick={() => handleDelete(todo.id)} className="text-slate-400 hover:text-red-600 p-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                           </div>
                        </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}