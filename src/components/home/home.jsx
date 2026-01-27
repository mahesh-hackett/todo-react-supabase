import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Todos from "./todos";
import AddTodoModal from "./addTodo";
import { _fetchTodos } from "../../store/api.helpers/todos";

function Home() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.todo);
  const [isAddOpen, setIsAddOpen] = useState(false);

  useEffect(() => {
    dispatch(_fetchTodos());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header Section */}
      <div className="pt-12 pb-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-2">My Tasks</h1>
          <p className="text-slate-400">Organize your work and life, finally. Testing CI/CD</p>
        </div>
      </div>

      {/* Add Todo Input */}
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <button
          onClick={() => setIsAddOpen(true)}
          className="w-full max-w-2xl mx-auto flex items-center gap-3 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 text-slate-400 rounded-xl px-5 py-4 hover:bg-slate-800/70 hover:border-slate-600/50 transition-all duration-200 group"
        >
          <svg className="w-5 h-5 text-slate-500 group-hover:text-indigo-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span className="text-base">Add a new task...</span>
        </button>
      </div>

      {/* Loading indicator */}
      {isLoading && (
        <div className="flex justify-center items-center py-12">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      )}

      {/* Todos Grid */}
      <Todos />

      {/* AddTodo Modal */}
      {isAddOpen && <AddTodoModal closeModal={() => setIsAddOpen(false)} />}
    </div>
  );
}

export default Home;