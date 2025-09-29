import { Todo } from "@/service/todosService";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TODOS_KEY = "@todos";

export const getTodos = async (): Promise<Todo[]> => {
  const json = await AsyncStorage.getItem(TODOS_KEY);
  return json ? JSON.parse(json) : [];
};

export const saveTodo = async (todo: Omit<Todo, "id">): Promise<Todo> => {
  const todos = await getTodos();
  
  const newTodo: Todo = { ...todo, id: Date.now().toString() };
  const updated = [...todos, newTodo];
  await AsyncStorage.setItem(TODOS_KEY, JSON.stringify(updated));
  return newTodo;
};

export const removeTodo = async (id: string) => {
  const todos = await getTodos();
  const updated = todos.filter(t => t.id !== id);
  await AsyncStorage.setItem(TODOS_KEY, JSON.stringify(updated));
};

export const editTodo = async (id: string, name: string) => {
  const todos = await getTodos();

  const updated = todos.map(todo =>
    todo.id === id ? { ...todo, title: name } : todo
  );

  await AsyncStorage.setItem(TODOS_KEY, JSON.stringify(updated));
};

export const searchTodos = async (title: string): Promise<Todo[]> => {
  const todos = await getTodos();

  if (!title || title.trim() === "") {
    return todos;
  }
  const filtered = todos.filter(todo =>
    todo.title.toLowerCase().includes(title.toLowerCase())
  );

  return filtered;
};

export const getTodosCount = async (): Promise<number> => {
  const todos = await getTodos();
  return todos.length;
};