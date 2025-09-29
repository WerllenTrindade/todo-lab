import { Todo } from "@/service/todosService";
import { useCallback, useEffect, useState } from "react";
import { editTodo, removeTodo, saveTodo, searchTodos } from "./todosViewModel";

export const useTodosViewModel = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTodos = useCallback(async (description?: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await searchTodos(description || "");
      setTodos(data);
    } catch (err) {
      console.error("Erro ao buscar todos:", err);
      setError("Não foi possível carregar as tarefas.");
    } finally {
      setLoading(false);
    }
  }, []);

  const addTodo = async (title: string) => {
    const newTodo = await saveTodo({ title, completed: false });
    setTodos((prev) => [...prev, newTodo]);
  };

  const updateTodo = async (id: string, title: string) => {
    await editTodo(id, title);
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, title } : t))
    );
  };

  const deleteTodo = async (id: string) => {
    await removeTodo(id);
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return {
    todos,
    loading,
    error,
    fetchTodos,
    addTodo,
    updateTodo,
    deleteTodo,
  };
};
