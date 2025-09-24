import { TodoModalHandle } from "@/components/TodoModal";
import { useDebounce } from "@/hooks/use-debounce";
import { Todo } from "@/service/todosService";
import { useTodosViewModel } from "@/viewmodels/useTodosViewModel";
import { useCallback, useEffect, useRef, useState } from "react";
import { Alert } from "react-native";

export function useTodosListScreen() {
  const { todos, deleteTodo, fetchTodos } = useTodosViewModel();
  const modalRef = useRef<TodoModalHandle>(null);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const handleOpenModal = useCallback((todo?: Todo) => {
    modalRef.current?.open(todo);
  }, []);

  const handleRemove = useCallback(
    (id: string) => {
      Alert.alert("Atenção", "Deseja remover a tarefa?", [
        { text: "Cancelar", style: "cancel" },
        { text: "Remover", onPress: () => deleteTodo(id) },
      ]);
    },
    [deleteTodo]
  );

  useEffect(() => {
    fetchTodos(debouncedSearch);
  }, [debouncedSearch, fetchTodos]);

  return {
    todos,
    search,
    setSearch,
    modalRef,
    handleOpenModal,
    handleRemove,
    debouncedSearch,
    fetchTodos,
  };
}
